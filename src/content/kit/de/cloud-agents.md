---
title: Cloud-Agenten
description: "Der DWP-Adapter für Cloud- und Hintergrund-Agenten: Claude Code Remote-Tasks, Codex Cloud, Jules-Klasse — ephemere Sitzungen, die gegen einen dauerhaften .dwp/-Plan ausführen."
kind: adapter
lang: de
order: 12
agent: Cloud agents
support: full
prefix: plain text
---

# Cloud-Agenten-Adapter

Cloud- und Hintergrund-Agenten — Claude Code Remote-Tasks, OpenAI Codex Cloud, Jules-Klassen-Agenten und ähnliche asynchrone Ausführungsumgebungen — sind von Natur aus ephemer: Eine Sitzung startet, läuft für eine begrenzte Zeit und endet. DWP macht aus dieser Einschränkung einen Vorteil, indem es den Plan zum dauerhaften Artefakt macht, nicht die Sitzung.

## Die zentrale Erkenntnis

Das `.dwp/`-Verzeichnis des Repositorys ist die **dauerhafte Spezifikations- und Zustandsschicht**. Cloud-Sitzungen sind **ephemere Ausführer**. Der Plan teilt dem Ausführer mit, was zu tun ist; `state.json` teilt ihm mit, wo er wiederaufnehmen soll. Die Sitzung kann beliebig beschaffen sein — ein anderes Modell, ein anderer Anbieter, ein neuer Container — und der Plan setzt genau dort fort, wo er aufgehört hat.

## Support-Level

**Vollständig** — jeder Cloud-Agent, der das Repository liest, `AGENTS.md` befolgt und Shell-Befehle ausführen kann, unterstützt DWP ohne plattformspezifischen Adapter.

## Die Wake-Resume-Yield-Schleife

Jeder Cloud-Agenten-Turn folgt dem Muster:

1. **Aufwachen** — die Sitzung startet (ausgelöst durch einen Cron-Schedule, ein CI-Ereignis oder eine Nutzeraktion).
2. **DWP-Wiederaufnahme-Protokoll ausführen** — den Plan-README lesen, den Checkpoint lokalisieren, `state.json` gegen das Markdown abgleichen, die Naht prüfen, einen Smoke-Test durchführen. Siehe [DWP-Spezifikation](/spec/dwp-specification#the-dwp-resume-protocol).
3. **Auf blockierten Zustand prüfen** — wenn `state.json.blocked` gesetzt ist, den Grund berichten und ohne Ausführung freigeben.
4. **Die nächste atomare Aufgabe ausführen** — eine Aufgabe, die ihr vollständiges Validierungs-Gate besteht.
5. **Die Zustandsschicht aktualisieren** — `state.json` atomar mit dem neuen Aufgabenstatus, Gate-Einträgen, Ergebnis-Eintrag und Commit-Hash neu schreiben.
6. **Freigeben** — die Sitzung endet sauber; der nächste Turn nimmt vom aktualisierten Zustand auf.

## Anforderungen

- Der Plan MUSS die maschinenlesbare Zustandsschicht tragen (`manifest.json` + `state.json`). Ohne sie hat eine ephemere Sitzung keine zuverlässige Möglichkeit, die Wiederaufnahmeposition zu bestimmen. Siehe [Plan-Zustand](/spec/plan-state).
- Der Plan MUSS von einem Menschen genehmigt worden sein, bevor ein unbeaufsichtigter Cloud-Turn stattfindet. Plan-Genehmigung ist der Kontrollpunkt.
- Der Agent operiert unter begrenzter Autorität: er DARF NICHT den Umfang ausweiten, destruktive oder nach außen gerichtete Aktionen durchführen, die der Plan nicht explizit autorisiert, oder über die Anweisungen der aktuellen Aufgabe hinaus improvisieren, um entdeckte aber nicht geplante Arbeit abzudecken — entdeckte Arbeit wird für das nächste `refine` aufgezeichnet, nicht improvisiert. Siehe [Agentenprotokoll](/spec/agent-protocol#execution-profiles).

## Hinweise

Cloud-Agenten-Sitzungen sind der extreme Fall des unbeaufsichtigten Ausführungsprofils: null Sitzungskontinuität, maximale Plan-Dauerhaftigkeit. DWPs `.dwp/`-Verzeichnis ist speziell dafür ausgelegt, dies zu ermöglichen — der gesamte Zustand, den ein Agent benötigt, um eine Arbeit zu beginnen, fortzuführen und abzuschließen, liegt in einfachen Markdown- und JSON-Dateien, die jede Sitzung aus einem frischen Checkout lesen kann.
