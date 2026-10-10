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

Optional: [coding-agents-kit](/kit/agentkit) can install this CLI and launch it with `ak codex`. The vendor’s own installer works just as well.

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Codex reads the procedure files and runs the full sequential Deep Work Plan loop.
