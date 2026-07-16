---
title: AI Diff Reviewer
description: "Opt-in DWP addon: augment Security Review with a local AI Diff Reviewer pass, optional Flow B CI merge gate (v2), shared extension file, and apply-review companion."
kind: addon
lang: en
order: 5
---

# AI Diff Reviewer addon

Connect Deep Work Plan execution to the **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace listing **"AI Diff Reviewer"**, current **v2.0.0**) so the mandatory **Security Review** final task gains a structured local review — verdict, findings table, and severity — and, when you choose Flow B, every pull request can be gated by the same review in CI. An **opt-in** addon; never required for AI-first conformance.

The core Deep Work Plan methodology has **zero** AI Diff Reviewer dependency. A repository with zero addons is fully conformant. Offer this addon only when the developer or team wants structured review quality; never auto-install for everyone. Always ask Flow A vs Flow B — never default.

## When to use it

| Signal | Action |
|--------|--------|
| Team wants a CI PR merge gate with structured findings | **Recommend Flow B** during onboarding |
| Personal or experimental repo; local pre-push review is enough | **Offer Flow A** |
| No appetite for an extra review surface | **Skip** — baseline Security Review still applies |

## Two adoption flows

| Flow | What you get |
|------|----------------|
| **A — local-only** | Vendored skill + required `.review/extension.md` (via `generate-extension`). Augments Security Review with a local pass. No GitHub Actions workflow. |
| **B — dual-surface** | Flow A plus `setup` writes `.github/workflows/pr-review.yml` (Action `@v2`), same extension file for local and CI. Optional `apply-review` companion after CI posts findings. |

Detection for the Security Review augmentation requires **skill + an extension file** at one of: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, or `.github/ai-pr-reviewer/extension.md`. Skill alone is not enough.

## What this addon wires (narrow by design)

The DWP addon does **not** reinvent the reviewer. It defers install, methodology, the CI wizard, extension authoring, PR drafting, and post-CI walkthrough to the upstream skill's five sub-skills (parent default flow, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Security Review augmentation

When detected, `create` / `execute` add a local review step to the mandatory Security Review task. Output appends under `## AI Diff Reviewer local review` in `analysis_results/SECURITY_REVIEW.md`.

- **Soft-fail (invocation only):** missing skill, missing extension, or invocation error → warn once and continue; never fail the task for that miss.
- **Gate after a completed pass:** `critical` findings still block Security Review completion until fixed or explicitly accepted (existing SR contract). `warning` / `info` are documented but non-blocking.
- **Flow A needs no CI secret.** An unset `CURSOR_API_KEY` must not suppress the local pass.

### Flow B CI gate (optional)

Pinned Action `DailybotHQ/ai-diff-reviewer@v2`, typically label-gated (`ready`), with a stable-named **AI review gate** job for branch protection and opt-in `skip-review-label: skip-ai-review`. Shared `prompt.md` + extension align methodology and severity; under Iteration-Aware Review, CI round 2+ may be shorter while the local pass stays full.

### Optional `apply-review` companion

After CI posts a review, the developer may invoke `apply-review` during `execute` to walk findings per-finding (apply / defer / skip) with consent. Read-only by default; never a plan task file (would break mandatory final-task order).

## Behavior

- **Ask the flow; never guess.** Installing a workflow unrequested is a larger footprint than staying on Flow A.
- **Reconcile, don't clobber.** Existing skill, extension, or `pr-review.yml` are preserved; fill gaps only.
- **Auth deferred.** Provider secrets for CI are maintainer-configured; this addon never stores credentials.
- **Vendor-neutral.** Declining leaves a fully AI-first repo.

## Notes

Opt-in and never required. Upstream skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec page: [Add-ons](/spec/addons).
