import type { APIRoute, GetStaticPaths } from 'astro';

import {
  ALTERNATIVES,
  type AlternativeId,
  getAlternative,
} from '@/lib/compare-data';
import { getTranslations } from '@/lib/translations';

export const getStaticPaths: GetStaticPaths = () =>
  ALTERNATIVES.map((alternative) => ({ params: { slug: alternative.id } }));

export const GET: APIRoute = ({ params }) => {
  const alternative = getAlternative(params.slug as AlternativeId);
  const details =
    getTranslations('en').comparePage.alternatives[alternative.id];
  const dwpStrengths = getTranslations('en').comparePage.dwpStrengths;
  const markdown = `# ${details.name} × Deep Work Plan\n\n## What ${details.name} brings\n\n${details.whatItDoesWell}\n\n${details.audience}\n\n## What Deep Work Plan brings\n\n${dwpStrengths.items.map((item) => `- **${item.title}:** ${item.body}`).join('\n')}\n\n[Official documentation](${alternative.docsUrl})\n`;
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
