---
title: Cline
description: "Der DWP-Adapter für Cline, den Open-Source-Agenten, mit vollständiger Unterstützung über Markdown-Regeln und Befehlsprozeduren, die mit dem Hash-Präfix aufgerufen werden."
kind: adapter
lang: de
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline Adapter

Cline, der Open-Source-Coding-Agent, unterstützt DWP über Markdown-Regeln und Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — Cline liest die Markdown-Regeln und führt jeden dwp-*-Befehl aus seiner Prozedurdatei aus.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent über Clines Regelwerk liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Cline liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
