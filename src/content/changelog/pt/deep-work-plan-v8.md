---
title: "DWP v8: spec-first, com o ciclo fechado"
description: "Deep Work Plan v8 reúne planos spec-first, o repositório como harness, Loop engineering e eficiência medida; o ciclo conclui planos aprovados."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: pt
order: 0
featured: true
sourceLabel: "Versões marcadas e rascunho do contrato v8"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
sourceLinks:
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
---

Deep Work Plan v8 reúne quatro ideias: desenvolvimento spec-first, o repositório como harness do agente, Loop engineering e eficiência medida. A frase de trabalho é: “Spec-first, com o ciclo fechado: o repositório é o harness e o plano segue sozinho até terminar.”

## Os quatro pilares

1. **Spec-first:** plano e especificação como fonte duradoura, com aceitação e validação explícitas. 2. **O repositório é o harness:** contexto, ferramentas, controle e estado retomável ficam junto ao código. 3. **Loop engineering:** plano aprovado avança pelo ciclo registrado até terminar. 4. **Eficiência medida:** bytes de instrução por fluxo e caminho público de medição; sem porcentagens de tokens inferidas.

## O que significa Loop engineering

O plano registra um líder e uma sucessão ordenada. Uma pessoa inicia o daemon opcional do Herdr com herdr-peers autopilot --loop; os avisos pedem continuidade sem conceder nova autoridade. Se o líder faltar, um sucessor listado pode assumir. Eventos chegam ao notificador Dailybot do pacote, e a visão da frota mostra agentes e planos nas máquinas habilitadas. A pessoa inicia o daemon; Herdr é opcional.

## Versões que carregam a infraestrutura

O fortalecimento do pacote v7.11.0 e o registro de planos e notificações v7.12.x fornecem a infraestrutura. herdr-peers v1.3.x adiciona ciclo, relatórios e visão da frota; v2.0.0 adiciona brain do protocolo 2 e consumidor da fila. coding-agents-kit v1.3.0 fornece o contrato pick-v2 e v1.4.0 o atualizador verificado. Versões marcadas acima; addons são opcionais.

## Contrato v8 — RE-VERIFY AT 8.0.0

O rascunho origin/feat/v8-line adiciona autonomy ao plan-contract/v8: limite de estagnação, painéis notificáveis, destinos, permissão do brain e comportamento da fila. Define ainda dwp-queue-v1 para .dwp/queue.json; o pacote escreve a fila e Herdr a consome. Claims provisórias: conferir com artefatos marcados de 8.0.0 antes da publicação.
