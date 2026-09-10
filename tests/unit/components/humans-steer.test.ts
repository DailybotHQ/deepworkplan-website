import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Source-contract test for the Act I home plate. HumansSteer.astro is a
// static, zero-JS component whose entire user-visible surface (statement,
// points, alt, aria-label) comes from its inline i18n map — so the contract
// is asserted against the component source itself, the same way
// tests/unit/lib/translations.test.ts pins the central translations surface.

const source = readFileSync(
  resolve(process.cwd(), 'src/components/diagrams/home/HumansSteer.astro'),
  'utf8'
);

// Occurrence count of an exact substring in the component source.
const count = (needle: string): number => source.split(needle).length - 1;

// The 17 active site languages in the exact key order of CoreLoop.astro, the
// reference component (docs/DIAGRAM_COMPONENTS.md §4).
const LANGUAGES = [
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
] as const;

// A top-level `xx: {` entry of the inline i18n map (two-space indent).
const LANG_KEY = /^ {2}(\w{2}): \{/gm;

// ─── i18n contract ─────────────────────────────────────

describe('HumansSteer i18n source contract', () => {
  it('declares exactly the 17 language keys, in the CoreLoop order', () => {
    const declared = [...source.matchAll(LANG_KEY)].map((m) => m[1]);
    expect(declared).toEqual([...LANGUAGES]);
  });

  it('contains the mandatory en fallback expression', () => {
    expect(source).toContain('i18n[lang as keyof typeof i18n] ?? i18n.en');
  });

  it('binds the localized aria-label on the role="img" figure', () => {
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={t.ariaLabel}');
  });

  it('binds the localized alt on both rasters', () => {
    expect(count('alt={t.alt}')).toBe(2);
  });

  it('hardcodes no user-visible copy outside the i18n map', () => {
    // Every EN string appears exactly once — inside the map — and the markup
    // renders via {t.…} expressions, so none of it is duplicated as literal
    // template text.
    const enCopy = [
      'Act I of the Deep Work Plan story: humans steer and agents execute. You bring the intent, the acceptance criteria and the review; agents carry out the execution, task by task; and the plan is the contract between them.',
      'Humans steer. Agents execute.',
      'You: intent, acceptance criteria, review',
      'Agents: execution, task by task',
      'The plan: the contract between them',
      'Engraving of a ship at sea: the hand of the captain holds the wheel at the helm, the crew works the sails, and a bold course line runs across the plate.',
    ];
    for (const copy of enCopy) {
      expect(count(copy)).toBe(1);
    }
  });
});

// ─── Art layer contract ────────────────────────────────

describe('HumansSteer art layer source contract', () => {
  it('references both exact raster paths', () => {
    expect(count('src="/images/visuals/home/plate-humans-steer.png"')).toBe(1);
    expect(
      count('src="/images/visuals/home/plate-humans-steer-dark.png"')
    ).toBe(1);
  });

  it('applies the plate-frame-img aspect-ratio class to both rasters', () => {
    // .plate-frame-img (global.css) is the explicit aspect-ratio: 16 / 10
    // carrier — both images of the light/dark pair must wear it.
    expect(count('class="plate-frame-img ')).toBe(2);
  });

  it('carries explicit dimensions and lazy loading on both rasters', () => {
    expect(count('width="1600"')).toBe(2);
    expect(count('height="1000"')).toBe(2);
    expect(count('loading="lazy"')).toBe(2);
  });

  it('wires the light/dark pair per the Hero pattern', () => {
    expect(count('dark:hidden')).toBe(1);
    expect(count('hidden dark:block')).toBe(1);
  });
});

// ─── Text layer + zero-JS contract ─────────────────────

describe('HumansSteer text layer source contract', () => {
  it('renders the statement as a paragraph with one emphasis span', () => {
    expect(source).toContain('<p class="plate-statement">');
    expect(count('<span class="plate-statement-em ea-accent">')).toBe(1);
  });

  it('contains no heading — role="img" figures hold no headings', () => {
    expect(source).not.toMatch(/<h[1-6][\s>]/);
  });

  it('renders the points as plate-points rows composing the ea-label', () => {
    expect(source).toContain('<ul class="plate-points">');
    expect(source).toContain('<span class="ea-label">');
  });

  it('ships zero JavaScript', () => {
    expect(source).not.toContain('<script');
    expect(source).not.toContain('client:');
  });
});
