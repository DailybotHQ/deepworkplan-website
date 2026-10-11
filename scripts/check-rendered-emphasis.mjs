/**
 * Rendered-emphasis check
 *
 * Fails when a built page shows a literal emphasis marker (`**` or `__`) in
 * its visible text: a bold span the Markdown renderer did not close. The
 * classic cause is CommonMark's flanking rule in CJK text — a closing `**`
 * preceded by punctuation (`）`, `？`, `。`, `)`, a code span's backtick) and
 * followed directly by a letter is not right-flanking, so the asterisks render
 * as text. See docs/STANDARDS.md → "Bold next to punctuation (CJK)".
 *
 * Usage (runs at the end of `pnpm run build`):
 *   node scripts/check-rendered-emphasis.mjs           # scans dist/, exit 1 on any hit
 *   node scripts/check-rendered-emphasis.mjs <dir>     # scans another build output
 *
 * Text inside <pre>, <code>, <kbd>, <samp>, <script>, <style> and <textarea>
 * is ignored: markers there are content, not failed emphasis.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const VERBATIM = ['pre', 'code', 'kbd', 'samp', 'script', 'style', 'textarea'];

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#42;': '*',
  '&#x2a;': '*',
  '&ast;': '*',
  '&#95;': '_',
  '&#x5f;': '_',
  '&lowbar;': '_',
};

/** The visible text of an HTML document, verbatim elements removed. */
export function visibleText(html) {
  let text = html.replace(/<!--[\s\S]*?-->/g, ' ');
  for (const tag of VERBATIM) {
    text = text.replace(
      new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`, 'gi'),
      ' '
    );
  }
  // A tag ends at the first `>` outside a quoted attribute value: attributes
  // such as data-copy carry raw Markdown, `>` and `**` included.
  text = text.replace(/<[a-zA-Z/!](?:[^>"']|"[^"]*"|'[^']*')*>/g, '');
  return text.replace(/&(?:#x?[0-9a-f]+|[a-z]+);/gi, (entity) => {
    return ENTITIES[entity.toLowerCase()] ?? entity;
  });
}

/**
 * Every literal emphasis marker left in the visible text, as short snippets
 * of its surroundings. `__` counts when it touches a word boundary, so an
 * identifier such as `snake__case` is not reported.
 */
export function findUnclosedEmphasis(html) {
  const text = visibleText(html);
  const hits = [];
  for (const match of text.matchAll(
    /\*\*|(?<![\p{L}\p{N}_])__|__(?![\p{L}\p{N}_])/gu
  )) {
    const start = Math.max(0, match.index - 24);
    const end = Math.min(text.length, match.index + 26);
    hits.push(text.slice(start, end).replace(/\s+/g, ' ').trim());
  }
  return hits;
}

function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (full.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function main() {
  const root = join(process.cwd(), process.argv[2] ?? 'dist');
  const files = htmlFiles(root);
  let total = 0;
  for (const file of files) {
    const hits = findUnclosedEmphasis(readFileSync(file, 'utf8'));
    if (hits.length === 0) continue;
    total += hits.length;
    console.error(`${relative(process.cwd(), file)}: ${hits.length}`);
    for (const hit of hits.slice(0, 4)) console.error(`    … ${hit} …`);
  }
  if (total > 0) {
    console.error(
      `\ncheck-rendered-emphasis: ${total} literal emphasis marker(s) in rendered text. ` +
        'Move the punctuation outside the bold span, or drop the bold (docs/STANDARDS.md).'
    );
    process.exit(1);
  }
  console.log(
    `check-rendered-emphasis: clean (${files.length} pages, no literal ** or __ in rendered text)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
