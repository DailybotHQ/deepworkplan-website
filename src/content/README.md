# Content Collections (`src/content/`)

This directory contains the site's Content Collections. Astro's Content Collections provide type-safe frontmatter validation and easy querying of content. The schemas are defined in `src/content.config.ts`:

```typescript
export const collections = { pages, methodology, spec, kit };
```

## Directory Structure

```
content/
├── methodology/        # Methodology chapters (primary content)
│   ├── en/             # English chapters (e.g. 01-manifesto.md, 02-core-loop.md)
│   └── es/             # Spanish chapters (matching English slugs)
├── spec/               # Readable specification, split into ordered sections
│   ├── en/
│   └── es/
├── kit/                # Kit catalog: commands, adapters, presets, examples, addons
│   ├── en/
│   └── es/
└── pages/              # Agent-friendly Markdown endpoints (one per rendered page)
    ├── en/
    └── es/
```

**Bilingual requirement:** Every entry **must** exist in both `en/` and `es/` with the **same English slug**. Spanish content must carry correct diacritics (`ñ`, tildes, `¿`/`¡`).

## Collections

### `methodology`

The human-facing chapters that explain the Deep Work Plan methodology. This is the primary teaching content, rendered by the methodology reader.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Chapter title |
| `description` | `string` | Yes | Short description (SEO + listing) |
| `order` | `number` | Yes | Sort order within the reader |
| `lang` | `'en' \| 'es'` | Yes | Language of the entry |
| `summary` | `string` | No | Optional summary for cards/listings |
| `icon` | `string` | No | Optional icon identifier |

### `spec`

The readable specification of the methodology, split into ordered sections (task anatomy, validation gates, completion protocol, archetypes, addons).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Section title |
| `description` | `string` | Yes | Short description |
| `order` | `number` | Yes | Sort order within the spec |
| `lang` | `'en' \| 'es'` | Yes | Language of the entry |
| `section` | `string` | No | Optional grouping/section label |

### `kit`

The catalog of commands, adapters, presets, examples, and addons that make up the DWP kit. The schema is `.loose()`, so kind-specific fields are allowed via passthrough.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Entry title |
| `description` | `string` | Yes | Short description |
| `kind` | `'command' \| 'adapter' \| 'preset' \| 'example' \| 'addon'` | Yes | Catalog category |
| `lang` | `'en' \| 'es'` | Yes | Language of the entry |
| `order` | `number` | No | Optional sort order |

### `pages`

Markdown source files backing the agent-friendly `.md` endpoints for static pages. Every rendered HTML page has a matching entry here, kept in sync via `pnpm run md:check`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Page title |
| `description` | `string` | Yes | Page description |
| `lastUpdated` | `date` | No | Optional last-updated date |

## Querying Collections

```typescript
import { getCollection } from 'astro:content';

// All English methodology chapters, sorted by order
const chapters = (await getCollection('methodology', ({ data }) => data.lang === 'en'))
  .sort((a, b) => a.data.order - b.data.order);

// Kit entries of a given kind
const presets = await getCollection('kit', ({ data }) =>
  data.lang === 'en' && data.kind === 'preset'
);

// All spec sections for a language
const spec = await getCollection('spec', ({ data }) => data.lang === 'es');
```

## Related Documentation

- [Image Optimization](../../docs/features/IMAGE_OPTIMIZATION.md) - Image pipeline and staging workflow
- [Library Functions](../lib/README.md)
- [Pages & Routing](../pages/README.md)
- [Architecture Guide](../../docs/ARCHITECTURE.md)
