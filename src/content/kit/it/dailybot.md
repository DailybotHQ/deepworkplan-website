---
title: Dailybot
description: "Un addon opt-in che collega un repo AI-first a un team Dailybot: report best-effort di progressi e milestone nell’esecuzione del piano, più un livello opzionale di hook autonomi."
kind: addon
lang: it
order: 2
---

# Addon Dailybot

Porta i progressi di Deep Work Plan in evidenza a un team Dailybot. Un addon opt-in per i team che già usano Dailybot.

## Cosa aggiunge

- Un’installazione facoltativa della skill agente di Dailybot e/o della CLI di Dailybot, tramite i loro flussi di consenso.
- Un report best-effort di progressi/milestone integrato nell’esecuzione del piano, così il completamento di un piano viene segnalato al team.
- Un livello opzionale di hook deterministici (skill agente di Dailybot 1.6.0+, CLI 1.12.0+): hook del harness committati rilevano il lavoro non riportato da un registro locale e lo ricordano all’agente a fine turno, così il reporting resta autonomo anche nelle lunghe sessioni non presidiate in cui le istruzioni del prompt si diluiscono.

## Comportamento

Questo addon **delega** — non reinventa. La skill agente di Dailybot gestisce installazione, consenso, autenticazione, i template degli hook e lo stile di scrittura; questo addon si limita a proporne l’installazione, a integrare il passo facoltativo di report e a proporre la configurazione degli hook a livello di repository. Il report è rigorosamente best-effort e non blocca mai il lavoro se Dailybot è assente, non autenticato o irraggiungibile.

I due livelli si compongono senza doppi report: un report di ciclo di vita riuscito azzera il registro degli hook, così gli hook restano in silenzio dopo un report e agiscono solo da rete di sicurezza deterministica quando un evento del ciclo di vita è sfuggito. I comandi degli hook leggono solo stato locale ed escono sempre con codice zero, quindi nemmeno loro possono mai bloccare il lavoro.

## Note

La metodologia Deep Work Plan di base ha **zero** dipendenze da Dailybot. La proponga solo quando lo sviluppatore o il team usa già Dailybot; non la installi mai automaticamente per tutti.
