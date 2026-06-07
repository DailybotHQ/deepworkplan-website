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

## Design-system-Add-on

Das **design-system**-Add-on ist eine frontend-bezogene, optionale Erweiterung, die einem Repository eine `DESIGN.md` gibt — eine Markdown-Designsystem-Datei, die jeder Coding-Agent liest, um UI zu erzeugen, die zum eigenen Designsystem des Repositorys passt. Es schlussfolgert über die echten Design-Tokens des Repositorys (CSS Custom Properties, eine Tailwind-Konfiguration, Token-Dateien, Komponentenstile), statt eine Markendatei zu kopieren, und dokumentiert die kanonischen Abschnitte: Farben und Rollen (hell und dunkel), Typografie, Layout und Abstände, Erhebung, Formen, Komponenten, responsives Verhalten, Do's und Don'ts (einschließlich der Barrierefreiheitsregeln des Repositorys) und einen Agenten-Prompt-Leitfaden. Es prüft den WCAG-AA-Kontrast und die Token-Integrität und gleicht eine bestehende `DESIGN.md` ab, statt sie zu überschreiben.

Die Datei liegt unter `docs/DESIGN.md`, neben den anderen Spezifikationen des Repositorys, und wird von `AGENTS.md` referenziert, damit Agenten sie auf dieselbe Weise entdecken wie die übrige Dokumentation (das Repository-Stammverzeichnis wird nur dann verwendet, wenn es keinen `docs/`-Baum gibt). Die Entdeckung erfolgt durch Referenz, nicht durch physischen Ort. Das Add-on ist **standardmäßig aktiv bei Erkennung**: Wenn eine UI-Oberfläche vorhanden ist, wendet das Onboarding es im Trust-Modus an und empfiehlt es im geführten Modus nachdrücklich; es wird nie für ein reines Backend-, CLI- oder Bibliotheks-Repository angeboten, und ein Repository mit null Add-ons bleibt vollständig konform.

Diese repository-weite Designsystem-Datei ist verschieden von einem featurebezogenen technischen Design-Dokument (der „requirements → design → tasks"-`design.md` werkzeuggebundener spec-driven-Workflows). DWP liefert keinen separaten featurebezogenen Design-Doc-Archetyp: Die README eines Plans, die Akzeptanzkriterien jeder Aufgabe und die Validierungs-Gates decken diese Rolle bereits ab. Das Add-on füllt die eine Lücke, die diese Rolle nicht abdeckt: dauerhaften, repo-nativen UI-Designkontext.

## Presets

Presets passen DWP an einen bestimmten Tech-Stack an (Django, React, Go).

## Adapter

Adapter bilden DWP-Befehle auf das Befehlssystem eines bestimmten Agenten ab (Claude Code, Cursor, Codex).

## Beispiele

Beispiele zeigen DWP in der Praxis (Vorher-Nachher-Vergleiche, Beispielpläne, Fallstudien).
