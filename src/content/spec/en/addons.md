---
title: Add-ons
description: "Optional extensions to the core DWP methodology: skills, agents, presets, adapters, and examples, and how each extends the workflow without being required."
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

## Design-system add-on

The **design-system** add-on is an interface-surface-scoped, opt-in extension that gives a repository a `DESIGN.md` — a Markdown design-system file any coding agent reads to generate interface output consistent with the repository's own conventions. It covers three **profiles**, detected independently from real files and stacked into the same single file: **visual-ui** (rendered web/mobile/desktop UI), **cli-output** (styled terminal output: semantic colors, output components such as panels and spinners, layout conventions, TTY/`NO_COLOR` degradation), and **conversational** (the product talks on chat or email: voice and register, message anatomy, per-platform rendering with plain-text fallbacks). It reasons about the repository's real design source (CSS custom properties, a Tailwind config, token files, component styles — or a CLI display module, or message-composition helpers) rather than copying a brand file, and validates each profile's integrity: WCAG AA contrast for visual text pairings, color never the only carrier of meaning in terminal output, plain-text fallbacks for rich messages, and token references that resolve. It reconciles an existing `DESIGN.md` instead of clobbering it.

The file lives at `docs/DESIGN.md`, alongside the repository's other specs, and is referenced from `AGENTS.md` so agents discover it the same way they discover the rest of the docs (the repository root is used only when there is no `docs/` tree). Discovery is by reference, not by physical location. Profile strength differs: **visual-ui is default-on when detected** — when a visual UI surface is present, onboarding applies it in trust mode and strongly recommends it in guided mode — while **cli-output and conversational are recommended when detected and always asked about, never auto-applied**. The add-on is never offered for a repository with no interface surface of any kind (a pure library, a headless service, an infrastructure-only repository), and a repository with zero add-ons remains fully conformant. A `DESIGN.md` created before profiles existed is a valid single-profile visual file — no migration.

This repository-level design-system file is distinct from a per-feature technical design document (the "requirements → design → tasks" `design.md` of tool-bound spec-driven workflows). DWP ships no separate per-feature design-doc archetype: a plan's README, each task's acceptance criteria, and the validation gates already cover that role. The add-on fills the one gap that role does not: durable, repo-native interface design context.

## Presets

Presets adapt DWP to a specific tech stack (Django, React, Go).

## Adapters

Adapters map DWP commands to a specific agent's command system (Claude Code, Cursor, Codex).

## Examples

Examples demonstrate DWP in practice (before/after comparisons, sample plans, case studies).
