---
title: Google Gemini
description: "The DWP adapter for Google Gemini, with partial support through markdown command procedures and the hash prefix that drive the sequential workflow."
kind: adapter
lang: en
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini adapter

Google Gemini supports DWP through markdown command procedures.

## Support level

**Partial** — core commands work through procedure files.

## Installation

DWP commands live as markdown procedures the agent reads.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Gemini reads procedure files and executes the sequential DWP workflow.
