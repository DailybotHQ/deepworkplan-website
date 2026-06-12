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

Das **design-system**-Add-on ist eine auf Interface-Oberflächen bezogene, optionale Erweiterung, die einem Repository eine `DESIGN.md` gibt — eine Markdown-Designsystem-Datei, die jeder Coding-Agent liest, um Interface-Ausgaben zu erzeugen, die zu den eigenen Konventionen des Repositorys passen. Es deckt drei **Profile** ab, unabhängig voneinander aus echten Dateien erkannt und in dieselbe einzelne Datei gestapelt: **visual-ui** (gerenderte Web-/Mobile-/Desktop-UI), **cli-output** (gestylte Terminal-Ausgabe: semantische Farben, Ausgabekomponenten wie Panels und Spinner, Layout-Konventionen, TTY-/`NO_COLOR`-Degradation) und **conversational** (das Produkt kommuniziert über Chat oder E-Mail: Stimme und Register, Nachrichtenanatomie, Rendering pro Plattform mit Plain-Text-Fallbacks). Es schlussfolgert über die echte Designquelle des Repositorys (CSS Custom Properties, eine Tailwind-Konfiguration, Token-Dateien, Komponentenstile — oder ein CLI-Display-Modul oder Helfer zur Nachrichtenkomposition), statt eine Markendatei zu kopieren, und prüft die Integrität jedes Profils: WCAG-AA-Kontrast für visuelle Textpaarungen, Farbe nie als einziger Bedeutungsträger in der Terminal-Ausgabe, Plain-Text-Fallbacks für reichhaltige Nachrichten und auflösbare Token-Referenzen. Es gleicht eine bestehende `DESIGN.md` ab, statt sie zu überschreiben.

Die Datei liegt unter `docs/DESIGN.md`, neben den anderen Spezifikationen des Repositorys, und wird von `AGENTS.md` referenziert, damit Agenten sie auf dieselbe Weise entdecken wie die übrige Dokumentation (das Repository-Stammverzeichnis wird nur dann verwendet, wenn es keinen `docs/`-Baum gibt). Die Entdeckung erfolgt durch Referenz, nicht durch physischen Ort. Die Empfehlungsstärke unterscheidet sich je Profil: **visual-ui ist standardmäßig aktiv bei Erkennung** — wenn eine visuelle UI-Oberfläche vorhanden ist, wendet das Onboarding es im Trust-Modus an und empfiehlt es im geführten Modus nachdrücklich —, während **cli-output und conversational bei Erkennung empfohlen werden und stets erfragt, nie automatisch angewendet werden**. Das Add-on wird nie für ein Repository ohne jede Interface-Oberfläche angeboten (eine reine Bibliothek, ein Headless-Service, ein reines Infrastruktur-Repository), und ein Repository mit null Add-ons bleibt vollständig konform. Eine `DESIGN.md`, die vor der Einführung der Profile erstellt wurde, ist eine gültige visuelle Datei mit einem einzigen Profil — keine Migration.

Diese repository-weite Designsystem-Datei ist verschieden von einem featurebezogenen technischen Design-Dokument (der „requirements → design → tasks"-`design.md` werkzeuggebundener spec-driven-Workflows). DWP liefert keinen separaten featurebezogenen Design-Doc-Archetyp: Die README eines Plans, die Akzeptanzkriterien jeder Aufgabe und die Validierungs-Gates decken diese Rolle bereits ab. Das Add-on füllt die eine Lücke, die diese Rolle nicht abdeckt: dauerhaften, repo-nativen Interface-Designkontext.

## Presets

Presets passen DWP an einen bestimmten Tech-Stack an (Django, React, Go).

## Adapter

Adapter bilden DWP-Befehle auf das Befehlssystem eines bestimmten Agenten ab (Claude Code, Cursor, Codex).

## Beispiele

Beispiele zeigen DWP in der Praxis (Vorher-Nachher-Vergleiche, Beispielpläne, Fallstudien).
