---
title: "Estudo de caso: este site"
description: "Como o próprio deepworkplan.com funciona com o Deep Work Plan — um relato real de um repositório Astro de produção tornado AI-first com a metodologia que ele documenta."
kind: example
lang: pt
order: 2
---

# Estudo de caso: este site

O site que você está lendo funciona com a metodologia que ele documenta. Ele faz dogfooding do Deep Work Plan: a mesma skill, o mesmo fluxo `/init`, os mesmos planos `.dwp/` que qualquer outro repositório usaria. Este é um relato real, não uma hipótese.

## Antes

Como a maioria dos repositórios, este não foi construído para agentes. O contexto vivia na cabeça das pessoas e em notas dispersas, não havia uma única fonte de verdade que um agente pudesse ler, e fazer o onboarding de um novo agente significava reexplicar o projeto a cada sessão. O trabalho de longo prazo derivava.

## Adotando o DWP

O repositório foi tornado AI-first com um único Deep Work Plan, decomposto em tarefas atômicas com validation gates:

1. Instalar a skill Deep Work Plan como uma instalação de referência, fixada por `skills-lock.json`.
2. Executar o onboarding para gerar um `AGENTS.md` fundamentado, a árvore `docs/` e docs por módulo a partir da stack real do repositório.
3. Construir o kit `.agents/` multiagente — delegadores de comando `dwp-*` enxutos e um catálogo que corresponde ao que está em disco.
4. Estruturar o espaço de trabalho `.dwp/` ignorado pelo git para planos e rascunhos.
5. Verificar a conformidade com `/dwp-verify`.

Cada tarefa foi validada contra os gates reais do repositório — `biome`, `astro:check`, a suíte de testes, o build de produção e a verificação de paridade dos endpoints de agente — antes de ser marcada como concluída.

## Depois

O repositório agora é AI-first pela sua própria especificação: um `AGENTS.md` fundamentado, uma árvore `docs/` categorizada, um kit `.agents/` multiagente e um espaço de trabalho `.dwp/` ignorado pelo git. Qualquer agente — Claude Code, Cursor, Codex, Gemini, Copilot — pode abri-lo, ler o harness e executar planos de longo prazo sem acompanhamento manual a cada sessão.

## Resultado

A metodologia prova seu valor na sua própria origem: este site é construído e mantido da mesma forma que ele lhe diz para construir o seu — seguindo o [`/init.md`](/init.md). Se o padrão funciona aqui, em produção, ele funciona também para o seu repositório.
