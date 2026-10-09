#!/usr/bin/env bash
# Public-hygiene check: fail when a tracked file carries content that must
# never be published from this repository.
#
#   bash scripts/check-public-hygiene.sh [--root DIR]
#
# Scans every file `git ls-files` lists (regular files only, binary files
# skipped), except the vendored upstream packs under .agents/skills/
# (deepworkplan, dailybot, ai-diff-reviewer — refreshed from their releases;
# the repository's own skills there ARE scanned) and the .claude/ symlink. Prints `path:line: <rule>` for each hit and never prints
# the matched text, so a real secret is not echoed into a CI log.
#
# Rules:
#   personal-path   absolute home paths (/Users/<name>, /home/<name>); a
#                   path inside a directory named `home` (src/components/
#                   home/…) is not absolute, and the stock service accounts
#                   of containers and CI runners (node, runner, dev, vscode,
#                   ubuntu, user) are not personal
#   private-name    the private organization, private repositories and
#                   internal tooling or mesh names
#   private-email   @dailybot.com addresses other than the public aliases
#   secret-*        credential shapes (AWS, GitHub, OpenAI/Anthropic, Slack,
#                   Google, private-key headers, quoted assignments >= 16;
#                   a quoted value that is a variable reference such as
#                   "${API_KEY}" or "$API_KEY" (upper-case), or a URL without embedded
#                   credentials, is not a literal secret; secret-env catches
#                   unquoted KEY=value lines such as a filled-in .env file)
#
# A test fixture that needs a secret-shaped string lists it in
# .public-hygiene-allow as `<path> <secret-rule> <reason>`. Only secret-*
# rules can be allowed, the reason is mandatory, and the hit line itself
# must say it is fake (fake, test, planted or example).
#
# Exit codes: 0 clean, 1 hits, 2 usage or allow-list error.
# Dependencies: bash, git, grep. No network.
set -u

ROOT=.
while [ $# -gt 0 ]; do
  case "$1" in
    --root) [ $# -ge 2 ] || { echo "usage: $0 [--root DIR]" >&2; exit 2; }; ROOT=$2; shift 2 ;;
    -h | --help) sed -n '2,27p' "$0"; exit 0 ;;
    *) echo "usage: $0 [--root DIR]" >&2; exit 2 ;;
  esac
done
cd "$ROOT" 2>/dev/null || { echo "check-public-hygiene: no such directory: $ROOT" >&2; exit 2; }
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "check-public-hygiene: $ROOT is not a git work tree" >&2
  exit 2
}

SELF=scripts/check-public-hygiene.sh
ALLOW=.public-hygiene-allow
FAKE_MARKER='fake|test|planted|example'
# Characters that may surround a whole name (anything else ends it).
NB='(^|[^A-Za-z0-9_.-])'
NE='([^A-Za-z0-9_-]|$)'

# rule-id <TAB> grep -E pattern <TAB> i (case-insensitive) or -
# (a function, not $(cat <<EOF): bash 3.2 mis-parses quotes in that form)
rules() {
  cat <<EOF
personal-path	(^|[^A-Za-z0-9_.~/-])/(Users|home)/[A-Za-z0-9][A-Za-z0-9._-]*	-
private-name	DailyBot-Inc	i
private-name	${NB}(dailybot-core|coding-agent-host-kit|dailybot-private-skills|api-services|chatbot-functions|discord-gateway|msteams-app-manifesto|labs-projects)${NE}	i
private-name	${NB}(dbdev|dailybot-dev|dailybot-peers|dailybot-workspaces)${NE}	i
private-name	dailybot-ws-|\[dailybot-mesh\]	i
private-email	[A-Za-z0-9._%+-]+@dailybot\.com	i
secret-aws	(AKIA|ASIA)[0-9A-Z]{16}	-
secret-github	(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,}	-
secret-ai	sk-ant-[A-Za-z0-9_-]{20,}|sk-(proj|svcacct|admin)-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}	-
secret-slack	xox[abposr]-[A-Za-z0-9-]{10,}	-
secret-google	AIza[0-9A-Za-z_-]{35}	-
secret-private-key	-----BEGIN ([A-Z0-9]+ )*PRIVATE KEY-----	-
secret-assignment	(api[_-]?key|secret|token|passw(or)?d|access[_-]?key)[A-Za-z0-9_]*["']?[[:space:]]*[:=][[:space:]]*["'][^"'[:space:]]{16,}["']	i
secret-env	^[[:space:]]*(export[[:space:]]+)?[A-Z0-9_]*(API_?KEY|SECRET|TOKEN|PASSWORD|PASSWD|ACCESS_KEY)[A-Z0-9_]*=[^"'[:space:]$]{16,}	-
EOF
}

# Read and validate the allow-list: "<path> <rule> <reason…>"; # comments.
allow_pairs=""
if [ -f "$ALLOW" ]; then
  n=0
  while IFS= read -r line || [ -n "$line" ]; do
    n=$((n + 1))
    case "$line" in '' | '#'*) continue ;; esac
    # shellcheck disable=SC2086  # split the entry into fields on purpose
    set -- $line
    if [ $# -lt 3 ]; then
      echo "$ALLOW:$n: entry needs '<path> <rule> <reason>'" >&2
      exit 2
    fi
    case "$2" in
      secret-*) ;;
      *) echo "$ALLOW:$n: only secret-* rules can be allowed (got '$2')" >&2; exit 2 ;;
    esac
    allow_pairs="$allow_pairs
$1 $2"
  done <"$ALLOW"
fi

is_allowed() { # path rule
  printf '%s\n' "$allow_pairs" | grep -qxF "$1 $2"
}

# Tracked regular files outside the vendored pack.
files=$(git ls-files | grep -vE '^\.(agents|claude)/skills/(deepworkplan|dailybot|ai-diff-reviewer)/' | while IFS= read -r f; do
  if [ -f "$f" ] && [ ! -L "$f" ]; then printf '%s\n' "$f"; fi
done)

hits=0
report() { # path line rule [note]
  echo "$1:$2: $3${4:+ ($4)}"
  hits=$((hits + 1))
}

while IFS='	' read -r rule pattern flag; do
  [ -n "$rule" ] || continue
  gflags=-nIE
  [ "$flag" = i ] && gflags=-nIiE
  matches=$(printf '%s\n' "$files" | while IFS= read -r f; do
    [ -n "$f" ] || continue
    # The rule definitions themselves spell the private names.
    case "$rule" in (personal-path | secret-*) ;; (*) [ "$f" = "$SELF" ] && continue ;; esac
    grep -H "$gflags" -e "$pattern" -- "$f" 2>/dev/null
  done)
  [ -n "$matches" ] || continue
  while IFS= read -r m; do
    path=${m%%:*}
    rest=${m#*:}
    lineno=${rest%%:*}
    text=${rest#*:}
    case "$rule" in
      personal-path)
        bad=$(printf '%s\n' "$text" | grep -oE "$pattern" | sed 's#^[^/]*##' |
          grep -vxE '/(Users|home)/(node|runner|runneradmin|dev|vscode|ubuntu|user)' || true)
        [ -n "$bad" ] && report "$path" "$lineno" "$rule"
        ;;
      private-email)
        bad=$(printf '%s\n' "$text" | grep -oiE '[A-Za-z0-9._%+-]+@dailybot\.com' |
          grep -viE '^(security|support|ops|conduct)@dailybot\.com$' || true)
        [ -n "$bad" ] && report "$path" "$lineno" "$rule"
        ;;
      secret-assignment)
        literal=$(printf '%s\n' "$text" | grep -oiE "$pattern" |
          grep -vE "[:=][[:space:]]*[\"'](\\\$\\{?[A-Z_][A-Z0-9_]*\\}?|https?://[^@\"'[:space:]]*)[\"']\$" || true)
        if [ -z "$literal" ]; then
          :
        elif is_allowed "$path" "$rule"; then
          printf '%s\n' "$text" | grep -qiE "$FAKE_MARKER" ||
            report "$path" "$lineno" "$rule" "allow-listed, but the line does not say it is fake"
        else
          report "$path" "$lineno" "$rule"
        fi
        ;;
      secret-env)
        # A documentation placeholder (your-key, <key>, …example…) is not a
        # secret; anything else is.
        value=${text#*=}
        if printf '%s\n' "$value" | grep -qiE '^(your|<)|example|placeholder|changeme|xxxx'; then
          :
        elif is_allowed "$path" "$rule"; then
          printf '%s\n' "$text" | grep -qiE "$FAKE_MARKER" ||
            report "$path" "$lineno" "$rule" "allow-listed, but the line does not say it is fake"
        else
          report "$path" "$lineno" "$rule"
        fi
        ;;
      secret-*)
        if is_allowed "$path" "$rule"; then
          printf '%s\n' "$text" | grep -qiE "$FAKE_MARKER" ||
            report "$path" "$lineno" "$rule" "allow-listed, but the line does not say it is fake"
        else
          report "$path" "$lineno" "$rule"
        fi
        ;;
      *) report "$path" "$lineno" "$rule" ;;
    esac
  done <<EOF_M
$matches
EOF_M
done <<EOF_R
$(rules)
EOF_R

count=$(printf '%s\n' "$files" | grep -c .)
if [ "$hits" -gt 0 ]; then
  echo "check-public-hygiene: $hits hit(s) in $count tracked files" >&2
  exit 1
fi
echo "check-public-hygiene: clean ($count tracked files)"
