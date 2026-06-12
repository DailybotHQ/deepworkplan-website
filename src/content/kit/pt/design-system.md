---
title: Design system
description: "Um addon opcional que dá a qualquer repositório com uma superfície de interface voltada ao usuário um DESIGN.md (em docs/, indexado a partir do AGENTS.md) — cobrindo os perfis de UI visual, saída de CLI e conversacional em um único arquivo."
kind: addon
lang: pt
order: 4
---

# Addon design-system

Dá a um repositório com uma **superfície de interface voltada ao usuário** um `DESIGN.md` — um arquivo de design system em Markdown que qualquer agente de código lê para gerar saída de interface consistente com as convenções **próprias** do repositório, em vez dos padrões sem estilo e estatisticamente comuns aos quais um agente recorre sem orientação. O quarto addon opcional do Deep Work Plan.

Uma "superfície de interface" é plural: uma **UI visual** renderizada, uma **saída de CLI** estilizada e uma superfície **conversacional** (o produto conversa por chat ou e-mail) contam, cada uma. O addon detecta cada uma de forma independente como um **perfil**, e os perfis aceitos se empilham no mesmo e único `DESIGN.md`.

## O que ele adiciona

- Um `DESIGN.md` em `docs/DESIGN.md` (ao lado das outras especificações do repositório; a raiz do repositório apenas quando não há uma árvore `docs/`), **referenciado a partir do `AGENTS.md`** para que os agentes o descubram como o restante da documentação. Um repositório, um arquivo — nunca arquivos irmãos por superfície.
- **Perfil `visual-ui`** — as seções visuais canônicas: visão geral/atmosfera, paleta de cores e papéis (claro + escuro), tipografia, layout e espaçamento, elevação e profundidade, formas, componentes, comportamento responsivo, o que fazer e o que evitar (incluindo as regras de acessibilidade do repositório).
- **Perfil `cli-output`** — interfaces de terminal estilizadas: voz da saída, cores e estilos semânticos (sucesso/erro/aviso/informação/atenuado mapeados ao tema real), componentes de saída (painéis, tabelas, spinners, prompts interativos — nomeados conforme os helpers reais do repositório), convenções de layout e regras de degradação (TTY vs. pipe, `NO_COLOR`, disciplina de stdout/stderr, códigos de saída).
- **Perfil `conversational`** — a superfície de mensagens do produto: voz e registro (tom, brevidade, regras de uso do nome da marca), anatomia da mensagem (DM, post em canal, resposta em thread, edição no lugar) e renderização por plataforma (mrkdwn do Slack, markdown do Discord, adaptive cards do Teams, e-mail) com alternativas em texto simples.
- Um guia compartilhado de prompts para agentes, mais uma etapa de validação que verifica a integridade de cada perfil: o contraste de texto documentado atende ao WCAG AA (visual), a cor nunca é o único portador de significado (CLI), as renderizações ricas anotam alternativas em texto simples (conversacional) e as referências de tokens resolvem.

## Comportamento

- **Raciocine, não copie.** Cada valor é derivado da fonte real de design do repositório — sua folha de estilos, propriedades CSS personalizadas, configuração do Tailwind, arquivos de tokens, estilos de componentes, seu módulo de exibição/tema de CLI ou seus helpers de composição de mensagens. Ele nunca cola o `DESIGN.md` de uma marca de terceiros nem importa em bloco as convenções de outro produto; catálogos de referência servem de inspiração para a estrutura, nunca para o conteúdo.
- **Reconcilie, não sobrescreva.** Um `DESIGN.md` ou fonte de tokens existente é reconciliado de forma aditiva, nunca sobrescrito; adicionar um perfil recém-aceito anexa suas seções sem reescrever o restante; mudanças destrutivas exigem aprovação.
- **Descoberta por referência.** Onde quer que o `DESIGN.md` resida, o `AGENTS.md` (e o `CLAUDE.md`) o referencia — o ponteiro, não a localização física, é o que garante que os agentes o carreguem.
- **Pragmático, não rígido.** Ele referencia a convenção emergente do `DESIGN.md` como uma forma a seguir, a estende a superfícies não visuais e permanece Markdown-first sem se vincular a nenhum esquema de tokens específico.

## Com escopo de interface, com força por perfil

Este addon é para repositórios com pelo menos uma superfície de interface real; ele nunca é oferecido para um repositório sem nenhuma (uma biblioteca pura, um serviço headless, um repositório apenas de infraestrutura). Cada perfil carrega sua própria força de recomendação:

- **`visual-ui` é ativado por padrão quando detectado** — uma folha de estilos com propriedades CSS personalizadas, uma configuração do Tailwind ou bloco `@theme`, componentes de UI ou um guia de marca/estilo. O onboarding o aplica em modo de confiança e o recomenda fortemente no modo guiado.
- **`cli-output` e `conversational` são recomendados quando detectados — e sempre perguntados, nunca aplicados automaticamente**, mesmo em modo de confiança. Uma biblioteca de renderização de CLI mais uma camada de exibição deliberada sinaliza o primeiro; um SDK de plataforma de chat ou uma camada de composição de mensagens sinaliza o segundo. Um simples parser de argumentos com prints sem formatação não qualifica.

Ele nunca é obrigatório — um repositório com zero addons é totalmente conforme, e você sempre pode recusar qualquer perfil ou o addon inteiro. Um `DESIGN.md` criado antes de os perfis existirem é um arquivo visual de perfil único válido: sem migração.

## Comando opcional

Quando aceito, o addon pode instalar um delegador `/design-system` no `.agents/commands/` do repositório para regenerar ou atualizar o `DESIGN.md` posteriormente. Instalar o comando é opcional; um addon recusado não instala nenhum.

## Relação com documentos de design por funcionalidade

Este é um arquivo de design system **em nível de repositório, persistente** — distinto de um documento de design técnico por funcionalidade (o `design.md` de "requisitos → design → tarefas" dos fluxos de desenvolvimento orientados a especificação vinculados a ferramentas). O Deep Work Plan deliberadamente não fornece um arquétipo separado de documento de design por funcionalidade: o README de um plano, os critérios de aceitação de cada tarefa e os validation gates já cobrem esse papel. Este addon preenche a única lacuna que esse papel não cobre: contexto de design de interface durável e nativo do repositório.
