# Architecture Guide

This document describes the technical architecture of deepworkplan.com, the methodology-and-marketing site for the Deep Work Plan (DWP) methodology, built with Astro.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        deepworkplan.com                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Content    │  │  Components  │  │    Pages     │          │
│  │ Collections  │  │ .astro/.svelte│  │  (Routing)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         └────────────┬────┴────────────────┘                   │
│                      │                                          │
│              ┌───────▼───────┐                                  │
│              │  Astro Build  │                                  │
│              │    (SSG)      │                                  │
│              └───────┬───────┘                                  │
│                      │                                          │
│              ┌───────▼───────┐                                  │
│              │ Static HTML   │                                  │
│              │  + Islands    │                                  │
│              └───────────────┘                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Cloudflare Pages │
                    │   (Hosting)     │
                    └─────────────────┘
```

## Core Concepts

### Islands Architecture

Astro uses an "islands architecture" where:

1. **Static HTML** is generated at build time
2. **Interactive islands** (Svelte components) are hydrated on the client
3. **Zero JavaScript** by default - JS only loads for interactive parts

```astro
<!-- Static - no JS shipped -->
<Header />

<!-- Interactive island - JS hydrated -->
<SearchBar client:load />
```

### Build Process

```
Source Files → Astro Build → Static Output
    │                            │
    ├── .astro files            ├── HTML pages
    ├── .svelte files           ├── CSS bundles
    ├── .md/.mdx content        ├── JS chunks (islands only)
    └── assets                  └── Static assets
```

## Project Structure

### Source Directory (`src/`)

```
src/
├── components/              # Reusable UI components
│   ├── AnnouncementBar.astro # Reusable top-of-page announcement strip (toggle via ANNOUNCEMENT.enabled)
│   ├── BaseHead.astro       # <head> content (SEO, meta, hreflang, OG, JSON-LD)
│   ├── Footer.astro         # Site footer
│   ├── WebMcp.astro         # WebMCP progressive enhancement (agent-discoverable site map)
│   ├── FormattedDate.astro  # Date formatting (per-language)
│   ├── HeaderLink.astro     # Navigation link
│   │
│   ├── home/                # Homepage sections (rendered by HomePage.astro)
│   │   ├── Hero.astro                # Value proposition + copy-init.md CTA
│   │   ├── ActHumansSteer.astro      # Story Act I — Humans steer. Agents execute.
│   │   ├── ActPlanNoDrift.astro      # Story Act II — A plan agents can't drift from.
│   │   ├── ActDoneIsAContract.astro  # Story Act III — Done is a contract, not a vibe.
│   │   ├── ActRepoAsHarness.astro    # Story Act IV — The repository is the harness.
│   │   ├── Onboarding.astro          # Reasoning-based onboarding steps
│   │   ├── Quickstart.astro          # One-instruction quickstart
│   │   ├── Outcomes.astro            # What onboarding generates
│   │   ├── Agents.astro              # Supported coding agents
│   │   ├── Stacks.astro              # Stack presets
│   │   ├── Archetypes.astro          # Individual repo vs orchestrator hub
│   │   ├── Comparison.astro          # Methodology vs tool comparison table
│   │   ├── Origin.astro              # Origin quote
│   │   └── FinalCta.astro            # Closing call to action
│   │
│   ├── editorial/          # Editorial primitives (Kicker, Rule, Lead, Figure, Reference)
│   │
│   ├── pages/              # Shared page components (*Page.astro, QuickstartPage, readers)
│   │   ├── ComparePage.astro       # Objective comparison and source notes
│   │   ├── CompareMatrix.astro     # Responsive capability matrix
│   │   └── FaqPage.astro           # Grouped FAQ with FAQPage JSON-LD
│   │
│   └── layout/
│       ├── Header.svelte        # Masthead navigation + inline hurricane-lamp theme toggle
│       └── MobileMenu.svelte    # Mobile nav menu
│
├── content/                 # Content Collections (one folder per active language)
│   ├── methodology/         # Methodology docs (primary content)
│   │   ├── en/, es/, pt/, zh/, ja/, de/, fr/, ko/, ru/, it/, tr/, id/, vi/, hi/, pl/, uk/, th/   # 17 language folders
│   ├── spec/                # Readable specification (same 17 language folders)
│   ├── kit/                 # Kit catalog (same 17 language folders)
│   └── pages/               # Agent-friendly Markdown endpoints (same 17 language folders)
│
├── content.config.ts        # Collection schemas (methodology, spec, kit, pages)
├── env.d.ts                 # TypeScript environment
│
├── layouts/
│   ├── MainLayout.astro     # Base page layout (public site)
│   ├── InternalLayout.astro # Dev-only hub layout
│   └── ShowcaseLayout.astro # Dev-only design-system showcase layout
│
├── lib/                     # Utilities
│   ├── i18n.ts              # Centralized i18n config; getActiveLanguages() derived from translations/*.ts
│   ├── language-codes.ts    # Dependency-free LANGUAGE_CODES tuple (imported by i18n + astro.config)
│   ├── markdown-for-agents.ts  # Helpers for the agent-friendly .md endpoints
│   ├── analytics.ts         # Analytics helpers
│   ├── constances.ts        # Site constants
│   └── translations/        # Modular translation system (one file per active language)
│       ├── index.ts         # Public API barrel: getTranslations(), glob-loads <lang>.ts
│       ├── types.ts         # SiteTranslations interface + all sub-interfaces
│       └── en.ts, es.ts, pt.ts, zh.ts, ja.ts, de.ts, fr.ts, ko.ts, ru.ts, it.ts, tr.ts, id.ts, vi.ts, hi.ts, pl.ts, uk.ts, th.ts
│
├── pages/                   # File-based routing
│   ├── index.astro          # Home (default language: English)
│   ├── about.astro          # ~3-line wrapper passing lang="en"
│   ├── contact.astro
│   ├── developers.astro     # Agent & developer portal (+ [lang]/developers.astro)
│   ├── privacy.astro        # Privacy policy (+ [lang]/privacy.astro)
│   ├── examples/            # Reader index + [slug] + .md endpoint
│   ├── kit/                 # Reader index + [slug] + .md endpoint
│   ├── methodology/         # Reader index + [slug] + .md endpoint
│   ├── spec/                # Reader index + [slug] + .md endpoint
│   ├── quickstart/, init/   # Section + nested pages
│   ├── [lang]/              # Single dynamic tree serving ALL non-default languages
│   │   ├── index.astro      # Home (non-default langs); getStaticPaths from registry
│   │   ├── about.astro      # Same component, lang derived from Astro.params
│   │   ├── examples/, kit/, methodology/, spec/, quickstart/, init/
│   │   └── …
│   └── internal/            # Dev-only hub (excluded from production builds)
│
├── pages has NO api/ dir    # The agent API is static files (public/) + functions/ — see "Agent API"
├── functions/               # Cloudflare Pages Functions (edge): api/mcp.ts + _middleware.ts
├── middleware.ts            # Route allowlist (KNOWN_BASE_PATHS, derived KNOWN_ROOT_PATHS); see below
│
└── styles/
    └── global.css           # Global styles, Tailwind 4 @theme tokens, base browser-compat reset
```

## Component Architecture

### Component Types

| Type | Extension | Rendering | Use Case |
|------|-----------|-----------|----------|
| Astro | `.astro` | Build-time (static) | Layouts, static content |
| Svelte | `.svelte` | Client-side (hydrated) | Interactive UI |

### Astro Component Structure

```astro
---
// Component Script (server-side, build-time)
import { getCollection } from 'astro:content';

// Props interface
interface Props {
  title: string;
  lang: 'en' | 'es';
  limit?: number;
}

// Destructure with defaults
const { title, lang, limit = 5 } = Astro.props;

// Data fetching (runs at build time)
const allDocs = await getCollection('methodology', ({ data }) => data.lang === lang);
const docs = allDocs
  .sort((a, b) => a.data.order - b.data.order)
  .slice(0, limit);
---

<!-- Component Template (HTML) -->
<section class="py-12">
  <h2 class="text-3xl font-bold mb-8">{title}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {docs.map((doc) => (
      <a href={`/methodology/${doc.id}`} class="reader-card">
        <h3>{doc.data.title}</h3>
        <p>{doc.data.description}</p>
      </a>
    ))}
  </div>
</section>

<style>
  /* Scoped CSS (optional) */
  section {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
```

### Svelte Component Structure

```svelte
<script lang="ts">
  // Imports
  import { onMount } from 'svelte';
  import type { CollectionEntry } from 'astro:content';

  // Props (Svelte 5 runes)
  interface Props {
    doc: CollectionEntry<'methodology'>;
  }
  let { doc }: Props = $props();

  // State
  let isHovered = $state(false);

  // Derived values
  let summary = $derived(doc.data.summary ?? doc.data.description);
</script>

<article
  class="card"
  class:hovered={isHovered}
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
>
  <h3>{doc.data.title}</h3>
  <p>{summary}</p>
</article>

<style>
  .card {
    padding: 1rem;
    border-radius: 0.5rem;
    transition: transform 0.2s;
  }
  .hovered {
    transform: translateY(-4px);
  }
</style>
```

### Hydration Directives

Control when Svelte components load JavaScript:

| Directive | Behavior | Use Case |
|-----------|----------|----------|
| `client:load` | Hydrate immediately | Critical interactivity |
| `client:visible` | Hydrate when in viewport | Below-fold content |
| `client:idle` | Hydrate when browser idle | Low-priority |
| `client:media` | Hydrate on media query | Responsive features |
| (none) | No hydration | Static rendering |

```astro
<!-- Header needs immediate interactivity (includes the inline hurricane-lamp theme toggle) -->
<Header client:load lang={lang} />

<!-- Mobile menu can wait until visible -->
<MobileMenu client:visible lang={lang} />
```

Note: the standalone `ThemeToggle.astro` component has been removed. The theme toggle is now a hurricane-lamp `<button>` inline in `src/components/layout/Header.svelte`; it ships as part of the masthead and inherits the Header's `client:load` directive.

## Content Collections

### Schema Definition

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const methodology = defineCollection({
  loader: glob({ base: './src/content/methodology', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    lang: z.enum(['en', 'es']),
    summary: z.string().optional(),
    icon: z.string().optional(),
  }),
});

const spec = defineCollection({
  loader: glob({ base: './src/content/spec', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    lang: z.enum(['en', 'es']),
    section: z.string().optional(),
  }),
});

const kit = defineCollection({
  loader: glob({ base: './src/content/kit', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      kind: z.enum(['command', 'adapter', 'preset', 'example', 'addon']),
      lang: z.enum(['en', 'es']),
      order: z.number().optional(),
    })
    .loose(),
});

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date().optional(),
  }),
});

export const collections = { pages, methodology, spec, kit };
```

### Querying Content

```typescript
import { getCollection } from 'astro:content';

// Get all methodology docs
const allDocs = await getCollection('methodology');

// Filter by language
const enDocs = await getCollection('methodology', ({ data }) =>
  data.lang === 'en'
);

// Sort by order
const orderedDocs = enDocs.sort(
  (a, b) => a.data.order - b.data.order
);

// Filter the kit catalog by kind
const presets = await getCollection('kit', ({ data }) =>
  data.lang === 'en' && data.kind === 'preset'
);
```

### Content File Structure

Methodology, spec, and kit content is split by language folder. Slugs are in English on both
languages; the EN and ES versions of a document share the same English slug.

```
src/content/
├── methodology/
│   ├── en/                              # English docs
│   │   ├── what-is-dwp.md
│   │   ├── adopting-dwp.md
│   │   └── ...
│   └── es/                              # Spanish docs (matching slugs)
│       ├── what-is-dwp.md
│       ├── adopting-dwp.md
│       └── ...
├── spec/
│   ├── en/
│   └── es/
├── kit/
│   ├── en/
│   └── es/
└── pages/
    ├── en/                              # Agent-friendly .md endpoints
    └── es/
```

## Routing System

### File-Based Routing

```
src/pages/
├── index.astro          → /
├── about.astro          → /about
├── contact.astro        → /contact
├── examples.astro       → /examples
├── compare.astro        → /compare
├── faq.astro            → /faq
├── quickstart/           → /quickstart (canonical adoption page; /init, /setup, /onboarding 301 here)
├── methodology/
│   ├── index.astro      → /methodology
│   ├── [slug].astro     → /methodology/what-is-dwp
│   └── [page].md.ts     → /methodology/what-is-dwp.md
├── spec/                → /spec, /spec/[slug], /spec/[page].md
├── kit/                 → /kit, /kit/[slug], /kit/[page].md
└── es/
    └── ...              → Spanish mirror (/es/...)
```

### Dynamic Routes

```astro
---
// src/pages/methodology/[slug].astro
import { getCollection, render } from 'astro:content';
import MainLayout from '@/layouts/MainLayout.astro';

// Generate static paths at build time (English docs)
export async function getStaticPaths() {
  const docs = await getCollection('methodology', ({ data }) => data.lang === 'en');
  return docs.map((doc) => ({
    params: { slug: doc.id },
    props: { doc },
  }));
}

const { doc } = Astro.props;
const { Content } = await render(doc);
---

<MainLayout lang="en" title={doc.data.title} description={doc.data.description}>
  <article>
    <h1>{doc.data.title}</h1>
    <Content />
  </article>
</MainLayout>
```

### Middleware Allowlist (CRITICAL)

`src/middleware.ts` enforces an **allowlist** of single-segment top-level paths. Any single-segment URL not in the set is rewritten to `/404` — **even if the file exists at `src/pages/<name>/index.astro`**. The allowlist is **derived** from one hand-edited set plus the language registry, so adding a new language requires no middleware edit at all:

- `KNOWN_BASE_PATHS` — per-language page slugs (e.g. `about`, `contact`, `compare`, `faq`, `methodology`, `spec`, `kit`, `examples`, `quickstart`, `init`, `trust`, `developers`, `privacy`, `setup`, `onboarding`, `docs`). These exist for **every** language: at the root for the default language and under `/<lang>/<slug>` for every other active language. ONE place, covers all languages. (`init`/`setup`/`onboarding` redirect to `/quickstart`, the single canonical adoption page; `docs` redirects to `/developers`. `/init.md` itself is a standalone static file — `public/init.md` — never redirected, no HTML sibling, English-only.)
- `ROOT_ONLY_PATHS` — non-per-language paths (`api`, `internal`, `404`, `favicon.ico`, `favicon.svg`, `sitemap-index.xml`).
- `PREFIXED_LANGUAGES` — active non-default language codes (`es`, `pt`, `zh`, …), derived from `getActiveNonDefaultLanguages()` in `src/lib/i18n.ts`. These are the valid single-segment language roots (`/es`, `/pt`, …).
- `KNOWN_ROOT_PATHS` — derived union of the three sets above (`KNOWN_BASE_PATHS` ∪ `ROOT_ONLY_PATHS` ∪ `PREFIXED_LANGUAGES`).

**Why it matters when adding a new page:**

When you add a new top-level page (e.g. `/guides`, `/foo`), you only edit ONE place: add `'<name>'` to `KNOWN_BASE_PATHS`. That single entry covers `/foo`, `/es/foo`, `/pt/foo`, `/zh/foo`, … automatically.

**Symptoms of forgetting:**

| URL | Result | Explanation |
|-----|--------|-------------|
| `/<name>` | 404 | Single segment, not in `KNOWN_ROOT_PATHS` → middleware rewrites to /404 |
| `/<lang>/<name>` | 404 | `lang` is a prefixed-language root but `name` is not in `KNOWN_BASE_PATHS` |
| `/<name>/sub-path` | 200 | Multi-segment, allowlist rule does not apply |
| `/<name>/index.html` | 200 | Path contains `.`, middleware skips the check |

**The smoking gun:** dev server logs show `[404] (rewrite) /<name>` — the `(rewrite)` literal is the marker. It comes from `context.rewrite()` in the middleware, NOT from Astro's router. Do NOT debug Astro routing, file-system caches, or `[...slug]` vs `[slug]` before checking this allowlist first.

The bypass conditions (path contains `.` or starts with `/_astro/`, `/__vite`, `/@`) exist to let assets, HMR, and build artifacts through.

**Adoption page `/quickstart` and adoption prompt `/init.md`.** The canonical adoption surface lives at `/quickstart` (default language) and `/<lang>/quickstart` for every other active language (`/es/quickstart`, `/pt/quickstart`, `/zh/quickstart`, …), served by `QuickstartPage.astro` + the page-wrapper pattern. `quickstart` is present in `KNOWN_BASE_PATHS`, so it works in every language without a per-language allowlist edit. Its companion agent prompt is published at the **canonical English-only, standalone** URL `/init.md` (regardless of which locale a user is browsing) — a plain static file at `public/init.md`, not a content-collection page: it has no HTML sibling and is never redirected. See `CANONICAL_INIT_MD_PATH` and `getCanonicalInitMarkdown()` in `src/lib/i18n.ts` / `src/lib/init-prompt.ts`. `/init`, `/setup`, and `/onboarding` (plus their `/<lang>/` variants) are permanent 301 redirects to `/quickstart`, configured in `astro.config.mjs`; the redirect source paths are also in `KNOWN_BASE_PATHS`.

## Agent API

The site has **no Astro API routes** (`src/pages/api/` does not exist). The agent/developer API is a read-only, zero-auth surface built from two layers, all described by the OpenAPI spec at `public/openapi.json` (see `/developers`):

### Static machine-readable layer (`public/`)

| Path | Purpose |
|------|---------|
| `/openapi.json` | OpenAPI 3.1 spec of the whole agent API (version-stamped by `scripts/stamp-versions.mjs` in `prebuild`) |
| `/api/health.json` | Static health marker |
| `/llms.txt`, `/llms-full.txt` | LLM guidance indexes (hand-authored; include the When-to-use section) |
| `/.well-known/*` | ai-catalog.json (ARD agentmap), api-catalog (RFC 9727), mcp.json (MCP manifest), mcp/server-card.json, agent-skills/index.json (generated by prebuild), security.txt, dwp.json, oauth stubs |
| `/{page}.md`, `/{lang}/{page}.md` | Per-page Markdown mirrors, prerendered from the `pages` collection (`[page].md.ts` routes) |

### Cloudflare Pages Functions layer (`functions/`)

| File | Responsibility |
|------|----------------|
| `functions/api/mcp.ts` | Stateless MCP server at `/api/mcp` (Streamable HTTP, JSON-RPC 2.0: `initialize`, `ping`, `tools/list`, `tools/call`; tools `get_init_prompt`, `list_site_sections`, `read_page`). Thin adapter — all protocol logic lives in `src/lib/mcp/` (unit-tested; Astro-import-free because the Functions runtime is a CF Worker that cannot bundle `astro:content` or the `@/` alias — use relative imports) |
| `functions/_middleware.ts` | (1) robots.txt Lighthouse rewrite, (2) `Accept: text/markdown` content negotiation, (2b) `Accept: application/json` content negotiation — a typed JSON envelope for page mirrors (`src/lib/json-envelope.ts`; Markdown still wins when both are accepted), (3) AI-bot analytics to Umami, (4) **agent-friendly errors**: unknown `/api/*` paths get structured JSON errors (`src/lib/agent-recovery.ts`), and Markdown-negotiating clients that hit a 404 get a Markdown recovery body — an extension-bearing unknown path (e.g. `/nope.json`) is also admitted when the client explicitly sends `text/markdown` or `application/json`; every 404 (API JSON, Markdown body, and the HTML passthrough alike) carries a recovery `Link` header (`recoveryLinkHeaders`) pointing at the sitemap, llms.txt, and `/developers` |

Notes:

- `public/_headers` applies **only to static assets** — the MCP Function sets its own CORS/protocol headers.
- `robots.txt` allows `/api/` (the namespace exists for agents) and disallows `/internal/` as defense-in-depth.
- `/docs` (and `/<lang>/docs`) redirect to `/developers` via `astro.config.mjs` (`docsRedirects`, same pattern as `adoptionRedirects`); `docs` sits in `KNOWN_BASE_PATHS`.
- Adding a JSON artifact? Prefer a static file in `public/` + an entry in `openapi.json`, `.well-known/api-catalog`, and `ai-catalog.json` so the surface stays discoverable.

## Layout System

### MainLayout

All pages wrap content in `MainLayout`:

```astro
---
// src/layouts/MainLayout.astro
import '@/styles/global.css';
import BaseHead from '@/components/BaseHead.astro';
import Footer from '@/components/Footer.astro';
import Header from '@/components/layout/Header.svelte';

interface Props {
  lang: string;
  title: string;
  description: string;
}

const { lang, title, description } = Astro.props;
---

<html lang={lang}>
  <head>
    <BaseHead title={title} description={description} />
    <slot name="head" />
    <script is:inline>(function(){var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();</script>
  </head>
  <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header client:load lang={lang} />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer lang={lang} />
  </body>
</html>
```

### Usage via Page Wrapper Pattern

Content pages **do not** import `MainLayout` directly. Instead, they use the Page wrapper pattern:

1. A **shared page component** in `src/components/pages/*Page.astro` handles `MainLayout` internally
2. **Thin page wrappers** in `src/pages/` are 3-line files that only set the language

**Shared component** (`src/components/pages/AboutPage.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import type { Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <section class="py-12">
    <h1>{t.aboutPage.title}</h1>
    <!-- Content using t.* for text -->
  </section>
</MainLayout>
```

**Page wrapper** (`src/pages/about.astro`):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

This ensures one source of truth per page, with `MainLayout` managed inside the component.

## Styling Architecture

### Tailwind CSS v4

Configuration in `tailwind.config.mjs`:

```javascript
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### Global Styles

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme {
  --color-paper: #f7f4ec; /* Warm newsprint paper (light bg) */
  --color-ink: #1b1a17; /* Warm near-black ink (body text) */
  --color-main: #14140f; /* Branded / dark surfaces (masthead) */
  --color-secondary: #7a1f1f; /* Restrained oxblood accent */
  --font-serif: "Newsreader", Georgia, serif; /* Serif display + body */
  --font-sans: "Atkinson", system-ui, sans-serif; /* Legible fallback */
  --font-mono: ui-monospace, monospace;
}

/* Global utilities */
.main-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

### Editorial design system

The site uses the "Broadsheet" editorial system — serif-led, warm paper, ink type, hairline rules, and a
single restrained oxblood accent. `@theme` defines `--font-serif` (a self-contained system serif stack used
for both headings and body), `--font-sans` (Atkinson Hyperlegible fallback), and `--font-mono`, mapped to
Tailwind's `font-serif` / `font-sans` / `font-mono` utilities. `global.css` also adds editorial utilities
(`.font-display`, `.kicker`, `.lead`, `.drop-cap`, `.fig-caption`, `.reference-item`, `.nums-tabular`,
`.main-container`). Reusable primitives live in **`src/components/editorial/`**: `Kicker.astro`,
`Rule.astro`, `Lead.astro`, `Figure.astro`, and `Reference.astro` — all dark-mode aware and WCAG AA. The
header (`Header.svelte`) renders as a newspaper masthead with a hairline rule. See the
[Brand Guide](BRAND_GUIDE.md) for the full palette and type system.

### Dark Mode

Class-based dark mode with theme persistence:

```javascript
// Inlined in MainLayout.astro (no external file)
var t = localStorage.getItem('theme');
if (!t) t = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
if (t === 'dark') document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');
```

## Internationalization

The site is multilingual-ready (currently English/Spanish) using a centralized i18n configuration module and translation system. The architecture supports N languages with zero changes to components or utilities.

### i18n Configuration (`src/lib/i18n.ts`)

The centralized i18n module contains:
- `Language` type — union of all supported language codes
- `LANGUAGES` registry — config per language (name, locale, URL prefix, flag)
- Utility functions — `getUrlPrefix()`, `getDateLocale()`, `getOGLocale()`, `getLocalizedUrl()`, `getAlternateUrls()`, `stripLangPrefix()`, etc.

### Page Wrapper Pattern

All content pages use the **Page wrapper pattern** to eliminate duplication across languages. Each `*Page.astro` component handles `MainLayout`, translations, and SEO metadata internally. Page files in `src/pages/` are ultra-minimal 3-line wrappers that only set the language.

```
src/components/pages/           # Shared page components (handle MainLayout internally)
├── HomePage.astro              # Receives lang prop, wraps in MainLayout
├── AboutPage.astro
├── ContactPage.astro
├── ExamplesPage.astro
├── QuickstartPage.astro        # Canonical adoption page (/init, /setup, /onboarding redirect here)
└── ...                         # Methodology / spec / kit readers

src/pages/                      # Thin routing wrappers (3 lines each)
├── index.astro                 # <HomePage lang="en" />
├── about.astro                 # <AboutPage lang="en" />
├── contact.astro               # <ContactPage lang="en" />
└── es/
    ├── index.astro             # <HomePage lang="es" />
    ├── about.astro             # <AboutPage lang="es" />
    └── contact.astro           # <ContactPage lang="es" />
```

**Key rules:**
- Page components handle `MainLayout` internally — wrappers never import `MainLayout`
- The `lang` prop is passed as a string literal (`"en"`, `"es"`), not a variable
- For a new page: create 1 `*Page.astro` component + N thin wrappers (one per language)
- Benefits: DRY, scalable to N languages, content changes in a single file

### Route Structure

```
src/pages/
├── index.astro          # English (default)
├── about.astro
├── contact.astro
├── methodology/         # English methodology/spec/kit readers
├── spec/
├── kit/
└── es/
    ├── index.astro      # Spanish
    ├── about.astro
    ├── contact.astro
    ├── methodology/     # Spanish readers
    ├── spec/
    └── kit/
```

### Translation System

All UI strings are centralized in `src/lib/translations/`. The translation system is modular with separate files for each language:

**Directory Structure:**
```
src/lib/translations/
├── index.ts    # Public API barrel: getTranslations(), re-exports
├── types.ts    # SiteTranslations interface + all sub-interfaces
├── en.ts       # English translations
└── es.ts       # Spanish translations
```

**Usage in page components** (`src/components/pages/*Page.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import type { Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
---
<MainLayout lang={lang} title={t.methodologyPage.meta.title} description={t.methodologyPage.meta.description}>
  <!-- Content using t.* for all user-visible text -->
</MainLayout>
```

Page wrappers in `src/pages/` never use translations directly — they just pass `lang`.

**Adding a new language:**

1. Create `src/lib/translations/{lang}.ts` exporting a `SiteTranslations` object
2. Import it in `src/lib/translations/index.ts` and add to the `translations` record
3. Update the `Language` type in `src/lib/i18n.ts`

**Adding new translation keys:**

1. Add the new interface field to `src/lib/translations/types.ts` (if needed)
2. Add translations to **every** locale file under `src/lib/translations/` (en.ts, es.ts, pt.ts, zh.ts, …)
3. Run `pnpm run i18n:check` to verify parity
4. Use the new key via `getTranslations(lang)` in components

### Localized Content Collections

Methodology, spec, and kit content is split by language folder; the EN and ES versions of a
document share the same English slug:

```
src/content/methodology/
├── en/    # English docs
└── es/    # Spanish docs (matching slugs)
```

## Dogfooding DWP

This repository runs on the methodology it documents.

- **Vendored, repo-adapted `deepworkplan` skill.** The official DeepWorkPlan skill lives under `.agents/skills/deepworkplan/` and is **tracked in git**. It is adapted to this repository (kit wiring, onboarded conventions) and is **not** overwritten by the release dogfood step — update it only via an explicit, reviewed change that re-adapts it. A committed `skills-lock.json` records the install provenance.
- **Auto-refreshed addon skills.** `.agents/skills/dailybot/` and `.agents/skills/ai-diff-reviewer/` are also vendored and tracked. [`release_and_publish.yml`](../.github/workflows/release_and_publish.yml) Step 1a refreshes **only those two** to their latest upstream tags on every website release. See [AGENTS.md → Vendored agent skills](../AGENTS.md).
- **Thin command delegators.** The committed `dwp-*` commands (`/dwp-create`, `/dwp-execute`, `/dwp-refine`, `/dwp-resume`, `/dwp-status`) are ~20-line delegators that read the installed skill's sub-skills and follow them — no embedded logic in the command files themselves.
- **The author sub-skill.** `/skill-create` and `/agent-create` are thin delegators to the skill's **author** sub-skill, which grows the repository's own skills, agents, and commands and keeps the `.agents/docs/` catalog in sync.
- **The dependency-upgrade add-on.** `/lib-upgrade` delegates to the opt-in **dependency-upgrade** add-on, which reasons about the actual package manager (pnpm here) and upgrades in validated, revertible batches.
- **`.dwp/` output.** All Deep Work Plan working state (plans) lives in the gitignored `.dwp/` directory (`.dwp/plans/`) — Lite and Full plans alike; there is no separate draft artifact. The legacy homegrown command engine has been retired in favor of the installed skill.

## Architecture Patterns

### 1. Astro Components

`.astro` files are the foundation. Script block (frontmatter) runs at build time. Use for all non-interactive content. Svelte is only for interactive components.

```astro
---
interface Props {
  title: string;
  count?: number;
}
const { title, count = 5 } = Astro.props;
---

<section class="py-12">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
</section>
```

### 2. Content Collections

Methodology, spec, kit, and pages content use Astro Content Collections with Zod schemas defined in `src/content.config.ts`.

### 3. Svelte Integration

Use Svelte for interactive components. Always include a `client:*` directive (`client:visible` preferred over `client:load`).

### 4. Page Wrapper Pattern (MANDATORY)

Pages in `src/pages/` are ultra-minimal routing wrappers. All logic lives in `*Page.astro` components in `src/components/pages/`. Adding a new page is exactly **two** wrappers regardless of how many languages ship: one default-language file at the root and one dynamic `[lang]` file that covers all 16 (or N) non-default languages.

**Key rules:**

- Page components handle `MainLayout` internally — wrappers **never** import `MainLayout`
- The default-language wrapper passes `lang="en"` as a string literal; the dynamic wrapper derives `lang` from `Astro.params`
- For a new page: create **1 `*Page.astro` component** + **1 default-lang wrapper** + **1 `[lang]` dynamic wrapper** (regardless of how many languages exist)
- All user-visible text uses `getTranslations(lang)`, all URLs use `getUrlPrefix(lang)`
- Add the new page's slug to `KNOWN_BASE_PATHS` in `src/middleware.ts` — one entry covers every language

**Page component** (`src/components/pages/AboutPage.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix, type Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <!-- page content using t.* for text, prefix for URLs -->
</MainLayout>
```

**Default-lang wrapper** (`src/pages/about.astro` — 3 lines):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

**Dynamic `[lang]` wrapper** (`src/pages/[lang]/about.astro` — covers all non-default languages):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';

export function getStaticPaths() {
  return getActiveNonDefaultLanguages().map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Language };
---
<AboutPage lang={lang} />
```

### 5. i18n Routing

The default language (English) is served from `src/pages/` at the root. Every non-default active language is served from the single dynamic `src/pages/[lang]/**` tree — `getStaticPaths()` enumerates the registry via `getActiveNonDefaultLanguages()`, so adding a new language requires zero edits in `src/pages/`. Page components in `src/components/pages/` receive `lang` and handle translations internally.

### 6. Internal Hub (Dev-Only)

Dev-only portal at `/internal/`. Uses `InternalLayout` or `ShowcaseLayout` (never `MainLayout`). English-only, no Page Wrapper pattern. Automatically excluded from production builds via three layers (post-build deletion, sitemap filter, noindex meta).

### Addon refresh — the full sequence

**How addon refresh works.** [`release_and_publish.yml`](.github/workflows/release_and_publish.yml) (which fires on every merge to `main`) has a dogfood step (Step 1a) that runs **before** the version bump and refreshes **only** `dailybot` and `ai-diff-reviewer`:

1. Resolves the latest tag of each auto-refreshed upstream skill via `gh release view --repo <owner/repo>`.
2. Compares against the vendored `SKILL.md` `version:` field. Only installs skills that actually moved.
3. Runs `npx --yes skills add <repo>@<tag> --skill <name> --force -y` — the exact command any downstream consumer would run, so this doubles as a live smoke test. Both `--yes` (npm's proceed prompt) AND `-y` (the skills CLI's agent-picker prompt) are required in a non-TTY runner — dropping either hangs the workflow indefinitely.
4. Asserts the invariant: installed `SKILL.md` version equals the requested tag. Refuses to proceed with the release if not.
5. If any files changed, commits `chore: dogfood vendored skills to (…)` locally with a selective subject that names ONLY the skills that moved (e.g., `chore: dogfood vendored skills to dailybot v3.10.3, ai-diff-reviewer v2.0.0`). Step 3's `git push --follow-tags` sends this commit alongside the version-bump commit and the tag in a single atomic push, and the dogfood commit appears in the auto-generated GitHub Release notes.

**Semantics.** Addon skill refresh is **release-driven**, not autonomous — no scheduled/cron refresh runs in the background. The auto-refreshed vendored copies advance only when a maintainer merges a PR to `main`, which is the same moment `release_and_publish.yml` cuts a new website release.

**Failure semantics.**
- `npx skills add` failure OR version-invariant mismatch → **fails the release** (a broken upstream tag must never quietly ship inside a website version).
- Transient `gh release view` blip (rate limit, temporary outage) → skips only that skill for this release; the release itself proceeds.
- Both auto-refreshed addon skills already at latest → clean no-op, no dogfood commit, release proceeds normally.

**Editing policy.**
- **Do not** hand-edit `.agents/skills/dailybot/` or `.agents/skills/ai-diff-reviewer/` — the next release will overwrite those edits. Contribute upstream, then merge any PR to trigger a website release that picks up the new upstream tag.
- **Do** treat `.agents/skills/deepworkplan/` as repo-adapted: changes there must be intentional and reviewed. Prefer contributing reusable improvements upstream in `DailybotHQ/deepworkplan-skill`, then re-adapting this copy deliberately — never rely on the release dogfood step to pull it in.

  **Current vendored provenance (2026-09-17):** this copy is the released upstream tag **`v5.4.0`** (`7f692b0`), superseding `v5.3.0`, installed via the documented command `npx --yes skills add DailybotHQ/deepworkplan-skill@v5.4.0 --skill deepworkplan --force -y`. Verified `diff -rq` **byte-identical** against the tag's canonical `skills/deepworkplan/` tree — empty output — with `skills-lock.json` updated by the CLI itself (hash `de0babb1…`, superseding `49a77d4f…`). This install ran cleanly: the container mount-race that struck earlier installs did not fire, and the canonical `.agents/skills/deepworkplan/` write completed.

**`v5.4.0` is the release that absorbed this repository's own contribution.** Between 2026-09-13 and 2026-09-17 this copy deliberately ran **ahead of** upstream, carrying a reviewed re-adaptation that pinned the AI Diff Reviewer addon to v2.3.0, named the **incomplete review** as a state distinct from a clean pass, added the normative rule that a plan's temporary and analysis output belongs in that plan's own `analysis_results/`, and resolved a `tmp/`-versus-plan-output contradiction between two spec surfaces. That work was contributed upstream as `DailybotHQ/deepworkplan-skill` PR #45, merged 2026-09-17, and released as `v5.4.0` one minute later. **Installing the tag therefore closed the divergence rather than destroying it** — the only delta between the previous re-adapted tree and `v5.4.0` was the `version:` stamp in fifteen `SKILL.md` files, which is the strongest available evidence that the re-adaptation matched what shipped. Standard remains aligned to **5.0.0** (no schema-line change; `v5.4.0` is a documentation and addon-contract release).

**There is currently no local divergence.** This copy is a plain released tag, so a future `npx --yes skills add DailybotHQ/deepworkplan-skill@<tag> --skill deepworkplan --force -y` overwrites nothing that is not already upstream. If a divergence is ever reintroduced — the repo-adapted path this section authorizes — re-stamp this paragraph to say what it carries and that a tag install will overwrite it, exactly as the 2026-09-13 entry did. Local adaptation remains the command kit (nine delegators: seven `dwp-*` plus `/skill-create` and `/agent-create`, refreshed from the skill's own `onboard/command-templates/` on 2026-09-17) and this provenance protocol. This repository keeps the AI Diff Reviewer local-only; it does not ship an AI Reviewer CI workflow. The two addon skills (dailybot, ai-diff-reviewer) remain release-auto-refreshed — `ai-diff-reviewer` was refreshed to **v2.3.1** on 2026-09-17 (lock hash `d9a9d2f6…`, verified `diff -rq` against the published tag).

### Official CLI publishing (same release workflow)

`release_and_publish.yml` **Step 6** publishes the official CLI — the
unscoped npm package **`deepworkplan`** — together with every website
release. The package is owned by whichever npm account the `NPM_TOKEN`
Automation token belongs to: generate it from the company account that
maintains the org's other packages (e.g. `universal-emoji-parser`) and
`deepworkplan` is listed alongside them. The CLI keeps its **own version
line** (independent of the website version): Step 6 publishes only when
the exact `cli/package.json` version is not already on the registry —
re-running a release is idempotent. To ship a new CLI version, bump
`version` in `cli/package.json` in any PR to `main`. When the secret is
absent, Step 6 skips with a loud warning and the website release proceeds
unaffected. The token lives only in GitHub Actions secrets — never in the
tree, never in chat.

**Namespace strategy (deliberate — do not "fix"):** the bare unscoped name
`deepworkplan` belongs to the *website client*, matching the domain exactly;
never rename this package to `@deepworkplan/cli`. The `@deepworkplan` npm
org (reserved 2026-09-13) is the home for future *methodology* packages —
a methodology installer either grows this same CLI (`deepworkplan init`
gaining a real installer) or ships under that scope. npm org names and
unscoped package names are separate namespaces, so both coexist.

## Build & Deployment

### Build Process

```bash
# Development
pnpm run dev              # Start dev server

# Production build
pnpm run build            # Build with type checking
pnpm run astro:preview    # Preview production build

# Cloudflare Pages
pnpm run build            # Build to dist/ folder (prebuild runs images:webp)
```

### Output Structure

```
dist/                    # Build output (Cloudflare Pages)
├── index.html
├── about/index.html
├── methodology/
│   ├── index.html
│   └── [docs]/
├── _astro/              # Bundled assets
│   ├── *.css
│   └── *.js
└── images/
```

### Cloudflare Pages Configuration

- Output directory: `dist/`
- Build command: `pnpm run build`
- Custom domain configured in Cloudflare dashboard

## Performance Considerations

1. **Static Generation**: All pages pre-rendered at build time
2. **Partial Hydration**: Only interactive components load JS
3. **Image Optimization**: Use Astro's `<Image>` component
4. **CSS Purging**: Tailwind removes unused styles
5. **Code Splitting**: JavaScript split per-island

## Future Considerations

- **Testing**: Vitest for units, Playwright for E2E
- **CMS Integration**: Potential headless CMS for content
- **More Languages**: Additional i18n support
