---
title: Agentkit
description: "Ein Befehl für jeden Terminal-Coding-Agenten: ein Konto pro Profil, ak pick für das mit dem meisten Spielraum, Autonomie mit Opt-out und headless Läufe."
kind: addon
lang: de
order: 8
---

# Agentkit-Addon

Jeder Terminal-Coding-Agent hat eigene Flags zum Fortsetzen einer Sitzung, eine eigene Art, ein zweites Konto getrennt zu halten, einen eigenen Headless-Modus und einen eigenen Schalter zum Überspringen von Berechtigungsabfragen. **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** legt eine einzige Befehlsoberfläche über alle: `ak <kind> [@profile]`.

Dieses Addon integriert das Kit in **DWP v7** (Paket `v7.6.3`) als **headless** Delegationstransport. Es ist optional: Ohne es läuft jede Aufgabe wie bisher in der aktuellen Sitzung. Das Kit selbst ist ein MIT-Produkt, das ohne Deep Work Plan funktioniert.

## Was das Kit bietet

- **Eine Grammatik für jede CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` und `ak grok`, dazu Provider-Varianten (GLM, Azure, xAI), mit denselben Sitzungs-Flags: `-c` setzt fort, `-r <id>` nimmt wieder auf.
- **Profile.** `ak claude @work` führt ein zweites Konto in einem eigenen Home-Verzeichnis aus, getrennt vom ersten.
- **Headless-Läufe.** `ak run <kind> -- "<prompt>"` führt einen Prompt nicht interaktiv aus und gibt einen dokumentierten Exit-Code zurück, optional als ein JSON-Objekt.
- **Ein Doctor.** `ak doctor --json` meldet, welche CLIs installiert sind, die Profile und die Namen der gesetzten Schlüssel — nie deren Werte.
- **Verifizierte Installationen.** `ak install <cli>` installiert eine fehlende CLI über den offiziellen Kanal ihres Herstellers in einer fixierten Version, geprüft gegen einen fixierten sha256-Wert oder die Integritätsangabe der npm-Registry.
- **Vertraute Namen.** Zwei Alias-Presets, ausgeschaltet, bis Sie sie aktivieren: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) und `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), jeweils ein `ak <kind>`.

## Konten, Kontingent und Kontowahl

Das Kit behandelt jede Anmeldung und jeden Schlüssel, die Sie besitzen, als **Konto**: eine CLI × ein Profil. `@default` (oder `@1`) ist das eigene Home der CLI; `@2`, `@work` oder `@client-x` sind getrennte Anmeldungen, jede in einem eigenen Verzeichnis unter dem Profil-Stammverzeichnis, die nebeneinander laufen. `ak profiles` listet sie mit ihrem Anmeldestatus und den Namen ihrer Schlüssel auf; `ak profiles --json` liefert Werkzeugen dieselbe Liste (Schema `profiles-v1`). Seit `v0.5.1` meldet der Befehl, wo das Token von Claude Code tatsächlich liegt — `file`, `keychain` (macOS), `none` oder `unknown` —, allein anhand seines Vorhandenseins, ohne das Geheimnis je zu lesen, und erkennt eine Cursor-Anmeldung unter Linux, ob in einem Container oder auf einem Linux-Host. Seit `v0.5.2` benennt `AGENTKIT_DEFAULT_PROFILE_<CLI>` das Konto, das ein bloßes `ak <cli>` verwendet (ein positionelles `@profile` hat weiterhin Vorrang); so wählt ein Dev-Container das Host-Konto, das er teilt. Seit `v0.5.3` fügt `ak codex` `--no-daemon` hinzu, wenn ein mit einem anderen Rechner geteiltes Codex-Home einen Hintergrund-Daemon verzeichnet, der nicht auf diesem Rechner läuft.

`ak usage` listet Kontingent und Nutzung jedes Kontos, das das Kit sieht, eine Zeile pro Konto und Profil: live für Claude-Code-Abonnements (5-Stunden-, Wochen- und Modellfenster), Codex-Anmeldungen über ChatGPT und Schlüssel des Z.AI-Coding-Plans; Cursor, Grok, xAI und Azure OpenAI zeigen `n/d` mit dem Grund. Der Befehl ist schreibgeschützt: Er erneuert nie eine Anmeldung, gibt nie ein Token aus und schreibt nie in ein Profil. `--json` liefert Werkzeugen dieselbe Liste (Schema `usage-v1`). Die Nutzungs-Endpunkte sind anbieterintern und inoffiziell.

`ak pick <kind>` liest dieselben Zeilen und nennt das Konto mit dem meisten Spielraum. `--count N` liefert bis zu N Konten, das beste zuerst; `--exclude @<profile>` hält ein ausgelastetes Konto heraus; `--model` zählt das Wochenfenster eines einzelnen Modells; `--need 5h:40` verweigert die Auswahl ohne so viel Spielraum. `--json` liefert das Schema `pick-v1`.

```bash
ak usage                   # Kontingent jedes Kontos und Profils
ak pick claude --count 3   # die drei Claude-Konten mit dem meisten Spielraum
ak claude @work --trust-cwd  # ein zweites Konto, Ordner vorab vertraut
ak profiles --json         # profiles-v1, für Werkzeuge
ak setup verify            # geordnete Prüfungen, jede mit ihrem Reparaturbefehl
```

`--trust-cwd` (oder `AGENTKIT_TRUST_CWD=1`) vertraut dem Ordner, in dem der Agent startet, im Voraus, sodass Claude Code und Codex ohne ihren Bildschirm zum Ordnervertrauen öffnen. `ak setup probe | verify | docker` ist ein schreibgeschützter Helfer, gesteuert vom Skill `agentkit-setup`, der den Rechner untersucht, die Installation prüft und ein per Tag fixiertes, verifiziertes Container-Rezept erzeugt.

## Mehrere Agenten, mehrere Konten

Der Skill `agentkit-orchestrate` (`ak --skill orchestrate`) bringt einem Agenten bei, Arbeit auf mehrere Agenten, Konten und Anbieter zu verteilen: ein `ak usage` vor dem Batch, `ak pick --count N` zur Wahl der Konten, ein Delegierter pro Konto, das eigene Gate des Repositorys für jedes Ergebnis und Failover auf das nächste Konto, wenn eines an ein Limit stößt. Das Kit beobachtet, berechnet und führt aus; es plant nie. Der Lead — Sie oder ein Agent, den Sie beauftragt haben — entscheidet, ausschließlich mit Ihren eigenen Konten und im Rahmen der Bedingungen jedes Anbieters.

Für lange, interaktive Lanes läuft jede Lane in einem [Herdr](/kit/herdr)-Pane auf einem eigenen Konto. Das Methodik-Kapitel [Viele Agenten betreiben](/methodology/06-orchestration) beschreibt das gesamte Modell: ein Lead und seine Lanes, nach Spielraum gewählte Konten, Koordination über herdr-peers sowie ein Branch und ein Release pro Repository.

## Installation

```bash
git clone --branch v0.5.3 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Voraussetzungen: `bash` unter macOS oder Linux und `python3` 3.9 oder neuer; sonst nichts. Windows verwendet `install.ps1`. Fixieren Sie `v0.5.3`: `v0.2.0` und `v0.2.1` werden nicht unterstützt. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/coding-agents-kit`, Tag `v0.5.3`, Schnittstelle 1 |
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

Beide lassen sich kombinieren: herdr-peers kann einen Peer in einem Pane mit der Umgebung starten, die `ak env <kind> @profile` ausgibt. Für viele Lanes gleichzeitig siehe [Viele Agenten betreiben](/methodology/06-orchestration).

## Hinweise

Optional und nie erforderlich. Werte von API-Schlüsseln werden nie ausgegeben, protokolliert oder in eine Konfigurationsdatei geschrieben; die dokumentierte Ausnahme ist Cline, das seinen Schlüssel über die Befehlszeile erhält. Die Ergebnisextraktion für OpenCode, Pi, Cline und Grok basiert auf der Herstellerdokumentation und wurde noch nicht mit echten Konten erprobt; unbekannte Ausgaben fallen auf Rohtext zurück.
