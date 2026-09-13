# deepworkplan

Official CLI for [deepworkplan.com](https://deepworkplan.com) — the Deep Work Plan (DWP) methodology site. A thin, read-only, zero-dependency client over the site's public agent API: fetch the canonical adoption prompt, list site sections, read any page as source Markdown, and call the MCP server — without building an API integration first.

## Install

```bash
npm i -g deepworkplan
# or run it once, no install:
npx deepworkplan@latest init
```

Requires Node.js ≥ 18. No dependencies, no telemetry, no shell-outs.

## Commands

### `deepworkplan init`

Print the canonical DWP adoption prompt (the `/init.md` endpoint) — the one-line instruction that makes any repository AI-first with Deep Work Plan.

```bash
deepworkplan init > AGENT_INSTRUCTIONS.md
```

### `deepworkplan sections`

List the main sections of deepworkplan.com from the versioned catalog (`/api/v1/sections.json`) as `path — name: description` lines.

```bash
deepworkplan sections
# / — Home: Overview of the Deep Work Plan methodology.
# /methodology — Methodology: What DWP is, its principles, and how to adopt it.
```

### `deepworkplan read <path>`

Print any page as native source Markdown. The `.md` suffix is resolved like the site does (`/` → `/index.md`, trailing slashes stripped).

```bash
deepworkplan read /methodology
deepworkplan read /es/developers
```

### `deepworkplan open [path]`

Print the browser URL for a path. No network request.

```bash
deepworkplan open /spec
# https://deepworkplan.com/spec
```

### `deepworkplan mcp <method-or-body>`

Call the MCP server at `/api/mcp` (JSON-RPC 2.0). `initialize`, `ping`, and `tools/list` are shorthand methods whose envelopes are built for you; anything else is sent as a raw JSON-RPC body.

```bash
deepworkplan mcp tools/list
deepworkplan mcp '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"read_page","arguments":{"path":"/init"}}}'
```

## Options

| Option | Description |
|--------|-------------|
| `--api <base-url>` | API base URL (default `https://deepworkplan.com`; env `DEEPWORKPLAN_API`) |
| `-h`, `--help` | Show help (offline) |
| `-V`, `--version` | Print the CLI version (offline) |

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | success |
| `1` | usage error (unknown command, bad path, invalid JSON body) |
| `2` | network or HTTP error (`error: <status\|cause> <url>` on stderr) |

## The API behind it

The CLI wraps the documented, read-only, zero-auth agent API of deepworkplan.com:

- Full surface (OpenAPI 3.1): <https://deepworkplan.com/openapi.json>
- Developer & agent portal: <https://deepworkplan.com/developers>
- Versioned catalog: <https://deepworkplan.com/api/v1/index.json>

The CLI follows the site API's `v1` contract: breaking API changes ship only in a new `/api/v{N+1}/` family, and deprecated endpoints answer `Deprecation` and `Sunset` headers at least 180 days before removal.

## Publishing

The CLI ships automatically with website releases: [`release_and_publish.yml`](../.github/workflows/release_and_publish.yml)
**Step 6** publishes this package to npm on every release, guarded by an
idempotence check — it publishes only when the exact version in
`package.json` is not already on the registry, so re-running a release is
safe.

- **To ship a new CLI version:** bump `version` in `cli/package.json` in any
  PR to `main`; the next release publishes it.
- **One-time setup:** add an npm **Automation** token as the `NPM_TOKEN`
  repository secret in GitHub (Settings → Secrets and variables → Actions).
  Without it, Step 6 skips with a warning and the website release proceeds
  unaffected.
- **Manual fallback:** `cd cli && npm publish --access public` (needs an
  npm login with 2FA).

## License

MIT © Dailybot, Inc. — see [LICENSE](./LICENSE).
