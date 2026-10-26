---
title: Devcontainer
description: "A reproducible dev container for every repository, from one template: agents on your host accounts through ak, Herdr wired both ways, SSH keys only on opt-in."
kind: addon
lang: en
order: 1
---

# Devcontainer addon

Give the repository a reproducible, isolated development container — one that people, editors and coding agents can all use. In **DWP v7** (pack `v7.9.0`) this addon integrates **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, an MIT product that works without Deep Work Plan. It is optional: a repository is fully conformant without it.

## What devcontainer-kit provides

- **A template**, built on the [Dev Containers](https://containers.dev) specification, that `dck init` renders into the repository in one fixed layout: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` and `dev.sh`. Run again later, it reconciles and never clobbers your edits; any change to an existing file is shown first and needs consent.
- **The repository's own container.** The Dockerfile starts from the runtime's official image pinned by digest — `node-24`, `python-3.13` or `debian` — and copies the kit's build steps into `docker/local/<service>/dck/`. No shared base image is involved.
- **`dev.sh` and `dck`.** `bash dev.sh up` builds, starts and attaches the container from a plain terminal; `shell`, `rebuild`, `doctor` and the rest work with or without VS Code or Cursor.
- **Herdr both ways.** The host's [Herdr](https://herdr.dev) attaches each container as a machine over a loopback-only SSH server, and the container opens with the standard sidebar: App, Editor, Development and Agents. Every workspace and pane, including the ones opened later, starts in the app path (`/app` by default). Inside, [herdr-peers](/kit/herdr) lets agents ask agents on the host and in other containers.
- **The `dck-dockerfile` skill.** An agent creates or regenerates a repository's container on request and proves it with a real build.

## Install

```bash
git clone --branch v1.1.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requirements: `bash` 3.2 or newer and `python3` 3.11 or newer on a Linux or macOS host, and Docker with Compose v2 for the container commands. Verify a release with its `SHA256SUMS` asset. Pin `v1.0.1`: `v0.2.0` is unsupported.

| Item | Value |
|---|---|
| Product | `DailybotHQ/devcontainer-kit`, tag `v1.1.1`, interface 2 |
| Registry key | `devcontainer` in `.dwp/config.json` |
| Per-repository config | `.devcontainer/dck.toml` |
| Detection | `dck doctor --json` |

**Stable since `v1.0.0`.** The public interface follows semantic versioning and changes incompatibly only in a new major version (and, for the files, a new interface number): the `dck` verbs with their documented flags and exit codes (`0` ok, `1` failed, `2` usage, `3` configuration, `4` environment, `5` refused), the `dck.toml`, host-profile and `dck doctor --json` schemas (interface 2), and the render contract — the files `dck init` writes and owns, the `dck:managed` markers and user blocks it preserves, and the environment the entrypoint reads. Nothing breaks from `v0.3.7`: run `dck init` and `dck rebuild` so the image carries the new pins (herdr-peers, coding-agents-kit and DeepWorkPlan Vim, each at `v1.0.0`).

## Layers

Every container carries the development tools — git, gh, ripgrep, an SSH server, Herdr and herdr-peers — and no secret unless you opt in to [host accounts](#host-accounts-inside-the-container). The rest is a layer you choose in `dck.toml`:

| Layer | Default | What it adds |
|---|---|---|
| `agents` | off | [coding-agents-kit](/kit/agentkit) from its verified release and the CLIs you list, each with its own persistent volume, plus the `classic` (`claudex`, `codexx`, …) and `providers` (`claude-glm`, `codex-azure`, …) presets. Agents run in autonomy by default — the container is the sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in the service `.env`. |
| `editor` | on | Neovim with [DeepWorkPlan Vim](/kit/vim) pinned by tag; off gives a plain editor. |
| `dailybot` | off | The Dailybot CLI, for the dailybot addon. |

Logins, `gh`, the Herdr configuration and the git identity survive `bash dev.sh rebuild`. With the `agents` layer, the image also carries coding-agents-kit's three skills (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), linked into every agent's skills directory at each start, so a recreated container keeps them.

The state volume (SSH host key, `~/.ssh`, `gh` login, Herdr client state, history) is named `state`. When several services share one compose project, give each its own name with `[compose] state_volume` in `dck.toml` (or `dck init --state-volume NAME`); otherwise they all mount the same volume, and `dck doctor` says so.

## Agents across machines

Since `v0.2.3`, `dck up` wires a two-way mesh with no hand step, on Docker Desktop:

- **Containers and the host.** Agents inside reach Herdr agents on the host, in every other dck container and in the other loopback containers your host's Herdr already manages — and those reach back. Every peer carries a pinned host key; nothing is trusted on first use.
- **An optional host listener.** `dck setup` offers, once, a user-level SSH server on `127.0.0.1` that accepts only the dck key and is kept running by launchd (macOS). If you already run a loopback listener, point the host profile at it instead. `dck host listener disable` removes it.
- **Survives rebuilds.** The container's Herdr machine catalog lives on a volume, so `bash dev.sh rebuild` keeps every machine registered inside. Since `v0.3.2`, `rebuild`, `start` and `restart` run the same steps as `up`: the container is registered with the host's Herdr again, its host key re-pinned, and the mesh pushed, so a container built from scratch reaches the host and its peers at once.
- **Codex panes inside a container.** A Codex agent needs `HERDR_PEERS_SELF`, the container's machine id as saved on the host, to ask peers on other machines. Since `v0.3.3` the kit records that id at every registration and the container's login shells export it, so no agent sets it by hand; `dck doctor` flags a mismatch. Since `v0.3.4` the container's own Codex configs skip Codex's startup update check and its background daemon (the kit pins every CLI version), never touching your host's Codex home or a shared profile.
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

The whole agentkit home is never mounted, and profiles that hold absolute host paths are skipped. A Codex login shared read-write can be refreshed by two writers at once: keep one active agent per Codex account. `[agents] default_profile` in the host profile (for example `{ claude = "@work3" }`) makes a bare `ak claude` inside use that shared account (coding-agents-kit ≥ `v0.5.2`); a macOS `@default` Claude login lives in the Keychain and cannot be shared. Since `v0.3.4` the container's shells also point a plain `claude` or `codex` at that account, so panes Herdr restores open on it instead of a login screen. Inside the container, the same `ak <kind> @<profile>` runs on the same account as on the host, which is what lets a lead hand container lanes the accounts `ak pick` chose — see [Running many agents](/methodology/06-orchestration).

## Several repositories, one compose stack

Since `v0.3.3`, a repository whose service is one part of a larger compose project (an API, a web app, workers and a database sharing one project) can join it without hand-editing what dck renders. Everything is additive: a repository that sets none of these keys renders exactly as before.

- **One project, one state volume per service.** `[compose] project` names the shared project in every repository; `state_volume`, `[compose] networks` and `[compose] volumes` keep each service's state and the stack's data volumes and networks apart.
- **A user block.** Lines between `# >>> user:<service> >>>` and `# <<< user:<service> <<<` inside the dck service are kept verbatim: plain keys for what dck does not render (`depends_on`, `healthcheck`), and `x-dck-merge:` for keys it does. A file with only some of dck's markers is refused with the fix instead of being rewritten.
- **Port strings.** `ssh_port` and `ports` accept compose expressions such as `"${API_PORT:-8000}:8000"`; they stay on `127.0.0.1` unless the string names a host IP.
- **Shared builds and your own launcher.** `[build] context` and `[build] dockerfile` cover a Dockerfile shared by several services; `dev_sh = false` keeps a repository's own `dev.sh`.
- **Workspace satellites.** Since `v0.3.5`, a second instance of the service in its own compose project starts and stops through dck (`dck --project P --compose-file F --service S up` or `down`), so it gets the same host key, accounts, git identity and Herdr machine as the main one; `up --seed-state-from VOLUME` copies only the logins into its empty state volume. In an overlay file, `extends` must name the file it extends.
- **Node for agents.** The agents' own Node lives under `/opt/dck/node` and never replaces the image's; `[agents] node_first = true` puts it first on PATH when the repository's tooling needs that.

## The host's SSH keys inside the container

Some tools read only key files and ignore the forwarded agent: `gh auth login`, for example, offers to generate a new key. Since `v0.3.2` you can opt in, in your **host profile** only (a repository's `dck.toml` cannot set it; `dck setup` asks once, default no):

```toml
[ssh]
copy_keys = true              # default false
```

While it is on, `dck up` binds the host's `~/.ssh` read-only at `~/.ssh_host`, and every start copies its `id_*` keys into the container's `~/.ssh` (private keys `0600`), kept in step with the host. Agent forwarding is unchanged, and turning it off removes the copies at the next start. The cost: the whole host `~/.ssh` is readable inside the container, and the private keys rest in the state volume.

## Security defaults

- Every published port binds `127.0.0.1` unless `dck.toml` sets `bind`.
- Git over SSH goes through the host's SSH agent — its socket, never a key file and never a mounted `~/.ssh` or `~/.gitconfig`, unless you turned on [`copy_keys`](#the-hosts-ssh-keys-inside-the-container) in your host profile. The git identity comes from `DCK_GIT_*` values that `dck setup` fills.
- SSH host keys are generated at runtime into a per-project volume, never baked into an image; the server accepts public keys only, with no root login and no passwords.
- The template adds no `cap_add`, no `privileged` mode and no Docker socket.
- Every download is pinned by version and verified by checksum; the base image is pinned by digest.
- The Herdr mesh that lets agents in one container reach the others is on by default and documented with its off switches in the kit's threat model. The host listener lets code in a running container open a shell on the host as you: it is opt-in, loopback-only, accepts only the dck key and comes off with `dck host listener disable`.

## Notes

Optional and never required. A repository is fully conformant with zero optional addons. Linux and macOS hosts are supported; the mesh between containers needs Docker Desktop.
