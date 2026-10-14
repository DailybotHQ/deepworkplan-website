---
title: Resources and abilities
description: "Per-task context manifests, the resource envelope, host capabilities, the .dwp/config.json addon registry and the abilities that enabled addons add."
order: 10
lang: en
section: Record layer
---

# Resources and abilities

> **Version scope:** This page restates four normative documents of the current standard, DWP 7.0.0, at release `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md) and [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). Where this page and those files differ, the files win.

**Status: Stable (context and resources since 6.0.0; configuration and abilities since 7.0.0).** These rules bind v6-line plans ([Record layer](/spec/record-layer)); the v5 standard is untouched. The keywords MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described in RFC 2119.

## The per-task context manifest

Before each task, the agent derives a **context manifest** from the contract and the full journal (`context_manifest.py`). It is a derived view, never stored as state: deriving twice from the same records MUST produce identical bytes, and the manifest MUST NOT read outside the plan and its repository. Its shape is published as [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Section | Derived from |
| --- | --- |
| `identity` | plan name, live contract id and revision |
| `authorization` | the approval events, verbatim, including consent checkpoints |
| `repository_rules` | the contract scope and the invariants with their current evaluation state |
| `acceptance` | the task's criteria with their closure state |
| `touched_surface` | the declared files with their current content hashes; a missing file surfaces as missing |
| `evidence` | in-window evidence pointers that resolve on disk |
| `dead_ends` | failed gates, refusals, refused adaptations and non-discriminating controls |
| `freshness` | the fingerprint of the inputs the manifest summarizes |
| `next_action` | exactly one next step with a concrete command |

`authorization`, `repository_rules` and `acceptance` are **mandatory**: context pruning can never hide the acceptance or authorization boundary. The next-action ladder is ordered (approval, start, authority, control, evidence, complete) and never presents an ordinary passing gate as closing a controlled criterion.

**Dead ends are retained.** An entry leaves the digest only on proven record facts (the same fingerprint later passed, a newer duplicate refusal superseded it, or a contract revision aged it out); a mere surface change MUST NOT drop it. **Freshness is checked:** a summary whose recorded input fingerprint no longer matches is stale, and a summary with no fingerprint is stale by construction. **History loads by trigger only** — a recorded handoff or an amendment affecting the task; otherwise the manifest alone is the task's context.

## Four-quantity accounting

Instruction load and cost are reported as four distinct quantities: static **instruction bytes**, **provider tokens** (only where a host meter recorded them), **monetary cost** (only from recorded real-rate samples) and **wall-clock time** (from the event timestamps). A missing quantity is reported as missing with its reason, never imputed, and bytes are never converted to tokens or money.

## Host capabilities

The runtime host states its **abilities** from a closed set: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. An unknown ability MUST be refused, and an unstated ability is `false`. The **minimal host** — no model switching, no subagents, no telemetry, no stop — is a supported posture, never an error; every limit that needs a missing ability degrades to advisory with the missing ability named.

Abilities are not grants. A grant in the contract is authority; an ability is what the environment can actually do. Every posture that needs an ability still needs its grant.

## The resource envelope

A contract MAY declare limits in its resource envelope. A limit is **enforced** only when it names a real metering source; otherwise it is **advisory**, and enforcement parity across hosts is never claimed.

- **Counter sources.** Journal-observable counters (wall-clock span, gate retries, dispatch calls) are computed from the plan's own records. Host-only counters (spend, provider tokens) need the matching meter ability and an observed sample from a host adapter; a missing counter is not free usage.
- **Reserves.** A limit MAY declare a `reserve` so that verification, retry and resume cannot be starved by ordinary work: dispatch is refused when spent plus pending would exceed the limit minus the reserve.
- **Exhaustion.** Reaching a limit persists an incomplete checkpoint, records `LIMIT: exhausted <id>: <detail>` and holds dispatch until an explicit `LIMIT: recovered <id>` record. An exhaustion can never satisfy an acceptance criterion.
- **Cancellation settlement.** An in-flight reservation settles exactly once, as released or committed; a conflicting second settlement is refused, never arbitrated.
- **Routing posture.** The default is a fixed model. Model-tier switching needs both the `model_routing` grant and the ability of the same name; parallel dispatch needs both the `agent_delegation` grant and the `subagents` ability. A routing posture is a permission statement, never an efficacy claim.

## The configuration file and addon registry

`.dwp/config.json` (repository) and `~/.dwp/config.json` (user) share one shape, published as [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), and one parser (`config.py`). **The methodology works with no configuration file and no addon**; nothing in the file can make a plan, a flow or conformance depend on an addon.

- **Tracked by default.** The repository file holds decisions, never secrets, and is tracked so teammates and CI read the same registry: onboarding writes the `.gitignore` rule `.dwp/*` plus `!.dwp/config.json`. Plans and benchmark records stay ignored.
- **Precedence.** The repository file wins over the user file, and an absent file means everything disabled. The `addons` key resolves per addon key; the `benchmark` key resolves wholesale.
- **Registry keys** are the in-pack addon directory names: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Each entry has `enabled` (only `true` enables), an optional `version` and an optional one-line `note`. An unknown key is ignored with one warning.
- **Absent means not enabled.** Only onboarding with the developer's consent, an addon's own install step or the human enables anything. An enabled addon that is not detected and carries a note is reported as deferred.
- **Fail-closed reading.** An unreadable file or a malformed value contributes nothing and produces exactly one warning; a reader never aborts a flow and is never silent about what it discarded. The writer reconciles atomically and refuses to overwrite a file it cannot parse.
- **Host record.** An optional `host` key records the machine's declared abilities (booleans from the closed set). `telemetry: true` still needs the developer's consent.
- **The baseline is unchanged.** The AI Diff Reviewer local review stays part of every Final Review whether or not the registry names it.

## Addon-provided abilities

From 7.0.0, enabled addons can add abilities at runtime:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

- **Descriptors.** Each in-pack addon ships an `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) that declares its key, what it provides and how it is detected.
- **Detection is read-only.** A detect command runs without a shell, with stdin closed and a 10-second timeout, and nothing it prints is executed. A product whose reported interface major differs from the pinned one is not available, with one warning.
- **Not enabled means not consulted.** A disabled addon's descriptor is not opened and its detect command is not run. The union is monotone: enabling an addon can only add abilities.
- **Never persisted.** Effective abilities are recomputed on every call and MUST NOT be written into a plan. A plan records what it used — the delegation event names its transport and addon — not what was available.
- **Abilities are not authority.** The agentkit addon can provide `subagents`, `cancel_children` and `model_routing`; the Herdr addon can provide `subagents` and `cancel_children`. Delegating still needs the contract's `agent_delegation` grant ([Delegation](/spec/delegation)).

`resources.py abilities` prints the effective set and where each ability came from; it is read-only.

## Related

- [Record layer](/spec/record-layer) — contract, journal and evidence.
- [Delegation](/spec/delegation) — how a plan uses the `subagents` ability.
- [Add-ons](/spec/addons) — the optional addons themselves.
