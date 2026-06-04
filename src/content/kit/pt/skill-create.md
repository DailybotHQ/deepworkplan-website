---
title: skill-create
description: "Criar uma nova skill reutilizável no repositório atual — um procedimento parametrizado, executado na sessão — via a sub-skill author, mantendo o catálogo em sincronia."
kind: command
lang: pt
order: 7
usage: /skill-create
---

# skill-create

Cria uma nova skill no repositório atual. Um delegador enxuto para a sub-skill **author** do Deep Work Plan.

## O que faz

O `skill-create` encaminha para o fluxo de criação de skill da sub-skill author. Uma skill é um procedimento reutilizável e parametrizado, executado na sessão (por exemplo, `/fix-lint`). Ela codifica "como fazer X" e vive em `.agents/skills/<name>/SKILL.md`.

## Uso

```
/skill-create
```

## Comportamento

1. Detectar o layout `.agents/` do repositório e as convenções locais.
2. Confirmar que existe um fluxo de trabalho real e repetível; nomeá-lo em kebab-case.
3. Estruturar e preencher o `SKILL.md` (Goal, When-to-use, Steps, Validation).
4. Adicionar um delegador de comando enxuto, se necessário.
5. Atualizar o catálogo `.agents/docs/` para corresponder.

## Notas

Para agents, use `/agent-create`. A lógica vive na skill; o comando permanece enxuto.
