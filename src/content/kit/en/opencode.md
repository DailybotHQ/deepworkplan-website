---
title: OpenCode
description: "The DWP adapter for OpenCode, the open-source agent, with full support through native AGENTS.md and markdown command procedures invoked with the hash prefix."
kind: adapter
lang: en
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode adapter

OpenCode, the open-source coding agent, supports DWP through native AGENTS.md and markdown command procedures.

## Support level

**Full** — OpenCode reads AGENTS.md natively and runs every dwp-* command from its procedure file.

## Installation

DWP ships AGENTS.md and the command procedures in the repository; OpenCode discovers them as project context.

Optional: [coding-agents-kit](/kit/agentkit) can install this CLI and launch it with `ak opencode`. The vendor’s own installer works just as well.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

OpenCode reads the procedure files and runs the full sequential Deep Work Plan loop.
