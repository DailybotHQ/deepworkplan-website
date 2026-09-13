#!/usr/bin/env node
/**
 * Generate public/api/v1/pages.json — the versioned (v1) index of every
 * agent-facing Markdown endpoint on the site, grouped by language.
 *
 * Source of truth:
 *   - Language order: src/lib/language-codes.ts LANGUAGE_CODES (parsed from
 *     source — the registry is never duplicated here; languages missing on
 *     disk are skipped).
 *   - Page slugs: the filesystem (src/content/pages/<lang>/*.md), matching
 *     what Astro serves — no Astro import needed at this stage of prebuild.
 *
 * Idempotent: the output is rewritten only when it differs.
 * Run automatically as part of `prebuild` (see package.json), between
 * generate-agent-skills-index and stamp-versions (which stamps the release
 * version into this file's `version` field).
 *
 * Run standalone: `node scripts/generate-api-v1-pages.mjs`
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PAGES_DIR = resolve(ROOT, 'src/content/pages');
const OUT_PATH = resolve(ROOT, 'public/api/v1/pages.json');

/** Parse LANGUAGE_CODES out of the registry module (keeps one source of truth). */
async function readLanguageOrder() {
  const src = await readFile(
    resolve(ROOT, 'src/lib/language-codes.ts'),
    'utf8'
  );
  const match = src.match(/LANGUAGE_CODES\s*=\s*\[([^\]]*)\]/s);
  if (!match) {
    throw new Error(
      'LANGUAGE_CODES array not found in src/lib/language-codes.ts'
    );
  }
  return [...match[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
}

/** Slugs (filenames without .md) for one language directory, sorted. */
async function readPageSlugs(lang) {
  let entries;
  try {
    entries = await readdir(resolve(PAGES_DIR, lang));
  } catch {
    return null; // language folder absent — skip it
  }
  return entries
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3))
    .sort();
}

const order = await readLanguageOrder();
const languages = [];
for (const code of order) {
  const pages = await readPageSlugs(code);
  if (pages === null || pages.length === 0) {
    console.warn(
      `[api-v1-pages] skip (no content): src/content/pages/${code}/`
    );
    continue;
  }
  languages.push({ code, pages });
}

if (languages.length === 0) {
  throw new Error('No language content found under src/content/pages/');
}

const doc = {
  version: '0.0.0', // stamped by scripts/stamp-versions.mjs during prebuild
  apiVersion: 'v1',
  description:
    'Every agent-facing Markdown endpoint, grouped by language. Each page is fetchable as <origin>/<lang-prefix>/<slug>.md (English at the root, e.g. /developers.md; other languages at /<lang>/<slug>.md).',
  languages,
};
const next = `${JSON.stringify(doc, null, 2)}\n`;

let previous = null;
try {
  previous = await readFile(OUT_PATH, 'utf8');
} catch {
  // first run — file does not exist yet
}
if (previous === next) {
  console.log(
    `[api-v1-pages] already current (${languages.length} languages, ${languages.reduce((n, l) => n + l.pages.length, 0)} pages)`
  );
} else {
  await writeFile(OUT_PATH, next, 'utf8');
  console.log(
    `[api-v1-pages] wrote public/api/v1/pages.json (${languages.length} languages, ${languages.reduce((n, l) => n + l.pages.length, 0)} pages)`
  );
}
