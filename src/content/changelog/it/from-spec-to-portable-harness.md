---
title: "DWP v1: da un ciclo di piani a un harness portabile"
description: "Deep Work Plan passa da un singolo ciclo di piani scritti a un kit di adozione portabile: trust e provenienza, un supporto più ampio per gli agenti e un controllo di conformità eseguibile da qualsiasi repository."
date: 2026-06-12
version: "v1 · Fondamenta"
kind: foundation
lang: it
order: 5
featured: false
sourceLabel: "Skill changelog 2.3.0–2.16.0"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md"
---

Fino a oggi, Deep Work Plan è stato un ciclo di scrittura dei piani seguito da un singolo agente all'interno di un'unica sessione. Questa serie di release lo trasforma in qualcosa che un repository può adottare alle proprie condizioni — la prima versione pensata per andare oltre un singolo agente e una singola sessione.

Lo skill acquisisce una dichiarazione di trust con provenienza basata su checksum, così uno sviluppatore può vedere esattamente cosa legge e cosa scrive prima di installarlo. I preset di onboarding e gli host di agenti supportati si ampliano notevolmente, la disciplina dei test diventa parte integrante di ogni task invece che un ripensamento, e un controllo di conformità permette a un repository di verificare — in modo oggettivo, non per assunzione — che rispetti lo standard. Un protocollo di stato e ripresa consente a un piano interrotto di riprendere da dove si era fermato invece di ricominciare da capo. Sotto il cofano, la compatibilità con `.claude` e `.cursor` converge in un'unica directory canonica `.agents`, così ogni agente supportato legge lo stesso kit.

Insieme, queste release gettano le fondamenta per il passo successivo: il repository smette di essere solo il luogo in cui è conservato il piano e comincia a diventare l'harness di lavoro dell'agente.

Consulta la [cronologia delle release dello skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/CHANGELOG.md) per la sequenza completa.
