/**
 * Centralized i18n configuration module.
 *
 * This is the single source of truth for language configuration.
 *
 * The site targets 16 languages (the `LANGUAGE_CODES` registry below). A language
 * becomes **active** (routes generated, listed in the switcher, emitted in
 * hreflang) only when its translation strings file exists at
 * `./translations/{code}.ts`. Availability is therefore *derived from file
 * presence* — see `getActiveLanguages()`.
 *
 * To add a new language:
 *   1. Confirm its code + metadata exist in `LANGUAGE_CODES` / `LANGUAGES` below
 *      (all 16 target languages are already registered).
 *   2. Create `./translations/{code}.ts` exporting a `SiteTranslations` object
 *      named after the code (e.g. `export const pt = { ... }`).
 *   3. Create the content collection files under
 *      `src/content/{methodology,spec,kit,pages}/{code}/` (English slugs).
 *   That's it — no page wrappers, no edits to routing/middleware/registry.
 */

import { LANGUAGE_CODES } from './language-codes';

/**
 * Target language codes (bare BCP-47, no region suffix). The canonical list
 * lives in the dependency-free `./language-codes` module (so the Astro config
 * can import it too); it is re-exported here as the source of the `Language`
 * type. Region-qualified forms (for Open Graph / Intl) live per-language in
 * `LANGUAGES` below.
 */
export { LANGUAGE_CODES };

/** Supported language codes. */
export type Language = (typeof LANGUAGE_CODES)[number];

/** Default (fallback) language — used when no language prefix is detected */
export const DEFAULT_LANGUAGE: Language = 'en';

/** Metadata for a supported language */
export interface LanguageConfig {
  /** ISO language code (bare BCP-47) */
  code: Language;
  /** English name */
  name: string;
  /** Native name (displayed in language selector) */
  nativeName: string;
  /** BCP 47 hreflang value + `<html lang>` (bare code in our scheme) */
  hreflang: string;
  /** `<html lang>` attribute value */
  htmlLang: string;
  /** BCP 47 locale for date formatting (e.g. 'pt-BR') */
  dateLocale: string;
  /** OpenGraph locale (underscore form, e.g. 'pt_BR') */
  ogLocale: string;
  /** Flag emoji for UI display */
  flag: string;
  /** URL path prefix (empty string for default language) */
  urlPrefix: string;
}

/**
 * Language registry — metadata for every target language.
 * The default language (`en`) MUST have an empty urlPrefix.
 */
export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    hreflang: 'en',
    htmlLang: 'en',
    dateLocale: 'en-US',
    ogLocale: 'en_US',
    flag: '🇬🇧',
    urlPrefix: '',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    hreflang: 'es',
    htmlLang: 'es',
    dateLocale: 'es-ES',
    ogLocale: 'es_ES',
    flag: '🇪🇸',
    urlPrefix: '/es',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    hreflang: 'pt',
    htmlLang: 'pt',
    dateLocale: 'pt-BR',
    ogLocale: 'pt_BR',
    flag: '🇧🇷',
    urlPrefix: '/pt',
  },
  zh: {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '中文',
    hreflang: 'zh',
    htmlLang: 'zh',
    dateLocale: 'zh-CN',
    ogLocale: 'zh_CN',
    flag: '🇨🇳',
    urlPrefix: '/zh',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    hreflang: 'ja',
    htmlLang: 'ja',
    dateLocale: 'ja-JP',
    ogLocale: 'ja_JP',
    flag: '🇯🇵',
    urlPrefix: '/ja',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    hreflang: 'de',
    htmlLang: 'de',
    dateLocale: 'de-DE',
    ogLocale: 'de_DE',
    flag: '🇩🇪',
    urlPrefix: '/de',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    hreflang: 'fr',
    htmlLang: 'fr',
    dateLocale: 'fr-FR',
    ogLocale: 'fr_FR',
    flag: '🇫🇷',
    urlPrefix: '/fr',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    hreflang: 'ko',
    htmlLang: 'ko',
    dateLocale: 'ko-KR',
    ogLocale: 'ko_KR',
    flag: '🇰🇷',
    urlPrefix: '/ko',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    hreflang: 'ru',
    htmlLang: 'ru',
    dateLocale: 'ru-RU',
    ogLocale: 'ru_RU',
    flag: '🇷🇺',
    urlPrefix: '/ru',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    hreflang: 'it',
    htmlLang: 'it',
    dateLocale: 'it-IT',
    ogLocale: 'it_IT',
    flag: '🇮🇹',
    urlPrefix: '/it',
  },
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    hreflang: 'tr',
    htmlLang: 'tr',
    dateLocale: 'tr-TR',
    ogLocale: 'tr_TR',
    flag: '🇹🇷',
    urlPrefix: '/tr',
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    hreflang: 'id',
    htmlLang: 'id',
    dateLocale: 'id-ID',
    ogLocale: 'id_ID',
    flag: '🇮🇩',
    urlPrefix: '/id',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    hreflang: 'vi',
    htmlLang: 'vi',
    dateLocale: 'vi-VN',
    ogLocale: 'vi_VN',
    flag: '🇻🇳',
    urlPrefix: '/vi',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    hreflang: 'hi',
    htmlLang: 'hi',
    dateLocale: 'hi-IN',
    ogLocale: 'hi_IN',
    flag: '🇮🇳',
    urlPrefix: '/hi',
  },
  pl: {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    hreflang: 'pl',
    htmlLang: 'pl',
    dateLocale: 'pl-PL',
    ogLocale: 'pl_PL',
    flag: '🇵🇱',
    urlPrefix: '/pl',
  },
  uk: {
    code: 'uk',
    name: 'Ukrainian',
    nativeName: 'Українська',
    hreflang: 'uk',
    htmlLang: 'uk',
    dateLocale: 'uk-UA',
    ogLocale: 'uk_UA',
    flag: '🇺🇦',
    urlPrefix: '/uk',
  },
  th: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ไทย',
    hreflang: 'th',
    htmlLang: 'th',
    dateLocale: 'th-TH',
    ogLocale: 'th_TH',
    flag: '🇹🇭',
    urlPrefix: '/th',
  },
};

// ---------------------------------------------------------------------------
// Active-language detection (derived from translation file presence)
// ---------------------------------------------------------------------------

/**
 * Lazy glob of the translation files (keys only — modules are NOT loaded here).
 * Vite resolves the glob at build time relative to this file, so the set of
 * `translations/{code}.ts` files determines which languages are active.
 */
const translationFileModules = import.meta.glob('./translations/*.ts');

/** Language codes that have a translation strings file present. */
const ACTIVE_LANGUAGE_CODES: Language[] = LANGUAGE_CODES.filter((code) =>
  Object.keys(translationFileModules).some((path) =>
    path.endsWith(`/${code}.ts`)
  )
);

// ---------------------------------------------------------------------------
// Utility functions
// ---------------------------------------------------------------------------

/** Get all registered (target) language codes — the full 16-language set. */
export function getSupportedLanguages(): Language[] {
  return Object.keys(LANGUAGES) as Language[];
}

/**
 * Get the languages that are actually live (have a translation strings file).
 * Route generation, the language switcher, and hreflang must use this — never
 * the full target set — so partially-translated languages never ship broken
 * pages. The default language is always active.
 */
export function getActiveLanguages(): Language[] {
  const active = ACTIVE_LANGUAGE_CODES.includes(DEFAULT_LANGUAGE)
    ? ACTIVE_LANGUAGE_CODES
    : [DEFAULT_LANGUAGE, ...ACTIVE_LANGUAGE_CODES];
  // Preserve registry order for stable output.
  return getSupportedLanguages().filter((lang) => active.includes(lang));
}

/** Check whether a language is currently active. */
export function isActiveLanguage(lang: Language): boolean {
  return getActiveLanguages().includes(lang);
}

/** Get metadata for a specific language */
export function getLanguageConfig(lang: Language): LanguageConfig {
  return LANGUAGES[lang];
}

/** Get the default language */
export function getDefaultLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

/** Check if a string is a valid language code */
export function isValidLanguage(value: string): value is Language {
  return value in LANGUAGES;
}

/** Check if a language is the default language */
export function isDefaultLanguage(lang: Language): boolean {
  return lang === DEFAULT_LANGUAGE;
}

/** Get URL prefix for a language (empty string for default) */
export function getUrlPrefix(lang: Language): string {
  return LANGUAGES[lang].urlPrefix;
}

/** Get BCP 47 date locale string */
export function getDateLocale(lang: Language): string {
  return LANGUAGES[lang].dateLocale;
}

/** Get OpenGraph locale string */
export function getOGLocale(lang: Language): string {
  return LANGUAGES[lang].ogLocale;
}

/** Get hreflang value for a language */
export function getHreflang(lang: Language): string {
  return LANGUAGES[lang].hreflang;
}

/** Get flag emoji for a language */
export function getFlag(lang: Language): string {
  return LANGUAGES[lang].flag;
}

/** Build a localized URL path */
export function getLocalizedUrl(path: string, lang: Language): string {
  const prefix = getUrlPrefix(lang);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${cleanPath}`;
}

/** Strip language prefix from a URL path to get the base path */
export function stripLangPrefix(path: string): string {
  for (const lang of getActiveLanguages()) {
    const prefix = getUrlPrefix(lang);
    if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) {
      return path.slice(prefix.length) || '/';
    }
  }
  return path;
}

/** Detect language from a URL path */
export function getLangFromUrl(pathname: string): Language {
  for (const lang of getActiveLanguages()) {
    const prefix = getUrlPrefix(lang);
    if (
      prefix &&
      (pathname === prefix ||
        pathname === `${prefix}/` ||
        pathname.startsWith(`${prefix}/`))
    ) {
      return lang;
    }
  }
  return DEFAULT_LANGUAGE;
}

/**
 * Get alternate language URLs for the current path (for hreflang tags and
 * language selector links). Enumerates only **active** languages.
 */
export function getAlternateUrls(
  currentPath: string
): { lang: Language; url: string }[] {
  const basePath = stripLangPrefix(currentPath);
  return getActiveLanguages().map((lang) => ({
    lang,
    url: getLocalizedUrl(basePath, lang),
  }));
}
