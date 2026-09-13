---
title: Standard de documentation
description: "Standard normatif sur la façon dont les Deep Work Plans documentent leur structure, leurs tâches et leur progression : règles du README, marqueurs de statut, l’anatomie de tâche en dix sections et le Final Review."
order: 1
lang: fr
section: Standard
---

# Standard de documentation

**Version 5.0.0.** Ce standard définit comment les Deep Work Plans documentent leur structure, leurs tâches et leur progression, et comment un dépôt se documente lui-même afin qu’un agent puisse y agir en toute sécurité. Il s’applique à tout plan créé sous la méthodologie DWP. Cette version aligne le numéro de version du document sur celui du standard DWP qu’il accompagne — aucune exigence existante ne change — et ajoute l’application du budget d’index compact et le palier de fonctionnalité décrits ci-dessous. Les mots-clés MUST, SHOULD et MAY sont employés tels que définis dans la RFC 2119.

## AGENTS.md comme point d’entrée compact

Le fichier `AGENTS.md` à la racine SHOULD rester dans un budget de 150 à 500 lignes. Lorsque du contenu généré ou maintenu par le harness dépasserait ce budget, l’agent MUST déplacer le détail vers le guide `docs/` (ou la documentation de module/fonctionnalité) qui en a la responsabilité et le relier depuis l’index — rien n’est supprimé, seulement déplacé, et l’index MUST relier chaque document ayant reçu du contenu déplacé. Un `AGENTS.md` existant écrit à la main et dépassant le budget n’est jamais réécrit silencieusement : l’agent propose une migration concrète (ce qui se déplace où, quels liens sont ajoutés) et ne l’applique qu’avec le consentement du développeur. Un vérificateur de conformité traite le budget comme indicatif, car un nombre de lignes est objectif mais la paternité du texte ne l’est pas — le MUST engage le harness qui génère ou met à jour le fichier, pas la supposition d’un vérificateur sur qui l’a écrit. `AGENTS.md` MUST NOT relier un fichier `docs/` qui n’existe pas.

Au-dessus du palier de documentation par module (ci-dessous) se trouve un **palier de fonctionnalité** : une zone de capacité majeure — plus grande qu’un seul module — reçoit son propre dossier `docs/` à côté de son code, avec pour point d’entrée son propre `README.md`. Une zone est éligible lorsqu’elle s’étend sur deux modules majeurs ou plus, possède un répertoire de sous-application ou de sous-système autonome, ou porte ses propres contrats (une surface d’API, des contrats d’événements ou de schéma) dont dépendent plusieurs consommateurs. Une fois qu’une zone est enregistrée comme majeure, son `docs/` de fonctionnalité SHOULD exister, et ses entrées les plus significatives SHOULD être reliées depuis les modules qu’elle traverse et depuis l’index `AGENTS.md` à la racine, exactement comme la documentation par module. Une zone délibérément laissée sans documentation porte une raison consignée — une décision, pas un oubli.

## README du plan

Tout plan MUST avoir un `README.md` contenant :

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — un énoncé en prose de l’objectif du plan.
- **Source material** — des liens ou chemins vers les entrées canoniques (optionnel).
- **Tasks** — un tableau Markdown avec le numéro de la tâche, son nom et une case de statut.
- **Status** — une ligne sous la forme `<n>/<total> tasks complete`.

## Fichiers de tâche

Chaque fichier de tâche MUST être nommé `<n>.task_<slug>.md` et contenir l’anatomie en dix sections — les neuf sections classiques plus la **Surface touchée** : le contrat entre ce que la tâche modifie et ce qui doit être validé (surface planifiée vs. réelle, consommateurs affectés, une classe de risque parmi *isolée*, *couture*, *partagée/cœur* ou *inconnue*, le mappage de tests utilisé, et la porte sélectionnée avec sa raison).

## PROGRESS.md

`PROGRESS.md` est un journal d’exécution en ajout seul. Chaque entrée MUST consigner :

- Un horodatage ISO 8601.
- Le numéro et le nom de la tâche.
- Ce qui a été fait.
- Tout écart ou raison de saut.

## Marqueurs de statut

- `[ ]` — non commencé.
- `[~]` — en cours.
- `[x]` — fait.
- `[!]` — bloqué.

## Titres

Tous les titres MUST utiliser la casse de phrase. Les documents SHOULD éviter le langage marketing et les points d’exclamation.

## Le Final Review, les décisions de skills par tâche et le rapport optionnel

Tout plan rédigé sous cette version MUST se terminer par exactement une tâche obligatoire : le **Final Review** — la passe de sécurité sur l’ensemble des changements du plan, la validation de l’état final sur le dernier état pertinent, et la réconciliation des décisions de skills. Une découverte de sécurité critique bloque l’achèvement.

- **Décisions de skills par tâche.** Le Completion & Log de chaque tâche porte une **disposition de skills** — `aucune`, une mise à jour d’un skill ou d’un agent existant, une création nommée, ou un report avec motif et responsable. La rédaction justifiée a lieu à l’intérieur de la tâche qui la motive, avant sa porte de validation, après une vérification de doublons contre le catalogue `.agents/` ; les entrées justifiées sont enregistrées comme candidates stables (`T{task}-{seq}`) dans le registre des candidates de skills du plan.
- **L’Executive Report est optionnel, sur demande.** Il est proposé une fois à l’achèvement ; il n’est généré que sur demande explicite, à partir de preuves durables. Sans réponse, ou lors d’une exécution non surveillée, le plan reste achevé sans lui.
- **Plans hérités.** Les plans rédigés sous des versions antérieures se terminent par les trois tâches finales obligatoires et restent conformes — un vérificateur de conformité MUST accepter cette forme.
