---
title: Init — Make your repository AI-first
description: Adopt the Deep Work Plan methodology in any repository. Install the skill, run agent onboarding, and turn your repo into a spec-driven, agent-ready harness.
---

# Init — Onboarding prompt for AI agents

You are an AI coding agent. Your task is to make the current repository **AI-first** and
**spec-driven** by adopting the Deep Work Plan (DWP) methodology. Follow these steps in order.
Do not skip steps. Stop and report if a step fails.

## 0. Read the methodology and specification

Before changing anything, read the canonical sources so you understand the standard you are adopting:

- Methodology: https://deepworkplan.com/methodology.md
- Specification: https://deepworkplan.com/spec.md
- Kit catalog: https://deepworkplan.com/kit.md

## 1. Install the Deep Work Plan skill

Install the skill so this repository's agents can plan and execute structured work:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Or clone and run the setup script:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 2. Produce `AGENTS.md`

Create an `AGENTS.md` at the repository root (with a `CLAUDE.md` symlink if Claude Code is used).
It is the single source of truth for every AI agent in the repo. It MUST cover:

- Project overview: what the project is, its stack, and how it is built and tested.
- Mandatory requirements: language, formatting/linting, type checking, and test commands.
- Project structure: where code, content, and configuration live.
- Conventions the agent must follow (naming, commits, review gates).
- A pointer to the `.agents/` skill home and the available DWP commands.

## 3. Create `docs/` and the `.agents/` skill home

- Create or extend a `docs/` directory with the durable knowledge agents need: architecture,
  standards, testing, and any domain guides. Keep these in sync with the code.
- Install the `.agents/` skill home containing the Deep Work Plan commands, skills, and agent
  definitions. This is the canonical, cross-agent home consumed by every coding agent.

## 4. Wire the Deep Work Plan commands

Ensure the DWP commands are available and documented (create, refine, execute, resume, status).
Reference them from `AGENTS.md` so any agent can discover and run them.

## 5. Verify

Confirm the repository is now agent-ready:

- [ ] The skill is installed and resolvable.
- [ ] `AGENTS.md` exists at the root and describes how agents work here.
- [ ] `docs/` holds the project knowledge agents need.
- [ ] The `.agents/` skill home exists with DWP commands wired in.
- [ ] You can generate a Deep Work Plan and execute it task by task, validating each gate.

## Outcome

When onboarding is complete the repository is changed in two durable ways — the pillars of the
methodology:

1. **The repository is spec-driven.** Work begins from a written plan and specification, not from
   ad-hoc prompts.
2. **The repository itself is the agent harness.** `AGENTS.md`, `docs/`, and the `.agents/` skill
   home give every agent the context and commands it needs to do structured, verifiable work.
