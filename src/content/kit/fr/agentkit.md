---
title: Agentkit
description: "Addon v7 facultatif fondé sur coding-agents-kit : une commande ak pour chaque agent de code en terminal, autonomie par défaut avec retrait, délégation headless."
kind: addon
lang: fr
order: 8
---

# Addon Agentkit

Chaque agent de code en terminal a ses propres options pour reprendre une session, sa propre manière d’isoler un second compte, son propre mode headless et son propre interrupteur pour ignorer les demandes d’autorisation. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** place une seule surface de commandes au-dessus de tous : `ak <kind> [@profile]`.

Cet addon intègre le kit dans **DWP v7** (pack `v7.1.0`) comme transport de délégation **headless**. Il est facultatif : sans lui, chaque tâche s’exécute dans la session courante, exactement comme avant. Le kit lui-même est un produit MIT qui fonctionne sans Deep Work Plan.

## Ce que vous apporte le kit

- **Une grammaire pour chaque CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` et `ak grok`, ainsi que des variantes de fournisseur (GLM, Azure, xAI), avec les mêmes options de session : `-c` continue, `-r <id>` reprend.
- **Des profils.** `ak claude @work` exécute un second compte dans son propre répertoire personnel, séparé du premier.
- **Des exécutions headless.** `ak run <kind> -- "<prompt>"` exécute un prompt de manière non interactive et renvoie un code de sortie documenté, éventuellement sous la forme d’un unique objet JSON.
- **Un diagnostic.** `ak doctor --json` indique quelles CLI sont installées, les profils, et les noms des clés définies — jamais leurs valeurs.
- **Des installations vérifiées.** `ak install <cli>` installe une CLI manquante depuis le canal officiel de son éditeur, dans une version épinglée, contrôlée par un sha256 épinglé ou par l’intégrité du registre npm.
- **Des noms familiers.** Deux presets d’alias, désactivés tant que vous ne les activez pas : `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) et `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), chacun équivalant à `ak <kind>`.

## Installation

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Prérequis : `bash` sous macOS ou Linux, et `python3` 3.9 ou ultérieur ; rien d’autre. Windows utilise `install.ps1`. Épinglez `v0.3.0` : `v0.2.0` et `v0.2.1` ne sont pas prises en charge. Vérifiez une version à l’aide de son asset `SHA256SUMS`.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, interface 1 |
| Clé de registre | `agentkit` dans `.dwp/config.json` |
| Transport | headless : un `ak run` par délégué dans un worktree git dédié |
| Fournit | `subagents`, `cancel_children`, `model_routing` |
| Requiert | l’octroi `agent_delegation` du contrat du plan |

## L’autonomie par défaut, avec un retrait qui l’emporte toujours

Depuis `v0.2.0`, `ak <kind>` lance chaque agent en **autonomie** : il ajoute l’option d’autonomie propre à la CLI, conservée uniquement dans le `providers.toml` du kit. L’autonomie est destinée aux environnements jetables ou isolés, comme un conteneur de développement.

Le **retrait l’emporte toujours** : `--ask` sur une commande, ou `AGENTKIT_PERMISSIONS=ask` dans l’environnement ou dans le fichier env du kit, supprime l’option même lorsque la même commande indique `--auto`. Une session en retrait transmet le retrait aux agents qu’elle lance. Sur un hôte, activez le retrait.

L’addon n’écrit aucune option d’autonomie et ne passe jamais `--auto`. Il passe `--ask` lorsqu’un plan consigne le retrait. Un plan qui octroie `agent_delegation` sur un hôte accepte des délégués autonomes confinés à leur propre worktree, qui n’est pas un sandbox.

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
