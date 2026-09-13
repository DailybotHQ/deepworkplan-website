# Markdown for Agents

Native Markdown delivery layer for AI agents. Every page on the site has a `.md` endpoint serving clean, agent-friendly Markdown from the original source content.

## Architecture

```
Source .md → [Astro build] → HTML page (humans)
Source .md → [Astro build] → .md endpoint (agents)
```

Both outputs come from the same source. No HTML→Markdown conversion in the path.

## Why Native Markdown Over HTML→MD Conversion

Cloudflare offers [Markdown for Agents](https://blog.cloudflare.com/markdown-for-agents/) — edge HTML→Markdown conversion when clients request `Accept: text/markdown`. However, since this site's content already exists as Markdown, serving the original source is superior:

- **Source fidelity** — original formatting, code blocks, and links preserved exactly as authored
- **Token efficiency** — no HTML tag residue from conversion; cleaner for AI consumption
- **No edge dependency** — works on any hosting platform, not just Cloudflare
- **Deterministic** — output is predictable and consistent across builds
- **Cacheable** — static files served directly, no runtime processing

## Endpoints

### Pages

| Pattern | Example |
|---------|---------|
| `/{page}.md` (EN) | `/about.md`, `/contact.md`, `/compare.md`, `/faq.md`, `/quickstart.md` |
| `/{lang}/{page}.md` | `/es/about.md`, `/es/compare.md`, `/es/faq.md`, `/es/quickstart.md` |

Source: `src/content/pages/{en,es}/` content collection. `/init.md` is a separate case — see below.

### Standalone agent artifacts (not content-collection pages)

A handful of top-level agent-facing files are hand-maintained static files under `public/`, served verbatim with no per-language variant and no HTML sibling: `/llms.txt`, `/llms-full.txt`, `/openapi.json`, `/init.md`. `/init.md` in particular is the canonical, English-only, self-contained onboarding prompt — the human-readable equivalent lives at `/quickstart` (all 17 languages), but the two are maintained independently and are not required to be byte-identical.

## Response Format

```markdown
# Page Title

> Description text

Language: en
Canonical: https://deepworkplan.com/about
Markdown: send header `Accept: text/markdown` on any URL to receive Markdown instead of HTML.

---

[original markdown body]
```

- H1 title — universally expected by agents
- Blockquote description — visually distinct
- Simple key-value metadata — easy to parse
- Canonical URL — always points to the HTML version
- **Markdown access line** — tells agents to send `Accept: text/markdown` on any URL for Markdown instead of HTML (content negotiation; do not rely on appending `.md`). Localized prose per language; the media type stays literal. Owned by `buildMarkdownAccessLine(lang)` in `src/lib/markdown-for-agents.ts`
- Separator before body — clear content boundary
- Site navigation footer — global nav links appended to every output (see below)

## Technical Implementation

### Key Files

| File | Purpose |
|------|---------|
| `functions/_middleware.ts` | Content negotiation (Accept: text/markdown, Accept: application/json) |
| `src/lib/markdown-for-agents.ts` | Serialization helpers |
| `src/lib/json-envelope.ts` | JSON envelope negotiation (precedence, title/language detection, envelope shape) |
| `src/pages/[page].md.ts` | EN page endpoint |
| `src/pages/es/[page].md.ts` | ES page endpoint |
| `src/content/pages/{en,es}/` | Page Markdown source files |
| `src/content.config.ts` | Pages collection schema |
| `tests/unit/lib/markdown-for-agents.test.ts` | Unit tests |

### Serialization Functions

- `buildMarkdownAccessLine(lang)` — localized `Markdown:` header hint (content negotiation)
- `serializePageToAgentMarkdown(page, { slug, lang })` — site pages
- `serializeReaderEntryToAgentMarkdown(entry, { basePath, slug, lang })` — methodology / spec / kit / examples readers

### Site Navigation Partial

Every serialized markdown output includes a **Site Navigation** section appended at the end. This mirrors the HTML navbar and footer, ensuring AI agents can discover all site pages from any entry point.

The navigation is generated programmatically by `generateSiteNavigation(lang)` in `markdown-for-agents.ts` — a single source of truth that is language-aware (applies the correct URL prefix for every active language, not just EN/ES). The navigation is defined as an inline `sections` array inside that function, organized into five sections: Methodology, Get started, Learn, Project, and Connect (social/repo links, external). It must list every real top-level route in `KNOWN_BASE_PATHS` (`src/middleware.ts`) that is not a redirect (`init`/`setup`/`onboarding`/`docs` redirect to `/quickstart`/`/developers` and are correctly never listed as page routes) — `tests/unit/lib/markdown-for-agents.test.ts`'s "Site Navigation block" tests assert this set exactly, so a route silently missing from the array (as happened for `/developers`, `/init`, and `/privacy` before an earlier fix) now fails the test rather than shipping unnoticed. The one exception is `/init.md` itself: it is listed as an `external: true` entry (so it is never given a `/{lang}/` prefix) because it is a standalone, English-only agent artifact with no HTML page behind it — not one of the "real top-level routes" in the usual sense.

**Why programmatic instead of a `.md` partial file?**
- Language-aware: automatically applies the correct `/{lang}/` prefix for every active language
- Single definition: one data structure generates navigation for every active language
- No manual sync: adding the nav to new serialization functions requires only one line (`generateSiteNavigation(lang)`)
- Always consistent: impossible for individual page markdown files to have stale navigation

**When to update:** If a new top-level page is added to the site, add it to the appropriate section's `links` array inside `generateSiteNavigation()` in `src/lib/markdown-for-agents.ts`, and update the expected route set in `tests/unit/lib/markdown-for-agents.test.ts`'s "Site Navigation block" tests so a future omission fails the build instead of shipping silently.

### Content Collections

- **Pages**: `pages` collection in `src/content/pages/`. Each page has EN and ES versions.

## Scalability

- **New page** → Add a `.md` file to `src/content/pages/{en,es}/` and a `.md` endpoint is generated
- **Content updates** → Reflected on next build automatically

## Performance Impact

**Zero.** The `.md` endpoints are separate static files generated at build time. They do not add any JavaScript, runtime processing, or SSR overhead. HTML pages and their PageSpeed/Lighthouse scores are completely unaffected.

## Content Negotiation via `Accept: text/markdown`

The Cloudflare Pages middleware (`functions/_middleware.ts`) supports automatic content negotiation. When a request includes `Accept: text/markdown`, the middleware serves the `.md` version of the page instead of HTML — no URL change needed.

**How it works:**
1. Middleware checks the `Accept` header for `text/markdown`
2. Resolves the `.md` asset path (e.g., `/about` → `/about.md`)
3. Fetches the static `.md` file via `context.env.ASSETS.fetch()`
4. Returns it with `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`

**Path resolution:**
| Request Path | Resolved `.md` Path |
|---|---|
| `/` | `/index.md` |
| `/about` | `/about.md` |
| `/about/` | `/about.md` |
| `/init` | `/init.md` |
| `/es/about` | `/es/about.md` |

**Excluded paths:** `/api/*`, `/internal/*`, `/_*`, and any path with a file extension (`.js`, `.css`, `.png`, etc.).

**Fallback:** If no `.md` file exists for the requested path, the middleware falls back to serving HTML normally.

**Testing with curl:**
```bash
# Get Markdown
curl -H "Accept: text/markdown" https://deepworkplan.com/about

# Get HTML (default)
curl https://deepworkplan.com/about

# Direct .md URL also works
curl https://deepworkplan.com/about.md
```

**Response headers for content-negotiated Markdown:**
- `Content-Type: text/markdown; charset=utf-8`
- `Cache-Control: public, max-age=3600`
- `Vary: Accept` — tells caches that response varies by Accept header
- `X-Content-Negotiation: markdown` — signals the response was content-negotiated

## Content Negotiation via `Accept: application/json`

The same middleware also serves a typed `application/json` envelope for the
same page mirrors, for clients (agents, function-calling tool wrappers) that
explicitly prefer JSON over both HTML and Markdown. The logic is pure and
dependency-free in `src/lib/json-envelope.ts`.

**Precedence order (normative):**
1. `Accept: text/markdown` (or any type containing it) → the Markdown mirror
   above — wins first, even when `application/json` is also accepted.
2. Accept explicitly prefers `application/json` (or a `+json` suffix type)
   and does not also prefer `text/html` or `text/markdown` → the JSON
   envelope.
3. Otherwise (browsers, a wildcard Accept, empty Accept) → HTML, unchanged.

**Envelope shape:**

```json
{
  "url": "https://deepworkplan.com/about",
  "contentFormat": "markdown",
  "title": "About the methodology",
  "markdown": "# About the methodology\n\n...",
  "language": "en",
  "recovery": {
    "llmsTxt": "https://deepworkplan.com/llms.txt",
    "sitemap": "https://deepworkplan.com/sitemap-index.xml",
    "openapi": "https://deepworkplan.com/openapi.json",
    "developers": "https://deepworkplan.com/developers"
  }
}
```

- `title` — the first `# ` heading of the page's Markdown source (falls back
  to the request path).
- `language` — detected from the first path segment when it is one of the 17
  active language codes, else `en`.
- `markdown` — the same original Markdown source served by the `.md` mirror
  (`contentFormat` records that it is Markdown, not that it has been
  converted).

**Testing with curl:**
```bash
curl -H "Accept: application/json" https://deepworkplan.com/about
```

**Response headers for the JSON envelope:**
- `Content-Type: application/json; charset=utf-8`
- `Cache-Control: public, max-age=3600`
- `Vary: Accept`
- `X-Content-Negotiation: json`

## Analytics

Markdown endpoint usage is tracked server-side via Umami `markdown_request` events. Two sources are distinguished:

| Source | Trigger | Example |
|--------|---------|---------|
| `content_negotiation` | Agent sends `Accept: text/markdown` header | `curl -H "Accept: text/markdown" /about` |
| `direct_url` | Agent/user navigates to a `.md` URL | `curl /about.md` |

Each event captures: bot name (or `"unknown"`), requested path, source, and User-Agent. See **[Analytics Guide](../ANALYTICS.md)** (Tier 5) for payload details and Umami dashboard queries.

**Performance impact:** Zero for HTML visitors — tracking only fires on markdown requests.

## Verifying Content Parity (not just existence)

`pnpm run md:check` (`scripts/check-md-parity.mjs`) only verifies that a
`.md` file **exists** at the expected path for every built HTML page — it
never opens either file, so a `.md` sibling that is empty, stale, or leaks
raw MDX source still passes that check.

`pnpm run md:content-check` (`scripts/check-md-content-parity.mjs`) checks
the **content** itself, for every page pair `md:check` covers, across all
17 active languages:

1. A content-similarity signal — character-trigram Jaccard overlap
   (script-agnostic, so it works for CJK/Thai too) + a length ratio + a
   heading-set overlap — flags pages whose Markdown and HTML have
   diverged (stale content, a truncated mirror, or a genuinely different
   document).
2. An MDX source-leak detector — a precise regex check for bare
   `import … from '…'` lines and unrendered JSX-style component tags
   left in the Markdown output (a serializer bug, not a content-authoring
   gap).

Run it after `pnpm run build`, same as `md:check`. It is **advisory**: it
writes `analysis_results/MD_HTML_CONTENT_PARITY.md` (a summary + a ranked
worst-offenders list) and a full per-pair CSV, exits `0` regardless of
findings, and never edits a file. Some flagged pages are **intentional**
— a collection index page's `.md` may legitimately be a denser standalone
summary than its card-grid HTML landing page — so treat findings as
candidates for review, not automatic defects.

## Maintenance

- **Page Markdown MUST stay in sync with HTML content** — when translation strings (`en.ts`/`es.ts`) or page components (`*Page.astro`) change, update the corresponding files in `src/content/pages/{en,es}/`
- **Both languages required** — every change to an EN `.md` must be reflected in the ES `.md` (and vice versa)
- **Include internal links** — page Markdown should contain links to other site pages so agents can discover the full site structure
- **Full content, not summaries** — page Markdown should match the semantic content of the HTML page (strip presentation chrome, keep all text, links, and structure)
- **Discovery files** — `llms.txt` and `llms-full.txt` reference the endpoints
- **Tests** — `pnpm run test` covers serialization correctness

### Sync Rule for AI Agents

**When ANY of these change, update the corresponding `src/content/pages/{en,es}/*.md`:**

| What Changed | Files to Update |
|---|---|
| Translation strings in `en.ts` | `src/content/pages/en/{page}.md` |
| Translation strings in `es.ts` | `src/content/pages/es/{page}.md` |
| Page component (`*Page.astro`) adds/removes sections | Both EN and ES `.md` files |
| New page created (via `/add-page` skill) | Both EN and ES `.md` files (Step 4 of skill) |
| Page removed | Remove both EN and ES `.md` files |
