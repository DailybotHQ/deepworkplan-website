---
title: Hermes
description: "Der DWP-Adapter für Hermes: Skills über den AgentSkills-Standard, episodisches Gedächtnis aus Plan-Ergebnissen und cron-gesteuerte Fortsetzung von Plänen."
kind: adapter
lang: de
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Hermes-Adapter

Hermes ist eine autonome Agenten-Plattform, die Skills über den AgentSkills-Standard lädt und episodisches Gedächtnis über Sitzungen hinweg pflegt. DWP integriert sich in beide Oberflächen: Das Skill-Paket lädt aus `.agents/skills/` auf dieselbe Weise wie jedes andere AgentSkills-kompatible Paket, und die Ergebnis-Einträge von `state.json` fließen direkt in den Speicher-Index von Hermes ein.

In v6- und v7-Plänen wird der Status über `ledger.py project` aus dem reinen Anhangsjournal (`journal.ndjson`) projiziert, anstatt Statusdateien manuell neu zu schreiben.

## Support-Level

**Vollständig** (Dokumentiert) — Hermes liest `AGENTS.md` und lädt den Skill über das AgentSkills-Standardladen. Alle DWP-Sub-Skills sind verfügbar.

## Installation

Das Skill-Paket in das `.agents/skills/`-Verzeichnis des Arbeitsbereichs installieren oder den Skill-Manager der Plattform verwenden, falls verfügbar.

## Aufruf

Einfacher Text:

```
create a plan for <goal>
resume the open plan
```

## Episodische Gedächtnis-Synergie

In v6- und v7-Plänen fließen die deterministischen Verifizierungsbelege von DWP (`outcomes.py receipt`) und Ergebnisdatensätze direkt in den Speicherindex von Hermes ein: Jede abgeschlossene Aufgabe enthält in einem strukturierten JSON-Schema, was versucht wurde, fehlgeschlagen ist und funktioniert hat. Abgeschlossene Pläne werden zum abrufbaren episodischen Gedächtnis — ein Agent kann sich daran erinnern, wie ein Problem gelöst wurde.

Ephemere Sitzungen hängen Ereignisse an `journal.ndjson` an und projizieren `state.json` über `ledger.py project`, anstatt Statusdateien manuell neu zu schreiben. Siehe [Plan-Zustand](/spec/plan-state#outcome-records-as-episodic-memory).

## Cron-gesteuerte Fortsetzung

Auf Plattformen mit Cron-Scheduling folgt die Fortsetzung demselben Muster wie bei anderen autonomen Plattformen: Jeder geplante Turn wacht auf, führt das DWP-Wiederaufnahme-Protokoll aus, führt höchstens eine Aufgabe aus, aktualisiert `state.json` und gibt frei. Der Plan, nicht die Sitzung, ist die Einheit der Kontinuität.

Die maschinenlesbare Zustandsschicht (`manifest.json` + `state.json`) ist für unbeaufsichtigte Ausführung ERFORDERLICH. Siehe [Agentenprotokoll](/spec/agent-protocol#execution-profiles) für das vollständige Stopbedingungen- und Eskalationsprotokoll.

## Hinweise

Hermes und OpenClaw sind beide autonome Agenten-Plattformen in der Tabelle unterstützter Agenten im [Agentenprotokoll](/spec/agent-protocol). Beide laufen unter dem unbeaufsichtigten Ausführungsprofil und beide profitieren von der `state.json`-als-git-Protokoll-Äquivalenz des Agenten-Arbeitsbereich-Archetyps.
