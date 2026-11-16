---
title: Engenharia do ciclo
description: "Como um daemon iniciado por uma pessoa mantém planos Deep Work aprovados por registro, sucessão, avisos e notificações dentro da autoridade registrada."
order: 8
lang: pt
summary: O ciclo completo que mantém um plano aprovado em andamento dentro da autoridade registrada.
icon: repeat
---

# Engenharia do ciclo

**Especificação primeiro, ciclo fechado: o repositório é o harness e o plano segue até o fim.** Este capítulo descreve o mecanismo opcional que mantém um plano em andamento após seu primeiro turno de execução. O plano continua sendo a especificação durável; o ciclo oferece continuidade, não nova autoridade.

## Registrar o plano

Quando o complemento Herdr está habilitado, o fluxo `execute` do pacote reivindica o registro de liderança do plano e registra uma sucessão. Esse registro define o plano, a liderança atual, a época e a ordem de sucessores que o ciclo acompanha. Planos sem registro de liderança não são monitorados. O complemento é opcional: sem ele, a metodologia central funciona em uma sessão ou por coordenação humana.

Registrar o plano não aprova o trabalho nem amplia sua autorização. No v8, um plano aprovado vai até o fim dentro da autoridade registrada no próprio plano. Seus critérios de aceitação e gates continuam valendo durante a execução.

## Iniciar o daemon manualmente

Uma pessoa inicia `herdr-peers autopilot --loop` em um ambiente Herdr. É um daemon local em segundo plano, não um item de login nem um serviço do sistema. Ele acompanha planos registrados nas máquinas habilitadas e avisa uma liderança ociosa para continuar quando o plano permanece aberto, nenhuma lane está trabalhando e não há resposta pendente. O aviso é fixo: continue o plano aprovado até o fim, respeitando seus gates e a autoridade registrada.

O daemon não toca em login, credenciais nem no reconhecimento do modo de permissões ignoradas do Claude. Não escolhe uma recusa, executa texto livre de uma tela nem cria permissões. Um aviso apenas pede que um agente continue; não acrescenta autoridade. A liderança ainda registra bloqueios e segue os gates do plano. Após três avisos sem progresso, o daemon para de avisar e informa `plan_stalled`.

## Manter a liderança protegida

Se a liderança desaparecer, o daemon pede ao primeiro sucessor disponível na lista que execute o procedimento de tomada de liderança. O registro avança uma época, e os destinatários aplicam a ordem de sucessão. O protocolo 2 também permite nomear uma liderança, mas somente após autorização explícita de uma pessoa no plano; o daemon não pode conceder essa permissão. Antes de qualquer merge, tag ou release, a liderança atual executa `herdr-peers lead verify --plan <id>` para conferir o registro nas máquinas do plano.

Um sucessor herda o plano e seus gates. Sucessão e nomeação não alteram critérios de aceitação nem permitem sair da autoridade registrada. Se o plano alcançar um gate que exige ação humana segundo suas regras C1–C7, o ciclo informa a necessidade e para nesse gate. Credenciais e logins também exigem uma pessoa. Para os demais avanços, a pessoa recebe notificações em vez de precisar acompanhar cada etapa.

## Cérebro e fila opcionais

O `--brain` opcional inicia um agente de decisão dedicado para casos que as regras do daemon não resolvem. O cérebro só pode escolher entre ações de uma lista fechada permitida pelo plano. O daemon continua sendo o único ator: valida a escolha e realiza uma ação elegível; nunca executa texto livre do cérebro. Sem autorização explícita no plano, o cérebro não age sobre ele.

A fila usa o documento `dwp-queue-v1` em `.dwp/queue.json`. Somente o pacote pode escrevê-lo; o daemon é um consumidor limitado e somente leitura. Um plano fica elegível quando a dependência `after` termina (ou não existe) e a aprovação continua válida. O daemon só o inicia enviando um aviso fixo à liderança já registrada: “O plano P é o próximo na fila deste repositório e está aprovado; execute-o até o fim, respeitando seus gates.” Este ciclo não inicia itens `launch`. O pacote mantém o estado da fila durante a execução e a finalização.

## Informar e observar

Eventos do plano registram estados como enfileirado, iniciado, bloqueado, parado, perda de liderança e conclusão. O comando opcional `--notify` recebe um objeto `plan-event-v1` para eventos compatíveis; o notificador Dailybot do pacote os transforma em atualizações para a equipe. Notificações informam progresso ou bloqueios: não autorizam ações nem substituem o registro do plano.

O relatório da frota e `herdr-peers fleet ui` mostram agentes e planos em várias máquinas, inclusive trabalho que precisa de atenção. A interface é somente leitura: não grava o estado do plano nem avisa agentes. Ajuda a visualizar o ciclo sem se tornar outro plano de controle.

## O limite

A engenharia do ciclo fecha a execução em torno de uma especificação aprovada. Ela torna rotineiras a continuidade, a sucessão e os relatórios, enquanto o plano mantém a autoridade e o daemon permanece limitado. A pessoa inicia o daemon, cuida de credenciais e logins e resolve somente os gates C1–C7 do plano ou outras necessidades que a autoridade registrada não cubra. O objetivo é um plano aprovado alcançar seu fim definido sem supervisão humana contínua.
