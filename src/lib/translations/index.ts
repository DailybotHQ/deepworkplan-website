/**
 * Site-wide translations
 *
 * This barrel re-exports the public API for translations.
 * Language configuration (type, registry, utilities) lives in ../i18n.ts.
 *
 * Locale files are auto-discovered: any `./{code}.ts` that exports a
 * `SiteTranslations` object named after its language code (e.g.
 * `export const pt = { ... }`) is registered automatically. Adding a language
 * needs NO edit to this file — just drop in the locale file and the content.
 */

import { isValidLanguage, type Language } from '../i18n';
import type { SiteTranslations } from './types';

/**
 * Eagerly load every locale module. The glob matches `en.ts`, `es.ts`, `pt.ts`,
 * … as well as `types.ts`/`index.ts`; non-language files are filtered out below
 * because their basename is not a valid language code.
 */
const localeModules = import.meta.glob<Record<string, unknown>>('./*.ts', {
  eager: true,
});

const translations = {} as Record<Language, SiteTranslations>;

for (const [path, mod] of Object.entries(localeModules)) {
  const code = path.replace(/^\.\//, '').replace(/\.ts$/, '');
  if (!isValidLanguage(code)) continue; // skips types.ts, index.ts, etc.
  const value = mod[code];
  if (value) {
    translations[code] = value as SiteTranslations;
  }
}

/**
 * Get translations for a specific language. Falls back to English when a
 * language has no strings file yet.
 * @param lang - Language code
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language): SiteTranslations {
  return translations[lang] || translations.en;
}

export type { Language } from '../i18n';
/**
 * Check if a language code is supported.
 * Delegates to the centralized i18n module.
 */
export { getDefaultLanguage, isValidLanguage } from '../i18n';
// Re-export types for consumer convenience
// Re-export sub-interfaces that consumers may need
export type {
  Activity,
  Education,
  Experience,
  HighlightItem,
  LanguageSkill,
  PagePassion,
  SiteTranslations,
  SkillCategory,
  Venture,
} from './types';

export default translations;
