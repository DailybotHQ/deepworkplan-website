---
title: agent-create
description: "Créer un nouvel agent dans le dépôt courant — un travailleur spécialisé doté de son propre palier de modèle et de ses outils — via le sous-skill author, en gardant le catalogue synchronisé."
kind: command
lang: fr
order: 8
usage: /agent-create
---

# agent-create

Créer un nouvel agent dans le dépôt courant. Un léger délégateur vers le sous-skill **author** de Deep Work Plan.

## Ce qu’il fait

`agent-create` route vers le flux de création d’agent du sous-skill author. Un agent est une définition de travailleur spécialisé (rôle, palier de modèle, outils, prompt système) mobilisée pour traiter une catégorie de tâches. Il encode « qui fait X » et réside sous `.agents/agents/<name>.md`.

## Utilisation

```
/agent-create
```

## Comportement

1. Détecter la disposition `.agents/` du dépôt et les conventions locales.
2. Confirmer un rôle récurrent ayant des besoins distincts en modèle/outils ; le nommer en kebab-case.
3. Échafauder et remplir l’agent (Role, Inputs, Process, Output, escalade).
4. Choisir un palier de modèle justifié — léger, standard ou lourd — sans coder en dur les identifiants de modèle d’un fournisseur.
5. Mettre à jour le catalogue `.agents/docs/` en conséquence.

## Notes

Pour les procédures, utilisez `/skill-create`. Gardez les paliers de modèle abstraits et mappez-les dans la configuration du dépôt.
