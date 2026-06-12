---
title: Design system
description: "An opt-in addon that gives any repo with a user-facing interface surface a DESIGN.md (under docs/, indexed from AGENTS.md) — covering visual UI, CLI output, and conversational profiles in one file."
kind: addon
lang: en
order: 4
---

# Design-system addon

Give a repository with a **user-facing interface surface** a `DESIGN.md` — a Markdown design-system file any coding agent reads to generate interface output consistent with the repo's **own** conventions, instead of the unstyled, statistically-common defaults an agent falls back to with no guidance. The fourth opt-in Deep Work Plan addon.

An "interface surface" is plural: a rendered **visual UI**, styled **CLI output**, and a **conversational** surface (the product talks on chat or email) each count. The addon detects each one independently as a **profile**, and the accepted profiles stack into the same single `DESIGN.md`.

## What it adds

- A `DESIGN.md` at `docs/DESIGN.md` (alongside the repo's other specs; the repo root only when there is no `docs/` tree), **referenced from `AGENTS.md`** so agents discover it like the rest of the docs. One repo, one file — never per-surface siblings.
- **`visual-ui` profile** — the canonical visual sections: overview/atmosphere, color palette & roles (light + dark), typography, layout & spacing, elevation & depth, shapes, components, responsive behavior, do's & don'ts (including the repo's accessibility rules).
- **`cli-output` profile** — styled terminal interfaces: output voice, semantic colors & styles (success/error/warning/info/dim mapped to the real theme), output components (panels, tables, spinners, interactive prompts — named after the repo's real helpers), layout conventions, and degradation rules (TTY vs pipe, `NO_COLOR`, stdout/stderr discipline, exit codes).
- **`conversational` profile** — the product's messaging surface: voice & register (tone, brevity, brand-naming rules), message anatomy (DM, channel post, thread reply, edit-in-place), and per-platform rendering (Slack mrkdwn, Discord markdown, Teams adaptive cards, email) with plain-text fallbacks.
- A shared agent prompt guide, plus a validation step that checks each profile's integrity: documented text contrast meets WCAG AA (visual), color is never the only carrier of meaning (CLI), rich renderings note plain-text fallbacks (conversational), and token references resolve.

## Behavior

- **Reason, don't copy.** Every value is derived from the repo's real design source — its stylesheet, CSS custom properties, Tailwind config, token files, component styles, its CLI display/theme module, or its message-composition helpers. It never pastes a third-party brand's `DESIGN.md` or imports another product's conventions wholesale; reference catalogs are inspiration for structure, never content.
- **Reconcile, don't clobber.** An existing `DESIGN.md` or token source is reconciled additively, never overwritten; adding a newly accepted profile appends its sections without rewriting the rest; destructive changes require approval.
- **Discovery by reference.** Wherever `DESIGN.md` lives, `AGENTS.md` (and `CLAUDE.md`) references it — the pointer, not the physical location, is what guarantees agents load it.
- **Pragmatic, not hard-bound.** It references the emerging `DESIGN.md` convention as a shape to follow, extends it to non-visual surfaces, and stays Markdown-first without binding to any single token schema.

## Interface-scoped, with per-profile strength

This addon is for repos with at least one real interface surface; it is never offered for a repo with none (a pure library, a headless service, an infrastructure-only repo). Each profile carries its own recommendation strength:

- **`visual-ui` is default-on when detected** — a stylesheet with CSS custom properties, a Tailwind config or `@theme` block, UI components, or a brand/style guide. Onboarding applies it in trust mode and strongly recommends it in guided mode.
- **`cli-output` and `conversational` are recommended when detected — and always asked about, never auto-applied**, even in trust mode. A CLI rendering library plus a deliberate display layer signals the first; a chat-platform SDK or message-composition layer signals the second. A bare argument parser with raw prints does not qualify.

It is never required — a repository with zero addons is fully conformant, and you can always decline any profile or the whole addon. A `DESIGN.md` created before profiles existed is a valid single-profile visual file: no migration.

## Optional command

When accepted, the addon may install a `/design-system` delegator into the repo's `.agents/commands/` to regenerate or refresh `DESIGN.md` later. Installing the command is optional; a declined addon installs none.

## Relationship to per-feature design docs

This is a **repo-level, persistent** design-system file — distinct from a per-feature technical design document (the "requirements → design → tasks" `design.md` of tool-bound spec-driven workflows). Deep Work Plan deliberately ships no separate per-feature design-doc archetype: a plan's README, each task's acceptance criteria, and the validation gates already cover that role. This addon fills the one gap that role does not: durable, repo-native interface design context.
