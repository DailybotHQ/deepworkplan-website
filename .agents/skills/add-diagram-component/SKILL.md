---
name: add-diagram-component
description: Create an editorial HTML/CSS/SVG diagram component (Editorial Interactive Asset) and embed it in-body via MDX. Use proactively when adding a diagram/figure to a methodology, spec, or kit page instead of a raster image.
# === Universal (Claude Code + Cursor + Codex) ===
disable-model-invocation: false
# === Claude Code specific ===
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
model: sonnet
# === Documentation (ignored by tools, useful for humans) ===
tier: 2
intent: create
max-files: 6
max-loc: 250
---

# add-diagram-component

Create a **diagram as a component** (not an image) in the "Broadsheet" editorial
style, with text in the codebase so translation to more languages is nearly free,
then embed it **in-body via MDX** at the right point in the narrative.

> **Read first (mandatory):** [`docs/DIAGRAM_COMPONENTS.md`](../../../docs/DIAGRAM_COMPONENTS.md)
> — the full standard (rules, visual style, i18n convention, a11y, embedding,
> catalog). The reference implementation is
> `src/components/diagrams/methodology/CoreLoop.astro`. Match it.

## When to use

- A page would benefit from a **flow, sequence, loop, tree, comparison, lifecycle,
  or architecture** figure. Build it as a component.
- **Do NOT** use this for hero illustrations / atmospheric or line-art images — those
  stay AI-generated rasters (see `docs/visuals/`).

## Procedure

1. **Pick the technique** (best tool per diagram): inline **SVG** for geometric
   diagrams (loops, arrows, radial); **HTML/CSS** grid/flex for panels, trees,
   comparisons, sequences.
2. **Create the component** under `src/components/diagrams/{methodology,spec,kit,home}/`
   as `.astro` (zero JS). Only use `.svelte` + `client:visible` if a genuine
   low-cognitive interaction (hover/toggle) adds value.
   - `interface Props { lang?: Language; class?: string }`, default `lang = 'en'`.
   - **Inline i18n map keyed by language code with an `en` fallback:**
     `const t = i18n[lang as keyof typeof i18n] ?? i18n.en;`
   - No hardcoded copy (including `aria-label`). Brand/technical terms stay English.
     ES strings need correct diacritics.
   - Root `<figure class="editorial-asset …" role="img" aria-label={t.ariaLabel}>`
     with `.editorial-asset__grid` + `.editorial-asset__body`; optional
     `<figcaption class="fig-caption">`. Use only `--color-*` tokens (dark mode
     follows automatically; SVG uses `fill/stroke: currentColor`). Explicit
     `aspect-ratio` (no CLS). Decorative inner labels are `<p>`/`<span>`, **never**
     headings (the figure is `role="img"`).
3. **Embed in-body via MDX:** ensure the target doc is `.mdx` (collections glob
   `**/*.{md,mdx}`). Import the component and place it at the narrative anchor —
   **after the title and a short lead** (overview), or at the heading of the section
   that explains it (section figure). Because `en/`/`es/` are separate files,
   hardcode the language per file: `<X lang="en" class="not-prose my-10" />` (and
   `lang="es"` in the ES file). Wrap with `not-prose` so prose styles don't bleed in.
   Keep the agent `.md` endpoint in sync (`pnpm run md:check`).
4. **Validate:** `pnpm run biome:check`, `pnpm run astro:check`, `pnpm run build`;
   confirm it renders in `en`, `es`, and dark mode, reads like a printed figure, and
   the **title appears before the diagram**.

## Adding a language later

Add one key to each component's `i18n` map (seeded from the EN keys) — no new image
assets. Suitable for `/translate-sync` or the `i18n-guardian` agent.

## Guardrails

- One component per use case — no `mode`/`variant` props (shared *layout* helpers
  are fine, e.g. the kit command family's `CommandSequence`).
- Never place a diagram before the document title.
- WCAG AA tokens only; never `text-gray-400/500`.
