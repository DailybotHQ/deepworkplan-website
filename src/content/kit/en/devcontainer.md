---
title: Devcontainer
description: "A reproducible dev container for every repository, from one template: agents on your host accounts through ak, Herdr wired both ways, and no SSH key inside."
kind: addon
lang: en
order: 1
---

# Devcontainer addon

Give the repository a reproducible, isolated development container — one that people, editors and coding agents can all use. In **DWP v7** (pack `v7.6.0`) this addon integrates **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, an MIT product that works without Deep Work Plan. It is optional: a repository is fully conformant without it.

## What devcontainer-kit provides

- **A template**, built on the [Dev Containers](https://containers.dev) specification, that `dck init` renders into the repository in one fixed layout: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` and `dev.sh`. Run again later, it reconciles and never clobbers your edits; any change to an existing file is shown first and needs consent.
- **The repository's own container.** The Dockerfile starts from the runtime's official image pinned by digest — `node-24`, `python-3.13` or `debian` — and copies the kit's build steps into `docker/local/<service>/dck/`. No shared base image is involved.
- **`dev.sh` and `dck`.** `bash dev.sh up` builds, starts and attaches the container from a plain terminal; `shell`, `rebuild`, `doctor` and the rest work with or without VS Code or Cursor.
- **Herdr both ways.** The host's [Herdr](https://herdr.dev) attaches each container as a machine over a loopback-only SSH server, and the container opens with the standard sidebar: App, Editor, Development and Agents. Every workspace and pane, including the ones opened later, starts in the app path (`/app` by default). Inside, [herdr-peers](/kit/herdr) lets agents ask agents on the host and in other containers.
- **The `dck-dockerfile` skill.** An agent creates or regenerates a repository's container on request and proves it with a real build.

## Install

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requirements: `bash` 3.2 or newer and `python3` 3.11 or newer on a Linux or macOS host, and Docker with Compose v2 for the container commands. Verify a release with its `SHA256SUMS` asset. Pin `v0.3.0`: `v0.2.0` is unsupported.

| Item | Value |
|---|---|
| Product | `DailybotHQ/devcontainer-kit`, tag `v0.3.0`, interface 2 |
| Registry key | `devcontainer` in `.dwp/config.json` |
| Per-repository config | `.devcontainer/dck.toml` |
| Detection | `dck doctor --json` |

## Layers

Every container carries the development tools — git, gh, ripgrep, an SSH server, Herdr and herdr-peers — and no secret unless you opt in to [host accounts](#host-accounts-inside-the-container). The rest is a layer you choose in `dck.toml`:

| Layer | Default | What it adds |
|---|---|---|
| `agents` | off | [coding-agents-kit](/kit/agentkit) from its verified release and the CLIs you list, each with its own persistent volume, plus the `classic` (`claudex`, `codexx`, …) and `providers` (`claude-glm`, `codex-azure`, …) presets. Agents run in autonomy by default — the container is the sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in the service `.env`. |
| `editor` | on | Neovim with [DeepWorkPlan Vim](/kit/vim) pinned by tag; off gives a plain editor. |
| `dailybot` | off | The Dailybot CLI, for the dailybot addon. |

Logins, `gh`, the Herdr configuration and the git identity survive `bash dev.sh rebuild`.

## Agents across machines

Since `v0.2.3`, `dck up` wires a two-way mesh with no hand step, on Docker Desktop:

- **Containers and the host.** Agents inside reach Herdr agents on the host, in every other dck container and in the other loopback containers your host's Herdr already manages — and those reach back. Every peer carries a pinned host key; nothing is trusted on first use.
- **An optional host listener.** `dck setup` offers, once, a user-level SSH server on `127.0.0.1` that accepts only the dck key and is kept running by launchd (macOS). If you already run a loopback listener, point the host profile at it instead. `dck host listener disable` removes it.
- **Survives rebuilds.** The container's Herdr machine catalog lives on a volume, so `bash dev.sh rebuild` keeps every machine registered inside.
- **Replies from the host too.** `dck setup` installs a verified [herdr-peers](/kit/herdr) on the host, so `dck agents` and `dck ask` work there, and host agents answer with `herdr-peers reply`.
- **Containers the kit did not create.** List the public keys they log in with under `[ssh] authorized_extra` in your host profile, and they can reach dck containers too.

Pair it with [coding-agents-kit](/kit/agentkit) on the host and in the container, and the same `ak` launches agents on both sides.

## Host accounts inside the container

A container can use the accounts you already have on the host, the way git already works through the host's SSH agent, with no login inside. It is opt-in and lives in your **host profile**, never in a repository's `dck.toml`:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

With `host_profiles` on, `dck up` shares only the profiles of the CLIs the repository installs:

- **Claude Code** through a long-lived token per profile: `CLAUDE_CODE_OAUTH_TOKEN` for `@default` and `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` for `@name` (the suffix uppercased, any character outside `A-Z`, `0-9` and `_` turned into `_`).
- **Codex** through its auth file, for `@default` and for each profile.
- **The kit's env file**, read-only and reduced to the names in `host_env_keys`.

The whole agentkit home is never mounted, and profiles that hold absolute host paths are skipped. A Codex login shared read-write can be refreshed by two writers at once: keep one active agent per Codex account. Inside the container, the same `ak <kind> @<profile>` runs on the same account as on the host, which is what lets a lead hand container lanes the accounts `ak pick` chose — see [Running many agents](/methodology/06-orchestration).

## Security defaults

- Every published port binds `127.0.0.1` unless `dck.toml` sets `bind`.
- Git over SSH goes through the host's SSH agent — its socket, never a key file and never a mounted `~/.ssh` or `~/.gitconfig`. The git identity comes from `DCK_GIT_*` values that `dck setup` fills.
- SSH host keys are generated at runtime into a per-project volume, never baked into an image; the server accepts public keys only, with no root login and no passwords.
- The template adds no `cap_add`, no `privileged` mode and no Docker socket.
- Every download is pinned by version and verified by checksum; the base image is pinned by digest.
- The Herdr mesh that lets agents in one container reach the others is on by default and documented with its off switches in the kit's threat model. The host listener lets code in a running container open a shell on the host as you: it is opt-in, loopback-only, accepts only the dck key and comes off with `dck host listener disable`.

## Notes

Optional and never required. A repository is fully conformant with zero optional addons. v0.2 supports Linux and macOS hosts; the mesh between containers needs Docker Desktop.
