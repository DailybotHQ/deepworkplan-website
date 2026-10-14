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

L’addon è un integratore leggero. Il lavoro è svolto da **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, una skill autonoma con licenza MIT fissata a **`v1.0.0`**, utile anche senza Deep Work Plan. Definisce ciò che Herdr stesso lascia aperto: chi può rispondere, come la risposta ritrova la strada tra le macchine, come due agenti evitano di rispondersi all’infinito e dove si trova la traccia di "ho chiesto, ha risposto".

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/herdr-peers`, tag `v1.0.0`, protocollo 1 |
| Chiave di registro | `herdr` in `.dwp/config.json` |
| Trasporto | interattivo: un peer in un pannello Herdr |
| Fornisce | `subagents`, `cancel_children` |
| Richiede | la concessione `agent_delegation` del contratto del piano |

**Stabile da `v1.0.0`.** L’interfaccia pubblica segue il versionamento semantico: i verbi della CLI e i relativi flag documentati, i codici di uscita `0`–`7`, le variabili documentate `HERDR_PEERS_*`, `DWP_PLAN` e `DWP_TASK`, il protocollo 1 e i contratti JSON `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` e il record di delega. Una modifica incompatibile a uno qualsiasi di essi incrementa la versione major, e una modifica al formato di trasmissione incrementa anche il numero di protocollo. `v1.0.0` non cambia alcun comportamento rispetto a `v0.3.3`, e le release 0.x non sono più supportate.

## Installazione

Installa herdr-peers e la skill ufficiale di Herdr, da cui dipende. Ogni macchina i cui agenti devono rispondere ha bisogno anch’essa della skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.0.0 --skill herdr-peers -g -y
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

## Container e host

Con l’addon [devcontainer](/kit/devcontainer) su devcontainer-kit `v1.0.1`, ogni container dck include herdr-peers ed entra nella mesh al `dck up`: i suoi agenti possono interrogare gli agenti sull’host, negli altri container e negli altri container loopback dell’host, e ricevere la risposta. `dck setup` installa un herdr-peers verificato sull’host, quindi rispondono anche gli agenti dell’host. Il listener dell’host e le chiavi aggiuntive che lasciano entrare altri container sono decisioni tue nel profilo host del kit; questo addon non le imposta mai. Da herdr-peers (`v0.2.3`), ogni macchina mantiene il proprio stato (`$XDG_STATE_HOME/herdr-peers/<server>/`), quindi un checkout condiviso dall’host e da un container non mescola più i loro registri, e da devcontainer-kit (`v0.3.3`) il container esporta `HERDR_PEERS_SELF` da sé, così gli agenti Codex al suo interno raggiungono altre macchine senza passaggi manuali.

## Herdr o agentkit

Entrambi gli addon implementano la stessa interfaccia di delega — `launch`, `observe`, `collect`, `cancel` — con trasporti diversi.

| Situazione | Usa |
|---|---|
| Un task `parallel_safe` delimitato con un output dichiarato | [agentkit](/kit/agentkit) (`ak run` headless in un worktree) |
| Il task richiede interazione, dura a lungo o si trova su un’altra macchina | Herdr (un peer in un pannello) |

Per un lead che esegue molte corsie insieme — pannelli sull’host, nei container e su altre macchine, ciascuno sul proprio account — `herdr-peers lanes` elenca ogni corsia con il suo stato, `herdr-peers status <pane>` classifica la schermata in cui si trova una corsia bloccata, e ogni record di delega indica l’account e il fornitore che l’hanno svolta. Vedi [Eseguire molti agenti](/methodology/06-orchestration).

**Le lane Codex indicano il proprio pannello.** Codex esegue i comandi di una lane da un server in background condiviso da tutte le sessioni di quell’account, quindi l’id di pannello ereditato può appartenere a un’altra lane. Una lane Codex passa il proprio pannello, indicato nel brief del lead, con `--pane <pane>` su ogni verbo di herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Notifiche e guida

herdr-peers (`v0.3.2`) aggiunge ciò che permette a uno sciame di sopravvivere al proprio lead ([Autonomia dello sciame](/it/methodology/07-swarm-autonomy)):

- **Notifiche.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` invia un messaggio unidirezionale con il timbro `reply=no`. Il `check` del destinatario lo classifica come notifica, lo registra come dato e non risponde mai. Le notifiche non consumano alcuno slot di fan-out e si possono inviare mentre una richiesta è aperta; usale per annunci di passaggio di consegne, cambi di lead e annunci di rilascio.
- **Un record di lead per piano.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` rende un agente il lead di un piano; `lead show` stampa il record (schema `herdr-peers/lead-v1`: piano, lead, epoca, successione, corsie, ora di aggiornamento). `lead handover <addr> --plan <P>` cede la guida, `lead takeover --plan <P>` permette al primo vice raggiungibile di assumerla quando il lead non c’è più, e `lead release --plan <P>` la termina. Ogni cambio incrementa l’epoca e notifica ogni corsia. Rivendica il piano prima di avviarne le corsie: `lead` si risolve solo quando esiste un record. Da `v0.3.2` il record conserva localmente il repository che rivendica e rifiuta una rivendicazione dello stesso id di piano da un altro repository; indica quel piano con `--plan <repo>/<id>`.
- **Fencing.** Una corsia accetta una notifica del lead solo dall’agente che le ha dato il brief (prima rivendicazione), dal lead corrente all’epoca successiva (cessione) o dalla prima voce raggiungibile della successione all’epoca successiva (subentro). Tutto il resto viene registrato e ignorato, e un lead che ritorna e vede un’epoca più alta si fa da parte.
- **L’indirizzo `lead`.** `ask lead …` e `notify lead …` si risolvono nel lead corrente di `--plan` (altrimenti `$DWP_PLAN`), così nessun brief di corsia codifica in modo fisso il pannello del lead.
- **Schermate `usage_limit`.** `status` e `lanes` riconoscono il messaggio di limite d’uso di una CLI come la classe di schermata `usage_limit`, il cui passo successivo è un passaggio di consegne. Non vi si inviano mai tasti. `lanes --json` aggiunge il piano, il suo lead, l’epoca e l’ultima capacità riportata da ogni corsia.

Le corsie possono anche chiedersi a vicenda informazioni e coordinarsi — un’interfaccia, il nome di un flag, lo stato di un branch —, ma solo il lead assegna il lavoro. La profondità 1 e il limite di fan-out restano validi. Con `v0.2.x` non esistono notifiche né record di lead: le corsie interpellano l’indirizzo del lead indicato nel loro brief, e un cambio di lead viene inoltrato dallo sviluppatore.

## Note

Opzionale e mai richiesto. Un repository è pienamente conforme con zero addon opzionali, e nessun flusso dipende da questo. Il percorso di andata e ritorno tra due pannelli e tra macchine è coperto da test contro un Herdr simulato; pianifica una prima esecuzione supervisionata.
