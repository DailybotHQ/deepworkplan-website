---
title: "Il kit Deep Work Plan"
description: "La skill e le sue otto sub-skill, i comandi, gli adapter per gli agenti, i preset di onboarding, gli addon opt-in e gli esempi che rendono Deep Work Plan eseguibile ovunque."
lastUpdated: 2026-05-31
---

## Il kit Deep Work Plan

Il kit è tutto ciò che serve per eseguire la metodologia nella pratica. Si installa da
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### La skill e le sue sub-skill

La skill Deep Work Plan è un router più otto sub-skill:

- **create** — scompone un obiettivo in un piano strutturato (`/dwp-create`).
- **execute** — esegue un piano attività per attività, validando ogni gate (`/dwp-execute`).
- **refine** — aggiunge, rimuove o riordina attività preservando il lavoro completato (`/dwp-refine`).
- **resume** — ricostruisce lo stato e continua un piano interrotto (`/dwp-resume`).
- **status** — riferisce sui progressi senza apportare modifiche (`/dwp-status`).
- **verify** — verifica in modo oggettivo la conformità di repository e piani (`/dwp-verify`).
- **onboard** — rende un repository AI-first (`/deepworkplan-onboard`).
- **author** — crea o fa evolvere le skill, gli agenti e i comandi propri del repo (`/skill-create`, `/agent-create`).

### Comandi

I sottili slash command delegano alle sub-skill e agli addon:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — il ciclo pianifica-esegui-verifica.
- `skill-create`, `agent-create` — delegano alla sub-skill author.
- `lib-upgrade` — delega all’addon dependency-upgrade (installato solo quando quell’addon è accettato).

### Adapter

Integrazioni sottili per agente per Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline, Antigravity, OpenClaw, Hermes e agenti cloud/in background (task remote di Claude Code, Codex cloud, agenti di classe Jules). OpenClaw e Hermes sono piattaforme di agenti autonomi che eseguono i piani sotto il profilo di esecuzione non presidiata, guidate da heartbeat o scheduling cron.

### Preset di onboarding

Guide di ragionamento per stack che il flusso di onboard usa per adattare docs, skill e comandi di validazione —
mai template. Sei preset: Django, Vue + Vite, Astro/Svelte, Node/TS service, Python package/CLI
e un fallback generico.

### Addon (opt-in)

Capacità che il flusso di onboard aggiunge a un repo. Quattro sono opzionali e mai parte della baseline AI-first; la revisione locale AI Diff Reviewer è richiesta dallo standard 2.3.0:

- **Devcontainer** — un dev container riproducibile e isolato con autenticazione AI-CLI persistente.
- **Dailybot** — report del ciclo di vita del piano (kickoff, attività significativa, bloccato, completamento) per i team che usano Dailybot, più accesso alla skill agente Dailybot completa (3.10.3: chat, check-in, form, ask AI, API key per repository e altro).
- **Dependency upgrade** — aggiornamenti indipendenti dal package manager, a lotti, validati e annullabili.
- **Design system** — un `DESIGN.md` con ambito di interfaccia (in `docs/DESIGN.md`, referenziato da `AGENTS.md`) ragionato dalla fonte di design reale del repo, con profili per UI visuale, output CLI stilizzato e messaggistica conversazionale, così che gli agenti generino output di interfaccia on-brand; il profilo visuale è attivo di default quando un design system viene rilevato, mentre i profili CLI e conversazionale sono raccomandati quando rilevati e sempre proposti con una domanda.
- **AI Diff Reviewer** — la revisione locale richiesta: l'onboarding installa [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v2 + `.review/extension.md`, e il passaggio di sicurezza di ogni Final Review la esegue; il Flow B opzionale aggiunge un gate di merge PR in CI che condivide la stessa estensione, offerto esplicitamente e mai installato senza richiesta.

### Esempi

Procedure pratiche con confronto prima-e-dopo.

- [Esplora il kit](/kit)
- [Avvio rapido](/quickstart)
- [Guarda gli esempi](/examples)
