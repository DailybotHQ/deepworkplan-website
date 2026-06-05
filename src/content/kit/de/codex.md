---
title: OpenAI Codex
description: "Der DWP-Adapter für OpenAI Codex, mit vollständiger Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop ausführen."
kind: adapter
lang: de
order: 3
agent: OpenAI Codex
support: full
prefix: '#'
---

# OpenAI Codex Adapter

OpenAI Codex unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei. Das Offline-Bundle wird empfohlen; Regeln werden unter `.codex/` installiert.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest; Regeln werden unter `.codex/` installiert.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Codex liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
