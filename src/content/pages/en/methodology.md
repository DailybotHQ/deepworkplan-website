---
title: "The Deep Work Plan Methodology"
description: "Eight chapters from manifesto to loop engineering: principles, core loop, templates, skills, archetypes, many agents, swarms and the loop of Deep Work Plan."
lastUpdated: 2026-11-16
---

## The Deep Work Plan Methodology

The v8 pack creates new plans with `plan-contract/v8` by default. Existing plans keep their recorded generation; migration requires an explicit `refine migrate`.
Deep Work Plan (DWP) is an open, framework-agnostic methodology for running structured, autonomous engineering work with AI coding agents. It turns a vague goal into a reviewable plan that an agent can execute, pause, resume, and report on — without losing context.

DWP rests on four pillars — spec-first, the repository is the harness, loop engineering, and measured efficiency. In one sentence: *Spec-first, loop-closed: the repository is the harness and the plan runs itself to done.*

**Spec-first.** Instead of treating a chat transcript as the source of truth, you first write down *what* should be true — goal, scope, acceptance criteria, and the checks that prove it is done — and the agent executes against that specification. In DWP the plan *is* the spec: plan → atomic tasks → validation gates → completion. Writing the spec first reduces drift (the agent is measured against stated criteria), makes the work verifiable (every gate passes or fails), and makes it resumable (the spec outlives any session or agent). Tool-agnostic and repo-native, it differs from tool-bound spec-driven systems such as GitHub Spec Kit, Amazon Kiro, and Tessl.

**The repository is the harness.** A language model alone is just a text predictor; what makes it a reliable engineer is the *harness* around it — context, tools, a control loop, guardrails, and persistent state. Harness engineering is designing that scaffolding deliberately. DWP's position is that it should live in the repository, not in a tool: context as `AGENTS.md` + `docs/`, tools as the `.agents/` kit, the control loop as the plan, guardrails as the validation gates, and state as the gitignored `.dwp/`. Because every part is a file in the repo, the harness is portable — so any agent can pilot any repo.

**Loop engineering.** A specification and a harness make the work correct and portable; loop engineering makes it finish. With the optional Herdr addon, a plan registers its lead and, when it names them, successors; a daemon that only a human starts nudges an idle lead to continue, asks the first reachable successor to take over a lead that is gone, and reports when a plan stalls, blocks, or completes. A nudge adds no authority — the plan's gates and escalations bind as before. The methodology works without the loop; the loop only amplifies it.

**Measured efficiency.** Context is the scarcest resource a coding agent has, and a methodology that wastes it fails exactly when the work gets long. DWP loads instructions progressively — each guide loads when its trigger fires — selects validation from what each task actually touches, and decides skills task-locally. The instruction bytes each flow requires are measured and published; no invented token percentages.

The methodology is explained in eight chapters:

1. **Manifesto** — what a Deep Work Plan is and why structured execution matters.
2. **Core loop** — the plan-execute-verify cycle that drives every task.
3. **Templates** — the plan and task structures agents and humans share.
4. **Skills & agents** — how commands and agent roles fit together, the living kit (how a repository grows its own skills via the author sub-skill), and opt-in add-ons such as dependency-upgrade and the design-system add-on for any user-facing interface surface (visual UI, CLI output, or conversational).
5. **Archetypes** — adapting the methodology to individual repos and orchestrator hubs.
6. **Running many agents** — a lead and its lanes across panes, containers, machines and accounts, with one branch and one release per repository.
7. **Swarm autonomy** — capacity checks at task boundaries, handoff packets, lead succession with epochs, and critical-only escalation, so a swarm outlives one account's limit or one agent's loss.
8. **Loop engineering** — plan registration, the human-started daemon, nudges that add no authority, failover to successors, plan events, the plan queue, and the fleet map.

- [Read the methodology](/methodology)
- [Read the specification](/spec)
- [Browse the kit](/kit)
