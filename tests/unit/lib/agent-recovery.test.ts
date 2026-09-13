import { describe, expect, it } from 'vitest';

import {
  buildAgentRecoveryMarkdown,
  buildApiError,
  explicitlyAcceptsMarkdownOrJson,
  isApiPath,
  prefersMarkdownOverHtml,
  RECOVERY_LINKS,
  recoveryLinkHeaders,
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

// ─── prefersMarkdownOverHtml ────────────────────────────

describe('prefersMarkdownOverHtml', () => {
  it('treats a wildcard Accept (curl, scanners, AI agents) as non-HTML', () => {
    expect(prefersMarkdownOverHtml('*/*')).toBe(true);
  });

  it('treats an empty Accept header as non-HTML', () => {
    expect(prefersMarkdownOverHtml('')).toBe(true);
  });

  it('treats an explicit HTML Accept as HTML (browser keeps the HTML 404)', () => {
    expect(prefersMarkdownOverHtml('text/html')).toBe(false);
  });

  it('treats a real browser Accept header as HTML', () => {
    expect(
      prefersMarkdownOverHtml(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      )
    ).toBe(false);
  });

  it('treats a JSON-only Accept as non-HTML', () => {
    expect(prefersMarkdownOverHtml('application/json')).toBe(true);
  });

  it('treats an explicit Markdown Accept as non-HTML', () => {
    expect(prefersMarkdownOverHtml('text/markdown')).toBe(true);
  });

  it('is case-insensitive on the HTML token', () => {
    expect(prefersMarkdownOverHtml('TEXT/HTML')).toBe(false);
    expect(prefersMarkdownOverHtml('Text/Html,Q=1.0')).toBe(false);
    expect(prefersMarkdownOverHtml('TEXT/MARKDOWN')).toBe(true);
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
      '/compare',
      '/faq',
      '/init',
    ]);
    for (const link of RECOVERY_LINKS) {
      expect(known.has(link.path)).toBe(true);
    }
    expect(RECOVERY_LINKS.length).toBe(known.size);
  });
});

// ─── explicitlyAcceptsMarkdownOrJson ────────────────────

describe('explicitlyAcceptsMarkdownOrJson', () => {
  it('admits an explicit text/markdown Accept', () => {
    expect(explicitlyAcceptsMarkdownOrJson('text/markdown')).toBe(true);
  });

  it('admits an explicit application/json Accept', () => {
    expect(explicitlyAcceptsMarkdownOrJson('application/json')).toBe(true);
  });

  it('admits a +json suffix type', () => {
    expect(explicitlyAcceptsMarkdownOrJson('application/ld+json')).toBe(true);
  });

  it('does not admit a bare wildcard Accept (looks like a stray asset request)', () => {
    expect(explicitlyAcceptsMarkdownOrJson('*/*')).toBe(false);
  });

  it('does not admit an empty Accept header', () => {
    expect(explicitlyAcceptsMarkdownOrJson('')).toBe(false);
  });

  it('does not admit an explicit HTML Accept even if it also lists other types', () => {
    expect(
      explicitlyAcceptsMarkdownOrJson(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      )
    ).toBe(false);
  });

  it('is case-insensitive', () => {
    expect(explicitlyAcceptsMarkdownOrJson('TEXT/MARKDOWN')).toBe(true);
    expect(explicitlyAcceptsMarkdownOrJson('APPLICATION/JSON')).toBe(true);
  });
});

// ─── recoveryLinkHeaders ─────────────────────────────────

describe('recoveryLinkHeaders', () => {
  it('includes sitemap, llms.txt, and developers targets with the caller-supplied origin', () => {
    const header = recoveryLinkHeaders('https://deepworkplan.com');
    expect(header).toContain(
      '<https://deepworkplan.com/sitemap-index.xml>; rel="sitemap"'
    );
    expect(header).toContain(
      '<https://deepworkplan.com/llms.txt>; rel="alternate"; type="text/markdown"'
    );
    expect(header).toContain(
      '<https://deepworkplan.com/developers>; rel="help"'
    );
  });

  it('is a single comma-separated RFC 8288-shaped header value', () => {
    const header = recoveryLinkHeaders('https://example.org');
    const links = header.split(', ');
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toMatch(/^<https:\/\/example\.org\/.+>; rel="[a-z]+"/);
    }
  });
});
