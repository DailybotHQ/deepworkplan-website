---
title: "O Kit do Deep Work Plan"
description: "A skill e suas nove sub-skills, commands, adaptadores de agente, presets de onboarding, addons opcionais e exemplos que tornam o Deep Work Plan executável em qualquer lugar."
lastUpdated: 2026-10-09
---

## O Kit do Deep Work Plan

O kit é tudo o que você precisa para executar a metodologia na prática. Ele é instalado a partir de
`DailybotHQ/deepworkplan-skill`:

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.0 --skill deepworkplan -y
```

O pacote 7.x atual cria novos planos com v7 por padrão. Os planos existentes mantêm a geração registrada; a migração exige uma solicitação explícita.

### A skill e suas sub-skills

A skill Deep Work Plan é um roteador mais nove sub-skills:

- **create** — decompor um objetivo em um plano estruturado (`/dwp-create`).
- **execute** — executar um plano tarefa a tarefa, validando cada gate (`/dwp-execute`).
- **refine** — adicionar, remover ou reordenar tarefas, preservando o trabalho concluído (`/dwp-refine`).
- **resume** — reconstruir o estado e continuar um plano interrompido (`/dwp-resume`).
- **status** — relatar o progresso sem fazer alterações (`/dwp-status`).
- **verify** — verificar objetivamente a conformidade do repositório e do plano (`/dwp-verify`).
- **onboard** — tornar um repositório AI-first (`/deepworkplan-onboard`).
- **author** — criar ou evoluir as próprias skills, agents e commands do repositório (`/skill-create`, `/agent-create`).
- **upgrade** — leva uma skill instalada com segurança para uma versão mais recente (`/dwp-upgrade`).

### Commands

Slash commands enxutos delegam às sub-skills e aos addons:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — o loop de planejar-executar-verificar.
- `skill-create`, `agent-create` — delegam à sub-skill author.
- `lib-upgrade` — delega ao addon dependency-upgrade (instalado apenas quando esse addon é aceito).

### Adaptadores

Integrações enxutas por agente para Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline e Antigravity. Os adaptadores OpenClaw e Hermes cobrem plataformas de agentes autônomos que executam planos sob o perfil de execução não supervisionada, dirigidos por heartbeat ou agendamento cron. O adaptador para agentes em nuvem cobre sessões efêmeras (tarefas remotas do Claude Code, Codex cloud, agentes classe Jules) que executam contra um plano `.dwp/` durável.

### Presets de onboarding

Guias de raciocínio por stack que o fluxo de onboarding usa para adaptar docs, skills e comandos de validação —
nunca templates. Seis presets: Django, Vue + Vite, Astro/Svelte, serviço Node/TS, pacote/CLI Python
e um fallback genérico.

### Addons (opcionais)

Capacidades que o fluxo de onboarding adiciona a um repositório. Sete são opcionais e nunca fazem parte da base AI-first; a revisão local do AI Diff Reviewer é obrigatória desde o padrão 2.3.0:

- **Devcontainer** — um dev container reproduzível e isolado com auth de CLI de IA persistente.
- **Dailybot** — relatórios de progresso e marcos em modo best-effort para equipes que usam a Dailybot.
- **Atualização de dependências** — atualizações independentes do gerenciador de pacotes, em lotes, validadas e reversíveis.
- **Design system** — um `DESIGN.md` com escopo de interface (em `docs/DESIGN.md`, referenciado a partir do `AGENTS.md`) derivado da fonte real de design do repositório, com perfis para UI visual, saída de CLI estilizada e mensagens conversacionais, para que os agentes gerem saída de interface fiel à marca; quando um design system é detectado a oferta é obrigatória enquanto a instalação fica protegida por aceitação — o perfil visual é recomendado com força quando detectado, e os perfis de CLI e conversacional são recomendados quando detectados e sempre perguntados.
- **AI Diff Reviewer** — a revisão local obrigatória: o onboarding instala o [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, e o passe de segurança de cada Final Review a executa; o Flow B opcional adiciona uma barreira de merge de PR em CI que compartilha a mesma extensão, oferecida explicitamente e nunca instalada sem ser pedida.
- **[Herdr](/pt/kit/herdr)** — delegação interativa: um plano entrega uma tarefa delimitada a um agente de programação em outro painel do Herdr e registra sua única resposta autorizada.
- **[DeepWorkPlan Vim](/pt/kit/vim)** — o editor de terminal para o Deep Work Plan, com um índice de comandos, um navegador de planos somente leitura e um visualizador de Markdown.
- **[Agentkit](/pt/kit/agentkit)** — um único comando `ak` para todo agente de programação no terminal, e delegação sem interface (headless) de tarefas delimitadas do plano.

### Ecossistema

**A metodologia funciona sozinha. Os addons a amplificam.** Cada addon é um integrador leve dentro da skill do Deep Work Plan, fixado por tag a um produto com o seu próprio repositório, versão e versão de interface. Cada produto funciona sem o Deep Work Plan, e nenhum addon é obrigatório.

- **Skill do Deep Work Plan** — Cria, executa, verifica, retoma e refina planos. Não precisa de nenhum addon.
- **[herdr](/pt/kit/herdr)** — Pares em painéis do Herdr, em qualquer máquina: delegação interativa com uma única resposta autorizada. Fixado em `herdr-peers@v0.1.0`.
- **[agentkit](/pt/kit/agentkit)** — Um único comando ak para cada agente de programação no terminal: autonomia por padrão com opt-out, e delegação sem interface em uma worktree. Fixado em `coding-agents-kit@v0.3.0`.
- **[devcontainer](/pt/kit/devcontainer)** — O contêiner de desenvolvimento próprio de cada repositório a partir de um único template: agentes via ak, Herdr nos dois sentidos, nenhuma chave SSH dentro. Fixado em `devcontainer-kit@v0.2.1`.
- **[vim](/pt/kit/vim)** — O editor de terminal, com um navegador de planos somente leitura e um visualizador de Markdown. Fixado em `deepworkplan-vim@v0.5.1`.

O registro de addons e os descritores são distribuídos no Deep Work Plan v7: `v7.0.0`

### Exemplos

Passos a passo práticos, de antes e depois.

- [Explore o kit](/kit)
- [Início rápido](/quickstart)
- [Veja exemplos](/examples)
