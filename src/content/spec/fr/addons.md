---
title: Modules complémentaires
description: "Addons DWP : sept extensions optionnelles, la revue locale AI Diff Reviewer requise avec sa surface CI optionnelle, contrat d’addon et concepts du kit."
order: 6
lang: fr
section: Addons
---

# Modules complémentaires

> **Portée de version :** ce document est une base v5.0.0 conservée. La norme actuelle, DWP 7.0.0, exige également les extensions `V6_*.md` et `V7_*.md` applicables, répertoriées dans l’[index de spécification](/spec). Les plans v5 et v6 existants conservent leurs règles enregistrées.

**Version 2.1.0.** Les modules complémentaires sont des extensions de la méthodologie centrale de Deep Work Plan. Sept des huit sont optionnels et **jamais requis pour la conformité** — un dépôt sans addons optionnels est pleinement AI-first et conforme DWP. Chaque addon optionnel est proposé lors de l’onboarding, accepté ou refusé explicitement et — lorsqu’il est accepté — **réconcilie** avec la configuration existante au lieu de l’écraser. Un composant est l’exception déclarée : depuis le standard 2.3.0, la **revue locale AI Diff Reviewer** fait partie du socle requis — l’onboarding l’installe et chaque Final Review l’exécute — tandis que sa surface CI reste optionnelle.

## Le contrat d'addon

Chaque addon actif fournit quatre composants obligatoires :

| Composant | Objectif |
|-----------|---------|
| **Spec** | Description normative RFC-2119 de ce que l'addon fournit et de ce que signifie « conforme à cet addon » |
| **Modèles de raisonnement** | Guides que l'agent remplit en raisonnant sur la stack du dépôt cible — pas de copier-coller |
| **Hook d'onboarding** | Point d'entrée `SKILL.md` que le flux `onboard` appelle lorsque le développeur accepte |
| **Étape de validation** | Liste de contrôle confirmant que l'addon a été appliqué correctement |

Découverte : le flux `onboard` énumère `skills/deepworkplan/addons/` et présente chaque addon comme une étape opt-in dans la **Phase 7b**, après le scaffolding central.

## Addons actifs (huit)

Huit addons sont actifs aujourd’hui — sept opt-in plus la revue locale requise. Chacun a une **page du catalogue kit** avec des détails orientés utilisateur et une **spec normative** dans la skill Deep Work Plan. Quatre d’entre eux — devcontainer, Herdr, DeepWorkPlan Vim et Agentkit — sont des intégrateurs légers épinglés par tag à un produit doté de son propre dépôt et de son propre cycle de publication ; chaque produit fonctionne sans Deep Work Plan. Un addon accepté est inscrit dans le registre d’addons `.dwp/config.json` (DWP 7.0.0), qui peut seulement proposer ou amplifier — il ne conditionne jamais la conformité ni un plan.

### Devcontainer (premier addon)

Un intégrateur léger de [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, épinglé à `v0.1.4`) : un modèle Dev Containers que `dck init` génère dans le dépôt.

- **Page kit :** [Devcontainer](/kit/devcontainer)
- **Ce qu'il ajoute :** le lanceur `dck` (`setup`, `up`, `shell`, `ssh`, `doctor`), des images de base dans les variantes `python-3.13`, `node-24` et `debian` livrées sans agents de code (les agents sont une couche optionnelle), des ports limités au loopback, le transfert de l'agent SSH et des machines Herdr optionnelles par conteneur
- **Comportement :** détecté via `dck doctor --json` (interface 1) ; `dck init` ne réconcilie un devcontainer existant qu'après acceptation de son diff, et sauvegarde d'abord le fichier — jamais écrasé
- **Quand proposé :** la plupart des dépôts avec Docker ou des services bénéficiant d'un conteneur de dev isolé

### Dailybot (deuxième addon)

Une connexion optionnelle à l'**équipe Dailybot** du développeur pour la visibilité de la progression des agents.

- **Page kit :** [Dailybot](/kit/dailybot) — référence complète des capacités
- **Ce que l'addon DWP connecte :** quatre rapports du cycle de vie du plan (kickoff, tâche significative, bloqué, achèvement) via la sous-skill `report` de dailybot ; application déterministe optionnelle par hooks (`dailybot hook`, CLI `>= 3.9.0`)
- **Skill jumelée :** installer [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (actuellement **3.23.3**) expose **17 capacités** — chat sur Slack/Teams/Discord/Google Chat, check-ins, création de formulaires, ask AI, kudos, tableaux et tâches Plan, labels d'organisation, clés API par dépôt (`.dailybot/env.json`), e-mail et plus. L'addon DWP ne connecte que **report** ; les autres capacités sont invoquées directement via la skill Dailybot
- **Auth :** entièrement reportée à la skill Dailybot (`dailybot login` ou `DAILYBOT_API_KEY`) ; cet addon ne stocke jamais de credentials
- **Garde-fou neutre vis-à-vis du fournisseur :** le DWP central a **zéro** dépendance à Dailybot ; ne jamais installer automatiquement pour tout le monde
- **Quand proposé :** le développeur ou l'équipe utilise déjà Dailybot, ou demande explicitement des rapports d'équipe

### Dependency upgrade (troisième addon)

Mises à niveau de dépendances par lots, validées et réversibles, agnostiques au gestionnaire de paquets.

- **Page kit :** [Dependency upgrade](/kit/dependency-upgrade)
- **Ce qu'il ajoute :** détecte le gestionnaire **réel** du dépôt (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), met à niveau par lots classés semver, exécute la porte de validation du dépôt après chaque lot, annule les échecs, résume sans commit automatique
- **Commande :** installe `/lib-upgrade` dans `.agents/commands/` uniquement lorsqu'il est accepté
- **Quand proposé :** proposé pour tout dépôt avec des dépendances déclarées ; le délégué inerte `/lib-upgrade` s'installe sous le consentement de l'onboarding sauf refus explicite — une installation n'exécute aucune mise à niveau

### Design system (quatrième addon)

Un `DESIGN.md` à portée de surface d'interface que tout agent de codage lit pour une sortie UI, CLI ou conversationnelle cohérente.

- **Page kit :** [Design system](/kit/design-system)
- **Ce qu'il ajoute :** `docs/DESIGN.md` (référencé depuis `AGENTS.md`) avec jusqu'à trois **profils** empilés dans un seul fichier : **visual-ui** (jetons et composants d'UI rendue), **cli-output** (styles sémantiques de terminal, dégradation TTY/`NO_COLOR`), **conversational** (voix, anatomie du message, rendu par plateforme avec replis en texte brut)
- **Force du profil :** la détection rend l'offre obligatoire ; l'installation est conditionnée à une acceptation, en mode guidé comme en mode confiance — visual-ui est **fortement recommandé lorsqu'il est détecté** ; cli-output et conversational sont **recommandés lorsqu'ils sont détectés, toujours demandés, jamais appliqués automatiquement**
- **Quand proposé :** uniquement lorsqu'une surface d'interface orientée utilisateur est détectée — pas pour les bibliothèques pures, services headless ou dépôts infra uniquement

### AI Diff Reviewer (cinquième addon — revue locale requise, surface CI optionnelle)

L’**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) dote la passe de sécurité obligatoire du Final Review d’une revue locale structurée et bloque optionnellement les pull requests en CI. Depuis le standard 2.3.0, la **revue locale fait partie du socle** ; seule la surface CI est optionnelle. Cet addon est actualisé automatiquement à chaque publication : le tag indiqué ci-dessous est donc celui en vigueur au moment de la rédaction et peut être en retard sur la copie vendorisée — le `SKILL.md` propre à l’addon et ses releases GitHub font foi pour le tag réellement installé. L’installation est toujours épinglée à un tag publié, jamais à une branche mobile.

- **Page kit :** [AI Diff Reviewer](/kit/ai-diff-reviewer) — référence complète des capacités
- **Requise à l’onboarding (Phase 7a) :** installation de la skill vendorisée épinglée à un tag (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) plus un `.review/extension.md` adapté au dépôt (via `generate-extension`), sous le consentement de l’onboarding ; une mise à niveau ciblée de la harness réconcilie les deux lorsqu’ils manquent ; un refus est enregistré comme exception déclarée et signalé par `verify` jusqu’à son installation
- **Requise dans chaque Final Review :** la passe de sécurité exécute le flux parent par défaut de la skill upstream sur l’ensemble des changements accumulé et ajoute sa sortie au `analysis_results/SECURITY_REVIEW.md` local au plan (dans le dossier propre du plan, jamais à la racine du dépôt) ; une skill ou une extension manquante est un constat enregistré `local reviewer not installed` — jamais un saut silencieux, et jamais un amorçage surprise : l'installation appartient au consentement de l'onboarding ou à une invocation explicite de l'addon ; les **constats critiques vérifiés** d’un passage terminé bloquent l’achèvement jusqu’à correction ou acceptation explicite (v3, BC-07 — les affirmations critiques non vérifiées arrivent comme avertissements annotés, et une revue `incomplete` ou `timeout` n’est pas une passe propre, BC-04)
- **Surface CI optionnelle (Flow B) :** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`) via la sous-skill upstream `setup`, plus les compagnons `apply-review` (lecture seule) et `address-review` (commite, pousse et réarme ; nouveau en v3.1.1) comme commodités invocables par le développeur — proposé explicitement, jamais installé sans demande, jamais le défaut, jamais une tâche du plan
- **Jamais bloquant (invocation uniquement) :** une revue locale qui peut démarrer mais échoue sur une erreur avertit une fois, enregistre et poursuit ; elle ne fait jamais échouer la tâche
- **Parité (Flow B) :** `prompt.md` partagé + extension aligne méthodologie/sévérité ; la Revue consciente des itérations CI peut raccourcir le round 2+ tandis que le passage local reste complet
- **Garde-fou neutre vis-à-vis du fournisseur :** aucun flux Deep Work Plan n’exige de service commercial, de fournisseur CI ni de secret — le reviewer est une skill MIT épinglée à un tag, exécutée par le propre agent de codage du développeur
- **Conformité :** `verify` signale un reviewer local manquant comme un échec pour les dépôts déclarant le standard 2.3.0 ou plus récent, et comme un constat de version de la harness pour les dépôts legacy

### Herdr (sixième addon)

Un intégrateur léger de [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (épinglé à `v0.1.0`, protocole `1`), le transport de délégation **interactif** des plans v7.

- **Page kit :** [Herdr](/kit/herdr)
- **Ce qu'il ajoute :** un plan peut confier une tâche bornée à un agent de code dans un autre panneau [Herdr](https://herdr.dev), sur la même machine ou sur une machine que Herdr atteint via SSH, et enregistrer son unique réponse autorisée dans le journal
- **Comportement :** le protocole entre pairs (estampille, autorisation, réponse, garde anti-boucle, limites de profondeur et de fan-out) réside dans herdr-peers, jamais dans le pack ; toute utilisation exige l’autorisation de contrat `agent_delegation`, et le résultat d’un délégué reste une simple affirmation tant que l’exécuteur propre du plan ne l’a pas observé
- **Quand proposé :** opt-in explicite pendant la Phase 7b ; détection en lecture seule de `herdr` et `herdr-peers` ; le transport n’est utilisable qu’à l’intérieur d’une session Herdr

### DeepWorkPlan Vim (septième addon)

Un intégrateur léger de [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (épinglé à `v0.4.2`, interface `1`), l’éditeur de terminal pour Deep Work Plan (Neovim 0.12+).

- **Page kit :** [DeepWorkPlan Vim](/kit/vim)
- **Ce qu'il ajoute :** une surface d’édition optionnelle, au niveau de la machine, pour les agents et les humains — un index des commandes généré, un navigateur de plans en lecture seule et une visionneuse Markdown ; chaque affirmation est lue depuis la surface lisible par machine épinglée du produit
- **Comportement :** une configuration Neovim existante n’est jamais écrasée sans consentement explicite ; la détection est en lecture seule
- **Quand proposé :** opt-in explicite pendant la Phase 7b ; à titre informatif uniquement lorsque Neovim 0.12+ est absent

### Agentkit (huitième addon)

Un intégrateur léger de [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`), le transport de délégation **headless** (sans interface) des plans v7.

- **Page kit :** [Agentkit](/kit/agentkit)
- **Ce qu'il ajoute :** une surface de commande `ak` unique au-dessus des agents de code en terminal, utilisée pour exécuter une tâche de plan bornée en mode headless ; il n’apporte les capacités `subagents`, `cancel_children` et `model_routing` qu’à l’exécution, lorsqu’il est activé, détecté et sur une interface compatible
- **Comportement :** toute utilisation exige l’autorisation de contrat `agent_delegation` ; l’addon n’installe jamais de lui-même les CLI d’agents de code et ne lit jamais les valeurs des clés des fournisseurs
- **Quand proposé :** opt-in explicite pendant la Phase 7b ; détection en lecture seule via `ak doctor --json`

## Skills

Les skills sont des procédures réutilisables invoquées par nom. Une skill empaquette un flux de travail répétable (exécuter des tests, corriger le lint, créer un composant).

La méthodologie fournit un petit ensemble de sous-skills centrales. Parmi elles, la sous-skill **author** permet à un dépôt de **développer son propre kit** : invoquée via `/skill-create` et `/agent-create`, elle raisonne sur la disposition `.agents/` existante et les conventions, puis auteur une nouvelle skill, un agent ou un délégué de commande fin qui correspond, et maintient le catalogue synchronisé. La même sous-skill appuie la passe de réconciliation des skills du Final Review.

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
