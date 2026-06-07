---
title: Conformidade
description: "A definição normativa de um repositório AI-first, conforme ao DWP: os artefatos que ele DEVE e DEVERIA ter, o que torna um plano bem formado e como verificá-lo."
order: 6
lang: pt
section: Conformance
---

# Conformidade

**Versão 1.0. Status: Estável.** Este documento define o que significa um repositório ser *conforme ao Deep Work Plan* — ou seja, AI-first e pilotável por agentes. As palavras-chave MUST, MUST NOT, SHOULD, SHOULD NOT e MAY devem ser interpretadas conforme descrito na RFC 2119.

A conformidade existe para que "AI-first" seja uma propriedade objetiva e verificável, e não uma impressão. Um repositório atende aos critérios abaixo ou não atende. A [sub-skill `verify`](/kit) (`/dwp-verify`) os verifica de forma mecânica.

## Um repositório conforme

Um repositório conforme ao DWP DEVE (MUST) satisfazer todos os itens a seguir. Todo artefato DEVE (MUST) ser **fundamentado para o repositório** — adaptado às suas linguagens, frameworks e comandos reais. Um stub genérico, um placeholder ou conteúdo copiado de outro repositório não satisfaz um critério.

1. **`AGENTS.md` na raiz.** O repositório DEVE (MUST) conter um `AGENTS.md` na raiz que inclua (a) um índice da documentação, (b) as regras obrigatórias do repositório e (c) um bloco Quick Commands cujos comandos sejam **reais e executáveis** neste repositório. Comandos placeholder (por exemplo, `npm test` em um repositório que não usa npm) NÃO DEVEM (MUST NOT) aparecer.
2. **`CLAUDE.md` resolve para `AGENTS.md`.** Um `CLAUDE.md` DEVE (MUST) existir e resolver para `AGENTS.md` (um symlink, ou um equivalente que garanta uma única fonte de verdade). Os dois NÃO DEVEM (MUST NOT) divergir.
3. **Uma hierarquia `docs/`.** O repositório DEVE (MUST) conter um diretório `docs/` que cubra as categorias padrão (arquitetura, padrões, testes, comandos de desenvolvimento, segurança e onboarding de agentes) com conteúdo real e específico do repositório. Módulos complexos DEVERIAM (SHOULD) ter seu próprio `README.md`.
4. **Um diretório `.agents/`.** O repositório DEVE (MUST) conter um diretório `.agents/` com `agents/`, `commands/` e `skills/`, além de um catálogo em `.agents/docs/` que **corresponda ao que está em disco**. Os comandos `dwp-*` DEVEM (MUST) ser delegadores enxutos para a skill instalada. Um caminho `.claude` DEVE (MUST) resolver para `.agents`.
5. **Um espaço de trabalho `.dwp/` ignorado pelo git.** O repositório DEVE (MUST) conter um diretório `.dwp/` com `plans/` e `drafts/`, e `.dwp/` DEVE (MUST) ser ignorado pelo git. Um espaço de rascunho `tmp/` DEVERIA (SHOULD) existir e DEVERIA (SHOULD) ser ignorado pelo git.
6. **A skill da metodologia é resolvível.** A skill Deep Work Plan DEVE (MUST) estar instalada ou referenciada de modo que um agente no repositório possa invocar suas sub-skills.

Um repositório é **totalmente conforme com zero addons**. Os addons (devcontainer, Dailybot, dependency-upgrade, design-system) são opcionais e NÃO DEVEM (MUST NOT) ser exigidos para a conformidade.

## Um plano bem formado

Um Deep Work Plan em `.dwp/plans/` é bem formado quando:

1. Toda tarefa DEVE (MUST) declarar um **escopo** explícito, **critérios de aceitação** e ao menos um **validation gate** (um comando ou verificação que objetivamente aprova ou reprova).
2. O plano DEVE (MUST) persistir o progresso de modo que o trabalho sobreviva à interrupção e possa ser retomado por um agente diferente.
3. O plano DEVE (MUST) incluir as duas tarefas finais obrigatórias — Skills & Agents Discovery e o Executive Report.
4. As tarefas DEVERIAM (SHOULD) reancorar-se ao objetivo do plano antes de executar, para evitar a deriva ao longo de um horizonte extenso.

## Verificando a conformidade

A conformidade DEVERIA (SHOULD) ser verificada de forma mecânica, e não por inspeção. Executar `/dwp-verify` produz um relatório de aprovado/reprovado em relação aos critérios acima: a presença e o conteúdo real do `AGENTS.md`, a resolução do `CLAUDE.md`, as categorias de `docs/`, a correspondência catálogo-versus-disco de `.agents/`, o status de gitignore de `.dwp/` e `tmp/` e — para um plano — que cada tarefa carrega critérios de aceitação e um validation gate.

Um repositório DEVERIA (SHOULD) ser reverificado após o onboarding e após cada plano concluído, de modo que a conformidade seja mantida, e não afirmada uma única vez.
