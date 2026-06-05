---
title: OpenCode
description: "Der DWP-Adapter für OpenCode, den Open-Source-Agenten, mit vollständiger Unterstützung über natives AGENTS.md und Markdown-Befehlsprozeduren, die mit dem Hash-Präfix aufgerufen werden."
kind: adapter
lang: de
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode Adapter

OpenCode, der Open-Source-Coding-Agent, unterstützt DWP über natives AGENTS.md und Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — OpenCode liest AGENTS.md nativ und führt jeden dwp-*-Befehl aus seiner Prozedurdatei aus.

## Installation

DWP liefert AGENTS.md und die Befehlsprozeduren im Repository; OpenCode erkennt sie als Projektkontext.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

OpenCode liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
