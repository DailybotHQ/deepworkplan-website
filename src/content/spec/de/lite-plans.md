---
title: Lite-Pläne
description: "Lite-Pläne: kompakte, ausführbare Aufgabendatensätze inline in README.md, ihre Erstellung und Formatauswahl sowie die Beförderung zu einem Full-Plan."
order: 3
lang: de
section: Workflow
---

# Lite-Pläne

**Version 2.4.0. Status: Stabil.** Dieses Dokument spezifiziert die Lite-Plan-Darstellung, die zusammen mit der [DWP-Spezifikation](/spec/dwp-specification) eingeführt wird: ein Planformat für kleine bis mittlere, abgegrenzte Arbeiten, das direkt materialisiert wird, ohne eine nicht ausführbare Entwurfsstufe. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

## Darstellung und Lebenszyklus

Ein Plan MUSS eine von zwei Darstellungen sein, einmal in `manifest.json` als `plan_format` festgehalten: **Full** speichert eine Datei je Aufgabe unter `<n>.task_<slug>.md`; **Lite** speichert kompakte, ausführbare Aufgabendatensätze inline in `README.md`, jeweils hinter einem stabilen `{#task-N}`-Anker. Ein Lite-Plan ist kein teilweiser oder informeller Full-Plan: Jeder Aufgabendatensatz MUSS weiterhin ein Ziel, eine Touched Surface, Akzeptanzkriterien, ein Validierungs-Gate und ein Abschlussprotokoll tragen, in derselben normativen Form, die [Aufgaben-Anatomie](/spec/dwp-specification#task-anatomy) für Full definiert.

Vier Achsen beschreiben den Zustand eines Plans und MÜSSEN unabhängig voneinander verfolgt werden, statt vermischt zu werden:

| Achse | Werte | Bedeutung |
|------|--------|---------|
| Format | `lite`, `full` | Wo die Aufgabendatensätze leben |
| Materialisierung | `materializing`, `ready`, `promoting` | Ob der Plan-Ordner gerade geschrieben, vollständig oder in Beförderung befindlich ist |
| Genehmigung | `pending`, `approved`, `pre_approved` | Ob ein Mensch den Plan geprüft hat, oder ob der Trust-Modus ihn vorgenehmigt hat |
| Ausführung | `pending`, `in_progress`, `blocked`, `completed` | Fortschritt je Aufgabe und insgesamt |

Der geführte create-Ablauf schreibt einen **überprüfbaren, ausstehenden Vorschlag** — Lite oder Full, bereits der echte Plan, niemals ein Wegwerf-Entwurf. Trust materialisiert einen **fertigen, vorgenehmigten** Plan und gibt die Kontrolle sofort zurück. `create` und eine Beförderung führen niemals Produktarbeit aus; `execute` MUSS einen `pending`-Vorschlag, der auf Genehmigung wartet, ablehnen und MUSS einen Plan mit einer laufenden, nicht abgeschlossenen Beförderung ablehnen.

## Erstellung und Formatauswahl

`/dwp-create` bedient Planungsabsichten auf jeder Größenordnung, nicht nur bei großer Arbeit. Kleine, abgegrenzte Arbeit — ein einzelnes Anliegen, ungefähr eine Sitzung, keine Koordination — ist das Zielbild des Lite-Plans; mehrstufige Arbeit mit realem Umfang setzt standardmäßig auf Full, gemäß [Proportionaler Rigor](/spec/dwp-specification#proportional-rigor). Eine direkte Änderung, eine Erklärung, eine Statusprüfung, eine Wiederaufnahme oder eine explizite Anfrage ohne Plan behält ihre eigene Route und wird nie zu einem Plan.

`lite` und `full` sind **Formatpräferenzen**; `trust` und `auto` sind separate **Interaktionsoptionen**, und jede Art von Option KANN an jedem Ende der Anfrage erscheinen, in beliebiger Reihenfolge:

```text
/dwp-create trust fix the label
/dwp-create lite trust fix the label
/dwp-create fix the label trust lite
/dwp-create fix the migration full trust
```

Das Wiederholen derselben Option ist idempotent; `lite` und `full` gemeinsam anzufordern ist ein Fehler. `--` beendet das Parsen der Optionen.

Wenn keine Formatpräferenz angegeben wird, empfiehlt `create` eine und erklärt warum. Eine explizite **Full**-Anfrage gewinnt immer. Eine explizite **Lite**-Anfrage wird respektiert, es sei denn, die Anforderungen oder Validierungs-Gates der Arbeit würden nicht in kompakte Inline-Datensätze passen — in diesem Fall vermerkt `create`, warum stattdessen Full erforderlich ist. Die Auswahl MUSS den beobachteten Umfang, die Abhängigkeiten, die erforderliche Detailtiefe der Anweisungen und die Unbekannten hinter der Entscheidung festhalten — ein prüfbares Urteil, keine Garantie, die über jedes Modell oder jeden Agenten hinweg gilt.

## Beförderung und Kompatibilität

Ein Lite-Plan KANN jederzeit über `/dwp-refine promote {plan_name}` zu Full **befördert** werden (siehe [dwp-refine](/kit/dwp-refine)). Die Beförderung ist **rein darstellungsbezogen**: Sie zeichnet die Absicht auf, schreibt die Ziel-Aufgabendateien, validiert, dass jede Anforderung und jedes Gate, das der Lite-Datensatz trug, weiterhin abgedeckt ist, wechselt die maßgebliche Kopie von den inline-README-Datensätzen zu den Aufgabendateien und löscht dann die laufende Markierung. `execute` und `resume` MÜSSEN die Fortsetzung verweigern, solange eine Beförderungsmarkierung gesetzt bleibt. Bereits aufgezeichnete Aufgaben-IDs und Abschlussnachweise DÜRFEN NICHT durch eine Beförderung umgeschrieben werden; während der Beförderung entdeckter neuer Umfang durchläuft stattdessen `refine` und entwertet nur den davon betroffenen Nachweis.

Eine Beförderung läuft nie automatisch in die andere Richtung: Ein Full-Plan wird nicht stillschweigend zu Lite zusammengefaltet. Ein Plan, der unter einer früheren Spec-Version verfasst wurde — einschließlich eines v1-Full-Plans ganz ohne `plan_format`-Feld — behält seine aufgezeichnete Form und bleibt konform; eine `refine`-Sitzung KANN ihn gezielt migrieren, aber nichts tut dies implizit.

Das `plan_format` von `manifest.json` ist unveränderlich, sobald es geschrieben ist; eine Beförderung ändert das `format` von `state.json` und löscht dessen `promotion`-Markierung, und schreibt niemals das Manifest um. Siehe [Plan-Zustand](/spec/plan-state) für die genauen Felder `plan_format`, `format`, `materialization`, `approval`, `promotion` und `locator` sowie ihre v2-Schema-URLs.
