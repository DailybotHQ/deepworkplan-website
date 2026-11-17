# AGENTS.md — guidance for coding agents

This is the repository's shared entry point for coding agents. Read the relevant detailed guide before changing an area; keep all tracked code, comments, and documentation in English. User-facing translations must follow native orthography. Use the repository's current package scripts and source as truth when documentation conflicts.

## Project and source of truth

Deep Work Plan (DWP) is the methodology site and the public ecosystem hub. It publishes the methodology, readable specification, kit catalog, agent-friendly Markdown, `/quickstart` in 17 languages, and the standalone English machine-readable `/init.md`. The site is Astro static output deployed to Cloudflare Pages, with selected Cloudflare Pages Functions. The removed blog, slides/tech-talks, and personal-site surfaces must not be reintroduced or described as current.

The homepage hero currently uses the eyebrow **“Spec-first · closed-loop”**, headline **“Turn your repo into one any AI agent can finish work in.”**, and subtitle **“Your repository holds the plan, the context and the checks, so the work survives restarts, moves between agents and keeps looping until every gate passes — within the authority you grant.”** The working lead sentence **“Spec-first, loop-closed: the repository is the harness and the plan runs itself to done.”** remains the JSON-LD/brand line. The pull quote is **“Spec-first says what; the harness says where; loop engineering says how it finishes.”**

DWP's narrative has four pillars: spec-first planning for one authorized work episode; the repository as the portable harness; loop engineering within recorded authority and gates; measured efficiency in instruction bytes per flow only when a measurement path exists. Keep DWP distinct from tool-bound SDD products; make no unmeasured comparisons or invented token/cost claims. The methodology works alone; addons are optional. Do not attribute the DWP name to an external author or productivity product.

All product claims must be supported by a released artifact: the vendored `.agents/skills/deepworkplan/`, the vendored `.agents/skills/herdr-peers/`, or the pins in `src/lib/ecosystem-pins.ts`. Current pins are pack v8.0.3, agentkit v1.5.0, herdr-peers v2.2.1, devcontainer-kit v1.4.2, DeepWorkPlan Vim v1.1.0, AI Diff Reviewer v3.3.16, and Dailybot agent-skill v3.23.20. The pin file is authoritative; tests guard public surfaces against drift. Do not hand-edit vendored skills: Dailybot and AI Diff Reviewer refresh on site release; the repo-adapted DWP skill changes only through a reviewed, provenance-verified update; herdr-peers moves only with its pin. See [Ecosystem Context](docs/ECOSYSTEM_CONTEXT.md) and [Vendored agent skills](docs/ARCHITECTURE.md#vendored-agent-skills).

Stack versions come from `package.json`: Astro 7.3.6, Svelte 5.57.2, TypeScript 6.0.3, Tailwind CSS 4.3.3, Biome 2.5.15, `@astrojs/mdx` 8.0.3, and Sätteri 0.10.5. Node is `>=24.20.0`; pnpm is pinned in `package.json#packageManager`.

## Read the right guide

| Topic | Guide |
|---|---|
| Architecture, routing, collections, vendoring | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Coding and language standards | [docs/STANDARDS.md](docs/STANDARDS.md) |
| Tests and gate selection | [docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md) |
| Commands and audits | [docs/DEVELOPMENT_COMMANDS.md](docs/DEVELOPMENT_COMMANDS.md) |
| Translation workflow | [docs/I18N_GUIDE.md](docs/I18N_GUIDE.md) |
| Security, provenance and install posture | [docs/SECURITY.md](docs/SECURITY.md) (public counterparts: `/trust`, `/.well-known/dwp-trust.json`) |
| Performance and accessibility | [docs/PERFORMANCE.md](docs/PERFORMANCE.md), [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) |
| SEO and agent endpoints | [docs/SEO.md](docs/SEO.md), [docs/aeo/MARKDOWN_FOR_AGENTS.md](docs/aeo/MARKDOWN_FOR_AGENTS.md) |
| Product voice and design | [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md), [docs/BRAND_GUIDE.md](docs/BRAND_GUIDE.md), [docs/DESIGN.md](docs/DESIGN.md) |
| Ecosystem hub boundaries | [docs/ECOSYSTEM_CONTEXT.md](docs/ECOSYSTEM_CONTEXT.md), [docs/CROSS_PROJECT_STANDARDS.md](docs/CROSS_PROJECT_STANDARDS.md), [repositories/README.md](repositories/README.md) |
| Skills, agents, commands | [.agents/docs/skills_agents_catalog.md](.agents/docs/skills_agents_catalog.md), [.agents/docs/COMMANDS_REFERENCE.md](.agents/docs/COMMANDS_REFERENCE.md) |

## Required working rules

### Scope, authority, and collaboration

- Work only within the user's authorization, host permissions, plan scope, and applicable gates. Autonomy does not grant new authority or waive consent, approval, or sign-off.
- Inspect source, docs, vendored skills, and prior decisions before asking. Resolve routine choices independently; record consequential decisions and reversibility in the active plan's `PROGRESS.md`.
- Escalate only critical items under DWP `AGENT_PROTOCOL.md` §7.5 (C1–C7); bring findings, options, and a recommendation. Prepare a concrete reviewable result before seeking approval. A relayed approval adds no authority.
- Continue through recoverable obstacles and do independent authorized work. Do not weaken a failing gate without authorization. Report verified outcomes and unverified limits accurately.
- Do not send external messages, publish, deploy, push to `main`, access secrets, or perform other approval-gated actions without applicable authorization. Prior authorization persists.
- Multiple agents may coordinate; mirror changes to relevant guidance. Dailybot reporting is optional and best-effort: skip if unavailable, unauthenticated, unreachable, or disabled; never block work. Report outcomes, not plan IDs, task numbers, paths, or git statistics. On a Claude Code hook reminder, report meaningful work or run `dailybot hook dismiss`; never silently ignore it.

Dailybot lifecycle reports cover kickoff, significant task, blocked, and completion; completion is the only milestone. Route reports through the `dailybot report` sub-skill and derive `--json-data` from plan `state.json`. Skip silently if the CLI is absent, unauthenticated, unreachable, or `.dailybot/disabled` exists. `.agents/settings.json` wires `dailybot hook session-start|activity|stop` (CLI >= 1.12.0); on a reminder, report meaningful work or run `dailybot hook dismiss`. Hooks are local-only, always exit 0, and respect `.dailybot/disabled`.

### Repository boundaries

This repository is the ecosystem hub. Site/docs/tooling/coordination changes belong here. Ecosystem product changes belong inside `repositories/<name>`: read that clone's `AGENTS.md`, pull its default branch, and follow its branch, gate, commit, push, and PR rules. Never commit another repo's code from the hub root, force-add a clone, make a submodule, or copy its files here. Only `repositories/README.md` and `manifest.json` are tracked there; update both and run `bash tests/scripts/repositories.test.sh` when adding a public repository. The sync script does not delete, touch dirty or feature-branch clones, or rewrite remotes. Removing a clone is a developer's manual literal-path decision. For shared `agent-skill` and `cli` clones, pull first and never leave unpushed work. Cross-repo changes use a parent orchestrator plan here and one child plan per affected repo, ending with an integration checkpoint. Releases proceed pack → dependent addons → site. Use conventional English commits, one branch and PR per repo per change, and never force-push or use an admin merge; the owner merges. Add the case-insensitive `Ready` label when a PR opens, wait for the AI Diff Reviewer, and resolve critical findings before requesting merge. See the linked ecosystem guides for per-repository gates and PR rules.

### Plan evidence and scratch files

Freeform scratch belongs in the git-ignored root `tmp/` (ignored except `.gitkeep`). Any analysis or evidence about a Deep Work Plan belongs under `.dwp/plans/PLAN_{name}/analysis_results/`, never the repository root; pass explicit output paths to audit scripts that otherwise write to the current directory. Plan state belongs to its plan. `.dwp/` is ignored except the tracked addon registry `.dwp/config.json`.

### Code, UI, and quality

- Prefer static `.astro`; use Svelte only for interaction, hydrate as late as practical (`client:visible`/`client:idle` before `client:load`), prefer CSS/native APIs, and avoid unnecessary JavaScript.
- Every interactive Svelte component MUST use a `client:*` directive; prefer `client:visible` or `client:idle` over `client:load`.
- Follow existing architecture and the page pattern: shared `*Page.astro`, one default-language wrapper, and one dynamic `[lang]` wrapper. Wrappers do not import `MainLayout`. Add public top-level slugs to `KNOWN_BASE_PATHS` in `src/middleware.ts`. Internal pages are English-only and dev-only; use `InternalLayout`/`ShowcaseLayout`, never link them publicly.
- Use `@` for internal imports, explicit function types where useful, and import groups in this order: Node built-ins, third-party, internal aliases, then separate type imports. Prefer no `any`.
- Use Biome only; do not use ESLint or Prettier. Run `pnpm run biome:check`; fixes are `biome:fix` and `biome:fix:unsafe`.
- Accessibility is mandatory: WCAG AA (4.5:1 normal, 3:1 large), semantic heading/landmark structure, keyboard operation, and width/height on every `<img>`. Never skip heading levels; icon-only links MUST have an `aria-label`; decorative images MUST use `alt=""`. Use disclosure patterns rather than `role="menu"`. Use approved secondary text colors `text-gray-600 dark:text-gray-300`; never use `text-gray-400`, `text-gray-500`, `dark:text-gray-400`, or `dark:text-gray-500` for secondary text.
- Optimize images with dimensions and lazy loading below the fold; reserve space for asynchronous content and use `font-display: swap`. Keep search payloads lean and language-sharded. For performance-sensitive changes run `pnpm run lighthouse` and `pnpm run lighthouse:desktop`.
- Analytics verification: do not add `PUBLIC_GOOGLE_SITE_VERIFICATION` or Google verification meta tags. Bing verification remains optional via `PUBLIC_BING_SITE_VERIFICATION`; Google Search Console verification is DNS TXT only.
- All documentation, code, and comments must be English. All user-facing text must use proper orthography and punctuation in its language. Spanish requires ñ, accents, and ¿/¡; CJK uses native punctuation. Before committing Spanish content, run both checks:

  ```bash
  grep -rn 'pequeno\|tamano\|diseno\|espanol\|manana' src/content/methodology/es/ src/content/spec/es/ src/lib/translations/es.ts
  grep -rn 'analisis\|numero\|codigo\|ejecucion\|version\|pagina\|titulo' src/content/methodology/es/ src/content/spec/es/ src/lib/translations/es.ts
  ```
- Published content must have no placeholders (`[AUTHOR:…]`, `[TODO:…]`, `[TBD]`, `[FIXME]`); content-collection slugs stay English. Do not recreate the retired blog, slides/tech-talks, or personal pages (CV, portfolio, Dailybot, foodie, hobbies, trading, entrepreneur). Kit addons each have one page at `/kit/<slug>`; do not create a second top-level product page.

### Multilingual content (mandatory)

The language registry in `src/lib/language-codes.ts` currently lists 17 locales: en, es, pt, zh, ja, de, fr, ko, ru, it, tr, id, vi, hi, pl, uk, th. A locale is active when its registered code has a translation file in `src/lib/translations/`; exclude `index.ts` and `types.ts` from locale counts. Adding a new locale also requires registry metadata and translated content; see the I18N Guide. Synchronize every content change across all active languages:

- Pages use one shared page component, one root wrapper, and one `[lang]` wrapper; never duplicate wrappers by locale.
- Methodology/spec/kit documents use the same English slug and exist in every locale folder; translate title, description, and body while preserving order, lang, and code blocks. Use `/translate-sync`.
- Add UI strings to every locale in `src/lib/translations/` and update `types.ts`; use `getTranslations(lang)` rather than hardcoded visible text.
- Keep `src/content/pages/<locale>/` agent Markdown in sync with every rendered page and translation.
- Run `pnpm run i18n:check` and `pnpm run md:check` (or strict mode) as appropriate. Meta descriptions are 130–160 characters, or 60–90 for zh/ja/ko. See [I18N](docs/I18N_GUIDE.md) and [SEO](docs/SEO.md#meta-description-standards-mandatory).

### Execution modes

| Mode | Use |
|---|---|
| Sequential | Default for dependent, same-file, or small tasks. |
| Subagents | Focused parallel subtasks; results return to the caller. |
| Team Agents | Independent parallel work with shared coordination (Claude Code only). |
| Orchestrator | Cross-repository work with a parent plan and child DWPs. |

See [Team Agents Reference](docs/technical/TEAM_AGENTS_REFERENCE.md) for the decision matrix and constraints.

### Vendored files and reviews

Do not hand-edit `.agents/skills/dailybot/` or `.agents/skills/ai-diff-reviewer/`; release automation refreshes them. Update `.agents/skills/deepworkplan/` only via an explicit reviewed, provenance-verified release/tree install, contributing upstream first. Update `.agents/skills/herdr-peers/` only with its ecosystem pin and verify `SHA256SUMS`. The local AI Diff Reviewer is required for each DWP Final Review; the CI self-review is a separate, label-gated Grok job and may skip when `XAI_API_KEY` is absent. `.review/extension.md` configures both. Per-repository gates are listed in [repositories/README.md](repositories/README.md) and [Cross-Project Standards](docs/CROSS_PROJECT_STANDARDS.md); run each inside its owning clone.

DWP standard: 8.0.0. New plans default to `plan-contract/v8`; existing plans retain their recorded generation and require an explicit migration request. Host automation capabilities default off unless runtime support is verified; telemetry also requires consent. See [AI Agent Onboarding](docs/AI_AGENT_ONBOARDING.md) and [Testing Guide](docs/TESTING_GUIDE.md#selecting-a-gate-for-a-change).

## Language and code conventions

Use this import grouping:

```ts
import { dirname, resolve } from 'node:path'; // Node built-ins
import { defineConfig } from 'astro/config'; // third-party
import Header from '@/components/layout/Header.svelte'; // project
import type { APIRoute } from 'astro'; // types, separate group
```

Prefer explicit signatures and avoid `any`. Tests use `*.test.ts` under `tests/unit/`; Vitest coverage target for `src/lib/` is 80%+. See [STANDARDS](docs/STANDARDS.md) and [TESTING_GUIDE](docs/TESTING_GUIDE.md).

## Commands and validation

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run biome:check
pnpm run test
pnpm run astro:check
pnpm run i18n:check
pnpm run build
pnpm run md:check:strict
bash scripts/check-public-hygiene.sh
```

The site gate also includes `bash tests/scripts/repositories.test.sh` when repository sync/manifest behavior changes. `pnpm run build` includes Astro checking, static build, and rendered emphasis and anchor-resolution checks. Select additional gates from [Development Commands](docs/DEVELOPMENT_COMMANDS.md) and [Testing Guide](docs/TESTING_GUIDE.md); Lighthouse mobile/desktop applies to performance changes. `pnpm run test:watch` is watch mode; `pnpm run test:coverage` writes coverage. `pnpm run md:content-check` writes a report; in a plan, set its output under that plan's `analysis_results/`.

Run the pre-commit checks that cover the change: tests, Biome, Astro check, build, i18n and Markdown parity as relevant; dark mode, accessibility, translation coverage, placeholder checks, description lengths, and public hygiene apply where relevant. Commit messages are English conventional commits: `<type>: <description>`; types include `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, and `ci`.

## Skills, agents, and command invocations

`.agents/` is canonical; `.claude` and `.cursor` are compatibility symlinks. Write and edit the real `.agents/` paths, never through symlinks. Do not add content under `.claude/` or `.cursor/`. The skills and agent catalogs and command reference are under `.agents/docs/`.

For a slash/hash command invocation, first find it in [.agents/docs/COMMANDS_REFERENCE.md](.agents/docs/COMMANDS_REFERENCE.md), read its linked procedure file completely, and follow it; the procedure is the spec. `/skill-list`, `/agent-list`, `/skill-create`, and `/agent-create` manage the kit. Use available skills when their procedure applies. Available agent definitions include reviewer, executor, architect, security-auditor, and i18n-guardian. Structured DWP work uses the installed DeepWorkPlan skill and sub-skills. See [AI Agent Collaboration](docs/AI_AGENT_COLLAB.md).
