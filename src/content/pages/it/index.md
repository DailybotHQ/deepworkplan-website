---
title: "Deep Work Plan — esecuzione strutturata per agenti di coding AI"
description: "Il contesto conta più dei modelli. Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato in cui ogni agente di coding porta a termine il lavoro a lungo termine."
lastUpdated: 2026-06-03
---

## I modelli contano. Il contesto conta di più.

Deep Work Plan trasforma qualsiasi repository in un ambiente strutturato — contesto, salvaguardie e un piano duraturo — in cui ogni agente di coding esegue con precisione e porta a termine il lavoro a lungo termine.

Deep Work Plan (DWP) è una metodologia e un kit aperti, sotto licenza MIT, per pianificare ed eseguire lavoro software complesso con agenti AI. Non sceglie un metodo di installazione né copia un template — consegna al Suo agente una sola riga:

> Leggi e segui le istruzioni su https://deepworkplan.com/init.md per rendere questo repository AI-first.

> Deep Work Plan è spec-driven development in cui il repository stesso diventa la harness.

- [Apri il prompt /init](/init)
- [Leggi la metodologia](/methodology)

---

## Il problema e la risposta

Gli agenti di coding AI sono notevolmente efficaci in brevi sessioni. Sul lavoro a lungo termine — una migrazione, un nuovo sottosistema, un refactoring su decine di file — vanno alla deriva: il contesto si riempie, le decisioni vengono dimenticate e le attività di più ore vengono abbandonate a metà.

Deep Work Plan risponde con lo **spec-driven development**: il piano è la fonte di verità duratura e gli agenti eseguono rispetto a criteri di accettazione e validation gate espliciti. La deriva si riduce, il lavoro resta verificabile e qualsiasi agente può riprenderlo tra una sessione e l’altra. A differenza degli strumenti spec-driven legati a un singolo IDE o fornitore (GitHub Spec Kit, Amazon Kiro, Tessl), DWP è indipendente dallo strumento e nativo del repository.

È anche **harness engineering** reso portabile. Una harness per agenti è l’impalcatura attorno a un modello — contesto, strumenti, ciclo di controllo, salvaguardie, stato ripristinabile — che lo rende affidabile. Deep Work Plan installa quella harness nel repository stesso, così qualsiasi agente può pilotare qualsiasi repo.

---

## Cosa ottieni

- AGENTS.md nella radice del repository, ragionato a partire dal Suo stack e dai Suoi comandi reali.
- `docs/` categorizzati e documentazione per modulo.
- Una directory `.agents/` (skill, agenti, comandi) con il symlink da `.claude` a `.agents`.
- La skill Deep Work Plan, installata una sola volta per ogni agente — inclusa la sub-skill author, così il repository può far crescere le proprie skill, agenti e comandi, più addon di manutenzione opt-in come dependency-upgrade.
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
