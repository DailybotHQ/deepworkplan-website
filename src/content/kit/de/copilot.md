---
title: GitHub Copilot
description: "Der DWP-Adapter für GitHub Copilot, mit vollständiger Unterstützung über AGENTS.md und Markdown-Befehlsprozeduren, die mit dem Hash-Präfix aufgerufen werden."
kind: adapter
lang: de
order: 4
agent: GitHub Copilot
support: full
prefix: '#'
---

# GitHub Copilot Adapter

GitHub Copilot unterstützt DWP über AGENTS.md und Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** (Installationsgeprüft) — Copilot liest AGENTS.md sowie die dwp-*-Prozedurdateien und führt jeden Befehl daraus aus. Route durch automatisierte Testsuiten bestätigt.

## Installation

DWP liefert AGENTS.md und die Befehlsprozeduren im Repository; Copilot liest sie als Repository-Kontext.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Copilot liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
