# Workflows Reference

Complete reference for all GitHub Actions workflows in this repository.

**Stack:** Node.js 24.18.0, pnpm (via Corepack), ubuntu-latest runners, Astro static site.

---

## 1. code_check.yml — Code Quality Validation

| Property | Value |
|----------|-------|
| **Trigger** | `pull_request` to `main` (opened, synchronize, reopened) |
| **Concurrency** | Per-workflow + PR number, cancel in-progress |

### Job: `code_check`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` |
| — | Setup Node | `actions/setup-node@v4` (24.18.0) |
| 0 | Get pnpm store path | Resolves `corepack pnpm store path` |
| 0a | Cache pnpm store | `actions/cache@v4` — caches the pnpm content-addressable store, keyed on `pnpm-lock.yaml` |
| 1 | Install Dependencies | `corepack pnpm install --frozen-lockfile` |
| 2 | Astro checks | `corepack pnpm run astro:check` — TypeScript validation |
| 3 | Biome checks | `corepack pnpm run biome:check` — linting & formatting |
| 4 | Tests | `corepack pnpm run test` |
| 5 | Build | `corepack pnpm run build` (includes prebuild → images:webp) |

**Secrets:** None (uses default `GITHUB_TOKEN`).

**Notes:**
- pnpm resolves platform-specific native bindings (`@rollup/rollup-linux-x64-gnu`, `@esbuild/linux-x64`, etc.) through `optionalDependencies` in the lockfile — no `--no-save` workaround needed.

---

## 2. pull_request_check.yml — PR Content and Size Validation

| Property | Value |
|----------|-------|
| **Trigger** | `pull_request` to `main` (opened, reopened, synchronize, edited) |
| **Concurrency** | Per-workflow + PR number, cancel in-progress |
| **Condition** | Only runs when PR is NOT merged |

### Job: `pull_request_content_and_size_check`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` with `AUTOMATION_GITHUB_TOKEN`, fetch-depth: 2 |
| 1 | Setup GitHub Config | Git config + `gh auth login` |
| 2 | Check PR size label | Reads existing size label from PR |
| 3 | Calculate PR Size | `git diff --shortstat` → apply size label |
| 4 | Check title length | Minimum 5 characters |
| 5 | Check body length | Minimum 10 characters |

**Size Labels:**

| Lines Changed | Label |
|---------------|-------|
| ≤ 50 | Size - XS |
| ≤ 100 | Size - S |
| ≤ 500 | Size - M |
| ≤ 800 | Size - L |
| ≤ 1500 | Size - XL |
| > 1500 | Size - XXL |

For L/XL/XXL PRs, a warning comment is automatically posted.

**Secrets:** `AUTOMATION_GITHUB_TOKEN`

---

## 3. check_packages_versions.yml — Package Update Detection

| Property | Value |
|----------|-------|
| **Trigger** | Scheduled: Tuesdays 15:00 UTC + `workflow_dispatch` |
| **Branch** | `feature__packages_versions_update` |

### Job: `check_packages_versions`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` with `AUTOMATION_GITHUB_TOKEN` |
| — | Setup Node | 24.18.0 with npm registry |
| 1 | Setup GitHub Config | Commits as "Dailybot" |
| 2 | Check/create branch | Creates `feature__packages_versions_update` if it doesn't exist |
| 3 | Install Dependencies | `corepack pnpm install --frozen-lockfile` |
| 4 | Check Packages | Runs `scripts/get_packages_upgrades.sh` |
| 5 | Check Git Status | Checks if `packages_upgrades_output.txt` was created |
| 6 | Reinstall | `corepack pnpm install --no-frozen-lockfile` with upgraded versions |
| 7 | Commit and push | Commits changes to upgrade branch |
| 8 | Create PR | `gh pr create` to `main` |

**Secrets:** `AUTOMATION_GITHUB_TOKEN`

**Helper script:** `scripts/get_packages_upgrades.sh`
- Runs `corepack pnpm run ncu:upgrade`
- Extracts lines with `→` (upgrade arrows)
- Creates `packages_upgrades_output.txt` as PR body

---

## 4. check_and_merge_packages_upgrades_pr.yml — Auto-Merge Package Updates

| Property | Value |
|----------|-------|
| **Trigger** | Scheduled: Tuesdays 20:00 UTC + `workflow_dispatch` |
| **Timing** | Runs 5 hours after package detection to allow CI checks |

### Job: `check_packages_versions_upgrades_pr`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` with `AUTOMATION_GITHUB_TOKEN` |
| — | Setup Node | 24.18.0 |
| 1 | Setup GitHub Config | Git config + `gh auth login` |
| 2 | Find PR | Search for open PR from `feature__packages_versions_update` |
| — | Get PR body | Retrieve PR metadata |
| 3 | Check mergeable state | `gh api` → if `clean`, auto-merge with `gh pr merge` |

**Secrets:** `AUTOMATION_GITHUB_TOKEN`

**Key behavior:** Only merges if PR mergeable state is `clean` (all CI checks passed, no conflicts). If not clean, the PR remains open for manual review.

---

## 5. release_and_publish.yml — Version Bump and GitHub Release

| Property | Value |
|----------|-------|
| **Trigger** | `pull_request` to `main`, type: `closed` (only when merged) |
| **Concurrency** | Per-workflow + PR number, cancel in-progress |

**Deployment:** Cloudflare Pages deploys automatically on push to `main`. This workflow does **not** deploy. It has **3 chained jobs**:

### Job 1: `check_pr_size_label`

Extracts the PR's size label and maps to emoji for the workflow summary.

### Job 2: `release_and_publish` (depends on: Job 1)

| Step | Name | What it does |
|------|------|-------------|
| 0-0a | Cache | pnpm store, keyed on `pnpm-lock.yaml` |
| 1 | Setup GitHub Config | Git config |
| 1a | **Dogfood — refresh addon skills** | Resolves the latest tag of `DailybotHQ/agent-skill` and `DailybotHQ/ai-diff-reviewer` via `gh release view`, and if either is newer than the vendored copy under `.agents/skills/`, runs `npx --yes skills add <repo>@<tag> --skill <name> --force -y`, asserts the version invariant, and commits `chore: dogfood vendored skills to (…)`. **Does not touch `deepworkplan`** (repo-adapted). **Runs before Step 2** so the dogfood commit lands in the release notes. See "Dogfood step" below for details. |
| 2 | Release notes | Runs `scripts/get_github_release_log.sh` — includes the dogfood commit from Step 1a if it exists |
| 3 | Prepare release | `corepack pnpm install --frozen-lockfile && corepack pnpm run release` + push tags to main (pushes the dogfood commit alongside the version-bump commit + tag in one atomic push) |
| 4 | Get release tag | Extract latest tag |
| 5 | Publish release | `ncipollo/release-action@v1` |

**Helper script:** `scripts/get_github_release_log.sh`
- Reads `git log --pretty=oneline`
- Stops at the previous release commit
- Skips merge commits
- Prefixes each entry with `🚩`
- Creates `git_logs_output.txt` as release body

#### Dogfood step (Step 1a)

**Purpose.** Every website release should ship with a current snapshot of the **addon** skills (`dailybot`, `ai-diff-reviewer`). Rather than a scheduled/autonomous refresh, the update happens **exactly when the maintainer decides to cut a release** — no background cron.

**Intentional exclusion — `deepworkplan`.** The DWP skill under `.agents/skills/deepworkplan/` is **repo-adapted** and is **not** auto-refreshed. A blind `skills add --force` would overwrite local adaptation. Update it only via an explicit, reviewed change that re-adapts it to this repository (see AGENTS.md → Vendored agent skills).

**What runs.**

1. `gh release view --repo <owner/repo> --json tagName -q .tagName` for `DailybotHQ/agent-skill` and `DailybotHQ/ai-diff-reviewer` to resolve the latest tag.
2. Reads the currently vendored versions from `.agents/skills/{dailybot,ai-diff-reviewer}/SKILL.md` frontmatter (and reports the pinned `deepworkplan` version in the step summary for visibility only).
3. Per-skill "moved" flag → only installs the addon skills that actually changed. Commit subjects list only the moved skills.
4. `npx --yes skills add <repo>@<tag> --skill <name> --force -y` — exact same command any downstream consumer would run. Serves as a live smoke test that the upstream release is installable. Both `--yes` AND `-y` are required — the former covers npm's own proceed prompt, the latter covers the `skills` CLI's agent-picker prompt; dropping either hangs the workflow in a non-TTY runner.
5. Version invariant: the installed `SKILL.md` frontmatter `version:` MUST equal the requested tag. Fails the release if not — refuses to publish a website tag that misrepresents its vendored skills.
6. If any files changed, commits `chore: dogfood vendored skills to <list>` locally. Step 3's `git push --follow-tags` sends this commit alongside the version-bump commit and the tag in a single atomic push. Staging paths are limited to `.agents/skills/dailybot`, `.agents/skills/ai-diff-reviewer`, and `skills-lock.json`.

**Failure semantics.**

| Failure | Behavior |
|---------|----------|
| `gh release view` fails for one upstream repo (rate limit, transient outage) | Warns; skips that skill. The other auto-refreshed skill (and the release) proceed. |
| `npx skills add` fails | **Fails the release** — real upstream breakage, must be surfaced. |
| Version invariant mismatch after install | **Fails the release** — refuses to commit a misrepresented dogfood snapshot. |
| Both auto-refreshed addon skills already at latest | Clean no-op — no dogfood commit, release proceeds. |

**Manual refresh outside of a release.** For addons: do it locally (`npx skills add <repo>@<tag>`) on a PR branch and merge as a normal `chore:` change — that will trigger a release naturally. For `deepworkplan`: never rely on release dogfood; re-adapt deliberately on a reviewed PR.

### Job 3: `cleanup_caches` (depends on: Job 2)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Cloudflare Pages setup.

Dispatches a `cleanup_caches` event via GitHub API.

---

## 6. pr-review.yml — AI Code Review on Pull Requests

| Property | Value |
|----------|-------|
| **Trigger** | `pull_request` to `main`, types: `opened, labeled` (NOT `synchronize`) |
| **Concurrency** | `pr-review-${{ pull_request.number }}`, cancel in-progress |
| **Permissions** | `contents: read`, `pull-requests: write` at workflow level |
| **Powered by** | [`DailybotHQ/ai-diff-reviewer`](https://github.com/marketplace/actions/ai-diff-reviewer) (marketplace listing: "AI Diff Reviewer") |

### Jobs

| Job | Depends on | Purpose |
|-----|------------|---------|
| `scope` | — | Three-tier gate: (1) `author-association ∈ {OWNER, MEMBER, COLLABORATOR}` (cheapest, payload-based, not spoofable); (2) `ready` label present on the PR (case-insensitive); (3) `CURSOR_API_KEY` secret configured. Emits `should_run` + `empty_reason` outputs consumed by downstream jobs. |
| `labels-bootstrap` | `scope` | Idempotent `gh label create` for `ready` (color `0e8a16`), `pr-reviewed` (color `0366d6`), and `skip-ai-review` (color `b60205` — emergency bypass). Only runs when `should_run == 'true'`. |
| `review` | `scope, labels-bootstrap` | Checks out with `fetch-depth: 0` and `persist-credentials: false` (Cursor CLI has broad local access — a persisted token on disk is an exfil surface). Invokes `DailybotHQ/ai-diff-reviewer@v2` with `provider: cursor`, `model: auto`, `label-gate: ready`, `author-association: OWNER,MEMBER,COLLABORATOR`, `applied-label: pr-reviewed`, `skip-review-label: skip-ai-review`, `strictness: block-on-critical`, `prompt-extension-file: .review/extension.md`, `max-inline-comments: 15`. Applying `skip-ai-review` while `ready` is present re-runs the job and short-circuits the LLM. |
| `gate` | `scope, review` | Stable-named `'AI review gate'`. This is the ONLY job to mark as required in branch protection. |

### Gate semantics

The `gate` job runs `if: always() && needs.scope.outputs.empty_reason != 'no-ready-label' && needs.scope.outputs.empty_reason != 'author-association'`, which produces four possible outcomes:

| `empty_reason` | `review.result` | `gate` outcome | Branch-protection effect |
|----------------|-----------------|----------------|--------------------------|
| `no-ready-label` | (skipped) | Skipped | Required check counts as passing — PRs without `ready` are mergeable |
| `author-association` | (skipped) | Skipped | Same — external-contributor forks never trigger a review |
| `no-provider-secret` | (skipped) | **Failed** | Fails with an actionable message; unblock by setting `CURSOR_API_KEY` |
| `` (empty) | `success` | **Passed** | Gate green |
| `` (empty) | `failure` / `cancelled` | **Failed** | Reviewer signaled a blocking finding OR the review job errored |

### Failure modes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Gate fails with "CURSOR_API_KEY is not configured" | Missing secret | Add it in Settings > Secrets and variables > Actions |
| Gate fails with "AI review did not pass" | `critical` finding in the review | Address findings, toggle `ready` label off + on to re-run |
| No review appears; gate is skipped | PR missing `ready` label OR author is external contributor | Apply `ready` (if maintainer); external forks are intentionally not reviewed |
| Review posts findings but gate passes | Findings are `warning` / `info` only | Working as designed — non-blocking findings are reported for context, not gated |

### Trigger discipline

- `pull_request` only, `types: [opened, labeled]` — NOT `synchronize`. Pushes to the PR do **not** re-review; toggle the `ready` label off and on to force a re-run.
- Concurrency keyed on PR number with `cancel-in-progress: true`, so a rapid label-toggle sequence resolves to the latest state.

### Shared with the local `ai-diff-reviewer` skill

The vendored skill at `.agents/skills/ai-diff-reviewer/` reads the SAME `.review/extension.md` this workflow reads via `prompt-extension-file:`. The upstream skill's `prompt.md` is byte-identical to the CI Action's `prompts/default.md` at the same tag (enforced by upstream CI's "Skills — prompt-sync invariant" job). Consequence: a local pre-push review shares the same methodology and severity model; under v2 Iteration-Aware Review, CI round 2+ may be shorter while the local pass stays full.

**Post-CI walkthrough.** After this workflow posts its review, developers can invoke the vendored skill's `apply-review` sub-skill locally to walk through CI findings per-finding (apply / defer / skip) with explicit consent. Read-only by default; edits require per-finding yes; never commits or pushes.

---

## Workflow Dependencies

```
check_pr_size_label       pr-review (scope → labels-bootstrap → review → gate)
         │                       │
         ▼                       ▼
  release_and_publish       (independent, PR-scoped)
         │
         ▼
  cleanup_caches
```

**Note:** Cloudflare Pages deploys independently on push to `main` (configured in Cloudflare dashboard). `pr-review.yml` is scoped to pull requests and runs independently of the release pipeline.

---

## External Actions

| Action | Version | Used In |
|--------|---------|---------|
| `actions/checkout@v4` | v4 | All workflows |
| `actions/setup-node@v4` | v4 | All workflows |
| `actions/cache@v4` | v4 | code_check, release_and_publish |
| `ncipollo/release-action@v1` | v1 | release_and_publish (job 3) |
| `DailybotHQ/ai-diff-reviewer@v2` | v2 | pr-review (review job) |
