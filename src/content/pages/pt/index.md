---
title: "Deep Work Plan — execução estruturada para agentes de código de IA"
description: "O contexto importa mais do que os modelos. O Deep Work Plan transforma qualquer repositório em um ambiente estruturado onde qualquer agente de código conclui trabalhos de longo prazo."
lastUpdated: 2026-09-10
---

## Os modelos importam. O contexto importa mais.

O Deep Work Plan transforma qualquer repositório em um ambiente estruturado — contexto, guardrails e um plano duradouro — onde qualquer agente de código executa com precisão e eficiência e conclui o trabalho de longo alcance.

O Deep Work Plan (DWP) é uma metodologia e um kit abertos, licenciados sob MIT, para planejar e executar trabalho de software complexo com agentes de IA. Você não escolhe um método de instalação nem copia um template — você copia o prompt do init.md e cola no seu agente:

> Copie o prompt do init.md e cole-o no seu agente de código — Claude Code, Cursor, Codex, ou qualquer outro — para tornar qualquer repositório AI-first.

> O Deep Work Plan é desenvolvimento orientado a especificação no qual o próprio repositório se torna o harness.

- [Abrir o prompt do /init](/init)
- [Leia a metodologia](/methodology)

---

## O problema e a resposta

Em rajadas curtas, agentes de código são notáveis. Confie a um deles uma missão de longo alcance — uma migração, um subsistema novo, uma refatoração em dezenas de arquivos — e ele desvia: o contexto enche, decisões anteriores se perdem e horas de trabalho ficam pela metade.

O Deep Work Plan responde com desenvolvimento guiado por especificação: um plano duradouro, tarefas atômicas e validation gates que o agente precisa passar. O trabalho continua verificável — e qualquer agente pode retomá-lo entre sessões.

E como o contexto é o recurso mais escasso do seu agente, o harness é projetado para a eficiência de tokens: instruções carregam progressivamente, a validação toca apenas o que mudou e cada tarefa aprende localmente — assim o trabalho de longo prazo continua acessível. O próprio plano escala da mesma forma: um plano Lite para uma correção delimitada, um plano Full para o trabalho que se estende por horas — o formato sempre segue o alcance do trabalho, e não o contrário.
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

## O que você obtém

- AGENTS.md na raiz do repositório, fundamentado na sua stack e nos seus comandos reais.
- `docs/` categorizado e documentação por módulo.
- Um diretório `.agents/` (skills, agents, commands) com o symlink de `.claude` para `.agents`.
- A skill Deep Work Plan, instalada uma vez para todos os agentes — incluindo a sub-skill author, para que o repositório possa fazer crescer suas próprias skills, agents e commands, além de addons opcionais como dependency-upgrade e o addon design-system para qualquer superfície de interface voltada ao usuário.
- Planos de longo prazo e retomáveis em uma pasta `.dwp/` ignorada pelo git.

---

## O que acontece quando você o executa

1. **Seu agente abre o [/init.md](/init.md)** — ele lê o prompt de onboarding e a metodologia, a especificação e o kit aos quais ele se vincula.
2. **Ele instala a skill Deep Work Plan** — o motor, idêntico em todos os repositórios: o roteador mais suas sub-skills (create, execute, refine, resume, status, verify, onboard, author, upgrade), para Claude Code, Cursor, Codex, Gemini e Copilot.
3. **Ele adapta seu repositório** — raciocinando sobre sua stack real (nunca copiando e colando), ele escreve AGENTS.md, `docs/`, READMEs por módulo, um kit `.agents/` fundamentado e um `.dwp/` ignorado pelo git. Seu repositório se torna o harness.
4. **Você planeja e executa** — Deep Work Plans de longo prazo, executados passo a passo contra critérios de aceitação e validation gates explícitos, de forma autônoma por horas.

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
