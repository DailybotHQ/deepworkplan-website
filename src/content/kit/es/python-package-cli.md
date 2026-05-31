---
title: Paquete / CLI de Python
description: "Un preset de incorporación para paquetes y herramientas CLI de Python, con pistas de razonamiento para la disposición del paquete, los puntos de entrada de consola, el árbol de comandos y la compuerta de validación basada en pytest."
kind: preset
lang: es
order: 5
stack: Python package / CLI
---

# Preset de paquete / CLI de Python

Una guía de razonamiento que el flujo de onboard usa para paquetes y herramientas CLI de Python. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `pyproject.toml` con un punto de entrada `[project.scripts]` (una CLI instalable).
- Un framework de CLI en las dependencias: `click`, `typer` o `argparse` de la biblioteca estándar.
- Un src-layout (`src/<pkg>/`) o paquete en la raíz con `__init__.py`, `cli.py`/`__main__.py` y `commands/`.

## Qué razonar

- La compuerta de validación real (`ruff check`, `mypy`, `pytest`) — capturada al pie de la letra, incluido cualquier envoltorio de Makefile/tox/hatch.
- El nombre del script de consola y la estructura de comandos/subcomandos.
- Skills adaptadas: `command-add`, `subcommand`, `option`/`flag` y `release` si se publica en PyPI.

## Notas

La estabilidad de la API pública, el texto de ayuda y los códigos de salida son superficies de cara al usuario — trátalos como estándares.
