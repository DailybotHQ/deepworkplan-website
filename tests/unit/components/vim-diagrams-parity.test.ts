import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSupportedLanguages } from '@/lib/i18n';

// Source-contract test for the two DeepWorkPlan Vim figures: each must satisfy
// the 17-language i18n contract of docs/DIAGRAM_COMPONENTS.md §4 (identical key
// sets and array lengths in every language, an `en` fallback, no blank values,
// role="img", no eager hydration), and may show only keybindings that were
// verified in the product repository.
//
// The language set comes from getSupportedLanguages(), not a hardcoded list, so
// a newly registered locale fails here until each figure gains its key.

const FIGURES = ['VimCommandIndex.astro', 'VimInDwpLoop.astro'] as const;

// Chords verified in the product repository (deepworkplan-vim at d0af923; the
// plan's claims ledger rows C-01 to C-07 and C-27). Adding a chord here is a
// claims decision, not a formatting choice.
const VERIFIED_CHORDS = new Set([
  'SPC h h',
  'SPC P',
  'SPC m p',
  'SPC m r',
  '<C-a>',
  'SPC y',
  'SPC t f',
  'SPC t t',
  'SPC x',
  'SPC n',
  'SPC t h',
  'SPC m p · SPC m r',
]);

const languages = getSupportedLanguages();

const mapBlock = (source: string, figure: string): string => {
  const start = source.indexOf('const i18n = {');
  expect(start, `${figure}: inline i18n map not found`).toBeGreaterThan(-1);
  const end = source.indexOf('} as const', start);
  expect(end, `${figure}: i18n map not closed with "as const"`).toBeGreaterThan(
    start
  );
  return source.slice(start + 'const i18n = '.length, end + 1);
};

type Entry = Record<string, string | string[]>;

const loadMap = (source: string, figure: string): Record<string, Entry> =>
  new Function(`return (${mapBlock(source, figure)});`)() as Record<
    string,
    Entry
  >;

describe.each(FIGURES)('%s i18n contract', (figure) => {
  const source = readFileSync(
    resolve(process.cwd(), 'src/components/diagrams/kit', figure),
    'utf8'
  );
  const map = loadMap(source, figure);

  it('declares an entry for every supported language', () => {
    for (const lang of languages) {
      expect(map[lang], `${figure}: missing language ${lang}`).toBeDefined();
    }
    expect(Object.keys(map).sort()).toEqual([...languages].sort());
  });

  it('gives every language the same keys and array lengths as English', () => {
    const en = map.en;
    for (const lang of languages) {
      expect(Object.keys(map[lang]).sort(), `${figure}/${lang}`).toEqual(
        Object.keys(en).sort()
      );
      for (const key of Object.keys(en)) {
        const reference = en[key];
        const value = map[lang][key];
        if (Array.isArray(reference)) {
          expect(Array.isArray(value), `${figure}/${lang}/${key}`).toBe(true);
          expect((value as string[]).length, `${figure}/${lang}/${key}`).toBe(
            reference.length
          );
        }
      }
    }
  });

  it('has no blank strings and no exclamation marks in any language', () => {
    for (const lang of languages) {
      for (const [key, value] of Object.entries(map[lang])) {
        for (const text of Array.isArray(value) ? value : [value]) {
          expect(text.trim(), `${figure}/${lang}/${key}`).not.toBe('');
          expect(text, `${figure}/${lang}/${key}`).not.toMatch(/[!！¡]/);
        }
      }
    }
  });

  it('never copies the English text into another language', () => {
    for (const lang of languages.filter((code) => code !== 'en')) {
      expect(map[lang].aria, `${figure}/${lang}`).not.toBe(map.en.aria);
    }
  });

  it('falls back to English and exposes the figure as an image', () => {
    expect(source).toContain('?? i18n.en');
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={t.aria}');
    expect(source).not.toMatch(/client:(load|idle|visible|only)/);
  });

  it('shows only keybindings verified in the product repository', () => {
    const quoted = [
      ...source.matchAll(/'((?:SPC|<C-)[A-Za-z0-9<> ·-]*)'/g),
    ].map((match) => match[1]);
    expect(quoted.length).toBeGreaterThan(0);
    for (const chord of quoted) {
      expect(VERIFIED_CHORDS.has(chord), `${figure}: ${chord}`).toBe(true);
    }
  });
});

describe('VimCommandIndex rows', () => {
  const source = readFileSync(
    resolve(process.cwd(), 'src/components/diagrams/kit/VimCommandIndex.astro'),
    'utf8'
  );
  const map = loadMap(source, 'VimCommandIndex.astro');
  const chordCount = [
    ...source
      .slice(source.indexOf('const chords = ['), source.indexOf('] as const'))
      .matchAll(/'[^']+'/g),
  ].length;

  it('has one localized description per chord in every language', () => {
    for (const lang of languages) {
      expect((map[lang].rows as string[]).length, lang).toBe(chordCount);
    }
  });

  it('keeps the headline chords, which carry the product tour', () => {
    for (const chord of ['SPC h h', 'SPC P', 'SPC m p', 'SPC m r', '<C-a>']) {
      expect(source).toContain(`'${chord}'`);
    }
  });
});
