# Pages (`src/pages/`)

This directory contains all routes using Astro's file-based routing system. Each `.astro` or `.ts` file becomes a route based on its file path.

## Directory Structure

```
pages/
├── index.astro              # Homepage (/)
├── about.astro              # About page (/about)
├── contact.astro            # Contact page (/contact)
├── quickstart/index.astro   # Quickstart (/quickstart)
├── init/index.astro         # Canonical adoption endpoint (/init)
├── [page].md.ts             # Agent-friendly Markdown for static pages (/{page}.md)
├── methodology/
│   ├── index.astro          # Methodology reader index (/methodology)
│   ├── [slug].astro         # Methodology chapter (/methodology/{slug})
│   └── [slug].md.ts         # Agent Markdown (/methodology/{slug}.md)
├── spec/
│   ├── index.astro          # Spec reader index (/spec)
│   ├── [slug].astro         # Spec section (/spec/{slug})
│   └── [slug].md.ts         # Agent Markdown (/spec/{slug}.md)
├── kit/
│   ├── index.astro          # Kit catalog index (/kit)
│   ├── [slug].astro         # Kit entry (/kit/{slug})
│   └── [slug].md.ts         # Agent Markdown (/kit/{slug}.md)
├── examples/
│   ├── index.astro          # Examples index (/examples)
│   ├── [slug].astro         # Example detail (/examples/{slug})
│   └── [slug].md.ts         # Agent Markdown (/examples/{slug}.md)
├── internal/                # Dev-only hub (excluded from production)
└── es/                      # Spanish routes (mirror of the above)
    └── index.astro          # Spanish homepage (/es)
```

## Route Table

| File | Route | Description |
|------|-------|-------------|
| `index.astro` | `/` | English homepage |
| `about.astro` | `/about` | About page |
| `contact.astro` | `/contact` | Contact page |
| `quickstart/index.astro` | `/quickstart` | Quickstart guide |
| `init/index.astro` | `/init` | Canonical adoption endpoint |
| `[page].md.ts` | `/{page}.md` | Agent-friendly Markdown for static pages |
| `methodology/index.astro` | `/methodology` | Methodology reader index |
| `methodology/[slug].astro` | `/methodology/{slug}` | Methodology chapter |
| `spec/index.astro` | `/spec` | Specification reader index |
| `spec/[slug].astro` | `/spec/{slug}` | Specification section |
| `kit/index.astro` | `/kit` | Kit catalog index |
| `kit/[slug].astro` | `/kit/{slug}` | Kit entry |
| `examples/[slug].astro` | `/examples/{slug}` | Example detail |
| `es/index.astro` | `/es` | Spanish homepage |

> **Middleware allowlist:** New top-level routes must be added to the
> `KNOWN_ROOT_PATHS` / `KNOWN_ES_PATHS` allowlist in `src/middleware.ts`, or they
> return 404. See [Architecture → Middleware Allowlist](../../docs/ARCHITECTURE.md#middleware-allowlist-critical).

## Route Patterns

### Static Routes

Files without brackets become static routes:

```
pages/about.astro → /about
pages/contact.astro → /contact
```

### Dynamic Routes

Files with brackets (`[]`) become dynamic routes:

```
pages/methodology/[slug].astro → /methodology/core-loop
pages/spec/[slug].astro        → /spec/validation-gates
pages/kit/[slug].astro         → /kit/claude
```

### Rest Parameters

The `[...slug]` syntax captures all segments when a route needs nested paths:

```
pages/[...slug].astro
→ /my-slug
→ /nested/path/here
```

## Page Patterns

### Page Wrapper Pattern (Standard)

All content pages use the **Page wrapper pattern**. Pages in `src/pages/` are ultra-minimal 3-line wrappers. The real logic (`MainLayout`, translations, content) lives inside `*Page.astro` components in `src/components/pages/`.

**Thin wrapper** (`src/pages/about.astro`):

```astro
---
import AboutPage from '@/components/pages/AboutPage.astro';
---
<AboutPage lang="en" />
```

**Shared component** (`src/components/pages/AboutPage.astro`):

```astro
---
import MainLayout from '@/layouts/MainLayout.astro';
import { getTranslations } from '@/lib/translations';
import type { Language } from '@/lib/i18n';

interface Props { lang: Language; }
const { lang } = Astro.props;
const t = getTranslations(lang);
---
<MainLayout lang={lang} title={t.aboutPage.title} description={t.aboutPage.description}>
  <main class="main-container py-24">
    <!-- Content using t.* for text -->
  </main>
</MainLayout>
```

**Key rules:**
- Page wrappers never import `MainLayout` — the `*Page.astro` component handles it internally
- `lang` is passed as a string literal (`"en"`, `"es"`), not a variable

### Dynamic Page with `getStaticPaths`

For dynamic routes, you must export `getStaticPaths`:

```astro
---
import { getCollection, render } from 'astro:content';
import MainLayout from '@/layouts/MainLayout.astro';

export async function getStaticPaths() {
  const chapters = await getCollection('methodology', ({ data }) => data.lang === 'en');
  return chapters.map(entry => ({
    params: { slug: entry.id.replace(/^en\//, '') },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---

<MainLayout lang="en" title={entry.data.title} description={entry.data.description}>
  <Content />
</MainLayout>
```

## Agent-Friendly Markdown Endpoints

Each rendered HTML page has a matching `.md` endpoint so AI agents can read clean
Markdown. These are `.md.ts` route files that use the serializers in
`@/lib/markdown-for-agents`:

```typescript
// pages/methodology/[slug].md.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { serializeReaderEntryToAgentMarkdown } from '@/lib/markdown-for-agents';

export async function getStaticPaths() {
  const chapters = await getCollection('methodology', ({ data }) => data.lang === 'en');
  return chapters.map(entry => ({
    params: { slug: entry.id.replace(/^en\//, '') },
    props: { entry },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const body = await serializeReaderEntryToAgentMarkdown(props.entry);
  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
```

Parity between HTML pages and their `.md` endpoints is enforced by
`pnpm run md:check`.

## i18n Pattern

Currently using folder-based i18n:

- English: `/` (root)
- Spanish: `/es/`

See [i18n Guide](../../docs/I18N_GUIDE.md) for details.

## Creating a New Page

### Static Page (Page Wrapper Pattern)

1. **Create the shared component** in `src/components/pages/`:
   ```bash
   touch src/components/pages/NewPage.astro
   ```

   ```astro
   ---
   // src/components/pages/NewPage.astro
   import MainLayout from '@/layouts/MainLayout.astro';
   import { getTranslations } from '@/lib/translations';
   import type { Language } from '@/lib/i18n';

   interface Props { lang: Language; }
   const { lang } = Astro.props;
   const t = getTranslations(lang);
   ---
   <MainLayout lang={lang} title="New Page" description="Description">
     <main class="main-container py-24">
       <h1>New Page</h1>
     </main>
   </MainLayout>
   ```

2. **Create thin wrappers** for each language:
   ```astro
   ---
   // src/pages/new-page.astro
   import NewPage from '@/components/pages/NewPage.astro';
   ---
   <NewPage lang="en" />
   ```

   ```astro
   ---
   // src/pages/es/new-page.astro
   import NewPage from '@/components/pages/NewPage.astro';
   ---
   <NewPage lang="es" />
   ```

### Dynamic Page

1. Create file with brackets:
   ```bash
   touch src/pages/items/[id].astro
   ```

2. Export `getStaticPaths`:
   ```astro
   ---
   export async function getStaticPaths() {
     const items = await getItems();
     return items.map(item => ({
       params: { id: item.id },
       props: { item },
     }));
   }

   const { item } = Astro.props;
   ---
   ```

### API Endpoint

1. Create `.ts` file:
   ```bash
   touch src/pages/api/data.json.ts
   ```

2. Export handler:
   ```typescript
   import type { APIRoute } from 'astro';
   
   export const GET: APIRoute = async () => {
     return new Response(JSON.stringify({ data: [] }), {
       headers: { 'Content-Type': 'application/json' },
     });
   };
   ```

## Related Documentation

- [Layouts](../layouts/README.md)
- [Content Collections](../content/README.md)
- [API Reference](../../docs/API_REFERENCE.md)
- [i18n Guide](../../docs/I18N_GUIDE.md)
- [Architecture](../../docs/ARCHITECTURE.md)
