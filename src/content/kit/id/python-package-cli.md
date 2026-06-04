---
title: Python package / CLI
description: "Preset onboarding untuk package Python dan tool CLI, dengan petunjuk penalaran untuk tata letak package, entry point konsol, dan validation gate pytest."
kind: preset
lang: id
order: 5
stack: Python package / CLI
---

# Preset Python package / CLI

Panduan penalaran yang dipakai alur onboard untuk package Python dan tool CLI. Ini adalah daftar periksa, bukan template — realitas yang terdeteksi yang menentukan.

## Sinyal

- `pyproject.toml` dengan entry point `[project.scripts]` (CLI yang dapat dipasang).
- Framework CLI dalam dependensi: `click`, `typer`, atau `argparse` dari stdlib.
- Src-layout (`src/<pkg>/`) atau package root dengan `__init__.py`, `cli.py`/`__main__.py`, dan `commands/`.

## Yang perlu dipertimbangkan

- Validation gate yang sebenarnya (`ruff check`, `mypy`, `pytest`) — dicatat apa adanya, termasuk wrapper Makefile/tox/hatch mana pun.
- Nama entry console-script serta struktur command/subcommand.
- Skill yang sesuai dengan stack: `command-add`, `subcommand`, `option`/`flag`, dan `release` jika dirilis ke PyPI.

## Catatan

Stabilitas public API, teks bantuan, dan exit code adalah permukaan yang dihadapi pengguna — perlakukan sebagai standar.
