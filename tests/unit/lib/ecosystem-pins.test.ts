import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ECOSYSTEM_PINS } from '@/lib/ecosystem-pins';

// Ecosystem pin drift guard. `src/lib/ecosystem-pins.ts` is the single list of
// release pins; every public surface that names a DailybotHQ ecosystem release
// — the machine-executable /init.md above all, the kit ecosystem plate, the
// kit, spec, methodology and page Markdown, the quickstart strings — must name
// exactly that tag, and /init.md must publish each release's SHA256SUMS digest.
// Moving a pin is one edit in ecosystem-pins.ts plus every surface this test
// names. Historical release notes (the changelog collection) and the dated
// provenance history in docs/ARCHITECTURE.md are excluded: they record what
// was true then. docs/ECOSYSTEM_CONTEXT.md is in: its table is the hub's
// claim of what the site pins.

const ROOT = process.cwd();

const SURFACES = [
  'README.md',
  'AGENTS.md',
  'docs/ECOSYSTEM_CONTEXT.md',
  'public/init.md',
  'public/llms.txt',
  'public/llms-full.txt',
  'src/content/kit',
  'src/content/spec',
  'src/content/methodology',
  'src/content/pages',
  'src/lib/translations',
  'src/components',
];

const TEXT = /\.(md|mdx|txt|ts|astro)$/;

function collect(path: string, acc: string[] = []): string[] {
  const full = join(ROOT, path);
  if (statSync(full).isDirectory()) {
    for (const entry of readdirSync(full)) collect(join(path, entry), acc);
  } else if (TEXT.test(full)) {
    acc.push(full);
  }
  return acc;
}

const files = SURFACES.flatMap((surface) => collect(surface));
const pins = Object.values(ECOSYSTEM_PINS);
const escapeRe = (text: string): string =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Every way a surface names a release of `repo`; group 1 is the tag.
const tagPatterns = (repo: string): RegExp[] => {
  const r = escapeRe(repo);
  return [
    new RegExp(`DailybotHQ/${r}/tree/(v\\d+\\.\\d+\\.\\d+)`, 'g'),
    new RegExp(`DailybotHQ/${r}/blob/(v\\d+\\.\\d+\\.\\d+)`, 'g'),
    new RegExp(`DailybotHQ/${r}/releases/download/(v\\d+\\.\\d+\\.\\d+)`, 'g'),
    new RegExp(
      `--branch (v\\d+\\.\\d+\\.\\d+) https://github\\.com/DailybotHQ/${r}\\b`,
      'g'
    ),
    // The kit product table, in every language (`, tag`, `, Tag`, `、タグ`, …).
    new RegExp(
      `\`DailybotHQ/${r}\`[,、] ?[^\`|\\n]{1,12}\`(v\\d+\\.\\d+\\.\\d+)\``,
      'g'
    ),
    // A linked product with its pin in the parenthetical, in every language
    // (spec addons: `(\`dck\`, pinned \`v…\`` / `fijado en \`v…\``).
    new RegExp(
      `\\[${r}\\]\\([^)]*\\) [(（][^)）\\n]*?\`(v\\d+\\.\\d+\\.\\d+)\``,
      'g'
    ),
    new RegExp(
      `\\[${r}\\]\\([^)]*\\)[^\\n]*?pinned \`(v\\d+\\.\\d+\\.\\d+)\``,
      'g'
    ),
    new RegExp(`\\b${r} \`(v\\d+\\.\\d+\\.\\d+)\``, 'g'),
    // Plain prose and a Markdown link followed by the tag (llms.txt).
    new RegExp(`\\b${r} (v\\d+\\.\\d+\\.\\d+)\\b`, 'g'),
    new RegExp(`\\[${r}\\]\\([^)]*\\) (v\\d+\\.\\d+\\.\\d+)\\b`, 'g'),
    new RegExp(`\\b${r}@(v\\d+\\.\\d+\\.\\d+)`, 'g'),
    // A table row that starts with the repository (init.md, ECOSYSTEM_CONTEXT,
    // the indented quickstart table).
    new RegExp(`^ *\\| ${r} \\|[^\\n]*?\\| \`(v\\d+\\.\\d+\\.\\d+)\``, 'gm'),
  ];
};

// The drift case reads every public surface synchronously; like
// schema-urls.test.ts it is load-sensitive, so the suite carries an explicit
// 30 s timeout instead of vitest's 5 s default (docs/TESTING_GUIDE.md).
describe('ecosystem pins', { timeout: 30_000 }, () => {
  it('lists well-formed pins', () => {
    for (const pin of pins) {
      expect(pin.tag, pin.repo).toMatch(/^v\d+\.\d+\.\d+$/);
      if (pin.sha256sums !== null) {
        expect(pin.sha256sums, pin.repo).toMatch(/^[0-9a-f]{64}$/);
      }
    }
  });

  it('every surface names exactly the pinned tag of each release', () => {
    const drift: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const pin of pins) {
        for (const pattern of tagPatterns(pin.repo)) {
          for (const match of text.matchAll(pattern)) {
            if (match[1] !== pin.tag) {
              drift.push(
                `${relative(ROOT, file)}: ${pin.repo} ${match[1]} (pin ${pin.tag})`
              );
            }
          }
        }
      }
    }
    expect(drift).toEqual([]);
  });

  it('init.md publishes every pin with its SHA256SUMS digest', () => {
    const init = readFileSync(join(ROOT, 'public/init.md'), 'utf8');
    for (const pin of pins) {
      const row = new RegExp(
        `^\\s*\\| ${escapeRe(pin.repo)} \\| \`${escapeRe(pin.tag)}\` \\| (.+) \\|$`,
        'm'
      ).exec(init);
      expect(
        row,
        `${pin.repo} row in the Pinned releases table`
      ).not.toBeNull();
      if (pin.sha256sums === null) {
        expect(row?.[1], pin.repo).toMatch(/^none published/);
      } else {
        expect(row?.[1], pin.repo).toBe(`\`${pin.sha256sums}\``);
      }
    }
  });

  it('the kit ecosystem plate pins the same tags', () => {
    const plate = readFileSync(
      join(ROOT, 'src/components/diagrams/kit/KitEcosystem.astro'),
      'utf8'
    );
    for (const key of ['herdr', 'agentkit', 'devcontainer', 'vim'] as const) {
      const pin = ECOSYSTEM_PINS[key];
      expect(plate, key).toMatch(
        new RegExp(
          `repo: 'https://github\\.com/DailybotHQ/${escapeRe(pin.repo)}',\\s*tag: '${escapeRe(pin.tag)}'`
        )
      );
    }
    expect(plate).toContain(`const packTag = '${ECOSYSTEM_PINS.pack.tag}';`);
  });

  it('the vendored skills match the pins', () => {
    const vendored = (skill: string): string =>
      readFileSync(
        join(ROOT, `.agents/skills/${skill}/SKILL.md`),
        'utf8'
      ).match(/^version: "(\d+\.\d+\.\d+)"/m)?.[1] ?? '0.0.0';
    const parts = (v: string): number[] =>
      v
        .replace(/^v/, '')
        .split('.')
        .map((n) => Number.parseInt(n, 10));
    const notOlder = (a: string, b: string): boolean => {
      const [x, y] = [parts(a), parts(b)];
      for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
      return true;
    };
    // The pack is repo-adapted and moves only by an explicit change: exact.
    expect(`v${vendored('deepworkplan')}`).toBe(ECOSYSTEM_PINS.pack.tag);
    // The release workflow refreshes these two on every merge to main, so
    // the vendored copy may run ahead of the published pin, never behind it.
    for (const [skill, key] of [
      ['ai-diff-reviewer', 'reviewer'],
      ['dailybot', 'dailybot'],
    ] as const) {
      expect(
        notOlder(vendored(skill), ECOSYSTEM_PINS[key].tag),
        `${skill} vendored ${vendored(skill)} vs pin ${ECOSYSTEM_PINS[key].tag}`
      ).toBe(true);
    }
  });
});
