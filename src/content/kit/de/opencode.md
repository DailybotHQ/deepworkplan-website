---
title: OpenCode
description: "Der DWP-Adapter für OpenCode, den Open-Source-Agenten, mit voller Unterstützung via natives AGENTS.md und Markdown-Prozeduren, die mit dem Hash-Präfix."
kind: adapter
lang: de
order: 7
agent: OpenCode
support: full
prefix: '#'
---

# OpenCode Adapter

OpenCode, der Open-Source-Coding-Agent, unterstützt DWP über natives AGENTS.md und Markdown-Befehlsprozeduren.

## Unterstützungsstufe

**Vollständig** (Installationsgeprüft) — OpenCode liest AGENTS.md nativ und führt jeden dwp-*-Befehl aus seiner Prozedurdatei aus. Route durch automatisierte Testsuiten bestätigt.

## Installation

DWP liefert AGENTS.md und die Befehlsprozeduren im Repository; OpenCode erkennt sie als Projektkontext.

Optional: [coding-agents-kit](/kit/agentkit) kann diese CLI installieren und mit `ak opencode` starten. Der offizielle Installer des Anbieters funktioniert genauso gut.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install opencode
```

## Aufruf

Verwenden Sie das `#`-Präfix:

```
#dwp-create <goal>
#dwp-execute
```

## Hinweise

OpenCode liest die Prozedurdateien und führt den vollständigen sequenziellen Deep Work Plan Loop aus.
