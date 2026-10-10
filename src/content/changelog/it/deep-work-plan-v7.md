---
title: "DWP v7: piani che delegano, con traccia di ogni cosa"
description: "Deep Work Plan v7 mantiene il contratto e il registro di v6, consente a un piano di affidare compiti circoscritti ad altri agenti e aggiunge quattro addon."
date: 2026-10-10
version: "v7 · Delega con evidenza"
kind: release
lang: it
order: 0
featured: true
sourceLabel: "Set di schemi v7 pubblicato"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

Deep Work Plan v7 mantiene il metodo di v6: il contratto è l'autorità, il registro append-only è la memoria, lo scheduler decide cosa eseguire dopo e un'attività si chiude solo quando le evidenze registrate soddisfano i suoi criteri. v7 aggiunge la possibilità di delegare e mantiene la stessa disciplina sul risultato.

Un piano che concede `agent_delegation` può contrassegnare un'attività come `parallel_safe` e affidarla a un altro agente. La risposta del delegato viene registrata come dato, mai come istruzione, e resta `asserted` finché l'esecutore dei gate del piano non osserva l'esito. Solo l'esecutore produce evidenze `observed`, quindi la delega amplia la portata senza abbassare la soglia di completamento.

Quattro addon opzionali trasformano la delega in autonomia pratica. Herdr affida un'attività a un agente in un pannello, su qualsiasi macchina. Agentkit pone un unico comando `ak` sopra tutti gli agenti di programmazione da terminale, con autonomia predefinita e possibilità di disattivarla, ed esegue attività circoscritte in modalità headless in un worktree git. Devcontainer fornisce a ogni repository un container riproducibile senza alcuna chiave SSH al suo interno. DeepWorkPlan Vim è un editor da terminale con browser dei piani e visualizzatore Markdown. Ciascuno è fissato tramite tag a un prodotto con un proprio repository e funziona senza Deep Work Plan. Un repository è pienamente conforme senza nessuno di essi, e il registro in `.dwp/config.json` indica quali sono abilitati.

La modalità benchmark e apprendimenti registra ciò che ogni piano insegna, così che i risultati possano essere analizzati in seguito. Un audit dell'intero ecosistema, eseguito come piano orchestratore v7 con un agente per repository, non ha rilevato alcuna regressione di comportamento rispetto a v6: la suite del pacchetto supera 807 test su 807 in un ambiente pulito, e il carico di istruzioni è cresciuto dallo 0.1% al 3.9% per flusso (4.6% per l'intero pacchetto), misurato in byte su entrambi i tag anziché stimato in token.

v7 è un passo avanti nell'orchestrazione e nella verificabilità, ma non è ancora un'autonomia completamente senza intervento. Il ciclo di benchmark e apprendimenti non misura ancora automaticamente i piani v7, e la non inferiorità dei risultati degli agenti non è stata misurata. I piani esistenti mantengono la generazione registrata e non vengono mai migrati in modo implicito; i nuovi piani usano il contratto v7 per impostazione predefinita.

Versione installata della skill: **7.1.4**, stabile dalla 7.0.0.
