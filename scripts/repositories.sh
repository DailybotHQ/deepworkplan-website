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
#   - `clone` skips a directory that already exists (whatever it holds);
#   - `pull` skips a dirty tree, a checkout on any branch other than the
#     manifest's default branch, and a branch that cannot fast-forward;
#   - idempotent: running any command twice changes nothing the second time.
#
# Requires bash 3.2+, git and python3 (stdlib only). Overrides for tests:
#   REPOS_MANIFEST  manifest path (default: repositories/manifest.json)
#   REPOS_DIR       checkout root (default: repositories/)
# Exit status: 0 when every selected repository is fine or skipped by a
# safety rule, 1 when a clone or fast-forward failed, 2 on usage errors.

set -u

HUB_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MANIFEST="${REPOS_MANIFEST:-$HUB_ROOT/repositories/manifest.json}"
REPOS_DIR="${REPOS_DIR:-$HUB_ROOT/repositories}"

usage() {
	sed -n '4,8p' "$0" | sed 's/^# \{0,1\}//'
}

# Print one tab-separated line per selected repository:
# name, url, default_branch, role, visibility, gate.
manifest_rows() {
	python3 - "$MANIFEST" "$@" <<'PY'
import json, sys
path, wanted = sys.argv[1], sys.argv[2:]
with open(path) as handle:
    repos = json.load(handle)['repositories']
names = [r['name'] for r in repos]
unknown = [w for w in wanted if w not in names]
if unknown:
    sys.stderr.write('unknown repository: %s\n' % ', '.join(unknown))
    sys.exit(2)
for r in repos:
    if wanted and r['name'] not in wanted:
        continue
    fields = [r['name'], r['url'], r.get('default_branch', 'main'),
              r.get('role', ''), r.get('visibility', ''), r.get('gate', '')]
    if any('\t' in f or '\n' in f for f in fields):
        sys.stderr.write('invalid manifest entry: %s\n' % r['name'])
        sys.exit(2)
    print('\t'.join(fields))
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
	while IFS="$(printf '\t')" read -r name url branch role visibility gate; do
		printf '%-20s %-7s %-10s %s\n' "$name" "$role" "$visibility" "$gate"
	done
}

cmd_clone() {
	local failed=0
	mkdir -p "$REPOS_DIR"
	while IFS="$(printf '\t')" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
		if [ -e "$dest" ]; then
			echo "$name: present, skipped"
			continue
		fi
		if git clone --quiet --branch "$branch" "$url" "$dest" </dev/null; then
			echo "$name: cloned ($branch)"
		else
			echo "$name: clone FAILED" >&2
			failed=1
		fi
	done
	return $failed
}

cmd_status() {
	while IFS="$(printf '\t')" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
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
	while IFS="$(printf '\t')" read -r name url branch role visibility gate; do
		dest="$REPOS_DIR/$name"
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
		if ! git -C "$dest" fetch --quiet origin "$branch" </dev/null; then
			echo "$name: fetch FAILED" >&2
			failed=1
			continue
		fi
		before="$(git -C "$dest" rev-parse HEAD)"
		if git -C "$dest" merge --quiet --ff-only FETCH_HEAD >/dev/null 2>&1; then
			after="$(git -C "$dest" rev-parse HEAD)"
			if [ "$before" = "$after" ]; then
				echo "$name: up to date"
			else
				echo "$name: fast-forwarded ${before:0:7}..${after:0:7}"
			fi
		else
			echo "$name: cannot fast-forward (local commits), skipped"
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
	[ -f "$MANIFEST" ] || {
		echo "manifest not found: $MANIFEST" >&2
		exit 2
	}
	rows="$(manifest_rows "$@")" || exit 2
	[ -n "$rows" ] || exit 0
	printf '%s\n' "$rows" | "cmd_$command"
}

main "$@"
