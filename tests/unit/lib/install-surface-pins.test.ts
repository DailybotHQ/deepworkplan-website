import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

// Install-surface drift guard. Every public surface that tells a person or an
// agent how to install the Deep Work Plan skill must pin the release this site
// vendors (or a newer one) — never an older tag — and every pinned
// `npx skills add` line must use the tree-URL form
// (`https://github.com/<owner>/<repo>/tree/<tag>`): the skills CLI does not
// honour `owner/repo@<ref>` (a tag, `latest` or a branch), so that form
// silently installs the default branch
// (vendored deepworkplan shared/install-verification.md). The vendored version
// comes from .agents/skills/deepworkplan/SKILL.md, so a pack upgrade that
// forgets a surface fails here. Historical release notes (the changelog
// collection, CHANGELOG.md) are excluded: they record what was true then.

const ROOT = process.cwd();

const SURFACES = [
  'README.md',
  'CONTRIBUTING.md',
  'public/init.md',
  'public/llms.txt',
  'public/llms-full.txt',
  'public/.well-known/dwp-trust.json',
  'public/.well-known/dwp.json',
  'public/openapi.json',
  'src/content/pages',
  'src/content/kit',
  'src/content/spec',
  'src/content/methodology',
  'src/lib/translations',
  'src/components',
];

const TEXT = /\.(md|mdx|txt|json|ts|astro)$/;

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

const vendored = (readFileSync(
  join(ROOT, '.agents/skills/deepworkplan/SKILL.md'),
  'utf8'
).match(/^version: "(\d+\.\d+\.\d+)"/m) ?? [])[1];

const parts = (version: string): number[] =>
  version.split('.').map((n) => Number.parseInt(n, 10));

const older = (pin: string, base: string): boolean => {
  const [a, b] = [parts(pin), parts(base)];
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
};

describe('public install surfaces', () => {
  it('reads the vendored pack version', () => {
    expect(vendored).toMatch(/^\d+\.\d+\.\d+$/);
    expect(files.length).toBeGreaterThan(100);
  });

  it('never pin a Deep Work Plan skill older than the vendored pack', () => {
    const stale: string[] = [];
    const pin =
      /deepworkplan-skill(?:@v|\/tree\/v|\/releases\/download\/v)(\d+\.\d+\.\d+)(?![-\w])/g;
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(pin)) {
        if (older(match[1], vendored as string)) {
          stale.push(`${relative(ROOT, file)}: v${match[1]}`);
        }
      }
    }
    expect(
      stale,
      `stale skill pins (vendored ${vendored}):\n${stale.join('\n')}`
    ).toEqual([]);
  });

  it('never install the Deep Work Plan skill unpinned', () => {
    // `skills add [owner/]deepworkplan-skill` (or its GitHub URL without
    // `/tree/<tag>`) installs the default branch, not a release.
    const unpinned: string[] = [];
    const bare =
      /skills add (?:https:\/\/github\.com\/)?(?:DailybotHQ\/)?deepworkplan-skill(?![\w/@.-])/g;
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(bare)) {
        unpinned.push(`${relative(ROOT, file)}: ${match[0]}`);
      }
    }
    expect(
      unpinned,
      `unpinned deepworkplan-skill installs:\n${unpinned.join('\n')}`
    ).toEqual([]);
  });

  it('pin every skills install with the tree-URL form the CLI honours', () => {
    const ignored: string[] = [];
    // Any `owner/repo@<ref>` (a tag, `latest`, a branch): the CLI does not honour it.
    const atForm = /skills add [A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+@[A-Za-z0-9]/g;
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      for (const match of text.matchAll(atForm)) {
        ignored.push(`${relative(ROOT, file)}: ${match[0]}`);
      }
    }
    expect(
      ignored,
      `owner/repo@tag pins the skills CLI ignores:\n${ignored.join('\n')}`
    ).toEqual([]);
  });
});
