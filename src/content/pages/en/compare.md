---
title: "Deep Work Plan compared with the alternatives"
description: "How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date."
lastUpdated: 2026-09-11
---

## Deep Work Plan and the alternatives

Choose Deep Work Plan when long-horizon agent work needs to remain durable, portable and verifiable. The alternatives below clarify the tradeoffs: DWP puts the harness, plan, state and evidence in your repository so any agent can carry the work forward.

## How to read this page

Three values describe each capability. They say where a capability lives in a tool, not how good the tool is. One clarification: DWP skills and plans are specifications of procedures and changes; the living product specs row asks whether a tool maintains a canonical description of the product’s current behavior and merges deltas into it.

- **Built in**
- **Optional or via extension**
- **Not in scope**

Last reviewed: 2026-09-11

## The alternatives, on their own terms

### Spec-driven development tools

**GitHub Spec Kit** — Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents, and can check the artifacts stay consistent with each other before implementation starts. Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use. [Official site](https://github.com/github/spec-kit)

**OpenSpec** — Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications, with a validator that checks proposal completeness and scenario coverage before a change is accepted. Teams working on existing systems who want specifications to grow one change at a time. [Official site](https://openspec.dev)

**Amazon Kiro** — An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events, and that can generate specs for an existing codebase to catch requirement gaps before design begins. Developers who want spec-driven development built into their editor with AWS-backed tooling. [Official site](https://kiro.dev)

### Agent workflow frameworks

**BMAD Method** — An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files, with a Definition of Done that requires each story to be reviewed by a teammate or an AI peer reviewer before it counts as finished. Teams that like role-based ceremonies and want a full agile lifecycle for agent work. [Official site](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion, integrated with more coding-agent hosts than any other alternative here, plus a two-stage subagent review (spec compliance, then code quality) on every task. Developers who want disciplined test-driven execution inside their coding agent. [Official site](https://github.com/obra/superpowers)

**GSD Core** — A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against the user-observable deliverables extracted from each plan, purpose-built to fight context rot by running research, planning and execution in disposable subagents and catching stale verification with content-fingerprint checks. Solo developers and small teams who want context engineering and verification with little ceremony. [Official site](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Configures the coding agents you already use with persistent memory that also routes across sessions and models, curated skills, MCP servers, personas and optional Spec-Driven Development or Receipt-Driven Development. Its configuration is written to your global agent settings by default; a workspace-scoped install is opt-in. Developers who want a configured agent ecosystem that remembers work across sessions and can produce evidence on demand. [Official site](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**Claude's AI-native SDLC** — A six-stage loop from Plan and Design through Build, Test, Deploy and Maintain, with human approval gated at every stage, durable artifacts committed to the repository between stages, a dedicated security-tagged review pass before deploy, and continuous evals that publish leading and lagging delivery indicators. Teams evaluating Claude Code's end-to-end software delivery playbook and its production feedback loop. [Official site](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Vendor-native plan modes

**Native agent features (varies by vendor)** — Agent products may provide plan modes, instruction files and skills built on the open, cross-vendor AGENTS.md and Agent Skills standards, though the exact plan-mode behavior still depends on the vendor, client and version. Agent Skills in particular load only a short summary at startup and the full instructions on activation, keeping unused capability out of context. Anyone who wants planning inside one agent and is comfortable with vendor-specific behavior. [Official site](https://agents.md)

## Capability matrix

Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.

| Capability | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | Claude's AI-native SDLC | Native agent features (varies by vendor) |
|---|---|---|---|---|---|---|---|---|---|---|
| Works with any coding agent | Built in | Built in | Built in | Not in scope | Built in | Built in | Built in | Built in | Not in scope | Not in scope |
| Writes the agent harness into the repository | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope | Optional or via extension | Optional or via extension | Built in | Optional or via extension |
| Acceptance criteria per task | Built in | Optional or via extension | Built in | Built in | Built in | Built in | Built in | Optional or via extension | Built in | Optional or via extension |
| Validation gate per task | Built in | Optional or via extension | Not in scope | Optional or via extension | Optional or via extension | Built in | Built in | Optional or via extension | Optional or via extension | Optional or via extension |
| Resumable state on disk | Built in | Built in | Built in | Built in | Optional or via extension | Optional or via extension | Built in | Built in | Built in | Optional or via extension |
| Mandatory closing review with a security pass | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Built in | Optional or via extension |
| Executable conformance checker | Built in | Optional or via extension | Built in | Optional or via extension | Not in scope | Not in scope | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension |
| Published instruction-load measurement | Built in | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope |
| Onboarding that scaffolds documentation | Built in | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope | Built in | Not in scope | Built in | Optional or via extension |
| Living product specs for existing systems | Not in scope | Optional or via extension | Built in | Built in | Optional or via extension | Not in scope | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope |
| Persistent agent memory across projects | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Built in | Not in scope | Optional or via extension |
| Distinct specialized agent roles | Optional or via extension | Not in scope | Not in scope | Not in scope | Built in | Not in scope | Not in scope | Optional or via extension | Not in scope | Not in scope |
| Ships as its own IDE or editor | Not in scope | Not in scope | Not in scope | Built in | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Optional or via extension |

## What Deep Work Plan brings

- **Tool-agnostic and repository-native.** The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.
- **Validation selected from what each task touched.** Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.
- **One Final Review with a security pass.** A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.
- **State that survives sessions and agents.** README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.
- **A conformance checker for the repository itself.** A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.
- **Instruction load measured and published.** A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.

## Honest limits

A DWP skill is a specification too: it describes how an agent should perform a procedure, such as creating a component. DWP plans are also change specifications: they define scope, acceptance criteria, validation gates and evidence. This row means something narrower: a canonical specification that describes the product’s current behavior and is updated with deltas after each change. DWP does not currently maintain that product-level living specification for every adopted system; OpenSpec is stronger when that lifecycle is the primary need. You can combine the layers by feeding a product spec or delta proposal into a DWP plan. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes. DWP is deliberately scoped to the repository: it is not a cross-project memory system, not a role-based agent framework and not an IDE, so it does not compete on those axes either — pair it with a tool that covers one of them when that is what the work needs.

## Help us keep this accurate

This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.

[Open an issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Sources

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- Claude's AI-native SDLC — https://claude.com/blog/the-ai-native-sdlc-playbook
- Native agent features (varies by vendor) — https://agentskills.io
