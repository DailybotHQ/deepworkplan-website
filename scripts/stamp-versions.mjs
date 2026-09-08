#!/usr/bin/env node
/**
 * Stamp the site release version (package.json) into every artifact that
 * declares a version, so agent-facing documents never drift from releases:
 *
 *   - public/openapi.json                     → info.version
 *   - public/api/health.json                  → version
 *   - public/.well-known/mcp.json             → version
 *   - public/.well-known/mcp/server-card.json → serverInfo.version
 *   - src/lib/mcp/server-info.ts              → SITE_VERSION (HTTP MCP serverInfo)
 *
 * Idempotent: files are rewritten only when the stamped value differs.
 * Run automatically as part of `prebuild` (see package.json).
 *
 * Run standalone: `node scripts/stamp-versions.mjs`
 */

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function dirname(path) {
  const idx = path.lastIndexOf('/');
  return idx === -1 ? '.' : path.slice(0, idx);
}

async function readVersion() {
  const pkgRaw = await readFile(resolve(ROOT, 'package.json'), 'utf8');
  const { version } = JSON.parse(pkgRaw);
  if (typeof version !== 'string' || version.length === 0) {
    throw new Error('package.json has no version field');
  }
  return version;
}

/** Stamp a JSON file via a mutate callback; returns true when the file changed. */
async function stampJson(relPath, mutate) {
  const abs = resolve(ROOT, relPath);
  let raw;
  try {
    raw = await readFile(abs, 'utf8');
  } catch {
    console.warn(`[stamp-versions] skip (missing): ${relPath}`);
    return false;
  }
  const doc = JSON.parse(raw);
  mutate(doc);
  const next = `${JSON.stringify(doc, null, 2)}\n`;
  if (next === raw) {
    return false;
  }
  await writeFile(abs, next, 'utf8');
  return true;
}

/** Stamp SITE_VERSION in the MCP server-info module (targeted regex replace). */
async function stampServerInfo(version) {
  const relPath = 'src/lib/mcp/server-info.ts';
  const abs = resolve(ROOT, relPath);
  let raw;
  try {
    raw = await readFile(abs, 'utf8');
  } catch {
    console.warn(`[stamp-versions] skip (missing): ${relPath}`);
    return false;
  }
  const next = raw.replace(
    /export const SITE_VERSION = '[^']*';/,
    `export const SITE_VERSION = '${version}';`
  );
  if (next === raw) {
    return false;
  }
  await writeFile(abs, next, 'utf8');
  return true;
}

const version = await readVersion();
const changed = [];

if (
  await stampJson('public/openapi.json', (doc) => {
    if (doc.info) doc.info.version = version;
  })
) {
  changed.push('public/openapi.json');
}
if (
  await stampJson('public/api/health.json', (doc) => {
    doc.version = version;
  })
) {
  changed.push('public/api/health.json');
}
if (
  await stampJson('public/.well-known/mcp.json', (doc) => {
    doc.version = version;
  })
) {
  changed.push('public/.well-known/mcp.json');
}
if (
  await stampJson('public/.well-known/mcp/server-card.json', (doc) => {
    if (doc.serverInfo) doc.serverInfo.version = version;
  })
) {
  changed.push('public/.well-known/mcp/server-card.json');
}
if (await stampServerInfo(version)) {
  changed.push('src/lib/mcp/server-info.ts');
}

if (changed.length > 0) {
  console.log(`[stamp-versions] stamped v${version} → ${changed.join(', ')}`);
} else {
  console.log(`[stamp-versions] all artifacts already at v${version}`);
}
