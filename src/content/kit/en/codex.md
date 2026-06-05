---
title: OpenAI Codex
description: "The DWP adapter for OpenAI Codex, with full support through markdown command procedures and the hash command prefix that run the complete Deep Work Plan loop."
kind: adapter
lang: en
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex adapter

Codex supports DWP through markdown command procedures.

## Support level

**Full** — every dwp-* command runs from its procedure file.

## Installation

DWP commands live as markdown procedures the agent reads on invocation; rules are installed under `.codex/`.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Codex reads the procedure files and runs the full sequential Deep Work Plan loop.
