---
title: "Frequently asked questions — Deep Work Plan"
description: "Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it."
lastUpdated: 2026-09-11
---

## Frequently asked questions

Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.

## What Deep Work Plan is

### What does Deep Work Plan actually do?

Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.

[Read the methodology](https://deepworkplan.com/methodology)

### Who is it for?

Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.

[Quickstart](https://deepworkplan.com/quickstart)

### What's the difference between a Lite and a Full plan?

A representation choice, not a rigor tradeoff. Every plan starts as a Lite folder: a compact README with anchored task records that is already executable, not a partial draft. `create` expands to Full task files only when a task's instruction detail, dependencies or contracts do not fit a reviewable compact record; an explicit request for either format is honored, and a Lite plan can be promoted to Full later without losing completed work. Both formats carry the same acceptance criteria, validation gates, evidence and mandatory Final Review.

[Read the methodology](https://deepworkplan.com/methodology)

### Is it a tool, a framework or a methodology?

A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.

[Read the specification](https://deepworkplan.com/spec)

### Which coding agents does it work with?

Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.

[Browse the kit](https://deepworkplan.com/kit)

### How do I use it?

Three steps. First, install the Deep Work Plan skill into your coding agent — the fastest path is `npx skills add DailybotHQ/deepworkplan-skill` (or clone the skill repo and run `./setup.sh`). Second, onboard the repository once so the agent adapts `AGENTS.md`, `docs/`, the `.agents/` kit and a gitignored `.dwp/` area to your stack: point it at https://deepworkplan.com/init.md, or run `/deepworkplan-onboard`. Third, plan and run work with the thin commands: `/dwp-create <goal>` builds a plan; `/dwp-execute` runs it task by task against each gate; `/dwp-refine` edits an in-flight plan (scope, tasks, or promoting a Lite plan to Full); `/dwp-resume` continues after an interruption; `/dwp-status` reports progress without executing; `/dwp-verify` produces an objective conformance report. Agents that intercept `/` often use `#` instead (for example `#dwp-execute`). The adoption endpoint and the quickstart walk the same path in more detail.

[Quickstart](https://deepworkplan.com/quickstart)

### What exactly gets installed, and where?

The agent skill is installed wherever your agent loads project or user skills. Onboarding then adapts the repository itself: it creates or reconciles `AGENTS.md`, `docs/`, `.agents/` and the gitignored `.dwp/` workspace. The skill teaches the agent the method; the repository keeps the context, kit and plan evidence that other agents need to continue.

[See the adoption flow](https://deepworkplan.com/init)

### Does Deep Work Plan require Git?

Git is recommended for repositories because its history is part of the recovery and review surface, but the methodology can also run in an agent workspace without a Git repository. In that case the machine-readable state layer, including `state.json` checkpoints and gate records, is required so recovery does not depend on a chat transcript.

[Read about repository archetypes](https://deepworkplan.com/spec/archetypes)

### What is the difference between a skill, a plan and a product specification?

A skill describes how an agent performs a repeatable procedure. A DWP plan describes a concrete change through scope, acceptance criteria, validation gates and evidence. A product specification describes the product’s current behavior and evolves through deltas after implementation; skills and plans are specifications too, but they describe procedures and changes rather than maintaining that canonical product contract.

[Read the specification](https://deepworkplan.com/spec/dwp-specification)

## How a plan runs

### How are the validation gates implemented? Do they need human sign-off?

They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.

[The core loop](https://deepworkplan.com/methodology/02-core-loop)

### How does the plan avoid going stale when people change the code between runs?

On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.

[Read the methodology](https://deepworkplan.com/methodology)

### Can I change the plan mid-run without losing completed work?

Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.

[The core loop](https://deepworkplan.com/methodology/02-core-loop)

### Does it keep checking the work against the plan, or is the plan an upfront thing?

The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.

[The core loop](https://deepworkplan.com/methodology/02-core-loop)

### Is the plan generated once and maintained by hand, or does it evolve with the code?

Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.

[Read the methodology](https://deepworkplan.com/methodology)

### What happens if the session dies halfway?

Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.

[The core loop](https://deepworkplan.com/methodology/02-core-loop)

### What is the Final Review?

The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.

[The specification](https://deepworkplan.com/spec/dwp-specification)

### What happens when a validation gate fails?

The task is recorded as blocked and the agent stops before claiming completion. You can inspect the evidence, repair the code or refine the task, then resume; a failed command is a signal to resolve the mismatch, not permission to weaken the gate.

[Read the agent protocol](https://deepworkplan.com/spec/agent-protocol)

### Can a plan run unattended overnight or in CI?

Yes, when the plan was approved in advance, carries the required state layer and gives the agent bounded authority. An unattended run must stop and record a blocker when reality diverges, a gate fails outside its planned repair scope, or a new approval or credential is needed.

[Read the unattended protocol](https://deepworkplan.com/spec/agent-protocol)

## How it compares

### How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?

They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.

Claude's AI-native SDLC playbook makes a related case for durable artifacts across Plan, Design, Build, Test, Deploy and Maintain; DWP covers the repository harness and execution loop, while continuous production evaluation remains a complementary practice.

[See the comparison](https://deepworkplan.com/compare)

### How is it different from agent workflow tools such as BMAD, Superpowers, Get Shit Done or Gentle-AI?

Agent workflow frameworks such as BMAD, Superpowers and Get Shit Done bring strong working styles: roles, principles, test-first steps, verification habits. Gentle-AI sits nearby as an agent ecosystem configurator: it equips the coding agents you already use with persistent memory across sessions (Engram), curated skills, personas, MCP servers, optional Spec-Driven Development and optional evidence-based review (Receipt-Driven Development), writing into each agent's config directories. Deep Work Plan differs from both: it focuses on what stays in the repository and what can be checked — a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The layers can sit together: frameworks and Gentle-AI shape how the agent works; Deep Work Plan makes long work durable and checkable inside the repo. The comparison page shows where each approach is built in, optional or out of scope.

[See the comparison](https://deepworkplan.com/compare)

### Why not just use my agent's built-in plan mode?

Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.

[See the comparison](https://deepworkplan.com/compare)

## Adopting it

### What does onboarding write into my repository, and does it touch existing files?

Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.

[The adoption endpoint](https://deepworkplan.com/init)

### Can I use the core methodology without installing add-ons?

Yes. Add-ons are opt-in layers and a repository with none is fully DWP-conformant. Devcontainers, Dailybot reporting, dependency upgrades, design-system support and optional CI review are offered only when they fit your repository and you accept them explicitly.

[Browse the add-ons](https://deepworkplan.com/spec/addons)

### What if my repository has no tests or linting yet?

DWP does not treat the absence of a toolchain as a free pass. During onboarding the agent proposes a stack-appropriate validation setup, records the commands in the repository documentation and uses those commands as the target for future gates; the proposal remains visible for you to review.

[Read the agent protocol](https://deepworkplan.com/spec/agent-protocol)

### What does it cost, and how is efficiency measured?

The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.

[Trust and disclosure](https://deepworkplan.com/trust)

## Still have a question?

Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.

[Ask on GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
