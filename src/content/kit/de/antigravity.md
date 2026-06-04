---
title: Antigravity
description: "Der DWP-Adapter für Antigravity, mit teilweiser Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix, die den sequenziellen Workflow steuern."
kind: adapter
lang: de
order: 6
agent: Antigravity
support: partial
prefix: '#'
---

# Antigravity-Adapter

Antigravity unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Teilweise** — die Kernbefehle funktionieren über Prozedurdateien.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Antigravity liest Prozedurdateien und führt den sequenziellen DWP-Workflow aus.
