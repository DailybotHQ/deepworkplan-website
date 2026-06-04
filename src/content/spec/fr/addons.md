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

## Presets

Les presets adaptent DWP à une stack technique spécifique (Django, React, Go).

## Adaptateurs

Les adaptateurs mappent les commandes DWP au système de commandes d’un agent spécifique (Claude Code, Cursor, Codex).

## Exemples

Les exemples démontrent DWP en pratique (comparaisons avant/après, plans types, études de cas).
