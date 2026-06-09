---
title: Cloud agents
description: "The DWP adapter for cloud and background agents: Claude Code remote tasks, Codex cloud, Jules-class — ephemeral sessions executing against a durable .dwp/ plan."
kind: adapter
lang: en
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Cloud agents adapter

Cloud and background agents — Claude Code remote tasks, OpenAI Codex cloud, Jules-class agents, and similar asynchronous execution environments — are ephemeral by design: a session starts, runs for a bounded time, and terminates. DWP turns that constraint into a feature by making the plan the durable artifact, not the session.

## The core insight

The repository's `.dwp/` directory is the **durable spec and state layer**. Cloud sessions are **ephemeral executors**. The plan tells the executor what to do; `state.json` tells it where to resume. The session can be anything — a different model, a different provider, a new container — and the plan continues from exactly where it left off.

## Support level

**Full** — any cloud agent that reads the repository, follows `AGENTS.md`, and can execute shell commands supports DWP without a platform-specific adapter.

## The wake-resume-yield loop

Each cloud agent turn follows the pattern:

1. **Wake** — the session starts (triggered by a cron schedule, a CI event, or a user action).
2. **Run the DWP Resume Protocol** — read the plan README, locate the checkpoint, reconcile `state.json` against the markdown, inspect the seam, run a smoke test. See [DWP specification](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Check for blocked state** — if `state.json.blocked` is set, report the reason and yield without executing.
4. **Execute the next atomic task** — one task, passing its full validation gate.
5. **Update the state layer** — rewrite `state.json` atomically with the new task status, gate records, outcome record, and commit hash.
6. **Yield** — the session terminates cleanly; the next turn picks up from the updated state.

## Requirements

- The plan MUST carry the machine-readable state layer (`manifest.json` + `state.json`). Without it, an ephemeral session has no reliable way to determine resume position. See [Plan state](/spec/plan-state).
- The plan MUST have been approved by a human before any unattended cloud turn. Plan approval is the control point.
- The agent operates under bounded authority: it MUST NOT expand scope, perform destructive actions the plan does not explicitly authorize, or improvise beyond the current task's instructions. See [Agent protocol](/spec/agent-protocol#execution-profiles).

## Notes

Cloud agent sessions are the extreme case of the unattended execution profile: zero session continuity, maximum plan durability. DWP's `.dwp/` directory is specifically designed to make this work — all state an agent needs to begin, continue, and complete a body of work lives in plain markdown and JSON files that any session can read from a fresh checkout.
