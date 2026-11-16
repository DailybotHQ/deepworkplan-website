---
title: "La metodologia Deep Work Plan"
description: "Otto capitoli, dal manifesto al loop engineering: principi, ciclo centrale, template, skill, archetipi, molti agenti, sciami e il loop di Deep Work Plan."
lastUpdated: 2026-11-16
---

## La metodologia Deep Work Plan

Il pacchetto 7.x attuale crea per impostazione predefinita i nuovi piani in v7. I piani esistenti mantengono la generazione registrata; la migrazione richiede una richiesta esplicita.
Deep Work Plan (DWP) è una metodologia aperta e indipendente dal framework per condurre lavoro di ingegneria strutturato e autonomo con agenti di coding AI. Trasforma un obiettivo vago in un piano revisionabile che un agente può eseguire, mettere in pausa, riprendere e su cui riferire — senza perdere il contesto.

DWP poggia su quattro pilastri — prima la specifica, il repository è la harness, loop engineering ed efficienza misurata. In una frase: *Prima la specifica, loop chiuso: il repository è la harness e il piano si esegue da solo fino alla fine.*

**Prima la specifica.** Anziché trattare una trascrizione di chat come fonte di verità, prima si mette per iscritto *cosa* dovrebbe essere vero — obiettivo, ambito, criteri di accettazione e le verifiche che ne provano il completamento — e l’agente esegue rispetto a quella specifica. In DWP il piano *è* la spec: piano → attività atomiche → validation gate → completamento. Scrivere prima la spec riduce la deriva (l’agente è misurato rispetto a criteri dichiarati), rende il lavoro verificabile (ogni gate ha esito positivo o negativo) e lo rende ripristinabile (la spec sopravvive a qualsiasi sessione o agente). Indipendente dallo strumento e nativo del repository, si differenzia dai sistemi spec-driven legati a uno strumento come GitHub Spec Kit, Amazon Kiro e Tessl.

**Il repository è la harness.** Un modello linguistico da solo è solo un predittore di testo; ciò che lo rende un ingegnere affidabile è la *harness* attorno a esso — contesto, strumenti, un ciclo di controllo, salvaguardie e stato persistente. L’harness engineering è progettare quell’impalcatura in modo deliberato. La posizione di DWP è che dovrebbe vivere nel repository, non in uno strumento: il contesto come `AGENTS.md` + `docs/`, gli strumenti come il kit `.agents/`, il ciclo di controllo come il piano, le salvaguardie come i validation gate e lo stato come la `.dwp/` esclusa da git. Poiché ogni parte è un file nel repo, la harness è portabile — così qualsiasi agente può pilotare qualsiasi repo.

**Loop engineering.** Una specifica e una harness rendono il lavoro corretto e portabile; il loop engineering lo porta a termine. Con l’addon facoltativo Herdr, un piano registra il suo lead e, quando li nomina, i successori; un daemon che solo una persona avvia sollecita un lead inattivo a continuare, chiede al primo successore raggiungibile di subentrare a un lead che non c’è più e segnala quando un piano si ferma, si blocca o si completa. Un sollecito non aggiunge autorità — i gate e le escalation del piano restano vincolanti come prima. La metodologia funziona senza il loop; il loop si limita ad amplificarla.

**Efficienza misurata.** Il contesto è la risorsa più scarsa per un agente di coding, e una metodologia che la spreca fallisce esattamente quando il lavoro si allunga. DWP carica le istruzioni progressivamente — ogni guida si carica quando scatta il suo trigger —, seleziona la validazione da ciò che ogni attività tocca realmente e decide le skill a livello di attività. I byte di istruzione richiesti da ogni flusso sono misurati e pubblicati; nessuna percentuale di token inventata.

La metodologia è spiegata in otto capitoli:

1. **Manifesto** — cos’è un Deep Work Plan e perché l’esecuzione strutturata conta.
2. **Core loop** — il ciclo pianifica-esegui-verifica che guida ogni attività.
3. **Template** — le strutture di piano e attività condivise da agenti e persone.
4. **Skill e agenti** — come si integrano comandi e ruoli degli agenti, il kit vivo (come un repository fa crescere le proprie skill tramite la sub-skill author) e gli addon opt-in come dependency-upgrade e l’addon design-system per qualsiasi superficie di interfaccia rivolta all’utente (UI visuale, output CLI o conversazionale).
5. **Archetipi** — adattare la metodologia ai repo individuali e agli hub orchestratori.
6. **Eseguire molti agenti** — un lead e le sue corsie tra pannelli, container, macchine e account, con un branch e un rilascio per repository.
7. **Autonomia dello sciame** — controlli di capacità ai confini dei task, pacchetti di consegna, successione del lead per epoche ed escalation solo per ciò che è critico, così uno sciame sopravvive al limite di un account o alla perdita di un agente.
8. **Loop engineering** — registrazione del piano, il daemon avviato da una persona, solleciti che non aggiungono autorità, subentro dei successori, eventi del piano, la coda dei piani e la mappa della flotta.

- [Leggi la metodologia](/methodology)
- [Leggi la specifica](/spec)
- [Esplora il kit](/kit)
