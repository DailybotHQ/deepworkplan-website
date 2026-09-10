import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getSupportedLanguages } from '@/lib/i18n';

/**
 * Source-contract test for the Act III home plate (DoneIsAContract.astro).
 * The plate is a static, zero-JS .astro component, so its contract is
 * asserted against the component source text (the same style as
 * tests/unit/lib/openapi.test.ts reading static artifacts via process.cwd()):
 * the 17-language inline i18n map, the en fallback, the a11y bindings, the
 * raster pair, and the no-hardcoded-copy rule.
 */

const COMPONENT_PATH = 'src/components/diagrams/home/DoneIsAContract.astro';

const source = readFileSync(resolve(process.cwd(), COMPONENT_PATH), 'utf8');

// Everything outside the inline i18n map (doc comment, helpers, template) —
// no user-visible English copy may live here.
const template = source.replace(/const i18n = \{[\s\S]*\n\} as const;/, '');

type PlateStrings = {
  lang: string;
  ariaLabel: string;
  statement: string;
  statementEmphasis: string;
  points: string[];
  alt: string;
};

function value(body: string, key: string): string {
  const match = new RegExp(`${key}:\\s+'(.*)',`).exec(body);
  return match ? match[1] : '';
}

function parseLangBlocks(src: string): PlateStrings[] {
  return [...src.matchAll(/\n {2}([a-z]{2}): \{([\s\S]*?)\n {2}\},/g)].map(
    (match) => {
      const [, lang, body] = match;
      const pointsMatch = /points: \[([\s\S]*?)\],/.exec(body);
      const points = pointsMatch
        ? [...pointsMatch[1].matchAll(/'([^']*)'/g)].map((m) => m[1])
        : [];
      return {
        lang,
        ariaLabel: value(body, 'ariaLabel'),
        statement: value(body, 'statement'),
        statementEmphasis: value(body, 'statementEmphasis'),
        points,
        alt: value(body, 'alt'),
      };
    }
  );
}

const blocks = parseLangBlocks(source);
const en = blocks.find((block) => block.lang === 'en');

// ─── Component source contract ─────────────────────────

describe('DoneIsAContract source contract', () => {
  it('declares every supported language, in registry order', () => {
    const declared = [...source.matchAll(/^ {2}([a-z]{2}): \{$/gm)].map(
      (match) => match[1]
    );
    expect(declared).toEqual([...getSupportedLanguages()]);
  });

  it('falls back to English for unsupported languages', () => {
    expect(source).toContain('i18n[lang as keyof typeof i18n] ?? i18n.en');
  });

  it('binds the figure as a labelled image', () => {
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={t.ariaLabel}');
  });

  it('renders the statement as a paragraph with the emphasis bound', () => {
    expect(source).toContain('<p class="plate-statement">');
    expect(source).toContain(
      '<span class="plate-statement-em">{t.statementEmphasis}</span>'
    );
  });

  it('keeps an explicit aspect ratio on the art frame', () => {
    expect(source).toContain('aspect-ratio: 16 / 10');
    expect(source).toContain('plate-frame-img');
  });

  it('references the canonical light and dark rasters', () => {
    expect(source).toContain(
      'src="/images/visuals/home/plate-done-is-a-contract.png"'
    );
    expect(source).toContain(
      'src="/images/visuals/home/plate-done-is-a-contract-dark.png"'
    );
    expect(source.match(/width="1600"/g)).toHaveLength(2);
    expect(source.match(/height="1000"/g)).toHaveLength(2);
    expect(source.match(/loading="lazy"/g)).toHaveLength(2);
    expect(source.match(/alt=\{t\.alt\}/g)).toHaveLength(2);
    expect(source).toContain('class="plate-frame-img dark:hidden"');
    expect(source).toContain('class="plate-frame-img hidden dark:block"');
  });

  it('renders the four contract terms as point-row labels', () => {
    expect(source).toContain('<ul class="plate-points">');
    expect(source).toContain('<span class="ea-label">{point}</span>');
  });

  it('keeps all user-visible copy inside the i18n map', () => {
    const englishCopy = [
      'Done is a contract, not a vibe.',
      'Tests pass',
      'Types check',
      'Acceptance criteria met',
      'Or the task stays open',
      'Editorial plate: done is a contract',
      'Engraved illustration of a hand',
    ];
    for (const copy of englishCopy) {
      expect(template.includes(copy)).toBe(false);
    }
  });
});

// ─── i18n content quality ──────────────────────────────

describe('DoneIsAContract i18n content', () => {
  it('parses one block per supported language', () => {
    expect(blocks.map((block) => block.lang)).toEqual([
      ...getSupportedLanguages(),
    ]);
  });

  it('gives every locale the five keys with non-empty values', () => {
    for (const block of blocks) {
      expect(block.ariaLabel).not.toBe('');
      expect(block.statement).not.toBe('');
      expect(block.statementEmphasis).not.toBe('');
      expect(block.alt).not.toBe('');
      expect(block.points).toHaveLength(4);
      for (const point of block.points) {
        expect(point).not.toBe('');
      }
    }
  });

  it('emphasis is a substring of the statement in every locale', () => {
    for (const block of blocks) {
      expect(block.statement.includes(block.statementEmphasis)).toBe(true);
    }
  });

  it('no locale copies the English statement', () => {
    for (const block of blocks) {
      if (block.lang === 'en') continue;
      expect(block.statement).not.toBe(en?.statement);
    }
  });

  it('keeps the English contract terms in order', () => {
    expect(en?.points).toEqual([
      'Tests pass',
      'Types check',
      'Acceptance criteria met',
      'Or the task stays open',
    ]);
  });
});
