import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { serializeChangelogEntryToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('changelog');
  return entries
    .filter((entry) => entry.data.lang === 'en')
    .map((entry) => ({
      params: { slug: entry.id.replace(/^en\//, '') },
      props: { entry },
    }));
};

export const GET: APIRoute = ({ props, params }) => {
  const markdown = serializeChangelogEntryToAgentMarkdown(props.entry, {
    slug: params.slug as string,
    lang: 'en',
  });
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
