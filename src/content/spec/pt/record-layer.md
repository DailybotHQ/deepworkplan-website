---
title: Camada de registros
description: "A camada de registros v6 e v7: um contrato de resultado imutável, um diário somente de acréscimo, classes de evidência, aprovação humana, emendas e recibos."
order: 9
lang: pt
section: Record layer
---

# Camada de registros

> **Escopo da versão:** Esta página reapresenta a camada de registros normativa v6 sobre a qual o padrão atual, DWP 7.0.0, é construído. Fontes canônicas na release `v7.8.1`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTRACT.md) e [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_LIFECYCLE.md). Onde esta página e esses arquivos divergirem, os arquivos prevalecem. Os planos v5 mantêm a camada de [estado do plano](/spec/plan-state) e nunca são migrados implicitamente.

**Versão 6.0.0, estendida na 7.0.0. Status: Estável.** A camada de registros substitui a conclusão narrativa por registros: o contrato é a autoridade, o diário é a memória, os helpers fazem a escrita e todo arquivo gerado é uma projeção. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

## O modelo em uma linha

Um plano é composto por dois artefatos redigidos e uma sequência protegida. O plano markdown (`README.md` e arquivos de tarefa) diz o que será feito. O **contrato de resultado** (`contract.json`) diz o que conta como concluído e o que o plano tem permissão para fazer. O **diário** (`journal.ndjson`) registra o que de fato aconteceu. `state.json` e `views/` são regenerados a partir do diário e NÃO DEVEM (MUST NOT) ser editados manualmente; quando um arquivo gerado e o diário discordam, o diário prevalece e o arquivo é regenerado.

## Detecção de geração

Uma pasta de plano é um plano da linha v6 se, e somente se, contiver um `manifest.json` cujo ponteiro `contract` resolve, um `contract.json` ou uma cadeia de revisões `contracts/`. A detecção DEVE (MUST) usar esses artefatos, nunca a versão do pacote instalado: um pacote atual pode conter planos v5, e um pacote mais antigo pode encontrar um plano v6.

A URL `schema` do contrato nomeia sua **geração**, e o manifesto e cada evento do diário a espelham:

| Geração | Contrato | Eventos do diário | Manifesto | Acrescenta |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` e o evento `delegation` ([Delegação](/spec/delegation)) |

Os novos planos criados pelo pacote 7.x são v7 por padrão; um pedido explícito de `v6` ainda materializa um contrato v6. Um plano nunca muda de geração, e um diário que mistura gerações DEVE (MUST) ser recusado. Ambas as gerações são projetadas no mesmo formato [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## O contrato de resultado

Um contrato por plano, conforme o esquema de sua geração. Ele contém a declaração de resultado e a definição de sucesso, os critérios de aceitação, as tarefas com seus pré-requisitos, a superfície tocada e a intenção de gate, as invariantes de escopo do plano, o escopo (caminhos permitidos, classes de comando, operações proibidas), o envelope de recursos, os limites de agendamento, as permissões e o registro de autorização.

- **Identidade.** O `contract_id` é o SHA-256 dos bytes canônicos do contrato sem o campo id. Todo registro produzido sob o contrato o cita.
- **Imutabilidade.** Uma vez iniciada a execução, o contrato NÃO DEVE (MUST NOT) mudar. Um contrato alterado é uma nova **revisão** em `contracts/`, que cita sua revisão mãe, com números de revisão contíguos e uma nova autoridade registrada.
- **Ids estáveis.** Critérios (`AC-*`), invariantes (`INV-*`) e tarefas (`T-*`) DEVEM (MUST) ser únicos, e os registros citam ids, nunca posições em listas. O grafo de tarefas DEVE (MUST) ser acíclico, e toda intenção de gate DEVE (MUST) referenciar um critério declarado.
- **Permissões.** As capacidades concedidas e não concedidas DEVEM (MUST) ser subconjuntos disjuntos de um conjunto fechado: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autorização.** O mecanismo é exatamente `plan_authorship` (o humano redigiu ou revisou o plano antes da execução) ou `pre_authorization` (uma concessão permanente com um envelope declarado, como no modo de confiança). Ambos funcionam igualmente como gate; só a autoridade registrada difere.
- **Fechabilidade.** Todo critério DEVE (MUST) poder ser fechado: um critério que uma tarefa usa como gate é fechado por evidência `observed` do seu gate ou por uma aprovação humana `asserted`, conforme as classes de evidência que ele aceita. Um critério em rascunho que não aceita nenhuma delas é recusado.

## Materialização

Um plano é materializado pelo helper distribuído (`ledger.py materialize`), nunca à mão, exatamente nesta ordem, com cada passo idempotente e retomável:

1. **`manifest.json`** com o ponteiro do contrato, escrito primeiro para que a geração do plano possa ser descoberta mesmo que a materialização seja interrompida.
2. **`contract.json`**, validado e endereçado por conteúdo.
3. O evento de diário **`approval`**, que cita o id do contrato e o digest do plano markdown.

Só esse evento de aprovação abre o gate de início de tarefa. Um contrato copiado à mão sem ele é recusado no início da tarefa, e um manifesto cujo ponteiro não corresponde ao contrato em materialização é recusado em vez de reescrito.

## O diário

`journal.ndjson` é somente de acréscimo: um objeto JSON fechado por linha, nunca editado nem apagado. Uma correção é um evento posterior. Cada evento contém seu esquema, tipo, um `seq` estritamente crescente, um timestamp, o plano, o `contract_id` e o ator (`helper`, `agent`, `host_adapter` ou `human`). O catálogo de eventos abrange inícios de tarefa, aprovações, execuções de gate, observações, adaptações, emendas, intervenções, amostras de recursos, pares de controle, seleções do agendador, recusas, renderizações de views, reconciliações e reparos do diário; a v7 acrescenta eventos de delegação. Toda recusa é ela própria registrada.

## Classes de evidência

Os eventos que carregam evidência registram um rótulo de **confiança**:

1. **observed** — um helper distribuído executou ele mesmo a verificação, com diretório de trabalho, ambiente, timeout e saída capturada declarados. Apenas o executor de gates (`ledger.py gate`) gera evidência de gate observed; um agente que apenas anota um resultado que ele reporta não pode fazê-lo.
2. **imported** — obtida de uma fonte externa correspondente com proveniência, por exemplo um registro de gate v5 migrado cujo ponteiro de evidência resolve.
3. **asserted** — declarada sem estabelecimento independente.

Cada critério declara quais classes aceita, de modo que um critério somente observed nunca pode ser fechado por uma afirmação. Os checksums estabelecem identidade de bytes, não verdade semântica; a camada de registros verifica estrutura e proveniência e não prova a semântica do produto.

## Aprovação humana

Um critério que um humano deve julgar é fechado por meio de `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>`. A aprovação é registrada como `asserted`, cita o artefato em que se baseia, conta apenas dentro da janela de evidência da tarefa que a declara e fecha apenas um critério que aceita `asserted`. Um agente nunca aprova em nome de um humano. Os registros com ator humano escritos fora da materialização carregam um marcador de autoridade explícito (uma nota escrita pelo humano, registrada por caminho e digest, ou uma confirmação interativa); o ledger não consegue autenticar uma pessoa, então o marcador torna a afirmação auditável em vez de observed.

## Critérios controlados

Um critério declarado como controle de regressão ou de discriminação só fecha com um **par de controle discriminante**: a verificação falha na revisão inicial e passa na nova. Um par que passa nas duas pernas é registrado como não discriminante e nunca arredondado para cima; um início sujo ou uma perna antiga indisponível é registrado como controle indisponível, nunca sintetizado.

## Execução e conclusão

O despacho vem do agendador determinístico (`scheduler.py ready`), e `ledger.py start` recusa uma tarefa cujos pré-requisitos estejam incompletos. Cada início de tarefa registra uma impressão digital da árvore de trabalho, e a evidência só é reutilizada para a mesma tarefa e o mesmo critério com uma impressão digital equivalente.

**As invariantes têm escopo de plano.** Cada invariante declarada vale para o plano inteiro e é avaliada em cada fronteira como uma observação (`INV-<id>: pass` ou `INV-<id>: fail: <reason>`). Uma propriedade que só algumas tarefas devem manter é um critério de aceitação dessas tarefas, nunca uma invariante.

**A conclusão é derivada, nunca declarada.** `ledger.py complete` recusa, e registra a recusa, enquanto algum critério não tiver evidência aceita dentro da janela ou alguma invariante não tiver uma avaliação recente aprovada. O snapshot mostra uma tarefa como concluída exatamente quando os registros a sustentam.

## Adaptações e emendas

As mudanças durante a execução são propostas ao agendador, limitadas a um conjunto fechado: `split`, `reorder`, `insert`, `change_strategy` e `retry`. Uma adaptação NÃO DEVE (MUST NOT) excluir um requisito, enfraquecer ou substituir a aceitação, ampliar o escopo ou as permissões, gastar além do envelope ou marcar como concluído um cenário não executado.

Uma mudança de escopo, critérios de aceitação, permissões ou envelope é uma **emenda ao contrato**: `ledger.py amend` prepara o contrato revisado como a próxima revisão, registra a emenda junto com os critérios cuja evidência anterior ela invalida, exige uma nova aprovação com um marcador de autoridade humana e só então troca o contrato vigente. Uma emenda interrompida é retomada no primeiro passo ausente; a autoria do plano nunca se transfere para uma revisão.

## Recibos, views e exportação

`outcomes.py receipt` recalcula o resultado do plano a partir dos registros, de modo que ele muda quando os registros mudam; nunca é escrito à mão. `views.py render` regenera as views legíveis por humanos; uma view editada por um humano é reportada, nunca sobrescrita silenciosamente, e a reconciliação é ela própria registrada. Como `.dwp/` é ignorado pelo git, `ledger.py export --dest <dir>` empacota o diário, o snapshot, a cadeia de contratos e todo artefato de evidência citado, para durabilidade ou para outro host.

## Superfícies somente leitura e retomada

`status` e `verify` nunca escrevem em um plano da linha v6; eles reportam por meio de comandos puros e das projeções geradas. Um host que retoma o trabalho se recupera em uma ordem fixa (inspecionar, validar, projetar, renderizar com autoridade registrada) e trata uma impressão digital desatualizada como evidência invalidada a ser executada novamente, nunca como um resultado reutilizável. O diário nunca é reproduzido como contexto de conversa: o trabalho é retomado pelo loop de execução com um [manifesto de contexto](/spec/resources-and-abilities#the-per-task-context-manifest) por tarefa.

## Coexistência e migração

Planos v5 e da linha v6 PODEM (MAY) coexistir em um mesmo `.dwp/plans/`, e cada um roda sob sua própria geração por toda a sua vida. O único caminho de v5 para v6 é uma migração explícita e pré-visualizada (`migrate_v6.py`, executada por meio de `refine`) com backup verificado e rollback; o histórico v5 migrado é `imported` quando sua evidência resolve e `asserted` caso contrário, nunca `observed`. Não existe migração reversa.

## Relacionado

- [Recursos e capacidades](/spec/resources-and-abilities) — o manifesto de contexto, o envelope de recursos, as capacidades do host e o registro de addons.
- [Delegação](/spec/delegation) — o que a v7 acrescenta a esta camada.
- [Estado do plano](/spec/plan-state) — a camada de estado v5 mantida.
