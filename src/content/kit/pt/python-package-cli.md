---
title: Pacote / CLI Python
description: "Um preset de onboarding para pacotes Python e ferramentas de CLI, com pistas de raciocínio para o layout do pacote, os entry points de console e o validation gate do pytest."
kind: preset
lang: pt
order: 5
stack: Python package / CLI
---

# Preset de pacote / CLI Python

Um guia de raciocínio que o fluxo de onboarding usa para pacotes Python e ferramentas de CLI. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `pyproject.toml` com um entry point `[project.scripts]` (uma CLI instalável).
- Um framework de CLI nas dependências: `click`, `typer` ou o `argparse` da stdlib.
- Um src-layout (`src/<pkg>/`) ou pacote na raiz com `__init__.py`, `cli.py`/`__main__.py` e `commands/`.

## Sobre o que raciocinar

- O validation gate real (`ruff check`, `mypy`, `pytest`) — capturado literalmente, incluindo qualquer wrapper de Makefile/tox/hatch.
- O nome do entry point do console-script e a estrutura de comandos/subcomandos.
- Skills apropriadas à stack: `command-add`, `subcommand`, `option`/`flag` e `release` se for publicado no PyPI.

## Notas

A estabilidade da API pública, o texto de ajuda e os códigos de saída são superfícies voltadas ao usuário — trate-os como padrões.
