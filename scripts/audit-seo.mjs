/**
 * Site-wide SEO Audit
 *
 * Crawls every built HTML page in dist/ (the same page set
 * scripts/check-md-parity.mjs considers "checkable") and checks it against
 * the SEO rules documented in docs/SEO.md: title length, meta description
 * length/uniqueness, canonical self-reference, hreflang completeness,
 * OG/Twitter tags, JSON-LD validity, image alt/dimensions, and heading
 * structure. Findings are written to analysis_results/<plan>/SEO_AUDIT.md
 * (path given via --out) — this tool only reports, it never edits a page.
 *
 * Usage:
 *   node scripts/audit-seo.mjs [--out <path>]
 *
 * Severity model:
 *   critical — a rule from docs/SEO.md that materially breaks SEO (missing
 *              description, missing/duplicate description, missing
 *              canonical, incomplete hreflang, missing core OG tag, invalid
 *              JSON-LD, missing alt attribute).
 *   warning  — out-of-range but present (title/description length),
 *              missing image dimensions, no JSON-LD block, 0 or 2+ <h1>.
 *   info     — reserved for observational notes.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DIR = join(process.cwd(), 'dist');
const OUT_ARG_IDX = process.argv.indexOf('--out');
const OUT_PATH =
  OUT_ARG_IDX !== -1 && process.argv[OUT_ARG_IDX + 1]
    ? join(process.cwd(), process.argv[OUT_ARG_IDX + 1])
    : join(process.cwd(), 'analysis_results', 'SEO_AUDIT.md');

// Source of truth: src/lib/i18n.ts LANGUAGES registry (hreflang field).
// Kept as a literal list here (not imported — this is a plain Node script
// with no TS/Astro loader) and must be re-synced by hand if a language is
// added; getActiveLanguages() in src/lib/i18n.ts is the canonical registry.
const ACTIVE_HREFLANGS = [
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

// Mirrors scripts/check-md-parity.mjs's exclusion set exactly, so this
// tool's "checkable" page set matches that tool's "covered" page set.
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

function langOf(pagePath) {
  const seg = pagePath.split('/')[0];
  return ACTIVE_HREFLANGS.includes(seg) ? seg : 'en';
}

// ── Extractors ───────────────────────────────────────────────────────────

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/);
  return m ? m[1].trim() : null;
}

function extractMeta(html, name, attr = 'name') {
  const re = new RegExp(`<meta ${attr}="${name}"[^>]*content="([^"]*)"[^>]*>`);
  const m = html.match(re);
  return m ? m[1] : null;
}

function extractMetaProperty(html, name) {
  return extractMeta(html, name, 'property');
}

function extractCanonical(html) {
  const m = html.match(/<link rel="canonical" href="([^"]*)"[^>]*>/);
  return m ? m[1] : null;
}

function extractHreflangs(html) {
  const re = /<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"[^>]*>/g;
  const out = [];
  let m = re.exec(html);
  while (m) {
    out.push({ code: m[1], href: m[2] });
    m = re.exec(html);
  }
  return out;
}

function extractJsonLdBlocks(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const out = [];
  let m = re.exec(html);
  while (m) {
    out.push(m[1]);
    m = re.exec(html);
  }
  return out;
}

function extractImgTags(html) {
  return html.match(/<img\b[^>]*>/g) || [];
}

function extractH1s(html) {
  return html.match(/<h1[\s>]/g) || [];
}

// ── Main ─────────────────────────────────────────────────────────────────

if (!existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory not found. Run `pnpm run build` first.');
  process.exit(1);
}

console.log('🔍 Site-wide SEO Audit\n');

const allPages = findHtmlPages(DIST_DIR);
const checkable = [];
let redirectCount = 0;
let excludedCount = 0;

for (const page of allPages) {
  if (shouldExclude(page.pagePath)) {
    excludedCount++;
    continue;
  }
  const content = readFileSync(page.htmlPath, 'utf-8');
  if (isRedirectPage(content)) {
    redirectCount++;
    continue;
  }
  checkable.push({ ...page, content });
}

const findings = []; // { severity, category, page, detail }
const descriptionsByLang = new Map(); // lang -> Map(description -> [pages])

function addFinding(severity, category, page, detail) {
  findings.push({ severity, category, page, detail });
}

for (const { pagePath, content } of checkable) {
  const lang = langOf(pagePath);

  // Title
  const title = extractTitle(content);
  if (!title) {
    addFinding('critical', 'Title', pagePath, 'missing <title>');
  } else if (title.length < 50 || title.length > 60) {
    addFinding(
      'warning',
      'Title',
      pagePath,
      `length ${title.length} (outside 50–60 target): "${title}"`
    );
  }

  // Description
  const description = extractMeta(content, 'description');
  if (!description) {
    addFinding('critical', 'Description', pagePath, 'missing meta description');
  } else {
    if (description.length < 130 || description.length > 160) {
      addFinding(
        'warning',
        'Description',
        pagePath,
        `length ${description.length} (outside 130–160 target)`
      );
    }
    if (!descriptionsByLang.has(lang)) descriptionsByLang.set(lang, new Map());
    const langMap = descriptionsByLang.get(lang);
    if (!langMap.has(description)) langMap.set(description, []);
    langMap.get(description).push(pagePath);
  }

  // Canonical
  const canonical = extractCanonical(content);
  if (!canonical) {
    addFinding(
      'critical',
      'Canonical',
      pagePath,
      'missing <link rel="canonical">'
    );
  } else {
    const expectedPath = pagePath === 'index' ? '/' : `/${pagePath}/`;
    if (!canonical.endsWith(expectedPath)) {
      // /init.md-style canonical exceptions aside, self-reference should
      // otherwise hold for every ordinary page.
      addFinding(
        'warning',
        'Canonical',
        pagePath,
        `canonical "${canonical}" does not end with expected "${expectedPath}"`
      );
    }
  }

  // Hreflang
  const hreflangs = extractHreflangs(content);
  const codes = hreflangs.map((h) => h.code).filter((c) => c !== 'x-default');
  const hasXDefault = hreflangs.some((h) => h.code === 'x-default');
  const missing = ACTIVE_HREFLANGS.filter((c) => !codes.includes(c));
  if (missing.length > 0) {
    addFinding(
      'critical',
      'Hreflang',
      pagePath,
      `missing hreflang(s): ${missing.join(', ')}`
    );
  }
  if (!hasXDefault) {
    addFinding(
      'critical',
      'Hreflang',
      pagePath,
      'missing hreflang="x-default"'
    );
  }

  // OG / Twitter
  const ogTitle = extractMetaProperty(content, 'og:title');
  const ogDescription = extractMetaProperty(content, 'og:description');
  const ogImage = extractMetaProperty(content, 'og:image');
  const twitterCard = extractMetaProperty(content, 'twitter:card');
  if (!ogTitle)
    addFinding('critical', 'OG/Twitter', pagePath, 'missing og:title');
  if (!ogDescription)
    addFinding('critical', 'OG/Twitter', pagePath, 'missing og:description');
  if (!ogImage)
    addFinding('critical', 'OG/Twitter', pagePath, 'missing og:image');
  if (!twitterCard)
    addFinding('warning', 'OG/Twitter', pagePath, 'missing twitter:card');

  // JSON-LD
  const jsonLdBlocks = extractJsonLdBlocks(content);
  if (jsonLdBlocks.length === 0) {
    addFinding('warning', 'JSON-LD', pagePath, 'no JSON-LD blocks found');
  } else {
    jsonLdBlocks.forEach((block, i) => {
      try {
        JSON.parse(block);
      } catch (e) {
        addFinding(
          'critical',
          'JSON-LD',
          pagePath,
          `block #${i + 1} failed to parse: ${e.message}`
        );
      }
    });
  }

  // Images
  const imgs = extractImgTags(content);
  for (const img of imgs) {
    const hasAlt = /\balt="[^"]*"/.test(img) || /\balt=''/.test(img);
    if (!hasAlt) {
      addFinding(
        'critical',
        'Images',
        pagePath,
        `<img> missing alt attribute: ${img.slice(0, 120)}`
      );
    }
    const hasWidth = /\bwidth="[^"]*"/.test(img);
    const hasHeight = /\bheight="[^"]*"/.test(img);
    if (!hasWidth || !hasHeight) {
      addFinding(
        'warning',
        'Images',
        pagePath,
        `<img> missing width/height: ${img.slice(0, 120)}`
      );
    }
  }

  // Headings
  const h1s = extractH1s(content);
  if (h1s.length === 0) {
    addFinding('warning', 'Headings', pagePath, 'no <h1> found');
  } else if (h1s.length > 1) {
    addFinding(
      'warning',
      'Headings',
      pagePath,
      `${h1s.length} <h1> elements found`
    );
  }
}

// Cross-page duplicate-description check (within the same language)
for (const [lang, langMap] of descriptionsByLang) {
  for (const [description, pages] of langMap) {
    if (pages.length > 1) {
      addFinding(
        'critical',
        'Description',
        pages.join(', '),
        `duplicate description across ${pages.length} pages in "${lang}": "${description.slice(0, 80)}..."`
      );
    }
  }
}

// ── Report ───────────────────────────────────────────────────────────────

const bySeverity = { critical: 0, warning: 0, info: 0 };
for (const f of findings) bySeverity[f.severity]++;

const categories = [
  'Title',
  'Description',
  'Canonical',
  'Hreflang',
  'OG/Twitter',
  'JSON-LD',
  'Images',
  'Headings',
];

const langCounts = new Map();
for (const { pagePath } of checkable) {
  const lang = langOf(pagePath);
  langCounts.set(lang, (langCounts.get(lang) || 0) + 1);
}

let report = `# SEO Audit\n\n`;
report += `Generated by \`scripts/audit-seo.mjs\` against a \`pnpm run build\` output.\n\n`;
report += `## Summary\n\n`;
report += `- **Pages scanned:** ${checkable.length} (checkable — same exclusion set as \`md:check\`)\n`;
report += `- **Redirect pages skipped:** ${redirectCount}\n`;
report += `- **Excluded (non-content) pages:** ${excludedCount}\n`;
report += `- **Total HTML pages in dist/:** ${allPages.length}\n`;
report += `- **Critical findings:** ${bySeverity.critical}\n`;
report += `- **Warning findings:** ${bySeverity.warning}\n\n`;
report += `### Pages scanned per language\n\n`;
report += `| Language | Pages scanned |\n| --- | --- |\n`;
for (const lang of ACTIVE_HREFLANGS) {
  report += `| ${lang} | ${langCounts.get(lang) || 0} |\n`;
}
report += `\n`;

for (const category of categories) {
  const catFindings = findings.filter((f) => f.category === category);
  report += `## ${category}\n\n`;
  if (catFindings.length === 0) {
    report += `No violations found.\n\n`;
    continue;
  }
  report += `| Severity | Page | Detail |\n| --- | --- | --- |\n`;
  for (const f of catFindings) {
    report += `| ${f.severity} | \`${f.page}\` | ${f.detail.replace(/\|/g, '\\|')} |\n`;
  }
  report += `\n`;
}

writeFileSync(OUT_PATH, report, 'utf-8');

console.log(
  `📊 Scanned ${checkable.length} pages (${redirectCount} redirects skipped, ${excludedCount} excluded)`
);
console.log(
  `   Critical: ${bySeverity.critical}   Warning: ${bySeverity.warning}`
);
console.log(`\n✅ Report written to ${OUT_PATH}\n`);
