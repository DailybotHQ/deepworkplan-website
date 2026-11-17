---
title: Loop engineering
description: "Como um daemon iniciado por uma pessoa mantém planos Deep Work aprovados em andamento com registro, sucessão, avisos e eventos dentro da autoridade registrada."
order: 8
lang: pt
summary: O ciclo de vida completo que mantém um plano aprovado em andamento dentro da autoridade registrada.
icon: repeat
---

# Loop engineering

**Especificação primeiro, loop fechado: o repositório é o harness e o plano se executa sozinho até a conclusão.** Este capítulo descreve o mecanismo opcional que mantém um plano em andamento após seu primeiro turno de execução. O plano continua sendo a especificação durável; o loop oferece continuidade, não nova autoridade.

## Registrar o plano

Quando o addon Herdr está habilitado, o fluxo `execute` do pacote reivindica o registro de lead do plano (e `resume` o reivindica de novo), acrescentando uma sucessão quando o plano nomeia sucessores; a substituição automática só funciona com uma sucessão registrada. Esse registro dá ao loop um plano preciso, o lead atual, a época e a ordem dos sucessores a observar. Planos sem registro de lead não são acompanhados. O addon continua opcional: sem ele, a metodologia central ainda funciona em uma sessão ou por uma passagem coordenada por uma pessoa.

Registrar o plano não aprova o trabalho nem amplia a autorização do plano. No v8, um plano aprovado vai até o fim dentro da autoridade registrada nesse plano. Seus critérios de aceitação e gates continuam obrigatórios durante toda a execução.

## Iniciar o daemon manualmente

Uma pessoa inicia `herdr-peers autopilot --loop` em um ambiente Herdr. É um daemon local em segundo plano, não um item de login nem um serviço do sistema. Ele acompanha os planos registrados nas máquinas habilitadas e avisa um lead ocioso para continuar quando seu plano permanece aberto, nenhuma faixa está trabalhando e não há resposta pendente. O aviso é fixo: continuar o plano aprovado até o fim, respeitando seus gates e a autoridade registrada.

O daemon não toca em login, pedido de credenciais nem na confirmação do modo de ignorar permissões do Claude. Ele nunca escolhe uma recusa, uma opção de texto livre nem uma linha que amplie as permissões de um agente. Um aviso apenas pede que um agente continue; não acrescenta autoridade. O lead continua registrando bloqueios e seguindo os gates do plano. Após três avisos sem progresso, o daemon para de avisar e informa `plan_stalled`.

## Manter a liderança protegida

Se o lead desaparecer, o daemon pede ao primeiro sucessor alcançável da lista que execute o procedimento de substituição. O registro de lead avança de época, e os destinatários aplicam a ordem de sucessão. O protocolo 2 também permite nomear um lead, mas somente quando a pessoa registrou a concessão no plano (`lead claim --allow-appointment`) e iniciou o daemon com `--appoint`; o daemon não pode conceder essa permissão a si mesmo. Antes de qualquer merge, tag ou release, o lead atual executa `herdr-peers lead verify --plan <id>` para conferir o registro nas máquinas do plano.

Um sucessor herda o plano e seus gates. Nem a sucessão nem a nomeação alteram critérios de aceitação ou permitem trabalho fora da autoridade registrada. Se o plano chegar a um gate que exige ação humana segundo suas regras C1–C7, o loop informa a necessidade e para nesse gate. Credenciais e logins também continuam sendo ações humanas. Para o restante do progresso, a pessoa é notificada em vez de precisar acompanhar cada etapa.

## Cérebro e fila opcionais

A opção `--brain` inicia um agente de decisão dedicado para os casos que as regras do daemon não conseguem resolver. Ela exige coding-agents-kit 1.3.0 ou posterior; sem ele, um daemon iniciado com `--brain` se recusa a iniciar. O cérebro só pode escolher de uma lista fechada de ações que o daemon fixa para cada caso: mais um aviso, um único pedido fixo ao lead para resolver um bloqueio que o plano marca como resolúvel pelo lead, avisar a pessoa ou deixar como está. O daemon continua sendo o único ator: valida a escolha e realiza uma ação elegível; nunca executa texto livre do cérebro. No v8, um plano também registra em seu bloco de autonomia se um cérebro pode agir sobre ele.

A fila de planos usa o documento `dwp-queue-v1` em `.dwp/queue.json`. A ferramenta de planos o escreve; o daemon é um consumidor limitado e somente leitura. Um plano na fila fica elegível quando sua dependência `after` está concluída (ou não existe) e sua aprovação continua válida. O daemon só o inicia enviando um único aviso fixo ao lead indicado pela fila: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Uma entrada `launch` não é iniciada por este loop. O pacote mantém o estado da fila à medida que a execução e a finalização avançam.

## Informar e observar

Os eventos do plano cobrem um plano que estagna, é bloqueado, perde o lead ou é concluído, e um plano da fila que começa ou não consegue começar. O comando opcional `--notify` recebe um objeto `plan-event-v1` para os eventos compatíveis; o notificador do Dailybot do pacote os transforma em atualizações para a equipe. As notificações informam progresso ou um bloqueio; não autorizam ações nem substituem o registro do plano.

O relatório da frota e `herdr-peers fleet ui` mostram agentes e planos em várias máquinas, inclusive o trabalho que precisa de atenção. A interface é somente leitura: não grava estado de plano nem envia avisos a agentes. Ela ajuda uma pessoa a ver o estado do loop sem se tornar outro plano de controle.

## O limite

O loop engineering fecha o loop de execução em torno de uma especificação aprovada. Ele torna rotineiras a continuação, a sucessão e os relatórios, enquanto o plano continua sendo a autoridade e o daemon permanece limitado. A pessoa inicia o daemon, cuida de credenciais e logins e resolve somente os gates C1–C7 do próprio plano ou outras necessidades que a autoridade registrada não consegue cobrir. O objetivo do loop é que um plano aprovado alcance seu fim definido sem que ninguém precise acompanhá-lo.
