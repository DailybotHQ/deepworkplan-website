---
title: Modules complémentaires
description: "Extensions DWP optionnelles : les quatre addons actifs (devcontainer, Dailybot, dependency-upgrade, design-system), le contrat d'addon et les concepts du kit."
order: 5
lang: fr
section: Addons
---

# Modules complémentaires

**Version 2.0.** Les modules complémentaires sont des extensions optionnelles de la méthodologie centrale de Deep Work Plan. Ils ne sont **jamais requis pour la conformité** — un dépôt sans addons est pleinement AI-first et conforme DWP. Chaque addon est proposé lors de l'onboarding, accepté ou refusé explicitement et — lorsqu'il est accepté — **réconcilie** avec la configuration existante au lieu de l'écraser.

## Le contrat d'addon

Chaque addon actif fournit quatre composants obligatoires :

| Composant | Objectif |
|-----------|---------|
| **Spec** | Description normative RFC-2119 de ce que l'addon fournit et de ce que signifie « conforme à cet addon » |
| **Modèles de raisonnement** | Guides que l'agent remplit en raisonnant sur la stack du dépôt cible — pas de copier-coller |
| **Hook d'onboarding** | Point d'entrée `SKILL.md` que le flux `onboard` appelle lorsque le développeur accepte |
| **Étape de validation** | Liste de contrôle confirmant que l'addon a été appliqué correctement |

Découverte : le flux `onboard` énumère `skills/deepworkplan/addons/` et présente chaque addon comme une étape opt-in dans la **Phase 7b**, après le scaffolding central.

## Addons actifs (quatre)

Quatre addons sont actifs aujourd'hui. Chacun a une **page du catalogue kit** avec des détails orientés utilisateur et une **spec normative** dans la skill Deep Work Plan.

### Devcontainer (premier addon)

Une configuration `.devcontainer/` + `docker/` basée sur compose, raisonnée à partir de la stack détectée.

- **Page kit :** [Devcontainer](/kit/devcontainer)
- **Ce qu'il ajoute :** volumes persistants d'auth CLI IA (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, alias de validation (`codecheck`, `check`, `fix`, `test`), hygiène des secrets pour OSS public
- **Comportement :** ~85 % squelette stable ; ~15 % raisonné par stack. Les devcontainers existants sont réconciliés, jamais écrasés
- **Quand proposé :** la plupart des dépôts avec Docker ou des services bénéficiant d'un conteneur de dev isolé

### Dailybot (deuxième addon)

Une connexion optionnelle à l'**équipe Dailybot** du développeur pour la visibilité de la progression des agents.

- **Page kit :** [Dailybot](/kit/dailybot) — référence complète des capacités
- **Ce que l'addon DWP connecte :** quatre rapports du cycle de vie du plan (kickoff, tâche significative, bloqué, achèvement) via la sous-skill `report` de dailybot ; application déterministe optionnelle par hooks (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill jumelée :** installer [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (actuellement **3.10.3**) expose **14 capacités** — chat sur Slack/Teams/Discord/Google Chat, check-ins, autorisation de formulaires, ask AI, kudos, clés API par dépôt (`.dailybot/env.json`), e-mail et plus. L'addon DWP ne connecte que **report** ; les autres capacités sont invoquées directement via la skill Dailybot
- **Auth :** entièrement reportée à la skill Dailybot (`dailybot login` ou `DAILYBOT_API_KEY`) ; cet addon ne stocke jamais de credentials
- **Garde-fou neutre vis-à-vis du fournisseur :** le DWP central a **zéro** dépendance à Dailybot ; ne jamais installer automatiquement pour tout le monde
- **Quand proposé :** le développeur ou l'équipe utilise déjà Dailybot, ou demande explicitement des rapports d'équipe

### Dependency upgrade (troisième addon)

Mises à niveau de dépendances par lots, validées et réversibles, agnostiques au gestionnaire de paquets.

- **Page kit :** [Dependency upgrade](/kit/dependency-upgrade)
- **Ce qu'il ajoute :** détecte le gestionnaire **réel** du dépôt (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), met à niveau par lots classés semver, exécute la porte de validation du dépôt après chaque lot, annule les échecs, résume sans commit automatique
- **Commande :** installe `/lib-upgrade` dans `.agents/commands/` uniquement lorsqu'il est accepté
- **Quand proposé :** lockfile présent et stack riche en dépendances ; recommander uniquement lorsque pertinent

### Design system (quatrième addon)

Un `DESIGN.md` à portée de surface d'interface que tout agent de codage lit pour une sortie UI, CLI ou conversationnelle cohérente.

- **Page kit :** [Design system](/kit/design-system)
- **Ce qu'il ajoute :** `docs/DESIGN.md` (référencé depuis `AGENTS.md`) avec jusqu'à trois **profils** empilés dans un seul fichier : **visual-ui** (jetons et composants d'UI rendue), **cli-output** (styles sémantiques de terminal, dégradation TTY/`NO_COLOR`), **conversational** (voix, anatomie du message, rendu par plateforme avec replis en texte brut)
- **Force du profil :** visual-ui est **activé par défaut lorsqu'il est détecté** ; cli-output et conversational sont **recommandés lorsqu'ils sont détectés, toujours demandés, jamais appliqués automatiquement**
- **Quand proposé :** uniquement lorsqu'une surface d'interface orientée utilisateur est détectée — pas pour les bibliothèques pures, services headless ou dépôts infra uniquement

## Skills

Les skills sont des procédures réutilisables invoquées par nom. Une skill empaquette un flux de travail répétable (exécuter des tests, corriger le lint, créer un composant).

La méthodologie fournit un petit ensemble de sous-skills centrales. Parmi elles, la sous-skill **author** permet à un dépôt de **développer son propre kit** : invoquée via `/skill-create` et `/agent-create`, elle raisonne sur la disposition `.agents/` existante et les conventions, puis auteur une nouvelle skill, un agent ou un délégué de commande fin qui correspond, et maintient le catalogue synchronisé. La même sous-skill exécute la tâche obligatoire de Découverte des Skills et Agents.

Entrée kit : [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agents

Les agents sont des travailleurs spécialisés avec un rôle défini (reviewer, executor, architect). Ils vivent sous `.agents/agents/` et sont catalogués dans `.agents/docs/`.

## Modules complémentaires de maintenance

Le module complémentaire **dependency-upgrade** (ci-dessus) est le module de maintenance principal. Il raisonne sur le gestionnaire de paquets réel du dépôt plutôt que d'assumer npm, classe les mises à niveau par semver, met à niveau par lots sûrs, exécute la validation après chaque lot et annule tout lot qui échoue.

## Module complémentaire design system

Voir [Design system](/kit/design-system) sous les addons actifs. Le `DESIGN.md` au niveau du dépôt est distinct d'un document de design technique par fonctionnalité : le README du plan DWP, les critères d'acceptation des tâches et les portes de validation couvrent déjà le design par fonctionnalité. L'addon design-system comble un contexte de design d'**interface** durable et natif au dépôt.

## Presets

Les presets adaptent DWP à une stack technologique spécifique (Django, React, Go, Astro + Svelte et plus). Parcourez le [catalogue kit](/kit).

## Adaptateurs

Les adaptateurs mappent les commandes DWP au système de commandes d'un agent spécifique (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw et autres). Les entrées d'adaptateur vivent dans le kit sous le nom de chaque agent.

## Exemples

Les exemples démontrent DWP en pratique : comparaisons avant/après, plans d'exemple, études de cas. Voir [Examples](/examples) et [Dogfood this site](/kit/dogfood-this-site).

## Rappel de conformité

Un dépôt **DOIT** être pleinement conforme avec **zéro** addons. Les addons sont des capacités opt-in en couches — jamais des préconditions. Voir [Conformance](/spec/conformance).
