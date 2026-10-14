---
title: Record layer
description: "The v6 and v7 record layer: an immutable outcome contract, an append-only journal, evidence classes, sign-off, amendments, invariants and receipts."
order: 9
lang: en
section: Record layer
---

# Record layer

> **Version scope:** This page restates the normative v6 record layer that the current standard, DWP 7.0.0, builds on. Canonical sources at release `v7.8.1`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTRACT.md) and [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_LIFECYCLE.md). Where this page and those files differ, the files win. v5 plans keep the [plan state](/spec/plan-state) layer and are never migrated implicitly.

**Version 6.0.0, extended in 7.0.0. Status: Stable.** The record layer replaces narrative completion with records: the contract is the authority, the journal is the memory, helpers do the writing, and every generated file is a projection. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

## The one-line model

A plan is two authored artifacts and one guarded sequence. The plan markdown (`README.md` and task files) says what will be done. The **outcome contract** (`contract.json`) says what counts as done and what the plan is allowed to do. The **journal** (`journal.ndjson`) records what actually happened. `state.json` and `views/` are regenerated from the journal and MUST NOT be hand-edited; when a generated file and the journal disagree, the journal wins and the file is regenerated.

## Generation detection

A plan folder is a v6-line plan if and only if it carries a `manifest.json` whose `contract` pointer resolves, a `contract.json`, or a `contracts/` revision chain. Detection MUST use these artifacts, never the installed pack version: a current pack can hold v5 plans, and an older pack can meet a v6 plan.

The contract's `schema` URL names its **generation**, and the manifest and every journal event mirror it:

| Generation | Contract | Journal events | Manifest | Adds |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` and the `delegation` event ([Delegation](/spec/delegation)) |

New plans created by the 7.x pack are v7 by default; an explicit `v6` request still materializes a v6 contract. A plan never changes generation, and a journal that mixes generations MUST be refused. Both generations project into the same [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json) shape.

## The outcome contract

One contract per plan, conforming to its generation's schema. It carries the outcome statement and success definition, the acceptance criteria, the tasks with their prerequisites, touched surface and gate intent, plan-scoped invariants, the scope (allowed paths, command classes, forbidden operations), the resource envelope, scheduling limits, permissions and the authorization record.

- **Identity.** The `contract_id` is the SHA-256 of the contract's canonical bytes without the id field. Every record produced under the contract cites it.
- **Immutability.** Once execution starts, the contract MUST NOT change. A changed contract is a new **revision** under `contracts/`, citing its parent, with contiguous revision numbers and fresh recorded authority.
- **Stable ids.** Criteria (`AC-*`), invariants (`INV-*`) and tasks (`T-*`) MUST be unique, and records cite ids, never list positions. The task graph MUST be acyclic, and every gate intent MUST reference a declared criterion.
- **Permissions.** Granted and not-granted capabilities MUST be disjoint subsets of a closed set: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Authorization.** The mechanism is exactly `plan_authorship` (the human authored or reviewed the plan before execution) or `pre_authorization` (a standing grant with a stated envelope, as in trust mode). Both gate identically; only the recorded authority differs.
- **Closability.** Every criterion MUST be closable: a criterion a task gates is closed by `observed` evidence from its gate or by an `asserted` human sign-off, according to the evidence classes it accepts. A draft criterion that accepts neither is refused.

## Materialization

A plan is materialized by the shipped helper (`ledger.py materialize`), never by hand, in exactly this order, each step idempotent and resumable:

1. **`manifest.json`** with the contract pointer, written first so the plan's generation is discoverable even if materialization is interrupted.
2. **`contract.json`**, validated and content-addressed.
3. The **`approval`** journal event, citing the contract id and the digest of the plan markdown.

Only that approval event opens the task-start gate. A hand-copied contract without it is refused at task start, and a manifest whose pointer does not match the materializing contract is refused rather than rewritten.

## The journal

`journal.ndjson` is append-only: one closed JSON object per line, never edited or deleted. A correction is a later event. Every event carries its schema, type, a strictly increasing `seq`, a timestamp, the plan, the `contract_id` and the actor (`helper`, `agent`, `host_adapter` or `human`). The event catalog covers task starts, approvals, gate runs, observations, adaptations, amendments, interventions, resource samples, control pairs, scheduler selections, refusals, view renders, reconciliations and journal repairs; v7 adds delegation events. Every refusal is itself recorded.

## Evidence classes

Evidence-carrying events record a **trust** label:

1. **observed** — a shipped helper itself executed the check, with declared working directory, environment, timeout and captured output. Only the gate runner (`ledger.py gate`) mints observed gate evidence; an agent that merely writes down a result it reports cannot.
2. **imported** — taken from a matched external source with provenance, for example a migrated v5 gate record whose evidence pointer resolves.
3. **asserted** — stated without independent establishment.

Each criterion declares which classes it accepts, so an observed-only criterion can never close on a claim. Checksums establish byte identity, not semantic truth; the record layer checks structure and provenance and does not prove product semantics.

## Human sign-off

A criterion that a human must judge closes through `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. The sign-off is recorded as `asserted`, cites the artifact it rests on, counts only inside the declaring task's evidence window, and closes only a criterion that accepts `asserted`. An agent never signs off for a human. Human-actor records written outside materialization carry an explicit authority marker (a note the human wrote, recorded by path and digest, or an interactive confirmation); the ledger cannot authenticate a person, so the marker makes the claim auditable rather than observed.

## Controlled criteria

A criterion declared as a regression or discrimination control closes only on a **discriminating control pair**: the check fails on the starting revision and passes on the new one. A pair that passes on both legs is recorded as non-discriminating and never rounded up; a dirty start or an unavailable old leg is recorded as control unavailable, never synthesized.

## Execution and completion

Dispatch comes from the deterministic scheduler (`scheduler.py ready`), and `ledger.py start` refuses a task whose prerequisites are incomplete. Each task start records a fingerprint of the working tree, and evidence is reused only for the same task and criterion on an equivalent fingerprint.

**Invariants are plan-scoped.** Each declared invariant holds across the whole plan and is evaluated at every boundary as an observation (`INV-<id>: pass` or `INV-<id>: fail: <reason>`). A property only some tasks must hold is an acceptance criterion of those tasks, never an invariant.

**Completion is derived, never declared.** `ledger.py complete` refuses, and records the refusal, while any criterion lacks accepted in-window evidence or any invariant lacks a fresh passing evaluation. The snapshot shows a task as completed exactly when the records support it.

## Adaptations and amendments

Mid-run changes are proposals to the scheduler, limited to a closed set: `split`, `reorder`, `insert`, `change_strategy` and `retry`. An adaptation MUST NOT delete a requirement, weaken or substitute acceptance, expand scope or permissions, spend beyond the envelope, or mark an unexecuted scenario complete.

A change to scope, acceptance criteria, permissions or envelope is a **contract amendment**: `ledger.py amend` stages the revised contract as the next revision, records the amendment with the criteria whose earlier evidence it invalidates, requires a fresh approval with a human authority marker, and only then switches the live contract. An interrupted amendment resumes at the first missing step; plan authorship never carries over to a revision.

## Receipts, views and export

`outcomes.py receipt` recomputes the plan's outcome from the records, so it changes when the records change; it is never handwritten. `views.py render` regenerates human-readable views; a view a human edited is reported, never silently overwritten, and the reconciliation is itself recorded. Because `.dwp/` is gitignored, `ledger.py export --dest <dir>` bundles the journal, snapshot, contract chain and every cited evidence artifact for durability or for another host.

## Read-only surfaces and resume

`status` and `verify` never write to a v6-line plan; they report through pure commands and the generated projections. A resuming host recovers in a fixed order (inspect, validate, project, render with recorded authority) and treats a stale fingerprint as invalidated evidence to re-run, never as a reusable result. The journal is never replayed as conversation context: work resumes through the execute loop with a per-task [context manifest](/spec/resources-and-abilities#the-per-task-context-manifest).

## Coexistence and migration

v5 and v6-line plans MAY coexist in one `.dwp/plans/`, and each runs under its own generation for its whole life. The only path from v5 to v6 is an explicit, previewed migration (`migrate_v6.py`, run through `refine`) with a verified backup and rollback; migrated v5 history is `imported` when its evidence resolves and `asserted` otherwise, never `observed`. There is no reverse migration.

## Related

- [Resources and abilities](/spec/resources-and-abilities) — the context manifest, resource envelope, host capabilities and addon registry.
- [Delegation](/spec/delegation) — what v7 adds to this layer.
- [Plan state](/spec/plan-state) — the retained v5 state layer.
