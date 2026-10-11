---
title: Devcontainer
description: "Un dev container riproducibile per ogni repository, da un unico template: agenti sui tuoi account host con ak, Herdr nei due sensi e nessuna chiave SSH dentro."
kind: addon
lang: it
order: 1
---

# Addon devcontainer

Dai al repository un container di sviluppo riproducibile e isolato, che persone, editor e agenti di codice possano usare allo stesso modo. In **DWP v7** (pack `v7.6.0`) questo addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un prodotto MIT che funziona senza Deep Work Plan. È opzionale: un repository è pienamente conforme anche senza di esso.

## Cosa fornisce devcontainer-kit

- **Un template**, basato sulla specifica [Dev Containers](https://containers.dev), che `dck init` genera nel repository con una struttura fissa: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` e `dev.sh`. Rieseguito in seguito, riconcilia e non sovrascrive mai le tue modifiche; qualsiasi modifica a un file esistente viene mostrata prima e richiede il consenso.
- **Il container proprio del repository.** Il Dockerfile parte dall’immagine ufficiale del runtime fissata per digest (`node-24`, `python-3.13` o `debian`) e copia i passaggi di build del kit in `docker/local/<service>/dck/`. Non è coinvolta alcuna immagine di base condivisa.
- **`dev.sh` e `dck`.** `bash dev.sh up` costruisce, avvia e si collega al container da un semplice terminale; `shell`, `rebuild`, `doctor` e gli altri funzionano con o senza VS Code o Cursor.
- **Herdr in entrambi i sensi.** L’[Herdr](https://herdr.dev) dell’host collega ogni container come una macchina tramite un server SSH limitato al loopback, e il container si apre con la barra laterale standard: App, Editor, Development e Agents. Ogni workspace e ogni pannello, compresi quelli aperti in seguito, partono dal percorso dell’applicazione (`/app` per impostazione predefinita). All’interno, [herdr-peers](/kit/herdr) permette agli agenti di interpellare agenti sull’host e in altri container.
- **La skill `dck-dockerfile`.** Un agente crea o rigenera il container di un repository su richiesta e lo dimostra con una build reale.

## Installazione

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisiti: `bash` 3.2 o successivo e `python3` 3.11 o successivo su un host Linux o macOS, e Docker con Compose v2 per i comandi del container. Verifica una release con il suo asset `SHA256SUMS`. Fissa `v0.3.0`: `v0.2.0` non è supportata.

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/devcontainer-kit`, tag `v0.3.0`, interfaccia 2 |
| Chiave di registro | `devcontainer` in `.dwp/config.json` |
| Configurazione per repository | `.devcontainer/dck.toml` |
| Rilevamento | `dck doctor --json` |

## Livelli

Ogni container include gli strumenti di sviluppo (git, gh, ripgrep, un server SSH, Herdr e herdr-peers) e nessun segreto, a meno che tu non attivi gli [account host](#gli-account-host-nel-container). Il resto è un livello che scegli in `dck.toml`:

| Livello | Predefinito | Cosa aggiunge |
|---|---|---|
| `agents` | disattivato | [coding-agents-kit](/kit/agentkit) dalla sua release verificata e le CLI che elenchi, ciascuna con il proprio volume persistente, più i preset `classic` (`claudex`, `codexx`, …) e `providers` (`claude-glm`, `codex-azure`, …). Gli agenti girano in autonomia per impostazione predefinita: il container è la sandbox. Per disattivarla: `AGENTKIT_PERMISSIONS=ask` nel `.env` del servizio. |
| `editor` | attivato | Neovim con [DeepWorkPlan Vim](/kit/vim) fissato per tag; disattivato, lascia un editor semplice. |
| `dailybot` | disattivato | La CLI di Dailybot, per l’addon dailybot. |

Gli accessi, `gh`, la configurazione di Herdr e l’identità git sopravvivono a `bash dev.sh rebuild`.

## Agenti tra macchine diverse

Da `v0.2.3`, `dck up` configura una mesh bidirezionale senza passaggi manuali, su Docker Desktop:

- **Container e host.** Gli agenti all’interno raggiungono gli agenti Herdr sull’host, in ogni altro container dck e negli altri container loopback che l’Herdr del tuo host gestisce già, e questi li raggiungono a loro volta. Ogni peer porta una chiave host fissata; nulla viene considerato attendibile al primo utilizzo.
- **Un listener opzionale sull’host.** `dck setup` propone, una sola volta, un server SSH a livello utente su `127.0.0.1` che accetta solo la chiave dck ed è mantenuto in esecuzione da launchd (macOS). Se esegui già un listener loopback, punta invece il profilo host verso di esso. `dck host listener disable` lo rimuove.
- **Sopravvive alle ricostruzioni.** Il catalogo delle macchine Herdr del container risiede su un volume, quindi `bash dev.sh rebuild` mantiene ogni macchina registrata al suo interno.
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

L’intera home di agentkit non viene mai montata, e i profili che contengono percorsi assoluti dell’host vengono saltati. Un login Codex condiviso in lettura e scrittura può essere rinnovato da due scrittori contemporaneamente: tieni un solo agente attivo per account Codex. Nel container, lo stesso `ak <kind> @<profile>` gira sullo stesso account che sull’host, ed è ciò che permette a un lead di affidare alle corsie del container gli account scelti da `ak pick` — vedi [Eseguire molti agenti](/methodology/06-orchestration).

## Impostazioni di sicurezza predefinite

- Ogni porta pubblicata si associa a `127.0.0.1`, a meno che `dck.toml` non imposti `bind`.
- Git su SSH passa attraverso l’agente SSH dell’host: il suo socket, mai un file di chiave e mai un `~/.ssh` o un `~/.gitconfig` montato. L’identità git deriva dai valori `DCK_GIT_*` che `dck setup` compila.
- Le chiavi host SSH vengono generate a runtime in un volume per progetto, mai incorporate in un’immagine; il server accetta solo chiavi pubbliche, senza login root e senza password.
- Il template non aggiunge `cap_add`, né la modalità `privileged`, né il socket di Docker.
- Ogni download è fissato per versione e verificato tramite checksum; l’immagine di base è fissata per digest.
- La mesh di Herdr che permette agli agenti di un container di raggiungere gli altri è attiva per impostazione predefinita ed è documentata, con i relativi interruttori di disattivazione, nel modello delle minacce del kit. Il listener dell’host permette al codice di un container in esecuzione di aprire una shell sull’host con la tua identità: è opt-in, solo loopback, accetta solo la chiave dck e si rimuove con `dck host listener disable`.

## Note

Opzionale e mai richiesto. Un repository è pienamente conforme con zero addon opzionali. La v0.2 supporta host Linux e macOS; la mesh tra container richiede Docker Desktop.
