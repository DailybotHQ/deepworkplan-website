# Local Docker development stack

Dev container for deepworkplan.com: Node, pnpm, Claude Code, Codex, Cursor CLI, Dailybot CLI, and optional Z.AI GLM Coding Plan support.

## Quick start

```bash
cd docker/local
bash setup.sh
docker compose build
docker compose up -d
```

Attach to the dev container (VS Code Dev Containers, or `docker compose exec dwpwebsitevscode bash`).

## Z.AI GLM Coding Plan (optional)

Use [Z.AI GLM Coding Plan](https://docs.z.ai/devpack/quick-start) alongside the default Anthropic-backed `claude` / `claudex` commands. Wrappers inject auth and model mapping **only for that process** — nothing is written to `~/.claude/settings.json`.

### Setup

1. Copy or edit `docker/local/dwpwebsite/.env` and set your Coding Plan API key ([manage API keys](https://z.ai/manage-apikey/apikey-list)):

   ```bash
   ZAI_CODING_API_KEY=your-key-here
   ```

2. Rebuild and restart the dev container:

   ```bash
   cd docker/local
   docker compose build
   docker compose up -d
   ```

3. Open a **fresh shell** inside the container (or `source /app/docker/custom_commands.sh`).

### Commands

| Command | Description |
|---------|-------------|
| `claude-glm` | Claude Code via Z.AI (`https://api.z.ai/api/anthropic`) |
| `claudex-glm` | Same, with `--dangerously-skip-permissions` (mirrors `claudex`) |
| `chelper` | Z.AI Coding Tool Helper wizard |
| `opencode` | OpenCode CLI — run `opencode auth login` and select **Z.AI Coding Plan** |

Plain `claude` and `claudex` continue to use your Anthropic auth unchanged.

### Model mapping

Opus/Sonnet/Haiku aliases are remapped to GLM **only** when using `claude-glm` / `claudex-glm`:

| Env var | Default |
|---------|---------|
| `ZAI_DEFAULT_OPUS_MODEL` | `glm-5.3` |
| `ZAI_DEFAULT_SONNET_MODEL` | `glm-5.3` |
| `ZAI_DEFAULT_HAIKU_MODEL` | `glm-5.3-flash` |

See [latest model mapping](https://docs.z.ai/devpack/latest-model). For 1M context, set models to e.g. `glm-5.3[1m]` and `ZAI_CODING_AUTO_COMPACT_WINDOW=1000000`.

### Verify

In a **new** `claude-glm` session, run `/status`:

- **Anthropic base URL** must be `https://api.z.ai/api/anthropic`
- The **Model** line may still show a Claude-looking alias; traffic routing is determined by the base URL and process-scoped `ANTHROPIC_DEFAULT_*_MODEL` env vars

After changing wrappers or model env vars, exit the old session and start a new one with `claude-glm` or `claudex-glm`.

### Persistence

Config for `chelper` and OpenCode survives rebuilds via named Docker volumes (`chelper_data`, `opencode_data`), symlinked in the entrypoint to `~/.chelper`, `~/.config/opencode`, and `~/.local/share/opencode`.
