---
title: "Deep Work Plan — execução estruturada para agentes de código de IA"
description: "O contexto importa mais do que os modelos. O Deep Work Plan transforma qualquer repositório em um ambiente estruturado onde qualquer agente de código conclui trabalhos de longo prazo."
lastUpdated: 2026-06-03
---

## Os modelos importam. O contexto importa mais.

O Deep Work Plan transforma qualquer repositório em um ambiente estruturado — contexto, salvaguardas e um plano duradouro — onde qualquer agente de código executa com precisão e conclui trabalhos de longo prazo.

O Deep Work Plan (DWP) é uma metodologia e um kit abertos, licenciados sob MIT, para planejar e executar trabalho de software complexo com agentes de IA. Você não escolhe um método de instalação nem copia um template — você entrega uma linha ao seu agente:

> Leia e siga as instruções em https://deepworkplan.com/init.md para tornar este repositório AI-first.

> O Deep Work Plan é desenvolvimento orientado a especificação no qual o próprio repositório se torna o harness.

- [Abrir o prompt do /init](/init)
- [Leia a metodologia](/methodology)

---

## O problema e a resposta

Os agentes de código de IA são notavelmente eficazes em surtos curtos. Em trabalhos de longo prazo — uma migração, um novo subsistema, uma refatoração que abrange dezenas de arquivos — eles derivam: o contexto se enche, as decisões são esquecidas e tarefas de várias horas são abandonadas no meio do caminho.

O Deep Work Plan responde com **desenvolvimento orientado a especificação**: o plano é a fonte de verdade duradoura e os agentes executam contra critérios de aceitação e validation gates explícitos. A deriva diminui, o trabalho permanece verificável e qualquer agente pode retomá-lo entre sessões. Ao contrário das ferramentas orientadas a especificação atreladas a uma única IDE ou fornecedor (GitHub Spec Kit, Amazon Kiro, Tessl), o DWP é independente de ferramenta e nativo do repositório.

É também **engenharia de harness** tornada portátil. Um harness de agente é o andaime ao redor de um modelo — contexto, ferramentas, loop de controle, salvaguardas, estado retomável — que o torna confiável. O Deep Work Plan instala esse harness no próprio repositório, de modo que qualquer agente possa pilotar qualquer repositório.

---

## O que você obtém

- AGENTS.md na raiz do repositório, fundamentado na sua stack e nos seus comandos reais.
- `docs/` categorizado e documentação por módulo.
- Um diretório `.agents/` (skills, agents, commands) com o symlink de `.claude` para `.agents`.
- A skill Deep Work Plan, instalada uma vez para todos os agentes — incluindo a sub-skill author, para que o repositório possa fazer crescer suas próprias skills, agents e commands, além de addons de manutenção opcionais como dependency-upgrade.
- Planos de longo prazo e retomáveis em uma pasta `.dwp/` ignorada pelo git.

---

## O que acontece quando você o executa

1. **Seu agente abre o [/init.md](/init.md)** — ele lê o prompt de onboarding e a metodologia, a especificação e o kit aos quais ele se vincula.
2. **Ele instala a skill Deep Work Plan** — o motor, idêntico em todos os repositórios: o roteador mais suas sub-skills (create, execute, refine, resume, status, verify, onboard, author), para Claude Code, Cursor, Codex, Gemini e Copilot.
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
