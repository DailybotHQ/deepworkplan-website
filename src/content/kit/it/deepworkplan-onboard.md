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
7. Propone gli addon opt-in, poi esegue un’auto-verifica.

## Note

Un repository è pienamente conforme con zero addon. La realtà rilevata vince sempre sulle assunzioni del preset.
