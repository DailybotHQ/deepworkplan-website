---
title: Cline
description: "The DWP adapter for Cline, the open-source agent, with full support through markdown rules and command procedures invoked with the hash command prefix."
kind: adapter
lang: en
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline adapter

Cline, the open-source coding agent, supports DWP through markdown rules and command procedures.

## Support level

**Full** — Cline reads the markdown rules and runs every dwp-* command from its procedure file.

## Installation

DWP commands live as markdown procedures the agent reads through Cline's rules.

Optional: [coding-agents-kit](/kit/agentkit) can install this CLI and launch it with `ak cline`. The vendor’s own installer works just as well.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Cline reads the procedure files and runs the full sequential Deep Work Plan loop.
