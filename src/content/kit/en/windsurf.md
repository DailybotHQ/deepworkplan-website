---
title: Windsurf
description: "The DWP adapter for Windsurf, with full support through its rules system and markdown command procedures invoked with the hash command prefix."
kind: adapter
lang: en
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf adapter

Windsurf supports DWP through its rules system and markdown command procedures.

## Support level

**Full** — Windsurf reads the project rules and runs every dwp-* command from its procedure file.

## Installation

DWP commands live as markdown procedures the agent reads through Windsurf's rules system.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Windsurf reads the procedure files and runs the full sequential Deep Work Plan loop.
