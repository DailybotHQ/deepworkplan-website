# Local Docker development stack

Dev container for deepworkplan.com: Node, pnpm, Claude Code, Codex, Cline, Cursor CLI, OpenCode, Pi, Herdr, Dailybot CLI, and optional Z.AI GLM / Azure OpenAI support.

## Quick start

```bash
cd docker/local
bash setup.sh
docker compose build
docker compose up -d
```

Attach to the dev container (VS Code Dev Containers, or `docker compose exec dwpwebsitevscode bash`).

## Dev containers without an IDE (`dev.sh`)

`dev.sh` (repo root) starts exactly the services `.devcontainer/devcontainer.json` declares, from a plain terminal — no VS Code or Cursor required. `devcontainer.json` is the single source of truth: `runServices` decides what starts, `remoteUser` and `workspaceFolder` decide how the container is entered. Opening the project in an IDE keeps working unchanged, and both paths manage the same containers.

```bash
bash dev.sh setup                 # one-time bootstrap: .env files, shutdownAction, networks
bash dev.sh build                 # build the image
bash dev.sh up                    # start runServices, detached
bash dev.sh shell                 # login shell as node, in /app
bash dev.sh ps                    # what is running (also: logs, stop, start, restart)
bash dev.sh exec dwpwebsitevscode pnpm run dev
bash dev.sh down                  # stop and remove this repo's services (named volumes kept)
bash dev.sh doctor                # read-only environment diagnosis
```

`setup` sets `"shutdownAction": "none"` in `.devcontainer/devcontainer.json` (the stack survives closing the editor window; `dev.sh down` stops it) and narrows `.env` files to `0600` — they hold API keys. `up` never recreates existing containers; pass `--recreate` to apply compose changes on purpose.

### How `docker/local/dwpwebsite/.env` reaches your shell

Three layers, so the file is the single source of truth no matter how you get into the container (`dev.sh`, the Dev Containers plugin, or `herdr --remote`):

| Layer | Who reads the file | Covers | Picks up edits |
|---|---|---|---|
| compose `env_file` | Docker, at container **create** | PID 1, `docker exec`, `dev.sh shell`, editor terminals | `dev.sh up --recreate` / `rebuild` |
| `entrypoint.sh` → `/etc/environment` | root, on every container **start** | every SSH login via PAM (`herdr --remote`, `ssh -p 22022`) | `dev.sh restart` |
| `custom_commands.sh` → `dwp.load_env_file` | your shell, on every **new bash** | any interactive or login bash | open a new shell / pane |

The last layer is why "edit `.env`, then open a new shell" is enough in practice. SSH sessions get nothing from compose on their own: sshd starts from a clean environment and `PermitUserEnvironment` stays off, which is what the PAM mirror is for. Override the path with `DWP_ENV_FILE` if you keep the file elsewhere.

## AI CLIs (installed in the image)

| CLI | Install method | Command |
|-----|----------------|---------|
| Claude Code | Official `curl` installer | `claude` / `claudex` |
| Codex | pnpm global | `codex` / `codexx` / `codex-azure` / `codex-glm` |
| Cursor agent | Official `curl` installer | `agent` / `cursorx` |
| Cline | pnpm global (`corepack pnpm add -g cline`) | `cline` / `clinex` / `clinex-azure` |
| OpenCode | Official [`curl` installer](https://opencode.ai/) | `opencodex` / `opencodex-azure` / `opencodex-glm` |
| Pi | pnpm global (`--ignore-scripts @earendil-works/pi-coding-agent`) | `pi` / `pi-azure` / `pi-glm` |
| Herdr | Official [`curl` installer](https://herdr.dev/) | `herdr` |

OpenCode binary: `~/.opencode/bin` (on `PATH`). Config persists via the `opencode_data` volume (`~/.config/opencode`, `~/.local/share/opencode`).
Cline data, config, and session history persist via the `cline_data` volume mounted at `~/.cline`, with `CLINE_DATA_DIR` pinned to `~/.cline/data`.
Pi config/sessions persist via the `pi_data` volume (symlinked to `~/.pi`).
Herdr binary: `~/.local/bin/herdr` (on `PATH`). Config/logs persist via the `herdr_data` volume (symlinked to `~/.config/herdr`).

## Z.AI GLM Coding Plan (optional)

Use [Z.AI GLM Coding Plan](https://docs.z.ai/devpack/quick-start) alongside the default Anthropic-backed `claude` / `claudex` commands. Wrappers inject auth and model mapping **only for that process** — nothing is written to `~/.claude/settings.json`.

### Setup

1. Edit `docker/local/dwpwebsite/.env` and set your Coding Plan API key ([manage API keys](https://z.ai/manage-apikey/apikey-list)):

   ```bash
   ZAI_CODING_API_KEY=your-key-here
   ```

2. Rebuild/restart the container, then open a **fresh shell**.

### Commands

| Command | Description |
|---------|-------------|
| `claude-glm` | Claude Code via Z.AI (`https://api.z.ai/api/anthropic`) |
| `claudex-glm` | Same, with `--dangerously-skip-permissions` (mirrors `claudex`) |
| `opencodex` | OpenCode with full permissions |
| `opencodex-azure` | OpenCode via Azure OpenAI / Foundry with full permissions |
| `codex-azure` | Codex via Azure OpenAI / Foundry (`-p azure` profile) with full permissions |
| `codex-glm` | Codex via Z.AI GLM Coding Plan (`-p glm` profile, Responses `https://api.z.ai/api/v1`) with full permissions |
| `opencodex-glm` | OpenCode via Z.AI Coding Plan (`zai-coding-plan` / `https://api.z.ai/api/coding/paas/v4`) with the same GLM model env as `claudex-glm` |
| `pi-azure` | Pi via Azure Foundry (`azure-foundry` custom provider; only daily/reasoning deployments) |
| `pi-glm` | Pi via Z.AI GLM (`zai-glm` custom provider; same GLM env as `claudex-glm`) |
| `opencodex-xai` | OpenCode via xAI Grok (`XAI_API_KEY` from console.x.ai) |
| `cline-xai` | Cline via xAI Grok (openai-compatible `https://api.x.ai/v1`) |
| `pi-xai` | Pi via xAI Grok (`xai-grok` custom provider) |
| `codex-xai` | Codex via xAI Responses API (`-p xai`) |
| (no `claudex-xai`) | xAI has no Anthropic-compatible endpoint (use `opencode-xai`, `cline-xai`, `codex-xai`, etc.) |
| `chelper` | Z.AI Coding Tool Helper wizard |

`opencodex-glm` writes the `zai-coding-plan` provider into `~/.config/opencode/opencode.json` from `ZAI_CODING_API_KEY` / `ZAI_DEFAULT_*_MODEL`, whitelists those GLM ids (default `glm-5.3` + `glm-5.3-flash`), declares image modalities for vision attachments, and launches with `--auto`.

`codex-glm` writes `~/.codex/glm.config.toml` + `~/.codex/glm-models.json` from the same Z.AI env and launches with `codex -p glm`. It uses Z.AI's Codex Responses endpoint (`https://api.z.ai/api/v1`, not the OpenCode Coding Plan URL) and restricts `/model` to the configured GLM ids. See [Z.AI Codex docs](https://docs.z.ai/devpack/tool/codex).

`pi-glm` upserts a `zai-glm` provider into `~/.pi/agent/models.json` (OpenAI-compatible Coding Plan URL) with only the configured GLM ids, then launches `pi --provider zai-glm`. See [Pi](https://pi.dev/) · [Pi providers](https://pi.dev/docs/latest/providers).

Plain `claude` and `claudex` continue to use your Anthropic auth unchanged.

## xAI / Grok (optional)

Use [console.x.ai](https://console.x.ai/) API credits with OpenCode, Cline, and Pi (plus Codex / Claude Code wrappers). Docs: [xAI quickstart](https://docs.x.ai/developers/quickstart) · [models](https://docs.x.ai/developers/models).

### Setup

1. Create an API key in the xAI console and add it to `docker/local/dwpwebsite/.env`:

   ```bash
   XAI_API_KEY=your-xai-api-key
   # optional defaults:
   # XAI_MODEL_DAILY=grok-4.3
   # XAI_MODEL_REASONING=grok-4.6
   # XAI_DEFAULT_MODEL=grok-4.3
   ```

2. Open a fresh shell (every new bash re-reads `.env` — no rebuild or restart needed), then:

   ```bash
   opencodex-xai   # OpenCode (provider xai, whitelist daily/reasoning)
   cline-xai       # Cline (openai-compatible → api.x.ai/v1)
   pi-xai          # Pi (xai-grok custom provider)
   codex-xai       # Codex (-p xai, Responses API)
   # No claudex-xai (xAI has no Anthropic-compatible endpoint; see tmp/claude-xai-not-supported.md)
   ```

`opencodex-xai` / `pi-xai` whitelist only `XAI_MODEL_DAILY` + `XAI_MODEL_REASONING` (defaults `grok-4.3` / `grok-4.6`) and enable image modalities. Codex uses xAI's OpenAI Responses endpoint. Claude Code via xAI is not supported (xAI does not expose a compatible Anthropic Messages endpoint; see tmp/claude-xai-not-supported.md).

## Azure OpenAI / Foundry (optional)

Use your Azure Foundry **GPT** deployments with OpenCode, Cline, Codex, and Pi. This is the path for `gpt-5.4-azure` / `gpt-5.4-mini-azure`.

Docs: [OpenCode Azure](https://opencode.ai/docs/providers/#azure-openai) · [Codex + Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/codex) · [Pi providers](https://pi.dev/docs/latest/providers).

### Setup

1. Edit `docker/local/dwpwebsite/.env` (same values as Cursor → Azure OpenAI):

   ```bash
   AZURE_OPENAI_RESOURCE=dailybot-ai-prod-proj-resource
   AZURE_OPENAI_BASE_URL=https://dailybot-ai-prod-proj-resource.services.ai.azure.com/openai/v1
   AZURE_OPENAI_API_KEY=your-azure-api-key
   AZURE_OPENAI_MODEL_DAILY=gpt-5.4-mini-azure
   AZURE_OPENAI_MODEL_REASONING=gpt-5.4-azure
   ```

2. Fresh shell inside the container, then pick a wrapper:

   ```bash
   opencodex-azure   # OpenCode
   clinex-azure      # Cline
   codex-azure       # Codex CLI (-p azure profile)
   pi-azure          # Pi Coding Agent (azure-foundry provider)
   ```

`codex-azure` writes `~/.codex/azure.config.toml` + `~/.codex/azure-models.json` from `.env` and launches with `codex -p azure` so plain `codex` / `codexx` keep their default auth. It also disables image generation, sets the Foundry imagegen header workaround, and points `model_catalog_json` at a two-entry catalog so `/model` only lists `AZURE_OPENAI_MODEL_DAILY` and `AZURE_OPENAI_MODEL_REASONING`.

`opencodex-azure` writes the Azure provider into `~/.config/opencode/opencode.json` from `.env` (persisted on the `opencode_data` volume), then launches OpenCode with full permissions. It also sets a `whitelist` so `/models` only shows `AZURE_OPENAI_MODEL_DAILY` and `AZURE_OPENAI_MODEL_REASONING` — not the full Azure catalog — and declares `modalities.input: ["text","image"]` so vision attachments are not stripped client-side.

`pi-azure` upserts an `azure-foundry` provider into `~/.pi/agent/models.json` with only those two deployment ids (vision enabled), then launches `pi --provider azure-foundry`.

### Verify

```bash
opencode --version
opencodex-azure
# inside OpenCode: /models → pick azure/gpt-5.4-mini-azure or azure/gpt-5.4-azure
```

### Persistence

Config for `chelper`, OpenCode, and Pi survives rebuilds via named Docker volumes (`chelper_data`, `opencode_data`, `pi_data`), symlinked in the entrypoint to `~/.chelper`, `~/.config/opencode`, `~/.local/share/opencode`, and `~/.pi`.

## Pi Coding Agent (optional)

[Pi](https://pi.dev/) is installed globally as `@earendil-works/pi-coding-agent`. Use the same `.env` keys as the other wrappers:

```bash
pi --version
pi-azure    # Azure Foundry (daily + reasoning only)
pi-glm      # Z.AI GLM (configured GLM ids only)
```

Sessions and `~/.pi/agent/models.json` persist on the `pi_data` volume.

## Herdr (optional)

[Herdr](https://herdr.dev/) is the terminal runtime for coding agents (keeps agent panes alive across detach). Installed via the official installer into `~/.local/bin/herdr`.

```bash
herdr --version
herdr            # launch / reattach
herdr server stop
```

Config and logs live under `~/.config/herdr` and survive rebuilds via the `herdr_data` volume. Docs: [quick start](https://herdr.dev/docs/quick-start/), [install](https://herdr.dev/docs/install/).

Panes are forced to `/bin/bash` (`terminal.default_shell` in `config.toml`) so `~/.bashrc` loads `custom_commands.sh` (`claudex`, `pi-azure`, etc.). New panes/tabs/workspaces default to `new_cwd = "/app"` (repo mount). `ui.mouse_capture = true` so sidebar workspace/tab clicks work when the outer terminal forwards mouse events. All of this is seeded in the Dockerfile and patched by the entrypoint on older volumes. Existing panes keep their old shell/cwd — open a **new** pane/tab after config changes (or `herdr server reload-config`).

## Cline (optional)

Use the Cline CLI with the same persistent session model as the rest of the container. The image installs it with `corepack pnpm add -g cline`, and the container mounts `cline_data` at `~/.cline` so sessions survive rebuilds.

`clinex-azure` seeds Cline's persistent auth/config from `AZURE_OPENAI_*`, then launches with `--yolo`. It uses Cline's **openai-compatible** provider (`-P openai`) — not `openai-native` (which hits `/responses` and triggers Azure's `x-ms-oai-image-generation-deployment` error).

Because Cline has no OpenCode-style `whitelist` and always lists every id from `{baseUrl}/models`, `clinex-azure` starts a tiny local proxy (`docker/cline_azure_models_proxy.py`) that filters `/models` to only `AZURE_OPENAI_MODEL_DAILY` and `AZURE_OPENAI_MODEL_REASONING`, and points Cline's base URL at that proxy.

### Verify

```bash
cline --version
clinex
clinex-azure
```

### Persistence

Sessions, config, and history persist via the `cline_data` named volume mounted at `~/.cline`, with `CLINE_DATA_DIR` pinned to `~/.cline/data`.

## SSH keys from the host

The host's `${HOME}/.ssh` is bind-mounted **read-only** at `~/.ssh_host` inside
the container (see `docker-compose.yaml`). `ssh(1)` needs a *writable* `~/.ssh` —
it appends to `known_hosts` and drops control sockets there — so the mount is
mirrored into `~/.ssh` rather than used directly.

`/usr/local/bin/sync-host-ssh` does the mirroring, and the entrypoint runs it on
**every** container start. It copies every private key, every public key and the
`config` from the host, seeds `known_hosts` once (then leaves it container-owned
and writable), and rebuilds `authorized_keys` from the host public keys so
`herdr --remote` can SSH back in on `host:22022 → container:22`.

The host is the source of truth and the copy is unconditional: a key added on the
host shows up on the next start. Keys generated **inside** the container are
never deleted — only overwritten when the host has a file of the same name.

### `ssh-sync`

The mirror is taken at boot, so a key or a `Host` entry added on the host *while
the container is already running* is not visible yet. Re-run the mirror without
restarting:

```bash
ssh-sync
```

```
  ✓ SSH synced from host: 4 private key(s), 4 public key(s), config, known_hosts
Host SSH material is in sync. Keys available:
  • id_rsa
  • id_rsa_xergioalex
```

### Troubleshooting

| Symptom | Cause |
|---------|-------|
| `Permission denied (publickey)` on `git push` | Key added on the host after the container started — run `ssh-sync`. |
| A `Host` alias from your host config does not resolve | Same: the config is mirrored at boot. Run `ssh-sync`. |
| `⚠ ~/.ssh_host not mounted` on startup | `${HOME}/.ssh` is missing on the host, or `HOME` was unset when `docker compose up` ran. |

Verify a remote authenticates:

```bash
ssh -T git@github.com
```
