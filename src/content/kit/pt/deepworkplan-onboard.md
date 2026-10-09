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
7. Instalar a revisão local obrigatória do AI Diff Reviewer, oferecer os addons opcionais e, em seguida, fazer a autoverificação.

## Notas

Um repositório é totalmente conforme com zero addons opcionais; a revisão local do AI Diff Reviewer faz parte da linha de base desde o padrão 2.3.0. A realidade detectada sempre prevalece sobre as suposições do preset.

## Referências de esquemas v6

Para planos v6, o catálogo de esquemas legíveis por máquina é publicado nestas URLs estáveis. A projeção ativa do v6 é um snapshot; não existe `plan-state/v6.json`. Planos v5 existentes continuam usando o esquema de estado v5, e planos antigos nunca são reescritos silenciosamente.

- **Plan manifest:** https://deepworkplan.com/schema/plan-manifest/v6.json
- **Plan snapshot (v6 live projection):** https://deepworkplan.com/schema/plan-snapshot/v6.json
- **Plan contract:** https://deepworkplan.com/schema/plan-contract/v6.json
- **Journal event:** https://deepworkplan.com/schema/journal-event/v6.json
- **Context manifest:** https://deepworkplan.com/schema/context-manifest/v6.json

O pacote 7.x atual cria novos planos com v7 por padrão. Os planos existentes mantêm a geração registrada; a migração exige uma solicitação explícita. Os novos planos recebem IDs numéricos monotônicos com pelo menos três dígitos (por exemplo, `PLAN_001_add_payment_webhooks/`). Como os esquemas v5 congelados contam o ID numérico como uma palavra, os slugs v5 têm 2–4 palavras; os slugs v7 têm 2–5. As pastas existentes sem numeração `PLAN_<slug>/` continuam legíveis e nunca são renomeadas. Quando há planos numerados, `latest` resolve para o plano com o maior ID numérico.
