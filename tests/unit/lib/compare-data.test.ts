import { describe, expect, it } from 'vitest';

import {
  ALTERNATIVE_IDS,
  ALTERNATIVES,
  CAPABILITY_IDS,
  CELL_VALUES,
  COMPARE_REVIEWED_ON,
  getAlternative,
  getCell,
} from '@/lib/compare-data';

/**
 * Data invariants for the /compare page. The content policy requires every
 * alternative to be described with the same neutral vocabulary, every fact to
 * trace to an official https source, and the review date to be visible; these
 * tests keep the data module honest so the page cannot drift from that policy.
 */

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe('compare-data: shape', () => {
  it('lists Deep Work Plan first and the ids in display order', () => {
    expect(ALTERNATIVES[0].id).toBe('dwp');
    expect(ALTERNATIVES.map((a) => a.id)).toEqual([...ALTERNATIVE_IDS]);
  });

  it('uses unique kebab-case ids', () => {
    const ids = ALTERNATIVES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(KEBAB_CASE);
    }
  });

  it('has a cell for every capability on every alternative', () => {
    for (const alt of ALTERNATIVES) {
      for (const capability of CAPABILITY_IDS) {
        expect(alt.cells[capability], `${alt.id}.${capability}`).toBeDefined();
      }
      expect(Object.keys(alt.cells).sort()).toEqual([...CAPABILITY_IDS].sort());
    }
  });

  it('uses only the three neutral cell values', () => {
    for (const alt of ALTERNATIVES) {
      for (const value of Object.values(alt.cells)) {
        expect(CELL_VALUES).toContain(value);
      }
    }
  });
});

describe('compare-data: sources and review date', () => {
  it('points every alternative at an official https homepage and docs URL', () => {
    for (const alt of ALTERNATIVES) {
      expect(alt.homepage).toMatch(/^https:\/\//);
      expect(alt.docsUrl).toMatch(/^https:\/\//);
    }
  });

  it('carries an ISO review date', () => {
    expect(COMPARE_REVIEWED_ON).toMatch(ISO_DATE);
    expect(Number.isNaN(Date.parse(COMPARE_REVIEWED_ON))).toBe(false);
  });
});

describe('compare-data: Deep Work Plan row', () => {
  it('is built in for the nine DWP capabilities and not in scope for living specs', () => {
    const dwp = getAlternative('dwp');
    for (const capability of CAPABILITY_IDS) {
      const expected =
        capability === 'brownfieldSpecs' ? 'not-in-scope' : 'built-in';
      expect(dwp.cells[capability], capability).toBe(expected);
    }
  });

  it('exposes cells through getCell', () => {
    expect(getCell('dwp', 'conformanceChecker')).toBe('built-in');
    expect(getCell('openspec', 'brownfieldSpecs')).toBe('built-in');
    expect(getCell('vendor-native', 'toolAgnostic')).toBe('not-in-scope');
  });
});
