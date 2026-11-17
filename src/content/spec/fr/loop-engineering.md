---
title: Ingénierie de boucle (loop engineering)
description: "Sémantique normative de boucle v8 : autorité consignée, continuité lancée par un humain, succession, blocages, file, notifications et visibilité de flotte."
order: 12
lang: fr
section: Ingénierie de boucle
---

# Ingénierie de boucle (loop engineering)

Cette page définit le contrat de plan pour l’ingénierie de boucle. Le **plan** reste l’autorité ; la boucle assure la continuité et la visibilité. Les modules peuvent renforcer la méthode, sans élargir l’autorité consignée du plan.

## 1. Règle v8

Un plan approuvé va jusqu’au bout sans intervention humaine. L’autonomie s’exerce **dans l’autorité consignée du plan** ; l’humain est informé sans être attendu, sauf pour les connexions et identifiants, et les étapes C1–C7 du plan arrêtent toujours le travail à moins qu’une autorisation préalable y soit consignée. La règle v7 demeure : la méthode fonctionne seule, les modules ne font que la renforcer.

### 1.1. Sémantique de boucle

### Enregistrement et observation
Avec le module Herdr activé, le flux `execute` du pack v8 revendique le registre de lead et consigne la succession du plan. Seul un plan doté d’un registre de lead et d’un état lisible est observé. Un humain démarre `herdr-peers autopilot --loop` : c’est un daemon, ni un élément de connexion ni un service système. Un daemon peut observer les plans signalés par toutes les machines Herdr activées. Sans registre de lead, le plan n’est pas observé.

### Continuité, blocage et relève

Pour un plan ouvert, le daemon sollicite uniquement le lead après les contrôles d’inactivité : cinq minutes sans activité ou avec le lead terminé, aucune lane active, aucune réponse en attente, pane autorisé et non exclu, sans dialogue, écran de connexion ou limite d’usage, ni brouillon humain dans la ligne de saisie. Le message fixe demande au lead de poursuivre jusqu’au bout en respectant étapes et autorité consignées. Une sollicitation n’ajoute aucune autorité. Après trois sollicitations sans progrès dans l’état du plan, le daemon inscrit `plan_stalled` et attend un changement d’état. Un plan bloqué est signalé, pas sollicité.

Si le lead est absent, le daemon demande au premier successeur joignable de la liste d’exécuter `herdr-peers lead takeover --plan <id>`. L’outil vérifie la succession et avance l’époque ; le daemon n’écrit pas le registre et ne choisit aucun pane non répertorié. Une limite d’usage seule ne prouve pas l’absence. Le protocole 2 autorise aussi la nomination d’un lead parmi les lanes du plan, seulement après autorisation explicite humaine via `lead claim --allow-appointment` et démarrage du daemon avec `--appoint`. Avant tout merge, tag ou release, le lead actif exécute `herdr-peers lead verify --plan <id>`.

### Brain, événements et flotte

`--brain`, facultatif, lance un agent de décision dédié aux cas que les règles du daemon ne tranchent pas. Il ne choisit que dans une liste fermée d’actions. Le daemon reste le seul acteur : il valide un choix permis puis agit ; il n’exécute jamais de texte libre du brain. Le bloc `autonomy` du plan doit également autoriser le brain.

La boucle enregistre des événements du plan, par exemple blocages, perte de lead, achèvement et résultats de file. Avec l’intégration facultative `--notify`, le daemon envoie un objet `plan-event-v1` au notificateur configuré ; le notificateur Dailybot du pack transforme les événements pris en charge en nouvelles d’équipe. Une notification n’approuve rien et ne modifie pas le registre du plan. La carte de flotte et `herdr-peers fleet ui` affichent les agents et plans sur plusieurs machines. L’interface est en lecture seule : elle ne modifie aucun état et ne sollicite aucun agent. Voir [autopilot herdr-peers v2.1.0](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) et son [protocole](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md).

## 2. Bloc `autonomy` (plan-contract/v8)

L’objet supérieur facultatif `autonomy` est fermé : toute clé inconnue est invalide. Les noms et types canoniques figurent dans le [schéma plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). En l’absence du bloc, toutes les valeurs par défaut s’appliquent ; si le bloc existe, chaque champ omis conserve sa valeur propre. Un consommateur NE DOIT PAS deviner.

| Champ | Type et valeurs permises | Défaut si omis |
|---|---|---|
| `stall_budget` | Entier de 1 à 10 | `3` sollicitations sans progrès |
| `promptable` | Liste non vide d’adresses de pane Herdr | Le lead du plan seul |
| `notify` | Liste non vide de cibles | Aucune cible ; les événements restent consignés |
| `brain` | Booléen | `false` ; aucun brain ne peut agir |
| `queue` | `prompt-lead`, `launch` ou `none` | `none` ; plan non mis en file |

Une adresse pane suit exactement la forme Herdr : `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. Un identifiant machine ne commence pas par `-`. Ces champs limitent les personnes sollicitées, les destinataires d’événements, l’action éventuelle d’un brain et la participation à la file. Ils ne changent ni critères d’acceptation ni étapes.

## 3. Blocages structurés

Un plan v8 enregistre les raisons de blocage comme données pour que boucle, flotte et agent repreneur lisent les mêmes champs.

### 3.1. Enregistrement du blocage

Le ledger utilise `ledger.py block` pour ouvrir et `ledger.py unblock` pour résoudre, avec un événement `blocker` de `journal-event/v8`. L’ajout direct et toute opération refusée sont consignés.

| Champ | Règle |
|---|---|
| `task` | Tâche bloquée du contract ; une tâche déjà close par ses preuves ne peut être bloquée. |
| `reason` | Obligatoire, non vide, 1000 caractères maximum : motif. |
| `needs` | Obligatoire, une seule ligne non vide, 500 caractères maximum : condition pour continuer. |
| `class` | Obligatoire : `C1`–`C7` d’[`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Facultatif `lead` ou `human` ; absent, il vaut `human`. |

`lead` résout dans l’autorité consignée, sans identifiants, connexion, consentement, paiement, push vers main, publication ni suppression. `resolver: "lead"` est refusé pour `C1`, `C2`, `C5` et `C6`. Un seul blocage actif est permis ; une autre ouverture est refusée jusqu’à résolution. Une réouverture peut actualiser les champs mais conserve le premier `since`. La résolution contient la tâche et une note facultative. Une tâche bloquée ne peut être close ; de nouvelles preuves ne la ferment pas.

### 3.2. Où le trouver

`state.json` utilise `plan-snapshot/v8` : la forme de `plan-snapshot/v6`, avec `blocker` égal à `{task, reason, since, needs, class, resolver?}` ou `null`, et `blocked` comme statut dérivé prioritaire. Le ledger projette les champs sans écriture manuelle.

`PROGRESS.md` DEVRAIT commencer sous le titre par quatre lignes fixes, écrites par create et actualisées à chaque transition (`shared/progress_header.py`) :

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` et `Needs` dérivent du snapshot (tâche bloquée d’abord, sinon première tâche inachevée). L’agent écrit `Goal` et `Next action`.

### 3.3. Actions possibles de la boucle

La boucle, brain compris, ne demande au lead que les blocages marqués `resolver: "lead"` ; les autres attendent l’humain. v6/v7 ne consignent pas `blocker`, gardent `plan-snapshot/v6` (`blocker` à `null`) ; leurs blocages relèvent de l’humain.
## 4. File de plans

La file est `.dwp/queue.json`, schéma `dwp-queue-v1`. Seul le pack écrit : `create` ajoute à l’approbation ; l’humain ou le lead réordonne via le flux de plan ; `execute` marque `started` en revendiquant le lead et son adresse ; la finalisation marque `done` ; `create` ou `refine` peut marquer `skipped` avec une note d’une ligne. Chaque entrée comporte un plan, une dépendance `after` facultative vers un plan déjà en file, un état, un lead et un mode de démarrage. Un dépôt n’exécute qu’un plan à la fois, sauf `parallel: true` explicite.

Le daemon est un consommateur borné en lecture seule. Une file inutilisable est traitée comme vide sans interrompre les plans. Un plan en file ne démarre que si sa dépendance est achevée ou absente, s’il est approuvé, indique un lead et qu’aucun autre plan du dépôt ne tourne, sauf parallélisme autorisé. En mode `prompt-lead`, le lead nommé reçoit ce message fixe : « Plan P is next in this repository's queue and approved; execute it to its end, respecting its gates. » Le daemon n’écrit pas la file. Le mode `launch` n’est pas exécuté par cette boucle sauf ajout explicite au contrat publié.

## 5. Éléments conservés par v8

v8 conserve tout v7, dont `tasks[].parallel_safe`, la délégation et l’ensemble complet d’événements ; les fonctions v7 restent disponibles. v8 enregistre les événements v7 plus `blocker` dans `journal-event/v8` et les projette dans `plan-snapshot/v8` ; un journal mixte est refusé. `plan-manifest/v7` garde sa forme et son pointeur ; le vérificateur associe manifeste v7 et contract v8. Les enregistrements v6/v7 restent identiques octet par octet.
