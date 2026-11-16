---
title: Loop engineering
description: "Wie ein vom Menschen gestarteter Daemon genehmigte Deep Work Plans über Registrierung, Nachfolge, Anstöße und Meldungen im festgehaltenen Rahmen voranbringt."
order: 8
lang: de
summary: Der durchgängige Ablauf, der einen genehmigten Plan innerhalb seiner festgehaltenen Befugnisse in Bewegung hält.
icon: repeat
---

# Loop engineering

**Spec-first, mit geschlossenem Loop: Das Repository ist das Harness, und der Plan läuft von selbst bis zum Ende.** Dieses Kapitel beschreibt die optionale Mechanik, die einen Plan nach seiner ersten Ausführungsrunde in Bewegung hält. Der Plan bleibt die dauerhafte Spezifikation; der Loop liefert Kontinuität, keine neue Befugnis.

## Den Plan registrieren

Ist das Herdr-Addon aktiv, beansprucht der `execute`-Ablauf des Packs den Lead-Eintrag des Plans (und `resume` beansprucht ihn erneut) und fügt eine Nachfolge hinzu, wenn der Plan Nachfolger benennt; Failover funktioniert nur mit einer eingetragenen Nachfolge. Dieser Eintrag gibt dem Loop einen genauen Plan, den aktuellen Lead, die Epoche und die geordneten Nachfolger zum Beobachten. Pläne ohne Lead-Eintrag werden nicht überwacht. Das Addon bleibt optional: Ohne es funktioniert die Kernmethodik weiterhin in einer Sitzung oder über eine von Menschen koordinierte Übergabe.

Die Registrierung genehmigt keine Arbeit und erweitert nicht die Autorisierung des Plans. Unter v8 läuft ein genehmigter Plan innerhalb der in ihm festgehaltenen Befugnisse bis zu seinem Ende. Seine Akzeptanzkriterien und Gates bleiben während der gesamten Ausführung verbindlich.

## Den Daemon von Hand starten

Ein Mensch startet `herdr-peers autopilot --loop` in einer Herdr-Umgebung. Es ist ein lokaler Hintergrund-Daemon, kein Anmeldeobjekt und kein Systemdienst. Er beobachtet registrierte Pläne auf allen aktivierten Rechnern und stößt einen untätigen Lead zum Weitermachen an, wenn dessen Plan offen ist, keine Lane arbeitet und keine Antwort aussteht. Der Prompt ist fest: den genehmigten Plan bis zu seinem Ende fortsetzen und dabei seine Gates und die festgehaltenen Befugnisse beachten.

Der Daemon berührt weder eine Anmeldung noch eine Abfrage von Zugangsdaten noch Claudes Bestätigung des Bypass-Permissions-Modus. Er wählt nie eine Ablehnung, eine Freitextoption oder eine Zeile, die die Berechtigungen eines Agenten erweitert. Ein Anstoß bittet einen Agenten nur, weiterzumachen; er fügt keine Befugnis hinzu. Der Lead hält Blocker weiterhin fest und folgt den Gates des Plans. Nach drei Prompts ohne Fortschritt hört der Daemon mit dem Anstoßen auf und meldet `plan_stalled`.

## Die Führung absichern

Ist der Lead verschwunden, bittet der Daemon den ersten erreichbaren eingetragenen Nachfolger, das Übernahmeverfahren auszuführen. Der Lead-Eintrag rückt um eine Epoche vor, und Empfänger setzen die Nachfolgereihenfolge durch. Protokoll 2 unterstützt auch die Ernennung eines Leads, aber nur, wenn der Mensch die Freigabe im Plan festgehalten (`lead claim --allow-appointment`) und den Daemon mit `--appoint` gestartet hat; der Daemon kann diese Berechtigung nicht selbst erteilen. Vor jedem Merge, Tag oder Release führt der aktuelle Lead `herdr-peers lead verify --plan <id>` aus, um den Eintrag auf allen Rechnern des Plans zu prüfen.

Ein Nachfolger erbt den Plan und seine Gates. Weder Nachfolge noch Ernennung ändern Akzeptanzkriterien oder erlauben Arbeit außerhalb der festgehaltenen Befugnisse. Erreicht der Plan ein Gate, das nach seinen C1–C7-Regeln menschliches Handeln erfordert, meldet der Loop den Bedarf und hält an diesem Gate an. Zugangsdaten und Anmeldungen bleiben ebenfalls menschliche Aufgaben. Über sonstigen Fortschritt wird der Mensch informiert, statt jeden Schritt beaufsichtigen zu müssen.

## Optionales Gehirn und Warteschlange

Der optionale Schalter `--brain` startet einen eigenen Entscheidungsagenten für Fälle, die die Regeln des Daemons nicht entscheiden können. Sie benötigt coding-agents-kit 1.3.0 oder neuer; andernfalls verweigert ein mit `--brain` gestarteter Daemon den Start. Das Gehirn darf nur aus einer geschlossenen Liste von Aktionen wählen, die der Daemon für jeden Fall festlegt: ein weiterer Anstoß, eine feste Aufforderung an den Lead, einen Blocker zu lösen, den der Plan als vom Lead lösbar kennzeichnet, den Menschen informieren oder den Fall liegen lassen. Der Daemon bleibt der einzige Akteur: Er prüft eine Wahl und führt eine zulässige Aktion aus; freier Text des Gehirns wird nie ausgeführt. Unter v8 hält ein Plan außerdem in seinem Autonomieblock fest, ob ein Gehirn auf ihn einwirken darf.

Die Plan-Warteschlange verwendet das Dokument `dwp-queue-v1` unter `.dwp/queue.json`. Das Plan-Werkzeug schreibt es; der Daemon ist ein begrenzter, rein lesender Verbraucher. Ein eingereihter Plan wird startbereit, wenn seine `after`-Abhängigkeit abgeschlossen ist (oder fehlt) und seine Genehmigung gültig bleibt. Der Daemon startet ihn nur, indem er einen festen Prompt an den Lead sendet, den die Warteschlange nennt: „Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates.“ Ein `launch`-Eintrag wird von diesem Loop nicht gestartet. Den Zustand der Warteschlange pflegt das Pack im Verlauf von Ausführung und Abschluss.

## Melden und beobachten

Planereignisse decken einen Plan ab, der festhängt, blockiert ist, seinen Lead verliert oder abgeschlossen wird, sowie einen eingereihten Plan, der startet oder nicht starten kann. Der optionale `--notify`-Befehl erhält für unterstützte Ereignisse ein `plan-event-v1`-Objekt; der Dailybot-Notifier des Packs macht daraus Team-Updates. Benachrichtigungen melden Fortschritt oder einen Blocker; sie autorisieren keine Aktion und ersetzen nicht den Planeintrag.

Der Flottenbericht und `herdr-peers fleet ui` zeigen Agenten und Pläne über Rechner hinweg, einschließlich Arbeit, die Aufmerksamkeit braucht. Die Oberfläche ist schreibgeschützt: Sie schreibt keinen Planzustand und sendet keinem Agenten einen Prompt. Sie hilft einem Menschen, den Zustand des Loops zu sehen, ohne zu einer weiteren Steuerungsebene zu werden.

## Die Grenze

Loop engineering schließt den Ausführungsloop um eine genehmigte Spezifikation. Es macht Fortsetzung, Nachfolge und Berichterstattung zur Routine, während der Plan die maßgebliche Autorität und der Daemon begrenzt bleibt. Der Mensch startet den Daemon, kümmert sich um Zugangsdaten und Anmeldungen und löst nur die C1–C7-Gates des Plans oder andere Bedarfe, die die festgehaltene Befugnis nicht abdecken kann. Ziel des Loops ist ein genehmigter Plan, der sein definiertes Ende erreicht, ohne dass ein Mensch ihn ständig beaufsichtigen muss.
