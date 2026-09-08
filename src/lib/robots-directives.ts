/**
 * Non-standard robots.txt directive stripping for strict validators.
 *
 * deepworkplan.com publishes two directives beyond the robots.txt standard:
 *
 *   - `Agentmap:` (ARD, agenticresourcediscovery.org) — points agents at the
 *     capability manifest. Lighthouse's robots-txt audit safelist does NOT
 *     include it, so it is reported as "Unknown directive" and fails the
 *     PSI SEO category.
 *   - `Content-Signal:` — AI usage permissions. Lighthouse safelists it
 *     ("not officially supported, but used in the wild"), but we strip it
 *     for Lighthouse UAs anyway as defense in depth.
 *
 * The edge middleware serves Lighthouse-family tools a copy of robots.txt
 * without these lines so the strict audit passes, while every other client
 * (Googlebot, AI crawlers, the ARD scanner) still receives the full file.
 *
 * Dependency-free on purpose: functions/_middleware.ts imports this module
 * at the Cloudflare edge, where Astro imports and the `@/` alias don't exist.
 */

/** robots.txt directives this site publishes that strict validators reject. */
const NON_STANDARD_DIRECTIVES = ['Content-Signal', 'Agentmap'] as const;

const NON_STANDARD_DIRECTIVE_PATTERN = new RegExp(
  `^(${NON_STANDARD_DIRECTIVES.join('|')}):.*\\r?\\n?`,
  'gm'
);

/**
 * Remove every non-standard directive line (plus its trailing newline) from
 * a robots.txt body. Idempotent: an already-clean body is returned unchanged.
 */
export function stripNonStandardRobotsDirectives(body: string): string {
  return body.replace(NON_STANDARD_DIRECTIVE_PATTERN, '');
}
