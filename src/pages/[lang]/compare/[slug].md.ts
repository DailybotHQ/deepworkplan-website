import type { APIRoute, GetStaticPaths } from 'astro';

import {
  ALTERNATIVES,
  type AlternativeId,
  getAlternative,
} from '@/lib/compare-data';
import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';
import { serializeCompareAlternativeToAgentMarkdown } from '@/lib/markdown-for-agents';

export const getStaticPaths: GetStaticPaths = () =>
  getActiveNonDefaultLanguages().flatMap((lang) =>
    ALTERNATIVES.map((alternative) => ({
      params: { lang, slug: alternative.id },
    }))
  );

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as Language;
  const alternative = getAlternative(params.slug as AlternativeId);
  const dwp = getAlternative('dwp');
  const markdown = serializeCompareAlternativeToAgentMarkdown(
    alternative,
    dwp,
    lang
  );

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
