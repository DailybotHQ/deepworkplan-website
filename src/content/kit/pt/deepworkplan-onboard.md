---
title: deepworkplan-onboard
description: "Tornar um repositório AI-first raciocinando sobre sua stack e arquétipo, e então gerando um AGENTS.md, docs/, .agents/ adaptados e um .dwp/ ignorado pelo git."
kind: command
lang: pt
order: 6
usage: /deepworkplan-onboard
---

# deepworkplan-onboard

Transforma um repositório em uma base de código AI-first, orientada a especificação. Esta é a sub-skill onboard da skill Deep Work Plan.

## O que faz

O `deepworkplan-onboard` inspeciona o repositório **real** — linguagens, frameworks, gerenciador de pacotes, comandos de build/teste/lint, módulos, convenção de testes, formato de deploy — e gera artefatos adaptados a ele. Ele raciocina; nunca copia um template nem deixa um placeholder.

## Uso

```
/deepworkplan-onboard
```

## Comportamento

1. Reconhecimento — detectar a stack real e os comandos de validação; corresponder ao preset de onboarding mais próximo.
2. Arquétipo — classificar como repositório individual ou hub orquestrador.
3. Gerar `AGENTS.md` + o symlink `CLAUDE.md` com um bloco Quick Commands real.
4. Gerar `docs/` (arquitetura, padrões, testes, segurança e mais) e docs por módulo.
5. Gerar `.agents/` (agents, comandos `dwp-*` enxutos, skills apropriadas à stack, catálogo) + `.claude → .agents`.
6. Instalar a skill e estruturar um `.dwp/` ignorado pelo git (planos, rascunhos) e um espaço de rascunho `tmp/`.
7. Oferecer os addons opcionais e, em seguida, fazer a autoverificação.

## Notas

Um repositório é totalmente conforme com zero addons. A realidade detectada sempre prevalece sobre as suposições do preset.
