---
title: Recursos e capacidades
description: "Manifestos de contexto por tarefa, o envelope de recursos, as capacidades do host, o registro de addons .dwp/config.json e as capacidades de addons ativos."
order: 10
lang: pt
section: Record layer
---

# Recursos e capacidades

> **Escopo da versão:** Esta página reapresenta quatro documentos normativos do padrão atual, DWP 7.0.0, na release `v7.8.1`: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/CONFIG.md) e [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_ABILITIES.md). Onde esta página e esses arquivos divergirem, os arquivos prevalecem.

**Status: Estável (contexto e recursos desde a 6.0.0; configuração e capacidades desde a 7.0.0).** Estas regras se aplicam aos planos da linha v6 ([Camada de registros](/spec/record-layer)); o padrão v5 permanece intacto. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

## O manifesto de contexto por tarefa

Antes de cada tarefa, o agente deriva um **manifesto de contexto** a partir do contrato e do diário completo (`context_manifest.py`). Ele é uma view derivada, nunca armazenada como estado: derivar duas vezes a partir dos mesmos registros DEVE (MUST) produzir bytes idênticos, e o manifesto NÃO DEVE (MUST NOT) ler fora do plano e do seu repositório. Seu formato é publicado como [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json).

| Seção | Derivada de |
| --- | --- |
| `identity` | nome do plano, id e revisão do contrato vigente |
| `authorization` | os eventos de aprovação, literalmente, incluindo os pontos de consentimento |
| `repository_rules` | o escopo do contrato e as invariantes com seu estado de avaliação atual |
| `acceptance` | os critérios da tarefa com seu estado de fechamento |
| `touched_surface` | os arquivos declarados com seus hashes de conteúdo atuais; um arquivo ausente aparece como ausente |
| `evidence` | ponteiros de evidência dentro da janela que resolvem em disco |
| `dead_ends` | gates que falharam, recusas, adaptações recusadas e controles não discriminantes |
| `freshness` | a impressão digital das entradas que o manifesto resume |
| `next_action` | exatamente um próximo passo com um comando concreto |

`authorization`, `repository_rules` e `acceptance` são **obrigatórias**: a poda de contexto nunca pode ocultar a fronteira de aceitação ou de autorização. A escada de próxima ação é ordenada (aprovação, início, autoridade, controle, evidência, conclusão) e nunca apresenta um gate comum aprovado como se fechasse um critério controlado.

**Os becos sem saída são mantidos.** Uma entrada só sai do resumo diante de fatos comprovados nos registros (a mesma impressão digital passou depois, uma recusa duplicada mais recente a substituiu ou uma revisão do contrato a tornou obsoleta); uma simples mudança de superfície NÃO DEVE (MUST NOT) removê-la. **A atualidade é verificada:** um resumo cuja impressão digital de entrada registrada não corresponde mais está desatualizado, e um resumo sem impressão digital está desatualizado por construção. **O histórico só é carregado por gatilho** — uma passagem de bastão registrada ou uma emenda que afeta a tarefa; caso contrário, o manifesto sozinho é o contexto da tarefa.

## Contabilidade de quatro grandezas

A carga de instruções e o custo são reportados como quatro grandezas distintas: **bytes de instrução** estáticos, **tokens do provedor** (somente onde um medidor do host os registrou), **custo monetário** (somente a partir de amostras registradas com tarifa real) e **tempo de relógio** (a partir dos timestamps dos eventos). Uma grandeza ausente é reportada como ausente com o seu motivo, nunca imputada, e bytes nunca são convertidos em tokens ou dinheiro.

## Capacidades do host

O host de execução declara suas **capacidades** a partir de um conjunto fechado: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Uma capacidade desconhecida DEVE (MUST) ser recusada, e uma capacidade não declarada é `false`. O **host mínimo** — sem troca de modelo, sem subagentes, sem telemetria, sem parada — é uma postura suportada, nunca um erro; todo limite que precisa de uma capacidade ausente passa a ser consultivo, com a capacidade ausente nomeada.

Capacidades não são concessões. Uma concessão no contrato é autoridade; uma capacidade é o que o ambiente consegue de fato fazer. Toda postura que precisa de uma capacidade continua precisando da sua concessão.

## O envelope de recursos

Um contrato PODE (MAY) declarar limites em seu envelope de recursos. Um limite só é **aplicado** quando nomeia uma fonte de medição real; caso contrário, é **consultivo**, e nunca se afirma paridade de aplicação entre hosts.

- **Fontes de contadores.** Os contadores observáveis no diário (intervalo de tempo de relógio, novas tentativas de gate, chamadas de despacho) são calculados a partir dos próprios registros do plano. Os contadores exclusivos do host (gasto, tokens do provedor) precisam da capacidade de medição correspondente e de uma amostra observed de um adaptador de host; um contador ausente não significa uso gratuito.
- **Reservas.** Um limite PODE (MAY) declarar uma `reserve` para que a verificação, as novas tentativas e a retomada não fiquem sem recursos por causa do trabalho comum: o despacho é recusado quando o gasto mais o pendente excederia o limite menos a reserva.
- **Esgotamento.** Atingir um limite persiste um checkpoint incompleto, registra `LIMIT: exhausted <id>: <detail>` e retém o despacho até um registro explícito `LIMIT: recovered <id>`. Um esgotamento nunca pode satisfazer um critério de aceitação.
- **Liquidação no cancelamento.** Uma reserva em andamento é liquidada exatamente uma vez, como liberada ou confirmada; uma segunda liquidação conflitante é recusada, nunca arbitrada.
- **Postura de roteamento.** O padrão é um modelo fixo. A troca de nível de modelo precisa tanto da concessão `model_routing` quanto da capacidade de mesmo nome; o despacho paralelo precisa tanto da concessão `agent_delegation` quanto da capacidade `subagents`. Uma postura de roteamento é uma declaração de permissão, nunca uma afirmação de eficácia.

## O arquivo de configuração e o registro de addons

`.dwp/config.json` (repositório) e `~/.dwp/config.json` (usuário) compartilham um formato, publicado como [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), e um parser (`config.py`). **A metodologia funciona sem arquivo de configuração e sem nenhum addon**; nada no arquivo pode fazer um plano, um fluxo ou a conformidade depender de um addon.

- **Versionado por padrão.** O arquivo do repositório guarda decisões, nunca secrets, e é versionado para que colegas de equipe e a CI leiam o mesmo registro: o onboarding escreve a regra de `.gitignore` `.dwp/*` mais `!.dwp/config.json`. Os planos e os registros de benchmark continuam ignorados.
- **Precedência.** O arquivo do repositório prevalece sobre o arquivo do usuário, e um arquivo ausente significa tudo desabilitado. A chave `addons` é resolvida por chave de addon; a chave `benchmark` é resolvida por inteiro.
- **As chaves do registro** são os nomes dos diretórios de addon dentro do pacote: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Cada entrada tem `enabled` (somente `true` habilita), uma `version` opcional e uma `note` opcional de uma linha. Uma chave desconhecida é ignorada com um aviso.
- **Ausente significa não habilitado.** Somente o onboarding com o consentimento do desenvolvedor, o próprio passo de instalação de um addon ou o humano habilitam algo. Um addon habilitado que não é detectado e tem uma nota é reportado como adiado.
- **Leitura com falha fechada.** Um arquivo ilegível ou um valor malformado não contribui com nada e produz exatamente um aviso; um leitor nunca aborta um fluxo e nunca se cala sobre o que descartou. O escritor reconcilia de forma atômica e se recusa a sobrescrever um arquivo que não consegue analisar.
- **Registro do host.** Uma chave `host` opcional registra as capacidades declaradas da máquina (booleanos do conjunto fechado). `telemetry: true` ainda precisa do consentimento do desenvolvedor.
- **A linha de base não muda.** A revisão local do AI Diff Reviewer continua fazendo parte de todo Final Review, quer o registro a nomeie ou não.

## Capacidades fornecidas por addons

A partir da 7.0.0, os addons habilitados podem acrescentar capacidades em tempo de execução:

`capacidades efetivas = capacidades declaradas pelo host ∪ capacidades fornecidas por cada addon que esteja habilitado, descrito por um addon.json válido, detectado e em uma versão de interface compatível`

- **Descritores.** Cada addon do pacote distribui um `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) que declara sua chave, o que ele fornece e como é detectado.
- **A detecção é somente leitura.** Um comando de detecção roda sem shell, com o stdin fechado e um timeout de 10 segundos, e nada do que ele imprime é executado. Um produto cuja versão principal de interface reportada difere da fixada não está disponível, com um aviso.
- **Não habilitado significa não consultado.** O descritor de um addon desabilitado não é aberto e seu comando de detecção não é executado. A união é monotônica: habilitar um addon só pode acrescentar capacidades.
- **Nunca persistidas.** As capacidades efetivas são recalculadas a cada chamada e NÃO DEVEM (MUST NOT) ser escritas em um plano. Um plano registra o que usou — o evento de delegação nomeia seu transporte e seu addon —, não o que estava disponível.
- **Capacidades não são autoridade.** O addon agentkit pode fornecer `subagents`, `cancel_children` e `model_routing`; o addon Herdr pode fornecer `subagents` e `cancel_children`. Delegar ainda exige a concessão `agent_delegation` do contrato ([Delegação](/spec/delegation)).

`resources.py abilities` imprime o conjunto efetivo e a origem de cada capacidade; é somente leitura.

## Relacionado

- [Camada de registros](/spec/record-layer) — contrato, diário e evidência.
- [Delegação](/spec/delegation) — como um plano usa a capacidade `subagents`.
- [Add-ons](/spec/addons) — os próprios addons opcionais.
