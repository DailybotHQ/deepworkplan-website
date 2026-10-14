---
title: Antigravity
description: "Der DWP-Adapter für Antigravity, mit voller Unterstützung via Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop steuern."
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

**Vollständig** (Installationsgeprüft) — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei. Route durch automatisierte Testsuiten bestätigt; Verhaltens-Workflows laufen auf der sequenziellen Baseline.

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
