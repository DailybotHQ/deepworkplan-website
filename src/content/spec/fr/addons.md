---
title: Add-ons
description: "Extensions optionnelles de la méthodologie DWP de base : skills, agents, presets, adaptateurs et exemples, et comment chacun étend le workflow sans être requis."
order: 5
lang: fr
section: Addons
---

# Add-ons

**Version 1.0.** Les add-ons sont des extensions optionnelles de la méthodologie DWP de base. Ils ne sont pas requis pour la conformité mais apportent des capacités supplémentaires.

## Skills

Les skills sont des procédures réutilisables invoquées par leur nom. Un skill empaquette un workflow reproductible (exécuter les tests, corriger le lint, créer un composant).

La méthodologie fournit un petit ensemble de sous-skills de base. Parmi eux, le sous-skill **author** permet à un dépôt de **faire grandir son propre kit** : invoqué via `/skill-create` et `/agent-create`, il raisonne sur la disposition `.agents/` existante du dépôt et ses conventions, puis rédige un nouveau skill, agent ou délégateur de commande léger qui les respecte, et garde le catalogue synchronisé. Le même sous-skill exécute la tâche obligatoire Skills & Agents Discovery.

## Agents

Les agents sont des travailleurs spécialisés dotés d’un rôle défini (reviewer, executor, architect).

## Add-ons de maintenance

Les add-ons de maintenance sont des extensions facultatives, jamais requises pour la conformité, qui aident un dépôt à se maintenir lui-même. L’add-on **dependency-upgrade** raisonne sur le gestionnaire de paquets réel du dépôt (au lieu de supposer npm) et met à jour les dépendances par petits lots validés et réversibles : il détecte le gestionnaire à partir du vrai manifeste et du fichier de verrouillage, classe les mises à jour par semver, met à jour par lots, exécute la vraie porte de validation du dépôt après chaque lot, annule tout lot qui échoue et résume sans valider automatiquement. Un add-on n’est installé que lorsqu’il est accepté pendant l’onboarding.

## Add-on design-system

L’add-on **design-system** est une extension facultative, à périmètre de surface d’interface, qui dote un dépôt d’un `DESIGN.md` — un fichier de système de conception en Markdown que tout agent de code lit pour générer une sortie d’interface cohérente avec les conventions propres au dépôt. Il couvre trois **profils**, détectés indépendamment à partir de fichiers réels et empilés dans le même et unique fichier : **visual-ui** (UI web/mobile/desktop rendue), **cli-output** (sortie de terminal stylée : couleurs sémantiques, composants de sortie tels que panneaux et spinners, conventions de mise en page, dégradation TTY/`NO_COLOR`) et **conversational** (le produit parle par chat ou par e-mail : voix et registre, anatomie du message, rendu par plateforme avec des solutions de repli en texte brut). Il raisonne sur la véritable source de conception du dépôt (propriétés personnalisées CSS, une configuration Tailwind, des fichiers de tokens, les styles des composants — ou un module d’affichage CLI, ou des helpers de composition de messages) plutôt que de copier un fichier de marque, et valide l’intégrité de chaque profil : contraste WCAG AA pour les paires de texte visuelles, la couleur jamais comme seul porteur de sens dans la sortie de terminal, des solutions de repli en texte brut pour les messages riches, et des références aux tokens qui se résolvent. Il réconcilie un `DESIGN.md` existant au lieu de l’écraser.

Le fichier vit à `docs/DESIGN.md`, aux côtés des autres specs du dépôt, et est référencé depuis `AGENTS.md` afin que les agents le découvrent de la même manière qu’ils découvrent le reste de la documentation (la racine du dépôt n’est utilisée que lorsqu’il n’existe pas d’arborescence `docs/`). La découverte se fait par référence, et non par emplacement physique. La force diffère selon le profil : **visual-ui est activé par défaut lorsqu’il est détecté** — lorsqu’une surface d’UI visuelle est présente, l’onboarding l’applique en mode confiance et le recommande fortement en mode guidé — tandis que **cli-output et conversational sont recommandés lorsqu’ils sont détectés et toujours soumis à une question, jamais appliqués automatiquement**. L’add-on n’est jamais proposé pour un dépôt dépourvu de toute surface d’interface (une bibliothèque pure, un service headless, un dépôt d’infrastructure uniquement), et un dépôt sans aucun add-on reste pleinement conforme. Un `DESIGN.md` créé avant l’existence des profils est un fichier visuel à profil unique valide — aucune migration.

Ce fichier de système de conception au niveau du dépôt est distinct d’un document de conception technique par fonctionnalité (le `design.md` « exigences → conception → tâches » des workflows spec-driven liés à un outil). DWP ne fournit aucun archétype de document de conception par fonctionnalité séparé : le README d’un plan, les critères d’acceptation de chaque tâche et les portes de validation couvrent déjà ce rôle. L’add-on comble la seule lacune que ce rôle ne couvre pas : un contexte de conception d’interface durable et natif au dépôt.

## Presets

Les presets adaptent DWP à une stack technique spécifique (Django, React, Go).

## Adaptateurs

Les adaptateurs mappent les commandes DWP au système de commandes d’un agent spécifique (Claude Code, Cursor, Codex).

## Exemples

Les exemples démontrent DWP en pratique (comparaisons avant/après, plans types, études de cas).
