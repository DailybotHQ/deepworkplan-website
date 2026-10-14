---
title: Cline
description: "Der DWP-Adapter für Cline, den Open-Source-Agenten, mit voller Unterstützung via Markdown-Regeln und Befehlsprozeduren, die mit dem Hash-Präfix aufgerufen."
kind: adapter
lang: de
order: 9
agent: Cline
support: full
prefix: '#'
---

# Cline Adapter

Cline, der Open-Source-Coding-Agent, unterstützt DWP über Markdown-Regeln und Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** (Installationsgeprüft) — Cline liest Markdown-Regeln und führt jeden dwp-*-Befehl aus seiner Prozedurdatei aus. Route durch automatisierte Testsuiten bestätigt.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent über Clines Regelwerk liest.

Optional: [coding-agents-kit](/kit/agentkit) kann diese CLI installieren und mit `ak cline` starten. Der offizielle Installer des Anbieters funktioniert genauso gut.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install cline
```

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Cline liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
