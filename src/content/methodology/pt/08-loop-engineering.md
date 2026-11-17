---
title: Loop engineering
description: "Como um daemon iniciado por uma pessoa leva planos Deep Work aprovados até o fim: registro de lead, avisos, bloqueios, sucessão, reativação, fila e eventos."
order: 8
lang: pt
summary: O ciclo de vida completo que mantém um plano aprovado em andamento dentro da autoridade registrada.
icon: repeat
---

# Loop engineering

**Especificação primeiro, loop fechado: o repositório é o harness e o plano se executa sozinho até a conclusão.** Este capítulo explica o mecanismo opcional que mantém um plano em andamento após seu primeiro turno de execução. O plano continua sendo a especificação durável; o loop oferece continuidade, não nova autoridade.

O texto normativo está na [especificação de loop engineering](/pt/spec/loop-engineering). Este capítulo é o complemento narrativo: percorre o ciclo de vida em ordem e mostra como as peças se encaixam, sem repetir cada MUST.

## Por que um loop

Os dois primeiros pilares do DWP deixam uma lacuna. O planejamento com a especificação primeiro diz *o que* um episódio deve entregar e como é validado. O repositório como harness diz *onde* ficam o contexto, as ferramentas e os gates. Nenhum deles diz *como o trabalho termina* quando o agente que o executa encerra seu turno, atinge um limite de uso ou fecha seu painel. Sem um loop, um plano aprovado e bem especificado ainda espera que alguém digite "continue".

A regra do v8 fecha essa lacuna. Um plano aprovado é executado até a conclusão sem intervenção humana rotineira, dentro da autoridade registrada nesse plano. A pessoa é notificada, não esperada, exceto quando um login ou uma credencial é necessário ou quando um dos próprios gates C1–C7 do plano exige uma contribuição humana que não foi autorizada antecipadamente. Nessas exceções, a execução para no gate até que a contribuição chegue.

O loop é, portanto, um mecanismo de continuação, não de aprovação, e é opcional: a integração com Herdr (herdr-peers `autopilot --loop`) amplifica um método que já funciona em uma única sessão.

## O ciclo de vida em resumo

Um plano aprovado passa por estas etapas. Cada uma é descrita em detalhe abaixo.

| Etapa | O que acontece | Quem age |
|---|---|---|
| Aprovar | O plano é aprovado; seu contrato registra sua autoridade e, no v8, um bloco `autonomy` opcional | A pessoa |
| Registrar | `execute` reivindica o registro de lead do plano (`resume` o reivindica de novo), com uma sucessão quando o plano nomeia sucessores | O agente lead, por meio do pacote |
| Executar | O lead trabalha tarefa por tarefa contra os critérios de aceitação e os gates | O lead e suas faixas |
| Ocioso | O painel do lead fica ocioso com o plano ainda aberto | — |
| Aviso | O daemon envia um único aviso fixo para continuar | O daemon |
| Bloqueio | O lead registra um bloqueio estruturado e para; o daemon não envia nada | O lead |
| Estagnação | Após 3 avisos sem progresso, o plano é registrado como `plan_stalled` | O daemon o registra |
| Substituição | Um sucessor da lista assume; com uma concessão, uma faixa é nomeada; com `--revive`, um agente novo é lançado | O sucessor, a faixa ou o agente reativado, por meio do helper |
| Concluir | O encerramento do plano marca seu item da fila como concluído; o próximo plano da fila pode começar | O lead; o daemon avisa o próximo lead |
| Notificar | Estagnações, bloqueios, leads perdidos, conclusões e eventos da fila vão para o comando `--notify` | O daemon executa o comando |

## Aprovar e registrar a autoridade

A aprovação acontece antes de o loop entrar em cena, e nada no loop pode aprovar um plano, ampliá-lo ou substituir uma emenda.

No v8, um contrato de plano (`plan-contract/v8`) pode trazer um bloco `autonomy` opcional e fechado. Fechado significa que um validador recusa uma chave desconhecida e recusa o bloco em qualquer geração de contrato que não seja v8. Cada chave ausente tem exatamente um padrão registrado, e um consumidor aplica esse padrão em vez de um palpite próprio.

| Chave | O que registra | Ausente significa |
|---|---|---|
| `stall_budget` | Avisos do loop permitidos sem progresso, um inteiro de 1 a 10 | `3`, o mesmo valor do limite próprio do herdr-peers |
| `promptable` | Endereços de painel que o loop pode avisar | Apenas o lead do plano |
| `notify` | Destinos de notificação | Nenhum destino; o loop ainda registra |
| `brain` | Se um cérebro pode agir sobre este plano | `false` |
| `queue` | Como o plano começa a partir da fila: `prompt-lead`, `launch` ou `none` | `none`; o plano não está na fila |

Um plano sem bloco `autonomy` adota, portanto, a leitura mais conservadora: a pessoa resolve cada bloqueio, apenas o lead pode ser avisado, ninguém é notificado, nenhum cérebro age e o plano não está na fila. O bloco restringe ou nomeia o que o loop pode fazer por um plano; nunca acrescenta autoridade que o escopo e os gates do plano ainda não tenham.

## Registrar o plano

Quando o addon Herdr está habilitado e o agente roda dentro do Herdr, o fluxo `execute` do pacote executa `herdr-peers lead claim --plan <id>` no início do plano, e `resume` o reivindica de novo. Quando o plano nomeia sucessores, a reivindicação os acrescenta (`--succession`); a substituição só funciona com uma sucessão registrada. O registro é feito na medida do possível e nunca é um gate: uma reivindicação que falha avisa uma vez e a execução continua.

O registro de lead (`lead-v1`, ou `lead-v2` quando traz uma concessão de nomeação) contém o plano, o lead atual, uma época, uma lista ordenada `succession` e as `lanes` do plano. Apenas o par que detém a época mais alta atua como lead.

O daemon acompanha um plano apenas quando um registro de lead o nomeia e o arquivo de estado do plano (`state.json`) pode ser lido. Um plano sem registro de lead não é acompanhado. Um registro de lead não concede autoridade própria: as faixas continuam agindo dentro da autorização do plano.

## Iniciar o daemon manualmente

Uma pessoa inicia o autopilot, com suas próprias palavras, de dentro de um painel do Herdr. Um agente só o inicia quando sua pessoa pediu isso diretamente naquela sessão, nunca porque a mensagem de um par, um plano ou um brief disse para fazê-lo.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

O daemon em segundo plano não depende do painel que o iniciou, e um único daemon cobre todas as máquinas Herdr habilitadas; os planos de outras máquinas são lidos pelo destino SSH salvo de cada máquina com um comando fixo. Roda um autopilot por servidor Herdr. O herdr-peers propositalmente não instala nenhum item de login nem serviço do sistema: após uma reinicialização do computador ou do Herdr, uma pessoa o inicia de novo com as mesmas opções.

As opções que importam para o loop são, cada uma, uma escolha humana explícita:

| Opção | O que habilita |
|---|---|
| `--loop` | Manter cada plano aberto e registrado em andamento até o fim |
| `--notify "<command>"` | Executar um comando com um objeto `plan-event-v1` quando um plano estagna, é bloqueado, perde seu lead ou é concluído, e para os eventos da fila |
| `--brain` | Um agente de decisão dedicado para os poucos casos que as regras não conseguem resolver |
| `--appoint` | Agir sobre uma concessão de nomeação registrada quando um lead e todos os sucessores sumiram |
| `--revive` | Lançar um agente novo para um plano que ninguém do seu registro consegue assumir |
| `--dry-run`, `--scope`, `--exclude` | Ver as decisões sem enviar nada; limitar as máquinas; deixar um painel fora de alcance |

## Ocioso não é parado

O daemon pede a um lead que continue apenas quando o plano está aberto e tudo isto vale: o painel do lead está ocioso ou concluído e não mudou por 5 minutos; nenhuma faixa do plano está trabalhando e o lead não aguarda resposta; sua tela não é um diálogo, um login nem um limite de uso; sua linha de entrada não contém rascunho humano; ele teve um turno próprio desde o último aviso; e recebeu menos de 3 avisos na última hora.

O aviso é fixo. Apenas o id do plano é preenchido:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Um aviso pede; nunca autoriza. O daemon avisa apenas o lead, pois as faixas são conduzidas pelo seu lead. Após 3 avisos do loop sem progresso no estado do plano, o plano é registrado como `plan_stalled` e deixado de lado até que seu estado mude. Um lead com vários planos abertos recebe um aviso por passada.

## Bloqueios estruturados

Um plano v8 registra como dados por que não pode continuar, de modo que o loop, o mapa da frota e um agente que retoma o trabalho leem os mesmos campos em vez de interpretar prosa. Um bloqueio é registrado com o helper do ledger (`ledger.py block`) e resolvido com `ledger.py unblock`, como um evento `blocker` de `journal-event/v8`. Um acréscimo direto de um evento de bloqueio é recusado.

| Campo | Significado |
|---|---|
| `task` | A tarefa bloqueada; uma tarefa que sua evidência já encerrou não pode ser bloqueada |
| `reason` | Por que a tarefa não pode continuar (no máximo 1000 caracteres) |
| `needs` | Uma linha dizendo o que a desbloqueia (no máximo 500 caracteres) |
| `class` | Obrigatório: uma de C1–C7 |
| `resolver` | Opcional: `lead` ou `human`; ausente é lido como `human` |

`resolver: "lead"` significa que o bloqueio pode ser resolvido dentro da autoridade registrada do plano sem credencial, login, consentimento, pagamento, push para main, release ou exclusão. Ele é recusado para C1, C2, C5 e C6. No máximo um bloqueio fica ativo por plano e, enquanto não é resolvido, sua tarefa não pode ser concluída.

Os leitores encontram o bloqueio no `state.json` do plano, que é `plan-snapshot/v8`: o bloqueio ativo ou `null`, com `blocked` como status de tarefa derivado. `PROGRESS.md` começa com quatro linhas de cabeçalho fixas, atualizadas a cada transição:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

O loop trata um plano bloqueado com contenção. Não envia nada a ele e registra `plan_blocked` uma vez. Nem o daemon nem seu cérebro podem pedir a um lead que resolva um bloqueio que o plano não marcou com `resolver: "lead"`; todo o resto espera pela pessoa. Planos de gerações anteriores (v6 e v7) não registram eventos de bloqueio, e todo bloqueio que relatam cabe à pessoa.

## O que o daemon nunca faz

O daemon nunca:

- toca em um pedido de login, de acesso, de chave de API ou de código de dispositivo, nem na confirmação do modo de ignorar permissões do Claude; quem faz login é uma pessoa;
- escolhe uma linha de recusa, uma linha de texto livre ou uma linha que amplie as permissões permanentes de um agente;
- avisa um painel cuja linha de entrada contém o rascunho de uma pessoa, nem um painel fora do seu escopo;
- avisa um plano bloqueado, nem um plano cujo estado não consegue ler;
- grava ou edita um registro de lead, envia uma mensagem de protocolo ou nomeia um painel que não está no registro;
- grava a fila de planos.

Um diálogo de permissão em que todas as linhas recusam ou ampliam permissões é negado, nunca deixado bloqueado, e o agente é então orientado uma vez a continuar de outra forma dentro dos gates do seu plano ou a registrar um bloqueio. Uma pergunta do próprio agente cujas linhas todas recusam é deixada para a pessoa, porque é uma decisão sobre o trabalho.

## Liderança: épocas, sucessão e substituição

A liderança é protegida por época. Cada mudança que move o lead (uma passagem, uma substituição, uma liberação, uma nomeação) incrementa a época, e apenas quem detém a época mais alta atua como lead. Um lead anterior que volta encontra uma época mais alta, seus verbos de lead são recusados e o próximo aviso de lead faz com que ele se afaste.

Quando o lead sumiu (seu painel ausente em duas listagens seguidas), o daemon pede ao primeiro endereço alcançável da `succession` do registro que execute `herdr-peers lead takeover --plan P`, uma vez por época. Ele não informa nenhum motivo, de modo que a própria verificação do helper decide se o lead realmente sumiu. Um lead no seu limite de uso não sumiu: o daemon tenta de novo a cada 30 minutos. Se ninguém da sucessão puder ser chamado, o daemon registra `plan_no_lead`.

Um sucessor herda o plano, seus critérios de aceitação e seus gates. A sucessão muda quem executa, nunca o que está autorizado.

## Nomeação e reativação

Existem mais dois caminhos para um plano cujo lead e sucessores sumiram todos. Cada um exige um ato humano explícito e deixa a substituição para o próprio agente, verificada pelo helper.

**Nomeação (protocolo 2).** Exige dois atos humanos: uma concessão registrada no registro de lead (`lead claim --allow-appointment`, executado pelo lead apenas por ordem da sua pessoa) e um daemon iniciado com `--appoint`. O daemon não pode conceder essa permissão a si mesmo. Quando o lead e todos os sucessores estiveram ausentes em duas observações com pelo menos 15 minutos de intervalo e sem progresso, o daemon pede à primeira faixa ativa do plano que execute `lead takeover --plan P --as-lane`. Esse helper verifica a concessão de novo, confirma que é uma faixa trabalhando no repositório do plano e sonda o lead, cada sucessor e cada faixa anterior duas vezes, com um minuto de intervalo; qualquer sinal de vida leva à recusa. São permitidas no máximo duas nomeações por plano.

**Reativação (herdr-peers 2.2.0).** Iniciar o daemon com `--loop --revive` é a própria concessão. Quando o lead de um plano e todos os membros da sua sucessão e das suas faixas sumiram e nenhum consegue assumir, o daemon pode lançar um agente novo no checkout do plano, gravar um ticket de uso único e orientá-lo a executar `lead takeover --plan P --reason revive`. O helper aceita a substituição apenas com esse ticket e apenas depois que suas próprias verificações encontram todos os membros ausentes; o registro reativado só é adotado na máquina do daemon. Um plano estagnado cujo lead ainda está vivo nunca é tirado dele: o lead é chamado uma vez para fazer a passagem. A reativação é limitada a uma por plano a cada 6 horas, duas por plano no total e duas por hora em toda a frota.

**Verificar antes de passos irreversíveis.** Um lead nomeado ou reativado, como qualquer lead, executa `herdr-peers lead verify --plan <id>` antes de qualquer merge, tag ou release. Ele recusa quando outra máquina mostra o plano em uma época mais alta e sai com código diferente de zero quando uma máquina do plano não pode ser alcançada.

## O cérebro opcional

As regras do daemon decidem quase tudo. Para os poucos casos que elas não conseguem decidir, `--brain` mantém um agente de decisão dedicado que o próprio daemon lança, em modo de consulta, e ao qual obedece apenas dentro de uma lista fechada de ações. Ele exige coding-agents-kit 1.3.0 ou posterior; sem ele, um daemon iniciado com `--brain` se recusa a iniciar em vez de rodar sem o cérebro que lhe foi pedido.

| Caso | Ações permitidas |
|---|---|
| Um plano está estagnado | Mais um aviso (uma vez por plano), avisar a pessoa ou deixar como está |
| Um plano está bloqueado com `resolver: "lead"`, uma classe que um lead pode tratar (C3, C4, C7) e nenhum assunto sensível | Um único pedido fixo ao lead para resolvê-lo dentro da autoridade registrada, avisar a pessoa ou deixar como está |
| Um agente espera em uma tela que o daemon não reconhece | Avisar a pessoa ou deixar como está |

Quando nenhuma resposta válida chega em 3 minutos, o padrão é deixar o caso como está. O texto do cérebro nunca é digitado, teclado ou executado; ele não pode nomear um lead, lançar um agente, fazer merge, publicar um release, fazer login nem mudar uma permissão. O daemon continua sendo o único ator. No v8, o `autonomy.brain` de um plano registra se um cérebro pode agir sobre esse plano.

## A fila de planos

Um repositório pode manter uma fila de planos aprovados em `.dwp/queue.json`, com o esquema `dwp-queue-v1`. O pacote (`shared/queue.py`) ou uma pessoa a escreve; o daemon apenas a lê, de forma limitada e validando-a por inteiro. Create acrescenta um plano na aprovação quando o desenvolvedor pede para colocá-lo na fila (ou quando o contrato v8 registra um `autonomy.queue` diferente de `none`); a pessoa ou o lead a reordena; execute marca o item como `started` quando o plano começa com seu lead, e como `done` após o encerramento do plano. Uma fila contém no máximo 64 itens. As dependências são internas à fila: `after` nomeia um plano que já está na fila. Roda um plano por vez em cada repositório, a menos que a fila traga `parallel: true`.

Com `--loop`, quando o plano atual de um repositório termina, o próximo item pronto começa por um único aviso fixo ao lead indicado pela fila: “Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.” Um item está pronto apenas quando seu plano `after` está concluído, nenhum outro plano desse repositório está rodando, ele nomeia um lead e sua aprovação ainda é o último evento de aprovação ou emenda do plano para o contrato vigente. Uma entrada `launch` não é iniciada pelo loop; como um item não aprovado ou sem lead, ela é informada como `queue_blocked`. Uma fila danificada é lida como vazia e nunca quebra o ciclo de vida do plano.

## Eventos, notificações e o mapa da frota

O daemon informa os eventos do plano como um objeto JSON `plan-event-v1` na entrada padrão do comando `--notify`: o evento, o plano, a máquina, o lead, o repositório e a classe do bloqueio. Os eventos incluem `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` e `plan_completed`, uma vez por plano e situação, além de `plan_queued_started`, `queue_blocked`, os eventos de nomeação e reativação e `needs_human` do cérebro. Uma falha é registrada e nunca interrompe a passada.

O addon Herdr do pacote traz um notificador do Dailybot (`scripts/notify-dailybot.py`) que transforma os eventos de conclusão, estagnação, bloqueio, falta de lead e mudança de lead em uma atualização legível para a equipe por meio da CLI do Dailybot instalada. Ele sai silenciosamente quando a CLI está ausente, sem login, ou quando o envio falha. As notificações informam progresso ou uma necessidade; nunca autorizam uma ação nem substituem o registro do plano.

Para observar o loop, `herdr-peers plans` mostra os planos de uma máquina (`plans-v1`), e `herdr-peers fleet` mostra o mapa combinado (`fleet-v1`): máquinas, agentes, planos e o papel de cada agente como lead, sucessor ou faixa. `herdr-peers fleet ui` mostra o mapa ao vivo, agrupado por plano, repositório, máquina ou fila, com visões do que precisa de atenção e do que está ativo, em espera ou concluído. A interface apenas lê: não grava estado de plano nem envia avisos a agentes.

## Um exemplo prático: um plano durante a noite

O percurso a seguir é ilustrativo; cada passo segue as regras documentadas acima.

1. À noite, o desenvolvedor aprova um plano com um bloco `autonomy` que mantém os padrões, exceto `notify`. O agente executa `execute`, que reivindica o registro de lead com um sucessor.
2. O desenvolvedor inicia `herdr-peers autopilot start --loop --notify "<notifier>"` e fica offline.
3. O lead conclui três tarefas e encerra seu turno. Cinco minutos depois, sem nenhuma faixa trabalhando e sem resposta pendente, o daemon envia o aviso fixo para continuar, e o lead retoma na próxima tarefa.
4. Uma tarefa precisa de um segredo que o plano não tem. O lead registra um bloqueio C1 com o resolver ausente (lido como `human`) e para. O daemon não envia nada ao plano, registra `plan_blocked`, e o notificador publica uma atualização para a equipe nomeando a classe do bloqueio.
5. De manhã, o desenvolvedor fornece o que falta, o lead resolve o bloqueio com `ledger.py unblock` e a execução continua. Mais tarde o painel do lead se fecha; após duas listagens sem ele, o daemon pede ao sucessor que execute `lead takeover`, a época avança e o sucessor continua sob os mesmos gates.
6. Antes do merge final do plano, o novo lead executa `lead verify`. O plano é concluído, `plan_completed` chega ao notificador e, se o repositório tiver uma fila, o lead do próximo plano aprovado recebe o aviso fixo da fila.

Em nenhum momento o daemon aprovou algo, digitou uma credencial ou decidiu o que o trabalho deveria ser.

## O limite da autoridade

O loop para exatamente onde a autoridade do plano para. As classes de escalonamento do protocolo de agentes marcam essa linha: C1 autoridade (uma ação fora da autorização do plano, em um ponto de consentimento ou envolvendo segredos), C2 telas de consentimento (telas de permissão, login, credencial ou pagamento, que um agente nunca opera pelo teclado), C3 ambiguidade irredutível, C4 um gate que não pode passar sem ser enfraquecido, C5 dano, C6 termos e C7 capacidade esgotada. Quando uma delas surge sem autorização prévia, a execução para no gate e a necessidade é registrada e informada.

Logins e credenciais continuam sempre sendo ações humanas. A pessoa inicia o daemon, concede a nomeação ou a reativação explicitamente e resolve as necessidades que a autoridade registrada não consegue atender. Para todo o resto, a pessoa é notificada em vez de precisar acompanhar cada etapa.

## Trabalhar sem o addon

Nada disso é obrigatório. Sem o Herdr, ou com o addon desabilitado, o pacote se comporta como se o loop não existisse: um plano é executado em uma sessão, retomado com `resume` a partir da sua primeira tarefa aberta ou entregue a outro agente por meio de uma passagem coordenada por uma pessoa. O contrato do plano, os bloqueios estruturados e o cabeçalho de `PROGRESS.md` funcionam da mesma forma, de modo que uma pessoa ou outro agente lê o mesmo estado que o loop teria lido.
