---
title: Antigravity
description: "Der DWP-Adapter für Antigravity, mit vollständiger Unterstützung über Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop steuern."
kind: adapter
lang: de
order: 6
agent: Antigravity
support: full
prefix: '#'
---

# Antigravity-Adapter

Antigravity unterstützt DWP über Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei über die native Befehlsoberfläche.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest.

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Antigravity liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
