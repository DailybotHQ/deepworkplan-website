# Internationalization (i18n) Guide

Guide for implementing and maintaining multilingual support in deepworkplan.com.

## Overview

deepworkplan.com is a multilingual site engineered to scale to **N languages**.
The registry targets **16 languages**; a language goes **live only when its
translation files exist** (availability is derived from file presence — see
`getActiveLanguages()`). The i18n system is built on four pillars:

1. **Centralized registry** in `src/lib/i18n.ts` (`LANGUAGE_CODES`, `LANGUAGES`,
   helpers) + the dependency-free `src/lib/language-codes.ts` (shared with the
   Astro config).
2. **Per-file translations** auto-discovered in `src/lib/translations/` (one
   `<code>.ts` per language, loaded via `import.meta.glob`).
3. **Dynamic `[lang]` routing** — English at `/`, every other active language
   under `/[lang]/` from a single dynamic route tree (no per-language wrappers).
4. **Language-split content collections** for methodology/spec/kit/pages docs
   (`en/`, `es/`, `pt/`, … folders sharing English slugs).

| Language | Code | Route Prefix | Status |
|----------|------|-------------|--------|
| English | `en` | `/` (root) | Default (canonical) |
| Spanish | `es` | `/es/` | Live |
| Portuguese | `pt` | `/pt/` | Target |
| Chinese (Simplified) | `zh` | `/zh/` | Target |
| Japanese | `ja` | `/ja/` | Target |
| German | `de` | `/de/` | Target |
| French | `fr` | `/fr/` | Target |
| Korean | `ko` | `/ko/` | Target |
| Russian | `ru` | `/ru/` | Target |
| Italian | `it` | `/it/` | Target |
| Turkish | `tr` | `/tr/` | Target |
| Indonesian | `id` | `/id/` | Target |
| Vietnamese | `vi` | `/vi/` | Target |
| Hindi | `hi` | `/hi/` | Target |
| Polish | `pl` | `/pl/` | Target |
| Ukrainian | `uk` | `/uk/` | Target |
| Thai | `th` | `/th/` | Target |

> "Target" languages are registered but go live only once their
> `src/lib/translations/<code>.ts` + content files exist. Bare BCP-47 codes are
> used in URLs/IDs; region-qualified forms (`ogLocale` `pt_BR`, `dateLocale`
> `pt-BR`) live in the registry. Arabic (RTL) is a planned future wave.

## Adding a New Language

1. The 16 target languages are already in `LANGUAGE_CODES` / `LANGUAGES`
   (`src/lib/i18n.ts`). For a brand-new language beyond those, add its code to
   `src/lib/language-codes.ts` and a `LANGUAGES` entry (name, nativeName,
   hreflang, ogLocale, dateLocale, urlPrefix, flag).
2. Scaffold the English-seeded skeleton:
   ```bash
   pnpm run i18n:scaffold <code>   # creates <code>.ts + content/{coll}/<code>/
   ```
3. Translate every string value and content body following the **translation
   style guide** (brand voice, glossary, do-not-translate list, locale
   conventions, two-pass review). Keep English slugs, code, and the
   `https://deepworkplan.com/init.md` bootstrap URL.
4. Validate:
   ```bash
   pnpm run i18n:check      # content parity + script sanity
   pnpm run astro:check     # string-key parity (SiteTranslations interface)
   pnpm run md:check:strict # agent .md endpoints
   pnpm run build
   ```

No route files, middleware edits, or registry plumbing are needed per language —
routing, the switcher, hreflang, sitemap, and the middleware allowlist all derive
from the registry + active-language detection.

## Translation System

### translations/ Structure

Translations live in `src/lib/translations/` — one file per language plus shared
plumbing:

- **`types.ts`** — the `SiteTranslations` interface (the shape every locale must
  satisfy; TypeScript enforces string-key parity across languages).
- **`<code>.ts`** — one per language (`en.ts`, `es.ts`, `pt.ts`, …), each
  exporting a `SiteTranslations` object named after its code (`export const pt`).
- **`index.ts`** — auto-discovers every `<code>.ts` via `import.meta.glob` and
  exposes `getTranslations(lang)` (falls back to English).

Language configuration lives in `src/lib/i18n.ts`:

- **`Language` type** — derived from the `LANGUAGE_CODES` tuple
- **`getTranslations(lang)`** — translation object for a language (English fallback)
- **`isValidLanguage(lang)`** — type guard for registered codes
- **`getDefaultLanguage()`** — returns `'en'`
- **`getActiveLanguages()` / `getActiveNonDefaultLanguages()`** — languages that
  actually have a strings file (drive routing, switcher, hreflang)
- **`CANONICAL_INIT_MD_PATH` / `getCanonicalInitMdUrl()`** — the always-English
  `/init.md` bootstrap endpoint

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

1. **Add the type** to the `SiteTranslations` interface (`types.ts`)
2. **Add the value** to **every active locale file** (`en.ts`, `es.ts`, and any
   other live `<code>.ts`). TypeScript fails the build until each satisfies the
   interface, so `pnpm run astro:check` is your key-parity gate.
3. **Use it in components** via `getTranslations(lang)`

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

English pages live at the root; **all other languages are served by a single
dynamic `[lang]` route tree** (no per-language mirror directories):

```
src/pages/
├── index.astro            # English (lang="en")
├── about.astro            # English
├── methodology/[slug].astro   # English methodology routes
├── spec/[slug].astro
├── kit/[slug].astro
└── [lang]/                # ALL non-default active languages (es, pt, zh, …)
    ├── index.astro            # getStaticPaths → getActiveNonDefaultLanguages()
    ├── about.astro
    ├── methodology/[slug].astro   # cross-product: langs × entries
    ├── spec/[slug].astro
    ├── kit/[slug].astro
    ├── examples/[slug].astro
    ├── [page].md.ts               # agent .md endpoints, per language
    └── …
```

Each dynamic route's `getStaticPaths` enumerates `getActiveNonDefaultLanguages()`,
so a registered-but-untranslated language emits nothing (no broken pages), and a
newly-translated language lights up its full route set automatically. English
keeps its unprefixed root URLs; there is no `/en/` tree.

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

The header (and mobile menu) include a language switcher built from
`getActiveLanguages()`. The collapsed trigger shows the **current language code
only** (e.g. `EN`); the open dropdown lists every other active language as
**`Native name (Code)`** — e.g. `Español (Es)`, `Português (Pt)`, `中文 (Zh)` —
so codes aren't cryptic at 16 languages. It maps the current path to each
language version (preserving the page), e.g. `/about` ↔ `/es/about` ↔ `/pt/about`.

## Bilingual Compliance Checklist

Before committing any content change, verify:

- [ ] New pages added to the root (EN) and the shared `src/pages/[lang]/` tree (all other languages — one dynamic route, not per-language wrappers)
- [ ] All new/modified methodology/spec/kit docs exist in every active language folder (`{collection}/{code}/`) with matching English slugs
- [ ] All new UI strings exist in every active locale file (`en.ts`, `es.ts`, …) — `pnpm run astro:check` enforces key parity
- [ ] `pnpm run i18n:check` passes (content parity + script sanity)
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
