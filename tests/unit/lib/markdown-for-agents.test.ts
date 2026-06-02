import { describe, expect, it } from 'vitest';

import { serializePageToAgentMarkdown } from '@/lib/markdown-for-agents';

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
    expect(result).toContain('Last Updated: 2026-03-09');
    expect(result).toContain('## About');
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
  });

  it('should handle ES language', () => {
    const result = serializePageToAgentMarkdown(mockPageNoLastUpdated as any, {
      slug: 'contact',
      lang: 'es',
    });

    expect(result).toContain('Language: es');
    expect(result).toContain('Canonical: https://deepworkplan.com/es/contact');
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
