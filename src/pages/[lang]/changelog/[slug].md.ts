import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';
import { serializeChangelogEntryToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('changelog');
  return entries
    .filter((entry) =>
      getActiveNonDefaultLanguages().includes(entry.data.lang as Language)
    )
    .map((entry) => ({
      params: {
        lang: entry.data.lang,
        slug: entry.id.replace(`${entry.data.lang}/`, ''),
      },
      props: { entry },
    }));
};

export const GET: APIRoute = ({ props, params }) => {
  const markdown = serializeChangelogEntryToAgentMarkdown(props.entry, {
    slug: params.slug as string,
    lang: params.lang as string,
  });
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
