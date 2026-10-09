---
title: Agentkit
description: "Ein optionales v7-Addon auf Basis von coding-agents-kit: ein ak-Befehl für jeden Terminal-Coding-Agenten und headless Delegation abgegrenzter Planaufgaben."
kind: addon
lang: de
order: 8
---

# Agentkit-Addon

Jeder Terminal-Coding-Agent hat eigene Flags zum Fortsetzen einer Sitzung, eine eigene Art, ein zweites Konto getrennt zu halten, einen eigenen Headless-Modus und einen eigenen Schalter zum Überspringen von Berechtigungsabfragen. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** legt eine einzige Befehlsoberfläche über alle: `ak <kind> [@profile]`.

Dieses Addon integriert das Kit in **DWP v7** (`v7.0.0`) als **headless** Delegationstransport. Es ist optional: Ohne es läuft jede Aufgabe wie bisher in der aktuellen Sitzung. Das Kit selbst ist ein MIT-Produkt, das ohne Deep Work Plan funktioniert.

## Was das Kit bietet

- **Eine Grammatik für jede CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` und `ak grok`, dazu Provider-Varianten (GLM, Azure, xAI), mit denselben Sitzungs-Flags: `-c` setzt fort, `-r <id>` nimmt wieder auf.
- **Profile.** `ak claude @work` führt ein zweites Konto in einem eigenen Home-Verzeichnis aus, getrennt vom ersten.
- **Headless-Läufe.** `ak run <kind> -- "<prompt>"` führt einen Prompt nicht interaktiv aus und gibt einen dokumentierten Exit-Code zurück, optional als ein JSON-Objekt.
- **Ein Doctor.** `ak doctor --json` meldet, welche CLIs installiert sind, die Profile und die Namen der gesetzten Schlüssel — nie deren Werte.
- **Installationen.** `ak install <cli>` installiert eine fehlende CLI über den offiziellen Kanal ihres Herstellers.

## Installation

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Voraussetzungen: `bash` unter macOS oder Linux und `python3` 3.9 oder neuer; sonst nichts. Windows verwendet `install.ps1`. Fixieren Sie `v0.1.1`: Es ersetzt `v0.1.0` und enthält eine Sicherheitskorrektur. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, Tag `v0.1.1`, Schnittstelle 1 |
| Registry-Schlüssel | `agentkit` in `.dwp/config.json` |
| Transport | headless: ein `ak run` pro Delegiertem in einem eigenen Git-Worktree |
| Stellt bereit | `subagents`, `cancel_children`, `model_routing` |
| Erfordert | die `agent_delegation`-Freigabe des Plan-Vertrags |

## Berechtigungen werden durchgereicht

`ak <kind>` fügt **kein** Flag zum Umgehen von Berechtigungen hinzu. Autonomie ist ein ausdrückliches Opt-in: `--auto` für einen einzelnen Befehl oder `AGENTKIT_PERMISSIONS=auto` in der Umgebung fügt für diesen Start das eigene Autonomie-Flag der CLI hinzu. Das Alias-Preset `classic`, das Kurzbefehle wie `claudex` nachbildet, wird deaktiviert ausgeliefert.

Das Addon fügt nie von sich aus ein Autonomie-Flag hinzu. Ein Plan verwendet `--auto` nur nach dem ausdrücklichen, festgehaltenen Opt-in des Entwicklers und nur innerhalb eines isolierten Worktrees oder Containers.

## Was es einem Plan hinzufügt

In einem v7-Plan, dessen Vertrag `agent_delegation` freigibt, darf `execute` eine `parallel_safe`-Aufgabe an eine andere CLI übergeben: Es legt einen eigenen Git-Worktree an, führt dort `ak run` mit einem Timeout aus und sammelt das Ergebnis in `analysis_results/delegations/` des Plans. Das Ergebnis ist `asserted`-Evidenz, bis der eigene Gate-Runner des Plans es beobachtet. Das Abbrechen eines Delegierten beendet seinen gesamten Prozessbaum.

## Agentkit oder Herdr

| Situation | Verwenden |
|---|---|
| Eine abgegrenzte `parallel_safe`-Aufgabe mit deklarierter Ausgabe | Agentkit (headless) |
| Die Aufgabe erfordert Interaktion, läuft lange oder befindet sich auf einem anderen Rechner | [Herdr](/kit/herdr) (ein Peer in einem Pane) |

Beide lassen sich kombinieren: herdr-peers kann einen Peer in einem Pane mit der Umgebung starten, die `ak env <kind> @profile` ausgibt.

## Hinweise

Optional und nie erforderlich. Werte von API-Schlüsseln werden nie ausgegeben, protokolliert oder in eine Konfigurationsdatei geschrieben; die dokumentierte Ausnahme ist Cline, das seinen Schlüssel über die Befehlszeile erhält. Die Ergebnisextraktion für OpenCode, Pi, Cline und Grok basiert auf der Herstellerdokumentation und wurde noch nicht mit echten Konten erprobt; unbekannte Ausgaben fallen auf Rohtext zurück.
