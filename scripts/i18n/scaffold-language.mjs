#!/usr/bin/env node
/**
 * Scaffold a new language for the Deep Work Plan site.
 *
 * Usage:
 *   node scripts/i18n/scaffold-language.mjs <code>
 *   pnpm run i18n:scaffold <code>
 *
 * Given a registered language code, this:
 *   1. Creates `src/lib/translations/<code>.ts` from the English source
 *      (renaming the exported const) — a translation starting point.
 *   2. Copies every content file from `src/content/{collection}/en/` into
 *      `src/content/{collection}/<code>/`, preserving the English slug and
 *      switching the frontmatter `lang:` to the new code.
 *
 * The output is a faithful English-seeded skeleton. The translator (an agent
 * following analysis_results/TRANSLATION_STYLE_GUIDE.md, then the i18n-guardian
 * native-review pass) then translates the prose in place. Slugs, frontmatter
 * keys, and code blocks stay intact; the bootstrap URL stays English.
 *
 * This is non-destructive: it refuses to overwrite an existing language.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const COLLECTIONS = ['methodology', 'spec', 'kit', 'pages'];

function readLanguageCodes() {
  const src = readFileSync(
    join(ROOT, 'src', 'lib', 'language-codes.ts'),
    'utf8'
  );
  const block = src.match(/LANGUAGE_CODES\s*=\s*\[([\s\S]*?)\]/);
  if (!block) throw new Error('Could not parse LANGUAGE_CODES');
  return [...block[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
}

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

const code = process.argv[2];
if (!code) fail('Usage: node scripts/i18n/scaffold-language.mjs <code>');

const codes = readLanguageCodes();
if (!codes.includes(code)) {
  fail(
    `"${code}" is not a registered language code. Add it to src/lib/language-codes.ts + LANGUAGES in src/lib/i18n.ts first. Known: ${codes.join(', ')}`
  );
}
if (code === 'en')
  fail('English is the source language — nothing to scaffold.');

// 1. Translation strings file --------------------------------------------------
const stringsTarget = join(ROOT, 'src', 'lib', 'translations', `${code}.ts`);
if (existsSync(stringsTarget)) {
  fail(
    `src/lib/translations/${code}.ts already exists — refusing to overwrite. Delete it first to re-scaffold.`
  );
}
const enStrings = readFileSync(
  join(ROOT, 'src', 'lib', 'translations', 'en.ts'),
  'utf8'
);
const newStrings = enStrings
  .replace(
    /^\/\*\*[\s\S]*?\*\//,
    `/**\n * ${code} translations\n *\n * Scaffolded from en.ts — translate every string value in place.\n * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:\n * code, paths, command names, or the https://deepworkplan.com/init.md URL.\n */`
  )
  .replace(/export const en:/, `export const ${code}:`);
writeFileSync(stringsTarget, newStrings, 'utf8');
console.log(
  `✓ src/lib/translations/${code}.ts (from en.ts — translate values)`
);

// 2. Content collections -------------------------------------------------------
let fileCount = 0;
for (const collection of COLLECTIONS) {
  const srcDir = join(ROOT, 'src', 'content', collection, 'en');
  const destDir = join(ROOT, 'src', 'content', collection, code);
  if (!existsSync(srcDir)) continue;
  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(srcDir)) {
    const body = readFileSync(join(srcDir, file), 'utf8');
    // Switch the frontmatter language (methodology/spec/kit). Pages have no
    // lang field (language is derived from the directory) — the replace no-ops.
    const updated = body.replace(/^lang:\s*en\s*$/m, `lang: ${code}`);
    writeFileSync(join(destDir, file), updated, 'utf8');
    fileCount++;
  }
  console.log(
    `✓ src/content/${collection}/${code}/ (${readdirSync(destDir).length} files)`
  );
}

console.log(
  `\n✅ Scaffolded "${code}": 1 strings file + ${fileCount} content files.`
);
console.log('Next: translate the values/prose (style guide), then run');
console.log(
  `  pnpm run i18n:check && pnpm run astro:check && pnpm run build\n`
);
