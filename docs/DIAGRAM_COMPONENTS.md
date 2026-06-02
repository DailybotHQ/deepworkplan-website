# Editorial Interactive Asset Standard (Diagram Components)

> The standard for building deepworkplan.com **diagrams as HTML/CSS components**
> (not images), in the "Broadsheet" newspaper aesthetic, with text in the codebase
> so translation to many languages is nearly free. Read this before creating or
> modifying any diagram component.
>
> **Inspired by** the Dailybot Interactive Asset System
> (`/app/tmp/dailybot.com/docs/INTERACTIVE_ASSETS.md`,
> `INTERACTIVE_ASSETS_AI_PROMPT.md`, and `src/components/interactive-assets/*`).
> This document adapts that proven pattern to this repo's editorial design system.

---

## 0. Feasibility verdict

**Viable and recommended.** Dailybot already ships screenshot-quality visuals
built purely in HTML/CSS with inline, language-keyed i18n, `role="img"` +
`aria-label`, dark mode, responsive `aspect-ratio`, and reduced-motion handling —
exactly the model the user wants. Assessment per diagram class:

| Diagram class | Examples | HTML/CSS fit | Notes |
| :-- | :-- | :-- | :-- |
| Flow / sequence | HP-03/04, KT-03, KT-04…09 | ✅ excellent | boxes + arrows + labels |
| Loop / cycle | ME-02, SP-03 | ✅ excellent | radial layout, CSS positioning |
| Tree / hierarchy | ME-04, SP-04 | ✅ excellent | nested lists + hairline rules |
| Comparison / two-panel | HP-05, KT-01, KT-02 | ✅ excellent | grid split; optional toggle |
| Architecture / containment | ME-01 | ✅ good | nested boxes; keep it simple |
| Lifecycle / state | SP-01 | ✅ good | linear states + return arrow |
| Distinction + annotation | ME-05, ME-06, KT-10 | ✅ good | two-column / decision branch |

No diagram class requires raster. **Illustrations** (the faro hero HP-01 and
decorative marks HP-02/06/07/08/09) stay AI-generated images — line art and
atmosphere are not a good HTML/CSS fit, and the team generates those with an image
agent. See `docs/visuals/` for those prompts.

---

## 1. Core rules (mandatory)

1. **One component per use case — do not reuse as a "mode".** Each diagram is a
   distinct component used in exactly one place (like a single image). Never add a
   `variant`/`mode` prop to make one component serve two sections. Shared *layout*
   helpers are fine (see the kit command family); shared *assets* are not.
2. **Looks like a printed figure, not a UI.** Editorial engraving feel: ink on
   paper, hairline rules, serif small-caps labels, restrained oxblood accent,
   optional subtle grain. No flat-vector "app screenshot" look.
3. **Static-first.** Presentational diagrams are `.astro` (zero JS). Use `.svelte`
   + `client:visible` **only** when a genuinely low-cognitive interaction adds value
   (hover emphasis, a two-state toggle on a comparison). Never `client:load`.
4. **Localized, in the codebase.** No hardcoded copy (including `aria-label`). Text
   comes from an inline language-keyed i18n map + a `lang` prop, with `en` fallback.
5. **Accessible & stable.** `role="img"` + a localized, meaningful `aria-label`;
   explicit `aspect-ratio` (and/or width/height) so there is no CLS; respect
   `prefers-reduced-motion`; WCAG AA tokens only.
6. **Performance.** CSS-first motion; no heavy deps; static where possible.

---

## 2. Visual style — Broadsheet (mandatory)

Build only from the design tokens in `src/styles/global.css`:

| Role | Light | Dark |
| :-- | :-- | :-- |
| Paper / ground | `--color-paper` `#F7F4EC` | `#14140F` |
| Ink / line + label | `--color-ink` `#1B1A17` | `#ECE7DA` |
| Oxblood accent (one/two marks) | `--color-secondary` `#7A1F1F` | `#C2554D` |
| Hairline rules / frame | `--color-line` `#D9D3C5` | `#2A2820` |
| Muted secondary label | `--color-muted` `#57534B` | `#A8A296` |

- **Frame:** a thin hairline (`--color-line`) plate border or rule; generous
  internal margins. Optional faint dot-grid or paper grain behind content (subtle,
  low-contrast) — analogous to Dailybot's `.interactive-asset-grid`.
- **Labels:** serif (`font-display`) or small-caps kicker styling; tabular numerals.
- **Accent discipline:** oxblood on at most one or two marks (an arrowhead, a key
  node, a "verify"/"output" highlight). Everything else is ink on paper.
- **Nodes/boxes:** outline (hairline) panels, no heavy fills; rounded only slightly
  (editorial, not "app"). Arrows are thin ink strokes with clear arrowheads.
- **Shared CSS:** a `.editorial-asset-*` layer in `global.css` provides the frame,
  optional grid, node, arrow, badge, and label primitives so all diagrams cohere.
  (Built in Task 2.)

> Reference once Task 2 lands: `src/components/diagrams/methodology/CoreLoop.*` is
> the canonical implementation. Match it.

---

## 3. Component conventions

- **Home:** `src/components/diagrams/{methodology,spec,kit,home}/`.
- **Naming:** descriptive PascalCase by concept (`CoreLoop`, `RepoAsHarness`,
  `TaskAnatomy`, `PlanTree`, `SkillsAgents`, `ArchetypesTree`, `AgentLifecycle`,
  `OutputWorkspace`, `CmdCreate`…`CmdStatus`, `MigrationBeforeAfter`,
  `UnguidedVsDwp`, `OnboardFlow`, `KitComposition`, `QuickstartFlow`,
  `OnboardingSequence`, `ArchetypesCompare`).
- **Props:** `interface Props { lang?: Language; class?: string }` (default
  `lang = 'en'`).
- **Root element:** `role="img"`, `aria-label={t.ariaLabel}`, explicit
  `aspect-ratio` (and `min-height` where helpful). Wrap in
  `src/components/editorial/Figure.astro` when a caption is wanted.
- **Spec source:** the nodes, arrows, and EN/ES labels already exist in
  `docs/visuals/prompts/*.md` (from `PLAN_site_visual_prompt_pack`) — use the
  matching entry as the blueprint and the i18n seed.

---

## 4. i18n convention (the multi-language payoff)

Use an **inline i18n map keyed by language code**, with an `en` fallback. Demo/label
text is tightly coupled to the diagram, so keep it in the component (not the central
`translations.ts`) — the same choice Dailybot made for its assets.

```astro
---
// CoreLoop.astro
import type { Language } from '@/lib/i18n';
interface Props { lang?: Language; class?: string }
const { lang = 'en', class: className = '' } = Astro.props;

const i18n = {
  en: { ariaLabel: 'DWP core loop …', create: 'Create', execute: 'Execute', /* … */ },
  es: { ariaLabel: 'Bucle principal de DWP …', create: 'Crear', execute: 'Ejecutar', /* … */ },
  // pt: { … }  ← adding a language = adding a key
} as const;

const t = i18n[lang as keyof typeof i18n] ?? i18n.en;   // en fallback — never blank
---
```

Rules:
1. **Every component accepts `lang`** (default `'en'`) and indexes the map by it.
2. **`en` fallback is mandatory** — an unsupported `lang` degrades to English, never
   renders blank.
3. **No hardcoded user-visible text**, including `aria-label`.
4. **Brand/technical terms stay English:** DWP, AGENTS.md, `.agents/`, `.dwp/`, API,
   PR, commit, deploy, slug.
5. **ES strings carry correct diacritics** (á é í ó ú ñ ¿ ¡); never copy EN into ES.
6. **Parent passes `lang`** to every diagram (readers/pages already have it).

### Adding a language (the "almost free" translation)

1. Add the new language code to the site's `Language` type / routing when the site
   adopts that locale (separate, site-wide effort).
2. For each diagram component, **add one key** to its `i18n` map with translated
   strings (this can be done by `/translate-sync`, the `i18n-guardian` agent, or an
   automated pass — the EN keys are the source).
3. No new image assets, no per-language exports. The diagram renders in the new
   language wherever `lang` is that code.

> This is the core advantage over per-language image generation: diagram
> translation is a text change in the codebase, reviewable in a normal diff.

**Live proof.** `CoreLoop.astro` ships a third language key (`pt`, Português)
alongside `en`/`es` as a concrete demonstration: the diagram is already fully
translated to Portuguese — the only remaining step to show it is enabling `pt` as
a site locale (a separate, site-wide routing change). Adding the other ~10
languages to every diagram is the same one-key-per-component edit, ideal for
`/translate-sync` or an automated pass seeded from the EN keys.

---

## 5. Embedding mechanism

Methodology/spec/kit docs are Markdown rendered by reader components via
`render(entry)` → `<Content />` (see `MethodologyReader.astro`). Two ways to place a
diagram at the right spot:

- **Option A — MDX import (recommended, faithful inline placement).** Convert the
  specific doc to `.mdx`, widen the collection glob to `**/*.{md,mdx}`, import the
  component in the doc, and render the reader's `<Content lang={lang} />` so `lang`
  is in scope inside the MDX (`<CoreLoop lang={lang} />`). Pro: diagram sits exactly
  where it belongs in the prose. Con: touches the collection loader + that doc's
  extension.
- **Option B — reader slug→component map (no MDX).** The reader maps `entry` slug →
  diagram component and renders it above/below `<Content />` (or at a sentinel).
  Pro: no content-file changes. Con: placement is section-level, not arbitrary
  inline.

**Decision (final): Option A — MDX, in-body at the narrative anchor.** Diagrams
must sit *where the reader meets the concept*, after the title and a short lead —
never before the title. So each methodology/spec/kit document is authored as
**`.mdx`**: it imports its diagram component(s) and places them at the right point
in the prose. Because `en/` and `es/` are separate files, each hardcodes its own
language (`<CoreLoop lang="en" />` in the EN file, `lang="es"` in the ES file) — no
prop-propagation needed, and translation is still one map key per language. Wrap
each embed with `class="not-prose my-10"` so the figure is isolated from prose
typography. Collections glob `**/*.{md,mdx}`; the readers render `<Content />`
unchanged (no slug→component injection — that earlier lead-figure approach was
dropped because it rendered the diagram before the document title). Placement
guide: **overview** diagrams go right after the lead; **section figures** go at
the heading of the section that explains them. Homepage diagrams (HP-03/04/05) are
placed directly in the `.astro` home sections (after each section's title +
subtitle), which already receive `lang`.

---

## 6. Accessibility & performance checklist (per component)

- [ ] `role="img"` + localized, meaningful `aria-label`.
- [ ] Explicit `aspect-ratio` / dimensions — no CLS.
- [ ] `prefers-reduced-motion`: disable/soften non-essential motion.
- [ ] WCAG AA: never `text-gray-400`/`-500` (or dark variants) for text; token colors.
- [ ] Static `.astro` (no JS) unless interaction justifies `.svelte` + `client:visible`.
- [ ] Renders correctly in `en`, `es`, and dark mode.
- [ ] Reads as a printed figure (review against the reference).

---

## 7. Component catalog (the 24 diagrams)

Status: `todo` → `built`. Spec column → entry in `docs/visuals/prompts/`.

| ID | Component | Area dir | Spec | Status |
| :-- | :-- | :-- | :-- | :-- |
| ME-02 | `CoreLoop` (reference) | methodology | 02-methodology#me-02 | **built** |
| ME-01 | `RepoAsHarness` | methodology | 02-methodology#me-01 | built |
| ME-03 | `TaskAnatomy` | methodology | 02-methodology#me-03 | built |
| ME-04 | `PlanTree` | methodology | 02-methodology#me-04 | built |
| ME-05 | `SkillsAgents` | methodology | 02-methodology#me-05 | built |
| ME-06 | `ArchetypesTree` | methodology | 02-methodology#me-06 | built |
| SP-01 | `AgentLifecycle` | spec | 03-spec#sp-01 | built |
| SP-04 | `OutputWorkspace` | spec | 03-spec#sp-04 | built |
| SP-02 | reuse `TaskAnatomy` | spec | 03-spec#sp-02 | built |
| SP-03 | reuse `CoreLoop` | spec | 03-spec#sp-03 | built |
| SP-05 | reuse `ArchetypesTree` | spec | 03-spec#sp-05 | built |
| KT-01 | `MigrationBeforeAfter` | kit | 04-kit#kt-01 | built |
| KT-02 | `UnguidedVsDwp` | kit | 04-kit#kt-02 | built |
| KT-03 | `OnboardFlow` | kit | 04-kit#kt-03 | built |
| KT-04 | `CmdCreate` | kit | 04-kit#kt-04 | built |
| KT-05 | `CmdExecute` | kit | 04-kit#kt-05 | built |
| KT-06 | `CmdRefine` | kit | 04-kit#kt-06 | built |
| KT-07 | `CmdResume` | kit | 04-kit#kt-07 | built |
| KT-08 | `CmdVerify` | kit | 04-kit#kt-08 | built |
| KT-09 | `CmdStatus` | kit | 04-kit#kt-09 | built |
| KT-10 | `KitComposition` | kit | 04-kit#kt-10 | built |
| HP-03 | `QuickstartFlow` | home | 01-homepage#hp-03 | built |
| HP-04 | `OnboardingSequence` | home | 01-homepage#hp-04 | built |
| HP-05 | `ArchetypesCompare` | home | 01-homepage#hp-05 | built |

**Illustrations kept as images (not in this system):** HP-01 (faro hero), HP-02,
HP-06, HP-07, HP-08, HP-09 — see `docs/visuals/`.
