---
title: "La méthodologie Deep Work Plan"
description: "Huit chapitres, du manifeste au loop engineering : principes, boucle centrale, modèles, skills, archétypes, agents multiples, essaims et la boucle de DWP."
lastUpdated: 2026-11-16
---

## La méthodologie Deep Work Plan

Le pack v8 crée les nouveaux plans avec `plan-contract/v8` par défaut. Les plans existants conservent leur génération ; la migration exige un `refine migrate` explicite.
Deep Work Plan (DWP) est une méthodologie ouverte et indépendante du framework pour mener un travail d’ingénierie structuré et autonome avec des agents de code IA. Elle transforme un objectif flou en un plan relisible qu’un agent peut exécuter, mettre en pause, reprendre et sur lequel il peut rendre compte — sans perdre le contexte.

DWP repose sur quatre piliers — la spécification d’abord, le dépôt est le harness, le loop engineering et l’efficacité mesurée. En une phrase : *La spécification d’abord, la boucle fermée : le dépôt est le harness et le plan s’exécute de lui-même jusqu’au bout.*

**La spécification d’abord.** Au lieu de traiter une transcription de discussion comme la source de vérité, vous écrivez d’abord *ce qui* doit être vrai — objectif, périmètre, critères d’acceptation et vérifications qui prouvent que c’est fait — et l’agent s’exécute face à cette spécification. Dans DWP, le plan *est* la spécification : plan → tâches atomiques → portes de validation → achèvement. Écrire la spécification d’abord réduit la dérive (l’agent est mesuré face à des critères énoncés), rend le travail vérifiable (chaque porte réussit ou échoue) et le rend reprenable (la spécification survit à toute session ou à tout agent). Indépendant de l’outil et natif du dépôt, il se distingue des systèmes pilotés par la spécification liés à un outil tels que GitHub Spec Kit, Amazon Kiro et Tessl.

**Le dépôt est le harness.** Un modèle de langage seul n’est qu’un prédicteur de texte ; ce qui en fait un ingénieur fiable, c’est le *harness* qui l’entoure — contexte, outils, une boucle de contrôle, des garde-fous et un état persistant. L’ingénierie de harness consiste à concevoir cet échafaudage délibérément. La position de DWP est qu’il doit résider dans le dépôt, pas dans un outil : le contexte sous forme d’`AGENTS.md` + `docs/`, les outils sous forme du kit `.agents/`, la boucle de contrôle sous forme du plan, les garde-fous sous forme des portes de validation, et l’état sous forme du `.dwp/` ignoré par git. Parce que chaque partie est un fichier du dépôt, le harness est portable — de sorte que tout agent peut piloter tout dépôt.

**Loop engineering.** Une spécification et un harness rendent le travail correct et portable ; le loop engineering le mène à son terme. Avec l’addon facultatif Herdr, un plan enregistre son lead et, lorsqu’il les nomme, ses successeurs ; un daemon que seul un humain lance relance un lead inactif pour qu’il continue, demande au premier successeur joignable de reprendre un lead disparu et signale quand un plan stagne, se bloque ou s’achève. Une relance n’ajoute aucune autorité — les portes et les escalades du plan restent contraignantes comme avant. La méthodologie fonctionne sans la boucle ; la boucle ne fait que l’amplifier.

**Efficacité mesurée.** Le contexte est la ressource la plus rare qu’un agent de codage possède, et une méthodologie qui le gaspille échoue précisément quand le travail s’allonge. DWP charge les instructions de manière progressive — chaque guide se charge lorsque son déclencheur se déclenche —, sélectionne la validation à partir de ce que chaque tâche touche réellement, et décide des skills localement par tâche. Les octets d’instruction que chaque flux exige sont mesurés et publiés ; aucun pourcentage de tokens inventé.

La méthodologie est expliquée en huit chapitres :

1. **Manifeste** — ce qu’est un Deep Work Plan et pourquoi l’exécution structurée compte.
2. **Boucle centrale** — le cycle planifier-exécuter-vérifier qui pilote chaque tâche.
3. **Modèles** — les structures de plan et de tâche que les agents et les humains partagent.
4. **Skills et agents** — comment les commandes et les rôles d’agent s’articulent, le kit vivant (comment un dépôt fait grandir ses propres skills via le sous-skill author) et les add-ons facultatifs comme dependency-upgrade et l’add-on design-system pour toute surface d’interface destinée aux utilisateurs (UI visuelle, sortie CLI ou conversationnelle).
5. **Archétypes** — adapter la méthodologie aux dépôts individuels et aux hubs orchestrateurs.
6. **Faire tourner de nombreux agents** — un coordinateur et ses couloirs entre panneaux, conteneurs, machines et comptes, avec une branche et une publication par dépôt.
7. **Autonomie de l’essaim** — vérifications de capacité aux frontières de tâche, paquets de passation, succession du coordinateur par époques et escalade réservée aux éléments critiques, pour qu’un essaim survive à la limite d’un compte ou à la perte d’un agent.
8. **Loop engineering** — l’enregistrement du plan, le daemon lancé par un humain, des relances qui n’ajoutent aucune autorité, la reprise par les successeurs, les événements du plan, la file de plans et la carte de la flotte.

- [Lire la méthodologie](/methodology)
- [Lire la spécification](/spec)
- [Parcourir le kit](/kit)
