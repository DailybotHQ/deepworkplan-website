---
title: Python package / CLI
description: "Un preset di onboarding per pacchetti Python e strumenti CLI, con spunti di ragionamento per la struttura del pacchetto, gli entry point della console e il validation gate pytest."
kind: preset
lang: it
order: 5
stack: Python package / CLI
---

# Preset Python package / CLI

Una guida di ragionamento che il flusso di onboard usa per pacchetti Python e strumenti CLI. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `pyproject.toml` con un entry point `[project.scripts]` (una CLI installabile).
- Un framework CLI nelle dipendenze: `click`, `typer` o lo stdlib `argparse`.
- Una src-layout (`src/<pkg>/`) o un pacchetto di radice con `__init__.py`, `cli.py`/`__main__.py` e `commands/`.

## Su cosa ragionare

- Il validation gate reale (`ruff check`, `mypy`, `pytest`) — catturato alla lettera, incluso qualsiasi wrapper Makefile/tox/hatch.
- Il nome dell’entry point della console-script e la struttura di comando/sottocomando.
- Skill adatte allo stack: `command-add`, `subcommand`, `option`/`flag` e `release` se viene pubblicato su PyPI.

## Note

La stabilità dell’API pubblica, il testo di aiuto e gli exit code sono superfici rivolte all’utente — li tratti come standard.
