/**
 * Bare BCP-47 language codes — the canonical target language list.
 *
 * This is a dependency-free module (no `import.meta.glob`, no other imports) so
 * it can be safely imported from both runtime code (`i18n.ts`) and the Astro
 * config (`astro.config.mjs`) without pulling in Vite-only features at config
 * load time. `i18n.ts` re-exports `LANGUAGE_CODES` as the source of the
 * `Language` type.
 */
export const LANGUAGE_CODES = [
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
] as const;

/** The default (unprefixed) language code. */
export const DEFAULT_LANGUAGE_CODE = 'en';
