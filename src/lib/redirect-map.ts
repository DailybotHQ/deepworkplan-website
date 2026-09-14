/**
 * Canonical, unprefixed redirect pairs for the site's legacy/alias routes.
 *
 * Single source of truth, expanded per active language by two independent
 * consumers that must never drift apart:
 *   - `astro.config.mjs` (`redirects` option) — renders the HTML meta-refresh
 *     fallback page Astro's static build produces for each entry.
 *   - `scripts/generate-redirects.mjs` — writes `public/_redirects`, the
 *     Cloudflare Pages file that serves the *real* server-side HTTP redirect
 *     at the edge (a single hop, before any static asset lookup — what
 *     agents and crawlers actually see; the HTML fallback is defense in
 *     depth for any client that bypasses `_redirects`).
 *
 * Dependency-free (no Vite-only features) so it loads safely from both the
 * Astro config and a plain Node script.
 */
export interface RedirectPair {
  /** Source path segment, no language prefix, no leading/trailing slash. */
  from: string;
  /** Destination path segment, no language prefix, no leading/trailing slash. */
  to: string;
  status: 301;
}

// /quickstart is the single canonical onboarding page (HTML + one .md
// endpoint per language). /init, /setup, and /onboarding all redirect to it —
// one destination, no canonical/AEO duplication. /init.md itself is a
// separate, hand-maintained, English-only standalone artifact served from
// public/init.md (never redirected — it has no HTML page to redirect to).
//
// /developers is the agent & developer portal; /docs is a predictable alias
// agents and humans try first.
export const REDIRECT_PAIRS: readonly RedirectPair[] = [
  { from: 'init', to: 'quickstart', status: 301 },
  { from: 'setup', to: 'quickstart', status: 301 },
  { from: 'onboarding', to: 'quickstart', status: 301 },
  { from: 'docs', to: 'developers', status: 301 },
];
