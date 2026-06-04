---
title: Python-Package / CLI
description: "Ein Onboarding-Preset für Python-Packages und CLI-Tools, mit Reasoning-Hinweisen für das Package-Layout, Console-Entry-Points und das pytest-Validierungs-Gate."
kind: preset
lang: de
order: 5
stack: Python package / CLI
---

# Python-Package / CLI Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Python-Packages und CLI-Tools nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `pyproject.toml` mit einem `[project.scripts]`-Entry-Point (eine installierbare CLI).
- Ein CLI-Framework in den Abhängigkeiten: `click`, `typer` oder das stdlib-`argparse`.
- Ein src-Layout (`src/<pkg>/`) oder ein Wurzel-Package mit `__init__.py`, `cli.py`/`__main__.py` und `commands/`.

## Worüber nachzudenken ist

- Das echte Validierungs-Gate (`ruff check`, `mypy`, `pytest`) — wortwörtlich erfasst, inklusive eines etwaigen Makefile-/tox-/hatch-Wrappers.
- Der Name des Console-Scripts und die Befehls-/Unterbefehls-Struktur.
- Stack-passende Skills: `command-add`, `subcommand`, `option`/`flag` und `release`, falls es auf PyPI veröffentlicht wird.

## Hinweise

Die Stabilität der öffentlichen API, der Hilfetext und die Exit-Codes sind benutzersichtbare Oberflächen — behandeln Sie sie als Standards.
