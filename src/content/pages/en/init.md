---
title: Init — Make your repository AI-first
description: Adopt the Deep Work Plan methodology in any repository. Install the skill, run agent onboarding, evolve the kit, and plan and execute structured work with any AI coding agent.
---

# Init — Onboarding prompt for AI agents

You are an AI coding agent. Your task is to make the current repository **AI-first** and
**spec-driven** by adopting the Deep Work Plan (DWP) methodology. Follow these steps in order.
Do not skip steps. Reason about the actual repository — never copy a template or leave a
placeholder. Stop and report if a step fails.

## 0. Read the methodology and specification

Before changing anything, read the canonical sources so you understand the standard you are adopting:

- Methodology: https://deepworkplan.com/methodology.md
- Specification: https://deepworkplan.com/spec.md
- Kit catalog: https://deepworkplan.com/kit.md

## 1. Install the Deep Work Plan skill

Install the skill so this repository's agents can plan and execute structured work. The skill ships a
router plus seven sub-skills — `create`, `execute`, `refine`, `resume`, `status`, `onboard`, and
`author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Or clone and run the setup script:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 2. Run repository onboarding

Invoke the onboard sub-skill (`/deepworkplan-onboard`). Do not template the output — **reason about
the real repo** and adapt everything to it. The flow:

1. **Reconnaissance.** Detect the languages, frameworks, package manager (from the lockfile that
   actually exists), the real build/test/lint/type-check commands, the source modules, the test
   convention, and the deployment shape. Match the closest onboarding preset (Django, Vue + Vite,
   Astro/Svelte, Node/TS service, Python package/CLI, or generic) as a reasoning aid — detected
   reality always wins.
2. **Archetype.** Classify the repo as an individual repository (the common case) or an orchestrator
   hub, and record the evidence.
3. **`AGENTS.md` + `CLAUDE.md`.** Generate an `AGENTS.md` at the root — an index, the mandatory rules
   (English-only, conventional commits, the repo's real test pattern and review gates), and a Quick
   Commands block with the repo's **real, runnable** commands. Create the `CLAUDE.md → AGENTS.md`
   symlink.
4. **`docs/`.** Generate the standard categories filled with real, repo-specific content:
   `ARCHITECTURE.md`, `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, plus `PERFORMANCE.md` and a `docs/README.md` index.
5. **Per-module docs.** Add a `README.md` (and a `docs/` subfolder for complex modules) inside each
   major source module discovered in recon.
6. **`.agents/` + `.claude → .agents`.** Create the canonical, cross-agent home: reasoned `agents/`,
   stack-appropriate `skills/`, thin `dwp-*` `commands/` that delegate to the installed skill, a
   `docs/` catalog (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) that matches what you
   created, and `settings.json`. Add the `.claude → .agents` symlink.
7. **Skill + `.dwp/`.** Make the skill discoverable in the repo and scaffold a gitignored `.dwp/` with
   `plans/` and `drafts/`, plus a `tmp/` scratch space — both added to `.gitignore` non-destructively.

## 3. Evolve the kit (author sub-skill)

Use the `author` sub-skill to grow the repository's own kit. The thin delegators `/skill-create` and
`/agent-create` route to it. Create a **skill** for a repeatable in-session procedure, an **agent**
for a recurring role with its own model tier and tools, and a **command** only as a thin delegator.
Keep the `.agents/docs/` catalog in sync with what exists on disk.

## 4. Offer the opt-in addons

After the baseline, enumerate the three addons and offer each as an explicit opt-in. A repo is fully
conformant with **zero** addons — never auto-install them for everyone.

- **Devcontainer support** — a reproducible, isolated dev container with persistent AI-CLI auth.
- **Dailybot integration** — best-effort progress/milestone reporting for teams already using
  Dailybot. The core methodology has zero Dailybot dependency.
- **Dependency upgrade** — package-manager-agnostic, batched, validated, revertible upgrades. When
  accepted, it installs the `/lib-upgrade` command.

## 5. Plan and execute

Generate Deep Work Plans for any task and run them task by task:

- `/dwp-create <goal>` — decompose a goal into numbered, sequential tasks with validation gates.
- `/dwp-execute` — execute the plan task by task, updating progress and validating each gate.
- `/dwp-status` — report progress without making changes.
- `/dwp-refine` — add, remove, or reorder tasks while preserving completed work.
- `/dwp-resume` — reconstruct state and continue an interrupted plan.

## 6. Verify

Confirm the repository is now agent-ready:

- [ ] The skill is installed and resolvable, with all seven sub-skills available.
- [ ] `AGENTS.md` exists at the root with a real Quick Commands block; `CLAUDE.md` resolves to it.
- [ ] `docs/` holds the standard categories with real, repo-specific content; major modules have a
      `README.md`.
- [ ] `.agents/` exists with `agents/`, `commands/` (thin `dwp-*` delegators), `skills/`, and a
      catalog that matches reality; `.claude → .agents` resolves.
- [ ] `.dwp/` exists, is gitignored, and has `plans/` and `drafts/`; `tmp/` exists and is gitignored.
- [ ] You can generate a Deep Work Plan and execute it task by task, validating each gate.

## Outcome

When onboarding is complete the repository is changed in two durable ways — the pillars of the
methodology:

1. **The repository is spec-driven.** Work begins from a written plan and specification, not from
   ad-hoc prompts.
2. **The repository itself is the agent harness.** `AGENTS.md`, `docs/`, per-module docs, and the
   `.agents/` skill home give every agent the context and commands it needs to do structured,
   verifiable work.
