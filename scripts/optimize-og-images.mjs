#!/usr/bin/env node

/**
 * Optimize the Open Graph default images in public/images/og/.
 *
 * Resizes to the documented 1200x630 spec and re-encodes as a palette PNG to
 * hit the documented 250-400KB target size (see docs/visuals/prompts/06-og-images.md).
 * Only overwrites an original when the optimized version is smaller.
 *
 * Usage:
 *   node scripts/optimize-og-images.mjs
 *   node scripts/optimize-og-images.mjs --dry-run
 */

import { readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const OG_DIR = join(ROOT, 'public/images/og');

const WIDTH = 1200;
const HEIGHT = 630;
const PNG_PALETTE_QUALITY = 82;

const dryRun = process.argv.includes('--dry-run');

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  const kb = bytes / 1024;
  return `${kb.toFixed(1)}KB`;
}

async function optimizeImage(imagePath) {
  const inputSize = statSync(imagePath).size;

  if (dryRun) {
    console.log(
      `  [DRY RUN] ${imagePath.split('/').pop()} (${formatSize(inputSize)})`
    );
    return { inputSize, outputSize: inputSize, skipped: true };
  }

  const tempPath = `${imagePath}.tmp`;

  await sharp(imagePath)
    .resize({ width: WIDTH, height: HEIGHT, fit: 'cover' })
    .png({
      palette: true,
      quality: PNG_PALETTE_QUALITY,
      compressionLevel: 9,
      effort: 10,
    })
    .toFile(tempPath);

  const outputSize = statSync(tempPath).size;

  if (outputSize < inputSize) {
    renameSync(tempPath, imagePath);
  } else {
    rmSync(tempPath);
  }

  return {
    inputSize,
    outputSize: Math.min(outputSize, inputSize),
    skipped: false,
  };
}

async function main() {
  console.log('');
  console.log('OG Image Optimizer');
  console.log('===================');
  if (dryRun) console.log('(DRY RUN - no files will be modified)');
  console.log('');

  const files = readdirSync(OG_DIR).filter((f) => f.endsWith('.png'));

  let totalInputSize = 0;
  let totalOutputSize = 0;

  for (const file of files) {
    const imagePath = join(OG_DIR, file);
    try {
      const result = await optimizeImage(imagePath);
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;

      if (!result.skipped) {
        const ratio = (
          (1 - result.outputSize / result.inputSize) *
          100
        ).toFixed(1);
        console.log(
          `  ${file}: ${formatSize(result.inputSize)} -> ${formatSize(result.outputSize)} (${ratio}% reduction)`
        );
      }
    } catch (err) {
      console.error(`  ERROR processing ${file}: ${err.message}`);
    }
  }

  console.log('');
  console.log('--------------------');
  if (!dryRun && totalInputSize > 0) {
    const totalRatio = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(
      1
    );
    console.log(
      `Total: ${formatSize(totalInputSize)} -> ${formatSize(totalOutputSize)} (${totalRatio}% reduction)`
    );
  }
  console.log('');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
