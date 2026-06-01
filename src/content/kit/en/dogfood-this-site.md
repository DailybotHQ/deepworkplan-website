---
title: "Case study: this website"
description: "How deepworkplan.com itself runs on Deep Work Plan — a real account of a production Astro repository made AI-first with the methodology it documents."
kind: example
lang: en
order: 2
---

# Case study: this website

The site you are reading runs on the methodology it documents. It dogfoods Deep Work Plan: the same skill, the same `/init` flow, the same `.dwp/` plans any other repository would use. This is a real account, not a hypothetical.

## Before

Like most repositories, this one was not built for agents. Context lived in people's heads and scattered notes, there was no single source of truth an agent could read, and onboarding a new agent meant re-explaining the project every session. Long-horizon work drifted.

## Adopting DWP

The repository was made AI-first with a single Deep Work Plan, decomposed into atomic tasks with validation gates:

1. Install the Deep Work Plan skill as a reference install, pinned by `skills-lock.json`.
2. Run onboarding to generate a reasoned `AGENTS.md`, the `docs/` tree, and per-module docs from the repository's real stack.
3. Build the cross-agent `.agents/` kit — thin `dwp-*` command delegators and a catalog that matches what is on disk.
4. Scaffold the gitignored `.dwp/` workspace for plans and drafts.
5. Verify conformance with `/dwp-verify`.

Each task validated against the repository's real gates — `biome`, `astro:check`, the test suite, the production build, and the agent-endpoint parity check — before it was marked complete.

## After

The repository is now AI-first by its own specification: a reasoned `AGENTS.md`, a categorized `docs/` tree, a cross-agent `.agents/` kit, and a gitignored `.dwp/` workspace. Any agent — Claude Code, Cursor, Codex, Gemini, Copilot — can open it, read the harness, and execute long-horizon plans without per-session hand-holding.

## Outcome

The methodology proves itself on its own source: this site is built and maintained the same way it tells you to build yours — by following [`/init.md`](/init.md). If the standard works here, in production, it works for your repository too.
