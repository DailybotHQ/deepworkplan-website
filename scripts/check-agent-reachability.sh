#!/usr/bin/env bash
# check-agent-reachability.sh — probe whether major AI crawler User-Agents can
# reach the site homepage. Evidence tool for the is-agentic scan items
# "Agent crawler reachability" and "Not blocked by bot detection".
#
# Verdicts come from the HTTP status of a single GET per User-Agent:
#   200            -> reachable
#   403/429/503    -> blocked (typical Cloudflare bot-mitigation responses)
#   anything else  -> unexpected
#   curl failure   -> error
#
# Honest limitations, on purpose:
# - Some Cloudflare blocks are JA3/TLS-fingerprint or behavior based, so a UA
#   spoof can occasionally pass where the real crawler is blocked. This script
#   is evidence, not proof — the is-agentic re-scan is the arbiter.
# - robots.txt is NOT checked here: it already allows every UA below (see
#   public/robots.txt). Blocked verdicts originate at the Cloudflare edge —
#   see docs/technical/AGENT_CRAWLER_ACCESS_RUNBOOK.md for the fix path.
#
# Usage:
#   check-agent-reachability.sh [--origin https://deepworkplan.com]
#
# Exit codes:
#   0  no User-Agent was blocked
#   1  at least one User-Agent was blocked (this is the finding, not a bug)
#   2  usage error
#
# Read-only: performs one GET per User-Agent against the homepage. No POSTs,
# no auth, no state.

set -euo pipefail

ORIGIN="https://deepworkplan.com"

usage() {
  cat <<'EOF'
Usage: check-agent-reachability.sh [--origin https://deepworkplan.com]

Probes the homepage once per AI crawler User-Agent and prints a verdict table.

Options:
  --origin URL   Base URL to probe (default: https://deepworkplan.com).
  -h, --help     Show this help.

Exit codes: 0 = all reachable, 1 = at least one blocked, 2 = usage error.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --origin)
      [[ $# -ge 2 ]] || { echo "error: --origin requires a value" >&2; exit 2; }
      ORIGIN="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

# name|User-Agent pairs — mirrors public/robots.txt "AI/LLM Crawlers" section
# plus the fetch-style agents (ora-agent) the is-agentic scanner itself uses.
USER_AGENTS=(
  "GPTBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
  "ChatGPT-User|Mozilla/5.0 AppleWebKit/537.36 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)"
  "ClaudeBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)"
  "Claude-Web|Mozilla/5.0 AppleWebKit/537.36 (compatible; Claude-Web/1.0; +claudebot@anthropic.com)"
  "anthropic-ai|Mozilla/5.0 AppleWebKit/537.36 (compatible; anthropic-ai/1.0; +claudebot@anthropic.com)"
  "Google-Extended|Mozilla/5.0 AppleWebKit/537.36 (compatible; Google-Extended/1.0)"
  "DeepSeekBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; DeepSeekBot/1.0; +https://deepseek.com)"
  "PerplexityBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)"
  "Perplexity-User|Mozilla/5.0 AppleWebKit/537.36 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexitybot)"
  "OAI-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)"
  "Applebot-Extended|Mozilla/5.0 AppleWebKit/537.36 (compatible; Applebot-Extended/1.0; +https://support.apple.com)"
  "Meta-ExternalAgent|Mozilla/5.0 AppleWebKit/537.36 (compatible; meta-externalagent/1.1; +https://developers.facebook.com/docs/sharing/webmasters/crawler)"
  "Amazonbot|Mozilla/5.0 AppleWebKit/537.36 (compatible; Amazonbot/1.0; +https://developer.amazon.com/support/amazonbot)"
  "Bytespider|Mozilla/5.0 AppleWebKit/537.36 (compatible; Bytespider/1.0; +https://zhanzhang.toutiao.com/)"
  "CCBot|Mozilla/5.0 AppleWebKit/537.36 (compatible; CCBot/2.0; +https://commoncrawl.org/faq/)"
  "cohere-ai|Mozilla/5.0 AppleWebKit/537.36 (compatible; cohere-ai/1.0; +https://docs.cohere.com)"
  "ora-agent|Mozilla/5.0 AppleWebKit/537.36 (compatible; ora-agent/1.0)"
)

blocked=0
total=0
results=()

for entry in "${USER_AGENTS[@]}"; do
  name="${entry%%|*}"
  ua="${entry#*|}"
  total=$((total + 1))
  code="$(curl -sS -o /dev/null -w '%{http_code}' -A "$ua" --max-time 20 "${ORIGIN}/" 2>/dev/null || true)"
  case "$code" in
    200) verdict="reachable" ;;
    403|429|503) verdict="blocked"; blocked=$((blocked + 1)) ;;
    "") verdict="error: no response (curl failed or timed out)" ;;
    *) verdict="unexpected: ${code}" ;;
  esac
  results+=("$(printf '%-20s %-10s %s' "$name" "$code" "$verdict")")
done

printf '%-20s %-10s %s\n' "USER-AGENT" "STATUS" "VERDICT"
printf '%s\n' "----------------------------------------------------------------"
for line in "${results[@]}"; do
  printf '%s\n' "$line"
done
printf '%s\n' "----------------------------------------------------------------"
printf 'blocked: %d/%d\n' "$blocked" "$total"

if [[ "$blocked" -gt 0 ]]; then
  echo "One or more AI crawlers are blocked at the edge. Fix path: docs/technical/AGENT_CRAWLER_ACCESS_RUNBOOK.md"
  exit 1
fi

exit 0
