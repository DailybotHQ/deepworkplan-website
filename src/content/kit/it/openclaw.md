---
title: OpenClaw
description: "L'adapter DWP per OpenClaw: scansione nativa di .agents/skills, mappatura per l'esecuzione non presidiata e continuazione del piano guidata da cron per workspace agente autonomi."
kind: adapter
lang: it
order: 10
agent: OpenClaw
support: full
prefix: plain text
---

# Adapter OpenClaw

OpenClaw è una piattaforma di agenti autonomi che gestisce workspace di lunga durata con turni pianificati. Esegue una scansione nativa di `<workspace>/.agents/skills/` alla ricerca di skill pack installati, il che significa che la skill DWP si carica senza alcun adapter shim — installatela lì e OpenClaw la rileva automaticamente.

## Livello di supporto

**Completo** — OpenClaw legge `AGENTS.md` e carica la skill tramite lo standard AgentSkills. Tutte le sub-skill DWP (`onboard`, `create`, `execute`, `refine`, `resume`, `status`, `verify`) sono disponibili.

## Installazione

```bash
openclaw skills install deepworkplan
```

In alternativa manualmente: clonare `DailybotHQ/deepworkplan-skill` in `<workspace>/.agents/skills/deepworkplan/`.

## Invocazione

Plain text — OpenClaw non usa un prefisso slash-command:

```
onboard this workspace with deepworkplan
create a plan for <goal>
resume the open plan
```

## Mappatura per l'esecuzione non presidiata

Le primitive di scheduling di OpenClaw si mappano direttamente sul modello di continuazione di DWP:

| Primitiva OpenClaw | Ruolo DWP |
|--------------------|-----------|
| Radice del workspace | Archetipo [Agent workspace](/spec/archetypes): `AGENTS.md`, `.agents/`, `.dwp/` nella radice del workspace |
| `<workspace>/.agents/skills/` (scansione nativa tier-2) | Dove vive questo pack — non è necessario alcun adapter shim |
| Heartbeat o turno cron | Un turno di [continuazione pianificata](/spec/agent-protocol#continuazione-pianificata): sveglia → Protocollo di Ripresa DWP → prossima attività atomica → aggiorna lo stato → cede il controllo |
| Controlli `HEARTBEAT.md` | Aggiungere una riga: "If `.dwp/plans/` has an open plan, resume it for one task." |
| Standing orders | Il confine di approvazione del piano e l'autorità limitata del profilo non presidiato |

Operativamente:

1. Un essere umano crea e approva un piano in modo interattivo. L'approvazione è il punto di controllo — i turni non presidiati non creano ed eseguono in un unico turno.
2. Il piano deve portare il livello di stato leggibile dalle macchine (`manifest.json` + `state.json`). In un workspace senza git, `state.json` è ciò che rende possibile la ripresa sicura dopo un crash. Vedi [Stato del piano](/spec/plan-state).
3. Ogni heartbeat o turno cron esegue al massimo un'attività, supera il suo validation gate, aggiorna `state.json` atomicamente e cede il controllo.
4. In caso di stop condition, l'agente scrive il campo `blocked` di `state.json` e notifica attraverso il canale normale del workspace. La prossima occhiata umana — o il report del heartbeat — vede esattamente ciò che è necessario.

Il risultato: un piano multi-giorno che sopravvive a riavvii, cambi di modello e confini di sessione, eseguito durante la notte dal daemon — con gli stessi gate che avrebbe un'esecuzione supervisionata da un essere umano.

## Note

Il workspace OpenClaw è l'esempio canonico dell'archetipo [agent workspace](/spec/archetypes). L'integrazione con `HEARTBEAT.md` del pack di skill DWP e il requisito di `state.json` sono stati progettati pensando a questa piattaforma.
