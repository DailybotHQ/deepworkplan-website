---
title: DeepWorkPlan Vim
description: "Addon DWP opt-in: DeepWorkPlan Vim, l'editor di terminale di Deep Work Plan — indice dei comandi generato, navigazione dei piani e lettura Markdown in Neovim."
kind: addon
lang: it
order: 6
---

# L'addon DeepWorkPlan Vim

**DeepWorkPlan Vim** è l'editor di terminale di Deep Work Plan: una configurazione Neovim (è l'editor stesso, non un file di repository) che mette le superfici di lavoro della metodologia a un tasto di distanza. Dove le altre voci del kit installano l'harness in un repository, questo addon fornisce alla persona — e a qualsiasi agente che guidi Neovim in headless — un editor che parla DWP nativamente.

Richiede **Neovim 0.12 o successivo**, funziona su **macOS e Linux** (Windows è coperto da un percorso manuale documentato) ed è rilasciato con licenza **GPL-3.0** — libero da usare, studiare e modificare.

## Cosa aggiunge

| # | Funzionalità | Cosa fa | Mapping |
|---|---------|--------------|---------|
| F1 | **Indice dei comandi generato** | Tutto l'editor, elencato: ogni comando con il suo mapping e una descrizione di una riga, generato dalla configurazione viva così che l'indice non diverga dall'editor. | `SPC h h` |
| F2 | **Gesti in stile VS Code** | Seleziona tutto, copia e yank negli appunti con gli accordi che la memoria muscolare conosce già. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Browser di Deep Work Plan** | Apre il piano che guida il repository — attività, gate e stato di completamento — senza uscire dall'editor. | `SPC P` |
| F4 | **Visualizzatore Markdown** | Legge il Markdown come fanno gli agenti: anteprima renderizzata o sorgente grezzo per la fedeltà del copia-incolla. | `SPC m p`, `SPC m r` |
| F5 | **Installer di una riga** | Un `install.sh` consent-first per macOS e Linux; il percorso manuale documentato copre Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Installazione

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

L'installer è **consent-first**: una configurazione Neovim esistente e estranea non viene mai sovrascritta. In pipe senza terminale, si interrompe con le istruzioni invece di toccare qualsiasi cosa; in modo interattivo, chiede prima di spostare da parte una configurazione esistente. I plugin si installano in headless al primo avvio — niente danza di chiusura e riapertura.

Windows non è una destinazione `curl | bash`. Il percorso manuale documentato (winget più Git Bash, oppure WSL) vive nel README del repository.

Superficie completa, senza screenshot e limitata al contratto: la [pagina /vim](/vim).

## Quando ricorrervi

| Segnale | Azione |
|--------|--------|
| Chi sviluppa vive nel terminale e guida il repository per piano | **Offrire** l'addon |
| Esecuzione DWP di lungo orizzonte in cui il browser dei piani (`SPC P`) tiene lo stato visibile | **Consigliare** |
| L'editor di chi sviluppa è già configurato e non negoziabile | **Saltare** — l'addon è opt-in per progetto |
| Team solo Windows senza WSL | **Saltare**, o puntare al percorso manuale documentato |

## Voci del kit correlate

- [Devcontainer](/kit/devcontainer) — ambiente di sviluppo riproducibile (primo addon)
- [Dailybot](/kit/dailybot) — report del ciclo di vita del piano visibili al team (secondo addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — revisione locale durante le Final Review del piano (quinto addon)
