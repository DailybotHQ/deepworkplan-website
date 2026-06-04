---
title: "Caso di studio: questo sito web"
description: "Come deepworkplan.com stesso gira su Deep Work Plan — un resoconto reale di un repository Astro di produzione reso AI-first con la metodologia che documenta."
kind: example
lang: it
order: 2
---

# Caso di studio: questo sito web

Il sito che sta leggendo gira sulla metodologia che documenta. Fa dogfooding di Deep Work Plan: la stessa skill, lo stesso flusso `/init`, gli stessi piani `.dwp/` che userebbe qualsiasi altro repository. È un resoconto reale, non un’ipotesi.

## Prima

Come la maggior parte dei repository, anche questo non era pensato per gli agenti. Il contesto viveva nella testa delle persone e in note sparse, non c’era un’unica fonte di verità che un agente potesse leggere e fare l’onboarding di un nuovo agente significava rispiegare il progetto a ogni sessione. Il lavoro a lungo termine andava alla deriva.

## L’adozione di DWP

Il repository è stato reso AI-first con un singolo Deep Work Plan, scomposto in attività atomiche con validation gate:

1. Installare la skill Deep Work Plan come reference install, fissata da `skills-lock.json`.
2. Eseguire l’onboarding per generare un `AGENTS.md` ragionato, l’albero `docs/` e la documentazione per modulo a partire dallo stack reale del repository.
3. Costruire il kit `.agents/` multi-agente — sottili delegatori dei comandi `dwp-*` e un catalogo che corrisponde a ciò che è su disco.
4. Predisporre il workspace `.dwp/` escluso da git per piani e bozze.
5. Verificare la conformità con `/dwp-verify`.

Ogni attività è stata validata rispetto ai gate reali del repository — `biome`, `astro:check`, la suite di test, la build di produzione e il controllo di parità degli endpoint per agenti — prima di essere segnata come completata.

## Dopo

Il repository è ora AI-first secondo la sua stessa specifica: un `AGENTS.md` ragionato, un albero `docs/` categorizzato, un kit `.agents/` multi-agente e un workspace `.dwp/` escluso da git. Qualsiasi agente — Claude Code, Cursor, Codex, Gemini, Copilot — può aprirlo, leggere la harness ed eseguire piani a lungo termine senza assistenza a ogni sessione.

## Risultato

La metodologia si dimostra sul proprio sorgente: questo sito è costruito e mantenuto nello stesso modo in cui dice di costruire il Suo — seguendo [`/init.md`](/init.md). Se lo standard funziona qui, in produzione, funziona anche per il Suo repository.
