---
title: Agentkit
description: "One command for every terminal coding agent. Full autonomy by default with an opt-out, headless runs in a git worktree, and a second account one prefix away."
kind: addon
lang: en
order: 8
---

# Agentkit addon

Every terminal coding agent has its own flags for continuing a session, its own way to keep a second account apart, its own headless mode and its own switch for skipping permission prompts. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** puts one command surface over all of them: `ak <kind> [@profile]`.

This addon integrates the kit into **DWP v7** (pack `v7.1.4`) as the **headless** delegation transport. It is optional: without it, every task runs in the current session, exactly as before. The kit itself is an MIT product that works without Deep Work Plan.

## What the kit gives you

- **One grammar for every CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` and `ak grok`, plus provider variants (GLM, Azure, xAI), with the same session flags: `-c` continues, `-r <id>` resumes.
- **Profiles.** `ak claude @work` runs a second account in its own home, kept apart from the first.
- **Headless runs.** `ak run <kind> -- "<prompt>"` runs one prompt non-interactively and returns a documented exit code, optionally as one JSON object.
- **A doctor.** `ak doctor --json` reports which CLIs are installed, the profiles, and the names of the keys that are set — never their values.
- **Verified installs.** `ak install <cli>` installs a missing CLI from its vendor's official channel at a pinned version, checked against a pinned sha256 or the npm registry's integrity.
- **Familiar names.** Two alias presets, off until you turn them on: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) and `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), each one `ak <kind>`.

## Install

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requirements: `bash` on macOS or Linux, and `python3` 3.9 or newer; nothing else. Windows uses `install.ps1`. Pin `v0.3.0`: `v0.2.0` and `v0.2.1` are unsupported. Verify a release with its `SHA256SUMS` asset.

| Item | Value |
|---|---|
| Product | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, interface 1 |
| Registry key | `agentkit` in `.dwp/config.json` |
| Transport | headless: one `ak run` per delegate in a dedicated git worktree |
| Provides | `subagents`, `cancel_children`, `model_routing` |
| Requires | the plan contract's `agent_delegation` grant |

## Autonomy by default, with an opt-out that always wins

Since `v0.2.0`, `ak <kind>` launches every agent in **autonomy**: it adds the CLI's own autonomy flag, kept only in the kit's `providers.toml`. Autonomy is meant for disposable or sandboxed environments, such as a development container.

The **opt-out always wins**: `--ask` on one command, or `AGENTKIT_PERMISSIONS=ask` in the environment or the kit's env file, suppresses the flag even when the same command says `--auto`. An opted-out session passes the opt-out on to the agents it starts. On a host, set the opt-out.

The addon spells no autonomy flag and never passes `--auto`. It passes `--ask` when a plan records the opt-out. A plan that grants `agent_delegation` on a host accepts autonomous delegates confined to their own worktree, which is not a sandbox.

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
