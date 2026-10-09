---
title: Herdr
description: "Addon opcional da v7: um plano passa uma tarefa a outro agente de código num painel do Herdr, em qualquer máquina, e registra sua única resposta autorizada."
kind: addon
lang: pt
order: 7
---

# Addon Herdr

O [Herdr](https://herdr.dev) coloca agentes de programação em painéis, na sua máquina e nas máquinas que ele alcança por SSH. Este addon permite que um Deep Work Plan use esses agentes como **pares**: um plano pode passar uma tarefa delimitada a um agente em outro painel, receber exatamente uma resposta autorizada e manter um registro da troca.

É um addon opcional do **DWP v7** (`v7.0.0`). A metodologia funciona da mesma forma sem ele: com o addon ausente ou desativado, cada tarefa é executada na sessão atual, exatamente como antes.

## O que ele integra

O addon é um integrador enxuto. O trabalho é feito pelo **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, uma skill independente com licença MIT fixada em **`v0.1.0`**, útil mesmo sem o Deep Work Plan. Ela define o que o próprio Herdr deixa em aberto: quem pode responder, como a resposta encontra o caminho de volta entre máquinas, como dois agentes evitam responder um ao outro para sempre e onde fica o registro de "perguntei, respondeu".

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protocolo 1 |
| Chave de registro | `herdr` em `.dwp/config.json` |
| Transporte | interativo: um par em um painel do Herdr |
| Fornece | `subagents`, `cancel_children` |
| Requer | a concessão `agent_delegation` do contrato do plano |

## Instalação

Instale o herdr-peers e a skill oficial do Herdr, da qual ele depende. Toda máquina cujos agentes devam responder também precisa da skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Requisitos: Herdr 0.9.1 ou mais recente, `bash` e `python3` 3.9 ou mais recente (apenas a biblioteca padrão). O onboarding oferece o addon e registra sua resposta no registro de addons; ele nunca é ativado sem consentimento.

## O que ele adiciona a um plano

- **Delegação a um par.** Em um plano v7 cujo contrato concede `agent_delegation`, o `execute` pode passar uma tarefa `parallel_safe`, ou uma pergunta somente leitura, a um agente em outro painel, nesta máquina ou em outra.
- **Uma resposta autorizada.** A solicitação leva um carimbo que autoriza exatamente uma resposta. O par responde uma vez por meio do helper, e a resposta leva um carimbo próprio.
- **Um registro antes de confiar.** Cada delegação é gravada em `analysis_results/delegations.ndjson` do plano antes de a resposta ser usada, e corresponde ao evento de diário `delegation` da v7.
- **Os resultados continuam sendo alegações até serem verificados.** A resposta de um par é evidência `asserted` até que o próprio executor de gates do plano a observe. Ela nunca fecha uma tarefa sozinha.

## Modelo de segurança

| Regra | O que significa |
|---|---|
| Concessão primeiro | A delegação só é executada quando o contrato do plano concede `agent_delegation`. |
| Limite de profundidade 1 | Uma mensagem carimbada com `depth=1` ou `reply-to=` nunca é respondida, e um delegado nunca delega. |
| Limite de fan-out | No máximo quatro pares por solicitante, por padrão. |
| Dados, não instruções | Uma resposta nunca concede uma autoridade que o receptor já não tivesse. |
| Um escritor por caminho | Um par que escreve trabalha em sua própria worktree git. |

O herdr-peers não autentica o remetente: o campo `from=` de um carimbo é uma alegação. A mitigação é a lista de permissões `HERDR_PEERS_SCOPE`, que limita os workspaces e as máquinas que um par aceita.

## Herdr ou agentkit

Os dois addons implementam a mesma interface de delegação — `launch`, `observe`, `collect`, `cancel` — com transportes diferentes.

| Situação | Usar |
|---|---|
| Uma tarefa `parallel_safe` delimitada com uma saída declarada | [agentkit](/kit/agentkit) (`ak run` headless em uma worktree) |
| A tarefa precisa de interação, é longa ou fica em outra máquina | Herdr (um par em um painel) |

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais, e nenhum fluxo depende deste. A ida e volta entre dois painéis e entre máquinas é coberta por testes contra um Herdr simulado; planeje uma primeira execução supervisionada.
