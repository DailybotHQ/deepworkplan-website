---
title: Loop Engineering
description: "Normative Loop-Semantik in v8: aufgezeichnete Befugnisse, menschlich gestartete Fortsetzung, Nachfolge, Blocker, Warteschlange, Meldungen und Flottenübersicht."
order: 12
lang: de
section: Loop Engineering
---

# Loop Engineering

Diese Seite definiert den Planvertrag für Loop Engineering. Der **Plan** bleibt die Befugnisquelle; der Loop sorgt für Kontinuität und Sichtbarkeit. Addons können die Methode erweitern, aber nie die aufgezeichneten Befugnisse eines Plans.

## 1. Die v8-Regel

Ein genehmigter Plan läuft ohne menschliche Einzelaufsicht bis zum Ende. Autonomie gilt **innerhalb der im Plan aufgezeichneten Befugnisse**; der Mensch wird benachrichtigt und muss nicht auf normale Fortschritte warten. Logins und Zugangsdaten bleiben menschliche Aufgaben. Die C1–C7-Gates des Plans (etwa Veröffentlichung, Push oder externe Nachrichten) halten weiterhin an, sofern der Plan keine Vorabgenehmigung festhält. Die v7-Regel bleibt bestehen: Die Methode funktioniert allein; Addons verstärken sie nur.

### 1.1. Loop-Semantik

### Registrierung und Beobachtung
Ist das Herdr-Addon aktiv, beansprucht der `execute`-Ablauf des v8-Packs den Lead-Eintrag und verzeichnet die Nachfolge. Überwacht wird ein Plan nur mit Lead-Eintrag und lesbarem Status. Ein Mensch startet `herdr-peers autopilot --loop`; der Daemon ist weder Login-Element noch Systemdienst. Ein Daemon kann Pläne aller aktivierten Herdr-Maschinen beobachten. Pläne ohne Lead-Eintrag werden nicht überwacht.

### Fortsetzung, Stillstand und Failover

Bei offenen Plänen stößt der Daemon ausschließlich den Lead an, wenn die Ruhebedingungen erfüllt sind: fünf Minuten idle oder done, keine arbeitende Lane, keine erwartete Antwort, Pane im Geltungsbereich und nicht ausgeschlossen, kein Dialog, Login, Nutzungslimit oder menschlicher Entwurf in der Eingabezeile. Der feste Prompt fordert zur Fortsetzung bis zum Ende unter Einhaltung der Gates und aufgezeichneten Befugnisse auf. Ein Anstoß erteilt keine Befugnis. Nach drei Anstößen ohne Statusfortschritt zeichnet der Daemon `plan_stalled` auf und wartet auf eine Zustandsänderung. Blockierte Pläne werden gemeldet, nicht angestoßen.

Ist der Lead verschwunden, bittet der Daemon den ersten erreichbaren Nachfolger der Liste um `herdr-peers lead takeover --plan <id>`. Der Helper prüft die Nachfolge und erhöht die Epoche; der Daemon schreibt keinen Lead-Eintrag und wählt kein Pane außerhalb der Liste. Ein Nutzungslimit allein belegt keinen verschwundenen Lead. Protocol 2 erlaubt auch eine Ernennung aus den Plan-Lanes, aber nur mit ausdrücklich menschlich erteiltem `lead claim --allow-appointment` und einem Daemonstart mit `--appoint`. Vor jedem Merge, Tag oder Release führt der aktive Lead `herdr-peers lead verify --plan <id>` aus.

### Brain, Ereignisse und Flotte

Das optionale `--brain` startet einen dedizierten Entscheidungsagenten für Fälle, die Daemon-Regeln nicht entscheiden können. Er darf nur aus einer geschlossenen Aktionsliste wählen. Der Daemon bleibt der einzige Akteur: Er prüft die zulässige Wahl und führt sie aus; freien Brain-Text führt er nie aus. Der `autonomy`-Block des Plans muss das Brain ebenfalls zulassen.

Der Loop zeichnet Planereignisse auf, darunter Stillstand, Blockierung, Lead-Verlust, Abschluss und Warteschlangenergebnisse. Mit der optionalen `--notify`-Integration sendet der Daemon ein `plan-event-v1`-Objekt an den konfigurierten Notifier; der Dailybot-Notifier des Packs macht unterstützte Ereignisse zu Team-Meldungen. Eine Meldung genehmigt keine Arbeit und ändert keinen Plan-Eintrag. Flottenkarte und `herdr-peers fleet ui` zeigen Agenten und Pläne auf mehreren Maschinen. Die Oberfläche ist schreibgeschützt: Sie ändert keinen Planstatus und stößt keine Agenten an. Die getaggte Semantik steht in [herdr-peers v2.1.0 autopilot](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/autopilot.md) und im [Protokoll](https://github.com/DailybotHQ/herdr-peers/blob/v2.1.0/skills/herdr-peers/protocol.md).

## 2. Der `autonomy`-Block (plan-contract/v8)

Das optionale `autonomy`-Objekt auf oberster Ebene ist geschlossen; unbekannte Schlüssel sind ungültig. Die kanonischen Feldnamen und Typen stehen im [plan-contract/v8-Schema](https://deepworkplan.com/schema/plan-contract/v8.json). Fehlt der Block, gelten alle Standardwerte. Ist er vorhanden, behält jedes ausgelassene Feld seinen eigenen Standardwert; ein Consumer DARF NICHT raten.

| Feld | Typ und erlaubte Werte | Standard bei Auslassung |
|---|---|---|
| `stall_budget` | Ganzzahl von 1 bis 10 | `3` Anstöße ohne Fortschritt |
| `promptable` | Nichtleere Liste von Herdr-Pane-Adressen | Nur der Lead des Plans |
| `notify` | Nichtleere Zielliste | Kein Ziel; der Loop zeichnet Ereignisse dennoch auf |
| `brain` | Boolean | `false`; kein Brain handelt für den Plan |
| `queue` | `prompt-lead`, `launch` oder `none` | `none`; der Plan ist nicht eingereiht |

Eine Pane-Adresse folgt exakt Herdrs Form: `(?:local|[A-Za-z0-9][A-Za-z0-9._-]{0,63}):[A-Za-z0-9]{1,32}:[A-Za-z0-9]{1,32}`. Eine Maschinen-ID beginnt nie mit `-`. Die Felder begrenzen, wer angestoßen wird und Meldungen erhält, ob ein Brain handeln darf und wie der Plan an einer Warteschlange teilnimmt. Sie ändern weder Abnahmekriterien noch Gates.

## 3. Strukturierte Blocker

Ein v8-Plan speichert den Grund einer Unterbrechung als Daten, damit Loop, Flotte und fortsetzende Agenten dieselben Felder lesen.

### 3.1. Der Blocker-Eintrag

Das Ledger öffnet mit `ledger.py block` und löst mit `ledger.py unblock` auf. Es speichert `blocker` in `journal-event/v8`; direktes Anhängen wird abgewiesen und jede Ablehnung protokolliert.

| Feld | Regel |
|---|---|
| `task` | Blockierte Aufgabe des Contracts; eine bereits durch Nachweise geschlossene Aufgabe darf nicht blockiert werden. |
| `reason` | Erforderlich, nicht leer, höchstens 1000 Zeichen: Grund des Stillstands. |
| `needs` | Erforderlich, genau eine nicht leere Zeile, höchstens 500 Zeichen: Voraussetzung zum Fortsetzen. |
| `class` | Erforderlich: `C1`–`C7` aus [`AGENT_PROTOCOL.md`](AGENT_PROTOCOL.md) §7.5. |
| `resolver` | Optional `lead` oder `human`; fehlt es, gilt `human`. |

`lead` löst innerhalb der aufgezeichneten Befugnisse, ohne Zugangsdaten, Login, Zustimmung, Zahlung, Push auf main, Veröffentlichung oder Löschung. Für `C1`, `C2`, `C5` und `C6` wird `resolver: "lead"` abgewiesen. Je Plan ist höchstens ein Blocker aktiv. Eine andere Aufgabe wird bis zur Auflösung abgewiesen. Derselbe Blocker kann `reason`, `needs`, `class`, `resolver` ändern, behält aber das erste `since`. Die Auflösung enthält Aufgabe und optionale Notiz. Die offene Aufgabe kann nicht abgeschlossen werden; neue Nachweise schließen sie nicht.

### 3.2. Wo Leser ihn finden

`state.json` verwendet `plan-snapshot/v8`: die Form von `plan-snapshot/v6`, `blocker` als `{task, reason, since, needs, class, resolver?}` oder `null` und `blocked` als vorrangigen abgeleiteten Status. Das Ledger projiziert diese Felder; sie werden nie manuell geschrieben.

`PROGRESS.md` SOLLTE direkt unter dem Titel mit vier festen Zeilen beginnen. create schreibt sie und aktualisiert sie bei jedem Übergang (`shared/progress_header.py`):

```text
Goal: <one line>
Current task: <task id> - <title> (<status>)
Next action: <one line>
Needs: none | <class> (<resolver>): <needs>
```

`Current task` und `Needs` stammen aus dem Snapshot (zuerst blockierte, sonst erste offene Aufgabe). Der ausführende Agent schreibt `Goal` und `Next action`.

### 3.3. Was der Loop tun darf

Loop einschließlich brain darf nur bei `resolver: "lead"` den lead um Lösung bitten. Sonst ist der Mensch zuständig. v6/v7 speichern keine `blocker`-Ereignisse und behalten `plan-snapshot/v6` (`blocker` bleibt `null`); ihre Blocker gehören dem Menschen.
## 4. Die Planwarteschlange

Die Warteschlange ist `.dwp/queue.json` mit Schema `dwp-queue-v1`. Nur das Pack schreibt sie: `create` hängt bei Genehmigung an; Mensch oder Lead sortieren im Planablauf um; `execute` setzt `started` beim Beanspruchen des Leads samt Lead-Adresse; die Finalisierung setzt `done`; `create` oder `refine` können mit einer einzeiligen Notiz `skipped` setzen. Ein Eintrag enthält Plan, optionale `after`-Abhängigkeit auf einen bereits eingereihten Plan, Status, Lead und Startmodus. Pro Repository läuft ein Plan, sofern die Warteschlange nicht ausdrücklich `parallel: true` setzt.

Der Daemon ist ein begrenzter Leser. Eine unbrauchbare Warteschlange gilt als leer und unterbricht keine Plan-Ausführung. Startbereit ist ein genehmigter Plan mit erfüllter oder fehlender Abhängigkeit, benanntem Lead und ohne anderen laufenden Plan im Repository, außer Parallelität ist erlaubt. `prompt-lead` sendet dem benannten Lead genau einen festen Prompt: „Plan P ist als Nächstes in dieser Repository-Warteschlange und genehmigt; führe ihn unter Einhaltung seiner Gates bis zum Ende aus.“ Der Daemon schreibt keinen Warteschlangenstatus. `launch` führt dieser Loop nur aus, wenn der veröffentlichte Vertrag es ausdrücklich ergänzt.

## 5. Was v8 beibehält

v8 bewahrt alles aus v7, darunter `tasks[].parallel_safe`, Delegation und den vollständigen Ereignissatz; v7-Funktionen bleiben verfügbar. v8 speichert den v7-Ereignissatz plus `blocker` in `journal-event/v8` und projiziert nach `plan-snapshot/v8`; gemischte Journals werden abgewiesen. `plan-manifest/v7` bleibt samt Form und Verweis erhalten; die Prüfung kombiniert v7-Manifest und v8-Contract. v6/v7-Aufzeichnungen bleiben bytegenau.
