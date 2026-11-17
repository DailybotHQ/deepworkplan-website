# Documentation index

Use this index to find the source guide for a task. `package.json` and the source tree are authoritative when command names, versions, routes, or file inventories change.

## Project and implementation

| Guide | Covers |
|---|---|
| [AI Agent Onboarding](AI_AGENT_ONBOARDING.md) | Stack, repository layout, authority and safe work |
| [Architecture](ARCHITECTURE.md) | Astro structure, routing, collections, middleware, vendoring |
| [Product Specification](PRODUCT_SPEC.md) | Site scope, positioning, audiences and product surfaces |
| [Development Commands](DEVELOPMENT_COMMANDS.md) | Current package scripts, audits and local development |
| [Standards](STANDARDS.md) | Code, content, imports, accessibility and description standards |
| [Testing Guide](TESTING_GUIDE.md) | Vitest commands, surface-to-gate mapping, coverage limits |
| [I18N Guide](I18N_GUIDE.md) | Active languages, translation workflow and parity checks |
| [Performance](PERFORMANCE.md) | Static rendering, images, hydration and performance checks |
| [Accessibility](ACCESSIBILITY.md) | WCAG AA, keyboard access, semantics and alternatives |
| [SEO](SEO.md) | Metadata, structured data, multilingual SEO and agent discovery |
| [Security](SECURITY.md) | Static-site, API and repository security practices |

## Design and content

| Guide | Covers |
|---|---|
| [Brand Guide](BRAND_GUIDE.md) | Broadsheet identity, palette, typography and editorial primitives |
| [Design system](DESIGN.md) | Agent-facing tokens and component guidance; read before editing UI |
| [Diagram components](DIAGRAM_COMPONENTS.md) | Editorial HTML/CSS/SVG figures and their translation/accessibility rules |
| [Visual documentation](visuals/README.md) | Historical prompt archive and current design references |
| [Documentation Guide](DOCUMENTATION_GUIDE.md) | Writing and maintaining project docs |
| [Documentation Inventory](DOCUMENTATION_INVENTORY.md) | Documentation coverage index |

## Agents and ecosystem

| Guide | Covers |
|---|---|
| [AI Agent Collaboration](AI_AGENT_COLLAB.md) | Coordination patterns and cross-agent context |
| [Ecosystem Context](ECOSYSTEM_CONTEXT.md) | Public repositories, roles, releases and boundaries |
| [Cross-Project Standards](CROSS_PROJECT_STANDARDS.md) | Where work lands, child plans, gates and PR conventions |
| [Repositories index](../repositories/README.md) | Public ecosystem repository list and gates |
| [Skills and agents catalog](../.agents/docs/skills_agents_catalog.md) | Current `.agents/` procedures and specialist agents |
| [Commands reference](../.agents/docs/COMMANDS_REFERENCE.md) | Current command files and direct skill procedures |

## Technology stack

Exact versions are declared in the root `package.json`.

| Technology | Current version | Purpose |
|---|---:|---|
| Astro | 7.3.6 | Static site generator |
| Svelte | 5.57.2 | Interactive components |
| TypeScript | 6.0.3 | Type-safe development |
| Tailwind CSS | 4.3.3 | Styling |
| Biome | 2.5.15 | Linting and formatting |
| `@astrojs/mdx` | 8.0.3 | Markdown components |
| Sätteri | 0.10.5 | Markdown processing |

## Repository overview

- `src/content/{methodology,spec,kit,pages}/`: multilingual content collections with 17 active locales.
- `src/pages/`: English routes plus one dynamic `[lang]` route tree for non-English locales.
- `src/components/`, `src/layouts/`, `src/lib/`: UI, layouts, and shared logic.
- `public/`, `functions/`: static artifacts and Cloudflare Pages Functions.
- `.agents/`: canonical cross-agent skills, commands, agents, and settings.
- `.dwp/`: local plan output; git-ignored except the tracked addon registry.
- `repositories/`: ecosystem clones; git-ignored except `README.md` and `manifest.json`.

## Getting started

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run biome:check
pnpm run test
```

For a documentation-only change, consult the applicable guide and choose validation by touched surface in [Testing Guide](TESTING_GUIDE.md). The site-wide checks are listed in [Development Commands](DEVELOPMENT_COMMANDS.md).
