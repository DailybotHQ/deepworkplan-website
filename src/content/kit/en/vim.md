---
title: DeepWorkPlan Vim
description: "Opt-in DWP addon: DeepWorkPlan Vim, the terminal editor for Deep Work Plan — a generated command index, DWP plan browsing, and Markdown reading in Neovim."
kind: addon
lang: en
order: 6
---

# DeepWorkPlan Vim addon

**DeepWorkPlan Vim** is the terminal editor for Deep Work Plan: a Neovim configuration (this is the editor itself, not a repository file) that puts the methodology's working surfaces one keystroke away. Where the other kit entries install harness into a repository, this addon equips the human — and any agent driving Neovim headlessly — with an editor that speaks DWP natively.

It requires **Neovim 0.12 or newer**, runs on **macOS and Linux** (Windows is supported through a documented manual path), and is **GPL-3.0 licensed** — free to use, study, and modify.

## What it adds

| # | Feature | What it does | Mapping |
|---|---------|--------------|---------|
| F1 | **Generated command index** | The whole editor, listed: every command with its mapping and a one-line description, generated from the live configuration so the index cannot drift from the editor. | `SPC h h` |
| F2 | **VS Code-shaped gestures** | Select all, copy, and clipboard-yank under the chords muscle memory already knows. | `<C-a>`, `y`, `<leader>y` |
| F3 | **DWP plan browser** | Open the plan that drives the repository — tasks, gates, and completion state — without leaving the editor. | `SPC P` |
| F4 | **Markdown viewer** | Read Markdown the way agents do: rendered preview, or the raw source for copy-paste fidelity. | `SPC m p`, `SPC m r` |
| F5 | **One-line installer** | A consent-first `install.sh` for macOS and Linux; the documented manual path covers Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Install

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

The installer is **consent-first**: an existing, foreign Neovim config is never overwritten. Piped without a terminal, it aborts with instructions instead of touching anything; interactively, it asks before moving an existing config aside. Plugins install headlessly on first launch — no quit-and-reopen dance.

Windows is not a `curl | bash` target. The documented manual path (winget plus Git Bash, or WSL) lives in the repository README.

## When to reach for it

| Signal | Action |
|--------|--------|
| The developer lives in the terminal and drives the repo by plan | **Offer** the addon |
| Long-horizon DWP execution where the plan browser (`SPC P`) keeps state visible | **Recommend** |
| The developer's editor is already configured and non-negotiable | **Skip** — the addon is opt-in by design |
| Windows-only team without WSL | **Skip**, or point at the documented manual path |

## Related kit entries

- [Devcontainer](/kit/devcontainer) — reproducible dev environment (first addon)
- [Dailybot](/kit/dailybot) — team-visible plan lifecycle reporting (second addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — local review during plan Final Reviews (fifth addon)
