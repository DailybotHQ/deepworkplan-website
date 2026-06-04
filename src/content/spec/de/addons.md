---
title: Add-ons
description: "Optionale Erweiterungen der DWP-Kernmethodik: Skills, Agenten, Presets, Adapter und Beispiele, und wie jede den Workflow erweitert, ohne erforderlich zu sein."
order: 5
lang: de
section: Addons
---

# Add-ons

**Version 1.0.** Add-ons sind optionale Erweiterungen der DWP-Kernmethodik. Sie sind nicht für die Konformität erforderlich, bieten aber zusätzliche Fähigkeiten.

## Skills

Skills sind wiederverwendbare Prozeduren, die über ihren Namen aufgerufen werden. Eine Skill bündelt einen wiederholbaren Workflow (Tests ausführen, Lint beheben, eine Komponente erstellen).

Die Methodik liefert eine kleine Menge zentraler Sub-Skills. Unter ihnen lässt die **author**-Sub-Skill ein Repository **sein eigenes Kit aufbauen**: Aufgerufen über `/skill-create` und `/agent-create`, schlussfolgert sie über die bestehende `.agents/`-Struktur und die Konventionen des Repositorys, verfasst dann eine neue Skill, einen neuen Agenten oder einen schlanken Befehls-Delegator, der dazu passt, und hält den Katalog synchron. Dieselbe Sub-Skill führt die verpflichtende Skills-&-Agents-Discovery-Aufgabe aus.

## Agenten

Agenten sind spezialisierte Arbeiter mit einer definierten Rolle (reviewer, executor, architect).

## Wartungs-Add-ons

Wartungs-Add-ons sind Opt-in-Erweiterungen, nie für die Konformität erforderlich, die einem Repository helfen, sich selbst zu warten. Das **dependency-upgrade**-Add-on schlussfolgert über den tatsächlichen Paketmanager des Repositorys (statt npm anzunehmen) und aktualisiert Abhängigkeiten in kleinen, validierten, rücknehmbaren Chargen: Es erkennt den Manager aus dem echten Manifest und der Lockfile, klassifiziert Upgrades nach semver, aktualisiert in Chargen, lässt nach jeder Charge das echte Validierungs-Gate des Repositorys laufen, macht jede fehlgeschlagene Charge rückgängig und fasst zusammen, ohne automatisch zu committen. Ein Add-on wird nur installiert, wenn es während des Onboardings angenommen wird.

## Presets

Presets passen DWP an einen bestimmten Tech-Stack an (Django, React, Go).

## Adapter

Adapter bilden DWP-Befehle auf das Befehlssystem eines bestimmten Agenten ab (Claude Code, Cursor, Codex).

## Beispiele

Beispiele zeigen DWP in der Praxis (Vorher-Nachher-Vergleiche, Beispielpläne, Fallstudien).
