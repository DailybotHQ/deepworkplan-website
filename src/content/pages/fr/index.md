---
title: "Deep Work Plan — exécution structurée pour les agents de code IA"
description: "Le contexte compte plus que les modèles. Deep Work Plan transforme tout dépôt en un environnement structuré où tout agent de code mène à terme un travail de longue haleine."
lastUpdated: 2026-06-03
---

## Les modèles comptent. Le contexte compte davantage.

Deep Work Plan transforme n’importe quel dépôt en un environnement structuré — contexte, garde-fous et un plan durable — où tout agent de code s’exécute avec précision et mène à terme un travail de longue haleine.

Deep Work Plan (DWP) est une méthodologie et un kit ouverts, sous licence MIT, pour planifier et exécuter un travail logiciel complexe avec des agents IA. Vous ne choisissez pas de méthode d’installation et ne copiez aucun modèle — vous donnez une seule ligne à votre agent :

> Read and follow the instructions at https://deepworkplan.com/init.md to make this repository AI-first.

> Deep Work Plan, c’est le développement piloté par la spécification, où le dépôt lui-même devient le harness.

- [Ouvrir le prompt /init](/init)
- [Lire la méthodologie](/methodology)

---

## Le problème et la réponse

Les agents de code IA sont remarquablement efficaces sur de courtes séquences. Sur un travail de longue haleine — une migration, un nouveau sous-système, un refactoring sur des dizaines de fichiers — ils dérivent : le contexte se remplit, les décisions s’oublient et les tâches de plusieurs heures sont abandonnées à mi-parcours.

Deep Work Plan répond par le **développement piloté par la spécification** : le plan est la source de vérité durable, et les agents s’exécutent face à des critères d’acceptation explicites et des portes de validation. La dérive diminue, le travail reste vérifiable, et n’importe quel agent peut le reprendre d’une session à l’autre. Contrairement aux outils pilotés par la spécification liés à un seul IDE ou fournisseur (GitHub Spec Kit, Amazon Kiro, Tessl), DWP est indépendant de l’outil et natif du dépôt.

C’est aussi de l’**ingénierie de harness** rendue portable. Un harness d’agent, c’est l’échafaudage autour d’un modèle — contexte, outils, boucle de contrôle, garde-fous, état reprenable — qui le rend fiable. Deep Work Plan installe ce harness dans le dépôt lui-même, pour que tout agent puisse piloter tout dépôt.

---

## Ce que vous obtenez

- AGENTS.md à la racine du dépôt, raisonné à partir de votre stack et de vos commandes réelles.
- Un `docs/` catégorisé et une documentation par module.
- Un répertoire `.agents/` (skills, agents, commandes) avec le lien symbolique `.claude` vers `.agents`.
- Le skill Deep Work Plan, installé une fois pour chaque agent — y compris le sous-skill author, pour que le dépôt puisse faire grandir ses propres skills, agents et commandes, ainsi que des add-ons de maintenance facultatifs comme dependency-upgrade.
- Des plans de longue haleine et reprenables dans un dossier `.dwp/` ignoré par git.

---

## Ce qui se passe quand vous le lancez

1. **Votre agent ouvre [/init.md](/init.md)** — il lit le prompt d’onboarding ainsi que la méthodologie, la spécification et le kit qu’il référence.
2. **Il installe le skill Deep Work Plan** — le moteur, identique dans chaque dépôt : le routeur et ses sous-skills (create, execute, refine, resume, status, verify, onboard, author), pour Claude Code, Cursor, Codex, Gemini et Copilot.
3. **Il adapte votre dépôt** — en raisonnant sur votre stack réelle (jamais en copiant-collant), il écrit AGENTS.md, `docs/`, des README par module, un kit `.agents/` raisonné et un `.dwp/` ignoré par git. Votre dépôt devient le harness.
4. **Vous planifiez et exécutez** — des Deep Work Plans de longue haleine, exécutés étape par étape face à des critères d’acceptation explicites et des portes de validation, de manière autonome pendant des heures.

Le skill est le moteur réutilisable, installé de la même manière partout ; ce qui est adapté, c’est votre dépôt. Les mécanismes d’installation (CLI Skills, OpenClaw ou git clone) résident dans le prompt [/init.md](/init.md) et sur le [démarrage rapide](/quickstart).

---

## La méthodologie, la spécification et le kit

- [Lire la méthodologie](/methodology) — ce qu’est DWP, les principes, le workflow et comment l’adopter.
- [Lire la spécification](/spec) — l’anatomie d’une tâche, les portes de validation, le protocole d’achèvement, les archétypes et les addons.
- [Explorer le kit](/kit) — presets, adaptateurs et commandes pour installer DWP dans un dépôt.
- [Voir les exemples](/examples) — des démonstrations avant/après de vrai travail d’ingénierie.

---

## Qui le construit

Deep Work Plan est né d’un véritable travail d’ingénierie chez [Dailybot](https://www.dailybot.com) et est maintenu par Dailybot avec la communauté open source.

- [À propos de la méthodologie](/about)
- [Communauté et contact](/contact)
- [Dépôt GitHub](https://github.com/DailybotHQ/deepworkplan-website)
