---
title: Claude Code
description: "Der DWP-Adapter für Claude Code, mit voller Unterstützung über native Slash-Befehle und Skills, inklusive Subagenten und Team-Agenten für den vollständigen."
kind: adapter
lang: de
order: 1
agent: Claude Code
support: full
prefix: /
---

# Claude Code Adapter

Claude Code hat **volle** DWP-Unterstützung über native Slash-Befehle und Skills.

## Unterstützungsstufe

**Vollständig** (Verhaltensgeprüft) — die vollständige Suite von DWP-Sub-Skills und Lebenszyklusbefehlen wird auf native Claude-Code-Slash-Befehle abgebildet, bewiesen in bidirektionalen Übergabe-Benchmarks.

## Installation

DWP wird als Skills unter `.agents/skills/` ausgeliefert (aufgelöst über den `.claude/`-Symlink). Claude Code erkennt sie automatisch.

Optional: [coding-agents-kit](/kit/agentkit) kann diese CLI installieren und mit `ak claude` starten. Der offizielle Installer des Anbieters funktioniert genauso gut.

```bash
git clone --branch v1.1.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak install claude
```

## Aufruf

Verwenden Sie das `/`-Präfix:

```
/dwp-create <goal>
/dwp-execute
```

## Hinweise

Claude Code unterstützt Skills, Subagenten und Team-Agenten — den vollständigen DWP-Funktionsumfang.
