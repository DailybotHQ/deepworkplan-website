---
title: "DWP v1 : d'une boucle de plans à un harness portable"
description: "Deep Work Plan passe d'une unique boucle de plans écrits à un kit d'adoption portable — confiance et provenance, prise en charge élargie des hôtes d'agents, et un vérificateur de conformité que tout dépôt peut exécuter."
date: 2026-06-12
version: "v1 · Fondations"
kind: foundation
lang: fr
order: 4
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Jusqu'à présent, Deep Work Plan était une boucle de création de plans qu'un seul agent suivait au sein d'une seule session. Cette série de versions en fait quelque chose qu'un dépôt peut adopter par lui-même — la première version pensée pour aller au-delà d'un seul agent et d'une seule session.

Le skill reçoit une déclaration de confiance avec une provenance vérifiée par somme de contrôle, afin qu'un développeur voie exactement ce qu'il lit et écrit avant de l'installer. Les préréglages d'onboarding et les hôtes d'agents pris en charge s'élargissent considérablement, la discipline de tests devient une partie essentielle de chaque tâche plutôt qu'un ajout, et un vérificateur de conformité permet de vérifier — objectivement, et non par supposition — qu'un dépôt respecte le standard. Un protocole d'état et de reprise permet à un plan interrompu de repartir là où il s'était arrêté plutôt que de recommencer à zéro. En coulisses, la compatibilité entre `.claude` et `.cursor` converge vers un unique répertoire canonique `.agents`, si bien que chaque agent pris en charge lit le même kit.

Ensemble, ces versions posent les fondations de l'étape suivante : le dépôt cesse d'être seulement l'endroit où le plan est stocké, il devient le harness de travail de l'agent.

Consultez l'[historique des versions du skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) pour la séquence complète.
