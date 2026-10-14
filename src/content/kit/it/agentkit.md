---
title: Agentkit
description: "Un comando per ogni agente di codice da terminale: un account per profilo, ak pick per quello con più margine, autonomia con opt-out ed esecuzioni headless."
kind: addon
lang: it
order: 8
---

# Addon Agentkit

Ogni agente di codice da terminale ha i propri flag per continuare una sessione, il proprio modo di tenere separato un secondo account, la propria modalità headless e il proprio interruttore per saltare le richieste di autorizzazione. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** mette un’unica superficie di comandi sopra tutti loro: `ak <kind> [@profile]`.

Questo addon integra il kit in **DWP v7** (pack `v7.8.1`) come trasporto di delega **headless**. È opzionale: senza di esso, ogni task viene eseguito nella sessione corrente, esattamente come prima. Il kit stesso è un prodotto MIT che funziona senza Deep Work Plan.

## Cosa ti offre il kit

- **Una grammatica per ogni CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` e `ak antigravity`, più route di provider (Z.AI GLM, Azure OpenAI, xAI e l’API Gemini), con gli stessi flag di sessione: `-c` continua, `-r <id>` riprende.
- **Profili.** `ak claude @work` esegue un secondo account nella propria home, separato dal primo.
- **Esecuzioni headless.** `ak run <kind> -- "<prompt>"` esegue un prompt in modo non interattivo e restituisce un codice di uscita documentato, facoltativamente come un unico oggetto JSON.
- **Una diagnostica.** `ak doctor --json` riporta quali CLI sono installate, i profili e i nomi delle chiavi impostate — mai i loro valori.
- **Installazioni verificate.** `ak install <cli>` installa una CLI mancante dal canale ufficiale del suo fornitore a una versione fissata, controllata rispetto a uno sha256 fissato o all’integrità del registro npm.
- **Nomi familiari.** Due preset di alias, disattivati finché non li attivi: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) e `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), ciascuno equivalente a `ak <kind>`.

## Account, quota e scelta dell’account

Dalla versione `v1.0.1`, ogni profilo — compreso `@default` — è un account indipendente nella propria directory sotto la radice dei profili, evitando perdite di stato e collisioni di credenziali. `ak profiles` li elenca con lo stato del login e i nomi delle chiavi; `ak profiles --json` fornisce lo stesso elenco agli strumenti (schema `profiles-v1`). Da `v0.5.1` indica dove si trova davvero il token di Claude Code — `file`, `keychain` (macOS), `none` o `unknown` — basandosi solo sulla presenza, senza mai leggere il segreto, e riconosce un login Cursor su Linux, in un container o su un host Linux. Da `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` indica l’account usato da un semplice `ak <cli>` (un `@profile` posizionale ha comunque la precedenza), ed è così che un dev container sceglie l’account dell’host che condivide. Da `v0.5.3`, `ak codex` aggiunge `--no-daemon` quando una home Codex condivisa con un’altra macchina registra un daemon in background che non si trova su questa.

`ak usage` (anche `ak status`) elenca ogni account di ogni CLI che il kit conosce, una riga per account e profilo, sotto la sua CLI: quota in tempo reale per gli abbonamenti Claude Code (finestre di 5 ore, settimanale e per modello), i login Codex con ChatGPT, le chiavi del piano di programmazione Z.AI e, da `v0.7.0`, i login Google di Antigravity su Linux e nei container (le finestre di cinque ore e settimanale del pannello `/usage` di agy). Un account la cui quota non può essere letta conserva comunque la sua riga: `n/d` con il modo in cui è collegato e il motivo — Cursor, Grok, xAI, Azure OpenAI, una chiave API di Gemini o un login di Antigravity conservato nel Portachiavi di macOS (Keychain) — oppure `no login` con il comando che ne esegue il login, così la tabella mostra anche quali account di ogni CLI sono collegati. È di sola lettura: non rinnova mai un login, non stampa mai un token e non scrive mai dentro un profilo. `--json` fornisce lo stesso elenco agli strumenti (schema `usage-v1`). Gli endpoint di utilizzo sono interni al fornitore e non ufficiali.

`ak pick <kind>` legge le stesse righe e indica l’account con più margine. `--count N` restituisce fino a N account, il migliore per primo; `--exclude @<profile>` esclude un account occupato; `--model` conta la finestra settimanale di un modello; `--need 5h:40` si rifiuta di scegliere senza quel margine. `--json` fornisce lo schema `pick-v1`.

```bash
ak usage                   # quota di ogni account e profilo
ak pick claude --count 3   # i tre account Claude con più margine
ak claude @work --trust-cwd  # un secondo account, cartella già attendibile
ak profiles --json         # profiles-v1, per gli strumenti
ak setup verify            # controlli ordinati, ognuno con il suo comando di riparazione
```

`--trust-cwd` (o `AGENTKIT_TRUST_CWD=1`) considera attendibile in anticipo la cartella in cui parte l’agente, così Claude Code e Codex si aprono senza la schermata di attendibilità della cartella. `ak setup probe | verify | docker` è un helper di sola lettura, guidato dallo skill `agentkit-setup`, che ispeziona la macchina, verifica l’installazione e genera una ricetta di container fissata per tag e verificata.

## Più agenti, più account

Lo skill `agentkit-orchestrate` (`ak --skill orchestrate`) insegna a un agente a distribuire il lavoro tra più agenti, account e fornitori: un `ak usage` prima del lotto, `ak pick --count N` per scegliere gli account, un delegato per account, il gate del repository stesso su ogni risultato e il failover all’account successivo quando uno raggiunge un limite. Il kit osserva, calcola ed esegue; non pianifica mai. Il lead — tu, o un agente a cui l’hai chiesto — decide, usando solo i tuoi account e nel rispetto dei termini di ogni fornitore.

Per le corsie lunghe e interattive, ogni corsia gira in un pannello [Herdr](/kit/herdr) sul proprio account. Il capitolo della metodologia [Eseguire molti agenti](/methodology/06-orchestration) descrive l’intero modello: un lead e le sue corsie, account scelti in base al margine, coordinamento tramite herdr-peers e un branch e un rilascio per repository; [Autonomia dello sciame](/it/methodology/07-swarm-autonomy) aggiunge i controlli di capacità, il passaggio di consegne e la successione del lead.

## Capacità e lease

Da `v0.6.0` un agente può chiedere quanto margine ha il proprio account, a basso costo, a ogni confine di task — il segnale che permette a uno sciame di passare il lavoro prima che un account si esaurisca ([Autonomia dello sciame](/it/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schema `capacity-v1`) restituisce `headroom_pct` dell’account in esecuzione, la sua `binding_window`, `resets_at` e un `verdict`: `ok`, `low` (25 % o meno), `critical` (10 % o meno, o soggetto a rate limit) o `unknown` (nessuna fonte di quota: Cursor, Grok o Antigravity su macOS). Usa l’aritmetica di `ak pick`, così i due non sono mai in disaccordo, e legge una cache di utilizzo mantenuta per 300 secondi (`--max-age`), così un controllo a ogni confine di task resta economico. `--self` risolve l’account che `ak` ha avviato; fuori da un avvio tramite `ak` esce con codice 3 e non tira mai a indovinare. `ak usage` continua a leggere dal vivo e aggiorna la cache.
- **Soglie ed esercitazioni.** `AGENTKIT_CAPACITY_LOW` e `AGENTKIT_CAPACITY_CRITICAL` (o `--low` e `--critical`) spostano le soglie. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` può solo abbassare una lettura — è così che un’esercitazione fa sembrare un account a corto di margine — e non può mai farne sembrare uno più ricco.
- **`ak lease <kind> @<profile> --owner <addr>`** riserva un account per una corsia; `ak lease release …` lo libera una volta che un successore ha accettato il passaggio di consegne, e `ak lease ls` elenca i lease (schema `leases-v1`). Un profilo Codex accetta un solo lease — uno scrittore per file di autenticazione — e solo il titolare rilascia un lease. I lease scadono e sono record indicativi di numeri, nomi di profilo e indirizzi di pannello, mai una credenziale.
- **`ak pick <kind> --owner <lead>`** conta ogni lease attivo, compresi quelli del titolare stesso: classifica i candidati per `headroom / (1 + leases)` e non offre mai un account Codex riservato, nemmeno a chi lo detiene. `--reuse @<profile>` passa uno dei lease del titolare, per esempio al successore di una corsia. Senza `--owner` la classifica non cambia.

```bash
ak capacity --self --json                        # il margine e il verdetto di questo agente
ak lease claude @work --owner local:w2:p1        # riservare un account per una corsia
ak pick codex --owner local:w1:p1 --count 2      # saltare gli account riservati ad altri
```

Il lavoro si sposta solo tra gli account che hai dichiarato per il piano, nel rispetto dei termini di ogni fornitore: nessun agente crea un account, rinnova un login o spende un reset di Codex. Il pacchetto Deep Work Plan legge il verdetto tramite il proprio helper e lo trasforma in continuare, prepararsi o passare le consegne; senza il kit, o con uno più vecchio, la capacità viene riportata come sconosciuta, mai come ok.

## Installazione

```bash
git clone --branch v1.0.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisiti: `bash` su macOS o Linux e `python3` 3.9 o successivo; nient’altro. Windows usa `install.ps1`. Fissa `v1.0.1`: `v0.2.0` e `v0.2.1` non sono supportate. Verifica una release con il suo asset `SHA256SUMS`.

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/coding-agents-kit`, tag `v1.0.1`, interfaccia 1 |
| Chiave di registro | `agentkit` in `.dwp/config.json` |
| Trasporto | headless: un `ak run` per delegato in un worktree git dedicato |
| Fornisce | `subagents`, `cancel_children`, `model_routing` |
| Richiede | la concessione `agent_delegation` del contratto del piano |

**Stabile da `v1.0.0`.** L’interfaccia pubblica del kit segue il versionamento semantico e cambia in modo incompatibile solo in una nuova versione major: la superficie dei comandi (`ak <kind> [@profile]` per ogni tipo definito in `providers.toml`, e ogni verbo con i relativi flag documentati), la postura dei permessi, l’interfaccia 1 (`ak doctor --json`, `ak env`, la grammatica e l’envelope di `ak run`), gli schemi JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`), e il layout installato e i nomi delle variabili del file di ambiente. `v1.0.0` non cambia alcun comando, flag, chiave o schema rispetto a `v0.7.1`.

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

I due si combinano: herdr-peers può avviare un peer in un pannello con l’ambiente stampato da `ak env <kind> @profile`. Per molte corsie insieme, vedi [Eseguire molti agenti](/methodology/06-orchestration).

## Note

Opzionale e mai richiesto. I valori delle chiavi API non vengono mai stampati, registrati nei log né scritti in un file di configurazione; l’eccezione documentata è Cline, che riceve la propria chiave dalla riga di comando. L’estrazione dei risultati per OpenCode, Pi, Cline e Grok è costruita a partire dalla documentazione dei fornitori e non è ancora stata messa alla prova con account reali; un output sconosciuto ripiega sul testo grezzo.
