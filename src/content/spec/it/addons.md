---
title: Add-on
description: "Estensioni DWP opzionali: cinque addon (devcontainer, Dailybot, dependency-upgrade, design-system, AI Diff Reviewer), contratto e concetti del kit."
order: 5
lang: it
section: Addons
---

# Add-on

**Versione 2.0.** Gli add-on sono estensioni opzionali della metodologia Deep Work Plan di base. **Non sono mai richiesti per la conformità** — un repository senza addon è pienamente AI-first e conforme a DWP. Ogni addon viene offerto durante l'onboarding, accettato o rifiutato esplicitamente e — se accettato — **riconcilia** con il setup esistente invece di sovrascriverlo.

## Il contratto addon

Ogni addon in produzione fornisce quattro componenti obbligatori:

| Componente | Scopo |
|-----------|---------|
| **Spec** | Descrizione normativa RFC-2119 di cosa fornisce l'addon e cosa significa "conforme a questo addon" |
| **Reasoning templates** | Guide che l'agente compila ragionando sullo stack del repository target — non copia-incolla |
| **Onboarding hook** | Punto di ingresso `SKILL.md` che il flusso `onboard` invoca quando lo sviluppatore accetta |
| **Validation step** | Checklist che conferma che l'addon è stato applicato correttamente |

Scoperta: il flusso `onboard` enumera `skills/deepworkplan/addons/` e presenta ogni addon come passo opt-in nella **Fase 7b**, dopo lo scaffolding di base.

## Addon in produzione (cinque)

Cinque addon sono disponibili oggi. Ognuno ha una **pagina del catalogo kit** con dettagli per l'utente e una **spec normativa** all'interno della skill Deep Work Plan.

### Devcontainer (primo addon)

Un setup `.devcontainer/` + `docker/` basato su compose, ragionato dallo stack rilevato.

- **Pagina kit:** [Devcontainer](/kit/devcontainer)
- **Cosa aggiunge:** volumi persistenti per auth AI-CLI (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, alias di validazione (`codecheck`, `check`, `fix`, `test`), igiene segreti OSS pubblici
- **Comportamento:** ~85% scheletro stabile; ~15% ragionato per stack. I devcontainer esistenti vengono riconciliati, mai sovrascritti
- **Quando offerto:** la maggior parte dei repo con Docker o servizi che beneficiano di un dev container isolato

### Dailybot (secondo addon)

Una connessione opt-in al **team Dailybot** dello sviluppatore per la visibilità sui progressi degli agenti.

- **Pagina kit:** [Dailybot](/kit/dailybot) — riferimento completo delle capacità
- **Cosa collega l'addon DWP:** quattro report del ciclo di vita del piano (kickoff, significant task, blocked, completion) tramite la sub-skill dailybot `report`; enforcement opzionale deterministica degli hook (`dailybot hook`, CLI `>= 3.7.0`)
- **Skill abbinata:** installare [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (attualmente **3.10.3**) espone **14 capacità** — chat su Slack/Teams/Discord/Google Chat, check-in, authoring moduli, ask AI, kudos, API key per repository (`.dailybot/env.json`), email e altro. L'addon DWP collega solo **report**; le altre capacità si invocano direttamente tramite la skill Dailybot
- **Auth:** completamente delegata alla skill Dailybot (`dailybot login` o `DAILYBOT_API_KEY`); questo addon non memorizza mai credenziali
- **Guardrail vendor-neutral:** il DWP di base ha **zero** dipendenze da Dailybot; non installare mai automaticamente per tutti
- **Quando offerto:** lo sviluppatore o il team usa già Dailybot, oppure chiede esplicitamente report per il team

### Dependency upgrade (terzo addon)

Aggiornamenti dipendenze agnostici rispetto al package manager, in batch, validati e reversibili.

- **Pagina kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Cosa aggiunge:** rileva il **vero** manager del repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), aggiorna in batch classificati per semver, esegue il validation gate del repo dopo ogni batch, annulla i fallimenti, riassume senza committare automaticamente
- **Comando:** installa `/lib-upgrade` in `.agents/commands/` solo se accettato
- **Quando offerto:** lockfile presente e stack con molte dipendenze; consiglia solo quando rilevante

### Design system (quarto addon)

Un `DESIGN.md` con ambito di superficie di interfaccia che qualsiasi agente di codice legge per output UI, CLI o conversazionale coerente.

- **Pagina kit:** [Design system](/kit/design-system)
- **Cosa aggiunge:** `docs/DESIGN.md` (referenziato da `AGENTS.md`) con fino a tre **profili** impilati in un unico file: **visual-ui** (token e componenti UI renderizzati), **cli-output** (stili terminali semantici, degradazione TTY/`NO_COLOR`), **conversational** (voce, anatomia del messaggio, rendering per piattaforma con fallback in testo semplice)
- **Forza del profilo:** visual-ui è **attivo di default se rilevato**; cli-output e conversational sono **consigliati se rilevati, sempre chiesti, mai applicati automaticamente**
- **Quando offerto:** solo quando viene rilevata una superficie di interfaccia utente — non per librerie pure, servizi headless o repo solo infrastruttura

### AI Diff Reviewer (quinto addon)

Una connessione opzionale all'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, versione attuale **v2.0.0**) che potenzia la Revisione di Sicurezza obbligatoria con una revisione locale strutturata e blocca opzionalmente i pull request in CI.

- **Pagina kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — riferimento completo delle capacità
- **Cosa collega il DWP addon:** potenziamento locale della Revisione di Sicurezza tramite il flusso padre predefinito della skill upstream; `.review/extension.md` obbligatorio (la skill sola è incompleta); Flow B installa opzionalmente `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) ed espone `apply-review` come compagno invocabile dallo sviluppatore — mai un task del piano
- **Flussi:** **A — solo locale** (skill + estensione) o **B — doppia superficie** (skill + estensione + CI Action). L'addon **DEVE chiedere** quale flusso; mai assumere un valore predefinito
- **Soft-fail vs gate:** errori di skill/estensione/invocazione mancante non bloccano mai; i risultati `critical` di un passaggio locale **completato** seguono ancora il contratto di Revisione di Sicurezza
- **Parità (Flow B):** `prompt.md` condiviso + estensione allineano metodologia/gravità; la Revisione CI consapevole delle iterazioni può abbreviare il round 2+ mentre il passaggio locale rimane completo
- **Salvaguarda neutrale rispetto al provider:** il DWP core ha **zero** dipendenza da AI Diff Reviewer; non installare mai automaticamente per tutti
- **Quando offerto:** sviluppatore o team vuole revisione locale strutturata e/o un gate di merge PR in CI

## Skill

Le skill sono procedure riutilizzabili invocate per nome. Una skill impacchetta un workflow ripetibile (eseguire test, correggere lint, creare un componente).

La metodologia include un piccolo insieme di sub-skill di base. Tra queste, la sub-skill **author** consente a un repository di **far crescere il proprio kit**: invocata tramite `/skill-create` e `/agent-create`, ragiona sulla struttura `.agents/` esistente e sulle convenzioni del repository, poi crea una nuova skill, agente o sottile delegatore di comando che vi si conforma e mantiene il catalogo allineato. La stessa sub-skill esegue l'attività obbligatoria Skills & Agents Discovery.

Voce kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agenti

Gli agenti sono lavoratori specializzati con un ruolo definito (reviewer, executor, architect). Vivono in `.agents/agents/` e sono catalogati in `.agents/docs/`.

## Addon di manutenzione

L'addon **dependency-upgrade** (sopra) è il principale addon di manutenzione. Ragiona sul package manager reale del repository invece di assumere npm, classifica gli aggiornamenti per semver, aggiorna in batch sicuri, esegue la validazione dopo ogni batch e annulla qualsiasi batch che fallisce.

## Addon design-system

Vedi [Design system](/kit/design-system) negli addon in produzione. Il `DESIGN.md` a livello di repository è distinto da un documento di design tecnico per feature: il README del piano DWP, i criteri di accettazione delle attività e i validation gate coprono già il design per feature. L'addon design-system colma il contesto di design **dell'interfaccia** durabile e nativo del repository.

## Preset

I preset adattano DWP a uno stack tecnologico specifico (Django, React, Go, Astro + Svelte e altro). Sfoglia il [catalogo kit](/kit).

## Adapter

Gli adapter mappano i comandi DWP al sistema di comandi di un agente specifico (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw e altri). Le voci adapter vivono nel kit sotto il nome di ciascun agente.

## Esempi

Gli esempi dimostrano DWP nella pratica: confronti prima/dopo, piani di esempio, casi studio. Vedi [Examples](/examples) e [Dogfood this site](/kit/dogfood-this-site).

## Promemoria sulla conformità

Un repository **DEVE** essere pienamente conforme con **zero** addon. Gli addon sono capacità opt-in stratificate — mai prerequisiti. Vedi [Conformance](/spec/conformance).
