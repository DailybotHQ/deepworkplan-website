---
title: "Sobre a metodologia"
description: "O Deep Work Plan é uma metodologia aberta e independente de framework para trabalho de engenharia sério com agentes de código de IA. De onde veio e quem a mantém."
lastUpdated: 2026-05-30
---

## O que é

O Deep Work Plan (DWP) é uma metodologia, não um produto. Ele define como transformar um objetivo em um plano acordado, dividir esse plano em tarefas atômicas e verificáveis de forma independente, e executar cada tarefa em um loop focado que termina com uma verificação.

É uma metodologia orientada a especificação: o plano é a fonte de verdade duradoura e os agentes executam contra critérios de aceitação e validation gates explícitos. Ao contrário de sistemas orientados a especificação atrelados a ferramentas, como GitHub Spec Kit, Amazon Kiro ou Tessl, o DWP é independente de ferramenta e nativo do repositório. É também engenharia de harness tornada portátil — o contexto, as salvaguardas e o estado retomável que tornam um agente confiável são instalados no próprio repositório (AGENTS.md, docs, o diretório de skills .agents/, a skill DWP), de modo que qualquer agente possa pilotar qualquer repositório.

É deliberadamente independente de qual agente de IA ou stack você usa — adaptadores traduzem o mesmo loop central para Claude, Cursor, Copilot, Codex, Gemini e outros. O plano, as tarefas e o registro de execução são todos Markdown puro, de modo que o trabalho permanece legível, revisável e versionado.

---

## Princípios fundamentais

- **Planejar antes de executar** — Nenhum código é escrito até que o plano seja acordado. O plano é um contrato entre você e o agente. [Leia a metodologia](/methodology)
- **As tarefas são atômicas** — Cada tarefa tem escopo definido para que possa ser executada e verificada por si só, e então comitada de forma atômica. [Veja a especificação](/spec)
- **Verifique tudo** — Cada tarefa termina com uma verificação explícita antes que a próxima comece, com o progresso registrado no git. [Explore o kit](/kit)

---

## Em resumo

- Metodologia aberta, licenciada sob MIT
- Independente de framework e de agente
- Mantida pela Dailybot e pela comunidade
- Inclui uma especificação, commands, adaptadores, presets e exemplos
- Apenas Markdown — sem runtime, sem lock-in
- Transforma qualquer repositório em uma base de código AI-first, pilotável por agentes

---

## Quem a mantém

O Deep Work Plan nasceu de trabalho de engenharia real na [Dailybot](https://www.dailybot.com) e agora é mantido pela Dailybot em conjunto com a comunidade de código aberto. A metodologia, a especificação e o kit são lançados sob a licença MIT — livres para usar, adaptar e construir em cima.

- [Leia a metodologia](/methodology)
- [Início rápido](/quickstart)
- [Repositório no GitHub](https://github.com/DailybotHQ/deepworkplan-website)
