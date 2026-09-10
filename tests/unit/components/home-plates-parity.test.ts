import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSupportedLanguages } from '@/lib/i18n';

// Aggregate source-contract test (Task 9): every home story plate must
// satisfy the 17-language i18n contract of docs/DIAGRAM_COMPONENTS.md §4.
// The language set is derived from getSupportedLanguages() — not a hardcoded
// list — so a newly registered locale fails here until each plate gains its
// key. Extends (never replaces) the per-plate tests from Tasks 3–6.

const PLATES = [
  'HumansSteer.astro',
  'PlanNoDrift.astro',
  'DoneIsAContract.astro',
  'RepoAsHarnessPlate.astro',
  'ContextEconomy.astro',
] as const;

const languages = getSupportedLanguages();

// Slice the inline i18n map out of the component source.
const mapBlock = (source: string, plate: string): string => {
  const start = source.indexOf('const i18n = {');
  expect(start, `${plate}: inline i18n map not found`).toBeGreaterThan(-1);
  const end = source.indexOf('} as const', start);
  expect(end, `${plate}: i18n map not closed with "as const"`).toBeGreaterThan(
    start
  );
  return source.slice(start, end);
};

describe.each(PLATES)('%s aggregate i18n contract', (plate) => {
  const source = readFileSync(
    resolve(process.cwd(), 'src/components/diagrams/home', plate),
    'utf8'
  );
  const block = mapBlock(source, plate);

  it('declares an i18n key for every supported language', () => {
    for (const lang of languages) {
      const key = new RegExp(`^ {2}${lang}: \\{`, 'm');
      expect(block, `missing i18n key for "${lang}"`).toMatch(key);
    }
  });

  it('falls back to en for unsupported languages', () => {
    expect(source).toContain('i18n[lang as keyof typeof i18n] ?? i18n.en');
  });

  it('binds the localized aria-label on its role="img" figure', () => {
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={t.ariaLabel}');
  });
});
