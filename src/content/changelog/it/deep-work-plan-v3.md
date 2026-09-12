---
title: "DWP v3: efficienza dei token per costruzione"
description: "Deep Work Plan v3 ricostruisce l'harness attorno al costo del contesto — divulgazione progressiva, validazione mirata alla sola superficie interessata e un'unica Final Review obbligatoria — alzando al contempo il livello minimo di trust e conformità."
date: 2026-09-10
version: "v3 · Efficienza dei token"
kind: release
lang: it
order: 3
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Oggi rilasciamo Deep Work Plan v3. Il contesto è la risorsa più scarsa di un agente, e questa release tratta questo vincolo come un problema di ingegneria piuttosto che come una promessa informale: comprimere l'impalcatura, mai le istruzioni.

`GUIDE.md` diventa un indice di instradamento invece di un documento che ogni agente legge per intero, così un agente carica solo la guida di cui un determinato passo ha effettivamente bisogno. I gate di validazione vengono ora selezionati in base alla superficie toccata da ciascun task invece di rieseguire l'intera suite a ogni modifica, e la creazione di un piano può passare direttamente alla modalità trust quando uno sviluppatore sa già cosa vuole, saltando la revisione intermedia. Nulla di tutto questo indebolisce i gate: elimina letture ripetute, caricamento di contesto ridondante e lavoro di validazione che non corrisponde a ciò che è realmente cambiato.

Accanto al lavoro sull'efficienza, questa release alza il livello minimo di trust. Un'unica Final Review obbligatoria sostituisce i tre task di chiusura che un tempo concludevano un piano, la revisione locale con AI Diff Reviewer diventa un componente obbligatorio della base, e la conformità parte ora da zero addon opzionali: sicurezza e provenienza sono requisiti, non rifiniture facoltative. `AGENTS.md` registra la provenienza dello standard DWP del repository, e i piani legacy mantengono la propria forma registrata con un percorso di migrazione esplicito invece di essere riscritti silenziosamente.

Questa release segue lo standard DWP `2.3.0`. Il carico di istruzioni e il comportamento di replay sono misurati rispetto a un registro di valutazione pubblico, mai riportati come una percentuale di risparmio inventata.

Leggi [l'architettura per l'efficienza dei token](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) e la relativa [scheda di valutazione](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), oppure esplora la [specifica normativa](https://deepworkplan.com/spec) e il [kit](https://deepworkplan.com/kit/).
