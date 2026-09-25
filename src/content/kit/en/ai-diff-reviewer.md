---
title: AI Diff Reviewer
description: "Verified-criticals local review in every DWP Final Review since standard 2.3.0; the grok CI gate and the address-review loop stay optional."
kind: addon
lang: en
order: 5
---

# AI Diff Reviewer addon

Every Deep Work Plan closes the same way: a mandatory **Final Review** that reads the plan's entire accumulated change set before the work can be called done. Its security pass is the last point at which anything gets caught. Without help, the only reader at that point is the same agent that wrote the code.

This addon puts a second reader on that diff. It wires the **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — listed on the marketplace as "AI Diff Reviewer", current release **v3.1.1** — into the security pass, where it returns something structured rather than prose: a verdict, a findings table, and a severity on each finding. Since v3, a `critical` finding means the addon's verifier confirmed it with a second, code-grounded model call; only verified criticals block completion until fixed or explicitly accepted. The review is a gate, not a comment.

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
| **B — dual-surface** | Flow A plus `setup` writes the review workflow (Action `@v3`), same extension file for local and CI. Optional `apply-review` and `address-review` companions after CI posts findings. |

Detection for the local review requires **skill + an extension file** at one of: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md`, or `.github/ai-pr-reviewer/extension.md`. Skill alone is not enough.

## What this addon wires (narrow by design)

The DWP addon does **not** reinvent the reviewer. It defers install, methodology, the CI wizard, extension authoring, PR drafting, and post-CI review loops to the upstream skill's six sub-skills (parent default flow, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### The required local review

`create` adds the local review step to every Final Review's security pass and `execute` runs it. Output appends under `## AI Diff Reviewer local review` in the plan-local `analysis_results/SECURITY_REVIEW.md` (inside the plan's own folder, never the repository root).

- **Missing reviewer — recorded, never skipped silently:** a missing skill or extension becomes a `local reviewer not installed` finding; Final Review runs the local pass when the skill is present and otherwise carries the finding into the completion report — installation belongs to the onboarding consent or an explicit addon invocation, never a surprise bootstrap.
- **Soft-fail (invocation only):** a review that could start but errors → warn once, record, continue; never fail the task for that miss.
- **Gate after a completed pass:** **verified** `critical` findings block Final Review completion until fixed or explicitly accepted (BC-07). Unverified critical claims arrive as annotated warnings — visible, non-blocking unless `strict-unverified-criticals: true` restores claim-based gating. A review that hit its turn cap (`incomplete`) or its wall clock (`timeout`) is not a clean pass under blocking strictness (BC-04). `warning` / `info` are documented but non-blocking.
- **Flow A needs no CI secret.** An unset provider key must not suppress the local pass.

### Flow B CI gate (optional)

Action `DailybotHQ/ai-diff-reviewer@v3`, typically label-gated (`ready`), with a stable-named **AI review gate** job for branch protection and opt-in `skip-review-label: skip-ai-review`. Since v3 the review budget follows the change's deterministic risk tier — 8/20/30/40 turns from `low` to `critical` under `budget-profile: auto` (`fixed` restores the pre-v3 constants during the transition) — and a push that changes no code runs a verifier-only round. Shared `prompt.md` + extension align methodology and severity; local and CI stay methodology-identical, while CI round 2+ may be shorter under Iteration-Aware Review and the local pass stays full.

### Optional review companions

Two developer-invoked sub-skills close the loop after CI posts a review; neither is ever a plan task file (that would break mandatory final-task order).

- `apply-review` walks findings per-finding (apply / defer / skip) with consent. Read-only by default; never commits or pushes.
- `address-review` (new in v3.1.1) is the one-invocation loop: find the branch's open PRs, check the review is fresh for the current head, present the findings with an apply/defer/skip plan, then — on one yes — apply, commit in small Conventional Commits batches, push, and re-arm the reviewer the way the repo triggers it (label-gated → toggle the label off/on; push-triggered → confirm the new run). Unlike `apply-review`, it commits and pushes; that is the loop's point. On aggregated ensemble reviews it reads the aggregate document and the `ai-pr-reviewer-aggregate` marker.
- The machine path is the structured output, not the review body: the `review-output/3.0` document (`.aiprr/review-output.json`, located through the `structured-output-path` and `structured-output-sha256` outputs) carries the run record, findings with evidence and verification, refuted findings, and the gate. A review body that says `Recommendation: approve` is not evidence the check passed — read the tracking marker's Highest severity / Strictness gate / Check status block first.

## What changed in v3

Three releases landed on 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) and v3.1.1 followed with the `address-review` sub-skill. None of them changes how this addon wires the reviewer — Flow A, the three detection paths and the never-block ladder are unchanged — but they change what an adopter gets.

| Change | What it means for a DWP repository |
|--------|------------------------------------|
| **A `critical` publishes only when verified** (v3.0.0) | Every claimed critical — plus a 30 % sample of warnings — gets a second, short, code-grounded check by a separate model call (≈ 3 k tokens, 10 s and $0.009 per verified finding). Verified criticals gate the security pass; refuted claims stay visible as annotated warnings and are listed in the structured output, never posted inline. |
| **Budgets follow the risk tier** (v3.0.0) | 8/20/30/40 turns from `low` to `critical`, derived from the change inventory (`budget-profile: auto`). A push that changes no code runs a verifier-only round at −93 % cost. `budget-profile: fixed` restores the pre-v3 30-turn constants. |
| **An unfinished review is red** (v3.0.0) | `incomplete` (turn cap) and `timeout` (wall clock) post partial findings and fail blocking strictness — "no findings" now always means the reviewer looked and found nothing. |
| **The structured output is the machine path** (v3.0.0) | The `review-output/3.0` document carries the run record, the change inventory, findings with typed evidence and verification, refuted findings, and the gate. Read the document instead of scraping review bodies. |
| **Six sub-skills** (v3.1.1) | `address-review` joins the router: one invocation applies, commits, pushes, and re-arms the reviewer. |
| **Optional ensemble** (v3.0.0) | `mode: emit` read-only legs plus one `aggregate` job verify the consolidated findings once and publish a single review. |
| **`@v2` keeps working** | The v2 line is frozen on `release/v2` with six months of security and catalog maintenance. v3 is the recommendation, never a forced migration. |

Two of these matter more than the rest for the methodology.

**The verified-criticals gate hardens the security pass.** Before v3, a model could claim a `critical` freely and the gate followed the claim. Now a critical finding in a Final Review means a second model call confirmed it against the code, and the release campaign measured the difference: 771 paid evaluation runs across ten campaigns at roughly $83 total, with the critical tier reaching 63/63 recall at adjudicated precision 1.0, and incremental rounds cutting input tokens by 62–76 %. These figures are upstream's published measurements, not Deep Work Plan's own.

**`economy` is deliberately not cheaper.** The upstream benchmark of 2026-09-16 measured `grok-4.3` at 0 of 5 known defects — it approves without reviewing — while `grok-4.5` matched `grok-4.6` at 3 of 5 with no false positives, at the same cost and a quarter of the wall time. Since no cheaper xAI model still reviews, `economy` resolves to the same model as `balanced` rather than being a tier that finds nothing; on the grok runner, the risk tier's turn budget, not the model choice, is what scales cost. The xAI path therefore moves from roughly $0.07 to roughly $0.40–0.75 per review through the CLI; `model: grok-4.3` can still be pinned explicitly to keep the earlier behaviour. These figures are upstream's published measurements, not Deep Work Plan's own.

## Behavior

- **Flow A is the baseline; Flow B is asked, never guessed.** Installing a workflow unrequested is a larger footprint than staying on Flow A.
- **Reconcile, don't clobber.** Existing skill, extension, or review workflow are preserved; fill gaps only.
- **Auth deferred.** Provider secrets for CI are maintainer-configured; this addon never stores credentials.
- **Vendor-neutral.** No commercial service, CI provider, or secret is ever required; the CI surface is the only piece that touches a provider.

## Notes

Local review required since standard 2.3.0; CI surface optional. Upstream skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Upstream migration guide: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Spec page: [Add-ons](/spec/addons).
