# AI Agent Onboarding

Quick start guide for AI coding assistants (Cursor AI, Claude Code, ChatGPT, Gemini, etc.) working on deepworkplan.com.

## Tech Stack Overview

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.16.15 | Static site generator (islands architecture) |
| **Svelte** | 5.48.0 | Interactive components |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **Biome** | 2.3.11 | Linter and formatter |
| **MDX** | 4.3.13 | Enhanced Markdown for content collections |

## Project Type

- **Methodology documentation and marketing site** for deepworkplan.com
- **Static Site Generation (SSG)** - builds to static HTML
- **Multilingual** - English (default) plus 16 other active languages (es, pt, zh, ja, de, fr, ko, ru, it, tr, id, vi, hi, pl, uk, th)
- **Deployed to** Cloudflare Pages
- **Also the DeepWorkPlan ecosystem hub** — public ecosystem repositories are cloned under the git-ignored `repositories/` (`bash scripts/repositories.sh clone`). Work for one of them is committed **inside** its clone under its own `AGENTS.md`, never from this root. Start with [`repositories/README.md`](../repositories/README.md) and [Cross-Project Standards](CROSS_PROJECT_STANDARDS.md).

## Repository Structure

```
deepworkplan.com/
├── src/
│   ├── components/      # UI components (.astro, .svelte)
│   ├── content/         # Content collections: methodology, spec, kit, pages
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utilities and types
│   ├── pages/           # File-based routing
│   └── styles/          # Global CSS
├── public/              # Static assets
├── docs/                # Documentation
├── .dwp/                # Deep Work Plan output (git-ignored)
├── repositories/        # Ecosystem hub clones (git-ignored; README.md + manifest.json tracked)
└── .agents/             # Skills and agents
```

## Critical Rules (MUST FOLLOW)

### 1. Language

**ALL code MUST be in English** - variables, comments, commits, docs.

### 2. Code Quality

**Use Biome** (NOT ESLint/Prettier):

```bash
pnpm run biome:check    # Check issues
pnpm run biome:fix      # Auto-fix
```

### 3. TypeScript

**Run type checking**:

```bash
pnpm run astro:check
```

### 4. Import Order

```typescript
// 1. Node.js native
import { dirname } from 'node:path';

// 2. Third-party
import { getCollection } from 'astro:content';

// 3. Internal (@ alias)
import Header from '@/components/layout/Header.svelte';

// 4. Types
import type { CollectionEntry } from 'astro:content';
```

### 5. Components

- **Astro** (`.astro`) - Static content
- **Svelte** (`.svelte`) - Interactive components

```astro
<!-- Hydrate Svelte for interactivity -->
<Header client:load lang={lang} />
```

### 6. Dark Mode

Always support dark mode:

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
```

### 7. Content Creation Workflow

Methodology/spec/kit docs live in multilingual content collections (17 active languages).

- Create the file in every active language folder in the same task: `src/content/{collection}/en/`, `.../es/`, `.../pt/`, `.../zh/`, … (same English slug throughout; use the `/translate-sync` skill)
- Every non-English language MUST carry correct diacritics/scripts for that language (Spanish ñ/tildes/¿/¡; CJK full-width punctuation; Cyrillic; Thai; Devanagari; etc.)
- Keep the matching `src/content/pages/{en,es,pt,zh,…}/*.md` endpoint in sync (`pnpm run md:check`)
- Validate with `pnpm run build` and `pnpm run i18n:check`

### 8. Analytics Verification Policy

- Google Search Console verification is DNS-based (Domain property TXT), not meta-tag based.
- Do not add `PUBLIC_GOOGLE_SITE_VERIFICATION` or `google-site-verification` meta tags.
- Keep Bing verification as optional env-based meta tag (`PUBLIC_BING_SITE_VERIFICATION`).

## DWP v6 host and authority records

The current DWP standard is 7.0.0, implemented by the installed 7.0.1 skill.
New plans use the v7 contract by default; the addon registry is the tracked
`.dwp/config.json`; plans from earlier
generations retain their recorded format and are never migrated implicitly.
A v5-to-v6 migration requires an explicit request and preview.

V6 plans may use only capabilities that the runtime explicitly declares. The
website's minimal-host baseline is `stop_agent: false`, `meter_spend: false`,
`meter_tokens: false`, `meter_wall_clock: false`, `cancel_children: false`,
`model_routing: false`, `subagents: false`, and `telemetry: false`. A runtime
adapter may declare a capability only when it verifies that support; telemetry
also needs explicit consent. Unmetered limits are advisory, not enforced.

Developers author and authorize requested plans and work. Agents may proceed
within that scope and retain prior authorization across sessions; they stop
before pushing to `main` (which deploys), publishing, sending external messages,
or accessing secrets unless the request explicitly authorizes that action.
Follow the approval and review rules in [AGENTS.md](../AGENTS.md). Dailybot
reporting remains opt-in/configuration-dependent and best effort.

For v6 plan outcomes, use only observable checks that this repository actually
supports. [Testing Guide → Selecting a Gate](TESTING_GUIDE.md#selecting-a-gate-for-a-change)
maps touched surfaces to real commands and documents coverage limits; rendered
multilingual content uses the i18n, Markdown parity, and build gates there.

## Essential Commands

```bash
# Development
pnpm run dev              # Start dev server (localhost:5555)
pnpm run build            # Production build
pnpm run astro:preview    # Preview build

# Code Quality
pnpm run biome:check      # Lint check
pnpm run biome:fix        # Auto-fix
pnpm run astro:check      # Type check

# Deployment
pnpm run build            # Production build (Cloudflare Pages)
```

## Key Patterns

### Content Collections

Methodology docs in `src/content/methodology/{en,es,pt,zh,…}/` (17 active languages):

```yaml
---
title: "Introduction"
description: "Description"
order: 1
lang: "en"
---
```

### Page Wrapper Pattern

All content pages use the **Page wrapper pattern**. Pages in `src/pages/` are 3-line wrappers. Logic lives in `src/components/pages/*Page.astro`:

**Page component** (`src/components/pages/AboutPage.astro`):
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
  <section>{t.aboutPage.title}</section>
</MainLayout>
```

**Page wrapper** (`src/pages/about.astro` — 3 lines):
```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

### API Routes

In `src/pages/api/`:

```typescript
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
```

## Common Tasks

### Add a Methodology / Spec / Kit Doc

1. Create the file in every active language folder in the same task under `src/content/{collection}/{en,es,pt,zh,…}/` (same English slug throughout; use the `/translate-sync` skill)
2. Verify frontmatter includes required fields (`title`, `description`, `order`, `lang`)
3. Keep the matching `src/content/pages/{en,es,pt,zh,…}/*.md` endpoint in sync (`pnpm run md:check`)
4. Run `pnpm run build` and `pnpm run i18n:check` to validate

### Add a Component

1. Create in `src/components/`
2. Use `.astro` for static, `.svelte` for interactive
3. Import with `@/components/...`

### Add a Page

1. Create shared component in `src/components/pages/*Page.astro` (handles `MainLayout` internally)
2. Create thin wrappers in `src/pages/` and `src/pages/es/` (3 lines each, pass `lang` as string literal)
3. Add translation keys to `src/lib/translations/` if needed

## What NOT to Do

❌ Write code in Spanish
❌ Use ESLint or Prettier
❌ Skip `pnpm run biome:check`
❌ Forget dark mode support
❌ Skip `client:load` on interactive Svelte
✅ Run `pnpm run test` for unit tests; use `docs/TESTING_GUIDE.md` to select a scoped or full gate.

## Documents to Read

1. **[AGENTS.md](../AGENTS.md)** - Main guidance (read first!)
2. **[STANDARDS.md](STANDARDS.md)** - Coding conventions
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical details
4. **[DEVELOPMENT_COMMANDS.md](DEVELOPMENT_COMMANDS.md)** - Full command reference

## Quick Validation

Before any commit:

```bash
pnpm run biome:check && pnpm run astro:check && pnpm run build
```

All three must pass.

## Getting Help

- **Astro Docs**: https://docs.astro.build/
- **Svelte Docs**: https://svelte.dev/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Biome Docs**: https://biomejs.dev/
