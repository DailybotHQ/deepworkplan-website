# auth.md — Agent access & authentication

**Site:** https://deepworkplan.com
**Status:** Public, static, MIT-licensed documentation site.

## Summary

**No authentication or registration is required.** Every page and every
machine-readable endpoint on deepworkplan.com is public and served over plain
HTTP `GET`. Agents may freely read all content without API keys, OAuth tokens,
or sign-up. Responses on `/api/*` carry advisory RFC 9331 rate-limit headers
(see Rate limits below); access itself stays anonymous and unlimited in
practice — enforcement, when it acts at all, is best-effort at the edge.

## Authentication

- **Scheme:** none.
- **Credentials:** none required.
- **Bearer methods:** none.
- All resources are anonymous, read-only, and cacheable.

## Agent registration

Not applicable today — there are no protected resources or write actions to
register against, and rate limiting is advisory only (no keys, no tiers, no
quotas to sign up for). This file is published for agent-readiness
discovery and to declare, explicitly, that access is open.

## Rate limits

`/api/*` responses carry RFC 9331 rate-limit headers so agents can self-throttle
in real time: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and
`RateLimit-Policy` (`q=120; window=60; burst=0`); a `429` response adds
`Retry-After`. Enforcement is best-effort at the edge and never requires
identity. The versioning and deprecation policy (breaking changes ship only in
a new `/api/v{N+1}/` family; `Deprecation` and `Sunset` headers precede removal
by at least 180 days) is documented at `/developers` and `/openapi.json`.

If a protected API is introduced in the future, registration instructions and the
OAuth endpoints will be published here and in the discovery documents below
(`register_uri` is advertised in the `agent_auth` block of
`/.well-known/oauth-authorization-server`).

## Identity & credential types

| Field | Value |
| :-- | :-- |
| Supported identity types | `none`, `anonymous` |
| Supported credential types | `none` |
| Claims endpoint | — (not applicable) |
| Revocation endpoint | — (not applicable) |

## Discovery (machine-readable entry points)

| Resource | URL |
| :-- | :-- |
| OAuth authorization-server metadata (stub) | `/.well-known/oauth-authorization-server` |
| OAuth protected-resource metadata (stub) | `/.well-known/oauth-protected-resource` |
| MCP server card | `/.well-known/mcp/server-card.json` |
| Agent Skills discovery index | `/.well-known/agent-skills/index.json` |
| API catalog (RFC 9727) | `/.well-known/api-catalog` |
| Versioned API catalog (v1) | `/api/v1/index.json` |
| OpenAPI specification | `/openapi.json` |
| Official CLI (source) | `cli/` in [deepworkplan-website](https://github.com/DailybotHQ/deepworkplan-website) — `deepworkplan` (npm publication pending) |
| LLM guidance | `/llms.txt`, `/llms-full.txt` |
| In-browser tools | WebMCP (`navigator.modelContext`) on every page |
| Canonical adoption endpoint | `/init` (`/init.md`) |

## Content usage

AI usage preferences are declared in `/robots.txt` via `Content-Signal`
(`ai-train=yes, search=yes, ai-input=yes`). All public content is freely readable.

## Contact

Source & issues: https://github.com/DailybotHQ/deepworkplan-skill
