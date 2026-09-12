---
title: "DWP v5: the promises, now guaranteed"
description: "Deep Work Plan v5 turns eight standing promises into tested contracts — an honest verifier, one approval rule, orchestration that cannot corrupt, and a safe upgrade path."
date: 2026-09-12
version: "v5 · Guaranteed by tests"
kind: release
lang: en
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Today we are releasing Deep Work Plan v5. The honest summary of this release: the methodology already promised all of this — now it guarantees it. Before v5, an agent that followed the documentation to the letter could still land in real failure scenarios; each one is now closed and pinned by an executable test. The skill's contract suite grew from 132 to 258 tests in this cycle, and every guarantee below was validated live against the released tag — installed into a clean repository and taken through its own flows before this entry was written.

**A verifier that never claims unverified success.** Conformance checks used to degrade silently: without a capable interpreter they skipped every verification and still printed a conforming verdict, and bold text inside a field could be mistaken for a missing field. Now the verifier exits with an explicit `UNVERIFIED` verdict whenever it cannot actually verify. A verifier never reports a success it did not check — trust in gates is the whole proposition, and a gate that can skip its own check breaks the chain.

**One approval contract for Lite plans.** Three surfaces used to answer the question "does starting this plan approve its current scope?" in three different ways, and an agent could deadlock or run without authorization at exactly the most dangerous boundary. v5 settles one contract everywhere: an explicit execute or resume approves the current ready scope and records that approval before doing any work; a pending proposal alone authorizes nothing; an interrupted promotion is recovered before any product work runs.

**Multi-repo orchestration that cannot corrupt.** An orchestrator hub's environment override used to leak into its child repositories — a child could write plan state into the hub's own folders. The orchestrator templates also printed `FAIL` while exiting with success, and a completeness check that grepped for a status string could read one completed task as a completed plan. Now the hub root is saved before navigating into sub-repositories, every child resolves its own `.dwp/` in isolation, every failure branch exits with an error, completeness is parsed from the plan's top-level status, and the devcontainer entrypoint propagates copy errors before deleting anything.

**One addon consent matrix.** Which addon installs by default, which is merely offered, and which review is required — earlier surfaces answered differently. v5 states one matrix: the AI Diff Reviewer is required for local review, pinned to a verified release, with CI review as an explicit opt-in that never bootstraps itself; the design-system addon is a mandatory offer when UI work is detected but installs only on explicit acceptance; the dependency-upgrade addon ships as a near-default inert delegator with exact-snapshot rollback; dailybot reports only where authorized. An empty diff no longer counts as a completed review.

**Real machinery for long plans.** An audit of 108 real plans showed that parallelizable work was common but the sequential decision was almost never declared, and stage gates existed only as ad-hoc practice. v5 makes the execution decision always declared — sequential with a recorded reason when parallelism is not warranted — adds optional Stage Gates for plans of twenty or more tasks, and enriches Plan Variables with rigor tier, evidence bar, and forbidden actions. All of it loads progressively and never burdens a Lite plan.

**Context enforced, one objective per task.** Plans could drift into context-free task lists, and one task could bundle three objectives behind a single green gate. v5 requires a Goal and Context pair at plan level, a per-task Context — what a fresh session needs to start that task alone — on every new task record (completed records stay exactly as authored), and makes one objective per task the normative rule with a guard against decay.

**A safe upgrade path.** `/dwp-upgrade` is new. Its check phase is read-only and installs nothing; an upgrade starts only from explicit acceptance, with local adaptations diffed and surfaced before anything is overwritten; installation targets an exact tag and verifies itself; onboarding re-runs as a fresh init. An upgrade never touches `.dwp/` — no plan, state file, gate record, or evidence is migrated, rewritten, or invalidated.

**Honest, measurable evidence.** Efficiency claims are now re-measured across three baselines — v3.0.0, v4.0.3, and the final tree — with the measurement script committed to the repository. Results are reported in filesystem bytes and never converted into token counts or cost figures we cannot stand behind, and every claim that cannot be verified is quarantined as such in the evaluation record.

Deep Work Plan v5 follows DWP standard 4.0.0. Read the [normative specification](https://deepworkplan.com/spec), see the [skill repository](https://github.com/DailybotHQ/deepworkplan-skill), or start adoption from [`/init`](https://deepworkplan.com/init).
