---
title: "Deep Work Plan — esecuzione strutturata per agenti di coding AI"
description: "Il contesto conta più dei modelli. Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato in cui ogni agente di coding porta a termine il lavoro a lungo termine."
lastUpdated: 2026-09-10
---

## I modelli contano. Il contesto conta di più.

Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato — contesto, guardrail e un piano duraturo — dove qualsiasi agente di coding esegue con precisione ed efficienza e porta a termine il lavoro di lungo corso.

Deep Work Plan (DWP) è una metodologia e un kit aperti, sotto licenza MIT, per pianificare ed eseguire lavoro software complesso con agenti AI. Non sceglie un metodo di installazione né copia un template — copia il prompt di init.md e lo incolla nel Suo agente:

> Copi il prompt di init.md e lo incolli nel Suo agente di coding — Claude Code, Cursor, Codex o qualsiasi altro — per rendere qualsiasi repository AI-first.

> Deep Work Plan è spec-driven development in cui il repository stesso diventa la harness.

- [Apri il prompt /init](/init)
- [Leggi la metodologia](/methodology)

---

## Il problema e la risposta

Nei burst brevi, gli agenti di coding sono notevoli. Affidategli una missione di lungo corso — una migrazione, un nuovo sottosistema, un refactoring su decine di file — e derivano: il contesto si riempie, le decisioni precedenti sfumano e ore di lavoro si fermano a metà.

Deep Work Plan risponde con lo sviluppo guidato dalla specifica: un piano duraturo, task atomici e validation gate che l’agente deve superare. Il lavoro resta verificabile — e qualsiasi agente può riprenderlo tra le sessioni.

E poiché il contesto è la risorsa più scarsa del vostro agente, l’harness è progettato per l’efficienza dei token: le istruzioni si caricano progressivamente, la validazione tocca solo ciò che è cambiato e ogni task impara in loco — il lavoro di lungo corso resta sostenibile.
---

## Gli umani governano. Gli agenti eseguono.

Sei tu a decidere cosa significa “fatto” e dove corrono i confini. Il piano porta la tua intenzione; gli agenti mettono le ore — senza supervisione continua, senza correzioni ogni venti minuti.

- Tu: intento, criteri di accettazione, revisione
- Agenti: esecuzione, attività per attività
- Il piano: il contratto tra loro

[Leggi la metodologia](/it/methodology)

---

## Un piano da cui gli agenti non possono deviare.

I task lunghi riempiono il contesto di qualsiasi modello. I dettagli sfumano e l’agente deriva. Un piano scritto — task atomici, validation gate, stato ripristinabile — è ciò a cui torna, giro dopo giro.

1. Piano
2. Attività atomiche
3. Porte di validazione
4. Completamento
5. Stato riprendibile

[Vedi il ciclo principale](/it/methodology)

---

## Fatto è un contratto, non una sensazione.

Ogni task nomina i propri criteri di accettazione e le verifiche che devono passare. L’agente non può sentirsi finito — deve passare, o il task resta aperto.

- I test passano
- I tipi vengono verificati
- I criteri di accettazione sono soddisfatti
- O il task resta aperto

[Leggi la specifica](/it/spec)

---

## Il repository è il harness.

Contesto, strumenti, guardrail e stato vivono nel tuo repository come semplici file che qualsiasi agente può leggere. Niente lock-in, niente cervello esterno — sopravvive ai reset del contesto.

- Specifica durevole su disco
- Gate di validazione, non sensazioni
- Sopravvive ai reset del contesto

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Vedi cosa genera l’onboarding](/it/quickstart)
---

## Cosa ottieni

- AGENTS.md nella radice del repository, ragionato a partire dal Suo stack e dai Suoi comandi reali.
- `docs/` categorizzati e documentazione per modulo.
- Una directory `.agents/` (skill, agenti, comandi) con il symlink da `.claude` a `.agents`.
- La skill Deep Work Plan, installata una sola volta per ogni agente — inclusa la sub-skill author, così il repository può far crescere le proprie skill, agenti e comandi, più addon opt-in come dependency-upgrade e l’addon design-system per qualsiasi superficie di interfaccia rivolta all’utente.
- Piani a lungo termine e ripristinabili in una cartella `.dwp/` esclusa da git.

---

## Cosa succede quando lo esegui

1. **Il Suo agente apre [/init.md](/init.md)** — legge il prompt di onboarding e la metodologia, la spec e il kit a cui rimanda.
2. **Installa la skill Deep Work Plan** — il motore, identico in ogni repository: il router più le sue sub-skill (create, execute, refine, resume, status, verify, onboard, author), per Claude Code, Cursor, Codex, Gemini e Copilot.
3. **Adatta il Suo repository** — ragionando sul Suo stack reale (senza mai copiare e incollare), scrive AGENTS.md, `docs/`, README per modulo, un kit `.agents/` ragionato e una `.dwp/` esclusa da git. Il Suo repository diventa la harness.
4. **Pianifica ed esegue** — Deep Work Plan a lungo termine, eseguiti passo dopo passo rispetto a criteri di accettazione e validation gate espliciti, in autonomia per ore.

La skill è il motore riutilizzabile, installato allo stesso modo ovunque; ciò che si adatta è il Suo repository. La meccanica di installazione (Skills CLI, OpenClaw o git clone) vive nel prompt [/init.md](/init.md) e nell’[avvio rapido](/quickstart).

---

## La metodologia, la specifica e il kit

- [Leggi la metodologia](/methodology) — cos’è DWP, i principi, il workflow e come adottarlo.
- [Leggi la specifica](/spec) — anatomia delle attività, validation gate, protocollo di completamento, archetipi e addon.
- [Esplora il kit](/kit) — preset, adapter e comandi per installare DWP in un repository.
- [Guarda gli esempi](/examples) — procedure prima-e-dopo di lavoro di ingegneria reale.

---

## Chi lo costruisce

Deep Work Plan è nato da lavoro di ingegneria reale in [Dailybot](https://www.dailybot.com) ed è mantenuto da Dailybot insieme alla community open source.

- [Informazioni sulla metodologia](/about)
- [Community e contatti](/contact)
- [Repository GitHub](https://github.com/DailybotHQ/deepworkplan-website)
