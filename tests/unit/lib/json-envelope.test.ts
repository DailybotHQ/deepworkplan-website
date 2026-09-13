import { describe, expect, it } from 'vitest';

import {
  buildPageJsonEnvelope,
  detectLanguageFromPathname,
  extractTitleFromMarkdown,
  JSON_ENVELOPE_CONTENT_FORMAT,
  prefersJsonOverHtml,
} from '@/lib/json-envelope';

// ─── prefersJsonOverHtml — precedence matrix ────────────

describe('prefersJsonOverHtml', () => {
  it('treats a real browser Accept header (text/html first) as HTML', () => {
    expect(
      prefersJsonOverHtml(
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      )
    ).toBe(false);
  });

  it('treats a wildcard Accept as HTML (unchanged default)', () => {
    expect(prefersJsonOverHtml('*/*')).toBe(false);
  });

  it('treats an empty Accept header as HTML', () => {
    expect(prefersJsonOverHtml('')).toBe(false);
  });

  it('prefers the JSON envelope for an explicit application/json Accept', () => {
    expect(prefersJsonOverHtml('application/json')).toBe(true);
  });

  it('lets Markdown win over JSON when both are present', () => {
    expect(prefersJsonOverHtml('text/markdown, application/json')).toBe(false);
    expect(prefersJsonOverHtml('application/json, text/markdown')).toBe(false);
  });

  it('lets HTML win over JSON when both are present', () => {
    expect(prefersJsonOverHtml('application/json, text/html')).toBe(false);
  });

  it('is case-insensitive', () => {
    expect(prefersJsonOverHtml('APPLICATION/JSON')).toBe(true);
    expect(prefersJsonOverHtml('TEXT/HTML')).toBe(false);
  });

  it('accepts +json suffix types (e.g. application/ld+json)', () => {
    expect(prefersJsonOverHtml('application/ld+json')).toBe(true);
    expect(prefersJsonOverHtml('application/vnd.api+json')).toBe(true);
  });

  it('does not treat plain text/plain or text/markdown-adjacent types as JSON', () => {
    expect(prefersJsonOverHtml('text/plain')).toBe(false);
  });
});

// ─── extractTitleFromMarkdown ────────────────────────────

describe('extractTitleFromMarkdown', () => {
  it('extracts the first H1 heading', () => {
    const md = '# About the methodology\n\n> Description.\n\nBody text.';
    expect(extractTitleFromMarkdown(md, '/about')).toBe(
      'About the methodology'
    );
  });

  it('trims surrounding whitespace from the heading', () => {
    expect(extractTitleFromMarkdown('#   Padded Title  \n\nBody', '/x')).toBe(
      'Padded Title'
    );
  });

  it('falls back to the provided fallback when there is no heading', () => {
    expect(extractTitleFromMarkdown('No heading here.', '/about')).toBe(
      '/about'
    );
  });

  it('finds the first heading even when it is not on line one', () => {
    const md = 'Language: en\nCanonical: https://x\n\n# Real Title\n\nBody';
    expect(extractTitleFromMarkdown(md, '/x')).toBe('Real Title');
  });
});

// ─── detectLanguageFromPathname ──────────────────────────

describe('detectLanguageFromPathname', () => {
  it('detects a known language code as the first path segment', () => {
    expect(detectLanguageFromPathname('/es/about')).toBe('es');
    expect(detectLanguageFromPathname('/zh/methodology/x')).toBe('zh');
  });

  it('defaults to en for the root path', () => {
    expect(detectLanguageFromPathname('/')).toBe('en');
  });

  it('defaults to en for an unprefixed path', () => {
    expect(detectLanguageFromPathname('/about')).toBe('en');
  });

  it('defaults to en for a first segment that looks like a language but is not registered', () => {
    expect(detectLanguageFromPathname('/xx/about')).toBe('en');
  });
});

// ─── buildPageJsonEnvelope ────────────────────────────────

const recovery = {
  llmsTxt: 'https://deepworkplan.com/llms.txt',
  sitemap: 'https://deepworkplan.com/sitemap-index.xml',
  openapi: 'https://deepworkplan.com/openapi.json',
  developers: 'https://deepworkplan.com/developers',
};

describe('buildPageJsonEnvelope', () => {
  it('builds the full envelope shape for a page mirror', () => {
    const envelope = buildPageJsonEnvelope({
      url: 'https://deepworkplan.com/about',
      pathname: '/about',
      markdown: '# About the methodology\n\nBody.',
      recovery,
    });

    expect(envelope).toEqual({
      url: 'https://deepworkplan.com/about',
      contentFormat: 'markdown',
      title: 'About the methodology',
      markdown: '# About the methodology\n\nBody.',
      language: 'en',
      recovery,
    });
  });

  it('reports the detected language for a localized path', () => {
    const envelope = buildPageJsonEnvelope({
      url: 'https://deepworkplan.com/es/about',
      pathname: '/es/about',
      markdown: '# Sobre la metodología\n\nCuerpo.',
      recovery,
    });

    expect(envelope.language).toBe('es');
    expect(envelope.title).toBe('Sobre la metodología');
  });

  it('always uses the "markdown" content format constant', () => {
    expect(JSON_ENVELOPE_CONTENT_FORMAT).toBe('markdown');
    const envelope = buildPageJsonEnvelope({
      url: 'https://deepworkplan.com/',
      pathname: '/',
      markdown: 'no heading',
      recovery,
    });
    expect(envelope.contentFormat).toBe(JSON_ENVELOPE_CONTENT_FORMAT);
  });

  it('falls back to the pathname as title when the markdown has no heading', () => {
    const envelope = buildPageJsonEnvelope({
      url: 'https://deepworkplan.com/init',
      pathname: '/init',
      markdown: 'Plain body with no heading.',
      recovery,
    });
    expect(envelope.title).toBe('/init');
  });
});
