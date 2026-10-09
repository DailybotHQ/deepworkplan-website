---
title: Herdr
description: "Addon v7 facultatif : un plan confie une tâche à un autre agent de code dans un panneau Herdr, sur toute machine, et consigne son unique réponse autorisée."
kind: addon
lang: fr
order: 7
---

# Addon Herdr

[Herdr](https://herdr.dev) place des agents de code dans des panneaux, sur votre machine et sur les machines qu’il atteint via SSH. Cet addon permet à un Deep Work Plan d’utiliser ces agents comme **pairs** : un plan peut confier une tâche délimitée à un agent situé dans un autre panneau, recevoir exactement une réponse autorisée et conserver une trace de l’échange.

C’est un addon facultatif de **DWP v7** (`v7.0.0`). La méthodologie fonctionne de la même manière sans lui : si l’addon est absent ou désactivé, chaque tâche s’exécute dans la session courante, exactement comme avant.

## Ce qu’il intègre

L’addon est un intégrateur léger. Le travail est effectué par **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, une skill autonome sous licence MIT, épinglée à **`v0.1.0`**, utile même sans Deep Work Plan. Elle définit ce que Herdr laisse lui-même ouvert : qui peut répondre, comment la réponse retrouve son chemin d’une machine à l’autre, comment deux agents évitent de se répondre indéfiniment, et où se trouve la trace de « j’ai demandé, il a répondu ».

| Élément | Valeur |
|---|---|
| Produit | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protocole 1 |
| Clé de registre | `herdr` dans `.dwp/config.json` |
| Transport | interactif : un pair dans un panneau Herdr |
| Fournit | `subagents`, `cancel_children` |
| Requiert | l’octroi `agent_delegation` du contrat du plan |

## Installation

Installez herdr-peers ainsi que la skill officielle de Herdr, dont il dépend. Chaque machine dont les agents doivent répondre a également besoin de la skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Prérequis : Herdr 0.9.1 ou ultérieur, `bash`, et `python3` 3.9 ou ultérieur (bibliothèque standard uniquement). L’onboarding propose l’addon et consigne votre réponse dans le registre des addons ; il n’est jamais activé sans consentement.

## Ce qu’il ajoute à un plan

- **Délégation à un pair.** Sur un plan v7 dont le contrat octroie `agent_delegation`, `execute` peut confier une tâche `parallel_safe`, ou une question en lecture seule, à un agent situé dans un autre panneau, sur cette machine ou sur une autre.
- **Une réponse autorisée.** La requête porte une estampille qui autorise exactement une réponse. Le pair répond une fois via le helper, et la réponse porte sa propre estampille.
- **Une trace avant de s’y fier.** Chaque délégation est écrite dans le fichier `analysis_results/delegations.ndjson` du plan avant que la réponse soit utilisée, et correspond à l’événement de journal `delegation` de v7.
- **Les résultats restent des affirmations jusqu’à vérification.** La réponse d’un pair est une preuve `asserted` tant que l’exécuteur de portes du plan lui-même ne l’a pas observée. Elle ne clôt jamais une tâche à elle seule.

## Modèle de sécurité

| Règle | Ce que cela signifie |
|---|---|
| L’octroi d’abord | La délégation ne s’exécute que si le contrat du plan octroie `agent_delegation`. |
| Profondeur limitée à 1 | Un message estampillé `depth=1` ou `reply-to=` ne reçoit jamais de réponse, et un délégué ne délègue jamais. |
| Plafond de fan-out | Au plus quatre pairs par appelant par défaut. |
| Des données, pas des instructions | Une réponse n’accorde jamais une autorité que le destinataire n’avait pas déjà. |
| Un seul rédacteur par chemin | Un pair qui écrit travaille dans son propre worktree git. |

herdr-peers n’authentifie pas l’expéditeur : le champ `from=` d’une estampille est une affirmation. La mesure d’atténuation est la liste d’autorisation `HERDR_PEERS_SCOPE`, qui limite les espaces de travail et les machines qu’un pair accepte.

## Herdr ou agentkit

Les deux addons implémentent la même interface de délégation — `launch`, `observe`, `collect`, `cancel` — avec des transports différents.

| Situation | Utiliser |
|---|---|
| Une tâche `parallel_safe` délimitée avec une sortie déclarée | [agentkit](/kit/agentkit) (`ak run` headless dans un worktree) |
| La tâche nécessite une interaction, dure longtemps ou se trouve sur une autre machine | Herdr (un pair dans un panneau) |

## Notes

Facultatif et jamais requis. Un dépôt est pleinement conforme avec zéro addon optionnel, et aucun flux ne dépend de celui-ci. L’aller-retour entre deux panneaux et entre machines est couvert par des tests contre un Herdr simulé ; prévoyez une première exécution supervisée.
