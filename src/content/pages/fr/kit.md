---
title: "Le kit Deep Work Plan"
description: "Le skill et ses huit sous-skills, commandes, adaptateurs d’agent, presets d’onboarding, add-ons facultatifs et exemples qui rendent Deep Work Plan exécutable partout."
lastUpdated: 2026-05-31
---

## Le kit Deep Work Plan

Le kit est tout ce dont vous avez besoin pour exécuter la méthodologie en pratique. Il s’installe depuis
`DailybotHQ/deepworkplan-skill` :

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Le skill et ses sous-skills

Le skill Deep Work Plan est un routeur accompagné de huit sous-skills :

- **create** — décomposer un objectif en un plan structuré (`/dwp-create`).
- **execute** — exécuter un plan tâche par tâche, en validant chaque porte (`/dwp-execute`).
- **refine** — ajouter, retirer ou réordonner des tâches tout en préservant le travail achevé (`/dwp-refine`).
- **resume** — reconstruire l’état et poursuivre un plan interrompu (`/dwp-resume`).
- **status** — rendre compte de la progression sans apporter de changements (`/dwp-status`).
- **verify** — vérifier objectivement la conformité du dépôt et des plans (`/dwp-verify`).
- **onboard** — rendre un dépôt AI-first (`/deepworkplan-onboard`).
- **author** — créer ou faire évoluer les propres skills, agents et commandes du dépôt (`/skill-create`, `/agent-create`).

### Commandes

Des commandes slash légères délèguent aux sous-skills et aux addons :

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — la boucle planifier-exécuter-vérifier.
- `skill-create`, `agent-create` — délèguent au sous-skill author.
- `lib-upgrade` — délègue à l’addon dependency-upgrade (installé uniquement lorsque cet addon est accepté).

### Adaptateurs

Des intégrations légères par agent pour Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini,
OpenCode, Windsurf, Cline et Antigravity.

### Presets d’onboarding

Des guides de raisonnement par stack que le flux onboard utilise pour adapter la doc, les skills et les commandes de validation —
jamais des modèles. Six presets : Django, Vue + Vite, Astro/Svelte, service Node/TS, package/CLI Python,
et un repli générique.

### Addons (facultatifs)

Des capacités optionnelles que le flux onboard peut superposer à un dépôt — jamais incluses dans la base AI-first :

- **Devcontainer** — un conteneur de développement reproductible et isolé avec une auth de CLI IA persistante.
- **Dailybot** — un rapport de progression et de jalons au mieux pour les équipes utilisant Dailybot.
- **Dependency upgrade** — des mises à jour indépendantes du gestionnaire de paquets, par lots, validées et réversibles.

### Exemples

Des démonstrations détaillées, avant et après.

- [Parcourir le kit](/kit)
- [Démarrage rapide](/quickstart)
- [Voir les exemples](/examples)
