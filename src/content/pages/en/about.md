---
title: "About the methodology"
description: "Deep Work Plan is an open, framework-agnostic methodology for serious engineering work with AI coding agents. Where it came from and who maintains it."
lastUpdated: 2026-05-30
---

## What it is

Deep Work Plan (DWP) is a methodology, not a product. It defines how to turn a goal into an agreed plan, break that plan into atomic and independently verifiable tasks, and run each task in a focused loop that ends with a check.

It is a spec-driven methodology: the plan is the durable source of truth, and agents execute against explicit acceptance criteria and validation gates. Unlike tool-bound spec-driven systems such as GitHub Spec Kit, Amazon Kiro, or Tessl, DWP is tool-agnostic and repo-native. It is also harness engineering made portable — the context, guardrails, and resumable state that make an agent reliable are installed into the repository itself (AGENTS.md, docs, the .agents/ skills home, the DWP skill), so any agent can pilot any repo.

It is deliberately agnostic about which AI agent or stack you use — adapters translate the same core loop to Claude, Cursor, Copilot, Codex, Gemini, and more. The plan, the tasks, and the running log are all plain Markdown, so the work stays readable, reviewable, and version-controlled.

---

## Core principles

- **Plan before execution** — No code is written until the plan is agreed. The plan is a contract between you and the agent. [Read the methodology](/methodology)
- **Tasks are atomic** — Each task is scoped so it can be executed and verified on its own, then committed atomically. [See the specification](/spec)
- **Verify everything** — Every task ends with an explicit check before the next one begins, with progress recorded in git. [Explore the kit](/kit)

---

## At a glance

- Open methodology, MIT licensed
- Framework- and agent-agnostic
- Maintained by Dailybot and the community
- Includes a spec, commands, adapters, presets, and examples
- Markdown-only — no runtime, no lock-in
- Turns any repository into an AI-first, agent-pilotable codebase

---

## Who maintains it

Deep Work Plan grew out of real engineering work at [Dailybot](https://www.dailybot.com) and is now maintained by Dailybot together with the open-source community. The methodology, specification, and kit are released under the MIT license — free to use, adapt, and build on.

- [Read the methodology](/methodology)
- [Quickstart](/quickstart)
- [GitHub repository](https://github.com/DailybotHQ/deepworkplan-website)
