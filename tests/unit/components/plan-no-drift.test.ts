import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// Source-contract test for the Act II plate. PlanNoDrift is a static .astro
// component, so its contract — the 17-language i18n map, en fallback, a11y
// bindings, light/dark raster pair, ordered loop stages, and "no user-visible
// copy outside the map" — is asserted against the component's source text
// (the style of tests/unit/lib/translations.test.ts, applied to a source).

// Resolved from the process cwd (the repo root under `vitest run`) rather
// than import.meta.url, which happy-dom serves over http://, not file://.
const componentPath = resolve(
  process.cwd(),
  'src/components/diagrams/home/PlanNoDrift.astro'
);
const source = readFileSync(componentPath, 'utf8');

// Everything after the closing frontmatter fence is the markup template.
const fencePositions = Array.from(
  source.matchAll(/^---$/gm),
  (match) => match.index ?? 0
);
const templateStart = (fencePositions[1] ?? 0) + 3;
const frontmatter = source.slice(0, templateStart);
const template = source.slice(templateStart);

// The canonical site language order (mirrors CoreLoop.astro's i18n map).
const EXPECTED_LANGUAGES = [
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

// Every locale entry declares exactly these keys.
const ENTRY_KEYS = [
  'ariaLabel',
  'statement',
  'statementEmphasis',
  'points',
  'alt',
] as const;

// ─── i18n map ──────────────────────────────────────────

describe('PlanNoDrift i18n map', () => {
  it('declares all 17 site languages, in the canonical order', () => {
    const declared = Array.from(
      frontmatter.matchAll(/^ {2}([a-z]{2}): \{$/gm),
      (match) => match[1]
    );
    expect(declared).toEqual(EXPECTED_LANGUAGES);
  });

  it('gives every locale exactly the five contract keys', () => {
    for (const key of ENTRY_KEYS) {
      const count = (frontmatter.match(new RegExp(`^ {4}${key}:`, 'gm')) ?? [])
        .length;
      expect(count, `${key} entries`).toBe(EXPECTED_LANGUAGES.length);
    }
  });

  it('declares exactly five loop stages per locale', () => {
    const blocks = Array.from(
      frontmatter.matchAll(/points: \[([\s\S]*?)\]/g),
      (match) => match[1] ?? ''
    );
    expect(blocks.length).toBe(EXPECTED_LANGUAGES.length);
    for (const [index, block] of blocks.entries()) {
      const items = Array.from(block.matchAll(/'[^']*'/g));
      expect(items.length, `point count in locale #${index + 1}`).toBe(5);
    }
  });

  it('keeps statementEmphasis an exact substring of statement in all 17 locales', () => {
    // Biome quotes a string with double quotes when it would otherwise need
    // an escaped apostrophe (EN "can't"), so both quote styles are accepted.
    const statements = Array.from(
      frontmatter.matchAll(
        /^ {4}statement:\s*(?:"([^"]*)"|'((?:\\'|[^'])*)'),\s*$/gm
      ),
      (match) => (match[1] ?? match[2] ?? '').replace(/\\'/g, "'")
    );
    const emphases = Array.from(
      frontmatter.matchAll(/^ {4}statementEmphasis:\s*'([^']*)',\s*$/gm),
      (match) => match[1] ?? ''
    );
    expect(statements.length).toBe(EXPECTED_LANGUAGES.length);
    expect(emphases.length).toBe(EXPECTED_LANGUAGES.length);
    for (const [index, emphasis] of emphases.entries()) {
      expect(
        statements[index],
        `emphasis substring in locale #${index + 1}`
      ).toContain(emphasis);
    }
  });

  it('uses the mandatory en fallback expression', () => {
    expect(source).toContain('i18n[lang as keyof typeof i18n] ?? i18n.en');
  });
});

// ─── Markup contract ───────────────────────────────────

describe('PlanNoDrift markup contract', () => {
  it('binds role="img" with the localized aria-label on the plate figure', () => {
    expect(template).toContain('editorial-asset editorial-plate');
    expect(template).toContain('role="img"');
    expect(template).toContain('aria-label={t.ariaLabel}');
  });

  it('renders the light/dark raster pair with dimensions, lazy loading and the aspect-ratio frame class', () => {
    expect(template).toContain(
      'src="/images/visuals/home/plate-plan-no-drift.png"'
    );
    expect(template).toContain(
      'src="/images/visuals/home/plate-plan-no-drift-dark.png"'
    );
    // .plate-frame-img carries the explicit 16/10 aspect-ratio (global.css).
    expect(template).toContain('class="plate-frame-img dark:hidden"');
    expect(template).toContain('class="plate-frame-img hidden dark:block"');
    expect(template.match(/alt=\{t\.alt\}/g)?.length).toBe(2);
    expect(template.match(/width="1600"/g)?.length).toBe(2);
    expect(template.match(/height="1000"/g)?.length).toBe(2);
    expect(template.match(/loading="lazy"/g)?.length).toBe(2);
  });

  it('renders the five loop stages as an ordered list from the i18n map', () => {
    expect(template).toContain('<ol class="plate-points">');
    expect(template).not.toContain('<ul');
    expect(template).toMatch(/points\.map\(/);
    expect(template).toContain('<span class="ea-label">{point}</span>');
  });

  it('wraps the emphasized statement word in the emphasis span', () => {
    expect(template).toContain('<p class="plate-statement">');
    expect(template).toContain(
      '<span class="plate-statement-em">{t.statementEmphasis}</span>'
    );
  });

  it('hardcodes no user-visible copy outside the i18n map', () => {
    expect(template).not.toContain("A plan agents can't drift from");
    expect(template).not.toContain('Atomic tasks');
    expect(template).not.toContain('Validation gates');
    expect(template).not.toContain('Resumable state');
    expect(template).not.toContain('Engraved illustration');
    expect(template).not.toContain('Editorial plate:');
  });

  it('is static markup: no scripts, no islands, no headings inside the figure', () => {
    expect(template).not.toContain('<script');
    expect(template).not.toContain('client:');
    expect(template).not.toMatch(/<h[1-6][\s>]/);
  });
});
