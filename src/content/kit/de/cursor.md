---
title: Cursor
description: "Der DWP-Adapter für Cursor AI, mit voller Unterstützung über das Project-Rules-System und das Hash-Befehlspräfix, da Cursor den Slash für sich reserviert."
kind: adapter
lang: de
order: 2
agent: Cursor
support: full
prefix: '#'
---

# Cursor Adapter

Cursor unterstützt DWP über Project Rules und Befehlsdateien.

## Unterstützungsstufe

**Voll** — die DWP-Befehle funktionieren über das Rules-System von Cursor.

## Installation

DWP-Befehle liegen als Markdown im Projekt vor. Cursor liest sie über sein Rules-System.

## Aufruf

Verwenden Sie das `#`-Präfix (Cursor fängt `/` ab):

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Verwenden Sie `#`, weil Cursor `/` für seine eigenen Befehle reserviert.
