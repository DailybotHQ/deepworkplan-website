import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { serializeChangelogIndexToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('changelog');
  return [
    {
      params: {},
      props: { entries: entries.filter((entry) => entry.data.lang === 'en') },
    },
  ];
};

export const GET: APIRoute = async () => {
  const entries = await getCollection('changelog');
  const markdown = serializeChangelogIndexToAgentMarkdown(
    entries.filter((entry) => entry.data.lang === 'en'),
    'en'
  );
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
