import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { DEFAULT_LANGUAGE_CODE, LANGUAGE_CODES } from '@/lib/language-codes';

/**
 * Structural contract for the agent API surface. The spec is a static file
 * (public/openapi.json) hand-maintained alongside the site, so these tests
 * keep it honest: unique operationIds, described operations, typed params,
 * enums in sync with the language registry, and versions stamped from
 * package.json (scripts/stamp-versions.mjs). Vitest runs from the repo root,
 * so static artifacts are read via process.cwd().
 */

const spec = JSON.parse(
  readFileSync(resolve(process.cwd(), 'public/openapi.json'), 'utf8')
) as {
  openapi: string;
  info: { version: string; contact: { email: string } };
  paths: Record<string, Record<string, Record<string, unknown>>>;
  components: { schemas: Record<string, unknown> };
};

const pkg = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')
) as {
  version: string;
};

type Operation = {
  operationId?: string;
  description?: string;
  responses?: Record<string, unknown>;
};

function operations(): [string, string, Operation][] {
  const ops: [string, string, Operation][] = [];
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(item)) {
      if (typeof op === 'object' && op !== null && 'responses' in op) {
        ops.push([path, method, op as Operation]);
      }
    }
  }
  return ops;
}

describe('public/openapi.json — document', () => {
  it('is OpenAPI 3.1 on the production origin', () => {
    expect(spec.openapi).toMatch(/^3\.1\.\d+$/);
    expect(operations().length).toBeGreaterThan(10);
  });

  it('carries the release version and a public contact', () => {
    expect(spec.info.version).toBe(pkg.version);
    expect(spec.info.contact.email).toBe('security@dailybot.com');
  });
});

describe('public/openapi.json — operations', () => {
  it('gives every operation a unique operationId', () => {
    const ids = operations().map(([, , op]) => op.operationId);
    expect(ids.every((id) => typeof id === 'string' && id.length > 0)).toBe(
      true
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('describes every operation and defines its responses', () => {
    for (const [path, method, op] of operations()) {
      expect(op.description, `${method} ${path} description`).toBeTruthy();
      expect(
        Object.keys(op.responses ?? {}),
        `${method} ${path} responses`
      ).not.toHaveLength(0);
    }
  });

  it('documents the MCP endpoint as a POST with examples and error schemas', () => {
    const mcp = spec.paths['/api/mcp']?.post as Record<string, unknown>;
    expect(mcp).toBeDefined();
    expect(mcp['x-mcp-transport']).toBe('streamable-http');
    const examples = (
      mcp.requestBody as {
        content: Record<string, { examples: Record<string, unknown> }>;
      }
    ).content['application/json'].examples;
    expect(Object.keys(examples)).toEqual(
      expect.arrayContaining(['initialize', 'toolsList', 'readPage'])
    );
    expect(Object.keys(mcp.responses as object)).toEqual(
      expect.arrayContaining(['200', '202', '400', '405', '415'])
    );
  });

  it('documents the health endpoint and the structured API error schema', () => {
    expect(spec.paths['/api/health.json']?.get).toBeDefined();
    expect(spec.components.schemas.ApiError).toBeDefined();
    expect(spec.components.schemas.JsonRpcRequest).toBeDefined();
    expect(spec.components.schemas.JsonRpcResponse).toBeDefined();
    expect(spec.components.schemas.HealthStatus).toBeDefined();
  });

  it('keeps the language enum in sync with the non-default active languages', () => {
    const langParam = (
      spec.paths['/{lang}/{page}.md']['parameters'] as {
        name: string;
        schema: { enum: string[] };
      }[]
    ).find((p) => p.name === 'lang');
    const expected = LANGUAGE_CODES.filter(
      (code) => code !== DEFAULT_LANGUAGE_CODE
    );
    expect(langParam?.schema.enum.sort()).toEqual([...expected].sort());
  });

  it('keeps the page enum aligned with the site pages (incl. developers & privacy)', () => {
    const pageParam = (
      spec.paths['/{page}.md']['parameters'] as {
        name: string;
        schema: { enum: string[] };
      }[]
    ).find((p) => p.name === 'page');
    for (const slug of [
      'developers',
      'privacy',
      'init',
      'methodology',
      'trust',
    ]) {
      expect(pageParam?.schema.enum).toContain(slug);
    }
  });
});

describe('public/openapi.json — v1 family, typed schemas, header contracts', () => {
  const HTTP_METHODS = [
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'head',
    'options',
  ];

  function operationOf(path: string, method: string) {
    return spec.paths[path]?.[method] as
      | {
          operationId?: string;
          responses?: Record<
            string,
            {
              headers?: Record<string, unknown>;
              content?: Record<string, { schema?: Record<string, unknown> }>;
            }
          >;
        }
      | undefined;
  }

  /** JSON media types whose schemas must be inline-typed objects. */
  const JSON_MEDIA = ['application/json', 'application/linkset+json'];

  it('registers the four /api/v1/ GET operations with unique ids', () => {
    const expected: Record<string, string> = {
      '/api/v1/index.json': 'getApiV1Index',
      '/api/v1/sections.json': 'getApiV1Sections',
      '/api/v1/pages.json': 'getApiV1Pages',
      '/api/v1/health.json': 'getApiV1Health',
    };
    for (const [path, id] of Object.entries(expected)) {
      const op = operationOf(path, 'get');
      expect(op, path).toBeDefined();
      expect(op.operationId).toBe(id);
    }
  });

  it('gives every JSON-serving operation an inline typed object schema (no bare $ref)', () => {
    for (const [path, item] of Object.entries(spec.paths)) {
      for (const method of HTTP_METHODS) {
        const op = item[method] as
          | {
              responses?: Record<
                string,
                {
                  content?: Record<
                    string,
                    { schema?: Record<string, unknown> }
                  >;
                }
              >;
            }
          | undefined;
        if (!op?.responses) continue;
        for (const [code, resp] of Object.entries(op.responses)) {
          if (!code.startsWith('2')) continue;
          for (const [media, ct] of Object.entries(resp.content ?? {})) {
            if (!JSON_MEDIA.includes(media)) continue;
            const schema = ct.schema ?? {};
            const isTypedObject =
              schema.type === 'object' &&
              Object.keys((schema.properties as object) ?? {}).length > 0;
            const isTypedArray =
              schema.type === 'array' &&
              Object.keys(
                ((schema.items as Record<string, unknown>)
                  ?.properties as object) ?? {}
              ).length > 0;
            expect(
              { path, method, media, isTypedObject, isTypedArray },
              `${method} ${path} ${code} ${media}`
            ).toMatchObject({ isTypedObject: true, isTypedArray: false });
            expect(
              schema.$ref,
              `${method} ${path} ${media} must not be $ref-only`
            ).toBeUndefined();
          }
        }
      }
    }
  });

  it('declares the rate-limit and version headers on the six API operations', () => {
    const sixOps: [string, string][] = [
      ['/api/v1/index.json', 'get'],
      ['/api/v1/sections.json', 'get'],
      ['/api/v1/pages.json', 'get'],
      ['/api/v1/health.json', 'get'],
      ['/api/health.json', 'get'],
      ['/api/mcp', 'post'],
    ];
    const requiredHeaders = [
      'RateLimit-Limit',
      'RateLimit-Remaining',
      'RateLimit-Reset',
      'RateLimit-Policy',
      'X-API-Version',
    ];
    for (const [path, method] of sixOps) {
      const op = operationOf(path, method);
      expect(op, path).toBeDefined();
      const ok = Object.entries(op.responses ?? {}).find(
        ([code]) => code.startsWith('2') && code !== '204'
      );
      expect(ok, `${method} ${path} has a 2xx response`).toBeDefined();
      const headers = Object.keys(ok![1].headers ?? {});
      for (const header of requiredHeaders) {
        expect(headers, `${method} ${path} declares ${header}`).toContain(
          header
        );
      }
    }
  });

  it('declares 429 with Retry-After on the six API operations', () => {
    const sixOps: [string, string][] = [
      ['/api/v1/index.json', 'get'],
      ['/api/v1/sections.json', 'get'],
      ['/api/v1/pages.json', 'get'],
      ['/api/v1/health.json', 'get'],
      ['/api/health.json', 'get'],
      ['/api/mcp', 'post'],
    ];
    for (const [path, method] of sixOps) {
      const resp = operationOf(path, method)?.responses?.['429'];
      expect(resp, `${method} ${path} 429`).toBeDefined();
      expect(
        Object.keys(resp?.headers ?? {}),
        `${method} ${path} 429 Retry-After`
      ).toContain('Retry-After');
    }
  });

  it('documents the versioning/deprecation policy in info.description', () => {
    expect(spec.info.description).toContain('/api/v1/');
    expect(spec.info.description).toContain('Sunset');
    expect(spec.info.description).toContain('RateLimit');
  });

  it('honesty guard: application/json only on API-family endpoints', () => {
    for (const [path, item] of Object.entries(spec.paths)) {
      for (const method of HTTP_METHODS) {
        const op = item[method] as {
          responses?: Record<string, { content?: Record<string, unknown> }>;
        };
        if (!op?.responses) continue;
        for (const resp of Object.values(op.responses)) {
          for (const media of Object.keys(resp.content ?? {})) {
            if (media !== 'application/json') continue;
            expect(
              path.startsWith('/api/') ||
                path.startsWith('/.well-known/') ||
                path.startsWith('/openapi'),
              `${method} ${path} declares application/json outside the API family`
            ).toBe(true);
          }
        }
      }
    }
  });
});

describe('agent artifacts stay version-stamped', () => {
  it('health.json, mcp.json, and the server card match package.json', () => {
    const readJson = (rel: string) =>
      JSON.parse(readFileSync(resolve(process.cwd(), rel), 'utf8'));
    const health = readJson('public/api/health.json');
    const mcpManifest = readJson('public/.well-known/mcp.json');
    const serverCard = readJson('public/.well-known/mcp/server-card.json');
    expect(health.version).toBe(pkg.version);
    expect(health.status).toBe('ok');
    expect(mcpManifest.version).toBe(pkg.version);
    expect(mcpManifest.transport.url).toBe('https://deepworkplan.com/api/mcp');
    expect(serverCard.serverInfo.version).toBe(pkg.version);
    expect(serverCard.transport.endpoint).toBe(
      'https://deepworkplan.com/api/mcp'
    );
  });
});
