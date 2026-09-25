# AGENTS.md - Documentation for AI Agents

**Purpose:** Single source of truth for all AI coding assistants (Claude Code, Cursor AI, OpenAI Codex, Google Gemini, GitHub Copilot, and others). Ensures all agents work with consistent guidelines and patterns.

## Detailed Documentation

**Comprehensive guides for specific tasks:**

| Category | Guide | Purpose |
|----------|-------|---------|
| Architecture | [Architecture](docs/ARCHITECTURE.md) | Components, Content Collections, Svelte integration, project structure |
| Standards | [Standards](docs/STANDARDS.md) | Canonical coding rules, orthography, import order |
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
| Design System | [DESIGN.md](docs/DESIGN.md) | Agent-facing design-system spec (DWP `design-system` addon): Broadsheet tokens (color/type/spacing/radius), component patterns, WCAG do's & don'ts. **Read before generating or editing UI.** |
| Analytics | [Analytics](docs/ANALYTICS.md) | Tracking, GSC, verification |
| AI Agents | [Agent Onboarding](docs/AI_AGENT_ONBOARDING.md), [Agent Collaboration](docs/AI_AGENT_COLLAB.md) | Setup, handoff, coordination |
| Skills/Agents | [Skills & Agents Catalog](.agents/docs/skills_agents_catalog.md) | Available skills and agents |
| Commands | [Commands Reference](.agents/docs/COMMANDS_REFERENCE.md) | All slash commands with procedure files |

## Project Overview

**Deep Work Plan** ([deepworkplan.com](https://deepworkplan.com)) — The official website for the Deep Work Plan (DWP) methodology: the methodology that turns any repository into an **AI-first, agent-pilotable** codebase. DWP documents a repo (AGENTS.md, docs, `.agents/` skills, the DWP skill), enables **long-horizon plans**, and lets **any agent pilot the repo** against explicit acceptance criteria and validation gates. A serious, neutral, fast documentation-and-marketing site built with Astro, in the **"Broadsheet" editorial design system** (warm paper, ink serif display, hairline rules, restrained oxblood accent), with dark mode, multilingual content in 17 languages (en, es, pt, zh, ja, de, fr, ko, ru, it, tr, id, vi, hi, pl, uk, th), static site architecture deployed to Cloudflare Pages.

The site explains and positions the DWP methodology, hosts the readable specification and kit catalog, ships agent-friendly Markdown endpoints, and exposes a canonical adoption endpoint at **`/quickstart`** (human-readable page, 17 languages) backed by the standalone, English-only, machine-executable **`/init.md`** (a static file, not a content-collection page — never redirected; `/init`, `/setup`, and `/onboarding` all 301-redirect to `/quickstart`). The repository **dogfoods** the methodology it documents.

**Positioning — three narrative pillars** (weave through all copy):

1. **Spec-driven development (SDD).** The plan/spec is the durable source of truth; agents execute against explicit acceptance criteria and validation gates (reduces drift, enables verification, survives across sessions/agents). DWP's plan → atomic tasks → gates → completion loop *is* SDD — and unlike tool-bound SDD (GitHub Spec Kit, Amazon Kiro, Tessl), DWP is **tool-agnostic and repo-native**.
2. **Harness engineering — the repository is the harness.** DWP delivers the agent scaffolding (context, tools, control loop, guardrails, state/resumability) as a **portable methodology + kit installed into the repository**, not a per-tool framework — so any agent can pilot any repo. One-liner: *"Deep Work Plan is spec-driven development where the repository itself becomes the harness."*
3. **Token efficiency — long-horizon by design, efficient by construction.** Context is the agent's scarcest resource. The harness is engineered so the plan pays for itself: instructions load progressively by trigger, validation is selected from each task's Touched Surface, and skills are decided task-locally — measured in instruction bytes per flow (public evaluation ledger), never in invented token percentages.

**Companion skill repo:** the site is paired with **[`DailybotHQ/deepworkplan-skill`](https://github.com/DailybotHQ/deepworkplan-skill)** (DWP packaged as an installable agent skill). Adoption messaging (the `/quickstart` page, the `/init.md` prompt, methodology, and kit) stays in sync with that repo: install the skill → onboard the agent → generate and execute long-horizon plans. Do **not** attribute the DWP name to any external author or popular-productivity source; the DWP name stands on its own (focused, long-horizon agent execution). Design-system reference: **[Brand Guide](docs/BRAND_GUIDE.md)** (palette + serif type + editorial primitives in `src/components/editorial/`).

**Content model:** methodology documentation is primary, paired with the specification reader and kit catalog. The blog engine, slides/tech-talks, and personal pages have been removed — this is a focused methodology-and-marketing site.

**Technology Stack:**

- **Astro 7.0.8** — Static site generator (islands architecture; Rust compiler + Sätteri Markdown)
- **Svelte 5.56.4** — Interactive components
- **TypeScript 6.0.3** — Type-safe development
- **Tailwind CSS 4.3.2** — Utility-first styling with dark mode
- **Biome 2.5.3** — Linter and formatter (replaces ESLint + Prettier)
- **MDX** — Enhanced Markdown for content collections (via `@astrojs/markdown-satteri` / Sätteri)

## Project Structure

> Full tree with all files: **[Architecture Guide](docs/ARCHITECTURE.md#project-structure)**

```
src/
├── components/          # UI components (Astro + Svelte)
│   ├── home/            # Homepage sections (Hero, Pitch, Outcomes, ...)
│   ├── editorial/       # Editorial primitives (Broadsheet design system)
│   ├── layout/          # Header.svelte, MobileMenu.svelte
│   └── pages/           # Shared page components (*Page.astro)
├── content/             # Content Collections (methodology, spec, kit, pages — 17 lang folders each)
│   ├── methodology/{en,es,pt,zh,…}/  # Methodology docs (primary content)
│   ├── spec/{en,es,pt,zh,…}/         # Specification reader content
│   ├── kit/{en,es,pt,zh,…}/          # Kit catalog (presets, adapters, commands)
│   └── pages/{en,es,pt,zh,…}/        # Agent-friendly Markdown endpoints (AEO)
├── layouts/             # MainLayout, InternalLayout, ShowcaseLayout
├── lib/                 # Utilities (i18n.ts, translations/, markdown-for-agents.ts, mcp/ MCP server logic, agent-recovery.ts)
├── pages/               # File-based routing (EN at root, non-EN under /[lang]/ dynamic tree)
│   ├── [lang]/          # Single dynamic tree serving all non-default languages
│   └── internal/        # Dev-only hub (excluded from production)
└── styles/              # global.css (Tailwind config)

functions/               # Cloudflare Pages Functions (edge): api/mcp.ts (MCP server) + _middleware.ts
public/api/              # Static agent API artifacts (health.json); spec at public/openapi.json
scripts/                 # Build utilities (image optimization, version stamping)
docs/                    # Project documentation
.agents/                 # Cross-agent skills, commands, agents, settings (canonical)
.claude → .agents        # Backward-compat symlink for Claude Code
.cursor → .agents        # Backward-compat symlink for Cursor
.dwp/                    # Deep Work Plan output (plans) — git-ignored working state
tmp/                     # Temporary workspace (git-ignored, see below)
```

## Temporary Workspace (`tmp/`)

`tmp/` at the project root is a **git-ignored scratch space** for agents and developers: temporary prompts, one-off analysis, debug logs, anything ephemeral. Everything inside is ignored except `.gitkeep`; subdirectories are fine. Nothing permanent lives here — it can be deleted at any time. When a user asks for a temporary file or scratch artifact, write it to `tmp/`.

## Plan Output Belongs to the Plan (MANDATORY)

`tmp/` is for **freeform scratch**. Anything produced **about a Deep Work Plan**
is different: it is evidence a later session reads back by pointer.

**The rule:** a plan's temporary and analysis output MUST be written under
`.dwp/plans/PLAN_{name}/analysis_results/` — the analysis, the skills ledger,
the security review, gate logs, audit reports — and MUST NOT be written to the
repository root. Evidence that is not where the plan says it is has been lost.

**In practice:** `md:content-check`, `audit-seo.mjs` and `audit-aeo.mjs` default
their report path to the **current working directory**. When running any of them
as part of a plan, pass the explicit output flag:

```bash
pnpm run md:content-check \
  --out  .dwp/plans/PLAN_{name}/analysis_results/MD_HTML_CONTENT_PARITY.md \
  --data .dwp/plans/PLAN_{name}/analysis_results/MD_HTML_CONTENT_PARITY_DATA.csv
```

The defaults are kept deliberately so the scripts stay usable **outside** a plan.
`/analysis_results` is gitignored, so a missed flag cannot become a commit — but
an ignored file is still a lost artifact, so pass the flag. Per-script paths and
the remaining invocations: [Development Commands → Audit scripts](docs/DEVELOPMENT_COMMANDS.md#audit-scripts-always-pass---out-inside-a-plan).

> Mirrors the normative rule in
> `.agents/skills/deepworkplan/spec/DWP_SPECIFICATION.md` §5.

## Skills, Commands, and Agents (`.agents/`)

The `.agents/` directory is the **canonical, cross-agent home** for everything that defines how AI assistants behave in this repo: skills, slash commands, agent definitions, internal documentation, and settings. The same content is consumed by Claude Code, Cursor AI, OpenAI Codex, Gemini, and any other coding agent that picks up local skills/commands.

```
.agents/
├── agents/        # Agent definitions (architect, executor, reviewer, ...)
├── commands/      # Slash commands (commit, pr, branch, dwp-*, ...)
├── skills/        # Skill procedures (fix-lint, translate-sync, ...)
├── docs/          # Catalogs and references (skills_agents_catalog.md, COMMANDS_REFERENCE.md)
├── README.md      # Conventions for authoring skills, agents, and commands
├── settings.json           # Claude Code env (env vars, experimental flags)
└── settings.local.json     # Claude Code local permissions (git-tracked)
```

**Backward compatibility — `.claude/` and `.cursor/` symlinks:**

Claude Code historically reads from `.claude/` and Cursor from `.cursor/` at the repo root. To keep both working without duplicating files, **both are symlinks to `.agents`**:

```bash
ls -la .claude .cursor
# .claude -> .agents
# .cursor -> .agents
```

This means every `.claude/...` or `.cursor/...` path (e.g., `.claude/skills/foo/SKILL.md`, `.cursor/hooks.json`) resolves transparently to `.agents/`. No tool, hook, or settings file needs to change for either agent to keep working.

**Authoring rules (all agents):**

- Use `.agents/...` as the canonical path in **all new documentation, prompts, and skill/command files**. Do not write `.claude/...` or `.cursor/...` in new content.
- Do not edit files via the `.claude/` or `.cursor/` symlinks — edit the real files under `.agents/`.
- Settings files (`settings.json`, `settings.local.json`) are Claude Code-specific but live in `.agents/` for symmetry. They're a no-op for other agents.
- The `.agents/README.md` documents how to add new skills, commands, and agents.

**Why the rename?** The `.agents/` name signals that the folder is shared across agents, matching the project-level `AGENTS.md` convention (which is itself the canonical file that `CLAUDE.md` symlinks to). It avoids implying that the contents are Claude-only.

## Working principles

Work with autonomy, ownership, and sound judgment. Pursue excellence through correctness, clarity, simplicity, and verified completion. These are defaults within the current request, not new authority: they never override host permissions, a narrower scope, plan gates, read-only flows, or the consent checkpoints below.

- **Own the outcome.** Carry authorized work through investigation, execution, and validation. Continue until the requested outcome is complete or a concrete blocker stops progress.
- **Be resourceful before asking.** Inspect the code, `docs/`, the vendored skills, and prior decisions. Answer what investigation can answer instead of handing the question back.
- **Make routine decisions independently.** Choose sensible approaches within the authorized scope and state consequential assumptions. Do not ask to confirm routine steps or already-authorized actions.
- **Ask when judgment or authorization is missing.** Consult the user when essential information is unavailable, a material decision cannot be inferred, or an action needs approval not yet granted — bringing the investigation, the options, and a recommendation.
- **Make approvals concrete.** Finish the authorized preparation first, then present a reviewable result and name the action that needs approval and why.
- **Work through obstacles.** Investigate failures and attempt recovery in scope; continue independent authorized work meanwhile. Respect stop conditions and escalate when progress needs a user decision or an external change.
- **Respect intent and scope.** An analysis request stays analysis. Propose broader improvements separately. Preserve existing work, decisions, and this repository's approval rules.
- **Apply proportionate rigor.** Fix underlying causes, match validation to impact, and avoid unrelated changes — a content typo and a change to `src/lib/` do not warrant the same gate.
- **Communicate directly and precisely.** Lead with the result. Distinguish verified facts from assumptions and open questions.
- **Verify before declaring completion.** Check the result against the request, run the gates that cover it, and report what was validated and what was not. Never claim a command, check, or outcome that did not occur.

## CRITICAL: Mandatory Requirements

### 1. Language Standards

**ALL code, comments, and documentation MUST be in English.** Always update documentation after important changes.

### 2. Orthography & Diacritical Marks (MANDATORY)

**All user-facing text MUST use proper orthography.** Spanish content MUST include ñ (e.g., pequeño, diseño, español), accented vowels (e.g., análisis, código, página, versión), and interrogative accents (e.g., cómo, qué, cuál).

**Quick validation** before committing Spanish text:

```bash
grep -rn 'pequeno\|tamano\|diseno\|espanol\|manana' src/content/methodology/es/ src/content/spec/es/ src/lib/translations/es.ts
grep -rn 'analisis\|numero\|codigo\|ejecucion\|version\|pagina\|titulo' src/content/methodology/es/ src/content/spec/es/ src/lib/translations/es.ts
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
import { getTranslations } from '@/lib/translations';

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

**ALL content changes MUST be synchronized across every active language.** The site ships 17 languages today (en, es, pt, zh, ja, de, fr, ko, ru, it, tr, id, vi, hi, pl, uk, th). The list of active languages is **derived** from `src/lib/translations/*.ts` — dropping a new `<code>.ts` file under `src/lib/translations/` auto-registers it through `getActiveLanguages()` in `src/lib/i18n.ts`. No exceptions.

**Content type rules:**

- **Pages:** Create 1 shared `*Page.astro` in `src/components/pages/` + a 3-line wrapper in `src/pages/<name>.astro` (default-lang, passes `lang="en"`) + a single dynamic wrapper in `src/pages/[lang]/<name>.astro` that derives `lang` from `Astro.params`. One dynamic file covers all 16 non-default languages — never duplicate per-language wrappers.
- **Methodology / Spec / Kit:** Every document MUST exist in every active language folder of its collection (`{en,es,pt,zh,…}/`), sharing the same English slug. Translate `title`, `description`, and body; preserve `order`, `lang`, and code blocks. Use the `/translate-sync` skill.
- **Translation Strings:** Add to EVERY locale file under `src/lib/translations/` (en.ts, es.ts, pt.ts, zh.ts, …). Update `types.ts` with any new interface keys. Run `pnpm run i18n:check` to verify parity.
- **Components:** Use `getTranslations(lang)` from `@/lib/translations`. Never hardcode user-visible strings.
- **Agent-Friendly Markdown (MANDATORY):** When page or translation content changes, update the corresponding `src/content/pages/{en,es,pt,zh,…}/*.md` files in every active language. These serve as Markdown endpoints for AI agents and MUST stay in sync with the HTML content. See **[Markdown for Agents](docs/aeo/MARKDOWN_FOR_AGENTS.md)**.

**Compliance checklist:**

- [ ] One `src/pages/<name>.astro` (default-lang) + one `src/pages/[lang]/<name>.astro` (all non-default)
- [ ] Methodology/spec/kit doc exists in every active language folder with the same English slug
- [ ] UI strings exist in every `src/lib/translations/*.ts` file (`pnpm run i18n:check` passes)
- [ ] No hardcoded user-visible text
- [ ] Page Markdown files updated in every `src/content/pages/<lang>/` (`pnpm run md:check` passes)

**Tools:** `/translate-sync` skill, `i18n-guardian` agent, `pnpm run i18n:scaffold <code>` for new languages. Adding a new language: see **[I18N Guide](docs/I18N_GUIDE.md)**.

### 8. Performance-First Mindset (MANDATORY)

1. **Prefer static over dynamic** — use `.astro` for non-interactive content
2. **Choose the laziest hydration** — `client:visible` or `client:idle` over `client:load`
3. **Minimize JavaScript** — prefer CSS-only solutions over JS
4. **Use native browser APIs** — IntersectionObserver over scroll listeners, native `loading="lazy"`
5. **Optimize images** — always include dimensions, lazy load below-fold content
6. **Avoid layout shifts** — reserve space for async content, `font-display: swap`
7. **Keep search payload lean** — use language-sharded endpoints, minimal index schema
8. **Protect Lighthouse scores** — run `pnpm run lighthouse` (mobile) and `pnpm run lighthouse:desktop` after performance-sensitive changes

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

### Optional — Dailybot reporting (best-effort, never blocks)

This repo has the DWP **Dailybot addon** wired: the `dailybot` skill is installed alongside `deepworkplan` under `.agents/skills/` (vendored, tracked in git). When the Dailybot CLI is present and authenticated, DWP work emits standup-style agent updates at four lifecycle points — **kickoff** (a plan is approved: what is being built), **significant task** (a feature/fix ships mid-plan), **blocked** (a run halts; `state.json.blocked` says what it needs), and **completion** (the only **milestone**: what was built) — routed through the dailybot `report` sub-skill, with `--json-data` derived from the plan's `state.json`. If Dailybot is absent, unauthenticated, or unreachable — or `.dailybot/disabled` exists — skip silently and continue: **reporting never blocks any work.** Describe outcomes for the team, never plan IDs, task numbers, file paths, or git stats.

**Deterministic hook enforcement (Claude Code):** `.agents/settings.json` wires the Dailybot lifecycle hooks (`dailybot hook session-start | activity | stop`, CLI >= 1.12.0) so the harness itself detects unreported work and reminds the agent at end of turn — no reliance on the model remembering. When a reminder fires: send a report if a meaningful unit of work is done, or run `dailybot hook dismiss` if not — never ignore it silently, and never let reporting block work. The hooks are local-only, always exit 0, and respect `.dailybot/disabled`.

### Vendored agent skills — addons auto-refresh; deepworkplan is repo-adapted

`.agents/skills/deepworkplan/`, `.agents/skills/dailybot/`, and `.agents/skills/ai-diff-reviewer/` are **vendored copies** tracked in git and pinned via `skills-lock.json`. They are managed differently on purpose:

| Skill | Upstream | Release auto-refresh | Why |
|-------|----------|----------------------|-----|
| `deepworkplan` | `DailybotHQ/deepworkplan-skill` | **No** | Repo-adapted DWP kit — blind reinstall would overwrite local adaptation. Update only via an explicit, reviewed change that re-adapts the skill to this repository. |
| `dailybot` | `DailybotHQ/agent-skill` | **Yes** | Addon — safe to pin to latest upstream on every website release. |
| `ai-diff-reviewer` | `DailybotHQ/ai-diff-reviewer` | **Yes** | Addon — safe to pin to latest upstream on every website release. |

**How refresh works, in one paragraph.** [`release_and_publish.yml`](.github/workflows/release_and_publish.yml) Step 1a fires on every merge to `main`, resolves the latest upstream tag of the two addon skills, installs only those that moved with `npx --yes skills add <repo>@<tag> --skill <name> --force -y` (both flags are required in a non-TTY runner), asserts that the installed version equals the requested tag, and commits the result alongside the version bump. A failed install or a version mismatch **fails the release**; a transient `gh` blip skips only that skill. Refresh is release-driven, never scheduled.

**Editing policy.**
- **Do not** hand-edit `.agents/skills/dailybot/` or `.agents/skills/ai-diff-reviewer/` — the next release overwrites those edits. Contribute upstream instead.
- **Do** treat `.agents/skills/deepworkplan/` as repo-adapted: changes there must be intentional and reviewed, contributed upstream first, then re-adapted deliberately.

**Current vendored provenance (2026-09-25):** the `deepworkplan` copy is the released upstream tag **`v5.5.3`** (`672b266`), installed via `npx --yes skills add DailybotHQ/deepworkplan-skill@v5.5.3 --skill deepworkplan --force -y`, with the installed `version:` asserted equal to the tag. `ai-diff-reviewer` is at **v3.1.1** and `dailybot` at **v3.14.0**, refreshed and asserted the same way. The pack keeps no local divergence from upstream; a future tag install overwrites nothing that is not already upstream. Local adaptation remains the command delegators, refreshed from the skill's own `onboard/command-templates/`.

> Full mechanics — the refresh sequence step by step, failure semantics, the official CLI publishing step and its namespace strategy, and the provenance history including this repository's own upstream contribution — live in [Architecture → Dogfooding DWP](docs/ARCHITECTURE.md#addon-refresh--the-full-sequence).

### Local AI Diff Reviewer

The vendored [`ai-diff-reviewer`](.agents/skills/ai-diff-reviewer/) skill remains
available for the required local review during each Deep Work Plan Final Review.
The website also runs a CI self-review (`.github/workflows/self-review.yml`): a
single `grok` leg via `DailybotHQ/ai-diff-reviewer@v3`, label-gated on `ready`
(case-insensitive, run-once per application — remove and re-add the label to
re-run), with an honest skip when `XAI_API_KEY` is not configured. That secret
is required only for the CI leg; the local review never needs it. The shared
[`.review/extension.md`](.review/extension.md) configures both the local and
the CI review.

DWP standard: 5.0.0 (onboarded 2026-09-11, upgraded 2026-09-13, 2026-09-17 and 2026-09-25; skill 5.5.3)

## Quick Commands

```bash
pnpm run dev                # Dev server (http://localhost:5555)
pnpm run build              # Production build (prebuild regenerates .agents/skills/index.json)
pnpm run astro:preview      # Preview production build
pnpm run biome:check        # Lint and format check
pnpm run biome:fix          # Auto-fix lint issues
pnpm run astro:check        # TypeScript type checking
pnpm run test               # Run unit tests
pnpm run test:coverage      # Tests with coverage
pnpm run images:optimize    # Process staged images
pnpm run md:check           # Verify every HTML page has a matching .md for agents
pnpm run md:check:strict    # Same as above; exits 1 on missing (for CI)
pnpm run md:content-check   # Verify the .md actually carries equivalent content (not just exists)
pnpm run i18n:check         # Verify translation parity across all 17 active languages
pnpm run i18n:scaffold <code>  # Scaffold strings + content for a new language code
pnpm run lighthouse         # Lighthouse CI audit (mobile)
pnpm run lighthouse:desktop # Lighthouse CI audit (desktop)
pnpm run release            # Bump version and release commit
pnpm run ncu:check          # Check for package updates
```

Full command reference: **[Development Commands](docs/DEVELOPMENT_COMMANDS.md)**.

## Architecture Patterns

The six patterns this codebase is built on, with their non-negotiable rule. Full
explanation and worked code for each lives in
**[Architecture Guide](docs/ARCHITECTURE.md#architecture-patterns)**; the
corresponding failure modes are in *Common Mistakes to Avoid* below.

| # | Pattern | The rule |
|---|---------|----------|
| 1 | **Astro components** | `.astro` is the default. Frontmatter runs at build time — no interactive logic in it. |
| 2 | **Content Collections** | Methodology, spec, kit and pages are collections with Zod schemas in `src/content.config.ts`. |
| 3 | **Svelte integration** | Svelte only for interactive components, and always with a `client:*` directive — prefer `client:visible` over `client:load`. |
| 4 | **Page wrapper (MANDATORY)** | A page is exactly **1** `*Page.astro` component + **1** default-lang wrapper + **1** `[lang]` dynamic wrapper, regardless of how many languages ship. Wrappers never import `MainLayout`. |
| 5 | **i18n routing** | English at the root of `src/pages/`; every other active language through the single dynamic `src/pages/[lang]/**` tree, enumerated from the registry. |
| 6 | **Internal hub** | `/internal/` is dev-only: `InternalLayout` or `ShowcaseLayout`, never `MainLayout`, English-only, never referenced from a public page. |

## Methodology Content Conventions

Methodology documentation is the **primary content** of the site. It lives in multilingual content collections (17 active languages) and is rendered by the methodology, spec, and kit readers.

**Collections:**

- **`methodology/{en,es,pt,zh,…}/`** — The narrative methodology docs (what DWP is, how to adopt it, principles, workflow). Primary marketing-and-teaching content.
- **`spec/{en,es,pt,zh,…}/`** — The readable specification (the normative DWP standard: task anatomy, validation gates, completion protocol, mandatory final tasks, archetypes, addons).
- **`kit/{en,es,pt,zh,…}/`** — The kit catalog: presets, adapters, and commands available for installing DWP into a repo.

**File naming:** `slug.md` (or `.mdx`) in the relevant `<lang>/` directory. **Slugs MUST be in English** in every language; all language versions share the same English slug.

**Multilingual parity:** Every methodology/spec/kit document MUST exist in every active language folder. Non-English content MUST carry correct diacritics, scripts, and punctuation for its language (Spanish `ñ`/tildes/`¿`/`¡`; CJK full-width punctuation; etc.). Use the `/translate-sync` skill and `i18n-guardian` agent.

**Voice:** Serious, neutral, technical. No hype, no exclamation marks in body copy, sentence-case headings. This is a specification-and-methodology site.

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
15. Write non-English content without proper diacritics/punctuation for its language (Spanish ñ/tildes/¿/¡; CJK full-width punctuation; etc.)
16. **Leave placeholder content in published content** — `[AUTHOR: ...]`, `[TODO: ...]`, `[TBD]`, or any bracketed "fill in later" text. Published pages must be complete. Zero tolerance.
17. **Use non-English slugs for content collections** — all slugs (methodology/spec/kit filenames) MUST be in English, even for non-English content
18. **Re-introduce removed surfaces** — the blog engine, slides/tech-talks, and the personal pages (cv, portfolio, dailybot, foodie, hobbies, trading, entrepreneur) have been removed from this site. Do not add them back or reference them.
19. **Add a new top-level page without updating `src/middleware.ts`** — the middleware allowlist is derived from one set: `KNOWN_BASE_PATHS` (per-language page slugs). Adding `'foo'` to that set covers every language — `/foo`, `/es/foo`, `/pt/foo`, `/zh/foo`, etc. — at once; the prefixed-language list comes from the registry (`getActiveNonDefaultLanguages()`), so new languages need no edit. New top-level routes return 404 until their slug is added. Symptom: dev log shows `[404] (rewrite) /foo` (the `(rewrite)` is the smoking gun — it comes from `context.rewrite()` in the middleware, not from Astro routing). Multi-segment paths like `/foo/bar` and any path containing `.` bypass the rule. The canonical adoption page `/quickstart` (plus its `/init`, `/setup`, and `/onboarding` redirects — all three 301 to `/quickstart`) is already in `KNOWN_BASE_PATHS`; keep it there. See [Architecture → Middleware Allowlist](docs/ARCHITECTURE.md#middleware-allowlist-critical).

### DO:

1. Use Biome for linting (`pnpm run biome:check` before commits)
2. Use Svelte for interactive components with appropriate `client:*` directive
3. Support dark mode with Tailwind's `dark:` variant
4. Use `@` path alias for imports
5. Use the Page wrapper pattern (thin wrappers + `*Page.astro`)
6. Create/update content in all active languages
7. Use `text-gray-600 dark:text-gray-300` for secondary text (WCAG AA)
8. Include `width` and `height` on all `<img>` elements
9. Verify non-English diacritics/scripts before committing (`pnpm run i18n:check`)
10. Ensure no placeholder content in published pages (`grep -rn '\[AUTHOR:\|\[AUTOR:\|\[TODO:\|\[TBD\]\|\[FIXME\]' src/content/` → zero matches)
11. Add a version for every active language for all methodology, spec, and kit content
12. Keep matching `src/content/pages/<lang>/*.md` endpoints in sync with every rendered page (`pnpm run md:check`)

## Pre-Commit Checklist

- [ ] All code in English
- [ ] `pnpm run test` passes
- [ ] `pnpm run biome:check` passes
- [ ] `pnpm run astro:check` passes
- [ ] `pnpm run build` succeeds
- [ ] Dark mode works in new components
- [ ] Content present in every active language (`pnpm run i18n:check` passes)
- [ ] Translation strings present in every `src/lib/translations/*.ts` file
- [ ] Non-English content has correct diacritics/scripts/punctuation for its language
- [ ] No placeholder content in published pages (`[AUTHOR:`, `[TODO:`, etc.)
- [ ] Meta descriptions: 130-160 characters — 60-90 for CJK (`zh`, `ja`, `ko`), whose characters render about twice as wide (pages in translations, collection docs in frontmatter; see [SEO](docs/SEO.md#meta-description-standards-mandatory))
- [ ] Accessibility: approved text contrast, image dimensions, heading hierarchy
- [ ] Performance: lightest hydration, minimal JS
- [ ] Commit message in English (conventional format)

## Skills & Agents

- **Skills** — Reusable procedures via slash commands: `quick-fix`, `doc-edit`, `pr-review-lite`, `fix-lint`, `write-tests`, `type-fix`, `refactor-safe`, `security-check`, `git-commit-push`, `translate-sync`, `add-component`, `add-page`, `add-diagram-component`, `add-language`, `update-styles`, `responsive-lighthouse-audit`, plus the installed `deepworkplan` skill (DWP itself)
- **Agents** — Specialized workers: `reviewer`, `executor`, `architect`, `security-auditor`, `i18n-guardian`
- **Critical policy:** All content changes MUST cover every active language (`pnpm run i18n:check`); new pages MUST use the page-wrapper pattern (1 component + 1 root wrapper + 1 `[lang]` dynamic wrapper) and add the page slug to `KNOWN_BASE_PATHS` in `src/middleware.ts`.
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
| **Claude Code** | `/` (native) | `/translate-sync` |
| **OpenAI Codex** | `#` | `#translate-sync` |
| **Cursor AI** | `#` | `#translate-sync` |
| **Gemini / others** | `#` | `#translate-sync` |

> **Why `#` for non-Claude agents?** Most AI CLIs (Codex, Cursor) intercept `/` as their own system commands. Using `#` avoids interception. You can also write the command name in plain text: "run translate-sync".

When a command is invoked (via `/`, `#`, or by name), the agent MUST:

1. **Look up** the command in **[Commands Reference](.agents/docs/COMMANDS_REFERENCE.md)** to find its procedure file
2. **READ** the linked procedure file completely
3. **FOLLOW** its step-by-step instructions exactly
4. **DO NOT** improvise or skip steps — the procedure file IS the spec

> **If a user prompt starts with `#`** (e.g., `#translate-sync`, `#quick-fix`), treat it as a command invocation — look up the command name (without `#`) in the [Commands Reference](.agents/docs/COMMANDS_REFERENCE.md) and execute its procedure.

## Conventional Commits

**Format:** `<type>: <description>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`

Examples: `feat: add kit catalog filtering`, `fix: resolve dark mode toggle on mobile`
