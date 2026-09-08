import { describe, expect, it } from 'vitest';

import {
  buildAgentRecoveryMarkdown,
  buildApiError,
  isApiPath,
  RECOVERY_LINKS,
} from '@/lib/agent-recovery';

// ─── buildApiError ──────────────────────────────────────

describe('buildApiError', () => {
  it('builds a structured error with code, message, hint, and docs', () => {
    const body = buildApiError(
      'not_found',
      'Unknown API path: /api/nope',
      'See the catalog.'
    );
    expect(body).toEqual({
      error: {
        code: 'not_found',
        message: 'Unknown API path: /api/nope',
        hint: 'See the catalog.',
        docs: 'https://deepworkplan.com/openapi.json',
      },
    });
  });

  it('omits hint when not provided but always includes code and message', () => {
    const body = buildApiError('method_not_allowed', 'Use POST.');
    expect(body.error.hint).toBeUndefined();
    expect(body.error.code).toBe('method_not_allowed');
    expect(body.error.message).toBe('Use POST.');
  });
});

// ─── isApiPath ──────────────────────────────────────────

describe('isApiPath', () => {
  it('matches the /api namespace with and without trailing segments', () => {
    expect(isApiPath('/api')).toBe(true);
    expect(isApiPath('/api/')).toBe(true);
    expect(isApiPath('/api/mcp')).toBe(true);
    expect(isApiPath('/api/health.json')).toBe(true);
  });

  it('does not match paths that merely start with "api"', () => {
    expect(isApiPath('/apiary')).toBe(false);
    expect(isApiPath('/')).toBe(false);
    expect(isApiPath('/developers')).toBe(false);
  });
});

// ─── buildAgentRecoveryMarkdown ─────────────────────────

describe('buildAgentRecoveryMarkdown', () => {
  it('is a 404 document pointing at the sitemap, llms.txt, and developers portal', () => {
    const md = buildAgentRecoveryMarkdown();
    expect(md).toContain('# 404 — Not Found');
    expect(md).toContain('https://deepworkplan.com/sitemap-index.xml');
    expect(md).toContain('https://deepworkplan.com/llms.txt');
    expect(md).toContain('https://deepworkplan.com/developers');
    expect(md).toContain('https://deepworkplan.com/openapi.json');
  });

  it('uses markdown link syntax with the caller-supplied origin', () => {
    const md = buildAgentRecoveryMarkdown('https://example.org');
    expect(md).toContain(
      '- [Sitemap (every page)](https://example.org/sitemap-index.xml)'
    );
    expect(md).not.toContain('deepworkplan.com/methodology');
  });

  it('lists only recovery targets that exist on the site', () => {
    const known = new Set([
      '/',
      '/sitemap-index.xml',
      '/llms.txt',
      '/llms-full.txt',
      '/developers',
      '/methodology',
      '/spec',
      '/kit',
      '/examples',
      '/quickstart',
      '/init',
    ]);
    for (const link of RECOVERY_LINKS) {
      expect(known.has(link.path)).toBe(true);
    }
    expect(RECOVERY_LINKS.length).toBe(known.size);
  });
});
