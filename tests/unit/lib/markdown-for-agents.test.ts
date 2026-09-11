import { describe, expect, it } from 'vitest';

import { CAPABILITY_IDS, getAlternative } from '@/lib/compare-data';
import {
  buildMarkdownAccessLine,
  serializeCompareAlternativeToAgentMarkdown,
  serializePageToAgentMarkdown,
  serializeReaderEntryToAgentMarkdown,
  stripMdxArtifacts,
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

  it('strips leaked MDX import statements and diagram component tags from the body', () => {
    const result = serializeReaderEntryToAgentMarkdown(
      {
        data: {
          title: 'Manifesto',
          description: 'What a Deep Work Plan is.',
        },
        body: [
          "import RepoAsHarness from '@/components/diagrams/methodology/RepoAsHarness.astro';",
          '',
          '# Manifesto',
          '',
          'A Deep Work Plan is a markdown-only methodology.',
          '',
          '<RepoAsHarness lang="en" class="not-prose my-10" />',
          '',
          '## Deep work, for agents',
        ].join('\n'),
      },
      { basePath: 'methodology', slug: '01-manifesto', lang: 'en' }
    );

    expect(result).not.toContain('import RepoAsHarness');
    expect(result).not.toContain('<RepoAsHarness');
    expect(result).toContain(
      'A Deep Work Plan is a markdown-only methodology.'
    );
    expect(result).toContain('## Deep work, for agents');
  });
});

describe('stripMdxArtifacts', () => {
  it('removes a bare MDX import line', () => {
    const body = [
      "import CoreLoop from '@/components/diagrams/methodology/CoreLoop.astro';",
      '',
      'Regular prose about the core loop.',
    ].join('\n');

    const result = stripMdxArtifacts(body);

    expect(result).not.toContain('import CoreLoop');
    expect(result).toContain('Regular prose about the core loop.');
  });

  it('removes a self-closing JSX-style component tag but keeps surrounding prose', () => {
    const body = [
      'Before the diagram.',
      '',
      '<TaskAnatomy lang="en" class="not-prose my-10" />',
      '',
      'After the diagram.',
    ].join('\n');

    const result = stripMdxArtifacts(body);

    expect(result).not.toContain('<TaskAnatomy');
    expect(result).toContain('Before the diagram.');
    expect(result).toContain('After the diagram.');
  });

  it('removes both an import line and multiple component tags in the same body', () => {
    const body = [
      "import CmdCreate from '@/components/diagrams/kit/CmdCreate.astro';",
      '# Create',
      '<CmdCreate lang="en" class="not-prose my-8" />',
      'Some more text.',
      '<CmdCreate lang="en" variant="compact" />',
    ].join('\n');

    const result = stripMdxArtifacts(body);

    expect(result).not.toContain('import CmdCreate');
    expect(result).not.toContain('<CmdCreate');
    expect(result).toContain('# Create');
    expect(result).toContain('Some more text.');
  });

  it('leaves ordinary Markdown prose untouched when there is nothing to strip', () => {
    const body =
      '# Title\n\nOrdinary prose with a [link](https://example.com) and **bold** text.';

    expect(stripMdxArtifacts(body)).toBe(body);
  });

  it('does not touch standard lowercase HTML tags used in content', () => {
    const body =
      'Some prose with a <br> line break and <img src="x.png" alt="">.';

    expect(stripMdxArtifacts(body)).toBe(body);
  });

  it('collapses the blank lines left behind by stripped lines', () => {
    const body = [
      "import Foo from '@/components/diagrams/Foo.astro';",
      '',
      '',
      '<Foo lang="en" />',
      '',
      '',
      'Text after.',
    ].join('\n');

    const result = stripMdxArtifacts(body);

    expect(result).not.toMatch(/\n{3,}/);
    expect(result).toContain('Text after.');
  });
});

describe('serializeCompareAlternativeToAgentMarkdown', () => {
  const dwp = getAlternative('dwp');
  const amazonKiro = getAlternative('amazon-kiro');

  it('includes the capability comparison table, not just the prose summary', () => {
    const result = serializeCompareAlternativeToAgentMarkdown(
      amazonKiro,
      dwp,
      'en'
    );

    expect(result).toContain('Capability snapshot');
    // Every capability row label must appear — this is the exact content
    // gap PLAN_site_v4_seo_aeo_audit Task 6/7 found: the table was
    // entirely missing from the Markdown mirror.
    expect(CAPABILITY_IDS.length).toBeGreaterThan(0);
    expect(result).toContain('| Capability | Deep Work Plan | Amazon Kiro |');
    expect(result).toContain('Works with any coding agent');
    expect(result).toContain('Built in');
  });

  it('includes the canonical URL, access line, and official docs link', () => {
    const result = serializeCompareAlternativeToAgentMarkdown(
      amazonKiro,
      dwp,
      'en'
    );

    expect(result).toContain(
      'Canonical: https://deepworkplan.com/compare/amazon-kiro'
    );
    expect(result).toContain('Accept: text/markdown');
    expect(result).toContain(`[Official documentation](${amazonKiro.docsUrl})`);
  });

  it('localizes the table and prose for a non-default language', () => {
    const result = serializeCompareAlternativeToAgentMarkdown(
      amazonKiro,
      dwp,
      'es'
    );

    expect(result).toContain(
      'Canonical: https://deepworkplan.com/es/compare/amazon-kiro'
    );
    expect(result).toContain('Accept: text/markdown');
    // Spanish "Capability snapshot" label — confirms the table heading is
    // localized, not hardcoded English.
    expect(result).not.toContain('Capability snapshot');
  });
});
