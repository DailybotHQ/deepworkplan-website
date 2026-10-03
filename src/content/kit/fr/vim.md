---
title: DeepWorkPlan Vim
description: "Addon DWP optionnel : DeepWorkPlan Vim, l'éditeur de terminal DWP — index de commandes généré, navigation des plans et lecture Markdown dans Neovim."
kind: addon
lang: fr
order: 6
---

# L'addon DeepWorkPlan Vim

**DeepWorkPlan Vim** est l'éditeur de terminal de Deep Work Plan : une configuration Neovim (l'éditeur lui-même, pas un fichier de dépôt) qui place les surfaces de travail de la méthodologie à une frappe de distance. Là où les autres entrées du kit installent le harness dans un dépôt, cet addon équipe la personne — et tout agent pilotant Neovim en headless — d'un éditeur qui parle DWP nativement.

Il exige **Neovim 0.12 ou plus récent**, fonctionne sur **macOS et Linux** (Windows passe par un chemin manuel documenté) et est sous licence **GPL-3.0** — libre à utiliser, étudier et modifier.

## Ce qu'il ajoute

| # | Fonctionnalité | Ce qu'elle fait | Raccourci |
|---|---------|--------------|---------|
| F1 | **Index de commandes généré** | Tout l'éditeur, listé : chaque commande avec son raccourci et une description d'une ligne, généré depuis la configuration vivante pour que l'index ne dérive pas de l'éditeur. | `SPC h h` |
| F2 | **Gestes à la VS Code** | Tout sélectionner, copier et yank vers le presse-papiers sous les accords que la mémoire musculaire connaît déjà. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Navigateur de Deep Work Plan** | Ouvre le plan qui pilote le dépôt — tâches, gates et état d'achèvement — sans quitter l'éditeur. | `SPC P` |
| F4 | **Visionneuse Markdown** | Lit le Markdown comme les agents le font : aperçu rendu, ou la source brute pour la fidélité du copier-coller. | `SPC m p`, `SPC m r` |
| F5 | **Installateur en une ligne** | Un `install.sh` consent-first pour macOS et Linux ; le chemin manuel documenté couvre Windows. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Installation

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

L'installateur est **consent-first** : une configuration Neovim existante et étrangère n'est jamais écrasée. Pipé sans terminal, il abandonne avec les instructions au lieu de toucher quoi que ce soit ; en interactif, il demande avant d'écarter une configuration existante. Les plugins s'installent en headless au premier lancement — pas de danse quitter-et-rouvrir.

Windows n'est pas une cible `curl | bash`. Le chemin manuel documenté (winget plus Git Bash, ou WSL) vit dans le README du dépôt.

Toute la surface, sans captures d'écran et limitée au contrat : la [page /vim](/vim).

## Quand y recourir

| Signal | Action |
|--------|--------|
| La personne développeuse vit dans le terminal et pilote le dépôt par plan | **Proposer** l'addon |
| Exécution DWP de long horizon où le navigateur de plans (`SPC P`) garde l'état visible | **Recommander** |
| L'éditeur de la personne développeuse est déjà configuré et non négociable | **Passer** — l'addon est opt-in de par sa conception |
| Équipe Windows seule sans WSL | **Passer**, ou pointer vers le chemin manuel documenté |

## Entrées du kit liées

- [Devcontainer](/kit/devcontainer) — environnement de développement reproductible (premier addon)
- [Dailybot](/kit/dailybot) — rapports de cycle de vie du plan visibles par l'équipe (deuxième addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — revue locale pendant les Final Reviews du plan (cinquième addon)
