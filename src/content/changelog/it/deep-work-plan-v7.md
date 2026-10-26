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

Versione installata della skill: **7.9.0**, stabile dalla 7.0.0.
