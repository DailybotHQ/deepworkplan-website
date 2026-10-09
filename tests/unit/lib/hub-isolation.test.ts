import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import vitestConfig from '../../../vitest.config';

// This repository is also the DeepWorkPlan ecosystem hub: scripts/repositories.sh
// clones the ecosystem repositories into repositories/<name>. Those clones are
// separate projects with their own toolchains, so no site tool may pick up a
// file under repositories/ — not TypeScript (astro check), the Vite dev
// watcher, Biome, Vitest, Tailwind's source scan, or the Cloudflare Pages
// build (which publishes dist/ only). Each check below fails when a config
// change would let one of them in.

const root = process.cwd();
const read = (path: string): string =>
  readFileSync(resolve(root, path), 'utf8');

describe('ecosystem hub isolation', () => {
  it('git-ignores every clone but tracks the index and the manifest', () => {
    const lines = read('.gitignore')
      .split('\n')
      .map((line) => line.trim());
    expect(lines).toContain('repositories/*');
    expect(lines).toContain('!repositories/README.md');
    expect(lines).toContain('!repositories/manifest.json');
    const negations = lines.filter((line) => line.startsWith('!repositories'));
    expect(negations).toEqual([
      '!repositories/README.md',
      '!repositories/manifest.json',
    ]);
  });

  it('keeps repositories/ out of the TypeScript project (astro check)', () => {
    const tsconfig = JSON.parse(read('tsconfig.json')) as {
      include: string[];
      exclude: string[];
    };
    expect(tsconfig.exclude).toContain('repositories');
    for (const pattern of tsconfig.include) {
      expect(pattern.startsWith('repositories')).toBe(false);
    }
  });

  it('keeps repositories/ out of the Vite dev watcher', () => {
    const astroConfig = read('astro.config.mjs');
    const ignored = astroConfig.slice(astroConfig.indexOf('ignored: ['));
    expect(ignored.slice(0, ignored.indexOf(']'))).toContain(
      "'**/repositories/**'"
    );
  });

  it('keeps repositories/ out of Biome', () => {
    const biome = JSON.parse(read('biome.json')) as {
      vcs: { useIgnoreFile: boolean };
      files: { includes: string[] };
    };
    expect(biome.vcs.useIgnoreFile).toBe(true);
    expect(biome.files.includes).toContain('!**/repositories');
    const positive = biome.files.includes.filter((p) => !p.startsWith('!'));
    for (const pattern of positive) {
      expect(pattern).toMatch(/^(src|scripts|tests)\//);
    }
  });

  it('keeps repositories/ out of Vitest collection', () => {
    const test = vitestConfig.test ?? {};
    expect(test.exclude).toContain('**/repositories/**');
    for (const pattern of test.include ?? []) {
      expect(pattern).toMatch(/^tests\//);
    }
  });

  it('never points a Tailwind @source at repositories/', () => {
    // Tailwind v4 scans the project and skips git-ignored paths, so the
    // .gitignore rule above covers it; an explicit @source must not undo that.
    const sources = read('src/styles/global.css')
      .split('\n')
      .filter((line) => /^\s*@source\s+(?!not\b)/.test(line));
    for (const line of sources) {
      expect(line).not.toMatch(/repositories|"\.\.\/\.\.\/?"|'\.\.\/\.\.\/?'/);
    }
  });

  it('never imports site or edge code from repositories/', () => {
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) {
          walk(path);
        } else if (/\.(astro|svelte|ts|mjs|js|css|mdx?)$/.test(entry)) {
          const text = readFileSync(path, 'utf8');
          if (
            /(from\s+|import\s*\(\s*|glob\s*\(\s*)['"`][^'"`]*repositories\//.test(
              text
            )
          ) {
            offenders.push(path);
          }
        }
      }
    };
    walk(resolve(root, 'src'));
    walk(resolve(root, 'functions'));
    expect(offenders).toEqual([]);
  });

  it('publishes dist/ only (Cloudflare Pages build output)', () => {
    const astroConfig = read('astro.config.mjs');
    expect(astroConfig).not.toMatch(/outDir:\s*['"][^'"]*repositories/);
    expect(astroConfig).not.toMatch(/publicDir:\s*['"]\.\/?['"]/);
  });
});
