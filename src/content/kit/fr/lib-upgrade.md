---
title: lib-upgrade
description: "Mettre à jour en toute sécurité les dépendances d’un dépôt par lots validés et réversibles via l’addon dependency-upgrade. Installé uniquement lorsque cet addon est accepté."
kind: command
lang: fr
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Mettre à jour les dépendances du dépôt en toute sécurité. Un léger délégateur vers l’addon **dependency-upgrade**.

## Ce qu’il fait

`lib-upgrade` route vers l’addon dependency-upgrade. L’addon raisonne sur le gestionnaire de paquets réel du dépôt — sans jamais supposer npm — classe les mises à jour par semver, met à jour par lots sûrs, exécute la vraie porte de validation du dépôt après chaque lot, annule un lot défaillant et résume.

## Utilisation

```
/lib-upgrade
```

## Comportement

1. Exiger un arbre de travail propre (ou sauvegardé).
2. Détecter le gestionnaire de paquets réel à partir du manifeste et du fichier de verrouillage existants.
3. Classer les mises à jour (patch / mineur / majeur) ; les majeures requièrent une approbation.
4. Mettre à jour par petits lots ; valider la vraie porte du dépôt après chacun.
5. Annuler tout lot qui échoue à la porte ; résumer et laisser le développeur valider.

## Notes

Cette commande n’est installée que lorsque l’addon dependency-upgrade est accepté. Indépendant du gestionnaire de paquets ; il ne valide jamais automatiquement.
