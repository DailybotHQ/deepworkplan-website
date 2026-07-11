/**
 * Announcement bar configuration — single source of truth for the reusable
 * top-of-page announcement strip (`src/components/AnnouncementBar.astro`).
 *
 * HOW TO TURN IT ON/OFF
 * ---------------------
 *   - Flip `enabled` to `true` to show the bar site-wide, `false` to hide it.
 *     That single flag is the on/off switch — nothing else needs to change to
 *     mount or unmount it (MainLayout already renders it conditionally).
 *
 * HOW TO ANNOUNCE SOMETHING NEW
 * -----------------------------
 *   1. Set `enabled: true`.
 *   2. Point `url` at the target (campaign params welcome).
 *   3. Update the `announcementBar` copy (badge/text/tagline/linkText) in
 *      EVERY locale under `src/lib/translations/*.ts` so it ships translated.
 *
 * It was last used for the Product Hunt launch (hence the default URL); the
 * copy lives in i18n (`t.announcementBar`), not here.
 */
export const ANNOUNCEMENT = {
  /** Master on/off switch for the announcement bar. */
  enabled: false,
  /** Destination the whole bar links to (opens in a new tab). */
  url: 'https://www.producthunt.com/products/deep-work-plan?utm_source=launch-bar&utm_medium=banner&utm_campaign=launch-bar',
} as const;
