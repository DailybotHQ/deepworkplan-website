import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES } from '@/lib/language-codes';
import { REDIRECT_PAIRS, ROOT_ONLY_REDIRECT_PAIRS } from '@/lib/redirect-map';

/**
 * public/_redirects is generated (scripts/generate-redirects.mjs, run in
 * prebuild) from REDIRECT_PAIRS + the language registry. It is the file
 * Cloudflare Pages actually reads at the edge — a real, single-hop
 * server-side redirect — unlike astro.config.mjs's `redirects` option,
 * which only produces an HTML meta-refresh fallback page for a static
 * build. These tests keep the checked-in file honest: every pair, for
 * every active language, with the right status code, and nothing else.
 */

const redirectsFile = readFileSync(
  resolve(process.cwd(), 'public/_redirects'),
  'utf8'
);

const ruleLines = redirectsFile
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'));

describe('public/_redirects', () => {
  it('has one rule per language per redirect pair plus the root-only pairs, in `source destination status` form', () => {
    expect(ruleLines).toHaveLength(
      LANGUAGE_CODES.length * REDIRECT_PAIRS.length +
        ROOT_ONLY_REDIRECT_PAIRS.length
    );
    for (const line of ruleLines) {
      expect(line).toMatch(/^\/\S+ \/\S+ \d{3}$/);
    }
    // Root-only pairs are apex asset aliases (e.g. /install.sh →
    // /vim/install.sh) — emitted once, never expanded across languages.
    for (const { from, to, status } of ROOT_ONLY_REDIRECT_PAIRS) {
      expect(ruleLines).toContain(`/${from} /${to} ${status}`);
    }
  });

  it('covers every REDIRECT_PAIRS entry for every active language with the right status', () => {
    for (const code of LANGUAGE_CODES) {
      const prefix = code === DEFAULT_LANGUAGE_CODE ? '' : `/${code}`;
      for (const { from, to, status } of REDIRECT_PAIRS) {
        expect(ruleLines).toContain(
          `${prefix}/${from} ${prefix}/${to} ${status}`
        );
      }
    }
  });

  it('never redirects a path to itself', () => {
    for (const line of ruleLines) {
      const [source, destination] = line.split(' ');
      expect(source).not.toBe(destination);
    }
  });

  it('only uses permanent (301) redirects for these aliases', () => {
    for (const { status } of [...REDIRECT_PAIRS, ...ROOT_ONLY_REDIRECT_PAIRS]) {
      expect(status).toBe(301);
    }
  });

  it('keeps DeepWorkPlan Vim documented once: /vim and /vim.md redirect to the kit page', () => {
    const vim = REDIRECT_PAIRS.find((pair) => pair.from === 'vim');
    const vimMd = REDIRECT_PAIRS.find((pair) => pair.from === 'vim.md');
    expect(vim).toEqual({ from: 'vim', to: 'kit/vim', status: 301 });
    expect(vimMd).toEqual({ from: 'vim.md', to: 'kit/vim.md', status: 301 });
    // The installer is a static file under /vim/ and must never be a source.
    expect(REDIRECT_PAIRS.some((pair) => pair.from.startsWith('vim/'))).toBe(
      false
    );
  });

  it('aliases the apex installer and its checksum to /vim/', () => {
    expect(ROOT_ONLY_REDIRECT_PAIRS).toContainEqual({
      from: 'install.sh',
      to: 'vim/install.sh',
      status: 301,
    });
    expect(ROOT_ONLY_REDIRECT_PAIRS).toContainEqual({
      from: 'install.sh.sha256',
      to: 'vim/install.sh.sha256',
      status: 301,
    });
  });
});
