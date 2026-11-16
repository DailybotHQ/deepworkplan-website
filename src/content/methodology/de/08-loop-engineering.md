---
title: Loop Engineering
description: "Wie ein menschlich gestarteter Daemon genehmigte Deep Work Plans mit Registrierung, Nachfolge und Meldungen innerhalb ihrer Befugnisse bis zum Ende führt."
order: 8
lang: de
summary: Der vollständige Ablauf, der einen genehmigten Plan innerhalb seiner dokumentierten Befugnisse voranbringt.
icon: repeat
---

# Loop Engineering

**Spezifikation zuerst, geschlossener Loop: Das Repository ist das Harness und der Plan läuft selbst bis zum Ende.** Dieses Kapitel beschreibt die optionale Kontinuität nach dem ersten Ausführungsschritt. Der Plan bleibt die dauerhafte Spezifikation; der Loop schafft keine neue Befugnis.

## Plan registrieren

Ist das Herdr-Addon aktiv, beansprucht der `execute`-Ablauf des Packs den Lead-Eintrag des Plans und verzeichnet eine Nachfolge. Der Eintrag benennt Plan, aktuellen Lead, Epoche und geordnete Nachfolger. Pläne ohne Lead-Eintrag werden nicht überwacht. Das Addon ist optional; die Kernmethode funktioniert weiterhin in einer Sitzung oder mit menschlich koordinierter Übergabe. Registrierung genehmigt keine Arbeit und erweitert keine Autorisierung. In v8 läuft ein genehmigter Plan innerhalb der im Plan festgehaltenen Befugnisse bis zum Ende; Akzeptanzkriterien und Gates bleiben verbindlich.

## Daemon manuell starten

Ein Mensch startet `herdr-peers autopilot --loop` in einer Herdr-Umgebung. Der lokale Hintergrund-Daemon ist weder Login-Element noch Systemdienst. Er beobachtet registrierte Pläne auf aktivierten Maschinen und stößt einen untätigen Lead an, wenn der Plan offen ist, keine Lane arbeitet und keine Antwort aussteht. Der feste Prompt fordert dazu auf, den genehmigten Plan unter Einhaltung seiner Gates und Befugnisse abzuschließen.

Der Daemon greift nie auf Logins, Zugangsdaten oder Claudes Bypass-Bestätigung zu. Er wählt keine Ablehnung, führt keinen freien Bildschirmtext aus und erzeugt keine Berechtigung. Ein Anstoß fügt keine Befugnis hinzu. Der Lead dokumentiert Blocker und beachtet weiterhin die Gates. Nach drei Anstößen ohne Fortschritt endet das Anstoßen mit `plan_stalled`.

## Führung absichern

Ist der Lead verschwunden, bittet der Daemon den ersten erreichbaren Nachfolger um die Übernahme. Die Epoche steigt; Empfänger prüfen die Reihenfolge. Protocol 2 erlaubt auch eine Ernennung, aber nur nach ausdrücklicher menschlicher Freigabe im Plan. Vor jedem Merge, Tag oder Release prüft der aktuelle Lead mit `herdr-peers lead verify --plan <id>` den Eintrag auf allen Planmaschinen. Nachfolger übernehmen Plan und Gates, aber keine erweiterten Befugnisse. Erreicht der Plan ein nach C1–C7 menschlich zu behandelndes Gate, meldet der Loop den Bedarf und hält dort an. Zugangsdaten und Logins bleiben ebenfalls menschliche Aufgaben. Über sonstigen Fortschritt wird der Mensch informiert, statt jeden Schritt zu betreuen.

## Optionales Brain und Warteschlange

`--brain` startet optional einen eigenen Entscheidungsagenten für Fälle, die der Daemon nicht regelbasiert lösen kann. Das Brain darf nur aus einer geschlossenen, vom Plan erlaubten Aktionsliste wählen. Der Daemon bleibt der einzige Akteur: Er prüft die Auswahl und führt zulässige Aktionen aus; freien Brain-Text führt er nie aus. Ohne ausdrückliche Planfreigabe handelt das Brain nicht für den Plan.

Die Warteschlange nutzt `dwp-queue-v1` in `.dwp/queue.json`. Nur das Pack schreibt; der Daemon liest begrenzt und schreibgeschützt. Ein Plan wird bereit, wenn seine `after`-Abhängigkeit abgeschlossen oder nicht vorhanden ist und die Freigabe gilt. Der Daemon startet ihn nur mit einem festen Prompt an den registrierten Lead: „Plan P ist als Nächstes in dieser Repository-Warteschlange und genehmigt; führe ihn unter Beachtung seiner Gates bis zum Ende aus.“ `launch`-Einträge werden hier nicht gestartet. Das Pack verwaltet den Warteschlangenstatus.

## Melden und beobachten

Planereignisse erfassen Wartestatus, Start, Blockierung, Stillstand, Lead-Verlust und Abschluss. Der optionale Befehl `--notify` erhält für unterstützte Ereignisse ein `plan-event-v1`-Objekt; der Dailybot-Notifier des Packs wandelt es in Team-Updates um. Meldungen erteilen keine Befugnisse und ersetzen den Plan nicht. Flottenbericht und `herdr-peers fleet ui` zeigen Agenten und Pläne maschinenübergreifend. Die Oberfläche ist schreibgeschützt, ändert keinen Planstatus und stößt keinen Agenten an.

## Die Grenze

Loop Engineering schließt die Ausführung um eine genehmigte Spezifikation. Fortsetzung, Nachfolge und Meldungen werden routiniert, während der Plan die Befugnisquelle und der Daemon begrenzt bleibt. Der Mensch startet den Daemon, bearbeitet Zugangsdaten und Logins und löst nur C1–C7-Gates oder Bedürfnisse, die die dokumentierte Befugnis nicht abdeckt. Ziel ist, dass ein genehmigter Plan sein definiertes Ende ohne laufende menschliche Aufsicht erreicht.
