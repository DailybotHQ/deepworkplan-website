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
