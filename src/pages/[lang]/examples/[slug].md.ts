import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';
import { serializeReaderEntryToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () => {
  const langs = getActiveNonDefaultLanguages();
  const entries = await getCollection('kit');
  return entries
    .filter(
      (entry) =>
        langs.includes(entry.data.lang as Language) &&
        entry.data.kind === 'example'
    )
    .map((entry) => ({
      params: {
        lang: entry.data.lang,
        slug: entry.id.replace(new RegExp(`^${entry.data.lang}/`), ''),
      },
      props: { entry },
    }));
};

export const GET: APIRoute = ({ props, params }) => {
  const { entry } = props;
  const markdown = serializeReaderEntryToAgentMarkdown(entry, {
    basePath: 'examples',
    slug: params.slug as string,
    lang: params.lang as string,
  });

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
