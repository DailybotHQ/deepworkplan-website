---
title: Devcontainer
description: "Optionales Addon auf Basis von devcontainer-kit: ein eigener Dev-Container pro Repository aus einem Template, Agenten über ak, Herdr in beide Richtungen."
kind: addon
lang: de
order: 1
---

# Devcontainer-Addon

Geben Sie dem Repository einen reproduzierbaren, isolierten Entwicklungscontainer — einen, den Menschen, Editoren und Coding-Agenten gleichermaßen nutzen können. In **DWP v7** (Paket `v7.1.4`) integriert dieses Addon **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, ein MIT-Produkt, das ohne Deep Work Plan funktioniert. Es ist optional: Ein Repository ist auch ohne es vollständig konform.

## Was devcontainer-kit bereitstellt

- **Ein Template** auf Basis der [Dev Containers](https://containers.dev)-Spezifikation, das `dck init` in einem festen Layout in das Repository rendert: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` und `dev.sh`. Bei einem erneuten Lauf gleicht es ab und überschreibt nie Ihre Änderungen; jede Änderung an einer bestehenden Datei wird zuerst angezeigt und erfordert eine Einwilligung.
- **Der eigene Container des Repositorys.** Das Dockerfile startet vom offiziellen Image der Laufzeitumgebung, per Digest fixiert — `node-24`, `python-3.13` oder `debian` — und kopiert die Build-Schritte des Kits nach `docker/local/<service>/dck/`. Es ist kein gemeinsames Basis-Image beteiligt.
- **`dev.sh` und `dck`.** `bash dev.sh up` baut, startet und verbindet den Container aus einem einfachen Terminal; `shell`, `rebuild`, `doctor` und die übrigen Befehle funktionieren mit oder ohne VS Code oder Cursor.
- **Herdr in beide Richtungen.** Das [Herdr](https://herdr.dev) des Hosts bindet jeden Container über einen nur an Loopback gebundenen SSH-Server als Rechner ein, und der Container öffnet sich mit der Standard-Seitenleiste: Home, Editor, Development und Agents. Darin ermöglicht [herdr-peers](/kit/herdr) Agenten, Agenten auf dem Host und in anderen Containern zu befragen.
- **Der Skill `dck-dockerfile`.** Ein Agent erstellt oder regeneriert auf Anfrage den Container eines Repositorys und belegt ihn mit einem echten Build.

## Installation

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Voraussetzungen: `bash` 3.2 oder neuer und `python3` 3.11 oder neuer auf einem Linux- oder macOS-Host sowie Docker mit Compose v2 für die Container-Befehle. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets. Fixieren Sie `v0.2.2`: `v0.2.0` wird nicht unterstützt.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, Tag `v0.2.2`, Schnittstelle 2 |
| Registry-Schlüssel | `devcontainer` in `.dwp/config.json` |
| Konfiguration pro Repository | `.devcontainer/dck.toml` |
| Erkennung | `dck doctor --json` |

## Layer

Jeder Container enthält die Entwicklungswerkzeuge — git, gh, ripgrep, einen SSH-Server, Herdr und herdr-peers — und kein Geheimnis. Der Rest ist ein Layer, den Sie in `dck.toml` wählen:

| Layer | Standard | Was er hinzufügt |
|---|---|---|
| `agents` | aus | [coding-agents-kit](/kit/agentkit) aus seinem verifizierten Release und die von Ihnen aufgeführten CLIs, jede mit eigenem persistentem Volume, dazu die Presets `classic` (`claudex`, `codexx`, …) und `providers` (`claude-glm`, `codex-azure`, …). Agenten laufen standardmäßig in Autonomie — der Container ist die Sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in der `.env` des Service. |
| `editor` | an | Neovim mit [DeepWorkPlan Vim](/kit/vim), per Tag fixiert; ausgeschaltet gibt es einen einfachen Editor. |
| `dailybot` | aus | Die Dailybot-CLI, für das Dailybot-Addon. |

Anmeldungen, `gh`, die Herdr-Konfiguration und die Git-Identität überstehen `bash dev.sh rebuild`.

## Sicherheitsvorgaben

- Jeder veröffentlichte Port bindet an `127.0.0.1`, sofern `dck.toml` nicht `bind` setzt.
- Git über SSH läuft über den SSH-Agenten des Hosts — dessen Socket, nie eine Schlüsseldatei und nie ein eingebundenes `~/.ssh` oder `~/.gitconfig`. Die Git-Identität stammt aus `DCK_GIT_*`-Werten, die `dck setup` ausfüllt.
- SSH-Host-Schlüssel werden zur Laufzeit in ein projektbezogenes Volume erzeugt und nie in ein Image eingebacken; der Server akzeptiert nur öffentliche Schlüssel, ohne Root-Login und ohne Passwörter.
- Das Template fügt kein `cap_add`, keinen `privileged`-Modus und keinen Docker-Socket hinzu.
- Jeder Download ist per Version fixiert und per Prüfsumme verifiziert; das Basis-Image ist per Digest fixiert.
- Das Herdr-Mesh, über das Agenten in einem Container die anderen erreichen, ist standardmäßig aktiv und im Bedrohungsmodell des Kits mit seinen Abschaltmöglichkeiten dokumentiert.

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform. v0.2 unterstützt Linux- und macOS-Hosts; das Mesh zwischen Containern erfordert Docker Desktop.
