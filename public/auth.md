# auth.md — Agent access & authentication

**Site:** https://deepworkplan.com
**Status:** Public, static, MIT-licensed documentation site.

## Summary

**No authentication or registration is required.** Every page and every
machine-readable endpoint on deepworkplan.com is public and served over plain
HTTP `GET`. Agents may freely read all content without API keys, OAuth tokens,
or sign-up. This document follows the [auth.md convention](https://workos.com/auth-md)
structure (Discover → Pick a method → Register → Claim → Exchange → Use →
Errors → Revocation) so an agent that already knows the convention can skip
straight to the section it needs — every step below resolves to "not
applicable, nothing to do" for this site, stated explicitly rather than
omitted.

## Step 1 — Discover

Two metadata documents are published, both stubs declaring no protected
resources exist:

- **Protected Resource Metadata (RFC 9728):** `/.well-known/oauth-protected-resource`
  — `resource`, `authorization_servers`, `scopes_supported: ["read"]`,
  `bearer_methods_supported`.
- **Authorization Server Metadata (RFC 8414):** `/.well-known/oauth-authorization-server`
  — includes an `agent_auth` block (the auth.md convention's bootstrap
  surface) with `auth_required: false`, `identity_types_supported: ["anonymous"]`,
  and `skill` pointing back at this document.

No endpoint on this site ever returns `401`, so an agent will never receive a
`WWW-Authenticate` challenge here — there is no discovery hop triggered by a
401 to react to. Fetching either document above is the only discovery step,
and both confirm the same thing: nothing is protected.

## Step 2 — Pick a method

The `agent_auth.identity_types_supported` array in the Authorization Server
Metadata lists exactly one value: `anonymous`. This service does **not**
support `identity_assertion` (ID-JAG-based delegation) or `service_auth`
(email-based registration) — there is no user identity, session, or account
system on this site for either method to bind to. `anonymous` is not a
fallback here; it is the only and permanent method.

## Step 3 — Register

No `identity_endpoint` is published because there is nothing to register
against: anonymous access is granted unconditionally, with no
`POST /agent/identity` call, no consent gate, and no registration record
created or required.

## Step 4 — Claim

Not applicable. The claim ceremony exists to let a signed-in human upgrade an
anonymous registration to a claimed one with wider scopes. This site has a
single scope (`read`) available identically to every caller, claimed or not,
so there is no ceremony to run and no `claim_endpoint` is published.

## Step 5 — Exchange

Not applicable. There is no `identity_assertion` to exchange and no
`token_endpoint` call to make — no access_token is ever issued because none
is required.

## Step 6 — Use the access_token

There is no access_token. Every request is a plain, unauthenticated `GET`
with no `Authorization` header:

```http
GET /developers.md
```

`bearer_methods_supported: ["header"]` in the Protected Resource Metadata is
published only for schema completeness (the field is not optional in RFC
9728); no request to this site should ever include a bearer token.

## Errors

No auth-specific error codes apply — `identity_endpoint`, `claim_endpoint`,
and `token_endpoint` are not published, so none of the profile-specific or
OAuth-standard error codes in the auth.md convention (`invalid_grant`,
`interaction_required`, `login_required`, and so on) can occur here. The one
error surface that does exist is rate limiting: `/api/*` responses carry RFC
9331 rate-limit headers (`RateLimit-Limit`, `RateLimit-Remaining`,
`RateLimit-Reset`, `RateLimit-Policy`), and a `429` response adds
`Retry-After`. Enforcement is best-effort at the edge and never requires
identity.

## Revocation

Not applicable — there is no access_token or identity_assertion to revoke,
and no `revocation_endpoint` is published. If a protected API is introduced
in the future, a real `revocation_endpoint` (RFC 7009) and `events_endpoint`
(RFC 8935 Security Event Token delivery) will be published in
`/.well-known/oauth-authorization-server`'s `agent_auth` block and documented
here.

## Identity & credential types

| Field | Value |
| :-- | :-- |
| Supported identity types | `anonymous` only |
| Supported credential types | `none` |
| Claim endpoint | — (not applicable) |
| Revocation endpoint | — (not applicable) |

## Discovery (machine-readable entry points)

| Resource | URL |
| :-- | :-- |
| OAuth protected-resource metadata (RFC 9728, stub) | `/.well-known/oauth-protected-resource` |
| OAuth authorization-server metadata (RFC 8414, stub, carries `agent_auth`) | `/.well-known/oauth-authorization-server` |
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
