---
title: Google Gemini
description: "Der DWP-Adapter für Google Gemini, mit teilweiser Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix, die den sequenziellen Workflow steuern."
kind: adapter
lang: de
order: 5
agent: Google Gemini
support: partial
prefix: '#'
---

# Google Gemini Adapter

Google Gemini unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Teilweise** — die Kernbefehle funktionieren über Prozedurdateien.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Gemini liest Prozedurdateien und führt den sequenziellen DWP-Workflow aus.
