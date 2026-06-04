---
title: Python package / CLI
description: "Пресет онбординга для пакетов Python и инструментов CLI с подсказками для рассуждений о структуре пакета, консольных точках входа и validation gate на pytest."
kind: preset
lang: ru
order: 5
stack: Python package / CLI
---

# Пресет Python package / CLI

Руководство-рассуждение, которое процесс onboard использует для пакетов Python и инструментов CLI. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Признаки

- `pyproject.toml` с точкой входа `[project.scripts]` (устанавливаемый CLI).
- Фреймворк CLI в зависимостях: `click`, `typer` или `argparse` из стандартной библиотеки.
- Структура src-layout (`src/<pkg>/`) или корневой пакет с `__init__.py`, `cli.py`/`__main__.py` и `commands/`.

## О чём рассуждать

- Реальный validation gate (`ruff check`, `mypy`, `pytest`) — захваченный дословно, включая любую обёртку Makefile/tox/hatch.
- Имя консольного скрипта и структуру команд/подкоманд.
- Подходящие стеку навыки: `command-add`, `subcommand`, `option`/`flag` и `release`, если пакет публикуется в PyPI.

## Примечания

Стабильность публичного API, текст справки и коды выхода — это поверхности, обращённые к пользователю; относитесь к ним как к стандартам.
