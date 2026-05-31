# Product Specification

## Overview

**Deep Work Plan** ([deepworkplan.com](https://deepworkplan.com)) is the official website for the **Deep Work Plan (DWP)** methodology — a framework-agnostic, agent-agnostic approach for AI coding agents to execute complex, multi-step software work reliably over hours or days.

The site has three jobs: (1) explain and sell the methodology, (2) host the readable specification, and (3) catalog the kit (presets, adapters, commands) used to install DWP into a repository. It is a fast, fully bilingual (English + Spanish) static site, and it **dogfoods** the methodology it documents.

## Positioning

**Primary identity:** The methodology site for planning and executing complex software work with AI coding agents.

**Value proposition:** A serious, neutral, technical standard that turns ad-hoc agent prompting into a repeatable, validation-first, resume-safe workflow. A Deep Work Plan is a directory of markdown files — a plan overview, per-task instruction files, a running progress log, and utility prompts — that together hold all the state an agent needs to begin, continue, and complete a body of work.

**Tone:** Serious, neutral, specification-grade. No hype, no exclamation marks in body copy, sentence-case headings. This is a methodology-and-spec site, not a personal blog or portfolio.

## Vision

Build a fast, accessible, bilingual site that:

- Communicates within seconds what DWP is and who it is for
- Presents the methodology clearly enough that an engineer can adopt it from the page
- Publishes the normative specification in a readable, navigable form
- Catalogs the installable kit (presets, adapters, commands) for real repositories
- Serves agent-friendly Markdown endpoints so AI agents can consume content natively
- Supports English and Spanish at full parity
- Delivers excellent performance and accessibility (Lighthouse 90+, WCAG AA)
- Is easy for AI agents and humans to maintain and extend

## Target Audience

1. **Engineers adopting DWP** — Developers who want a repeatable workflow for driving AI coding agents through complex work.
2. **AI-agent users** — People orchestrating Claude Code, Codex, Cursor, Gemini, and similar agents who need structure, validation gates, and resume safety.
3. **Engineering leaders / teams** — Adopters evaluating a methodology for reliable agent-assisted delivery across a codebase.
4. **AI agents themselves** — LLMs and coding agents that read the spec and methodology via Markdown endpoints to learn or apply the workflow.
5. **Contributors** — People extending the methodology, presets, adapters, or commands.

## Key Features

### 1. Homepage

**Purpose:** Communicate what DWP is, who it is for, and where to go next — fast.

**Sections:** A hero that states the AI-first / agent-pilotable positioning and value proposition; a concise "what is a Deep Work Plan" explainer; the two narrative pillars (spec-driven development, harness engineering); the core principles (single-task focus, validation-first, git-native, resume-safe); entry points into the methodology reader, the spec reader, the kit catalog, and the `/init` adoption endpoint; and a clear primary call to action.

### 2. Methodology Reader

**Purpose:** Explain and teach the methodology — the primary content of the site.

**Features:**
- Bilingual content collection (`methodology/{en,es}/`)
- Narrative docs: what DWP is, how to adopt it, principles, and the end-to-end workflow
- Cross-links into the specification and kit
- Agent-friendly Markdown endpoints for every page

### 3. Specification Reader

**Purpose:** Publish the normative DWP standard in a readable form.

**Features:**
- Bilingual content collection (`spec/{en,es}/`)
- The DWP workflow: plan folder structure, the task anatomy and its sections, validation gates, completion protocol, resume, the two mandatory final tasks, archetypes, and addons
- RFC-2119 normative language preserved (MUST / SHOULD / MAY)

### 4. Kit Catalog

**Purpose:** Catalog the installable assets for adopting DWP in a repository.

**Features:**
- Bilingual content collection (`kit/{en,es}/`)
- Presets, adapters, and commands (`/dwp-create`, `/dwp-execute`, `/dwp-refine`, `/dwp-resume`, `/dwp-status`)
- Guidance for installing DWP into an existing repo
- Cross-links to the companion skill repo [`DailybotHQ/deepworkplan-skill`](https://github.com/DailybotHQ/deepworkplan-skill)

### 5. Adoption Endpoint (`/init`)

**Purpose:** Give humans and agents a single canonical place to start adopting DWP.

**Features:**
- HTML page at `/init` (and `/es/init`) with a "Give this to your agent" handoff block and a numbered install → onboard → plan/execute sequence framed by the two narrative pillars
- A self-contained, copy-pasteable agent onboarding prompt at `/init.md` (and `/es/init.md`)
- Permanent redirects from `/setup` and `/onboarding` (plus `/es/` variants) to `/init`
- Stays in sync with the companion skill repo `DailybotHQ/deepworkplan-skill`

### 6. Agent-Friendly Markdown Endpoints (AEO)

**Purpose:** Make site content natively accessible to AI agents and LLMs.

**Features:**
- Native Markdown endpoints for every page (`.md` URLs), kept in sync via `pnpm run md:check`
- Content negotiation via `Accept: text/markdown` header (Cloudflare middleware)
- No HTML→Markdown conversion — original source served for token efficiency
- Discovery via `llms.txt`, `llms-full.txt`, and `robots.txt`

**Technical details:** See [Markdown for Agents](aeo/MARKDOWN_FOR_AGENTS.md)

### 7. Bilingual Support

**Purpose:** Reach a broader audience at full parity.

**Languages:**
- English (default) — `/`
- Spanish — `/es/`

**Implementation:**
- Separate route structure per language; language switcher in the header
- `lang` prop passed to page components (page-wrapper pattern)
- Spanish content carries full diacritics (`ñ`, tildes, `¿`/`¡`)

### 8. Blog Engine (Dormant)

**Purpose:** Reserved for future **case studies** about applying the methodology.

The blog engine (MDX posts, series, multi-author, tag taxonomy, RSS, search) is fully built but **hidden from navigation**. It is not part of the launch content set and should only be reactivated for case studies when explicitly requested. See [Blog Posts](features/BLOG_POSTS.md).

## Design Principles

### Visual Design

1. **Serious and neutral** — Specification-grade, technical, restrained
2. **Dark mode support** — System-aware theme toggle with persistence
3. **Responsive** — Mobile-first design approach
4. **Consistent** — Unified palette and typography (see [Brand Guide](BRAND_GUIDE.md))

### Messaging Principles

1. **Neutral, not promotional** — Describe the methodology plainly; let the structure sell it
2. **Specification voice** — Precise, normative where appropriate; no hype or marketing superlatives
3. **Sentence-case headings, no exclamation marks** in body copy
4. **Clear next step** — Each page points to the most useful next destination (methodology → spec → kit)

### Color Palette & Typography

See **[Brand Guide](BRAND_GUIDE.md)** for the complete "Broadsheet" palette (warm paper + ink + oxblood accent), serif typography system, logo, and usage guidelines.

## Technical Requirements

### Performance

- **Static site generation** — pre-rendered HTML
- **Partial hydration** — JavaScript only where needed
- **Optimized assets** — compressed images, lazy loading
- **Budgets** — Lighthouse 90+, fast initial load

### SEO + AEO

- **Meta tags** — title, description, Open Graph, Twitter cards
- **Structured data** — JSON-LD per page
- **Sitemap** — auto-generated XML sitemap, multilingual
- **Agent endpoints** — Markdown parity for every page

### Accessibility

- **WCAG AA** — 4.5:1 contrast for normal text
- **Keyboard navigation** — full keyboard support
- **Screen readers** — proper ARIA labels and landmarks
- **Focus states** — visible focus indicators

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Success Metrics

### Methodology Adoption

- Clarity: a first-time visitor understands what DWP is and who it is for within seconds
- Reach: the methodology, spec, and kit are each reachable in one click from the homepage
- Parity: every page exists and reads correctly in both English and Spanish

### Engagement

- Page views and unique visitors across methodology / spec / kit
- Time on page for the methodology and spec readers
- Agent-endpoint requests (Markdown / `Accept: text/markdown`)

### Technical Performance

- Lighthouse scores (target: 90+)
- Core Web Vitals (LCP, CLS, INP)
- Build times and bundle sizes

### Content Health

- Methodology / spec / kit pages in sync across EN and ES
- Markdown endpoint parity (`pnpm run md:check`) clean
- No placeholder content in shipped pages

## Constraints

### Technical

- **Static hosting** — Cloudflare Pages (no server-side runtime)
- **Bundle size** — minimize JavaScript payload; prefer static Astro over Svelte islands
- **Middleware allowlist** — new top-level routes must be added to `src/middleware.ts`

### Content

- **Language** — code and docs in English; site content bilingual EN/ES
- **Voice** — serious, neutral, technical throughout

## Deployment

### Hosting

- **Platform**: Cloudflare Pages
- **Domain**: deepworkplan.com
- **SSL**: provided by Cloudflare

### Process

1. Build with `pnpm run build`
2. Cloudflare serves the `dist/` folder from its global CDN
3. Deploy triggered on every push to `main`

## Related Documentation

- [Architecture](ARCHITECTURE.md) — Technical implementation
- [Development Commands](DEVELOPMENT_COMMANDS.md) — Build scripts
- [Standards](STANDARDS.md) — Coding conventions
- [Brand Guide](BRAND_GUIDE.md) — Visual identity
- [README](../README.md) — Project overview and quick start
