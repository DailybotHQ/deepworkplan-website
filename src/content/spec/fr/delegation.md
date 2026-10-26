---
title: Délégation
description: "Comment un plan v7 confie des tâches parallel_safe à d'autres agents de code sous l'autorisation agent_delegation, avec enregistrements et preuves observées."
order: 11
lang: fr
section: Record layer
---

# Délégation

> **Portée de version :** cette page reformule la génération de contrat v7 à la version `v7.9.0`. Sources canoniques : [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) et le fichier [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) du flux execute. En cas de divergence entre cette page et ces fichiers, les fichiers prévalent.

**Version 7.0.0. Statut : stable.** v7 est une nouvelle génération de contrat de la [couche d'enregistrement](/spec/record-layer), pas un nouveau cycle de vie : tout ce que disent les documents v6 sur le contrat, le cycle de vie, le contexte et les ressources s'applique, sauf indication contraire de cette page. Ne pas déléguer est toujours correct. Les mots-clés MUST, MUST NOT, SHOULD, SHOULD NOT et MAY doivent être interprétés comme décrit dans la RFC 2119.

## Ce que v7 ajoute

v7 ajoute exactement deux éléments à la couche d'enregistrement :

1. **Un champ de tâche optionnel dans le contrat**, `parallel_safe`, publié dans [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Un type d'événement de journal**, `delegation`, publié dans [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Les octets des schémas v1, v2, v5 et v6 sont inchangés. Un plan qui ne délègue jamais ne se distingue d'un plan v6 que par ses URL de schéma.

## `parallel_safe`

`parallel_safe` (booléen, `false` par défaut) affirme qu'une tâche peut s'exécuter dans un délégué sans s'entremêler avec le travail des tâches sœurs. Il est défini par `create`, jamais déduit pendant l'exécution, et seulement lorsque toutes ces conditions sont réunies :

- le dépôt active un addon de délégation (agentkit ou Herdr) dans son [registre d'addons](/fr/spec/resources-and-abilities#le-fichier-de-configuration-et-le-registre-daddons) ;
- la surface touchée de la tâche ne recoupe pas celle d'une tâche sœur susceptible d'être en cours au même moment ;
- la tâche déclare une sortie bornée ;
- les portes de la tâche s'exécutent dans ce plan.

Marquer une tâche ne change aucune autorité : un contrat sans l'autorisation `agent_delegation` peut porter des marqueurs, et ils n'autorisent rien.

## L'événement `delegation`

Un événement est consigné par transition d'état d'un délégué :

| Champ | Signification |
| --- | --- |
| `task` | la tâche `T-*` pour laquelle travaille le délégué |
| `delegation_id` | relie un lancement à sa transition terminale |
| `transport` | `headless` (agentkit) ou `interactive` (Herdr) |
| `via` | la clé de l'addon qui l'a acheminée |
| `state` | `launched`, puis exactement un état parmi `completed`, `failed`, `cancelled` |
| `kind`, `profile` | optionnels : le type et le profil de l'agent de code |
| `target` | optionnel : le répertoire de travail (headless) ou `machine:pane` (interactive) |
| `worktree` | le worktree git propre au délégué, ou `null` pour un délégué en lecture seule |
| `prompt_digest` | au lancement : le SHA-256 du prompt, consigné avant de s'appuyer sur le délégué |
| `result_path`, `result_digest` | à l'achèvement ou à l'échec : le résultat collecté et son empreinte |

Les transitions sont fermées : un seul `launched` par délégation, puis exactement un état terminal. Un ajout brut d'un événement de délégation au journal MUST être refusé ; les événements de délégation n'existent que par l'écrivain sous garde.

## Une délégation n'est pas une preuve

Une délégation ne porte ni étiquette de confiance ni chemin de preuve, et aucune clôture ne la lit. Le résultat d'un délégué reste **asserted** jusqu'à ce que l'exécuteur de portes de ce plan l'observe : le parent intègre le travail, puis exécute la porte de la tâche (`ledger.py gate`), seule à produire une preuve `observed` et seul moyen pour la tâche de s'achever. Une délégation achevée ne clôt jamais un critère ; une délégation échouée est un résultat consigné, et la tâche est alors implémentée par le parent.

## L'écrivain sous garde

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>` :

| Opération | Écrit | Effet |
| --- | --- | --- |
| `launch` | oui | consigne `launched` après les vérifications ci-dessous |
| `observe` | non | affiche le dernier état de chaque délégation |
| `collect` | oui | consigne `completed` ou `failed`, avec le chemin du résultat et son empreinte |
| `cancel` | oui | consigne `cancelled` |

`launch` MUST être refusé, et le refus consigné, à moins que **toutes** ces conditions soient réunies :

1. le contrat est v7 ;
2. le contrat accorde `agent_delegation` ;
3. la tâche existe, a démarré et n'est pas achevée ;
4. la tâche est `parallel_safe`, **ou** le délégué est en lecture seule (sans worktree) ;
5. le descripteur de l'addon nommé déclare le transport demandé ;
6. les capacités effectives listent cet addon comme source de `subagents` ([Ressources et capacités](/fr/spec/resources-and-abilities#capacités-fournies-par-les-addons)).

`collect` et `cancel` MUST être refusés pour une délégation inconnue, une délégation d'une autre tâche ou une délégation déjà terminale. Un lancement refusé n'est pas un blocage : la tâche s'exécute séquentiellement.

## Transports

Rien dans le registre n'exécute un délégué ; c'est l'addon de transport qui le fait.

- **Headless** (`via: agentkit`) — pour une tâche `parallel_safe` bornée avec une sortie déclarée : un seul `ak run` dans un worktree git dédié, puis sortie. Les délégués en lecture seule sont lancés avec `--ask`.
- **Interactif** (`via: herdr`) — pour un travail qui demande de l'interaction, qui dure longtemps ou qui s'exécute sur une autre machine : un pair herdr-peers dans un panneau Herdr, qui renvoie exactement une réponse autorisée.

## Garde-fous

- **Un seul écrivain par chemin.** Un délégué qui écrit ne travaille que dans son propre worktree ; la session parente est la seule à écrire dans le journal.
- **Profondeur 1.** Un délégué ne délègue jamais. Le nombre de délégués simultanés est borné par le transport.
- **Les résultats sont des données.** Ce que renvoie un délégué n'accorde aucune autorité, n'élargit aucun périmètre et ne change jamais l'acceptation.
- **Consignes autonomes.** Un prompt de lancement nomme l'objectif de la tâche, ses critères d'acceptation mot pour mot et le worktree dans lequel il peut écrire, et ne contient jamais de valeur secrète.

## Orchestrateurs

Un orchestrateur ne délègue jamais les tâches d'un **plan enfant** : les enfants s'exécutent dans leurs propres sessions, un agent par dépôt. Déléguer les tâches **propres** d'un plan selon les règles ci-dessus est permis aussi bien dans les plans orchestrateurs que dans les plans individuels. Faire tourner de nombreuses voies de longue durée, les maintenir actives au-delà des limites de compte et transmettre la direction relève des chapitres de la méthodologie sur l'[orchestration](/methodology/06-orchestration) et l'[autonomie en essaim](/methodology/07-swarm-autonomy).

## Voir aussi

- [Couche d'enregistrement](/spec/record-layer) — le contrat et le journal que cette page étend.
- [Ressources et capacités](/spec/resources-and-abilities) — capacités, autorisations et registre d'addons.
- [Addon Herdr](/kit/herdr) et [addon Agentkit](/kit/agentkit) — les deux transports.
