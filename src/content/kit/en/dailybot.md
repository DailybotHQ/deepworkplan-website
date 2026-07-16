---
title: Dailybot
description: "Opt-in DWP addon: connect plan lifecycle to a Dailybot team, optional hook enforcement, and the full Dailybot agent skill 3.10.3 (chat, check-ins, forms, ask AI, and more)."
kind: addon
lang: en
order: 2
---

# Dailybot addon

Connect Deep Work Plan execution to a **Dailybot team** so humans see what agents are building — kickoff, mid-plan progress, blockers, and completion — without adding meetings or a second toolchain. An **opt-in** addon for teams that already use [Dailybot](https://www.dailybot.com).

The core Deep Work Plan methodology has **zero** Dailybot dependency. A repository with zero addons is fully conformant. Offer this addon only when the developer or team already uses Dailybot; never auto-install for everyone.

## When to use it

| Signal | Action |
|--------|--------|
| Team already uses Dailybot (Slack, Teams, Discord, Google Chat, or the dashboard) | **Recommend** during onboarding |
| Developer asks for agent progress visibility or standup-style updates | **Offer** the addon |
| Greenfield repo with no Dailybot account | **Skip** — vendor-neutral baseline is enough |
| Client work under NDA where progress must not leave the repo | **Skip**, or commit `.dailybot/disabled` as a local kill-switch |

## What this addon wires (narrow by design)

The DWP Dailybot addon does **not** reinvent Dailybot. It connects plan execution to the dailybot **`report`** sub-skill and optionally commits harness hooks. Everything else — install, consent, authentication, writing style — is **deferred** to the official [Dailybot agent skill](https://github.com/DailybotHQ/agent-skill) (currently **3.10.3**).

### Four lifecycle events

During DWP `create` / `execute`, the addon wires **four best-effort agent updates**. Every event is conditional (Dailybot present and authenticated), non-blocking, and respects `.dailybot/disabled`.

| Event | Trigger | Level | Requirement |
|-------|---------|-------|-------------|
| **Kickoff** | Plan materialized and approved, or first `execute` turn | regular | SHOULD |
| **Significant task** | A feature, bug fix, or major refactor completes — not setup chores | regular | MAY |
| **Blocked** | Plan halts; `state.json.blocked` populated (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | All tasks done; plan finishes | **milestone** | SHOULD |

Payloads derive from the plan's state layer (`state.json`) when present: `completed` as outcomes (not task numbers), `in_progress` from the current task, `blockers` from `state.json.blocked`. The message describes **what was built and why** — never file paths, git stats, branch names, or plan IDs.

### Optional hook enforcement

With `dailybot-cli >= 3.7.0`, the addon **may** commit repo-level harness hooks (`dailybot hook session-start | activity | post-commit | stop | dismiss`) backed by a local per-repo ledger. The harness reminds the agent at end of turn when a lifecycle event was missed — critical for long unattended sessions where prompt instructions decay.

A successful lifecycle report **resets** the hook ledger, so the two layers never double-report. Hook commands read local state only and always exit `0`.

### Repo identity and report policy

Optionally commit `.dailybot/profile.json` (or `.dailybot_example/profile.json` as a template) so every contributor and agent signs reports the same way. **Never** put credentials in that file — a `key` field is a hard error.

The same file may carry report policy the hooks honor:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` is especially useful for research- or docs-heavy repos: non-commit work (analysis, design docs, plans) is nudged sooner.

## Install (all opt-in)

The addon **offers** install paths; the Dailybot skill owns consent and verification.

| Component | Command / path |
|-----------|----------------|
| **Dailybot agent skill** (recommended) | `npx skills add DailybotHQ/agent-skill` |
| **Update existing skill** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimum `>= 3.7.0`) | Installed by the skill on first use via verified `shared/auth.md`; or `pip install 'dailybot-cli>=3.7.0'`, Homebrew, or the checksum-verified installer at [cli.dailybot.com](https://cli.dailybot.com) |

Check versions: `dailybot --version` and `dailybot version --check`. Upgrade: `dailybot upgrade`.

## Authentication — deferred

This addon **never** prompts for email, OTP, or API keys, and **never** stores credentials. Authentication is owned by the Dailybot skill's [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md):

- `dailybot login` (email OTP), or
- `DAILYBOT_API_KEY` / `dailybot config key=...`, or
- an opt-in, gitignored `.dailybot/env.json` per-repo key file (`dailybot env add/use`, CLI `>= 3.7.0`) so a developer can be signed into different orgs in different repos.

Auth resolution is **Bearer-first**: a session token takes priority, with a transparent Bearer→API-key retry on `401`/`403` so a stale token never blocks a valid key. If auth is declined or unavailable, reporting is skipped silently — work continues.

## The paired Dailybot skill — 14 capabilities (3.10.3)

Installing the Dailybot agent skill brings far more than the DWP addon wires. The official skill pack (skill **3.10.3**, CLI baseline **>= 3.7.0**, current publish **3.7.3**) exposes **14 coordinated sub-skills**:

| Sub-skill | What it does |
|-----------|--------------|
| **Progress reports** | Standup-style agent updates to the Dailybot dashboard |
| **Ask the AI** | One-shot, headless queries to the Dailybot AI assistant |
| **Message polling** | Check for team instructions at session start or when idle |
| **Email** | Send emails with mandatory pre-send safety checks |
| **Chat** | Send or edit on Slack, Microsoft Teams, Discord, or Google Chat — channels, DMs, teams, report-style threads, send-as-user (Slack, admin) |
| **Conversations** | Open or reuse a Slack group DM with the bot and named teammates; post a report in the same call |
| **Health and status** | Announce agent online/offline for long-running sessions |
| **Check-ins** | Complete standups; **author** check-ins (schedule, participants, questions, reminders, AI settings) |
| **Kudos** | Recognize teammates or whole teams; browse recognition feed, org feed, wall of fame |
| **Teams** | List teams, inspect members, resolve names to UUIDs; `me`, `org`, user profiles |
| **Forms** | List (now **org-scoped** by default, with `--mine` and `--owner` to narrow), submit, update, transition forms; **author** forms (workflow states, permissions, ChatOps); pagination, search, and date filters |
| **Workflows** | Read org workflows (`workflow list` / `workflow get`; read-only) |
| **Report channels** | Discover channel UUIDs for forms or check-ins |
| **Per-repo API keys** | Manage `.dailybot/env.json` — an opt-in, gitignored file of API keys + URLs per environment (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**The DWP addon wires only `report` into plan execution.** Invoke the Dailybot skill directly for everything else — for example, post a deploy summary to `#releases`, complete a standup, or ask the Dailybot AI to summarize check-in trends.

Public reference: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Source: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Trust model: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) in the skill pack.

## Behavior — defer, never block

| Rule | Detail |
|------|--------|
| **Defer** | Dailybot skill owns install, consent, auth, hooks templates, writing style |
| **Never block** | Absent CLI, auth failure, network error → warn once, continue primary work |
| **No retries** | Do not enter diagnostic loops; reporting is best-effort |
| **Reconcile** | Existing skill, CLI, profile, hooks, or report wiring is preserved — only fill gaps |
| **Vendor-neutral** | DWP does not require Dailybot; this addon is additive team visibility |

## Onboarding flow

During DWP `onboard` **Phase 7b**, after core AI-first scaffolding, the flow offers five opt-in addons. If the developer accepts Dailybot:

1. Detect existing setup (skill, CLI, `.dailybot/profile.json`, hooks, report step).
2. Offer skill/CLI install through Dailybot's consent flows.
3. Defer authentication to `shared/auth.md`.
4. Wire the four lifecycle events into `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Optionally offer hook enforcement and `.dailybot/profile.json`.
6. Run validation (SPEC §8 in the skill's `addons/dailybot/SPEC.md`).

Normative contract in the Deep Work Plan skill: `addons/dailybot/SPEC.md` (version **2.3.0**).

## Related kit entries

- [Devcontainer](/kit/devcontainer) — reproducible dev environment with Dailybot CLI persistence (first addon)
- [Dependency upgrade](/kit/dependency-upgrade) — batched, validated dependency upgrades (third addon)
- [Design system](/kit/design-system) — agent-facing `DESIGN.md` for interface surfaces (fourth addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — the onboarding sub-skill that offers addons
