#!/usr/bin/env python3
"""
Generate Deep Work Plan (DWP) brand assets from a single rendered logo image.

The source is a monochrome "DWP" monogram (dark ink on a warm paper background).
This script:

  1. Builds a smooth alpha mask from luminance (paper -> transparent, ink -> opaque),
     preserving anti-aliased edges. (Pillow-only, no numpy.)
  2. Auto-crops to the logo's bounding box (with padding) and squares it.
  3. Recolors the mask into two TRANSPARENT variants:
       - light : ink-colored logo   (use on LIGHT / paper backgrounds)
       - dark  : paper/white logo    (use on DARK / ink backgrounds)
  4. Builds favicons / app icons on a rounded "paper" tile so they stay visible
     on both light and dark browser chrome, plus a theme-aware favicon.svg.

Dependencies: Pillow only.
    pip install pillow            (or: pip install --break-system-packages pillow)

Usage:
    python3 scripts/brand/generate_logo_assets.py
    python3 scripts/brand/generate_logo_assets.py --source "image copy.png"
    python3 scripts/brand/generate_logo_assets.py --no-favicons
Run with --help for all options.
"""

from __future__ import annotations

import argparse
import base64
import io
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageStat

# --- Brand defaults (Deep Work Plan — "Ink & Paper") -------------------------
INK = "#14171C"   # near-black ink (light-mode logo)
PAPER = "#FAFAF7"  # warm paper white (dark-mode logo / tiles)

DEFAULT_SOURCE = "scripts/brand/source/dwp-logo-source.png"
DEFAULT_OUTDIR = "public/images/brand"
PUBLIC_DIR = "public"

FAVICON_PNG_SIZES = [16, 32, 48]
ICO_SIZES = [16, 32, 48]
APPLE_TOUCH_SIZE = 180
PWA_SIZES = [192, 512]
TILE_RADIUS_FRAC = 0.22   # rounded-corner radius as fraction of tile size
TILE_LOGO_FRAC = 0.70     # logo occupies this fraction of the tile


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    return tuple(bytes.fromhex(h.lstrip("#")))  # type: ignore[return-value]


def detect_bg_luma(gray: Image.Image) -> float:
    """Mean luminance of the four corner patches (assumes a near-uniform bg)."""
    w, h = gray.size
    k = max(4, min(w, h) // 20)
    boxes = [(0, 0, k, k), (w - k, 0, w, k), (0, h - k, k, h), (w - k, h - k, w, h)]
    means = [ImageStat.Stat(gray.crop(b)).mean[0] for b in boxes]
    return sum(means) / len(means)


def build_alpha(img: Image.Image, bg_luma: float | None, fg_luma: float) -> Image.Image:
    """Return an 'L' image to use as alpha: paper -> 0, ink -> 255, smooth ramp."""
    gray = img.convert("L")
    if bg_luma is None:
        bg_luma = detect_bg_luma(gray) - 6.0
    bg = max(bg_luma, fg_luma + 1.0)
    scale = 255.0 / (bg - fg_luma)
    lut = [max(0, min(255, round((bg - v) * scale))) for v in range(256)]
    return gray.point(lut)


def colorize(alpha: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    """Solid `color` masked by `alpha` -> RGBA."""
    out = Image.new("RGBA", alpha.size, (color[0], color[1], color[2], 0))
    out.putalpha(alpha)
    return out


def autocrop(rgba: Image.Image, threshold: int = 8) -> Image.Image:
    """Crop to the bounding box where alpha > threshold."""
    alpha = rgba.getchannel("A")
    mask = alpha.point(lambda a: 255 if a > threshold else 0)
    bbox = mask.getbbox()
    return rgba.crop(bbox) if bbox else rgba


def square_pad(rgba: Image.Image, pad_frac: float) -> Image.Image:
    w, h = rgba.size
    side = max(w, h)
    canvas = int(round(side * (1.0 + 2.0 * pad_frac)))
    out = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    out.paste(rgba, ((canvas - w) // 2, (canvas - h) // 2), rgba)
    return out


def resized(rgba: Image.Image, size: int) -> Image.Image:
    return rgba.resize((size, size), Image.LANCZOS)


def tile(logo_rgba: Image.Image, size: int, bg: tuple[int, int, int],
         fg_logo: Image.Image) -> Image.Image:
    """Rounded `bg` tile of `size` px with `fg_logo` centered at TILE_LOGO_FRAC."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * TILE_RADIUS_FRAC), fill=255
    )
    plate = Image.new("RGBA", (size, size), (bg[0], bg[1], bg[2], 255))
    canvas.paste(plate, (0, 0), mask)
    lsize = int(size * TILE_LOGO_FRAC)
    lg = resized(fg_logo, lsize)
    canvas.alpha_composite(lg, ((size - lsize) // 2, (size - lsize) // 2))
    return canvas


def png_data_uri(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def write_favicon_svg(path: Path, ink_logo: Image.Image, paper_logo: Image.Image,
                      ink: tuple[int, int, int], paper: tuple[int, int, int]) -> None:
    """Theme-aware SVG favicon: paper tile + ink glyph (light), ink tile + paper glyph (dark)."""
    glyph = int(64 * TILE_LOGO_FRAC)
    off = (64 - glyph) // 2
    ink_uri = png_data_uri(resized(ink_logo, 192))
    paper_uri = png_data_uri(resized(paper_logo, 192))
    paper_hex = "#%02X%02X%02X" % paper
    ink_hex = "#%02X%02X%02X" % ink
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Deep Work Plan">
  <style>
    .tile {{ fill: {paper_hex}; }}
    .g-light {{ display: inline; }}
    .g-dark {{ display: none; }}
    @media (prefers-color-scheme: dark) {{
      .tile {{ fill: {ink_hex}; }}
      .g-light {{ display: none; }}
      .g-dark {{ display: inline; }}
    }}
  </style>
  <rect class="tile" x="0" y="0" width="64" height="64" rx="14" />
  <image class="g-light" x="{off}" y="{off}" width="{glyph}" height="{glyph}" href="{ink_uri}" />
  <image class="g-dark" x="{off}" y="{off}" width="{glyph}" height="{glyph}" href="{paper_uri}" />
</svg>
'''
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg, encoding="utf-8")
    print(f"  ✓ {path}  (theme-aware SVG)")


def save(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path)
    print(f"  ✓ {path}  ({img.size[0]}x{img.size[1]})")


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Generate DWP brand assets from a logo render.")
    ap.add_argument("--source", default=DEFAULT_SOURCE)
    ap.add_argument("--outdir", default=DEFAULT_OUTDIR)
    ap.add_argument("--public", default=PUBLIC_DIR)
    ap.add_argument("--size", type=int, default=1024, help="Master square size for logo variants.")
    ap.add_argument("--pad", type=float, default=0.08, help="Padding around the cropped logo.")
    ap.add_argument("--bg-luma", type=float, default=None, help="Override bg luminance (0-255).")
    ap.add_argument("--fg-luma", type=float, default=45.0, help="Ink luminance treated as opaque.")
    ap.add_argument("--ink", default=INK)
    ap.add_argument("--paper", default=PAPER)
    ap.add_argument("--no-favicons", action="store_true")
    args = ap.parse_args(argv)

    ink = hex_to_rgb(args.ink)
    paper = hex_to_rgb(args.paper)

    src = Path(args.source)
    if not src.exists():
        print(f"ERROR: source image not found: {src}", file=sys.stderr)
        return 1

    print(f"Source: {src}")
    img = Image.open(src)
    alpha = build_alpha(img, args.bg_luma, args.fg_luma)

    # Cropped, squared, transparent masters
    ink_master = resized(square_pad(autocrop(colorize(alpha, ink)), args.pad), args.size)
    paper_master = resized(square_pad(autocrop(colorize(alpha, paper)), args.pad), args.size)

    outdir = Path(args.outdir)
    print(f"\nLogo variants (transparent) -> {outdir}/")
    save(ink_master, outdir / "dwp-logo-light.png")   # ink, for LIGHT backgrounds
    save(paper_master, outdir / "dwp-logo-dark.png")   # paper, for DARK backgrounds

    if args.no_favicons:
        print("\nFavicons skipped (--no-favicons).")
        return 0

    public = Path(args.public)
    print(f"\nFavicons / app icons (paper tile, visible on light & dark) -> {public}/")

    # Raster favicons: ink logo on a rounded paper tile.
    fav_masters = {s: tile(ink_master, s, paper, ink_master) for s in set(
        FAVICON_PNG_SIZES + ICO_SIZES + [APPLE_TOUCH_SIZE] + PWA_SIZES
    )}
    for s in FAVICON_PNG_SIZES:
        save(fav_masters[s], public / f"favicon-{s}.png")

    ico_path = public / "favicon.ico"
    ico_path.parent.mkdir(parents=True, exist_ok=True)
    fav_masters[max(ICO_SIZES)].save(ico_path, sizes=[(s, s) for s in ICO_SIZES])
    print(f"  ✓ {ico_path}  ({'/'.join(map(str, ICO_SIZES))})")

    save(fav_masters[APPLE_TOUCH_SIZE], public / "icons" / "apple-touch-icon.png")
    for s in PWA_SIZES:
        save(fav_masters[s], public / "icons" / f"icon-{s}x{s}.png")

    # Theme-aware SVG favicon (replaces the placeholder).
    write_favicon_svg(public / "favicon.svg", ink_master, paper_master, ink, paper)

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
