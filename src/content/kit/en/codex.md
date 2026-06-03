---
title: OpenAI Codex
description: "The DWP adapter for OpenAI Codex, with partial support through markdown command procedures and the hash prefix; team-agent features are unavailable."
kind: adapter
lang: en
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex adapter

OpenAI Codex supports DWP through markdown command procedures.

## Support level

**Partial** — core commands work; advanced features (team agents) are unavailable.

## Installation

DWP commands live as markdown procedures the agent reads on invocation.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Team-agent features are Claude-only; Codex supports the sequential workflow.
