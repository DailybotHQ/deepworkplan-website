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

### 1.1. Semântica do ciclo

#### Registro e observação
Com o add-on Herdr habilitado, o fluxo `execute` do pacote v8 reivindica o registro de lead e anota a sucessão do plano. Um plano só é observado quando tem registro de lead e seu estado pode ser lido. Uma pessoa inicia `herdr-peers autopilot --loop`; ele é um daemon, não um item de login nem serviço do sistema. Um daemon pode observar planos informados por todas as máquinas Herdr habilitadas. Sem registro de lead, o plano não é observado.

#### Continuidade, estagnação e sucessão

Para um plano aberto, o daemon avisa somente o lead, e apenas quando as condições de inatividade são atendidas: o lead está idle ou done há cinco minutos, nenhuma lane está trabalhando, não há resposta pendente, o painel está dentro do escopo e não excluído, e não há diálogo, login, limite de uso ou rascunho humano na linha de entrada. A mensagem é fixa e pede que o lead conclua o plano respeitando gates e autoridade registrada. O aviso não concede autoridade. Após três avisos sem progresso no estado do plano, registra `plan_stalled` e deixa o plano parado até o estado mudar. Um plano bloqueado é reportado, não avisado.

Se o lead desaparecer, o daemon pede ao primeiro sucessor acessível listado que execute `herdr-peers lead takeover --plan <id>`. O helper verifica a sucessão e avança o epoch; o daemon não grava o registro nem escolhe um painel não listado. Um limite de uso, sozinho, não prova que o lead desapareceu. O protocolo 2 também permite nomear um lead entre as lanes do plano, mas somente se uma pessoa registrar a concessão explícita com `lead claim --allow-appointment` e iniciar o daemon com `--appoint`. Antes de qualquer merge, tag ou release, o lead ativo executa `herdr-peers lead verify --plan <id>`.

#### Brain, eventos e frota

O `--brain` opcional inicia um agente de decisão dedicado aos casos que as regras do daemon não resolvem. Ele só pode escolher ações de uma lista fechada. O daemon continua sendo o único ator: valida uma escolha permitida e executa a ação; nunca executa texto livre do brain. O bloco `autonomy` do plano também precisa permitir o brain.

O ciclo registra eventos do plano, como estagnação, bloqueios, perda do lead, conclusão e resultados da fila. Com a integração opcional `--notify`, o daemon envia um objeto `plan-event-v1` ao notificador configurado; o notificador Dailybot do pacote transforma eventos compatíveis em atualizações para a equipe. Uma notificação não aprova trabalho nem altera o registro do plano. O mapa da frota e `herdr-peers fleet ui` mostram agentes e planos em várias máquinas. A interface é somente leitura: não altera estado nem avisa agentes. O comportamento marcado está documentado em [autopilot do herdr-peers v2.2.0](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/autopilot.md) e no [protocolo](https://github.com/DailybotHQ/herdr-peers/blob/v2.2.0/skills/herdr-peers/protocol.md).

## 2. O bloco `autonomy` (plan-contract/v8)

O objeto opcional de nível superior `autonomy` é fechado: chaves desconhecidas são inválidas. Os nomes e tipos canônicos estão no [schema plan-contract/v8](https://deepworkplan.com/schema/plan-contract/v8.json). Se o bloco estiver ausente, aplicam-se todos os padrões. Se estiver presente, cada campo omitido mantém seu próprio padrão; um consumidor NÃO DEVE adivinhar.

| Campo | Tipo e valores permitidos | Padrão se omitido |
|---|---|---|
| `stall_budget` | Inteiro de 1 a 10 | `3` avisos sem progresso |
| `promptable` | Lista não vazia de endereços de painel Herdr | Somente o lead do plano |
| `notify` | Lista não vazia de destinos | Nenhum destino; o ciclo ainda registra eventos |
| `brain` | Booleano | `false`; nenhum brain pode agir neste plano |
| `queue` | `prompt-lead`, `launch` ou `none` | `none`; o plano não está na fila |

Um endereço de painel usa o formato exato de Herdr: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. O ID da máquina não pode começar com `-`. Esses valores limitam quem pode receber avisos e eventos, se um brain pode agir e como o plano participa de uma fila. Eles não alteram critérios de aceitação nem gates.

## 3. Bloqueios estruturados

O plano v8 registra como dados por que não pode continuar, para que ciclo, frota e agente que retoma leiam os mesmos campos.

### 3.1. Registro do bloqueio

O ledger usa `ledger.py block` para abrir e `ledger.py unblock` para resolver, registrando eventos `blocker` de `journal-event/v8`. Recusa a gravação direta e registra cada recusa.

| Campo | Regra |
|---|---|
| `task` | Tarefa bloqueada do contrato; não pode estar encerrada por evidências. |
| `reason` | Obrigatório, não vazio, até 1000 caracteres: motivo. |
| `needs` | Obrigatório, uma linha não vazia, até 500 caracteres: requisito para continuar. |
| `class` | Obrigatório: `C1`–`C7` de [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Opcional: `lead` ou `human`; se ausente, vale `human`. |

`lead` resolve dentro da autoridade registrada, sem credenciais, login, consentimento, pagamento, push para main, publicação ou exclusão. `resolver: "lead"` é recusado para `C1`, `C2`, `C5` e `C6`. Há no máximo um bloqueio ativo; outro não abre até sua resolução. Reabrir a mesma tarefa pode atualizar `reason`, `needs`, `class` e `resolver`, mantendo o primeiro `since`. A resolução contém a tarefa e nota opcional. Uma tarefa bloqueada não conclui; a conclusão é recusada e novas evidências não a encerram.

### 3.2. Onde encontrá-lo

`state.json` usa `plan-snapshot/v8`: estrutura de `plan-snapshot/v6`, com `blocker` igual a `{task, reason, since, needs, class, resolver?}` ou `null`; `blocked` é o estado derivado prioritário enquanto o bloqueio estiver aberto. O ledger projeta o snapshot; não se edita manualmente.

`PROGRESS.md` DEVERIA começar sob o título com quatro linhas fixas, escritas por create e atualizadas a cada transição (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` e `Needs` vêm do snapshot (tarefa bloqueada primeiro, caso contrário a primeira incompleta). O agente escreve `Goal` e `Next action`. O restante é índice de trabalho.

### 3.3. O que o ciclo pode fazer

O ciclo, inclusive brain, só pede ao lead que resolva bloqueio marcado `resolver: "lead"`; os demais aguardam a pessoa. v6/v7 não registram `blocker` e mantêm `plan-snapshot/v6` com `blocker` nulo; seus bloqueios cabem à pessoa.
## 4. A fila de planos

A fila é `.dwp/queue.json`, schema `dwp-queue-v1`. Só o pacote escreve: `create` acrescenta um plano quando aprovado; a pessoa ou o lead reordenam pelo fluxo do plano; `execute` marca `started` ao reivindicar o lead (com seu endereço); a finalização marca `done`; `create` ou `refine` podem marcar `skipped` com uma nota de uma linha. Cada item contém plano, dependência `after` opcional que nomeia um plano já enfileirado, estado, lead e modo de início. Um repositório executa um plano por vez, a menos que a fila defina explicitamente `parallel: true`.

O daemon é consumidor limitado e somente leitura. Uma fila inválida é tratada como vazia sem interromper a execução dos planos. Um plano enfileirado só pode começar quando a dependência terminou (ou não existe), ele está aprovado, tem lead definido e não há outro plano ativo no repositório, salvo se paralelismo estiver habilitado. O modo `prompt-lead` envia ao lead nomeado uma única mensagem fixa: “O plano P é o próximo na fila deste repositório e está aprovado; execute-o até o fim, respeitando seus gates.” O daemon não escreve o estado da fila. Este ciclo não executa o modo `launch`, a menos que o contrato publicado acrescente explicitamente esse comportamento.

## 5. O que o v8 preserva

O v8 preserva tudo do v7, incluindo `tasks[].parallel_safe`, delegação e o conjunto completo de eventos. Recursos v7 continuam nas gerações seguintes. O v8 registra eventos v7 mais `blocker` em `journal-event/v8` e projeta em `plan-snapshot/v8`; journals mistos são recusados. Mantém `plan-manifest/v7`, sua forma e ponteiro; o verificador associa manifesto v7 a contrato v8. v6 e v7 preservam registros byte por byte.
