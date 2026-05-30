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

interface PostSerializeOptions {
  slug: string;
  lang: string;
}

interface BlogIndexEntry {
  title: string;
  slug: string;
  description: string;
  pubDate: Date;
  tags?: string[];
}

interface BlogIndexOptions {
  lang: string;
  title: string;
  description: string;
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
 * Serialize a blog post to agent-friendly Markdown.
 * Returns clean Markdown with metadata header + original body.
 */
export function serializePostToAgentMarkdown(
  post: CollectionEntry<'blog'>,
  options: PostSerializeOptions
): string {
  const { slug, lang } = options;
  const { title, description, pubDate, updatedDate, tags, heroImage } =
    post.data;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Published: ${formatDate(pubDate)}`);
  if (updatedDate) {
    lines.push(`Updated: ${formatDate(updatedDate)}`);
  }
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  if (tags && tags.length > 0) {
    lines.push(`Tags: ${tags.join(', ')}`);
  }
  if (heroImage) {
    lines.push(`Hero Image: ${SITE_URL}${heroImage}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  if (post.body) {
    lines.push(post.body.trim());
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

/**
 * Serialize a blog index listing to agent-friendly Markdown.
 * Returns a list of posts with links to their .md versions.
 */
export function serializeBlogIndexToMarkdown(
  entries: BlogIndexEntry[],
  options: BlogIndexOptions
): string {
  const { lang, title, description } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(`Total posts: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Posts');
  lines.push('');

  for (const entry of entries) {
    const postMdUrl = `${prefix}/blog/${entry.slug}.md`;
    const date = formatDate(entry.pubDate);
    lines.push(
      `- [${entry.title}](${postMdUrl}) — ${entry.description} (${date})`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface SeriesIndexEntry {
  title: string;
  slug: string;
  description: string;
  seriesOrder: number;
}

interface SeriesIndexOptions {
  slug: string;
  seriesTitle: string;
  seriesDescription: string;
  lang: string;
}

/**
 * Serialize a series index listing to agent-friendly Markdown.
 * Returns an ordered list of chapters with links to their .md versions.
 */
export function serializeSeriesIndexToMarkdown(
  entries: SeriesIndexEntry[],
  options: SeriesIndexOptions
): string {
  const { slug, seriesTitle, seriesDescription, lang } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/series/${slug}`;

  const lines: string[] = [];

  lines.push(`# ${seriesTitle}`);
  lines.push('');
  if (seriesDescription) {
    lines.push(`> ${seriesDescription}`);
    lines.push('');
  }
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(`Total chapters: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Chapters');
  lines.push('');

  const sorted = [...entries].sort((a, b) => a.seriesOrder - b.seriesOrder);
  for (const entry of sorted) {
    const postMdUrl = `${prefix}/blog/${entry.slug}.md`;
    lines.push(
      `${entry.seriesOrder}. [${entry.title}](${postMdUrl}) — ${entry.description}`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

interface SeriesListingEntry {
  slug: string;
  title: string;
  description: string;
  postCount: number;
  order: number;
}

interface SeriesListingOptions {
  lang: string;
  title: string;
  description: string;
}

/**
 * Serialize the series landing page (list of all series) to agent-friendly
 * Markdown. Returns an ordered list with links to each series' own .md index.
 */
export function serializeSeriesListingToMarkdown(
  entries: SeriesListingEntry[],
  options: SeriesListingOptions
): string {
  const { lang, title, description } = options;
  const prefix = buildUrlPrefix(lang);
  const canonicalUrl = `${SITE_URL}${prefix}/blog/series`;

  const lines: string[] = [];

  lines.push(`# ${title}`);
  lines.push('');
  lines.push(`> ${description}`);
  lines.push('');
  lines.push(`Language: ${lang}`);
  lines.push(`Canonical: ${canonicalUrl}`);
  lines.push(`Total series: ${entries.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## Series');
  lines.push('');

  const sorted = [...entries].sort((a, b) => a.order - b.order);
  for (const entry of sorted) {
    const seriesMdUrl = `${prefix}/blog/series/${entry.slug}.md`;
    const chapterCount = `${entry.postCount} ${entry.postCount === 1 ? 'chapter' : 'chapters'}`;
    lines.push(
      `- [${entry.title}](${seriesMdUrl}) — ${entry.description} (${chapterCount})`
    );
  }

  lines.push(generateSiteNavigation(lang));

  return `${lines.join('\n')}\n`;
}

/**
 * Serialize a non-blog page to agent-friendly Markdown.
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
