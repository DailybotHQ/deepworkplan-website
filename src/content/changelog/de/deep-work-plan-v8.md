---
title: "DWP v8: spec-first mit geschlossenem Zyklus"
description: "Deep Work Plan v8 verbindet spec-first-Pläne, das Repository als Harness, Loop engineering und gemessene Effizienz; der Zyklus schließt genehmigte Pläne ab."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: de
order: 0
featured: true
sourceLabel: "Skill-Release v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Skill-Release v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Skill-Release v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Skill-Release v8.0.6"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.6"
  - label: "LOOP_ENGINEERING.md (normativ, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering im Spezifikationsreader"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Schema plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Schema journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Schema plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Schreiber der Planwarteschlange (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Skill-Release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill-Release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill-Release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.2"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.2"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 verbindet vier Ideen: spec-first-Entwicklung, das Repository als Agenten-Harness, Loop engineering und gemessene Effizienz. Der Arbeitssatz lautet: „Spec-first, loop-closed: Das Repository ist das Harness und der Plan läuft selbst bis zum Abschluss.“

## Die vier Säulen

1. **Spec-first.** Plan und Spezifikation sind die dauerhafte Quelle der Wahrheit, mit ausdrücklichen Abnahmekriterien und Validierungstoren.
2. **Das Repository ist das Harness.** Kontext, Werkzeuge, Kontrollregeln und fortsetzbarer Zustand liegen beim Code, damit verschiedene Agenten mit demselben Repository arbeiten.
3. **Loop engineering.** Ein genehmigter Plan kann seinen aufgezeichneten Lebenszyklus bis zum Abschluss durchlaufen.
4. **Gemessene Effizienz.** Effizienz wird in Instruktionsbytes pro Ablauf angegeben, mit einem veröffentlichten Messpfad; Token-Prozentsätze werden nicht abgeleitet.

## Was Loop engineering bedeutet

Der Plan registriert eine Leitung und eine geordnete Nachfolge. Ein Mensch startet den optionalen Herdr-Daemon mit `herdr-peers autopilot --loop`; seine Anstöße fordern die Leitung zum Fortfahren auf, ohne neue Befugnisse zu erteilen. Ist die Leitung nicht mehr verfügbar, kann der Ablauf einen eingetragenen Nachfolger um die Übernahme bitten. Planereignisse können den Dailybot-Notifier des Pakets erreichen; die Flottenansicht zeigt Agenten und Pläne auf aktivierten Maschinen. Der Mensch bleibt für den Start des Daemons verantwortlich; das Herdr-Addon ist optional.

## Releases mit der Funktionalität

Die Härtung des Pakets v7.11.0 sowie die Planregistrierung und Benachrichtigungen aus v7.12.x liefern die Planmechanik. herdr-peers v1.3.x ergänzt Ablauf, Berichte und Flottenansicht; v2.0.0 ergänzt das Brain für Protokoll 2 und den Warteschlangen-Consumer. coding-agents-kit v1.3.0 liefert den pick-v2-Startvertrag, v1.4.0 den verifizierten Updater. herdr-peers v2.1.0 liest strukturierte v8-Blocker; coding-agents-kit v1.5.0 ergänzt eine Tokenmessung ausschließlich für gemeldete Werte. Die Addon-Deskriptoren des Pakets 8.0.0 pinnen herdr-peers v2.1.0, coding-agents-kit v1.5.0 und devcontainer-kit v1.3.0. Die getaggten Releases sind oben verlinkt. Das Paket funktioniert ohne diese optionalen Addons.

## Der v8-Vertrag

Release 8.0.0 implementiert den DWP-Standard 8.0.0. Neue Pläne werden mit `plan-contract/v8` erstellt; v7-, v6- und v5-Pläne behalten ihre aufgezeichnete Generation und wechseln nur durch eine ausdrückliche Migration mit `refine migrate`. v8-Pläne behalten die Linie `plan-manifest/v7`; `journal-event/v7` bleibt für bestehende Pläne unterstützt. Die normative Quelle ist `LOOP_ENGINEERING.md`, ergänzt durch drei veröffentlichte Schemata.

- **Der `autonomy`-Block.** Ein optionaler, geschlossener Block in `plan-contract/v8`, der die Ablaufbefugnisse des Plans festhält: `stall_budget` (1–10, Standard 3), `promptable`-Panes (Standard: nur die Leitung), `notify`-Ziele (Standard: keine), `brain` (Standard: `false`) und `queue` (`prompt-lead`, `launch` oder `none`, Standard `none`). Fehlt der Block, gelten alle Standardwerte und der Mensch bleibt zuständig für die Lösung.
- **Strukturierte Blocker.** Ein Blocker ist ein `blocker`-Ereignis von `journal-event/v8`, das nur über den Ledger-Helper erstellt und aufgelöst wird. Es enthält eine Aufgabe, einen Grund, eine Zeile `needs`, eine erforderliche Klasse C1 bis C7 und optional einen Resolver. `resolver: lead` wird für C1, C2, C5 und C6 abgelehnt; der Ablauf bittet die Leitung nur bei einem Blocker um Lösung, den der Plan selbst mit `resolver: lead` markiert hat. `state.json` wird zu `plan-snapshot/v8`, mit aktivem Blocker und abgeleitetem Status `blocked`; `PROGRESS.md` beginnt mit einem vierzeiligen Kopf: Ziel, aktuelle Aufgabe, nächste Aktion und Bedarf.
- **Die Planwarteschlange.** `.dwp/queue.json` (`dwp-queue-v1`) wird nur von `shared/queue.py` des Pakets oder einem Menschen geschrieben. Bei Freigabe hängt `create` einen Plan an; der Herdr-Daemon liest die Warteschlange nur. Sie fasst höchstens 64 Pläne und führt pro Repository jeweils einen Plan aus, sofern dieser nicht `parallel: true` setzt. Eine beschädigte Warteschlange unterbricht den Lebenszyklus nicht.

Die letzte v7-Version war **7.12.2**.

Installierte Skill-Version: **8.0.6**.
