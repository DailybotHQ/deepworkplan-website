import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getSupportedLanguages } from '@/lib/i18n';

// Source-contract test for the kit index ecosystem plate (KitEcosystem.astro):
// the 17-language i18n contract of docs/DIAGRAM_COMPONENTS.md §4 (identical key
// sets and array lengths in every language, an `en` fallback, no blank values,
// no eager hydration), plus its facts: every row links an existing kit page in
// every language and pins exactly the tags of the v7 claims ledger
// (PLAN_004_v7_kit_pages_and_vendor, rows C-11/C-21/C-31/C-39; amendments A2,
// A4, A7 and A8). Changing a pin here is a claims decision, not a formatting choice.

const SOURCE_PATH = resolve(
  process.cwd(),
  'src/components/diagrams/kit/KitEcosystem.astro'
);
const source = readFileSync(SOURCE_PATH, 'utf8');
const languages = getSupportedLanguages();

const PINS: Record<string, string> = {
  herdr: 'herdr-peers@v0.1.0',
  agentkit: 'coding-agents-kit@v0.1.1',
  devcontainer: 'devcontainer-kit@v0.1.4',
  vim: 'deepworkplan-vim@v0.4.2',
};

type Entry = Record<string, string | string[]>;

const loadMap = (): Record<string, Entry> => {
  const start = source.indexOf('const i18n = {');
  const end = source.indexOf('} as const', start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  return new Function(
    `return (${source.slice(start + 'const i18n = '.length, end + 1)});`
  )() as Record<string, Entry>;
};

const loadProducts = (): { key: string; product: string; tag: string }[] => {
  const block = source.slice(
    source.indexOf('const products = ['),
    source.indexOf('] as const')
  );
  return [
    ...block.matchAll(
      /key: '([a-z-]+)',\s*product: '([a-z-]+)',\s*repo: '[^']+',\s*tag: '([^']+)'/g
    ),
  ].map((m) => ({ key: m[1], product: m[2], tag: m[3] }));
};

describe('KitEcosystem i18n contract', () => {
  const map = loadMap();

  it('declares an entry for every supported language', () => {
    expect(Object.keys(map).sort()).toEqual([...languages].sort());
  });

  it('gives every language the same keys and array lengths as English', () => {
    const en = map.en;
    for (const lang of languages) {
      expect(Object.keys(map[lang]).sort(), lang).toEqual(
        Object.keys(en).sort()
      );
      for (const key of Object.keys(en)) {
        if (Array.isArray(en[key])) {
          expect((map[lang][key] as string[]).length, `${lang}/${key}`).toBe(
            en[key].length
          );
        }
      }
    }
  });

  it('has no blank strings and no exclamation marks in any language', () => {
    for (const lang of languages) {
      for (const [key, value] of Object.entries(map[lang])) {
        for (const text of Array.isArray(value) ? value : [value]) {
          expect(text.trim(), `${lang}/${key}`).not.toBe('');
          expect(text, `${lang}/${key}`).not.toMatch(/[!！¡]/);
        }
      }
    }
  });

  it('never copies the English text into another language', () => {
    for (const lang of languages.filter((code) => code !== 'en')) {
      expect(map[lang].intro, lang).not.toBe(map.en.intro);
    }
  });

  it('falls back to English and ships no client JavaScript', () => {
    expect(source).toContain('?? i18n.en');
    expect(source).not.toMatch(/client:(load|idle|visible|only)/);
    expect(source).not.toMatch(/<script/);
  });
});

describe('KitEcosystem facts', () => {
  const products = loadProducts();
  const map = loadMap();

  it('pins exactly the ledger tags, one role per product', () => {
    expect(
      Object.fromEntries(products.map((p) => [p.key, `${p.product}@${p.tag}`]))
    ).toEqual(PINS);
    expect((map.en.roles as string[]).length).toBe(products.length);
  });

  it('links an existing kit page for every row in every language', () => {
    for (const { key } of products) {
      for (const lang of languages) {
        const base = resolve(process.cwd(), 'src/content/kit', lang, key);
        expect(
          existsSync(`${base}.md`) || existsSync(`${base}.mdx`),
          `${lang}/${key}`
        ).toBe(true);
      }
    }
  });

  it('names the stable pack release', () => {
    expect(source).toContain("const packTag = 'v7.0.0';");
  });
});
