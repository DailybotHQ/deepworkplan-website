#!/usr/bin/env node
/**
 * Stamp the site release version (package.json) into every artifact that
 * declares a version, so agent-facing documents never drift from releases:
 *
 *   - public/openapi.json                     → info.version
 *   - public/api/health.json                  → version
 *   - public/api/v1/index.json                → version
 *   - public/api/v1/sections.json             → version
 *   - public/api/v1/pages.json                → version
 *   - public/api/v1/health.json               → version
 *   - public/.well-known/mcp.json             → version
 *   - public/.well-known/mcp/server-card.json → version + serverInfo.version
 *   - src/lib/mcp/server-info.ts              → SITE_VERSION (HTTP MCP serverInfo)
 *
 * One artifact tracks a different version line: the vendored DeepWorkPlan
 * *skill*, not the website package —
 *
 *   - public/.well-known/dwp-trust.json → skill.version (+ lastUpdated)
 *
 * sourced from `.agents/skills/deepworkplan/SKILL.md`'s `version:` frontmatter
 * so it never drifts from what is actually vendored, and only rewritten (with
 * `lastUpdated` bumped) when that version actually changes.
 *
 * Idempotent: files are rewritten only when the stamped value differs.
 * Run automatically as part of `prebuild` (see package.json).
 *
 * Run standalone: `node scripts/stamp-versions.mjs`
 */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

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

/** Read the vendored DeepWorkPlan skill's own version from its SKILL.md frontmatter. */
async function readSkillVersion() {
  const relPath = '.agents/skills/deepworkplan/SKILL.md';
  const abs = resolve(ROOT, relPath);
  const raw = await readFile(abs, 'utf8');
  const match = raw.match(/^version:\s*"?([^"\n]+?)"?\s*$/m);
  if (!match) {
    throw new Error(`${relPath} has no version: frontmatter field`);
  }
  return match[1];
}

/**
 * Stamp the trust manifest's skill.version from the vendored skill (not the
 * site package), bumping lastUpdated only when the version actually changes
 * — unlike the other artifacts above, lastUpdated must not churn on every
 * run of an unrelated site release.
 */
async function stampTrustManifest(skillVersion) {
  const relPath = 'public/.well-known/dwp-trust.json';
  const abs = resolve(ROOT, relPath);
  let raw;
  try {
    raw = await readFile(abs, 'utf8');
  } catch {
    console.warn(`[stamp-versions] skip (missing): ${relPath}`);
    return false;
  }
  const doc = JSON.parse(raw);
  if (doc.skill?.version === skillVersion) {
    return false;
  }
  doc.skill.version = skillVersion;
  doc.lastUpdated = new Date().toISOString().slice(0, 10);
  await writeFile(abs, `${JSON.stringify(doc, null, 2)}\n`, 'utf8');
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
for (const relPath of [
  'public/api/v1/index.json',
  'public/api/v1/sections.json',
  'public/api/v1/pages.json',
  'public/api/v1/health.json',
]) {
  if (
    await stampJson(relPath, (doc) => {
      doc.version = version;
    })
  ) {
    changed.push(relPath);
  }
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
    doc.version = version;
    if (doc.serverInfo) doc.serverInfo.version = version;
  })
) {
  changed.push('public/.well-known/mcp/server-card.json');
}
if (await stampServerInfo(version)) {
  changed.push('src/lib/mcp/server-info.ts');
}
if (await stampTrustManifest(await readSkillVersion())) {
  changed.push('public/.well-known/dwp-trust.json');
}

if (changed.length > 0) {
  console.log(`[stamp-versions] stamped v${version} → ${changed.join(', ')}`);
} else {
  console.log(`[stamp-versions] all artifacts already at v${version}`);
}
