---
title: OpenClaw
description: "Der DWP-Adapter für OpenClaw: natives .agents/skills-Scanning, Mapping für unbeaufsichtigte Ausführung und cron-gesteuerter Plan-Fortsetzung für autonome Agenten-Arbeitsbereiche."
kind: adapter
lang: de
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# OpenClaw-Adapter

OpenClaw ist eine autonome Agenten-Plattform, die langlebige Arbeitsbereiche mit geplanten Turns ausführt. Sie scannt nativ `<workspace>/.agents/skills/` nach installierten Skill-Paketen, was bedeutet, dass das DWP-Skill ohne jeglichen Adapter-Shim geladen wird — dort installieren und OpenClaw lädt es automatisch.

## Support-Level

**Vollständig** — OpenClaw liest `AGENTS.md` und lädt das Skill über den AgentSkills-Standard. Alle DWP-Sub-Skills (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) sind verfügbar.

## Installation

```bash
openclaw skills install deepworkplan
```

Oder manuell: `DailybotHQ/deepworkplan-skill` in `<workspace>/.agents/skills/deepworkplan/` klonen.

## Aufruf

Einfacher Text — OpenClaw verwendet kein Slash-Command-Präfix:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mapping für unbeaufsichtigte Ausführung

OpenClaws Scheduling-Primitive bilden sich direkt auf DWPs Fortsetzungsmodell ab:

| OpenClaw-Primitiv | DWP-Rolle |
|--------------------|----------|
| Arbeitsbereich-Stammverzeichnis | [Agenten-Arbeitsbereich](/spec/archetypes)-Archetyp: `AGENTS.md`, `.agents/`, `.dwp/` im Arbeitsbereich-Stammverzeichnis |
| `<workspace>/.agents/skills/` (nativer Tier-2-Scan) | Wo dieses Paket liegt — kein Adapter-Shim erforderlich |
| Heartbeat oder Cron-Turn | Ein [geplanter Fortsetzungs](/spec/agent-protocol#scheduled-continuation)-Turn: aufwachen → DWP-Wiederaufnahme-Protokoll → nächste atomare Aufgabe → Zustand aktualisieren → freigeben |
| `HEARTBEAT.md`-Prüfungen | Eine Zeile hinzufügen: „If `.dwp/plans/` has an open plan, resume it for one task." |
| Stehende Anweisungen | Die Plan-Genehmigungsgrenze und die begrenzte Autorität des unbeaufsichtigten Profils |

Operativ:

1. Ein Mensch erstellt und genehmigt einen Plan interaktiv. Die Genehmigung ist der Kontrollpunkt — unbeaufsichtigte Turns erstellen und führen in einem Turn niemals aus.
2. Der Plan muss die maschinenlesbare Zustandsschicht tragen (`manifest.json` + `state.json`). In einem Arbeitsbereich ohne git ermöglicht `state.json` erst die absturzsichere Wiederaufnahme. Siehe [Plan-Zustand](/spec/plan-state).
3. Jeder Heartbeat- oder Cron-Turn führt höchstens eine Aufgabe aus, besteht sein Validierungs-Gate, aktualisiert `state.json` atomar und gibt frei.
4. Bei jeder Stopbedingung schreibt der Agent das `blocked`-Feld von `state.json` und meldet über den normalen Kanal des Arbeitsbereichs. Der nächste menschliche Blick — oder Heartbeat-Bericht — sieht genau das, was benötigt wird.

Das Ergebnis: ein mehrtägiger Plan, der Neustarts, Modellwechsel und Sitzungsgrenzen überlebt, der nachts vom Daemon ausgeführt wird — mit denselben Gates, die ein menschlich beaufsichtigter Lauf hätte.

## Hinweise

OpenClaws Arbeitsbereich ist das kanonische Beispiel des [Agenten-Arbeitsbereich](/spec/archetypes)-Archetyps. Die `HEARTBEAT.md`-Integration des DWP-Skill-Pakets und die `state.json`-Anforderung wurden mit dieser Plattform im Sinn entwickelt.
