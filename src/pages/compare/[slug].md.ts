import type { APIRoute, GetStaticPaths } from 'astro';

import {
  ALTERNATIVES,
  type AlternativeId,
  getAlternative,
} from '@/lib/compare-data';
import { serializeCompareAlternativeToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = () =>
  ALTERNATIVES.map((alternative) => ({ params: { slug: alternative.id } }));

export const GET: APIRoute = ({ params }) => {
  const alternative = getAlternative(params.slug as AlternativeId);
  const dwp = getAlternative('dwp');
  const markdown = serializeCompareAlternativeToAgentMarkdown(
    alternative,
    dwp,
    'en'
  );

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
