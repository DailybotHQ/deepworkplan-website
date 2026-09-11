---
title: "DWP v3: Tokeneffizienz von Grund auf"
description: "Deep Work Plan v3 baut den Harness rund um die Kontextkosten neu auf – progressive Offenlegung, wirkungsbezogene Validierung und ein einziger verpflichtender Final Review – und hebt gleichzeitig die Vertrauens- und Konformitätsgrenze an."
date: 2026-09-10
version: "v3 · Tokeneffizienz"
kind: release
lang: de
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Heute veröffentlichen wir Deep Work Plan v3. Kontext ist die knappste Ressource eines Agenten, und dieses Release behandelt das als technisches Problem statt als informelles Versprechen: Das Gerüst wird komprimiert, nie die Anweisungen.

`GUIDE.md` wird zu einem Routing-Index statt zu einem Dokument, das jeder Agent vollständig liest, sodass ein Agent nur die Anleitung lädt, die ein bestimmter Schritt tatsächlich braucht. Validierungs-Gates werden jetzt anhand der betroffenen Oberfläche jeder Aufgabe ausgewählt, statt bei jeder Änderung die komplette Suite erneut laufen zu lassen, und das Erstellen eines Plans kann direkt in den Trust-Modus übergehen, wenn ein Entwickler bereits weiß, was er will, wodurch die Zwischenprüfung entfällt. Nichts davon schwächt die Gates: Es entfernt wiederholtes Lesen, redundantes Laden von Kontext und Validierungsarbeit, die nicht zu dem passt, was sich tatsächlich geändert hat.

Neben der Effizienzarbeit hebt dieses Release die Vertrauensgrenze an. Ein verpflichtender Final Review ersetzt die drei Abschlussaufgaben, die früher einen Plan beendeten, der lokale AI Diff Reviewer wird zu einer erforderlichen Basiskomponente, und die Konformität startet jetzt bei null optionalen Add-ons — Sicherheit und Herkunftsnachweis sind Anforderungen, kein optionaler Feinschliff. `AGENTS.md` verzeichnet die DWP-Standard-Herkunft des Repositorys, und Altpläne behalten ihre erfasste Form mit einem expliziten Migrationspfad, statt stillschweigend umgeschrieben zu werden.

Dieses Release folgt dem DWP-Standard `2.3.0`. Instruktionslast und Replay-Verhalten werden anhand eines öffentlichen Evaluierungs-Ledgers gemessen, niemals als erfundener Einsparungsprozentsatz angegeben.

Lies die [Tokeneffizienz-Architektur](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) und ihren [Evaluierungsbericht](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), oder entdecke die [normative Spezifikation](https://deepworkplan.com/spec) und das [Kit](https://deepworkplan.com/kit/).
