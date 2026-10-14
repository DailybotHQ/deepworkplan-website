---
title: Schwarmautonomie
description: "Wie ein Agentenschwarm das Limit eines Kontos oder den Verlust eines Agenten überdauert: Kapazitätsprüfungen, Übergabepakete, Lead-Nachfolge und Eskalation."
order: 7
lang: de
summary: Kapazitätsbewusste Lanes, proaktive Übergabe, Lead-Nachfolge mit Epochen und die Eskalationstaxonomie, die einen Schwarm am Laufen hält.
icon: shield
---

# Schwarmautonomie

[Viele Agenten betreiben](/de/methodology/06-orchestration) beschreibt einen Lead und seine Lanes. Dieses Kapitel behandelt, was diese Einrichtung am Laufen hält, wenn ein Konto sein Limit erreicht oder ein Agent verschwindet. Eine Lane prüft, wie viel Spielraum ihr Konto noch hat, und gibt ihre Arbeit weiter, bevor es erschöpft ist. Ein Lead gibt die Leitung weiter oder wird ersetzt, wenn er verschwindet. Der Schwarm fragt den Entwickler nur, was wirklich kritisch ist.

Der Ausfall, auf den es antwortet, ist konkret: Ein Lead, dem mitten in einem Plan das Kontingent ausgeht, lässt jede Lane im Stich, und nichts bewegt sich, bis ein Mensch eine neue Sitzung öffnet. Mit den folgenden Regeln bewegt sich der Plan weiter, innerhalb der Autorisierung, die der Entwickler bereits erteilt hat.

Sechs Regeln prägen alles hier:

1. **Eine Aufgabe pro Produkt.** [coding-agents-kit](/de/kit/agentkit) (`ak`) kennt Konten und Kapazität, [herdr-peers](/de/kit/herdr) kennt Nachrichten, Panes und wer leitet, und das Deep-Work-Plan-Paket kennt die Methode: wann zu übergeben ist, was ein Nachfolger braucht, was zu eskalieren ist. Jedes bleibt optional. Ohne sie gelten dieselben Regeln, und der Entwickler leitet Nachrichten weiter und startet Agenten neu.
2. **Der Plan ist die Einheit der Kontinuität, nicht der Agent.** Jede Übergabe und jede Nachfolge ist eine gewöhnliche Wiederaufnahme plus ein kleines Paket mit dem, was das Journal nicht enthält: die Absicht, die gerade in Arbeit war.
3. **Proaktiv schlägt reaktiv.** Ein Agent prüft seinen Spielraum an Aufgabengrenzen und übergibt, solange er noch ein gutes Paket schreiben kann. Die Reaktion nach Erreichen eines Limits bleibt das Sicherheitsnetz.
4. **Autonomie erweitert nie die Autorität.** Übergaben, Nachfolge, Starts und Scheduling laufen innerhalb der Autorisierung des Plans. Kein Agent beantwortet einen Berechtigungs-, Bypass-, Anmelde-, Zustimmungs- oder Zahlungsbildschirm, und Arbeit bewegt sich nur zwischen Konten, die der Entwickler deklariert hat.
5. **Kontinuität senkt nie die Latte.** Ein Nachfolger erbt dieselben Gates. Ein Paket schließt kein Kriterium, lockert kein Gate und überspringt kein Review.
6. **Günstig durch Konstruktion.** Die Kapazität wird an Aufgabengrenzen aus einem Cache gelesen, nie in einer Schleife oder per Timer. Einweg-Notices ersetzen Fragen, die keine Antwort brauchen, und Pakete sind klein.

## Rollen

| Rolle | Ist | Besitzt | Tut nie |
| --- | --- | --- | --- |
| Lead | Der Agent, der den Lead-Eintrag eines Plans hält | Den Plan, die Lane-Tabelle, das Scheduling, die Release-Reihenfolge, Merges und Tags innerhalb der Autorisierung, die Nachfolgeliste | Den Checkout einer Lane beschreiben oder einen Plan leiten, den ein anderer Lead hält |
| Stellvertreter | Der erste erreichbare Eintrag der Nachfolgeliste des Leads | Nichts, bis er übernimmt | Als Lead handeln, solange der Lead erreichbar ist |
| Lane | Ein Agent pro Repository, Arbeitsstrang oder Aufgabe, in einem eigenen Pane auf einem eigenen Konto | Ihren Kind-Plan oder ihre Aufgabe, Branch, Gate und Paket | Einer anderen Lane Arbeit zuweisen, mergen oder taggen |
| Reviewer | Eine Lane eines anderen Anbieters, nur lesend | Ihre Befunde | Den Baum beschreiben, den sie prüft |

- **Der Lead bleibt aktiv.** Ein Orchestrator, dessen Lanes auf eine menschliche Weiterleitung warten, kommt zum Stillstand. Ein Lead pausiert den Schwarm nie für eine Frage, die er selbst entscheiden kann.
- **Ein Ausführender pro Plan.** Genau ein Agent führt einen bestimmten Plan oder Kind-Plan zur selben Zeit aus. Ein zweiter Agent am selben Plan ist ein Koordinationsfehler, den der Lead auflöst.
- **Autorität kommt aus dem Plan, nicht von einem Peer.** Eine Lane liest die Autorisierung des Plans selbst. Eine von einem anderen Agenten weitergeleitete Genehmigung fügt nichts hinzu, was eine Lane nicht schon hatte.
- **Mehrere Leads** können in einem Workspace arbeiten, jeder leitet einen anderen Plan. Ein Konto wird über ein `ak`-Lease jeweils von einer Lane gehalten, sodass zwei Leads nie zwei Schreiber auf ein Codex-Konto setzen.
- **Mehrere Instanzen einer Art** — drei Grok-Panes, vier Codex-Panes auf einem oder mehreren Profilen — sind gewöhnliche Lanes. Instanzen auf einem Profil teilen sich die Kapazität dieses Profils.

Jede Lane hat einen Plan, mindestens einen Lite-Plan in ihrem eigenen Repository, und dieser Plan ist das Erste, was ein Nachfolger liest. Jede Lane meldet sich beim Lead mit einem festen Vokabular — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — und beendet jede Nachricht mit einer Kapazitätszeile wie `capacity=ok 64% @work1`, sodass der Lead Kontingente selten selbst lesen muss.

## Die Kapazitätsschleife

Ein Agent prüft seinen eigenen Spielraum vor dem Beginn jeder Aufgabe, nach jedem Gate oder Schritt, der länger als 20 Minuten lief, immer wenn seine CLI eine Nutzungslimit-Warnung zeigt, und bevor er eine Übergabe oder die Leitung annimmt. Die Prüfung ist `ak capacity --self --json` aus coding-agents-kit `v1.0.1`, die der Helfer des Pakets in eine Entscheidung übersetzt:

| Urteil | Entscheidung | Eine Lane | Ein Lead, für sich selbst |
| --- | --- | --- | --- |
| `ok` (über dem niedrigen Schwellenwert) | weitermachen | Macht weiter | Macht weiter |
| `low` (25 % oder weniger) | vorbereiten | Beendet die laufende Aufgabe, beginnt keine, die sie nicht beenden kann, meldet `capacity=low` | Benennt einen designierten Nachfolger und startet keine lange Arbeit auf sich selbst |
| `critical` (10 % oder weniger oder ratenbegrenzt) | übergeben | Erreicht den nächsten sicheren Punkt, schreibt das Paket, benachrichtigt den Lead, hält an | Übergibt die Leitung sofort |
| `unknown` (keine Kontingentquelle) | weitermachen | Meldet `capacity=unknown`, übergibt bei einer Limit-Warnung der CLI oder einem `usage_limit`-Bildschirm | Bevorzugt Lanes mit bekannter Kapazität für lange Aufgaben |

- **Schwellenwerte** sind die des Kits: standardmäßig niedrig bei 25 % und kritisch bei 10 % des freien Anteils des maßgeblichen Fensters, anpassbar mit `AGENTKIT_CAPACITY_LOW` und `AGENTKIT_CAPACITY_CRITICAL`. Die Messwerte stammen aus einem Cache, der 300 Sekunden gehalten wird, sodass die Prüfung an jeder Aufgabengrenze einige Anbieteraufrufe pro Stunde kostet.
- **Hysterese.** Sobald ein Paket geschrieben ist, wird die Übergabe abgeschlossen. Der Agent nimmt diese Aufgabe nie wieder auf, nachdem sich sein Konto erholt hat; der Nachfolger besitzt sie, und das erholte Konto kehrt einfach in den Pool zurück.
- **Kontextdruck zählt ebenfalls.** Erreicht der Kontext des Agenten die Frischkontext-Schwelle des Vertrags (standardmäßig 60 %), folgen dasselbe Paket und dieselbe Übergabe.
- **Ehrliche Degradation.** Ohne das Kit, mit einem älteren Kit oder außerhalb eines `ak`-Starts wird die Kapazität als unbekannt gemeldet, nie als ok.

**Der Pool gehört dem Entwickler.** Der Plan hält die Konten fest, die der Entwickler für die Arbeit deklariert hat. Ein Agent legt nie Konten an, erneuert nie Anmeldungen, verbraucht nie einen Codex-Reset und nutzt nie ein Konto außerhalb des Pools, und er arbeitet im Rahmen der Bedingungen jedes Anbieters. Arbeit vor einem Limit innerhalb des Pools zu verschieben ist Scheduling; Konten zu rotieren, um ein Limit zu überschreiten, ist nie erlaubt. Für jede bereite Aufgabe nimmt der Lead das bestplatzierte Konto aus `ak pick --owner <lead>`, belegt es mit `ak lease` für die eigene Adresse der Lane, gibt einer Lane nie das eigene Konto des Leads (beide würden gemeinsam `critical` erreichen), bevorzugt Konten mit bekannter Kapazität für lange Aufgaben und einen anderen Anbieter für Reviewer und hält einen Stellvertreter bereit. Hat kein Konto im Pool Spielraum und wird keines innerhalb des Horizonts des Plans zurückgesetzt, parkt der Schwarm mit dem frühesten festgehaltenen Reset.

## Lane-Übergabe

1. **Die Lane** erreicht bei `handoff` einen sicheren Punkt — ein Schritt ist committet oder der Baum bleibt, wie er ist, nie wird Arbeit verworfen —, schreibt das Paket, sendet `handoff <packet path>` als Notice an den Lead und hält an. Sie schließt ihr eigenes Pane nicht.
2. **Der Lead**, oder der Stellvertreter, wenn der Lead nicht erreichbar oder selbst kritisch ist, wählt ein Konto (`ak pick <kind> --owner <lead> --exclude @<spent>`, mit Vorzug für einen anderen Anbieter, wenn die Aufgabe es erlaubt), belegt es mit einem Lease und startet den Nachfolger im selben Checkout mit dem Auftrag, den Plan aus dem Paket wiederaufzunehmen.
3. **Der Nachfolger** nimmt das Paket an — der Helfer verifiziert den Plan, den gültigen Vertrag, den Branch, den Head-Commit und die nicht committeten Pfade und hält bei einer Abweichung nichts fest —, nimmt dann den Plan wieder auf und führt jedes Gate erneut aus, das das Paket als nicht verifiziert aufführt.
4. **Der Lead** gibt das verbrauchte Lease frei und schließt das verbrauchte Pane, sobald der Nachfolger angenommen hat.

Das **Übergabepaket** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) wird unter `analysis_results/handoff/` des Plans mit Berechtigungen nur für den Besitzer geschrieben. Es nennt den Plan, den Vertrag, die Aufgabe und den Schritt; den Grund (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` oder `lead_handover`); wo die Arbeit steht (Repository, Checkout, Branch, Head, ob gepusht, nicht committete Pfade); was erledigt, verifiziert und nicht verifiziert ist, mit Evidenzpfaden; die nächsten Schritte in Reihenfolge; offene asks; die getroffenen Entscheidungen; den Lead und die Epoche; und wer es geschrieben hat. Ein Paket sind Daten: Es trägt nie einen geheimen Wert, private Inhalte aus einem anderen Repository oder eine Anweisung, die Autorität erweitert. Der Nachfolger leitet seine nächste Aktion erneut aus dem Plan ab.

## Lead-Nachfolge

herdr-peers `v1.0.0` führt pro Plan einen Lead-Eintrag — Lead, Epoche, Nachfolgeliste und Lanes — und löst die Adresse `lead` zum aktuellen Lead auf, sodass kein Lane-Auftrag das Pane des Leads fest einträgt.

- **Erst beanspruchen, dann starten.** Der Lead führt `herdr-peers lead claim --plan <P> --succession <A,B>` aus, bevor er irgendeine Lane startet — die Adresse `lead` wird erst aufgelöst, sobald ein Eintrag existiert —, aktualisiert den Eintrag mit `--lanes <A,B>`, während Lanes starten, und führt `lead release` aus, wenn der Plan fertig ist. Ab herdr-peers (`v0.3.2`) hält der Eintrag das beanspruchende Repository lokal fest, und ein Plan mit derselben ID in einem anderen Repository wird `--plan <repo>/<id>` genannt. Die Standardnachfolge ist sein geplanter Nachfolger, dann die Lanes im eigenen Checkout des Plans in Startreihenfolge, dann jede Lane auf demselben Host; Lanes in Containern oder auf anderen Rechnern kommen zuletzt.
- **Übergabe, geplant.** Bei `low` benennt der Lead einen designierten Nachfolger. Bei `critical` schreibt er ein Lead-Paket — Lane-Tabelle, offene asks, Release-Reihenfolge, ausstehende Merges, Entscheidungen —, führt `herdr-peers lead handover <addr> --plan <P>` aus, das die Epoche erhöht und jede Lane benachrichtigt, und hält an. Der Nachfolger nimmt das Paket an, nimmt den Orchestrator-Plan wieder auf und prüft jede Lane erneut.
- **Übernahme im Ausfall, ungeplant.** Ist der Lead nicht erreichbar, hat er keinen Agenten, zeigt er einen `usage_limit`-Bildschirm oder läuft ein ask an ihn zweimal in ein Timeout, führt der erste erreichbare Eintrag der Nachfolgeliste `herdr-peers lead takeover --plan <P>` aus — selbst oder indem er ein frisches Lead-Pane im Checkout des Plans startet. Der neue Lead baut den Zustand aus dem Plan wieder auf. Fehlende Absicht aus laufender Arbeit wird als fehlend festgehalten, nie erfunden.
- **Fencing.** Nur der Halter der höchsten Epoche handelt als Lead. Eine Lane akzeptiert eine Lead-Notice nur von dem Agenten, der ihr den Auftrag gab (erste Übernahme), vom aktuellen Lead in der nächsten Epoche (Übergabe) oder vom ersten erreichbaren Nachfolgeeintrag in der nächsten Epoche (Übernahme im Ausfall); bei Gleichstand gewinnt die frühere Nachfolgeposition, und ein zurückkehrender Lead, der eine höhere Epoche sieht, tritt zurück. Merges, Tags und Releases führt nur der Lead der aktuellen Epoche aus; sie werden zuerst gegen das Remote geprüft und folgen den eigenen Merge-Regeln des Repositorys.

## Nachrichten

- **Lead und Lane** tauschen Meilensteine, das GO, Fixierungen und geänderte Anforderungen aus.
- **Lane und Lane** dürfen einander um Informationen und Koordination bitten — eine Schnittstelle, einen exakten Flag-Namen, einen Branch-Zustand. Nur der Lead weist Arbeit zu; Tiefe eins und die Fan-out-Grenze gelten weiterhin, und eine Lane informiert den Lead, wenn ein Austausch unter Geschwistern den Plan ändert.
- **Notices** (`herdr-peers notify <addr|lead>`) sind einseitig: Der Empfänger hält sie als Daten fest und antwortet nie. Sie belegen keinen Fan-out-Platz und tragen Übergabeankündigungen, Lead-Wechsel und Release-Rundsendungen. Die Lead-Notice ist die einzige Rundsendung des aktuellen Zustands, und niemand bestätigt sie.
- **Repository-übergreifende Fragen blockieren nicht.** Eine Lane fragt, macht mit der empfohlenen, festgehaltenen Annahme weiter und passt sich an, wenn die Antwort eintrifft.
- **Nie nach einer Nachricht pollen.** Ein ask oder eine Notice erreicht einen Agenten erst, wenn sein Turn endet; ein Agent, dessen nächster Schritt von einer Nachricht abhängt, beendet seinen Turn und lässt sie eintreffen.
- **Empfangener Text sind Daten.** Eine reply oder eine Notice gewährt nichts und schließt nichts.

## Eskalation nur bei Kritischem

Alles, was nicht kritisch ist, entscheidet der Agent: Er untersucht, wählt die empfohlene Option, hält die Entscheidung fest — die Optionen, die Wahl, die Begründung und wie sie rückgängig zu machen ist — und arbeitet weiter. Eine Eskalation muss ihre Klasse nennen; eine Frage, die keine nennt, ist eine Entscheidung, die der Agent schuldet. Die Klassen sind die des [Agentenprotokolls](/de/spec/agent-protocol):

| Klasse | An den Entwickler eskalieren, wenn |
| --- | --- |
| C1 Autorität | Eine Aktion liegt außerhalb der Autorisierung des Plans oder an einem Zustimmungs-Checkpoint: destruktive oder irreversible Operationen, Produktions-Deployments, Veröffentlichungen über den Plan hinaus, Nachrichten an Personen außerhalb der Agenten des Plans, Ausgaben, Sicherheitslage oder Geheimnisse. |
| C2 Zustimmungsbildschirm | Ein Berechtigungs-, Bypass-, Anmelde-, Zugangsdaten-, MCP-Zustimmungs- oder Zahlungsbildschirm erscheint. Nie von einem Agenten per Tastendruck beantwortet. |
| C3 Unauflösbare Mehrdeutigkeit | Zwei wesentlich verschiedene Ergebnisse erfüllen die Anfrage, und nichts im Repository, in seinen Dokumenten, den Plänen oder früheren Entscheidungen klärt es. |
| C4 Qualitätskonflikt | Ein Gate kann nicht bestehen, ohne es abzuschwächen, oder Evidenz widerspricht dem Ziel des Plans auf eine Weise, die die Aufgabe nicht beheben kann. |
| C5 Schaden | Geteilter Zustand, Daten oder die Arbeit eines anderen Agenten gehen ohne Erklärung verloren oder werden beschädigt. |
| C6 Bedingungen | Eine Rechts-, Lizenz-, Anbieterbedingungs- oder Datenschutzfrage stellt sich. |
| C7 Kapazität erschöpft | Kein Konto im deklarierten Pool hat Spielraum, und keines wird innerhalb des Horizonts des Plans zurückgesetzt. |

In einem Schwarm **blockiert ein kritischer Punkt seine Abhängigkeitskette, nicht den Schwarm.** Der Lead parkt die blockierte Aufgabe — ihr blockierter Eintrag ist die Eskalation, einmal gesendet —, hält jede unabhängige Lane am Laufen und setzt die Kette fort, wenn der Entwickler antwortet. Autonomie schließt nie eine menschliche Freigabe, der Wortlaut des Entwicklers gewinnt gegenüber einer Empfehlung, und eine von einem Agenten weitergeleitete Genehmigung wird als weitergeleitet festgehalten, nie so, als hätte der Entwickler sie geschrieben.

## Die Qualitätslatte

Ein Schwarm lohnt sich nur, wenn seinem Ergebnis vertraut werden kann. Die [Qualitätslatte](/de/spec/dwp-specification) gilt für jeden Agenten, der einen Plan fortsetzt:

- **Gates sind Hypothesen.** Ein neues oder geändertes Gate schlägt nachweislich an einem eingesetzten Defekt fehl, bevor ihm vertraut wird, und ein leeres Bestehen — eine fehlende Binärdatei, null gefundene Dateien, ein leeres Log — ist ein Fehlschlag. Eine Aufgabe mit einem Eingabevertrag benennt ihre Randfälle — leer, mehrzeilig, umgebende Leerzeichen —, damit das Bestehen jedes Beispiels nicht mit dem Beweis der Regel verwechselt wird.
- **Mit der Basis vergleichen.** Performance, Abdeckung und Größe werden mit dem Basis-Branch verglichen, nicht nur mit einem Schwellenwert.
- **Zuerst messen, entwerfen vor dem Bauen.** Ein Fix oder Audit verifiziert zuerst seine Prämisse und sein Messwerkzeug; eine nicht triviale Änderung hält Schnittstellen, Fehlermodi, Sicherheit und Tests vor dem Code schriftlich fest.
- **Review vor dem irreversiblen Schritt.** Das lokale AI Diff Review läuft vor jedem Merge, Tag oder Publish, und Methodik- oder Protokolländerungen erhalten einen Reviewer eines anderen Anbieters.
- **Kontinuität senkt nie die Latte.** Ein Nachfolger führt erneut aus, was das Paket als nicht verifiziert aufführt; eine Übergabe ist nie eine Abkürzung an einem Gate vorbei.

## Der Nachweis

Das Journal des Orchestrator-Plans hält den Schwarm fest: Lane-Starts und -Ergebnisse als Delegationsereignisse; Kapazitätsurteile, Übergaben und Nachfolgen als Beobachtungen; Eskalationen und die Antworten des Entwicklers als Eingriffe. Pakete und ihre Annahmeeinträge bleiben in dem Plan, der die Arbeit ausgeführt hat, und der Abschlussbericht nennt jede Übergabe und Nachfolge mit ihrem Paket.

## Den Ablauf üben

Erproben Sie die Schleife, bevor Sie sich auf sie verlassen. Betreiben Sie auf einem Übungs-Repository mit einem kleinen Orchestrator-Plan einen Lead und mindestens drei Lanes auf verschiedenen Konten oder Anbietern. Begrenzen Sie die gemeldete Kapazität einer Lane — `AGENTKIT_CAPACITY_CAP=@<profile>=8` senkt den Messwert und kann ihn nie erhöhen — und beobachten Sie, wie sie ein Paket schreibt, der Lead einen Nachfolger startet, der es annimmt, und der Nachfolger das Gate besteht. Begrenzen Sie den Lead auf dieselbe Weise und beobachten Sie die Übergabe und wie der neue Lead den Plan abschließt. Halten Sie dann die Evidenz in `analysis_results/` des Plans fest: kein menschlicher Tastendruck, jedes Paket, jede Epoche, ein ask von Lane zu Lane und die Gates.
