---
title: Addons
description: "Extensões opcionais à metodologia DWP central: skills, agents, presets, adaptadores e exemplos, e como cada um amplia o fluxo de trabalho sem ser obrigatório."
order: 5
lang: pt
section: Addons
---

# Addons

**Versão 1.0.** Os addons são extensões opcionais à metodologia DWP central. Eles não são exigidos para a conformidade, mas fornecem capacidades adicionais.

## Skills

Skills são procedimentos reutilizáveis invocados pelo nome. Uma skill empacota um fluxo de trabalho repetível (executar testes, corrigir lint, criar um componente).

A metodologia fornece um pequeno conjunto de sub-skills centrais. Entre elas, a sub-skill **author** permite que um repositório **faça crescer seu próprio kit**: invocada por meio de `/skill-create` e `/agent-create`, ela raciocina sobre o layout e as convenções existentes em `.agents/` do repositório, e então cria uma nova skill, agent ou delegador de comando enxuto que combine com eles, mantendo o catálogo em sincronia. A mesma sub-skill executa a tarefa obrigatória Skills & Agents Discovery.

## Agents

Agents são trabalhadores especializados com um papel definido (reviewer, executor, architect).

## Addons de manutenção

Os addons de manutenção são extensões opcionais, nunca exigidas para a conformidade, que ajudam um repositório a se manter. O addon **dependency-upgrade** raciocina sobre o gerenciador de pacotes real do repositório (em vez de presumir npm) e atualiza as dependências em lotes pequenos, validados e reversíveis: ele detecta o gerenciador a partir do manifesto e do lockfile reais, classifica as atualizações por semver, atualiza em lotes, executa o validation gate real do repositório após cada lote, reverte qualquer lote que falhe e resume sem comitar automaticamente. Um addon só é instalado quando é aceito durante o onboarding.

## Presets

Presets adaptam o DWP a uma stack tecnológica específica (Django, React, Go).

## Adaptadores

Adaptadores mapeiam os comandos do DWP para o sistema de comandos de um agente específico (Claude Code, Cursor, Codex).

## Exemplos

Exemplos demonstram o DWP na prática (comparações de antes e depois, planos de amostra, estudos de caso).
