---
title: Mise à jour des dépendances
description: "Un addon facultatif, indépendant du gestionnaire de paquets, qui met à jour les dépendances d’un dépôt par lots validés et réversibles, en détectant le vrai gestionnaire, sans supposer npm."
kind: addon
lang: fr
order: 3
---

# Addon dependency-upgrade

Mettre les dépendances d’un dépôt à jour avec un workflow par lots, validé et réversible. Le troisième addon facultatif de Deep Work Plan.

## Ce qu’il ajoute

- La détection du gestionnaire de paquets **réel** du dépôt (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, et davantage) à partir du manifeste et du fichier de verrouillage existants.
- Une commande `/lib-upgrade` installée dans `.agents/commands/`, **uniquement lorsqu’elle est acceptée**.

## Comportement

1. Exiger un arbre de travail propre (ou sauvegardé).
2. Classer les mises à jour par semver — patch, mineur, majeur ; les majeures requièrent une approbation explicite.
3. Mettre à jour par petits lots cohérents ; jamais tout d’un coup.
4. Exécuter la vraie porte de validation du dépôt après chaque lot ; annuler tout lot qui échoue.
5. Résumer ce qui a été mis à jour, ignoré et annulé ; laisser le développeur valider.

## Notes

Indépendant du gestionnaire de paquets — n’exécute jamais npm/ncu dans un dépôt non JS. Facultatif, jamais requis, et ne valide jamais automatiquement.
