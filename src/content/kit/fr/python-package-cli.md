---
title: Package / CLI Python
description: "Un preset d’onboarding pour les packages et outils CLI Python, avec des indices de raisonnement pour l’organisation du package, les points d’entrée console et la porte de validation pytest."
kind: preset
lang: fr
order: 5
stack: Python package / CLI
---

# Preset package / CLI Python

Un guide de raisonnement que le flux onboard utilise pour les packages et outils CLI Python. C’est une liste de contrôle, pas un modèle — la réalité détectée l’emporte.

## Signaux

- `pyproject.toml` avec un point d’entrée `[project.scripts]` (un CLI installable).
- Un framework CLI dans les dépendances : `click`, `typer`, ou `argparse` de la stdlib.
- Une organisation src (`src/<pkg>/`) ou un package racine avec `__init__.py`, `cli.py`/`__main__.py`, et `commands/`.

## Ce sur quoi raisonner

- La vraie porte de validation (`ruff check`, `mypy`, `pytest`) — capturée verbatim, y compris tout wrapper Makefile/tox/hatch.
- Le nom du script console et la structure des commandes/sous-commandes.
- Des skills adaptés à la stack : `command-add`, `subcommand`, `option`/`flag`, et `release` s’il est publié sur PyPI.

## Notes

La stabilité de l’API publique, les textes d’aide et les codes de sortie sont des surfaces visibles par l’utilisateur — traitez-les comme des standards.
