---
title: "Deep Work Plan — exécution structurée pour les agents de code IA"
description: "Le contexte compte plus que les modèles. Deep Work Plan transforme tout dépôt en un environnement structuré où tout agent de code mène à terme un travail de longue haleine."
lastUpdated: 2026-09-10
---

## Les modèles comptent. Le contexte compte davantage.

Deep Work Plan transforme n’importe quel dépôt en un environnement structuré — contexte, garde-fous et un plan durable — où tout agent de code s’exécute avec précision et mène à terme un travail de longue haleine.

Deep Work Plan (DWP) est une méthodologie et un kit ouverts, sous licence MIT, pour planifier et exécuter un travail logiciel complexe avec des agents IA. Vous ne choisissez pas de méthode d’installation et ne copiez aucun modèle — vous copiez le prompt init.md et le collez dans votre agent :

> Copiez le prompt init.md et collez-le dans votre agent de code — Claude Code, Cursor, Codex ou tout autre — pour rendre n’importe quel dépôt AI-first.

> Deep Work Plan, c’est le développement piloté par la spécification, où le dépôt lui-même devient le harness.

- [Ouvrir le prompt /init](/init)
- [Lire la méthodologie](/methodology)

---

## Le problème et la réponse

Les agents de codage excellent en courtes salves. Sur le travail de long terme — une migration, un nouveau sous-système, une refonte à grande échelle — ils dérivent : le contexte se remplit, les décisions s’effacent et les tâches de plusieurs heures restent à moitié faites.

Deep Work Plan répond par le développement piloté par la spécification : un plan durable, des tâches atomiques et des validation gates que l’agent doit franchir. Le travail reste vérifiable — et n’importe quel agent peut le reprendre entre les sessions.
---

## Les humains dirigent. Les agents exécutent.

Vous décidez de ce que « terminé » signifie et des limites à ne pas franchir. Le plan porte votre intention ; les agents font les heures — sans surveillance permanente, sans correction toutes les vingt minutes.

- Vous : intention, critères d’acceptation, revue
- Agents : exécution, tâche par tâche
- Le plan : le contrat entre les deux

[Lire la méthodologie](/fr/methodology)

---

## Un plan dont les agents ne peuvent pas dévier.

Les longues tâches remplissent le contexte de n’importe quel modèle. Les détails s’effacent et l’agent dérive. Un plan écrit — tâches atomiques, portes de validation, état reprenable — est le repère vers lequel il revient, tour après tour.

1. Plan
2. Tâches atomiques
3. Portes de validation
4. Achèvement
5. État reprenable

[Voir la boucle principale](/fr/methodology)

---

## Terminé est un contrat, pas une impression.

Chaque tâche nomme ses critères d’acceptation et les vérifications qui doivent passer. L’agent ne peut pas se sentir fini — il doit passer, sinon la tâche reste ouverte.

- Les tests passent
- Les types sont vérifiés
- Les critères d’acceptation sont remplis
- Ou la tâche reste ouverte

[Lire la spécification](/fr/spec)

---

## Le dépôt est le harness.

Contexte, outils, garde-fous et état vivent dans votre dépôt sous forme de fichiers simples que n’importe quel agent peut lire. Pas d’enfermement, pas de cerveau externe — tout survit aux réinitialisations de contexte.

- Spécification durable sur disque
- Portes de validation, pas d’intuition
- Survit aux réinitialisations de contexte

**PE · ASK · HECK · TAT · OOL**

[Voir ce que l’onboarding génère](/fr/quickstart)
---

## Ce que vous obtenez

- AGENTS.md à la racine du dépôt, raisonné à partir de votre stack et de vos commandes réelles.
- Un `docs/` catégorisé et une documentation par module.
- Un répertoire `.agents/` (skills, agents, commandes) avec le lien symbolique `.claude` vers `.agents`.
- Le skill Deep Work Plan, installé une fois pour chaque agent — y compris le sous-skill author, pour que le dépôt puisse faire grandir ses propres skills, agents et commandes, ainsi que des add-ons facultatifs comme dependency-upgrade et l’add-on design-system pour toute surface d’interface destinée aux utilisateurs.
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
