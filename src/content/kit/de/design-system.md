---
title: Design system
description: "Ein optionales, frontend-bezogenes Addon, das einem Repo eine DESIGN.md (unter docs/, von AGENTS.md indexiert) gibt, damit Agenten UI passend zum eigenen Designsystem erzeugen."
kind: addon
lang: de
order: 4
---

# Design-system-Addon

Gib einem Frontend-/UI-Repository eine `DESIGN.md` — eine Markdown-Designsystem-Datei, die jeder Coding-Agent liest, um UI zu erzeugen, die zum **eigenen** Designsystem des Repos passt, statt zu den ungestylten, statistisch häufigen Standardwerten, auf die ein Agent ohne Anleitung zurückfällt. Das vierte optionale Deep-Work-Plan-Addon.

## Was es hinzufügt

- Eine `DESIGN.md` unter `docs/DESIGN.md` (neben den anderen Spezifikationen des Repos; das Repo-Stammverzeichnis nur dann, wenn es keinen `docs/`-Baum gibt), **von `AGENTS.md` referenziert**, damit Agenten sie wie die übrige Dokumentation entdecken.
- Die kanonischen Abschnitte: Überblick/Atmosphäre, Farbpalette & Rollen (hell + dunkel), Typografie, Layout & Abstände, Erhebung & Tiefe, Formen, Komponenten, responsives Verhalten, Do's & Don'ts (einschließlich der Barrierefreiheitsregeln des Repos) und ein Agenten-Prompt-Leitfaden.
- Einen Validierungsschritt, der prüft, dass die Datei vollständig ist, dass der dokumentierte Textkontrast WCAG AA erfüllt und dass Token-Referenzen auflösbar sind.

## Verhalten

- **Schlussfolgern, nicht kopieren.** Jeder Wert wird aus der echten Designquelle des Repos abgeleitet — seinem Stylesheet, seinen CSS Custom Properties, seiner Tailwind-Konfiguration, seinen Token-Dateien oder seinen Komponentenstilen. Es fügt niemals die `DESIGN.md` einer fremden Marke ein; Referenzkataloge sind Inspiration für die Struktur, niemals für den Inhalt.
- **Abgleichen, nicht überschreiben.** Eine bestehende `DESIGN.md` oder Token-Quelle wird additiv abgeglichen, nie überschrieben; destruktive Änderungen erfordern eine Freigabe.
- **Entdeckung durch Referenz.** Wo auch immer die `DESIGN.md` liegt, `AGENTS.md` (und `CLAUDE.md`) referenziert sie — der Zeiger, nicht der physische Ort, ist es, was garantiert, dass Agenten sie laden.
- **Pragmatisch, nicht starr gebunden.** Es bezieht sich auf die aufkommende `DESIGN.md`-Konvention als zu befolgende Form, bleibt aber Markdown-first und bindet sich an kein einzelnes Token-Schema.

## Frontend-bezogen, standardmäßig aktiv bei Erkennung

Dieses Addon ist für Repos mit einer echten UI-Oberfläche — ein Stylesheet mit CSS Custom Properties, eine Tailwind-Konfiguration oder ein `@theme`-Block, UI-Komponenten oder ein Marken-/Styleguide. Es wird **nie** für ein reines Backend-, CLI- oder Bibliotheks-Repo angeboten. Wenn eine UI-Oberfläche **erkannt** wird, behandelt das Onboarding es als **standardmäßig aktiv**: Im Trust-Modus wendet es das Addon an, und im geführten Modus empfiehlt es es nachdrücklich. Es ist nie erforderlich — ein Repository mit null Addons ist vollständig konform, und du kannst es jederzeit ablehnen.

## Optionaler Befehl

Wenn angenommen, kann das Addon einen `/design-system`-Delegator in das `.agents/commands/`-Verzeichnis des Repos installieren, um `DESIGN.md` später neu zu erzeugen oder zu aktualisieren. Die Installation des Befehls ist optional; ein abgelehntes Addon installiert keinen.

## Verhältnis zu featurebezogenen Design-Dokumenten

Dies ist eine **repository-weite, persistente** Designsystem-Datei — verschieden von einem featurebezogenen technischen Design-Dokument (der „requirements → design → tasks"-`design.md` werkzeuggebundener spec-driven-Workflows). Deep Work Plan liefert bewusst keinen separaten featurebezogenen Design-Doc-Archetyp: Die README eines Plans, die Akzeptanzkriterien jeder Aufgabe und die Validierungs-Gates decken diese Rolle bereits ab. Dieses Addon füllt die eine Lücke, die diese Rolle nicht abdeckt: dauerhaften, repo-nativen UI-Designkontext.
