# Ecosystem repositories

This directory holds local clones of the public DeepWorkPlan ecosystem
repositories. This repository (`deepworkplan-website`) is the **ecosystem hub**:
it coordinates work across them and publishes the site, but it never commits
their code. Everything in this directory is git-ignored except this index and
[`manifest.json`](manifest.json), which drives the sync script.

```bash
bash scripts/repositories.sh ls       # what the manifest lists
bash scripts/repositories.sh clone    # clone what is missing (HTTPS)
bash scripts/repositories.sh status   # branch, clean/dirty, ahead/behind
bash scripts/repositories.sh pull     # fast-forward clean default-branch checkouts only
```

The script never deletes, never touches a dirty tree or a checkout on a feature
branch, and never rewrites a remote. See
[Cross-project standards](../docs/CROSS_PROJECT_STANDARDS.md) for how work
lands in each repository, and [Ecosystem context](../docs/ECOSYSTEM_CONTEXT.md)
for how the repositories relate.

## Repositories

| Repository | Role | Visibility | Gate (run inside the clone) | Agent guide |
|------------|------|------------|-----------------------------|-------------|
| [deepworkplan-skill](https://github.com/DailybotHQ/deepworkplan-skill) | Pack: the methodology, specification and kit as an installable agent skill | Public | `bats tests/` | [AGENTS.md](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/AGENTS.md) |
| [herdr-peers](https://github.com/DailybotHQ/herdr-peers) | Addon (herdr): ask an agent in another Herdr pane, on any machine, and get one authorized reply | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/herdr-peers/blob/main/AGENTS.md) |
| [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) | Addon (agentkit): one `ak` command for every coding agent — accounts, quota, `ak pick`, headless runs | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/coding-agents-kit/blob/main/AGENTS.md) |
| [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) | Addon (devcontainer): a reproducible dev container per repository, wired to Herdr and the host's accounts | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/devcontainer-kit/blob/main/AGENTS.md) |
| [deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim) | Addon (vim): DeepWorkPlan Vim, the terminal editor for plans — plan browser, lanes view, Markdown viewer | Public | `bash tests/smoke/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/deepworkplan-vim/blob/main/AGENTS.md) |
| [ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) | Required local review: the local and CI pull-request reviewer; every Final Review runs it | Public | `python3 -m unittest discover -s tests` | [AGENTS.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/AGENTS.md) |
| [agent-skill](https://github.com/DailybotHQ/agent-skill) | Addon: the Dailybot agent skill (reporting) — **owned by the Dailybot hub too** | Public | `bats tests/` | [AGENTS.md](https://github.com/DailybotHQ/agent-skill/blob/main/AGENTS.md) |
| [cli](https://github.com/DailybotHQ/cli) | Consumer: the Dailybot CLI, the reference production repository that dogfoods the full stack — **owned by the Dailybot hub too**; every merge to `main` auto-releases | Public | `ruff check . && mypy dailybot_cli && pytest` | [AGENTS.md](https://github.com/DailybotHQ/cli/blob/main/AGENTS.md) |

Once cloned, each guide is also at `repositories/<name>/AGENTS.md`; read it
before working in that repository, because its own rules win inside it.

**agent-skill is shared.** Another hub also clones and edits it. Before any
change there, run `bash scripts/repositories.sh pull agent-skill` (it refuses a
dirty tree or a feature branch, so start from a clean `main`), work on a
branch, and push it before stopping: never leave unpushed work in this clone, so the two hubs
never double-edit.

## Adding a repository

Add an entry to [`manifest.json`](manifest.json) (name, HTTPS URL, default
branch, role, visibility, gate, summary) and its row above, then update the
tables that repeat it: the gates table in `AGENTS.md` (Ecosystem Hub section),
the gates table in [`docs/CROSS_PROJECT_STANDARDS.md`](../docs/CROSS_PROJECT_STANDARDS.md)
and the posture table in [`docs/ECOSYSTEM_CONTEXT.md`](../docs/ECOSYSTEM_CONTEXT.md).
Run `bash tests/scripts/repositories.test.sh`. Only public repositories belong in
this hub.
