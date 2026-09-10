import type { APIRoute, GetStaticPaths } from 'astro';

import {
  ALTERNATIVES,
  type AlternativeId,
  getAlternative,
} from '@/lib/compare-data';
import { getActiveNonDefaultLanguages, type Language } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

export const getStaticPaths: GetStaticPaths = () =>
  getActiveNonDefaultLanguages().flatMap((lang) =>
    ALTERNATIVES.map((alternative) => ({
      params: { lang, slug: alternative.id },
    }))
  );

export const GET: APIRoute = ({ params }) => {
  const lang = params.lang as Language;
  const alternative = getAlternative(params.slug as AlternativeId);
  const details =
    getTranslations(lang).comparePage.alternatives[alternative.id];
  const translations = getTranslations(lang).comparePage;
  const markdown = `# ${details.name} × Deep Work Plan\n\n## ${details.name}\n\n${details.whatItDoesWell}\n\n${details.audience}\n\n## ${translations.dwpStrengths.title}\n\n${translations.dwpStrengths.items.map((item) => `- **${item.title}:** ${item.body}`).join('\n')}\n\n[${translations.profile.sourceLabel}](${alternative.docsUrl})\n`;
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
