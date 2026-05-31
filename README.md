<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/images/brand/dwp-mark-dark.png" />
  <img alt="Deep Work Plan" src="./public/images/brand/dwp-mark-light.png" width="200" />
</picture>

# Deep Work Plan

**The methodology site for planning and executing complex software work with AI coding agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com)

[🌐 Live Site](https://deepworkplan.com) · [📖 Architecture](./docs/ARCHITECTURE.md) · [📋 Product Spec](./docs/PRODUCT_SPEC.md)

</div>

---

## ✨ Overview

[deepworkplan.com](https://deepworkplan.com) is the official website for the **Deep Work Plan (DWP)** methodology — a structured, agent-agnostic approach to executing complex, multi-step software work reliably with AI coding agents.

The site is a fast, fully bilingual (English + Spanish) static site built with [Astro](https://astro.build). It explains and sells the methodology, hosts the readable specification, and catalogs the kit (presets, adapters, commands) for installing DWP into any repository. The repository **dogfoods** the methodology it documents.

The tone is serious, neutral, and technical — this is a specification-and-methodology site, not a personal blog.

### Highlights

| Feature | Description |
| :------ | :---------- |
| 📚 **Methodology reader** | The DWP methodology, principles, and adoption workflow |
| 📐 **Specification reader** | The normative DWP standard: task anatomy, validation gates, archetypes |
| 🧰 **Kit catalog** | Presets, adapters, and commands for installing DWP into a repo |
| 🌐 **Bilingual** | Full English & Spanish with route parity |
| 🌙 **Dark mode** | System-aware theme toggle with persistence |
| ⚡ **Performance-first** | Static site, minimal JS, optimized assets, 90+ Lighthouse |
| 🔍 **SEO + AEO** | Sitemap, Open Graph, structured data, agent-friendly Markdown endpoints |
| 🤖 **Agent-friendly** | Shared `.agents/` home for skills, commands, and agent definitions across Claude Code, Codex, Cursor, Gemini |

> **Note:** The blog engine (MDX posts, series, multi-author, tag taxonomy, RSS, search) is fully built but kept **dormant** — hidden from navigation and reserved for future case studies about applying the methodology. Slides/tech-talks and personal pages have been removed.

---

## 🛠 Tech Stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro](https://astro.build) 5.x |
| UI | [Svelte](https://svelte.dev) 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x |
| Language | [TypeScript](https://www.typescriptlang.org) 5.x |
| Linting | [Biome](https://biomejs.dev) 2.x |
| Testing | [Vitest](https://vitest.dev) + Testing Library |
| Content | Markdown, MDX |
| Edge | Cloudflare Pages Functions (bot analytics middleware) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |

---

## 🚀 Quick Start

> Requires **Node.js 24+** (CI runs on 24.15.0). The package manager is
> **pnpm**, pinned via Corepack in `package.json#packageManager`. Enable it
> once with `corepack enable`; the dev container does this automatically.

```bash
corepack enable
pnpm install
pnpm run dev
```

Visit **http://localhost:5555** to preview.

---

## 📜 Commands

| Command | Description |
| :------ | :---------- |
| `pnpm run dev` | Start dev server at `localhost:5555` |
| `pnpm run build` | Production build with type check |
| `pnpm run astro:preview` | Preview production build locally |
| `pnpm run biome:check` | Lint and format check |
| `pnpm run biome:fix` | Auto-fix lint and format issues |
| `pnpm run astro:check` | TypeScript type checking |
| `pnpm run test` | Run unit tests (Vitest) |
| `pnpm run test:watch` | Vitest in watch mode |
| `pnpm run test:coverage` | Tests with coverage report |
| `pnpm run images:optimize` | Convert staged images to WebP |
| `pnpm run md:check` | Verify HTML / Markdown agent-endpoint parity |
| `pnpm run search:budgets` | Check search index performance budgets |
| `pnpm run lighthouse` | Run Lighthouse CI audit |
| `pnpm run ncu:check` | Check for dependency updates |
| `pnpm run release` | Bump version and create release commit |

---

## 📁 Project Structure

```
├── public/             # Static assets (images, fonts, icons, robots.txt)
├── src/
│   ├── components/     # Astro & Svelte components
│   ├── content/        # Content Collections
│   │   ├── methodology/  # Methodology docs by language (en/, es/) — primary content
│   │   ├── spec/         # Specification reader content (en/, es/)
│   │   ├── kit/          # Kit catalog: presets, adapters, commands (en/, es/)
│   │   ├── pages/        # Agent-friendly Markdown endpoints (en/, es/)
│   │   ├── authors/      # Author definitions (.yaml) — used by dormant blog
│   │   ├── blog/         # Blog posts by language (en/, es/) — DORMANT engine
│   │   ├── series/       # Blog series definitions — DORMANT engine
│   │   └── tags/         # Tag taxonomy with tiers — DORMANT engine
│   ├── layouts/        # MainLayout, InternalLayout, ...
│   ├── lib/            # Utilities, types, translations
│   ├── pages/          # File-based routing (EN root, ES in /es/)
│   ├── middleware.ts   # Route allowlist & rewrites
│   └── styles/         # Global CSS (Tailwind 4)
├── functions/          # Cloudflare Pages Functions (edge middleware)
├── tests/              # Vitest unit & integration tests
├── scripts/            # Build utilities (image optimization, parity checks)
├── docs/               # Project documentation
├── .agents/            # Cross-agent skills, commands, agent definitions
├── .claude → .agents   # Backward-compat symlink for Claude Code
├── assets/             # README and documentation assets
└── astro.config.mjs
```

---

## 📚 Documentation

| Document | Description |
| :------- | :---------- |
| [Product Spec](./docs/PRODUCT_SPEC.md) | Vision, audience, features, and content strategy |
| [Architecture](./docs/ARCHITECTURE.md) | Technical implementation and patterns |
| [Development Commands](./docs/DEVELOPMENT_COMMANDS.md) | Build scripts and workflows |
| [Standards](./docs/STANDARDS.md) | Coding conventions |
| [I18N Guide](./docs/I18N_GUIDE.md) | Multilingual content and translations |
| [Testing](./docs/TESTING_GUIDE.md) | Vitest setup and test conventions |
| [Performance](./docs/PERFORMANCE.md) | Astro SSG optimization and budgets |
| [Accessibility](./docs/ACCESSIBILITY.md) | WCAG AA standards and patterns |
| [SEO](./docs/SEO.md) | Meta, structured data, multilingual, AEO |
| [Security](./docs/SECURITY.md) | Security best practices |
| [AI Agent Onboarding](./docs/AI_AGENT_ONBOARDING.md) | Setup for AI coding assistants |
| [Skills & Agents Catalog](./.agents/docs/skills_agents_catalog.md) | Available skills and agents |
| [Blog Posts (dormant)](./docs/features/BLOG_POSTS.md) | Blog engine reference, reserved for future case studies |

---

## 🚢 Deployment

Deployed to **Cloudflare Pages** on every push to `main`:

1. Cloudflare triggers a build
2. Runs `pnpm run build` (WebP generation + Astro build)
3. Serves the `dist/` folder from its global CDN

Live at **[deepworkplan.com](https://deepworkplan.com)**.

---

## 📄 License

[MIT](LICENSE) — Dailybot, Inc.

### Third-Party Assets

- **Icons:** [Heroicons](https://heroicons.com), [Simple Icons](https://simpleicons.org)

---

## :electric_plug: Powered by [Dailybot](https://www.dailybot.com?utm_source=dailybotopensource&utm_medium=deepworkplan-website)

[Dailybot](https://www.dailybot.com/product/ai) is an AI-powered async communication platform that keeps **people and agents** visible — without adding more meetings or tools. It lives where your team already works (Slack, Teams, Google Chat, Discord, VS Code, and the CLI) and turns scattered signals into clear progress: async check-ins and standups, AI summaries that detect blockers and read team sentiment, workflow automation and approvals, team analytics, and recognition. As AI agents join the workflow, Dailybot surfaces their status and activity right alongside your team's — so long-running agents never go dark. [Learn more](https://www.dailybot.com?utm_source=dailybotopensource&utm_medium=deepworkplan-website).

---

<div align="center">
  <sub>Built with Astro · Hosted on Cloudflare Pages</sub>
</div>
