---
title: Design system
description: "Um addon opcional, com escopo de frontend, que dá ao repositório um DESIGN.md (em docs/, indexado a partir do AGENTS.md) para que qualquer agente gere UI consistente com o design system do próprio repositório."
kind: addon
lang: pt
order: 4
---

# Addon design-system

Dá a um repositório de frontend/UI um `DESIGN.md` — um arquivo de design system em Markdown que qualquer agente de código lê para gerar UI consistente com o design system **próprio** do repositório, em vez dos padrões sem estilo e estatisticamente comuns aos quais um agente recorre sem orientação. O quarto addon opcional do Deep Work Plan.

## O que ele adiciona

- Um `DESIGN.md` em `docs/DESIGN.md` (ao lado das outras especificações do repositório; a raiz do repositório apenas quando não há uma árvore `docs/`), **referenciado a partir do `AGENTS.md`** para que os agentes o descubram como o restante da documentação.
- As seções canônicas: visão geral/atmosfera, paleta de cores e papéis (claro + escuro), tipografia, layout e espaçamento, elevação e profundidade, formas, componentes, comportamento responsivo, o que fazer e o que evitar (incluindo as regras de acessibilidade do repositório) e um guia de prompts para agentes.
- Uma etapa de validação que verifica se o arquivo está completo, se o contraste de texto documentado atende ao WCAG AA e se as referências de tokens resolvem.

## Comportamento

- **Raciocine, não copie.** Cada valor é derivado da fonte real de design do repositório — sua folha de estilos, propriedades CSS personalizadas, configuração do Tailwind, arquivos de tokens ou estilos de componentes. Ele nunca cola o `DESIGN.md` de uma marca de terceiros; catálogos de referência servem de inspiração para a estrutura, nunca para o conteúdo.
- **Reconcilie, não sobrescreva.** Um `DESIGN.md` ou fonte de tokens existente é reconciliado de forma aditiva, nunca sobrescrito; mudanças destrutivas exigem aprovação.
- **Descoberta por referência.** Onde quer que o `DESIGN.md` resida, o `AGENTS.md` (e o `CLAUDE.md`) o referencia — o ponteiro, não a localização física, é o que garante que os agentes o carreguem.
- **Pragmático, não rígido.** Ele referencia a convenção emergente do `DESIGN.md` como uma forma a seguir, mas permanece Markdown-first e não se vincula a nenhum esquema de tokens específico.

## Com escopo de frontend, ativado por padrão quando detectado

Este addon é para repositórios com uma superfície de UI real — uma folha de estilos com propriedades CSS personalizadas, uma configuração do Tailwind ou bloco `@theme`, componentes de UI ou um guia de marca/estilo. Ele **nunca** é oferecido para um repositório de backend, CLI ou apenas biblioteca. Quando uma superfície de UI **é** detectada, o onboarding o trata como **ativado por padrão**: ele aplica o addon em modo de confiança e o recomenda fortemente no modo guiado. Ele nunca é obrigatório — um repositório com zero addons é totalmente conforme, e você sempre pode recusá-lo.

## Comando opcional

Quando aceito, o addon pode instalar um delegador `/design-system` no `.agents/commands/` do repositório para regenerar ou atualizar o `DESIGN.md` posteriormente. Instalar o comando é opcional; um addon recusado não instala nenhum.

## Relação com documentos de design por funcionalidade

Este é um arquivo de design system **em nível de repositório, persistente** — distinto de um documento de design técnico por funcionalidade (o `design.md` de "requisitos → design → tarefas" dos fluxos de desenvolvimento orientados a especificação vinculados a ferramentas). O Deep Work Plan deliberadamente não fornece um arquétipo separado de documento de design por funcionalidade: o README de um plano, os critérios de aceitação de cada tarefa e os validation gates já cobrem esse papel. Este addon preenche a única lacuna que esse papel não cobre: contexto de design de UI durável e nativo do repositório.
