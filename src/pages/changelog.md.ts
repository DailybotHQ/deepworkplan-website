import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { sortChangelogEntries } from '@/lib/changelog';
import { serializeChangelogIndexToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('changelog');
  return [
    {
      params: {},
      props: {
        entries: sortChangelogEntries(
          entries.filter((entry) => entry.data.lang === 'en')
        ),
      },
    },
  ];
};

export const GET: APIRoute = async () => {
  const entries = await getCollection('changelog');
  const markdown = serializeChangelogIndexToAgentMarkdown(
    sortChangelogEntries(entries.filter((entry) => entry.data.lang === 'en')),
    'en'
  );
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
