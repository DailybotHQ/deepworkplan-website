---
title: Agentkit
description: "Une commande pour chaque agent de code en terminal : un compte par profil, ak pick pour le compte le plus libre, autonomie désactivable, exécutions headless."
kind: addon
lang: fr
order: 8
---

# Addon Agentkit

Chaque agent de code en terminal a ses propres options pour reprendre une session, sa propre manière d’isoler un second compte, son propre mode headless et son propre interrupteur pour ignorer les demandes d’autorisation. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** place une seule surface de commandes au-dessus de tous : `ak <kind> [@profile]`.

Cet addon intègre le kit dans **DWP v7** (pack `v7.6.3`) comme transport de délégation **headless**. Il est facultatif : sans lui, chaque tâche s’exécute dans la session courante, exactement comme avant. Le kit lui-même est un produit MIT qui fonctionne sans Deep Work Plan.

## Ce que vous apporte le kit

- **Une grammaire pour chaque CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` et `ak grok`, ainsi que des variantes de fournisseur (GLM, Azure, xAI), avec les mêmes options de session : `-c` continue, `-r <id>` reprend.
- **Des profils.** `ak claude @work` exécute un second compte dans son propre répertoire personnel, séparé du premier.
- **Des exécutions headless.** `ak run <kind> -- "<prompt>"` exécute un prompt de manière non interactive et renvoie un code de sortie documenté, éventuellement sous la forme d’un unique objet JSON.
- **Un diagnostic.** `ak doctor --json` indique quelles CLI sont installées, les profils, et les noms des clés définies — jamais leurs valeurs.
- **Des installations vérifiées.** `ak install <cli>` installe une CLI manquante depuis le canal officiel de son éditeur, dans une version épinglée, contrôlée par un sha256 épinglé ou par l’intégrité du registre npm.
- **Des noms familiers.** Deux presets d’alias, désactivés tant que vous ne les activez pas : `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) et `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), chacun équivalant à `ak <kind>`.

## Comptes, quota et choix d’un compte

Le kit traite chaque connexion ou clé que vous détenez comme un **compte** : une CLI × un profil. `@default` (ou `@1`) est le home propre de la CLI ; `@2`, `@work` ou `@client-x` sont des connexions distinctes, chacune dans son propre répertoire sous la racine des profils, qui tournent côte à côte. `ak profiles` les liste avec leur état de connexion et les noms de leurs clés ; `ak profiles --json` fournit la même liste aux outils (schéma `profiles-v1`). Depuis `v0.5.1`, la commande indique où se trouve réellement le jeton de Claude Code — `file`, `keychain` (macOS), `none` ou `unknown` — par simple présence, sans jamais lire le secret, et reconnaît une connexion Cursor sous Linux, dans un conteneur ou sur un hôte Linux. Depuis `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` désigne le compte qu’utilise un simple `ak <cli>` (un `@profile` positionnel reste prioritaire), et c’est ainsi qu’un conteneur de développement choisit le compte de l’hôte qu’il partage. Depuis `v0.5.3`, `ak codex` ajoute `--no-daemon` lorsqu’un home Codex partagé avec une autre machine consigne un daemon en arrière-plan absent de celle-ci.

`ak usage` liste le quota et l’utilisation de chaque compte que le kit peut voir, une ligne par compte et par profil : en direct pour les abonnements Claude Code (fenêtres de 5 heures, hebdomadaire et par modèle), les connexions Codex via ChatGPT et les clés du forfait de code Z.AI ; Cursor, Grok, xAI et Azure OpenAI affichent `n/d` avec la raison. La commande est en lecture seule : elle ne renouvelle jamais une connexion, n’affiche jamais un jeton et n’écrit jamais dans un profil. `--json` fournit la même liste aux outils (schéma `usage-v1`). Les points de terminaison d’utilisation sont internes aux fournisseurs et non officiels.

`ak pick <kind>` lit les mêmes lignes et désigne le compte qui a le plus de marge. `--count N` renvoie jusqu’à N comptes, le meilleur en premier ; `--exclude @<profile>` écarte un compte occupé ; `--model` compte la fenêtre hebdomadaire d’un modèle ; `--need 5h:40` refuse de choisir sans cette marge. `--json` fournit le schéma `pick-v1`.

```bash
ak usage                   # quota de chaque compte et profil
ak pick claude --count 3   # les trois comptes Claude qui ont le plus de marge
ak claude @work --trust-cwd  # un second compte, dossier déjà approuvé
ak profiles --json         # profiles-v1, pour les outils
ak setup verify            # des vérifications ordonnées, chacune avec sa commande de réparation
```

`--trust-cwd` (ou `AGENTKIT_TRUST_CWD=1`) approuve à l’avance le dossier dans lequel l’agent démarre, si bien que Claude Code et Codex s’ouvrent sans leur écran de confiance de dossier. `ak setup probe | verify | docker` est un assistant en lecture seule, piloté par le skill `agentkit-setup`, qui inspecte la machine, vérifie l’installation et produit une recette de conteneur épinglée par tag et vérifiée.

## Plusieurs agents, plusieurs comptes

Le skill `agentkit-orchestrate` (`ak --skill orchestrate`) apprend à un agent à répartir le travail entre plusieurs agents, comptes et fournisseurs : un `ak usage` avant le lot, `ak pick --count N` pour choisir les comptes, un délégué par compte, la porte de validation du dépôt lui-même sur chaque résultat, et un basculement vers le compte suivant quand l’un atteint une limite. Le kit observe, calcule et exécute ; il n’ordonnance jamais. Le coordinateur — vous, ou un agent à qui vous l’avez demandé — décide, en n’utilisant que vos propres comptes et dans le respect des conditions de chaque fournisseur.

Pour les couloirs longs et interactifs, chaque couloir tourne dans un panneau [Herdr](/kit/herdr) sur son propre compte. Le chapitre de la méthodologie [Faire tourner de nombreux agents](/methodology/06-orchestration) décrit le modèle complet : un coordinateur et ses couloirs, des comptes choisis selon leur marge, la coordination via herdr-peers, et une branche et une publication par dépôt.

## Installation

```bash
git clone --branch v0.5.3 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Prérequis : `bash` sous macOS ou Linux, et `python3` 3.9 ou ultérieur ; rien d’autre. Windows utilise `install.ps1`. Épinglez `v0.5.3` : `v0.2.0` et `v0.2.1` ne sont pas prises en charge. Vérifiez une version à l’aide de son asset `SHA256SUMS`.

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/coding-agents-kit`, tag `v0.5.3`, interface 1 |
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

Les deux se combinent : herdr-peers peut lancer un pair dans un panneau avec l’environnement qu’affiche `ak env <kind> @profile`. Pour de nombreux couloirs à la fois, voir [Faire tourner de nombreux agents](/methodology/06-orchestration).

## Notes

Facultatif et jamais requis. Les valeurs des clés d’API ne sont jamais affichées, journalisées ni écrites dans un fichier de configuration ; l’exception documentée est Cline, qui reçoit sa clé sur la ligne de commande. L’extraction des résultats pour OpenCode, Pi, Cline et Grok est construite à partir de la documentation des éditeurs et n’a pas encore été éprouvée sur des comptes réels ; une sortie inconnue se rabat sur le texte brut.
