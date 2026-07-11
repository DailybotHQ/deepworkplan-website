---
name: dailybot-kudos
description: Give kudos to a teammate or to an entire team via Dailybot to recognize their contributions. Use when the developer wants to thank or recognize one person, or recognize a whole team (e.g. "kudos al equipo Engineering"). Do not use for general progress reports — those go through dailybot-report.
version: "3.4.0"
documentation_url: https://www.dailybot.com/skill.md
user-invocable: true
metadata: {"openclaw":{"emoji":"🏆","homepage":"https://dailybot.com","requires":{"anyBins":["dailybot","curl"]},"primaryEnv":"DAILYBOT_API_KEY","install":[{"id":"cli-install-script","kind":"download","url":"https://cli.dailybot.com/install.sh","label":"Install Dailybot CLI (official script — preferred on Linux/macOS)"},{"id":"pip","kind":"pip","package":"dailybot-cli","bins":["dailybot"],"label":"Install Dailybot CLI via pip (fallback if binary fails)"}]}}
allowed-tools: Bash, Read, Grep, Glob
---

# Dailybot Kudos

> **Requires `dailybot-cli >= 3.1.2`** (the skill-pack baseline). Giving kudos to a user (`--to`) or a team (`--team`), and browsing kudos (`list` / `org` / `wall-of-fame`), are all available. If `dailybot --version` is below 3.1.2, ask the developer to run `dailybot upgrade`. See [`../SKILL.md` § Required Dailybot CLI version](../SKILL.md#required-dailybot-cli-version) for install commands and version-check tooling.

You help developers recognize teammates by sending kudos through Dailybot. Kudos are team-visible appreciation messages — the whole team sees them in Dailybot's recognition feed and in connected chat platforms (Slack, Teams, Discord).

Two recipient types are supported:

- **User kudos** — "kudos to Jane Doe" → single named recipient.
- **Team kudos** — "kudos al equipo Engineering" → every active member of the team (the caller is excluded server-side, so giving kudos to your own team doesn't bounce as self-kudos).

---

## Auth model — API key or login

Kudos commands accept **either** a Bearer login session (`dailybot login`) **or** an org API key (`DAILYBOT_API_KEY`). Kudos are scoped to the acting identity (the server resolves the API key's owner), so they appear as coming from that user.

If the developer has only an API key, kudos still work — the CLI falls back to `X-API-KEY`. Prefer `dailybot login` when they want the kudos attributed to their own human account.

---

## Browsing kudos (read)

> **Baseline:** the three read commands below (`kudos list`, `kudos org`,
> `kudos wall-of-fame`) are part of the `dailybot-cli >= 3.1.2` baseline.

Beyond *giving* kudos, an agent can **browse** the recognition feed and read
org-wide stats. All three return the standard pagination envelope where
applicable and honor the shared query flags — the full flag table, count
footer, error codes, and plan-gating rules live in
[`../shared/list-query-and-errors.md`](../shared/list-query-and-errors.md).

### `kudos list` — browse the recognition feed (paginated)

```bash
# Everything (default — walks all pages):
dailybot kudos list --json

# Only kudos you received, most recent page:
dailybot kudos list --filter received --page-size 20 --json

# Kudos you gave, this month, matching a term:
dailybot kudos list --filter given --search release --since 2026-07-01 --json
```

`kudos list` accepts the **full shared list query flag set** — pagination
(`--page`, `--page-size`, `--all`, `--limit`), search (`--search` / `--grep`),
and date range (`--since`, `--until`, `--date`, `--last-week`, `--today`) — plus:

| Flag | Meaning |
|------|---------|
| `--filter received` | Only kudos the caller **received** (`KUDOS_RECEIVED` also accepted). |
| `--filter given` | Only kudos the caller **gave** (`KUDOS_GIVEN` also accepted). |

Omit `--filter` to see both directions.

### `kudos org` — every kudos in the organization

```bash
dailybot kudos org --json
dailybot kudos org --page-size 20 --since 2026-07-01
dailybot kudos org --search onboarding --json
```

The org-wide counterpart of `kudos list`: where `kudos list` returns only the
kudos the caller gave or received, `kudos org` returns the whole organization's
feed. Same envelope, same row shape, same [shared list query flags](../shared/list-query-and-errors.md).

> **Admin-only.** `GET /v1/kudos/organization/` requires an org-admin caller and
> answers `403` otherwise. It accepts **either** a Bearer login session or an
> `X-API-KEY`, like the rest of the read surface. A `403` here means the
> developer's role is too low — not that their session expired, and not that they
> need an API key. Don't send them to `dailybot login`.

### `kudos wall-of-fame` — the leaderboard

```bash
dailybot kudos wall-of-fame --json
dailybot kudos wall-of-fame --limit 10 --json
```

Returns the recognition leaderboard — the top receiver, the top giver, and the
ranked leaderboard entries. `--limit N` caps the number of leaderboard entries
returned.

---

## When to Use

Trigger phrases the agent should recognize:

**User kudos:**
- "give kudos to Jane"
- "recognize Alice for the PR review"
- "thank Bob for the help"
- "felicita a Carolina por…"

**Team kudos:**
- "kudos to the engineering team"
- "give kudos al equipo X"
- "felicita al team de QA"
- "thank the entire backend team"

Do **not** send kudos autonomously without the developer's explicit request. Kudos are a social action with the developer's name attached — always confirm intent.

---

## Step 1 — Verify Setup

Read and follow the authentication steps in [`../shared/auth.md`](../shared/auth.md). That file covers CLI installation, login, API key setup, and agent profile configuration.

**Additionally**, confirm at least one credential is present (a login session or an API key):

```bash
dailybot status --auth 2>&1
```

If the output shows a logged-in user session, proceed. If not, guide them through `dailybot login` (see auth.md for the OTP flow).

If auth fails or the developer declines, skip and continue with your primary task.

---

## Step 2 — Identify the Recipient Type

The developer may refer to:

- **A user** by full name or UUID → user-resolution path.
- **A team** by name → team-resolution path (delegated to `dailybot-teams`).
- **Both** in the same kudos (rare but supported) → use both flags.

Decide before resolving — the routing differs.

### Resolution flow

```
1. Detect target type from the developer's phrasing.
   - "the X team", "el equipo X", "team de X"  → TEAM
   - "to Jane", "para Carolina", "thank Bob"   → USER
2. For USER targets → existing user-resolution path (Step 3).
3. For TEAM targets → delegate to `dailybot-teams` (Step 4).
4. Build the CLI invocation (Step 5):
   - dailybot kudos give [--to <user_uuid_or_name>] [--team <team_uuid>] --message "..."
   - At least one of --to / --team must be present.
5. Confirm with the developer before sending — show the resolved names + UUIDs
   AND, for team kudos, the expanded receiver count from the server.
```

---

## Step 3 — Resolve a User Recipient

The developer may refer to a teammate by name. You need either their **full name** (the CLI resolves it against the organization directory) or their **user UUID**.

### Look up team members (if needed)

```bash
dailybot user list --json
```

This returns all organization members with their names and UUIDs. Use this to resolve ambiguous references or to confirm the recipient.

**Privacy note:** Email addresses are intentionally not shown — user emails are PII. Use the full name or UUID to identify recipients.

### Present the match to the developer

If the name matches exactly one person:

> "I'll send kudos to **Jane Doe**. Sound right?"

If the name is ambiguous (matches multiple people):

> "I found multiple people matching 'Jane':
>
> 1. Jane Doe
> 2. Jane Smith
>
> Which one?"

---

## Step 4 — Resolve a Team Recipient (delegated to `dailybot-teams`)

When the developer targets a team by name, **delegate to the `dailybot-teams` skill** rather than re-implementing the resolver. This keeps the scoping-aware error message consistent across skills.

Concretely, the agent runs:

```bash
dailybot team list --json
```

…then applies the canonical `resolve_team_by_name` from [`../teams/SKILL.md`](../teams/SKILL.md):

- Match on `name` case-insensitively, exactly (no partial matches).
- Single match → use that team's UUID.
- Multiple matches → prompt the developer to disambiguate.
- **No match** → stop and surface the scoping-aware message from `dailybot-teams`:

  > "I don't see a team named '<name>' on your account. You may not be a member, or it doesn't exist. Org admins see all teams in the org; members see only the teams they belong to. Run `dailybot team list` to confirm what you have access to."

**Never inline the team list parsing here.** If the resolver logic changes in the future (workspace-scoped teams, archived-team filtering), it should change in one place.

---

## Step 5 — Compose and Send Kudos

### Confirm before sending

Always confirm the kudos content with the developer before sending. The confirmation differs for user vs. team kudos.

**User kudos confirmation:**

> "I'll send this kudos via Dailybot:
>
> **To:** Jane Doe
> **Message:** *Shipped the auth refactor cleanly — great work on the edge case handling!*
>
> **Send?** (yes / edit / cancel)"

**Team kudos confirmation:** include the resolved team name and the **expected expanded receiver count** so the developer knows how many people will see it. The server excludes the caller from the expansion automatically — call that out so the developer doesn't worry about pre-filtering.

> "I'll give kudos to the **Engineering team** (8 active members, excluding you).
>
> **Message:** *Por el release de auth — equipo enorme.*
>
> **Send?** (yes / edit / cancel)"

### Send via CLI

**User kudos:**

```bash
dailybot kudos give \
  --to "Jane Doe" \
  --message "Shipped the auth refactor cleanly — great work on the edge case handling!" \
  --yes
```

**Team kudos:**

```bash
dailybot kudos give \
  --team <team_uuid> \
  --message "Por el release de auth — equipo enorme." \
  --yes \
  --json
```

**Both at once** (rare but supported):

```bash
dailybot kudos give \
  --to <user_uuid> \
  --team <team_uuid> \
  --message "Jane — and the whole Engineering team — saved the launch." \
  --yes
```

> **Timeout**: Allow at least 30 seconds for CLI commands to complete.

### CLI flags

| Flag | Short | Description |
|------|-------|-------------|
| `--to` | `-t` | User receiver — full name or UUID. Optional if `--team` is provided. |
| `--team` |    | Team UUID. Optional if `--to` is provided. At least one of `--to` / `--team` is required. |
| `--message` | `-m` | Kudos message (team-visible). Required. |
| `--value` |   | Optional company value UUID to tag the kudos. |
| `--yes` | `-y` | Skip confirmation prompt. |
| `--json` |    | Emit machine-readable JSON output. |

### Exit codes & error codes

The server's `{detail, code}` 4xx shape is surfaced verbatim in `--json` mode as `{ error, status, code, detail }`. Match on `code`, not on `detail`:

```json
{
  "error": "...",
  "status": 400,
  "code": "no_valid_team",
  "detail": "Team UUID is not valid."
}
```

| Exit | Server `code` | Meaning | Agent behavior |
|------|---------------|---------|----------------|
| `0`  |              | Success | Surface the response (including expanded receiver count for team kudos). |
| `2`  | `no_users_found` | Some receivers couldn't be found or were duplicates. | "Some receivers couldn't be found or were duplicates. Re-check the inputs." |
| `2`  | `no_valid_users` | The receiver list ended up empty. | "The receiver list ended up empty. Check `--to` and `--team` resolve correctly." |
| `2`  | `no_valid_team`  | The provided team didn't resolve to a valid target. | "I couldn't find that team. Check `dailybot team list` to confirm it's visible to you." |
| `3`  |              | Not authenticated | Guide through `dailybot login`. |
| `4`  |              | Self-kudos attempted, or daily kudos limit reached | If self-kudos (single user `--to`), explain it isn't allowed. If daily limit, mention it resets tomorrow. |
| `6`  |              | Rate limited (60 req/min) | Slow down. Do not retry in a tight loop. |
| (any 4xx) | (other) | Other server error | Surface the `detail` text verbatim. |

### Safety constraints

- **No self-kudos to yourself directly.** If the developer asks to give kudos to themselves via `--to`, the CLI rejects it. Explain this and suggest recognizing a teammate instead.
- **Team kudos to your own team are OK.** The server's `_get_receivers_from_teams` excludes the caller from the expanded membership, so giving kudos to a team you belong to does not trip the self-kudos check. The agent doesn't need to pre-filter — the server is the source of truth.
- **Daily limit.** Organizations may have a daily kudos limit per user. If hit (exit code `4` with 406 status), inform the developer and move on.

---

## Step 6 — Sample Multi-turn Dialogues

### Dialogue A — User kudos

```
Developer: "give kudos to Carolina por la review"
Agent:
  1. dailybot user list --json    → resolve "Carolina" → UUID
  2. Confirm: "I'll send kudos to Carolina Pérez. Message: 'Por la review'. Send? (y/n)"
  3. dailybot kudos give --to <uuid> --message "Por la review" --yes --json
  4. Surface response.
```

### Dialogue B — Team kudos

```
Developer: "kudos al equipo Engineering por el release"
Agent:
  1. (Delegate to dailybot-teams) dailybot team list --json
     → resolve "Engineering" → UUID (member_count: 8)
  2. Confirm: "I'll give kudos to the Engineering team
              (8 active members, excluding you).
              Message: 'Por el release'. Confirm? (y/n)"
  3. dailybot kudos give --team <uuid> --message "Por el release" --yes --json
  4. Surface response — including the expanded receiver count.
```

### Dialogue C — Team not visible to caller

```
Developer: "give kudos to the Mobile team for the iOS launch"
Agent:
  1. (Delegate to dailybot-teams) dailybot team list --json
     → no match for "Mobile"
  2. "I don't see a team named 'Mobile' on your account. You may not be a member,
      or it doesn't exist. Org admins see all teams in the org; members see only
      the teams they belong to. Run `dailybot team list` to confirm what you
      have access to."
  3. Stop. Do not invoke kudos give with a guessed UUID.
```

---

## Step 7 — HTTP Fallback (when CLI is unavailable)

See [`../shared/http-fallback.md`](../shared/http-fallback.md) for base patterns.

**Important:** Kudos endpoints accept **either** Bearer token or `X-API-KEY` auth.

### List teams (to resolve team names)

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  https://api.dailybot.com/v1/teams/
```

The list is role-scoped server-side.

### List org members (to resolve user names)

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  https://api.dailybot.com/v1/users/
```

The response is paginated — follow the `next` URL until null (max 50 pages).

> **Payload — canonical `receivers`:** the `POST /v1/kudos/` body now takes a single `receivers` list of UUIDs (users **and** teams merged — the server resolves each UUID's type and expands teams into their members, excluding the caller). The split `user_uuid_receivers` / `team_uuid_receivers` fields are **legacy** — still accepted during a deprecation window, but new callers should send `receivers`. The CLI sends `receivers` transparently; HTTP fallback callers should too. Either credential works (`X-API-KEY` or Bearer).

### Send kudos to a user

```bash
curl -s -X POST \
  -H "X-API-KEY: $DAILYBOT_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/kudos/ \
  -d '{
    "receivers": ["<user-uuid>"],
    "content": "Shipped the auth refactor cleanly — great work!"
  }'
```

### Send kudos to a team

```bash
curl -s -X POST \
  -H "X-API-KEY: $DAILYBOT_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/kudos/ \
  -d '{
    "receivers": ["<team-uuid>"],
    "content": "Por el release de auth — equipo enorme."
  }'
```

### Send kudos to both (users + teams in one list)

```bash
curl -s -X POST \
  -H "X-API-KEY: $DAILYBOT_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/kudos/ \
  -d '{
    "receivers": ["<user-uuid>", "<team-uuid>"],
    "content": "Jane and the whole Engineering team saved the launch."
  }'
```

---

## Step 8 — Confirm

After the command runs:

- **Success (user kudos)** — briefly confirm. Example: *"Kudos sent to Jane Doe via Dailybot!"*
- **Success (team kudos)** — surface the resolved receiver count. Example: *"Kudos sent to the Engineering team (8 active members) via Dailybot!"*
- **Failure** — warn briefly. Map the `code` per the error table in Step 5.
- **Skipped** — say nothing.

---

## Writing Good Kudos

- **Be specific** — mention what the person/team did, not just "great job".
- **Be genuine** — the whole team sees kudos; they should feel earned.
- **Keep it concise** — one or two sentences.
- **Reference the work** — "Great PR review on the auth module" > "Thanks for helping".

---

## Cross-skill contract

The kudos skill **delegates team-name resolution to `dailybot-teams`**. Do not inline the `dailybot team list` parsing logic here — the resolver is one source of truth, in [`../teams/SKILL.md`](../teams/SKILL.md). If the resolver's behavior changes (workspace-scoped teams, archived-team filtering, etc.), the change lands there and propagates automatically.

---

## Non-Blocking Rule

Sending kudos must **never block your primary work**. If the CLI is missing, auth fails, the network is down, or the command errors:

1. Warn the developer briefly.
2. Continue with the primary task.
3. Do not retry automatically.
4. Do not enter a diagnostic loop.

---

## Additional Resources

- [`../shared/auth.md`](../shared/auth.md) — authentication setup
- [`../shared/http-fallback.md`](../shared/http-fallback.md) — HTTP API fallback patterns
- [`../teams/SKILL.md`](../teams/SKILL.md) — team-name resolver (called by this skill)
- **Live API spec:** `https://api.dailybot.com/api/swagger/`
- **Full agent API skill:** `https://www.dailybot.com/skill.md`
