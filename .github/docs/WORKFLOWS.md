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
| 2 | Setup GitHub Config | Git config |
| 3 | Release notes | Runs `scripts/get_github_release_log.sh` |
| 4 | Prepare release | `corepack pnpm install --frozen-lockfile && corepack pnpm run release` + push tags to main |
| 5 | Get release tag | Extract latest tag |
| 6 | Publish release | `ncipollo/release-action@v1` |

**Helper script:** `scripts/get_github_release_log.sh`
- Reads `git log --pretty=oneline`
- Stops at the previous release commit
- Skips merge commits
- Prefixes each entry with `🚩`
- Creates `git_logs_output.txt` as release body

### Job 3: `cleanup_caches` (depends on: Job 2)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Cloudflare Pages setup.

Dispatches a `cleanup_caches` event via GitHub API.

---

## 6. check_vendored_skills.yml — Detect Vendored-Skill Updates

| Property | Value |
|----------|-------|
| **Trigger** | Scheduled: **daily at 12:00 UTC** + `workflow_dispatch` |
| **Concurrency** | `check-vendored-skills`, `cancel-in-progress: false` |
| **Branch** | `feature__vendored_skills_refresh` (bot-owned; force-reset from main on every run that finds updates) |

Detects when either upstream agent-skill repo has cut a release newer than the copy vendored under `.agents/skills/`, and opens a PR that refreshes them:

- `DailybotHQ/deepworkplan-skill` → `.agents/skills/deepworkplan/`
- `DailybotHQ/agent-skill` → `.agents/skills/dailybot/`

When that PR merges, `release_and_publish.yml` (Section 5) fires normally — so **a new upstream skill release directly causes a new website release** that ships with the refreshed skills vendored inside. No manual step in between.

Companion workflow `check_and_merge_vendored_skills_pr.yml` (Section 7) auto-merges the PR once CI is green.

### Job: `check_vendored_skills`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` with `AUTOMATION_GITHUB_TOKEN`, `fetch-depth: 0` |
| — | Setup Node | 24.18.0 |
| 1 | Setup GitHub Config | Git config + `gh auth login` |
| 2 | Resolve upstream tags vs vendored versions | For each skill: `gh release view --repo <owner/repo> --json tagName -q .tagName` (unless a `workflow_dispatch` input pins it). Reads current vendored versions from `.agents/skills/*/SKILL.md`. Computes `updates_available`. |
| 3 | Reset feature branch from main | If `updates_available`: deletes the remote branch (if any) and re-branches from main so every run starts on a clean base |
| 4a | Install deepworkplan at resolved tag | `npx --yes skills add DailybotHQ/deepworkplan-skill@<tag> --skill deepworkplan --force -y` + version-match invariant assertion |
| 4b | Install dailybot at resolved tag | Same pattern for `DailybotHQ/agent-skill@<tag>` |
| 5 | Stage vendored files and check for actual changes | Stages `.agents/skills/{deepworkplan,dailybot}/` and `skills-lock.json`; short-circuits if `git diff --cached --quiet` (pinned to current) |
| 6 | Commit and push feature branch | Commits `chore: refresh vendored skills to (deepworkplan vX.Y.Z, dailybot vA.B.C)` and force-with-lease pushes to `feature__vendored_skills_refresh` |
| 7 | Open (or update) the pull request | `gh pr create` (or `gh pr edit` if a PR from that branch is already open) with a diff-style body listing the from/to versions and release-notes links |

### Manual override

Run from the Actions tab (`workflow_dispatch`) with optional inputs to pin either skill to a specific tag:

- `deepworkplan_tag` — e.g. `v2.16.3` (blank = latest release)
- `dailybot_tag` — e.g. `v3.10.3` (blank = latest release)

Useful for previewing a pre-release, or intentionally rolling back to an older tag.

### Failure modes

| Failure | Behavior |
|---------|----------|
| Both skills already at latest | Job exits 0 with a summary; no branch, no commit, no PR |
| Upstream repo has no releases / API blip | Warning in job summary; that skill is skipped, the other continues |
| `npx skills add` fails | **Fails the job** — treated as real breakage (the whole point of the smoke test) |
| Vendored `SKILL.md` version does not match the requested tag | **Fails the job** — refuses to open a PR whose title misrepresents its contents |
| No diff after install (rare pin-to-current case) | Skips commit + PR; exits 0 |

**Secrets:** `AUTOMATION_GITHUB_TOKEN`

---

## 7. check_and_merge_vendored_skills_pr.yml — Auto-Merge Vendored-Skill Refresh PR

| Property | Value |
|----------|-------|
| **Trigger** | Scheduled: **daily at 17:00 UTC** + `workflow_dispatch` |
| **Timing** | Runs 5 hours after the check workflow to allow CI (`code_check.yml`, `pull_request_check.yml`) to complete |
| **Concurrency** | `check-and-merge-vendored-skills`, `cancel-in-progress: false` |

Mirrors the pattern of `check_and_merge_packages_upgrades_pr.yml` (Section 4) but targeting the vendored-skills refresh PR.

### Job: `check_and_merge_vendored_skills_pr`

| Step | Name | What it does |
|------|------|-------------|
| — | Checkout | `actions/checkout@v4` with `AUTOMATION_GITHUB_TOKEN` |
| — | Setup Node | 24.18.0 |
| 1 | Setup GitHub Config | Git config + `gh auth login` |
| 2 | Locate PR | `gh pr list -B main -s open -H feature__vendored_skills_refresh` — exits 0 if no PR |
| 3 | Read PR title/body | For the run summary only |
| 4 | Check mergeable state and merge if clean | `gh api repos/:owner/:repo/pulls/:n` → if `mergeable_state == "clean"`, `gh pr merge <n> --merge`. Otherwise leaves PR open. |

**Key behavior:** Only merges when GitHub reports `mergeable_state == "clean"` (all required checks passed AND no conflicts AND branch up to date with base). Any other state (`blocked`, `unstable`, `dirty`, `unknown`, ...) leaves the PR open for a human to review. The workflow never force-merges.

**Merge triggers a release:** Because `release_and_publish.yml` runs on `pull_request: closed && merged == true`, the merge here directly cuts a new website release (bumps `package.json`, tags `vX.Y.Z`, publishes a GitHub Release). This is intentional — a new upstream skill release IS the reason for a new website release.

**Opting out of an individual auto-merge:** Close the PR (or push additional commits so it goes non-clean) before 17:00 UTC. The next day's check run will re-open it with the same target tags if they haven't advanced.

**Secrets:** `AUTOMATION_GITHUB_TOKEN`

---

## Workflow Dependencies

```
                       ┌──────────────────────────────┐
                       │      Upstream skill release  │
                       │  (deepworkplan / agent-skill)│
                       └──────────────┬───────────────┘
                                      │
       12:00 UTC daily ▶ check_vendored_skills.yml (or manual)
                                      │
                              opens/updates PR
                                      │
                                      ▼
                     code_check + pull_request_check (on PR)
                                      │
       17:00 UTC daily ▶ check_and_merge_vendored_skills_pr.yml
                                      │
                              gh pr merge --merge  (if clean)
                                      │
                                      ▼
                       release_and_publish.yml (Section 5)
                                      │
                                      ▼
     check_pr_size_label ──▶ release_and_publish ──▶ cleanup_caches
                                      │
                                      ▼
                       Cloudflare Pages deploy (on push to main)
```

**Note:** Cloudflare Pages deploys independently on push to `main` (configured in Cloudflare dashboard).

---

## External Actions

| Action | Version | Used In |
|--------|---------|---------|
| `actions/checkout@v4` | v4 | All workflows |
| `actions/setup-node@v4` | v4 | All workflows |
| `actions/cache@v4` | v4 | code_check, release_and_publish |
| `ncipollo/release-action@v1` | v1 | release_and_publish (job 3) |
