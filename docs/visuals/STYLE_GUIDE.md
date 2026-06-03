# Visual Style Guide — Deep Work Plan

> **Purpose.** This is the canonical house style for every illustration and
> diagram on deepworkplan.com, plus the **prompt schema** that every entry in
> `prompts/*.md` must follow. Read this before writing or generating any visual.
> The style anchor is `public/images/og-default.png` (the lighthouse engraving).

---

## 1. The House Style Block (paste into every prompt)

Every image prompt **must** carry this style block (verbatim, or by explicit
reference). It is what makes the whole pack look like one coherent set and keeps
it in family with the existing lighthouse OG image.

> **HOUSE STYLE —** Fine ink-line engraving / etched cross-hatching, in the
> manner of a 19th-century scientific broadsheet or banknote vignette. Monochrome
> warm ink (`#1B1A17`) drawn on warm off-white newsprint paper (`#F7F4EC`), with a
> single restrained **oxblood** accent (`#7A1F1F`) used only for one or two small
> emphasis marks (a hairline rule, an arrowhead, a key node) — never as a fill.
> Calm, authoritative, editorial. Subtle paper grain. Clean generous margins.
> Flat 2D (no perspective tricks), no gradients, no glossy 3D render, no
> photographic realism, no neon, no drop shadows, no busy background. Sharp,
> legible, print-quality line work.

When a visual needs a **dark-mode** counterpart, invert: warm paper-colored ink
(`#ECE7DA`) on the dark warm-ink ground (`#14140F`), oxblood accent `#C2554D`.

---

## 2. Palette (exact tokens — from `src/styles/global.css`)

| Token | Light | Dark | Use in art |
| :-- | :-- | :-- | :-- |
| Paper (background) | `#F7F4EC` | `#14140F` | Ground / page |
| Ink (line + text) | `#1B1A17` | `#ECE7DA` | All line work, labels |
| Oxblood (accent) | `#7A1F1F` | `#C2554D` | One/two emphasis marks only |
| Hairline (rules) | `#D9D3C5` | `#2A2820` | Faint framing rules, grids |
| Muted (secondary) | `#57534B` | `#A8A296` | Secondary labels, captions |
| Raised surface | `#EFEADD` | `#232118` | Subtle panel fills if needed |

**Accent discipline:** oxblood is the only chroma. One or two marks per image,
maximum. Everything else is ink on paper.

---

## 3. Light / Dark Strategy (decide per visual)

The site ships **light and dark mode**. A single raster can't recolor itself, so
every prompt must pick one:

- **(A) Transparent background (preferred for line-art diagrams).** Generate the
  art as ink line work on a **transparent** canvas (export PNG/WebP with alpha).
  The same asset then sits on paper (light) or ink (dark). Use ink color
  `#1B1A17` **only if** the integrator will CSS-filter/invert for dark mode;
  otherwise prefer a near-neutral dark line that reads on both — and note it.
  Simplest when the line work is the whole image and there's no filled ground.
- **(B) Matched light + dark pair.** When the visual needs a filled paper ground,
  texture, or tonal shading, generate **two** assets — a light version (ink on
  `#F7F4EC`) and a dark version (paper-ink on `#14140F`) — saved as
  `{slug}.webp` and `{slug}-dark.webp`. The site swaps them by color scheme
  (same mechanism the brand logos use).

State the chosen strategy in the entry's **Light/dark** field. Default to (A) for
diagrams, (B) for atmospheric illustrations (like the hero).

### Edges & framing (MANDATORY — applies to every illustration)

No illustration may have a **border, frame, rectangle, box, or outline** around it,
and **nothing may touch or be cut off by the edges**. The artwork is centered with
generous margin and its detail **fades / feathers softly into the background** on
all sides, so it blends seamlessly into the page with no visible boundary:

- **Filled illustrations (strategy B):** the background is a solid, even fill of the
  exact page color (light `#F7F4EC` / dark `#14140F`) and the art vignettes into
  that same color at the edges.
- **Transparent assets (strategy A):** a true transparent background with soft (not
  hard-cropped) edges, centered with margin.

Every prompt MUST state this in an **EDGES / BACKGROUND** line and reinforce it in
the **AVOID** list (`any border / frame / rectangle / box / outline; elements
touching or clipped by the edges; hard straight edges`). This is why the hero faro
blends in — its ground matches the page and it has no frame.

---

## 4. Typography Inside Images

- Labels read as an **editorial serif** with **small-caps kickers**; numerals are
  tabular. Keep labels short.
- Spell every label **exactly** as given in the entry's **In-image text** field.
  The image generator must render real, correctly-spelled words — no lorem, no
  garbled glyphs.
- Minimum legible size: labels must be readable at the displayed width (not just
  at @2x). Prefer fewer, larger labels over many tiny ones.
- For bilingual diagrams, the **EN asset** uses the EN label set and the **ES
  asset** uses the ES label set (a separate generated image — see §7).

---

## 5. Dimensions & Aspect Conventions

All sizes are the **intended displayed** size; generate at **@2x** for retina,
then downscale to WebP on integration.

| Visual class | Aspect | Displayed (px) | Generate @2x | Notes |
| :-- | :-- | :-- | :-- | :-- |
| Hero illustration | 4:5 portrait | 520 × 650 | 1040 × 1300 | Fills Hero right column on `lg` |
| Content diagram (wide) | 16:9 | 880 × 495 | 1760 × 990 | In-body `Figure` in docs |
| Content diagram (square) | 1:1 | 640 × 640 | 1280 × 1280 | Loops, archetypes |
| Comparison (two-panel) | 16:10 | 960 × 600 | 1920 × 1200 | before/after |
| Inline spot / glyph | 1:1 | 96 × 96 | 192 × 192 | Section marks, icons |
| OG / social (if added) | 1.91:1 | 1200 × 630 | 1200 × 630 | Matches existing OG |

Record the exact intended `width`/`height` in each entry so the integrator can set
them on `<img>` (prevents layout shift — see Accessibility).

---

## 6. Asset Path & Filename Convention

Place generated assets under:

```
public/images/visuals/{area}/{slug}.webp        # primary (light or transparent)
public/images/visuals/{area}/{slug}-dark.webp   # only for light+dark pairs
```

- `{area}` ∈ `home` · `methodology` · `spec` · `kit`
- `{slug}` is short kebab-case English, even for ES variants (the ES asset is
  `{slug}-es.webp` / `{slug}-es-dark.webp`).
- Slugs are **always English** (project convention), matching content slugs.

---

## 7. Bilingual (EN / ES) Policy for Text-Bearing Diagrams

The `/es/` site must show Spanish-labeled diagrams. For any diagram **with text**:

- Provide an **EN label set** and an **ES label set** in the entry's In-image text
  field.
- The ES set MUST carry correct diacritics — `ñ`, tildes (á é í ó ú), and opening
  marks `¿` / `¡` where applicable.
- The integrator generates two assets: `{slug}.webp` (EN) and `{slug}-es.webp`
  (ES), each with the matching labels.
- Purely atmospheric illustrations with **no text** (e.g. the hero) need only one
  asset for both languages.

---

## 8. Accessibility

- Every entry drafts **alt text** in EN + ES. Meaningful for informative visuals;
  `alt=""` for purely decorative ones (and say which).
- Record intended `width`/`height` (from §5) so `<img>` reserves space.
- Keep label/line contrast WCAG-safe on its ground: ink on paper and paper-ink on
  dark both pass; never rely on the oxblood accent alone to carry meaning.
- Captions (when used in `Figure.astro`) are also bilingual.

---

## 9. Negative Prompt Boilerplate (append to every prompt)

> **AVOID —** any border / frame / rectangle / box / outline around the image,
> elements touching or clipped by the edges, hard straight edges, gradients (other
> than the soft edge-fade into the background), glossy/3D render, photographic
> realism, neon or saturated colors, drop shadows, busy or cluttered backgrounds,
> watermark, signature, extra logos (only the provided DWP mark if asked),
> garbled/misspelled text, lorem ipsum, modern flat-vector "corporate memphis"
> style, clip-art, emoji.

---

## 10. Prompt Entry Schema (every visual uses ALL fields)

Each entry in `prompts/*.md` is a section with this exact field list:

```markdown
### {ID} — {Short title}

- **Target surface:** {file path} → {exact location in the file}
- **Type:** illustration | diagram
- **Priority:** flagship | high | medium | low
- **Purpose / trust rationale:** {what it communicates; why it builds trust}
- **Aspect & dimensions:** {aspect} · {displayed px} · generate @2x ({px})
- **Light/dark strategy:** transparent | light+dark pair  ({note})
- **Prompt:**
  > {full, copy-paste-ready prompt — includes the §1 house-style block and the
  >  §9 negative boilerplate, plus the specific subject, composition, and any
  >  in-image labels}
- **In-image text (EN):** {exact label strings, or "none"}
- **In-image text (ES):** {exact label strings with diacritics, or "none"}
- **Suggested asset path:** `public/images/visuals/{area}/{slug}.webp` {+ -dark / -es as needed}
- **Alt text (EN):** {meaningful alt, or `alt=""` (decorative)}
- **Alt text (ES):** {…}
- **Caption (EN):** {if used in a Figure, else "—"}
- **Caption (ES):** {…}
- **Integration note:** {where/how it drops in later — component, Figure, Hero column}
```

> A complete entry can be handed to the image agent (the **Prompt** field) and to
> the future integrator (everything else) with no extra context.
