---
title: Devcontainer
description: "Addon opzionale basato su devcontainer-kit: un template Dev Containers generato da dck init, immagini di base senza agenti e macchine Herdr per ogni container."
kind: addon
lang: it
order: 1
---

# Addon devcontainer

Dai al repository un container di sviluppo riproducibile e isolato — utilizzabile allo stesso modo da persone, editor e agenti di codice. Nella **beta di DWP v7** (`v7.0.0-beta.1`, una pre-release) questo addon integra **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, un prodotto MIT che funziona senza Deep Work Plan, e sostituisce il template che il pack includeva in precedenza. È opzionale: un repository è pienamente conforme anche senza.

## Cosa fornisce devcontainer-kit

- **Un template**, basato sulla specifica [Dev Containers](https://containers.dev), che `dck init` genera nel repository: `devcontainer.json`, un file compose e `docker/local/`. Rieseguito in seguito, riconcilia e non sovrascrive mai le tue modifiche; qualsiasi cambiamento a un file esistente viene mostrato prima e richiede il consenso.
- **`dck`**, un launcher che esegue il container da un normale terminale — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — con o senza VS Code o Cursor.
- **Immagini di base** in tre varianti, `python-3.13`, `node-24` e `debian`, distribuite **senza** agenti di codice.
- **Una libreria di entrypoint** per volumi persistenti, SSH e l’ambiente delle sessioni SSH, al posto di un entrypoint copiato a mano in ogni repository.
- **Macchine Herdr.** Ogni container può unirsi a [Herdr](https://herdr.dev) tramite un server SSH limitato al loopback, così gli agenti al suo interno diventano peer raggiungibili.

## Installazione

```bash
git clone --branch v0.1.4 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Requisiti: `bash` 3.2 o successivo e `python3` 3.11 o successivo su un host Linux o macOS, e Docker con Compose v2 per i comandi del container. Verifica una release con il suo asset `SHA256SUMS`.

| Elemento | Valore |
|---|---|
| Prodotto | `DailybotHQ/devcontainer-kit`, tag `v0.1.4`, interfaccia 1 |
| Chiave di registro | `devcontainer` in `.dwp/config.json` |
| Configurazione per repository | `.devcontainer/dck.toml` |
| Rilevamento | `dck doctor --json` |

## I livelli sono opt-in

Le immagini di base contengono gli strumenti di sviluppo — git, gh, ripgrep, un server SSH, Herdr e Neovim con DeepWorkPlan Vim fissato per tag — e nessun agente di codice, nessuna CLI di reporting e nessun segreto. Tutto il resto è un livello che attivi in `dck.toml`:

| Livello | Predefinito | Cosa aggiunge |
|---|---|---|
| `agents` | disattivato | Installa [coding-agents-kit](/kit/agentkit) e le CLI che elenchi, ciascuna con il proprio volume persistente. Non viene impostato alcun flag di bypass delle autorizzazioni. |
| `editor` | attivato | Neovim con DeepWorkPlan Vim; se disattivato, offre un editor semplice. |

## Impostazioni di sicurezza predefinite

- Ogni porta pubblicata è vincolata a `127.0.0.1`, a meno che `dck.toml` non imposti `bind`.
- Inoltro dell’agente SSH dall’host; le chiavi private dell’host non vengono mai copiate in un container.
- Le chiavi host SSH vengono generate a runtime in un volume per progetto, mai incorporate in un’immagine; il server accetta solo chiavi pubbliche, senza login root e senza password.
- Il template non aggiunge `cap_add`, né la modalità `privileged`, né il socket Docker.
- Le immagini di base e gli strumenti sono fissati per versione e verificati tramite checksum; compose fa riferimento all’immagine di base tramite digest ogni volta che il digest può essere risolto.

## Note

Opzionale e mai richiesto. Un repository è pienamente conforme con zero addon opzionali. La v0.1 supporta host Linux e macOS.
