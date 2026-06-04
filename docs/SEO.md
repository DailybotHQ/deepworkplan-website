# SEO Guide

This guide documents the SEO architecture, patterns, and best practices for deepworkplan.com. It serves as the single reference for all SEO-related work.

## Overview

The site uses a layered SEO architecture:

| Layer | File | Purpose |
|-------|------|---------|
| Global head | `src/components/BaseHead.astro` | Meta tags, OG, Twitter, hreflang, JSON-LD (WebSite, Person, Organization) |
| JSON-LD injector | `src/components/JsonLd.astro` | Reusable `<script type="application/ld+json">` component |
| Page components | `src/components/pages/*Page.astro` | Page-specific schemas (BreadcrumbList, ContactPage, etc.) |
| Crawl control | `public/robots.txt` | Crawler directives + AI bot allows |
| AI guidance | `public/llms.txt`, `public/llms-full.txt` | LLM/AI engine discovery files |
| Sitemap | Auto-generated via `@astrojs/sitemap` | All pages in both languages |
| Manifest | `public/site.webmanifest` | PWA metadata and icons |
| i18n config | `src/lib/i18n.ts` | Language config, hreflang helpers, URL utilities |
| Constants | `src/lib/constances.ts` | SITE_TITLE, SITE_DESCRIPTION |

## Meta Tags

### Required Tags (Auto-Generated via BaseHead)

Every page automatically gets these tags through `MainLayout` → `BaseHead`:

- `<title>` — from page component's `title` prop
- `<meta name="description">` — from page component's `description` prop
- `<link rel="canonical">` — computed from `Astro.url.pathname`
- `<meta name="viewport">` — fixed: `width=device-width,initial-scale=1`
- `<meta charset="utf-8">`
- `<meta name="author">` — fixed: the Deep Work Plan team
- `<meta name="keywords">` — global site keywords

### Character Length Guidelines

- **Title**: 50-60 characters (displayed in search results)
- **Description**: 130-160 characters (displayed as snippet in SERPs)

### Meta Description Standards (MANDATORY)

**Target length:** 130-160 characters per description (both EN and ES).

**Why this range:**
- Under 130 chars: Wastes SERP real estate, lower click-through rate
- 130-160 chars: Optimal — fully displayed in Google/Bing results
- Over 160 chars: Truncated with "..." in search results, losing key information

**Where descriptions are defined:**

| Content Type | Location | Field |
|-------------|----------|-------|
| Pages | `src/lib/translations/{lang}.ts` | `{pageName}.description` |
| Site default | `src/lib/constances.ts` | `SITE_DESCRIPTION` |

**Rules for writing meta descriptions:**
1. **Length:** 130-160 characters (count BEFORE committing)
2. **Content:** Summarize what the page offers and why it matters
3. **Keywords:** Include 1-2 relevant SEO keywords naturally
4. **Action-oriented:** Use compelling language that encourages clicks
5. **Unique:** Every page must have a unique description (no duplicates)
6. **Both languages:** EN and ES descriptions must both be in range independently
7. **Not literal translations:** ES descriptions should be semantically equivalent but natural in Colombian Spanish

### Keywords

Every page renders the global site keywords via `<meta name="keywords">` (Deep Work Plan, DWP methodology, AI coding agents, spec-driven development, etc.), defined alongside `SITE_DESCRIPTION` in `src/lib/constances.ts`.

### Customizing Per-Page

Page components pass `title` and `description` through `MainLayout`:

```astro
<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
```

For custom OG images, pass `image` prop:

```astro
<MainLayout lang={lang} title="..." description="..." image="/images/custom-og.png">
```

## Structured Data (JSON-LD)

### Available Schemas

| Schema | Location | Scope |
|--------|----------|-------|
| WebSite | `BaseHead.astro` | Global (all pages) |
| Person | `BaseHead.astro` | Global (all pages) |
| Organization | `BaseHead.astro` | Global (Dailybot) |
| Person (enhanced) | `AboutPage.astro` | About page only |
| BreadcrumbList | Most page components | Per-page navigation hierarchy |
| ContactPage | `ContactPage.astro` | Contact page |

### Adding a New Schema

Use the `JsonLd` component in your page component:

```astro
---
import JsonLd from '@/components/JsonLd.astro';

const mySchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'My Event',
  // ... schema properties
};
---

<MainLayout ...>
  <Fragment slot="head">
    <JsonLd data={mySchema} />
  </Fragment>
  <!-- page content -->
</MainLayout>
```

### BreadcrumbList Pattern

Every page should have a BreadcrumbList. Standard pattern:

```astro
const siteUrl = Astro.site?.href?.replace(/\/$/, '') ?? '';

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}${prefix}/` },
    { '@type': 'ListItem', position: 2, name: t.pageName.title, item: `${siteUrl}${prefix}/page-slug` },
  ],
};
```

### Validation

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- View page source → search for `application/ld+json` to inspect schemas

## Multilingual SEO

### Languages

| Language | Code | URL Prefix | OG Locale |
|----------|------|------------|-----------|
| English | `en` | (none) | `en_US` |
| Spanish | `es` | `/es` | `es_ES` |

### Hreflang

Automatically generated in `BaseHead.astro` using `getAlternateUrls()` from `src/lib/i18n.ts`. Every page gets:

- `<link rel="alternate" hreflang="en" href="...">` — English version
- `<link rel="alternate" hreflang="es" href="...">` — Spanish version
- `<link rel="alternate" hreflang="x-default" href="...">` — Points to English (default)

### Canonical URLs

Built from `Astro.url.pathname` + `Astro.site`. Each language version has its own canonical URL (no cross-language canonicals).

### Content Parity

All content MUST exist in both languages:
- Pages: `src/pages/` (EN) + `src/pages/es/` (ES)
- Methodology/spec/kit content: `src/content/{methodology,spec,kit}/en/` + `.../es/`
- Translations: `src/lib/translations/en.ts` + `src/lib/translations/es.ts`

## Social Media (OG + Twitter)

### Open Graph Tags (Auto-Generated)

- `og:type` — `website`
- `og:url` — current page URL
- `og:title` — page title
- `og:description` — page description
- `og:image` — defaults to `/images/og/og-default.png`, customizable via `image` prop
- `og:image:width` — `1200`
- `og:image:height` — `630`
- `og:site_name` — from SITE_TITLE
- `og:locale` — language-specific (en_US / es_ES)
- `og:locale:alternate` — the other language

### Twitter Card Tags

- `twitter:card` — `summary_large_image`
- `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`

> `twitter:site` / `twitter:creator` are intentionally **not** emitted: the
> project has no official X/Twitter account to attribute. Add them only if a
> real handle is created.

### OG Image Guidelines

- Recommended: 1200x630px
- Default fallback: `/images/og/og-default.png`
- Per-page override: pass the `image` prop to `MainLayout`

## AI Engine Optimization (AEO)

For comprehensive AEO documentation, see `docs/aeo/`:
- **[Monthly Checklist](aeo/CHECKLIST.md)** — Maintenance checklist for ongoing AEO health
- **[Markdown for Agents](aeo/MARKDOWN_FOR_AGENTS.md)** — Native Markdown endpoints for AI agent consumption

### Markdown for Agents (Endpoints & Content Negotiation)

Every page serves native Markdown for AI consumption:

| Type | URL pattern (EN) | URL pattern (ES) |
|------|------------------|-------------------|
| Pages | `/{page}.md` | `/es/{page}.md` |

**Content Negotiation:** Agents can send `Accept: text/markdown` header to get Markdown without changing URLs. The Cloudflare Pages middleware (`functions/_middleware.ts`) resolves the `.md` path and serves it with `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`.

**Maintenance:** When page components or translation strings change, update corresponding files in `src/content/pages/{en,es}/`. See **[Markdown for Agents](aeo/MARKDOWN_FOR_AGENTS.md)** for details.

### Files

| File | Purpose | Update When |
|------|---------|-------------|
| `public/llms.txt` | Short-form site description for AI crawlers | Adding/removing pages or sections |
| `public/llms-full.txt` | Comprehensive site description | Major content or structure changes |
| `public/robots.txt` | AI crawler allow directives | New AI crawlers emerge |

### Agent adoption endpoint

The canonical adoption surface ships an agent-facing Markdown prompt at **`/init.md`** (and `/es/init.md`),
generated from `src/content/pages/{en,es}/init.md` via the dynamic `[page].md.ts` route. It is a
self-contained "give this to your agent" onboarding prompt: install the `DailybotHQ/deepworkplan-skill`,
onboard the agent, and generate/execute long-horizon plans. `llms.txt` lists both `/init` and `/init.md`
so crawlers and agents can discover it.

### Maintenance

When adding a new page section:
1. Add the page to `llms.txt` Core Sections list
2. Add a description to `llms-full.txt` Pages section
3. No robots.txt change needed (global `Allow: /` covers new pages)

### Current AI Crawlers Allowed

GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, Google-Extended, Bytespider, CCBot, PerplexityBot, Applebot-Extended, Amazonbot, Meta-ExternalAgent, cohere-ai.

## Images & Performance

### Alt Text

- **Required**: Every `<img>` must have an `alt` attribute
- **Content images**: Descriptive alt text (e.g., `alt={post.data.title}`)
- **Decorative images**: `alt=""` only when truly decorative

### Dimensions

Always include `width` and `height` attributes to prevent CLS (Cumulative Layout Shift).

### Lazy Loading

- **Below-fold images**: `loading="lazy"`
- **Above-fold images** (hero, LCP): Do NOT add `loading="lazy"`

### Optimization Workflow

```bash
# Drop staged images into the optimizer's staging directory, then run:
pnpm run images:optimize
```

See **[Image Optimization](features/IMAGE_OPTIMIZATION.md)** for the full workflow.

## PageSpeed & Core Web Vitals

### Target Scores

90+ across Performance, Accessibility, Best Practices, and SEO.

### Hydration Directives

| Directive | Use When |
|-----------|----------|
| `client:load` | Immediate interactivity needed (Header, search, typewriter) |
| `client:visible` | Below-fold interactive components (timelines, ScrollToTimeline) |
| `client:idle` | Non-urgent interactivity (defer until browser is idle) |

**Rule**: Always use the laziest hydration that works. Prefer `client:visible` over `client:load`.

### Font Loading

- Fonts preloaded in BaseHead: `atkinson-regular.woff`, `atkinson-bold.woff`
- `font-display: swap` in CSS (prevents FOIT)

### CLS Prevention

- All images have explicit dimensions
- Font preloads prevent font-swap shifts
- Theme script runs inline before paint (no FOUC)

## Web App Manifest

**File**: `public/site.webmanifest`

Contains: name, short_name, description, start_url, display mode, theme colors, and icons.

**Icons**: Generated from `public/favicon.svg`:
- `public/icons/icon-192x192.png` — Android/PWA
- `public/icons/icon-512x512.png` — Android/PWA splash
- `public/icons/apple-touch-icon.png` — iOS (180x180)

**Links in BaseHead**:
- `<link rel="manifest" href="/site.webmanifest">`
- `<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">`

## Sitemap & Robots.txt

### Sitemap

Auto-generated by `@astrojs/sitemap` during build. Config in `astro.config.mjs`. Produces `sitemap-index.xml` with all pages in both languages.

### Robots.txt

**Location**: `public/robots.txt`

Structure:
1. Default `Allow: /` with `Disallow: /api/`
2. Sitemap reference
3. Individual `Allow: /` for each AI crawler

**When to update**: Only when adding new AI crawler entries or changing crawl rules.

## Checklists

### New Page SEO Checklist

- [ ] Page component has `title` and `description` props passed to MainLayout
- [ ] Meta description is 130-160 characters (EN and ES independently)
- [ ] BreadcrumbList JSON-LD schema added via `<Fragment slot="head">`
- [ ] Page exists in both `src/pages/` (EN) and `src/pages/es/` (ES)
- [ ] Translation strings added to both `en.ts` and `es.ts`
- [ ] `llms.txt` Core Sections updated with new page
- [ ] `llms-full.txt` Pages section updated
- [ ] Verify hreflang in generated HTML
- [ ] Verify OG tags in generated HTML

### New Content Doc SEO Checklist (methodology / spec / kit)

- [ ] Doc exists in both `src/content/{collection}/en/` and `.../es/` (same English slug)
- [ ] Spanish content carries correct diacritics (ñ, tildes, ¿/¡)
- [ ] Matching `src/content/pages/{en,es}/*.md` endpoint stays in sync (`pnpm run md:check`)
- [ ] BreadcrumbList schema auto-generated (verify in HTML)

### Pre-Deploy SEO Checklist

- [ ] `pnpm run biome:check` passes
- [ ] `pnpm run astro:check` passes
- [ ] `pnpm run build` succeeds
- [ ] Sitemap generates correctly
- [ ] `llms.txt` and `llms-full.txt` are current
- [ ] No empty alt attributes on content images
