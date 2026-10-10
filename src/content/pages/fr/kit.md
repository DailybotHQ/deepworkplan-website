---
title: "Le kit Deep Work Plan"
description: "Le skill et ses neuf sous-skills, commandes, adaptateurs d'agent, presets d'onboarding, add-ons facultatifs et exemples qui rendent Deep Work Plan exécutable partout."
lastUpdated: 2026-10-09
---

## Le kit Deep Work Plan

Le kit est tout ce dont vous avez besoin pour exécuter la méthodologie en pratique. Il s'installe depuis
`DailybotHQ/deepworkplan-skill` :

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.4 --skill deepworkplan -y
```

Le pack 7.x actuel crée les nouveaux plans en v7 par défaut. Les plans existants conservent leur génération enregistrée ; une migration exige une demande explicite.

### Le skill et ses sous-skills

Le skill Deep Work Plan est un routeur accompagné de neuf sous-skills :

- **create** — décomposer un objectif en un plan structuré (`/dwp-create`).
- **execute** — exécuter un plan tâche par tâche, en validant chaque porte (`/dwp-execute`).
- **refine** — ajouter, retirer ou réordonner des tâches tout en préservant le travail achevé (`/dwp-refine`).
- **resume** — reconstruire l'état et poursuivre un plan interrompu (`/dwp-resume`).
- **status** — rendre compte de la progression sans apporter de changements (`/dwp-status`).
- **verify** — vérifier objectivement la conformité du dépôt et des plans (`/dwp-verify`).
- **onboard** — rendre un dépôt AI-first (`/deepworkplan-onboard`).
- **author** — créer ou faire évoluer les propres skills, agents et commandes du dépôt (`/skill-create`, `/agent-create`).
- **upgrade** — fait évoluer une skill installée vers une version plus récente en toute sécurité (`/dwp-upgrade`).

### Commandes

Des commandes slash légères délèguent aux sous-skills et aux addons :

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — la boucle planifier-exécuter-vérifier.
- `skill-create`, `agent-create` — délèguent au sous-skill author.
- `lib-upgrade` — délègue à l'addon dependency-upgrade (installé uniquement lorsque cet addon est accepté).

### Adaptateurs

Des intégrations légères par agent pour Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline et Antigravity. Pour les plateformes d'agents autonomes, OpenClaw et Hermes s'intègrent via le standard AgentSkills et exécutent les plans sous le profil sans surveillance, pilotés par heartbeat ou cron. Les agents cloud et en arrière-plan (tâches distantes Claude Code, Codex cloud, agents de classe Jules) fonctionnent en mode éphémère, en s'appuyant sur `.dwp/` comme couche de spec et d'état durable.

### Presets d'onboarding

Des guides de raisonnement par stack que le flux onboard utilise pour adapter la doc, les skills et les commandes de validation —
jamais des modèles. Six presets : Django, Vue + Vite, Astro/Svelte, service Node/TS, package/CLI Python,
et un repli générique.

### Addons (facultatifs)

Des capacités que le flux onboard superpose à un dépôt. Sept sont facultatives et jamais incluses dans la base AI-first ; la revue locale d’AI Diff Reviewer est requise depuis le standard 2.3.0 :

- **Devcontainer** — un conteneur de développement reproductible et isolé avec une auth de CLI IA persistante.
- **Dailybot** — un rapport de progression et de jalons au mieux pour les équipes utilisant Dailybot.
- **Dependency upgrade** — des mises à jour indépendantes du gestionnaire de paquets, par lots, validées et réversibles.
- **Système de conception** — un `DESIGN.md` à périmètre d'interface (à `docs/DESIGN.md`, référencé depuis `AGENTS.md`) raisonné à partir de la véritable source de conception du dépôt, avec des profils pour l'UI visuelle, la sortie CLI stylée et la messagerie conversationnelle, afin que les agents génèrent une sortie d'interface fidèle à la marque ; lorsqu'un système de conception est détecté, l'offre est obligatoire mais l'installation est conditionnée à une acceptation — le profil visuel est fortement recommandé lorsqu'il est détecté, et les profils CLI et conversationnel sont recommandés lorsqu'ils sont détectés et toujours soumis à une question.
- **AI Diff Reviewer** — la revue locale requise : l’onboarding installe [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, et la passe de sécurité de chaque Final Review l’exécute ; le Flow B optionnel ajoute un point de contrôle de fusion de PR en CI partageant la même extension, proposé explicitement et jamais installé sans demande.
- **[Herdr](/fr/kit/herdr)** — délégation interactive : un plan confie une tâche bornée à un agent de code dans un autre panneau Herdr et enregistre son unique réponse autorisée.
- **[DeepWorkPlan Vim](/fr/kit/vim)** — l’éditeur de terminal pour Deep Work Plan, avec un index des commandes, un navigateur de plans en lecture seule et une visionneuse Markdown.
- **[Agentkit](/fr/kit/agentkit)** — une seule commande `ak` pour chaque agent de code en terminal, et la délégation en mode headless des tâches de plan bornées.

### Écosystème

**La méthodologie fonctionne seule. Les addons l’amplifient.** Chaque addon est un intégrateur léger au sein de la skill Deep Work Plan, épinglé par tag à un produit doté de son propre dépôt, de sa propre version et de sa propre version d’interface. Chaque produit fonctionne sans Deep Work Plan, et aucun addon n’est requis.

- **Skill Deep Work Plan** — Créer, exécuter, vérifier, reprendre et affiner des plans. Ne nécessite aucun addon.
- **[herdr](/fr/kit/herdr)** — Des pairs dans des panneaux Herdr, sur n’importe quelle machine : délégation interactive avec une seule réponse autorisée. Épinglé à `herdr-peers@v0.1.0`.
- **[agentkit](/fr/kit/agentkit)** — Une seule commande ak pour chaque agent de code en terminal : autonomie par défaut avec possibilité de retrait, et délégation sans interface dans un worktree. Épinglé à `coding-agents-kit@v0.3.0`.
- **[devcontainer](/fr/kit/devcontainer)** — Le conteneur de développement propre à chaque dépôt, issu d’un seul modèle : agents via ak, Herdr dans les deux sens, aucune clé SSH à l’intérieur. Épinglé à `devcontainer-kit@v0.2.2`.
- **[vim](/fr/kit/vim)** — L’éditeur de terminal, avec un navigateur de plans en lecture seule et une visionneuse Markdown. Épinglé à `deepworkplan-vim@v0.6.0`.

Le registre des addons et les descripteurs sont livrés dans Deep Work Plan v7 : `v7.1.4`

### Exemples

Des démonstrations détaillées, avant et après.

- [Parcourir le kit](/kit)
- [Démarrage rapide](/quickstart)
- [Voir les exemples](/examples)
