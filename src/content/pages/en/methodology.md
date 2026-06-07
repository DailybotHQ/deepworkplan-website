---
title: "The Deep Work Plan Methodology"
description: "Five chapters from manifesto to archetypes: the principles, core loop, templates, skills, and adaptations behind the Deep Work Plan methodology."
lastUpdated: 2026-05-30
---

## The Deep Work Plan Methodology

Deep Work Plan (DWP) is an open, framework-agnostic methodology for running structured, autonomous engineering work with AI coding agents. It turns a vague goal into a reviewable plan that an agent can execute, pause, resume, and report on — without losing context.

DWP rests on two pillars.

**Spec-driven development.** Instead of treating a chat transcript as the source of truth, you first write down *what* should be true — goal, scope, acceptance criteria, and the checks that prove it is done — and the agent executes against that specification. In DWP the plan *is* the spec: plan → atomic tasks → validation gates → completion. Writing the spec first reduces drift (the agent is measured against stated criteria), makes the work verifiable (every gate passes or fails), and makes it resumable (the spec outlives any session or agent). Tool-agnostic and repo-native, it differs from tool-bound spec-driven systems such as GitHub Spec Kit, Amazon Kiro, and Tessl.

**Harness engineering — the repository becomes the harness.** A language model alone is just a text predictor; what makes it a reliable engineer is the *harness* around it — context, tools, a control loop, guardrails, and persistent state. Harness engineering is designing that scaffolding deliberately. DWP's position is that it should live in the repository, not in a tool: context as `AGENTS.md` + `docs/`, tools as the `.agents/` kit, the control loop as the plan, guardrails as the validation gates, and state as the gitignored `.dwp/`. Because every part is a file in the repo, the harness is portable — so any agent can pilot any repo.

The methodology is explained in five chapters:

1. **Manifesto** — what a Deep Work Plan is and why structured execution matters.
2. **Core loop** — the plan-execute-verify cycle that drives every task.
3. **Templates** — the plan and task structures agents and humans share.
4. **Skills & agents** — how commands and agent roles fit together, the living kit (how a repository grows its own skills via the author sub-skill), and opt-in add-ons such as dependency-upgrade and the frontend design-system add-on.
5. **Archetypes** — adapting the methodology to individual repos and orchestrator hubs.

- [Read the methodology](/methodology)
- [Read the specification](/spec)
- [Browse the kit](/kit)
