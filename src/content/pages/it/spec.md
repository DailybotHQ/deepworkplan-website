---
title: "Specifica Deep Work Plan"
description: "La specifica leggibile della metodologia Deep Work Plan: il formato DWP, il protocollo degli agenti, gli archetipi, lo standard di documentazione e il meccanismo degli addon."
lastUpdated: 2026-09-28
---

## Specifica Deep Work Plan

**Standard attuale: DWP 8.0.0 (release `v8.0.0`).** La base conservata include il livello di registrazione v6 e le estensioni v7; i nuovi piani usano `plan-contract/v8` per impostazione predefinita. I piani v5, v6 e v7 esistenti mantengono la generazione registrata e migrano solo tramite un `refine migrate` esplicito. v8 conserva `plan-manifest/v7` e aggiunge `plan-contract/v8`, `journal-event/v8` e `plan-snapshot/v8`; gli schemi di manifest e journal-event v7 restano supportati per i piani esistenti. [Manifest v7](https://deepworkplan.com/schema/plan-manifest/v7.json), [contratto v8](https://deepworkplan.com/schema/plan-contract/v8.json), [evento journal v8](https://deepworkplan.com/schema/journal-event/v8.json) e [snapshot v8](https://deepworkplan.com/schema/plan-snapshot/v8.json).

La specifica è la definizione precisa e leggibile della metodologia — le strutture e i protocolli condivisi da persone e agenti. Stabilisce, in termini normativi RFC-2119, come è strutturato un piano spec-driven e come un agente deve eseguire rispetto a esso: il piano è la fonte di verità, i validation gate sono binari e il repository stesso porta con sé la harness di cui un agente ha bisogno. È organizzata in documenti ordinati:

- **Livello di registro** — il livello di registrazione supportato da prove: contratto, journal, classi di evidenza (asserite vs osservate), approvazioni e ricevute.
- **Risorse e abilità** — esecuzione vincolata: manifesto di contesto, limiti di risorse, capacità dell host e registro degli addon.
- **Delega** — esecuzione multi-agente e a sciame: worktree paralleli, eventi di delega, trasporti e successione dei leader per epoche.
- **Stato del piano** — il livello di stato leggibile dalla macchina: snapshot derivato del journal in v6/v7 (`ledger.py project`), livello storico v5 e riconciliazione.
- **Specifica DWP** — struttura del piano, anatomia delle attività, ciclo di esecuzione, la sezione Delta per le modifiche brownfield, il Protocollo di Ripresa DWP, livelli di rigore proporzionale (micro/standard/deep) e il livello di stato del piano leggibile dalle macchine.
- **Protocollo degli agenti** — comportamento richiesto tra gli agenti, mappatura dei comandi, agenti supportati (inclusi OpenClaw e Hermes) e profili di esecuzione (interattivo contro non presidiato) con stop condition e continuazione pianificata.
- **Archetipi** — repo individuali, hub orchestratori e il workspace agente (la casa di lunga durata di un agente autonomo: workspace OpenClaw, directory di servizio Hermes, volume di agente cloud); l’euristica di classificazione e come differisce l’onboarding.
- **Addon** — il meccanismo opt-in per aggiungere capacità opzionali, inclusa la sub-skill author (così un repository fa crescere il proprio kit), gli addon di manutenzione come dependency-upgrade e l’addon design-system (un `docs/DESIGN.md` ragionato dalla fonte di design reale del repo, con profili per UI visuale, output CLI e superfici conversazionali).
- **Conformità** — la definizione normativa di un repository AI-first: gli artefatti che un repository DEVE e DOVREBBE avere, cosa rende un piano ben formato e come verificarlo in modo oggettivo con `/dwp-verify`.
- **Stato del piano** — il livello di stato leggibile dalle macchine: `manifest.json` e `state.json`, gate record, outcome record come memoria episodica, riconciliazione (il markdown vince) e quando il livello è richiesto.

- [Leggi la specifica](/spec)
- [Leggi la metodologia](/methodology)
