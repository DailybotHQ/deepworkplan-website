---
title: "DWP v7: piani che delegano, con traccia di ogni cosa"
description: "Deep Work Plan v7 mantiene il contratto e il registro di v6, consente a un piano di affidare compiti circoscritti ad altri agenti e aggiunge quattro addon."
date: 2026-10-09
version: "v7 · Delega con evidenza"
kind: release
lang: it
order: 0
featured: true
sourceLabel: "Set di schemi v7 pubblicato"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
  - label: "Skill release v7.9.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.9.0"
  - label: "Skill release v7.10.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.0"
  - label: "Skill release v7.10.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.1"
  - label: "Skill release v7.10.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.10.2"
  - label: "Skill release v7.11.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.11.0"
  - label: "Skill release v7.12.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.0"
  - label: "Skill release v7.12.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.12.1"
---

Deep Work Plan v7 mantiene il metodo di v6: il contratto è l'autorità, il registro append-only è la memoria, lo scheduler decide cosa eseguire dopo e un'attività si chiude solo quando le evidenze registrate soddisfano i suoi criteri. v7 aggiunge la possibilità di delegare e mantiene la stessa disciplina sul risultato.

Un piano che concede `agent_delegation` può contrassegnare un'attività come `parallel_safe` e affidarla a un altro agente. La risposta del delegato viene registrata come dato, mai come istruzione, e resta `asserted` finché l'esecutore dei gate del piano non osserva l'esito. Solo l'esecutore produce evidenze `observed`, quindi la delega amplia la portata senza abbassare la soglia di completamento.

Quattro addon opzionali trasformano la delega in autonomia pratica. Herdr affida un'attività a un agente in un pannello, su qualsiasi macchina. Agentkit pone un unico comando `ak` sopra tutti gli agenti di programmazione da terminale, con autonomia predefinita e possibilità di disattivarla, ed esegue attività circoscritte in modalità headless in un worktree git. Devcontainer fornisce a ogni repository un container riproducibile senza alcuna chiave SSH al suo interno per impostazione predefinita (git tramite SSH attraverso l'agente dell'host; file chiave solo con adesione esplicita tramite `[ssh] copy_keys`). DeepWorkPlan Vim è un editor da terminale con browser dei piani e visualizzatore Markdown. Ciascuno è fissato tramite tag a un prodotto con un proprio repository e funziona senza Deep Work Plan. Un repository è pienamente conforme senza nessuno di essi, e il registro in `.dwp/config.json` indica quali sono abilitati.

La modalità benchmark e apprendimenti registra ciò che ogni piano insegna, così che i risultati possano essere analizzati in seguito. Un audit dell'intero ecosistema, eseguito come piano orchestratore v7 con un agente per repository, non ha rilevato alcuna regressione di comportamento rispetto a v6: la suite del pacchetto supera 807 test su 807 in un ambiente pulito, e il carico di istruzioni è cresciuto dallo 0.1% al 3.9% per flusso (4.6% per l'intero pacchetto), misurato in byte su entrambi i tag anziché stimato in token.

v7 è un passo avanti nell'orchestrazione e nella verificabilità, ma non è ancora un'autonomia completamente senza intervento. La versione 7.2.0 colma le lacune individuate da quell'audit: benchmark e apprendimenti ora misurano i piani v7, avviare un'attività prima che i suoi prerequisiti siano completi viene rifiutato, e la suite di test viene eseguita in modo ermetico (815 su 815 in un ambiente pulito). La non inferiorità dei risultati degli agenti non è stata misurata. I piani esistenti mantengono la generazione registrata e non vengono mai migrati in modo implicito; i nuovi piani usano il contratto v7 per impostazione predefinita.

La versione 7.6.0 (2026-10-11) ha introdotto l'orchestrazione su larga scala: una corsia (lane) per repository o filone di lavoro, account scelti in base al margine disponibile (`ak usage`, `ak pick`), avvio non presidiato e un onboarding che rileva ogni addon, aggiorna quelli in uso e propone quelli adatti.

La versione 7.7.0 (2026-10-12) ha introdotto l'autonomia dello sciame (Guida §17): il ciclo di capacità (`shared/swarm.py`), pacchetti di passaggio consegne (`dwp-handoff-v1`), successione dei lead con epoche e isolamento, richieste tra corsie, la tassonomia di escalation di AGENT_PROTOCOL §7.5 (C1–C7: decidere e registrare tutto il resto), il livello di qualità (i gate sono ipotesi, verificati non asseriti) e gli apprendimenti metodologici derivanti da 313 piani eseguiti su 23 repository. Limite noto: il registro v7 non dispone di un evento dedicato per il passaggio di consegne di una corsia o la successione di un lead (vengono registrati come una delega annullata più un'osservazione).

La versione 7.8.0 (2026-10-13) ha stabilito Ecosystem 1.0: ogni prodotto integrato dal pacchetto ha raggiunto la prima versione stabile ed è fissato a v1.0.0 secondo il versionamento semantico (coding-agents-kit, herdr-peers, devcontainer-kit e deepworkplan-vim, ciascuno con un digest `SHA256SUMS` verificato), insieme alle versioni fissate AI Diff Reviewer v3.3.14 e Dailybot agent-skill v3.23.17; la 7.8.1 (2026-10-14) ha poi fissato le patch v1.0.1 di coding-agents-kit e devcontainer-kit.

La versione 7.9.0 (2026-10-25) fissa l’addon Herdr a herdr-peers v1.1.0, la cui sub-skill nativa di dibattito permette a un lead di guidare un panel di peer attraverso una serie di round e di chiudere con un registro della decisione, e fissa l’AI Diff Reviewer a v3.3.16; la CI del pacchetto esegue ora il job con la versione minima di Python 3.9 su ubuntu-24.04.

La versione 7.10.0 (2026-10-26) trasforma le decisioni rilevanti in decisioni di squadra: con l'addon Herdr abilitato e herdr-peers 1.1.0 o successivo in uso, `create` pianifica ogni decisione rilevante — due opzioni praticabili con esiti materialmente diversi, difficili da invertire o trasversali, e che nulla nel repository decide — come un'attività di decisione elencata, e `execute` vi conduce un dibattito `decide` herdr-peers senza votare, registrando ogni seggio nel diario come delegazione di sola lettura e annotando la scelta con il suo registro della decisione. Senza Herdr nulla cambia: una precondizione mancante o un dibattito fallito torna al registro della decisione dell'agente stesso, e `config.py decisions debate off` ripristina il giudizio di un solo agente. Il pin dell'addon Dailybot passa ad agent-skill v3.23.20, la versione integrata in questo repository.

La versione 7.10.1 (2026-11-15) fissa l'addon Herdr a herdr-peers v1.2.1, la cui linea 1.2.x aggiunge l'autopilot: un demone opzionale che avvia solo un essere umano, che accetta l'opzione consigliata per ogni agente in attesa, segue i dialoghi in più passi fino alla fine e non tocca mai un accesso né la conferma di un aggiramento dei permessi. Il protocollo 1 resta invariato.

La versione 7.10.2 (2026-11-15) sposta i pin dell'ecosistema con le release del giorno: l'addon Herdr a herdr-peers v1.2.2, una patch di sole correzioni il cui autopilot ora risponde a una domanda mostrata con un'anteprima accanto alle opzioni e riconosce il contrassegno di raccomandato in spagnolo, francese, tedesco e italiano; agentkit a coding-agents-kit v1.2.0, il cui `ak last` riprende la sessione più recente di una directory di lavoro in qualsiasi terminale e i cui lanci dentro un pannello Herdr ripristinano il pannello dopo un riavvio di Herdr o della macchina; devcontainer-kit a v1.1.2 e deepworkplan-vim resta alla v1.0.1; il workflow di release ora ripete il push del tag di release per assorbire i rifiuti transitori.

La versione 7.11.0 (2026-11-16) fa atterrare la serie di indurimento v7 dello sviluppatore: il glossario di durabilità e le regole di controllo visibili entrano nella guida, `verify` ottiene un audit di conformità di sola lettura dei piani completati, i documenti del pack enunciano con precisione le affermazioni di durabilità e di token, il tagline del README è sostituito dal vincitore del test di comprensione, e il percorso create dal vivo mantiene il bundle Lite entro il suo budget di istruzioni.

La versione 7.12.0 (2026-11-16) registra i piani nel loop di herdr-peers: un piano rivendica la propria guida con una lista di successione, così che `autopilot --loop` e la fleet UI vedano ogni piano aperto e lo tengano in esecuzione fino alla fine, e un notificatore Dailybot riporta le tappe; i descrittori degli addon passano a herdr-peers v1.3.1 e coding-agents-kit v1.3.0 — le stesse versioni che questo site fissa.

La versione 7.12.1 (2026-11-16) corregge il notificatore Dailybot dell'addon Herdr: ora accetta il nome di evento `herdr-peers/plan-event-v1` emesso da herdr-peers, limita lo stdin del notificatore a 64 KiB e mappa `plan_lead_moved`; i descrittori degli addon passano a coding-agents-kit v1.4.0, il cui `ak update` è documentato come invocato solo dall'umano.

Versione installata della skill: **7.12.1**, stabile dalla 7.0.0.
