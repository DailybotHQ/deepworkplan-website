import { describe, expect, it } from 'vitest';

import {
  type EventContext,
  tryServeJsonAssetAsMarkdownTwin,
} from '../../../functions/_middleware';

// ─── Fake ASSETS binding ───────────────────────────────────────────────────

const FAKE_ASSETS: Record<string, { body: string; contentType: string }> = {
  '/api/health.json': {
    body: JSON.stringify({ status: 'ok', version: '5.0.9' }),
    contentType: 'application/json',
  },
  '/.well-known/api-catalog': {
    body: JSON.stringify({
      linkset: [{ anchor: 'https://deepworkplan.com/' }],
    }),
    contentType:
      'application/linkset+json;profile="https://www.rfc-editor.org/info/rfc9727"',
  },
  '/about': {
    body: '<!doctype html><title>About</title>',
    contentType: 'text/html; charset=utf-8',
  },
};

function makeContext(pathname: string): EventContext {
  return {
    request: new Request(`https://deepworkplan.com${pathname}`),
    env: {
      ASSETS: {
        fetch: async (input: Request | string) => {
          const path = new URL(typeof input === 'string' ? input : input.url)
            .pathname;
          const asset = FAKE_ASSETS[path];
          if (!asset) return new Response('not found', { status: 404 });
          return new Response(asset.body, {
            status: 200,
            headers: { 'Content-Type': asset.contentType },
          });
        },
      },
    },
    next: async () => new Response(null),
    waitUntil: () => {},
  };
}

describe('tryServeJsonAssetAsMarkdownTwin', () => {
  it('serves a markdown twin for a JSON /api/* asset requested by literal .md suffix', async () => {
    const response = await tryServeJsonAssetAsMarkdownTwin(
      makeContext('/api/health.json.md')
    );
    expect(response).not.toBeNull();
    expect(response?.status).toBe(200);
    expect(response?.headers.get('content-type')).toContain('text/markdown');
    const body = await response?.text();
    expect(body).toContain('# api/health.json');
    expect(body).toContain(
      'Canonical JSON: https://deepworkplan.com/api/health.json'
    );
    expect(body).toContain('```json');
    expect(body).toContain('"status": "ok"');
  });

  it('serves a markdown twin for a JSON /.well-known/* asset with no extension', async () => {
    const response = await tryServeJsonAssetAsMarkdownTwin(
      makeContext('/.well-known/api-catalog.md')
    );
    expect(response).not.toBeNull();
    expect(response?.headers.get('content-type')).toContain('text/markdown');
    const body = await response?.text();
    expect(body).toContain('# .well-known/api-catalog');
    expect(body).toContain('"linkset"');
  });

  it('returns null when the underlying asset does not exist', async () => {
    const response = await tryServeJsonAssetAsMarkdownTwin(
      makeContext('/api/nonexistent.json.md')
    );
    expect(response).toBeNull();
  });

  it('returns null when the underlying asset is not JSON', async () => {
    // Not under /api/ or /.well-known/ in the first place, but also not JSON —
    // confirms the content-type guard even if the path guard were absent.
    const response = await tryServeJsonAssetAsMarkdownTwin(
      makeContext('/about.md')
    );
    expect(response).toBeNull();
  });

  it('does not touch a request that is not .md-suffixed', async () => {
    const response = await tryServeJsonAssetAsMarkdownTwin(
      makeContext('/api/health.json')
    );
    expect(response).toBeNull();
  });
});
