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

## Spec-driven by design

DWP is a spec-driven methodology. The plan is a specification, and the specification — not a chat transcript — is the durable source of truth for a body of work. An agent executes against explicit acceptance criteria and validation gates rather than improvising from a short prompt. This reduces the drift between what was intended and what is built, makes the work verifiable because every gate either passes or fails, and makes it resumable because the specification outlives any single session or agent.

A broader spec-driven movement has formed around this idea, including GitHub Spec Kit, Amazon Kiro, and Tessl. Those approaches tend to be bound to a particular tool or platform. DWP is deliberately different: it is tool-agnostic and repo-native. The specification lives in the repository as plain markdown, so it travels with the code rather than with a vendor's product.

## The repository becomes the harness

A language model on its own is not a reliable engineer. What makes it reliable is the harness around it — curated context, the right tools, a control loop, guardrails, and persistent state for resumability. DWP delivers that harness as a portable methodology installed into the repository itself: an `AGENTS.md`, structured documentation, a `.agents/` skills home, and the DWP skill. Because the harness lives with the code, any agent can pilot any repository, with no bespoke per-tool framework.

## Why structured autonomous execution matters

Modern AI coding agents are capable but undirected. Point one at a non-trivial task and it tends to start editing files immediately, lose track of what it changed, and produce work that is hard to review and impossible to resume.

DWP imposes a lightweight structure that addresses each failure directly:

- **Reviewable tasks** — work is decomposed into sequential units, each with an explicit scope and acceptance criteria.
- **Persisted state** — progress is written down so work survives interruption and can be resumed across sessions and agents.
- **Standardized documentation** — humans and agents share one mental model through a common format.
- **Agent portability** — the methodology works with any agent through thin adapters, not reimplementations.

## Markdown all the way down

DWP defines structure, not software. There is no runtime to install, no dependency tree, and no lock-in. The plan, the tasks, and the running log are all plain markdown that any agent can read, any person can review, and any version-control system can track cleanly. The result is execution you can read, audit, and trust.
