---
title: AI Diff Reviewer
description: "Required local review in every DWP Final Review since standard 2.3.0, installed by onboarding; the Flow B CI gate and apply-review companion stay optional."
kind: addon
lang: en
order: 5
---

# AI Diff Reviewer addon

Every Deep Work Plan closes the same way: a mandatory **Final Review** that reads the plan's entire accumulated change set before the work can be called done. Its security pass is the last point at which anything gets caught. Without help, the only reader at that point is the same agent that wrote the code.

This addon puts a second reader on that diff. It wires the **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — listed on the marketplace as "AI Diff Reviewer", currently **v2.3.0** — into the security pass, where it returns something structured rather than prose: a verdict, a findings table, and a severity on each finding. A `critical` finding blocks completion until it is fixed or explicitly accepted. The review is a gate, not a comment.

Since standard 2.3.0 that local review is **part of the baseline, not an extra**. Onboarding installs it; every Final Review runs it. What stays optional is the CI surface — Flow B, where the same review gates pull requests through the GitHub Action.

The boundary that makes this safe to adopt is deliberately narrow. The reviewer is an MIT-licensed, tag-pinned skill executed by the coding agent you already run, so no Deep Work Plan flow depends on a commercial service, a CI provider, or a secret. **Flow A** (local-only) is what every onboarded repository gets; **Flow B** is offered explicitly and never installed unrequested. A developer may also decline the reviewer outright — that decline is recorded as a declared exception, and `verify` reports the repository as non-conformant on that point until it is installed.

## When to use it

| Signal | Action |
|--------|--------|
| Every onboarded repository | **Flow A is installed** in onboarding Phase 7a (vendored skill + `.review/extension.md`); a targeted harness upgrade adds it to repositories onboarded earlier |
| Team wants a CI PR merge gate with structured findings | **Offer Flow B** — explicit opt-in, never the default |
| Personal or experimental repo; local review is enough | **Stay on Flow A** — the baseline is complete |

## Two adoption flows

| Flow | What you get |
|------|----------------|
| **A — local-only (baseline)** | Vendored skill + required `.review/extension.md` (via `generate-extension`). Runs the local review inside every Final Review's security pass. No GitHub Actions workflow. |
| **B — dual-surface** | Flow A plus `setup` writes `.github/workflows/pr-review.yml` (Action `@v2`), same extension file for local and CI. Optional `apply-review` companion after CI posts findings. |

Detection for the local review requires **skill + an extension file** at one of: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, or `.github/ai-pr-reviewer/extension.md`. Skill alone is not enough.

## What this addon wires (narrow by design)

The DWP addon does **not** reinvent the reviewer. It defers install, methodology, the CI wizard, extension authoring, PR drafting, and post-CI walkthrough to the upstream skill's five sub-skills (parent default flow, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### The required local review

`create` adds the local review step to every Final Review's security pass and `execute` runs it. Output appends under `## AI Diff Reviewer local review` in the plan-local `analysis_results/SECURITY_REVIEW.md` (inside the plan's own folder, never the repository root).

- **Missing reviewer — recorded, never skipped silently:** a missing skill or extension becomes a `local reviewer not installed` finding; Final Review runs the local pass when the skill is present and otherwise carries the finding into the completion report — installation belongs to the onboarding consent or an explicit addon invocation, never a surprise bootstrap.
- **Soft-fail (invocation only):** a review that could start but errors → warn once, record, continue; never fail the task for that miss.
- **Gate after a completed pass:** `critical` findings still block Final Review completion until fixed or explicitly accepted. `warning` / `info` are documented but non-blocking.
- **Flow A needs no CI secret.** An unset `CURSOR_API_KEY` must not suppress the local pass.

### Flow B CI gate (optional)

Action `DailybotHQ/ai-diff-reviewer@v2`, typically label-gated (`ready`), with a stable-named **AI review gate** job for branch protection and opt-in `skip-review-label: skip-ai-review`. Shared `prompt.md` + extension align methodology and severity; under Iteration-Aware Review, CI round 2+ may be shorter while the local pass stays full.

### Optional `apply-review` companion

After CI posts a review, the developer may invoke `apply-review` during `execute` to walk findings per-finding (apply / defer / skip) with consent. Read-only by default; never a plan task file (would break mandatory final-task order).

## What changed since v2.0.1

Three upstream releases landed between v2.0.1 and v2.3.0. None of them changes how this addon wires the reviewer — Flow A, the three detection paths and the blocking contract are unchanged — but they change what an adopter gets.

| Change | What it means for a DWP repository |
|--------|------------------------------------|
| **Runner and backend are separate inputs** (v2.1.0) | `provider` names the *runner* — who owns the review loop. The new `api-base` names the *backend* — where the model lives. An empty `api-base` is byte-identical to v2.0.x, so an existing install behaves exactly as before. |
| **Two more runners** (v2.1.0) | `openai` (in-process, zero install) and `grok` (CLI) join the existing set. |
| **Cost is a one-word tier, and the defaults are measured** (v2.1.0, v2.3.0) | Cost is controlled by a tier keyword and shaped diffs, and reported per review. On xAI, `balanced` and `economy` both resolve to `grok-4.5` and `deep` to `grok-4.6`. |
| **Follow-up rounds review the actual new diff** (v2.1.0, v2.2.0) | Outstanding findings carry forward. `prior-findings-resolution` defaults to `advisory`: a model's "resolved" verdict is reported, but the finding keeps gating until a maintainer resolves the thread. |
| **An incomplete review is never a green review** (v2.2.0) | A run that exits without writing findings is posted as an explicit incomplete review. Every blocking strictness fails it, the reviewed label is not stamped, and no open finding is retired by an empty round. |
| **Checksum-verified installers** (v2.2.0) | `cursor-installer-sha256` and `grok-installer-sha256` refuse to run a vendor artefact whose hash differs from the configured pin. |

Two of these matter more than the rest for the methodology.

**The incomplete-review gate closes a real hole in the security pass.** A Final Review must not be able to close on a review that did not happen. Before v2.2.0 a runner that exited without producing findings was indistinguishable from a clean pass. It is now a named, non-green state, so "no findings" means the reviewer looked and found nothing rather than that it never looked.

**`economy` is deliberately not cheaper.** The upstream benchmark of 2026-09-16 measured `grok-4.3` at 0 of 5 known defects — it approves without reviewing — while `grok-4.5` matched `grok-4.6` at 3 of 5 with no false positives, at the same cost and a quarter of the wall time. Since no cheaper xAI model still reviews, `economy` resolves to the same model as `balanced` rather than being a tier that finds nothing. The xAI path therefore moves from roughly $0.07 to roughly $0.40–0.75 per review through the CLI; `model: grok-4.3` can still be pinned explicitly to keep the earlier behaviour. These figures are upstream's published measurements, not Deep Work Plan's own.

## Behavior

- **Flow A is the baseline; Flow B is asked, never guessed.** Installing a workflow unrequested is a larger footprint than staying on Flow A.
- **Reconcile, don't clobber.** Existing skill, extension, or `pr-review.yml` are preserved; fill gaps only.
- **Auth deferred.** Provider secrets for CI are maintainer-configured; this addon never stores credentials.
- **Vendor-neutral.** No commercial service, CI provider, or secret is ever required; the CI surface is the only piece that touches a provider.

## Notes

Local review required since standard 2.3.0; CI surface optional. Upstream skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec page: [Add-ons](/spec/addons).
