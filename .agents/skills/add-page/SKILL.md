---
name: add-page
description: Create new pages with correct routing and MainLayout usage. Use proactively when creating new pages.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: haiku
# === Documentation (ignored by tools, useful for humans) ===
tier: 1
intent: create
max-files: 4
max-loc: 200
---

# Skill: Add Page

## Objective

Create new pages in the Astro application with correct file-based routing, MainLayout usage, and SEO properties. Creates pages in ALL active language routes to maintain multilingual parity. Uses shared page components (`src/components/pages/`) with thin per-language wrappers.

## Non-Goals

- Does NOT create components (use add-component skill)
- Does NOT create API endpoints (separate concern)
- Does NOT modify existing pages

## Tier Classification

**Tier: 1** - Light/Cheap

**Reasoning:** Creating a page follows a clear template, has defined patterns, and is low risk.

## Inputs

### Required Parameters

- `$NAME`: Page name/route (e.g., `projects`, `about/team`)
- `$TITLE`: Page title (for SEO)
- `$DESCRIPTION`: Page description (for SEO)

### Optional Parameters

- `$LANG`: Language code (default: `'en'`)
- `$DYNAMIC`: If true, creates dynamic route with `getStaticPaths`

## Routing Patterns

| File | Route |
|------|-------|
| `pages/about.astro` | `/about` (default-language, served at root) |
| `pages/projects/index.astro` | `/projects` |
| `pages/team/[member].astro` | `/team/{member}` (dynamic) |
| `pages/[lang]/about.astro` | `/es/about`, `/pt/about`, `/zh/about`, … (one file covers ALL non-default languages) |

## Steps

### Step 1: Determine Route Structure

- Simple page → `pages/{name}.astro` (default-lang) + `pages/[lang]/{name}.astro` (all non-default)
- Section index → `pages/{name}/index.astro` + `pages/[lang]/{name}/index.astro`
- Dynamic (per-language) → `pages/{name}/[param].astro` + `pages/[lang]/{name}/[param].astro`

### Step 2: Create Shared Page Component (MANDATORY)

**MANDATORY:** Every page must use the Page wrapper pattern. Create the shared component at `src/components/pages/{Name}Page.astro` — this component handles `MainLayout`, translations, and all content internally.

**Static Page Component Template:**

```astro
---
// src/components/pages/{Name}Page.astro
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

interface Props {
  lang: Language;
}

const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.{name}Page.title} description={t.{name}Page.description}>
  <main class="main-container py-24">
    <h1 class="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
      {t.{name}Page.title}
    </h1>

    <div class="prose dark:prose-invert max-w-none">
      <!-- Page content using t.* for text and prefix for URLs -->
    </div>
  </main>
</MainLayout>
```

### Step 3: Create the Two Page Wrappers (MANDATORY)

Adding a page is exactly **two** wrappers regardless of how many languages ship: one default-language wrapper + one dynamic `[lang]` wrapper that covers every other active language.

**Default-language wrapper** (`src/pages/{name}.astro` — 3 lines):
```astro
---
import {Name}Page from '@/components/pages/{Name}Page.astro';
---
<{Name}Page lang="en" />
```

**Dynamic `[lang]` wrapper** (`src/pages/[lang]/{name}.astro` — covers all non-default languages):
```astro
---
import {Name}Page from '@/components/pages/{Name}Page.astro';
import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';

export function getStaticPaths() {
  return getActiveNonDefaultLanguages().map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Language };
---
<{Name}Page lang={lang} />
```

**Key rules:**
- Wrappers never import `MainLayout` — the `*Page.astro` component handles it internally
- The default-language wrapper passes `lang="en"` as a string literal; the dynamic wrapper derives `lang` from `Astro.params`
- One `*Page.astro` component + one root wrapper + one `[lang]` wrapper covers every active language. New languages need ZERO edits in `src/pages/` — they auto-light-up via `getActiveNonDefaultLanguages()`
- If the page introduces new UI text, add entries to **every** locale file under `src/lib/translations/` (en.ts, es.ts, pt.ts, zh.ts, …) and run `pnpm run i18n:check`

### Step 3b: Register the Route in the Middleware Allowlist (MANDATORY for top-level routes)

`src/middleware.ts` uses a derived allowlist. A new single-segment route returns a `(rewrite)` 404 until you register it. Only ONE edit is needed:

1. Add `'foo'` to `KNOWN_BASE_PATHS` — this single entry covers `/foo`, `/es/foo`, `/pt/foo`, `/zh/foo`, etc. (every active language) at once.

Multi-segment paths (`/foo/bar`) and paths containing `.` bypass the rule, so only single-segment
top-level routes need this. Symptom if forgotten: dev log shows `[404] (rewrite) /foo`. See
CLAUDE.md "Middleware Allowlist".

### Step 3c: Stay in the Editorial Design System

New pages must fit "The Broadsheet" editorial system:

- `.main-container` page width; serif `.font-display` headings; paper/ink tokens (`bg-paper text-ink`,
  `--color-paper`, `--color-ink`, `--color-muted`, `--color-line`) and the oxblood `--color-secondary`
  accent — **no indigo, multi-color, glow, or `prose-slate`**.
- Reuse `src/components/editorial/` primitives by name: `Kicker`, `Rule`, `Lead`, `Figure`, `Reference`.
- For data/process diagrams, use the [`add-diagram-component`](../add-diagram-component/SKILL.md) skill — do not hand-roll SVG.
- Add any new translation keys to `src/lib/translations/types.ts` AND every locale file under `src/lib/translations/` (`en.ts`, `es.ts`, `pt.ts`, `zh.ts`, …). Run `pnpm run i18n:check`.
- See the [`update-styles`](../update-styles/SKILL.md) skill for the full token / primitive catalog (paper, ink, muted, line, secondary; serif / sans / mono families; editorial primitives).

### Step 4: Create Agent-Friendly Markdown (MANDATORY)

Create Markdown source files for the new page's `.md` endpoint (Markdown for Agents):

1. Create `src/content/pages/en/{name}.md` with frontmatter (`title`, `description`, `lastUpdated`) and full page content as clean Markdown
2. Create `src/content/pages/<lang>/{name}.md` for **every** active non-default language (`es`, `pt`, `zh`, `ja`, `de`, `fr`, `ko`, `ru`, `it`, `tr`, `id`, `vi`, `hi`, `pl`, `uk`, `th`) with translated frontmatter and content (correct diacritics/scripts/punctuation for the language)

**Content requirements:**
- Include ALL semantic sections from the `*Page.astro` component (same information, not a summary)
- Include internal links to other site pages (for agent navigation/discovery)
- Strip presentation chrome (nav, footer, scripts) but keep all text, headings, lists, and links
- Default-language pages use root-relative links (`/about`); non-default pages prefix with their language code (`/es/about`, `/pt/about`, `/zh/about`, …)

These files are automatically served as `/{name}.md` and `/<lang>/{name}.md` endpoints — no endpoint code changes needed. Agents can also request them via `Accept: text/markdown` header. Run `pnpm run md:check` to verify endpoint parity across every active language.

### Step 5: Validate

```bash
pnpm run astro:check
pnpm run biome:check
pnpm run build
```

## Output Format

### Success Output

```
## ✅ Pages Created (Multilingual)

### Pages
- English: `src/pages/{path}.astro` -> URL: `/{route}`
- Spanish: `src/pages/es/{path}.astro` -> URL: `/es/{route}`
- Type: {Static|Dynamic}

### SEO
- Title: {title} / {title_es}
- Description: {description} / {description_es}

### Layout
- Uses MainLayout ✅
- main-container ✅

### Validation
- Astro check: ✅
- Build: ✅

### Commit Message
feat: add {name} page (en + es)
```

## Guardrails

### Required Elements

- [ ] Shared `*Page.astro` component handles `MainLayout` internally
- [ ] Page wrappers are 3-line files (import + render with `lang` literal)
- [ ] Has `main-container` wrapper
- [ ] Has semantic heading (`<h1>`)
- [ ] Dark mode support

### Scope Limits

- **Maximum files:** 4 (1 shared component + N language wrappers)
- **Maximum LOC:** 200

### Multilingual Enforcement

- MUST create a shared page component and wrappers for all active languages (see `src/lib/i18n.ts`).
- If new UI strings are needed, add them to `translations.ts` for all active languages.

### Stop Conditions

**Stop and escalate** if:

- Needs new layout component
- Complex data fetching required
- Multiple dynamic segments
- Translation quality is uncertain for page content

## Definition of Done

- [ ] Shared page component created in `src/components/pages/`
- [ ] Thin wrapper created for each active language (see `src/lib/i18n.ts`)
- [ ] All wrappers use correct `lang` value
- [ ] Shared component uses `MainLayout` with `lang` prop and `getUrlPrefix(lang)` for URLs
- [ ] SEO props provided for all active languages
- [ ] New UI strings added to `translations.ts` for all active languages (if applicable)
- [ ] `pnpm run astro:check` passes
- [ ] `pnpm run build` passes

## Examples

### Example 1: Static Page

**Input:**
```
$NAME: projects
$TITLE: My Projects
$DESCRIPTION: A showcase of my development projects
```

**Creates:**
- `src/pages/projects.astro` -> `/projects`
- `src/pages/es/projects.astro` -> `/es/projects`

### Example 2: Page with Translations

**Input:**
```
$NAME: about
$TITLE: About Me
$DESCRIPTION: Information about me
```

**Creates:**
- `src/pages/about.astro` (English, `lang='en'`)
- `src/pages/es/about.astro` (Spanish, `lang='es'`)

### Example 3: Dynamic Page

**Input:**
```
$NAME: projects/[slug]
$TITLE: (dynamic)
$DESCRIPTION: (dynamic)
$DYNAMIC: true
```

**Creates:** `src/pages/projects/[slug].astro`
**Route:** `/projects/{slug}`

## Related

- [add-component](../add-component/SKILL.md) - Create components
- [translate-sync](../translate-sync/SKILL.md) - Synchronize translations
- docs/ARCHITECTURE.md - Routing details
- src/pages/README.md - Page patterns
