---
title: skill-create
description: "Créer un nouveau skill réutilisable dans le dépôt courant — une procédure paramétrée exécutée en session — via le sous-skill author, en gardant le catalogue synchronisé."
kind: command
lang: fr
order: 7
usage: /skill-create
---

# skill-create

Créer un nouveau skill dans le dépôt courant. Un léger délégateur vers le sous-skill **author** de Deep Work Plan.

## Ce qu’il fait

`skill-create` route vers le flux de création de skill du sous-skill author. Un skill est une procédure réutilisable et paramétrée exécutée en session (par exemple, `/fix-lint`). Il encode « comment faire X » et réside sous `.agents/skills/<name>/SKILL.md`.

## Utilisation

```
/skill-create
```

## Comportement

1. Détecter la disposition `.agents/` du dépôt et les conventions locales.
2. Confirmer qu’un workflow réel et reproductible existe ; le nommer en kebab-case.
3. Échafauder et remplir `SKILL.md` (Goal, When-to-use, Steps, Validation).
4. Ajouter un léger délégateur de commande si nécessaire.
5. Mettre à jour le catalogue `.agents/docs/` en conséquence.

## Notes

Pour les agents, utilisez `/agent-create`. La logique réside dans le skill ; la commande reste légère.
