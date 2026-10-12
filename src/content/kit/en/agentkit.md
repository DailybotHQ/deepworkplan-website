---
title: Agentkit
description: "One command for every terminal coding agent: an account per profile, ak pick for the one with the most room, autonomy with an opt-out, and headless runs."
kind: addon
lang: en
order: 8
---

# Agentkit addon

Every terminal coding agent has its own flags for continuing a session, its own way to keep a second account apart, its own headless mode and its own switch for skipping permission prompts. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** puts one command surface over all of them: `ak <kind> [@profile]`.

This addon integrates the kit into **DWP v7** (pack `v7.6.3`) as the **headless** delegation transport. It is optional: without it, every task runs in the current session, exactly as before. The kit itself is an MIT product that works without Deep Work Plan.

## What the kit gives you

- **One grammar for every CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` and `ak grok`, plus provider variants (GLM, Azure, xAI), with the same session flags: `-c` continues, `-r <id>` resumes.
- **Profiles.** `ak claude @work` runs a second account in its own home, kept apart from the first.
- **Headless runs.** `ak run <kind> -- "<prompt>"` runs one prompt non-interactively and returns a documented exit code, optionally as one JSON object.
- **A doctor.** `ak doctor --json` reports which CLIs are installed, the profiles, and the names of the keys that are set — never their values.
- **Verified installs.** `ak install <cli>` installs a missing CLI from its vendor's official channel at a pinned version, checked against a pinned sha256 or the npm registry's integrity.
- **Familiar names.** Two alias presets, off until you turn them on: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) and `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), each one `ak <kind>`.

## Accounts, quota and choosing an account

The kit treats every login or key you hold as an **account**: one CLI × one profile. `@default` (or `@1`) is the CLI's own home; `@2`, `@work` or `@client-x` are separate logins, each in its own directory under the profiles root, that run side by side. `ak profiles` lists them with their login state and the names of their keys; `ak profiles --json` gives tools the same list (schema `profiles-v1`). Since `v0.5.1` it reports where Claude Code's token really is — `file`, `keychain` (macOS), `none` or `unknown` — by presence only, never reading the secret, and a Cursor login on Linux, in a container or on a Linux host, is recognised. Since `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` names the account a bare `ak <cli>` uses (a positional `@profile` still wins), which is how a dev container picks the host account it shares. Since `v0.5.3`, `ak codex` adds `--no-daemon` when a Codex home shared with another machine records a background daemon that is not on this one.

`ak usage` lists the quota and usage of every account the kit can see, one row per account and profile: live for Claude Code subscriptions (5-hour, weekly and per-model windows), Codex ChatGPT logins and Z.AI coding-plan keys; Cursor, Grok, xAI and Azure OpenAI show `n/d` with the reason. It is read-only: it never refreshes a login, never prints a token and never writes under a profile. `--json` gives tools the same list (schema `usage-v1`). The usage endpoints are vendor-internal and unofficial.

`ak pick <kind>` reads the same rows and names the account with the most room. `--count N` returns up to N accounts, best first; `--exclude @<profile>` keeps a busy one out; `--model` counts one model's weekly window; `--need 5h:40` refuses to pick without that much room. `--json` gives the schema `pick-v1`.

```bash
ak usage                   # quota of every account and profile
ak pick claude --count 3   # the three Claude accounts with the most room
ak claude @work --trust-cwd  # a second account, folder pre-trusted
ak profiles --json         # profiles-v1, for tools
ak setup verify            # ordered checks, each with its repair command
```

`--trust-cwd` (or `AGENTKIT_TRUST_CWD=1`) pre-trusts the folder the agent starts in, so Claude Code and Codex open without their folder-trust screen. `ak setup probe | verify | docker` is a read-only helper, driven by the `agentkit-setup` skill, that inspects the machine, checks the install and renders a pinned, verified container recipe.

## Several agents, several accounts

The `agentkit-orchestrate` skill (`ak --skill orchestrate`) teaches an agent to spread work over several agents, accounts and vendors: one `ak usage` before the batch, `ak pick --count N` to choose the accounts, one delegate per account, the repository's own gate on every result, and failover to the next account when one hits a limit. The kit observes, computes and runs; it never schedules. The lead — you, or an agent you asked — decides, using only your own accounts and within each vendor's terms.

For long, interactive lanes, each lane runs in a [Herdr](/kit/herdr) pane on its own account. The methodology chapter [Running many agents](/methodology/06-orchestration) describes the whole model: a lead and its lanes, accounts chosen by headroom, herdr-peers coordination, and one branch and one release per repository.

## Install

```bash
git clone --branch v0.5.3 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requirements: `bash` on macOS or Linux, and `python3` 3.9 or newer; nothing else. Windows uses `install.ps1`. Pin `v0.5.3`: `v0.2.0` and `v0.2.1` are unsupported. Verify a release with its `SHA256SUMS` asset.

| Item | Value |
|---|---|
| Product | `DailybotHQ/coding-agents-kit`, tag `v0.5.3`, interface 1 |
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

The two compose: herdr-peers can launch a peer in a pane with the environment that `ak env <kind> @profile` prints. For many lanes at once, see [Running many agents](/methodology/06-orchestration).

## Notes

Optional and never required. API key values are never printed, logged or written to a config file; the documented exception is Cline, which receives its key on the command line. Result extraction for OpenCode, Pi, Cline and Grok is built from vendor documentation and has not yet been exercised against live accounts; unknown output falls back to raw text.
