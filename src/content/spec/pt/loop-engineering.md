---
title: Engenharia do ciclo (loop engineering)
description: "Semântica normativa do ciclo v8: autoridade registrada, continuidade iniciada por uma pessoa, sucessão, bloqueios, fila, notificações e visão da frota."
order: 12
lang: pt
section: Engenharia do ciclo
---

# Engenharia do ciclo (loop engineering)

Esta página define o contrato do plano para a engenharia do ciclo. O **plano** continua sendo a autoridade; o ciclo oferece continuidade e visibilidade. Add-ons podem ampliar o método, mas não podem ampliar a autoridade registrada de um plano.

## 1. A regra do v8

Um plano aprovado é executado até o fim sem uma pessoa. A autonomia é o padrão **dentro da autoridade registrada no plano**; a pessoa recebe notificações, sem ficar aguardando, exceto por logins e credenciais. Os gates C1–C7 do próprio plano (como publicação, push ou mensagens externas) ainda interrompem o trabalho, a menos que o plano registre pré-autorização. A regra do v7 permanece: a metodologia funciona sozinha; os add-ons apenas a ampliam.

## Semântica do ciclo

### Registro e observação

Com o add-on Herdr habilitado, o fluxo `execute` do pacote v8 reivindica o registro de lead e anota a sucessão do plano. Um plano só é observado quando tem registro de lead e seu estado pode ser lido. Uma pessoa inicia `herdr-peers autopilot --loop`; ele é um daemon, não um item de login nem serviço do sistema. Um daemon pode observar planos informados por todas as máquinas Herdr habilitadas. Sem registro de lead, o plano não é observado.

### Continuidade, estagnação e sucessão

Para um plano aberto, o daemon avisa somente o lead, e apenas quando as condições de inatividade são atendidas: o lead está idle ou done há cinco minutos, nenhuma lane está trabalhando, não há resposta pendente, o painel está dentro do escopo e não excluído, e não há diálogo, login, limite de uso ou rascunho humano na linha de entrada. A mensagem é fixa e pede que o lead conclua o plano respeitando gates e autoridade registrada. O aviso não concede autoridade. Após três avisos sem progresso no estado do plano, registra `plan_stalled` e deixa o plano parado até o estado mudar. Um plano bloqueado é reportado, não avisado.

Se o lead desaparecer, o daemon pede ao primeiro sucessor acessível listado que execute `herdr-peers lead takeover --plan <id>`. O helper verifica a sucessão e avança o epoch; o daemon não grava o registro nem escolhe um painel não listado. Um limite de uso, sozinho, não prova que o lead desapareceu. O protocolo 2 também permite nomear um lead entre as lanes do plano, mas somente se uma pessoa registrar a concessão explícita com `lead claim --allow-appointment` e iniciar o daemon com `--appoint`. Antes de qualquer merge, tag ou release, o lead ativo executa `herdr-peers lead verify --plan <id>`.

### Brain, eventos e frota

O `--brain` opcional inicia um agente de decisão dedicado aos casos que as regras do daemon não resolvem. Ele só pode escolher ações de uma lista fechada. O daemon continua sendo o único ator: valida uma escolha permitida e executa a ação; nunca executa texto livre do brain. O bloco `autonomy` do plano também precisa permitir o brain.

O ciclo registra eventos do plano, como estagnação, bloqueios, perda do lead, conclusão e resultados da fila. Com a integração opcional `--notify`, o daemon envia um objeto `plan-event-v1` ao notificador configurado; o notificador Dailybot do pacote transforma eventos compatíveis em atualizações para a equipe. Uma notificação não aprova trabalho nem altera o registro do plano. O mapa da frota e `herdr-peers fleet ui` mostram agentes e planos em várias máquinas. A interface é somente leitura: não altera estado nem avisa agentes. O comportamento marcado está documentado em [autopilot do herdr-peers v2.0.0](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/autopilot.md) e no [protocolo](https://github.com/DailybotHQ/herdr-peers/blob/v2.0.0/skills/herdr-peers/protocol.md).

## 2. O bloco `autonomy` (plan-contract/v8)

O objeto opcional de nível superior `autonomy` é fechado: chaves desconhecidas são inválidas. Os nomes e tipos canônicos estão no [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Se o bloco estiver ausente, aplicam-se todos os padrões. Se estiver presente, cada campo omitido mantém seu próprio padrão; um consumidor NÃO DEVE adivinhar.

| Campo | Tipo e valores permitidos | Padrão se omitido |
|---|---|---|
| `stall_budget` | Inteiro de 1 a 10 | `3` avisos sem progresso |
| `promptable` | Lista não vazia de endereços de painel Herdr | Somente o lead do plano |
| `notify` | Lista não vazia; atualmente `dailybot` | Nenhum destino; o ciclo ainda registra eventos |
| `brain` | Booleano | `false`; nenhum brain pode agir neste plano |
| `queue` | `prompt-lead`, `launch` ou `none` | `none`; o plano não está na fila |

Um endereço de painel usa o formato exato de Herdr: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. O ID da máquina não pode começar com `-`. Esses valores limitam quem pode receber avisos e eventos, se um brain pode agir e como o plano participa de uma fila. Eles não alteram critérios de aceitação nem gates.

## 3. Bloqueios estruturados e progresso

Um plano bloqueado registra uma classe C e um campo opcional `resolver` no registro `blocked` ou `blocker` de `state.json`. `resolver` pode ser `lead` ou `human`; quando ausente, significa `human`. `lead` significa que o bloqueio pode ser resolvido dentro da autoridade registrada, sem credenciais, login, consentimento, pagamento, push para main, release ou exclusão. O ciclo, inclusive o brain, só pode pedir que o lead resolva bloqueios marcados `lead`. Os demais são reportados à pessoa, sem tentativa de contorná-los por avisos.

O mapa de frota marcado do herdr-peers pode mostrar até 14 linhas do próprio `PROGRESS.md` do plano como resumo higienizado. Essa exibição é dado observacional, não concessão de autoridade nem schema publicado de cabeçalho legível por máquina. O formato de cabeçalho planejado na linha v8 do pacote deve ser conferido na tag 8.0.0 antes de ser tratado como normativo.

## 4. A fila de planos

A fila é `.dwp/queue.json`, schema `dwp-queue-v1`. Só o pacote escreve: `create` acrescenta um plano quando aprovado; a pessoa ou o lead reordenam pelo fluxo do plano; `execute` marca `started` ao reivindicar o lead (com seu endereço); a finalização marca `done`; `create` ou `refine` podem marcar `skipped` com uma nota de uma linha. Cada item contém plano, dependência `after` opcional que nomeia um plano já enfileirado, estado, lead e modo de início. Um repositório executa um plano por vez, a menos que a fila defina explicitamente `parallel: true`.

O daemon é consumidor limitado e somente leitura. Uma fila inválida é tratada como vazia sem interromper a execução dos planos. Um plano enfileirado só pode começar quando a dependência terminou (ou não existe), ele está aprovado, tem lead definido e não há outro plano ativo no repositório, salvo se paralelismo estiver habilitado. O modo `prompt-lead` envia ao lead nomeado uma única mensagem fixa: “O plano P é o próximo na fila deste repositório e está aprovado; execute-o até o fim, respeitando seus gates.” O daemon não escreve o estado da fila. Este ciclo não executa o modo `launch`, a menos que o contrato publicado acrescente explicitamente esse comportamento.

## 5. O que o v8 preserva

O v8 preserva o contrato v7 para `tasks[].parallel_safe`, delegação e journal. O conjunto de eventos do journal v8 continua igual ao do v7; a escala de gerações é ordenada, então recursos marcados como v7 continuam disponíveis no v8 e posteriores. Na camada de registros, o v8 mantém as URLs de schema do manifesto e dos eventos de journal do v7 e adiciona somente a URL `plan-contract/v8` para a nova geração. Planos v5, v6 e v7 mantêm a geração registrada e não são migrados silenciosamente.

O v8 não torna add-ons obrigatórios. Sem Herdr, os planos ainda executam dentro da autoridade registrada usando a metodologia central. Com Herdr, registro, continuidade limitada, sucessão, notificações, fila e visualização de frota somente leitura ampliam o mesmo ciclo de vida do plano.
