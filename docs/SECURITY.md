# Security Guide

Security best practices for deepworkplan.com, a static site built with Astro.

## Overview

As a static site, deepworkplan.com has a different security profile than dynamic web applications. The main concerns are:

1. **Build-time secrets** - Protecting sensitive data during build
2. **Client-side exposure** - What data reaches the browser
3. **Third-party dependencies** - Supply chain security
4. **Content security** - Protecting against XSS in user-generated content

## Security Principles

### 1. No Secrets in Client Code

Static sites ship all client-side code to users. Never include secrets in:

- Astro component scripts
- Svelte component logic
- Client-side JavaScript

```typescript
// ❌ BAD - Secret exposed to client
const API_KEY = 'sk_live_xxxxx';

// ✅ GOOD - Only public data on client
const SITE_URL = import.meta.env.PUBLIC_SITE_URL;
```

### 2. Build-Time vs Runtime

Astro runs code at build time (server-side) and optionally at runtime (API routes). Understand the difference:

| Context | Secrets Safe? | Example |
|---------|---------------|---------|
| Build-time (`.astro` frontmatter) | ⚠️ Careful | Fetching data for static pages |
| API Routes (`src/pages/api/`) | ✅ Yes | Server-side endpoints |
| Client-side (Svelte with `client:*`) | ❌ No | Interactive components |

### 3. Minimal Attack Surface

As a static site:
- No database to protect
- No user authentication
- No session management
- Limited server-side logic

## Environment Variables

### Configuration

Use `.env` files for environment variables:

```bash
# .env (local development - DO NOT COMMIT)
PUBLIC_SITE_URL=http://localhost:5555
PRIVATE_API_KEY=sk_xxxxx

# .env.production
PUBLIC_SITE_URL=https://deepworkplan.com
```

### Naming Convention

- `PUBLIC_*` - Safe to expose to client (e.g., `PUBLIC_SITE_URL`)
- No prefix - Server-only, never reaches client

```typescript
// Server-side only (build time or API routes)
const privateKey = import.meta.env.PRIVATE_API_KEY;

// Available on client
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
```

### Security Rules

- [ ] Never commit `.env` files with secrets
- [ ] Use `.env.example` for documentation
- [ ] Rotate secrets if accidentally exposed
- [ ] Use CI/CD environment variables for builds

## Content Security

### Authored Content

Methodology, spec, and kit docs are authored in Markdown/MDX. While you control the content, follow these practices:

```markdown
<!-- ✅ Safe - standard markdown -->
# Introduction
This is safe content.

<!-- ⚠️ Careful with raw HTML in MDX -->
<script>alert('This would execute!')</script>
```

### Content Collection Validation

Zod schemas validate content at build time:

```typescript
// src/content.config.ts
const methodology = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    lang: z.enum(['en', 'es']),
    // Validates structure, prevents malformed data
  }),
});
```

### External Links

When linking to external sites:

```astro
<!-- Add rel attributes for security -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External Link
</a>
```

## API Route Security

### Current Endpoints

The site has minimal dynamic routes (all static, build-time generated):

| Endpoint | Purpose | Security |
|----------|---------|----------|
| `/{page}.md`, `/es/{page}.md` | Agent-friendly Markdown for pages | Public, cached |
| `/methodology/{slug}.md`, `/spec/{slug}.md`, `/kit/{slug}.md` | Agent-friendly Markdown for docs | Public, cached |
| `/sitemap-index.xml` | Sitemap | Public |

### API Route Best Practices

```typescript
// src/pages/[page].md.ts (agent Markdown endpoint)
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Validate and sanitize any inputs
    // Return only necessary data
    const markdown = await getPageMarkdown();

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    // Don't expose error details
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
};
```

## Dependency Security

### Regular Audits

```bash
# Check for known vulnerabilities
npm audit

# Fix automatically where safe
npm audit fix

# Check for outdated packages
pnpm run ncu:check
```

### Package Selection

When adding dependencies:

- [ ] Check package popularity and maintenance
- [ ] Review recent security advisories
- [ ] Prefer well-maintained packages
- [ ] Minimize dependencies when possible

### Lock Files

Always commit `pnpm-lock.yaml` to ensure reproducible builds. The lockfile is consumed by `corepack pnpm install --frozen-lockfile` in CI and Cloudflare Pages.

## Build Security

### Cloudflare Pages Deployment

The site deploys to Cloudflare Pages from the `dist/` folder:

```bash
pnpm run build
```

Security considerations:

- [ ] Build output (`docs/`) contains only public content
- [ ] No `.env` files in build output
- [ ] No source maps with sensitive paths
- [ ] HTTPS enforced by Cloudflare

### Build-Time Secrets

If you need secrets during build (e.g., fetching from a CMS):

```bash
# In CI/CD, set environment variables
PRIVATE_CMS_TOKEN=xxx pnpm run build
```

The secret is used at build time but not included in output.

### CI Secrets (GitHub Actions)

The workflows under `.github/workflows/` consume repository secrets. Register
each one only under **Settings > Secrets and variables > Actions** — never
commit them, never echo them from a `run:` step, never persist them to disk:

| Secret | Required by | Purpose | Failure mode when absent |
|--------|-------------|---------|---------------------------|
| `CURSOR_API_KEY` | `pr-review.yml` | Authenticates the [`DailybotHQ/ai-diff-reviewer`](https://github.com/marketplace/actions/ai-diff-reviewer) Action against Cursor's review provider | The `AI review gate` job fails loud with an actionable message ("`CURSOR_API_KEY` is not configured on this repo") |
| `AUTOMATION_GITHUB_TOKEN` (optional) | `release_and_publish.yml` | Bot user PAT so the release commit + tag can push to protected `main` | Falls back to `GITHUB_TOKEN`, which will fail at the push step unless `github-actions[bot]` is in the branch-protection bypass list |

`pr-review.yml` follows a minimal-permission posture that is worth calling out:

- The `review` job uses `actions/checkout@v4` with `persist-credentials: false`
  because the Cursor CLI has broad local access — a persisted GitHub token
  on disk is an exfil surface. The reviewer talks to the GitHub API in-process
  via the injected `github-token:` input instead.
- The workflow runs on `pull_request` (NOT `pull_request_target`), so
  untrusted fork code never executes with elevated privileges.
- The three-tier scope gate (author-association write-tier → `ready` label
  → `CURSOR_API_KEY` presence) short-circuits before any diff fetch happens
  from external contributors' branches.

## Headers and CSP

Cloudflare Pages allows custom headers. For enhanced security, consider:

### Meta Tags

```astro
<!-- src/components/BaseHead.astro -->
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
```

### Future Consideration

If moving to a host with header control (Vercel, Netlify):

```
# Example _headers file
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
```

## Security Checklist

### Before Committing

- [ ] No secrets in code
- [ ] No `.env` files committed
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No unnecessary data exposed

### Before Deployment

- [ ] `npm audit` shows no critical vulnerabilities
- [ ] Build output contains only public content
- [ ] Environment variables properly configured
- [ ] Dependencies are up to date

### Periodic Review

- [ ] Audit dependencies monthly
- [ ] Review API routes for data exposure
- [ ] Check for new security best practices
- [ ] Update packages regularly

## Incident Response

If a secret is accidentally committed:

1. **Rotate immediately** - Generate new credentials
2. **Remove from history** - Use `git filter-branch` or BFG Repo-Cleaner
3. **Audit usage** - Check if secret was used maliciously
4. **Update documentation** - Prevent recurrence

## Provenance & Integrity

Trust in Deep Work Plan is **two-sided**: the website (this repo) and the
installable skill ([`DailybotHQ/deepworkplan-skill`](https://github.com/DailybotHQ/deepworkplan-skill)).
The skill repo's [`SECURITY.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
is the **single source of truth** for trust claims (threat model, disclosure
channel, SLAs). The website must never assert anything stronger than it.

### Machine-readable trust manifest

A public manifest is served at
[`/.well-known/dwp-trust.json`](https://deepworkplan.com/.well-known/dwp-trust.json):
current skill version, both repo URLs, license (MIT), where to get checksums and
how to verify, the disclosure contact, and a `lastUpdated` date. Keep every value
**true** — only list mechanisms that are actually live (e.g. `signing` stays
`"planned"` until a real signature ships). Refresh `lastUpdated` and the skill
`version` when they change.

### Verifiable install (provenance)

The skill is Markdown-first — no network calls, no telemetry — so the realistic
tampering surface is "is this copy what the release published?". The skill repo
answers that with published checksums:

- Every release attaches a `SHA256SUMS` over the shipped runtime artifact
  (`skills/deepworkplan/**`), generated by `scripts/generate-checksums.sh`.
- Users verify before running with `./setup.sh --verify` (or
  `scripts/verify-integrity.sh`) against the `SHA256SUMS` downloaded from the
  matching GitHub Release.
- The full recipe is documented in the skill repo's
  [`PUBLISHING.md` → Provenance & integrity](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/PUBLISHING.md#41-provenance--integrity)
  and surfaced on the public `/trust` page.

**Next step (not yet live):** signing the checksums/tag (cosign keyless or
maintainer GPG). Until that ships, releases are described as **checksummed**, not
**signed** — do not overstate.

## Resources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Astro Security Documentation](https://docs.astro.build/en/guides/security/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [RFC 9116 — security.txt](https://www.rfc-editor.org/rfc/rfc9116)
- [Sigstore / cosign](https://github.com/sigstore/cosign)
