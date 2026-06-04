---
title: "Informazioni sulla metodologia"
description: "Deep Work Plan è una metodologia aperta e indipendente dal framework per lavoro di ingegneria serio con agenti di coding AI. Da dove nasce e chi la mantiene."
lastUpdated: 2026-05-30
---

## Che cos’è

Deep Work Plan (DWP) è una metodologia, non un prodotto. Definisce come trasformare un obiettivo in un piano concordato, scomporre quel piano in attività atomiche e verificabili in modo indipendente, ed eseguire ciascuna attività in un ciclo focalizzato che termina con una verifica.

È una metodologia spec-driven: il piano è la fonte di verità duratura e gli agenti eseguono rispetto a criteri di accettazione e validation gate espliciti. A differenza dei sistemi spec-driven legati a uno strumento come GitHub Spec Kit, Amazon Kiro o Tessl, DWP è indipendente dallo strumento e nativo del repository. È anche harness engineering reso portabile — il contesto, le salvaguardie e lo stato ripristinabile che rendono un agente affidabile vengono installati nel repository stesso (AGENTS.md, docs, la home delle skill .agents/, la skill DWP), così qualsiasi agente può pilotare qualsiasi repo.

È deliberatamente indipendente dall’agente AI o dallo stack che si utilizza — gli adapter traducono lo stesso core loop per Claude, Cursor, Copilot, Codex, Gemini e altri. Il piano, le attività e il log di esecuzione sono tutti in semplice Markdown, così il lavoro resta leggibile, revisionabile e sotto controllo di versione.

---

## Principi fondamentali

- **Pianificare prima di eseguire** — Non si scrive codice finché il piano non è concordato. Il piano è un contratto tra Lei e l’agente. [Leggi la metodologia](/methodology)
- **Le attività sono atomiche** — Ogni attività ha un ambito tale da poter essere eseguita e verificata da sola, poi sottoposta a commit in modo atomico. [Consulta la specifica](/spec)
- **Verificare tutto** — Ogni attività termina con una verifica esplicita prima che inizi la successiva, con i progressi registrati in git. [Esplora il kit](/kit)

---

## In sintesi

- Metodologia aperta, licenza MIT
- Indipendente dal framework e dall’agente
- Mantenuta da Dailybot e dalla community
- Include una specifica, comandi, adapter, preset ed esempi
- Solo Markdown — nessun runtime, nessun lock-in
- Trasforma qualsiasi repository in un codebase AI-first, pilotabile dagli agenti

---

## Chi la mantiene

Deep Work Plan è nato da lavoro di ingegneria reale in [Dailybot](https://www.dailybot.com) ed è ora mantenuto da Dailybot insieme alla community open source. La metodologia, la specifica e il kit sono rilasciati sotto licenza MIT — liberi da usare, adattare e su cui costruire.

- [Leggi la metodologia](/methodology)
- [Avvio rapido](/quickstart)
- [Repository GitHub](https://github.com/DailybotHQ/deepworkplan-website)
