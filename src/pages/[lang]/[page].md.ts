import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';
import { serializePageToAgentMarkdown } from '@/lib/markdown-for-agents';

function getPageSlug(pageId: string): string {
  // Strip language prefix: "es/about" → "about"
  const parts = pageId.split('/');
  return parts[parts.length - 1];
}

function getPageLanguage(pageId: string): string {
  return pageId.split('/')[0];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const langs = getActiveNonDefaultLanguages();
  const allPages = await getCollection('pages');
  return allPages
    .filter((page) => langs.includes(getPageLanguage(page.id) as Language))
    .map((page) => ({
      params: { lang: getPageLanguage(page.id), page: getPageSlug(page.id) },
      props: { page },
    }));
};

export const GET: APIRoute = ({ props, params }) => {
  const { page } = props;
  const slug = getPageSlug(page.id);
  const markdown = serializePageToAgentMarkdown(page, {
    slug,
    lang: params.lang as string,
  });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
