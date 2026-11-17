---
title: "Deep Work Plan Specification"
description: "The readable specification of the Deep Work Plan methodology: the DWP format, agent protocol, archetypes, documentation standard, and add-ons mechanism."
lastUpdated: 2026-09-28
---

## Deep Work Plan Specification

**Current standard: DWP 8.0.0 (release `v8.0.0`).** The retained base includes the v6 record layer and v7 extensions; new plans default to `plan-contract/v8`. Existing v5, v6, and v7 plans keep their recorded generation and migrate only through an explicit `refine migrate`. V8 keeps `plan-manifest/v7` and adds `plan-contract/v8`, `journal-event/v8`, and `plan-snapshot/v8`; v7 manifest and journal-event schemas remain supported for existing plans. [Manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [contract v8](https://deepworkplan.com/schema/plan-contract/v8.json), [journal event v8](https://deepworkplan.com/schema/journal-event/v8.json), and [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

The specification is the precise, readable definition of the methodology — the structures and protocols that humans and agents share. It states, in normative RFC-2119 terms, how a spec-driven plan is structured and how an agent must execute against it: the plan is the source of truth, validation gates are binary, and the repository itself carries the harness an agent needs. It is organized into ordered documents:

- **Record layer** — the evidence-backed record layer: contract, journal, evidence classes (asserted vs observed), sign-off, amendments, and receipts.
- **Resources and abilities** — bounded execution: context manifest, resource envelope, host capabilities, addon registry, and addon-provided abilities.
- **Delegation** — multi-agent and swarm execution: parallel-safe worktrees, delegation events, transports, and epoch-fenced lead succession.
- **Plan state** — the machine-readable state layer: derived snapshot of the journal in v6/v7 (`ledger.py project`), historical v5 state layer (`manifest.json` and `state.json`), and reconciliation.
- **DWP specification** — plan structure, task anatomy, the execution loop, the Delta section for brownfield changes, the DWP Resume Protocol, proportional rigor tiers (micro/standard/deep), and the machine-readable plan state layer.
- **Agent protocol** — required cross-agent behavior, command mapping, supported agents (including OpenClaw and Hermes), and execution profiles (interactive vs unattended) with stop conditions and scheduled continuation.
- **Archetypes** — individual repos, orchestrator hubs, and the agent workspace (the long-lived home of an autonomous agent: OpenClaw workspace, Hermes service directory, cloud agent volume); the classification heuristic and how onboarding differs.
- **Add-ons** — the opt-in mechanism for layering optional capabilities, including the author sub-skill (so a repository grows its own kit), maintenance add-ons such as dependency-upgrade, and the design-system add-on (a `docs/DESIGN.md` reasoned from the repo's real design source, with profiles for visual UI, CLI output, and conversational surfaces).
- **Conformance** — the normative definition of an AI-first repository: the artifacts a repository MUST and SHOULD have, what makes a plan well-formed, and how to verify it objectively with `/dwp-verify`.
- **Plan state** — the machine-readable state layer: `manifest.json` and `state.json`, gate records, outcome records as episodic memory, reconciliation (markdown wins), and when the layer is required.

- [Read the specification](/spec)
- [Read the methodology](/methodology)
