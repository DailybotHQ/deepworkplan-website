---
name: dailybot-forms
description: List, inspect, submit, update, and transition form responses via Dailybot — including forms with workflow states and audience-scoped permissions. Use when the developer wants to see available forms, fill out a survey, continue an in-progress response, move a response between states, or read prior responses. Do not use for daily check-ins — those go through dailybot-checkin.
version: "1.7.1"
documentation_url: https://api.dailybot.com/skill.md
user-invocable: true
metadata: {"openclaw":{"emoji":"📋","homepage":"https://dailybot.com","requires":{"anyBins":["dailybot","curl"]},"primaryEnv":"DAILYBOT_API_KEY","install":[{"id":"cli-install-script","kind":"download","url":"https://cli.dailybot.com/install.sh","label":"Install Dailybot CLI (official script — preferred on Linux/macOS)"},{"id":"pip","kind":"pip","package":"dailybot-cli","bins":["dailybot"],"label":"Install Dailybot CLI via pip (fallback if binary fails)"}]}}
allowed-tools: Bash, Read, Grep, Glob
---

# Dailybot Forms

> **Requires `dailybot-cli >= 1.10.0`** ([PyPI](https://pypi.org/project/dailybot-cli/1.10.0/), released 2026-05-26). The lifecycle commands (`form get`, `form responses`, `form response get`, `form update`, `form transition`, `form delete`) and the structured `--json` 4xx error shape ship in CLI 1.10.0 — earlier versions only expose `form list` and `form submit`. If `dailybot --version` reports below 1.10.0, ask the developer to run `dailybot upgrade`. See [`../SKILL.md` § Required Dailybot CLI version](../SKILL.md#required-dailybot-cli-version) for the full rationale, install commands, and version-check tooling.

You help developers work with the full Dailybot forms lifecycle: list, inspect, submit, update, transition between workflow states, and read prior responses. Forms are custom questionnaires created by team leads — feedback surveys, retrospectives, release checklists, approval flows, or any structured data collection. Some forms are simple "fill once and done"; others have **workflow states** (e.g. `draft → review → released`) with audience-scoped permissions on who can edit and who can transition.

This skill is distinct from daily check-ins (handled by `dailybot-checkin`) and free-text reports (handled by `dailybot-report`).

---

## Upgrade-safety contract — read this before editing forms behavior

This SKILL.md is the **universal** forms skill. It is overwritten on every upgrade of the Dailybot skill pack (managed by `skills-lock.json`). Two rules keep customer customizations safe:

| MUST | MUST NOT |
|------|----------|
| Read `.dailybot/profile.json` and honor `vars.custom_form_skills`. | Write anything outside `.agents/skills/dailybot/`. |
| Defer to a custom skill when the resolver finds a mapping. | Read, modify, or scan files under `.agents/skills/dailybot-custom/` or any other customer-owned namespace. |
| Warn (do not error) when a registered custom-skill path is missing on disk — fall back to the generic flow. | Send `.dailybot/profile.json` contents (especially `vars`) in any report / payload to the server. |
| Document this contract verbatim here. | Embed customer-specific logic in this universal skill — if you find yourself writing `if form.name == "Release Form":`, the right answer is a custom skill under `.agents/skills/dailybot-custom/`. |

Customer-authored form skills live at `.agents/skills/dailybot-custom/<name>/SKILL.md`. The universal skill MUST defer to them; never copy customer logic into this file.

---

## Auth model — user-scoped commands

All form commands require a **Bearer token** (user session), not an API key. The developer must be logged in via `dailybot login`. This scopes form access to the logged-in human's permissions — they only see forms (and responses) they have access to, and the server enforces every audience check on the API side.

If the developer only has an API key (`DAILYBOT_API_KEY`), guide them through `dailybot login` first. API keys authenticate agent-scoped endpoints (`dailybot agent ...`), not user-scoped ones.

---

## When to Use

- The developer asks "what forms do I have?", "list my forms", "show available surveys"
- The developer asks to "fill out the retro form", "submit the feedback survey", "answer the pulse check"
- The developer wants to **continue** an in-progress form response: "keep filling the release form", "update my draft"
- The developer wants to **move a response forward**: "mark the release as approved", "transition to released", "send for review"
- The developer wants to **read prior responses**: "show me the last release form", "what was answered last time?"
- The developer wants to **delete** a response they own

Do **not** use this skill for daily standup check-ins — route those to `dailybot-checkin`. Forms are ad-hoc, periodic, or workflow-driven; check-ins are recurring daily/weekly rituals tied to follow-ups.

---

## Step 1 — Verify Setup

Read and follow the authentication steps in [`../shared/auth.md`](../shared/auth.md). That file covers CLI installation, login, API key setup, and agent profile configuration.

**Additionally**, verify the developer has a user session (Bearer token):

```bash
dailybot status --auth 2>&1
```

If the output shows a logged-in user session, proceed. If not, guide them through `dailybot login` (see auth.md for the OTP flow). Form commands will not work with only an API key.

A scripted preflight that does both at once and exits with code `3` if unauthenticated:

```bash
dailybot status --auth >/dev/null 2>&1 || { echo "Run: dailybot login"; exit 3; }
```

If auth fails or the developer declines, skip and continue with your primary task.

---

## Step 2 — Lifecycle Decision Tree

When the developer asks anything form-related, walk this tree before acting:

```
1. Identify the target form by name or slug (or pick from a list).
2. Run `dailybot form list --json` to find its UUID and confirm visibility.
3. Run `dailybot form get <form_uuid> --json` to read questions, workflow_enabled,
   states (if any), audience configuration, and the form's slug.
4. RESOLVER: check .dailybot/profile.json → vars.custom_form_skills.
   - If a custom skill is registered for this form (by UUID or by slug),
     LOAD THAT SKILL'S SKILL.md and follow its instructions INSTEAD of
     continuing the generic flow.
   - Otherwise, continue.
5. Decide whether to continue an existing response or start fresh:
   - `dailybot form responses <form_uuid> --latest --json`
   - If a response exists and its `current_state` is NOT terminal
     (or the form allows reopening), prefer the update + transition path.
   - Otherwise, submit a new response.
6. After every mutating call, re-read `current_state` and `allowed_transitions`
   on the response to decide the next move (update? transition? done?).
```

The resolver step (4) is the customer-extension hook. See **Step 7 — Custom-skill resolver** below.

---

## Step 3 — List Available Forms

```bash
dailybot form list --json
```

Returns all forms visible to the logged-in user. The shape is stable and machine-readable:

```json
[
  {
    "id": "<form-uuid>",
    "slug": "team-feedback",
    "name": "Team Feedback",
    "workflow_enabled": false,
    "questions": [
      {
        "uuid": "<question-uuid>",
        "question": "How was your week?",
        "question_type": "text_field"
      }
    ]
  },
  {
    "id": "<form-uuid>",
    "slug": "code-release-form",
    "name": "Code Release Form",
    "workflow_enabled": true,
    "questions": [ ... ]
  }
]
```

> The `slug` field is stable across environments (dev / staging / prod), while `id` rotates per environment. Prefer `slug` for any persistent mapping you keep across deployments. See the resolver in Step 7.

### Present forms to the developer

When forms are found:

> "You have **2 forms** available in Dailybot:
>
> 1. **Team Feedback** — 3 questions (no workflow)
> 2. **Code Release Form** — 8 questions (workflow: draft → review → released)
>
> Which one would you like to work with?"

When no forms are found:

> "No forms are available for you right now."

---

## Step 4 — Inspect a Form

```bash
dailybot form get <form_uuid> --json
```

Use this **before** submitting or updating. It returns the form's full configuration including workflow definition and the audience-based permission flags. Treat this output as the source of truth for "what can I do on this form?".

### JSON shape (workflow-enabled form)

The workflow definition (states + transitions) is nested under the `workflow` key. Audience permissions live at the top level. Both are server-defined.

```json
{
  "id": "<form-uuid>",
  "slug": "code-release-form",
  "name": "Code Release Form",
  "workflow_enabled": true,
  "allow_reopen_from_final_state": false,
  "state_change_permission": { "audience": "...", "...": "..." },
  "edit_permission":         { "audience": "...", "...": "..." },
  "view_reports_permission": { "audience": "...", "...": "..." },
  "workflow": {
    "states": [
      {"key": "draft",    "label": "Draft",    "is_initial": true,  "is_final": false},
      {"key": "review",   "label": "Review",   "is_initial": false, "is_final": false},
      {"key": "released", "label": "Released", "is_initial": false, "is_final": true}
    ],
    "transitions": [
      {"from_state": "draft",  "to_state": "review",   "label": "Send for review"},
      {"from_state": "review", "to_state": "released", "label": "Mark released"},
      {"from_state": "review", "to_state": "draft",    "label": "Back to draft"}
    ]
  },
  "questions": [ ... ]
}
```

### Audience permissions

The three `*_permission` fields are server-evaluated. Treat them as **opaque** in this skill — never re-implement the audience evaluation client-side. The server returns `can_change_state`, `can_edit`, and `can_view_reports` (or equivalent) on each response payload as the decided result. Trust those booleans.

---

## Step 5 — Workflow-state Vocabulary

When the form has `workflow_enabled: true`, the agent must understand five fields that appear on every response payload. Surface them when they affect what the developer can do next:

| Field | Meaning | Agent behavior |
|-------|---------|----------------|
| `current_state` | The effective state of this response right now. | Display the label. Drive the next action from it. |
| `allowed_transitions` | `[{to_state, label}]` — the moves the **current caller** can make from `current_state`. Server-computed; honors audience. | Pick one and confirm with the developer before invoking `transition`. If the list is empty, no transitions are available to the caller. |
| `can_change_state` | Boolean — whether the caller is in the audience for state changes. | If `false`, do not offer the transition path. Tell the developer the audience excludes them. |
| `allow_reopen_from_final_state` | Form-level boolean. `false` (default) means the terminal state is sticky — once reached, the response cannot move out. | If `false` and `current_state` is a final state, do not attempt a transition. If `true`, the response can transition back to a non-final state. |
| `state_history` | Append-only list of `{from_state, to_state, actor_name, at}` entries. | Surface the latest entry (who moved it last, when) when relevant for context. |

> Never infer state transitions from labels or names — the only valid moves are the ones in `allowed_transitions`. The server's audience checks may legitimately exclude transitions the developer *thinks* should be available.

---

## Step 6 — Find In-Progress Responses

Before submitting a new response, check whether there's an in-progress one to continue:

```bash
dailybot form responses <form_uuid> --latest --json
```

### Continue-or-start idiom

The standard shell pattern for "continue if there's an in-progress response, otherwise create one":

```bash
RID=$(dailybot form responses <form_uuid> --latest --json | jq -r '.[0].id // empty')
if [ -z "$RID" ]; then
  RID=$(dailybot form submit <form_uuid> --content '{...}' --yes --json | jq -r '.id')
fi
# $RID is now the response UUID — pass it to subsequent update / transition calls.
```

Useful flags:

| Flag | Description |
|------|-------------|
| `--latest` | Return only the most recent response visible to the caller. |
| `--state STATE` | Filter to responses in a specific workflow state (e.g. `--state draft`). |
| `--json` | Machine-readable output (stable shape). |

### JSON shape (single response)

```json
{
  "id": "<response-uuid>",
  "form_id": "<form-uuid>",
  "current_state": "review",
  "allowed_transitions": [
    {"to_state": "released", "label": "Mark released"},
    {"to_state": "draft",    "label": "Back to draft"}
  ],
  "can_change_state": true,
  "state_history": [
    {"from_state": null,     "to_state": "draft",  "actor_name": "Sergio F.", "at": "2026-05-25T14:22:11Z"},
    {"from_state": "draft",  "to_state": "review", "actor_name": "Sergio F.", "at": "2026-05-26T09:05:42Z"}
  ],
  "content": {
    "<question-uuid>": "Auth service v2.1",
    "<question-uuid>": "Sergio, Carolina"
  }
}
```

### Reading a single response

```bash
dailybot form response get <form_uuid> <response_uuid> --json
```

---

## Step 7 — Custom-skill Resolver (`vars.custom_form_skills`)

If the developer's repo registers a custom skill for the form being worked with, **load and follow that custom skill instead of continuing the generic flow**. This is what keeps form-specific logic out of this universal file.

### Where the mapping lives

In `.dailybot/profile.json` at the repo root, under the CLI's free-form `vars` namespace:

```json
{
  "name": "API Services",
  "default_metadata": { "repo": "api-services" },
  "vars": {
    "active_organization_uuid": "00e2b30f-b581-44ae-8981-4cdbd060b78d",
    "custom_form_skills": {
      "by_uuid": {
        "65de0ec6-2353-4e17-94d7-7beaa905e92a": ".agents/skills/dailybot-custom/coderelease-form"
      },
      "by_slug": {
        "code-release-form": ".agents/skills/dailybot-custom/coderelease-form"
      }
    }
  }
}
```

> `vars` is the CLI's official escape hatch for repo-local data the CLI carries but doesn't act on — see [DailybotHQ/cli README → Repo-level profile](https://github.com/DailybotHQ/cli#repo-level-profile-dailybotprofilejson). Nesting under `vars` keeps this convention from colliding with future top-level CLI keys.

### Resolution algorithm

Run this **after** `dailybot form get` (you need the slug):

```python
def resolve_custom_form_skill(profile, form):
    custom = ((profile or {}).get("vars") or {}).get("custom_form_skills") or {}
    by_uuid = custom.get("by_uuid") or {}
    by_slug = custom.get("by_slug") or {}

    # 1) UUID-first — exact match against the form's current UUID.
    if form["id"] in by_uuid:
        return by_uuid[form["id"]]

    # 2) Slug fallback — survives across dev / staging / prod where UUIDs differ.
    slug = form.get("slug")
    if slug and slug in by_slug:
        return by_slug[slug]

    # 3) None — caller continues with the generic flow.
    return None
```

### Behavior rules

- Resolver runs **after** `dailybot form get` returns the form payload (slug must be available).
- If the resolver returns a path, **load `<path>/SKILL.md`** and follow its instructions instead of continuing here.
- If no profile / no `custom_form_skills` block / no match → generic flow continues.
- If the registered path does **not** exist on disk → emit a warning to the developer and fall through to the generic flow. Do **not** hard-fail; missing custom skills must not block form work.
- Never read other paths under `.agents/skills/dailybot-custom/`. Only resolve the exact path the profile registered.

### Why two maps

`by_uuid` is environment-specific (the UUID rotates between dev / staging / prod). `by_slug` is portable across environments because slugs are stable. Customers running both staging and prod want the same routing in both environments; that's what the slug map gives them. Recommend both maps — UUID for exact matches, slug for cross-environment robustness.

---

## Markdown Content Rules — read before composing any answer

> [!IMPORTANT]
> The Dailybot webapp renders a **constrained Markdown subset** on form-response answers. Submitted content that uses unsupported syntax falls through as plain text — usually visually broken. Both `dailybot form submit` and `dailybot form update` send `--content` strings through this same renderer.
>
> These rules apply to every value inside the `--content` JSON map.

### Headings — single level only

- ✅ `# Service name` — renders as a title.
- ❌ `## Subsection`, `### Detail` — only one heading level renders. Nested headings fall through as plain text (`##` becomes the literal characters in the output).

**If you need section structure**, use a single `#` heading with bold paragraph leads beneath it, not multiple heading levels.

### Newlines — must be real `\n`

- ✅ JSON `"line 1\nline 2"` → renders as two lines.
- ❌ JSON `"line 1 line 2"` → renders as one paragraph (the space is just a space).

When building `--content` strings from a heredoc or programmatic source, ensure the encoder emits literal `\n` characters in the JSON string (a real line break in a properly-escaped JSON value).

### Supported inline syntax

- `**bold**`
- `*italic*`
- `` `inline code` ``
- `[link text](https://example.com)`

### Supported block syntax

- `- bullet` lists
- `1. numbered` lists
- Fenced code blocks (```` ```language ```` … ```` ``` ````)
- `| col | col |` tables (GFM-style)

### Authoring rule for the LLM

When composing any answer that the agent will submit on behalf of the developer:

1. Use **at most one** `#` heading per answer.
2. Insert **real `\n` newlines** between paragraphs and after each list item.
3. Stick to the inline + block elements listed above. Do not reach for `##`, `>` block quotes, footnotes, definition lists, or HTML.
4. Show the developer a preview before submitting — `--content` is also Markdown, so what you build is what they'll see.

LLMs default to multi-level headings (`##`, `###`). That's the most common authoring mistake here. Pre-flatten the structure before composing.

---

## Step 8 — Submit a New Response

Use this when no in-progress response exists for the developer (or when the form has no workflow).

> Every `text_field` answer is rendered as Markdown. See **Markdown Content Rules** above before composing — the most common mistake is using `##` headings, which fall through as plain text.

### 8a. Guided mode (recommended)

Walk through each question in order. Match the answer format to the question type:

| `question_type` | How to handle |
|-----------------|---------------|
| `text_field`   | Free-text answer — ask the developer or draft from session context |
| `numeric`       | Integer or decimal — validate before sending |
| `boolean`       | Yes/No |
| `choice`        | Pick from the form's predefined choices |

For each question:

> "**Code Release Form** — Question 1 of 8:
>
> *Service name?* (text)
>
> Your answer?"

### 8b. Non-interactive submission

If you already have the full answer set from context:

```bash
dailybot form submit <form_uuid> \
  --content '{"<question-uuid>":"Auth service v2.1","<question-uuid>":"Sergio, Carolina"}' \
  --yes
```

> **Timeout**: Allow at least 30 seconds for CLI commands to complete.

### Confirm before submitting

Always show the complete answer set before sending:

> "Here's what I'll submit for **Code Release Form**:
>
> 1. *Service name?* — "Auth service v2.1"
> 2. *Released by?* — "Sergio, Carolina"
> 3. *Migration notes?* — "None"
>
> **Submit?** (yes / edit / cancel)"

### CLI flags

| Flag | Short | Description |
|------|-------|-------------|
| `--content` | `-c` | JSON map `{"<question_uuid>": "<answer>"}`. Prompts when omitted. |
| `--state` | `-s` | Optional initial state (workflow forms only). Defaults to the form's initial state. |
| `--yes` | `-y` | Skip confirmation. |
| `--json` |     | Machine-readable JSON output. |

After submit, **re-read `current_state` and `allowed_transitions` on the returned payload** to decide the next step.

---

## Step 9 — Update an Existing Response

Use when there's an in-progress response and the developer wants to add / change answers without changing the workflow state.

> Updates are **strictly own-only** server-side. Org admins are NOT elevated to edit another user's response through this endpoint. If the response doesn't belong to the caller, the server returns `form_response_not_found` rather than leaking ownership.
>
> Updated answer values pass through the same Markdown renderer as new submissions — see **Markdown Content Rules** above.

```bash
dailybot form update <form_uuid> <response_uuid> \
  --content '{"<question-uuid>":"Auth service v2.1.1"}' \
  --yes
```

Updates merge into the existing `content`. If the server returns `form_response_change_state_forbidden` on a separate transition call, the update itself is still valid — the audience check is on the transition, not the edit (subject to the form's `edit_permission`).

### CLI flags

| Flag | Short | Description |
|------|-------|-------------|
| `--content` | `-c` | JSON map merged into the existing `content`. |
| `--yes` | `-y` | Skip confirmation. |
| `--json` |     | Machine-readable JSON output. |

After update, re-read `current_state` and `allowed_transitions` on the returned payload.

---

## Step 10 — Transition a Response

When the form is workflow-enabled and `allowed_transitions` is non-empty:

```bash
dailybot form transition <form_uuid> <response_uuid> <to_state> --yes
```

Confirm with the developer before transitioning:

> "I'll transition response **#a1b2** of **Code Release Form** from `review` → `released` ("Mark released"). The action will be attributed to you in the state history. Confirm? (yes / cancel)"

### CLI flags

| Flag | Short | Description |
|------|-------|-------------|
| `--note` | `-n` | Optional free-text note attached to the state-history entry. |
| `--yes` | `-y` | Skip confirmation. |
| `--json` |     | Machine-readable JSON output. |

After a successful transition, surface the new `current_state` and the latest `state_history` entry.

---

## Step 11 — Delete a Response

```bash
dailybot form delete <form_uuid> <response_uuid> --yes
```

Only the **author, form owner, or org admin** can delete a response (server-enforced). Always confirm before invoking — deletion is irreversible. Use a strong confirmation prompt; the developer must type the response UUID or "yes":

> "This will permanently delete response **#a1b2** of **Code Release Form**. This cannot be undone.
>
> Type the response UUID to confirm, or 'cancel'."

---

## Step 12 — Multi-turn Lifecycle Examples

### Example A — Non-workflow form ("Team Feedback")

```
1. dailybot form list --json                  → find UUID for "Team Feedback"
2. dailybot form get <uuid> --json            → workflow_enabled: false
3. Resolver: no entry in custom_form_skills   → continue generic flow
4. Guided submission:
     - Question 1: "How was your week?"       → developer answer
     - Question 2: "Rate workload"            → "7"
5. Confirm answer set → dailybot form submit  → done.
```

Response stored. No further lifecycle moves required.

### Example B — Workflow form ("Code Release Form")

```
1. dailybot form list --json                  → find UUID + slug
2. dailybot form get <uuid> --json            → workflow_enabled: true
3. Resolver: by_slug["code-release-form"]     → ".agents/skills/dailybot-custom/coderelease-form"
4. Load that custom SKILL.md and follow it    → it drives the whole release flow
   (the custom skill handles questions, per-state required fields, default
    values, channel routing, transition cadence, etc.)
```

If the custom skill path **does not exist**, warn the developer and continue with the generic flow (Steps 8–11) — the form is still usable, just without the customer-specific logic.

---

## Step 13 — Error Handling

Map every server `code` to a clear agent action. The error shape is `{detail, code}` across all 4xx responses.

### `--json` structured error shape

When any `dailybot form ...` command is invoked with `--json`, errors print as:

```json
{
  "error": "...",
  "status": 403,
  "code": "form_response_change_state_forbidden",
  "detail": "Caller is not in the state_change_permission audience."
}
```

Match on `code` (not `detail`) — `detail` is human-readable and may evolve. The CLI exits with a stable, code-aligned exit value (table below).

### Code / HTTP / exit / action

| Server `code` | HTTP | CLI exit | Agent action |
|---------------|------|----------|--------------|
| `form_does_not_exists` | 404 | 5 | Wrong UUID. Re-run `dailybot form list` and confirm the target. |
| `form_response_not_found` | 404 | 5 | The response doesn't exist **or** belongs to another user (update is own-only). Treat as a clean miss — no information leak. Offer to start a new response. |
| `form_response_change_state_forbidden` | 403 | 4 | Stop the transition flow. The caller is not in the form's `state_change_permission` audience — even on their own response. Suggest contacting the form owner if the move is needed. |
| `final_state_locked` | 403 | 4 | Stop. The response is in a final state and `allow_reopen_from_final_state` is `false`. Explain the policy. Offer to PATCH `allow_reopen_from_final_state=true` only if the developer is the form owner. |
| `form_response_delete_forbidden` | 403 | 4 | Stop the delete flow. Explain the author / owner / admin invariant. |
| `user_can_not_see_form_responses` | 403 | 4 | Stop. The form's `view_reports_permission` audience excludes the caller. |
| `payload_too_large` | 400 | 2 | Trim `--content`. For very long answers, split into multiple updates. |
| Any other 4xx with a `detail` | — | — | Surface the `detail` text verbatim to the developer. |
| Not authenticated | 401 | 3 | Guide through `dailybot login`. |
| Rate limited | 429 | 6 | Slow down. Do not retry in a tight loop. |

If the server returns a body without a `code` (network error, gateway error, malformed response), warn briefly and fall back to the non-blocking rule.

---

## Step 14 — HTTP Fallback (when CLI is unavailable)

See [`../shared/http-fallback.md`](../shared/http-fallback.md) for base patterns.

**Important:** Form endpoints use **Bearer token** auth, not API key auth.

### List forms (with questions)

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  "https://api.dailybot.com/v1/forms/?include=questions"
```

### Get a single form

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  "https://api.dailybot.com/v1/forms/<form_uuid>/"
```

### List responses for a form

```bash
curl -s -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  "https://api.dailybot.com/v1/forms/<form_uuid>/responses/?latest=true"
```

### Submit a response

```bash
curl -s -X POST \
  -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/forms/<form_uuid>/responses/ \
  -d '{"content": {"<question_uuid>": "Auth service v2.1"}}'
```

### Update a response

```bash
curl -s -X PATCH \
  -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/forms/<form_uuid>/responses/<response_uuid>/ \
  -d '{"content": {"<question_uuid>": "Auth service v2.1.1"}}'
```

### Transition a response

```bash
curl -s -X POST \
  -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.dailybot.com/v1/forms/<form_uuid>/responses/<response_uuid>/transition/ \
  -d '{"to_state": "released"}'
```

### Delete a response

```bash
curl -s -X DELETE \
  -H "Authorization: Bearer $DAILYBOT_BEARER_TOKEN" \
  https://api.dailybot.com/v1/forms/<form_uuid>/responses/<response_uuid>/
```

---

## Step 15 — JSON Output Stability

Every `dailybot form ...` command supports `--json`. The shapes documented above are the **stable** machine-readable contract: agents and downstream tooling can rely on them across releases. Table output (the default without `--json`) is human-only and may evolve — never parse it.

For the canonical CLI command + payload contract, see the `CLI_AGENT_HANDOFF.md` companion document in the planning folder.

---

## Step 16 — Confirm

After every mutating command:

- **Success** — briefly confirm the outcome and the new state (when applicable). Example: *"Submitted your Code Release Form response. It's now in `draft`."*
- **Failure** — warn briefly. Map the `code` to a concrete next step per the table in Step 13.
- **Skipped** — say nothing.

---

## Non-Blocking Rule

Form operations must **never block your primary work**. If the CLI is missing, auth fails, the network is down, or any command errors:

1. Warn the developer briefly.
2. Continue with the primary task.
3. Do not retry automatically.
4. Do not enter a diagnostic loop.

---

## Additional Resources

- [`../shared/auth.md`](../shared/auth.md) — authentication setup
- [`../shared/http-fallback.md`](../shared/http-fallback.md) — HTTP API fallback patterns
- [`_custom-template/SKILL.md`](_custom-template/SKILL.md) — starter template for authoring a custom per-form skill (copy into `.agents/skills/dailybot-custom/<your-name>/` in your own repo)
- **Live API spec:** `https://api.dailybot.com/api/swagger/`
- **Full agent API skill:** `https://api.dailybot.com/skill.md`
