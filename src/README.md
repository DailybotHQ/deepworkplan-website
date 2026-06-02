# Source Directory (`src/`)

This is the main source directory for the Deep Work Plan Astro website. All application code, components, pages, and content live here.

## Directory Structure

```
src/
├── components/          # Reusable UI components (Astro + Svelte)
│   ├── home/           # Homepage section components
│   ├── editorial/      # Editorial design-system primitives
│   ├── layout/         # Layout components (Header, MobileMenu)
│   └── pages/          # Shared page components (Page wrapper pattern)
├── content/            # Content Collections
│   ├── methodology/    # Methodology docs (en/, es/) — primary content
│   ├── spec/           # Specification reader content (en/, es/)
│   ├── kit/            # Kit catalog: commands, adapters, presets (en/, es/)
│   └── pages/          # Agent-friendly Markdown endpoints (en/, es/)
├── layouts/            # Page layouts
│   └── MainLayout.astro
├── lib/                # Utility functions, types, constants
├── pages/              # File-based routing (all routes)
│   ├── methodology/    # Methodology reader routes
│   ├── spec/           # Specification reader routes
│   ├── kit/            # Kit catalog routes
│   └── es/             # Spanish language routes
├── styles/             # Global styles and Tailwind
├── middleware.ts       # Route allowlist & rewrites
└── content.config.ts   # Content Collections schema
```

## Folder Overview

| Folder | Purpose | Tech |
|--------|---------|------|
| `components/` | Reusable UI components | Astro (.astro) + Svelte (.svelte) |
| `content/` | Methodology, spec, kit, and page Markdown | Markdown, MDX, Content Collections |
| `layouts/` | Page wrapper layouts | Astro |
| `lib/` | Utilities, types, constants | TypeScript |
| `pages/` | Routes (file-based) | Astro |
| `styles/` | Global CSS | Tailwind CSS v4 |

## Key Files

| File | Description |
|------|-------------|
| `content.config.ts` | Defines Content Collections schemas (`methodology`, `spec`, `kit`, `pages`) |
| `env.d.ts` | TypeScript environment declarations |

## Quick Start Guide

### Adding a New Page

1. Create a new `.astro` file in `pages/`
2. Import and use `MainLayout` from `layouts/`
3. The route is determined by the file path

```astro
---
// src/pages/new-page.astro
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="New Page" lang="en">
  <main>
    <!-- Content -->
  </main>
</MainLayout>
```

### Adding a New Component

1. Choose the appropriate folder (`home/`, `editorial/`, `layout/`, `pages/`, or root)
2. Use `.astro` for static components, `.svelte` for interactive ones
3. Follow naming conventions (PascalCase)

### Adding Content

1. Create a new `.md` (or `.mdx`) file in the relevant collection: `content/methodology/{en,es}/`, `content/spec/{en,es}/`, or `content/kit/{en,es}/`
2. Include the required frontmatter for that collection (see `content/README.md`)
3. Add both the EN and ES versions with the same English slug

## Related Documentation

- [Components Documentation](./components/README.md)
- [Content Collections](./content/README.md)
- [Pages & Routing](./pages/README.md)
- [Layouts](./layouts/README.md)
- [Utilities & Types](./lib/README.md)
- [Styling Guide](./styles/README.md)
- [Architecture Guide](../docs/ARCHITECTURE.md)
- [Standards](../docs/STANDARDS.md)

## Component vs Svelte Decision

| Use Astro (`.astro`) | Use Svelte (`.svelte`) |
|---------------------|------------------------|
| Static content | Interactive UI |
| Server-rendered | Client-side state |
| No JavaScript needed | Event handlers |
| SEO-critical content | Animations |

See [Components README](./components/README.md) for detailed guidelines.
