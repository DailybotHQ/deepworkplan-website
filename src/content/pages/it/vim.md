---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim è l’editor da terminale di Deep Work Plan: configurazione Neovim 0.12+ con indice dei comandi generato e visualizzatore Markdown."
lastUpdated: 2026-10-03
---

## Cos'è

Una configurazione Neovim per persone e agenti di programmazione che vivono nel terminale — i propri Deep Work Plans, la documentazione e l’indice dei comandi a un tasto di distanza.

## Installazione

Una riga installa DeepWorkPlan Vim come configurazione di Neovim. L’installer spiega cosa farà e chiede prima di toccare una configurazione esistente.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Prima il consenso: una configurazione Neovim esistente non viene mai sovrascritta senza l’approvazione esplicita. L’installer si ferma e mostra il percorso manuale.

Su Windows il comando di una riga non si applica; il README del repository documenta il percorso manuale. [Percorso di installazione Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Cosa fa

Cinque funzionalità, delimitate di proposito. Ognuna corrisponde a una combinazione di tasti che si può consultare nell’indice dei comandi generato.

| Funzionalità | Che cos’è | Mappatura |
|---|---|---|
| Indice dei comandi generato | Un indice dei comandi generato dalla configurazione attiva, così l’elenco delle scorciatoie è sempre aggiornato. | `SPC h h` |
| Gesti in stile VS Code | Gesti di editazione modellati sugli editor grafici: selezionare tutto e copiare negli appunti di sistema. | `<C-a>`, `y`, `<leader>y` |
| Browser di Deep Work Plan | Un pannello che sfoglia i piani del repository — legga un piano, i suoi task e le sue porte di validazione senza uscire dall’editor. | `SPC P` |
| Visualizzatore Markdown | Anteprima del Markdown nel browser o resa nel buffer, così documentazione e piani restano dove avviene il lavoro. | `SPC m p`, `SPC m r` |
| Installer di una riga | Un installer autonomo per macOS e Linux, con un percorso manuale documentato per Windows. | — |

## Requisiti

- Neovim 0.12 o più recente, con Lua (lua, lua5.4 o luajit) disponibile
- macOS e Linux; Windows è supportato tramite un percorso manuale documentato
- Con licenza GPL-3.0 — libero da usare, studiare e modificare

## Approfondimenti

- [Leggi il doc dell’addon nel kit](/kit/vim)
- [Vedi il repository sorgente](https://github.com/DailybotHQ/deepworkplan-vim)
- Installi DeepWorkPlan Vim, apra Neovim e legga i propri Deep Work Plans nello stesso terminale dei suoi agenti.
