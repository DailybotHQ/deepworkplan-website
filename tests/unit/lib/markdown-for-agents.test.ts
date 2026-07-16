import { describe, expect, it } from 'vitest';

import {
  buildMarkdownAccessLine,
  serializePageToAgentMarkdown,
  serializeReaderEntryToAgentMarkdown,
} from '@/lib/markdown-for-agents';

// ─── Mock Data ─────────────────────────────────────────

const mockPage = {
  id: 'en/about',
  data: {
    title: 'About — Deep Work Plan',
    description: 'Technology Enthusiast and Lifelong Learner.',
    lastUpdated: new Date('2026-03-09'),
  },
  body: '## About\n\nDeep Work Plan is a methodology for AI coding agents.',
};

const mockPageNoLastUpdated = {
  id: 'es/contact',
  data: {
    title: 'Contacto — Deep Work Plan',
    description: 'Conectemos y construyamos algo juntos.',
  },
  body: '## Ponte en Contacto\n\nSiempre abierto a conversaciones.',
};

const EN_ACCESS_LINE =
  'Markdown: send header `Accept: text/markdown` on any URL to receive Markdown instead of HTML.';

const ES_ACCESS_LINE =
  'Markdown: envía el header `Accept: text/markdown` en cualquier URL para recibir Markdown en lugar de HTML.';

const PT_ACCESS_LINE =
  'Markdown: envie o header `Accept: text/markdown` em qualquer URL para receber Markdown em vez de HTML.';

// ─── buildMarkdownAccessLine ───────────────────────────

describe('buildMarkdownAccessLine', () => {
  it('returns the canonical English line', () => {
    expect(buildMarkdownAccessLine('en')).toBe(EN_ACCESS_LINE);
  });

  it('localizes Spanish and Portuguese while keeping Accept: text/markdown literal', () => {
    expect(buildMarkdownAccessLine('es')).toBe(ES_ACCESS_LINE);
    expect(buildMarkdownAccessLine('pt')).toBe(PT_ACCESS_LINE);
    expect(buildMarkdownAccessLine('es')).toContain('Accept: text/markdown');
    expect(buildMarkdownAccessLine('pt')).toContain('Accept: text/markdown');
  });

  it('falls back to English for unknown languages', () => {
    expect(buildMarkdownAccessLine('xx')).toBe(EN_ACCESS_LINE);
  });

  it('does not mention appending .md', () => {
    expect(buildMarkdownAccessLine('en')).not.toContain('append `.md`');
    expect(buildMarkdownAccessLine('es')).not.toContain('append `.md`');
    expect(buildMarkdownAccessLine('pt')).not.toContain('`.md`');
  });
});

// ─── serializePageToAgentMarkdown ──────────────────────

describe('serializePageToAgentMarkdown', () => {
  it('should produce correct output with all fields', () => {
    const result = serializePageToAgentMarkdown(mockPage as any, {
      slug: 'about',
      lang: 'en',
    });

    expect(result).toContain('# About — Deep Work Plan');
    expect(result).toContain('> Technology Enthusiast and Lifelong Learner.');
    expect(result).toContain('Language: en');
    expect(result).toContain('Canonical: https://deepworkplan.com/about');
    expect(result).toContain(EN_ACCESS_LINE);
    expect(result).toContain('Last Updated: 2026-03-09');
    expect(result).toContain('## About');
  });

  it('places the Markdown access line immediately after Canonical', () => {
    const result = serializePageToAgentMarkdown(mockPage as any, {
      slug: 'about',
      lang: 'en',
    });
    const canonicalIdx = result.indexOf(
      'Canonical: https://deepworkplan.com/about'
    );
    const markdownIdx = result.indexOf(EN_ACCESS_LINE);
    const lastUpdatedIdx = result.indexOf('Last Updated:');

    expect(canonicalIdx).toBeGreaterThan(-1);
    expect(markdownIdx).toBeGreaterThan(canonicalIdx);
    expect(lastUpdatedIdx).toBeGreaterThan(markdownIdx);
    expect(result).not.toContain('append `.md`');
  });

  it('should handle index slug with correct canonical URL', () => {
    const indexPage = {
      ...mockPage,
      id: 'en/index',
      data: { ...mockPage.data, title: 'Home' },
    };
    const result = serializePageToAgentMarkdown(indexPage as any, {
      slug: 'index',
      lang: 'en',
    });

    expect(result).toContain('Canonical: https://deepworkplan.com');
    // Should not be https://deepworkplan.com/index
    expect(result).not.toContain('/index');
    expect(result).toContain(EN_ACCESS_LINE);
  });

  it('should handle ES language with localized access line', () => {
    const result = serializePageToAgentMarkdown(mockPageNoLastUpdated as any, {
      slug: 'contact',
      lang: 'es',
    });

    expect(result).toContain('Language: es');
    expect(result).toContain('Canonical: https://deepworkplan.com/es/contact');
    expect(result).toContain(ES_ACCESS_LINE);
    expect(result).not.toContain('Last Updated:');
  });

  it('should omit lastUpdated when not present', () => {
    const result = serializePageToAgentMarkdown(mockPageNoLastUpdated as any, {
      slug: 'contact',
      lang: 'es',
    });

    expect(result).not.toContain('Last Updated:');
  });
});

// ─── serializeReaderEntryToAgentMarkdown ───────────────

describe('serializeReaderEntryToAgentMarkdown', () => {
  it('includes the Markdown access line after Canonical', () => {
    const result = serializeReaderEntryToAgentMarkdown(
      {
        data: {
          title: 'Add-ons',
          description: 'Optional DWP extensions.',
        },
        body: '## Contract\n\nAddons are opt-in.',
      },
      { basePath: 'spec', slug: 'addons', lang: 'en' }
    );

    expect(result).toContain('Canonical: https://deepworkplan.com/spec/addons');
    expect(result).toContain(EN_ACCESS_LINE);
    expect(result.indexOf(EN_ACCESS_LINE)).toBeGreaterThan(
      result.indexOf('Canonical: https://deepworkplan.com/spec/addons')
    );
    expect(result).not.toContain('append `.md`');
  });

  it('localizes the access line for Portuguese reader entries', () => {
    const result = serializeReaderEntryToAgentMarkdown(
      {
        data: {
          title: 'Add-ons',
          description: 'Extensões opcionais do DWP.',
        },
        body: '## Contrato',
      },
      { basePath: 'spec', slug: 'addons', lang: 'pt' }
    );

    expect(result).toContain(PT_ACCESS_LINE);
    expect(result).toContain('Accept: text/markdown');
  });
});
