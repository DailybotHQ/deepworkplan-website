import { describe, expect, it } from 'vitest';

import {
  getChangelogUrl,
  getFeaturedChangelogEntry,
  sortChangelogEntries,
  type ChangelogEntryLike,
} from '@/lib/changelog';

const entry = (
  id: string,
  date: string,
  order: number,
  featured = false,
): ChangelogEntryLike => ({
  id,
  data: { date: new Date(date), order, featured },
});

describe('changelog display helpers', () => {
  it('sorts newest dates first and uses order then slug as stable tie-breakers', () => {
    const entries = [
      entry('same-z', '2026-09-10', 2),
      entry('older', '2026-09-09', 1),
      entry('same-a', '2026-09-10', 1),
    ];

    expect(sortChangelogEntries(entries).map(({ id }) => id)).toEqual([
      'same-a',
      'same-z',
      'older',
    ]);
  });

  it('returns the first featured entry in display order', () => {
    const entries = [
      entry('older-featured', '2026-09-01', 1, true),
      entry('newer-featured', '2026-09-10', 1, true),
    ];

    expect(getFeaturedChangelogEntry(entries)?.id).toBe('newer-featured');
  });

  it('builds localized detail URLs without a language prefix for English', () => {
    expect(getChangelogUrl('en', 'deep-work-plan-v3')).toBe(
      '/changelog/deep-work-plan-v3',
    );
    expect(getChangelogUrl('es', 'deep-work-plan-v3')).toBe(
      '/es/changelog/deep-work-plan-v3',
    );
  });
});
