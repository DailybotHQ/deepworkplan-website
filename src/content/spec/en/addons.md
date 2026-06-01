---
title: Add-ons
description: "The optional extensions to the core DWP methodology, including skills, agents, presets, adapters, and examples, and how each one extends the workflow without being required."
order: 5
lang: en
section: Addons
---

# Add-ons

**Version 1.0.** Add-ons are optional extensions to the core DWP methodology. They are not required for compliance but provide additional capabilities.

## Skills

Skills are reusable procedures invoked by name. A skill packages a repeatable workflow (running tests, fixing lint, creating a component).

The methodology ships a small set of core sub-skills. Among them, the **author** sub-skill lets a repository **grow its own kit**: invoked through `/skill-create` and `/agent-create`, it reasons about the repository's existing `.agents/` layout and conventions, then authors a new skill, agent, or thin command delegator that matches them, and keeps the catalog in sync. The same sub-skill executes the mandatory Skills & Agents Discovery task.

## Agents

Agents are specialized workers with a defined role (reviewer, executor, architect).

## Maintenance add-ons

Maintenance add-ons are opt-in extensions, never required for compliance, that help a repository maintain itself. The **dependency-upgrade** add-on reasons about the repository's actual package manager (rather than assuming npm) and upgrades dependencies in small, validated, revertible batches: it detects the manager from the real manifest and lockfile, classifies upgrades by semver, upgrades in batches, runs the repository's real validation gate after each batch, reverts any batch that fails, and summarizes without auto-committing. An add-on is installed only when it is accepted during onboarding.

## Presets

Presets adapt DWP to a specific tech stack (Django, React, Go).

## Adapters

Adapters map DWP commands to a specific agent's command system (Claude Code, Cursor, Codex).

## Examples

Examples demonstrate DWP in practice (before/after comparisons, sample plans, case studies).
