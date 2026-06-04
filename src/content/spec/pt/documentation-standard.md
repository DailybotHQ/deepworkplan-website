---
title: Padrão de documentação
description: "Padrão normativo de como os Deep Work Plans documentam sua estrutura, tarefas e progresso: regras de README, marcadores de status e as duas tarefas finais obrigatórias."
order: 1
lang: pt
section: Standard
---

# Padrão de documentação

**Versão 1.0.** Este padrão define como os Deep Work Plans documentam sua estrutura, tarefas e progresso. Ele se aplica a todo plano criado sob a metodologia DWP. As palavras-chave MUST, SHOULD e MAY são usadas conforme definidas na RFC 2119.

## README do plano

Todo plano DEVE (MUST) ter um `README.md` contendo:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — uma declaração em prosa do objetivo do plano.
- **Source material** — links ou caminhos para as entradas canônicas (opcional).
- **Tasks** — uma tabela markdown com o número, o nome e uma caixa de status da tarefa.
- **Status** — uma linha no formato `<n>/<total> tasks complete`.

## Arquivos de tarefa

Cada arquivo de tarefa DEVE (MUST) ser chamado `<n>.task_<slug>.md` e conter a anatomia de nove seções.

## PROGRESS.md

O `PROGRESS.md` é um registro de execução somente de adição. Cada entrada DEVE (MUST) registrar:

- Um carimbo de data/hora ISO 8601.
- O número e o nome da tarefa.
- O que foi feito.
- Quaisquer desvios ou motivos de pular.

## Marcadores de status

- `[ ]` — não iniciada.
- `[~]` — em andamento.
- `[x]` — concluída.
- `[!]` — bloqueada.

## Títulos

Todos os títulos DEVEM (MUST) usar sentence case. Os documentos DEVERIAM (SHOULD) evitar linguagem de marketing e pontos de exclamação.

## Duas tarefas finais obrigatórias

Todo plano DEVE (MUST) terminar com duas tarefas padrão:

1. **Skills & Agents Discovery** — identificar as skills e agents reutilizáveis criados.
2. **Executive Report** — um resumo dos resultados para as partes interessadas.
