---
title: "Developers — the Deep Work Plan agent API"
description: "The deepworkplan.com agent surface for developers and AI agents: a read-only, zero-auth API described by an OpenAPI spec, a stateless MCP server at /api/mcp, per-page Markdown in 17 languages, and the npx skills install CLI."
---

## Zero-auth by design

There are no API keys to generate, no OAuth flow, and no sandbox separate from production — the production surface itself is the sandbox. This is a deliberate property of the methodology: agents cannot fill in "contact sales" forms, so the site never asks for one.

- **Read-only** — every operation is a safe, cacheable GET, except the MCP endpoint (POST). No write operations exist anywhere.
- **No API keys** — no registration, tokens, or rate-limit tiers. Anonymous access is the documented contract, declared in [/auth.md](https://deepworkplan.com/auth.md).
- **Free and open source** — the site content and the DWP skill are MIT-licensed.
- **Machine-first** — structured JSON errors on `/api/*`, Markdown 404 recovery bodies, an RFC 9727 API catalog, and an ARD capability manifest.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/openapi.json` | OpenAPI 3.1 specification of the whole agent API. |
| GET | `/llms.txt` | Curated LLM guidance index — the recommended entry point. |
| GET | `/init.md` | The canonical DWP adoption prompt. |
| GET | `/{page}.md` | Any page as source Markdown, in all 17 languages. |
| GET | `/api/health.json` | Static health marker. |
| POST | `/api/mcp` | MCP server (Streamable HTTP, stateless). |
| GET | `/.well-known/ai-catalog.json` | ARD capability manifest (agentmap). |

Unknown `/api/*` paths return a structured JSON error with a resolution hint, never an HTML error page.

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
npx skills add DailybotHQ/deepworkplan-skill@latest
```

The skill vendors into `.agents/skills/deepworkplan/` inside your repository, so every agent that touches the repo shares the same methodology.

## Machine-readable resources

- [OpenAPI spec](https://deepworkplan.com/openapi.json)
- [Agent access & auth declaration](https://deepworkplan.com/auth.md)
- [API catalog, RFC 9727](https://deepworkplan.com/.well-known/api-catalog)
- [MCP manifest](https://deepworkplan.com/.well-known/mcp.json)
- [Security contact](https://deepworkplan.com/.well-known/security.txt)
- [Site repo descriptor](https://deepworkplan.com/.well-known/dwp.json)
