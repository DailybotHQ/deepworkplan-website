---
title: "DWP v6: a mesma metodologia, um contrato mais rigoroso"
description: "Deep Work Plan v6 mantém a metodologia v5 e acrescenta uma estrutura de execução mais rigorosa. A não inferioridade dos resultados dos agentes não foi medida."
date: 2026-09-28
version: "v6 · Estrutura mais rigorosa"
kind: release
lang: pt
order: 1
featured: true
sourceLabel: "Conjunto de esquemas v6 publicado"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 mantém a metodologia v5, a superfície de comandos e o local `.dwp/plans/`. Acrescenta uma estrutura mais rigorosa para representar autoridade do plano, evidências de execução, contexto de cada tarefa, agendamento e estado ativo.

O conjunto de esquemas v6 define o manifesto de identidade, o contrato de resultados e autoridade, os eventos do diário apenas de acréscimo, o manifesto de contexto por tarefa e o snapshot ativo. A projeção ativa do v6 é um snapshot, então `plan-state/v5.json` continua sendo o esquema de estado para planos v5; não existe `plan-state/v6.json`. Os planos existentes mantêm a geração registrada e nunca são reescritos silenciosamente.

A decisão de arquitetura é GO: v6 mantém a mesma metodologia com estrutura de engenharia mais rigorosa. Isso não é uma afirmação de superioridade empírica. A não inferioridade dos resultados dos agentes não foi medida.

Os novos planos recebem IDs numéricos monotônicos com pelo menos três dígitos (por exemplo, `PLAN_001_add_payment_webhooks/`). Como os esquemas v5 congelados contam o ID numérico como uma palavra, os slugs v5 têm 2–4 palavras; os slugs v6 têm 2–5. As pastas existentes sem numeração `PLAN_<slug>/` continuam legíveis e nunca são renomeadas. Quando há planos numerados, `latest` resolve para o plano com o maior ID numérico.
