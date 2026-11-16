---
title: "DWP v8: spec-first mit geschlossenem Zyklus"
description: "Deep Work Plan v8 verbindet spec-first-Pläne, das Repository als Harness, Loop engineering und gemessene Effizienz; der Zyklus schließt genehmigte Pläne ab."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: de
order: 0
featured: true
sourceLabel: "Getaggte Releases und Entwurf des v8-Vertrags"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 verbindet vier Ideen: spec-first-Entwicklung, das Repository als Harness für Agenten, Loop engineering und gemessene Effizienz. Arbeitssatz: „Spec-first, geschlossen im Zyklus: Das Repository ist das Harness und der Plan läuft selbst bis zum Abschluss.“

## Die vier Säulen

1. **Spec-first:** Plan und Spezifikation als dauerhafte Quelle mit klarer Abnahme und Validierung. 2. **Repository als Harness:** Kontext, Werkzeuge, Regeln und fortsetzbarer Zustand liegen beim Code. 3. **Loop engineering:** Ein genehmigter Plan durchläuft seinen Ablauf bis zum Ende. 4. **Gemessene Effizienz:** Instruktionsbytes pro Ablauf mit öffentlichem Messpfad; keine abgeleiteten Token-Prozente.

## Was Loop engineering bedeutet

Der Plan registriert Leitung und geordnete Nachfolge. Ein Mensch startet den optionalen Herdr-Daemon mit herdr-peers autopilot --loop; Anstöße bitten um Fortsetzung, ohne neue Befugnisse zu erteilen. Ist die Leitung nicht verfügbar, kann ein Nachfolger übernehmen. Ereignisse erreichen den Dailybot-Notifier, die Flottenansicht zeigt Agenten und Pläne aktivierter Rechner. Der Mensch startet den Daemon; Herdr ist optional.

## Releases mit dieser Infrastruktur

Pack-Härtung v7.11.0 sowie Planregistrierung und Benachrichtigungen in v7.12.x liefern Planmechanismen. herdr-peers v1.3.x ergänzt Zyklus, Berichte und Flottenansicht; v2.0.0 ergänzt Protokoll-2-Brain und Queue-Konsument. coding-agents-kit v1.3.0 liefert pick-v2, v1.4.0 den verifizierten Updater. Releases oben getaggt; Addons sind optional.

## v8-Vertrag — RE-VERIFY AT 8.0.0

Der Entwurf origin/feat/v8-line ergänzt plan-contract/v8 um autonomy: Stillstandsbudget, ansprechbare Pane-Adressen, Benachrichtigungsziele, Brain-Berechtigung und Queue-Verhalten. Außerdem definiert er dwp-queue-v1 für .dwp/queue.json; das Pack schreibt, Herdr liest die Queue. Vorläufige Aussagen: vor Veröffentlichung anhand getaggter 8.0.0-Artefakte prüfen.
