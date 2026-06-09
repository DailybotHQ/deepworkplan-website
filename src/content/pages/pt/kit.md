---
title: "O Kit do Deep Work Plan"
description: "A skill e suas oito sub-skills, commands, adaptadores de agente, presets de onboarding, addons opcionais e exemplos que tornam o Deep Work Plan executável em qualquer lugar."
lastUpdated: 2026-05-31
---

## O Kit do Deep Work Plan

O kit é tudo o que você precisa para executar a metodologia na prática. Ele é instalado a partir de
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### A skill e suas sub-skills

A skill Deep Work Plan é um roteador mais oito sub-skills:

- **create** — decompor um objetivo em um plano estruturado (`/dwp-create`).
- **execute** — executar um plano tarefa a tarefa, validando cada gate (`/dwp-execute`).
- **refine** — adicionar, remover ou reordenar tarefas, preservando o trabalho concluído (`/dwp-refine`).
- **resume** — reconstruir o estado e continuar um plano interrompido (`/dwp-resume`).
- **status** — relatar o progresso sem fazer alterações (`/dwp-status`).
- **verify** — verificar objetivamente a conformidade do repositório e do plano (`/dwp-verify`).
- **onboard** — tornar um repositório AI-first (`/deepworkplan-onboard`).
- **author** — criar ou evoluir as próprias skills, agents e commands do repositório (`/skill-create`, `/agent-create`).

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

Capacidades opcionais que o fluxo de onboarding pode adicionar a um repositório — nunca parte da base AI-first:

- **Devcontainer** — um dev container reproduzível e isolado com auth de CLI de IA persistente.
- **Dailybot** — relatórios de progresso e marcos em modo best-effort para equipes que usam a Dailybot.
- **Atualização de dependências** — atualizações independentes do gerenciador de pacotes, em lotes, validadas e reversíveis.
- **Design system** — um `DESIGN.md` com escopo de frontend (em `docs/DESIGN.md`, referenciado a partir do `AGENTS.md`) derivado dos tokens de design reais do repositório, para que os agentes gerem UI fiel à marca; ativado por padrão quando um design system é detectado.

### Exemplos

Passos a passo práticos, de antes e depois.

- [Explore o kit](/kit)
- [Início rápido](/quickstart)
- [Veja exemplos](/examples)
