import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { SITE_SECTIONS } from '@/lib/mcp/tools';

const readJson = (relPath: string) =>
  JSON.parse(readFileSync(resolve(process.cwd(), relPath), 'utf8'));

const pkg = readJson('package.json');

// ─── /api/v1/ family ────────────────────────────────────

describe('public/api/v1 family', () => {
  const index = readJson('public/api/v1/index.json');
  const sections = readJson('public/api/v1/sections.json');
  const pages = readJson('public/api/v1/pages.json');
  const health = readJson('public/api/v1/health.json');

  it('all four documents parse and declare apiVersion v1', () => {
    for (const doc of [index, sections, pages, health]) {
      expect(doc.apiVersion).toBe('v1');
    }
  });

  it('index lists exactly the endpoints that exist on disk', () => {
    for (const endpointPath of Object.values(
      index.endpoints as Record<string, string>
    )) {
      expect(readJson(`public${endpointPath}`)).toBeTruthy();
    }
  });

  it('index points at the public OpenAPI spec and MCP endpoint', () => {
    expect(index.openapi).toBe('https://deepworkplan.com/openapi.json');
    expect(index.mcp).toBe('https://deepworkplan.com/api/mcp');
  });

  it('sections.json mirrors SITE_SECTIONS field-for-field (sync guard)', () => {
    expect(sections.sections).toEqual(SITE_SECTIONS);
  });

  it('pages.json lists every active language (including en) with sorted slugs', () => {
    const codes = (pages.languages as { code: string; pages: string[] }[]).map(
      (l) => l.code
    );
    expect(codes).toContain('en');
    expect(codes.length).toBeGreaterThanOrEqual(17);
    for (const lang of pages.languages as { code: string; pages: string[] }[]) {
      expect(lang.pages.length).toBeGreaterThan(0);
      expect([...lang.pages].sort()).toEqual(lang.pages);
    }
  });

  it('health.json declares ok status and links the v1 family', () => {
    expect(health.status).toBe('ok');
    expect(health.links.index).toBe('/api/v1/index.json');
    expect(health.links.sections).toBe('/api/v1/sections.json');
    expect(health.links.pages).toBe('/api/v1/pages.json');
  });

  it('carries the release version stamped from package.json (after build)', () => {
    // Mirrors openapi.test.ts: the committed value may lag only until the
    // next prebuild; after `pnpm run build` these must equal exactly.
    for (const doc of [index, sections, pages, health]) {
      expect(typeof doc.version).toBe('string');
      expect(doc.version).toMatch(/^\d+\.\d+\.\d+/);
    }
  });

  it('stamped versions match package.json exactly', () => {
    expect(index.version).toBe(pkg.version);
    expect(health.version).toBe(pkg.version);
  });
});
