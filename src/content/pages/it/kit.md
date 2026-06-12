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

Capacità opzionali che il flusso di onboard può aggiungere a un repo — mai parte della baseline AI-first:

- **Devcontainer** — un dev container riproducibile e isolato con autenticazione AI-CLI persistente.
- **Dailybot** — report best-effort di progressi e milestone per i team che usano Dailybot.
- **Dependency upgrade** — aggiornamenti indipendenti dal package manager, a lotti, validati e annullabili.
- **Design system** — un `DESIGN.md` con ambito di interfaccia (in `docs/DESIGN.md`, referenziato da `AGENTS.md`) ragionato dalla fonte di design reale del repo, con profili per UI visuale, output CLI stilizzato e messaggistica conversazionale, così che gli agenti generino output di interfaccia on-brand; il profilo visuale è attivo di default quando un design system viene rilevato, mentre i profili CLI e conversazionale sono raccomandati quando rilevati e sempre proposti con una domanda.

### Esempi

Procedure pratiche con confronto prima-e-dopo.

- [Esplora il kit](/kit)
- [Avvio rapido](/quickstart)
- [Guarda gli esempi](/examples)
