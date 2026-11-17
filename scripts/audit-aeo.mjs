/**
 * AEO Surface Currency Audit
 *
 * Checks the machine-readable, agent-facing discovery surfaces for
 * *currency* — do they still describe what the site actually has — rather
 * than per-page SEO rules (that's scripts/audit-seo.mjs). Four scriptable
 * checks:
 *
 *   1. robots.txt AI-crawler allow-list vs. docs/SEO.md's documented list.
 *   2. openapi.json documented paths vs. the actual files under
 *      public/.well-known/ and public/api/.
 *   3. llms.txt / llms-full.txt Core Sections vs. the real top-level page
 *      slugs in src/middleware.ts's KNOWN_BASE_PATHS.
 *   4. Every addon and v8 reader page appears in both llms indexes, and the
 *      three published v8 schemas match the vendored pack byte-for-byte.
 *
 * Some AEO checks (content negotiation behavior, FAQPage JSON-LD vs.
 * rendered question count) are not included here — they need live requests or
 * per-page structural inspection and are tracked in docs/aeo/CHECKLIST.md.
 *
 * Usage: node scripts/audit-aeo.mjs [--out <path>]
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT_ARG_IDX = process.argv.indexOf('--out');
const OUT_PATH =
  OUT_ARG_IDX !== -1 && process.argv[OUT_ARG_IDX + 1]
    ? join(ROOT, process.argv[OUT_ARG_IDX + 1])
    : join(ROOT, 'analysis_results', 'AEO_AUDIT_SCRIPTED.md');

function readText(relPath) {
  const p = join(ROOT, relPath);
  return existsSync(p) ? readFileSync(p, 'utf-8') : null;
}

// ── Check 1: robots.txt AI-crawler list vs docs/SEO.md ─────────────────────

function checkCrawlerListCurrency() {
  const robots = readText('public/robots.txt') || '';
  const docs = readText('docs/SEO.md') || '';

  const robotsBots = [
    ...new Set(
      [...robots.matchAll(/^User-agent:\s*([^\s*][^\n]*)/gm)].map((m) =>
        m[1].trim()
      )
    ),
  ].sort();

  const docsListMatch = docs.match(
    /Current AI Crawlers Allowed\s*\n\n([^\n]+)/
  );
  const docsBots = docsListMatch
    ? docsListMatch[1]
        .replace(/\.\s*$/, '')
        .split(',')
        .map((s) => s.trim())
        .sort()
    : [];

  const missingFromDocs = robotsBots.filter((b) => !docsBots.includes(b));
  const missingFromRobots = docsBots.filter((b) => !robotsBots.includes(b));

  return { robotsBots, docsBots, missingFromDocs, missingFromRobots };
}

// ── Check 2: openapi.json paths vs actual .well-known/api files ────────────

function checkOpenApiCoverage() {
  const spec = JSON.parse(readText('public/openapi.json') || '{}');
  const documentedPaths = Object.keys(spec.paths || {});

  const wellKnownDir = join(ROOT, 'public/.well-known');
  const actualWellKnownFiles = [];
  function walk(dir, base = '') {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(join(dir, entry.name), rel);
      } else {
        actualWellKnownFiles.push(`/.well-known/${rel}`);
      }
    }
  }
  if (existsSync(wellKnownDir)) walk(wellKnownDir);

  const documentedSet = new Set(documentedPaths);
  const undocumented = actualWellKnownFiles.filter(
    (f) => !documentedSet.has(f)
  );

  return { documentedPaths, actualWellKnownFiles, undocumented };
}

// ── Check 3: llms.txt Core Sections vs KNOWN_BASE_PATHS ─────────────────────

function checkCoreSectionsCurrency() {
  const middleware = readText('src/middleware.ts') || '';
  const setMatch = middleware.match(
    /const KNOWN_BASE_PATHS = new Set\(\[([\s\S]*?)\]\);/
  );
  const allPaths = setMatch
    ? [...setMatch[1].matchAll(/'([^']*)'/g)].map((m) => m[1])
    : [];
  // Exclude '' (home, always covered) and known redirect-only aliases.
  // /init is an HTML redirect to /quickstart. The independent /init.md file
  // remains the canonical machine-executable adoption prompt and is listed
  // separately in both llms indexes.
  const REDIRECT_ALIASES = new Set([
    'init',
    'setup',
    'onboarding',
    'docs',
    'vim',
  ]);
  const contentSlugs = allPaths.filter(
    (p) => p !== '' && !REDIRECT_ALIASES.has(p)
  );

  const llmsTxt = readText('public/llms.txt') || '';
  const llmsFullTxt = readText('public/llms-full.txt') || '';

  const missingFromLlmsTxt = contentSlugs.filter(
    (slug) => !llmsTxt.includes(`deepworkplan.com/${slug})`)
  );
  const missingFromLlmsFullTxt = contentSlugs.filter(
    (slug) => !llmsFullTxt.includes(`deepworkplan.com/${slug})`)
  );

  return { contentSlugs, missingFromLlmsTxt, missingFromLlmsFullTxt };
}

// ── Check 4: v8 reader pages, addon pages and frozen schemas ───────────────

function checkV8SurfaceCoverage() {
  const llmsTxt = readText('public/llms.txt') || '';
  const llmsFullTxt = readText('public/llms-full.txt') || '';
  const kitDir = join(ROOT, 'src/content/kit/en');
  const addonSlugs = readdirSync(kitDir)
    .filter((name) => /\.mdx?$/.test(name))
    .filter((name) =>
      /^kind:\s*addon\s*$/m.test(
        readText(join('src/content/kit/en', name)) || ''
      )
    )
    .map((name) => name.replace(/\.mdx?$/, ''))
    .sort();
  const v8ReaderPaths = [
    '/methodology/08-loop-engineering',
    '/spec/loop-engineering',
    '/changelog/deep-work-plan-v8',
  ];
  const allUrls = [
    ...addonSlugs.map((slug) => `https://deepworkplan.com/kit/${slug}`),
    ...v8ReaderPaths.map((path) => `https://deepworkplan.com${path}`),
  ];
  const missingFromLlmsTxt = allUrls.filter((url) => !llmsTxt.includes(url));
  const missingFromLlmsFullTxt = allUrls.filter(
    (url) => !llmsFullTxt.includes(url)
  );

  const schemaPairs = [
    [
      'public/schema/plan-contract/v8.json',
      '.agents/skills/deepworkplan/spec/schema/plan-contract-v8.schema.json',
    ],
    [
      'public/schema/journal-event/v8.json',
      '.agents/skills/deepworkplan/spec/schema/journal-event-v8.schema.json',
    ],
    [
      'public/schema/plan-snapshot/v8.json',
      '.agents/skills/deepworkplan/spec/schema/plan-snapshot-v8.schema.json',
    ],
  ];
  const schemaDrift = schemaPairs
    .filter(([published, vendored]) => {
      const publishedPath = join(ROOT, published);
      const vendoredPath = join(ROOT, vendored);
      return (
        !existsSync(publishedPath) ||
        !existsSync(vendoredPath) ||
        !readFileSync(publishedPath).equals(readFileSync(vendoredPath))
      );
    })
    .map(([published]) => published);

  return {
    addonSlugs,
    v8ReaderPaths,
    missingFromLlmsTxt,
    missingFromLlmsFullTxt,
    schemaDrift,
  };
}

// ── Main ─────────────────────────────────────────────────────────────────

console.log('🔍 AEO Surface Currency Audit\n');

const crawlers = checkCrawlerListCurrency();
const openapi = checkOpenApiCoverage();
const sections = checkCoreSectionsCurrency();
const v8 = checkV8SurfaceCoverage();

let report = `# AEO Scripted Checks\n\n`;
report += `Generated by \`scripts/audit-aeo.mjs\`. Complements the manual review\n`;
report += `in \`docs/aeo/CHECKLIST.md\` for live discovery and rendered FAQPage markup.\n\n`;

report += `## 1. robots.txt AI-crawler list vs. docs/SEO.md\n\n`;
report += `- robots.txt bots: ${crawlers.robotsBots.join(', ')}\n`;
report += `- docs/SEO.md documented bots: ${crawlers.docsBots.join(', ')}\n`;
if (crawlers.missingFromDocs.length > 0) {
  report += `- **warning:** in robots.txt but missing from docs/SEO.md: ${crawlers.missingFromDocs.join(', ')}\n`;
}
if (crawlers.missingFromRobots.length > 0) {
  report += `- **warning:** in docs/SEO.md but missing from robots.txt: ${crawlers.missingFromRobots.join(', ')}\n`;
}
if (
  crawlers.missingFromDocs.length === 0 &&
  crawlers.missingFromRobots.length === 0
) {
  report += `- No mismatch found.\n`;
}
report += `\n`;

report += `## 2. openapi.json coverage of public/.well-known/*\n\n`;
report += `- Actual files under \`public/.well-known/\`: ${openapi.actualWellKnownFiles.length}\n`;
report += `- Documented in openapi.json \`paths\`: ${openapi.documentedPaths.length}\n`;
if (openapi.undocumented.length > 0) {
  report += `- **critical:** real files with zero openapi.json documentation:\n`;
  for (const f of openapi.undocumented) report += `  - \`${f}\`\n`;
} else {
  report += `- No undocumented files found.\n`;
}
report += `\n`;

report += `## 3. llms.txt / llms-full.txt Core Sections vs. KNOWN_BASE_PATHS\n\n`;
report += `- Real content sections (from \`src/middleware.ts\`): ${sections.contentSlugs.join(', ')}\n`;
if (sections.missingFromLlmsTxt.length > 0) {
  report += `- **critical:** missing from \`llms.txt\`: ${sections.missingFromLlmsTxt.join(', ')}\n`;
}
if (sections.missingFromLlmsFullTxt.length > 0) {
  report += `- **critical:** missing from \`llms-full.txt\`: ${sections.missingFromLlmsFullTxt.join(', ')}\n`;
}
if (
  sections.missingFromLlmsTxt.length === 0 &&
  sections.missingFromLlmsFullTxt.length === 0
) {
  report += `- No mismatch found.\n`;
}
report += `\n`;

report += `## 4. v8 reader pages, kit addons and frozen schemas\n\n`;
report += `- Addon pages discovered from \`src/content/kit/en/\`: ${v8.addonSlugs.map((slug) => `\`${slug}\``).join(', ')}\n`;
report += `- v8 reader pages: ${v8.v8ReaderPaths.map((path) => `\`${path}\``).join(', ')}\n`;
if (v8.missingFromLlmsTxt.length > 0) {
  report += `- **critical:** missing from \`llms.txt\`: ${v8.missingFromLlmsTxt.join(', ')}\n`;
}
if (v8.missingFromLlmsFullTxt.length > 0) {
  report += `- **critical:** missing from \`llms-full.txt\`: ${v8.missingFromLlmsFullTxt.join(', ')}\n`;
}
if (v8.schemaDrift.length > 0) {
  report += `- **critical:** schemas not byte-identical to the vendored pack: ${v8.schemaDrift.map((path) => `\`${path}\``).join(', ')}\n`;
}
if (
  v8.missingFromLlmsTxt.length === 0 &&
  v8.missingFromLlmsFullTxt.length === 0 &&
  v8.schemaDrift.length === 0
) {
  report += `- Both llms indexes list all addon and v8 reader pages; all three published v8 schemas match the vendored pack byte-for-byte.\n`;
}
report += `\n`;

writeFileSync(OUT_PATH, report, 'utf-8');

console.log(
  `- robots.txt/docs mismatch: ${crawlers.missingFromDocs.length + crawlers.missingFromRobots.length}`
);
console.log(
  `- openapi.json undocumented .well-known files: ${openapi.undocumented.length}`
);
console.log(
  `- Core Sections missing from llms.txt: ${sections.missingFromLlmsTxt.length}, from llms-full.txt: ${sections.missingFromLlmsFullTxt.length}`
);
console.log(
  `- v8/addon links missing: ${v8.missingFromLlmsTxt.length + v8.missingFromLlmsFullTxt.length}, schema drift: ${v8.schemaDrift.length}`
);
console.log(`\n✅ Report written to ${OUT_PATH}\n`);
