---
title: "Case study: this website"
description: "How deepworkplan.com itself was made AI-first with Deep Work Plan — a real before-and-after of adopting the methodology on a production Astro repository."
kind: example
lang: en
order: 2
---

# Case study: this website

The site you are reading dogfoods the methodology it documents. This is a real account, not a hypothetical.

## Before

The repository carried a bespoke, hand-maintained "deep work plan" system inside `.agent_commands/` — prose procedures that only worked here, drifted from the code, and could not travel to another repo. Onboarding a new agent meant re-explaining the project every session.

## The plan

A single Deep Work Plan drove the migration, decomposed into atomic tasks with validation gates:

1. Promote the bespoke generators into the installable skill (the `author` sub-skill).
2. Install the Deep Work Plan skill as a reference install, pinned by `skills-lock.json`.
3. Replace the homegrown commands with thin `dwp-*` delegators.
4. Retire `.agent_commands/`; cut all plan output over to a gitignored `.dwp/`.
5. Document the result across `AGENTS.md`, `docs/`, and the `.agents/` catalog.

Each task validated against the repository's real gates — `biome`, `astro:check`, the test suite, the production build, and the agent-endpoint parity check — before it was marked complete.

## After

The repository is now AI-first by its own specification: a reasoned `AGENTS.md`, a categorized `docs/` tree, a cross-agent `.agents/` kit, and a gitignored `.dwp/` workspace. Any agent — Claude Code, Cursor, Codex, Gemini, Copilot — can open it, read the harness, and execute long-horizon plans without per-session hand-holding.

## Outcome

The methodology proved itself on its own source. What had been repo-specific machinery became a portable standard the repository simply *uses* — the same standard any other repository adopts by following [`/init.md`](/init.md).
