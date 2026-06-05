---
title: Google Gemini
description: "The DWP adapter for Google Gemini, with full support through markdown command procedures and the hash command prefix that run the complete Deep Work Plan loop."
kind: adapter
lang: en
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini adapter

Gemini supports DWP through markdown command procedures.

## Support level

**Full** — every dwp-* command runs from its procedure file. Requires Gemini 2.5 Pro or newer for native WebFetch.

## Installation

DWP commands live as markdown procedures the agent reads on invocation.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Gemini reads the procedure files and runs the full sequential Deep Work Plan loop.
