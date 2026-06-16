---
name: dailybot-teams
description: Read and resolve teams visible to the authenticated user. Use when the developer references a team by name (for kudos targeting, member lookup, or routing context) and an agent needs to obtain its UUID. Other Dailybot skills (kudos, messages) delegate team-name resolution to this skill rather than duplicating the logic.
version: "1.7.1"
documentation_url: https://api.dailybot.com/skill.md
user-invocable: true
metadata: {"openclaw":{"emoji":"👥","homepage":"https://dailybot.com","requires":{"anyBins":["dailybot","curl"]},"primaryEnv":"DAILYBOT_API_KEY","install":[{"id":"cli-install-script","kind":"download","url":"https://cli.dailybot.com/install.sh","label":"Install Dailybot CLI (official script — preferred on Linux/macOS)"},{"id":"pip","kind":"pip","package":"dailybot-cli","bins":["dailybot"],"label":"Install Dailybot CLI via pip (fallback if binary fails)"}]}}
allowed-tools: Bash, Read, Grep, Glob
---

# Dailybot Teams

> **Requires `dailybot-cli >= 1.10.0`** ([PyPI](https://pypi.org/project/dailybot-cli/1.10.0/), released 2026-05-26). `dailybot team list` and `dailybot team get` ship in CLI 1.10.0 — earlier versions don't expose the team commands at all. If `dailybot --version` reports below 1.10.0, ask the developer to run `dailybot upgrade`. See [`../SKILL.md` § Required Dailybot CLI version](../SKILL.md#required-dailybot-cli-version) for install commands and version-check tooling.

You help agents resolve and read teams visible to the logged-in user. Teams are how Dailybot groups people inside an organization — they're the targets for team-scoped kudos, the routing context for some messages, and the source of truth for "who's in X?".

This skill is primarily a **resolver dependency** for other Dailybot skills (most notably `dailybot-kudos`, which uses it to turn "kudos al equipo Engineering" into a team UUID). It also handles direct developer asks like "list my teams" or "who's in QA?".

---

## Auth model — user-scoped commands

Team-read commands require a **Bearer token** (user session), not an API key. The developer must be logged in via `dailybot login`. This scopes results to the logged-in human's permissions — they only see teams the server allows them to see.

If the developer only has an API key (`DAILYBOT_API_KEY`), guide them through `dailybot login` first. API keys authenticate agent-scoped endpoints (`dailybot agent ...`), not user-scoped ones.

---

## Security & scoping — read this before listing teams

The server applies **role-based scoping** to every team-related read:

- **Org admins** see all teams in their organization.
- **Members and guests** see only the teams they belong to (`teammembership_set`).

This scoping is enforced server-side by `IsTeamMemberOrAdmin` + `PublicTeamsAPIView.get_queryset`. The skill MUST NOT attempt to widen visibility client-side. Trust the server's response verbatim.

If the developer asks about a team the agent does not see in the role-scoped list, the correct response is:

> "I don't see a team named '<name>' on your account. You may not be a member, or it doesn't exist. Org admins see all teams in the org; members see only the teams they belong to. Run `dailybot team list` to confirm what you have access to."

Never imply the team doesn't exist — only that it isn't visible to this caller.

---

## When to Use

- Another Dailybot skill asks "what's the UUID of the team named X?" (resolver delegation).
- The developer asks "what teams am I in?", "list my teams", "show org teams".
- The developer asks "who's in the Engineering team?", "members of QA".
- Before any `dailybot kudos give --team ...` invocation, to resolve the team name → UUID.

Do **not** use this skill to enumerate org members when the goal is to recognize a single person — route that through `dailybot-kudos` (which uses the user directory). Use teams for *team-scoped* operations.

---

## Step 1 — Verify Setup

Read and follow the authentication steps in [`../shared/auth.md`](../shared/auth.md). That file covers CLI installation, login, API key setup, and agent profile configuration.

**Additionally**, verify the developer has a user session (Bearer token):

```bash
dailybot status --auth 2>&1
```

If the output shows a logged-in user session, proceed. If not, guide them through `dailybot login` (see auth.md for the OTP flow). Team commands will not work with only an API key.

If auth fails or the developer declines, skip and continue with your primary task.

---

## Step 2 — List Teams

```bash
dailybot team list --json
```

Returns the **role-scoped** list of teams visible to the caller. Trust the response verbatim — do not attempt to widen the result.

### JSON output shape

```json
[
  {
    "uuid": "<team-uuid>",
    "name": "Engineering",
    "member_count": 12
  },
  {
    "uuid": "<team-uuid>",
    "name": "QA",
    "member_count": 4
  }
]
```

If the list is empty:

> "You don't have any teams visible. As a member, you only see teams you belong to. If you expected a team here, ask an org admin to add you."

---

## Step 3 — Resolve a Team by Name → UUID (canonical resolver)

This is the resolver other skills call into. Implement it once, here, and surface scoping-aware error messages consistently:

```python
def resolve_team_by_name(name):
    teams = cli_call("dailybot team list --json")  # role-scoped server-side
    matches = [t for t in teams if t["name"].lower() == name.lower()]
    if not matches:
        return None  # caller surfaces the scoping message (see "Security & scoping" above)
    if len(matches) > 1:
        return prompt_user_to_disambiguate(matches)
    return matches[0]["uuid"]
```

### Behavior rules

- Match on `name` **case-insensitively** but exactly (no partial matches). "engineering" matches "Engineering"; "eng" does not.
- **Never guess a UUID.** If the name doesn't resolve uniquely, prompt the developer to pick from the disambiguation list.
- **Never call into the server with a guessed UUID.** If the resolver returns `None`, the calling skill stops and surfaces the scoping message.
- When using `dailybot team get <name>` directly, the CLI exits with code `2` on an ambiguous name match — interpret that as "prompt the developer to disambiguate", not as a generic error.
- If multiple teams have the same name (rare — same org allows duplicates only across spaces), present them to the developer:

  > "I found 2 teams named 'QA':
  >
  > 1. QA — 4 members
  > 2. QA (Mobile) — 3 members
  >
  > Which one?"

---

## Step 4 — Inspect a Team

```bash
dailybot team get <team_uuid_or_name> --with-members --json
```

Returns the team plus its membership when `--with-members` is set. Useful when the agent needs context like "who's in QA before I send them a message?".

### JSON output shape (with members)

```json
{
  "uuid": "<team-uuid>",
  "name": "Engineering",
  "member_count": 12,
  "members": [
    {"uuid": "<user-uuid>", "full_name": "Carolina Pérez"},
    {"uuid": "<user-uuid>", "full_name": "Sergio Florez"}
  ]
}
```

**Privacy note:** Email addresses are intentionally not returned — user emails are PII. Use the full name or UUID to identify members.

### When to surface members vs. counts

| Developer ask | What to show |
|---------------|--------------|
| "How big is the Engineering team?" | Just `member_count`. |
| "Who's in the Engineering team?" | The `members` list (names only). |
| "Is Alice in QA?" | The `members` list, then answer based on it. |

---

## Step 5 — Cross-skill Resolver Convention

When another Dailybot skill (notably `dailybot-kudos`) needs a team UUID from a name, it MUST go through this skill — not duplicate the `dailybot team list` parsing.

Document the contract:

> Any other skill that needs to resolve a team name calls into `dailybot-teams` rather than re-implementing the resolver. Centralizing it keeps the scoping-aware error message consistent across skills, and ensures that future changes to how visibility is enforced (e.g. workspace-scoped teams, archived-team filtering) propagate everywhere automatically.

Concretely: a calling skill should invoke the same `dailybot team list --json` command this skill uses, and apply the same matching algorithm. The calling skill should NOT cache the team list across invocations — visibility may change between sessions.

---

## Step 6 — HTTP Fallback (when CLI is unavailable)

See [`../shared/http-fallback.md`](../shared/http-fallback.md) for base patterns.

**Important:** Team endpoints use **Bearer token** auth, not API key auth.

### List teams (role-scoped)

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  https://api.dailybot.com/v1/teams/
```

### Get a single team (with members)

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  "https://api.dailybot.com/v1/teams/<team_uuid>/?include=members"
```

The server applies the same role-based scoping as the CLI — no client-side widening.

---

## Step 7 — Confirm

- **Success** — surface the resolved team or the requested information directly.
- **Failure** — warn briefly. If the team is not in the role-scoped list, use the scoping message from the "Security & scoping" section.
- **Skipped** — say nothing.

---

## Non-Blocking Rule

Team operations must **never block your primary work**. If the CLI is missing, auth fails, the network is down, or any command errors:

1. Warn the developer briefly.
2. Continue with the primary task (or, if invoked as a resolver, return `None` to the calling skill).
3. Do not retry automatically.
4. Do not enter a diagnostic loop.

---

## Additional Resources

- [`../shared/auth.md`](../shared/auth.md) — authentication setup
- [`../shared/http-fallback.md`](../shared/http-fallback.md) — HTTP API fallback patterns
- [`../kudos/SKILL.md`](../kudos/SKILL.md) — primary consumer of this skill's resolver
- **Live API spec:** `https://api.dailybot.com/api/swagger/`
- **Full agent API skill:** `https://api.dailybot.com/skill.md`
