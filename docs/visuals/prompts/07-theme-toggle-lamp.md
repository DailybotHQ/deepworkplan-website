# Theme-toggle lamp — 4 states (light/dark × off/hover)

Generate the editorial **dark-mode toggle** that replaces the generic floating
button. The toggle is a small **hurricane (oil) lamp** illustration placed
inline in the masthead, next to the `Deep Work Plan` wordmark. Clicking it
toggles the site theme; the visual state echoes that action — the lamp
lights when the site goes dark, dims when it goes back to light.

The lamp is the visual sibling of the lighthouse engraving on the OG hero
(`public/images/og/og-default.png`). Same illustration vocabulary: ink
hairline strokes, no shadow, broadsheet etching feel.

- **Format:** PNG (RGB, **NOT transparent** — see "Background" below)
- **Dimensions:** **1024 × 1024** square (high-res master — the runtime renders at 28-32 px)
- **Target file size:** 60 – 200 KB per file
- **Output paths:**
  - `public/images/ui/lamp-light-off.png` — light mode, idle (default look while site is light)
  - `public/images/ui/lamp-light-hover.png` — light mode, hover (preview of "click to go dark")
  - `public/images/ui/lamp-dark-on.png` — dark mode, idle (default look while site is dark)
  - `public/images/ui/lamp-dark-hover.png` — dark mode, hover (preview of "click to go light")

---

## ⚠ Background — bake the site color, do NOT make it transparent

This is critical. The lamp asset is a **square block** with the **site's
background color filled solid** edge-to-edge — same color the masthead sits
on, so the lamp visually merges with the page (no halo, no checkerboard
artifact, no white box around it). The two background colors come straight
from `src/styles/global.css`:

| Mode | Hex (background fill) | Token |
|---|---|---|
| **Light** | `#f7f4ec` (warm newsprint paper) | `--color-paper` |
| **Dark** | `#14140f` (warm near-black, ink ground) | `--color-main` / `--color-paper` in dark |

The background must be a **perfectly uniform solid color** — no gradient, no
texture, no vignetting, no noise, no subtle warmth shift. Edge-to-edge flat
`#f7f4ec` for the two light-mode assets and edge-to-edge flat `#14140f` for
the two dark-mode assets. (If your image agent tends to add subtle
gradients, explicitly say "flat solid color, no gradient" in the prompt.)

This way, when the asset is placed inline in the masthead, it disappears
into the page and only the lamp shows.

---

## Global rules — apply to ALL 4 prompts

These elements are **identical across the 4 states** (only the lit elements
inside the glass globe + the outline color per mode change):

- **Subject:** a single 19th-century **hurricane oil lamp** — brass base
  with a short fluted stem, clear glass globe (chimney) with a slight pear
  shape, a small adjuster knob on the side of the burner, and a wick
  visible at the bottom of the globe. Centered on the canvas.
- **Style:** **pen-and-ink engraving / etching**. Same vocabulary as the
  lighthouse on `public/images/og/og-default.png`:
  - Hairline strokes for outlines and sparing cross-hatching for material
    (brass base, refraction at the globe edges). Light, editorial.
  - No drop shadow. No frame. No text. No signature.
- **Composition:** the lamp is upright, centered, leaving ~15 % margin on
  every side. The brass base sits in the bottom third; the glass globe
  occupies the upper two-thirds.
- **Linework:** crisp single-pixel hairlines at 1024 px so the lamp still
  reads at 28-32 px. Avoid hatching so dense it muddies at small sizes.
- **Outline color** (the lamp itself) **depends on the mode** so the lamp
  is legible against its background:
  - Light-mode states: outlines + hatching in **ink near-black `#1b1a17`**
    (`--color-ink` light).
  - Dark-mode states: outlines + hatching in **paper-warm light `#ece7da`**
    (`--color-ink` dark — the color the site's body text uses on dark
    surfaces). Drawing the lamp in dark-on-dark would be invisible.
- **Lit elements palette** (flame, glow, ember, halo, light rays):
  - Light-mode hover (small ember): oxblood `#7a1f1f`
  - Dark-mode (flame + glow + halo + rays): oxblood `#7a1f1f` at the wick
    base fading to warm amber `#c44a1f` at the flame tip; soft halo
    `#c44a1f` at low alpha. Never bright yellow.

The lamp **must not visually shift between states** — the brass base, stem,
globe outline, knob, and hatching are pixel-identical across the 4 files.
Only the glass globe's interior (and outline color per mode) changes.

---

## 1. Light mode — Off — `lamp-light-off.png`

```
Generate a 1024×1024 PNG illustration.

Background: FLAT SOLID #f7f4ec edge-to-edge (warm newsprint paper). No gradient, no texture, no noise, no vignette. The background must be a perfectly uniform fill so the asset disappears into the site's light-mode page.

Subject: a single 19th-century hurricane oil lamp — brass base with a short fluted stem, clear glass globe (chimney) with a slight pear shape, a small adjuster knob on the side of the burner, and a wick visible at the bottom of the globe. The lamp is UNLIT.

Style: pen-and-ink engraving / vintage broadsheet etching. All outlines and hatching in ink near-black #1b1a17. Hairline strokes for outlines, sparing cross-hatching on the brass base for material. Light, editorial — never muddy. No drop shadow, no frame, no text, no signature.

Composition: upright lamp, centered, leaving ~15 % margin on every side. Brass base at the bottom, glass globe filling the upper two-thirds. Linework crisp enough to read at 28-32 px display size.

Lighting state — OFF:
- The glass globe is empty and clear: only its outline + a few hairlines suggesting refraction at the edges. No content inside the globe.
- The wick is dark / extinguished — a small vertical stroke at the bottom of the globe interior.
- No flame, no glow, no halo, no light rays. No warm tones anywhere.

Output: single PNG at exactly 1024×1024, solid #f7f4ec background, 60-200 KB.
```

---

## 2. Light mode — Hover — `lamp-light-hover.png`

The lamp gets a single tiny ember on the wick tip — a hint that clicking
will ignite it (= switch to dark mode).

```
Generate a 1024×1024 PNG illustration.

Background: FLAT SOLID #f7f4ec edge-to-edge (warm newsprint paper). Identical to lamp-light-off.png — no gradient, no texture, no noise.

Use the EXACT same hurricane oil lamp as lamp-light-off.png — brass base, fluted stem, clear glass globe, side knob, wick. Same composition, same line weight, same hatching, same proportions, same ink near-black #1b1a17 outlines. Treat this as the same drawing with a single tiny addition.

Lighting state — HOVER (an ember has just touched the wick, about to ignite):
- A SMALL oxblood (#7a1f1f) ember/spark glows on the very tip of the wick — diameter no larger than ~2-3 % of the canvas. Just a hint, not a flame.
- A faint warm-amber halo (#c44a1f, alpha ~0.2) extends one ember-diameter around it INSIDE the globe. Very subtle.
- The rest of the glass globe is still clear (no fill), same as lamp-light-off.png.
- No halo outside the globe yet — the warmth stays contained.
- No light rays.

Output: single PNG at exactly 1024×1024, solid #f7f4ec background, 60-200 KB.
```

---

## 3. Dark mode — On — `lamp-dark-on.png`

The lamp is fully lit; the site is dark. Same lamp drawing, just with
outlines in light-paper tone (so it shows on the dark bg) and a warm flame
inside the globe.

```
Generate a 1024×1024 PNG illustration.

Background: FLAT SOLID #14140f edge-to-edge (warm near-black, the site's dark-mode ink ground). No gradient, no texture, no noise, no vignette. Perfectly uniform fill so the asset disappears into the site's dark-mode page.

Subject: the same 19th-century hurricane oil lamp as the light-mode files — brass base with fluted stem, clear glass globe, side knob, wick inside. Same composition, same line weight, same hatching, same proportions. The lamp is LIT.

Style: pen-and-ink engraving / vintage broadsheet etching. All outlines and hatching in paper-warm light #ece7da (the same color the site uses for body text on dark surfaces, so the lamp is legible against the dark background). Hairline strokes, sparing cross-hatching on the brass. No drop shadow, no frame, no text, no signature.

Composition: upright lamp, centered, ~15 % margin on every side. Brass base at the bottom, glass globe filling the upper two-thirds. Crisp at 28-32 px display size.

Lighting state — ON (lit):
- A small flame sits atop the wick inside the glass globe. The flame is teardrop-shaped, ~10-15 % of the canvas height, drawn in oxblood #7a1f1f at its base fading to warm amber #c44a1f at the tip. Hairline outline (paper-warm #ece7da, low contrast) around the flame.
- The interior of the glass globe glows with a soft RADIAL gradient: oxblood (#7a1f1f, alpha ~0.6) at the wick base → warm amber (#c44a1f, alpha ~0.3) at mid-globe → fading to transparent at the glass outline. Restrained and warm, never bright.
- A subtle exterior halo extends ~10-15 % of the canvas radius outside the glass globe. Warm amber #c44a1f, alpha ~0.15-0.2, fading to the dark background. Editorial — a small warm bloom, not a spotlight.
- 3-5 very thin hairline light rays radiate outward from the globe in irregular directions (like the lighthouse beam on the OG image but shorter and softer). Warm-amber #c44a1f, alpha ~0.25. Each ray fades into the dark background at its tip.
- Do NOT add any cool tones. Do NOT use bright yellow. Keep all warmth in the oxblood → amber range.

Output: single PNG at exactly 1024×1024, solid #14140f background, 60-200 KB.
```

---

## 4. Dark mode — Hover — `lamp-dark-hover.png`

The site is dark, the lamp is lit, but the user is hovering — about to
extinguish it (= switch to light mode). The flame is dimming: smaller,
softer halo, fewer rays.

```
Generate a 1024×1024 PNG illustration.

Background: FLAT SOLID #14140f edge-to-edge (warm near-black, the site's dark-mode ink ground). Identical to lamp-dark-on.png — no gradient, no texture, no noise.

Use the EXACT same hurricane oil lamp as lamp-dark-on.png — brass base, fluted stem, glass globe, side knob, wick. Same composition, same line weight, same hatching, same proportions, same paper-warm #ece7da outline color. Treat this as the same drawing with the flame in a DIMMING state.

Lighting state — HOVER (lit, but the flame is fading, about to be extinguished):
- The flame is HALF the height of the lit state — ~5-8 % of the canvas, still teardrop-shaped, still oxblood #7a1f1f at the base fading to warm amber #c44a1f at the tip, but visibly smaller. Hairline outline #ece7da.
- The interior radial gradient inside the globe is dimmer: oxblood (#7a1f1f, alpha ~0.3) at the wick base → warm amber (#c44a1f, alpha ~0.15) at mid-globe → fading to transparent. About half the alpha of the lit state.
- The exterior halo is reduced to ~5-8 % of the canvas radius (vs. 10-15 % in the lit state), warm amber #c44a1f at alpha ~0.08-0.12. Restrained.
- The light rays from the lit state are REMOVED — the lamp is too dim to throw rays.
- Everything else (brass, stem, glass outline, knob, hatching) is pixel-identical to lamp-dark-on.png.

Output: single PNG at exactly 1024×1024, solid #14140f background, 60-200 KB.
```

---

## After generating

1. Drop the 4 files into `public/images/ui/lamp-{light,dark}-{off,hover,on}.png`
   (using the exact filenames at the top of this document).
2. **Verify each is in the 60 – 200 KB range** and the background fill is the
   exact intended hex (`#f7f4ec` for the two light files, `#14140f` for the
   two dark files). Spot-check the corners with a color picker — a single
   off pixel will show a seam against the masthead.
3. **Pixel-stability check** — open all 4 in a viewer and toggle between
   them. The brass base, stem, globe outline, knob, and hatching should
   appear pixel-identical across files of the same mode (the lamp must not
   "jump" when the user hovers or toggles).
4. Replace the current `ThemeToggle` Svelte component to:
   - Render `lamp-light-off.png` when site is light + idle; `lamp-light-hover.png` on `:hover`/`:focus`.
   - Render `lamp-dark-on.png` when site is dark + idle; `lamp-dark-hover.png` on `:hover`/`:focus`.
   - Position inline in the masthead, after the `Deep Work Plan` strapline.
   - Size: ~28-32 px height with a 44 × 44 invisible hit target for mobile a11y.
   - `aria-label` via `t.themeToggle` translations: "Switch to dark mode" / "Switch to light mode" — translated per locale.
   - Remove the floating bottom-right toggle (the existing element).
5. Optional **flame flicker** on the lit state via CSS `@keyframes` (opacity
   0.85 ↔ 1.0 over ~2 s, ease-in-out). Skip under `prefers-reduced-motion`.
   The asset itself stays static — animation is purely CSS, no extra
   frames needed.

---

## Reference

- **Visual anchor:** `public/images/og/og-default.png` — match the lighthouse engraving's line vocabulary.
- **Site palette** (`src/styles/global.css` `@theme`):
  - Paper light: `#f7f4ec` · Paper-warm text on dark: `#ece7da`
  - Ink light text: `#1b1a17` · Ink dark ground: `#14140f`
  - Oxblood light: `#7a1f1f` · Oxblood dark-shifted: `#c2554d` · Warm amber accent: `#c44a1f`
- **Style guide:** `docs/visuals/STYLE_GUIDE.md`.
- **Previous prompt set:** `docs/visuals/prompts/06-og-images.md` (OG images, same style anchor).
