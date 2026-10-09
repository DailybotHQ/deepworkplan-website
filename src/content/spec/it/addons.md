---
title: Add-on
description: "Addon DWP: sette estensioni opzionali, la revisione locale AI Diff Reviewer richiesta con superficie CI opzionale, contratto degli addon e concetti del kit."
order: 6
lang: it
section: Addons
---

# Add-on

> **Ambito della versione:** questo è un documento base v5.0.0 mantenuto. Lo standard attuale, DWP 7.0.0, richiede anche le estensioni `V6_*.md` e `V7_*.md` applicabili elencate nell’[indice delle specifiche](/spec). I piani v5 e v6 esistenti mantengono le regole registrate.

**Versione 2.1.0.** Gli add-on sono estensioni della metodologia Deep Work Plan di base. Sette degli otto sono opzionali e **mai richiesti per la conformità** — un repository senza addon opzionali è pienamente AI-first e conforme a DWP. Ogni addon opzionale viene offerto durante l'onboarding, accettato o rifiutato esplicitamente e — se accettato — **riconcilia** con il setup esistente invece di sovrascriverlo. Un componente è l'eccezione dichiarata: dallo standard 2.3.0 la **revisione locale AI Diff Reviewer** fa parte della baseline richiesta — l'onboarding la installa e ogni Final Review la esegue — mentre la sua superficie CI resta opt-in.

## Il contratto addon

Ogni addon in produzione fornisce quattro componenti obbligatori:

| Componente | Scopo |
|-----------|---------|
| **Spec** | Descrizione normativa RFC-2119 di cosa fornisce l'addon e cosa significa "conforme a questo addon" |
| **Reasoning templates** | Guide che l'agente compila ragionando sullo stack del repository target — non copia-incolla |
| **Onboarding hook** | Punto di ingresso `SKILL.md` che il flusso `onboard` invoca quando lo sviluppatore accetta |
| **Validation step** | Checklist che conferma che l'addon è stato applicato correttamente |

Scoperta: il flusso `onboard` enumera `skills/deepworkplan/addons/` e presenta ogni addon come passo opt-in nella **Fase 7b**, dopo lo scaffolding di base.

## Addon in produzione (otto)

Otto addon sono disponibili oggi — sette opt-in più la revisione locale richiesta. Ognuno ha una **pagina del catalogo kit** con dettagli per l'utente e una **spec normativa** all'interno della skill Deep Work Plan. Quattro di essi — devcontainer, Herdr, DeepWorkPlan Vim e Agentkit — sono integratori leggeri fissati tramite tag a un prodotto con il proprio repository e il proprio ciclo di release; ogni prodotto funziona senza Deep Work Plan. Un addon accettato viene registrato nel registro degli addon `.dwp/config.json` (DWP 7.0.0), che può solo offrire o amplificare — non condiziona mai la conformità né un piano.

### Devcontainer (primo addon)

Un integratore leggero di [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, fissato a `v0.1.4`): un template Dev Containers che `dck init` genera nel repository.

- **Pagina kit:** [Devcontainer](/kit/devcontainer)
- **Cosa aggiunge:** il launcher `dck` (`setup`, `up`, `shell`, `ssh`, `doctor`), immagini base nelle varianti `python-3.13`, `node-24` e `debian` distribuite senza agenti di coding (gli agenti sono un livello opt-in), porte solo su loopback, inoltro dell'agente SSH e macchine Herdr opzionali per container
- **Comportamento:** rilevato tramite `dck doctor --json` (interfaccia 1); `dck init` riconcilia un devcontainer esistente solo dopo che il suo diff è stato accettato, e prima esegue un backup del file — mai sovrascritto
- **Quando offerto:** la maggior parte dei repo con Docker o servizi che beneficiano di un dev container isolato

### Dailybot (secondo addon)

Una connessione opt-in al **team Dailybot** dello sviluppatore per la visibilità sui progressi degli agenti.

- **Pagina kit:** [Dailybot](/kit/dailybot) — riferimento completo delle capacità
- **Cosa collega l'addon DWP:** quattro report del ciclo di vita del piano (kickoff, significant task, blocked, completion) tramite la sub-skill dailybot `report`; enforcement opzionale deterministica degli hook (`dailybot hook`, CLI `>= 3.9.0`)
- **Skill abbinata:** installare [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (attualmente **3.23.3**) espone **17 capacità** — chat su Slack/Teams/Discord/Google Chat, check-in, authoring moduli, ask AI, kudos, board e task di Plan, etichette organizzative, API key per repository (`.dailybot/env.json`), email e altro. L'addon DWP collega solo **report**; le altre capacità si invocano direttamente tramite la skill Dailybot
- **Auth:** completamente delegata alla skill Dailybot (`dailybot login` o `DAILYBOT_API_KEY`); questo addon non memorizza mai credenziali
- **Guardrail vendor-neutral:** il DWP di base ha **zero** dipendenze da Dailybot; non installare mai automaticamente per tutti
- **Quando offerto:** lo sviluppatore o il team usa già Dailybot, oppure chiede esplicitamente report per il team

### Dependency upgrade (terzo addon)

Aggiornamenti dipendenze agnostici rispetto al package manager, in batch, validati e reversibili.

- **Pagina kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Cosa aggiunge:** rileva il **vero** manager del repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), aggiorna in batch classificati per semver, esegue il validation gate del repo dopo ogni batch, annulla i fallimenti, riassume senza committare automaticamente
- **Comando:** installa `/lib-upgrade` in `.agents/commands/` solo se accettato
- **Quando offerto:** offerto per ogni repository con dipendenze dichiarate; il delegatore inerte `/lib-upgrade` si installa sotto il consenso dell'onboarding salvo rifiuto esplicito — un'installazione non esegue alcun aggiornamento

### Design system (quarto addon)

Un `DESIGN.md` con ambito di superficie di interfaccia che qualsiasi agente di codice legge per output UI, CLI o conversazionale coerente.

- **Pagina kit:** [Design system](/kit/design-system)
- **Cosa aggiunge:** `docs/DESIGN.md` (referenziato da `AGENTS.md`) con fino a tre **profili** impilati in un unico file: **visual-ui** (token e componenti UI renderizzati), **cli-output** (stili terminali semantici, degradazione TTY/`NO_COLOR`), **conversational** (voce, anatomia del messaggio, rendering per piattaforma con fallback in testo semplice)
- **Forza del profilo:** il rilevamento rende obbligatoria l'offerta; l'installazione è subordinata a un'accettazione, sia in modalità guidata che trust — visual-ui è **fortemente raccomandato quando rilevato**; cli-output e conversational sono **consigliati se rilevati, sempre chiesti, mai applicati automaticamente**
- **Quando offerto:** solo quando viene rilevata una superficie di interfaccia utente — non per librerie pure, servizi headless o repo solo infrastruttura

### AI Diff Reviewer (quinto addon — revisione locale richiesta, superficie CI opzionale)

L'**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) dota il passaggio di sicurezza obbligatorio del Final Review di una revisione locale strutturata e blocca opzionalmente le pull request in CI. Dallo standard 2.3.0 la **revisione locale fa parte della baseline**; solo la superficie CI è opt-in. Questo addon viene aggiornato automaticamente a ogni rilascio, perciò il tag mostrato di seguito è quello corrente al momento della stesura e può essere in ritardo rispetto alla copia vendorizzata — fanno fede il `SKILL.md` proprio dell'addon e le sue release GitHub per il tag effettivamente installato. L'installazione è sempre fissata a un tag pubblicato, mai a un branch mobile.

- **Pagina kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — riferimento completo delle capacità
- **Richiesto all'onboarding (Fase 7a):** installazione della skill vendorizzata fissata al tag (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) più un `.review/extension.md` su misura per il repository (via `generate-extension`), sotto il consenso dell'onboarding; un aggiornamento mirato della harness riconcilia entrambi quando mancano; un rifiuto è registrato come eccezione dichiarata e riportato da `verify` finché non viene installata
- **Richiesto in ogni Final Review:** il passaggio di sicurezza esegue il flusso padre predefinito della skill upstream sull'insieme di modifiche accumulato e accoda il proprio output al `analysis_results/SECURITY_REVIEW.md` locale del piano (dentro la cartella propria del piano, mai nella root del repository); una skill o un'estensione mancante è un rilievo registrato `local reviewer not installed` — mai un salto silenzioso, e mai un bootstrap a sorpresa: l'installazione appartiene al consenso dell'onboarding o a un'invocazione esplicita dell'addon; i **critici verificati** di un passaggio completato bloccano il completamento finché non sono corretti o accettati esplicitamente (v3, BC-07 — le affermazioni critiche non verificate arrivano come avvisi annotati, e una revisione `incomplete`/`timeout` non è un passaggio pulito, BC-04)
- **Superficie CI opzionale (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`) tramite la sub-skill upstream `setup`, più i compagni `apply-review` (sola lettura) e `address-review` (esegue commit, push e riarma; nuovo in v3.1.1) come comodità invocabili dallo sviluppatore — offerto esplicitamente, mai installato senza richiesta, mai il valore predefinito, mai un'attività del piano
- **Mai bloccante (solo invocazione):** una revisione locale che può iniziare ma fallisce con un errore avvisa una volta, registra e prosegue; non fa mai fallire l'attività
- **Parità (Flow B):** `prompt.md` condiviso + estensione allineano metodologia/gravità; la Revisione CI consapevole delle iterazioni può abbreviare il round 2+ mentre il passaggio locale rimane completo
- **Salvaguarda neutrale rispetto al provider:** nessun flusso Deep Work Plan richiede un servizio commerciale, un provider CI o un segreto — il reviewer è una skill MIT fissata a un tag, eseguita dall'agente di coding dello stesso sviluppatore
- **Conformità:** `verify` riporta un reviewer locale mancante come fallimento per i repository che dichiarano lo standard 2.3.0 o successivo e come rilievo sulla versione della harness per i repository legacy

### Herdr (sesto addon)

Un integratore leggero di [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (fissato a `v0.1.0`, protocollo `1`), il trasporto di delega **interattiva** dei piani v7.

- **Pagina kit:** [Herdr](/kit/herdr)
- **Cosa aggiunge:** un piano può affidare un'attività delimitata a un agente di coding in un altro pannello [Herdr](https://herdr.dev), sulla stessa macchina o su una che Herdr raggiunge via SSH, e registrare nel journal la sua unica risposta autorizzata
- **Comportamento:** il protocollo tra peer (stamp, grant, risposta, protezione dai loop, limiti di profondità e di fan-out) vive in herdr-peers, mai nel pacchetto; qualsiasi uso richiede la concessione del contratto `agent_delegation`, e il risultato di un delegato resta un'asserzione finché il runner del piano stesso non lo osserva
- **Quando offerto:** opt-in esplicito durante la Fase 7b; rilevamento in sola lettura di `herdr` e `herdr-peers`; il trasporto è utilizzabile solo all'interno di una sessione Herdr

### DeepWorkPlan Vim (settimo addon)

Un integratore leggero di [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (fissato a `v0.4.2`, interfaccia `1`), l'editor da terminale per Deep Work Plan (Neovim 0.12+).

- **Pagina kit:** [DeepWorkPlan Vim](/kit/vim)
- **Cosa aggiunge:** una superficie di editor opzionale, a livello di macchina, per agenti e persone — un indice dei comandi generato, un browser dei piani in sola lettura e un visualizzatore Markdown; ogni affermazione è letta dalla superficie leggibile dalle macchine fissata del prodotto
- **Comportamento:** una configurazione Neovim esistente non viene mai sovrascritta senza consenso esplicito; il rilevamento è in sola lettura
- **Quando offerto:** opt-in esplicito durante la Fase 7b; solo informativo quando manca Neovim 0.12+

### Agentkit (ottavo addon)

Un integratore leggero di [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`), il trasporto di delega **headless** dei piani v7.

- **Pagina kit:** [Agentkit](/kit/agentkit)
- **Cosa aggiunge:** un'unica superficie di comando `ak` sugli agenti di coding da terminale, usata per eseguire in modalità headless un'attività delimitata del piano; contribuisce le capacità `subagents`, `cancel_children` e `model_routing` solo a runtime, quando è abilitato, rilevato e su un'interfaccia compatibile
- **Comportamento:** qualsiasi uso richiede la concessione del contratto `agent_delegation`; l'addon non installa mai da solo le CLI degli agenti di coding e non legge mai i valori delle chiavi dei provider
- **Quando offerto:** opt-in esplicito durante la Fase 7b; rilevamento in sola lettura tramite `ak doctor --json`

## Skill

Le skill sono procedure riutilizzabili invocate per nome. Una skill impacchetta un workflow ripetibile (eseguire test, correggere lint, creare un componente).

La metodologia include un piccolo insieme di sub-skill di base. Tra queste, la sub-skill **author** consente a un repository di **far crescere il proprio kit**: invocata tramite `/skill-create` e `/agent-create`, ragiona sulla struttura `.agents/` esistente e sulle convenzioni del repository, poi crea una nuova skill, agente o sottile delegatore di comando che vi si conforma e mantiene il catalogo allineato. La stessa sub-skill supporta il passaggio di riconciliazione delle skill del Final Review.

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
