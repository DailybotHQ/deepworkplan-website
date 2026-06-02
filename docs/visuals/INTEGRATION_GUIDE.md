# Integration Guide — wiring the visuals into the site

> **Scope.** This guide is for the **follow-up** work that places the generated
> assets into the site. The prompt-pack plan deliberately changed **no** site
> code — everything here is instructions for a future change (ideally its own
> Deep Work Plan, e.g. `PLAN_site_visual_integration`).

## 0. Prerequisites

- The image assets have been generated from `prompts/*.md` and saved under
  `public/images/visuals/{area}/` using each entry's **Suggested asset path**.
- For text-bearing diagrams you have an EN asset (`{slug}.webp`) and an ES asset
  (`{slug}-es.webp`). For light+dark pairs you have `{slug}.webp` and
  `{slug}-dark.webp`.

## 1. Where assets live + the WebP pipeline

- Put source assets under `public/images/visuals/{area}/` (`area` ∈
  `home` · `methodology` · `spec` · `kit`).
- The project already optimizes raster images to WebP. Run
  `pnpm run images:optimize` for staged images; `PageHero.astro` demonstrates the
  `<picture>` + WebP-source fallback pattern. Reuse that pattern for any raster
  placed in a page.
- Always set explicit `width`/`height` (from each entry) to avoid layout shift.

## 2. Content diagrams → `Figure.astro`

For diagrams inside methodology / spec / kit documents, use the existing
editorial primitive `src/components/editorial/Figure.astro` (semantic `<figure>`
+ dark-mode-aware `<figcaption>`):

```astro
---
import Figure from '@/components/editorial/Figure.astro';
import { Image } from 'astro:assets';
---
<Figure caption={t.someDoc.figureCaption}>
  <img
    src="/images/visuals/methodology/core-loop.webp"
    width="640" height="640"
    alt={t.someDoc.figureAlt}
  />
</Figure>
```

- The **caption** and **alt** must come from translations (never hardcode) — see
  §4. Each prompt entry drafts the EN + ES caption and alt to copy in.
- For markdown content collections, expose the diagram via the content's
  rendering component (the methodology/spec/kit readers), or add an MDX `<Figure>`
  if the collection supports MDX. Keep the matching agent-facing `.md` endpoint in
  `src/content/pages/{en,es}/` in sync (`pnpm run md:check`).

## 3. The Hero right column (HP-01)

`src/components/home/Hero.astro` currently constrains content to `max-w-3xl` on
the left, leaving the right side empty on `lg`. To place HP-01:

1. Wrap the existing left content and a new right column in a responsive grid
   (e.g. `lg:grid lg:grid-cols-[minmax(0,3xl)_1fr] lg:items-center`), keeping the
   single-column stack on small screens.
2. In the right column, render the illustration with a `<picture>` that swaps the
   light/dark pair by color scheme (mirror how the brand logos swap):

```astro
<picture>
  <source srcset="/images/visuals/home/hero-harness-dark.webp" media="(prefers-color-scheme: dark)" />
  <img src="/images/visuals/home/hero-harness.webp" width="520" height="650"
       alt={t.home.hero.illustrationAlt} class="hidden lg:block" />
</picture>
```

   (If the site toggles theme via a class rather than `prefers-color-scheme`,
   swap with the same mechanism the logos already use instead of the `media`
   query.)
3. HP-01 has no in-image text, so a single pair serves EN and ES.

## 4. Bilingual alt text & captions

- Add the EN strings to `src/lib/translations/en.ts` and the ES strings to
  `src/lib/translations/es.ts` (and any new keys to `types.ts`). Each prompt entry
  provides draft EN + ES alt and caption text.
- **Text-bearing diagrams** need the ES-labeled asset variant (`{slug}-es.webp`)
  on the `/es/` pages — switch the `src` by `lang`. Atmospheric illustrations
  with no text (e.g. HP-01) use one asset for both languages.

## 5. Dark mode

- **Transparent line-art diagrams:** if the ink color doesn't read on the dark
  ground, apply a CSS filter/inversion in dark mode, or generate a dark variant.
  Note the chosen approach on the component.
- **Light+dark pairs:** swap assets by color scheme (see §3).
- Never rely on the oxblood accent alone to carry meaning (WCAG / color-blind).

## 6. Accessibility checklist (per asset)

- [ ] Explicit `width`/`height` set (values from the entry).
- [ ] Meaningful `alt` for informative visuals; `alt=""` for decorative marks
      (HP-02, HP-06, HP-07, HP-08, HP-09 are decorative).
- [ ] EN alt in `en.ts`, ES alt in `es.ts`.
- [ ] Contrast holds on both paper and ink grounds.
- [ ] Caption (if used) is bilingual and not redundant with surrounding prose.

## 7. Per-area integration checklist

- [ ] **Homepage** — HP-01 hero grid + `<picture>` swap; HP-03/04/05 diagrams as
      `Figure`s in their sections; HP-02/06/07/08/09 decorative marks (`alt=""`);
      Comparison/Origin: no asset (skip).
- [ ] **Methodology** — ME-01…ME-06 as `Figure`s in the methodology reader at the
      noted section anchors; EN/ES asset per page language.
- [ ] **Spec** — SP-01 + SP-04 new figures; SP-02/03/05 reuse the methodology
      assets (or generate the quieter spec variants if desired).
- [ ] **Kit** — KT-01/02/03 + KT-10 as `Figure`s; KT-04…KT-09 command sequences at
      the top of each `dwp-*` doc, generated as one consistent family.
- [ ] Run `pnpm run md:check`, `pnpm run astro:check`, `pnpm run build`, and a
      Lighthouse pass after integration.

## 8. Suggested follow-up plan

Create `PLAN_site_visual_integration` once assets exist: one task per area
(homepage, methodology, spec, kit), a translations task (alt/captions into
`en.ts`/`es.ts`), and a final QA/Lighthouse task. Each task wires the assets,
sets dimensions, adds bilingual alt/captions, and keeps the agent-facing `.md`
endpoints in sync.
