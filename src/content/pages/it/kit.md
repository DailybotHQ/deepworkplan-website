---
title: "Il kit Deep Work Plan"
description: "La skill e le sue nove sub-skill, i comandi, gli adapter per gli agenti, i preset di onboarding, gli addon opt-in e gli esempi che rendono Deep Work Plan eseguibile ovunque."
lastUpdated: 2026-10-09
---

## Il kit Deep Work Plan

Il kit è tutto ciò che serve per eseguire la metodologia nella pratica. Si installa da
`DailybotHQ/deepworkplan-skill`:

```bash
npx --yes skills add https://github.com/DailybotHQ/deepworkplan-skill/tree/v7.1.0 --skill deepworkplan -y
```

Il pacchetto 7.x attuale crea per impostazione predefinita i nuovi piani in v7. I piani esistenti mantengono la generazione registrata; la migrazione richiede una richiesta esplicita.

### La skill e le sue sub-skill

La skill Deep Work Plan è un router più nove sub-skill:

- **create** — scompone un obiettivo in un piano strutturato (`/dwp-create`).
- **execute** — esegue un piano attività per attività, validando ogni gate (`/dwp-execute`).
- **refine** — aggiunge, rimuove o riordina attività preservando il lavoro completato (`/dwp-refine`).
- **resume** — ricostruisce lo stato e continua un piano interrotto (`/dwp-resume`).
- **status** — riferisce sui progressi senza apportare modifiche (`/dwp-status`).
- **verify** — verifica in modo oggettivo la conformità di repository e piani (`/dwp-verify`).
- **onboard** — rende un repository AI-first (`/deepworkplan-onboard`).
- **author** — crea o fa evolvere le skill, gli agenti e i comandi propri del repo (`/skill-create`, `/agent-create`).
- **upgrade** — porta una skill installata a una release più recente in sicurezza (`/dwp-upgrade`).

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

Capacità che il flusso di onboard aggiunge a un repo. Sette sono opzionali e mai parte della baseline AI-first; la revisione locale AI Diff Reviewer è richiesta dallo standard 2.3.0:

- **Devcontainer** — un dev container riproducibile e isolato con autenticazione AI-CLI persistente.
- **Dailybot** — report del ciclo di vita del piano (kickoff, attività significativa, bloccato, completamento) per i team che usano Dailybot, più accesso alla skill agente Dailybot completa (3.23.3: chat, check-in, form, ask AI, Plan, API key per repository e altro).
- **Dependency upgrade** — aggiornamenti indipendenti dal package manager, a lotti, validati e annullabili.
- **Design system** — un `DESIGN.md` con ambito di interfaccia (in `docs/DESIGN.md`, referenziato da `AGENTS.md`) ragionato dalla fonte di design reale del repo, con profili per UI visuale, output CLI stilizzato e messaggistica conversazionale, così che gli agenti generino output di interfaccia on-brand; quando un design system viene rilevato l'offerta è obbligatoria ma l'installazione è subordinata a un'accettazione — il profilo visuale è fortemente raccomandato quando rilevato, mentre i profili CLI e conversazionale sono raccomandati quando rilevati e sempre proposti con una domanda.
- **AI Diff Reviewer** — la revisione locale richiesta: l'onboarding installa [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, e il passaggio di sicurezza di ogni Final Review la esegue; il Flow B opzionale aggiunge un gate di merge PR in CI che condivide la stessa estensione, offerto esplicitamente e mai installato senza richiesta.
- **[Herdr](/it/kit/herdr)** — delega interattiva: un piano affida un’attività delimitata a un agente di coding in un altro pannello Herdr e registra la sua unica risposta autorizzata.
- **[DeepWorkPlan Vim](/it/kit/vim)** — l’editor da terminale per Deep Work Plan, con un indice dei comandi, un browser dei piani in sola lettura e un visualizzatore Markdown.
- **[Agentkit](/it/kit/agentkit)** — un unico comando `ak` per ogni agente di coding da terminale e la delega headless di attività delimitate del piano.

### Ecosistema

**La metodologia funziona da sola. Gli addon la amplificano.** Ogni addon è un integratore leggero all’interno della skill Deep Work Plan, fissato tramite tag a un prodotto con il proprio repository, la propria release e la propria versione di interfaccia. Ogni prodotto funziona senza Deep Work Plan, e nessun addon è obbligatorio.

- **Skill Deep Work Plan** — Crea, esegue, verifica, riprende e affina i piani. Non richiede alcun addon.
- **[herdr](/it/kit/herdr)** — Peer in pannelli Herdr, su qualsiasi macchina: delega interattiva con una sola risposta autorizzata. Fissato a `herdr-peers@v0.1.0`.
- **[agentkit](/it/kit/agentkit)** — Un solo comando ak per ogni agente di codice da terminale: autonomia predefinita con opt-out, e delega headless in un worktree. Fissato a `coding-agents-kit@v0.3.0`.
- **[devcontainer](/it/kit/devcontainer)** — Il container di sviluppo proprio di ogni repository da un unico template: agenti tramite ak, Herdr in entrambi i sensi, nessuna chiave SSH all’interno. Fissato a `devcontainer-kit@v0.2.1`.
- **[vim](/it/kit/vim)** — L’editor da terminale, con un browser dei piani in sola lettura e un visualizzatore Markdown. Fissato a `deepworkplan-vim@v0.5.1`.

Il registro degli addon e i descrittori sono distribuiti in Deep Work Plan v7: `v7.0.0`

### Esempi

Procedure pratiche con confronto prima-e-dopo.

- [Esplora il kit](/kit)
- [Avvio rapido](/quickstart)
- [Guarda gli esempi](/examples)
