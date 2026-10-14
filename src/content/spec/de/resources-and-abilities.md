---
title: Ressourcen und Fähigkeiten
description: "Kontextmanifeste pro Aufgabe, der Ressourcenrahmen, Host-Fähigkeiten, die Addon-Registry in .dwp/config.json und Fähigkeiten aus aktivierten Addons."
order: 10
lang: de
section: Record layer
---

# Ressourcen und Fähigkeiten

> **Versionsumfang:** Diese Seite gibt vier normative Dokumente des aktuellen Standards, DWP 7.0.0, im Release `v7.8.1` wieder: [`V6_CONTEXT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_CONTEXT.md), [`V6_RESOURCES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V6_RESOURCES.md), [`CONFIG.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/CONFIG.md) und [`V7_ABILITIES.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.8.1/skills/deepworkplan/spec/V7_ABILITIES.md). Wo diese Seite und diese Dateien voneinander abweichen, gelten die Dateien.

**Status: Stabil (Kontext und Ressourcen seit 6.0.0; Konfiguration und Fähigkeiten seit 7.0.0).** Diese Regeln binden Pläne der v6-Linie ([Aufzeichnungsschicht](/spec/record-layer)); der v5-Standard bleibt unberührt. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

## Das Kontextmanifest pro Aufgabe

Vor jeder Aufgabe leitet der Agent aus dem Vertrag und dem vollständigen Journal ein **Kontextmanifest** ab (`context_manifest.py`). Es ist eine abgeleitete Sicht, niemals als Zustand gespeichert: Zweimaliges Ableiten aus denselben Aufzeichnungen MUSS identische Bytes erzeugen, und das Manifest DARF NICHT außerhalb des Plans und seines Repositorys lesen. Seine Form ist als [`context-manifest/v6`](https://deepworkplan.com/schema/context-manifest/v6.json) veröffentlicht.

| Abschnitt | Abgeleitet aus |
| --- | --- |
| `identity` | Planname, gültige Vertrags-ID und Revision |
| `authorization` | den Freigabe-Ereignissen, wörtlich, einschließlich der Zustimmungs-Checkpoints |
| `repository_rules` | dem Vertragsumfang und den Invarianten mit ihrem aktuellen Auswertungsstand |
| `acceptance` | den Kriterien der Aufgabe mit ihrem Schließungsstand |
| `touched_surface` | den deklarierten Dateien mit ihren aktuellen Inhalts-Hashes; eine fehlende Datei erscheint als fehlend |
| `evidence` | Evidenzverweisen im Fenster, die sich auf der Festplatte auflösen lassen |
| `dead_ends` | fehlgeschlagenen Gates, Ablehnungen, abgelehnten Anpassungen und nicht unterscheidenden Kontrollen |
| `freshness` | dem Fingerabdruck der Eingaben, die das Manifest zusammenfasst |
| `next_action` | genau einem nächsten Schritt mit einem konkreten Befehl |

`authorization`, `repository_rules` und `acceptance` sind **verpflichtend**: Das Beschneiden des Kontexts kann niemals die Grenze von Akzeptanz oder Autorisierung verbergen. Die Leiter der nächsten Aktion ist geordnet (Freigabe, Start, Autorität, Kontrolle, Evidenz, Abschluss) und stellt ein gewöhnliches bestandenes Gate niemals so dar, als schließe es ein kontrolliertes Kriterium.

**Sackgassen bleiben erhalten.** Ein Eintrag verlässt die Zusammenfassung nur aufgrund belegter Aufzeichnungsfakten (derselbe Fingerabdruck hat später bestanden, eine neuere gleichartige Ablehnung hat ihn ersetzt, oder eine Vertragsrevision hat ihn veralten lassen); eine bloße Änderung der Oberfläche DARF ihn NICHT entfernen. **Frische wird geprüft:** Eine Zusammenfassung, deren aufgezeichneter Eingabe-Fingerabdruck nicht mehr übereinstimmt, ist veraltet, und eine Zusammenfassung ohne Fingerabdruck ist per Konstruktion veraltet. **Historie wird nur bei Auslöser geladen** — eine aufgezeichnete Übergabe oder eine Vertragsänderung, die die Aufgabe betrifft; andernfalls ist das Manifest allein der Kontext der Aufgabe.

## Abrechnung in vier Größen

Instruktionslast und Kosten werden als vier getrennte Größen berichtet: statische **Instruktions-Bytes**, **Provider-Tokens** (nur wo ein Host-Messgerät sie aufgezeichnet hat), **monetäre Kosten** (nur aus aufgezeichneten Stichproben mit realen Tarifen) und **Wanduhrzeit** (aus den Zeitstempeln der Ereignisse). Eine fehlende Größe wird als fehlend mit ihrem Grund berichtet, niemals geschätzt, und Bytes werden niemals in Tokens oder Geld umgerechnet.

## Host-Fähigkeiten

Der Laufzeit-Host gibt seine **Fähigkeiten** aus einer geschlossenen Menge an: `stop_agent`, `meter_spend`, `meter_tokens`, `meter_wall_clock`, `cancel_children`, `model_routing`, `subagents`, `telemetry`. Eine unbekannte Fähigkeit MUSS abgelehnt werden, und eine nicht angegebene Fähigkeit ist `false`. Der **minimale Host** — kein Modellwechsel, keine Subagenten, keine Telemetrie, kein Stopp — ist eine unterstützte Ausgangslage, niemals ein Fehler; jede Grenze, die eine fehlende Fähigkeit benötigt, wird zu einer beratenden Grenze herabgestuft, wobei die fehlende Fähigkeit benannt wird.

Fähigkeiten sind keine Berechtigungen. Eine Berechtigung im Vertrag ist Autorität; eine Fähigkeit ist das, was die Umgebung tatsächlich leisten kann. Jede Ausgangslage, die eine Fähigkeit benötigt, braucht weiterhin ihre Berechtigung.

## Der Ressourcenrahmen

Ein Vertrag KANN in seinem Ressourcenrahmen Grenzen deklarieren. Eine Grenze wird nur dann **durchgesetzt**, wenn sie eine echte Messquelle benennt; andernfalls ist sie **beratend**, und Gleichheit der Durchsetzung über Hosts hinweg wird niemals behauptet.

- **Zählerquellen.** Im Journal beobachtbare Zähler (Wanduhrspanne, Gate-Wiederholungen, Zuteilungsaufrufe) werden aus den eigenen Aufzeichnungen des Plans berechnet. Nur beim Host verfügbare Zähler (Ausgaben, Provider-Tokens) benötigen die passende Messfähigkeit und eine beobachtete Stichprobe eines Host-Adapters; ein fehlender Zähler ist kein kostenloser Verbrauch.
- **Reserven.** Eine Grenze KANN eine `reserve` deklarieren, damit Verifikation, Wiederholung und Wiederaufnahme nicht durch gewöhnliche Arbeit ausgehungert werden: Die Zuteilung wird abgelehnt, wenn Verbrauchtes plus Ausstehendes die Grenze abzüglich der Reserve überschreiten würde.
- **Erschöpfung.** Das Erreichen einer Grenze persistiert einen unvollständigen Checkpoint, zeichnet `LIMIT: exhausted <id>: <detail>` auf und hält die Zuteilung an, bis ein ausdrücklicher Eintrag `LIMIT: recovered <id>` vorliegt. Eine Erschöpfung kann niemals ein Akzeptanzkriterium erfüllen.
- **Abrechnung bei Abbruch.** Eine laufende Reservierung wird genau einmal abgerechnet, als freigegeben oder verbindlich; eine widersprüchliche zweite Abrechnung wird abgelehnt, niemals entschieden.
- **Routing-Ausgangslage.** Standard ist ein festes Modell. Der Wechsel der Modellstufe benötigt sowohl die Berechtigung `model_routing` als auch die gleichnamige Fähigkeit; parallele Zuteilung benötigt sowohl die Berechtigung `agent_delegation` als auch die Fähigkeit `subagents`. Eine Routing-Ausgangslage ist eine Aussage über Berechtigungen, niemals eine Wirksamkeitsbehauptung.

## Die Konfigurationsdatei und die Addon-Registry

`.dwp/config.json` (Repository) und `~/.dwp/config.json` (Nutzer) teilen eine Form, veröffentlicht als [`dwp-config/v1`](https://deepworkplan.com/schema/dwp-config/v1.json), und einen Parser (`config.py`). **Die Methodik funktioniert ohne Konfigurationsdatei und ohne Addon**; nichts in der Datei kann einen Plan, einen Ablauf oder die Konformität von einem Addon abhängig machen.

- **Standardmäßig versioniert.** Die Repository-Datei enthält Entscheidungen, niemals Secrets, und wird versioniert, damit Teammitglieder und CI dieselbe Registry lesen: Das Onboarding schreibt die `.gitignore`-Regel `.dwp/*` plus `!.dwp/config.json`. Pläne und Benchmark-Aufzeichnungen bleiben ausgeschlossen.
- **Vorrang.** Die Repository-Datei hat Vorrang vor der Nutzerdatei, und eine fehlende Datei bedeutet, dass alles deaktiviert ist. Der Schlüssel `addons` wird pro Addon-Schlüssel aufgelöst; der Schlüssel `benchmark` wird als Ganzes aufgelöst.
- **Registry-Schlüssel** sind die Namen der Addon-Verzeichnisse im Paket: `ai-diff-reviewer`, `agentkit`, `dailybot`, `dependency-upgrade`, `design-system`, `devcontainer`, `herdr`, `vim`. Jeder Eintrag hat `enabled` (nur `true` aktiviert), eine optionale `version` und eine optionale einzeilige `note`. Ein unbekannter Schlüssel wird mit einer Warnung ignoriert.
- **Fehlend heißt nicht aktiviert.** Nur das Onboarding mit Zustimmung des Entwicklers, der eigene Installationsschritt eines Addons oder der Mensch aktiviert etwas. Ein aktiviertes Addon, das nicht erkannt wird und eine Notiz trägt, wird als zurückgestellt gemeldet.
- **Fail-closed-Lesen.** Eine unlesbare Datei oder ein fehlerhafter Wert trägt nichts bei und erzeugt genau eine Warnung; ein Leser bricht niemals einen Ablauf ab und schweigt nie darüber, was er verworfen hat. Der Schreiber gleicht atomar ab und weigert sich, eine Datei zu überschreiben, die er nicht parsen kann.
- **Host-Eintrag.** Ein optionaler Schlüssel `host` zeichnet die deklarierten Fähigkeiten der Maschine auf (boolesche Werte aus der geschlossenen Menge). `telemetry: true` benötigt weiterhin die Zustimmung des Entwicklers.
- **Die Baseline bleibt unverändert.** Die lokale Überprüfung durch den AI Diff Reviewer bleibt Teil jedes Final Review, ob die Registry sie nennt oder nicht.

## Von Addons bereitgestellte Fähigkeiten

Ab 7.0.0 können aktivierte Addons zur Laufzeit Fähigkeiten ergänzen:

`effective abilities = host-declared abilities ∪ abilities provided by every addon that is enabled, described by a valid addon.json, detected, and on a compatible interface version`

Das heißt: Die wirksamen Fähigkeiten sind die vom Host deklarierten Fähigkeiten vereinigt mit den Fähigkeiten jedes Addons, das aktiviert ist, durch eine gültige `addon.json` beschrieben wird, erkannt wurde und eine kompatible Schnittstellenversion hat.

- **Deskriptoren.** Jedes Addon im Paket liefert eine `addon.json` ([`addon-descriptor/v1`](https://deepworkplan.com/schema/addon-descriptor/v1.json)) mit, die seinen Schlüssel deklariert, was es bereitstellt und wie es erkannt wird.
- **Erkennung ist nur lesend.** Ein Erkennungsbefehl läuft ohne Shell, mit geschlossenem stdin und einem Timeout von 10 Sekunden, und nichts, was er ausgibt, wird ausgeführt. Ein Produkt, dessen gemeldete Haupt-Schnittstellenversion von der fixierten abweicht, ist nicht verfügbar, mit einer Warnung.
- **Nicht aktiviert heißt nicht befragt.** Der Deskriptor eines deaktivierten Addons wird nicht geöffnet, und sein Erkennungsbefehl wird nicht ausgeführt. Die Vereinigung ist monoton: Das Aktivieren eines Addons kann nur Fähigkeiten hinzufügen.
- **Niemals persistiert.** Wirksame Fähigkeiten werden bei jedem Aufruf neu berechnet und DÜRFEN NICHT in einen Plan geschrieben werden. Ein Plan zeichnet auf, was er verwendet hat — das Delegationsereignis nennt seinen Transport und sein Addon —, nicht, was verfügbar war.
- **Fähigkeiten sind keine Autorität.** Das agentkit-Addon kann `subagents`, `cancel_children` und `model_routing` bereitstellen; das Herdr-Addon kann `subagents` und `cancel_children` bereitstellen. Delegieren benötigt weiterhin die Berechtigung `agent_delegation` des Vertrags ([Delegation](/spec/delegation)).

`resources.py abilities` gibt die wirksame Menge aus und woher jede Fähigkeit stammt; der Befehl ist nur lesend.

## Verwandt

- [Aufzeichnungsschicht](/spec/record-layer) — Vertrag, Journal und Evidenz.
- [Delegation](/spec/delegation) — wie ein Plan die Fähigkeit `subagents` nutzt.
- [Addons](/spec/addons) — die optionalen Addons selbst.
