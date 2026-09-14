import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES } from '@/lib/language-codes';
import { REDIRECT_PAIRS } from '@/lib/redirect-map';

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
  it('has one rule per language per redirect pair, in `source destination status` form', () => {
    expect(ruleLines).toHaveLength(
      LANGUAGE_CODES.length * REDIRECT_PAIRS.length
    );
    for (const line of ruleLines) {
      expect(line).toMatch(/^\/\S+ \/\S+ \d{3}$/);
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
    for (const { status } of REDIRECT_PAIRS) {
      expect(status).toBe(301);
    }
  });
});
