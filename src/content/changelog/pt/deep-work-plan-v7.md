---
title: "DWP v7: planos que delegam, com registro de tudo"
description: "O Deep Work Plan v7 mantém o contrato e o diário da v6, permite que um plano delegue tarefas delimitadas a outros agentes e adiciona quatro addons opcionais."
date: 2026-10-09
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
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
---

O Deep Work Plan v7 mantém o método da v6: o contrato é a autoridade, o diário somente de acréscimo é a memória, o agendador decide o que executa em seguida e uma tarefa só é encerrada quando a evidência registrada satisfaz seus critérios. A v7 acrescenta a capacidade de delegar e mantém a mesma disciplina em relação ao resultado.

Um plano que concede `agent_delegation` pode marcar uma tarefa como `parallel_safe` e entregá-la a outro agente. A resposta do delegado é registrada como dado, nunca como instruções, e permanece `asserted` até que o executor de gates do próprio plano observe o resultado. Somente o executor gera evidência `observed`, de modo que a delegação amplia o alcance sem rebaixar o padrão para concluir uma tarefa.

Quatro addons opcionais transformam a delegação em autonomia prática. O Herdr entrega uma tarefa a um agente em um painel, em qualquer máquina. O Agentkit coloca um único comando `ak` sobre todos os agentes de programação de terminal, com autonomia por padrão e opção de desativá-la, e executa tarefas delimitadas sem interface em um worktree do git. O Devcontainer dá a cada repositório um contêiner reproduzível sem nenhuma chave SSH em seu interior por padrão (git sobre SSH através do agente do host; arquivos de chave apenas mediante adesão explícita com `[ssh] copy_keys`). O DeepWorkPlan Vim é um editor de terminal com navegador de planos e visualizador de Markdown. Cada um é fixado por tag a um produto com repositório próprio e funciona sem o Deep Work Plan. Um repositório é totalmente conforme sem nenhum deles, e o registro em `.dwp/config.json` indica quais estão habilitados.

O modo de benchmark e aprendizados registra o que cada plano ensina, para que as descobertas possam ser analisadas depois. Uma auditoria de todo o ecossistema, executada como um plano orquestrador v7 com um agente por repositório, não encontrou nenhuma regressão de comportamento em relação à v6: a suíte do pacote passa 807 de 807 em um ambiente limpo, e a carga de instruções cresceu entre 0.1% e 3.9% por fluxo (4.6% para o pacote inteiro), medida em bytes nas duas tags e não estimada como tokens.

A v7 representa um salto em orquestração e auditabilidade, mas ainda não é autonomia totalmente sem supervisão. A versão 7.2.0 fecha as lacunas que essa auditoria encontrou: o benchmark e os aprendizados agora medem os planos v7, iniciar uma tarefa antes de seus pré-requisitos estarem completos é recusado, e a suíte de testes roda de forma hermética (815 de 815 em um ambiente limpo). A não inferioridade dos resultados dos agentes não foi medida. Os planos existentes mantêm a geração registrada e nunca são migrados implicitamente; os planos novos usam o contrato v7 por padrão.

A versão 7.6.0 (2026-10-11) introduziu a orquestração em escala: faixas (lanes), execução multiconexão/multiconta (`ak capacity`), inicialização autônoma e integração com todos os addons que detecta ferramentas existentes e oferece atualizações.

A versão 7.7.0 (2026-10-12) entregou a autonomia de enxame (Guia §17): o loop de capacidade (`shared/swarm.py`), pacotes de transferência (`dwp-handoff-v1`), sucessão de liderança com épocas e isolamento, solicitações entre faixas, a taxonomia de escalonamento de AGENT_PROTOCOL §7.5 (C1–C7: decidir e registrar tudo o mais), o padrão de qualidade (portas são hipóteses, verificadas e não apenas afirmadas) e aprendizados metodológicos de 313 planos executados em 23 repositórios. Limite conhecido (LEAD-12): o diário v7 não possui evento dedicado para transferência de faixa ou sucessão de líder (registrado como delegação cancelada mais uma observação).

A versão 7.8.0 (2026-10-13) estabeleceu o Ecosystem 1.0: cada produto integrado pelo pacote atingiu seu primeiro lançamento semver estável (coding-agents-kit v1.0.0, herdr-peers v1.0.0, devcontainer-kit v1.0.0, deepworkplan-vim v1.0.0, ai-diff-reviewer v3.3.14 e Dailybot agent-skill v3.23.17) com resumos SHA256SUMS verificados, seguido da 7.8.1 (2026-10-14) fixando os patches 1.0.1.

Versão da skill instalada: **7.8.1**, estável desde a 7.0.0.
