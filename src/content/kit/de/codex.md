---
title: OpenAI Codex
description: "Der DWP-Adapter für OpenAI Codex, mit voller Unterstützung via Markdown-Befehlsprozeduren und das Hash-Präfix, die den gesamten Deep Work Plan Loop ausführen."
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

**Vollständig** (Verhaltensgeprüft) — jeder dwp-*-Befehl läuft aus seiner Prozedurdatei, bewiesen in bidirektionalen Author-/Resume-Benchmarks über Modelle hinweg.

## Installation

DWP-Befehle liegen als Markdown-Prozeduren vor, die der Agent beim Aufruf liest; Regeln werden unter `.codex/` installiert.

Optional: [coding-agents-kit](/kit/agentkit) kann diese CLI installieren und mit `ak codex` starten. Der offizielle Installer des Anbieters funktioniert genauso gut.

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install codex
```

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

Codex liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
