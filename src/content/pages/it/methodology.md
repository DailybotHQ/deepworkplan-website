---
title: "La metodologia Deep Work Plan"
description: "Cinque capitoli dal manifesto agli archetipi: i principi, il core loop, i template, le skill e gli adattamenti dietro la metodologia Deep Work Plan."
lastUpdated: 2026-05-30
---

## La metodologia Deep Work Plan

Deep Work Plan (DWP) è una metodologia aperta e indipendente dal framework per condurre lavoro di ingegneria strutturato e autonomo con agenti di coding AI. Trasforma un obiettivo vago in un piano revisionabile che un agente può eseguire, mettere in pausa, riprendere e su cui riferire — senza perdere il contesto.

DWP poggia su due pilastri.

**Spec-driven development.** Anziché trattare una trascrizione di chat come fonte di verità, prima si mette per iscritto *cosa* dovrebbe essere vero — obiettivo, ambito, criteri di accettazione e le verifiche che ne provano il completamento — e l’agente esegue rispetto a quella specifica. In DWP il piano *è* la spec: piano → attività atomiche → validation gate → completamento. Scrivere prima la spec riduce la deriva (l’agente è misurato rispetto a criteri dichiarati), rende il lavoro verificabile (ogni gate ha esito positivo o negativo) e lo rende ripristinabile (la spec sopravvive a qualsiasi sessione o agente). Indipendente dallo strumento e nativo del repository, si differenzia dai sistemi spec-driven legati a uno strumento come GitHub Spec Kit, Amazon Kiro e Tessl.

**Harness engineering — il repository diventa la harness.** Un modello linguistico da solo è solo un predittore di testo; ciò che lo rende un ingegnere affidabile è la *harness* attorno a esso — contesto, strumenti, un ciclo di controllo, salvaguardie e stato persistente. L’harness engineering è progettare quell’impalcatura in modo deliberato. La posizione di DWP è che dovrebbe vivere nel repository, non in uno strumento: il contesto come `AGENTS.md` + `docs/`, gli strumenti come il kit `.agents/`, il ciclo di controllo come il piano, le salvaguardie come i validation gate e lo stato come la `.dwp/` esclusa da git. Poiché ogni parte è un file nel repo, la harness è portabile — così qualsiasi agente può pilotare qualsiasi repo.

La metodologia è spiegata in cinque capitoli:

1. **Manifesto** — cos’è un Deep Work Plan e perché l’esecuzione strutturata conta.
2. **Core loop** — il ciclo pianifica-esegui-verifica che guida ogni attività.
3. **Template** — le strutture di piano e attività condivise da agenti e persone.
4. **Skill e agenti** — come si integrano comandi e ruoli degli agenti, il kit vivo (come un repository fa crescere le proprie skill tramite la sub-skill author) e gli addon di manutenzione opt-in come dependency-upgrade.
5. **Archetipi** — adattare la metodologia ai repo individuali e agli hub orchestratori.

- [Leggi la metodologia](/methodology)
- [Leggi la specifica](/spec)
- [Esplora il kit](/kit)
