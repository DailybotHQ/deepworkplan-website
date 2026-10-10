---
title: Devcontainer
description: "An optional addon built on devcontainer-kit: each repository's own dev container from one template, agents through ak, Herdr both ways, no SSH key inside."
kind: addon
lang: en
order: 1
---

# Devcontainer addon

Give the repository a reproducible, isolated development container — one that people, editors and coding agents can all use. In **DWP v7** (pack `v7.1.4`) this addon integrates **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, an MIT product that works without Deep Work Plan. It is optional: a repository is fully conformant without it.

## What devcontainer-kit provides

- **A template**, built on the [Dev Containers](https://containers.dev) specification, that `dck init` renders into the repository in one fixed layout: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` and `dev.sh`. Run again later, it reconciles and never clobbers your edits; any change to an existing file is shown first and needs consent.
- **The repository's own container.** The Dockerfile starts from the runtime's official image pinned by digest — `node-24`, `python-3.13` or `debian` — and copies the kit's build steps into `docker/local/<service>/dck/`. No shared base image is involved.
- **`dev.sh` and `dck`.** `bash dev.sh up` builds, starts and attaches the container from a plain terminal; `shell`, `rebuild`, `doctor` and the rest work with or without VS Code or Cursor.
- **Herdr both ways.** The host's [Herdr](https://herdr.dev) attaches each container as a machine over a loopback-only SSH server, and the container opens with the standard sidebar: Home, Editor, Development and Agents. Inside, [herdr-peers](/kit/herdr) lets agents ask agents on the host and in other containers.
- **The `dck-dockerfile` skill.** An agent creates or regenerates a repository's container on request and proves it with a real build.

## Install

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requirements: `bash` 3.2 or newer and `python3` 3.11 or newer on a Linux or macOS host, and Docker with Compose v2 for the container commands. Verify a release with its `SHA256SUMS` asset. Pin `v0.2.2`: `v0.2.0` is unsupported.

| Item | Value |
|---|---|
| Product | `DailybotHQ/devcontainer-kit`, tag `v0.2.2`, interface 2 |
| Registry key | `devcontainer` in `.dwp/config.json` |
| Per-repository config | `.devcontainer/dck.toml` |
| Detection | `dck doctor --json` |

## Layers

Every container carries the development tools — git, gh, ripgrep, an SSH server, Herdr and herdr-peers — and no secret. The rest is a layer you choose in `dck.toml`:

| Layer | Default | What it adds |
|---|---|---|
| `agents` | off | [coding-agents-kit](/kit/agentkit) from its verified release and the CLIs you list, each with its own persistent volume, plus the `classic` (`claudex`, `codexx`, …) and `providers` (`claude-glm`, `codex-azure`, …) presets. Agents run in autonomy by default — the container is the sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in the service `.env`. |
| `editor` | on | Neovim with [DeepWorkPlan Vim](/kit/vim) pinned by tag; off gives a plain editor. |
| `dailybot` | off | The Dailybot CLI, for the dailybot addon. |

Logins, `gh`, the Herdr configuration and the git identity survive `bash dev.sh rebuild`.

## Security defaults

- Every published port binds `127.0.0.1` unless `dck.toml` sets `bind`.
- Git over SSH goes through the host's SSH agent — its socket, never a key file and never a mounted `~/.ssh` or `~/.gitconfig`. The git identity comes from `DCK_GIT_*` values that `dck setup` fills.
- SSH host keys are generated at runtime into a per-project volume, never baked into an image; the server accepts public keys only, with no root login and no passwords.
- The template adds no `cap_add`, no `privileged` mode and no Docker socket.
- Every download is pinned by version and verified by checksum; the base image is pinned by digest.
- The Herdr mesh that lets agents in one container reach the others is on by default and documented with its off switches in the kit's threat model.

## Notes

Optional and never required. A repository is fully conformant with zero optional addons. v0.2 supports Linux and macOS hosts; the mesh between containers needs Docker Desktop.
