---
title: Agentkit
description: "An optional v7 addon built on coding-agents-kit: one ak command for every terminal coding agent, and headless delegation of bounded plan tasks."
kind: addon
lang: en
order: 8
---

# Agentkit addon

Every terminal coding agent has its own flags for continuing a session, its own way to keep a second account apart, its own headless mode and its own switch for skipping permission prompts. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** puts one command surface over all of them: `ak <kind> [@profile]`.

This addon integrates the kit into **DWP v7** (`v7.0.0`) as the **headless** delegation transport. It is optional: without it, every task runs in the current session, exactly as before. The kit itself is an MIT product that works without Deep Work Plan.

## What the kit gives you

- **One grammar for every CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` and `ak grok`, plus provider variants (GLM, Azure, xAI), with the same session flags: `-c` continues, `-r <id>` resumes.
- **Profiles.** `ak claude @work` runs a second account in its own home, kept apart from the first.
- **Headless runs.** `ak run <kind> -- "<prompt>"` runs one prompt non-interactively and returns a documented exit code, optionally as one JSON object.
- **A doctor.** `ak doctor --json` reports which CLIs are installed, the profiles, and the names of the keys that are set — never their values.
- **Installs.** `ak install <cli>` installs a missing CLI from its vendor's official channel.

## Install

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requirements: `bash` on macOS or Linux, and `python3` 3.9 or newer; nothing else. Windows uses `install.ps1`. Pin `v0.1.1`: it carries a security fix and supersedes `v0.1.0`.

| Item | Value |
|---|---|
| Product | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, interface 1 |
| Registry key | `agentkit` in `.dwp/config.json` |
| Transport | headless: one `ak run` per delegate in a dedicated git worktree |
| Provides | `subagents`, `cancel_children`, `model_routing` |
| Requires | the plan contract's `agent_delegation` grant |

## Permissions are pass-through

`ak <kind>` adds **no** permission-bypass flag. Autonomy is an explicit opt-in: `--auto` on one command, or `AGENTKIT_PERMISSIONS=auto` in the environment, adds the CLI's own autonomy flag for that launch. The `classic` alias preset, which recreates shortcuts such as `claudex`, ships turned off.

The addon never adds an autonomy flag on its own. A plan uses `--auto` only on the developer's explicit, recorded opt-in, and only inside an isolated worktree or container.

## What it adds to a plan

On a v7 plan whose contract grants `agent_delegation`, `execute` may hand a `parallel_safe` task to another CLI: it creates a dedicated git worktree, runs `ak run` there with a timeout, and collects the result into the plan's `analysis_results/delegations/`. The result is `asserted` evidence until the plan's own gate runner observes it. Cancelling a delegate stops its whole process tree.

## Agentkit or Herdr

| Situation | Use |
|---|---|
| A bounded `parallel_safe` task with a declared output | Agentkit (headless) |
| The task needs interaction, runs long, or lives on another machine | [Herdr](/kit/herdr) (a peer in a pane) |

The two compose: herdr-peers can launch a peer in a pane with the environment that `ak env <kind> @profile` prints.

## Notes

Optional and never required. API key values are never printed, logged or written to a config file; the documented exception is Cline, which receives its key on the command line. Result extraction for OpenCode, Pi, Cline and Grok is built from vendor documentation and has not yet been exercised against live accounts; unknown output falls back to raw text.
