---
title: Google Gemini
description: "Der DWP-Adapter für Google Gemini, mit vollständiger Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop ausführen."
kind: adapter
lang: de
order: 5
agent: Google Gemini
support: full
prefix: '#'
---

# Google Gemini Adapter

Google Gemini unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei. Erfordert Gemini 2.5 Pro oder neuer für natives WebFetch.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Gemini liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
