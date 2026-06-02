# Internationalization (i18n) Guide

Guide for implementing and maintaining multilingual support in deepworkplan.com.

## Overview

deepworkplan.com is a fully bilingual site supporting English and Spanish. The i18n system is built on three pillars:

1. **Centralized translations** via `src/lib/translations.ts`
2. **Route-based language routing** (English at `/`, Spanish at `/es/`)
3. **Language-split content collections** for methodology/spec/kit docs (`en/` and `es/` folders)

| Language | Code | Route Prefix | Status |
|----------|------|-------------|--------|
| English  | `en` | `/` (root)  | Default |
| Spanish  | `es` | `/es/`      | Secondary |

## Translation System

### translations.ts Structure

The central translation file at `src/lib/translations.ts` contains all UI strings for both languages. It exports:

- **`Language` type** — `'en' | 'es'`
- **`SiteTranslations` interface** — Full type definition for all translation keys
- **`getTranslations(lang)` function** — Returns the translation object for a given language
- **`isValidLanguage(lang)` function** — Type guard to validate language strings
- **`getDefaultLanguage()` function** — Returns `'en'`

The file is organized into logical sections:

```typescript
export interface SiteTranslations {
  // Site metadata: siteTitle, siteDescription
  // Navigation: nav.home, nav.methodology, nav.about, ...
  // Footer: footer.copyright, footer.allRightsReserved
  // Homepage: hero, homeSections, contact
  // Content pages: aboutPage, contactPage, examplesPage, ...
  // Dates: dateLocale
}
```

Each language has its own object (`en` and `es`) implementing this interface with complete key parity.

### Using Translations in Components

**Astro components (.astro):**

```astro
---
import { getTranslations } from '@/lib/translations';

const lang: string = 'en'; // or from props/URL
const t = getTranslations(lang);
---

<h1>{t.aboutPage.title}</h1>
<p>{t.aboutPage.description}</p>
```

**Svelte components (.svelte):**

```svelte
<script>
import { getTranslations } from '@/lib/translations';

export let lang = 'en';
$: t = getTranslations(lang);
</script>

<h1>{t.aboutPage.title}</h1>
```

### Adding New Translation Keys

When adding a new user-visible string:

1. **Add the type** to `SiteTranslations` interface
2. **Add the English value** to the `en` object
3. **Add the Spanish value** to the `es` object — MUST be added simultaneously
4. **Use it in components** via `getTranslations(lang)`

```typescript
// 1. In the interface
export interface SiteTranslations {
  // ...
  myNewKey: string;
}

// 2. In the English translations
const en: SiteTranslations = {
  // ...
  myNewKey: 'My new text',
};

// 3. In the Spanish translations
const es: SiteTranslations = {
  // ...
  myNewKey: 'Mi nuevo texto',
};
```

For function-based translations (with parameters):

```typescript
// Interface
itemsInSection: (section: string) => string;

// English
itemsInSection: (section) => `Items in "${section}"`,

// Spanish
itemsInSection: (section) => `Elementos en "${section}"`,
```

## Bilingual Content

### Methodology / Spec / Kit Docs

Documentation content is organized in language-specific folders inside each collection:

```
src/content/methodology/
├── en/
│   ├── introduction.md
│   ├── adoption.md
│   └── ...
└── es/
    ├── introduction.md
    ├── adoption.md
    └── ...
```

The same pattern applies to `src/content/spec/` and `src/content/kit/`. Each doc carries a `lang` field in its frontmatter, and language filtering uses it:

```typescript
// English docs
const enDocs = await getCollection('methodology', ({ data }) => data.lang === 'en');

// Spanish docs
const esDocs = await getCollection('methodology', ({ data }) => data.lang === 'es');
```

**Frontmatter requirements:**

- `title` and `description` must be translated
- `order` (and `lang`-neutral structural fields) must stay consistent between language pairs
- Filenames must match between `en/` and `es/` folders (slugs are always English)

**Spanish content voice:**

- Use **tuteo** (tú/tienes/puedes), NOT **voseo** (vos/tenés/podés) — the register is informal-professional with Colombian Spanish phrasing
- Proper diacritical marks are mandatory (see [Standards](STANDARDS.md))

### Pages

Pages follow a route-based approach:

```
src/pages/
├── index.astro            # English (lang="en")
├── about.astro            # English
├── contact.astro          # English
├── methodology/           # English methodology routes
│   └── [slug].astro
├── spec/                  # English spec routes
│   └── [slug].astro
├── kit/                   # English kit routes
│   └── [slug].astro
└── es/
    ├── index.astro        # Spanish (lang="es")
    ├── about.astro        # Spanish
    ├── contact.astro      # Spanish
    ├── methodology/       # Spanish methodology routes (mirrors EN)
    │   └── [slug].astro
    ├── spec/
    │   └── [slug].astro
    └── kit/
        └── [slug].astro
```

Every English page must have a Spanish equivalent under `es/`, and vice versa.

### Page Wrapper Pattern

All content pages use the **Page wrapper pattern**. Pages in `src/pages/` are ultra-minimal 3-line routing wrappers. The real logic (`MainLayout`, translations, SEO metadata, content) lives inside `*Page.astro` components in `src/components/pages/`.

**Shared page component** (`src/components/pages/AboutPage.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import { getUrlPrefix } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
const prefix = getUrlPrefix(lang);
---

<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <section>
    <h1>{t.aboutPage.title}</h1>
    <!-- Content using t.* for text and prefix for URLs -->
  </section>
</MainLayout>
```

**Thin page wrapper** (`src/pages/about.astro`):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

**Key rules:**
- Page components handle `MainLayout` internally — wrappers never import `MainLayout`
- The `lang` prop is passed as a **string literal** (`"en"`, `"es"`), not a variable
- For a new page: create 1 `*Page.astro` component + N thin wrappers (one per language)

### Component i18n Pattern

Components receive the `lang` prop and use `getTranslations()`:

```svelte
<script>
import { getTranslations } from '@/lib/translations';

export let lang = 'en';
$: t = getTranslations(lang);
</script>

<p>{t.someKey}</p>
```

The `lang` prop flows through the component hierarchy:

```
Page wrapper (src/pages/about.astro)
  → *Page.astro component (lang="en"|"es")
    → MainLayout (lang)
      → Header (lang)
      → Footer (lang)
    → Child components (lang)
      → uses getTranslations(lang)
```

**Rules:**
- Never hardcode user-visible text in component templates
- Always use `getTranslations(lang)` for translatable strings
- Always pass `lang` to child components that display text
- Never import `MainLayout` in page wrappers — it belongs inside `*Page.astro` components

## Date Formatting

Dates use locale-specific formatting via the `dateLocale` translation key:

```typescript
// translations.ts
en: { dateLocale: 'en-US' },
es: { dateLocale: 'es-ES' },
```

The `FormattedDate.astro` component handles locale-aware formatting:

```astro
---
interface Props {
  date: Date;
  lang?: string;
}

const { date, lang = 'en' } = Astro.props;
const locale = lang === 'es' ? 'es-ES' : 'en-US';
---

<time datetime={date.toISOString()}>
  {date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</time>
```

## Language Switcher

The header includes a language switcher that toggles between English and Spanish. It maps current route paths between language versions:

- `/about/` ↔ `/es/about/`
- `/methodology/introduction/` ↔ `/es/methodology/introduction/`
- `/kit/` ↔ `/es/kit/`

## Bilingual Compliance Checklist

Before committing any content change, verify:

- [ ] All new/modified pages exist in both `src/pages/` and `src/pages/es/`
- [ ] All new/modified methodology/spec/kit docs exist in both `{collection}/en/` and `{collection}/es/`
- [ ] All new UI strings in `translations.ts` have both English and Spanish values
- [ ] No hardcoded user-visible text in components (use `getTranslations()`)
- [ ] Date formatting uses locale-aware formatting with `lang` prop
- [ ] Page titles and SEO descriptions use translation keys
- [ ] The `lang` prop is passed through the full component hierarchy
- [ ] Page Markdown files exist in both `src/content/pages/en/` and `src/content/pages/es/`
- [ ] When page content or translations change, corresponding `.md` files updated (both languages)

## Known Limitations

1. **Minor aria-labels** — Some accessibility attributes (e.g., ThemeToggle) may have hardcoded English text; prefer `getTranslations(lang)` when adding new ones.

## Resources

- [Astro i18n Recipes](https://docs.astro.build/en/recipes/i18n/)
- [W3C Internationalization](https://www.w3.org/International/)
- [Google Hreflang Guide](https://developers.google.com/search/docs/specialty/international/localized-versions)
