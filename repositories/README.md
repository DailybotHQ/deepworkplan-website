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
| [herdr-peers](https://github.com/DailybotHQ/herdr-peers) | Addon: peer coordination between agents | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/herdr-peers/blob/main/AGENTS.md) |
| [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) | Addon: coding-agent installer and configuration | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/coding-agents-kit/blob/main/AGENTS.md) |
| [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) | Addon: development-container images and installer | Public | `bash tests/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/devcontainer-kit/blob/main/AGENTS.md) |
| [deepworkplan-vim](https://github.com/DailybotHQ/deepworkplan-vim) | Addon: DeepWorkPlan Vim (Neovim distribution with the plan reader) | Public | `bash tests/smoke/run.sh` | [AGENTS.md](https://github.com/DailybotHQ/deepworkplan-vim/blob/main/AGENTS.md) |
| [ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) | Addon: local and CI pull-request reviewer | Public | `python3 -m unittest discover -s tests` | [AGENTS.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/AGENTS.md) |
| [agent-skill](https://github.com/DailybotHQ/agent-skill) | Addon: the Dailybot agent skill (reporting) — **owned by the Dailybot hub too** | Public | `bats tests/` | [AGENTS.md](https://github.com/DailybotHQ/agent-skill/blob/main/AGENTS.md) |

Once cloned, each guide is also at `repositories/<name>/AGENTS.md`; read it
before working in that repository, because its own rules win inside it.

**agent-skill is shared.** Another hub also clones and edits it. Before any
change there, run `bash scripts/repositories.sh pull agent-skill` (it refuses a
dirty tree or a feature branch, so start from a clean `main`), work on a
branch, and push it before stopping: never leave unpushed work in this clone, so the two hubs
never double-edit.

## Adding a repository

Add an entry to [`manifest.json`](manifest.json) (name, HTTPS URL, default
branch, role, visibility, gate, summary), add its row above, and run
`bash tests/scripts/repositories.test.sh`. Only public repositories belong in
this hub.
