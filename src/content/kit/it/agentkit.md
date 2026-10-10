---
title: Agentkit
description: "Un comando per ogni agente di codice da terminale. Piena autonomia di default con opt-out, esecuzioni headless in un git worktree e un secondo account."
kind: addon
lang: it
order: 8
---

# Addon Agentkit

Ogni agente di codice da terminale ha i propri flag per continuare una sessione, il proprio modo di tenere separato un secondo account, la propria modalità headless e il proprio interruttore per saltare le richieste di autorizzazione. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** mette un’unica superficie di comandi sopra tutti loro: `ak <kind> [@profile]`.

Questo addon integra il kit in **DWP v7** (pack `v7.1.4`) come trasporto di delega **headless**. È opzionale: senza di esso, ogni task viene eseguito nella sessione corrente, esattamente come prima. Il kit stesso è un prodotto MIT che funziona senza Deep Work Plan.

## Cosa ti offre il kit

- **Una grammatica per ogni CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` e `ak grok`, più varianti di provider (GLM, Azure, xAI), con gli stessi flag di sessione: `-c` continua, `-r <id>` riprende.
- **Profili.** `ak claude @work` esegue un secondo account nella propria home, separato dal primo.
- **Esecuzioni headless.** `ak run <kind> -- "<prompt>"` esegue un prompt in modo non interattivo e restituisce un codice di uscita documentato, facoltativamente come un unico oggetto JSON.
- **Una diagnostica.** `ak doctor --json` riporta quali CLI sono installate, i profili e i nomi delle chiavi impostate — mai i loro valori.
- **Installazioni verificate.** `ak install <cli>` installa una CLI mancante dal canale ufficiale del suo fornitore a una versione fissata, controllata rispetto a uno sha256 fissato o all’integrità del registro npm.
- **Nomi familiari.** Due preset di alias, disattivati finché non li attivi: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) e `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), ciascuno equivalente a `ak <kind>`.

## Installazione

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisiti: `bash` su macOS o Linux e `python3` 3.9 o successivo; nient’altro. Windows usa `install.ps1`. Fissa `v0.3.0`: `v0.2.0` e `v0.2.1` non sono supportate. Verifica una release con il suo asset `SHA256SUMS`.

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, interfaccia 1 |
| Chiave di registro | `agentkit` in `.dwp/config.json` |
| Trasporto | headless: un `ak run` per delegato in un worktree git dedicato |
| Fornisce | `subagents`, `cancel_children`, `model_routing` |
| Richiede | la concessione `agent_delegation` del contratto del piano |

## Autonomia per impostazione predefinita, con un opt-out che prevale sempre

Da `v0.2.0`, `ak <kind>` avvia ogni agente in **autonomia**: aggiunge il flag di autonomia proprio della CLI, conservato solo nel `providers.toml` del kit. L’autonomia è pensata per ambienti usa e getta o isolati, come un container di sviluppo.

L’**opt-out prevale sempre**: `--ask` su un singolo comando, oppure `AGENTKIT_PERMISSIONS=ask` nell’ambiente o nel file env del kit, sopprime il flag anche quando lo stesso comando indica `--auto`. Una sessione con opt-out trasmette l’opt-out agli agenti che avvia. Su un host, imposta l’opt-out.

L’addon non scrive alcun flag di autonomia e non passa mai `--auto`. Passa `--ask` quando un piano registra l’opt-out. Un piano che concede `agent_delegation` su un host accetta delegati autonomi confinati nel proprio worktree, che non è una sandbox.

## Cosa aggiunge a un piano

In un piano v7 il cui contratto concede `agent_delegation`, `execute` può affidare un task `parallel_safe` a un’altra CLI: crea un worktree git dedicato, vi esegue `ak run` con un timeout e raccoglie il risultato in `analysis_results/delegations/` del piano. Il risultato è evidenza `asserted` finché l’esecutore dei gate del piano stesso non lo osserva. Annullare un delegato arresta l’intero albero dei suoi processi.

## Agentkit o Herdr

| Situazione | Usa |
|---|---|
| Un task `parallel_safe` delimitato con un output dichiarato | Agentkit (headless) |
| Il task richiede interazione, dura a lungo o si trova su un’altra macchina | [Herdr](/kit/herdr) (un peer in un pannello) |

I due si combinano: herdr-peers può avviare un peer in un pannello con l’ambiente stampato da `ak env <kind> @profile`.

## Note

Opzionale e mai richiesto. I valori delle chiavi API non vengono mai stampati, registrati nei log né scritti in un file di configurazione; l’eccezione documentata è Cline, che riceve la propria chiave dalla riga di comando. L’estrazione dei risultati per OpenCode, Pi, Cline e Grok è costruita a partire dalla documentazione dei fornitori e non è ancora stata messa alla prova con account reali; un output sconosciuto ripiega sul testo grezzo.
