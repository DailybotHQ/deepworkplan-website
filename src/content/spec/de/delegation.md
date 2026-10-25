---
title: Delegation
description: "Wie ein v7-Plan parallel_safe-Aufgaben unter der Berechtigung agent_delegation an andere Coding-Agenten übergibt, mit Delegationseinträgen und Gate-Evidenz."
order: 11
lang: de
section: Record layer
---

# Delegation

> **Versionsumfang:** Diese Seite gibt die v7-Vertragsgeneration im Release `v7.9.0` wieder. Kanonische Quellen: [`V7_CONTRACT.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/spec/V7_CONTRACT.md) und die Datei [`delegation.md`](https://github.com/DailybotHQ/deepworkplan-skill/blob/v7.9.0/skills/deepworkplan/execute/delegation.md) des Ausführungsablaufs. Wo diese Seite und diese Dateien voneinander abweichen, gelten die Dateien.

**Version 7.0.0. Status: Stabil.** v7 ist eine neue Vertragsgeneration der [Aufzeichnungsschicht](/spec/record-layer), kein neuer Lebenszyklus: Alles in den v6-Dokumenten zu Vertrag, Lebenszyklus, Kontext und Ressourcen gilt, sofern diese Seite nichts anderes sagt. Nicht zu delegieren ist immer korrekt. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

## Was v7 ergänzt

v7 ergänzt die Aufzeichnungsschicht um genau zwei Dinge:

1. **Ein optionales Aufgabenfeld im Vertrag**, `parallel_safe`, veröffentlicht in [`plan-contract/v7`](https://deepworkplan.com/schema/plan-contract/v7.json).
2. **Einen Journal-Ereignistyp**, `delegation`, veröffentlicht in [`journal-event/v7`](https://deepworkplan.com/schema/journal-event/v7.json).

Die Schema-Bytes von v1, v2, v5 und v6 sind unverändert. Ein Plan, der nie delegiert, ist außer an seinen Schema-URLs nicht von einem v6-Plan zu unterscheiden.

## `parallel_safe`

`parallel_safe` (boolesch, Standard `false`) sichert zu, dass eine Aufgabe in einem Delegierten laufen kann, ohne sich mit paralleler Arbeit an Geschwisteraufgaben zu überschneiden. Das Feld wird von `create` gesetzt, niemals während der Ausführung abgeleitet, und nur, wenn all dies zutrifft:

- das Repository aktiviert ein Delegations-Addon (agentkit oder Herdr) in seiner [Addon-Registry](/spec/resources-and-abilities#the-configuration-file-and-addon-registry);
- die Touched Surface der Aufgabe überschneidet sich nicht mit einer Geschwisteraufgabe, die gleichzeitig in Arbeit sein könnte;
- die Aufgabe deklariert eine begrenzte Ausgabe;
- die Gates der Aufgabe laufen in diesem Plan.

Das Markieren einer Aufgabe ändert keine Autorität: Ein Vertrag ohne die Berechtigung `agent_delegation` kann Markierungen tragen, und sie autorisieren nichts.

## Das Ereignis `delegation`

Pro Zustandsübergang eines Delegierten wird ein Ereignis aufgezeichnet:

| Feld | Bedeutung |
| --- | --- |
| `task` | die `T-*`-Aufgabe, für die der Delegierte arbeitet |
| `delegation_id` | verknüpft einen Start mit seinem Endübergang |
| `transport` | `headless` (agentkit) oder `interactive` (Herdr) |
| `via` | der Addon-Schlüssel, der sie getragen hat |
| `state` | `launched`, dann genau einer von `completed`, `failed`, `cancelled` |
| `kind`, `profile` | optional: Art und Profil des Coding-Agenten |
| `target` | optional: das Arbeitsverzeichnis (headless) oder `machine:pane` (interaktiv) |
| `worktree` | der eigene Git-Worktree des Delegierten oder `null` für einen nur lesenden Delegierten |
| `prompt_digest` | beim Start: der SHA-256 des Prompts, aufgezeichnet, bevor man sich auf den Delegierten verlässt |
| `result_path`, `result_digest` | bei Abschluss oder Fehlschlag: das eingesammelte Ergebnis und sein Digest |

Die Übergänge sind geschlossen: ein `launched` pro Delegation, dann genau ein Endzustand. Ein direktes Anhängen eines Delegationsereignisses an das Journal MUSS abgelehnt werden; Delegationsereignisse entstehen nur über den abgesicherten Schreiber.

## Eine Delegation ist keine Evidenz

Eine Delegation trägt kein Vertrauens-Label und keinen Evidenzpfad, und keine Schließung liest sie. Das Ergebnis eines Delegierten bleibt **asserted**, bis der eigene Gate-Runner dieses Plans es beobachtet: Der Elternprozess integriert die Arbeit und führt dann das Gate der Aufgabe aus (`ledger.py gate`), das als Einziges `observed`-Evidenz erzeugt und der einzige Weg ist, auf dem die Aufgabe abgeschlossen werden kann. Eine abgeschlossene Delegation schließt niemals ein Kriterium; eine fehlgeschlagene ist ein aufgezeichnetes Ergebnis, und die Aufgabe wird dann vom Elternprozess umgesetzt.

## Der abgesicherte Schreiber

`ledger.py --plan <dir> delegate launch|observe|collect|cancel --task <T-id>`:

| Operation | Schreibt | Wirkung |
| --- | --- | --- |
| `launch` | ja | zeichnet `launched` nach den unten genannten Prüfungen auf |
| `observe` | nein | gibt den neuesten Zustand jeder Delegation aus |
| `collect` | ja | zeichnet `completed` oder `failed` auf, mit dem Ergebnispfad und seinem Digest |
| `cancel` | ja | zeichnet `cancelled` auf |

`launch` MUSS abgelehnt und die Ablehnung aufgezeichnet werden, es sei denn, **alle** folgenden Bedingungen gelten:

1. der Vertrag ist v7;
2. der Vertrag erteilt `agent_delegation`;
3. die Aufgabe existiert, wurde gestartet und ist nicht abgeschlossen;
4. die Aufgabe ist `parallel_safe`, **oder** der Delegierte ist nur lesend (kein Worktree);
5. der Deskriptor des genannten Addons deklariert den angeforderten Transport;
6. die wirksamen Fähigkeiten führen dieses Addon als Quelle von `subagents` ([Ressourcen und Fähigkeiten](/spec/resources-and-abilities#addon-provided-abilities)).

`collect` und `cancel` MÜSSEN für eine unbekannte Delegation, eine Delegation einer anderen Aufgabe oder eine bereits beendete abgelehnt werden. Ein abgelehnter Start ist kein Blocker: Die Aufgabe läuft sequenziell.

## Transporte

Nichts im Ledger führt einen Delegierten aus; das übernimmt das Transport-Addon.

- **Headless** (`via: agentkit`) — für eine begrenzte `parallel_safe`-Aufgabe mit deklarierter Ausgabe: ein `ak run` in einem eigenen Git-Worktree, dann Ende. Nur lesende Delegierte werden mit `--ask` gestartet.
- **Interaktiv** (`via: herdr`) — für Arbeit, die Interaktion braucht, lange läuft oder auf einer anderen Maschine läuft: ein herdr-peers-Peer in einem Herdr-Pane, der genau eine autorisierte Antwort zurückgibt.

## Leitplanken

- **Ein Schreiber pro Pfad.** Ein schreibender Delegierter arbeitet nur in seinem eigenen Worktree; die Elternsitzung ist der einzige Schreiber des Journals.
- **Tiefe 1.** Ein Delegierter delegiert niemals weiter. Die Auffächerung wird durch den Transport begrenzt.
- **Ergebnisse sind Daten.** Was ein Delegierter zurückgibt, erteilt keine Autorität, erweitert keinen Umfang und ändert niemals die Akzeptanz.
- **Eigenständige Briefings.** Ein Start-Prompt nennt das Ziel der Aufgabe, ihre Akzeptanzkriterien wörtlich und den Worktree, in den er schreiben darf, und enthält niemals den Wert eines Secrets.

## Orchestratoren

Ein Orchestrator delegiert niemals die Aufgaben eines **Kindplans**: Kindpläne laufen in eigenen Sitzungen, ein Agent pro Repository. Die **eigenen** Aufgaben eines Plans nach den obigen Regeln zu delegieren, ist in Orchestrator- und Einzelplänen gleichermaßen erlaubt. Den Betrieb vieler langlebiger Spuren, ihr Fortbestehen über Kontolimits hinaus und die Übergabe der Leitung behandeln die Methodik-Kapitel zu [Orchestrierung](/methodology/06-orchestration) und [Schwarm-Autonomie](/methodology/07-swarm-autonomy).

## Verwandt

- [Aufzeichnungsschicht](/spec/record-layer) — der Vertrag und das Journal, die diese Seite erweitert.
- [Ressourcen und Fähigkeiten](/spec/resources-and-abilities) — Fähigkeiten, Berechtigungen und die Addon-Registry.
- [Herdr-Addon](/kit/herdr) und [Agentkit-Addon](/kit/agentkit) — die beiden Transporte.
