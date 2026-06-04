---
title: "Fallstudie: diese Website"
description: "Wie deepworkplan.com selbst auf Deep Work Plan läuft — ein realer Bericht über ein Produktions-Astro-Repository, das mit der von ihm dokumentierten Methodik AI-first gemacht wurde."
kind: example
lang: de
order: 2
---

# Fallstudie: diese Website

Die Seite, die Sie gerade lesen, läuft auf der Methodik, die sie dokumentiert. Sie betreibt Dogfooding von Deep Work Plan: dieselbe Skill, derselbe `/init`-Ablauf, dieselben `.dwp/`-Pläne, die jedes andere Repository verwenden würde. Dies ist ein realer Bericht, keine Hypothese.

## Vorher

Wie die meisten Repositorys war auch dieses nicht für Agenten gebaut. Kontext lebte in den Köpfen der Menschen und in verstreuten Notizen, es gab keine einzige Quelle der Wahrheit, die ein Agent lesen konnte, und einen neuen Agenten zu onboarden hieß, das Projekt in jeder Sitzung erneut zu erklären. Langfristige Arbeit driftete ab.

## DWP übernehmen

Das Repository wurde mit einem einzigen Deep Work Plan AI-first gemacht, zerlegt in atomare Aufgaben mit Validierungs-Gates:

1. Die Deep Work Plan Skill als Referenzinstallation installieren, fixiert durch `skills-lock.json`.
2. Das Onboarding ausführen, um eine durchdachte `AGENTS.md`, den `docs/`-Baum und Dokumentation je Modul aus dem echten Stack des Repositorys zu erzeugen.
3. Das agentenübergreifende `.agents/`-Kit aufbauen — schlanke `dwp-*`-Befehls-Delegatoren und einen Katalog, der dem entspricht, was auf der Festplatte liegt.
4. Den gitignore-ausgeschlossenen `.dwp/`-Arbeitsbereich für Pläne und Entwürfe anlegen.
5. Die Konformität mit `/dwp-verify` verifizieren.

Jede Aufgabe wurde gegen die echten Gates des Repositorys validiert — `biome`, `astro:check`, die Test-Suite, den Produktions-Build und die Parität-Prüfung der Agenten-Endpunkte —, bevor sie als abgeschlossen markiert wurde.

## Nachher

Das Repository ist nun nach seiner eigenen Spezifikation AI-first: eine durchdachte `AGENTS.md`, ein kategorisierter `docs/`-Baum, ein agentenübergreifendes `.agents/`-Kit und ein gitignore-ausgeschlossener `.dwp/`-Arbeitsbereich. Jeder Agent — Claude Code, Cursor, Codex, Gemini, Copilot — kann es öffnen, das Harness lesen und langfristige Pläne ausführen, ohne in jeder Sitzung an die Hand genommen zu werden.

## Ergebnis

Die Methodik beweist sich an ihrer eigenen Quelle: Diese Site wird auf dieselbe Weise gebaut und gepflegt, wie sie Ihnen rät, Ihre zu bauen — indem sie [`/init.md`](/init.md) folgt. Wenn der Standard hier, in der Produktion, funktioniert, funktioniert er auch für Ihr Repository.
