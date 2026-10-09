#!/usr/bin/env bash
# Ecosystem hub sync: keep repositories/<name> checkouts of the repositories
# listed in repositories/manifest.json.
#
#   bash scripts/repositories.sh ls              # manifest: name, role, visibility, gate
#   bash scripts/repositories.sh clone [name...] # clone what is missing (HTTPS URLs from the manifest)
#   bash scripts/repositories.sh status [name...]# branch, clean/dirty, ahead/behind its upstream
#   bash scripts/repositories.sh pull [name...]  # fast-forward clean default-branch checkouts only
#
# Safety rules (pinned by tests/scripts/repositories.test.sh):
#   - never deletes anything, never rewrites a remote, never resets or stashes;
#   - `clone` skips any path that already exists (directory, file or
#     symlink, dangling or not) and fails (exit 1) when that path is not a
#     git checkout, so a leftover from an interrupted clone stays visible;
#   - `pull` and `status` never follow a symlinked checkout; `pull` skips a
#     dirty tree, a detached HEAD, any branch other than the manifest's
#     default branch, an unborn branch, and local commits (ahead/diverged);
#   - the manifest is validated first: names are plain directory names (no
#     `/`, no `..`), URLs are https:// only, branches cannot start with `-`;
#     `clone` allows the HTTPS protocol only, and git never prompts;
#   - idempotent: running any command twice changes nothing the second time.
#
# Requires bash 3.2+, git and python3 (stdlib only). Overrides for tests:
#   REPOS_MANIFEST     manifest path (default: repositories/manifest.json)
#   REPOS_DIR          checkout root (default: repositories/)
#   REPOS_ALLOW_LOCAL  1 = also accept absolute local paths as URLs (fixtures)
# Exit status: 0 when every selected repository is fine or skipped by a
# safety rule, 1 when a clone, fetch or fast-forward failed, 2 on usage or
# manifest errors.

set -u

HUB_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="${REPOS_MANIFEST:-$HUB_ROOT/repositories/manifest.json}"
REPOS_DIR="${REPOS_DIR:-$HUB_ROOT/repositories}"
SEP="$(printf '\037')"

# Never block on a credential prompt: a renamed or private repository would
# otherwise wait on /dev/tty.
export GIT_TERMINAL_PROMPT=0
# `clone` allows HTTPS only (plus local paths for test fixtures); `pull`
# fetches with whatever remote the developer configured in the clone.
CLONE_PROTOCOLS=https
[ "${REPOS_ALLOW_LOCAL:-}" = 1 ] && CLONE_PROTOCOLS=https:file

usage() {
	sed -n '4,8p' "$0" | sed 's/^# \{0,1\}//'
}

# Validate the manifest, then print one line per selected repository with
# fields separated by the unit separator (\037, not whitespace, so an empty
# field never shifts the others): name, url, default_branch, role,
# visibility, gate.
manifest_rows() {
	REPOS_ALLOW_LOCAL="${REPOS_ALLOW_LOCAL:-}" python3 - "$MANIFEST" "$@" <<'PY'
import json, os, re, sys

def die(message):
    sys.stderr.write('invalid manifest: %s\n' % message)
    sys.exit(2)

path, wanted = sys.argv[1], sys.argv[2:]
allow_local = os.environ.get('REPOS_ALLOW_LOCAL') == '1'
try:
    with open(path) as handle:
        repos = json.load(handle)['repositories']
except (OSError, ValueError, KeyError, TypeError) as error:
    die('%s: %s' % (path, error))
if not isinstance(repos, list):
    die('"repositories" must be a list')
NAME = re.compile(r'[A-Za-z0-9][A-Za-z0-9._-]*')
BRANCH = re.compile(r'[A-Za-z0-9][A-Za-z0-9._/-]*')
rows, seen = [], set()
for index, r in enumerate(repos):
    if not isinstance(r, dict):
        die('entry %d is not an object' % index)
    name, url = r.get('name'), r.get('url')
    branch = r.get('default_branch', 'main')
    if not isinstance(name, str) or not NAME.fullmatch(name) or name in ('.', '..'):
        die('entry %d: name %r must be a plain directory name' % (index, name))
    if name in seen:
        die('duplicate name %r' % name)
    seen.add(name)
    local = allow_local and isinstance(url, str) and url.startswith('/')
    if not isinstance(url, str) or not (url.startswith('https://') or local):
        die('%s: url %r must start with https://' % (name, url))
    if not isinstance(branch, str) or not BRANCH.fullmatch(branch) or '..' in branch:
        die('%s: default_branch %r is not a valid branch name' % (name, branch))
    fields = [name, url, branch, str(r.get('role', '')),
              str(r.get('visibility', '')), str(r.get('gate', ''))]
    if any(c in f for f in fields for c in '\x1f\n\r'):
        die('%s: control characters in a field' % name)
    rows.append(fields)
unknown = [w for w in wanted if w not in seen]
if unknown:
    sys.stderr.write('unknown repository: %s\n' % ', '.join(unknown))
    sys.exit(2)
for fields in rows:
    if not wanted or fields[0] in wanted:
        print('\x1f'.join(fields))
PY
}

is_checkout() {
	git -C "$1" rev-parse --is-inside-work-tree >/dev/null 2>&1 &&
		[ "$(git -C "$1" rev-parse --show-toplevel 2>/dev/null)" = "$(cd "$1" && pwd -P)" ]
}

is_dirty() {
	[ -n "$(git -C "$1" status --porcelain 2>/dev/null)" ]
}

cmd_ls() {
	printf '%-20s %-7s %-10s %s\n' NAME ROLE VISIBILITY GATE
	while IFS="$SEP" read -r name url branch role visibility gate; do
		printf '%-20s %-7s %-10s %s\n' "$name" "$role" "$visibility" "$gate"
	done
}

cmd_clone() {
	local failed=0
	mkdir -p "$REPOS_DIR"
	while IFS="$SEP" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
		if [ -L "$dest" ]; then
			echo "$name: symlink, not followed, skipped"
			continue
		fi
		if [ -e "$dest" ]; then
			if is_checkout "$dest"; then
				echo "$name: present, skipped"
			else
				# A leftover (e.g. an interrupted clone) is reported, never removed.
				echo "$name: present but not a git checkout, skipped" >&2
				failed=1
			fi
			continue
		fi
		if GIT_ALLOW_PROTOCOL="$CLONE_PROTOCOLS" git clone --quiet --branch "$branch" -- "$url" "$dest" </dev/null; then
			echo "$name: cloned ($branch)"
		else
			echo "$name: clone FAILED" >&2
			failed=1
		fi
	done
	return $failed
}

cmd_status() {
	while IFS="$SEP" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
		if [ -L "$dest" ]; then
			echo "$name: symlink, not followed"
			continue
		fi
		if [ ! -e "$dest" ]; then
			echo "$name: missing (run: bash scripts/repositories.sh clone $name)"
			continue
		fi
		if ! is_checkout "$dest"; then
			echo "$name: not a git checkout"
			continue
		fi
		current="$(git -C "$dest" symbolic-ref --quiet --short HEAD 2>/dev/null || echo '(detached)')"
		state=clean
		is_dirty "$dest" && state=dirty
		sync=""
		if counts="$(git -C "$dest" rev-list --left-right --count '@{upstream}...HEAD' 2>/dev/null)"; then
			sync=" behind $(echo "$counts" | awk '{print $1}'), ahead $(echo "$counts" | awk '{print $2}')"
		else
			sync=" no upstream"
		fi
		note=""
		[ "$current" != "$branch" ] && note=" (default: $branch)"
		echo "$name: $current$note, $state,$sync"
	done
}

cmd_pull() {
	local failed=0
	while IFS="$SEP" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
		if [ -L "$dest" ]; then
			echo "$name: symlink, not followed, skipped"
			continue
		fi
		if [ ! -e "$dest" ]; then
			echo "$name: missing, skipped"
			continue
		fi
		if ! is_checkout "$dest"; then
			echo "$name: not a git checkout, skipped"
			continue
		fi
		current="$(git -C "$dest" symbolic-ref --quiet --short HEAD 2>/dev/null || echo '(detached)')"
		if [ "$current" != "$branch" ]; then
			echo "$name: on $current, not $branch, skipped"
			continue
		fi
		if is_dirty "$dest"; then
			echo "$name: dirty tree, skipped"
			continue
		fi
		if ! before="$(git -C "$dest" rev-parse --verify --quiet HEAD)"; then
			echo "$name: no commits on $branch, skipped"
			continue
		fi
		if ! git -C "$dest" fetch --quiet origin "$branch" </dev/null; then
			echo "$name: fetch FAILED" >&2
			failed=1
			continue
		fi
		remote="$(git -C "$dest" rev-parse FETCH_HEAD)"
		if [ "$before" = "$remote" ]; then
			echo "$name: up to date"
		elif git -C "$dest" merge-base --is-ancestor "$remote" "$before"; then
			echo "$name: ahead of origin/$branch (local commits), skipped"
		elif ! git -C "$dest" merge-base --is-ancestor "$before" "$remote"; then
			echo "$name: cannot fast-forward (local commits), skipped"
		elif git -C "$dest" merge --quiet --ff-only "$remote" >/dev/null 2>&1; then
			echo "$name: fast-forwarded ${before:0:7}..${remote:0:7}"
		else
			echo "$name: fast-forward FAILED" >&2
			failed=1
		fi
	done
	return $failed
}

main() {
	[ $# -ge 1 ] || {
		usage
		exit 2
	}
	command="$1"
	shift
	case "$command" in
	ls | clone | status | pull) ;;
	-h | --help | help)
		usage
		exit 0
		;;
	*)
		usage >&2
		exit 2
		;;
	esac
	command -v python3 >/dev/null 2>&1 || {
		echo "python3 is required (reads the manifest)" >&2
		exit 2
	}
	[ -f "$MANIFEST" ] || {
		echo "manifest not found: $MANIFEST" >&2
		exit 2
	}
	rows="$(manifest_rows "$@")" || exit 2
	[ -n "$rows" ] || exit 0
	printf '%s\n' "$rows" | "cmd_$command"
}

main "$@"
