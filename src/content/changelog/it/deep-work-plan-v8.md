---
title: "DWP v8: spec-first, con ciclo chiuso"
description: "Deep Work Plan v8 unisce piani spec-first, repository come harness, Loop engineering ed efficienza misurata; il ciclo completa i piani approvati."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: it
order: 0
featured: true
sourceLabel: "Release taggate e bozza del contratto v8"
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

Deep Work Plan v8 riunisce sviluppo spec-first, repository come harness dell’agente, Loop engineering ed efficienza misurata. Frase di lavoro: «Spec-first, ciclo chiuso: il repository è l’harness e il piano procede da sé fino al completamento».

## I quattro pilastri

1. **Spec-first:** piano e specifica come fonte durevole, con accettazione e convalida esplicite. 2. **Il repository è l’harness:** contesto, strumenti, regole e stato ripristinabile restano col codice. 3. **Loop engineering:** un piano approvato segue il ciclo registrato fino al completamento. 4. **Efficienza misurata:** byte di istruzioni per flusso e misurazione pubblicata; nessuna percentuale di token dedotta.

## Cosa significa Loop engineering

Il piano registra un responsabile e una successione ordinata. Una persona avvia il daemon Herdr opzionale con herdr-peers autopilot --loop; i solleciti chiedono di proseguire senza nuova autorità. Se il responsabile manca, un successore indicato può subentrare. Gli eventi raggiungono il notifier Dailybot e la vista fleet mostra agenti e piani sulle macchine abilitate. Il daemon è avviato da una persona; Herdr è facoltativo.

## Release che forniscono i meccanismi

Il rafforzamento del pacchetto v7.11.0 e le release v7.12.x per registrazione e notifiche forniscono i meccanismi lato piano. herdr-peers v1.3.x aggiunge ciclo, report e fleet; v2.0.0 aggiunge brain del protocollo 2 e consumer della coda. coding-agents-kit v1.3.0 fornisce pick-v2, v1.4.0 l’aggiornamento verificato. Release taggate sopra; addon facoltativi.

## Contratto v8 — RE-VERIFY AT 8.0.0

La bozza origin/feat/v8-line aggiunge autonomy a plan-contract/v8: budget di stallo, pane sollecitabili, destinatari, permesso del brain e comportamento della coda. Definisce anche dwp-queue-v1 per .dwp/queue.json; il pacchetto scrive e Herdr consuma la coda. Affermazioni provvisorie da verificare negli artefatti taggati 8.0.0 prima della pubblicazione.
