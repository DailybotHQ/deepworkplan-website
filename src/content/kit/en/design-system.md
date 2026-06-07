---
title: Design system
description: "An opt-in, frontend-scoped addon that gives a repo a DESIGN.md (under docs/, indexed from AGENTS.md) so any coding agent generates UI consistent with the repo's own design system."
kind: addon
lang: en
order: 4
---

# Design-system addon

Give a frontend/UI repository a `DESIGN.md` — a Markdown design-system file any coding agent reads to generate UI consistent with the repo's **own** design system, instead of the unstyled, statistically-common defaults an agent falls back to with no guidance. The fourth opt-in Deep Work Plan addon.

## What it adds

- A `DESIGN.md` at `docs/DESIGN.md` (alongside the repo's other specs; the repo root only when there is no `docs/` tree), **referenced from `AGENTS.md`** so agents discover it like the rest of the docs.
- The canonical sections: overview/atmosphere, color palette & roles (light + dark), typography, layout & spacing, elevation & depth, shapes, components, responsive behavior, do's & don'ts (including the repo's accessibility rules), and an agent prompt guide.
- A validation step that checks the file is complete, that documented text contrast meets WCAG AA, and that token references resolve.

## Behavior

- **Reason, don't copy.** Every value is derived from the repo's real design source — its stylesheet, CSS custom properties, Tailwind config, token files, or component styles. It never pastes a third-party brand's `DESIGN.md`; reference catalogs are inspiration for structure, never content.
- **Reconcile, don't clobber.** An existing `DESIGN.md` or token source is reconciled additively, never overwritten; destructive changes require approval.
- **Discovery by reference.** Wherever `DESIGN.md` lives, `AGENTS.md` (and `CLAUDE.md`) references it — the pointer, not the physical location, is what guarantees agents load it.
- **Pragmatic, not hard-bound.** It references the emerging `DESIGN.md` convention as a shape to follow, but stays Markdown-first and does not bind to any single token schema.

## Frontend-scoped, default-on when detected

This addon is for repos with a real UI surface — a stylesheet with CSS custom properties, a Tailwind config or `@theme` block, UI components, or a brand/style guide. It is **never** offered for a backend, CLI, or library-only repo. When a UI surface **is** detected, onboarding treats it as **default-on**: it applies the addon in trust mode and strongly recommends it in guided mode. It is never required — a repository with zero addons is fully conformant, and you can always decline.

## Optional command

When accepted, the addon may install a `/design-system` delegator into the repo's `.agents/commands/` to regenerate or refresh `DESIGN.md` later. Installing the command is optional; a declined addon installs none.

## Relationship to per-feature design docs

This is a **repo-level, persistent** design-system file — distinct from a per-feature technical design document (the "requirements → design → tasks" `design.md` of tool-bound spec-driven workflows). Deep Work Plan deliberately ships no separate per-feature design-doc archetype: a plan's README, each task's acceptance criteria, and the validation gates already cover that role. This addon fills the one gap that role does not: durable, repo-native UI design context.
