/**
 * Markdown-for-Agents CONTENT Parity Check
 *
 * scripts/check-md-parity.mjs only verifies that a `.md` file *exists* for
 * every built HTML page — it never opens either file, so a `.md` sibling
 * that is empty, stale, truncated, or leaks raw MDX source still passes
 * that check today. This tool complements it: for every HTML/`.md` pair
 * `check-md-parity.mjs` already covers, it extracts normalized text from
 * both sides and reports two independent things:
 *
 *   1. A content-similarity signal (character-trigram Jaccard overlap +
 *      a length ratio + a heading-set overlap), script-agnostic so it
 *      works across all 17 active languages (including CJK/Thai, where
 *      whitespace-based word tokenization would be unreliable).
 *   2. A dedicated, high-confidence "leaked MDX source" detector — bare
 *      `import … from '…'` lines and unrendered JSX-style component tags
 *      (e.g. `<RepoAsHarness lang="en" />`) that a naive `entry.body.trim()`
 *      serializer can leave in the Markdown output where the HTML instead
 *      renders an actual diagram. This is a precise, near-zero-false-positive
 *      check, independent of the fuzzier similarity heuristic.
 *
 * This tool is advisory: it flags candidates for human/agent review, it
 * does not edit anything and always exits 0.
 *
 * Usage:
 *   node scripts/check-md-content-parity.mjs [--out <path>] [--data <path>]
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');
const OUT_ARG_IDX = process.argv.indexOf('--out');
const OUT_PATH =
  OUT_ARG_IDX !== -1 && process.argv[OUT_ARG_IDX + 1]
    ? join(process.cwd(), process.argv[OUT_ARG_IDX + 1])
    : join(process.cwd(), 'analysis_results', 'MD_HTML_CONTENT_PARITY.md');
const DATA_ARG_IDX = process.argv.indexOf('--data');
const DATA_PATH =
  DATA_ARG_IDX !== -1 && process.argv[DATA_ARG_IDX + 1]
    ? join(process.cwd(), process.argv[DATA_ARG_IDX + 1])
    : join(
        process.cwd(),
        'analysis_results',
        'MD_HTML_CONTENT_PARITY_DATA.csv'
      );

// Thresholds (starting heuristic — stated here so a human reviewer can
// recalibrate; see the report's Methodology section).
const TRIGRAM_OVERLAP_THRESHOLD = 0.55;
const LENGTH_RATIO_THRESHOLD = 0.5;

// Mirrors scripts/check-md-parity.mjs's discovery + exclusion logic exactly,
// so this tool's pair set matches that tool's "covered" set. Kept as a
// literal copy (not imported) to stay a standalone, dependency-free script.
const EXCLUDED_PATTERNS = [
  /^internal(\/|$)/,
  /^404/,
  /^api\//,
  /^README$/,
  /^\.well-known(\/|$)/,
  /^_astro(\/|$)/,
  /^images(\/|$)/,
];

function shouldExclude(pagePath) {
  return EXCLUDED_PATTERNS.some((pattern) => pattern.test(pagePath));
}

function isRedirectPage(content) {
  return content.length < 2000 && content.includes('http-equiv="refresh"');
}

function findHtmlPages(dir, base = '') {
  const pages = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      pages.push(...findHtmlPages(fullPath, relPath));
    } else if (entry.name === 'index.html') {
      pages.push({ pagePath: base || 'index', htmlPath: fullPath });
    }
  }
  return pages;
}

function findMdPath(pagePath) {
  const primary = pagePath === 'index' ? 'index.md' : `${pagePath}.md`;
  const primaryFull = join(DIST_DIR, primary);
  if (existsSync(primaryFull)) return primaryFull;
  const indexMd = join(DIST_DIR, pagePath, 'index.md');
  if (existsSync(indexMd)) return indexMd;
  return null;
}

// ── HTML text extraction ────────────────────────────────────────────────

function extractHtmlText(html) {
  let body = html;
  // Drop non-content blocks entirely — they have no .md equivalent.
  body = body.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  body = body.replace(/<header[\s\S]*?<\/header>/gi, ' ');
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');

  const mainMatch = body.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const scope = mainMatch ? mainMatch[1] : body;

  const headings = [
    ...scope.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/gi),
  ].map((m) => stripTags(m[1]).trim());

  const text = stripTags(scope);
  return { text, headings };
}

function stripTags(html) {
  const withoutTags = html.replace(/<[^>]+>/g, ' ');
  const decoded = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→')
    .replace(/&copy;/g, '©')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
  return decoded.replace(/\s+/g, ' ').trim();
}

// ── Markdown text extraction ────────────────────────────────────────────

/** Bare MDX `import … from '…'` lines — never legitimate prose. */
const MDX_IMPORT_PATTERN = /^import\s+.+\s+from\s+['"].+['"];?\s*$/gm;
/** JSX-style component tags (capitalized tag name) — not standard Markdown/HTML. */
const MDX_COMPONENT_TAG_PATTERN = /<\/?[A-Z][A-Za-z0-9]*(?:\s[^>]*)?\/?>/g;

function extractMarkdownLeaks(md) {
  const importLines = [...md.matchAll(MDX_IMPORT_PATTERN)].map((m) =>
    m[0].trim()
  );
  const componentTags = [
    ...new Set([...md.matchAll(MDX_COMPONENT_TAG_PATTERN)].map((m) => m[0])),
  ];
  return { importLines, componentTags };
}

function extractMarkdownText(md) {
  let body = md;
  // Drop the standardized agent-endpoint header block (title/blurb/
  // Language/Canonical/Markdown/Last Updated/---) — it has no HTML
  // equivalent (HTML carries the same info as meta tags, not body text).
  const headerEnd = body.indexOf('\n---\n');
  if (headerEnd !== -1) body = body.slice(headerEnd + 5);

  // Drop the trailing site-navigation block. generateSiteNavigation() in
  // src/lib/markdown-for-agents.ts is always the last thing appended to
  // every serialized page, and always opens with its own '\n---\n' HR
  // followed by a localized '## …' heading — since nothing is appended
  // after it, the LAST remaining '\n---\n' marks where it starts. This is
  // the Markdown-side equivalent of stripping HTML's <nav>/<footer> above;
  // without it, this constant ~150-word link block dominates the signal
  // for short pages and skews them toward false-positive divergence flags
  // (confirmed against real pages during Task 7 calibration — see
  // analysis_results/MD_HTML_CONTENT_PARITY.md).
  const navStart = body.lastIndexOf('\n---\n');
  if (navStart !== -1) body = body.slice(0, navStart);

  // Strip the known leaks before scoring content similarity — they're
  // reported separately (see extractMarkdownLeaks) and would otherwise
  // pollute the similarity signal in the opposite direction (penalizing
  // pages that DO leak source, when the leak is already its own finding).
  body = body.replace(MDX_IMPORT_PATTERN, ' ');
  body = body.replace(MDX_COMPONENT_TAG_PATTERN, ' ');

  const headings = [...body.matchAll(/^#{1,3}\s+(.+)$/gm)].map((m) =>
    m[1].trim()
  );

  const text = body
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // images -> alt text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> link text
    .replace(/^#{1,6}\s+/gm, '') // heading markers
    .replace(/[*_>#-]/g, ' ') // remaining markdown punctuation
    .replace(/\s+/g, ' ')
    .trim();

  return { text, headings };
}

// ── Similarity ───────────────────────────────────────────────────────────

/** Character trigrams — script-agnostic (works for CJK/Thai without spaces). */
function trigrams(text) {
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
  const set = new Set();
  for (let i = 0; i < normalized.length - 2; i++) {
    set.add(normalized.slice(i, i + 3));
  }
  return set;
}

function jaccard(setA, setB) {
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return intersection / union;
}

function headingOverlap(headingsA, headingsB) {
  if (headingsA.length === 0 && headingsB.length === 0) return null; // n/a
  if (headingsA.length === 0 || headingsB.length === 0) return 0;
  const normA = headingsA.map((h) => h.toLowerCase().trim());
  const normB = new Set(headingsB.map((h) => h.toLowerCase().trim()));
  const matched = normA.filter((h) => normB.has(h)).length;
  return matched / Math.max(normA.length, normB.size);
}

// ── Main ─────────────────────────────────────────────────────────────────

if (!existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory not found. Run `pnpm run build` first.');
  process.exit(1);
}

console.log('🔍 Markdown/HTML Content Parity Check\n');

const allPages = findHtmlPages(DIST_DIR);
const checkable = [];
let redirectCount = 0;
let excludedCount = 0;
let noMdCount = 0;

for (const page of allPages) {
  if (shouldExclude(page.pagePath)) {
    excludedCount++;
    continue;
  }
  const htmlContent = readFileSync(page.htmlPath, 'utf-8');
  if (isRedirectPage(htmlContent)) {
    redirectCount++;
    continue;
  }
  const mdPath = findMdPath(page.pagePath);
  if (!mdPath) {
    noMdCount++;
    continue; // md:check's job to report; this tool needs a pair to compare
  }
  checkable.push({ ...page, htmlContent, mdPath });
}

const results = [];
let leakPages = 0;

for (const { pagePath, htmlContent, mdPath } of checkable) {
  const mdContent = readFileSync(mdPath, 'utf-8');

  const html = extractHtmlText(htmlContent);
  const md = extractMarkdownText(mdContent);
  const leaks = extractMarkdownLeaks(mdContent);

  const trigramOverlap = jaccard(trigrams(html.text), trigrams(md.text));
  const lengthRatio =
    Math.min(html.text.length, md.text.length) /
    Math.max(html.text.length, md.text.length, 1);
  const headingOv = headingOverlap(html.headings, md.headings);

  const hasLeak =
    leaks.importLines.length > 0 || leaks.componentTags.length > 0;
  if (hasLeak) leakPages++;

  const isDivergenceCandidate =
    trigramOverlap < TRIGRAM_OVERLAP_THRESHOLD ||
    lengthRatio < LENGTH_RATIO_THRESHOLD ||
    (headingOv !== null &&
      headingOv === 0 &&
      html.headings.length > 0 &&
      md.headings.length > 0);

  results.push({
    pagePath,
    trigramOverlap,
    lengthRatio,
    headingOverlap: headingOv,
    htmlLen: html.text.length,
    mdLen: md.text.length,
    isDivergenceCandidate,
    hasLeak,
    leakImportCount: leaks.importLines.length,
    leakTagCount: leaks.componentTags.length,
    leakSample: [...leaks.importLines, ...leaks.componentTags]
      .slice(0, 3)
      .join(' | '),
  });
}

const divergent = results.filter((r) => r.isDivergenceCandidate);
const leaked = results.filter((r) => r.hasLeak);

// ── Language breakdown ──────────────────────────────────────────────────

const ACTIVE_LANGS = [
  'en',
  'es',
  'pt',
  'zh',
  'ja',
  'de',
  'fr',
  'ko',
  'ru',
  'it',
  'tr',
  'id',
  'vi',
  'hi',
  'pl',
  'uk',
  'th',
];
function langOf(pagePath) {
  const seg = pagePath.split('/')[0];
  return ACTIVE_LANGS.includes(seg) ? seg : 'en';
}
const scannedByLang = new Map();
for (const r of results) {
  const lang = langOf(r.pagePath);
  scannedByLang.set(lang, (scannedByLang.get(lang) || 0) + 1);
}

// ── Report ───────────────────────────────────────────────────────────────

const worstOffenders = [...divergent]
  .sort((a, b) => a.trigramOverlap - b.trigramOverlap)
  .slice(0, 50);

let report = `# Markdown/HTML Content Parity Audit\n\n`;
report += `Generated by \`scripts/check-md-content-parity.mjs\` against a \`pnpm run build\` output.\n\n`;
report += `## Methodology\n\n`;
report += `Two independent checks, both advisory (this tool never edits a file):\n\n`;
report += `1. **Content-similarity signal** — for each HTML/\`.md\` pair, extract normalized text (HTML: strip \`<script>/<style>/<nav>/<header>/<footer>\`, prefer \`<main>\`, strip remaining tags, decode entities; Markdown: drop the standardized agent-endpoint header block, strip fenced/inline code, resolve links/images to their text, strip remaining Markdown punctuation) and compute:\n`;
report += `   - **Character-trigram Jaccard overlap** (script-agnostic — works across all 17 languages, including CJK/Thai where whitespace-based word tokenization is unreliable). Flag threshold: **< ${TRIGRAM_OVERLAP_THRESHOLD}**.\n`;
report += `   - **Length ratio** (\`min(len)/max(len)\` of the normalized text, catches truncation even when vocabulary overlaps). Flag threshold: **< ${LENGTH_RATIO_THRESHOLD}**.\n`;
report += `   - **Heading-set overlap** (H1–H3 on the HTML side, \`#\`–\`###\` on the Markdown side). Flag when both sides have headings but share none.\n`;
report += `   A pair is a **divergence candidate** if any one of the three trips.\n`;
report += `2. **MDX source-leak detector** — a separate, high-confidence, near-zero-false-positive regex check for bare \`import … from '…'\` lines and unrendered JSX-style component tags (e.g. \`<RepoAsHarness lang="en" />\`) inside the Markdown output. These indicate the serializer (\`serializeReaderEntryToAgentMarkdown\` in \`src/lib/markdown-for-agents.ts\`) is dumping the raw MDX source body verbatim (\`entry.body.trim()\`) instead of stripping non-prose MDX syntax — exactly the kind of "exists but isn't really equivalent content" gap \`check-md-parity.mjs\`'s existence check cannot see.\n\n`;

report += `## Summary\n\n`;
report += `- **Pairs scanned:** ${checkable.length}\n`;
report += `- **Redirect pages skipped:** ${redirectCount}\n`;
report += `- **Excluded (non-content) pages:** ${excludedCount}\n`;
report += `- **Pages with no \`.md\` pair found:** ${noMdCount} (see \`md:check\` for that gap — out of this tool's scope)\n`;
report += `- **Divergence candidates (similarity heuristic):** ${divergent.length}\n`;
report += `- **Pages with leaked MDX source:** ${leaked.length}\n\n`;

report += `### Pairs scanned per language\n\n`;
report += `| Language | Scanned | Divergence candidates | MDX leaks |\n| --- | --- | --- | --- |\n`;
for (const lang of ACTIVE_LANGS) {
  const scanned = scannedByLang.get(lang) || 0;
  const div = results.filter(
    (r) => langOf(r.pagePath) === lang && r.isDivergenceCandidate
  ).length;
  const lk = results.filter(
    (r) => langOf(r.pagePath) === lang && r.hasLeak
  ).length;
  report += `| ${lang} | ${scanned} | ${div} | ${lk} |\n`;
}
report += `\n`;

report += `## MDX source-leak findings (${leaked.length} pages)\n\n`;
if (leaked.length === 0) {
  report += `No leaked MDX import statements or component tags found.\n\n`;
} else {
  report += `| Page | import lines | component tags | sample |\n| --- | --- | --- | --- |\n`;
  for (const r of leaked) {
    report += `| \`${r.pagePath}\` | ${r.leakImportCount} | ${r.leakTagCount} | \`${r.leakSample.replace(/\|/g, '\\|')}\` |\n`;
  }
  report += `\n`;
}

report += `## Worst content-similarity offenders (top ${worstOffenders.length} of ${divergent.length})\n\n`;
if (worstOffenders.length === 0) {
  report += `No divergence candidates found.\n\n`;
} else {
  report += `| Page | Trigram overlap | Length ratio | Heading overlap |\n| --- | --- | --- | --- |\n`;
  for (const r of worstOffenders) {
    report += `| \`${r.pagePath}\` | ${r.trigramOverlap.toFixed(2)} | ${r.lengthRatio.toFixed(2)} | ${r.headingOverlap === null ? 'n/a' : r.headingOverlap.toFixed(2)} |\n`;
  }
  report += `\n`;
}

report += `Full per-pair data (all ${results.length} pairs): see \`MD_HTML_CONTENT_PARITY_DATA.csv\` alongside this report.\n`;

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, report, 'utf-8');

const csvHeader =
  'page,trigram_overlap,length_ratio,heading_overlap,html_len,md_len,is_divergence_candidate,has_leak,leak_import_count,leak_tag_count\n';
const csvRows = results
  .map((r) =>
    [
      r.pagePath,
      r.trigramOverlap.toFixed(4),
      r.lengthRatio.toFixed(4),
      r.headingOverlap === null ? '' : r.headingOverlap.toFixed(4),
      r.htmlLen,
      r.mdLen,
      r.isDivergenceCandidate,
      r.hasLeak,
      r.leakImportCount,
      r.leakTagCount,
    ].join(',')
  )
  .join('\n');
mkdirSync(dirname(DATA_PATH), { recursive: true });
writeFileSync(DATA_PATH, `${csvHeader}${csvRows}\n`, 'utf-8');

console.log(
  `📊 Scanned ${checkable.length} pairs (${redirectCount} redirects, ${excludedCount} excluded, ${noMdCount} no-md-pair skipped)`
);
console.log(
  `   Divergence candidates: ${divergent.length}   MDX leaks: ${leaked.length}`
);
console.log(`\n✅ Report written to ${OUT_PATH}`);
console.log(`✅ Full data written to ${DATA_PATH}\n`);
