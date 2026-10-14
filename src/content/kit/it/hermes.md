---
title: Hermes
description: "L'adapter DWP per Hermes: caricamento della skill secondo lo standard AgentSkills, sinergia con la memoria episodica tramite gli outcome record in state.json e continuazione del piano guidata da cron."
kind: adapter
lang: it
order: 11
agent: Hermes
support: full
prefix: plain text
---

# Adapter Hermes

Hermes è una piattaforma di agenti autonomi che carica le skill tramite lo standard AgentSkills e mantiene la memoria episodica tra le sessioni. DWP si integra con entrambe le superfici: il pack di skill si carica da `.agents/skills/` nello stesso modo di qualsiasi altro pack compatibile AgentSkills, e gli outcome record di `state.json` alimentano direttamente l'indice di memoria di Hermes.

Nei piani v6 e v7, lo stato viene proiettato dal giornale di solo accodamento (`journal.ndjson`) tramite `ledger.py project` anziché riscrivere manualmente i file di stato.

## Livello di supporto

**Completo** (Documentato) — Hermes legge `AGENTS.md` e carica la skill tramite il caricamento standard AgentSkills. Tutte le sub-skill di DWP sono disponibili.

## Installazione

Installare il pack di skill nella directory `.agents/skills/` del workspace, oppure usare il gestore di skill della piattaforma se disponibile.

## Invocazione

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Sinergia con la memoria episodica

Nei piani v6 e v7, le ricevute di verifica deterministiche di DWP (`outcomes.py receipt`) e i record dei risultati confluiscono direttamente nell'indice di memoria di Hermes: ogni attività completata riporta ciò che è stato tentato, fallito e riuscito in uno schema JSON strutturato. I piani completati diventano memoria episodica recuperabile — un agente può ricordare come è stato risolto un problema.

Le sessioni effimere aggiungono eventi a `journal.ndjson` e proiettano `state.json` tramite `ledger.py project` anziché riscrivere manualmente i file di stato. Vedi [Stato del piano](/spec/plan-state#outcome-records-as-episodic-memory).

## Continuazione guidata da cron

Sulle piattaforme con scheduling cron, la continuazione segue lo stesso pattern delle altre piattaforme autonome: ogni turno pianificato si sveglia, esegue il Protocollo di Ripresa DWP, esegue al massimo un'attività, aggiorna `state.json` e cede il controllo. Il piano, non la sessione, è l'unità di continuità.

Il livello di stato leggibile dalle macchine (`manifest.json` + `state.json`) è OBBLIGATORIO per l'esecuzione non presidiata. Vedi [Protocollo degli agenti](/spec/agent-protocol#profili-di-esecuzione) per il protocollo completo di stop condition ed escalation.

## Note

Hermes e OpenClaw sono entrambe piattaforme di agenti autonomi nella tabella degli agenti supportati nel [Protocollo degli agenti](/spec/agent-protocol). Entrambe operano sotto il profilo di esecuzione non presidiata e traggono entrambe vantaggio dall'equivalenza `state.json`-come-git-log dell'archetipo agent workspace.
