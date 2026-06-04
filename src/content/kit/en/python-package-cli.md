---
title: Python package / CLI
description: "An onboarding preset for Python packages and CLI tools, with reasoning cues for the package layout, console entry points, and the pytest validation gate."
kind: preset
lang: en
order: 5
stack: Python package / CLI
---

# Python package / CLI preset

A reasoning guide the onboard flow uses for Python packages and CLI tools. It is a checklist, not a template — detected reality wins.

## Signals

- `pyproject.toml` with a `[project.scripts]` entry point (an installable CLI).
- A CLI framework in deps: `click`, `typer`, or stdlib `argparse`.
- A src-layout (`src/<pkg>/`) or root package with `__init__.py`, `cli.py`/`__main__.py`, and `commands/`.

## What to reason about

- The real validation gate (`ruff check`, `mypy`, `pytest`) — captured verbatim, including any Makefile/tox/hatch wrapper.
- The console-script entry name and the command/subcommand structure.
- Stack-appropriate skills: `command-add`, `subcommand`, `option`/`flag`, and `release` if it ships to PyPI.

## Notes

Public-API stability, help text, and exit codes are user-facing surfaces — treat them as standards.
