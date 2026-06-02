# Diagram Components (Editorial Interactive Assets)

HTML/CSS/SVG diagram components for deepworkplan.com — diagrams as code, not
images, with text in the codebase so translation to more languages is nearly free.

**Read [`docs/DIAGRAM_COMPONENTS.md`](../../../docs/DIAGRAM_COMPONENTS.md) before
creating or modifying a component.** It is the standard (visual style, i18n
convention, accessibility, embedding mechanism, catalog).

## Conventions (summary)

- One component per use case (no `mode`/`variant` props).
- Inline i18n map keyed by language code + `lang` prop, with an `en` fallback.
  No hardcoded copy (including `aria-label`). Brand/technical terms stay English.
- `role="img"` + a localized, meaningful `aria-label`; explicit `aspect-ratio`
  (no CLS); `prefers-reduced-motion`; WCAG AA tokens only.
- Static `.astro` (zero JS) unless a low-cognitive interaction warrants `.svelte`
  + `client:visible`.
- Broadsheet style via the `.editorial-asset-*` primitives in
  `src/styles/global.css` and the `--color-*` tokens. SVG text uses
  `fill: currentColor` so dark mode follows automatically.

## Layout

- `methodology/` · `spec/` · `kit/` · `home/`
- `methodology/CoreLoop.astro` is the **reference implementation** — match it.

## Embedding

Methodology/spec/kit readers map a doc slug → its diagram component(s) and render
them (passing `lang`). Homepage diagrams are placed directly in the `.astro` home
sections. See `docs/DIAGRAM_COMPONENTS.md` §5.
