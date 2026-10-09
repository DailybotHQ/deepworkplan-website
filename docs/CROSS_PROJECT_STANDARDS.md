# Cross-project standards

Rules for work that spans this hub and the ecosystem repositories under
`repositories/`. Each repository's own `AGENTS.md` governs work inside it; these
rules govern how the hub and the repositories meet. Context:
[Ecosystem context](ECOSYSTEM_CONTEXT.md). Index:
[`repositories/README.md`](../repositories/README.md).

## Where work lands

```
Is the change to the site, its docs, its tooling, or hub coordination files?
├── Yes → commit here, at the hub root, on a hub branch.
└── No → it belongs to an ecosystem repository:
    ├── Is the repository cloned?  No → bash scripts/repositories.sh clone <name>
    ├── cd repositories/<name>, read its AGENTS.md
    ├── pull its default branch first (always for agent-skill, which is shared)
    └── branch, commit, gate, push and open the PR there, under its own rules.
Does the change span several repositories?
└── Yes → an orchestrator plan in this hub (below), one child plan per repository.
```

## Repository boundaries

- **Never commit code for another repository from the hub root.** The clones
  are git-ignored here, so a `git add` at the root cannot capture them; do not
  work around that (no `git add -f repositories/…`, no submodules, no copying a
  repository's files into this tree).
- Inside `repositories/<name>`, the hub's rules stop and that repository's
  `AGENTS.md`, gates, branch protection and review rules apply.
- The hub may *read* every clone (to verify claims, gather context or plan) and
  may write only its own tracked files.
- `repositories/README.md` and `repositories/manifest.json` are the only
  tracked files under `repositories/`. Adding a repository means updating both
  in one hub commit and running `bash tests/scripts/repositories.test.sh`.
- **agent-skill is shared with the Dailybot hub.** Pull before editing; push
  every branch before stopping; never leave unpushed commits or a dirty tree in
  that clone.

## Orchestrator plans

Cross-repository work is a parent Deep Work Plan in this hub
(`.dwp/plans/PLAN_{name}/`) that spawns child plans inside each affected
repository (`repositories/<name>/.dwp/plans/PLAN_{child}/`), per
`.agents/skills/deepworkplan/spec/DWP_SPECIFICATION.md` §8:

- The parent carries `ORCHESTRATOR_MANIFEST.md` (shared context, dependency
  graph, output contracts) and a child tracking table (repository, child plan,
  status).
- One `create_child_dwp` task per repository: enter the clone, read its
  `AGENTS.md`, allocate the child plan ID from **that** repository's plan
  directory, and use **that** repository's gate (see the table below).
- Children follow the specification independently and reference the parent's
  manifest; the parent ends with an integration checkpoint (versions, site
  claims, cross-links) after every child completes.
- Plan history is local and git-ignored in every repository: it moves with the
  clone, never through a commit. To carry it from an older checkout, copy that
  checkout's `.dwp/` into the new clone without overwriting tracked files.

## Gates

Run each gate from inside the repository it belongs to.

| Repository | Gate | Notes |
|------------|------|-------|
| deepworkplan-website (this hub) | `pnpm run astro:check`, `biome:check`, `test`, `build`, `md:check:strict`, `i18n:check`; `bash tests/scripts/repositories.test.sh`; `bash scripts/check-public-hygiene.sh` | Node gates run in the development container ([Development Commands](DEVELOPMENT_COMMANDS.md)) |
| deepworkplan-skill | `bats tests/` | bats-core |
| herdr-peers | `bash tests/run.sh` | scoped: `bash tests/run.sh <scope>` |
| coding-agents-kit | `bash tests/run.sh` | scoped: `bash tests/run.sh <scope>` |
| devcontainer-kit | `bash tests/run.sh` | the docker scope reports "unavailable" without a daemon |
| deepworkplan-vim | `bash tests/smoke/run.sh` | the full mapping-contract suite needs Podman or Docker |
| ai-diff-reviewer | `python3 -m unittest discover -s tests` | stdlib only |
| agent-skill | `bats tests/` | bats-core |

The gate column mirrors `repositories/manifest.json`; when a repository changes
its gate, update both. Every ecosystem repository also ships
`bash scripts/check-public-hygiene.sh`.

## Commits and pull requests

- **Conventional commits** everywhere: `type(scope): description`, in English.
- One branch and one pull request per repository per change; never push to a
  default branch directly, never force-push a shared branch, never merge with
  an admin override. The repository owner merges.
- **The `Ready` label triggers the AI Diff Reviewer.** Add it as soon as the
  pull request opens; the CI self-review runs once per application (remove and
  re-add the label to run it again). Wait for it to finish and resolve any
  critical finding before asking for a merge.
- A pull request that changes a version, install line or claim another
  repository depends on names the dependent change (and its pull request, once
  open) in its description, so the release order in
  [Ecosystem context](ECOSYSTEM_CONTEXT.md#release-order) holds.

## Public safety

Every ecosystem repository is public. No private repository, internal tool or
organisation name, personal path, private email or secret may enter a tracked
file in any of them, and the hub's manifest lists public repositories only.
Each repository's `scripts/check-public-hygiene.sh` enforces this in CI.
