---
title: GitHub Copilot
description: "The DWP adapter for GitHub Copilot, with full support through AGENTS.md and markdown command procedures invoked with the hash command prefix."
kind: adapter
lang: en
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot adapter

Copilot supports DWP through AGENTS.md and markdown command procedures.

## Support level

**Full** — Copilot reads AGENTS.md and the dwp-* procedure files, and runs every command from them.

## Installation

DWP ships AGENTS.md and the command procedures in the repository; Copilot reads them as repository context.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Copilot reads the procedure files and runs the full sequential Deep Work Plan loop.
