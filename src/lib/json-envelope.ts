/**
 * JSON content-negotiation envelope for page mirrors.
 *
 * Precedence order (normative — mirrors the order enforced in
 * functions/_middleware.ts, and is fully decided by `prefersJsonOverHtml`
 * alone so it is unit-testable without the middleware):
 *
 *   1. `Accept: text/markdown` (or any type containing "text/markdown") →
 *      the existing Markdown mirror (`tryServeMarkdown`) — unchanged, wins
 *      first, even when `application/json` is also present.
 *   2. Accept explicitly prefers `application/json` (or a `+json` suffix
 *      type, e.g. `application/ld+json`) and does not also prefer
 *      `text/html` or `text/markdown` → this envelope.
 *   3. Otherwise (browsers, a wildcard Accept, empty Accept) → HTML/asset,
 *      unchanged.
 *
 * Dependency-free on purpose: functions/_middleware.ts imports this module at
 * the Cloudflare edge, where Astro imports and the `@/` alias don't exist.
 * The 17-language registry below intentionally duplicates
 * src/lib/language-codes.ts (LANGUAGE_CODES) — keep both in sync when a
 * language is added or removed.
 */

/** Mirrors LANGUAGE_CODES in src/lib/language-codes.ts — keep in sync. */
const KNOWN_LANGUAGE_CODES: ReadonlySet<string> = new Set([
  'en',
  'es',
  'pt',
  'zh',
  'ja',
  'de',
  'fr',
  'ko',
  'ru',
  'it',
  'tr',
  'id',
  'vi',
  'hi',
  'pl',
  'uk',
  'th',
]);

/** Mirrors DEFAULT_LANGUAGE_CODE in src/lib/language-codes.ts. */
const DEFAULT_LANGUAGE = 'en';

/** The envelope's `contentFormat` is always `"markdown"`: the body is the
 * unmodified source Markdown, just wrapped in a typed JSON envelope. */
export const JSON_ENVELOPE_CONTENT_FORMAT = 'markdown' as const;

export interface PageJsonEnvelopeRecovery {
  llmsTxt: string;
  sitemap: string;
  openapi: string;
  developers: string;
}

export interface PageJsonEnvelope {
  url: string;
  contentFormat: typeof JSON_ENVELOPE_CONTENT_FORMAT;
  title: string;
  markdown: string;
  language: string;
  recovery: PageJsonEnvelopeRecovery;
}

export interface BuildPageJsonEnvelopeParams {
  /** Absolute URL of the requested page. */
  url: string;
  /** Request pathname, used for language detection and the title fallback. */
  pathname: string;
  /** The page's original Markdown source (unmodified). */
  markdown: string;
  /** Recovery links — caller supplies these (reusing agent-recovery.ts's
   * exported constants) since this module takes no imports. */
  recovery: PageJsonEnvelopeRecovery;
}

/**
 * True when the Accept header explicitly prefers `application/json` (or a
 * `+json` suffix type) over both HTML and Markdown. Browsers never send
 * `application/json` first, so they are unaffected; a request that also
 * accepts `text/markdown` keeps getting Markdown (round-1 precedence is
 * preserved) — this function alone decides the full precedence order.
 */
export function prefersJsonOverHtml(accept: string): boolean {
  const lower = accept.toLowerCase();
  if (lower.includes('text/html') || lower.includes('text/markdown')) {
    return false;
  }
  return /application\/(?:[a-z0-9.-]+\+)?json\b/.test(lower);
}

/**
 * Extract the page title from the first `# ` heading of the Markdown source
 * (every page mirror starts with one — see docs/aeo/MARKDOWN_FOR_AGENTS.md
 * "Response Format"). Falls back to the request path when no heading exists.
 */
export function extractTitleFromMarkdown(
  markdown: string,
  fallback: string
): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

/**
 * Detect the page language from the first path segment when it is one of
 * the 17 known language codes (`/es/about` → `"es"`), else the default
 * language (`en`) — matching how the site's [lang] routing tree works.
 */
export function detectLanguageFromPathname(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && KNOWN_LANGUAGE_CODES.has(segment)
    ? segment
    : DEFAULT_LANGUAGE;
}

/** Build the typed JSON envelope for a page mirror. */
export function buildPageJsonEnvelope(
  params: BuildPageJsonEnvelopeParams
): PageJsonEnvelope {
  const { url, pathname, markdown, recovery } = params;
  return {
    url,
    contentFormat: JSON_ENVELOPE_CONTENT_FORMAT,
    title: extractTitleFromMarkdown(markdown, pathname),
    markdown,
    language: detectLanguageFromPathname(pathname),
    recovery,
  };
}
