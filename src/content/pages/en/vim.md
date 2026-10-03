---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim is the terminal editor for Deep Work Plan: a Neovim 0.12+ configuration with a generated command index, plan browser, and Markdown viewer."
lastUpdated: 2026-10-03
---

## What it is

A Neovim configuration for humans and coding agents that live in the terminal — your Deep Work Plans, documentation, and command index one keystroke away.

## Install

One line installs DeepWorkPlan Vim as your Neovim configuration. The installer explains what it will do and asks before it touches an existing setup.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Consent first: an existing Neovim configuration is never overwritten without your explicit approval. The installer stops and shows the manual path instead.

On Windows the one-liner does not apply; the repository README documents the manual path. [Windows install path](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## What it does

Five features, scoped deliberately. Each maps to a keybinding you can inspect in the generated command index.

| Feature | What it is | Mapping |
|---|---|---|
| Generated command index | A command index generated from the live configuration, so the list of keybindings is always current. | `SPC h h` |
| VS Code-shaped gestures | Editing gestures shaped by graphical editors: select all, and copy to the system clipboard. | `<C-a>`, `y`, `<leader>y` |
| Deep Work Plan browser | A panel that browses the plans in the repository — read a plan, its tasks, and their gates without leaving the editor. | `SPC P` |
| Markdown viewer | Preview Markdown in the browser or render it in the buffer, so documentation and plans stay where the work happens. | `SPC m p`, `SPC m r` |
| One-line installer | A self-contained installer for macOS and Linux, with a documented manual path for Windows. | — |

## Requirements

- Neovim 0.12 or newer, with Lua (lua, lua5.4, or luajit) available
- macOS and Linux; Windows is supported through a documented manual path
- GPL-3.0 licensed — free to use, study, and modify

## Related

- [Read the kit addon doc](/kit/vim)
- [View the source repository](https://github.com/DailybotHQ/deepworkplan-vim)
- Install DeepWorkPlan Vim, open Neovim, and read your Deep Work Plans in the same terminal your agents use.
