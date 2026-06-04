#!/usr/bin/env node
/**
 * i18n QA gate for the Deep Work Plan site.
 *
 * Usage: node scripts/i18n/check.mjs  (pnpm run i18n:check)
 *
 * Checks, for every ACTIVE language (one that has a translation strings file
 * `src/lib/translations/<code>.ts`, other than the English source):
 *
 *   1. Content-file parity — the language has exactly the same set of content
 *      slugs as English in every collection (methodology, spec, kit, pages).
 *      Missing or extra files are errors.
 *   2. Script sanity — for languages that MUST render in a non-Latin script
 *      (zh, ja, ko, ru, uk, hi, th), a content body that is pure ASCII is almost
 *      certainly untranslated → error. (Front-matter/code are ignored.)
 *   3. Leftover-frontmatter-lang — every content file's `lang:` matches its
 *      directory.
 *
 * Note: translation *string-key* parity is already guaranteed by TypeScript —
 * each `<code>.ts` must satisfy the `SiteTranslations` interface, so
 * `pnpm run astro:check` is the key-parity gate. This script covers content.
 *
 * Exits 1 on any error (CI-friendly).
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const COLLECTIONS = ['methodology', 'spec', 'kit', 'pages'];
const REFERENCE = 'en';

// Languages whose content body must contain non-Latin script characters.
const NON_LATIN = {
  zh: /[一-鿿]/,
  ja: /[぀-ヿ一-鿿]/,
  ko: /[가-힯]/,
  ru: /[Ѐ-ӿ]/,
  uk: /[Ѐ-ӿ]/,
  hi: /[ऀ-ॿ]/,
  th: /[฀-๿]/,
};

const errors = [];
const warnings = [];

function translationFilePresent(code) {
  return existsSync(join(ROOT, 'src', 'lib', 'translations', `${code}.ts`));
}

function listSlugs(collection, lang) {
  const dir = join(ROOT, 'src', 'content', collection, lang);
  if (!existsSync(dir)) return null;
  return new Set(readdirSync(dir).filter((f) => /\.mdx?$/.test(f)));
}

function stripFrontmatterAndCode(text) {
  let t = text.replace(/^---[\s\S]*?---/, ''); // frontmatter
  t = t.replace(/```[\s\S]*?```/g, ''); // fenced code
  t = t.replace(/`[^`]*`/g, ''); // inline code
  return t;
}

// Discover active languages (translation file present, excluding the reference).
const activeLangs = readdirSync(join(ROOT, 'src', 'lib', 'translations'))
  .map((f) => f.match(/^([a-z-]+)\.ts$/)?.[1])
  .filter((c) => c && c !== REFERENCE && c !== 'types' && c !== 'index')
  .filter((c) => translationFilePresent(c));

console.log(
  `i18n:check — reference="${REFERENCE}", active languages: ${activeLangs.join(', ') || '(none yet)'}\n`
);

for (const lang of activeLangs) {
  for (const collection of COLLECTIONS) {
    const ref = listSlugs(collection, REFERENCE);
    const got = listSlugs(collection, lang);
    if (ref === null) continue;
    if (got === null) {
      errors.push(
        `[${lang}] missing collection dir: src/content/${collection}/${lang}/`
      );
      continue;
    }
    for (const slug of ref) {
      if (!got.has(slug))
        errors.push(
          `[${lang}] ${collection}: missing "${slug}" (present in ${REFERENCE})`
        );
    }
    for (const slug of got) {
      if (!ref.has(slug))
        errors.push(
          `[${lang}] ${collection}: extra "${slug}" (not in ${REFERENCE}) — slugs must match English`
        );
    }
    // Per-file checks
    const dir = join(ROOT, 'src', 'content', collection, lang);
    for (const file of got) {
      const full = join(dir, file);
      const raw = readFileSync(full, 'utf8');
      // lang frontmatter must match directory (methodology/spec/kit only)
      const fm = raw.match(/^lang:\s*([a-z-]+)\s*$/m);
      if (fm && fm[1] !== lang) {
        errors.push(
          `[${lang}] ${collection}/${file}: frontmatter lang="${fm[1]}" should be "${lang}"`
        );
      }
      // Non-Latin script sanity
      const re = NON_LATIN[lang];
      if (re) {
        const body = stripFrontmatterAndCode(raw);
        if (body.trim().length > 40 && !re.test(body)) {
          errors.push(
            `[${lang}] ${collection}/${file}: body has no ${lang} script characters — likely untranslated`
          );
        }
      }
    }
  }
}

// Report -----------------------------------------------------------------------
if (warnings.length) {
  console.log('⚠️  Warnings:');
  for (const w of warnings) console.log(`   - ${w}`);
  console.log('');
}
if (errors.length) {
  console.error('❌ i18n:check failed:');
  for (const e of errors) console.error(`   - ${e}`);
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(
  '✅ i18n:check passed — content parity and script sanity OK for all active languages.'
);
