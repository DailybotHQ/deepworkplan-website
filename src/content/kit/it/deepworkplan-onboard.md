---
title: deepworkplan-onboard
description: "Rende un repository AI-first ragionando sul suo stack e archetipo, poi generando un AGENTS.md, docs/, .agents/ adattati e una .dwp/ esclusa da git."
kind: command
lang: it
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Trasforma un repository in un codebase AI-first e spec-driven. Questa è la sub-skill onboard della skill Deep Work Plan.

## Cosa fa

`deepworkplan-onboard` esamina il repository **reale** — linguaggi, framework, package manager, comandi di build/test/lint, moduli, convenzione di test, forma del deployment — e genera artefatti adattati a esso. Ragiona; non copia mai un template né lascia un segnaposto.

## Uso

```
/deepworkplan-onboard
```

## Comportamento

1. Ricognizione — rileva lo stack reale e i comandi di validazione; abbina il preset di onboarding più vicino.
2. Archetipo — classifica come repo individuale o hub orchestratore.
3. Genera `AGENTS.md` + il symlink `CLAUDE.md` con un blocco Quick Commands reale.
4. Genera `docs/` (architettura, standard, testing, sicurezza e altro) e documentazione per modulo.
5. Genera `.agents/` (agenti, sottili comandi `dwp-*`, skill adatte allo stack, catalogo) + `.claude → .agents`.
6. Installa la skill e predispone una `.dwp/` esclusa da git (plans, drafts) e uno spazio di lavoro temporaneo `tmp/`.
7. Installa la revisione locale AI Diff Reviewer richiesta, propone gli addon opt-in, poi esegue un’auto-verifica.

## Note

Un repository è pienamente conforme con zero addon opzionali; la revisione locale AI Diff Reviewer fa parte della baseline dallo standard 2.3.0. La realtà rilevata vince sempre sulle assunzioni del preset.

## Riferimenti agli schemi v6

Per i piani v6, il catalogo degli schemi leggibili dalle macchine è pubblicato a questi URL stabili. La proiezione attiva v6 è uno snapshot; `plan-state/v6.json` non esiste. I piani v5 esistenti continuano a usare lo schema di stato v5 e i vecchi piani non vengono mai riscritti silenziosamente.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

I nuovi piani ricevono ID numerici monotoni di almeno tre cifre (ad esempio `PLAN_001_add_payment_webhooks/`). Poiché gli schemi v5 congelati contano l’ID numerico come una parola, gli slug v5 hanno 2–4 parole e quelli v6 ne hanno 2–5. Le cartelle esistenti senza numero `PLAN_<slug>/` restano leggibili e non vengono mai rinominate. Se esistono piani numerati, `latest` risolve nel piano con l’ID numerico più alto.
