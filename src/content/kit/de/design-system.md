---
title: Design system
description: "Ein optionales Addon, das jedem Repo mit einer nutzerseitigen Interface-Oberfläche eine DESIGN.md gibt (unter docs/, von AGENTS.md indexiert) — mit Profilen für visuelle UI, CLI-Ausgabe und konversationale Oberflächen in einer Datei."
kind: addon
lang: de
order: 4
---

# Design-system-Addon

Gib einem Repository mit einer **nutzerseitigen Interface-Oberfläche** eine `DESIGN.md` — eine Markdown-Designsystem-Datei, die jeder Coding-Agent liest, um Interface-Ausgaben zu erzeugen, die zu den **eigenen** Konventionen des Repos passen, statt zu den ungestylten, statistisch häufigen Standardwerten, auf die ein Agent ohne Anleitung zurückfällt. Das vierte optionale Deep-Work-Plan-Addon.

Eine „Interface-Oberfläche" ist Plural: eine gerenderte **visuelle UI**, gestylte **CLI-Ausgabe** und eine **konversationale** Oberfläche (das Produkt kommuniziert über Chat oder E-Mail) zählen jeweils einzeln. Das Addon erkennt jede davon unabhängig als **Profil**, und die akzeptierten Profile stapeln sich in dieselbe einzelne `DESIGN.md`.

## Was es hinzufügt

- Eine `DESIGN.md` unter `docs/DESIGN.md` (neben den anderen Spezifikationen des Repos; das Repo-Stammverzeichnis nur dann, wenn es keinen `docs/`-Baum gibt), **von `AGENTS.md` referenziert**, damit Agenten sie wie die übrige Dokumentation entdecken. Ein Repo, eine Datei — niemals Geschwisterdateien pro Oberfläche.
- **`visual-ui`-Profil** — die kanonischen visuellen Abschnitte: Überblick/Atmosphäre, Farbpalette & Rollen (hell + dunkel), Typografie, Layout & Abstände, Erhebung & Tiefe, Formen, Komponenten, responsives Verhalten, Do's & Don'ts (einschließlich der Barrierefreiheitsregeln des Repos).
- **`cli-output`-Profil** — gestylte Terminal-Interfaces: Ausgabestimme, semantische Farben & Stile (Erfolg/Fehler/Warnung/Info/gedimmt, abgebildet auf das echte Theme), Ausgabekomponenten (Panels, Tabellen, Spinner, interaktive Prompts — benannt nach den echten Helfern des Repos), Layout-Konventionen und Degradationsregeln (TTY vs. Pipe, `NO_COLOR`, stdout/stderr-Disziplin, Exit-Codes).
- **`conversational`-Profil** — die Messaging-Oberfläche des Produkts: Stimme & Register (Ton, Kürze, Regeln zur Markennennung), Nachrichtenanatomie (DM, Channel-Post, Thread-Antwort, Edit-in-Place) und Rendering pro Plattform (Slack mrkdwn, Discord-Markdown, Teams Adaptive Cards, E-Mail) mit Plain-Text-Fallbacks.
- Einen gemeinsamen Agenten-Prompt-Leitfaden plus einen Validierungsschritt, der die Integrität jedes Profils prüft: Der dokumentierte Textkontrast erfüllt WCAG AA (visuell), Farbe ist nie der einzige Bedeutungsträger (CLI), reichhaltige Renderings vermerken Plain-Text-Fallbacks (konversational), und Token-Referenzen sind auflösbar.

## Verhalten

- **Schlussfolgern, nicht kopieren.** Jeder Wert wird aus der echten Designquelle des Repos abgeleitet — seinem Stylesheet, seinen CSS Custom Properties, seiner Tailwind-Konfiguration, seinen Token-Dateien, seinen Komponentenstilen, seinem CLI-Display-/Theme-Modul oder seinen Helfern zur Nachrichtenkomposition. Es fügt niemals die `DESIGN.md` einer fremden Marke ein und importiert nie die Konventionen eines anderen Produkts im Ganzen; Referenzkataloge sind Inspiration für die Struktur, niemals für den Inhalt.
- **Abgleichen, nicht überschreiben.** Eine bestehende `DESIGN.md` oder Token-Quelle wird additiv abgeglichen, nie überschrieben; ein neu akzeptiertes Profil hängt seine Abschnitte an, ohne den Rest umzuschreiben; destruktive Änderungen erfordern eine Freigabe.
- **Entdeckung durch Referenz.** Wo auch immer die `DESIGN.md` liegt, `AGENTS.md` (und `CLAUDE.md`) referenziert sie — der Zeiger, nicht der physische Ort, ist es, was garantiert, dass Agenten sie laden.
- **Pragmatisch, nicht starr gebunden.** Es bezieht sich auf die aufkommende `DESIGN.md`-Konvention als zu befolgende Form, erweitert sie auf nicht-visuelle Oberflächen und bleibt Markdown-first, ohne sich an ein einzelnes Token-Schema zu binden.

## Interface-bezogen, mit Empfehlungsstärke pro Profil

Dieses Addon ist für Repos mit mindestens einer echten Interface-Oberfläche; es wird nie für ein Repo ohne eine solche angeboten (eine reine Bibliothek, ein Headless-Service, ein reines Infrastruktur-Repo). Jedes Profil trägt seine eigene Empfehlungsstärke:

- **`visual-ui` ist standardmäßig aktiv bei Erkennung** — ein Stylesheet mit CSS Custom Properties, eine Tailwind-Konfiguration oder ein `@theme`-Block, UI-Komponenten oder ein Marken-/Styleguide. Das Onboarding wendet es im Trust-Modus an und empfiehlt es im geführten Modus nachdrücklich.
- **`cli-output` und `conversational` werden bei Erkennung empfohlen — und stets erfragt, nie automatisch angewendet**, selbst im Trust-Modus. Eine CLI-Rendering-Bibliothek plus eine bewusste Display-Schicht signalisiert das erste; ein Chat-Plattform-SDK oder eine Schicht zur Nachrichtenkomposition signalisiert das zweite. Ein bloßer Argument-Parser mit rohen Prints qualifiziert nicht.

Es ist nie erforderlich — ein Repository mit null Addons ist vollständig konform, und du kannst jedes Profil oder das gesamte Addon jederzeit ablehnen. Eine `DESIGN.md`, die vor der Einführung der Profile erstellt wurde, ist eine gültige visuelle Datei mit einem einzigen Profil: keine Migration.

## Optionaler Befehl

Wenn angenommen, kann das Addon einen `/design-system`-Delegator in das `.agents/commands/`-Verzeichnis des Repos installieren, um `DESIGN.md` später neu zu erzeugen oder zu aktualisieren. Die Installation des Befehls ist optional; ein abgelehntes Addon installiert keinen.

## Verhältnis zu featurebezogenen Design-Dokumenten

Dies ist eine **repository-weite, persistente** Designsystem-Datei — verschieden von einem featurebezogenen technischen Design-Dokument (der „requirements → design → tasks"-`design.md` werkzeuggebundener spec-driven-Workflows). Deep Work Plan liefert bewusst keinen separaten featurebezogenen Design-Doc-Archetyp: Die README eines Plans, die Akzeptanzkriterien jeder Aufgabe und die Validierungs-Gates decken diese Rolle bereits ab. Dieses Addon füllt die eine Lücke, die diese Rolle nicht abdeckt: dauerhaften, repo-nativen Interface-Designkontext.
