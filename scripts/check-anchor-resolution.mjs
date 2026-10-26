/**
 * Anchor-resolution check over built HTML.
 *
 * Scans a build output directory (default dist/) and reports every
 * `href="…#fragment"` whose fragment does not resolve to an `id` on the page
 * it targets — same-page links and cross-page links alike. Translated pages
 * slug their headings from the translated text (Sätteri keeps unicode
 * letters, lowercases, and hyphenates), so a link fragment copied from the
 * English source silently lands the reader at the top of the page.
 *
 * Fragments are compared after percent-decoding and Unicode NFC
 * normalization: renderers percent-encode non-ASCII in hrefs while writing
 * `id` attributes as raw UTF-8, and both spellings must count as resolved.
 *
 * Usage:
 *   node scripts/check-anchor-resolution.mjs           # scans dist/, exit 1 on any hit
 *   node scripts/check-anchor-resolution.mjs <dir>     # scans another build output
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const HREF_WITH_FRAGMENT = /href="([^"]*)#([^"]+)"/g;
const ID_ATTRIBUTE = /\sid="([^"]+)"/g;
const DIRECTORY_INDEX = 'index.html';

/** Normalize a fragment or id for comparison: percent-decode, then NFC. */
function normalizeAnchor(value) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Malformed percent sequences: compare the raw value as written.
  }
  return decoded.normalize('NFC');
}

/** Resolve a link path ("" = same page) to its page key, or null if absent. */
function resolveTargetKey(pages, linkPath, sourceKey) {
  if (linkPath === '') return sourceKey;
  const clean = linkPath
    .replace(/^https?:\/\/[^/]+/, '')
    .replace(/^\//, '')
    .replace(/\.html$/, '')
    .replace(/\/$/, '');
  const candidates = [join(clean, DIRECTORY_INDEX), `${clean}.html`];
  for (const candidate of candidates) {
    if (pages.has(candidate.split('\\').join('/'))) {
      return candidate.split('\\').join('/');
    }
  }
  return null;
}

/**
 * Find every unresolved anchor fragment across a set of built pages.
 *
 * @param {Map<string, string>} pages - page key (dist-relative path) → HTML.
 * @returns {{ file: string, href: string, target: string | null }[]} one
 *   entry per page/fragment pair whose target page is missing or whose
 *   fragment matches no id on the target page.
 */
export function findUnresolvedAnchors(pages) {
  const idsByPage = new Map();
  for (const [key, html] of pages) {
    const ids = new Set();
    for (const match of html.matchAll(ID_ATTRIBUTE)) {
      ids.add(normalizeAnchor(match[1]));
    }
    idsByPage.set(key, ids);
  }

  const seen = new Set();
  const unresolved = [];
  for (const [key, html] of pages) {
    for (const match of html.matchAll(HREF_WITH_FRAGMENT)) {
      const [, linkPath, fragment] = match;
      if (linkPath.startsWith('mailto:')) continue;
      if (/^https?:\/\//.test(linkPath)) continue;
      const href = `${linkPath}#${fragment}`;
      const dedupeKey = `${key} → ${href}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      const targetKey = resolveTargetKey(pages, linkPath, key);
      if (targetKey === null) {
        unresolved.push({ file: key, href, target: null });
        continue;
      }
      if (!idsByPage.get(targetKey).has(normalizeAnchor(fragment))) {
        unresolved.push({ file: key, href, target: targetKey });
      }
    }
  }
  return unresolved;
}

function collectHtmlFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      files.push(...collectHtmlFiles(path));
    } else if (name.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

async function main() {
  const distDir = process.argv[2] ?? 'dist';
  const pages = new Map();
  for (const file of collectHtmlFiles(distDir)) {
    const key = relative(distDir, file).split('\\').join('/');
    pages.set(key, readFileSync(file, 'utf8'));
  }
  const unresolved = findUnresolvedAnchors(pages);
  if (unresolved.length > 0) {
    console.error(
      `check-anchor-resolution: ${unresolved.length} unresolved fragment link(s):`
    );
    for (const { file, href, target } of unresolved) {
      const where =
        target === null ? 'target page missing' : `no matching id on ${target}`;
      console.error(`  ${file} → ${href} (${where})`);
    }
    console.error(
      '\nPoint each fragment at the slug of the heading on the page it targets ' +
        '(translated pages slug their translated headings), or fix the link path.'
    );
    process.exit(1);
  }
  console.log(
    `check-anchor-resolution: clean (${pages.size} pages, every fragment link resolves)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
