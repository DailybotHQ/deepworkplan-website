#!/usr/bin/env node
/**
 * Generate Deep Work Plan (DWP) brand assets from a single rendered logo image.
 *
 * Source: a monochrome "DWP" monogram — dark ink on a warm paper background.
 * This script (Node + sharp, the repo's image-tooling standard):
 *
 *   1. Builds a smooth alpha mask from luminance (paper -> transparent, ink -> opaque).
 *   2. Auto-crops to the logo's bounding box, squares it with padding.
 *   3. Emits two TRANSPARENT variants:
 *        - dwp-logo-light.png : ink logo  (use on LIGHT / paper backgrounds)
 *        - dwp-logo-dark.png  : paper logo (use on DARK / ink backgrounds)
 *   4. Builds favicons / app icons on a rounded "paper" tile (visible on light & dark
 *      browser chrome), a multi-size favicon.ico, and a theme-aware favicon.svg.
 *
 * Usage:
 *   node scripts/brand/generate-logo-assets.mjs
 *   node scripts/brand/generate-logo-assets.mjs --source "image copy.png"
 *   node scripts/brand/generate-logo-assets.mjs --no-favicons
 *
 * (A Python/Pillow port lives alongside as generate_logo_assets.py for environments
 *  where Pillow is available; this Node version is what runs in CI/dev here.)
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

// --- Brand defaults (Ink & Paper) -------------------------------------------
const INK = { r: 0x14, g: 0x17, b: 0x1c };
const PAPER = { r: 0xfa, g: 0xfa, b: 0xf7 };

const DEFAULTS = {
  source: 'scripts/brand/source/dwp-logo-source.png',
  outdir: 'public/images/brand',
  public: 'public',
  size: 1024,
  pad: 0.08,
  fgLuma: 45,
  favicons: true,
};

const FAVICON_PNG_SIZES = [16, 32, 48];
const ICO_SIZES = [16, 32, 48];
const APPLE_TOUCH = 180;
const PWA_SIZES = [192, 512];
const TILE_RADIUS_FRAC = 0.22;
const TILE_LOGO_FRAC = 0.94;

function parseArgs(argv) {
  const a = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--no-favicons') a.favicons = false;
    else if (k === '--source') a.source = argv[++i];
    else if (k === '--outdir') a.outdir = argv[++i];
    else if (k === '--public') a.public = argv[++i];
    else if (k === '--size') a.size = Number(argv[++i]);
    else if (k === '--pad') a.pad = Number(argv[++i]);
    else if (k === '--fg-luma') a.fgLuma = Number(argv[++i]);
  }
  return a;
}

const hex = (c) =>
  `#${[c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

function ensureDir(file) {
  mkdirSync(dirname(file), { recursive: true });
}

function log(file, w, h) {
  console.log(`  ✓ ${file}  (${w}x${h})`);
}

/** Mean luminance of the four corner patches (near-uniform background). */
function cornerBg(gray, width, height) {
  const k = Math.max(4, Math.floor(Math.min(width, height) / 20));
  let sum = 0;
  let n = 0;
  const patches = [
    [0, 0],
    [width - k, 0],
    [0, height - k],
    [width - k, height - k],
  ];
  for (const [x0, y0] of patches) {
    for (let y = y0; y < y0 + k; y++) {
      for (let x = x0; x < x0 + k; x++) {
        sum += gray[y * width + x];
        n++;
      }
    }
  }
  return sum / n;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!existsSync(args.source)) {
    console.error(`ERROR: source image not found: ${args.source}`);
    process.exit(1);
  }
  console.log(`Source: ${args.source}`);

  // 1) luminance -> alpha
  const { data: gray, info } = await sharp(args.source)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const bg = Math.max(cornerBg(gray, width, height) - 6, args.fgLuma + 1);
  const scale = 255 / (bg - args.fgLuma);
  const alpha = Buffer.alloc(width * height);
  for (let i = 0; i < gray.length; i++) {
    alpha[i] = Math.max(0, Math.min(255, Math.round((bg - gray[i]) * scale)));
  }

  // bounding box of alpha > threshold
  const thr = 8;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > thr) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // colorized RGBA (solid color, masked by alpha)
  const colorize = (c) => {
    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < alpha.length; i++) {
      rgba[i * 4] = c.r;
      rgba[i * 4 + 1] = c.g;
      rgba[i * 4 + 2] = c.b;
      rgba[i * 4 + 3] = alpha[i];
    }
    return rgba;
  };

  // crop -> contain in inner square -> extend to full square (transparent pad)
  const inner = Math.round(args.size * (1 - 2 * args.pad));
  const pad = Math.round((args.size - inner) / 2);
  const master = async (c) =>
    sharp(colorize(c), { raw: { width, height, channels: 4 } })
      .extract({ left: minX, top: minY, width: cropW, height: cropH })
      .resize(inner, inner, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: pad,
        bottom: pad,
        left: pad,
        right: pad,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

  const inkMaster = await master(INK);
  const paperMaster = await master(PAPER);

  console.log(`\nLogo variants (transparent) -> ${args.outdir}/`);
  const lightPath = `${args.outdir}/dwp-logo-light.png`;
  const darkPath = `${args.outdir}/dwp-logo-dark.png`;
  ensureDir(lightPath);
  writeFileSync(lightPath, inkMaster);
  log(lightPath, args.size, args.size);
  writeFileSync(darkPath, paperMaster);
  log(darkPath, args.size, args.size);

  // Tight-cropped nav/footer marks: bounding box only (no padding),
  // height-normalized — used in the Header and Footer logo slots.
  const markH = 160;
  const markW = Math.round((cropW * markH) / cropH);
  const tightMark = async (c, out) => {
    const rgba = colorize(c);
    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .extract({ left: minX, top: minY, width: cropW, height: cropH })
      .resize(markW, markH, { fit: 'fill' })
      .png()
      .toFile(out);
    log(out, markW, markH);
  };
  const lightMark = `${args.outdir}/dwp-mark-light.png`;
  const darkMark = `${args.outdir}/dwp-mark-dark.png`;
  await tightMark(INK, lightMark);
  await tightMark(PAPER, darkMark);

  if (!args.favicons) {
    console.log('\nFavicons skipped (--no-favicons).');
    return;
  }

  console.log(`\nFavicons / app icons -> ${args.public}/`);

  // rounded paper tile (SVG) + centered ink logo
  const tile = async (size, { rounded = true } = {}) => {
    const radius = rounded ? Math.round(size * TILE_RADIUS_FRAC) : 0;
    const plate = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${hex(PAPER)}"/></svg>`
    );
    const lsize = Math.round(size * TILE_LOGO_FRAC);
    const logo = await sharp(inkMaster).resize(lsize, lsize).toBuffer();
    return sharp(plate)
      .composite([{ input: logo, gravity: 'center' }])
      .png()
      .toBuffer();
  };

  // browser favicons (rounded tile)
  const faviconBuffers = {};
  for (const s of FAVICON_PNG_SIZES) {
    const buf = await tile(s);
    faviconBuffers[s] = buf;
    const p = `${args.public}/favicon-${s}.png`;
    ensureDir(p);
    writeFileSync(p, buf);
    log(p, s, s);
  }

  // favicon.ico (PNG-in-ICO, multi-size)
  const icoSizes = ICO_SIZES;
  const icoPngs = {};
  for (const s of icoSizes) icoPngs[s] = faviconBuffers[s] || (await tile(s));
  const ico = buildIco(icoSizes.map((s) => ({ size: s, png: icoPngs[s] })));
  const icoPath = `${args.public}/favicon.ico`;
  writeFileSync(icoPath, ico);
  console.log(`  ✓ ${icoPath}  (${icoSizes.join('/')})`);

  // apple-touch + PWA icons (full paper square; platforms mask corners)
  const apple = await tile(APPLE_TOUCH, { rounded: false });
  const applePath = `${args.public}/icons/apple-touch-icon.png`;
  ensureDir(applePath);
  writeFileSync(applePath, apple);
  log(applePath, APPLE_TOUCH, APPLE_TOUCH);
  for (const s of PWA_SIZES) {
    const buf = await tile(s, { rounded: false });
    const p = `${args.public}/icons/icon-${s}x${s}.png`;
    writeFileSync(p, buf);
    log(p, s, s);
  }

  // favicon.svg — always a light paper tile + ink glyph (NOT theme-aware, so it
  // stays black-on-paper even when the browser/tab chrome is in dark mode).
  const glyphPx = Math.round(64 * TILE_LOGO_FRAC);
  const off = Math.round((64 - glyphPx) / 2);
  const inkUri = `data:image/png;base64,${(await sharp(inkMaster).resize(192, 192).png().toBuffer()).toString('base64')}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Deep Work Plan">
  <rect x="0" y="0" width="64" height="64" rx="14" fill="${hex(PAPER)}"/>
  <image x="${off}" y="${off}" width="${glyphPx}" height="${glyphPx}" href="${inkUri}"/>
</svg>
`;
  const svgPath = `${args.public}/favicon.svg`;
  writeFileSync(svgPath, svg);
  console.log(`  ✓ ${svgPath}  (fixed light tile + ink glyph)`);

  console.log('\nDone.');
}

/** Build a PNG-based .ico (modern browsers support PNG-compressed ICO). */
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const payloads = [];
  images.forEach((img, i) => {
    const png = img.png;
    const b = i * 16;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 0); // width
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 1); // height
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // color planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(png.length, b + 8); // size of data
    dir.writeUInt32LE(offset, b + 12); // offset
    offset += png.length;
    payloads.push(png);
  });
  return Buffer.concat([header, dir, ...payloads]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
