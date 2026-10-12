---
title: Herdr
description: "Übergib Arbeit an einen anderen Coding-Agenten im Herdr-Pane, auf jedem Rechner, und erhalte eine autorisierte Antwort. Pläne, die delegieren, protokolliert."
kind: addon
lang: de
order: 7
---

# Herdr-Addon

[Herdr](https://herdr.dev) bringt Coding-Agenten in Panes unter, auf Ihrem Rechner und auf Rechnern, die es über SSH erreicht. Dieses Addon lässt einen Deep Work Plan diese Agenten als **Peers** nutzen: Ein Plan kann eine abgegrenzte Aufgabe an einen Agenten in einem anderen Pane übergeben, genau eine autorisierte Antwort erhalten und einen Nachweis des Austauschs aufbewahren.

Es ist ein optionales Addon von **DWP v7** (`v7.0.0`). Die Methodik funktioniert ohne es genauso: Fehlt das Addon oder ist es deaktiviert, läuft jede Aufgabe wie bisher in der aktuellen Sitzung.

## Was es integriert

Das Addon ist ein schlanker Integrator. Die Arbeit erledigt **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, ein eigenständiger MIT-Skill, fixiert auf **`v0.2.2`**, der auch ohne Deep Work Plan nützlich ist. Er legt fest, was Herdr selbst offenlässt: wer antworten darf, wie die Antwort über Rechnergrenzen hinweg zurückfindet, wie zwei Agenten vermeiden, einander endlos zu antworten, und wo der Nachweis „Ich habe gefragt, es hat geantwortet“ liegt.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/herdr-peers`, Tag `v0.2.2`, Protokoll 1 |
| Registry-Schlüssel | `herdr` in `.dwp/config.json` |
| Transport | interaktiv: ein Peer in einem Herdr-Pane |
| Stellt bereit | `subagents`, `cancel_children` |
| Erfordert | die `agent_delegation`-Freigabe des Plan-Vertrags |

## Installation

Installieren Sie herdr-peers und den offiziellen Skill von Herdr, von dem es abhängt. Jeder Rechner, dessen Agenten antworten sollen, braucht den Skill ebenfalls.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.2.2 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Voraussetzungen: Herdr 0.9.1 oder neuer, `bash` und `python3` 3.9 oder neuer (nur Standardbibliothek). Das Onboarding bietet das Addon an und hält Ihre Antwort in der Addon-Registry fest; ohne Einwilligung wird es nie aktiviert.

## Was es einem Plan hinzufügt

- **Delegation an einen Peer.** In einem v7-Plan, dessen Vertrag `agent_delegation` freigibt, darf `execute` eine `parallel_safe`-Aufgabe oder eine reine Lesefrage an einen Agenten in einem anderen Pane übergeben, auf diesem oder einem anderen Rechner.
- **Eine autorisierte Antwort.** Die Anfrage trägt einen Stempel, der genau eine Antwort autorisiert. Der Peer antwortet einmal über den Helper, und die Antwort trägt einen eigenen Stempel.
- **Ein Nachweis vor der Verwendung.** Jede Delegation wird in die `analysis_results/delegations.ndjson` des Plans geschrieben, bevor die Antwort verwendet wird, und entspricht dem v7-Journal-Ereignis `delegation`.
- **Ergebnisse bleiben Behauptungen, bis sie geprüft sind.** Die Antwort eines Peers ist `asserted`-Evidenz, bis der eigene Gate-Runner des Plans sie beobachtet. Sie schließt nie von sich aus eine Aufgabe ab.

## Sicherheitsmodell

| Regel | Bedeutung |
|---|---|
| Zuerst die Freigabe | Delegation läuft nur, wenn der Plan-Vertrag `agent_delegation` freigibt. |
| Tiefenlimit 1 | Eine mit `depth=1` oder `reply-to=` gestempelte Nachricht wird nie beantwortet, und ein Delegierter delegiert nie weiter. |
| Fan-out-Obergrenze | Standardmäßig höchstens vier Peers pro Aufrufer. |
| Daten, keine Anweisungen | Eine Antwort gewährt nie eine Befugnis, die der Empfänger nicht bereits hatte. |
| Ein Schreiber pro Pfad | Ein Peer, der schreibt, arbeitet in seinem eigenen Git-Worktree. |

herdr-peers authentifiziert den Absender nicht: Das Feld `from=` in einem Stempel ist eine Behauptung. Die Gegenmaßnahme ist die Allowlist `HERDR_PEERS_SCOPE`, die die Workspaces und Rechner begrenzt, die ein Peer akzeptiert.

## Container und Host

Mit dem Addon [devcontainer](/kit/devcontainer) auf devcontainer-kit `v0.3.2` bringt jeder dck-Container herdr-peers mit und tritt bei `dck up` dem Mesh bei: Seine Agenten können Agenten auf dem Host, in den anderen Containern und in den anderen Loopback-Containern des Hosts fragen und erhalten die Antwort zurück. `dck setup` installiert ein verifiziertes herdr-peers auf dem Host, sodass auch Host-Agenten antworten. Der Host-Listener und die zusätzlichen Schlüssel, die andere Container hereinlassen, sind Ihre Entscheidungen im Host-Profil des Kits; dieses Addon setzt sie nie.

## Herdr oder Agentkit

Beide Addons implementieren dieselbe Delegationsschnittstelle — `launch`, `observe`, `collect`, `cancel` — mit unterschiedlichen Transporten.

| Situation | Verwenden |
|---|---|
| Eine abgegrenzte `parallel_safe`-Aufgabe mit deklarierter Ausgabe | [agentkit](/kit/agentkit) (headless `ak run` in einem Worktree) |
| Die Aufgabe erfordert Interaktion, läuft lange oder befindet sich auf einem anderen Rechner | Herdr (ein Peer in einem Pane) |

Für einen Lead, der viele Lanes gleichzeitig betreibt — Panes auf dem Host, in Containern und auf anderen Rechnern, jede auf einem eigenen Konto — listet `herdr-peers lanes` jede Lane mit ihrem Zustand auf, `herdr-peers status <pane>` klassifiziert den Bildschirm, auf dem eine blockierte Lane steht, und jeder Delegationsnachweis nennt das Konto und den Anbieter, die sie getragen haben. Siehe [Viele Agenten betreiben](/methodology/06-orchestration).

**Codex-Lanes nennen ihr Pane.** Codex führt die Befehle einer Lane über einen Hintergrundserver aus, den sich alle Sitzungen dieses Kontos teilen; die geerbte Pane-ID kann also zu einer anderen Lane gehören. Eine Codex-Lane übergibt ihr eigenes Pane aus dem Auftrag des Leads mit `--pane <pane>` bei jedem herdr-peers-Befehl (`ask`, `reply`, `check`, `wait`, `lanes`, `cancel`).

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform, und kein Ablauf hängt von diesem ab. Der Round-Trip über zwei Panes und Rechnergrenzen hinweg ist durch Tests gegen ein simuliertes Herdr abgedeckt; planen Sie einen beaufsichtigten ersten Lauf ein.
