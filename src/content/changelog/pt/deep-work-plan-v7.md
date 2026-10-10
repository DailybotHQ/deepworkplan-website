---
title: "DWP v7: planos que delegam, com registro de tudo"
description: "O Deep Work Plan v7 mantém o contrato e o diário da v6, permite que um plano delegue tarefas delimitadas a outros agentes e adiciona quatro addons opcionais."
date: 2026-10-10
version: "v7 · Delegação com evidência"
kind: release
lang: pt
order: 0
featured: true
sourceLabel: "Conjunto de esquemas v7 publicado"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
---

O Deep Work Plan v7 mantém o método da v6: o contrato é a autoridade, o diário somente de acréscimo é a memória, o agendador decide o que executa em seguida e uma tarefa só é encerrada quando a evidência registrada satisfaz seus critérios. A v7 acrescenta a capacidade de delegar e mantém a mesma disciplina em relação ao resultado.

Um plano que concede `agent_delegation` pode marcar uma tarefa como `parallel_safe` e entregá-la a outro agente. A resposta do delegado é registrada como dado, nunca como instruções, e permanece `asserted` até que o executor de gates do próprio plano observe o resultado. Somente o executor gera evidência `observed`, de modo que a delegação amplia o alcance sem rebaixar o padrão para concluir uma tarefa.

Quatro addons opcionais transformam a delegação em autonomia prática. O Herdr entrega uma tarefa a um agente em um painel, em qualquer máquina. O Agentkit coloca um único comando `ak` sobre todos os agentes de programação de terminal, com autonomia por padrão e opção de desativá-la, e executa tarefas delimitadas sem interface em um worktree do git. O Devcontainer dá a cada repositório um contêiner reproduzível sem nenhuma chave SSH em seu interior. O DeepWorkPlan Vim é um editor de terminal com navegador de planos e visualizador de Markdown. Cada um é fixado por tag a um produto com repositório próprio e funciona sem o Deep Work Plan. Um repositório é totalmente conforme sem nenhum deles, e o registro em `.dwp/config.json` indica quais estão habilitados.

O modo de benchmark e aprendizados registra o que cada plano ensina, para que as descobertas possam ser analisadas depois. Uma auditoria de todo o ecossistema, executada como um plano orquestrador v7 com um agente por repositório, não encontrou nenhuma regressão de comportamento em relação à v6: a suíte do pacote passa 807 de 807 em um ambiente limpo, e a carga de instruções cresceu entre 0.1% e 3.9% por fluxo (4.6% para o pacote inteiro), medida em bytes nas duas tags e não estimada como tokens.

A v7 representa um salto em orquestração e auditabilidade, mas ainda não é autonomia totalmente sem supervisão. O ciclo de benchmark e aprendizados ainda não mede automaticamente os planos v7, e a não inferioridade dos resultados dos agentes não foi medida. Os planos existentes mantêm a geração registrada e nunca são migrados implicitamente; os planos novos usam o contrato v7 por padrão.

Versão da skill instalada: **7.1.4**, estável desde a 7.0.0.
