---
title: Skills and agents
description: "The difference between skills and agents, reasoning-based repository onboarding, and the .agents directory with its .claude to .agents symlink convention."
order: 4
lang: en
summary: How reusable skills, specialized agents, and repo onboarding fit together.
icon: users
---

# Skills and agents

DWP is agent-agnostic, but it expects two recurring building blocks — skills and agents — and a deliberate way of getting oriented in a repository before any work begins.

## Skills versus agents

The two are easy to confuse but serve different purposes:

- **Skills** are reusable procedures invoked by name. A skill packages a repeatable workflow — running tests, fixing lint, creating a component — so that agents and humans invoke it the same way every time.
- **Agents** are specialized workers with a defined role — reviewer, executor, architect. Each agent has a focused responsibility and operates within its scope.

A useful shorthand: a skill is *how* to do a recurring task; an agent is *who* is responsible for a class of work.

## A living kit: the repository grows its own skills

Onboarding turns a repository into the agent harness; it does not freeze it. The kit is meant to **grow** as the repository's workflows become clear. DWP provides an **author** sub-skill — invoked through `/skill-create` and `/agent-create` — that reasons about the repository's existing `.agents/` layout and conventions, then writes a new skill, agent, or thin command delegator that matches them. The repository authors its own kit rather than inheriting a generic one.

The author sub-skill is deliberate about fit. It creates a skill for a repeatable procedure people run by hand, an agent for a recurring role with distinct model or tool needs, and a command only as a thin entry point that routes to a skill or agent. It skips anything generic that does not match a real workflow, and it keeps the `.agents/docs/` catalog in sync with whatever it adds. The same sub-skill backs the mandatory Skills & Agents Discovery task, which reconciles the catalog against what is actually on disk — and `/dwp-verify` confirms that reconciliation objectively, failing if the catalog and the files diverge.

## Maintenance add-ons

Beyond authoring, DWP ships **opt-in maintenance add-ons** — never required for a repository to be AI-first. The **dependency-upgrade** add-on is the canonical example: it reasons about the repository's *actual* package manager (npm, pnpm, or yarn with `ncu`; pip, poetry, or uv; Cargo; Go modules; Bundler; Composer) instead of assuming one, then upgrades in small batches, runs the repository's real validation gate after each batch, reverts any batch that fails, and summarizes without auto-committing. Add-ons are accepted explicitly during onboarding; declining one leaves the repository fully conformant.

## Reasoning-based repository onboarding

Before creating or executing a plan, an agent onboards to the repository. Onboarding is **reasoning-based, not script-based**: the agent reads the repository's structure, documentation, and configuration to build a mental model rather than running a fixed setup script.

During onboarding the agent identifies the repository archetype (individual versus orchestrator), the build, test, and lint commands, the existing conventions for style, structure, and naming, and the skills and agents already available. This understanding is what lets the agent plan and execute in a way that fits the repository instead of fighting it.

## The `.agents/` directory and the `.claude → .agents` symlink

DWP collects everything that defines agent behavior — skills, commands, agent definitions, internal documentation, and settings — under a single canonical directory, `.agents/`. The name signals that the contents are shared across agents rather than tied to any one tool.

For backward compatibility with tools that historically read from `.claude/`, that path is a symlink to `.agents/`:

```bash
ls -la .claude
# .claude -> .agents
```

Every `.claude/...` path resolves transparently to its `.agents/...` equivalent, so older tooling keeps working while new content references the canonical `.agents/` location. Skills and agents are edited through the real files under `.agents/`, never through the symlink.
