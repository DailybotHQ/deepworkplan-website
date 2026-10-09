---
title: Claude Code
description: "The DWP adapter for Claude Code, with full support through native slash commands and skills, including subagents and team agents for the complete feature set."
kind: adapter
lang: en
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code adapter

Claude Code has **full** DWP support via native slash commands and skills.

## Support level

**Full** — all five DWP commands map to native Claude Code slash commands.

## Installation

DWP ships as skills under `.agents/skills/` (resolved through the `.claude/` symlink). Claude Code discovers them automatically.

Optional: [coding-agents-kit](/kit/agentkit) can install this CLI and launch it with `ak claude`. The vendor’s own installer works just as well.

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Invocation

Use the `/` prefix:

```
/dwp-create <goal>
/dwp-execute
```

## Notes

Claude Code supports skills, subagents, and team agents — the full DWP feature set.
