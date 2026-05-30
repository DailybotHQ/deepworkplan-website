import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { serializeReaderEntryToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('kit');
  return entries
    .filter(
      (entry) => entry.data.lang === 'en' && entry.data.kind === 'example'
    )
    .map((entry) => ({
      params: { slug: entry.id.replace(/^en\//, '') },
      props: { entry },
    }));
};

export const GET: APIRoute = ({ props, params }) => {
  const { entry } = props;
  const markdown = serializeReaderEntryToAgentMarkdown(entry, {
    basePath: 'examples',
    slug: params.slug as string,
    lang: 'en',
  });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
