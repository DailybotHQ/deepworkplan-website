# Prompt Pack — Standalone Page Visuals

> **Inherits:** [STYLE_GUIDE.md](../STYLE_GUIDE.md) — house style block (§1),
> palette (§2), light/dark strategy (§3), typography (§4), dimensions (§5), asset
> paths (§6), bilingual EN/ES policy (§7), accessibility (§8), negative
> boilerplate (§9), and the prompt entry schema (§10). Every entry below is
> schema-complete; each **Prompt** field is copy-paste-ready.
>
> **Slots covered:** PG-01 (404 / Not Found illustration).
>
> **Area:** `pages` — a new asset area for standalone routes that are not part of
> `home` / `methodology` / `spec` / `kit` (extends STYLE_GUIDE §6). Assets live
> under `public/images/visuals/pages/`.

> **🔤 ILLUSTRATIONS ARE WORDLESS.** Generated illustrations must contain **ZERO
> text** (no words, letters, numbers, or labels) — a single asset is reused for
> **every language**. PG-01 is wordless, so one light/dark pair serves EN and ES.

> **⚠️ UNIVERSAL EDGES & FRAMING RULE.** No image may have a **border, frame,
> rectangle, box, or outline**, and **nothing may touch or be cut off by the
> edges**. The artwork sits centered with generous margin and its detail
> **fades / feathers softly into the exact page background** on all sides. For the
> filled pair: **light → exactly `#F7F4EC`**, **dark → exactly `#14140F`** (corners
> must equal the hex — a wrong fill leaves a visible rectangle/halo).

### PG-01 — 404 / Not Found illustration (sailed off the chart)

- **Target surface:** `src/components/pages/NotFoundPage.astro` → the right column. The page constrains the `404` block and copy to `max-w-2xl` on the left; integration exposes a right column on `lg` to hold this illustration (two-column pattern like the Hero faro). The 404 copy is short, so the asset is a **wide landscape** band rather than a tall portrait — it sits beside the short text without towering over it.
- **Type:** illustration
- **Priority:** medium
- **Purpose / trust rationale:** Completes the maritime engraving trilogy — the **lighthouse** (HP-01) guides, the **nautical chart** (HP-02) plots the course to safe harbor, and the **404** is where that course runs *off the edge of the charted world*. A single confident oxblood route leaves the last inked coastline and ends in a lone cross stranded on blank parchment — wordlessly saying "this page is not on the map" while staying calm and editorial rather than playful or alarming. Visually rhymes with HP-02 so the error page still feels like part of the same serious standard.
- **Aspect & dimensions:** 3:2 landscape · 720 × 480 px displayed · generate @2x (1440 × 960 px). (4:3 is an acceptable fallback aspect; **never a tall portrait** — see rationale above.)
- **Light/dark strategy:** light+dark pair (filled paper ground that blends with the page) — `not-found-offmap.webp` (warm ink on `#F7F4EC`) and `not-found-offmap-dark.webp` (paper-ink `#ECE7DA` on `#14140F`). Same approach as the Hero faro and the Pitch chart.
- **Prompt:**
  > **HOUSE STYLE —** Fine ink-line engraving / etched hairlines, in the manner of a 19th-century nautical chart or scientific broadsheet — the SAME engraving style and family as the site's lighthouse and nautical-chart illustrations. **LIGHT version:** warm sepia-ink line work (`#1B1A17`) on warm off-white paper (`#F7F4EC`). **(For the dark version: paper-colored ink lines `#ECE7DA` on a warm near-black ground `#14140F`, oxblood accent `#C2554D`.)** A single restrained **oxblood** (`#7A1F1F`) accent — used ONLY for the plotted course line, its waypoint crosses and the final lone cross. Calm, authoritative, editorial, detailed line engraving with subtle paper grain. No gradients, no glossy 3D, no photographic realism, no extra colors.
  >
  > **FORMAT —** WIDE LANDSCAPE, 3:2 horizontal (NOT a tall portrait). The artwork must read as a short, wide banner that sits comfortably beside a short block of text.
  >
  > **EDGES / BACKGROUND (critical — generate TWO images):** There is **NO border, NO frame, NO rectangle, NO outline** around the artwork. Fill the **entire** canvas (every pixel, all four corners and margins) with the EXACT page color — **LIGHT version: exactly `#F7F4EC`** (warm off-white paper, NOT pure white `#FFFFFF`, not grey, not beige); **DARK version: exactly `#14140F`** (warm near-black, NOT pure black `#000000`, not blue-black). The illustration's detail **fades / feathers / vignettes softly into that exact background** on all four sides, dissolving seamlessly into the page with no visible boundary or halo. Keep ALL elements comfortably inside with generous margin — **nothing touches or is cut off by any edge**. The corners must equal the exact background hex.
  >
  > **Subject:** An antique engraved **nautical sea chart** at the edge of the known world, wide 3:2 landscape, with soft faded edges (no border). The **charted world sits on the RIGHT** of the frame: an ornate engraved **compass rose** (wind rose) in the upper-right, and a detailed inked **coastline** — hachures, depth-sounding dots, a couple of tiny stippled islands — massed on the right third/half. From the charted coast, a single confident **plotted course** — a clean dashed line in **oxblood** marked with small waypoint crosses — runs **LEFTWARD** across the chart, **crosses BEYOND the last coastline**, and trails into a WIDE expanse of **EMPTY warm parchment that fills the LEFT half** of the image. The course ends in a **single LONE oxblood cross, stranded by itself** in that blank void on the left, with a clear visible **GAP** between the last coastline and this final cross (it must obviously read as "the route ran off the map and ends nowhere"). A small finely engraved **sea-serpent** coils in the empty parchment near the lone cross, its body fading into the bare paper. The latitude/longitude hairline grid and rhumb lines **dissolve to nothing toward the left**. Generous blank parchment on the LEFT so the stranded cross has air around it. The oxblood course is the only chroma and the clear focal point. **No readable words, numbers, or letters anywhere** — only decorative engraved marks.
  >
  > **AVOID —** a tall / portrait / vertical composition, the landmass on the left, any border / frame / rectangle / box / outline around the image, elements touching or clipped by the edges, hard straight edges, gradients (other than the soft edge-fade into the background), glossy/3D render, photographic realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds, watermark, signature, extra logos, any readable text / numbers / letters / labels, lorem ipsum, modern flat-vector "corporate memphis" style, clip-art, emoji.
- **In-image text (EN):** none (wordless)
- **In-image text (ES):** none
- **Suggested asset path:** `public/images/visuals/pages/not-found-offmap.webp` (light) · `public/images/visuals/pages/not-found-offmap-dark.webp` (dark)
- **Alt text (EN):** A wide nautical chart with the charted coast on the right; a single plotted course trails left off the last coastline and ends in a lone cross stranded over blank parchment, a sea-serpent coiling nearby — an engraving evoking a page that lies off the map.
- **Alt text (ES):** Una carta náutica apaisada con la costa cartografiada a la derecha; un único rumbo trazado se aleja hacia la izquierda saliéndose de la última costa y termina en una cruz solitaria varada sobre el pergamino en blanco, con una serpiente marina enroscada cerca — un grabado que evoca una página que queda fuera del mapa.
- **Caption (EN):** — (standalone illustration, no caption)
- **Caption (ES):** —
- **Integration note:** Two-column grid on `lg` (the existing `404` + heading + copy `max-w-2xl` on the left, illustration on the right), stacking on mobile and vertically centered (`lg:items-center`). Because the asset is now **landscape**, give the right column more width than the portrait version used — e.g. `lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]` — so the wide band reads at a comfortable height; alternatively drop it full-width **below** the action buttons as a wide `Figure`. Dual-`<img>` light/dark swap (`dark:hidden` / `hidden dark:block`, same mechanism as the Hero faro and the brand logos). One pair serves EN and ES (no in-image text). `width="720" height="480"`, `loading="lazy"`, `decoding="async"`. Decorative option: since the page copy already conveys the "not found" meaning, `alt=""` is acceptable instead of the alt above; use the meaningful alt if the illustration is the only "lost" signal.

---

## Coverage (standalone pages)

| ID | Kind | Status |
| :-- | :-- | :-- |
| PG-01 | illustration (image) | done — 404 off-map chart |
