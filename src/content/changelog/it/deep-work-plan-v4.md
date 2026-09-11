---
title: "DWP v4: piani su misura per il lavoro"
description: "Deep Work Plan v4 fa sì che il formato del piano segua il lavoro, e non il contrario: un piano Lite è ora una proposta completa ed eseguibile per i task delimitati, e la fase separata di bozza è stata eliminata."
date: 2026-09-11
version: "v4 · Piani Lite-first"
kind: release
lang: it
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Oggi rilasciamo Deep Work Plan v4. Questa release riguarda agilità e versatilità: la stessa metodologia deve risultare leggera per una correzione delimitata e reggere comunque per un lavoro che si estende su ore o giorni, senza chiedere a uno sviluppatore di scegliere il formato "serio" solo per ottenere gate reali.

Creare un piano per un lavoro delimitato non significa più scrivere una bozza usa e getta da rivedere e poi un piano finale separato. `create` ora materializza direttamente un **piano Lite**: una proposta compatta e pienamente eseguibile con record di task inline, ciascuno con i propri criteri di accettazione, gate di validazione e log di completamento. Non esiste più la fase di staging `.dwp/drafts/`: la bozza e il piano sono lo stesso artefatto, revisionabile ed eseguibile fin dal momento in cui viene scritto.

I piani Full a file separati restano esattamente dove devono stare: il lavoro più lungo e a rischio più elevato continua ad avere un file per task, un record di analisi dedicato e lo stesso livello di stato ripristinabile. Un piano Lite può essere promosso a Full in qualsiasi momento in cui un requisito o un gate di validazione non entrerebbe più in un record compatto, e la scelta della rappresentazione da cui partire segue segnali espliciti e registrati — numero di task, superficie toccata, rischio, reversibilità — mai un'ipotesi.

Questa release segue lo standard DWP `2.4.0`. Leggi la [specifica normativa](https://deepworkplan.com/spec), esplora il [kit](https://deepworkplan.com/kit/) oppure avvia l'adozione da [`/init`](https://deepworkplan.com/init).
