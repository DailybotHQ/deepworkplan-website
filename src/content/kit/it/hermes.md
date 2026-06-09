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

## Livello di supporto

**Completo** — Hermes legge `AGENTS.md` e carica la skill tramite il caricamento standard AgentSkills. Tutte le sub-skill DWP sono disponibili.

## Installazione

Installare il pack di skill nella directory `.agents/skills/` del workspace, oppure usare il gestore di skill della piattaforma se disponibile.

## Invocazione

Plain text:

```
create a plan for <goal>
resume the open plan
```

## Sinergia con la memoria episodica

Hermes indicizza la memoria degli agenti per rendere il lavoro passato recuperabile nelle sessioni future. Gli outcome record di `state.json` di DWP sono progettati esattamente per questo utilizzo: ogni attività completata porta ciò che è stato `tried`, ciò che è `failed`, ciò che ha `worked` e note in formato libero in un campo JSON strutturato. Quando Hermes indicizza i file di stato di `.dwp/plans/` del workspace, i piani completati diventano memoria episodica recuperabile — un agente può in seguito richiamare come un problema specifico è stato risolto, non solo che un piano è stato eseguito.

Ciò significa che i piani DWP su Hermes sono durevoli in due modi: i file markdown sono il registro leggibile dagli esseri umani, mentre gli outcome record di `state.json` sono la memoria indicizzabile dalle macchine. Vedi [Stato del piano](/spec/plan-state#outcome-record-come-memoria-episodica).

## Continuazione guidata da cron

Sulle piattaforme con scheduling cron, la continuazione segue lo stesso pattern delle altre piattaforme autonome: ogni turno pianificato si sveglia, esegue il Protocollo di Ripresa DWP, esegue al massimo un'attività, aggiorna `state.json` e cede il controllo. Il piano, non la sessione, è l'unità di continuità.

Il livello di stato leggibile dalle macchine (`manifest.json` + `state.json`) è OBBLIGATORIO per l'esecuzione non presidiata. Vedi [Protocollo degli agenti](/spec/agent-protocol#profili-di-esecuzione) per il protocollo completo di stop condition ed escalation.

## Note

Hermes e OpenClaw sono entrambe piattaforme di agenti autonomi nella tabella degli agenti supportati nel [Protocollo degli agenti](/spec/agent-protocol). Entrambe operano sotto il profilo di esecuzione non presidiata e traggono entrambe vantaggio dall'equivalenza `state.json`-come-git-log dell'archetipo agent workspace.
