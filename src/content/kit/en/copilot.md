---
title: GitHub Copilot
description: "The DWP adapter for GitHub Copilot, with partial support through markdown command procedures and the hash prefix; some automation is done manually."
kind: adapter
lang: en
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot adapter

GitHub Copilot supports DWP through markdown command procedures.

## Support level

**Partial** — core commands work through procedure files; some automation is manual.

## Installation

DWP commands live as markdown procedures in the repository.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Copilot reads procedure files but has less autonomous execution than Claude Code.
