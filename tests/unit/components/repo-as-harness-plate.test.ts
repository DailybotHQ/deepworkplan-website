import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// ─── Source-contract test for RepoAsHarnessPlate (Task 6) ──────────────
//
// The plate is a static .astro component, so its contract is asserted
// directly on the source text (the style of tests/unit/lib/translations
// .test.ts, applied to a source-contract check): the 17-language inline
// i18n map, the en fallback, the a11y bindings, the light/dark raster
// pair, the HTML tag chips, and the isolation from the methodology
// RepoAsHarness diagram (one component per use case).

// Resolved from the process cwd (the repo root under `vitest run`) rather
// than import.meta.url, which happy-dom serves over http://, not file://.
const COMPONENT_PATH = resolve(
  process.cwd(),
  'src/components/diagrams/home/RepoAsHarnessPlate.astro'
);
const source = readFileSync(COMPONENT_PATH, 'utf8');

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

const BRAND_TAGS = ['SPEC', 'TASKS', 'CHECKS', 'STATE', 'TOOLS'] as const;

// ─── Helpers: parse the inline i18n map out of the frontmatter ─────────

/** Top-level `xx: { … }` blocks of the `const i18n = { … } as const` map. */
function extractLanguageBlocks(mapBody: string): Record<string, string> {
  const heads = [...mapBody.matchAll(/^ {2}([a-z]{2}): \{$/gm)];
  const blocks: Record<string, string> = {};
  heads.forEach((match, i) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = i + 1 < heads.length ? heads[i + 1].index : mapBody.length;
    blocks[match[1]] = mapBody.slice(start, end);
  });
  return blocks;
}

const mapBody =
  source.match(/const i18n = \{([\s\S]*?)\n\} as const;/)?.[1] ?? '';
const blocks = extractLanguageBlocks(mapBody);

/** Values of a `key: ['…', '…']` array property inside one language block. */
function parseStringArray(block: string, key: string): string[] {
  const arrayBody =
    block.match(new RegExp(`\\b${key}: \\[([\\s\\S]*?)\\]`))?.[1] ?? '';
  return [...arrayBody.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
}

/** Value of a `key: '…'` string property inside one language block. */
function parseString(block: string, key: string): string {
  // In a template literal each regex backslash must be doubled, so the
  // string value below carries the `[^'\\]` / `\\.` regex sources verbatim.
  return (
    block.match(new RegExp(`\\b${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1] ?? ''
  );
}

// Frontmatter (`---` fences) vs markup template + scoped styles.
const parts = source.split(/^---$/m);

// ─── Structure ─────────────────────────────────────────────────────────

describe('RepoAsHarnessPlate source contract', () => {
  it('has frontmatter fences splitting source and template', () => {
    expect(parts).toHaveLength(3);
  });

  it('declares all 17 language keys in the canonical order', () => {
    expect(Object.keys(blocks)).toEqual([...LANGUAGES]);
  });

  it('uses the en fallback expression for unknown languages', () => {
    expect(source).toContain('i18n[lang as keyof typeof i18n] ?? i18n.en');
  });

  it('binds role="img" and the localized aria-label on the figure', () => {
    expect(source).toContain(
      `class={\`editorial-asset editorial-plate \${className}\`}`
    );
    expect(source).toContain('role="img"');
    expect(source).toContain('aria-label={t.ariaLabel}');
  });

  it('sets an explicit 16/10 aspect ratio on the plate art frame', () => {
    expect(source).toMatch(/aspect-ratio:\s*16\s*\/\s*10/);
    const imgs = source.match(/<img\b[^>]*>/g) ?? [];
    expect(imgs).toHaveLength(2);
    for (const img of imgs) {
      expect(img).toContain('plate-frame-img');
    }
  });
});

// ─── Raster pair ───────────────────────────────────────────────────────

describe('RepoAsHarnessPlate raster pair', () => {
  it('references the light raster as a lazy, sized, dark-hidden image', () => {
    const light =
      source.match(
        /<img\b[^>]*src="\/images\/visuals\/home\/plate-repo-as-harness\.png"[^>]*>/
      )?.[0] ?? '';
    expect(light).toContain(
      'src="/images/visuals/home/plate-repo-as-harness.png"'
    );
    expect(light).toContain('width="1600"');
    expect(light).toContain('height="1000"');
    expect(light).toContain('loading="lazy"');
    expect(light).toContain('alt={t.alt}');
    expect(light).toContain('class="plate-frame-img dark:hidden"');
  });

  it('references the dark raster as a lazy, sized, light-hidden image', () => {
    const dark =
      source.match(
        /<img\b[^>]*src="\/images\/visuals\/home\/plate-repo-as-harness-dark\.png"[^>]*>/
      )?.[0] ?? '';
    expect(dark).toContain(
      'src="/images/visuals/home/plate-repo-as-harness-dark.png"'
    );
    expect(dark).toContain('width="1600"');
    expect(dark).toContain('height="1000"');
    expect(dark).toContain('loading="lazy"');
    expect(dark).toContain('alt={t.alt}');
    expect(dark).toContain('class="plate-frame-img hidden dark:block"');
  });
});

// ─── Text layer markup ─────────────────────────────────────────────────

describe('RepoAsHarnessPlate text layer', () => {
  it('renders the three points as an unordered plate-points list', () => {
    expect(source).toContain('<ul class="plate-points">');
    expect(source).toContain('{t.points.map((point) => <li>{point}</li>)}');
  });

  it('renders the five tags as HTML plate-tags chips driven by t.tags', () => {
    expect(source).toContain('<ul class="plate-tags">');
    expect(source).toContain('{t.tags.map((tag) => <li>{tag}</li>)}');
  });

  it('wraps the emphasis word in the plate-statement-em span', () => {
    expect(source).toContain(
      '<span class="plate-statement-em">{t.statementEmphasis}</span>'
    );
    expect(source).toContain('<p class="plate-statement">');
  });

  it('contains no heading elements inside the figure', () => {
    const template = parts[2] ?? '';
    expect(template).not.toMatch(/<h[1-6]\b/);
  });
});

// ─── i18n map contract ─────────────────────────────────────────────────

describe('RepoAsHarnessPlate i18n map', () => {
  it('gives every language entry the six contract keys', () => {
    for (const [lang, block] of Object.entries(blocks)) {
      for (const key of [
        'ariaLabel',
        'statement',
        'statementEmphasis',
        'points',
        'tags',
        'alt',
      ]) {
        expect(block, `${lang} should declare ${key}`).toContain(`${key}:`);
      }
    }
  });

  it('carries exactly the five English brand tags in every locale', () => {
    for (const [lang, block] of Object.entries(blocks)) {
      expect(parseStringArray(block, 'tags'), `tags of ${lang}`).toEqual([
        ...BRAND_TAGS,
      ]);
    }
  });

  it('keeps statementEmphasis an exact substring of statement in every locale', () => {
    for (const [lang, block] of Object.entries(blocks)) {
      const statement = parseString(block, 'statement');
      const emphasis = parseString(block, 'statementEmphasis');
      expect(emphasis.length, `${lang} emphasis is non-empty`).toBeGreaterThan(
        0
      );
      expect(
        statement.includes(emphasis),
        `${lang}: statement "${statement}" should contain emphasis "${emphasis}"`
      ).toBe(true);
    }
  });

  it('has exactly three points in every locale', () => {
    for (const [lang, block] of Object.entries(blocks)) {
      expect(
        parseStringArray(block, 'points'),
        `points of ${lang}`
      ).toHaveLength(3);
    }
  });

  it('does not copy the English statement or aria-label into other locales', () => {
    const enBlock = blocks.en ?? '';
    const enStatement = parseString(enBlock, 'statement');
    const enAriaLabel = parseString(enBlock, 'ariaLabel');
    for (const [lang, block] of Object.entries(blocks)) {
      if (lang === 'en') continue;
      expect(
        parseString(block, 'statement'),
        `${lang} statement is a real translation`
      ).not.toBe(enStatement);
      expect(
        parseString(block, 'ariaLabel'),
        `${lang} ariaLabel is a real translation`
      ).not.toBe(enAriaLabel);
    }
  });
});

// ─── Isolation and no hardcoded copy ───────────────────────────────────

describe('RepoAsHarnessPlate isolation', () => {
  it('does not import or reference the methodology RepoAsHarness diagram', () => {
    expect(source).not.toContain('methodology/RepoAsHarness');
    expect(source).not.toMatch(/import\s[^;]*RepoAsHarness(?!Plate)/);
  });

  it('keeps user-visible copy out of the markup template', () => {
    const template = parts[2] ?? '';
    expect(template).not.toContain('The repository is the harness.');
    expect(template).not.toContain('Durable spec on disk');
    expect(template).not.toContain('Editorial plate: the repository');
    expect(template).not.toContain('Engraved illustration');
    for (const tag of BRAND_TAGS) {
      expect(template, `${tag} must render only via t.tags`).not.toContain(
        `>${tag}<`
      );
    }
  });
});
