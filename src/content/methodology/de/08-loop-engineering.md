---
title: Loop engineering
description: "Wie ein vom Menschen gestarteter Daemon genehmigte Deep Work Plans zu Ende führt: Lead-Einträge, Anstöße, Blocker, Nachfolge, Revive, Warteschlange, Ereignisse."
order: 8
lang: de
summary: Der durchgängige Ablauf, der einen genehmigten Plan innerhalb seiner festgehaltenen Befugnisse in Bewegung hält.
icon: repeat
---

# Loop engineering

**Spec-first, mit geschlossenem Loop: Das Repository ist das Harness, und der Plan läuft von selbst bis zum Ende.** Dieses Kapitel beschreibt die optionale Mechanik, die einen Plan nach seiner ersten Ausführungsrunde in Bewegung hält. Der Plan bleibt die dauerhafte Spezifikation; der Loop liefert Kontinuität, keine neue Befugnis.

Der normative Text steht in der [Loop-engineering-Spezifikation](/de/spec/loop-engineering). Dieses Kapitel ist die erzählende Ergänzung: Es geht den Ablauf der Reihe nach durch und zeigt, wie die Teile zusammenpassen, ohne jedes MUST zu wiederholen.

## Warum ein Loop

Die ersten beiden Säulen von DWP lassen eine Lücke. Die Spec-first-Planung sagt, *was* eine Episode liefern muss und wie es validiert wird. Das Repository als Harness sagt, *wo* Kontext, Werkzeuge und Gates liegen. Keine von beiden sagt, *wie die Arbeit zu Ende kommt*, wenn der ausführende Agent seine Runde beendet, ein Nutzungslimit erreicht oder sein Pane schließt. Ohne Loop wartet selbst ein genehmigter und gut spezifizierter Plan darauf, dass jemand „weiter“ tippt.

Die v8-Regel schließt diese Lücke. Ein genehmigter Plan läuft ohne routinemäßiges menschliches Eingreifen bis zu seinem Ende, innerhalb der in diesem Plan festgehaltenen Befugnisse. Der Mensch wird informiert, nicht abgewartet, außer wenn eine Anmeldung oder Zugangsdaten erforderlich sind oder wenn eines der C1–C7-Gates des Plans eine menschliche Eingabe verlangt, die nicht im Voraus autorisiert wurde. In diesen Ausnahmefällen hält die Ausführung am Gate an, bis die Eingabe eintrifft.

Der Loop ist daher ein Fortsetzungsmechanismus, kein Genehmigungsmechanismus, und er ist optional: Die Herdr-Integration (herdr-peers `autopilot --loop`) verstärkt eine Methode, die bereits in einer einzelnen Sitzung läuft.

## Der Ablauf im Überblick

Ein genehmigter Plan durchläuft diese Stufen. Jede wird unten im Detail beschrieben.

| Stufe | Was geschieht | Wer handelt |
|---|---|---|
| Genehmigen | Der Plan wird genehmigt; sein Vertrag hält seine Befugnisse fest und unter v8 einen optionalen `autonomy`-Block | Der Mensch |
| Registrieren | `execute` beansprucht den Lead-Eintrag des Plans (`resume` beansprucht ihn erneut), mit einer Nachfolge, wenn der Plan Nachfolger benennt | Der Lead-Agent, über das Pack |
| Ausführen | Der Lead arbeitet Task für Task gegen Akzeptanzkriterien und Gates | Der Lead und seine Lanes |
| Untätig | Das Pane des Leads bleibt untätig, während der Plan noch offen ist | — |
| Anstoßen | Der Daemon sendet einen festen Weiter-Prompt | Der Daemon |
| Blockieren | Der Lead hält einen strukturierten Blocker fest und hält an; der Daemon sendet nichts | Der Lead |
| Festhängen | Nach 3 Prompts ohne Fortschritt wird der Plan als `plan_stalled` festgehalten | Der Daemon hält es fest |
| Failover | Ein eingetragener Nachfolger übernimmt; mit einer Freigabe wird eine Lane ernannt; mit `--revive` wird ein frischer Agent gestartet | Der Nachfolger, die Lane oder der wiederbelebte Agent, über den Helper |
| Abschließen | Der Abschluss des Plans markiert seinen Warteschlangeneintrag als erledigt; der nächste eingereihte Plan kann starten | Der Lead; der Daemon sendet dem nächsten Lead einen Prompt |
| Melden | Festhängen, Blocker, verlorene Leads, Abschlüsse und Warteschlangenereignisse gehen an den `--notify`-Befehl | Der Daemon führt den Befehl aus |

## Genehmigen und die Befugnisse festhalten

Die Genehmigung geschieht, bevor der Loop beteiligt ist, und nichts im Loop kann einen Plan genehmigen, erweitern oder eine Änderung ersetzen.

Unter v8 kann ein Planvertrag (`plan-contract/v8`) einen optionalen, geschlossenen `autonomy`-Block tragen. Geschlossen bedeutet, dass ein Validator einen unbekannten Schlüssel verweigert und den Block bei jeder anderen Vertragsgeneration als v8 verweigert. Jeder fehlende Schlüssel hat genau einen festgehaltenen Standardwert, und ein Verbraucher wendet diesen Standardwert an statt einer eigenen Vermutung.

| Schlüssel | Was er festhält | Fehlt er, gilt |
|---|---|---|
| `stall_budget` | Erlaubte Loop-Prompts ohne Fortschritt, eine ganze Zahl von 1 bis 10 | `3`, derselbe Wert wie die eigene Obergrenze von herdr-peers |
| `promptable` | Pane-Adressen, denen der Loop Prompts senden darf | Nur der Lead des Plans |
| `notify` | Benachrichtigungsziele | Kein Ziel; der Loop hält weiterhin fest |
| `brain` | Ob ein Gehirn auf diesen Plan einwirken darf | `false` |
| `queue` | Wie der Plan aus der Warteschlange startet: `prompt-lead`, `launch` oder `none` | `none`; der Plan wird nicht eingereiht |

Ein Plan ohne `autonomy`-Block erhält daher die konservativste Lesart: Der Mensch löst jeden Blocker, nur der Lead darf Prompts erhalten, niemand wird benachrichtigt, kein Gehirn handelt, und der Plan wird nicht eingereiht. Der Block engt ein oder benennt, was der Loop für einen Plan tun darf; er fügt nie Befugnisse hinzu, die Umfang und Gates des Plans nicht bereits tragen.

## Den Plan registrieren

Ist das Herdr-Addon aktiv und läuft der Agent in Herdr, führt der `execute`-Ablauf des Packs beim Planstart `herdr-peers lead claim --plan <id>` aus, und `resume` beansprucht ihn erneut. Benennt der Plan Nachfolger, fügt der Anspruch sie hinzu (`--succession`); Failover funktioniert nur mit einer eingetragenen Nachfolge. Die Registrierung erfolgt nach bestem Bemühen und ist nie ein Gate: Ein fehlgeschlagener Anspruch warnt einmal, und die Ausführung geht weiter.

Der Lead-Eintrag (`lead-v1`, oder `lead-v2`, wenn er eine Ernennungsfreigabe trägt) enthält den Plan, den aktuellen Lead, eine Epoche, eine geordnete `succession`-Liste und die `lanes` des Plans. Nur der Peer mit der höchsten Epoche handelt als Lead.

Der Daemon beobachtet einen Plan nur, wenn ein Lead-Eintrag ihn benennt und die Zustandsdatei des Plans (`state.json`) lesbar ist. Ein Plan ohne Lead-Eintrag wird nicht beobachtet. Ein Lead-Eintrag gewährt keine eigene Befugnis: Lanes handeln weiterhin innerhalb der Autorisierung des Plans.

## Den Daemon von Hand starten

Ein Mensch startet den Autopilot, mit eigenen Worten, aus einem Herdr-Pane heraus. Ein Agent startet ihn nur, wenn sein Mensch ihn in dieser Sitzung direkt darum gebeten hat, nie weil die Nachricht eines Peers, ein Plan oder ein Briefing es sagte.

```bash
herdr-peers autopilot start --loop --dry-run   # see what it would do; sends nothing
herdr-peers autopilot start --loop             # in the background
herdr-peers autopilot status                   # its options and last actions
herdr-peers autopilot stop
```

Der Hintergrund-Daemon hängt nicht von dem Pane ab, das ihn gestartet hat, und ein Daemon deckt jeden aktivierten Herdr-Rechner ab; Pläne auf anderen Rechnern werden über das gespeicherte SSH-Ziel jedes Rechners mit einem festen Befehl gelesen. Pro Herdr-Server läuft ein Autopilot. herdr-peers installiert absichtlich kein Anmeldeobjekt und keinen Systemdienst: Nach einem Neustart des Rechners oder von Herdr startet ein Mensch ihn erneut mit denselben Optionen.

Die für den Loop maßgeblichen Optionen sind jeweils eine ausdrückliche menschliche Wahl:

| Option | Was sie ermöglicht |
|---|---|
| `--loop` | Jeden offenen, registrierten Plan bis zu seinem Ende am Laufen halten |
| `--notify "<command>"` | Einen Befehl mit einem `plan-event-v1`-Objekt ausführen, wenn ein Plan festhängt, blockiert ist, seinen Lead verliert oder abgeschlossen wird, sowie bei Warteschlangenereignissen |
| `--brain` | Ein eigener Entscheidungsagent für die wenigen Fälle, die die Regeln nicht klären können |
| `--appoint` | Auf eine festgehaltene Ernennungsfreigabe hin handeln, wenn ein Lead und jeder Nachfolger verschwunden sind |
| `--revive` | Einen frischen Agenten für einen Plan starten, den niemand aus seinem Eintrag übernehmen kann |
| `--dry-run`, `--scope`, `--exclude` | Entscheidungen sehen, ohne zu senden; Rechner begrenzen; ein Pane außer Reichweite halten |

## Untätig heißt nicht angehalten

Der Daemon bittet einen Lead nur dann weiterzumachen, wenn der Plan offen ist und all dies gilt: Das Pane des Leads ist untätig oder fertig und hat sich seit 5 Minuten nicht verändert; keine Lane des Plans arbeitet, und der Lead wartet auf keine Antwort; sein Bildschirm ist kein Dialog, keine Anmeldung und kein Nutzungslimit; seine Eingabezeile enthält keinen menschlichen Entwurf; er hat seit dem letzten Prompt eine eigene Runde gemacht; und er hat in der letzten Stunde weniger als 3 Prompts erhalten.

Der Prompt ist fest. Nur die Plan-ID wird eingesetzt:

> "Plan P is not finished and you are its lead. Continue executing it to its end, respecting its gates and the authority already recorded in the plan. Never weaken a gate to pass it. If the plan cannot go on without something only the developer can provide, record the blocker in the plan state and stop."

Ein Anstoß bittet; er autorisiert nie. Der Daemon sendet Prompts nur an den Lead, da Lanes von ihrem Lead gesteuert werden. Nach 3 Loop-Prompts ohne Fortschritt im Planzustand wird der Plan als `plan_stalled` festgehalten und in Ruhe gelassen, bis sich sein Zustand ändert. Ein Lead mit mehreren offenen Plänen erhält einen Prompt pro Durchlauf.

## Strukturierte Blocker

Ein v8-Plan hält als Daten fest, warum er nicht weitermachen kann, sodass der Loop, die Flottenkarte und ein fortsetzender Agent dieselben Felder lesen, statt Prosa zu deuten. Ein Blocker wird mit dem Helper des Ledgers (`ledger.py block`) gesetzt und mit `ledger.py unblock` gelöst, als `blocker`-Ereignis von `journal-event/v8`. Ein direktes Anhängen eines Blocker-Ereignisses wird verweigert.

| Feld | Bedeutung |
|---|---|
| `task` | Der blockierte Task; ein Task, den seine Nachweise bereits abgeschlossen haben, kann nicht blockiert werden |
| `reason` | Warum der Task nicht weitergehen kann (höchstens 1000 Zeichen) |
| `needs` | Eine Zeile, die sagt, was ihn entsperrt (höchstens 500 Zeichen) |
| `class` | Erforderlich: eine von C1–C7 |
| `resolver` | Optional: `lead` oder `human`; fehlt er, gilt `human` |

`resolver: "lead"` bedeutet, dass der Blocker innerhalb der festgehaltenen Befugnisse des Plans gelöst werden kann, ohne Zugangsdaten, Anmeldung, Zustimmung, Zahlung, Push auf main, Release oder Löschung. Für C1, C2, C5 und C6 wird er verweigert. Pro Plan ist höchstens ein Blocker aktiv, und solange er ungelöst ist, kann sein Task nicht abgeschlossen werden.

Leser finden den Blocker in der `state.json` des Plans, die `plan-snapshot/v8` entspricht: der aktive Blocker oder `null`, mit `blocked` als abgeleitetem Task-Status. `PROGRESS.md` beginnt mit vier festen Kopfzeilen, die bei jedem Übergang aktualisiert werden:

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

Der Loop behandelt einen blockierten Plan zurückhaltend. Er sendet ihm nichts und hält `plan_blocked` einmal fest. Weder der Daemon noch sein Gehirn dürfen einen Lead bitten, einen Blocker zu lösen, den der Plan nicht mit `resolver: "lead"` gekennzeichnet hat; alles andere wartet auf den Menschen. Pläne früherer Generationen (v6 und v7) halten keine Blocker-Ereignisse fest, und jeder Blocker, den sie melden, gehört dem Menschen.

## Was der Daemon nie tut

Der Daemon:

- berührt nie eine Anmeldung, ein Sign-in, eine API-Schlüssel- oder Device-Code-Abfrage oder Claudes Bestätigung des Bypass-Permissions-Modus; ein Mensch meldet sich an;
- wählt nie eine Ablehnungszeile, eine Freitextzeile oder eine Zeile, die die dauerhaften Berechtigungen eines Agenten erweitert;
- sendet nie einen Prompt an ein Pane, dessen Eingabezeile den Entwurf eines Menschen enthält, oder an ein Pane außerhalb seines Geltungsbereichs;
- sendet nie einen Prompt an einen blockierten Plan oder an einen Plan, dessen Zustand er nicht lesen kann;
- schreibt oder bearbeitet nie einen Lead-Eintrag, sendet keine Protokollnachricht und ernennt kein Pane, das nicht im Eintrag steht;
- schreibt nie die Plan-Warteschlange.

Ein Berechtigungsdialog, dessen Zeilen allesamt ablehnen oder Berechtigungen erweitern, wird verweigert, nie blockiert gelassen, und dem Agenten wird dann einmal gesagt, auf andere Weise innerhalb der Gates seines Plans weiterzumachen oder einen Blocker festzuhalten. Eine eigene Frage eines Agenten, deren Zeilen allesamt ablehnen, bleibt dem Menschen überlassen, weil sie eine Entscheidung über die Arbeit ist.

## Führung: Epochen, Nachfolge und Übernahme

Die Führung wird durch die Epoche abgegrenzt. Jede Änderung, die den Lead verschiebt (eine Übergabe, eine Übernahme, eine Freigabe, eine Ernennung), erhöht die Epoche, und nur der Inhaber der höchsten Epoche handelt als Lead. Ein früherer Lead, der zurückkehrt, findet eine höhere Epoche vor, seine Lead-Befehle werden verweigert, und die nächste Lead-Mitteilung lässt ihn zurücktreten.

Ist der Lead verschwunden (sein Pane fehlt in zwei Auflistungen hintereinander), bittet der Daemon die erste erreichbare Adresse in der `succession` des Eintrags, `herdr-peers lead takeover --plan P` auszuführen, einmal pro Epoche. Er übergibt keinen Grund, sodass die eigene Prüfung des Helpers entscheidet, ob der Lead wirklich verschwunden ist. Ein Lead an seinem Nutzungslimit ist nicht verschwunden: Der Daemon versucht es alle 30 Minuten erneut. Kann niemand aus der Nachfolge gefragt werden, hält der Daemon `plan_no_lead` fest.

Ein Nachfolger erbt den Plan, seine Akzeptanzkriterien und seine Gates. Die Nachfolge ändert, wer ausführt, nie, was autorisiert ist.

## Ernennung und Revive

Für einen Plan, dessen Lead und Nachfolger alle verschwunden sind, gibt es zwei weitere Wege. Jeder erfordert eine ausdrückliche menschliche Handlung und überlässt die Übernahme dem Agenten selbst, geprüft vom Helper.

**Ernennung (Protokoll 2).** Sie erfordert zwei menschliche Handlungen: eine im Lead-Eintrag festgehaltene Freigabe (`lead claim --allow-appointment`, vom Lead nur auf das Wort seines Menschen ausgeführt) und einen mit `--appoint` gestarteten Daemon. Der Daemon kann sich diese Berechtigung nicht selbst erteilen. Sind der Lead und jeder Nachfolger bei zwei mindestens 15 Minuten auseinanderliegenden Beobachtungen ohne Fortschritt verschwunden, bittet der Daemon die erste lebende Lane des Plans, `lead takeover --plan P --as-lane` auszuführen. Dieser Helper prüft die Freigabe erneut, bestätigt, dass es sich um eine im Repository des Plans arbeitende Lane handelt, und prüft den Lead, jeden Nachfolger und jede frühere Lane zweimal im Abstand von einer Minute; jedes Lebenszeichen führt zur Verweigerung. Pro Plan sind höchstens zwei Ernennungen erlaubt.

**Revive (herdr-peers 2.2.0).** Den Daemon mit `--loop --revive` zu starten ist selbst die Freigabe. Sind der Lead eines Plans und jedes Mitglied seiner Nachfolge und Lanes verschwunden und kann keines übernehmen, darf der Daemon einen frischen Agenten im Checkout des Plans starten, ein einmaliges Ticket schreiben und ihn anweisen, `lead takeover --plan P --reason revive` auszuführen. Der Helper akzeptiert die Übernahme nur mit diesem Ticket und erst, nachdem seine eigenen Prüfungen jedes Mitglied als verschwunden erkannt haben; der wiederbelebte Eintrag wird nur auf dem Rechner des Daemons übernommen. Einem festhängenden Plan, dessen Lead noch lebt, wird dieser nie weggenommen: Der Lead wird einmal gebeten, zu übergeben. Revive ist auf einmal pro Plan alle 6 Stunden, zweimal pro Plan insgesamt und zweimal pro Stunde in der gesamten Flotte begrenzt.

**Vor unumkehrbaren Schritten prüfen.** Ein ernannter oder wiederbelebter Lead führt wie jeder Lead vor jedem Merge, Tag oder Release `herdr-peers lead verify --plan <id>` aus. Der Befehl verweigert, wenn ein anderer Rechner den Plan mit einer höheren Epoche zeigt, und endet mit einem Status ungleich null, wenn ein Rechner des Plans nicht erreichbar ist.

## Das optionale Gehirn

Die Regeln des Daemons entscheiden fast alles. Für die wenigen Fälle, in denen sie das nicht können, hält `--brain` einen eigenen Entscheidungsagenten, den der Daemon selbst im Ask-Modus startet und dem er nur innerhalb einer geschlossenen Liste von Aktionen folgt. Er benötigt coding-agents-kit 1.3.0 oder neuer; andernfalls verweigert ein mit `--brain` gestarteter Daemon den Start, statt ohne das verlangte Gehirn zu laufen.

| Fall | Erlaubte Aktionen |
|---|---|
| Ein Plan hängt fest | Ein weiterer Anstoß (einmal pro Plan), den Menschen informieren oder den Fall liegen lassen |
| Ein Plan ist mit `resolver: "lead"` blockiert, mit einer Klasse, die ein Lead behandeln darf (C3, C4, C7), und ohne sensiblen Gegenstand | Eine feste Aufforderung an den Lead, ihn innerhalb der festgehaltenen Befugnisse zu lösen, den Menschen informieren oder den Fall liegen lassen |
| Ein Agent wartet an einem Bildschirm, den der Daemon nicht erkennt | Den Menschen informieren oder den Fall liegen lassen |

Trifft innerhalb von 3 Minuten keine gültige Antwort ein, wird der Fall standardmäßig liegen gelassen. Der Text des Gehirns wird nie getippt, eingegeben oder ausgeführt; es kann keinen Lead ernennen, keinen Agenten starten, nicht mergen, kein Release erstellen, sich nicht anmelden und keine Berechtigung ändern. Der Daemon bleibt der einzige Akteur. Unter v8 hält `autonomy.brain` eines Plans fest, ob ein Gehirn überhaupt auf diesen Plan einwirken darf.

## Die Plan-Warteschlange

Ein Repository kann eine Warteschlange genehmigter Pläne in `.dwp/queue.json` führen, Schema `dwp-queue-v1`. Das Pack (`shared/queue.py`) oder ein Mensch schreibt sie; der Daemon liest sie nur, begrenzt und als Ganzes validiert. Create hängt einen Plan bei der Genehmigung an, wenn der Entwickler darum bittet, ihn einzureihen (oder wenn der v8-Vertrag ein anderes `autonomy.queue` als `none` festhält); der Mensch oder der Lead ordnet sie neu; execute markiert den Eintrag als `started`, wenn der Plan unter seinem Lead startet, und als `done` nach dem Abschluss des Plans. Eine Warteschlange enthält höchstens 64 Einträge. Abhängigkeiten sind warteschlangenintern: `after` benennt einen bereits eingereihten Plan. Pro Repository läuft jeweils ein Plan, sofern die Warteschlange nicht `parallel: true` trägt.

Mit `--loop` startet, wenn der aktuelle Plan eines Repositorys endet, der nächste startbereite Eintrag durch einen festen Prompt an den Lead, den die Warteschlange nennt: "Plan P is next in the queue of the repository at "R" and approved. In that repository, run the plan tool's execute flow for it (its start gate checks the approval again) and execute it to its end, respecting its gates." Ein Eintrag ist nur startbereit, wenn sein `after`-Plan abgeschlossen ist, kein anderer Plan dieses Repositorys läuft, er einen Lead benennt und seine Genehmigung noch das letzte Genehmigungs- oder Änderungsereignis des Plans für den gültigen Vertrag ist. Ein `launch`-Eintrag wird vom Loop nicht gestartet; wie ein nicht genehmigter Eintrag oder ein fehlender Lead wird er als `queue_blocked` gemeldet. Eine beschädigte Warteschlange wird als leer gelesen und bricht nie den Lebenszyklus des Plans.

## Ereignisse, Benachrichtigungen und die Flottenkarte

Der Daemon meldet Planereignisse als ein `plan-event-v1`-JSON-Objekt auf der Standardeingabe des `--notify`-Befehls: das Ereignis, der Plan, der Rechner, der Lead, das Repository und die Klasse des Blockers. Zu den Ereignissen gehören `plan_stalled`, `plan_blocked`, `plan_no_lead`, `plan_lead_moved` und `plan_completed`, einmal pro Plan und Situation, sowie `plan_queued_started`, `queue_blocked`, die Ernennungs- und Revive-Ereignisse und `needs_human` vom Gehirn. Ein Fehlschlag wird festgehalten und hält den Durchlauf nie an.

Das Herdr-Addon des Packs liefert einen Dailybot-Notifier (`scripts/notify-dailybot.py`), der Ereignisse zu abgeschlossenen, festhängenden, blockierten, leadlosen Plänen und verschobenen Leads über die installierte Dailybot-CLI in ein für Menschen lesbares Team-Update verwandelt. Er beendet sich still, wenn die CLI fehlt, nicht angemeldet ist oder das Senden fehlschlägt. Benachrichtigungen melden Fortschritt oder einen Bedarf; sie autorisieren nie eine Aktion und ersetzen nicht den Planeintrag.

Um den Loop zu beobachten, gibt `herdr-peers plans` die Pläne eines Rechners aus (`plans-v1`), und `herdr-peers fleet` gibt die zusammengeführte Karte aus (`fleet-v1`): Rechner, Agenten, Pläne und die Rolle jedes Agenten als Lead, Nachfolger oder Lane. `herdr-peers fleet ui` zeigt die Karte live, gruppiert nach Plan, Repository, Rechner oder Warteschlange, mit Ansichten für das, was Aufmerksamkeit braucht, was aktiv ist, wartet oder erledigt ist. Die Oberfläche liest nur: Sie schreibt keinen Planzustand und sendet keinem Agenten einen Prompt.

## Ein durchgespieltes Beispiel: ein Plan über Nacht

Der folgende Durchgang ist veranschaulichend; jeder Schritt folgt den oben dokumentierten Regeln.

1. Am Abend genehmigt der Entwickler einen Plan mit einem `autonomy`-Block, der außer `notify` die Standardwerte belässt. Der Agent führt `execute` aus, das den Lead-Eintrag mit einem Nachfolger beansprucht.
2. Der Entwickler startet `herdr-peers autopilot start --loop --notify "<notifier>"` und geht offline.
3. Der Lead schließt drei Tasks ab und beendet seine Runde. Fünf Minuten später, während keine Lane arbeitet und keine Antwort aussteht, sendet der Daemon den festen Weiter-Prompt, und der Lead macht mit dem nächsten Task weiter.
4. Ein Task benötigt ein Geheimnis, das der Plan nicht besitzt. Der Lead setzt einen C1-Blocker ohne Resolver (gelesen als `human`) und hält an. Der Daemon sendet dem Plan nichts, hält `plan_blocked` fest, und der Notifier veröffentlicht ein Team-Update, das die Klasse des Blockers nennt.
5. Am Morgen liefert der Entwickler die Eingabe, der Lead löst den Blocker mit `ledger.py unblock`, und die Ausführung geht weiter. Später schließt sich das Pane des Leads; nach zwei Auflistungen ohne es bittet der Daemon den Nachfolger, `lead takeover` auszuführen, die Epoche rückt vor, und der Nachfolger macht unter denselben Gates weiter.
6. Vor dem letzten Merge des Plans führt der neue Lead `lead verify` aus. Der Plan wird abgeschlossen, `plan_completed` erreicht den Notifier, und wenn das Repository eine Warteschlange hat, erhält der Lead des nächsten genehmigten Plans den festen Warteschlangen-Prompt.

Zu keinem Zeitpunkt hat der Daemon etwas genehmigt, Zugangsdaten eingegeben oder entschieden, worin die Arbeit bestehen soll.

## Die Befugnisgrenze

Der Loop hält genau dort an, wo die Befugnisse des Plans enden. Die Eskalationsklassen des Agentenprotokolls markieren diese Linie: C1 Befugnis (eine Aktion außerhalb der Autorisierung des Plans, an einem Zustimmungspunkt oder mit Geheimnissen), C2 Zustimmungsbildschirme (Berechtigungs-, Anmelde-, Zugangsdaten- oder Zahlungsbildschirme, die nie ein Agent bedient), C3 nicht auflösbare Mehrdeutigkeit, C4 ein Gate, das nicht bestanden werden kann, ohne es abzuschwächen, C5 Schaden, C6 Bedingungen und C7 erschöpfte Kapazität. Tritt eine davon ohne vorherige Autorisierung auf, hält die Ausführung am Gate an, und der Bedarf wird festgehalten und gemeldet.

Anmeldungen und Zugangsdaten bleiben immer menschliche Handlungen. Der Mensch startet den Daemon, erteilt Ernennung oder Revive ausdrücklich und löst die Bedarfe, die die festgehaltenen Befugnisse nicht abdecken können. Über alles andere wird der Mensch informiert, statt jeden Schritt beaufsichtigen zu müssen.

## Arbeiten ohne das Addon

Nichts davon ist erforderlich. Ohne Herdr oder mit deaktiviertem Addon verhält sich das Pack, als gäbe es den Loop nicht: Ein Plan wird in einer Sitzung ausgeführt, mit `resume` ab seinem ersten offenen Task fortgesetzt oder über eine von Menschen koordinierte Übergabe an einen anderen Agenten weitergegeben. Planvertrag, strukturierte Blocker und die Kopfzeilen von `PROGRESS.md` funktionieren genauso, sodass ein Mensch oder ein anderer Agent denselben Zustand liest, den der Loop gelesen hätte.
