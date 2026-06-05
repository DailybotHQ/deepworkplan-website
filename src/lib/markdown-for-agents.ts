import type { CollectionEntry } from 'astro:content';
import { REPO_URLS } from '@/lib/constants/repos';
import { getUrlPrefix, type Language } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

const SITE_URL = 'https://deepworkplan.com';

/**
 * Generate a site-wide navigation section for agent markdown.
 * Appended to all serialized outputs so AI agents can discover every page from
 * any entry point — mirrors the HTML navbar/footer. Labels are localized via the
 * translations layer, so every active language gets navigation in its own
 * language (English fallback when a language has no strings file yet).
 */
function generateSiteNavigation(lang: string): string {
  const t = getTranslations(lang as Language);
  const prefix = buildUrlPrefix(lang);
  const lines: string[] = ['', '---', '', `## ${t.agentNav.heading}`, ''];

  const sections: {
    title: string;
    links: { label: string; path: string; external?: boolean }[];
  }[] = [
    {
      title: t.agentNav.sections.methodology,
      links: [
        { label: t.nav.home, path: '/' },
        { label: t.nav.methodology, path: '/methodology' },
        { label: t.nav.spec, path: '/spec' },
        { label: t.nav.kit, path: '/kit' },
      ],
    },
    {
      title: t.agentNav.sections.getStarted,
      links: [
        { label: t.nav.quickstart, path: '/quickstart' },
        { label: t.nav.examples, path: '/examples' },
      ],
    },
    {
      title: t.agentNav.sections.project,
      links: [
        { label: t.nav.trust, path: '/trust' },
        { label: t.nav.about, path: '/about' },
        { label: t.nav.contact, path: '/contact' },
      ],
    },
    {
      title: t.agentNav.sections.connect,
      links: [
        { label: t.nav.repo.website, path: REPO_URLS.website, external: true },
        { label: t.nav.repo.skill, path: REPO_URLS.skill, external: true },
      ],
    },
  ];

  for (const section of sections) {
    lines.push(`**${section.title}:**`);
    for (const link of section.links) {
      const url = link.external ? link.path : `${prefix}${link.path}`;
      lines.push(`- [${link.label}](${url})`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

interface PageSerializeOptions {
  slug: string;
  lang: string;
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function buildUrlPrefix(lang: string): string {
  return getUrlPrefix(lang as Language);
}

/**
 * Serialize a static page to agent-friendly Markdown.
 * Returns clean Markdown with metadata header + page body.
 */
export function serializePageToAgentMarkdown(
  page: CollectionEntry<'pages'>,
  options: PageSerializeOptions
): string {
  const { slug, lang } = options;
  const { title, description } = page.data;
  const prefix = buildUrlPrefix(lang);
  const pagePath = slug === 'index' ? '' : `/${slug}`;
  const canonicalUrl = `${SITE_URL}${prefix}${pagePath}`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);

  if ('lastUpdated' in page.data && page.data.lastUpdated instanceof Date) {
    lines.push(`Last Updated: ${formatDate(page.data.lastUpdated)}`);
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  if (page.body) {
    lines.push(page.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface ReaderEntry {
  body?: string;
  data: {
    title: string;
    description: string;
  };
}

interface ReaderSerializeOptions {
  /** Route segment the reader lives under, e.g. 'methodology', 'spec', 'kit', 'examples'. */
  basePath: string;
  /** Slug of the entry (no language prefix), e.g. '01-manifesto'. */
  slug: string;
  /** Language code: 'en' | 'es'. */
  lang: string;
}

/**
 * Serialize a content-collection reader entry (methodology, spec, kit, or
 * examples) to agent-friendly Markdown. Mirrors the rendered reader page so
 * AI agents can consume the same content as native Markdown.
 */
export function serializeReaderEntryToAgentMarkdown(
  entry: ReaderEntry,
  options: ReaderSerializeOptions
): string {
  const { basePath, slug, lang } = options;
  const { title, description } = entry.data;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/${basePath}/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  if (entry.body) {
    lines.push(entry.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}
