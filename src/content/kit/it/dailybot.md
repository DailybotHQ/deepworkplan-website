---
title: Dailybot
description: "Addon DWP opt-in: collega il ciclo di vita del piano a un team Dailybot, enforcement opzionale degli hook e la skill agente Dailybot completa 3.4.0 (chat, check-in, moduli, ask AI e altro)."
kind: addon
lang: it
order: 2
---

# Addon Dailybot

Collega l'esecuzione di Deep Work Plan a un **team Dailybot** così che gli umani vedano cosa stanno costruendo gli agenti — kickoff, progressi a metà piano, blocchi e completamento — senza aggiungere riunioni o un secondo toolchain. Un addon **opt-in** per i team che già usano [Dailybot](https://www.dailybot.com).

La metodologia Deep Work Plan di base ha **zero** dipendenze da Dailybot. Un repository senza addon è pienamente conforme. Offri questo addon solo quando lo sviluppatore o il team usa già Dailybot; non installarlo mai automaticamente per tutti.

## Quando usarlo

| Segnale | Azione |
|--------|--------|
| Il team usa già Dailybot (Slack, Teams, Discord, Google Chat o la dashboard) | **Consiglia** durante l'onboarding |
| Lo sviluppatore chiede visibilità sui progressi degli agenti o aggiornamenti in stile standup | **Offri** l'addon |
| Repository greenfield senza account Dailybot | **Salta** — la baseline vendor-neutral è sufficiente |
| Lavoro per clienti sotto NDA in cui i progressi non devono uscire dal repo | **Salta**, oppure committa `.dailybot/disabled` come kill-switch locale |

## Cosa collega questo addon (volutamente ristretto)

L'addon DWP Dailybot **non** reinventa Dailybot. Collega l'esecuzione del piano alla sub-skill dailybot **`report`** e opzionalmente committa gli hook del harness. Tutto il resto — installazione, consenso, autenticazione, stile di scrittura — è **delegato** alla [skill agente Dailybot](https://github.com/DailybotHQ/agent-skill) ufficiale (attualmente **3.4.0**).

### Quattro eventi del ciclo di vita

Durante `create` / `execute` di DWP, l'addon collega **quattro aggiornamenti agente best-effort**. Ogni evento è condizionale (Dailybot presente e autenticato), non bloccante e rispetta `.dailybot/disabled`.

| Evento | Trigger | Livello | Requisito |
|-------|---------|-------|-------------|
| **Kickoff** | Piano materializzato e approvato, oppure primo turno di `execute` | regular | SHOULD |
| **Significant task** | Completamento di una feature, bug fix o refactor importante — non attività di setup | regular | MAY |
| **Blocked** | Il piano si ferma; `state.json.blocked` popolato (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Tutte le attività completate; il piano termina | **milestone** | SHOULD |

I payload derivano dal layer di stato del piano (`state.json`) quando presente: `completed` come risultati (non numeri di task), `in_progress` dal task corrente, `blockers` da `state.json.blocked`. Il messaggio descrive **cosa è stato costruito e perché** — mai percorsi di file, statistiche git, nomi di branch o ID del piano.

### Enforcement opzionale degli hook

Con `dailybot-cli >= 3.1.2`, l'addon **può** committare hook del harness a livello di repository (`dailybot hook session-start | activity | post-commit | stop | dismiss`) supportati da un registro locale per repository. Il harness ricorda all'agente a fine turno quando un evento del ciclo di vita è stato perso — critico per le lunghe sessioni non presidiate in cui le istruzioni del prompt si diluiscono.

Un report del ciclo di vita riuscito **azzera** il registro degli hook, così i due livelli non raddoppiano mai i report. I comandi degli hook leggono solo stato locale ed escono sempre con `0`.

### Identità del repo e policy di report

Committa opzionalmente `.dailybot/profile.json` (o `.dailybot_example/profile.json` come template) così ogni contributor e agente firma i report allo stesso modo. **Non** inserire mai credenziali in quel file — un campo `key` è un errore grave.

Lo stesso file può contenere la policy di report che gli hook rispettano:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` è particolarmente utile per repository orientati a ricerca o documentazione: il lavoro senza commit (analisi, documenti di design, piani) viene sollecitato prima.

## Installazione (tutto opt-in)

L'addon **offre** percorsi di installazione; la skill Dailybot gestisce consenso e verifica.

| Componente | Comando / percorso |
|-----------|----------------|
| **Skill agente Dailybot** (consigliata) | `npx skills add DailybotHQ/agent-skill` |
| **Aggiorna skill esistente** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimo `>= 3.1.2`) | Installata dalla skill al primo utilizzo tramite `shared/auth.md` verificato; oppure `pip install 'dailybot-cli>=3.1.2'`, Homebrew o l'installer con checksum verificato su [cli.dailybot.com](https://cli.dailybot.com) |

Verifica versioni: `dailybot --version` e `dailybot version --check`. Aggiornamento: `dailybot upgrade`.

## Autenticazione — delegata

Questo addon **non** chiede mai email, OTP o API key e **non** memorizza credenziali. L'autenticazione è gestita da [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md) della skill Dailybot:

- `dailybot login` (email OTP), oppure
- `DAILYBOT_API_KEY` / `dailybot config key=...`

Se l'autenticazione viene rifiutata o non è disponibile, il reporting viene saltato in silenzio — il lavoro continua.

## La skill Dailybot abbinata — 13 capacità (3.4.0)

Installare la skill agente Dailybot porta molto più di quanto l'addon DWP collega. Il pacchetto skill ufficiale (skill **3.4.0**, CLI **>= 3.1.2**, publish corrente **3.2.1**) espone **13 sub-skill coordinate**:

| Sub-skill | Cosa fa |
|-----------|--------------|
| **Progress reports** | Aggiornamenti agente in stile standup sulla dashboard Dailybot |
| **Ask the AI** | Query one-shot headless all'assistente AI Dailybot |
| **Message polling** | Controlla istruzioni del team all'avvio della sessione o in idle |
| **Email** | Invia email con controlli di sicurezza obbligatori prima dell'invio |
| **Chat** | Invia o modifica su Slack, Microsoft Teams, Discord o Google Chat — canali, DM, team, thread in stile report, send-as-user (Slack, admin) |
| **Conversations** | Apre o riusa una group DM Slack con il bot e colleghi nominati; pubblica un report nella stessa chiamata |
| **Health and status** | Annuncia agente online/offline per sessioni long-running |
| **Check-ins** | Completa standup; **author** check-in (pianificazione, partecipanti, domande, promemoria, impostazioni AI) |
| **Kudos** | Riconosce colleghi o interi team; sfoglia feed di riconoscimenti, feed org, wall of fame |
| **Teams** | Elenca team, ispeziona membri, risolve nomi in UUID; `me`, `org`, profili utente |
| **Forms** | Elenca, invia, aggiorna, transiziona moduli; **author** moduli (stati workflow, permessi, ChatOps) |
| **Workflows** | Legge workflow org (`workflow list` / `workflow get`; sola lettura) |
| **Report channels** | Scopre UUID dei canali per moduli o check-in |

**L'addon DWP collega solo `report` all'esecuzione del piano.** Invoca la skill Dailybot direttamente per tutto il resto — ad esempio, pubblica un riepilogo deploy su `#releases`, completa uno standup o chiedi all'AI Dailybot di riassumere le tendenze dei check-in.

Riferimento pubblico: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Sorgente: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Modello di fiducia: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) nel pacchetto skill.

## Comportamento — delega, mai blocca

| Regola | Dettaglio |
|------|--------|
| **Delega** | La skill Dailybot gestisce installazione, consenso, auth, template degli hook, stile di scrittura |
| **Mai blocca** | CLI assente, auth fallita, errore di rete → avvisa una volta, continua il lavoro principale |
| **Nessun retry** | Non entrare in loop diagnostici; il reporting è best-effort |
| **Riconcilia** | Skill, CLI, profile, hook o wiring di report esistenti vengono preservati — si colmano solo le lacune |
| **Vendor-neutral** | DWP non richiede Dailybot; questo addon è visibilità di team additiva |

## Flusso di onboarding

Durante `onboard` di DWP **Fase 7b**, dopo lo scaffolding AI-first di base, il flusso offre quattro addon opt-in. Se lo sviluppatore accetta Dailybot:

1. Rileva setup esistente (skill, CLI, `.dailybot/profile.json`, hook, passo report).
2. Offre installazione skill/CLI tramite i flussi di consenso di Dailybot.
3. Delega l'autenticazione a `shared/auth.md`.
4. Collega i quattro eventi del ciclo di vita in `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Offre opzionalmente enforcement degli hook e `.dailybot/profile.json`.
6. Esegue la validazione (SPEC §8 in `addons/dailybot/SPEC.md` della skill).

Contratto normativo nella skill Deep Work Plan: `addons/dailybot/SPEC.md` (versione **2.3.0**).

## Voci kit correlate

- [Devcontainer](/kit/devcontainer) — ambiente di sviluppo riproducibile con persistenza CLI Dailybot (primo addon)
- [Dependency upgrade](/kit/dependency-upgrade) — aggiornamenti dipendenze in batch e validati (terzo addon)
- [Design system](/kit/design-system) — `DESIGN.md` orientato agli agenti per superfici di interfaccia (quarto addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — la sub-skill di onboarding che offre gli addon
