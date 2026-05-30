# Brand asset generation

Generates the Deep Work Plan logo and favicon assets from a single rendered logo image
(a monochrome "DWP" monogram — dark ink on a warm paper background).

## Source

`scripts/brand/source/dwp-logo-source.png` — the master render. Replace this file to regenerate the
whole asset set from a new logo render.

## Usage

Two equivalent generators are provided:

```bash
# Node + sharp (the repo's image-tooling standard; no extra install needed)
node scripts/brand/generate-logo-assets.mjs
node scripts/brand/generate-logo-assets.mjs --no-favicons
node scripts/brand/generate-logo-assets.mjs --source path/to/render.png

# Python + Pillow (same output; needs Pillow)
#   apt-get install -y python3-pil   (or: pip install pillow)
python3 scripts/brand/generate_logo_assets.py
python3 scripts/brand/generate_logo_assets.py --help
```

## What it produces

Transparent logo variants (cropped + squared, 1024px) → `public/images/brand/`:

- `dwp-logo-light.png` — ink logo, for **light / paper** backgrounds
- `dwp-logo-dark.png` — paper-white logo, for **dark / ink** backgrounds

Favicons / app icons (ink logo on a rounded **paper tile** so they stay visible on both light and
dark browser chrome) → `public/`:

- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`
- `favicon.ico` (16/32/48 multi-size)
- `favicon.svg` — **theme-aware** (paper tile + ink glyph in light; ink tile + paper glyph in dark)
- `icons/apple-touch-icon.png` (180)
- `icons/icon-192x192.png`, `icons/icon-512x512.png` (PWA manifest)

## How it works

1. Builds a smooth alpha mask from luminance (paper → transparent, ink → opaque), keeping
   anti-aliased edges.
2. Auto-crops to the logo bounding box, squares it with padding.
3. Recolors the mask to ink / paper for the two transparent variants.
4. Composites the ink logo on a rounded paper tile for favicons and embeds a compact PNG in the
   theme-aware `favicon.svg`.

## Note on vectors

`favicon.svg` embeds a raster glyph (the source is a PNG render). For a fully crisp vector favicon and
logo, replace it with a true SVG from the designer (or vectorize the source with `potrace`, which
suits flat black-and-white art well).
