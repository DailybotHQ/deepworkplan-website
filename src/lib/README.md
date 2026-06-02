# Library (`src/lib/`)

This directory contains utility functions, constants, types, and enums used throughout the application.

## Directory Structure

```
lib/
├── i18n.ts                    # Centralized i18n config & utilities
├── constances.ts              # Site-wide constants
├── enum.ts                    # Shared enumerations
├── analytics.ts               # Event tracking helpers and EVENTS map
├── markdown-for-agents.ts     # Serialize pages/reader entries to agent Markdown
├── rehype-responsive-tables.mjs  # Rehype plugin for responsive tables
└── translations/              # Modular i18n translation system
    ├── index.ts               # Public API barrel: getTranslations(), re-exports
    ├── types.ts               # SiteTranslations interface + all sub-interfaces
    ├── en.ts                  # English translations
    └── es.ts                  # Spanish translations
```

## File Overview

### translations/

Modular centralized translation system for the entire site.

#### Directory Structure

```
src/lib/translations/
├── index.ts    # Public API barrel: getTranslations(), re-exports
├── types.ts    # SiteTranslations interface + all sub-interfaces
├── en.ts       # English translations
└── es.ts       # Spanish translations
```

#### Public API (index.ts)

The `index.ts` file exports the public API:

| Export | Description |
|--------|-------------|
| `getTranslations(lang)` | Get translation object for language |
| `isValidLanguage(lang)` | Check if language code is valid (re-exported from `../i18n.ts`) |
| `getDefaultLanguage()` | Returns `'en'` (re-exported from `../i18n.ts`) |
| `Language` type | Re-exported from `../i18n.ts` |
| `SiteTranslations` type | Re-exported from `./types.ts` |
| Sub-interfaces | Re-exported from `./types.ts` for convenience |

#### Types (types.ts)

Contains the `SiteTranslations` interface and all sub-interfaces:

```typescript
export interface SiteTranslations {
  siteTitle: string;
  siteDescription: string;
  nav: { home: string; methodology: string; spec: string; kit: string; /* ... */ };
  footer: { copyright: string; allRightsReserved: string; poweredBy: string; };
  home: { hero: { /* ... */ }; quickstart: { /* ... */ }; outcomes: { /* ... */ }; /* ... */ };
  contact: { title: string; nameLabel: string; /* ... */ };
  methodologyPage: { /* ... */ };
  specPage: { /* ... */ };
  kitPage: { /* ... */ };
  initPage: { /* ... */ };
  // ... more translation keys
}
```

#### Locale Files (en.ts, es.ts)

Each locale file exports a complete `SiteTranslations` object:

```typescript
// src/lib/translations/en.ts
import type { SiteTranslations } from './types';

export const en: SiteTranslations = {
  siteTitle: 'Deep Work Plan',
  siteDescription: 'Methodology and reference kit for AI coding agents',
  nav: { /* ... */ },
  // ... all keys
};
```

#### Usage

```typescript
import { getTranslations, type Language } from '@/lib/translations';

const lang: Language = 'es';
const t = getTranslations(lang);

console.log(t.nav.methodology); // "Metodología"
console.log(t.nav.spec);        // "Especificación"
console.log(t.nav.kit);         // "Kit"
```

#### Adding a New Language

1. Create `src/lib/translations/{lang}.ts` (e.g., `pt.ts`)
2. Export a complete `SiteTranslations` object (use `en.ts` as reference)
3. Import it in `src/lib/translations/index.ts`:
   ```typescript
   import { pt } from './pt';
   const translations: Record<Language, SiteTranslations> = { en, es, pt };
   ```
4. Update the `Language` type in `src/lib/i18n.ts`

#### Adding New Translation Keys

1. Add the field to the `SiteTranslations` interface in `types.ts`
2. Add the translation to both `en.ts` and `es.ts` (and any other active locales)
3. Use the new key via `getTranslations(lang)` in components

---

### i18n.ts

Centralized i18n configuration and helpers. Defines the `Language` type and the
canonical helpers used across the site.

| Export | Description |
|--------|-------------|
| `Language` type | Union of active language codes (`'en' \| 'es'`) |
| `isValidLanguage(lang)` | Type guard for valid language codes |
| `getDefaultLanguage()` | Returns the default language (`'en'`) |
| `getUrlPrefix(lang)` | URL prefix for a language (`''` for EN, `'/es'` for ES) |

---

### markdown-for-agents.ts

Serializes pages and reader entries into agent-friendly Markdown, powering the
`.md` endpoints (e.g. `/methodology/[slug].md.ts`, `/[page].md.ts`).

| Function | Description |
|----------|-------------|
| `serializePageToAgentMarkdown(...)` | Serialize a static page to agent Markdown |
| `serializeReaderEntryToAgentMarkdown(...)` | Serialize a methodology/spec/kit entry to agent Markdown |

---

### analytics.ts

Privacy-friendly event tracking helpers and the `EVENTS` map. Tracked events:
`NAV_CLICK`, `LANGUAGE_SWITCH`, `MOBILE_MENU_TOGGLE`, `THEME_TOGGLE`,
`CONTACT_FORM_SUBMIT`, `CONTACT_FORM_ERROR`, `SOCIAL_CLICK`, `OUTBOUND_CLICK`,
`SCROLL_DEPTH`, `AI_BOT_VISIT`.

---

### constances.ts

Site-wide constants.

| Constant | Type | Description |
|----------|------|-------------|
| `SITE_TITLE` | `string` | Site title (meta tags) |
| `SITE_DESCRIPTION` | `string` | Default meta description |
| `ANALYTICS` | `object` | Umami + verification config (env-driven) |
| `CONTACT_FORM` | `object` | Google Forms contact endpoint config |

**Usage:**

```typescript
import { SITE_TITLE, SITE_DESCRIPTION, ANALYTICS, CONTACT_FORM } from '@/lib/constances';
```

---

### enum.ts

Shared enumeration types.

```typescript
export enum LanguageEType {
  LEFT = 'left',
  RIGHT = 'right',
}
```

**Note:** This is a legacy enum. For language codes, use the `Language` type from `translations.ts`.

---

## Import Alias

All lib files can be imported using the `@/lib/` alias:

```typescript
// Using alias (recommended)
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix, type Language } from '@/lib/i18n';
import { SITE_TITLE } from '@/lib/constances';

// Using relative path
import { getTranslations } from '../lib/translations';
```

The alias is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Adding New Utilities

### Adding a New Function

1. Create or edit the appropriate file in `src/lib/`
2. Export the function
3. Add explicit TypeScript types on the function signature

```typescript
// src/lib/utils.ts
export function formatDate(date: Date, locale: string = 'en-US'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

### Adding a New Translation

1. Add the key to `SiteTranslations` interface in `types.ts`
2. Add translations to both `en.ts` and `es.ts`

```typescript
// In src/lib/translations/types.ts
export interface SiteTranslations {
  // ... existing keys
  newKey: string;
}

// In src/lib/translations/en.ts
export const en: SiteTranslations = {
  // ... existing
  newKey: 'English text',
};

// In src/lib/translations/es.ts
export const es: SiteTranslations = {
  // ... existing
  newKey: 'Spanish text',
};
```

### Adding a New Language

1. Add to `Language` type in `src/lib/i18n.ts`: `type Language = 'en' | 'es' | 'fr';`
2. Create new locale file `src/lib/translations/fr.ts` exporting a complete `SiteTranslations` object
3. Import it in `src/lib/translations/index.ts` and add to the `translations` record
4. Create routes under `src/pages/[lang]/` (or update the existing readers)
5. Add content folders `src/content/{methodology,spec,kit,pages}/[lang]/`

---

## Related Documentation

- [Content Collections](../content/README.md)
- [Components](../components/README.md)
- [i18n Guide](../../docs/I18N_GUIDE.md)
- [Architecture](../../docs/ARCHITECTURE.md)
