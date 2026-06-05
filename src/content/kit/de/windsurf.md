---
title: Windsurf
description: "Der DWP-Adapter für Windsurf, mit vollständiger Unterstützung über sein Regelwerk und Markdown-Befehlsprozeduren, die mit dem Hash-Präfix aufgerufen werden."
kind: adapter
lang: de
order: 8
agent: Windsurf
support: full
prefix: '#'
---

# Windsurf Adapter

Windsurf unterstützt DWP über sein Regelwerk und Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — Windsurf liest die Projektregeln und führt jeden dwp-*-Befehl aus seiner Prozedurdatei aus.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent über Windsurfs Regelwerk liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Windsurf liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
