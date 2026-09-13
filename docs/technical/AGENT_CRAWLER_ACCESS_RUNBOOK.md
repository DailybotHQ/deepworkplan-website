# Agent Crawler Access Runbook — unblocking AI crawlers on deepworkplan.com

**Owner / credentials:** the developer with Cloudflare zone access for
`deepworkplan.com`. An AI agent cannot and must not attempt dashboard changes —
everything in this runbook is a manual, dashboard-level fix. The repo-side
half (probe script + robots/analytics sync) is already committed.

**Verification command (before and after):**

```bash
pnpm run agents:reachability
```

Exit `0` = every probed User-Agent is reachable; exit `1` = at least one
blocked (per-UA verdict table is printed).

## Evidence (2026-09-12 is-agentic scan, score 85/100)

- **Item 1 — Agent crawler reachability: Failed.** "ChatGPT-User: blocked,
  ClaudeBot: blocked, Google-Extended: reachable, ora-agent: reachable,
  DeepSeekBot: reachable."
- **Item 2 — Not blocked by bot detection: Partial (50%).** "Some agents
  blocked: GPTBot, ClaudeBot, ChatGPT-User, PerplexityBot."
- **Live probe (2026-09-12, `pnpm run agents:reachability`):** the block is
  broader than the scan's sample — **13 of 17** probed AI User-Agents return
  403. Blocked: GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai,
  PerplexityBot, Perplexity-User, OAI-SearchBot, Meta-ExternalAgent, Amazonbot,
  Bytespider, CCBot, cohere-ai. Reachable: Google-Extended, DeepSeekBot,
  Applebot-Extended, ora-agent. The full table is reproducible with the
  command above.

## Why this is NOT a robots.txt problem

`public/robots.txt` already carries explicit `User-agent:` + `Allow: /` blocks
for GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, Bytespider,
CCBot, PerplexityBot, Applebot-Extended, Amazonbot, Meta-ExternalAgent,
cohere-ai, and OAI-SearchBot. The origin never blocks these agents.

The blocker is upstream of the origin. `functions/_middleware.ts` documents
that Cloudflare's **AI Crawl Control** injects managed robots.txt directives at
the edge *after* Pages Functions run — code in this repository cannot rewrite
what the edge injects. The blocked-verdict pattern (GPTBot / ClaudeBot /
ChatGPT-User / PerplexityBot blocked while Google-Extended and others pass)
matches Cloudflare's bot-mitigation layers, not origin behavior.

## Fix path A — AI Crawl Control (check this first)

1. Cloudflare dashboard → select the **deepworkplan.com** zone.
2. **Security → Bots** (the AI Crawl Control surface; exact menu placement
   varies with dashboard version — look for "AI Crawl Control" or "AI
   Scrapers and Crawlers").
3. If the AI crawler policy is set to **Block** (or anything other than
   Allow), switch it to **Allow**.
4. Side effect worth knowing: setting this to Allow also stops the edge from
   injecting `Disallow` directives into robots.txt — which is what the
   middleware comment in `functions/_middleware.ts` describes.

## Fix path B — Bot Fight Mode / Super Bot Fight Mode / WAF

If path A was already set to Allow, work through these in order:

1. **Security → Bots → Bot Fight Mode**: disable it. Bot Fight Mode blocks
   "definitely automated" traffic, which includes several AI crawler
   User-Agents, with no allowlist mechanism.
2. **Super Bot Fight Mode** (if enabled on a paid plan): move the AI crawler
   traffic classes to **Allow** (do not "Managed Challenge" them).
3. **Security → WAF**: check for a managed or custom rule using the
   "AI Scrapers and Crawlers" category (it blocks exactly the
   GPTBot/ClaudeBot/ChatGPT-User/PerplexityBot family). Either remove that
   rule or add a **Skip** (or Allow) rule ordered **before** it, matching:
   - `cf.bot_management.category in ("ai_scrapers_crawlers", "ai_search_crawlers")`, or
   - an OR of exact User-Agent expressions:
     `http.user_agent contains "GPTBot" or http.user_agent contains "ChatGPT-User" or http.user_agent contains "ClaudeBot" or http.user_agent contains "PerplexityBot"`
4. Only add an allow rule if the zone's posture is deny-by-default — mirror
   the scanner's own advice: "Add an allow rule only when your security setup
   denies them by default."

## Verify

1. `pnpm run agents:reachability` — expect exit `0` and zero `blocked` verdicts.
   (Run it before the fix too; as of 2026-09-12 it exits `1` with 13/17
   blocked — that is the finding, not a bug.)
2. Re-run the is-agentic scan (see the plan's `LIVE_VERIFICATION.md` re-scan
   procedure) — the scan, not this script, is the arbiter, because some
   Cloudflare blocks are TLS-fingerprint-based and a UA spoof can occasionally
   pass where the real crawler is still blocked.

## Rollback

Revert the dashboard toggles (AI Crawl Control back to its previous setting,
Bot Fight Mode back on, WAF rule restored). Nothing in the repository changes
during either the fix or the rollback — site behavior at the origin is
untouched throughout.
