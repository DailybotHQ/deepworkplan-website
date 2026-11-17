---
title: "Deep Work Plan — execução estruturada para agentes de código de IA"
description: "Especificação primeiro, loop fechado: o Deep Work Plan faz do repositório o harness dos agentes de IA, e cada plano termina num loop iniciado por humanos."
lastUpdated: 2026-11-17
---

*Especificação primeiro · ciclo fechado*

## Faça qualquer agente de IA concluir o trabalho no seu repo.

Seu repositório guarda o plano, o contexto e as verificações, então o trabalho sobrevive a reinícios, passa de um agente para outro e segue em ciclo até que todas as validações passem, dentro da autoridade que você concede.

O Deep Work Plan (DWP) é uma metodologia e um kit abertos, licenciados sob MIT, para planejar e executar trabalho de software complexo com agentes de IA. Você não escolhe um método de instalação nem copia um template — você copia o prompt do init.md e cola no seu agente:

> Copie o prompt do init.md e cole-o no seu agente de código — Claude Code, Cursor, Codex, ou qualquer outro — para tornar qualquer repositório AI-first.


- [Abrir o prompt do /init](/pt/quickstart)
- [Leia a metodologia](/methodology)

---

## Em que a metodologia se apoia.

1. **Especificação primeiro** — o plano é a fonte de verdade duradoura: tarefas atômicas, critérios de aceitação e validation gates que o agente precisa passar.
2. **O repositório é o harness** — contexto, ferramentas, guardrails e estado vivem no repositório como arquivos de texto simples que qualquer agente pode ler.

3. **Loop engineering** — Os planos chegam ao fim: registro, um daemon iniciado por uma pessoa, lembretes que não acrescentam autoridade, substituição e eventos de plano.
4. **Eficiência medida** — bytes de instrução por fluxo, medidos e publicados com o seu método — nunca porcentagens de tokens inventadas.

---

## O problema e a resposta

Em rajadas curtas, agentes de código são notáveis. Confie a um deles uma missão de longo alcance — uma migração, um subsistema novo, uma refatoração em dezenas de arquivos — e ele desvia: o contexto enche, decisões anteriores se perdem e horas de trabalho ficam pela metade.



O contexto é o recurso mais escasso do seu agente. Por isso, o harness mantém sua própria carga de instruções enxuta e auditável. As instruções são carregadas progressivamente, a validação se concentra no que mudou e cada tarefa recebe o contexto relevante. Publicamos em bytes a carga de instruções de cada fluxo para deixar esse volume visível. Os planos também se ajustam ao trabalho: Lite para uma correção delimitada e Full para tarefas que levam horas. O formato acompanha o escopo e mantém o processo focado e rastreável.

---

## Os humanos dirigem. Os agentes executam.

Você decide o que significa concluído e onde estão os limites. O plano carrega a sua intenção; os agentes cumprem as horas — sem supervisão constante, sem correções a cada vinte minutos.

- Você: intenção, critérios de aceitação, revisão
- Agentes: execução, tarefa por tarefa
- O plano: o contrato entre eles

[Leia a metodologia](/pt/methodology)

---

## Um plano do qual os agentes não se desviam.

Tarefas longas enchem o contexto de qualquer modelo. Os detalhes se perdem e o agente desvia. Um plano escrito — tarefas atômicas, validation gates, estado retomável — é aquilo a que ele retorna, volta após volta.

1. Plano
2. Tarefas atômicas
3. Portões de validação
4. Conclusão
5. Estado retomável

[Veja o ciclo principal](/pt/methodology)

---

## Feito é um contrato, não uma vibe.

Cada tarefa nomeia seus critérios de aceitação e as verificações que devem passar. O agente não pode dar-se por terminado — tem que passar, ou a tarefa permanece aberta.

- Os testes passam
- Os tipos são verificados
- Os critérios de aceitação são cumpridos
- Ou a tarefa continua aberta

[Leia a especificação](/pt/spec)

---

## O repositório é o harness.

Contexto, ferramentas, salvaguardas e estado vivem no seu repositório como arquivos simples que qualquer agente pode ler. Sem lock-in, sem cérebro externo — sobrevive a reinícios de contexto.

- Especificação durável em disco
- Portões de validação, não palpites
- Sobrevive a reinícios de contexto

**SPEC · TASKS · CHECKS · STATE · TOOLS**

[Veja o que o onboarding gera](/pt/quickstart)

---

## Os planos chegam ao fim. A autoridade continua com as pessoas.

Loop engineering é como um plano chega ao fim sem que uma pessoa precise acompanhá-lo. As linhas abaixo descrevem contratos publicados do ciclo: a maioria vem do herdr-peers, enquanto a fila de planos é um contrato do pacote. Herdr é opcional; a metodologia funciona sem ele.

> A especificação diz o quê; o harness diz onde; o loop engineering diz como termina.

**O loop:** Registro (`lead claim`, lead e sucessão) → Daemon (`autopilot --loop`, iniciado por uma pessoa) → Lembrete (`idle ≥ 5 min`, não acrescenta autoridade) → Substituição (`lead takeover`, primeiro sucessor alcançável) → Aviso (`plan-event-v1`, ao comando da pessoa) → Concluído (`plan_completed`, gates aprovados). Todo plano aberto com registro de lead, até que o próprio estado diga que terminou.



| Contrato | O que garante | Fonte (herdr-peers v2.2.1) |
| --- | --- | --- |
| Registro do plano (`herdr-peers lead claim`) | Um plano que o loop acompanha tem um registro de lead com uma época e uma sucessão. Só quem detém a época mais alta atua como seu lead. | `skills/herdr-peers/protocol.md` §12 |
| Início só por humanos (`herdr-peers autopilot start --loop`) | Só uma pessoa inicia o daemon, com suas próprias palavras. Nenhuma pergunta, resposta ou aviso pode iniciá-lo, pará-lo ou mudar o que ele faz. | `skills/herdr-peers/autopilot.md` §1 |
| Lembretes não acrescentam autoridade (`plan_stalled`) | O lead ocioso de um plano aberto recebe um único prompt fixo para continuar. Gates, condições de parada e escalonamentos valem como antes; três prompts sem progresso marcam o plano como estagnado. | `skills/herdr-peers/autopilot.md` §5.2–5.3 |
| Substituição pelos sucessores (`herdr-peers lead takeover`) | Quando o lead some, o primeiro sucessor alcançável é chamado a assumir, e o helper verifica as evidências de novo. Uma faixa só assume o lead com uma concessão que a pessoa registrou de antemão. | `skills/herdr-peers/autopilot.md` §5.2, §7 |
| Eventos de plano (`plan-event-v1`) | Quando um plano estagna, é bloqueado, perde o lead, começa a partir da fila ou é concluído, um comando escolhido pela pessoa recebe um objeto plan-event-v1. O pacote inclui um notificador do Dailybot para isso. | `docs/schema/plan-event-v1.json` |
| Mapa da frota (`plans-v1` · `fleet-v1`) | Cada máquina reporta seus planos como plans-v1; o daemon mantém o mapa fleet-v1 de cada máquina, agente, repositório e plano, e o fleet ui o exibe somente para leitura. | `docs/schema/fleet-v1.json` |
| Fila de planos (`dwp-queue-v1`) | O pacote valida e grava a fila; o daemon a lê para continuar os planos enfileirados. | `skills/deepworkplan/shared/queue.py` |
| Verificação do lead (`herdr-peers lead verify`) | Antes de qualquer merge, tag ou release, o lead confirma que ainda detém o plano em todas as máquinas. Um lead mais recente o recusa; uma máquina inalcançável o interrompe, a menos que esse risco seja aceito e registrado. | `skills/herdr-peers/protocol.md` §12 |

O cérebro de decisão (`--brain`) e a nomeação de lead (`--appoint`) são flags opcionais do mesmo daemon, cada uma ativada por uma pessoa. O daemon nunca faz merge, não publica releases, não faz login nem altera uma permissão.

[Leia sobre o addon Herdr](/pt/kit/herdr)

---

## Bytes de instrução por fluxo, medidos.

O harness publica o que cada fluxo precisa ler antes de começar: o router, a sub-skill e os recursos compartilhados que ela referencia. São os conjuntos de leitura obrigatória do pacote publicado.

| Fluxo | Pacote de entrada (bytes) |
| --- | ---: |
| `create` | 74.974|
| `execute` | 55.136|
| `resume` | 32.023|
| `refine` | 77.014|
| `onboard` | 82.051|
| `status` | 27.311|
| `verify` | 36.701|

Unidade: bytes do sistema de arquivos. Medido no pacote publicado com o comando abaixo: `bash tests/efficiency/measure-instruction-load.sh` (deepworkplan-skill v8.0.3).

Tokens do provedor, custo e estatísticas de fechamento do loop não são exibidos: nenhuma fonte com tag os mede ainda, então eles não têm linha. A cifra de tokens do script, bytes ÷ 4, é uma estimativa identificada como tal, nunca uma medição.

[Leia o registro de avaliação](https://github.com/DailybotHQ/deepworkplan-skill/blob/v8.0.3/docs/EVALUATION.md)

---

## O que você obtém

- AGENTS.md na raiz do repositório, fundamentado na sua stack e nos seus comandos reais.
- `docs/` categorizado e documentação por módulo.
- Um diretório `.agents/` (skills, agents, commands) com o symlink de `.claude` para `.agents`.
- A skill Deep Work Plan, instalada uma vez para todos os agentes — incluindo a sub-skill author, para que o repositório possa fazer crescer suas próprias skills, agents e commands, além de addons opcionais como dependency-upgrade e o addon design-system para qualquer superfície de interface voltada ao usuário.
- Planos de longo prazo e retomáveis em uma pasta `.dwp/` ignorada pelo git. A metodologia em si não precisa de daemon nem de estado externo; o daemon opcional do loop acrescenta continuidade, nunca uma dependência.
- Delegação multiagente e Ecossistema 1.0 — coordene agentes paralelos com segurança em worktrees isoladas, evidência observada em gates e complementos fixados opcionais.

---

## O que acontece quando você o executa

1. **Seu agente abre o [/init.md](/init.md)** — ele lê o prompt de onboarding e a metodologia, a especificação e o kit aos quais ele se vincula.
2. **Ele instala a skill Deep Work Plan** — o motor, idêntico em todos os repositórios: o roteador mais suas sub-skills (create, execute, refine, resume, status, verify, onboard, author, upgrade), para Claude Code, Cursor, Codex, Gemini e Copilot.
3. **Ele adapta seu repositório** — raciocinando sobre sua stack real (nunca copiando e colando), ele escreve AGENTS.md, `docs/`, READMEs por módulo, um kit `.agents/` fundamentado e um `.dwp/` ignorado pelo git. Seu repositório se torna o harness.
4. **Você planeja e executa** — Deep Work Plans de longo prazo, executados passo a passo contra critérios de aceitação e validation gates explícitos, de forma autônoma por horas.
5. **Uma pessoa inicia o loop** — opcional, com o addon Herdr: você — nunca um agente — executa `herdr-peers autopilot start --loop`. Todo plano aberto com registro de lead continua em execução até o fim, e o seu notificador fica sabendo quando um estagna, é bloqueado ou é concluído.

A skill é o motor reutilizável, instalado da mesma forma em todos os lugares; o que é adaptado é o seu repositório. A mecânica de instalação (CLI de Skills, OpenClaw ou git clone) vive no prompt [/init.md](/init.md) e no [início rápido](/quickstart).

---

## A metodologia, a especificação e o kit

- [Leia a metodologia](/methodology) — o que é o DWP, os princípios, o fluxo de trabalho e como adotá-lo.
- [Leia a especificação](/spec) — anatomia da tarefa, validation gates, o protocolo de conclusão, arquétipos e addons.
- [Explore o kit](/kit) — presets, adaptadores e commands para instalar o DWP em um repositório.
- [Veja exemplos](/examples) — passos a passo de antes e depois de trabalho de engenharia real.

---

## Quem o constrói

O Deep Work Plan nasceu de trabalho de engenharia real na [Dailybot](https://www.dailybot.com) e é mantido pela Dailybot em conjunto com a comunidade de código aberto.

- [Sobre a metodologia](/about)
- [Comunidade e contato](/contact)
- [Repositório no GitHub](https://github.com/DailybotHQ/deepworkplan-website)
