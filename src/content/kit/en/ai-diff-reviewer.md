---
title: AI Diff Reviewer
description: "Required local review in every DWP Final Review since standard 2.3.0, installed by onboarding; the Flow B CI gate (v2), shared extension, and apply-review companion stay optional."
kind: addon
lang: en
order: 5
---

# AI Diff Reviewer addon

Connect Deep Work Plan execution to the **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace listing **"AI Diff Reviewer"**, current **v2.0.0**) so the security pass of the mandatory **Final Review** runs a structured local review — verdict, findings table, and severity — and, when you choose Flow B, every pull request can be gated by the same review in CI. Since standard 2.3.0 the **local review is part of the baseline**: onboarding installs it and every Final Review runs it. Only the CI surface is opt-in.

What stays vendor-neutral is the boundary that matters: the reviewer is an MIT, tag-pinned skill run by your **own** coding agent — no Deep Work Plan flow requires a commercial service, CI provider, or secret. Flow A (local-only) is the baseline every onboarded repository gets; Flow B (the CI Action) is offered explicitly and never installed unrequested. A developer may decline the local reviewer; the decline is recorded as a declared exception and `verify` reports the repository as non-conformant on that point until it is installed.

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

`create` adds the local review step to every Final Review's security pass and `execute` runs it. Output appends under `## AI Diff Reviewer local review` in `analysis_results/SECURITY_REVIEW.md`.

- **Missing reviewer — recorded, never skipped silently:** a missing skill or extension becomes a `local reviewer not installed` finding; when the run may write to the harness (trust mode or explicit approval) the agent installs the missing piece and then reviews, otherwise the finding is carried into the completion report.
- **Soft-fail (invocation only):** a review that could start but errors → warn once, record, continue; never fail the task for that miss.
- **Gate after a completed pass:** `critical` findings still block Final Review completion until fixed or explicitly accepted. `warning` / `info` are documented but non-blocking.
- **Flow A needs no CI secret.** An unset `CURSOR_API_KEY` must not suppress the local pass.

### Flow B CI gate (optional)

Pinned Action `DailybotHQ/ai-diff-reviewer@v2`, typically label-gated (`ready`), with a stable-named **AI review gate** job for branch protection and opt-in `skip-review-label: skip-ai-review`. Shared `prompt.md` + extension align methodology and severity; under Iteration-Aware Review, CI round 2+ may be shorter while the local pass stays full.

### Optional `apply-review` companion

After CI posts a review, the developer may invoke `apply-review` during `execute` to walk findings per-finding (apply / defer / skip) with consent. Read-only by default; never a plan task file (would break mandatory final-task order).

## Behavior

- **Flow A is the baseline; Flow B is asked, never guessed.** Installing a workflow unrequested is a larger footprint than staying on Flow A.
- **Reconcile, don't clobber.** Existing skill, extension, or `pr-review.yml` are preserved; fill gaps only.
- **Auth deferred.** Provider secrets for CI are maintainer-configured; this addon never stores credentials.
- **Vendor-neutral.** No commercial service, CI provider, or secret is ever required; the CI surface is the only piece that touches a provider.

## Notes

Local review required since standard 2.3.0; CI surface optional. Upstream skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec page: [Add-ons](/spec/addons).
