---
name: dailybot-checkin
description: List and complete pending check-ins for the developer via Dailybot. Use when the developer asks to fill in their standup, answer daily questions, or complete a pending check-in. Do not use for free-text progress reports — those go through dailybot-report.
version: "1.7.1"
documentation_url: https://api.dailybot.com/skill.md
user-invocable: true
metadata: {"openclaw":{"emoji":"✅","homepage":"https://dailybot.com","requires":{"anyBins":["dailybot","curl"]},"primaryEnv":"DAILYBOT_API_KEY","install":[{"id":"cli-install-script","kind":"download","url":"https://cli.dailybot.com/install.sh","label":"Install Dailybot CLI (official script — preferred on Linux/macOS)"},{"id":"pip","kind":"pip","package":"dailybot-cli","bins":["dailybot"],"label":"Install Dailybot CLI via pip (fallback if binary fails)"}]}}
allowed-tools: Bash, Read, Grep, Glob
---

# Dailybot Check-in

You help developers complete their pending check-ins (daily standups, weekly surveys, async rituals) through Dailybot. Check-ins are structured questionnaires set up by a team lead — each has a set of questions that the developer answers. This is distinct from free-text progress reports (handled by `dailybot-report`).

---

## Auth model — user-scoped commands

Check-in commands require a **Bearer token** (user session), not an API key.
The developer must be logged in via `dailybot login`. This is the same
session used by the webapp — it scopes actions to the logged-in human's
permissions and pending check-ins.

If the developer only has an API key (`DAILYBOT_API_KEY`), guide them through
`dailybot login` first. API keys authenticate agent-scoped endpoints
(`dailybot agent ...`), not user-scoped ones.

---

## When to Use

- The developer asks "complete my check-in", "fill in my standup", "answer my dailybot"
- The developer asks "what check-ins do I have?", "any pending standups?"
- At the start of a work session when the developer wants to catch up on rituals

Do **not** use this skill for free-text progress reports — route those to
`dailybot-report` instead. Check-ins are structured questionnaires with
specific questions; reports are freeform updates.

---

## Step 1 — Verify Setup

Read and follow the authentication steps in [`../shared/auth.md`](../shared/auth.md). That file covers CLI installation, login, API key setup, and agent profile configuration.

**Additionally**, verify the developer has a user session (Bearer token):

```bash
dailybot status --auth 2>&1
```

If the output shows a logged-in user session, proceed. If not, guide them
through `dailybot login` (see auth.md for the OTP flow). Check-in commands
will not work with only an API key.

If auth fails or the developer declines, skip and continue with your primary task.

---

## Step 2 — List Pending Check-ins

```bash
dailybot checkin list --json
```

This returns today's pending check-ins for the logged-in user.

### JSON output shape

```json
{
  "count": 1,
  "pending_checkins": [
    {
      "followup_name": "Daily Standup",
      "followup_uuid": "<uuid>",
      "template_questions": [
        {
          "uuid": "<question-uuid>",
          "question": "What did you complete yesterday?",
          "question_type": "text_field",
          "is_blocker": false,
          "index": 0
        }
      ]
    }
  ]
}
```

### Present check-ins to the developer

When check-ins are found, summarize them clearly:

> "You have **1 pending check-in** via Dailybot:
>
> 1. **Daily Standup** — 3 questions
>    - What did you complete yesterday?
>    - What are you working on today?
>    - Any blockers?
>
> Want me to help you fill it in?"

When no check-ins are found:

> "No pending check-ins right now. You're all caught up."

---

## Step 3 — Complete a Check-in

Once the developer wants to complete a check-in, you have two approaches:

### 3a. Gather answers from context (recommended for agents)

Use what you know about the developer's recent work to draft answers, then
confirm before submitting. This is the best experience — the developer
reviews and approves rather than typing everything.

> "Based on your recent work, here's what I'd submit for **Daily Standup**:
>
> 1. *What did you complete yesterday?* — "Shipped the auth refactor with full test coverage"
> 2. *What are you working on today?* — "Starting the payment integration"
> 3. *Any blockers?* — "None"
>
> **Should I submit these answers?** (yes / edit / skip)"

### 3b. Ask the developer for each answer

If you don't have enough context, ask for each answer individually:

> "For your **Daily Standup**:
>
> 1. What did you complete yesterday?"

Wait for each answer, then confirm before submitting.

### Submit via CLI (non-interactive)

```bash
dailybot checkin complete <followup_uuid> \
  -a 0="Shipped the auth refactor with full test coverage" \
  -a 1="Starting the payment integration" \
  -a 2="None" \
  --yes
```

> **Timeout**: Allow at least 30 seconds for CLI commands to complete. Do not use a shorter timeout.

### CLI flags

| Flag | Short | Description |
|------|-------|-------------|
| `--answer` | `-a` | `index=response` pair (0-based question index). Repeatable. |
| `--response-date` | | Target date `YYYY-MM-DD`. Defaults to today. |
| `--yes` | `-y` | Skip confirmation prompt. |
| `--json` | | Emit machine-readable JSON output. |

### Exit codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `3` | Not authenticated — guide through `dailybot login` |
| `7` | User aborted the confirmation prompt |

---

## Step 4 — HTTP Fallback (when CLI is unavailable)

See [`../shared/http-fallback.md`](../shared/http-fallback.md) for base patterns.

**Important:** Check-in endpoints use **Bearer token** auth, not API key auth.

### List pending check-ins

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  https://api.dailybot.com/v1/cli/status/
```

### Complete a check-in

```bash
curl -s -X POST \
  -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/checkins/<followup_uuid>/responses/ \
  -d '{
    "responses": [
      {"uuid": "<question-uuid>", "index": 0, "response": "Shipped the auth refactor"},
      {"uuid": "<question-uuid>", "index": 1, "response": "Starting payment integration"},
      {"uuid": "<question-uuid>", "index": 2, "response": "None"}
    ],
    "last_question_index": 2
  }'
```

### Obtaining a Bearer token programmatically

```bash
# Step 1 — request OTP
curl -s -X POST https://api.dailybot.com/v1/cli/request-code/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'

# Step 2 — verify OTP (returns token)
curl -s -X POST https://api.dailybot.com/v1/cli/verify-code/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","code":"123456"}'
# → {"token":"<bearer-token>","organization":"Org Name"}
```

---

## Step 5 — Confirm

After the command runs:

- **Success** — briefly confirm. Example: *"Submitted your Daily Standup check-in to Dailybot."*
- **Failure** — warn briefly. If not authenticated (exit code 3), suggest `dailybot login`.
- **Skipped** — say nothing.

---

## Non-Blocking Rule

Check-in completion must **never block your primary work**. If the CLI is missing, auth fails, the network is down, or the command errors:

1. Warn the developer briefly
2. Continue with the primary task
3. Do not retry automatically
4. Do not enter a diagnostic loop

---

## Additional Resources

- [`../shared/auth.md`](../shared/auth.md) — authentication setup
- [`../shared/http-fallback.md`](../shared/http-fallback.md) — HTTP API fallback patterns
- **Live API spec:** `https://api.dailybot.com/api/swagger/`
- **Full agent API skill:** `https://api.dailybot.com/skill.md`
