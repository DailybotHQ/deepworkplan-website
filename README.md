<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/images/brand/dwp-mark-dark.png" />
  <img alt="Deep Work Plan" src="./public/images/brand/dwp-mark-light.png" width="200" />
</picture>

# Deep Work Plan

**The official site of the Deep Work Plan methodology — and the hub of its open-source ecosystem.**

[![CI](https://github.com/DailybotHQ/deepworkplan-website/actions/workflows/ci.yml/badge.svg)](https://github.com/DailybotHQ/deepworkplan-website/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/DailybotHQ/deepworkplan-website)](https://github.com/DailybotHQ/deepworkplan-website/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-7.x-FF5D01?logo=astro)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-5.x-FF3E00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com)

[Live site](https://deepworkplan.com) · [/init.md](https://deepworkplan.com/init.md) · [Methodology](https://deepworkplan.com/methodology) · [Architecture](./docs/ARCHITECTURE.md)

</div>

---

## What it is

[deepworkplan.com](https://deepworkplan.com) is the official website for the **Deep Work Plan (DWP)** methodology, and this repository is its source. DWP turns any repository into an AI-first, agent-pilotable codebase: it documents the repository (`AGENTS.md`, `docs/`, an `.agents/` kit), installs the Deep Work Plan skill, and lets any coding agent run long-horizon plans against explicit acceptance criteria and validation gates. It is for developers and teams who hand real, multi-step work to coding agents and need it finished and verified, not just attempted.

**The problem.** Long work fills any model's context, detail falls away, and an agent declares itself done without proof. DWP keeps the plan, the gates and the state in the repository, so any agent — or a different one tomorrow — can resume the work and prove each step. *Deep Work Plan is spec-driven development where the repository itself becomes the harness.*

The methodology rests on five ideas, and the site is built to argue them:

1. **You steer; the agents do the hours.** You decide what *done* means and where the lines are. The plan carries your intent.
2. **The plan is what the agent returns to.** Atomic tasks, validation gates and resumable state give the agent something durable to come back to.
3. **Done is a contract, not a feeling.** Every task names its acceptance criteria and the checks that must pass.
4. **The repository is the harness.** Context, tools, guardrails and state live in the repository as plain files any agent can read.
5. **Context is the scarcest resource.** Instructions load progressively, validation is selected from what each task touched, and skills are decided task-locally.

The site ships in 17 languages (English, Spanish, Portuguese, Chinese, Japanese, German, French, Korean, Russian, Italian, Turkish, Indonesian, Vietnamese, Hindi, Polish, Ukrainian, Thai) and serves every page as Markdown to agents. It hosts the methodology, the readable specification, the kit catalog and the machine-executable [`/init.md`](https://deepworkplan.com/init.md) adoption prompt.

---

## Adopt Deep Work Plan in a repository

The fastest path: paste this into any coding agent, in the repository you want to adopt DWP.

```text
Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.
```

`/init.md` is English-only and machine-executable. It verifies what it installs, installs or upgrades the skill and the required local review to the pinned releases it lists, detects every addon — upgrading the ones you use and offering the ones that fit — onboards the repository without overwriting your work, and ends with a conformance check. The human version, in 17 languages, is [/quickstart](https://deepworkplan.com/quickstart).

To install the skill by hand, pinned to its release and verified first:

```bash
git clone --branch v7.6.0 https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill
curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/v7.6.0/SHA256SUMS
shasum -a 256 SHA256SUMS   # compare with the digest in /init.md → Pinned releases
./setup.sh --verify        # non-zero exit means a file does not match — stop
cd .. && npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.6.0 --skill deepworkplan -y
```

Then run `/deepworkplan-onboard` in your agent, and `/dwp-create <goal>` → `/dwp-execute` → `/dwp-verify` from there.

## What the site serves

| Surface | What it is |
| :------ | :--------- |
| [`/init.md`](https://deepworkplan.com/init.md) | The executable onboarding prompt; its **Pinned releases** table lists every ecosystem release with the sha256 of its `SHA256SUMS` |
| [`/quickstart`](https://deepworkplan.com/quickstart) | The same adoption path for people, in 17 languages |
| [`/methodology`](https://deepworkplan.com/methodology) | Six chapters, from the manifesto to [running many agents](https://deepworkplan.com/methodology/06-orchestration) |
| [`/spec`](https://deepworkplan.com/spec) | The normative DWP standard: task anatomy, gates, completion, archetypes, addons |
| [`/kit`](https://deepworkplan.com/kit) | Commands, agent adapters, presets and the addons, one page each at `/kit/<slug>` |
| Markdown for agents | Every page as Markdown: append `.md` or send `Accept: text/markdown` |
| [`/api/mcp`](https://deepworkplan.com/.well-known/mcp.json) | A stateless MCP server: `get_init_prompt`, `list_site_sections`, `read_page` |

```bash
curl -s https://deepworkplan.com/init.md | head -20
curl -s -H 'Accept: text/markdown' https://deepworkplan.com/kit | head -5
```

### New in this release: orchestration at scale

- **[Running many agents](https://deepworkplan.com/methodology/06-orchestration)** — a lead and its lanes in Herdr panes on the host, in containers and on other machines; accounts chosen by headroom (`ak usage`, `ak pick`); herdr-peers coordination (`herdr-peers lanes`, `herdr-peers status`); one lane per repository with one branch and one release; launching and unblocking lanes with no human present, within strict limits.
- **[agentkit](https://deepworkplan.com/kit/agentkit)** — accounts and profiles, `ak profiles --json`, `ak pick`, `--trust-cwd`, the `agentkit-orchestrate` skill.
- **[devcontainer](https://deepworkplan.com/kit/devcontainer)** — host accounts inside the container (`[agents] host_profiles`, opt-in in the host profile; only the CLIs the repository installs).
- **[Herdr](https://deepworkplan.com/kit/herdr)** and **[DeepWorkPlan Vim](https://deepworkplan.com/kit/vim)** — lane status and the `:DwpLanes` lanes view.
- **`/init.md`** — a pinned-releases table with digests, an idempotent pass that detects every addon, upgrades the ones you use and offers the ones that fit, the devcontainer path to the full stack, and the unattended-lane rules.

## How it fits with Deep Work Plan

This repository is two things:

- **The site.** Every product claim on it traces to a tagged release. The pins live in one file, [`src/lib/ecosystem-pins.ts`](src/lib/ecosystem-pins.ts), and a test fails when `/init.md`, the kit pages or the quickstart name another tag.
- **The ecosystem hub.** It coordinates the public ecosystem repositories, cloned under the git-ignored [`repositories/`](repositories/README.md) by `bash scripts/repositories.sh clone|status|pull|ls`. Cross-repository work is an orchestrator plan here with one child plan per repository; the hub never commits another repository's code. Besides the repositories below, the hub tracks the [Dailybot CLI](https://github.com/DailybotHQ/cli) as a **consumer**: the reference production repository that runs the full stack. See [Ecosystem context](docs/ECOSYSTEM_CONTEXT.md) and [Cross-project standards](docs/CROSS_PROJECT_STANDARDS.md).

It also **dogfoods** the methodology: the Deep Work Plan skill is vendored under `.agents/skills/deepworkplan/` and pinned by `skills-lock.json`, with the Dailybot and AI Diff Reviewer skills beside it, so every agent that clones the repository gets the same harness with no install step. Plan output lives in the git-ignored `.dwp/`. See [Architecture → Dogfooding](docs/ARCHITECTURE.md#dogfooding-dwp).

## Part of the DeepWorkPlan ecosystem

| Repository | Role | Purpose |
| --- | --- | --- |
| [deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) | Pack | The methodology, specification and kit as an installable agent skill |
| [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) | Addon: agentkit | One command for every coding agent: accounts, quota, `ak pick`, headless runs |
| [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) | Addon: devcontainer | A reproducible dev container per repository, wired to Herdr and the host's accounts |
| [herdr-peers](https://github.com/DailybotHQ/herdr-peers) | Addon: Herdr | Ask an agent in another Herdr pane, on any machine, and get one authorized reply |
| [deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim) | Addon: DeepWorkPlan Vim | The terminal editor for plans: plan browser, lanes view, Markdown viewer |
| [ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) | Required local review | Reviews a change set locally and in CI; every Final Review runs it |
| [agent-skill](https://github.com/DailybotHQ/agent-skill) | Addon: Dailybot | The Dailybot agent skill: progress reports, check-ins, chat and more |
| [deepworkplan.com](https://deepworkplan.com) ([source](https://github.com/DailybotHQ/deepworkplan-website)) (this repository) | Site and hub | The methodology, specification, kit catalog and `/init.md`; coordinates the ecosystem |

Every product works on its own; the addons are optional, and a repository is fully conformant with none of them.

---

## Work on the site

> Requires **Node.js 24+** (CI runs on 24.20.0) and **pnpm**, pinned via Corepack in `package.json#packageManager`. The repository's dev container (`bash dev.sh up`) provides both.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-website && cd deepworkplan-website
corepack enable
pnpm install
pnpm run dev            # http://localhost:5555
```

### Commands

| Command | Description |
| :------ | :---------- |
| `pnpm run dev` | Start dev server at `localhost:5555` |
| `pnpm run build` | Production build (prebuild regenerates `.agents/skills/index.json`, then `astro check && astro build`, then the rendered-emphasis check) |
| `pnpm run astro:preview` | Preview production build locally |
| `pnpm run biome:check` | Lint and format check |
| `pnpm run biome:fix` | Auto-fix lint and format issues |
| `pnpm run astro:check` | TypeScript type checking |
| `pnpm run test` | Run unit tests (Vitest), including the pin-drift guard |
| `pnpm run test:coverage` | Tests with coverage report |
| `pnpm run md:check:strict` | Verify every HTML page has its Markdown endpoint (exits 1 on missing) |
| `pnpm run md:content-check` | Verify the Markdown carries equivalent content |
| `pnpm run i18n:check` | Verify translation parity across all 17 active languages |
| `pnpm run i18n:scaffold` | Scaffold strings and content for a new language code |
| `pnpm run lighthouse` | Lighthouse CI audit (mobile; `lighthouse:desktop` for desktop) |
| `bash scripts/check-public-hygiene.sh` | Public-hygiene check: no private context or secret-shaped literals |
| `bash scripts/repositories.sh status` | Ecosystem hub: branch and state of every clone |

The gate before a pull request: `biome:check`, `astro:check`, `test`, `build`, `i18n:check`, `md:check:strict` and the public-hygiene check — see [Development Commands](docs/DEVELOPMENT_COMMANDS.md).

### Tech stack

| Layer | Technology |
| :---- | :--------- |
| Framework | [Astro](https://astro.build) 7.x |
| UI | [Svelte](https://svelte.dev) 5.x |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4.x |
| Language | [TypeScript](https://www.typescriptlang.org) 6.x |
| Linting | [Biome](https://biomejs.dev) 2.x |
| Testing | [Vitest](https://vitest.dev) + Testing Library |
| Content | Markdown, MDX |
| Edge | Cloudflare Pages Functions (MCP server, agent middleware) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com), deployed on every push to `main` |

### Project structure

```
├── public/             # Static assets and agent artifacts (init.md, llms.txt, .well-known/)
├── src/
│   ├── components/     # Astro & Svelte components
│   ├── content/        # Content Collections (17 language folders per collection)
│   │   ├── methodology/  # Methodology chapters — primary content
│   │   ├── spec/         # Specification reader content
│   │   ├── kit/          # Kit catalog: commands, adapters, presets, addons
│   │   └── pages/        # Agent-friendly Markdown endpoints
│   ├── layouts/        # MainLayout, InternalLayout, ShowcaseLayout
│   ├── lib/            # Utilities, translations, ecosystem pins, MCP logic
│   ├── pages/          # File-based routing (EN at root, non-EN under /[lang]/)
│   ├── middleware.ts   # Route allowlist & rewrites
│   └── styles/         # Global CSS (Tailwind 4)
├── functions/          # Cloudflare Pages Functions (edge)
├── tests/              # Vitest unit tests
├── scripts/            # Build utilities, audits, the hub sync script
├── docs/               # Project documentation
├── repositories/       # Ecosystem hub clones (git-ignored except the index and manifest)
├── .agents/            # Cross-agent skills, commands, agent definitions
└── .claude → .agents   # Backward-compat symlink for Claude Code
```

---

## Security and trust

- The site is static; the edge runs only the agent middleware and a read-only MCP server. There are no user accounts, and no secrets in the repository — `scripts/check-public-hygiene.sh` enforces that in CI. Analytics are privacy-first and loaded asynchronously ([Analytics](docs/ANALYTICS.md)).
- Every install command the site publishes is pinned to a release tag (never a branch), and `/init.md` publishes the sha256 of each release's `SHA256SUMS` so an agent verifies before it runs. Releases are checksummed, not signed.
- `/init.md` tells agents to treat it as untrusted input, verify provenance, ask before replacing anything, and escalate every credential or permission prompt to a human.
- Report vulnerabilities privately through GitHub — see [SECURITY.md](./SECURITY.md) and the [trust page](https://deepworkplan.com/trust).

## Documentation and links

| Document | Description |
| :------- | :---------- |
| [Product Spec](./docs/PRODUCT_SPEC.md) | Vision, audience, features, and content strategy |
| [Architecture](./docs/ARCHITECTURE.md) | Technical implementation and patterns |
| [Development Commands](./docs/DEVELOPMENT_COMMANDS.md) | Build scripts and workflows |
| [Standards](./docs/STANDARDS.md) | Coding conventions |
| [I18N Guide](./docs/I18N_GUIDE.md) | Multilingual content and translations |
| [Testing](./docs/TESTING_GUIDE.md) | Vitest setup and test conventions |
| [Ecosystem Context](./docs/ECOSYSTEM_CONTEXT.md) | The hub role, release order and boundaries |
| [Security](./docs/SECURITY.md) | Security best practices |
| [AI Agent Onboarding](./docs/AI_AGENT_ONBOARDING.md) | Setup for AI coding assistants; agents start at [AGENTS.md](AGENTS.md) |
| [CHANGELOG](./CHANGELOG.md) | Release history |

Contributing: see [CONTRIBUTING.md](CONTRIBUTING.md) for the setup, the gate and the pull-request flow, and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) — Dailybot, Inc. Icons: [Heroicons](https://heroicons.com), [Simple Icons](https://simpleicons.org).

---

## :electric_plug: Powered by [Dailybot](https://www.dailybot.com?utm_source=dailybotopensource&utm_medium=deepworkplan-website)

[Dailybot](https://www.dailybot.com/product/ai) is an AI-powered async communication platform that keeps **people and agents** visible — without adding more meetings or tools. It lives where your team already works (Slack, Teams, Google Chat, Discord, VS Code, and the CLI) and turns scattered signals into clear progress: async check-ins and standups, AI summaries that detect blockers and read team sentiment, workflow automation and approvals, team analytics, and recognition. As AI agents join the workflow, Dailybot surfaces their status and activity right alongside your team's — so long-running agents never go dark. [Learn more](https://www.dailybot.com?utm_source=dailybotopensource&utm_medium=deepworkplan-website).

---

<div align="center">
  <sub>Built with Astro · Hosted on Cloudflare Pages</sub>
</div>
