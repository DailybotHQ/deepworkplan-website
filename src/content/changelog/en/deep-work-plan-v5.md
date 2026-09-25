---
title: "DWP v5: the promises, now guaranteed"
description: "Deep Work Plan v5 turns eight standing promises into tested, versioned contracts — an honest verifier, safe orchestration, and a proven upgrade path."
date: 2026-09-12
version: "v5 · Guaranteed by tests"
kind: release
lang: en
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Skill release commit ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Skill release v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Skill release v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Skill release v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "Skill release v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "Skill release v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "Reviewer release v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1"
---

Today we are releasing Deep Work Plan v5. This is not a rewrite: it is months of real usage — including a direct audit of 108 real plans — surfacing exactly where the methodology's promises and an agent's actual behavior could diverge, gap by gap. The honest summary of this release: the methodology already promised all of this — now it guarantees it. Before v5, an agent that followed the documentation to the letter could still land in real failure scenarios; each one identified through that usage and feedback is now closed and pinned by an executable test, not patched over with more prose. The skill's contract suite grew from 132 to 258 tests in this cycle, and every guarantee below was validated live against the released tag — installed into a clean repository and taken through its own flows before this entry was written.

**A verifier that never claims unverified success.** Conformance checks used to degrade silently: without a capable interpreter they skipped every verification and still printed a conforming verdict, and bold text inside a field could be mistaken for a missing field. Now the verifier exits with an explicit `UNVERIFIED` verdict whenever it cannot actually verify. A verifier never reports a success it did not check — trust in gates is the whole proposition, and a gate that can skip its own check breaks the chain.

**One approval contract for Lite plans.** Three surfaces used to answer the question "does starting this plan approve its current scope?" in three different ways, and an agent could deadlock or run without authorization at exactly the most dangerous boundary. v5 settles one contract everywhere: an explicit execute or resume approves the current ready scope and records that approval before doing any work; a pending proposal alone authorizes nothing; an interrupted promotion is recovered before any product work runs.

**Multi-repo orchestration that cannot corrupt.** An orchestrator hub's environment override used to leak into its child repositories — a child could write plan state into the hub's own folders. The orchestrator templates also printed `FAIL` while exiting with success, and a completeness check that grepped for a status string could read one completed task as a completed plan. Now the hub root is saved before navigating into sub-repositories, every child resolves its own `.dwp/` in isolation, every failure branch exits with an error, completeness is parsed from the plan's top-level status, and the devcontainer entrypoint propagates copy errors before deleting anything.

**One addon consent matrix.** Which addon installs by default, which is merely offered, and which review is required — earlier surfaces answered differently. v5 states one matrix: the AI Diff Reviewer is required for local review, pinned to a verified release, with CI review as an explicit opt-in that never bootstraps itself; the design-system addon is a mandatory offer when UI work is detected but installs only on explicit acceptance; the dependency-upgrade addon ships as a near-default inert delegator with exact-snapshot rollback; dailybot reports only where authorized. An empty diff no longer counts as a completed review.

**Real machinery for long plans.** An audit of 108 real plans showed that parallelizable work was common but the sequential decision was almost never declared, and stage gates existed only as ad-hoc practice. v5 makes the execution decision always declared — sequential with a recorded reason when parallelism is not warranted — adds optional Stage Gates for plans of twenty or more tasks, and enriches Plan Variables with rigor tier, evidence bar, and forbidden actions. All of it loads progressively and never burdens a Lite plan.

**Context enforced, one objective per task.** Plans could drift into context-free task lists, and one task could bundle three objectives behind a single green gate. v5 requires a Goal and Context pair at plan level, a per-task Context — what a fresh session needs to start that task alone — on every new task record (completed records stay exactly as authored), and makes one objective per task the normative rule with a guard against decay.

**A safe upgrade path.** `/dwp-upgrade` is new. Its check phase is read-only and installs nothing; an upgrade starts only from explicit acceptance, with local adaptations diffed and surfaced before anything is overwritten; installation targets an exact tag and verifies itself; onboarding re-runs as a fresh init. An upgrade never touches `.dwp/` — no plan, state file, gate record, or evidence is migrated, rewritten, or invalidated.

**Honest, measurable evidence.** Efficiency claims are now re-measured across three baselines — v3.0.0, v4.0.3, and the final tree — with the measurement script committed to the repository. Results are reported in filesystem bytes and never converted into token counts or cost figures we cannot stand behind, and every claim that cannot be verified is quarantined as such in the evaluation record.

**A versioned contract, published.** Every promise above is backed by data other tooling can read, not just prose: the plan-manifest and plan-state formats are now versioned as the v5 schema line — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) and [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — so a plan, a verifier, or a third-party tool can check conformance against a published, machine-readable contract instead of a paragraph of documentation. Nothing in the v5 line changes shape relative to v2: existing plans referencing v1 or v2 schemas remain valid and are never rewritten.

Deep Work Plan v5 follows DWP standard 5.0.0. Read the [normative specification](https://deepworkplan.com/spec), see the [skill repository](https://github.com/DailybotHQ/deepworkplan-skill), or start adoption from [`/init`](https://deepworkplan.com/init).

## Update — 2026-09-17 · skill v5.4.0

The v5 line's first point release closes the one remaining way a plan could finish on work that was never actually checked, and settles where a plan's own evidence lives. DWP standard 5.0.0 is unchanged: this is an addon-contract and documentation release, not a schema change.

**A review that never ran is no longer indistinguishable from a clean one.** The Final Review's security pass already separated a missing reviewer — recorded as a finding — from an invocation that errored, which warns once and continues. The reviewer upstream added a third outcome: a run that starts and then exits without writing any findings at all. Left unnamed, it collapsed into "the pass completed and found nothing", which would let a plan close on a review that did not happen. It is now a state of its own: recorded as an incomplete review, never counted as evidence that the change set is clean, and never a reason to close the Final Review. Three distinct outcomes — and none of them means the diff was read and found clean.

**A plan's evidence belongs to the plan.** The standard already placed the analysis record, the skills ledger, the security review and the gate logs inside a plan's own `analysis_results/`, but it never stated that exclusivity as a rule. A repository's own audit tooling, defaulting its report path to the working directory, could therefore write a plan's evidence to the repository root without any flow noticing. The specification now requires it: anything a flow produces about a plan goes in that plan's folder, and a tool whose default output path is the working directory must be given its explicit output option instead. Evidence that is not where the plan says it is has been lost — which is the practical reason the rule exists, not a filing preference.

**The AI Diff Reviewer pin moves to v2.3.0.** The required local review now installs a reviewer that separates the runner from the backend, so the same review can run against any compatible endpoint without changing what DWP depends on — the vendor-neutral guarantee gets stronger rather than looser. It also carries checksum-verified installers, measured rather than guessed cost defaults, and follow-up rounds that review the real new diff while carrying outstanding findings forward. That last one has a contract consequence worth stating plainly: a model's own claim that a finding is resolved does not retire it — a maintainer does.

**Working principles now ship with the harness.** `v5.5.0`, later the same day, makes onboarding teach a repository's agents how to work, not just what the repository contains: ten compact behaviors — own the outcome, investigate before asking, decide routine matters independently, escalate when judgment or authorization is genuinely missing, and verify before claiming completion, among others — written inline in `AGENTS.md` where an agent that reads only the entry point will find them. They are defaults within a request, never new authority: they cannot override host permissions, a narrower scope, plan gates, or a repository's own approval rules. An upgrade reconciles them by meaning rather than by keyword, so equivalent rules already in a file are kept rather than rewritten.

**The AI Diff Reviewer pin moves to v2.3.1.** Skill `v5.5.1` installs the reviewer whose check, review body and tracking comment agree. A body that says `Recommendation: approve` is not evidence the check passed — read the tracking marker's Check status block. Under advisory, a corroborated fix can retire a finding whose thread is already collapsed, so a stuck PR can go green after a real fix.

Read the [specification](https://deepworkplan.com/spec) for the normative text, the [add-on reference](https://deepworkplan.com/kit/ai-diff-reviewer) for what the reviewer now does, or the [v5.5.1 release](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) for the source.

## Update — 2026-09-25 · skill v5.5.3 + reviewer v3.1.1

The AI Diff Reviewer addon now documents and installs the reviewer's **v3** line, released 2026-09-24 (v3.0.0 → v3.1.1, moving pin `@v3`). Skill `v5.5.2` rewrote the addon's normative documents, onboarding hook and integration template around what the v3 reviewer actually does, and `v5.5.3` shipped the CI side. The load-bearing changes, verified against the released reviewer at tag `v3.1.1`:

**A `critical` gates only when verified.** Since v3, every critical finding a model claims — plus a 30 % sample of warnings — gets a second, short, code-grounded check by a separate model call (≈ 3 k tokens, 10 s and $0.009 per verified finding). A `critical` publishes — and blocks the Final Review — only when that verifier confirms it; refuted claims stay visible as annotated warnings and are listed in the structured output, never posted inline. A review that hits its turn cap (`incomplete`) or its wall clock (`timeout`) is red under blocking strictness: "no findings" now always means the reviewer looked and found nothing.

**Budgets follow the risk tier.** The review budget is derived from the change's deterministic risk tier — 8/20/30/40 turns from `low` to `critical` — and a push that changes no code runs a verifier-only round at −93 % cost. `budget-profile: fixed` restores the pre-v3 constants during the transition; incremental rounds cut input tokens by 62–76 %.

**Six sub-skills, one of them a loop.** The router gains `address-review` (new in v3.1.1): one invocation finds the branch's open PRs, checks the review is fresh for the current head, presents the findings, then — on one yes — applies, commits in small Conventional Commits batches, pushes, and re-arms the reviewer the way the repository triggers it. `apply-review` remains read-only; structured output (`review-output/3.0`) is the machine path for anything automated. The `@v2` line stays frozen on `release/v2` with six months of security and catalog maintenance — v3 is the recommendation, never a forced migration.

**The reviewer now reviews its own homes.** The skill repository and this website both run a label-gated CI self-review — a single grok leg via `DailybotHQ/ai-diff-reviewer@v3`, triggered once per application of the `ready` label (remove and re-add it to re-run), with an honest skip when the provider secret is absent. This website also vendors the v3.1.1 reviewer, so the local Final Review and the documentation now teach the same contract.

Read the [specification](https://deepworkplan.com/spec), the [add-on reference](https://deepworkplan.com/kit/ai-diff-reviewer) for the full v3 capability list, the [v5.5.3 release](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) for the source, or the [reviewer v3.1.1 release](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) for what changed upstream.
