---
title: Agentkit
description: "Ein Befehl für jeden Terminal-Coding-Agenten. Standardmäßig volle Autonomie mit Opt-out, headless Läufe in einem Git-Worktree und ein zweites Konto per Präfix."
kind: addon
lang: de
order: 8
---

# Agentkit-Addon

Jeder Terminal-Coding-Agent hat eigene Flags zum Fortsetzen einer Sitzung, eine eigene Art, ein zweites Konto getrennt zu halten, einen eigenen Headless-Modus und einen eigenen Schalter zum Überspringen von Berechtigungsabfragen. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** legt eine einzige Befehlsoberfläche über alle: `ak <kind> [@profile]`.

Dieses Addon integriert das Kit in **DWP v7** (Paket `v7.1.4`) als **headless** Delegationstransport. Es ist optional: Ohne es läuft jede Aufgabe wie bisher in der aktuellen Sitzung. Das Kit selbst ist ein MIT-Produkt, das ohne Deep Work Plan funktioniert.

## Was das Kit bietet

- **Eine Grammatik für jede CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` und `ak grok`, dazu Provider-Varianten (GLM, Azure, xAI), mit denselben Sitzungs-Flags: `-c` setzt fort, `-r <id>` nimmt wieder auf.
- **Profile.** `ak claude @work` führt ein zweites Konto in einem eigenen Home-Verzeichnis aus, getrennt vom ersten.
- **Headless-Läufe.** `ak run <kind> -- "<prompt>"` führt einen Prompt nicht interaktiv aus und gibt einen dokumentierten Exit-Code zurück, optional als ein JSON-Objekt.
- **Ein Doctor.** `ak doctor --json` meldet, welche CLIs installiert sind, die Profile und die Namen der gesetzten Schlüssel — nie deren Werte.
- **Verifizierte Installationen.** `ak install <cli>` installiert eine fehlende CLI über den offiziellen Kanal ihres Herstellers in einer fixierten Version, geprüft gegen einen fixierten sha256-Wert oder die Integritätsangabe der npm-Registry.
- **Vertraute Namen.** Zwei Alias-Presets, ausgeschaltet, bis Sie sie aktivieren: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) und `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), jeweils ein `ak <kind>`.

## Installation

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Voraussetzungen: `bash` unter macOS oder Linux und `python3` 3.9 oder neuer; sonst nichts. Windows verwendet `install.ps1`. Fixieren Sie `v0.3.0`: `v0.2.0` und `v0.2.1` werden nicht unterstützt. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, Tag `v0.3.0`, Schnittstelle 1 |
| Registry-Schlüssel | `agentkit` in `.dwp/config.json` |
| Transport | headless: ein `ak run` pro Delegiertem in einem eigenen Git-Worktree |
| Stellt bereit | `subagents`, `cancel_children`, `model_routing` |
| Erfordert | die `agent_delegation`-Freigabe des Plan-Vertrags |

## Autonomie standardmäßig, mit einem Opt-out, das immer gewinnt

Seit `v0.2.0` startet `ak <kind>` jeden Agenten in **Autonomie**: Es fügt das eigene Autonomie-Flag der CLI hinzu, das nur in der `providers.toml` des Kits hinterlegt ist. Autonomie ist für wegwerfbare oder abgeschottete Umgebungen gedacht, etwa einen Entwicklungscontainer.

Das **Opt-out gewinnt immer**: `--ask` für einen einzelnen Befehl oder `AGENTKIT_PERMISSIONS=ask` in der Umgebung oder in der env-Datei des Kits unterdrückt das Flag, selbst wenn derselbe Befehl `--auto` angibt. Eine Sitzung mit Opt-out gibt das Opt-out an die Agenten weiter, die sie startet. Setzen Sie auf einem Host das Opt-out.

Das Addon schreibt kein Autonomie-Flag aus und übergibt nie `--auto`. Es übergibt `--ask`, wenn ein Plan das Opt-out festhält. Ein Plan, der `agent_delegation` auf einem Host freigibt, akzeptiert autonome Delegierte, die auf ihren eigenen Worktree beschränkt sind — und ein Worktree ist keine Sandbox.

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
