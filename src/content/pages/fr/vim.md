---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim est l’éditeur de terminal de Deep Work Plan : configuration Neovim 0.12+ avec index de commandes généré et visionneuse Markdown."
lastUpdated: 2026-10-03
---

## Présentation

Une configuration Neovim pour les humains et les agents de code qui vivent dans le terminal — vos Deep Work Plans, la documentation et l’index de commandes à une frappe de distance.

## Installation

Une ligne installe DeepWorkPlan Vim comme configuration Neovim. L’installateur explique ce qu’il va faire et demande avant de toucher à une configuration existante.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Le consentement d’abord : une configuration Neovim existante n’est jamais écrasée sans votre accord explicite. L’installateur s’arrête et montre le chemin manuel.

Sous Windows, la ligne unique ne s’applique pas ; le README du dépôt documente le chemin manuel. [Chemin d’installation Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Ce que ça fait

Cinq fonctionnalités, volontairement bornées. Chacune correspond à un raccourci clavier que vous pouvez consulter dans l’index de commandes généré.

| Fonctionnalité | Ce que c’est | Affectation |
|---|---|---|
| Index de commandes généré | Un index de commandes généré depuis la configuration active, pour que la liste des raccourcis reste toujours à jour. | `SPC h h` |
| Gestes à la VS Code | Des gestes d’édition façonnés par les éditeurs graphiques : tout sélectionner et copier dans le presse-papiers du système. | `<C-a>`, `y`, `<leader>y` |
| Navigateur de Deep Work Plan | Un panneau qui parcourt les plans du dépôt — lisez un plan, ses tâches et ses portes de validation sans quitter l’éditeur. | `SPC P` |
| Visionneuse Markdown | Prévisualisez le Markdown dans le navigateur ou rendez-le dans le buffer — la documentation et les plans restent là où le travail se fait. | `SPC m p`, `SPC m r` |
| Installateur en une ligne | Un installateur autonome pour macOS et Linux, avec un chemin manuel documenté pour Windows. | — |

## Prérequis

- Neovim 0.12 ou plus récent, avec Lua (lua, lua5.4 ou luajit) disponible
- macOS et Linux ; Windows est pris en charge via un chemin manuel documenté
- Sous licence GPL-3.0 — libre d’utilisation, d’étude et de modification

## Pour aller plus loin

- [Lire le doc de l’addon du kit](/kit/vim)
- [Voir le dépôt source](https://github.com/DailybotHQ/deepworkplan-vim)
- Installez DeepWorkPlan Vim, ouvrez Neovim et lisez vos Deep Work Plans dans le même terminal que vos agents.
