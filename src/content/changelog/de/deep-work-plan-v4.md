---
title: "DWP v4: Pläne, die zur Arbeit passen"
description: "Deep Work Plan v4 sorgt dafür, dass sich das Planformat nach der Arbeit richtet, nicht umgekehrt — ein Lite-Plan ist jetzt ein vollständiger, ausführbarer Vorschlag für begrenzte Aufgaben, und der separate Entwurfsschritt entfällt."
date: 2026-09-11
version: "v4 · Lite-first-Pläne"
kind: release
lang: de
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Heute veröffentlichen wir Deep Work Plan v4. Dieses Release dreht sich um Agilität und Vielseitigkeit: Dieselbe Methodik soll sich bei einer begrenzten Korrektur leicht anfühlen und trotzdem für Arbeit tragen, die sich über Stunden oder Tage erstreckt, ohne dass Entwickler das „ernste" Format wählen müssen, nur um echte Gates zu bekommen.

Einen Plan für begrenzte Arbeit zu erstellen bedeutet nicht mehr, zuerst einen Wegwerf-Entwurf zur Prüfung zu schreiben und danach einen separaten finalen Plan. `create` erstellt jetzt direkt einen **Lite-Plan**: einen kompakten, vollständig ausführbaren Vorschlag mit inline erfassten Aufgabendatensätzen, jeder mit eigenen Abnahmekriterien, Validierungs-Gate und Abschlussprotokoll. Es gibt keinen `.dwp/drafts/`-Zwischenschritt mehr — Entwurf und Plan sind dasselbe Artefakt, überprüfbar und ausführbar ab dem Moment, in dem es geschrieben wird.

Vollständige Pläne mit Aufgabendateien bleiben genau dort, wo sie hingehören: Längere, risikoreichere Arbeit erhält weiterhin eine Datei pro Aufgabe, einen eigenen Analysebericht und dieselbe fortsetzbare Zustandsebene. Ein Lite-Plan kann jederzeit zu Full befördert werden, sobald eine Anforderung oder ein Validierungs-Gate nicht mehr in einen kompakten Datensatz passt, und welche Darstellung als Ausgangspunkt dient, folgt expliziten, dokumentierten Signalen — Aufgabenzahl, betroffene Oberfläche, Risiko, Umkehrbarkeit — nie einer Vermutung.

Dieses Release folgt dem DWP-Standard `2.4.0`. Lies die [normative Spezifikation](https://deepworkplan.com/spec), entdecke das [Kit](https://deepworkplan.com/kit/), oder starte die Einführung über [`/init`](https://deepworkplan.com/init).
