---
title: Antigravity
description: "The DWP adapter for Antigravity, with full support through markdown command procedures and the hash command prefix that drive the complete Deep Work Plan loop."
kind: adapter
lang: en
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity adapter

Antigravity supports DWP through markdown command procedures.

## Support level

**Full** (Install-tested) — every dwp-* command runs from its procedure file. Route asserted by automated test suites; behavioral workflows run on the sequential baseline.

## Installation

DWP commands live as markdown procedures the agent reads on invocation.

## Invocation

Use the `#` prefix:

```
#dwp-create <goal>
#dwp-execute
```

## Notes

Antigravity reads the procedure files and runs the full sequential Deep Work Plan loop.
