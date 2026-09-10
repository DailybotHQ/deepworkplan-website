---
title: "Deep Work Plan compared with the alternatives — Deep Work Plan"
description: "How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date."
lastUpdated: 2026-09-10
---

## Deep Work Plan and the alternatives

Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.

## How to read this page

Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.

- **Built in**
- **Optional or via extension**
- **Not in scope**

Last reviewed: 2026-09-10

## The alternatives, on their own terms

### Spec-driven development tools

**GitHub Spec Kit** — Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents. Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use. [Official site](https://github.com/github/spec-kit)

**OpenSpec** — Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications. Teams working on existing systems who want specifications to grow one change at a time. [Official site](https://openspec.dev)

**Amazon Kiro** — An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events. Developers who want spec-driven development built into their editor with AWS-backed tooling. [Official site](https://kiro.dev)

### Agent workflow frameworks

**BMAD Method** — An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files. Teams that like role-based ceremonies and want a full agile lifecycle for agent work. [Official site](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion. Developers who want disciplined test-driven execution inside their coding agent. [Official site](https://github.com/obra/superpowers)

**Get Shit Done** — A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves. Solo developers and small teams who want context engineering and verification with little ceremony. [Official site](https://github.com/open-gsd/gsd-core)

### Vendor-native plan modes

**Vendor-native plan modes** — Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards. Anyone who wants planning inside a single agent without adopting a methodology. [Official site](https://agents.md)

## Capability matrix

Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.

| Capability | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Vendor-native plan modes |
|---|---|---|---|---|---|---|---|---|
| Works with any coding agent | Built in | Built in | Built in | Not in scope | Built in | Built in | Built in | Not in scope |
| Writes the agent harness into the repository | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope | Optional or via extension | Optional or via extension |
| Acceptance criteria per task | Built in | Optional or via extension | Built in | Built in | Built in | Built in | Built in | Optional or via extension |
| Validation gate per task | Built in | Optional or via extension | Not in scope | Optional or via extension | Optional or via extension | Built in | Optional or via extension | Optional or via extension |
| Resumable state on disk | Built in | Built in | Built in | Built in | Optional or via extension | Optional or via extension | Built in | Optional or via extension |
| Mandatory closing review with a security pass | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension |
| Executable conformance checker | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope | Not in scope | Not in scope | Optional or via extension |
| Published instruction-load measurement | Built in | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope | Not in scope |
| Onboarding that scaffolds documentation | Built in | Optional or via extension | Optional or via extension | Optional or via extension | Optional or via extension | Not in scope | Built in | Optional or via extension |
| Living specs for existing systems | Not in scope | Optional or via extension | Built in | Optional or via extension | Optional or via extension | Not in scope | Optional or via extension | Not in scope |

## What Deep Work Plan brings

- **Tool-agnostic and repository-native.** The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.
- **Validation selected from what each task touched.** Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.
- **One Final Review with a security pass.** A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.
- **State that survives sessions and agents.** README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.
- **A conformance checker for the repository itself.** A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.
- **Instruction load measured and published.** A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.

## Honest limits

Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.

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
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
