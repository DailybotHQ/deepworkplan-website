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
//
// DeepWorkPlan Vim is documented ONCE, as a kit addon at /kit/vim (one
// official page per addon). /vim and /vim.md stay as short, shareable aliases
// so earlier links (llms.txt, the product README, agent footers) keep working;
// the installer itself lives at /vim/install.sh, a static file these exact-path
// rules never touch.
export const REDIRECT_PAIRS: readonly RedirectPair[] = [
  { from: 'init', to: 'quickstart', status: 301 },
  { from: 'setup', to: 'quickstart', status: 301 },
  { from: 'onboarding', to: 'quickstart', status: 301 },
  { from: 'docs', to: 'developers', status: 301 },
  { from: 'vim', to: 'kit/vim', status: 301 },
  { from: 'vim.md', to: 'kit/vim.md', status: 301 },
];

/**
 * Apex-only redirects — emitted once, with no language prefixes. These serve
 * asset paths (they contain a dot or a slash), so expanding them across
 * languages would point at paths that do not exist.
 *
 * `/install.sh` is the legacy apex alias of the DeepWorkPlan Vim installer;
 * the canonical byte-identical artifact lives at `/vim/install.sh`
 * (`public/vim/install.sh`). `curl -fsSL` follows redirects (`-L`), so both
 * one-liners work, while authored copy everywhere uses the canonical form.
 * `/install.sh.sha256` aliases the installer's checksum the same way, so the
 * download → verify → run steps also work against the apex (and against
 * vim.deepworkplan.com, which serves this same project).
 */
export const ROOT_ONLY_REDIRECT_PAIRS: readonly RedirectPair[] = [
  { from: 'install.sh', to: 'vim/install.sh', status: 301 },
  { from: 'install.sh.sha256', to: 'vim/install.sh.sha256', status: 301 },
];
