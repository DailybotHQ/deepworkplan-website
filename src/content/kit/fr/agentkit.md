---
title: Agentkit
description: "Un addon v7 facultatif fondé sur coding-agents-kit : une seule commande ak pour chaque agent de code en terminal et la délégation headless de tâches délimitées."
kind: addon
lang: fr
order: 8
---

# Addon Agentkit

Chaque agent de code en terminal a ses propres options pour reprendre une session, sa propre manière d’isoler un second compte, son propre mode headless et son propre interrupteur pour ignorer les demandes d’autorisation. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** place une seule surface de commandes au-dessus de tous : `ak <kind> [@profile]`.

Cet addon intègre le kit dans **DWP v7** (`v7.0.0`) comme transport de délégation **headless**. Il est facultatif : sans lui, chaque tâche s’exécute dans la session courante, exactement comme avant. Le kit lui-même est un produit MIT qui fonctionne sans Deep Work Plan.

## Ce que vous apporte le kit

- **Une grammaire pour chaque CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` et `ak grok`, ainsi que des variantes de fournisseur (GLM, Azure, xAI), avec les mêmes options de session : `-c` continue, `-r <id>` reprend.
- **Des profils.** `ak claude @work` exécute un second compte dans son propre répertoire personnel, séparé du premier.
- **Des exécutions headless.** `ak run <kind> -- "<prompt>"` exécute un prompt de manière non interactive et renvoie un code de sortie documenté, éventuellement sous la forme d’un unique objet JSON.
- **Un diagnostic.** `ak doctor --json` indique quelles CLI sont installées, les profils, et les noms des clés définies — jamais leurs valeurs.
- **Des installations.** `ak install <cli>` installe une CLI manquante depuis le canal officiel de son éditeur.

## Installation

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Prérequis : `bash` sous macOS ou Linux, et `python3` 3.9 ou ultérieur ; rien d’autre. Windows utilise `install.ps1`. Épinglez `v0.1.1` : elle remplace `v0.1.0` et apporte un correctif de sécurité.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, interface 1 |
| Clé de registre | `agentkit` dans `.dwp/config.json` |
| Transport | headless : un `ak run` par délégué dans un worktree git dédié |
| Fournit | `subagents`, `cancel_children`, `model_routing` |
| Requiert | l’octroi `agent_delegation` du contrat du plan |

## Les autorisations sont transmises telles quelles

`ak <kind>` n’ajoute **aucune** option de contournement des autorisations. L’autonomie est un choix explicite : `--auto` sur une commande, ou `AGENTKIT_PERMISSIONS=auto` dans l’environnement, ajoute l’option d’autonomie propre à la CLI pour ce lancement. Le preset d’alias `classic`, qui recrée des raccourcis tels que `claudex`, est livré désactivé.

L’addon n’ajoute jamais d’option d’autonomie de lui-même. Un plan n’utilise `--auto` qu’avec le choix explicite et consigné du développeur, et uniquement dans un worktree ou un conteneur isolé.

## Ce qu’il ajoute à un plan

Sur un plan v7 dont le contrat octroie `agent_delegation`, `execute` peut confier une tâche `parallel_safe` à une autre CLI : il crée un worktree git dédié, y exécute `ak run` avec un délai d’expiration, et recueille le résultat dans le dossier `analysis_results/delegations/` du plan. Le résultat est une preuve `asserted` tant que l’exécuteur de portes du plan lui-même ne l’a pas observé. Annuler un délégué arrête toute son arborescence de processus.

## Agentkit ou Herdr

| Situation | Utiliser |
|---|---|
| Une tâche `parallel_safe` délimitée avec une sortie déclarée | Agentkit (headless) |
| La tâche nécessite une interaction, dure longtemps ou se trouve sur une autre machine | [Herdr](/kit/herdr) (un pair dans un panneau) |

Les deux se combinent : herdr-peers peut lancer un pair dans un panneau avec l’environnement qu’affiche `ak env <kind> @profile`.

## Notes

Facultatif et jamais requis. Les valeurs des clés d’API ne sont jamais affichées, journalisées ni écrites dans un fichier de configuration ; l’exception documentée est Cline, qui reçoit sa clé sur la ligne de commande. L’extraction des résultats pour OpenCode, Pi, Cline et Grok est construite à partir de la documentation des éditeurs et n’a pas encore été éprouvée sur des comptes réels ; une sortie inconnue se rabat sur le texte brut.
