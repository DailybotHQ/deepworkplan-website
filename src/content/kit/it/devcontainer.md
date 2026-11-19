---
title: Devcontainer
description: "Un dev container riproducibile per ogni repository, da un unico template: agenti sui tuoi account host con ak, Herdr in due sensi, chiavi SSH solo se attivate."
kind: addon
lang: it
order: 1
---

# Addon devcontainer

Dai al repository un container di sviluppo riproducibile e isolato, che persone, editor e agenti di codice possano usare allo stesso modo. In **DWP v8** (pack `v8.0.5`) questo addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un prodotto MIT che funziona senza Deep Work Plan. È opzionale: un repository è pienamente conforme anche senza di esso.

Deep Work Plan ha quattro pilastri: prima la specifica, il repository è la harness, loop engineering ed efficienza misurata. Addon e integrazioni possono estendere la harness e il loop; la metodologia funziona da sola.

## Cosa fornisce devcontainer-kit

- **Un template**, basato sulla specifica [Dev Containers](https://containers.dev), che `dck init` genera nel repository con una struttura fissa: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` e `dev.sh`. Rieseguito in seguito, riconcilia e non sovrascrive mai le tue modifiche; qualsiasi modifica a un file esistente viene mostrata prima e richiede il consenso.
- **Il container proprio del repository.** Il Dockerfile parte dall’immagine ufficiale del runtime fissata per digest (`node-24`, `python-3.13` o `debian`) e copia i passaggi di build del kit in `docker/local/<service>/dck/`. Non è coinvolta alcuna immagine di base condivisa.
- **`dev.sh` e `dck`.** `bash dev.sh up` costruisce, avvia e si collega al container da un semplice terminale; `shell`, `rebuild`, `doctor` e gli altri funzionano con o senza VS Code o Cursor.
- **Herdr in entrambi i sensi.** L’[Herdr](https://herdr.dev) dell’host collega ogni container come una macchina tramite un server SSH limitato al loopback, e il container si apre con la barra laterale standard: App, Editor, Development e Agents. Ogni workspace e ogni pannello, compresi quelli aperti in seguito, partono dal percorso dell’applicazione (`/app` per impostazione predefinita). All’interno, [herdr-peers](/kit/herdr) permette agli agenti di interpellare agenti sull’host e in altri container.
- **La skill `dck-dockerfile`.** Un agente crea o rigenera il container di un repository su richiesta e lo dimostra con una build reale.

## Installazione

```bash
git clone --branch v1.4.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisiti: `bash` 3.2 o successivo e `python3` 3.11 o successivo su un host Linux o macOS, e Docker con Compose v2 per i comandi del container. Verifica una release con il suo asset `SHA256SUMS`. Fissa `v1.4.4`: `v0.2.0` non è supportata.

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/devcontainer-kit`, tag `v1.4.4`, interfaccia 2 |
| Chiave di registro | `devcontainer` in `.dwp/config.json` |
| Configurazione per repository | `.devcontainer/dck.toml` |
| Rilevamento | `dck doctor --json` |

**Stabile da `v1.0.0`.** L’interfaccia pubblica segue il versionamento semantico e cambia in modo incompatibile solo in una nuova versione major (e, per i file, con un nuovo numero di interfaccia): i verbi di `dck` con i relativi flag documentati e codici di uscita (`0` ok, `1` fallito, `2` uso, `3` configurazione, `4` ambiente, `5` rifiutato), gli schemi di `dck.toml`, del profilo host e di `dck doctor --json` (interfaccia 2), e il contratto di rendering — i file che `dck init` scrive e possiede, i marcatori `dck:managed` e i blocchi utente che preserva, e l’ambiente che legge l’entrypoint. Nulla si rompe da `v0.3.7`: esegui `dck init` e `dck rebuild` perché l’immagine includa le versioni fissate attuali. L’immagine di `v1.4.4` incorpora Herdr 0.9.5, herdr-peers 2.2.1, coding-agents-kit 1.5.1 e DeepWorkPlan Vim 1.1.0.

## Livelli

Ogni container include gli strumenti di sviluppo (git, gh, ripgrep, un server SSH, Herdr e herdr-peers) e nessun segreto, a meno che tu non attivi gli [account host](#gli-account-host-nel-container). Il resto è un livello che scegli in `dck.toml`:

| Livello | Predefinito | Cosa aggiunge |
|---|---|---|
| `agents` | disattivato | [coding-agents-kit](/kit/agentkit) dalla sua release verificata e le CLI che elenchi, ciascuna con il proprio volume persistente, più i preset `classic` (`claudex`, `codexx`, …) e `providers` (`claude-glm`, `codex-azure`, …). Gli agenti girano in autonomia per impostazione predefinita: il container è la sandbox. Per disattivarla: `AGENTKIT_PERMISSIONS=ask` nel `.env` del servizio. |
| `editor` | attivato | Neovim con [DeepWorkPlan Vim](/kit/vim) fissato per tag; disattivato, lascia un editor semplice. |
| `dailybot` | disattivato | La CLI di Dailybot, per l’addon dailybot. |

Gli accessi, `gh`, la configurazione di Herdr e l’identità git sopravvivono a `bash dev.sh rebuild`. Con il livello `agents`, l’immagine include anche le tre skill di coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), collegate nella directory delle skill di ogni agente a ogni avvio, così un container ricreato le mantiene.

Il volume di stato (chiave host SSH, `~/.ssh`, login di `gh`, stato del client Herdr, cronologia) si chiama `state`. Quando più servizi condividono un unico progetto compose, assegna a ciascuno un nome proprio con `[compose] state_volume` in `dck.toml` (o `dck init --state-volume NAME`); altrimenti montano tutti lo stesso volume, e `dck doctor` lo segnala.

## Agenti tra macchine diverse

Da `v0.2.3`, `dck up` configura una mesh bidirezionale senza passaggi manuali, su Docker Desktop:

- **Container e host.** Gli agenti all’interno raggiungono gli agenti Herdr sull’host, in ogni altro container dck e negli altri container loopback che l’Herdr del tuo host gestisce già, e questi li raggiungono a loro volta. Ogni peer porta una chiave host fissata; nulla viene considerato attendibile al primo utilizzo.
- **Un listener opzionale sull’host.** `dck setup` propone, una sola volta, un server SSH a livello utente su `127.0.0.1` che accetta solo la chiave dck ed è mantenuto in esecuzione da launchd (macOS). Se esegui già un listener loopback, punta invece il profilo host verso di esso. `dck host listener disable` lo rimuove.
- **Sopravvive alle ricostruzioni.** Il catalogo delle macchine Herdr del container risiede su un volume, quindi `bash dev.sh rebuild` mantiene ogni macchina registrata al suo interno. Da `v0.3.2`, `rebuild`, `start` e `restart` eseguono gli stessi passaggi di `up`: il container viene registrato di nuovo presso l’Herdr dell’host, la sua chiave host viene fissata di nuovo e la mesh viene distribuita, così un container costruito da zero raggiunge subito l’host e i suoi peer.
- **Pannelli Codex dentro un container.** Un agente Codex ha bisogno di `HERDR_PEERS_SELF`, l’id macchina del container così come è salvato sull’host, per interpellare peer su altre macchine. Da `v0.3.3` il kit salva quell’id a ogni registrazione e le shell di login del container lo esportano, quindi nessun agente lo imposta a mano; `dck doctor` segnala una discrepanza. Da `v0.3.4` le configurazioni Codex proprie del container saltano il controllo degli aggiornamenti di Codex all’avvio e il suo daemon in background (il kit fissa la versione di ogni CLI), senza mai toccare la home Codex del tuo host né un profilo condiviso.
- **Risposte anche dall’host.** `dck setup` installa sull’host un [herdr-peers](/kit/herdr) verificato, così `dck agents` e `dck ask` funzionano anche lì e gli agenti dell’host rispondono con `herdr-peers reply`.
- **Container non creati dal kit.** Elenca le chiavi pubbliche con cui accedono in `[ssh] authorized_extra` nel profilo host, e potranno raggiungere anche i container dck.

Abbinalo a [coding-agents-kit](/kit/agentkit) sull’host e nel container, e lo stesso `ak` avvia agenti su entrambi i lati.

## Gli account host nel container

Un container può usare gli account che hai già sull’host, come git funziona già tramite l’agente SSH dell’host, senza alcun login all’interno. È opt-in e si trova nel tuo **profilo host**, mai nel `dck.toml` di un repository:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Con `host_profiles` attivo, `dck up` condivide solo i profili delle CLI che il repository installa:

- **Claude Code** tramite un token di lunga durata per profilo: `CLAUDE_CODE_OAUTH_TOKEN` per `@default` e `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` per `@name` (il suffisso in maiuscolo, con ogni carattere al di fuori di `A-Z`, `0-9` e `_` convertito in `_`).
- **Codex** tramite il suo file di autenticazione, per `@default` e per ogni profilo.
- **Il file di ambiente del kit**, di sola lettura e ridotto ai nomi in `host_env_keys`.

L’intera home di agentkit non viene mai montata, e i profili che contengono percorsi assoluti dell’host vengono saltati. Un login Codex condiviso in lettura e scrittura può essere rinnovato da due scrittori contemporaneamente: tieni un solo agente attivo per account Codex. `[agents] default_profile` nel profilo host (per esempio `{ claude = "@work3" }`) fa sì che un semplice `ak claude` all’interno usi quell’account condiviso (coding-agents-kit ≥ `v0.5.2`); un login Claude `@default` su macOS risiede nel Portachiavi (Keychain) e non può essere condiviso. Da `v0.3.4` le shell del container puntano anche un semplice `claude` o `codex` a quell’account, così i pannelli che Herdr ripristina si aprono su di esso invece che su una schermata di login. Nel container, lo stesso `ak <kind> @<profile>` gira sullo stesso account che sull’host, ed è ciò che permette a un lead di affidare alle corsie del container gli account scelti da `ak pick` — vedi [Eseguire molti agenti](/methodology/06-orchestration).

## Più repository, un solo stack compose

Da `v0.3.3`, un repository il cui servizio è una parte di un progetto compose più ampio (un’API, un’app web, worker e un database che condividono un unico progetto) può unirsi a esso senza modificare a mano ciò che dck genera. Tutto è additivo: un repository che non imposta nessuna di queste chiavi viene generato esattamente come prima.

- **Un progetto, un volume di stato per servizio.** `[compose] project` indica il progetto condiviso in ogni repository; `state_volume`, `[compose] networks` e `[compose] volumes` tengono separati lo stato di ciascun servizio e i volumi di dati e le reti dello stack.
- **Un blocco utente.** Le righe tra `# >>> user:<service> >>>` e `# <<< user:<service> <<<` all’interno del servizio dck vengono mantenute alla lettera: chiavi semplici per ciò che dck non genera (`depends_on`, `healthcheck`), e `x-dck-merge:` per le chiavi che genera. Un file con solo alcuni dei marcatori di dck viene rifiutato indicando la correzione, invece di essere riscritto.
- **Porte come stringhe.** `ssh_port` e `ports` accettano espressioni compose come `"${API_PORT:-8000}:8000"`; restano su `127.0.0.1` a meno che la stringa non indichi un IP dell’host.
- **Build condivise e il tuo launcher.** `[build] context` e `[build] dockerfile` coprono un Dockerfile condiviso da più servizi; `dev_sh = false` mantiene il `dev.sh` proprio del repository.
- **Satelliti del workspace.** Da `v0.3.5`, una seconda istanza del servizio nel proprio progetto compose si avvia e si arresta tramite dck (`dck --project P --compose-file F --service S up` o `down`), così ottiene la stessa chiave host, gli stessi account, la stessa identità git e la stessa macchina Herdr di quella principale; `up --seed-state-from VOLUME` copia solo i login nel suo volume di stato vuoto. In un file di overlay, `extends` deve indicare il file che estende.
- **Node per gli agenti.** Il Node degli agenti risiede in `/opt/dck/node` e non sostituisce mai quello dell’immagine; `[agents] node_first = true` lo mette per primo nel PATH quando gli strumenti del repository lo richiedono.

## Le chiavi SSH dell’host nel container

Alcuni strumenti leggono solo file di chiave e ignorano l’agente inoltrato: `gh auth login`, per esempio, propone di generare una nuova chiave. Da `v0.3.2` puoi attivarlo come opt-in, solo nel tuo **profilo host** (il `dck.toml` di un repository non può impostarlo; `dck setup` lo chiede una volta, con risposta predefinita no):

```toml
[ssh]
copy_keys = true              # default false
```

Finché è attivo, `dck up` monta in sola lettura il `~/.ssh` dell’host in `~/.ssh_host`, e a ogni avvio ne copia le chiavi `id_*` nel `~/.ssh` del container (chiavi private `0600`), mantenendole allineate con l’host. L’inoltro dell’agente resta invariato, e disattivandolo le copie vengono rimosse all’avvio successivo. Il costo: l’intero `~/.ssh` dell’host è leggibile all’interno del container, e le chiavi private restano nel volume di stato.

## Da devcontainer-kit 1.3.0 (interfaccia 2)

La release 1.3.0 mantiene l’interfaccia 2 e aggiunge una chiave facoltativa; un repository che non la imposta viene renderizzato esattamente come prima.

- **`[compose] container_only`.** I sottopercorsi del workspace elencati qui vengono montati come volumi con nome a livello di progetto (`co-<path-slug>`, per esempio `co-app-node_modules` su `/app/node_modules`), in lettura e scrittura, sul servizio principale. Ciò che il container compila lì non raggiunge mai il checkout dell’host. Il caso per cui esiste: il workspace è un bind mount, e un’installazione `npm` o `pnpm` dentro il container su un host macOS o Windows sostituisce `node_modules` con la build della propria piattaforma, rompendo l’installazione dell’host.
- **Proprietà a ogni avvio.** L’entrypoint assegna ogni punto di montaggio all’utente configurato a ogni avvio del container; quando l’utente ne è già proprietario, non fa nulla.
- **Un solo montaggio per percorso.** Un percorso che anche il blocco utente monta viene rifiutato, così come un nome di volume derivato già usato da `compose.state_volume` o `[compose] volumes`. Lo schema di `dck.toml` (`dck-config-v2.json`) acquisisce la chiave.

L’immagine di 1.3.0 incorporava le stesse versioni di 1.2.0: herdr-peers 1.3.1, coding-agents-kit 1.4.0 e DeepWorkPlan Vim 1.0.1, con il pacchetto vendorizzato 7.12.1.

## Da devcontainer-kit 1.4.0 (interfaccia 2)

La release 1.4.0 mantiene l’interfaccia 2 e aggiorna le versioni che l’immagine incorpora; la superficie propria di dck non cambia.

- **herdr-peers 2.1.0 (protocollo 2).** La nomina di lead sulla parola esplicita dell’umano, il cervello facoltativo dell’autopilot, che si chiude in caso di errore, e la coda dei piani arrivano con 2.0.0; domande, avvisi e risposte restano compatibili con i peer 1.x. La 2.1.0 aggiunge le viste di `fleet ui`, nega un permesso che il demone non può accettare invece di lasciare l’agente in attesa e legge le classi di blocco del pack 8.0. dck non avvia mai il demone.
- **coding-agents-kit 1.5.0 (interfaccia 1).** Con `AGENTKIT_PERMISSIONS=ask` o `--ask` viene applicata la modalità ask propria di ogni CLI, così un account le cui impostazioni usano per default una modalità autonoma non parte più in modalità autonoma; `ak run --json` riporta i conteggi dei token solo quando lo fa la CLI. Il livello `agents` continua a non scrivere alcun flag di autonomia.
- **DeepWorkPlan Vim 1.1.0.** Lo stesso Neovim (0.12.5); l’editor mostra in sola lettura la coda dei piani, i blocchi strutturati e la postura di autonomia del pack 8.0, e un piano v7 viene mostrato come prima.
- **Il repository applica DeepWorkPlan 8.0.1 a sé stesso.** I nuovi piani scrivono `plan-contract/v8`; i piani v7, v6 e v5 mantengono la loro generazione.

## Da devcontainer-kit 1.4.1 (interfaccia 2)

La release 1.4.1 è una patch: l’immagine incorpora herdr-peers 2.2.0, che aggiunge l’opzionale `autopilot --loop --revive` (un nuovo agente per un piano il cui lead e tutti i successori non ci sono più, concesso dalla persona che avvia il daemon), e il repository usa DeepWorkPlan 8.0.2. L’interfaccia 2, coding-agents-kit 1.5.0, DeepWorkPlan Vim 1.1.0 e la superficie propria di dck non cambiano; dck non avvia mai il daemon.

## Da devcontainer-kit 1.4.2 (interfaccia 2)

La release 1.4.2 è una patch: l’immagine `node-24` passa alla release di sicurezza Node 24.22.3 (la 1.4.1 fissava 24.21.0, quindi `dck init` poteva riportare indietro un repository su 24.22.x), e lo stato di herdr-peers — il registro delle deleghe, i record di lead, le risposte e lo stato dell’autopilot in `~/.local/state/herdr-peers` — ora resta sul volume di stato del container (modalità 0700) e sopravvive a una ricostruzione. L’interfaccia 2, herdr-peers 2.2.0, coding-agents-kit 1.5.0 e DeepWorkPlan Vim 1.1.0 non cambiano.

## Da devcontainer-kit 1.4.3 (interfaccia 2)

La release 1.4.3 è una patch: l’immagine passa a Herdr 0.9.5, ora scaricato da `herdrdev/herdr` (dove il progetto si è trasferito) e verificato rispetto ai digest della release del fornitore — la 0.9.4 mantiene attivo il server Herdr quando la shell che lo ha avviato si chiude — e a herdr-peers 2.2.1, il cui `autopilot --loop --revive` si rifiuta di partire senza coding-agents-kit 1.3.0 o successivo. L’interfaccia 2, coding-agents-kit 1.5.0, DeepWorkPlan Vim 1.1.0 e la superficie propria di dck non cambiano; dck non avvia mai il daemon.

## Da devcontainer-kit 1.4.4 (interfaccia 2)

La release 1.4.4 è una patch: il livello `agents` passa a coding-agents-kit 1.5.1, i cui `ak install` e `ak update` mantengono il binario nativo di ogni piattaforma per le CLI installate con npm (prima Codex) e considerano fallita un'installazione la cui CLI non si avvia, e il livello `dailybot` passa alla CLI Dailybot 3.29.2, con il wheel verificato contro lo SHA-256 di PyPI. L'interfaccia 2, Herdr 0.9.5, herdr-peers 2.2.1, DeepWorkPlan Vim 1.1.0 e la superficie propria di dck non cambiano.

## Impostazioni di sicurezza predefinite

- Ogni porta pubblicata si associa a `127.0.0.1`, a meno che `dck.toml` non imposti `bind`.
- Git su SSH passa attraverso l’agente SSH dell’host: il suo socket, mai un file di chiave e mai un `~/.ssh` o un `~/.gitconfig` montato, a meno che tu non abbia attivato [`copy_keys`](#le-chiavi-ssh-dellhost-nel-container) nel tuo profilo host. L’identità git deriva dai valori `DCK_GIT_*` che `dck setup` compila.
- Le chiavi host SSH vengono generate a runtime in un volume per progetto, mai incorporate in un’immagine; il server accetta solo chiavi pubbliche, senza login root e senza password.
- Il template non aggiunge `cap_add`, né la modalità `privileged`, né il socket di Docker.
- Ogni download è fissato per versione e verificato tramite checksum; l’immagine di base è fissata per digest.
- La mesh di Herdr che permette agli agenti di un container di raggiungere gli altri è attiva per impostazione predefinita ed è documentata, con i relativi interruttori di disattivazione, nel modello delle minacce del kit. Il listener dell’host permette al codice di un container in esecuzione di aprire una shell sull’host con la tua identità: è opt-in, solo loopback, accetta solo la chiave dck e si rimuove con `dck host listener disable`.

## Note

Opzionale e mai richiesto. Un repository è pienamente conforme con zero addon opzionali. Sono supportati host Linux e macOS; la mesh tra container richiede Docker Desktop.
