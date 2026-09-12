import { describe, expect, it } from 'vitest';

import {
  DEPRECATED_PATHS,
  type DeprecationEntry,
  deprecationHeadersFor,
} from '@/lib/deprecation';

const TEST_ENTRY: DeprecationEntry = {
  sunset: 'Mon, 01 Jun 2026 00:00:00 GMT',
  link: 'https://deepworkplan.com/api/v2/index.json',
  deprecatedSince: 1767225600,
};

// ─── production map ─────────────────────────────────────

describe('deprecationHeadersFor (production map)', () => {
  it('ships empty — every current path is a no-op', () => {
    expect(DEPRECATED_PATHS.size).toBe(0);
  });

  it('returns null for any path against the empty production map', () => {
    for (const pathname of [
      '/',
      '/api/health.json',
      '/api/mcp',
      '/api/v1/index.json',
      '/methodology/overview',
      '/definitely/not/deprecated',
    ]) {
      expect(deprecationHeadersFor(pathname)).toBeNull();
    }
  });
});

// ─── injected entries (header shape + matching rules) ───

describe('deprecationHeadersFor (injected map)', () => {
  const map = new Map<string, DeprecationEntry>([
    ['/api/v0/status.json', TEST_ENTRY],
    ['/api/v0/*', TEST_ENTRY],
  ]);

  it('renders RFC 9745 Deprecation, RFC 8594 Sunset, and a deprecation Link', () => {
    const headers = deprecationHeadersFor('/api/v0/status.json', map);
    expect(headers).toEqual({
      Deprecation: 'true@1767225600',
      Sunset: 'Mon, 01 Jun 2026 00:00:00 GMT',
      Link: '<https://deepworkplan.com/api/v2/index.json>; rel="deprecation"',
    });
  });

  it('matches exact pathnames', () => {
    expect(deprecationHeadersFor('/api/v0/status.json', map)).not.toBeNull();
  });

  it('matches a prefix/* wildcard for deeper paths', () => {
    expect(
      deprecationHeadersFor('/api/v0/anything/else.json', map)
    ).not.toBeNull();
  });

  it('does not match when the prefix only shares characters', () => {
    // "/api/v0/*" prefixes "/api/v0/" — "/api/v01.json" must NOT match.
    expect(deprecationHeadersFor('/api/v01.json', map)).toBeNull();
  });

  it('returns null for untouched paths', () => {
    expect(deprecationHeadersFor('/api/v1/index.json', map)).toBeNull();
    expect(deprecationHeadersFor('/', map)).toBeNull();
  });

  it('prefers the longest matching wildcard prefix', () => {
    const deeper = new Map<string, DeprecationEntry>([
      ['/api/v0/*', { ...TEST_ENTRY, link: 'https://example.com/base' }],
      [
        '/api/v0/reports/*',
        { ...TEST_ENTRY, link: 'https://example.com/reports' },
      ],
    ]);
    expect(deprecationHeadersFor('/api/v0/reports/x.json', deeper)?.Link).toBe(
      '<https://example.com/reports>; rel="deprecation"'
    );
  });
});
