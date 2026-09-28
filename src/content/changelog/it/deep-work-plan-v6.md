---
title: "DWP v6: lo stesso metodo, un contratto più rigoroso"
description: "Deep Work Plan v6 mantiene la metodologia v5 e aggiunge una struttura di esecuzione più rigorosa. La non inferiorità dei risultati non è stata misurata."
date: 2026-09-28
version: "v6 · Struttura più rigorosa"
kind: release
lang: it
order: 0
featured: true
sourceLabel: "Set di schemi v6 pubblicato"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 mantiene la metodologia v5, la superficie dei comandi e la posizione `.dwp/plans/`. Aggiunge una struttura più rigorosa per rappresentare autorità del piano, prove di esecuzione, contesto delle attività, pianificazione e stato attivo.

Il set di schemi v6 definisce il manifest di identità, il contratto di risultati e autorità, gli eventi del journal append-only, il manifest di contesto per attività e lo snapshot attivo. La proiezione attiva v6 è uno snapshot, quindi `plan-state/v5.json` resta lo schema di stato per i piani v5; `plan-state/v6.json` non esiste. I piani esistenti mantengono la generazione registrata e non vengono mai riscritti silenziosamente.

La decisione architetturale è GO: v6 mantiene la stessa metodologia con una struttura ingegneristica più rigorosa. Non è un’affermazione di superiorità empirica. La non inferiorità dei risultati degli agenti non è stata misurata.

I nuovi piani ricevono ID numerici monotoni di almeno tre cifre (ad esempio `PLAN_001_add_payment_webhooks/`). Poiché gli schemi v5 congelati contano l’ID numerico come una parola, gli slug v5 hanno 2–4 parole e quelli v6 ne hanno 2–5. Le cartelle esistenti senza numero `PLAN_<slug>/` restano leggibili e non vengono mai rinominate. Se esistono piani numerati, `latest` risolve nel piano con l’ID numerico più alto.

Versione installata della skill: **6.0.1**. Il pacchetto 6.x crea per impostazione predefinita i nuovi piani in v6. I piani esistenti mantengono la generazione registrata; la migrazione richiede una richiesta esplicita con anteprima.
