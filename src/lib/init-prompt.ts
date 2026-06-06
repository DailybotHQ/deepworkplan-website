import { getEntry } from 'astro:content';

import { serializePageToAgentMarkdown } from '@/lib/markdown-for-agents';

/**
 * The canonical English init.md content — byte-for-byte what `/init.md` serves.
 *
 * The "Copy init.md" buttons (home hero + /init page) copy this so a user can
 * paste the full onboarding prompt straight into any agent, with zero fetch and
 * zero friction, regardless of the page's display language. English is
 * intentional: init.md is first-class English agent content (the literal prompt
 * that works when pasted), so the copy payload never localizes.
 */
export async function getCanonicalInitMarkdown(): Promise<string> {
  const entry = await getEntry('pages', 'en/init');
  if (!entry) {
    throw new Error(
      'Missing content/pages/en/init.md — cannot build the init.md copy payload'
    );
  }
  return serializePageToAgentMarkdown(entry, { slug: 'init', lang: 'en' });
}
