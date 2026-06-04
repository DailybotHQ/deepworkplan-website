---
title: agent-create
description: "Criar um novo agent no repositório atual — um trabalhador especializado com seu próprio nível de modelo e ferramentas — via a sub-skill author, mantendo o catálogo em sincronia."
kind: command
lang: pt
order: 8
usage: /agent-create
---

# agent-create

Cria um novo agent no repositório atual. Um delegador enxuto para a sub-skill **author** do Deep Work Plan.

## O que faz

O `agent-create` encaminha para o fluxo de criação de agent da sub-skill author. Um agent é uma definição de trabalhador especializado (papel, nível de modelo, ferramentas, prompt de sistema) acionado para lidar com uma classe de tarefas. Ele codifica "quem faz X" e vive em `.agents/agents/<name>.md`.

## Uso

```
/agent-create
```

## Comportamento

1. Detectar o layout `.agents/` do repositório e as convenções locais.
2. Confirmar um papel recorrente com necessidades distintas de modelo/ferramentas; nomeá-lo em kebab-case.
3. Estruturar e preencher o agent (Role, Inputs, Process, Output, escalonamento).
4. Escolher um nível de modelo justificado — leve, padrão ou pesado — sem fixar IDs de modelos de fornecedores no código.
5. Atualizar o catálogo `.agents/docs/` para corresponder.

## Notas

Para procedimentos, use `/skill-create`. Mantenha os níveis de modelo abstratos e mapeie-os na configuração do repositório.
