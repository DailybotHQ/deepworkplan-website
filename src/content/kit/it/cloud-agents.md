---
title: Cloud agents
description: "L'adapter DWP per agenti cloud e in background: task remote di Claude Code, Codex cloud, agenti di classe Jules — sessioni effimere che eseguono contro un piano .dwp/ durevole."
kind: adapter
lang: it
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Adapter Cloud agents

Gli agenti cloud e in background — task remote di Claude Code, OpenAI Codex cloud, agenti di classe Jules e ambienti di esecuzione asincrona simili — sono effimeri per natura: una sessione inizia, viene eseguita per un tempo limitato e termina. DWP trasforma questo vincolo in una caratteristica rendendo il piano l'artefatto durevole, non la sessione.

## L'intuizione fondamentale

La directory `.dwp/` del repository è il **livello di spec e stato durevole**. Le sessioni cloud sono **esecutori effimeri**. Il piano dice all'esecutore cosa fare; `state.json` gli dice da dove riprendere. La sessione può essere qualsiasi cosa — un modello diverso, un provider diverso, un nuovo container — e il piano continua esattamente da dove si era interrotto.

## Livello di supporto

**Completo** — qualsiasi agente cloud che legge il repository, segue `AGENTS.md` e può eseguire comandi shell supporta DWP senza un adapter specifico per la piattaforma.

## Il ciclo sveglia-riprendi-cedi

Ogni turno di un agente cloud segue questo pattern:

1. **Sveglia** — la sessione inizia (avviata da uno schedule cron, un evento CI o un'azione dell'utente).
2. **Esegui il Protocollo di Ripresa DWP** — leggi il README del piano, individua il checkpoint, riconcilia `state.json` con il markdown, ispeziona la giuntura, esegui un smoke test. Vedi [Specifica DWP](/spec/dwp-specification#il-protocollo-di-ripresa-dwp).
3. **Verifica lo stato bloccato** — se `state.json.blocked` è impostato, notifica il motivo e cedi il controllo senza eseguire.
4. **Esegui la prossima attività atomica** — un'attività, superando il suo validation gate completo.
5. **Aggiorna il livello di stato** — riscrivi `state.json` atomicamente con il nuovo stato dell'attività, i gate record, l'outcome record e l'hash del commit.
6. **Cedi il controllo** — la sessione termina in modo pulito; il turno successivo riprende dallo stato aggiornato.

## Requisiti

- Il piano DEVE portare il livello di stato leggibile dalle macchine (`manifest.json` + `state.json`). Senza di esso, una sessione effimera non ha un modo affidabile per determinare la posizione di ripresa. Vedi [Stato del piano](/spec/plan-state).
- Il piano DEVE essere stato approvato da un essere umano prima di qualsiasi turno cloud non presidiato. L'approvazione del piano è il punto di controllo.
- L'agente opera con autorità limitata: NON DEVE espandere l'ambito, eseguire azioni distruttive che il piano non autorizza esplicitamente, né improvvisare al di là delle istruzioni dell'attività corrente. Vedi [Protocollo degli agenti](/spec/agent-protocol#profili-di-esecuzione).

## Note

Le sessioni degli agenti cloud sono il caso estremo del profilo di esecuzione non presidiata: continuità di sessione zero, massima durabilità del piano. La directory `.dwp/` di DWP è specificamente progettata per farlo funzionare — tutto lo stato di cui un agente ha bisogno per iniziare, continuare e completare un insieme di lavori risiede in file markdown e JSON in chiaro che qualsiasi sessione può leggere da un checkout pulito.
