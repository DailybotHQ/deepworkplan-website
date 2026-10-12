---
title: Herdr
description: "Passe trabalho a outro agente de código em um painel do Herdr, em qualquer máquina, e receba uma única resposta autorizada. Planos que delegam, com registro."
kind: addon
lang: pt
order: 7
---

# Addon Herdr

O [Herdr](https://herdr.dev) coloca agentes de programação em painéis, na sua máquina e nas máquinas que ele alcança por SSH. Este addon permite que um Deep Work Plan use esses agentes como **pares**: um plano pode passar uma tarefa delimitada a um agente em outro painel, receber exatamente uma resposta autorizada e manter um registro da troca.

É um addon opcional do **DWP v7** (`v7.0.0`). A metodologia funciona da mesma forma sem ele: com o addon ausente ou desativado, cada tarefa é executada na sessão atual, exatamente como antes.

## O que ele integra

O addon é um integrador enxuto. O trabalho é feito pelo **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, uma skill independente com licença MIT fixada em **`v0.3.1`**, útil mesmo sem o Deep Work Plan. Ela define o que o próprio Herdr deixa em aberto: quem pode responder, como a resposta encontra o caminho de volta entre máquinas, como dois agentes evitam responder um ao outro para sempre e onde fica o registro de "perguntei, respondeu".

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/herdr-peers`, tag `v0.3.1`, protocolo 1 |
| Chave de registro | `herdr` em `.dwp/config.json` |
| Transporte | interativo: um par em um painel do Herdr |
| Fornece | `subagents`, `cancel_children` |
| Requer | a concessão `agent_delegation` do contrato do plano |

## Instalação

Instale o herdr-peers e a skill oficial do Herdr, da qual ele depende. Toda máquina cujos agentes devam responder também precisa da skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.3.1 --skill herdr-peers -g -y
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

## Contêineres e o host

Com o addon [devcontainer](/kit/devcontainer) sobre o devcontainer-kit `v0.3.5`, todo contêiner dck traz o herdr-peers e entra na malha no `dck up`: seus agentes podem consultar agentes no host, nos outros contêineres e nos outros contêineres loopback do host, e receber a resposta de volta. `dck setup` instala um herdr-peers verificado no host, então os agentes do host também respondem. O listener do host e as chaves extras que deixam outros contêineres entrar são decisões suas no perfil do host do kit; este addon nunca os define. Desde o herdr-peers (`v0.2.3`), cada máquina mantém o próprio estado (`$XDG_STATE_HOME/herdr-peers/<server>/`), então um checkout compartilhado pelo host e por um contêiner não mistura mais os registros de cada um, e desde o devcontainer-kit (`v0.3.3`) o próprio contêiner exporta `HERDR_PEERS_SELF`, então os agentes Codex lá dentro alcançam outras máquinas sem nenhum passo manual.

## Herdr ou agentkit

Os dois addons implementam a mesma interface de delegação — `launch`, `observe`, `collect`, `cancel` — com transportes diferentes.

| Situação | Usar |
|---|---|
| Uma tarefa `parallel_safe` delimitada com uma saída declarada | [agentkit](/kit/agentkit) (`ak run` headless em uma worktree) |
| A tarefa precisa de interação, é longa ou fica em outra máquina | Herdr (um par em um painel) |

Para um líder que executa muitas frentes ao mesmo tempo — painéis no host, em contêineres e em outras máquinas, cada um na própria conta —, `herdr-peers lanes` lista cada frente com seu estado, `herdr-peers status <pane>` classifica a tela em que uma frente bloqueada está, e cada registro de delegação nomeia a conta e o fornecedor que o realizaram. Veja [Executar muitos agentes](/methodology/06-orchestration).

**Lanes do Codex nomeiam seu painel.** O Codex executa os comandos de uma lane a partir de um servidor em segundo plano compartilhado por todas as sessões daquela conta, então o id de painel herdado pode ser de outra lane. Uma lane do Codex passa o próprio painel, tirado do briefing do líder, com `--pane <pane>` em cada verbo do herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Avisos e liderança

O herdr-peers `v0.3.1` acrescenta o que permite a um enxame sobreviver ao seu líder ([Autonomia do enxame](/methodology/07-swarm-autonomy)):

- **Avisos.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` envia uma mensagem de mão única com o selo `reply=no`. O `check` do receptor a classifica como aviso, registra-a como dado e nunca responde. Avisos não consomem nenhuma vaga de fan-out e podem ser enviados enquanto uma consulta está aberta; use-os para anúncios de repasse, mudanças de líder e difusões de release.
- **Um registro de líder por plano.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` torna um agente o líder de um plano; `lead show` imprime o registro (schema `herdr-peers/lead-v1`: plano, líder, época, sucessão, frentes, hora de atualização). `lead handover <addr> --plan <P>` repassa a liderança, `lead takeover --plan <P>` permite que o primeiro suplente alcançável a assuma quando o líder sumiu, e `lead release --plan <P>` a encerra. Cada mudança incrementa a época e avisa todas as frentes.
- **Isolamento (fencing).** Uma frente aceita um aviso de líder apenas do agente que lhe deu o briefing (primeira reivindicação), do líder atual na época seguinte (passagem) ou da primeira entrada alcançável da sucessão na época seguinte (tomada). Todo o resto é registrado e ignorado, e um líder que volta e vê uma época maior se retira.
- **O endereço `lead`.** `ask lead …` e `notify lead …` resolvem para o líder atual de `--plan` (senão, de `$DWP_PLAN`), então nenhum briefing de frente fixa no código o painel do líder.
- **Telas `usage_limit`.** `status` e `lanes` reconhecem a mensagem de limite de uso de uma CLI como a classe de tela `usage_limit`, cujo próximo passo é um repasse. Ela nunca recebe teclas. `lanes --json` acrescenta o plano, seu líder, a época e a última capacidade reportada de cada frente.

As frentes também podem consultar umas às outras para obter informação e coordenação — uma interface, o nome de uma flag, o estado de um branch —, mas só o líder atribui trabalho. A profundidade 1 e o limite de fan-out continuam valendo. Com a `v0.2.x` não há avisos nem registros de líder: as frentes consultam o endereço do líder que consta no seu briefing, e uma mudança de líder é retransmitida pelo desenvolvedor.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais, e nenhum fluxo depende deste. A ida e volta entre dois painéis e entre máquinas é coberta por testes contra um Herdr simulado; planeje uma primeira execução supervisionada.
