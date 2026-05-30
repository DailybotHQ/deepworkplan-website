# Documentation Index

Welcome to the **deepworkplan.com** documentation. This guide helps developers and AI agents understand, maintain, and extend the project.

## Quick Navigation

### Getting Started

| Document | Description |
|----------|-------------|
| [AI Agent Onboarding](AI_AGENT_ONBOARDING.md) | Quick start guide for AI coding assistants |
| [Development Commands](DEVELOPMENT_COMMANDS.md) | npm scripts and CLI reference |
| [Standards](STANDARDS.md) | Coding conventions and best practices |

### Architecture & Design

| Document | Description |
|----------|-------------|
| [Product Spec](PRODUCT_SPEC.md) | Vision, features, and goals for deepworkplan.com |
| [Brand Guide](BRAND_GUIDE.md) | Color palette, typography, logo usage, and visual identity |
| [Architecture](ARCHITECTURE.md) | Technical architecture, patterns, and decisions |
| [Performance](PERFORMANCE.md) | SSG optimization, images, caching strategies |

### Development Guides

| Document | Description |
|----------|-------------|
| [Testing Guide](TESTING_GUIDE.md) | Test setup and conventions (future) |
| [I18N Guide](I18N_GUIDE.md) | Internationalization and language support |
| [Security](SECURITY.md) | Static site security best practices |

### AI & Collaboration

| Document | Description |
|----------|-------------|
| [AI Agent Collaboration](AI_AGENT_COLLAB.md) | Multi-agent coordination guidelines |
| [Documentation Guide](DOCUMENTATION_GUIDE.md) | How to write and maintain docs |
| [Documentation Inventory](DOCUMENTATION_INVENTORY.md) | Coverage tracking |

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Astro** | 5.16.15 | Static site generator |
| **Svelte** | 5.48.0 | Interactive components |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Tailwind CSS** | 4.1.18 | Utility-first styling |
| **Biome** | 2.3.11 | Linting and formatting |
| **MDX** | 4.3.13 | Enhanced Markdown |

## Project Structure Overview

```
deepworkplan.com/
├── src/
│   ├── components/      # Reusable UI components (.astro, .svelte)
│   ├── content/         # Content Collections (blog/, tags/)
│   ├── layouts/         # Page layouts (MainLayout.astro)
│   ├── lib/             # Utility functions and types
│   ├── pages/           # File-based routing
│   └── styles/          # Global CSS and Tailwind
├── public/              # Static assets (images, fonts, icons)
├── docs/                # This documentation folder
└── .agent_commands/     # AI agent automation systems
```

## Quick Commands

```bash
# Development
pnpm run dev              # Start dev server
pnpm run build            # Production build
pnpm run astro:preview    # Preview build

# Code Quality
pnpm run biome:check      # Check linting/formatting
pnpm run biome:fix        # Auto-fix issues
pnpm run astro:check      # TypeScript checking

# Deployment
pnpm run build            # Production build (Cloudflare Pages)
```

## Key Concepts

### Content Collections

Blog posts live in `src/content/blog/` as Markdown/MDX files. The schema is defined in `src/content.config.ts`:

- **title** - Post title (required)
- **description** - Post summary (required)
- **pubDate** - Publication date (required)
- **heroImage** - Featured image (optional)
- **tags** - Array of tag names (optional)

### Component Types

1. **Astro Components** (`.astro`) - Static, build-time rendered
2. **Svelte Components** (`.svelte`) - Interactive, client-side hydrated

Use `client:load` or `client:visible` directives to hydrate Svelte components.

### Internationalization

- English: `/` (default)
- Spanish: `/es/`

Components receive a `lang` prop for language-specific content.

## For AI Agents

If you're an AI coding assistant, start here:

1. **Read [AGENTS.md](../AGENTS.md)** - Main guidance document
2. **Read [AI Agent Onboarding](AI_AGENT_ONBOARDING.md)** - Quick checklist
3. **Follow [Standards](STANDARDS.md)** - Coding conventions

## Contributing

1. Follow the coding standards in [STANDARDS.md](STANDARDS.md)
2. Update relevant documentation after changes
3. Run `pnpm run biome:check` before committing
4. Use conventional commit messages

## Documentation Maintenance

When updating documentation:

- Keep language consistent (English only)
- Update cross-references when renaming/moving docs
- Add new documents to this index
- Track coverage in [DOCUMENTATION_INVENTORY.md](DOCUMENTATION_INVENTORY.md)
