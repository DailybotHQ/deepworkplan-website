---
title: "DWP v6: dieselbe Methode, ein strengerer Vertrag"
description: "Deep Work Plan v6 behält die v5-Methodik bei und ergänzt eine strengere Ausführungsstruktur. Die Nichtunterlegenheit der Agentenergebnisse wurde nicht gemessen."
date: 2026-09-28
version: "v6 · Strengere Struktur"
kind: release
lang: de
order: 0
featured: true
sourceLabel: "Veröffentlichter v6-Schemasatz"
sourceUrl: "https://deepworkplan.com/schema/plan-manifest/v6.json"
sourceLinks:
  - label: "Plan manifest schema v6"
    url: "https://deepworkplan.com/schema/plan-manifest/v6.json"
  - label: "Plan snapshot schema v6"
    url: "https://deepworkplan.com/schema/plan-snapshot/v6.json"
  - label: "Plan contract schema v6"
    url: "https://deepworkplan.com/schema/plan-contract/v6.json"
  - label: "Journal event schema v6"
    url: "https://deepworkplan.com/schema/journal-event/v6.json"
  - label: "Context manifest schema v6"
    url: "https://deepworkplan.com/schema/context-manifest/v6.json"
---

Deep Work Plan v6 behält die v5-Methodik, die Befehlsoberfläche und den Speicherort `.dwp/plans/` bei. Es ergänzt eine strengere Struktur für Planautorität, Ausführungsnachweise, Aufgabenkontext, Planung und Live-Zustand.

Der v6-Schemasatz definiert Identitätsmanifest, Ergebnis- und Autoritätsvertrag, Journalereignisse zum ausschließlichen Anhängen, Kontextmanifest pro Aufgabe und Live-Snapshot. Die Live-Projektion von v6 ist ein Snapshot, daher bleibt `plan-state/v5.json` das State-Schema für v5-Pläne; `plan-state/v6.json` gibt es nicht. Bestehende Pläne behalten ihre aufgezeichnete Generation und werden nie stillschweigend umgeschrieben.

Die Architekturentscheidung lautet GO: v6 behält dieselbe Methodik mit strengerer technischer Struktur bei. Das ist keine empirische Überlegenheitsbehauptung. Die Nichtunterlegenheit der Agentenergebnisse wurde nicht gemessen.

Neue Pläne erhalten monoton steigende numerische IDs mit mindestens drei Stellen (zum Beispiel `PLAN_001_add_payment_webhooks/`). Da die eingefrorenen v5-Schemas die numerische ID als Wort zählen, bestehen v5-Slugs aus 2–4 Wörtern; v6-Slugs aus 2–5. Bestehende unnummerierte Ordner `PLAN_<slug>/` bleiben lesbar und werden niemals umbenannt. Wenn nummerierte Pläne vorhanden sind, löst `latest` zum Plan mit der höchsten numerischen ID auf.
