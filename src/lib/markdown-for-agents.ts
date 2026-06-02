import type { CollectionEntry } from 'astro:content';

const SITE_URL = 'https://deepworkplan.com';

/**
 * Site navigation structure shared across all agent markdown outputs.
 * Mirrors the navbar + footer links so AI agents can discover all pages
 * from any entry point — just like a browser user sees global navigation.
 */
interface NavLink {
  label: Record<string, string>;
  path: string;
  external?: boolean;
}

interface NavSection {
  title: Record<string, string>;
  links: NavLink[];
}

const SITE_NAV_SECTIONS: NavSection[] = [
  {
    title: { en: 'Methodology', es: 'Metodología' },
    links: [
      { label: { en: 'Home', es: 'Inicio' }, path: '/' },
      { label: { en: 'Methodology', es: 'Metodología' }, path: '/methodology' },
      { label: { en: 'Specification', es: 'Especificación' }, path: '/spec' },
      { label: { en: 'Kit', es: 'Kit' }, path: '/kit' },
    ],
  },
  {
    title: { en: 'Get started', es: 'Empezar' },
    links: [
      { label: { en: 'Quickstart', es: 'Inicio rápido' }, path: '/quickstart' },
      { label: { en: 'Examples', es: 'Ejemplos' }, path: '/examples' },
    ],
  },
  {
    title: { en: 'Project', es: 'Proyecto' },
    links: [
      { label: { en: 'About', es: 'Acerca de' }, path: '/about' },
      { label: { en: 'Contact', es: 'Contacto' }, path: '/contact' },
    ],
  },
  {
    title: { en: 'Connect', es: 'Conectar' },
    links: [
      {
        label: { en: 'GitHub', es: 'GitHub' },
        path: 'https://github.com/DailybotHQ/deepworkplan-website',
        external: true,
      },
    ],
  },
];

/**
 * Generate a site-wide navigation section for agent markdown.
 * Appended to all serialized outputs so AI agents can discover
 * every page from any entry point — mirrors the HTML navbar/footer.
 */
function generateSiteNavigation(lang: string): string {
  const prefix = buildUrlPrefix(lang);
  const heading = lang === 'es' ? 'Navegación del Sitio' : 'Site Navigation';
  const lines: string[] = ['', '---', '', `## ${heading}`, ''];

  for (const section of SITE_NAV_SECTIONS) {
    const sectionTitle = section.title[lang] || section.title.en;
    lines.push(`**${sectionTitle}:**`);
    for (const link of section.links) {
      const label = link.label[lang] || link.label.en;
      const url = link.external ? link.path : `${prefix}${link.path}`;
      lines.push(`- [${label}](${url})`);
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
  return lang === 'en' ? '' : `/${lang}`;
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
