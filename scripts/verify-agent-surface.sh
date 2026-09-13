#!/usr/bin/env bash
# verify-agent-surface.sh — one-command verification of the public agent surface
# of deepworkplan.com, in three tiers:
#
#   Tier 0  artifacts  Every machine-readable file parses and carries the
#                      version stamped by scripts/stamp-versions.mjs; OpenAPI
#                      operationIds are unique; robots.txt keeps the AI Allow
#                      blocks. No server needed; runs against the build output.
#   Tier 1  preview    Static-server behavior via `astro preview` against the
#                      built dist/ (HTML 200s, .md endpoints, /api/v1 JSONs,
#                      real 404). NOTE: astro preview does NOT run Cloudflare
#                      Pages Functions, so nothing Function-dependent (Accept
#                      content negotiation, X-API-Version / RateLimit-* headers,
#                      /api/mcp, middleware 404 bodies) is asserted here.
#   Tier 2  edge       Best-effort: `wrangler pages dev` runs the Functions —
#                      markdown 404 bodies, MCP initialize with header
#                      contracts, JSON 404, informational 429 burst. If
#                      wrangler cannot start in this environment the tier is
#                      SKIPPED loudly with a pointer to the live runbook; the
#                      overall exit code stays 0 as long as Tiers 0–1 passed.
#
# Usage:
#   pnpm run agents:verify [--dist DIR] [--port N] [--skip-edge] [--help]
#
# Exit codes: 0 = Tiers 0–1 green (Tier 2 green or explicitly skipped);
#             1 = at least one Tier 0/1 check failed; 2 = usage/setup error.

set -euo pipefail

DIST="dist"
PORT="4399"
EDGE_PORT="4398"
SKIP_EDGE="0"

usage() {
  cat <<'HELP'
verify-agent-surface.sh — verify the deepworkplan.com agent surface locally.

Options:
  --dist DIR     Build output to verify (default: dist)
  --port N       Port for the astro preview server, Tier 1 (default: 4399)
  --edge-port N  Port for wrangler pages dev, Tier 2 (default: 4398)
  --skip-edge    Do not attempt the wrangler tier at all
  --help         Show this help

Tiers: 0 artifacts (no server) · 1 astro preview (no Functions) ·
2 wrangler pages dev (best-effort, skips loudly when unavailable).
HELP
}

while [ $# -gt 0 ]; do
  case "$1" in
    --dist) DIST="${2:?--dist needs a value}"; shift 2 ;;
    --port) PORT="${2:?--port needs a value}"; shift 2 ;;
    --edge-port) EDGE_PORT="${2:?--edge-port needs a value}"; shift 2 ;;
    --skip-edge) SKIP_EDGE="1"; shift ;;
    --help) usage; exit 0 ;;
    *) echo "Unknown option: $1 (try --help)" >&2; exit 2 ;;
  esac
done

PASS=0
FAIL=0
SKIP=0

row() { # row <status> <name> <detail>
  printf '  [%s] %-34s %s\n' "$1" "$2" "$3"
}
passed() { PASS=$((PASS + 1)); row PASS "$1" "$2"; }
failed() { FAIL=$((FAIL + 1)); row FAIL "$1" "$2"; }
skipped() { SKIP=$((SKIP + 1)); row SKIP "$1" "$2"; }

if [ ! -d "$DIST" ]; then
  echo "error: build output '$DIST' not found — run 'pnpm run build' first" >&2
  exit 2
fi
PKG_VERSION=$(node -p 'require("./package.json").version')
export PKG_VERSION

# ─── Tier 0 — artifacts ─────────────────────────────────────────────────────
echo
echo "Tier 0 — artifacts (dist: $DIST, expected version: $PKG_VERSION)"

# JSON parse + optional field assertions helper. Prints node's error on failure.
json_check() { # json_check <label> <relpath> [jq-ish node expr: string]
  local label="$1" rel="$2" expr="${3:-}"
  local out
  if out=$(DIST="$DIST" EXPR="$expr" node -e '
    const fs = require("fs");
    const doc = JSON.parse(fs.readFileSync(`${process.env.DIST}/${process.argv[1]}`, "utf8"));
    if (process.env.EXPR) {
      const got = eval(process.env.EXPR);
      if (got !== true) { console.error(`expression not satisfied: ${process.env.EXPR} => ${got}`); process.exit(1); }
    }
  ' "$rel" 2>&1); then
    passed "$label" "parses${expr:+ + contract ok}"
  else
    failed "$label" "$out"
  fi
}

# OpenAPI: parse, per-method operations all carry operationId, ids unique,
# info.version matches the stamped package version.
if OUT=$(DIST="$DIST" PKG_VERSION="$PKG_VERSION" node -e '
  const fs = require("fs");
  const spec = JSON.parse(fs.readFileSync(`${process.env.DIST}/openapi.json`, "utf8"));
  const METHODS = new Set(["get","post","put","patch","delete","head","options","trace"]);
  const ops = [];
  for (const [p, item] of Object.entries(spec.paths))
    for (const [m, op] of Object.entries(item))
      if (METHODS.has(m)) ops.push(op);
  const missing = ops.filter((op) => !op.operationId);
  const ids = ops.map((op) => op.operationId);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (ops.length === 0) { console.error("no operations found"); process.exit(1); }
  if (missing.length) { console.error(`${missing.length} operation(s) without operationId`); process.exit(1); }
  if (dupes.length) { console.error(`duplicate operationIds: ${[...new Set(dupes)].join(", ")}`); process.exit(1); }
  if (spec.info.version !== process.env.PKG_VERSION) { console.error(`info.version ${spec.info.version} != ${process.env.PKG_VERSION}`); process.exit(1); }
  console.log(ops.length);
' 2>&1); then
  passed "openapi.json" "$OUT operations, unique ids, version $PKG_VERSION"
else
  failed "openapi.json" "$OUT"
fi

json_check "well-known/api-catalog" ".well-known/api-catalog" \
  'Array.isArray(doc.linkset) && doc.linkset.every((e) => e.anchor && Array.isArray(e.links) && e.links.every((l) => l.rel && l.href)) === true'
json_check "well-known/ai-catalog.json" ".well-known/ai-catalog.json"
json_check "well-known/mcp.json" ".well-known/mcp.json" \
  'doc.version === process.env.PKG_VERSION'
json_check "well-known/mcp/server-card.json" ".well-known/mcp/server-card.json" \
  'doc.serverInfo.version === process.env.PKG_VERSION'
json_check "well-known/oauth-authorization-server" ".well-known/oauth-authorization-server"
json_check "well-known/oauth-protected-resource" ".well-known/oauth-protected-resource"
json_check "well-known/agent-skills/index.json" ".well-known/agent-skills/index.json" \
  'Array.isArray(doc.skills) && doc.skills.length > 0 === true'
json_check "well-known/dwp.json" ".well-known/dwp.json"
json_check "well-known/dwp-trust.json" ".well-known/dwp-trust.json"
json_check "api/health.json" "api/health.json" \
  'doc.version === process.env.PKG_VERSION'

for f in api/v1/index.json api/v1/sections.json api/v1/pages.json api/v1/health.json; do
  json_check "$f" "$f" 'doc.apiVersion === "v1" && doc.version === process.env.PKG_VERSION'
done

# Text artifacts: exist, non-empty, carry the brand and agent pointers.
text_check() { # text_check <label> <relpath> <required-substring>...
  local label="$1" rel="$2"; shift 2
  local file="$DIST/$rel"
  if [ ! -s "$file" ]; then failed "$label" "missing or empty"; return; fi
  local needle
  for needle in "$@"; do
    if ! grep -qF -- "$needle" "$file"; then failed "$label" "missing: $needle"; return; fi
  done
  passed "$label" "present${*:+ + required strings ok}"
}
text_check "llms.txt" "llms.txt" "Deep Work Plan" "/developers" "/init"
text_check "llms-full.txt" "llms-full.txt" "Deep Work Plan"
text_check "auth.md" "auth.md"
text_check "robots.txt" "robots.txt" "User-agent: GPTBot" "User-agent: ClaudeBot" "User-agent: ChatGPT-User" "User-agent: PerplexityBot"

# ─── Tier 1 — static server (astro preview; no Pages Functions) ─────────────
echo
echo "Tier 1 — static server (astro preview on 127.0.0.1:$PORT; Functions NOT running)"

PREVIEW_PID=""
EDGE_PID=""

# Kill a server PID and its whole descendant tree (npx -> sh -> node -> workerd);
# killing only the wrapper PID leaves workerd orphaned and holding ports/FDs.
kill_tree() { # kill_tree <pid>
  local pid="${1:-}"
  [ -z "$pid" ] && return 0
  local child
  for child in $(ps -o pid= --ppid "$pid" 2>/dev/null); do
    kill_tree "$child"
  done
  kill "$pid" 2>/dev/null || true
}

cleanup() {
  if [ -n "$PREVIEW_PID" ]; then kill_tree "$PREVIEW_PID"; PREVIEW_PID=""; fi
  if [ -n "$EDGE_PID" ]; then kill_tree "$EDGE_PID"; EDGE_PID=""; fi
  # The astro preview can be re-parented (PPID 1) when the pnpm wrapper dies
  # first, escaping kill_tree; match it by the port we launched it on.
  pkill -f -- "preview --port $PORT" 2>/dev/null || true
  # workerd can outlive the wrangler CLI and be re-parented (PPID 1), escaping
  # kill_tree; match it by the exact socket-addr it was given for this port.
  pkill -f "socket-addr=entry=localhost:$EDGE_PORT" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

pnpm exec astro preview --port "$PORT" --host 127.0.0.1 > /tmp/agents-verify-preview.log 2>&1 &
PREVIEW_PID=$!

READY=0
for _ in $(seq 1 60); do
  if curl -sf -o /dev/null "http://127.0.0.1:$PORT/"; then READY=1; break; fi
  if ! kill -0 "$PREVIEW_PID" 2>/dev/null; then break; fi
  sleep 0.5
done
if [ "$READY" != "1" ]; then
  echo "  error: astro preview did not become ready — see /tmp/agents-verify-preview.log" >&2
  exit 2
fi

http_check() { # http_check <label> <path> <expected-status> <expected-content-type-fragment>
  local label="$1" path="$2" want="$3" want_ct="$4"
  local got ct
  got=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT$path")
  ct=$(curl -sI "http://127.0.0.1:$PORT$path" | tr -d '\r' | awk 'tolower($1)=="content-type:"{print $2}')
  if [ "$got" != "$want" ]; then
    failed "$label" "status $got (want $want)"
    return
  fi
  if [ -n "$want_ct" ] && ! printf '%s' "$ct" | grep -qi -- "$want_ct"; then
    failed "$label" "content-type '$ct' (want *$want_ct*)"
    return
  fi
  passed "$label" "$want ${ct:-}"
}

http_check "GET /" "/" 200 "text/html"
http_check "GET /developers" "/developers" 200 "text/html"
http_check "GET /es/developers" "/es/developers" 200 "text/html"
http_check "GET /zh/developers" "/zh/developers" 200 "text/html"
http_check "GET /developers.md" "/developers.md" 200 "text/markdown"
http_check "GET /es/developers.md" "/es/developers.md" 200 "text/markdown"
http_check "GET /init.md" "/init.md" 200 "text/markdown"
http_check "GET /api/v1/index.json" "/api/v1/index.json" 200 "application/json"
http_check "GET /api/v1/sections.json" "/api/v1/sections.json" 200 "application/json"
http_check "GET /api/v1/pages.json" "/api/v1/pages.json" 200 "application/json"
http_check "GET /api/v1/health.json" "/api/v1/health.json" 200 "application/json"
http_check "GET /openapi.json" "/openapi.json" 200 "application/json"
http_check "GET /llms.txt" "/llms.txt" 200 "text/plain"
http_check "GET /no-such-page (404)" "/no-such-page" 404 ""

skipped "edge-only behaviors" "Accept negotiation, X-API-Version, RateLimit-*, /api/mcp need Functions (Tier 2 or live)"

kill_tree "$PREVIEW_PID"
PREVIEW_PID=""

# ─── Tier 2 — edge (wrangler pages dev, best-effort) ────────────────────────
echo
echo "Tier 2 — edge (wrangler pages dev on localhost:$EDGE_PORT; best-effort)"

if [ "$SKIP_EDGE" = "1" ]; then
  skipped "wrangler tier" "skipped by --skip-edge; run live per LIVE_VERIFICATION.md (edge section)"
elif ! command -v npx >/dev/null 2>&1; then
  skipped "wrangler tier" "SKIPPED (npx unavailable): run these checks live per LIVE_VERIFICATION.md"
else
  WRANGLER_LOG=/tmp/agents-verify-wrangler.log
  # workerd start can hit the same probabilistic container mount race as the
  # build (ENOENT under .wrangler/tmp) — try twice before declaring the tier
  # unavailable for this environment.
  READY=0
  for ATTEMPT in 1 2; do
    CI=true WRANGLER_SEND_METRICS=false \
      npx --yes wrangler@latest pages dev "$DIST" --port "$EDGE_PORT" \
      --show-interactive-dev-session=false < /dev/null > "$WRANGLER_LOG" 2>&1 &
    EDGE_PID=$!
    for _ in $(seq 1 90); do
      # workerd binds "localhost" (may resolve to ::1), so probe the name,
      # not the IPv4 literal, or readiness can never be observed.
      if curl -sf -o /dev/null "http://localhost:$EDGE_PORT/"; then READY=1; break; fi
      if ! kill -0 "$EDGE_PID" 2>/dev/null; then break; fi
      sleep 1
    done
    [ "$READY" = "1" ] && break
    kill_tree "$EDGE_PID"
    EDGE_PID=""
    echo "  [info] wrangler attempt $ATTEMPT did not become ready (see $WRANGLER_LOG)"
  done
  if [ "$READY" != "1" ]; then
    skipped "wrangler tier" "SKIPPED (wrangler unavailable): run these checks live per LIVE_VERIFICATION.md (edge section); log: $WRANGLER_LOG"
    kill_tree "$EDGE_PID"
    EDGE_PID=""
  else
    E="http://localhost:$EDGE_PORT"

    edge_status() { # edge_status <path> <accept-header-or-empty>
      if [ -n "$2" ]; then
        curl -s -H "Accept: $2" -o /dev/null -w '%{http_code}' "$E$1"
      else
        curl -s -o /dev/null -w '%{http_code}' "$E$1"
      fi
    }

    # Markdown 404 body for a non-HTML client (Task 2 predicate).
    MD_STATUS=$(edge_status "/no-such-page" "*/*")
    MD_CT=$(curl -s -H "Accept: */*" -o /dev/null -w '%{content_type}' "$E/no-such-page")
    MD_BODY=$(curl -s -H "Accept: */*" "$E/no-such-page" | head -c 400)
    if [ "$MD_STATUS" = "404" ] && printf '%s' "$MD_CT" | grep -qi markdown; then
      passed "markdown 404 (Accept: */*)" "404 + $MD_CT"
    else
      failed "markdown 404 (Accept: */*)" "status $MD_STATUS, content-type '$MD_CT', body: ${MD_BODY:0:80}"
    fi

    # HTML 404 for a browser-like client.
    BR_STATUS=$(edge_status "/no-such-page" "text/html,application/xhtml+xml,*/*")
    if [ "$BR_STATUS" = "404" ]; then
      passed "HTML 404 (browser Accept)" "404"
    else
      failed "HTML 404 (browser Accept)" "status $BR_STATUS (want 404)"
    fi

    # Recovery Link header present on every 404 channel (Task 3): API JSON,
    # Markdown body, and the HTML passthrough alike.
    LINK_MD=$(curl -s -H "Accept: */*" -D - -o /dev/null "$E/no-such-page" | tr -d '\r')
    LINK_HTML=$(curl -s -H "Accept: text/html,application/xhtml+xml,*/*" -D - -o /dev/null "$E/no-such-page" | tr -d '\r')
    LINK_API=$(curl -s -D - -o /dev/null "$E/api/nope" | tr -d '\r')
    if printf '%s' "$LINK_MD" | grep -qi 'rel="sitemap"' \
      && printf '%s' "$LINK_HTML" | grep -qi 'rel="sitemap"' \
      && printf '%s' "$LINK_API" | grep -qi 'rel="sitemap"'; then
      passed "404 Link recovery header (all three channels)" 'rel="sitemap" present'
    else
      failed "404 Link recovery header (all three channels)" "markdown:$(printf '%s' "$LINK_MD" | grep -io 'link:.*' || echo none); html:$(printf '%s' "$LINK_HTML" | grep -io 'link:.*' || echo none); api:$(printf '%s' "$LINK_API" | grep -io 'link:.*' || echo none)"
    fi

    # Markdown body starts with the recovery document's H1 (full-credit signal).
    MD_FIRST_LINE=$(printf '%s' "$MD_BODY" | head -n 1)
    if [ "$MD_FIRST_LINE" = "# 404 — Not Found" ]; then
      passed "markdown 404 body first line" "$MD_FIRST_LINE"
    else
      failed "markdown 404 body first line" "got: $MD_FIRST_LINE"
    fi

    # Extension-bearing unknown path: explicit Markdown/JSON Accept still gets
    # the Markdown recovery body; a bare wildcard Accept keeps the HTML 404
    # (Task 3 eligibility — explicitlyAcceptsMarkdownOrJson).
    EXT_EXPLICIT_STATUS=$(edge_status "/nope.json" "application/json")
    EXT_EXPLICIT_CT=$(curl -s -H "Accept: application/json" -o /dev/null -w '%{content_type}' "$E/nope.json")
    if [ "$EXT_EXPLICIT_STATUS" = "404" ] && printf '%s' "$EXT_EXPLICIT_CT" | grep -qi markdown; then
      passed "extension-bearing 404 (explicit Accept: application/json)" "404 + $EXT_EXPLICIT_CT"
    else
      failed "extension-bearing 404 (explicit Accept: application/json)" "status $EXT_EXPLICIT_STATUS, content-type '$EXT_EXPLICIT_CT' (want 404 markdown)"
    fi
    EXT_WILDCARD_STATUS=$(edge_status "/nope.json" "*/*")
    EXT_WILDCARD_CT=$(curl -s -H "Accept: */*" -o /dev/null -w '%{content_type}' "$E/nope.json")
    if [ "$EXT_WILDCARD_STATUS" = "404" ] && printf '%s' "$EXT_WILDCARD_CT" | grep -qi html; then
      passed "extension-bearing 404 (wildcard Accept stays HTML)" "404 + $EXT_WILDCARD_CT"
    else
      failed "extension-bearing 404 (wildcard Accept stays HTML)" "status $EXT_WILDCARD_STATUS, content-type '$EXT_WILDCARD_CT' (want 404 html)"
    fi

    # MCP initialize: 200 JSON-RPC result + X-API-Version + RateLimit headers.
    MCP_RESP=$(curl -s -D /tmp/agents-verify-mcp-headers.txt -o /tmp/agents-verify-mcp-body.json \
      -X POST -H 'Content-Type: application/json' -H 'Accept: application/json, text/*' \
      -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}' \
      -w '%{http_code}' "$E/api/mcp")
    MCP_CT=$(curl -s -X POST -H 'Content-Type: application/json' -H 'Accept: application/json, text/*' \
      -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18"}}' \
      -o /dev/null -w '%{content_type}' "$E/api/mcp")
    if [ "$MCP_RESP" = "200" ] && grep -qi 'serverInfo' /tmp/agents-verify-mcp-body.json \
      && grep -qi '^x-api-version: v1' /tmp/agents-verify-mcp-headers.txt \
      && grep -Eqi '^ratelimit-(policy|limit|remaining|reset)' /tmp/agents-verify-mcp-headers.txt; then
      passed "POST /api/mcp initialize" "200 + serverInfo + X-API-Version + RateLimit-* headers"
    else
      failed "POST /api/mcp initialize" "status $MCP_RESP, ct '$MCP_CT', headers: $(tr -d '\r' < /tmp/agents-verify-mcp-headers.txt | grep -Ei '^(x-api-version|ratelimit-)' | tr '\n' ';' || echo none)"
    fi

    # JSON 404 for an unknown API path.
    API404_STATUS=$(edge_status "/api/nope" "*/*")
    API404_CT=$(curl -s -H "Accept: */*" -o /dev/null -w '%{content_type}' "$E/api/nope")
    if [ "$API404_STATUS" = "404" ] && printf '%s' "$API404_CT" | grep -qi json; then
      passed "GET /api/nope" "404 + $API404_CT"
    else
      failed "GET /api/nope" "status $API404_STATUS, content-type '$API404_CT' (want 404 JSON)"
    fi

    # Informational only (not asserted): whether the limiter trips within a burst.
    INFO_429=$(curl -s -o /dev/null -X POST -H 'Content-Type: application/json' -H 'Accept: application/json, text/*' \
      -d '{"jsonrpc":"2.0","id":1,"method":"ping"}' -w '%{http_code}' "$E/api/mcp" --next -s -o /dev/null -X POST \
      -H 'Content-Type: application/json' -H 'Accept: application/json, text/*' \
      -d '{"jsonrpc":"2.0","id":2,"method":"ping"}' -w '%{http_code}' "$E/api/mcp")
    echo "  [info] rate-limit burst sample (informational, not asserted): $INFO_429"

    kill_tree "$EDGE_PID"
    EDGE_PID=""
  fi
fi

# ─── Summary ────────────────────────────────────────────────────────────────
echo
echo "Summary: PASS=$PASS FAIL=$FAIL SKIP=$SKIP"
if [ "$FAIL" -gt 0 ]; then
  echo "result: FAILED — fix the product surface, do not weaken these checks"
  exit 1
fi
EDGE_NOTE="green or skipped-with-pointer"
[ "$SKIP_EDGE" = "1" ] && EDGE_NOTE="skipped by --skip-edge flag"
echo "result: OK — Tiers 0–1 green; Tier 2 $EDGE_NOTE"
