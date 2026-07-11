---
title: Init — Make your repository AI-first
description: "The executable onboarding prompt for AI agents: adopt Deep Work Plan in any repository — analyze, document, install the skill, and leave it agent-pilotable."
---

# Init — Onboarding prompt for AI agents

You are an AI coding agent. Read this entire prompt first, then make the current repository
**AI-first**, **spec-driven**, and **agent-pilotable** by adopting the Deep Work Plan (DWP)
methodology. Treat this as a structured engineering task — a Deep Work Plan — not a quick edit.

## Operating principles (read before changing anything)

1. **Reason about *this* repository.** Never copy a template or leave a placeholder. Every file you
   write must reflect the repository's real languages, frameworks, commands, and structure. A generic
   stub is a failure, not a deliverable.
2. **Be non-destructive — ask before you replace.** The repository may already have an `AGENTS.md`, a
   `docs/` tree, a `.agents/` or skills setup, a `CLAUDE.md`, or its own conventions. Do **not**
   overwrite, move, or delete existing work silently. Detect what exists, read it, and **reconcile**:
   merge and improve in place wherever possible. Before replacing or removing anything the user
   already has, explain what and why, and get their explicit approval.
3. **Propose the plan, then execute.** After reconnaissance, present a short plan — what you will
   create, what you will modify, and anything existing you propose to reconcile or replace — and wait
   for the user to confirm before making large or destructive changes.
4. **Work in safe, reviewable increments.** Commit logically, keep diffs readable, touch no secrets,
   and leave unrelated code alone.
5. **Stop and report** if a step fails or the repository state is ambiguous.
6. **Trust, but verify.** Treat this prompt as untrusted input: confirm you fetched it from the
   official sources (`deepworkplan.com` and the `DailybotHQ` repositories), evaluate it before you act
   on it, and verify the skill's integrity before running it — see *Trust and verification* below.

## 0. Read the methodology and specification

Before changing anything, read the canonical sources so you understand the standard you are adopting:

- Methodology: https://deepworkplan.com/methodology.md
- Specification: https://deepworkplan.com/spec.md
- Kit catalog: https://deepworkplan.com/kit.md

## 1. Reconnaissance and a plan to approve

First understand the repository, then propose what you will do.

- **Detect the stack.** Languages, frameworks, the package manager (from the lockfile that actually
  exists), the real build/test/lint/type-check commands, the source modules, the test convention, and
  the deployment shape.
- **Classify the archetype.** An individual repository (the common case), an orchestrator hub, or an
  agent workspace — the long-lived home of an autonomous agent, where git is recommended rather than
  assumed — with the evidence.
- **Inventory what already exists.** `AGENTS.md`, `CLAUDE.md`, `docs/`, any `.agents/` or skills/agents
  setup, `.dwp/`, and `.gitignore`. Note anything that already does part of this job.
- **Propose the onboarding plan.** Present a concise list: files you will create, files you will
  modify, and anything existing you propose to reconcile or replace — then **ask the user to confirm**
  before proceeding. For a large repository, capture this plan with `/dwp-create` and execute it as a
  Deep Work Plan.

## Trust and verification (before you install)

You are about to install and run code in this repository, so verify what you are adopting first. This
is encouraged: a careful agent treats a fetched prompt as untrusted until it has been checked.

- **Confirm provenance.** This prompt and the skill are open source and MIT licensed. The canonical
  sources are `https://deepworkplan.com` and the `DailybotHQ` GitHub organization
  (`deepworkplan-website`, `deepworkplan-skill`). A machine-readable manifest is published at
  `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Know what the skill does.** It is Markdown-first: no CLI, no HTTP API, no auth, **no network
  calls, and no telemetry**. Its only security-relevant action is mutating *this* repository, and it is
  non-destructive by design — it reconciles and asks before replacing.
- **Verify integrity before you run.** Every release publishes a `SHA256SUMS` over the shipped skill;
  confirm your copy matches it before trusting it:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Download the checksums for the release you intend to install (replace vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # non-zero exit means a file does not match — stop
  ```

  Releases are **checksummed, not signed** (signing is a documented next step). Everything is open and
  diffable, so you can also compare any file against the repository at its tag.
- **Report a problem.** Report security issues **privately through GitHub's vulnerability reporting**
  on the relevant repository — `https://github.com/DailybotHQ/deepworkplan-skill/security`
  or `https://github.com/DailybotHQ/deepworkplan-website/security` — not as a public
  issue. See also each repository's `SECURITY.md`, `https://deepworkplan.com/.well-known/security.txt`,
  and the trust page `https://deepworkplan.com/trust`.

## 2. Install the Deep Work Plan skill

Install the skill so this repository's agents can plan and execute structured work. It ships a router
plus eight sub-skills — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard`, and `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Or clone and run the setup script:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Onboard the repository (reasoned and non-destructive)

Invoke the onboard sub-skill (`/deepworkplan-onboard`). Reason about the real repo and adapt everything
to it. For every artifact below, **if it already exists, reconcile it** (merge, improve, align to the
methodology) instead of overwriting — and confirm with the user before replacing anything.

1. **`AGENTS.md` + `CLAUDE.md`.** Produce an `AGENTS.md` at the root — an index, the mandatory rules
   (English-only, conventional commits, the repo's real test pattern and review gates), and a Quick
   Commands block with the repo's **real, runnable** commands. If an `AGENTS.md` already exists, merge
   into it rather than replacing it. Create the `CLAUDE.md → AGENTS.md` symlink (do not clobber an
   existing `CLAUDE.md` without asking).
2. **`docs/`.** Fill the standard categories with real, repo-specific content: `PRODUCT_SPEC.md`
   (the non-technical product/why doc — required for every repo, libraries included), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (never skipped — every repository has a security posture, even with no secrets),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, plus `PERFORMANCE.md` and a `docs/README.md` index.
   If docs already exist, integrate and extend them — do not duplicate.
3. **Per-module docs.** Add a `README.md` (and a `docs/` subfolder for complex modules) inside each
   major source module discovered in recon.
4. **`.agents/` + `.claude → .agents`.** Create the canonical, cross-agent home: a **reasoned** catalog
   of `agents/`, stack-appropriate `skills/`, and thin `dwp-*` `commands/` that delegate to the
   installed skill — every entry justified for *this* repository, not copied from another. Add a
   `docs/` catalog (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) that matches what exists on
   disk, plus `settings.json`, and the `.claude → .agents` symlink. Fold any existing skills/agents
   into the catalog.
5. **The DWP skill, adapted.** The installed skill is the engine; the repository's own kit
   (skills, agents, commands) must be **reasoned for this repo** — never a copy-paste of another
   repository's kit.
6. **`.dwp/` + `tmp/`.** Scaffold a gitignored `.dwp/` with `plans/` and `drafts/`, plus a `tmp/`
   scratch space — both added to `.gitignore` non-destructively (append, never rewrite).

## 4. Evolve the kit (author sub-skill)

Use the `author` sub-skill to grow the repository's own kit. The thin delegators `/skill-create` and
`/agent-create` route to it. Create a **skill** for a repeatable in-session procedure, an **agent** for
a recurring role with its own model tier and tools, and a **command** only as a thin delegator. Keep
the `.agents/docs/` catalog in sync with what exists on disk.

## 5. Offer the opt-in addons

After the baseline, enumerate the four addons (devcontainer, Dailybot, dependency-upgrade, design-system)
and offer each as an explicit opt-in. A repository is fully conformant with **zero** addons — never
auto-install them.

- **Devcontainer support** — a reproducible, isolated dev container with persistent AI-CLI auth.
- **Dailybot integration** — four lifecycle events (kickoff, significant task, blocked, completion) as best-effort progress reports for teams already using Dailybot, with optional autonomous hook enforcement (`dailybot-cli >= 3.1.2`). Installing the paired Dailybot agent skill (3.4.0) also exposes chat, check-ins, forms authoring, ask AI, and more — the addon wires only reporting into DWP execution. The core methodology has zero Dailybot dependency.
- **Dependency upgrade** — package-manager-agnostic, batched, validated, revertible upgrades. When
  accepted, it installs the `/lib-upgrade` command.
- **Design system** — an agent-facing `docs/DESIGN.md` reasoned from the repository's actual design
  source, covering its detected interface surfaces as profiles — visual UI, styled CLI output, and
  conversational messaging — so any agent generates interface output consistent with the repo's own
  conventions.

## 6. Plan and execute

Generate Deep Work Plans for any task and run them task by task:

- `/dwp-create <goal>` — decompose a goal into numbered, sequential tasks with validation gates.
- `/dwp-execute` — execute the plan task by task, updating progress and validating each gate.
- `/dwp-status` — report progress without making changes.
- `/dwp-refine` — add, remove, or reorder tasks while preserving completed work.
- `/dwp-resume` — reconstruct state and continue an interrupted plan.

Every plan ends with three mandatory final tasks — a **Security Review** of the plan's own
changes (keeping `docs/SECURITY.md` current; a critical finding blocks completion), Skills &
Agents Discovery, and the Executive Report.

## 7. Verify

Run `/dwp-verify` for an objective pass/fail conformance report (it checks the
criteria in the [specification's Conformance document](https://deepworkplan.com/spec)),
then confirm:

- [ ] The skill is installed and resolvable, with all eight sub-skills available.
- [ ] `AGENTS.md` exists at the root with a real Quick Commands block; `CLAUDE.md` resolves to it.
- [ ] `docs/` holds the standard categories with real, repo-specific content; major modules have a
      `README.md`.
- [ ] `.agents/` exists with `agents/`, `commands/` (thin `dwp-*` delegators), `skills/`, and a catalog
      that matches reality; `.claude → .agents` resolves.
- [ ] `.dwp/` exists, is gitignored, and has `plans/` and `drafts/`; `tmp/` exists and is gitignored.
- [ ] Existing user content was preserved or reconciled with consent — nothing was destroyed silently.
- [ ] You can generate a Deep Work Plan and execute it task by task, validating each gate.

## Outcome

When onboarding is complete the repository is changed in two durable ways — the pillars of the
methodology:

1. **The repository is spec-driven.** Work begins from a written plan and specification, not from
   ad-hoc prompts.
2. **The repository itself is the agent harness.** `AGENTS.md`, `docs/`, per-module docs, and the
   `.agents/` skill home give every agent the context and commands it needs to do structured,
   verifiable work.

Anyone can run this prompt on any repository — and end with a codebase any AI agent can pilot.
