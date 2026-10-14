---
title: Google Gemini
description: "Der DWP-Adapter für Google Gemini, mit voller Unterstützung via Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop ausführen."
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

**Vollständig** (Installationsgeprüft) — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei. Route durch automatisierte Testsuiten bestätigt; Verhaltens-Workflows laufen auf der sequenziellen Baseline. Erfordert Werkzeugausführung und Dateizugriff im Arbeitsbereich.

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
