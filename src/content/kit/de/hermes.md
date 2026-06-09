---
title: Hermes
description: "Der DWP-Adapter für Hermes: AgentSkills-Standard-Skill-Laden, episodische Gedächtnis-Synergie über Ergebnis-Einträge in state.json und cron-gesteuerte Plan-Fortsetzung."
kind: adapter
lang: de
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes-Adapter

Hermes ist eine autonome Agenten-Plattform, die Skills über den AgentSkills-Standard lädt und episodisches Gedächtnis über Sitzungen hinweg pflegt. DWP integriert sich in beide Oberflächen: Das Skill-Paket lädt aus `.agents/skills/` auf dieselbe Weise wie jedes andere AgentSkills-kompatible Paket, und die Ergebnis-Einträge von `state.json` fließen direkt in den Speicher-Index von Hermes ein.

## Support-Level

**Vollständig** — Hermes liest `AGENTS.md` und lädt das Skill über AgentSkills-Standard-Laden. Alle DWP-Sub-Skills sind verfügbar.

## Installation

Das Skill-Paket in das `.agents/skills/`-Verzeichnis des Arbeitsbereichs installieren oder den Skill-Manager der Plattform verwenden, falls verfügbar.

## Aufruf

Einfacher Text:

```
create a plan for <goal>
resume the open plan
```

## Episodische Gedächtnis-Synergie

Hermes indexiert den Agenten-Speicher, um vergangene Arbeit über zukünftige Sitzungen abrufbar zu machen. DWPs `state.json`-Ergebnis-Einträge sind genau für diesen Verwendungszweck konzipiert: Jede abgeschlossene Aufgabe enthält, was `tried` (versucht) wurde, was `failed` (fehlschlug), was `worked` (funktionierte) und freie Notizen in einem strukturierten JSON-Feld. Wenn Hermes die `state.json`-Dateien des `.dwp/plans/`-Verzeichnisses des Arbeitsbereichs indexiert, werden abgeschlossene Pläne zu abrufbarem episodischen Gedächtnis — ein Agent kann später nachvollziehen, wie ein bestimmtes Problem gelöst wurde, nicht nur, dass ein Plan lief.

Das bedeutet, dass DWP-Pläne auf Hermes auf zwei Arten dauerhaft sind: Die Markdown-Dateien sind die menschenlesbare Aufzeichnung, und die `state.json`-Ergebnis-Einträge sind das maschinenindexierbare Gedächtnis. Siehe [Plan-Zustand](/spec/plan-state#outcome-records-as-episodic-memory).

## Cron-gesteuerte Fortsetzung

Auf Plattformen mit Cron-Scheduling folgt die Fortsetzung demselben Muster wie bei anderen autonomen Plattformen: Jeder geplante Turn wacht auf, führt das DWP-Wiederaufnahme-Protokoll aus, führt höchstens eine Aufgabe aus, aktualisiert `state.json` und gibt frei. Der Plan, nicht die Sitzung, ist die Einheit der Kontinuität.

Die maschinenlesbare Zustandsschicht (`manifest.json` + `state.json`) ist für unbeaufsichtigte Ausführung ERFORDERLICH. Siehe [Agentenprotokoll](/spec/agent-protocol#execution-profiles) für das vollständige Stopbedingungen- und Eskalationsprotokoll.

## Hinweise

Hermes und OpenClaw sind beide autonome Agenten-Plattformen in der Tabelle unterstützter Agenten im [Agentenprotokoll](/spec/agent-protocol). Beide laufen unter dem unbeaufsichtigten Ausführungsprofil und beide profitieren von der `state.json`-als-git-Protokoll-Äquivalenz des Agenten-Arbeitsbereich-Archetyps.
