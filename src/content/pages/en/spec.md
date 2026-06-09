---
title: "Deep Work Plan Specification"
description: "The readable specification of the Deep Work Plan methodology: the DWP format, agent protocol, archetypes, documentation standard, and add-ons mechanism."
lastUpdated: 2026-05-30
---

## Deep Work Plan Specification

The specification is the precise, readable definition of the methodology — the structures and protocols that humans and agents share. It states, in normative RFC-2119 terms, how a spec-driven plan is structured and how an agent must execute against it: the plan is the source of truth, validation gates are binary, and the repository itself carries the harness an agent needs. It is organized into ordered documents:

- **Documentation standard** — the AI-first repository structure.
- **DWP specification** (v1.2) — plan structure, task anatomy, the execution loop, the Delta section for brownfield changes, the DWP Resume Protocol, proportional rigor tiers (micro/standard/deep), and the machine-readable plan state layer.
- **Agent protocol** (v1.2) — required cross-agent behavior, command mapping, supported agents (including OpenClaw and Hermes), and execution profiles (interactive vs unattended) with stop conditions and scheduled continuation.
- **Archetypes** (v1.1) — individual repos, orchestrator hubs, and the agent workspace (the long-lived home of an autonomous agent: OpenClaw workspace, Hermes service directory, cloud agent volume); the classification heuristic and how onboarding differs.
- **Add-ons** — the opt-in mechanism for layering optional capabilities, including the author sub-skill (so a repository grows its own kit), maintenance add-ons such as dependency-upgrade, and the frontend design-system add-on (a `docs/DESIGN.md` reasoned from the repo's real design tokens).
- **Conformance** — the normative definition of an AI-first repository: the artifacts a repository MUST and SHOULD have, what makes a plan well-formed, and how to verify it objectively with `/dwp-verify`.
- **Plan state** — the machine-readable state layer: `manifest.json` and `state.json`, gate records, outcome records as episodic memory, reconciliation (markdown wins), and when the layer is required.

- [Read the specification](/spec)
- [Read the methodology](/methodology)
