---
title: Python package / CLI
description: "Preset onboardingowy dla pakietów Python i narzędzi CLI, z wskazówkami do rozumowania o układzie pakietu, punktach wejścia konsoli i bramce walidacji pytest."
kind: preset
lang: pl
order: 5
stack: Python package / CLI
---

# Preset Python package / CLI

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla pakietów Python i narzędzi CLI. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `pyproject.toml` z punktem wejścia `[project.scripts]` (instalowalne CLI).
- Framework CLI w zależnościach: `click`, `typer` lub `argparse` z biblioteki standardowej.
- Układ src (`src/<pkg>/`) lub pakiet w katalogu głównym z `__init__.py`, `cli.py`/`__main__.py` i `commands/`.

## O czym należy rozumować

- Rzeczywista bramka walidacji (`ruff check`, `mypy`, `pytest`) — zapisana dosłownie, wraz z wszelkimi otoczkami Makefile/tox/hatch.
- Nazwa skryptu konsolowego oraz struktura komend/podkomend.
- Skille odpowiednie dla stacku: `command-add`, `subcommand`, `option`/`flag` oraz `release`, jeśli pakiet trafia do PyPI.

## Uwagi

Stabilność publicznego API, tekst pomocy i kody wyjścia to powierzchnie widoczne dla użytkownika — traktuj je jak standardy.
