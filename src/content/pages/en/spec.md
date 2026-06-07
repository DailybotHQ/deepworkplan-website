---
title: "Deep Work Plan Specification"
description: "The readable specification of the Deep Work Plan methodology: the DWP format, agent protocol, archetypes, documentation standard, and add-ons mechanism."
lastUpdated: 2026-05-30
---

## Deep Work Plan Specification

The specification is the precise, readable definition of the methodology — the structures and protocols that humans and agents share. It states, in normative RFC-2119 terms, how a spec-driven plan is structured and how an agent must execute against it: the plan is the source of truth, validation gates are binary, and the repository itself carries the harness an agent needs. It is organized into ordered documents:

- **Documentation standard** — the AI-first repository structure.
- **DWP specification** — plan structure, task anatomy, and the execution loop.
- **Agent protocol** — required cross-agent behavior and command mapping.
- **Archetypes** — individual repos versus orchestrator hubs.
- **Add-ons** — the opt-in mechanism for layering optional capabilities, including the author sub-skill (so a repository grows its own kit), maintenance add-ons such as dependency-upgrade, and the frontend design-system add-on (a `docs/DESIGN.md` reasoned from the repo's real design tokens).
- **Conformance** — the normative definition of an AI-first repository: the artifacts a repository MUST and SHOULD have, what makes a plan well-formed, and how to verify it objectively with `/dwp-verify`.

- [Read the specification](/spec)
- [Read the methodology](/methodology)
