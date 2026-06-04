---
title: Cursor
description: "The DWP adapter for Cursor AI, with full support through the project rules system and the hash command prefix, since Cursor reserves the slash itself."
kind: adapter
lang: en
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor adapter

Cursor supports DWP through project rules and command files.

## Support level

**Full** — DWP commands work through Cursor's rules system.

## Installation

DWP commands live as markdown under the project. Cursor reads them through its rules system.

## Invocation

Use the `#` prefix (Cursor intercepts `/`):

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Use `#` because Cursor reserves `/` for its own commands.
