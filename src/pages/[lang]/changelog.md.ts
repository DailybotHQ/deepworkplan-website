import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

import { getActiveNonDefaultLanguages } from '@/lib/i18n';
import { serializeChangelogIndexToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = async () =>
  getActiveNonDefaultLanguages().map((lang) => ({
    params: { lang },
    props: { lang },
  }));

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as string;
  const entries = await getCollection('changelog');
  const localizedEntries = entries.filter(
    (candidate) => candidate.data.lang === lang
  );
  const markdown = serializeChangelogIndexToAgentMarkdown(
    localizedEntries,
    lang
  );
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
