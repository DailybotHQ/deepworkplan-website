---
title: Herdr
description: "Affida il lavoro a un altro agente di codice in un pannello Herdr, su qualsiasi macchina, e ricevi una sola risposta autorizzata. Piani che delegano, tracciati."
kind: addon
lang: it
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) colloca gli agenti di codice in pannelli, sulla tua macchina e sulle macchine che raggiunge via SSH. Questo addon consente a un Deep Work Plan di usare quegli agenti come **peer**: un piano può affidare un task delimitato a un agente in un altro pannello, ricevere esattamente una risposta autorizzata e conservare una traccia dello scambio.

È un addon opzionale di **DWP v7** (`v7.0.0`). La metodologia funziona allo stesso modo senza di esso: con l’addon assente o disattivato, ogni task viene eseguito nella sessione corrente, esattamente come prima.

## Cosa integra

L’addon è un integratore leggero. Il lavoro è svolto da **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, una skill autonoma con licenza MIT fissata a **`v0.1.0`**, utile anche senza Deep Work Plan. Definisce ciò che Herdr stesso lascia aperto: chi può rispondere, come la risposta ritrova la strada tra le macchine, come due agenti evitano di rispondersi all’infinito e dove si trova la traccia di "ho chiesto, ha risposto".

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protocollo 1 |
| Chiave di registro | `herdr` in `.dwp/config.json` |
| Trasporto | interattivo: un peer in un pannello Herdr |
| Fornisce | `subagents`, `cancel_children` |
| Richiede | la concessione `agent_delegation` del contratto del piano |

## Installazione

Installa herdr-peers e la skill ufficiale di Herdr, da cui dipende. Ogni macchina i cui agenti devono rispondere ha bisogno anch’essa della skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Requisiti: Herdr 0.9.1 o successivo, `bash` e `python3` 3.9 o successivo (solo libreria standard). L’onboarding propone l’addon e registra la tua risposta nel registro degli addon; non viene mai attivato senza consenso.

## Cosa aggiunge a un piano

- **Delega a un peer.** In un piano v7 il cui contratto concede `agent_delegation`, `execute` può affidare un task `parallel_safe`, o una domanda in sola lettura, a un agente in un altro pannello, su questa macchina o su un’altra.
- **Una sola risposta autorizzata.** La richiesta porta un timbro che autorizza esattamente una risposta. Il peer risponde una volta tramite l’helper, e la risposta porta un timbro proprio.
- **Una traccia prima di farvi affidamento.** Ogni delega viene scritta in `analysis_results/delegations.ndjson` del piano prima che la risposta venga usata, e corrisponde all’evento di journal `delegation` di v7.
- **I risultati restano affermazioni finché non vengono verificati.** La risposta di un peer è evidenza `asserted` finché l’esecutore dei gate del piano stesso non la osserva. Non chiude mai un task da sola.

## Modello di sicurezza

| Regola | Cosa significa |
|---|---|
| Prima la concessione | La delega viene eseguita solo quando il contratto del piano concede `agent_delegation`. |
| Limite di profondità 1 | Un messaggio timbrato `depth=1` o `reply-to=` non riceve mai risposta, e un delegato non delega mai. |
| Limite di fan-out | Al massimo quattro peer per chiamante, per impostazione predefinita. |
| Dati, non istruzioni | Una risposta non conferisce mai un’autorità che il destinatario non avesse già. |
| Un solo scrittore per percorso | Un peer che scrive lavora nel proprio worktree git. |

herdr-peers non autentica il mittente: il campo `from=` di un timbro è un’affermazione. La mitigazione è la allow-list `HERDR_PEERS_SCOPE`, che limita i workspace e le macchine che un peer accetta.

## Herdr o agentkit

Entrambi gli addon implementano la stessa interfaccia di delega — `launch`, `observe`, `collect`, `cancel` — con trasporti diversi.

| Situazione | Usa |
|---|---|
| Un task `parallel_safe` delimitato con un output dichiarato | [agentkit](/kit/agentkit) (`ak run` headless in un worktree) |
| Il task richiede interazione, dura a lungo o si trova su un’altra macchina | Herdr (un peer in un pannello) |

## Note

Opzionale e mai richiesto. Un repository è pienamente conforme con zero addon opzionali, e nessun flusso dipende da questo. Il percorso di andata e ritorno tra due pannelli e tra macchine è coperto da test contro un Herdr simulato; pianifica una prima esecuzione supervisionata.
