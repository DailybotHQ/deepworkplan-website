---
title: OpenAI Codex
description: "Der DWP-Adapter für OpenAI Codex, mit teilweiser Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix; Team-Agenten-Funktionen sind nicht verfügbar."
kind: adapter
lang: de
order: 3
agent: OpenAI Codex
support: partial
prefix: '#'
---

# OpenAI Codex Adapter

OpenAI Codex unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Teilweise** — die Kernbefehle funktionieren; erweiterte Funktionen (Team-Agenten) sind nicht verfügbar.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Team-Agenten-Funktionen sind Claude-exklusiv; Codex unterstützt den sequenziellen Workflow.
