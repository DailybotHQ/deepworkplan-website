/**
 * Pure display helpers for the changelog collection.
 *
 * Content Collection entries are intentionally represented by the small shape
 * below so ordering and URL behavior can be tested without Astro virtual
 * modules or filesystem access.
 */

import { getUrlPrefix, type Language } from '@/lib/i18n';

export interface ChangelogEntryLike {
  id: string;
  data: {
    date: Date;
    order: number;
    featured: boolean;
  };
}

export function sortChangelogEntries<T extends ChangelogEntryLike>(
  entries: readonly T[],
): T[] {
  return [...entries].sort((a, b) => {
    const dateDelta = b.data.date.getTime() - a.data.date.getTime();
    if (dateDelta !== 0) return dateDelta;

    const orderDelta = a.data.order - b.data.order;
    if (orderDelta !== 0) return orderDelta;

    return a.id.localeCompare(b.id);
  });
}

export function getFeaturedChangelogEntry<T extends ChangelogEntryLike>(
  entries: readonly T[],
): T | undefined {
  return sortChangelogEntries(entries).find((entry) => entry.data.featured);
}

export function getChangelogUrl(lang: Language, slug: string): string {
  return `${getUrlPrefix(lang)}/changelog/${slug}`;
}
