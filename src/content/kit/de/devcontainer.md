---
title: Devcontainer
description: "Optionales Addon auf Basis von devcontainer-kit: ein mit dck init gerendertes Dev-Containers-Template, Basis-Images ohne Agenten, Herdr-Rechner pro Container."
kind: addon
lang: de
order: 1
---

# Devcontainer-Addon

Geben Sie dem Repository einen reproduzierbaren, isolierten Entwicklungscontainer — einen, den Menschen, Editoren und Coding-Agenten gleichermaßen nutzen können. In der **DWP-v7-Beta** (`v7.0.0-beta.1`, ein Pre-Release) integriert dieses Addon **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, ein MIT-Produkt, das ohne Deep Work Plan funktioniert, und ersetzt das Template, das das Paket bisher mitgeliefert hat. Es ist optional: Ein Repository ist auch ohne es vollständig konform.

## Was devcontainer-kit bereitstellt

- **Ein Template** auf Basis der [Dev Containers](https://containers.dev)-Spezifikation, das `dck init` in das Repository rendert: `devcontainer.json`, eine Compose-Datei und `docker/local/`. Bei einem erneuten Lauf gleicht es ab und überschreibt nie Ihre Änderungen; jede Änderung an einer bestehenden Datei wird zuerst angezeigt und erfordert eine Einwilligung.
- **`dck`**, ein Launcher, der den Container aus einem einfachen Terminal betreibt — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — mit oder ohne VS Code oder Cursor.
- **Basis-Images** in drei Varianten, `python-3.13`, `node-24` und `debian`, die **ohne** Coding-Agenten ausgeliefert werden.
- **Eine Entrypoint-Bibliothek** für persistente Volumes, SSH und die Umgebung von SSH-Sitzungen, statt eines von Hand kopierten Entrypoints pro Repository.
- **Herdr-Rechner.** Jeder Container kann [Herdr](https://herdr.dev) über einen nur an Loopback gebundenen SSH-Server beitreten, sodass Agenten darin als Peers erreichbar werden.

## Installation

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Voraussetzungen: `bash` 3.2 oder neuer und `python3` 3.11 oder neuer auf einem Linux- oder macOS-Host sowie Docker mit Compose v2 für die Container-Befehle. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, Tag `v0.1.2`, Schnittstelle 1 |
| Registry-Schlüssel | `devcontainer` in `.dwp/config.json` |
| Konfiguration pro Repository | `.devcontainer/dck.toml` |
| Erkennung | `dck doctor --json` |

## Layer sind Opt-in

Die Basis-Images enthalten die Entwicklungswerkzeuge — git, gh, ripgrep, einen SSH-Server, Herdr und Neovim mit DeepWorkPlan Vim, per Tag fixiert — und keinen Coding-Agenten, keine Reporting-CLI und kein Geheimnis. Alles andere ist ein Layer, den Sie in `dck.toml` aktivieren:

| Layer | Standard | Was er hinzufügt |
|---|---|---|
| `agents` | aus | Installiert [coding-agents-kit](/kit/agentkit) und die von Ihnen aufgeführten CLIs, jede mit eigenem persistentem Volume. Es wird kein Flag zum Umgehen von Berechtigungen gesetzt. |
| `editor` | an | Neovim mit DeepWorkPlan Vim; ausgeschaltet gibt es einen einfachen Editor. |

## Sicherheitsvorgaben

- Jeder veröffentlichte Port bindet an `127.0.0.1`, sofern `dck.toml` nicht `bind` setzt.
- SSH-Agent-Forwarding vom Host; private Schlüssel des Hosts werden nie in einen Container kopiert.
- SSH-Host-Schlüssel werden zur Laufzeit in ein projektbezogenes Volume erzeugt und nie in ein Image eingebacken; der Server akzeptiert nur öffentliche Schlüssel, ohne Root-Login und ohne Passwörter.
- Das Template fügt kein `cap_add`, keinen `privileged`-Modus und keinen Docker-Socket hinzu.
- Basis-Images und Werkzeuge sind per Version fixiert und per Prüfsumme verifiziert; Compose referenziert das Basis-Image per Digest, wann immer sich der Digest auflösen lässt.

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform. v0.1 unterstützt Linux- und macOS-Hosts.
