# Local Docker development stack

The site's development container is rendered by
[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`) v0.2.2 from
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
| `dev.sh` | the entry point, a thin launcher over `dck` |
| `docker/local/dev-setup-hook.sh` | the site's start hook (run by dck at every start): recreates `/tmp/ov/{astro,dist}` for a checkout whose `.astro` / `dist` are symlinks there (build output off the bind mount) |

Blocks between `>>> dck:` and `<<< dck:` markers belong to dck: to change them, edit
`dck.toml` and run `dck init`. Everything outside the markers is ours.

## Quick start

devcontainer-kit is a one-time install on the host, pinned:

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
```

Then, from the repository root:

```bash
bash dev.sh up        # first run: .env files and the dck SSH key; then build, start, attach to Herdr
bash dev.sh shell     # a login shell inside, as node, in /app
pnpm run dev          # inside: the dev server on http://localhost:5555
bash dev.sh down      # stop and remove the container (named volumes are kept)
```

`bash dev.sh help` lists every verb: `up`, `down`, `shell`, `exec`, `build`, `rebuild`,
`logs`, `ps`, `doctor`, `ssh`, `herdr`, `herdr-layout`, `agents`, `ask`.

## How `docker/local/dwpwebsite/.env` reaches your shell

- **At creation.** Compose loads it as the service's `env_file`. `docker exec` shells and
  editor terminals inherit it.
- **In ssh and Herdr sessions.** The entrypoint writes an environment profile from it.
- **In every new bash.** `docker/custom_commands.sh` re-reads it, so after editing the file,
  opening a new shell is enough.

Values are never printed. `dck doctor --json` reports key names only.

## Coding agents (coding-agents-kit)

The agents layer installs [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)
v0.3.0 and the seven CLIs listed in `dck.toml`: claude, codex, cursor, opencode, pi, cline and
grok. Each is installed at a pinned version and verified. Every CLI home lives on its own named
volume, so logins survive `bash dev.sh rebuild`.

| Names | What they run |
| --- | --- |
| `claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx` | each CLI through `ak` (`classic` preset) |
| `claude-glm`, `codex-glm`, `opencode-glm`, `pi-glm` | Z.AI GLM Coding Plan — `ZAI_CODING_API_KEY` |
| `codex-azure`, `opencode-azure`, `pi-azure`, `cline-azure` | Azure OpenAI / Foundry — `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_RESOURCE` or `AZURE_OPENAI_BASE_URL`, `AZURE_OPENAI_MODEL_DAILY` |
| `codex-xai`, `opencode-xai`, `pi-xai`, `cline-xai` | xAI — `XAI_API_KEY` |

`ak doctor` shows what is installed and which keys are set (names only). Session flags are the
same for every CLI: `-c` continues, `-r <id>` resumes.

**Autonomy by default.** Agents launched through `ak` run with their CLI's own autonomy flag:
the container is the sandbox. To have them ask before acting, set `AGENTKIT_PERMISSIONS=ask` in
`docker/local/dwpwebsite/.env`, or pass `--ask` to one launch. The opt-out always wins.

## Git over SSH

Git signs and pushes with the keys your **host's SSH agent** holds. The agent's socket is mounted
into the container; no key file is copied in, and neither `~/.ssh` nor `~/.gitconfig` is
mounted.

- Load your key on the host once. On macOS: `ssh-add --apple-use-keychain ~/.ssh/<your key>`.
  `bash dev.sh up` warns when the agent holds no keys.
- `dck setup` (run by the first `up`) copies your git name and email into `.env` as `DCK_GIT_*`.
  SSH commit signing is copied too; openpgp signing is not, because the container has no gpg key.
- Check from inside: `ssh-add -l`, then `ssh -T git@github.com`.

## Herdr

`bash dev.sh up` registers the container as a [Herdr](https://herdr.dev) machine. Its sshd
listens on `127.0.0.1:22022` and accepts only the dck key. The machine opens with the standard
sidebar: Home · Editor · Development (server | tests) · Agents (Agent 1..4).
`bash dev.sh herdr-layout --keep` recreates whatever is missing, and `--reset` rebuilds it.

Agents inside reach Herdr agents on the host and in other dck containers through
[herdr-peers](https://github.com/DailybotHQ/herdr-peers). From the host:

```bash
bash dev.sh agents                                  # the live agents on every machine
bash dev.sh ask <machine>:<pane> "Which test covers the parser?"
```

The mesh between containers needs Docker Desktop. It is on by default and can be turned off
with `[herdr] mesh = false` in `dck.toml`. Read devcontainer-kit's `docs/SECURITY.md` before
running an untrusted repository next to this one.

## Persistence

| Volume (compose project `deepworkplan-website`) | Holds |
| --- | --- |
| `state` | sshd host keys, `gh` login, Herdr config, Dailybot CLI config, shell history |
| `agentkit` | ak profiles and its env file |
| `claude`, `codex`, `cursor`, `opencode`, `pi`, `cline`, `grok` | each CLI's home (logins, sessions) |

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
