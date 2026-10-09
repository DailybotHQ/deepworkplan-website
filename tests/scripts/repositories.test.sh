#!/usr/bin/env bash
# Tests for scripts/repositories.sh against local fixture repositories.
#
#   bash tests/scripts/repositories.test.sh
#
# Offline: every fixture "remote" is a local repository in a fresh mktemp
# directory, so nothing touches the network or the real repositories/ tree.
# The mktemp directory is left in place (it is harmless and removing a
# variable path is not worth the risk). Runs the script under /bin/bash when
# that is present: on macOS that is bash 3.2, which pins 3.2 compatibility
# there; Linux CI runs bash 5 and relies on the construct check at the end.

set -u

HUB_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SCRIPT="$HUB_ROOT/scripts/repositories.sh"
SHELL_UNDER_TEST="${SHELL_UNDER_TEST:-/bin/bash}"
[ -x "$SHELL_UNDER_TEST" ] || SHELL_UNDER_TEST=bash

# Isolate git from the developer's configuration (signing, hooks, templates).
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
export GIT_AUTHOR_NAME=fixture GIT_AUTHOR_EMAIL=fixture@example.com
export GIT_COMMITTER_NAME=fixture GIT_COMMITTER_EMAIL=fixture@example.com

WORK="$(mktemp -d "${TMPDIR:-/tmp}/repositories-test.XXXXXX")"
export REPOS_DIR="$WORK/checkouts"
export REPOS_MANIFEST="$WORK/manifest.json"
export REPOS_ALLOW_LOCAL=1 # fixtures are local paths; the https rule is tested below

passed=0
failed=0
ok() {
	passed=$((passed + 1))
	echo "ok - $1"
}
not_ok() {
	failed=$((failed + 1))
	echo "not ok - $1"
}
check() { # check "description" command...
	local description="$1"
	shift
	if "$@"; then ok "$description"; else not_ok "$description"; fi
}

run() { "$SHELL_UNDER_TEST" "$SCRIPT" "$@"; }

make_upstream() { # make_upstream name
	git init --quiet -b main "$WORK/upstream/$1"
	echo "$1" >"$WORK/upstream/$1/README.md"
	git -C "$WORK/upstream/$1" add README.md
	git -C "$WORK/upstream/$1" commit --quiet -m "init $1"
}

upstream_commit() { # upstream_commit name message
	echo "$2" >>"$WORK/upstream/$1/README.md"
	git -C "$WORK/upstream/$1" commit --quiet -am "$2"
}

head_of() { git -C "$REPOS_DIR/$1" rev-parse HEAD; }

for name in alpha beta gamma delta; do make_upstream "$name"; done
cat >"$REPOS_MANIFEST" <<EOF
{"repositories": [
  {"name": "alpha", "url": "$WORK/upstream/alpha", "default_branch": "main", "role": "pack", "visibility": "public", "gate": "true"},
  {"name": "beta", "url": "$WORK/upstream/beta", "default_branch": "main", "role": "addon", "visibility": "public", "gate": "true"},
  {"name": "gamma", "url": "$WORK/upstream/gamma", "default_branch": "main", "role": "addon", "visibility": "public", "gate": "true"},
  {"name": "delta", "url": "$WORK/upstream/delta", "default_branch": "main", "role": "addon", "visibility": "public", "gate": "true"}
]}
EOF

# --- usage and ls -----------------------------------------------------------
run >/dev/null 2>&1
check "no command exits 2" test $? -eq 2
run frobnicate >/dev/null 2>&1
check "unknown command exits 2" test $? -eq 2
run clone nosuchrepo >/dev/null 2>&1
check "unknown repository name exits 2" test $? -eq 2
check "ls lists every manifest entry" sh -c "'$SHELL_UNDER_TEST' '$SCRIPT' ls | grep -c -E '^(alpha|beta|gamma|delta) ' | grep -qx 4"

# --- clone --------------------------------------------------------------------
mkdir -p "$REPOS_DIR/delta"
echo keep >"$REPOS_DIR/delta/notes.txt"
mkdir -p "$REPOS_DIR/unlisted"
echo keep >"$REPOS_DIR/unlisted/file.txt"
out="$(run clone)"
check "clone exits 0" test $? -eq 0
check "clone clones the missing repositories" test -d "$REPOS_DIR/alpha/.git" -a -d "$REPOS_DIR/beta/.git" -a -d "$REPOS_DIR/gamma/.git"
check "clone checks out the default branch" test "$(git -C "$REPOS_DIR/alpha" symbolic-ref --short HEAD)" = main
check "clone skips an existing directory" sh -c "echo '$out' | grep -q 'delta: present, skipped'"
check "clone leaves an existing directory untouched" test "$(cat "$REPOS_DIR/delta/notes.txt")" = keep -a ! -e "$REPOS_DIR/delta/.git"
alpha_head="$(head_of alpha)"
out="$(run clone)"
check "clone is idempotent" sh -c "echo '$out' | grep -c 'present, skipped' | grep -qx 4"
check "a second clone changes nothing" test "$(head_of alpha)" = "$alpha_head"
check "clone selects named repositories only" sh -c "'$SHELL_UNDER_TEST' '$SCRIPT' clone beta | grep -qx 'beta: present, skipped'"

# --- pull: fast-forward a clean default-branch checkout -------------------------
upstream_commit alpha "alpha v2"
out="$(run pull alpha)"
check "pull fast-forwards a clean default-branch checkout" test "$(head_of alpha)" = "$(git -C "$WORK/upstream/alpha" rev-parse HEAD)"
check "pull reports the fast-forward" sh -c "echo '$out' | grep -q 'alpha: fast-forwarded'"
out="$(run pull alpha)"
check "pull is idempotent" test "$out" = "alpha: up to date"

# --- pull: never touches a dirty tree -------------------------------------------
echo "local edit" >>"$REPOS_DIR/beta/README.md"
beta_head="$(head_of beta)"
upstream_commit beta "beta v2"
out="$(run pull beta)"
check "pull skips a dirty tree" test "$out" = "beta: dirty tree, skipped"
check "dirty tree keeps its HEAD" test "$(head_of beta)" = "$beta_head"
check "dirty tree keeps its edit" grep -q "local edit" "$REPOS_DIR/beta/README.md"
check "status reports the dirty tree" sh -c "'$SHELL_UNDER_TEST' '$SCRIPT' status beta | grep -q 'beta: main, dirty'"

# --- pull: never touches a feature-branch checkout ------------------------------
git -C "$REPOS_DIR/gamma" checkout --quiet -b feat/work
gamma_head="$(head_of gamma)"
upstream_commit gamma "gamma v2"
out="$(run pull gamma)"
check "pull skips a feature-branch checkout" test "$out" = "gamma: on feat/work, not main, skipped"
check "feature branch stays checked out" test "$(git -C "$REPOS_DIR/gamma" symbolic-ref --short HEAD)" = feat/work
check "feature branch keeps its HEAD" test "$(head_of gamma)" = "$gamma_head"
check "main of the feature-branch checkout is not moved" test "$(git -C "$REPOS_DIR/gamma" rev-parse main)" = "$gamma_head"
check "status names the branch and the default" sh -c "'$SHELL_UNDER_TEST' '$SCRIPT' status gamma | grep -q 'gamma: feat/work (default: main), clean'"

# --- pull: never rewrites local commits ------------------------------------------
echo "local commit" >>"$REPOS_DIR/alpha/README.md"
git -C "$REPOS_DIR/alpha" commit --quiet -am "local work"
local_head="$(head_of alpha)"
out="$(run pull alpha)"
check "pull skips a checkout that is only ahead" test "$out" = "alpha: ahead of origin/main (local commits), skipped"
upstream_commit alpha "alpha v3"
out="$(run pull alpha)"
check "pull skips a branch that cannot fast-forward" test "$out" = "alpha: cannot fast-forward (local commits), skipped"
check "diverged checkout keeps its local commit" test "$(head_of alpha)" = "$local_head"

# --- pull across everything: skips are not failures ------------------------------
run pull >/dev/null
check "pull over all repositories exits 0 when only safety skips happen" test $? -eq 0
check "pull skips a directory that is not a checkout" sh -c "'$SHELL_UNDER_TEST' '$SCRIPT' pull delta | grep -qx 'delta: not a git checkout, skipped'"

# --- never deletes, never rewrites remotes ---------------------------------------
check "an unlisted directory survives every command" test "$(cat "$REPOS_DIR/unlisted/file.txt")" = keep
check "the non-checkout directory survives every command" test "$(cat "$REPOS_DIR/delta/notes.txt")" = keep
for name in alpha beta gamma; do
	check "$name keeps its remote URL" test "$(git -C "$REPOS_DIR/$name" remote get-url origin)" = "$WORK/upstream/$name"
done

# --- detached HEAD, unborn branch and symlinks ------------------------------------
make_upstream epsilon
upstream_commit epsilon "epsilon v2"
cat >"$WORK/edge.json" <<EOF
{"repositories": [
  {"name": "epsilon", "url": "$WORK/upstream/epsilon", "default_branch": "main"},
  {"name": "zeta", "url": "$WORK/upstream/zeta", "default_branch": "main"},
  {"name": "eta", "url": "$WORK/upstream/eta", "default_branch": "main"},
  {"name": "theta", "url": "$WORK/upstream/theta", "default_branch": "main"}
]}
EOF
edge() { REPOS_MANIFEST="$WORK/edge.json" "$SHELL_UNDER_TEST" "$SCRIPT" "$@"; }
edge clone epsilon >/dev/null
git -C "$REPOS_DIR/epsilon" checkout --quiet --detach HEAD~1
detached="$(head_of epsilon)"
check "pull skips a detached HEAD" sh -c "REPOS_MANIFEST='$WORK/edge.json' '$SHELL_UNDER_TEST' '$SCRIPT' pull epsilon | grep -qx 'epsilon: on (detached), not main, skipped'"
check "detached HEAD is not moved" test "$(head_of epsilon)" = "$detached"
git init --quiet -b main "$REPOS_DIR/zeta"
git -C "$REPOS_DIR/zeta" remote add origin "$WORK/upstream/epsilon"
check "pull skips an unborn branch" sh -c "REPOS_MANIFEST='$WORK/edge.json' '$SHELL_UNDER_TEST' '$SCRIPT' pull zeta | grep -qx 'zeta: no commits on main, skipped'"
ln -s "$WORK/nowhere" "$REPOS_DIR/eta"
check "clone skips a dangling symlink" sh -c "REPOS_MANIFEST='$WORK/edge.json' '$SHELL_UNDER_TEST' '$SCRIPT' clone eta | grep -qx 'eta: present, skipped'"
check "clone never writes through a dangling symlink" test ! -e "$WORK/nowhere"
ln -s "$REPOS_DIR/alpha" "$REPOS_DIR/theta"
check "pull never follows a symlinked checkout" sh -c "REPOS_MANIFEST='$WORK/edge.json' '$SHELL_UNDER_TEST' '$SCRIPT' pull theta | grep -qx 'theta: symlink, not followed, skipped'"
check "status never follows a symlinked checkout" sh -c "REPOS_MANIFEST='$WORK/edge.json' '$SHELL_UNDER_TEST' '$SCRIPT' status theta | grep -qx 'theta: symlink, not followed'"

# --- manifest validation: nothing escapes REPOS_DIR, https only -------------------
reject() { # reject "description" 'json entry' [env...]
	local description="$1" entry="$2"
	printf '{"repositories": [%s]}\n' "$entry" >"$WORK/bad.json"
	REPOS_MANIFEST="$WORK/bad.json" REPOS_ALLOW_LOCAL="${3:-}" "$SHELL_UNDER_TEST" "$SCRIPT" clone >/dev/null 2>&1
	check "$description" test $? -eq 2
}
reject "rejects a path-traversal name" '{"name": "../escape", "url": "https://github.com/DailybotHQ/escape.git"}'
reject "rejects a name with a slash" '{"name": "a/b", "url": "https://github.com/DailybotHQ/b.git"}'
reject "rejects the name .." '{"name": "..", "url": "https://github.com/DailybotHQ/x.git"}'
reject "rejects an empty name" '{"name": "", "url": "https://github.com/DailybotHQ/x.git"}'
reject "rejects duplicate names" '{"name": "x", "url": "https://github.com/DailybotHQ/x.git"}, {"name": "x", "url": "https://github.com/DailybotHQ/x.git"}'
reject "rejects a local path without the fixture override" "{\"name\": \"x\", \"url\": \"$WORK/upstream/alpha\"}"
reject "rejects an ext:: URL" '{"name": "x", "url": "ext::sh -c touch% /tmp/pwned"}' 1
reject "rejects an ssh URL" '{"name": "x", "url": "ssh://git@example.com/x.git"}' 1
reject "rejects a URL that looks like an option" '{"name": "x", "url": "--upload-pack=touch"}' 1
reject "rejects a branch that looks like an option" '{"name": "x", "url": "https://github.com/DailybotHQ/x.git", "default_branch": "--orphan"}'
reject "rejects an empty default branch" '{"name": "x", "url": "https://github.com/DailybotHQ/x.git", "default_branch": ""}'
reject "rejects an entry without a url" '{"name": "x"}'
printf 'not json' >"$WORK/bad.json"
REPOS_MANIFEST="$WORK/bad.json" "$SHELL_UNDER_TEST" "$SCRIPT" ls >"$WORK/bad.out" 2>&1
check "invalid JSON exits 2 with a message, not a traceback" sh -c "grep -q 'invalid manifest' '$WORK/bad.out' && ! grep -q Traceback '$WORK/bad.out'"
check "no rejected entry created anything" test ! -e "$WORK/escape" -a ! -e "$REPOS_DIR/x" -a ! -e /tmp/pwned
printf '{"repositories": [{"name": "x", "url": "https://github.com/DailybotHQ/x.git", "role": "", "visibility": "", "gate": "true"}]}\n' >"$WORK/empty-fields.json"
check "empty fields never shift the columns" sh -c "REPOS_MANIFEST='$WORK/empty-fields.json' '$SHELL_UNDER_TEST' '$SCRIPT' ls | grep -qE '^x +true\$'"

# --- a failed clone is reported, not hidden, and never prompts --------------------
printf '{"repositories": [{"name": "unreachable", "url": "https://127.0.0.1:9/none.git"}]}\n' >"$WORK/unreachable.json"
REPOS_MANIFEST="$WORK/unreachable.json" REPOS_ALLOW_LOCAL= "$SHELL_UNDER_TEST" "$SCRIPT" clone >/dev/null 2>&1 </dev/null
check "an unreachable https clone exits 1 without prompting" test $? -eq 1
check "a failed clone leaves no directory behind" test ! -e "$REPOS_DIR/unreachable"
cat >"$WORK/broken.json" <<EOF
{"repositories": [{"name": "ghost", "url": "$WORK/upstream/does-not-exist", "default_branch": "main"}]}
EOF
REPOS_MANIFEST="$WORK/broken.json" "$SHELL_UNDER_TEST" "$SCRIPT" clone >/dev/null 2>&1
check "a failed clone exits 1" test $? -eq 1

# --- the tracked manifest -----------------------------------------------------------
check "tracked manifest is valid and lists the hub repositories" python3 - "$HUB_ROOT/repositories/manifest.json" <<'PY'
import json, sys
repos = json.load(open(sys.argv[1]))['repositories']
names = {r['name'] for r in repos}
required = {'deepworkplan-skill', 'herdr-peers', 'coding-agents-kit',
            'devcontainer-kit', 'deepworkplan-vim', 'ai-diff-reviewer',
            'agent-skill'}
assert required <= names, required - names
for r in repos:
    assert r['url'].startswith('https://github.com/DailybotHQ/'), r['url']
    assert r['url'].endswith('/%s.git' % r['name']), r['url']
    assert r['visibility'] == 'public', r['name']
    for key in ('default_branch', 'role', 'gate', 'summary'):
        assert r.get(key), (r['name'], key)
shared = [r for r in repos if r['name'] == 'agent-skill'][0]
assert 'Dailybot hub' in shared.get('shared_with', ''), 'agent-skill must name its co-owner'
PY

# --- bash 3.2 safety --------------------------------------------------------------
check "script avoids bash 4+ constructs" sh -c "! grep -nE 'declare -A|mapfile|readarray|\\\$\\{[A-Za-z_]+(,,|\\^\\^)|\\|&|&>>|coproc' '$SCRIPT'"
check "script never deletes or rewrites remotes" sh -c "! grep -nE '(^|[^a-z])rm |git (-C [^ ]+ )?(remote (set-url|remove|rm)|reset|clean|stash|push|branch -[dD])' '$SCRIPT'"

echo "# shell: $("$SHELL_UNDER_TEST" -c 'echo $BASH_VERSION')"
echo "# $passed passed, $failed failed"
[ "$failed" -eq 0 ]
