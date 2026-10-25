---
title: Agentkit
description: "One command for every terminal coding agent: an account per profile, ak pick for the one with the most room, autonomy with an opt-out, and headless runs."
kind: addon
lang: en
order: 8
---

# Agentkit addon

Every terminal coding agent has its own flags for continuing a session, its own way to keep a second account apart, its own headless mode and its own switch for skipping permission prompts. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** puts one command surface over all of them: `ak <kind> [@profile]`.

This addon integrates the kit into **DWP v7** (pack `v7.8.1`) as the **headless** delegation transport. It is optional: without it, every task runs in the current session, exactly as before. The kit itself is an MIT product that works without Deep Work Plan.

## What the kit gives you

- **One grammar for every CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` and `ak antigravity`, plus provider routes (Z.AI GLM, Azure OpenAI, xAI and the Gemini API), with the same session flags: `-c` continues, `-r <id>` resumes.
- **Profiles.** `ak claude @work` runs a second account in its own home, kept apart from the first.
- **Headless runs.** `ak run <kind> -- "<prompt>"` runs one prompt non-interactively and returns a documented exit code, optionally as one JSON object.
- **A doctor.** `ak doctor --json` reports which CLIs are installed, the profiles, and the names of the keys that are set — never their values.
- **Verified installs.** `ak install <cli>` installs a missing CLI from its vendor's official channel at a pinned version, checked against a pinned sha256 or the npm registry's integrity.
- **Familiar names.** Two alias presets, off until you turn them on: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) and `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), each one `ak <kind>`.

## Accounts, quota and choosing an account

The kit treats every login or key you hold as an **account**: one CLI × one profile. Since `v1.0.1`, every profile — `@default` included — is an independent account in its own directory under the profiles root, preventing state leakage and credential collisions. `ak profiles` lists them with their login state and the names of their keys; `ak profiles --json` gives tools the same list (schema `profiles-v1`). Since `v0.5.1` it reports where Claude Code's token really is — `file`, `keychain` (macOS), `none` or `unknown` — by presence only, never reading the secret, and a Cursor login on Linux, in a container or on a Linux host, is recognised. Since `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` names the account a bare `ak <cli>` uses (a positional `@profile` still wins), which is how a dev container picks the host account it shares. Since `v0.5.3`, `ak codex` adds `--no-daemon` when a Codex home shared with another machine records a background daemon that is not on this one.

`ak usage` (also `ak status`) lists every account of every CLI the kit knows, one row per account and profile, under its CLI: live quota for Claude Code subscriptions (5-hour, weekly and per-model windows), Codex ChatGPT logins, Z.AI coding-plan keys and, since `v0.7.0`, Antigravity Google logins on Linux and in containers (the five-hour and weekly windows of agy's own `/usage` panel). An account whose quota cannot be read still has its row: `n/d` with how it is connected and why — Cursor, Grok, xAI, Azure OpenAI, a Gemini API key, or an Antigravity login kept in the macOS Keychain — or `no login` with the command that logs it in, so the table also shows which accounts of each CLI are connected. It is read-only: it never refreshes a login, never prints a token and never writes under a profile. `--json` gives tools the same list (schema `usage-v1`). The usage endpoints are vendor-internal and unofficial.

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

For long, interactive lanes, each lane runs in a [Herdr](/kit/herdr) pane on its own account. The methodology chapter [Running many agents](/methodology/06-orchestration) describes the whole model: a lead and its lanes, accounts chosen by headroom, herdr-peers coordination, and one branch and one release per repository; [Swarm autonomy](/methodology/07-swarm-autonomy) adds capacity checks, handoff and lead succession.

## Capacity and leases

From `v0.6.0` an agent can ask how much room its own account has, cheaply, at every task boundary — the signal that lets a swarm hand work on before an account runs out ([Swarm autonomy](/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schema `capacity-v1`) gives the running account's `headroom_pct`, its `binding_window`, `resets_at` and a `verdict`: `ok`, `low` (25 % or less), `critical` (10 % or less, or rate-limited) or `unknown` (no quota source: Cursor, Grok, or Antigravity on macOS). It uses `ak pick`'s arithmetic, so the two never disagree, and reads a usage cache kept for 300 seconds (`--max-age`), so a check at every task boundary stays cheap. `--self` resolves the account `ak` launched; outside an `ak` launch it exits 3 and never guesses. `ak usage` still reads live and refreshes the cache.
- **Thresholds and drills.** `AGENTKIT_CAPACITY_LOW` and `AGENTKIT_CAPACITY_CRITICAL` (or `--low` and `--critical`) move the thresholds. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` can only lower a reading — it is how a drill makes an account look poor — and can never make one look richer.
- **`ak lease <kind> @<profile> --owner <addr>`** holds an account for one lane; `ak lease release …` frees it once a successor has accepted the handoff, and `ak lease ls` lists the leases (schema `leases-v1`). A Codex profile takes a single lease — one writer per auth file — and only the owner releases a lease. Leases expire and are advisory records of numbers, profile names and pane addresses, never a credential.
- **`ak pick <kind> --owner <lead>`** counts every active lease, the owner's own included: it ranks candidates by `headroom / (1 + leases)` and never offers a leased Codex account, not even to its holder. `--reuse @<profile>` hands one of the owner's own leases on, for example to a lane's successor. Without `--owner` the ranking is unchanged.

```bash
ak capacity --self --json                        # this agent's own room and verdict
ak lease claude @work --owner local:w2:p1        # hold an account for a lane
ak pick codex --owner local:w1:p1 --count 2      # skip accounts leased to others
```

Work moves only among the accounts you declared for the plan, within each vendor's terms: no agent creates an account, renews a login or spends a Codex reset. The Deep Work Plan pack reads the verdict through its own helper and turns it into continue, prepare or hand off; without the kit, or with an older one, capacity is reported as unknown, never as ok.

## Install

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requirements: `bash` on macOS or Linux, and `python3` 3.9 or newer; nothing else. Windows uses `install.ps1`. Pin `v1.0.1`: `v0.2.0` and `v0.2.1` are unsupported. Verify a release with its `SHA256SUMS` asset.

| Item | Value |
|---|---|
| Product | `DailybotHQ/coding-agents-kit`, tag `v1.1.0`, interface 1 |
| Registry key | `agentkit` in `.dwp/config.json` |
| Transport | headless: one `ak run` per delegate in a dedicated git worktree |
| Provides | `subagents`, `cancel_children`, `model_routing` |
| Requires | the plan contract's `agent_delegation` grant |

**Stable since `v1.0.0`.** The kit's public interface follows semantic versioning and changes incompatibly only in a new major version: the command surface (`ak <kind> [@profile]` for every kind in `providers.toml`, and every verb with its documented flags), the permission posture, interface 1 (`ak doctor --json`, `ak env`, the `ak run` grammar and envelope), the JSON schemas (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`), and the installed layout and env-file variable names. `v1.0.0` changes no command, flag, key or schema from `v0.7.1`.

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
