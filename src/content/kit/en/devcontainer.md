---
title: Devcontainer
description: "An optional addon built on devcontainer-kit: a Dev Containers template rendered by dck init, base images without agents, and Herdr machines per container."
kind: addon
lang: en
order: 1
---

# Devcontainer addon

Give the repository a reproducible, isolated development container — one that people, editors and coding agents can all use. In the **DWP v7 beta** (`v7.0.0-beta.1`, a pre-release) this addon integrates **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, an MIT product that works without Deep Work Plan, and replaces the template the pack used to carry. It is optional: a repository is fully conformant without it.

## What devcontainer-kit provides

- **A template**, built on the [Dev Containers](https://containers.dev) specification, that `dck init` renders into the repository: `devcontainer.json`, a compose file and `docker/local/`. Run again later, it reconciles and never clobbers your edits; any change to an existing file is shown first and needs consent.
- **`dck`**, a launcher that runs the container from a plain terminal — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — with or without VS Code or Cursor.
- **Base images** in three flavours, `python-3.13`, `node-24` and `debian`, that ship **without** coding agents.
- **An entrypoint library** for persistent volumes, SSH and the environment of SSH sessions, instead of a hand-copied entrypoint per repository.
- **Herdr machines.** Each container can join [Herdr](https://herdr.dev) over a loopback-only SSH server, so agents in it become reachable peers.

## Install

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Requirements: `bash` 3.2 or newer and `python3` 3.11 or newer on a Linux or macOS host, and Docker with Compose v2 for the container commands. Verify a release with its `SHA256SUMS` asset.

| Item | Value |
|---|---|
| Product | `DailybotHQ/devcontainer-kit`, tag `v0.1.4`, interface 1 |
| Registry key | `devcontainer` in `.dwp/config.json` |
| Per-repository config | `.devcontainer/dck.toml` |
| Detection | `dck doctor --json` |

## Layers are opt-in

The base images carry the development tools — git, gh, ripgrep, an SSH server, Herdr, and Neovim with DeepWorkPlan Vim pinned by tag — and no coding agent, no reporting CLI and no secret. Everything else is a layer you turn on in `dck.toml`:

| Layer | Default | What it adds |
|---|---|---|
| `agents` | off | Installs [coding-agents-kit](/kit/agentkit) and the CLIs you list, each with its own persistent volume. No permission-bypass flag is set. |
| `editor` | on | Neovim with DeepWorkPlan Vim; off gives a plain editor. |

## Security defaults

- Every published port binds `127.0.0.1` unless `dck.toml` sets `bind`.
- SSH agent forwarding from the host; host private keys are never copied into a container.
- SSH host keys are generated at runtime into a per-project volume, never baked into an image; the server accepts public keys only, with no root login and no passwords.
- The template adds no `cap_add`, no `privileged` mode and no Docker socket.
- Base images and tools are pinned by version and verified by checksum; compose references the base image by digest whenever the digest can be resolved.

## Notes

Optional and never required. A repository is fully conformant with zero optional addons. v0.1 supports Linux and macOS hosts.
