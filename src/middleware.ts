/**
 * Astro middleware to serve custom 404 page for unknown routes.
 * Rewrites requests for non-existent paths to /404 so the custom 404 page is displayed
 * instead of the browser's "invalid response" error in dev mode.
 *
 * ⚠️  CRITICAL — READ BEFORE ADDING NEW TOP-LEVEL ROUTES ⚠️
 *
 * This middleware uses an ALLOWLIST that is DERIVED from two sources:
 *   - `KNOWN_BASE_PATHS` — the per-language page paths (these exist for every
 *     language, at the root for the default language and under `/{lang}/` for the
 *     rest).
 *   - the language registry — active non-default language codes are valid
 *     single-segment roots (`/es`, `/pt`, …), and `/{lang}/{path}` is validated
 *     against `KNOWN_BASE_PATHS`.
 *
 * Single-segment paths NOT in the allowlist are rewritten to /404 — even if the
 * corresponding `src/pages/<name>/index.astro` exists.
 *
 * Symptoms when forgotten:
 *   - `/<your-route>` returns 404 in dev AND prod
 *   - `/<your-route>/<sub>` works fine (multi-segment paths bypass the rule)
 *   - `/<your-route>/index.html` works (paths containing "." bypass the rule)
 *   - Dev server logs show: `[404] (rewrite) /<your-route>` — the
 *     "(rewrite)" is the smoking gun: it's THIS middleware, not Astro routing
 *
 * When adding a new per-language page (e.g. `src/pages/foo.astro` +
 * `src/pages/[lang]/foo.astro`): add `'foo'` to `KNOWN_BASE_PATHS` below — ONE
 * place, and it covers every language automatically. New languages need no edit
 * here at all (they come from the registry).
 *
 * Do NOT debug Astro routing, file-system caches, or `[...slug]` vs `[slug]`
 * before checking this allowlist first.
 */
import { defineMiddleware } from 'astro:middleware';

import { getActiveNonDefaultLanguages } from './lib/i18n';

/**
 * Per-language page paths. Each of these exists for every language (at the root
 * for the default language, under `/{lang}/` for the rest). Add a new page here
 * — one place covers all languages.
 */
const KNOWN_BASE_PATHS = new Set([
  '',
  'about',
  'contact',
  'methodology',
  'spec',
  'kit',
  'examples',
  'quickstart',
  'init',
  'trust',
  'setup',
  'onboarding',
]);

/** Root-only paths that are not per-language. */
const ROOT_ONLY_PATHS = new Set([
  'api',
  'internal',
  '404',
  'favicon.ico',
  'favicon.svg',
  'sitemap-index.xml',
]);

/** Active languages served under a `/{lang}/` prefix (excludes the default). */
const PREFIXED_LANGUAGES = new Set<string>(getActiveNonDefaultLanguages());

/**
 * Valid single-segment roots: per-language page paths + root-only paths + the
 * prefixed language codes (`/es`, `/pt`, …). Derived from the registry, so a new
 * language is recognized automatically.
 */
const KNOWN_ROOT_PATHS = new Set<string>([
  ...KNOWN_BASE_PATHS,
  ...ROOT_ONLY_PATHS,
  ...PREFIXED_LANGUAGES,
]);

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname;

  // Skip Vite/Astro internal paths (HMR, assets, etc.)
  if (
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/__vite') ||
    pathname.startsWith('/@') ||
    pathname.includes('.')
  ) {
    return next();
  }

  const segments = pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean);

  // Single-segment paths at root (e.g. /sdfsd) that don't match known routes
  if (segments.length === 1 && !KNOWN_ROOT_PATHS.has(segments[0])) {
    return context.rewrite(new URL('/404', context.url));
  }

  // /{lang}/xxx where lang is a prefixed language but xxx is not a known page
  if (
    segments.length === 2 &&
    PREFIXED_LANGUAGES.has(segments[0]) &&
    !KNOWN_BASE_PATHS.has(segments[1])
  ) {
    return context.rewrite(new URL('/404', context.url));
  }

  return next();
});
