---
title: Manifesto
description: "What a Deep Work Plan is, why structured autonomous execution matters, and how it turns any repository into an AI-first, agent-pilotable codebase."
order: 1
lang: en
summary: The case for plan-driven execution with AI coding agents.
icon: compass
---

# Manifesto

A Deep Work Plan (DWP) is a markdown-only methodology for structured, autonomous execution by AI coding agents. It turns a vague goal into a reviewable plan — a specification — that an agent can execute, pause, resume, and report on without losing context or improvising its way into inconsistent results.

## Deep work, for agents

The name describes the practice it produces: focused, sustained effort on cognitively demanding work, held together by structure rather than willpower. The same property that makes deep work valuable for people — concentration without distraction, sustained over a long horizon — is what an AI coding agent needs to finish work that spans hours or days. A Deep Work Plan supplies that structure, and in doing so turns the repository into an AI-first, agent-pilotable codebase.

An agent without a plan behaves like a knowledge worker who never blocks time, never writes anything down, and context-switches on every interruption. A Deep Work Plan gives the agent the equivalent of a blocked calendar and a written brief: a bounded scope, a clear sequence, and a durable place to record progress.

## Direction is the multiplier

The capability of an AI coding agent depends less on the model than on the quality of the direction it is given. A capable model pointed at an ambiguous request amplifies ambiguity; the same model pointed at a precise specification amplifies precision. As models improve, this gap widens rather than closes — the bottleneck moves upstream, from writing the code to defining the work. The relevant skill is no longer execution; it is direction.

This reframes what it means to delegate well. Good delegation is not asking an agent for work — it is defining the work clearly enough that it can be executed correctly: the goal, the constraints, the context the agent would otherwise lack, and the criteria that decide whether it succeeded. Most of the value is created before execution begins.

Deep Work Plan is the discipline of doing that upstream work in a durable, repeatable form. Its two pillars are the two halves of good direction: a **specification** states what "correct" looks like, and a **harness** gives the agent the context and tools to reach it. Together they convert a model's raw ability into dependable engineering — sustained across a task that runs for hours, and preserved across agents that change between sessions.

## Spec-driven by design

This is the first pillar of the methodology, and like "harness" it is worth defining plainly.

**What spec-driven development is.** In ordinary prompt-driven work, the source of truth is a conversation: you ask an agent for something, it edits files, and the only record of intent is a chat transcript that scrolls away and is never reviewed again. Spec-driven development (SDD) inverts that. You first write down *what* should be true — the goal, the scope, the acceptance criteria, the checks that prove it is done — and that written specification, not the conversation, is the source of truth. The agent then executes *against* the spec rather than improvising from a one-line prompt.

**How DWP embodies it.** In Deep Work Plan the plan *is* the specification. A goal becomes a reviewable plan; the plan decomposes into atomic tasks; each task carries explicit acceptance criteria and validation gates; and a completion protocol confirms the work against them. Plan → tasks → gates → completion is SDD made concrete and executable.

**Why it matters.** Writing the spec first pays back three ways: it **reduces drift**, because the agent is measured against stated criteria instead of a fading memory of the request; it makes the work **verifiable**, because every gate either passes or fails; and it makes the work **resumable**, because the specification outlives any single session or agent — another agent can pick it up tomorrow and know exactly what "done" means.

**How DWP differs.** A broader spec-driven movement has formed around this idea, including GitHub Spec Kit, Amazon Kiro, and Tessl. Those approaches tend to be bound to a particular tool or platform. DWP is deliberately different: it is tool-agnostic and repo-native. The specification lives in the repository as plain markdown, so it travels with the code rather than with a vendor's product — and it composes directly with the second pillar, since the spec is itself part of the harness the repository carries.

## The repository becomes the harness

This is the second pillar of the methodology, and it deserves a plain definition — "harness" has become a loaded term, and much of the industry uses it without saying what it means.

**What an agent harness is.** A large language model, on its own, is just a text predictor. What turns it into a reliable engineer is everything wrapped around it: the context it is given, the tools it can call, the control loop that decides what to do next, the guardrails that catch mistakes, and the persistent state that lets it stop and resume. That surrounding scaffolding is the *harness*. The model is the engine; the harness is the chassis, steering, and brakes that make the engine safe to drive.

**What harness engineering is.** Most teams build that scaffolding implicitly, inside a single tool — a particular IDE, an agent product, or a bespoke framework — so it only works there and disappears the moment you switch tools. Harness engineering is the discipline of designing that scaffolding deliberately, as a first-class artifact. Deep Work Plan takes one strong position on where it should live: **not in a tool, but in the repository itself.**

**Why the repository is the right place.** When the harness lives in the repo, it travels with the code, every agent that opens the repo inherits it, and it is versioned, reviewed, and improved like any other code. DWP installs each part of the harness as a concrete, durable artifact:

| Harness element | What it provides | Where DWP puts it in your repo |
|---|---|---|
| **Context** | what the agent needs to know | `AGENTS.md`, `docs/`, and per-module READMEs |
| **Tools** | what the agent can do | the `.agents/` skills, agents, and `dwp-*` commands |
| **Control loop** | how work proceeds | the Deep Work Plan: plan → atomic tasks → gates → completion |
| **Guardrails** | what keeps it correct | explicit acceptance criteria and validation gates |
| **State** | how it survives interruption | the gitignored `.dwp/` plans, drafts, and progress log |

Because every element is a file in the repository rather than a feature of a tool, the harness is portable by construction. That is the one-line claim the rest of the methodology rests on: *the repository itself becomes the harness*, so any agent can pilot any repo — with no bespoke per-tool framework.

## Why structured autonomous execution matters

Modern AI coding agents are capable but undirected. Point one at a non-trivial task and it tends to start editing files immediately, lose track of what it changed, and produce work that is hard to review and impossible to resume.

DWP imposes a lightweight structure that addresses each failure directly:

- **Reviewable tasks** — work is decomposed into sequential units, each with an explicit scope and acceptance criteria.
- **Persisted state** — progress is written down so work survives interruption and can be resumed across sessions and agents.
- **Standardized documentation** — humans and agents share one mental model through a common format.
- **Agent portability** — the methodology works with any agent through thin adapters, not reimplementations.

## Markdown all the way down

DWP defines structure, not software. There is no runtime to install, no dependency tree, and no lock-in. The plan, the tasks, and the running log are all plain markdown that any agent can read, any person can review, and any version-control system can track cleanly. The result is execution you can read, audit, and trust.
