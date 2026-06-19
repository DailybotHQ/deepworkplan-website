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
│   ├── home/                # Homepage sections
│   │   ├── HeroSection/
│   │   │   ├── HeroSection.astro
│   │   │   └── TypewriterWords.astro
│   │   ├── HomeSection/
│   │   │   ├── HomeSection.astro
│   │   │   ├── HomeSectionContent.astro
│   │   │   ├── HomeSectionImage.astro
│   │   │   └── enum.ts
│   │   └── ...                  # Methodology / spec / kit preview sections
│   │
│   ├── editorial/          # Editorial primitives (Kicker, Rule, Lead, Figure, Reference)
│   │
│   ├── pages/              # Shared page components (*Page.astro, InitPage, readers)
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
│   ├── internal/            # Dev-only hub (excluded from production builds)
│   └── api/                 # JSON endpoints
│
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
├── quickstart.astro     → /quickstart
├── init.astro           → /init
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

- `KNOWN_BASE_PATHS` — per-language page slugs (e.g. `about`, `contact`, `methodology`, `spec`, `kit`, `examples`, `quickstart`, `init`, `setup`, `onboarding`). These exist for **every** language: at the root for the default language and under `/<lang>/<slug>` for every other active language. ONE place, covers all languages.
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

**Adoption endpoint `/init`.** The canonical adoption surface lives at `/init` (default language) and `/<lang>/init` for every other active language (`/es/init`, `/pt/init`, `/zh/init`, …), served by `InitPage.astro` + the page-wrapper pattern. `init` is present in `KNOWN_BASE_PATHS`, so it works in every language without a per-language allowlist edit. Its agent prompt is published at the **canonical English-only** URL `/init.md` (regardless of which locale a user is browsing) through the dynamic `[page].md.ts` route, sourced from `src/content/pages/en/init.md` — see `CANONICAL_INIT_MD_PATH` in `src/lib/i18n.ts`. `/setup` and `/onboarding` (plus their `/<lang>/` variants) are permanent 301 redirects to `/init`, configured in `astro.config.mjs`; the redirect source paths are also in `KNOWN_BASE_PATHS`.

## API Routes

### Endpoint Pattern

```typescript
// src/pages/api/kit.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    const entries = await getCollection('kit', ({ data }) => data.lang === 'en');

    const data = entries.map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      description: entry.data.description,
      kind: entry.data.kind,
    }));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

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
├── QuickstartPage.astro
├── InitPage.astro
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

- **Reference install (not vendored).** The official DeepWorkPlan skill is installed under `.agents/skills/deepworkplan/`, which is **gitignored** — the skill source is never committed. A committed `skills-lock.json` pins the reference so the install is reproducible (`npx skills add DailybotHQ/deepworkplan-skill`).
- **Thin command delegators.** The committed `dwp-*` commands (`/dwp-create`, `/dwp-execute`, `/dwp-refine`, `/dwp-resume`, `/dwp-status`) are ~20-line delegators that read the installed skill's sub-skills and follow them — no embedded logic, so updates propagate from the skill.
- **The author sub-skill.** `/skill-create` and `/agent-create` are thin delegators to the skill's **author** sub-skill, which grows the repository's own skills, agents, and commands and keeps the `.agents/docs/` catalog in sync.
- **The dependency-upgrade add-on.** `/lib-upgrade` delegates to the opt-in **dependency-upgrade** add-on, which reasons about the actual package manager (pnpm here) and upgrades in validated, revertible batches.
- **`.dwp/` output.** All Deep Work Plan working state (plans, drafts) lives in the gitignored `.dwp/` directory (`.dwp/plans/`, `.dwp/drafts/`). The legacy homegrown command engine has been retired in favor of the installed skill.

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
