---
title: "Avvio rapido — Deep Work Plan"
description: "Installa la skill, fai l’onboarding del repository, poi pianifica ed esegui con qualsiasi agente — i passi che rendono il repository spec-driven e pilotabile dagli agenti."
lastUpdated: 2026-05-31
---

## Avvio rapido

Installi la skill, faccia l’onboarding del repository, poi pianifichi ed esegua con qualsiasi agente — i passi che rendono
il repository spec-driven e pilotabile dagli agenti.

## Il percorso di adozione

### 1. Installi la skill Deep Work Plan

Aggiunga la skill al Suo repository. Include un router più otto sub-skill — create, execute, refine,
resume, status, verify, onboard e author. Usi la Skills CLI per la via più rapida:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Oppure cloni il repo ed esegua il setup dove sono disponibili git e una shell:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Faccia l’onboarding del repository

Esegua la sub-skill onboard e lasci che l’agente ragioni sul Suo repo reale — il suo stack, il package
manager e i comandi di validazione reali:

```bash
/deepworkplan-onboard
```

Genera `AGENTS.md`, una knowledge base `docs/`, documentazione per modulo e una home `.agents/` multi-agente
(con il symlink `.claude → .agents`), collega i sottili comandi `dwp-*` e predispone una `.dwp/` esclusa da git
per piani e bozze. Nulla è basato su template; tutto è adattato al Suo repository.

### 3. Faccia evolvere il kit e accetti gli addon

Usi `/skill-create` e `/agent-create` (la sub-skill author) per far crescere skill, agenti e comandi
adatti allo stack. L’onboarding offre anche quattro addon opt-in — devcontainer, Dailybot,
dependency-upgrade e design-system — che accetta solo quando sono pertinenti. Un repo è pienamente conforme con zero addon.

### 4. Pianifichi ed esegua

Generi un Deep Work Plan ed eseguilo attività per attività:

```bash
/dwp-create <goal>
/dwp-execute
```

Usi `/dwp-status`, `/dwp-refine` e `/dwp-resume` man mano che il lavoro procede. Ogni piano porta con sé attività numerate,
validation gate e un protocollo di completamento così il lavoro resta strutturato e ripristinabile tra le sessioni.

## Il risultato

Il Suo repository diventa spec-driven e pilotabile dagli agenti: il piano è la fonte di verità duratura e
il repository stesso diventa la harness rispetto a cui qualsiasi agente esegue.

- [Leggi la metodologia](/methodology)
- [Esplora la specifica](/spec)
- [Esplora il kit](/kit)
