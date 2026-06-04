---
title: GitHub Copilot
description: "Der DWP-Adapter für GitHub Copilot, mit teilweiser Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix; ein Teil der Automatisierung erfolgt manuell."
kind: adapter
lang: de
order: 4
agent: GitHub Copilot
support: partial
prefix: '#'
---

# GitHub Copilot Adapter

GitHub Copilot unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Teilweise** — die Kernbefehle funktionieren über Prozedurdateien; ein Teil der Automatisierung erfolgt manuell.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren im Repository vor.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Copilot liest Prozedurdateien, hat aber eine weniger autonome Ausführung als Claude Code.
