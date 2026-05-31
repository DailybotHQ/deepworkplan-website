---
title: "Quickstart — Deep Work Plan"
description: "Install the skill, onboard your repository, then plan and execute with any agent — the steps that make your repository spec-driven and agent-pilotable."
lastUpdated: 2026-05-31
---

## Quickstart

Install the skill, onboard your repository, then plan and execute with any agent — the steps that make
your repository spec-driven and agent-pilotable.

## The adoption path

### 1. Install the Deep Work Plan skill

Add the skill to your repository. It ships a router plus seven sub-skills — create, execute, refine,
resume, status, onboard, and author. Use the Skills CLI for the fastest path:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Or clone the repo and run setup where git and a shell are available:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Onboard the repository

Run the onboard sub-skill and let the agent reason about your actual repo — its stack, package
manager, and real validation commands:

```bash
/deepworkplan-onboard
```

It generates `AGENTS.md`, a `docs/` knowledge base, per-module docs, and a cross-agent `.agents/` home
(with the `.claude → .agents` symlink), wires the thin `dwp-*` commands, and scaffolds a gitignored
`.dwp/` for plans and drafts. Nothing is templated; everything is adapted to your repository.

### 3. Evolve the kit and accept addons

Use `/skill-create` and `/agent-create` (the author sub-skill) to grow stack-appropriate skills,
agents, and commands. Onboarding also offers three opt-in addons — devcontainer, Dailybot, and
dependency-upgrade — that you accept only when they fit. A repo is fully conformant with zero addons.

### 4. Plan and execute

Generate a Deep Work Plan and run it task by task:

```bash
/dwp-create <goal>
/dwp-execute
```

Use `/dwp-status`, `/dwp-refine`, and `/dwp-resume` as work proceeds. Each plan carries numbered tasks,
validation gates, and a completion protocol so work stays structured and resumable across sessions.

## The outcome

Your repository becomes spec-driven and agent-pilotable: the plan is the durable source of truth, and
the repository itself becomes the harness any agent runs against.

- [Read the methodology](/methodology)
- [Browse the spec](/spec)
- [Explore the kit](/kit)
