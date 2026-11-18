---
title: "DWP v8: spec-first, com o ciclo fechado"
description: "Deep Work Plan v8 reúne planos spec-first, o repositório como harness, Loop engineering e eficiência medida; o ciclo conclui planos aprovados."
date: 2026-11-16
version: "v8 · Loop engineering"
kind: release
lang: pt
order: 0
featured: true
sourceLabel: "Lançamento do skill v8.0.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
sourceLinks:
  - label: "Lançamento do skill v8.0.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.0"
  - label: "Lançamento do skill v8.0.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.1"
  - label: "Lançamento do skill v8.0.4"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v8.0.4"
  - label: "LOOP_ENGINEERING.md (normativo, v8)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/spec/LOOP_ENGINEERING.md"
  - label: "Loop engineering no leitor da especificação"
    url: "https://deepworkplan.com/spec/loop-engineering"
  - label: "Esquema plan-contract/v8"
    url: "https://deepworkplan.com/schema/plan-contract/v8.json"
  - label: "Esquema journal-event/v8"
    url: "https://deepworkplan.com/schema/journal-event/v8.json"
  - label: "Esquema plan-snapshot/v8"
    url: "https://deepworkplan.com/schema/plan-snapshot/v8.json"
  - label: "Gravador da fila de planos (shared/queue.py)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.0/skills/deepworkplan/shared/queue.py"
  - label: "Lançamento do skill v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Lançamento do skill v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Lançamento do skill v7.12.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.2"
  - label: "herdr-peers v1.3.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v1.3.0"
  - label: "herdr-peers v2.0.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.0.0"
  - label: "herdr-peers v2.1.0"
    url: "https://github.com/DailybotHQ/herdr-peers/releases/tag/v2.1.0"
  - label: "coding-agents-kit v1.3.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.3.0"
  - label: "coding-agents-kit v1.4.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.4.0"
  - label: "coding-agents-kit v1.5.0"
    url: "https://github.com/DailybotHQ/coding-agents-kit/releases/tag/v1.5.0"
  - label: "devcontainer-kit v1.3.0"
    url: "https://github.com/DailybotHQ/devcontainer-kit/releases/tag/v1.3.0"
---

Deep Work Plan v8 reúne quatro ideias: desenvolvimento spec-first, o repositório como harness do agente, Loop engineering e eficiência medida. Sua frase de trabalho é: “Spec-first, loop-closed: o repositório é o harness e o plano segue por conta própria até ser concluído”.

## Os quatro pilares

1. **Spec-first.** O plano e sua especificação são a fonte duradoura da verdade, com critérios de aceitação e verificações de validação explícitos.
2. **O repositório é o harness.** Contexto, ferramentas, regras de controle e estado retomável ficam junto ao código, para que diferentes agentes trabalhem no mesmo repositório.
3. **Loop engineering.** Um plano aprovado pode avançar pelo ciclo de vida registrado até ser concluído.
4. **Eficiência medida.** A eficiência é expressa em bytes de instrução por fluxo, com um caminho de medição publicado; porcentagens de tokens não são inferidas.

## O que significa Loop engineering

O plano registra uma liderança e uma sucessão ordenada. Uma pessoa inicia o daemon opcional do Herdr com `herdr-peers autopilot --loop`; seus avisos pedem que a liderança continue sem conceder nova autoridade. Se a liderança não estiver disponível, o ciclo pode pedir que um sucessor listado assuma. Eventos do plano podem chegar ao notificador Dailybot do pacote, e a visão da frota mostra agentes e planos nas máquinas habilitadas. A pessoa continua responsável por iniciar o daemon, e o addon Herdr é opcional.

## Versões que carregam a infraestrutura

O fortalecimento do pacote v7.11.0 e as versões v7.12.x de registro de planos e notificações fornecem a infraestrutura do plano. herdr-peers v1.3.x adiciona o ciclo, relatórios e visão da frota; v2.0.0 adiciona o brain do protocolo 2 e o consumidor da fila. coding-agents-kit v1.3.0 fornece o contrato de lançamento pick-v2, e v1.4.0 adiciona o atualizador verificado. herdr-peers v2.1.0 lê os bloqueios estruturados do v8, e coding-agents-kit v1.5.0 adiciona a medição de tokens reportados; os descritores de addon do pacote 8.0.0 fixam herdr-peers v2.1.0, coding-agents-kit v1.5.0 e devcontainer-kit v1.3.0. As versões marcadas estão vinculadas acima. O pacote funciona sem esses addons opcionais.

## O contrato v8

A versão 8.0.0 implementa o padrão DWP 8.0.0. Novos planos são criados em `plan-contract/v8`; planos v7, v6 e v5 mantêm a geração registrada e só mudam por meio de uma migração explícita `refine migrate`. Planos v8 mantêm a linha `plan-manifest/v7`, e `journal-event/v7` continua compatível com planos existentes. A fonte normativa é `LOOP_ENGINEERING.md`, junto a três esquemas publicados.

- **O bloco `autonomy`.** Bloco opcional e fechado de `plan-contract/v8` que registra a autoridade do ciclo: `stall_budget` (1–10, padrão 3), painéis `promptable` (padrão: somente a liderança), destinos `notify` (padrão: nenhum), `brain` (padrão: `false`) e `queue` (`prompt-lead`, `launch` ou `none`, padrão `none`). Sem o bloco, todos os padrões se aplicam e a pessoa continua sendo quem resolve.
- **Bloqueios estruturados.** Um bloqueio é um evento `blocker` de `journal-event/v8`, criado e resolvido apenas pelo auxiliar do ledger, com uma tarefa, um motivo, uma linha de `needs`, uma classe obrigatória de C1 a C7 e um resolver opcional. `resolver: lead` é recusado para C1, C2, C5 e C6; o ciclo só pede à liderança que resolva um bloqueio que o próprio plano marcou com `resolver: lead`. `state.json` passa a ser `plan-snapshot/v8`, com o bloqueio ativo e o estado `blocked` derivado; `PROGRESS.md` começa com um cabeçalho de quatro linhas: objetivo, tarefa atual, próxima ação e necessidades.
- **A fila de planos.** `.dwp/queue.json` (`dwp-queue-v1`) é escrita somente por `shared/queue.py` do pacote ou por uma pessoa; `create` acrescenta um plano após a aprovação, e o daemon do Herdr apenas lê. A fila comporta no máximo 64 planos, executa um plano por vez em cada repositório salvo se ele definir `parallel: true`, e uma fila danificada nunca interrompe o ciclo de vida.

A última versão de v7 foi a **7.12.2**.

Versão do skill instalada: **8.0.4**.
