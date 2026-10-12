# Local Docker development stack

The site's development container is rendered by
[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`) v0.3.5 from
`.devcontainer/dck.toml`. The same container serves a plain terminal (`bash dev.sh …`) and
VS Code / Cursor ("Reopen in Container").

| File | Role |
| --- | --- |
| `.devcontainer/dck.toml` | the settings: service `dwpwebsite`, user `node`, workspace `/app`, ports, layers, Herdr |
| `.devcontainer/devcontainer.json` | what VS Code / Cursor open (same compose service) |
| `docker/local/docker-compose.yaml` | the service, its volumes and loopback ports |
| `docker/local/dwpwebsite/Dockerfile` | the image: dck's managed blocks, then the site's own section (chromium, the npm → pnpm shim, the site helpers) |
| `docker/local/dwpwebsite/dck/` | the build steps dck vendors (pinned and verified downloads); reconciled by `dck init` |
| `docker/local/dwpwebsite/.env` | your keys (copied from `.env.example` on the first `up`, mode 0600, gitignored) |
| `dev.sh` | the entry point, a thin launcher over `dck` (plain `docker compose` when dck is absent) |
| `docker/local/dev-setup-hook.sh` | the site's start hook (run by dck at every start): recreates `/tmp/ov/{astro,dist}` for a checkout whose `.astro` / `dist` are symlinks there (build output off the bind mount) |

Blocks between `>>> dck:` and `<<< dck:` markers belong to dck: to change them, edit
`dck.toml` and run `dck init`. Everything outside the markers is ours.

## Quick start

Docker is the only host requirement. Without devcontainer-kit, `dev.sh` runs `up`, `down`,
`shell`, `exec`, `build`, `rebuild`, `logs` and `ps` on plain `docker compose` (it still
creates the `.env`; the container's entrypoint runs the start hook). devcontainer-kit adds the Herdr machine, the dck
SSH key, `ssh`, `doctor`, `agents` and `ask`; install it once, pinned, when you want those:

```bash
(cd "$(mktemp -d)" && git clone --branch v0.3.5 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh)
```

`dev.sh` finds dck on `PATH` or in its default install directory (`~/.local/share/dck`).
From the repository root:

```bash
bash dev.sh up        # first run: .env files and the dck SSH key; then build, start, attach to Herdr
bash dev.sh shell     # a login shell inside, as node, in /app
pnpm run dev          # inside: the dev server on http://localhost:5555
bash dev.sh down      # stop and remove the container (named volumes are kept)
```

`bash dev.sh help` lists every verb: `up`, `down`, `shell`, `exec`, `build`, `rebuild`,
`logs`, `ps`, `doctor`, `ssh`, `herdr`, `herdr-layout`, `agents`, `ask`, `install-dck`.

## How `docker/local/dwpwebsite/.env` reaches your shell

- **At creation.** Compose loads it as the service's `env_file`. `docker exec` shells and
  editor terminals inherit it.
- **In ssh and Herdr sessions.** The entrypoint writes an environment profile from it.
- **In every new bash.** `docker/custom_commands.sh` re-reads it, so after editing the file,
  opening a new shell is enough.

Values are never printed. `dck doctor --json` reports key names only.

## Coding agents (coding-agents-kit)

The agents layer installs [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)
v0.5.3 and the seven CLIs listed in `dck.toml`: claude, codex, cursor, opencode, pi, cline and
grok. Each is installed at a pinned version and verified. Every CLI home lives on its own named
volume, so logins survive `bash dev.sh rebuild`. The image also carries coding-agents-kit's three
skills (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), linked into every agent's skills
directory at each start.

| Names | What they run |
| --- | --- |
| `claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx` | each CLI through `ak` (`classic` preset) |
| `claude-glm`, `codex-glm`, `opencode-glm`, `pi-glm` | Z.AI GLM Coding Plan — `ZAI_CODING_API_KEY` |
| `codex-azure`, `opencode-azure`, `pi-azure`, `cline-azure` | Azure OpenAI / Foundry — `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_RESOURCE` or `AZURE_OPENAI_BASE_URL`, `AZURE_OPENAI_MODEL_DAILY` |
| `codex-xai`, `opencode-xai`, `pi-xai`, `cline-xai` | xAI — `XAI_API_KEY` |

`ak doctor` shows what is installed and which keys are set (names only). Session flags are the
same for every CLI: `-c` continues, `-r <id>` resumes.

**Host accounts.** With `[agents] host_profiles = true` in the developer's **host** profile
(`~/.config/dck/profile.toml`, never this repository), a freshly created container already holds
the host's Claude and Codex profiles: `ak profiles` lists them and `ak claude @<profile>` opens
without a login. Claude authenticates through each profile's token, Codex through its auth file
(one active writer per Codex account). See [/kit/devcontainer](https://deepworkplan.com/kit/devcontainer).

**Autonomy by default.** Agents launched through `ak` run with their CLI's own autonomy flag:
the container is the sandbox. To have them ask before acting, set `AGENTKIT_PERMISSIONS=ask` in
`docker/local/dwpwebsite/.env`, or pass `--ask` to one launch. The opt-out always wins.

## Git over SSH

Git signs and pushes with the keys your **host's SSH agent** holds. The agent's socket is mounted
into the container; no key file is copied in, and neither `~/.ssh` nor `~/.gitconfig` is
mounted, unless you opt in.

- **Key files for tools that need them (opt-in).** Some tools ignore the agent and read key files
  (`gh auth login` offers to generate a new key). Set `[ssh] copy_keys = true` in your **host**
  profile (`dck setup` asks once, default no; `dck.toml` cannot set it): `up` then binds the
  host's `~/.ssh` read-only at `~/.ssh_host`, and every start copies its `id_*` keys into the
  container's `~/.ssh` on the `state` volume. While it is on, the whole host `~/.ssh` is
  readable inside and the private keys rest in the `state` volume; turning it off removes the
  copies at the next start.

- Load your key on the host once. On macOS: `ssh-add --apple-use-keychain ~/.ssh/<your key>`.
  `bash dev.sh up` warns when the agent holds no keys.
- `dck setup` (run by the first `up`) copies your git name and email into `.env` as `DCK_GIT_*`.
  SSH commit signing is copied too; openpgp signing is not, because the container has no gpg key.
- Check from inside: `ssh-add -l`, then `ssh -T git@github.com`.

## Herdr

`bash dev.sh up` registers the container as a [Herdr](https://herdr.dev) machine. Its sshd
listens on `127.0.0.1:22022` and accepts only the dck key. The machine opens with the standard
sidebar: App · Editor · Development (server | tests) · Agents (Agent 1..4). Every workspace and
pane, including the ones opened later, starts in the app path (`/app`, the `dck.toml` `workspace`).
`bash dev.sh herdr-layout --keep` recreates whatever is missing, and `--reset` rebuilds it.

Agents inside reach Herdr agents on the host and in other dck containers through
[herdr-peers](https://github.com/DailybotHQ/herdr-peers). From the host:

```bash
bash dev.sh agents                                  # the live agents on every machine
bash dev.sh ask <machine>:<pane> "Which test covers the parser?"
```

Since dck v0.2.3 the mesh is complete: `dck up` also pushes the host (when your dck host
profile enables it: `dck setup` offers dck's own loopback listener once, or `[host]
listener = "external"` points at one you already run) and the other loopback containers your
host's Herdr manages, such as the Dailybot ones, each with a pinned host key. The container's
Herdr machine catalog lives on the `state` volume, so `rebuild` keeps it. Since dck v0.3.2,
`rebuild`, `start` and `restart` run the same post-start steps as `up` (the Herdr machine
re-registered, its host key re-pinned, the mesh pushed), so a container rebuilt from scratch
reaches the host and its peers at once. Since dck v0.3.3 the container's login shells export `HERDR_PEERS_SELF` (this
container's machine id as saved on the host), so a Codex agent inside reaches peers on
other machines with no hand step; `dck doctor` flags a mismatch. To let containers
that dck did not create log in here, list the public keys they use under `[ssh]
authorized_extra` in the host profile. `dck setup` also installs a verified herdr-peers on the
host, so host agents can reply with `herdr-peers reply`.

The mesh between containers needs Docker Desktop. It is on by default and can be turned off
with `[herdr] mesh = false` in `dck.toml`. Read devcontainer-kit's `docs/SECURITY.md` before
running an untrusted repository next to this one.

## Persistence

| Volume (compose project `deepworkplan-website`) | Holds |
| --- | --- |
| `state` | sshd host keys, `~/.ssh` (and copied key files with `copy_keys`), `gh` login, Herdr config, Dailybot CLI config, shell history |
| `agentkit` | ak profiles and its env file |
| `claude`, `codex`, `cursor`, `opencode`, `pi`, `cline`, `grok` | each CLI's home (logins, sessions) |

The state volume is named `state` (`[compose] state_volume` in `dck.toml`, default `state`);
this repository is the only service in its compose project, so the default is right. A
repository sharing one compose project with other services gives each its own name.

`bash dev.sh rebuild` replaces the image and keeps every volume. Removing a volume
(`docker volume rm deepworkplan-website_<name>`) loses what it holds.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `dev.sh needs devcontainer-kit (dck)` | Install it, pinned (Quick start). |
| `Permission denied (publickey)` on `git push` | The host agent has no key: run `ssh-add` on the host, then retry. No rebuild is needed. |
| `claudex: command not found` | Open an interactive shell (`bash dev.sh shell`). The presets load in interactive bash. |
| Port 5555 busy on macOS | AirPlay Receiver listens on 5000/7000, not 5555. Look for another dev server: `lsof -i :5555`. |
| Anything else | `bash dev.sh doctor` (or `dck doctor --json`). |
