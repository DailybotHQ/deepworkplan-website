---
title: "Specifica Deep Work Plan"
description: "La specifica leggibile della metodologia Deep Work Plan: il formato DWP, il protocollo degli agenti, gli archetipi, lo standard di documentazione e il meccanismo degli addon."
lastUpdated: 2026-05-30
---

## Specifica Deep Work Plan

La specifica è la definizione precisa e leggibile della metodologia — le strutture e i protocolli condivisi da persone e agenti. Stabilisce, in termini normativi RFC-2119, come è strutturato un piano spec-driven e come un agente deve eseguire rispetto a esso: il piano è la fonte di verità, i validation gate sono binari e il repository stesso porta con sé la harness di cui un agente ha bisogno. È organizzata in documenti ordinati:

- **Standard di documentazione** — la struttura del repository AI-first.
- **Specifica DWP** (v1.2) — struttura del piano, anatomia delle attività, ciclo di esecuzione, la sezione Delta per le modifiche brownfield, il Protocollo di Ripresa DWP, livelli di rigore proporzionale (micro/standard/deep) e il livello di stato del piano leggibile dalle macchine.
- **Protocollo degli agenti** (v1.2) — comportamento richiesto tra gli agenti, mappatura dei comandi, agenti supportati (inclusi OpenClaw e Hermes) e profili di esecuzione (interattivo contro non presidiato) con stop condition e continuazione pianificata.
- **Archetipi** (v1.1) — repo individuali, hub orchestratori e il workspace agente (la casa di lunga durata di un agente autonomo: workspace OpenClaw, directory di servizio Hermes, volume di agente cloud); l’euristica di classificazione e come differisce l’onboarding.
- **Addon** — il meccanismo opt-in per aggiungere capacità opzionali, inclusa la sub-skill author (così un repository fa crescere il proprio kit), gli addon di manutenzione come dependency-upgrade e l’addon frontend design-system (un `docs/DESIGN.md` ragionato dai token di design reali del repo).
- **Conformità** — la definizione normativa di un repository AI-first: gli artefatti che un repository DEVE e DOVREBBE avere, cosa rende un piano ben formato e come verificarlo in modo oggettivo con `/dwp-verify`.
- **Stato del piano** — il livello di stato leggibile dalle macchine: `manifest.json` e `state.json`, gate record, outcome record come memoria episodica, riconciliazione (il markdown vince) e quando il livello è richiesto.

- [Leggi la specifica](/spec)
- [Leggi la metodologia](/methodology)
