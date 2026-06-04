---
title: Dailybot
description: "Un addon opt-in che collega un repo AI-first a un team Dailybot, integrando un report best-effort di progressi e milestone nell’esecuzione del piano."
kind: addon
lang: it
order: 2
---

# Addon Dailybot

Porta i progressi di Deep Work Plan in evidenza a un team Dailybot. Un addon opt-in per i team che già usano Dailybot.

## Cosa aggiunge

- Un’installazione facoltativa della skill agente di Dailybot e/o della CLI di Dailybot, tramite i loro flussi di consenso.
- Un report best-effort di progressi/milestone integrato nell’esecuzione del piano, così il completamento di un piano viene segnalato al team.

## Comportamento

Questo addon **delega** — non reinventa. La skill agente di Dailybot gestisce installazione, consenso, autenticazione e stile di scrittura; questo addon si limita a proporne l’installazione e a integrare il passo facoltativo di report. Il report è rigorosamente best-effort e non blocca mai il lavoro se Dailybot è assente, non autenticato o irraggiungibile.

## Note

La metodologia Deep Work Plan di base ha **zero** dipendenze da Dailybot. La proponga solo quando lo sviluppatore o il team usa già Dailybot; non la installi mai automaticamente per tutti.
