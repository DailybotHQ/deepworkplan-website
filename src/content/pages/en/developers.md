---
title: "Developers — the Deep Work Plan agent API"
description: "The Deep Work Plan agent surface: read-only, zero-auth, versioned API with an OpenAPI spec, MCP server, Markdown mirrors in 17 languages, and the official CLI."
---

## Zero-auth by design

There are no API keys to generate, no OAuth flow, and no sandbox separate from production — the production surface itself is the sandbox. This is a deliberate property of the methodology: agents cannot fill in "contact sales" forms, so the site never asks for one.

- **Read-only** — every operation is a safe, cacheable GET, except the MCP endpoint (POST). No write operations exist anywhere.
- **No API keys** — no registration, tokens, or rate-limit tiers. Anonymous access is the documented contract, declared in [/auth.md](https://deepworkplan.com/auth.md).
- **Free and open source** — the site content and the DWP skill are MIT-licensed.
- **Machine-first** — structured JSON errors on `/api/*`, Markdown 404 recovery bodies, an RFC 9727 API catalog, and an ARD capability manifest.

## Plan and execute with the skill

The API above lets an agent read this site. The DWP skill is what lets an agent run the methodology — install it once in a repository and it ships a router plus nine sub-skills, invoked as slash commands (or by name, for agents that intercept slash — most use `#` instead, e.g. `#dwp-execute`).

Every plan picks one value from each of two independent axes:

- **Lite** — task records live inline in the plan's README, behind stable `#task-N` anchors. Built for small, bounded work: one concern, roughly one sitting.
- **Full** — one file per task under `N.task_<slug>.md`, for long-horizon work spanning hours or days, or when tasks have real dependencies. A Lite plan promotes to Full later with `/dwp-refine promote`.
- **Guided (default)** — `dwp-create` analyzes the goal, decomposes it, and materializes a reviewable plan, then asks: retain it, promote Lite to Full, edit it, or stop. A human stays in the loop before any product work starts.
- **Trust (or auto)** — append `trust` (or `auto`) as the last word, e.g. `/dwp-create <goal> trust`, and the agent skips the review round and returns the execute command directly.

The nine sub-skills:

| Command | Purpose |
|---------|---------|
| `/dwp-create <goal>` | Turn a goal into a plan — Lite by default, Full for larger work. |
| `/dwp-execute` | Run an existing plan task by task: read it fully, execute each task in order, validate its gate, update progress. |
| `/dwp-refine` | Add, remove, or reorder tasks in an existing plan while preserving completed work and its recorded evidence. |
| `/dwp-resume` | Reconstruct state from the plan's own files and continue an interrupted plan from its first incomplete task. |
| `/dwp-status` | Report a plan's progress — completed, in-progress, pending tasks — without making any change. |
| `/dwp-verify` | Check, mechanically, whether the repository is AI-first and whether its plans are well-formed. Changes nothing; reports pass or fail. |
| `/deepworkplan-onboard` | Make a repository AI-first: reason about its stack, then generate an adapted AGENTS.md, docs/, .agents/, and a gitignored .dwp/. |
| `/skill-create`, `/agent-create` | The author sub-skill: grow the repository's own kit — a reusable skill for a repeatable procedure, or an agent for a recurring role with its own model and tools. |
| `/dwp-upgrade` | Check for a newer published skill release and, only after explicit approval, install it and re-run onboarding as a fresh pass. |

A small, bounded fix — Lite, trust:

```bash
# A small, bounded fix: skip the review round, run it directly.
/dwp-create fix the flaky checkout test trust
/dwp-execute
```

Long-horizon work — Full, guided:

```bash
# Long-horizon work with real stakes: review before anything runs.
/dwp-create migrate the billing service to the new payments API
# ...review the proposed plan, then:
/dwp-execute
# ...interrupted? pick up again, even in a fresh session:
/dwp-resume
```

Every plan's output — manifest, progress log, task records, gate evidence — lives under a gitignored `.dwp/` directory in the repository itself. Nothing is sent to or stored by deepworkplan.com; the skill makes no network calls at all.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/openapi.json` | OpenAPI 3.1 specification of the whole agent API. |
| GET | `/llms.txt` | Curated LLM guidance index — the recommended entry point. |
| GET | `/init.md` | The canonical DWP adoption prompt. |
| GET | `/{page}.md` | Any page as source Markdown, in all 17 languages. |
| GET | `/api/health.json` | Static health marker. |
| GET | `/api/v1/index.json` | Versioned catalog of the v1 family: endpoint paths, site version, and spec links. |
| GET | `/api/v1/sections.json` | The site map as typed JSON — name, path, and description per section. |
| GET | `/api/v1/pages.json` | Every Markdown endpoint in every language, grouped by language code. |
| GET | `/api/v1/health.json` | Versioned health marker — the v1 mirror of `/api/health.json`. |
| POST | `/api/mcp` | MCP server (Streamable HTTP, stateless). |
| GET | `/.well-known/ai-catalog.json` | ARD capability manifest (agentmap). |

Unknown `/api/*` paths return a structured JSON error with a resolution hint, never an HTML error page.

## Versioning & deprecation

The versioned JSON family lives under `/api/v1/` — index, sections, pages, and health — and the unversioned canonical paths (`/llms.txt`, `/{page}.md`, `/api/mcp`) belong to the same v1 contract. Breaking changes ship only in a new `/api/v{N+1}/` family, never inside v1. When an endpoint is deprecated, its responses carry `Deprecation: true` and a `Sunset` date at least 180 days before removal, and a `Link` header points at the successor.

## Rate limits

Responses on `/api/*` carry RFC 9331 rate-limit headers — `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and `RateLimit-Policy` — so agents can self-throttle in real time; a `429` response adds `Retry-After`. Enforcement is best-effort at the edge (120 requests per 60 seconds per visitor), and access stays anonymous: no keys, no registration, no tiers.

## MCP server

A stateless Model Context Protocol server over Streamable HTTP at `https://deepworkplan.com/api/mcp`. Three read-only tools:

- `get_init_prompt` — the canonical /init.md adoption prompt.
- `list_site_sections` — the site map with one-line descriptions.
- `read_page` — any page as native source Markdown, e.g. `/init` or `/es/methodology/01-manifesto`.

```bash
curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize",
       "params":{"protocolVersion":"2025-06-18","capabilities":{},
                 "clientInfo":{"name":"curl","version":"1.0"}}}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'

curl -s https://deepworkplan.com/api/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call",
       "params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

Protocol versions 2025-03-26 and 2025-06-18 are supported; no session is required. Manifest: [/.well-known/mcp.json](https://deepworkplan.com/.well-known/mcp.json). Server card: [/.well-known/mcp/server-card.json](https://deepworkplan.com/.well-known/mcp/server-card.json).

## Markdown for agents

Every rendered page is published as native source Markdown — not an HTML conversion:

```bash
# Content negotiation on any URL
curl -s https://deepworkplan.com/methodology -H 'Accept: text/markdown'

# Or fetch the .md mirror directly — every page, every language
curl -s https://deepworkplan.com/es/developers.md
```

## Install the kit

The official install path for the Deep Work Plan skill — the same command the /init endpoint gives agents. It works with any skills-compatible coding agent (Claude Code, Cursor, Codex, Gemini, and others):

```bash
# 1. Install the DWP skill — same command the /init endpoint gives agents
npx skills add DailybotHQ/deepworkplan-skill@latest

# 2. Official CLI — zero-dependency client over this API (Node >= 18),
#    prepared in the site repo's cli/ directory pending npm publication
deepworkplan init
deepworkplan read /es/developers
```

The skill vendors into `.agents/skills/deepworkplan/` inside your repository, so every agent that touches the repo shares the same methodology. The official `deepworkplan` CLI — a zero-dependency client over this same API (`init`, `sections`, `read`, `open`, `mcp`) — is prepared for npm and lives in the [cli/ directory of the site repository](https://github.com/DailybotHQ/deepworkplan-website/tree/main/cli) until publication.

## Machine-readable resources

- [OpenAPI spec](https://deepworkplan.com/openapi.json)
- [Agent access & auth declaration](https://deepworkplan.com/auth.md)
- [API catalog, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP manifest](https://deepworkplan.com/.well-known/mcp.json)
- [Security contact](https://deepworkplan.com/.well-known/security.txt)
- [Site repo descriptor](https://deepworkplan.com/.well-known/dwp.json)
