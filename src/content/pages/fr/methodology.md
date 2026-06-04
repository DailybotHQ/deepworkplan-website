---
title: "La méthodologie Deep Work Plan"
description: "Cinq chapitres, du manifeste aux archétypes : les principes, la boucle centrale, les modèles, les skills et les adaptations derrière la méthodologie Deep Work Plan."
lastUpdated: 2026-05-30
---

## La méthodologie Deep Work Plan

Deep Work Plan (DWP) est une méthodologie ouverte et indépendante du framework pour mener un travail d’ingénierie structuré et autonome avec des agents de code IA. Elle transforme un objectif flou en un plan relisible qu’un agent peut exécuter, mettre en pause, reprendre et sur lequel il peut rendre compte — sans perdre le contexte.

DWP repose sur deux piliers.

**Développement piloté par la spécification.** Au lieu de traiter une transcription de discussion comme la source de vérité, vous écrivez d’abord *ce qui* doit être vrai — objectif, périmètre, critères d’acceptation et vérifications qui prouvent que c’est fait — et l’agent s’exécute face à cette spécification. Dans DWP, le plan *est* la spécification : plan → tâches atomiques → portes de validation → achèvement. Écrire la spécification d’abord réduit la dérive (l’agent est mesuré face à des critères énoncés), rend le travail vérifiable (chaque porte réussit ou échoue) et le rend reprenable (la spécification survit à toute session ou à tout agent). Indépendant de l’outil et natif du dépôt, il se distingue des systèmes pilotés par la spécification liés à un outil tels que GitHub Spec Kit, Amazon Kiro et Tessl.

**Ingénierie de harness — le dépôt devient le harness.** Un modèle de langage seul n’est qu’un prédicteur de texte ; ce qui en fait un ingénieur fiable, c’est le *harness* qui l’entoure — contexte, outils, une boucle de contrôle, des garde-fous et un état persistant. L’ingénierie de harness consiste à concevoir cet échafaudage délibérément. La position de DWP est qu’il doit résider dans le dépôt, pas dans un outil : le contexte sous forme d’`AGENTS.md` + `docs/`, les outils sous forme du kit `.agents/`, la boucle de contrôle sous forme du plan, les garde-fous sous forme des portes de validation, et l’état sous forme du `.dwp/` ignoré par git. Parce que chaque partie est un fichier du dépôt, le harness est portable — de sorte que tout agent peut piloter tout dépôt.

La méthodologie est expliquée en cinq chapitres :

1. **Manifeste** — ce qu’est un Deep Work Plan et pourquoi l’exécution structurée compte.
2. **Boucle centrale** — le cycle planifier-exécuter-vérifier qui pilote chaque tâche.
3. **Modèles** — les structures de plan et de tâche que les agents et les humains partagent.
4. **Skills et agents** — comment les commandes et les rôles d’agent s’articulent, le kit vivant (comment un dépôt fait grandir ses propres skills via le sous-skill author) et les add-ons de maintenance facultatifs comme dependency-upgrade.
5. **Archétypes** — adapter la méthodologie aux dépôts individuels et aux hubs orchestrateurs.

- [Lire la méthodologie](/methodology)
- [Lire la spécification](/spec)
- [Parcourir le kit](/kit)
