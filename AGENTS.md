# AGENTS.md - Documentation for AI Agents

**Purpose:** Single source of truth for all AI coding assistants (Claude Code, Cursor AI, OpenAI Codex, Google Gemini, GitHub Copilot, and others). Ensures all agents work with consistent guidelines and patterns.

## Detailed Documentation

**Comprehensive guides for specific tasks:**

| Category | Guide | Purpose |
|----------|-------|---------|
| Architecture | [Architecture](docs/ARCHITECTURE.md) | Components, Content Collections, Svelte integration, project structure |
| Standards | [Standards](docs/STANDARDS.md) | Canonical coding rules, orthography, import order |
| Blog (dormant) | [Blog Posts](docs/features/BLOG_POSTS.md) | Tags, series, hero layouts, images — engine kept dormant for future case studies |
| Blog Lifecycle (dormant) | [Blog Content Lifecycle](docs/features/BLOG_CONTENT_LIFECYCLE.md) | End-to-end blog workflow (reserved for future case studies) |
| Authors | [Authors](docs/features/AUTHORS.md) | Multi-author support, YAML schema, AuthorCard, JSON-LD |
| Writing Voice | [Writing Voice Guide](docs/WRITING_VOICE_GUIDE.md) | Anti-AI-slop checklist, author voice, vocabulary blocklist |
| Writing Craft | [Writing Craft Guide](docs/WRITING_CRAFT_GUIDE.md) | Narrative structure, fact verification, quote handling, figure markup, refinement patterns, case studies |
| Testing | [Testing](docs/TESTING_GUIDE.md) | Vitest setup, conventions, writing tests |
| Commands | [Development Commands](docs/DEVELOPMENT_COMMANDS.md) | npm scripts, Astro CLI, build workflows |
| i18n | [I18N Guide](docs/I18N_GUIDE.md) | Adding languages, translation workflow |
| Performance | [Performance](docs/PERFORMANCE.md) | Astro SSG optimization, image handling, caching |
| Accessibility | [Accessibility](docs/ACCESSIBILITY.md) | WCAG AA, contrast ratios, ARIA patterns |
| SEO | [SEO](docs/SEO.md) | Meta tags, structured data, multilingual SEO, AEO |
| Security | [Security](docs/SECURITY.md) | Static site security best practices |
| Documentation | [Documentation Guide](docs/DOCUMENTATION_GUIDE.md) | When and how to update docs |
| Product | [Product Spec](docs/PRODUCT_SPEC.md) | Product vision, features, website goals |
| Brand | [Brand Guide](docs/BRAND_GUIDE.md) | "Broadsheet" editorial identity: warm paper, ink serif, oxblood accent, editorial primitives |
| Analytics | [Analytics](docs/ANALYTICS.md) | Tracking, GSC, verification |
| AI Agents | [Agent Onboarding](docs/AI_AGENT_ONBOARDING.md), [Agent Collaboration](docs/AI_AGENT_COLLAB.md) | Setup, handoff, coordination |
| Skills/Agents | [Skills & Agents Catalog](.agents/docs/skills_agents_catalog.md) | Available skills and agents |
| Commands | [Commands Reference](.agents/docs/COMMANDS_REFERENCE.md) | All slash commands with procedure files |

## Project Overview

**Deep Work Plan** ([deepworkplan.com](https://deepworkplan.com)) — The official website for the Deep Work Plan (DWP) methodology: the methodology that turns any repository into an **AI-first, agent-pilotable** codebase. DWP documents a repo (AGENTS.md, docs, `.agents/` skills, the DWP skill), enables **long-horizon plans**, and lets **any agent pilot the repo** against explicit acceptance criteria and validation gates. A serious, neutral, fast documentation-and-marketing site built with Astro, in the **"Broadsheet" editorial design system** (warm paper, ink serif display, hairline rules, restrained oxblood accent), with dark mode, bilingual content (en/es), static site architecture deployed to Cloudflare Pages.

The site explains and positions the DWP methodology, hosts the readable specification and kit catalog, ships agent-friendly Markdown endpoints, and exposes a canonical adoption endpoint at **`/init`**. The repository **dogfoods** the methodology it documents.

**Positioning — two narrative pillars** (weave through all copy):

1. **Spec-driven development (SDD).** The plan/spec is the durable source of truth; agents execute against explicit acceptance criteria and validation gates (reduces drift, enables verification, survives across sessions/agents). DWP's plan → atomic tasks → gates → completion loop *is* SDD — and unlike tool-bound SDD (GitHub Spec Kit, Amazon Kiro, Tessl), DWP is **tool-agnostic and repo-native**.
2. **Harness engineering — the repository is the harness.** DWP delivers the agent scaffolding (context, tools, control loop, guardrails, state/resumability) as a **portable methodology + kit installed into the repository**, not a per-tool framework — so any agent can pilot any repo. One-liner: *"Deep Work Plan is spec-driven development where the repository itself becomes the harness."*

**Companion skill repo:** the site is paired with **[`DailybotHQ/deepworkplan-skill`](https://github.com/DailybotHQ/deepworkplan-skill)** (DWP packaged as an installable agent skill). Adoption messaging (the `/init` endpoint, methodology, and kit) stays in sync with that repo: install the skill → onboard the agent → generate and execute long-horizon plans. Do **not** reference "Cal Newport"; the DWP name stands on its own (focused, long-horizon agent execution). Design-system reference: **[Brand Guide](docs/BRAND_GUIDE.md)** (palette + serif type + editorial primitives in `src/components/editorial/`).

**Content model:** methodology documentation is primary; the blog engine is kept **dormant** (hidden from navigation, available later for case studies); slides/tech-talks and personal pages have been removed.

**Technology Stack:**

- **Astro 5.16.15** — Static site generator (islands architecture)
- **Svelte 5.48.0** — Interactive components
- **TypeScript 5.9.3** — Type-safe development
- **Tailwind CSS 4.1.18** — Utility-first styling with dark mode
- **Biome 2.3.11** — Linter and formatter (replaces ESLint + Prettier)
- **MDX** — Enhanced Markdown for blog posts

## Project Structure

> Full tree with all files: **[Architecture Guide](docs/ARCHITECTURE.md#project-structure)**

```
src/
├── components/          # UI components (Astro + Svelte)
│   ├── blog/            # Blog components (BlogCard, BlogGrid, Search)
│   ├── home/            # Homepage sections (Hero, Projects, Blog preview)
│   ├── layout/          # Header.svelte, MobileMenu.svelte
│   └── pages/           # Shared page components (*Page.astro)
├── content/             # Content Collections (methodology, spec, kit, pages, blog[dormant])
│   ├── methodology/{en,es}/  # Methodology docs (primary content)
│   ├── spec/{en,es}/         # Specification reader content
│   ├── kit/{en,es}/          # Kit catalog (presets, adapters, commands)
│   ├── pages/{en,es}/        # Agent-friendly Markdown endpoints (AEO)
│   ├── authors/         # Author definitions (.yaml files) — used by dormant blog
│   ├── blog/{en,es}/    # Blog posts (DORMANT engine — hidden from nav)
│   ├── tags/            # Tag definitions (.md files with tier/order)
│   └── series/          # Series definitions
├── layouts/             # MainLayout, InternalLayout, ShowcaseLayout
├── lib/                 # Utilities (blog.ts, i18n.ts, translations/)
├── pages/               # File-based routing (EN root, ES in /es/)
│   ├── internal/        # Dev-only hub (excluded from production)
│   └── api/             # JSON endpoints
└── styles/              # global.css (Tailwind config)

public/images/blog/      # Blog images: posts/{slug}/, shared/, _staging/
scripts/                 # Build utilities (image optimization)
docs/                    # Project documentation
.agents/                 # Cross-agent skills, commands, agents, settings (canonical)
.claude → .agents        # Backward-compat symlink for Claude Code
.agent_commands/         # Deep work plan templates and skill/agent generators
tmp/                     # Temporary workspace (git-ignored, see below)
```

## Temporary Workspace (`tmp/`)

The `tmp/` directory at the project root is a **git-ignored scratch space** for agents and developers.

**Use it for:**
- Temporary prompts, outputs, or drafts
- One-off analysis results or debug logs
- Any ephemeral file that should NOT be committed

**Rules:**
- Everything inside `tmp/` is ignored by git (except `.gitkeep`)
- Do NOT store anything permanent or important here — it can be deleted at any time
- When a user asks for a temporary file, prompt output, or scratch artifact, **write it to `tmp/`**
- Subdirectories are fine (e.g., `tmp/prompts/`, `tmp/analysis/`)

## Skills, Commands, and Agents (`.agents/`)

The `.agents/` directory is the **canonical, cross-agent home** for everything that defines how AI assistants behave in this repo: skills, slash commands, agent definitions, internal documentation, and settings. The same content is consumed by Claude Code, Cursor AI, OpenAI Codex, Gemini, and any other coding agent that picks up local skills/commands.

```
.agents/
├── agents/        # Agent definitions (architect, executor, reviewer, ...)
├── commands/      # Slash commands (commit, pr, branch, dwp-*, ...)
├── skills/        # Skill procedures (add-blog-post, fix-lint, ...)
├── docs/          # Catalogs and references (skills_agents_catalog.md, COMMANDS_REFERENCE.md)
├── README.md      # Conventions for authoring skills, agents, and commands
├── settings.json           # Claude Code env (env vars, experimental flags)
└── settings.local.json     # Claude Code local permissions (git-tracked)
```

**Backward compatibility — `.claude/` symlink:**

Claude Code historically reads from `.claude/` at the repo root. To keep that working without duplicating files, **`.claude` is a symlink to `.agents`**:

```bash
ls -la .claude
# .claude -> .agents
```

This means every `.claude/...` path (e.g., `.claude/skills/foo/SKILL.md`) resolves transparently to `.agents/skills/foo/SKILL.md`. No tool, hook, or settings file needs to change for Claude Code to keep working.

**Authoring rules (all agents):**

- Use `.agents/...` as the canonical path in **all new documentation, prompts, and skill/command files**. Do not write `.claude/...` in new content.
- Do not edit files via the `.claude/` symlink — edit the real files under `.agents/`.
- Settings files (`settings.json`, `settings.local.json`) are Claude Code-specific but live in `.agents/` for symmetry. They're a no-op for other agents.
- The `.agents/README.md` documents how to add new skills, commands, and agents.

**Why the rename?** The `.agents/` name signals that the folder is shared across agents, matching the project-level `AGENTS.md` convention (which is itself the canonical file that `CLAUDE.md` symlinks to). It avoids implying that the contents are Claude-only.

## CRITICAL: Mandatory Requirements

### 1. Language Standards

**ALL code, comments, and documentation MUST be in English.** Always update documentation after important changes.

### 2. Orthography & Diacritical Marks (MANDATORY)

**All user-facing text MUST use proper orthography.** Spanish content MUST include ñ (e.g., pequeño, diseño, español), accented vowels (e.g., análisis, código, página, versión), and interrogative accents (e.g., cómo, qué, cuál).

**Quick validation** before committing Spanish text:

```bash
grep -rn 'pequeno\|tamano\|diseno\|espanol\|manana' src/content/blog/es/ src/lib/translations/es.ts
grep -rn 'analisis\|numero\|codigo\|ejecucion\|version\|pagina\|titulo' src/content/blog/es/ src/lib/translations/es.ts
```

If any match is found, fix it before committing. Full word lists in **[Standards Guide](docs/STANDARDS.md)**.

### 3. Import Order Convention (MANDATORY)

```typescript
// 1. Node.js native modules
import { dirname, resolve } from 'node:path';

// 2. Third-party packages
import { defineConfig } from 'astro/config';
import { z } from 'astro:content';

// 3. Internal project modules (using @ alias)
import Header from '@/components/layout/Header.svelte';
import { SITE_TITLE } from '@/lib/constances';
import { getBlogPosts } from '@/lib/blog';

// 4. Type imports (separate group)
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
```

### 4. Type Hints (RECOMMENDED)

Prefer explicit types on function signatures. Biome allows `any` for flexibility but explicit types are better. See **[Standards Guide](docs/STANDARDS.md)** for examples.

### 5. Code Quality (MANDATORY)

```bash
pnpm run biome:check        # Check linting and formatting
pnpm run biome:fix          # Auto-fix issues
pnpm run biome:fix:unsafe   # Fix with unsafe transformations
```

**DO NOT use ESLint or Prettier** — this project uses Biome exclusively.

### 6. Testing

```bash
pnpm run test               # Run all tests (single run)
pnpm run test:watch         # Watch mode
pnpm run test:coverage      # With coverage report
```

Tests use `*.test.ts` naming in `tests/unit/`. Coverage target: 80%+ on `src/lib/`. See **[Testing Guide](docs/TESTING_GUIDE.md)**.

### 7. Multilingual Content Synchronization (MANDATORY)

**ALL content changes MUST be synchronized across all active languages (en/es).** No exceptions.

**Content type rules:**

- **Pages:** Create 1 shared `*Page.astro` in `src/components/pages/` + thin 3-line wrappers in `src/pages/` and `src/pages/es/` passing `lang` as string literal
- **Blog Posts:** Both `src/content/blog/en/` and `src/content/blog/es/` MUST have the equivalent post. Translate `title`, `description`, and body. Preserve `pubDate`, `heroImage`, `tags`, `author`, code blocks. **Use `/add-blog-post` skill for new posts.**
- **Authors:** Defined as YAML in `src/content/authors/{slug}.yaml`. Localization lives inside the YAML — both `role.en`/`role.es` and `bio.en`/`bio.es` are required by the schema. Posts reference an author by slug; the same slug applies to EN and ES versions. See [Authors](docs/features/AUTHORS.md).
- **Translation Strings:** Add to BOTH `src/lib/translations/en.ts` and `es.ts`. Update `types.ts` with any new interface keys
- **Components:** Use `getTranslations(lang)` from `@/lib/translations`. Never hardcode user-visible strings
- **Agent-Friendly Markdown (MANDATORY):** When page or translation content changes, update the corresponding `src/content/pages/{en,es}/*.md` files. These serve as Markdown endpoints for AI agents and MUST stay in sync with the HTML content. See **[Markdown for Agents](docs/aeo/MARKDOWN_FOR_AGENTS.md)**.

**Compliance checklist:**

- [ ] Pages exist in both `src/pages/` and `src/pages/es/`
- [ ] Blog posts exist in both `src/content/blog/en/` and `src/content/blog/es/`
- [ ] Same `author` slug used in EN and ES versions of a post
- [ ] New/updated authors have both `role.en`/`role.es` and `bio.en`/`bio.es` filled in (`src/content/authors/`)
- [ ] UI strings in both `en.ts` and `es.ts`
- [ ] No hardcoded user-visible text
- [ ] Page Markdown files updated in both `src/content/pages/en/` and `src/content/pages/es/`

**Tools:** `/translate-sync` skill, `i18n-guardian` agent. Adding a new language: see **[I18N Guide](docs/I18N_GUIDE.md)**.

### 8. Performance-First Mindset (MANDATORY)

1. **Prefer static over dynamic** — use `.astro` for non-interactive content
2. **Choose the laziest hydration** — `client:visible` or `client:idle` over `client:load`
3. **Minimize JavaScript** — prefer CSS-only solutions over JS
4. **Use native browser APIs** — IntersectionObserver over scroll listeners, native `loading="lazy"`
5. **Optimize images** — always include dimensions, lazy load below-fold content
6. **Avoid layout shifts** — reserve space for async content, `font-display: swap`
7. **Keep search payload lean** — use language-sharded endpoints, minimal index schema
8. **Protect Lighthouse scores** — run `pnpm run search:budgets` after search changes

See **[Performance Guide](docs/PERFORMANCE.md)**.

### 9. Accessibility Standards (MANDATORY)

1. **WCAG AA contrast** — 4.5:1 normal text, 3:1 large text
2. **Approved text colors** — `text-gray-600 dark:text-gray-300` for secondary text. **NEVER** `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, `dark:text-gray-500`
3. **Image dimensions** — every `<img>` must have `width` and `height`
4. **Semantic HTML** — proper heading hierarchy, landmarks, button vs link
5. **Text alternatives** — meaningful `alt` for informative images, `alt=""` for decorative
6. **Keyboard navigation** — all interactive elements focusable and operable
7. **ARIA** — disclosure pattern for nav dropdowns (not `role="menu"`)

See **[Accessibility Guide](docs/ACCESSIBILITY.md)**.

### 10. Analytics Verification Policy (MANDATORY)

1. Do not add or reintroduce `PUBLIC_GOOGLE_SITE_VERIFICATION`
2. Do not add `google-site-verification` meta tags in templates/components
3. Keep Bing verification as optional env-based meta tag (`PUBLIC_BING_SITE_VERIFICATION`)
4. GSC verification is DNS-only (Domain property DNS TXT)

## Shared Agent Coordination

Multiple AI agents collaborate on this codebase. When updating agent guidance, mirror changes across all relevant files. See **[AI Agent Collaboration](docs/AI_AGENT_COLLAB.md)**.

## Quick Commands

```bash
pnpm run dev                # Dev server (http://localhost:5555)
pnpm run build              # Production build (prebuild runs images:webp)
pnpm run astro:preview      # Preview production build
pnpm run biome:check        # Lint and format check
pnpm run biome:fix          # Auto-fix lint issues
pnpm run astro:check        # TypeScript type checking
pnpm run test               # Run unit tests
pnpm run test:coverage      # Tests with coverage
pnpm run images:optimize    # Process staged images
pnpm run md:check           # Verify every HTML page has a matching .md for agents
pnpm run md:check:strict    # Same as above; exits 1 on missing (for CI)
pnpm run lighthouse         # Lighthouse audit
pnpm run release            # Bump version and release commit
pnpm run ncu:check          # Check for package updates
```

Full command reference: **[Development Commands](docs/DEVELOPMENT_COMMANDS.md)**.

## Architecture Patterns

> Full patterns with code examples: **[Architecture Guide](docs/ARCHITECTURE.md)**

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

Methodology, spec, and kit content (plus the dormant blog, tags, and series) use Astro Content Collections with Zod schemas defined in `src/content.config.ts`.

### 3. Svelte Integration

Use Svelte for interactive components. Always include a `client:*` directive (`client:visible` preferred over `client:load`).

### 4. Page Wrapper Pattern (MANDATORY)

Pages in `src/pages/` are ultra-minimal 3-line routing wrappers. All logic lives in `*Page.astro` components in `src/components/pages/`.

**Key rules:**

- Page components handle `MainLayout` internally — wrappers **never** import `MainLayout`
- The `lang` prop is passed as a **string literal** (`"en"`, `"es"`), not a variable
- For a new page: create **1 `*Page.astro` component** + **N thin wrappers** (one per language)
- All user-visible text uses `getTranslations(lang)`, all URLs use `getUrlPrefix(lang)`

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

**Wrapper** (`src/pages/about.astro` — 3 lines):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

### 5. i18n Routing

English pages at root (`src/pages/`), Spanish in `src/pages/es/`. Page components in `src/components/pages/` receive `lang` and handle translations internally.

### 6. Internal Hub (Dev-Only)

Dev-only portal at `/internal/`. Uses `InternalLayout` or `ShowcaseLayout` (never `MainLayout`). English-only, no Page Wrapper pattern. Automatically excluded from production builds via three layers (post-build deletion, sitemap filter, noindex meta).

## Blog Post Conventions (Dormant Engine)

> Full reference: **[Blog Posts Guide](docs/features/BLOG_POSTS.md)**

> **Status: DORMANT.** The blog engine is fully built but hidden from navigation. It is reserved for future **case studies** about applying the Deep Work Plan methodology. Do not add blog posts during the methodology-site build unless explicitly asked. The conventions below remain accurate for when the engine is reactivated.

**File naming:** `YYYY-MM-DD_slug.{md,mdx}` in `src/content/blog/{en,es}/`. Date prefix stripped from URLs. **Slugs MUST always be in English** — both `en/` and `es/` versions use the same English slug.

**Tags:** Flat `tags` array in frontmatter. Three tiers (primary / secondary / subtopic) resolved at build time from `src/content/tags/*.md`. Max 5 tags per post (1-2 primary + 0-3 secondary + 0-3 subtopic; max 3 subtopics; ≥ 1 primary required). Never auto-create tags without user approval — propose with [`/audit-taxonomy`](.agents/skills/audit-taxonomy/SKILL.md) and let the user approve. See [Tag Taxonomy in BLOG_POSTS.md](docs/features/BLOG_POSTS.md#tag-taxonomy-unified-collection) for the full tier table.

**Series:** Posts reference `series: "{slug}"` and `seriesOrder: {n}` in frontmatter. Series defined in `src/content/series/`. Navigation renders automatically. **Series slugs MUST be in English** (e.g., `the-library-of-tomorrow`, not `la-biblioteca-del-manana`).

**Authors:** Posts reference `author: "{slug}"` (optional). Authors defined as YAML in `src/content/authors/{slug}.yaml` with localized `role`/`bio` (en/es) and avatar at `public/images/authors/{slug}.webp`. Both EN and ES versions of a post must use the same `author` slug. Full reference: [features/AUTHORS.md](docs/features/AUTHORS.md). Internal directory: `/internal/authors`.

**Resources section:** Include external links (docs, repos, tools). Do NOT list related articles or previous chapters — they appear in the series navigation below.

**Hero layouts:** `banner` (default, landscape), `side-by-side` (square), `minimal` (thumbnail), `none` (text-only). Set based on image aspect ratio.

**Demo posts:** In `_demo/` folders only. Never shown in listings/search. Accessible by direct URL in dev only.

**Images:** Stored in `public/images/blog/posts/{slug}/`. Hero: `hero.{ext}`. Use `pnpm run images:optimize` for staged images.

**New post workflow:** Use `/add-blog-post` skill (mandatory). Do not create blog post files manually.

## Methodology Content Conventions

Methodology documentation is the **primary content** of the site. It lives in bilingual content collections and is rendered by the methodology, spec, and kit readers.

**Collections:**

- **`methodology/{en,es}/`** — The narrative methodology docs (what DWP is, how to adopt it, principles, workflow). Primary marketing-and-teaching content.
- **`spec/{en,es}/`** — The readable specification (the normative DWP standard: task anatomy, validation gates, completion protocol, mandatory final tasks, archetypes, addons).
- **`kit/{en,es}/`** — The kit catalog: presets, adapters, and commands available for installing DWP into a repo.

**File naming:** `slug.md` (or `.mdx`) in the relevant `{en,es}/` directory. **Slugs MUST be in English** on both languages; EN and ES versions share the same English slug.

**Bilingual parity:** Every methodology/spec/kit document MUST exist in both `en/` and `es/`. Spanish content MUST carry correct diacritics (`ñ`, tildes, `¿`/`¡`). Use the `/translate-sync` skill and `i18n-guardian` agent.

**Voice:** Serious, neutral, technical. No hype, no exclamation marks in body copy, sentence-case headings. This is a specification-and-methodology site, not a personal blog.

**Agent-friendly Markdown:** Every rendered HTML page MUST have a matching `src/content/pages/{en,es}/*.md` endpoint kept in sync (`pnpm run md:check`). See [Markdown for Agents](docs/aeo/MARKDOWN_FOR_AGENTS.md).

## Documentation Standards

Update docs after: adding components/pages, changing schemas, updating config, adding npm scripts, establishing patterns. See **[Documentation Guide](docs/DOCUMENTATION_GUIDE.md)**.

## Common Mistakes to Avoid

### DON'T:

1. Put interactive logic in `.astro` files (use Svelte)
2. Skip `client:*` directive for interactive Svelte components
3. Import `MainLayout` in page wrappers (it belongs inside `*Page.astro`)
4. Hardcode translatable text in templates
5. Create content without covering all active languages
6. Use `client:load` when `client:visible` or `client:idle` would suffice
7. Add JS solutions when CSS can achieve the same result
8. Use `text-gray-400`, `dark:text-gray-400`, or `dark:text-gray-500` for body text (fails WCAG AA)
9. Use `role="menu"` for nav dropdowns (use disclosure pattern)
10. Skip heading levels (e.g., h1 -> h3 without h2)
11. Forget `alt=""` on decorative images or `aria-label` on icon-only links
12. Use `MainLayout` for internal hub pages (use `InternalLayout` or `ShowcaseLayout`)
13. Add multilingual variants for internal pages (English-only, dev-only)
14. Reference `/internal/` pages from public pages
15. Name blog post files without date prefix (use `YYYY-MM-DD_slug.md`)
16. Put blog images outside `public/images/blog/posts/{slug}/`
17. Put demo posts outside `_demo/` folders
18. Write Spanish content without proper accents/tildes/ñ
19. List related articles or previous chapters in the Resources section when the post belongs to a series — they already appear in `#series-navigation` below; listing them is redundant
20. **Leave placeholder content in blog posts** — `[AUTHOR: ...]`, `[TODO: ...]`, `[TBD]`, or any bracketed "fill in later" text. Published posts must be complete. Zero tolerance.
21. **Use Spanish slugs for blog posts or series** — all slugs (filenames, series names, image directories) MUST be in English, even for Spanish content
22. **Re-introduce removed surfaces** — slides/tech-talks and the personal pages (cv, portfolio, dailybot, foodie, hobbies, trading, entrepreneur) have been removed from this site. Do not add them back or reference them.
23. **Publish blog posts during the methodology build** — the blog engine is dormant and hidden from nav; only reactivate it for case studies when explicitly asked.
24. **Add a new top-level page without updating `src/middleware.ts`** — the middleware has a hardcoded allowlist (`KNOWN_ROOT_PATHS` / `KNOWN_ES_PATHS`). New top-level routes (`/foo`, `/es/foo`) return 404 until added to the allowlist. Symptom: dev log shows `[404] (rewrite) /foo` (the `(rewrite)` is the smoking gun — it comes from `context.rewrite()` in the middleware, not from Astro routing). Multi-segment paths like `/foo/bar` and any path containing `.` bypass the rule, which is why deck detail pages can work while the listing page 404s. The canonical adoption endpoint `/init` (plus its `/setup` and `/onboarding` redirects) and their `/es/` variants are already in the allowlist; keep them there. See [Architecture → Middleware Allowlist](docs/ARCHITECTURE.md#middleware-allowlist-critical).

### DO:

1. Use Biome for linting (`pnpm run biome:check` before commits)
2. Use Svelte for interactive components with appropriate `client:*` directive
3. Support dark mode with Tailwind's `dark:` variant
4. Use `@` path alias for imports
5. Use the Page wrapper pattern (thin wrappers + `*Page.astro`)
6. Create/update content in all active languages
7. Use `text-gray-600 dark:text-gray-300` for secondary text (WCAG AA)
8. Include `width` and `height` on all `<img>` elements
9. Use date-prefix naming for blog posts (`YYYY-MM-DD_slug.md`)
10. Verify Spanish diacritical marks before committing
11. Ensure no placeholder content in published pages (`grep -rn '\[AUTHOR:\|\[AUTOR:\|\[TODO:\|\[TBD\]\|\[FIXME\]' src/content/` → zero matches)
12. Add both EN and ES versions for all methodology, spec, and kit content
13. Keep matching `src/content/pages/{en,es}/*.md` endpoints in sync with every rendered page

## Pre-Commit Checklist

- [ ] All code in English
- [ ] `pnpm run test` passes
- [ ] `pnpm run biome:check` passes
- [ ] `pnpm run astro:check` passes
- [ ] `pnpm run build` succeeds
- [ ] Dark mode works in new components
- [ ] Content in both English and Spanish
- [ ] Translation strings in both locale files
- [ ] Spanish content has correct diacritical marks
- [ ] No placeholder content in blog posts (`[AUTHOR:`, `[TODO:`, etc.)
- [ ] Meta descriptions: 130-160 characters (pages in translations, blog posts in frontmatter)
- [ ] Accessibility: approved text contrast, image dimensions, heading hierarchy
- [ ] Performance: lightest hydration, minimal JS
- [ ] Commit message in English (conventional format)

## Skills & Agents

- **Skills** — Reusable procedures via slash commands: `quick-fix`, `doc-edit`, `pr-review-lite`, `fix-lint`, `write-tests`, `type-fix`, `refactor-safe`, `security-check`, `git-commit-push`, `translate-sync`, `add-component`, `add-page`, `optimize-image`
- **Agents** — Specialized workers: `reviewer`, `executor`, `architect`, `security-auditor`, `i18n-guardian`, `content-writer`
- **Critical policy:** All content changes MUST cover both EN and ES; new pages MUST use the page-wrapper pattern and update the `src/middleware.ts` allowlist. The blog engine is dormant — only the `/add-blog-post` skill applies when case studies are reactivated.
- **Management:** `/skill-list`, `/agent-list`, `/skill-create`, `/agent-create`
- **Full catalog:** [Skills & Agents Catalog](.agents/docs/skills_agents_catalog.md)

### Execution Modes

| Mode | Support | Description |
|------|---------|-------------|
| Sequential | All agents | Default — tasks one at a time |
| Subagents | Claude Code | Helper agents within session |
| Team Agents | Claude Code only | Parallel instances with shared coordination |
| Orchestrator | All agents | Child DWPs in sub-repos |

See [Team Agents Reference](docs/technical/TEAM_AGENTS_REFERENCE.md) for details.

## ⚡ Slash Commands (All Agents)

**This section applies to ALL agents** — Claude Code, OpenAI Codex, Cursor AI, Gemini, and any other assistant.

### How to Invoke Commands

| Agent | Prefix | Example |
|-------|--------|---------|
| **Claude Code** | `/` (native) | `/add-blog-post` |
| **OpenAI Codex** | `#` | `#add-blog-post` |
| **Cursor AI** | `#` | `#add-blog-post` |
| **Gemini / others** | `#` | `#add-blog-post` |

> **Why `#` for non-Claude agents?** Most AI CLIs (Codex, Cursor) intercept `/` as their own system commands. Using `#` avoids interception. You can also write the command name in plain text: "run add-blog-post".

When a command is invoked (via `/`, `#`, or by name), the agent MUST:

1. **Look up** the command in **[Commands Reference](.agents/docs/COMMANDS_REFERENCE.md)** to find its procedure file
2. **READ** the linked procedure file completely
3. **FOLLOW** its step-by-step instructions exactly
4. **DO NOT** improvise or skip steps — the procedure file IS the spec

> **If a user prompt starts with `#`** (e.g., `#add-blog-post`, `#quick-fix`), treat it as a command invocation — look up the command name (without `#`) in the [Commands Reference](.agents/docs/COMMANDS_REFERENCE.md) and execute its procedure.

## Conventional Commits

**Format:** `<type>: <description>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

Examples: `feat: add blog search functionality`, `fix: resolve dark mode toggle on mobile`
