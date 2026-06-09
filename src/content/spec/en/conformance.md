---
title: Conformance
description: "The normative definition of a DWP-conformant, AI-first repository: the artifacts it MUST and SHOULD have, what makes a plan well-formed, and how to verify it."
order: 6
lang: en
section: Conformance
---

# Conformance

**Version 1.0. Status: Stable.** This document defines what it means for a repository to be *Deep Work Plan-conformant* — that is, AI-first and agent-pilotable. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

Conformance exists so that "AI-first" is an objective, checkable property rather than an impression. A repository either meets the criteria below or it does not. The [`verify` sub-skill](/kit) (`/dwp-verify`) checks them mechanically.

## A conformant repository

A DWP-conformant repository MUST satisfy all of the following. Every artifact MUST be **reasoned for the repository** — adapted to its real languages, frameworks, and commands. A generic stub, a placeholder, or content copied from another repository does not satisfy a criterion.

1. **`AGENTS.md` at the root.** The repository MUST contain a root `AGENTS.md` that includes (a) an index of the documentation, (b) the mandatory rules for the repository, and (c) a Quick Commands block whose commands are **real and runnable** in this repository. Placeholder commands (for example, `npm test` in a repository that does not use npm) MUST NOT appear.
2. **`CLAUDE.md` resolves to `AGENTS.md`.** A `CLAUDE.md` MUST exist and resolve to `AGENTS.md` (a symlink, or an equivalent that guarantees a single source of truth). The two MUST NOT diverge.
3. **A `docs/` hierarchy.** The repository MUST contain a `docs/` directory covering the standard categories (architecture, standards, testing, development commands, security, and agent onboarding) with real, repository-specific content. Complex modules SHOULD carry their own `README.md`. The testing guide MUST define a real test, lint, and type-check toolchain — or, for a repository that has none, a concrete setup **proposed** from the stack during onboarding. An empty testing guide or "no tests" does not satisfy this criterion: without a defined way to validate behavior, a plan has no objective validation gate.
4. **A `.agents/` home.** The repository MUST contain a `.agents/` directory with `agents/`, `commands/`, and `skills/`, plus a catalog under `.agents/docs/` that **matches what is on disk**. The `dwp-*` commands MUST be thin delegators to the installed skill. A `.claude` path MUST resolve to `.agents`.
5. **A gitignored `.dwp/` workspace.** The repository MUST contain a `.dwp/` directory with `plans/` and `drafts/`, and `.dwp/` MUST be gitignored. A `tmp/` scratch space SHOULD exist and SHOULD be gitignored.
6. **The methodology skill is resolvable.** The Deep Work Plan skill MUST be installed or referenced such that an agent in the repository can invoke its sub-skills.

A repository is **fully conformant with zero addons**. Addons (devcontainer, Dailybot, dependency-upgrade, design-system) are opt-in and MUST NOT be required for conformance.

## A well-formed plan

A Deep Work Plan in `.dwp/plans/` is well-formed when:

1. Every task MUST declare an explicit **scope**, **acceptance criteria**, and at least one **validation gate** (a command or check that objectively passes or fails).
2. Every task that adds new core functionality or changes product behavior MUST include automated test coverage for that behavior in its acceptance criteria, and MUST run the repository's tests together with its lint and type-check checks in its validation gate — not the build alone. Existing tests MUST stay green; a behavior change MUST update a test it breaks rather than delete or skip it. Pure-documentation, configuration, or research tasks are exempt from creating tests but still run the repository's gate.
3. The plan MUST persist progress so that work survives interruption and can be resumed by a different agent.
4. The plan MUST include the two mandatory final tasks — Skills & Agents Discovery and the Executive Report.
5. Tasks SHOULD re-anchor to the plan's goal before executing, to prevent drift over a long horizon.

## Verifying conformance

Conformance SHOULD be verified mechanically rather than by inspection. Running `/dwp-verify` produces a pass/fail report against the criteria above: the presence and real-content of `AGENTS.md`, the `CLAUDE.md` resolution, the `docs/` categories, the `.agents/` catalog-versus-disk match, the `.dwp/` and `tmp/` gitignore status, and — for a plan — that every task carries acceptance criteria and a validation gate, with test coverage for behavior-changing tasks.

A repository SHOULD be re-verified after onboarding and after each completed plan, so that conformance is maintained rather than asserted once.
