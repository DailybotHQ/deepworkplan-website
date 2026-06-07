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

## Addon design-system

O addon **design-system** é uma extensão opcional, com escopo de frontend, que dá a um repositório um `DESIGN.md` — um arquivo de design system em Markdown que qualquer agente de código lê para gerar UI consistente com o design system próprio do repositório. Ele raciocina sobre os tokens de design reais do repositório (propriedades CSS personalizadas, uma configuração do Tailwind, arquivos de tokens, estilos de componentes) em vez de copiar um arquivo de marca, e documenta as seções canônicas: cores e papéis (claro e escuro), tipografia, layout e espaçamento, elevação, formas, componentes, comportamento responsivo, o que fazer e o que evitar (incluindo as regras de acessibilidade do repositório) e um guia de prompts para agentes. Ele verifica o contraste WCAG AA e a integridade dos tokens, e reconcilia um `DESIGN.md` existente em vez de sobrescrevê-lo.

O arquivo reside em `docs/DESIGN.md`, ao lado das outras especificações do repositório, e é referenciado a partir do `AGENTS.md` para que os agentes o descubram da mesma forma que descobrem o restante da documentação (a raiz do repositório é usada apenas quando não há uma árvore `docs/`). A descoberta é por referência, não pela localização física. O addon é **ativado por padrão quando detectado**: quando uma superfície de UI está presente, o onboarding o aplica em modo de confiança e o recomenda fortemente no modo guiado; ele nunca é oferecido para um repositório de backend, CLI ou apenas biblioteca, e um repositório com zero addons permanece totalmente conforme.

Este arquivo de design system em nível de repositório é distinto de um documento de design técnico por funcionalidade (o `design.md` de "requisitos → design → tarefas" dos fluxos de desenvolvimento orientados a especificação vinculados a ferramentas). O DWP não fornece um arquétipo separado de documento de design por funcionalidade: o README de um plano, os critérios de aceitação de cada tarefa e os validation gates já cobrem esse papel. O addon preenche a única lacuna que esse papel não cobre: contexto de design de UI durável e nativo do repositório.

## Presets

Presets adaptam o DWP a uma stack tecnológica específica (Django, React, Go).

## Adaptadores

Adaptadores mapeiam os comandos do DWP para o sistema de comandos de um agente específico (Claude Code, Cursor, Codex).

## Exemplos

Exemplos demonstram o DWP na prática (comparações de antes e depois, planos de amostra, estudos de caso).
