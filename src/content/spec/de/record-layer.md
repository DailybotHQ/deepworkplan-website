---
title: Aufzeichnungsschicht
description: "Die v6- und v7-Aufzeichnungsschicht: unveränderlicher Ergebnisvertrag, nur anhängbares Journal, Evidenzklassen, Freigabe, Änderungen, Invarianten, Quittungen."
order: 9
lang: de
section: Record layer
---

# Aufzeichnungsschicht

> **Versionsumfang:** Diese Seite gibt die normative v6-Aufzeichnungsschicht wieder, auf der der aktuelle Standard, DWP 7.0.0, aufbaut. Kanonische Quellen im Release `v7.9.0`: [`V6_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_CONTRACT.md) und [`V6_LIFECYCLE.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V6_LIFECYCLE.md). Wo diese Seite und diese Dateien voneinander abweichen, gelten die Dateien. v5-Pläne behalten die Schicht des [Plan-Zustands](/spec/plan-state) und werden niemals implizit migriert.

**Version 6.0.0, erweitert in 7.0.0. Status: Stabil.** Die Aufzeichnungsschicht ersetzt erzählten Abschluss durch Aufzeichnungen: Der Vertrag ist die Autorität, das Journal ist das Gedächtnis, Helfer übernehmen das Schreiben, und jede erzeugte Datei ist eine Projektion. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

## Das Modell in einem Satz

Ein Plan besteht aus zwei verfassten Artefakten und einer abgesicherten Abfolge. Das Plan-Markdown (`README.md` und Aufgabendateien) sagt, was getan wird. Der **Ergebnisvertrag** (`contract.json`) sagt, was als erledigt gilt und was der Plan tun darf. Das **Journal** (`journal.ndjson`) zeichnet auf, was tatsächlich geschehen ist. `state.json` und `views/` werden aus dem Journal neu erzeugt und DÜRFEN NICHT manuell bearbeitet werden; widersprechen sich eine erzeugte Datei und das Journal, gilt das Journal, und die Datei wird neu erzeugt.

## Erkennung der Generation

Ein Plan-Verzeichnis ist genau dann ein Plan der v6-Linie, wenn es eine `manifest.json` enthält, deren Verweis `contract` sich auflösen lässt, eine `contract.json` oder eine Revisionskette `contracts/`. Die Erkennung MUSS diese Artefakte verwenden, niemals die installierte Paketversion: Ein aktuelles Paket kann v5-Pläne enthalten, und ein älteres Paket kann auf einen v6-Plan treffen.

Die `schema`-URL des Vertrags benennt seine **Generation**, und das Manifest sowie jedes Journal-Ereignis spiegeln sie:

| Generation | Vertrag | Journal-Ereignisse | Manifest | Ergänzt |
| --- | --- | --- | --- | --- |
| v6 | [`plan-contract/v6`](https://deepworkplan.com/schema/plan-contract/v6.json) | [`journal-event/v6`](https://deepworkplan.com/schema/journal-event/v6.json) | [`plan-manifest/v6`](https://deepworkplan.com/schema/plan-manifest/v6.json) | — |
| v7 | [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json) | [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json) | [`plan-manifest/v7`](https://deepworkplan.com/schema/plan-manifest/v7.json) | `parallel_safe` und das Ereignis `delegation` ([Delegation](/spec/delegation)) |

Neue Pläne, die das 7.x-Paket erstellt, sind standardmäßig v7; eine ausdrückliche `v6`-Anforderung materialisiert weiterhin einen v6-Vertrag. Ein Plan wechselt nie die Generation, und ein Journal, das Generationen mischt, MUSS abgelehnt werden. Beide Generationen projizieren in dieselbe Form [`plan-snapshot/v6`](https://deepworkplan.com/schema/plan-snapshot/v6.json).

## Der Ergebnisvertrag

Ein Vertrag pro Plan, konform zum Schema seiner Generation. Er enthält die Ergebnisaussage und die Erfolgsdefinition, die Akzeptanzkriterien, die Aufgaben mit ihren Voraussetzungen, ihrer Touched Surface und ihrer Gate-Absicht, planweite Invarianten, den Umfang (erlaubte Pfade, Befehlsklassen, verbotene Operationen), den Ressourcenrahmen, Planungsgrenzen, Berechtigungen und den Autorisierungseintrag.

- **Identität.** Die `contract_id` ist der SHA-256 der kanonischen Bytes des Vertrags ohne das ID-Feld. Jede unter dem Vertrag erzeugte Aufzeichnung zitiert sie.
- **Unveränderlichkeit.** Sobald die Ausführung beginnt, DARF der Vertrag sich NICHT ändern. Ein geänderter Vertrag ist eine neue **Revision** unter `contracts/`, die ihren Vorgänger zitiert, mit lückenlosen Revisionsnummern und neu aufgezeichneter Autorität.
- **Stabile IDs.** Kriterien (`AC-*`), Invarianten (`INV-*`) und Aufgaben (`T-*`) MÜSSEN eindeutig sein, und Aufzeichnungen zitieren IDs, niemals Listenpositionen. Der Aufgabengraph MUSS azyklisch sein, und jede Gate-Absicht MUSS auf ein deklariertes Kriterium verweisen.
- **Berechtigungen.** Erteilte und nicht erteilte Fähigkeiten MÜSSEN disjunkte Teilmengen einer geschlossenen Menge sein: `gate_command_exec`, `fs_write_plan_scope`, `fs_write_repo_scope`, `git_operations`, `network_access`, `host_adapter_metering`, `agent_delegation`, `context_export`.
- **Autorisierung.** Der Mechanismus ist genau `plan_authorship` (der Mensch hat den Plan vor der Ausführung verfasst oder geprüft) oder `pre_authorization` (eine stehende Berechtigung mit angegebenem Rahmen, wie im Trust-Modus). Beide wirken an den Gates identisch; nur die aufgezeichnete Autorität unterscheidet sich.
- **Schließbarkeit.** Jedes Kriterium MUSS schließbar sein: Ein Kriterium, das eine Aufgabe als Gate prüft, wird durch `observed`-Evidenz aus ihrem Gate oder durch eine `asserted`-Freigabe eines Menschen geschlossen, je nachdem, welche Evidenzklassen es akzeptiert. Ein Entwurfskriterium, das keine davon akzeptiert, wird abgelehnt.

## Materialisierung

Ein Plan wird durch den mitgelieferten Helfer (`ledger.py materialize`) materialisiert, niemals von Hand, und zwar genau in dieser Reihenfolge, wobei jeder Schritt idempotent und wiederaufnehmbar ist:

1. **`manifest.json`** mit dem Vertragsverweis, zuerst geschrieben, damit die Generation des Plans auch bei unterbrochener Materialisierung erkennbar ist.
2. **`contract.json`**, validiert und inhaltsadressiert.
3. Das Journal-Ereignis **`approval`**, das die Vertrags-ID und den Digest des Plan-Markdowns zitiert.

Erst dieses Freigabe-Ereignis öffnet das Gate für den Aufgabenstart. Ein von Hand kopierter Vertrag ohne dieses Ereignis wird beim Aufgabenstart abgelehnt, und ein Manifest, dessen Verweis nicht zum materialisierenden Vertrag passt, wird abgelehnt statt umgeschrieben.

## Das Journal

`journal.ndjson` ist nur anhängbar: ein geschlossenes JSON-Objekt pro Zeile, niemals bearbeitet oder gelöscht. Eine Korrektur ist ein späteres Ereignis. Jedes Ereignis enthält sein Schema, seinen Typ, eine streng steigende `seq`, einen Zeitstempel, den Plan, die `contract_id` und den Akteur (`helper`, `agent`, `host_adapter` oder `human`). Der Ereigniskatalog umfasst Aufgabenstarts, Freigaben, Gate-Läufe, Beobachtungen, Anpassungen, Vertragsänderungen, Eingriffe, Ressourcenstichproben, Kontrollpaare, Scheduler-Auswahlen, Ablehnungen, View-Renderings, Abgleiche und Journal-Reparaturen; v7 ergänzt Delegationsereignisse. Jede Ablehnung wird selbst aufgezeichnet.

## Evidenzklassen

Evidenztragende Ereignisse zeichnen ein **Vertrauens**-Label auf:

1. **observed** — ein mitgelieferter Helfer hat die Prüfung selbst ausgeführt, mit deklariertem Arbeitsverzeichnis, deklarierter Umgebung, Timeout und erfasster Ausgabe. Nur der Gate-Runner (`ledger.py gate`) erzeugt beobachtete Gate-Evidenz; ein Agent, der lediglich ein von ihm berichtetes Ergebnis notiert, kann das nicht.
2. **imported** — aus einer passenden externen Quelle mit Herkunftsnachweis übernommen, etwa ein migrierter v5-Gate-Eintrag, dessen Evidenzverweis sich auflösen lässt.
3. **asserted** — behauptet, ohne unabhängige Feststellung.

Jedes Kriterium deklariert, welche Klassen es akzeptiert, sodass ein Kriterium, das nur `observed` akzeptiert, niemals durch eine Behauptung geschlossen werden kann. Prüfsummen belegen Byte-Identität, nicht semantische Wahrheit; die Aufzeichnungsschicht prüft Struktur und Herkunft und beweist keine Produktsemantik.

## Freigabe durch einen Menschen

Ein Kriterium, das ein Mensch beurteilen muss, wird über `ledger.py signoff --criterion <AC> --evidence-path <artifact> --authority <who>` geschlossen. Die Freigabe wird als `asserted` aufgezeichnet, zitiert das Artefakt, auf dem sie beruht, zählt nur innerhalb des Evidenzfensters der deklarierenden Aufgabe und schließt nur ein Kriterium, das `asserted` akzeptiert. Ein Agent gibt niemals anstelle eines Menschen frei. Aufzeichnungen mit menschlichem Akteur, die außerhalb der Materialisierung geschrieben werden, tragen einen ausdrücklichen Autoritätsmarker (eine vom Menschen verfasste Notiz, aufgezeichnet mit Pfad und Digest, oder eine interaktive Bestätigung); das Ledger kann keine Person authentifizieren, daher macht der Marker die Behauptung prüfbar, nicht beobachtet.

## Kontrollierte Kriterien

Ein als Regressions- oder Unterscheidungskontrolle deklariertes Kriterium wird nur durch ein **unterscheidendes Kontrollpaar** geschlossen: Die Prüfung schlägt auf der Ausgangsrevision fehl und besteht auf der neuen. Ein Paar, das auf beiden Seiten besteht, wird als nicht unterscheidend aufgezeichnet und niemals aufgerundet; ein verschmutzter Ausgangszustand oder eine nicht verfügbare alte Seite wird als nicht verfügbare Kontrolle aufgezeichnet, niemals synthetisiert.

## Ausführung und Abschluss

Die Zuteilung kommt vom deterministischen Scheduler (`scheduler.py ready`), und `ledger.py start` lehnt eine Aufgabe ab, deren Voraussetzungen unvollständig sind. Jeder Aufgabenstart zeichnet einen Fingerabdruck des Arbeitsbaums auf, und Evidenz wird nur für dieselbe Aufgabe und dasselbe Kriterium bei einem gleichwertigen Fingerabdruck wiederverwendet.

**Invarianten gelten planweit.** Jede deklarierte Invariante gilt für den gesamten Plan und wird an jeder Grenze als Beobachtung ausgewertet (`INV-<id>: pass` oder `INV-<id>: fail: <reason>`). Eine Eigenschaft, die nur einige Aufgaben erfüllen müssen, ist ein Akzeptanzkriterium dieser Aufgaben, niemals eine Invariante.

**Der Abschluss wird abgeleitet, niemals erklärt.** `ledger.py complete` lehnt ab und zeichnet die Ablehnung auf, solange einem Kriterium akzeptierte Evidenz im Fenster fehlt oder einer Invariante eine frische bestandene Auswertung fehlt. Der Snapshot zeigt eine Aufgabe genau dann als abgeschlossen, wenn die Aufzeichnungen das stützen.

## Anpassungen und Vertragsänderungen

Änderungen während des Laufs sind Vorschläge an den Scheduler, beschränkt auf eine geschlossene Menge: `split`, `reorder`, `insert`, `change_strategy` und `retry`. Eine Anpassung DARF NICHT eine Anforderung löschen, die Akzeptanz abschwächen oder ersetzen, Umfang oder Berechtigungen erweitern, über den Rahmen hinaus verbrauchen oder ein nicht ausgeführtes Szenario als abgeschlossen markieren.

Eine Änderung an Umfang, Akzeptanzkriterien, Berechtigungen oder Rahmen ist eine **Vertragsänderung**: `ledger.py amend` stellt den überarbeiteten Vertrag als nächste Revision bereit, zeichnet die Änderung zusammen mit den Kriterien auf, deren frühere Evidenz sie ungültig macht, verlangt eine neue Freigabe mit menschlichem Autoritätsmarker und schaltet erst dann den gültigen Vertrag um. Eine unterbrochene Vertragsänderung wird beim ersten fehlenden Schritt fortgesetzt; die Planautorschaft geht niemals auf eine Revision über.

## Quittungen, Views und Export

`outcomes.py receipt` berechnet das Ergebnis des Plans aus den Aufzeichnungen neu, sodass es sich ändert, wenn sich die Aufzeichnungen ändern; es wird niemals von Hand geschrieben. `views.py render` erzeugt menschenlesbare Views neu; eine von einem Menschen bearbeitete View wird gemeldet, niemals stillschweigend überschrieben, und der Abgleich wird selbst aufgezeichnet. Da `.dwp/` per gitignore ausgeschlossen ist, bündelt `ledger.py export --dest <dir>` Journal, Snapshot, Vertragskette und jedes zitierte Evidenzartefakt für die Dauerhaftigkeit oder für einen anderen Host.

## Nur lesende Oberflächen und Wiederaufnahme

`status` und `verify` schreiben niemals in einen Plan der v6-Linie; sie berichten über reine Befehle und die erzeugten Projektionen. Ein wiederaufnehmender Host stellt in fester Reihenfolge wieder her (prüfen, validieren, projizieren, mit aufgezeichneter Autorität rendern) und behandelt einen veralteten Fingerabdruck als ungültige Evidenz, die erneut auszuführen ist, niemals als wiederverwendbares Ergebnis. Das Journal wird niemals als Gesprächskontext wiedergegeben: Die Arbeit wird über die Ausführungsschleife mit einem [Kontextmanifest](/spec/resources-and-abilities#the-per-task-context-manifest) pro Aufgabe fortgesetzt.

## Koexistenz und Migration

v5-Pläne und Pläne der v6-Linie KÖNNEN in einem `.dwp/plans/` koexistieren, und jeder läuft während seiner gesamten Lebensdauer unter seiner eigenen Generation. Der einzige Weg von v5 zu v6 ist eine ausdrückliche Migration mit Vorschau (`migrate_v6.py`, ausgeführt über `refine`) mit verifiziertem Backup und Rollback; migrierte v5-Historie ist `imported`, wenn sich ihre Evidenz auflösen lässt, und andernfalls `asserted`, niemals `observed`. Es gibt keine Rückmigration.

## Verwandt

- [Ressourcen und Fähigkeiten](/spec/resources-and-abilities) — das Kontextmanifest, der Ressourcenrahmen, Host-Fähigkeiten und die Addon-Registry.
- [Delegation](/spec/delegation) — was v7 dieser Schicht hinzufügt.
- [Plan-Zustand](/spec/plan-state) — die beibehaltene v5-Zustandsschicht.
