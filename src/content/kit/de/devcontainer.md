---
title: Devcontainer
description: "Ein reproduzierbarer Dev-Container pro Repository aus einem Template: Agenten über ak auf Ihren Host-Konten, Herdr in beide Richtungen, kein SSH-Schlüssel."
kind: addon
lang: de
order: 1
---

# Devcontainer-Addon

Geben Sie dem Repository einen reproduzierbaren, isolierten Entwicklungscontainer — einen, den Menschen, Editoren und Coding-Agenten gleichermaßen nutzen können. In **DWP v7** (Paket `v7.5.1`) integriert dieses Addon **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, ein MIT-Produkt, das ohne Deep Work Plan funktioniert. Es ist optional: Ein Repository ist auch ohne es vollständig konform.

## Was devcontainer-kit bereitstellt

- **Ein Template** auf Basis der [Dev Containers](https://containers.dev)-Spezifikation, das `dck init` in einem festen Layout in das Repository rendert: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` und `dev.sh`. Bei einem erneuten Lauf gleicht es ab und überschreibt nie Ihre Änderungen; jede Änderung an einer bestehenden Datei wird zuerst angezeigt und erfordert eine Einwilligung.
- **Der eigene Container des Repositorys.** Das Dockerfile startet vom offiziellen Image der Laufzeitumgebung, per Digest fixiert — `node-24`, `python-3.13` oder `debian` — und kopiert die Build-Schritte des Kits nach `docker/local/<service>/dck/`. Es ist kein gemeinsames Basis-Image beteiligt.
- **`dev.sh` und `dck`.** `bash dev.sh up` baut, startet und verbindet den Container aus einem einfachen Terminal; `shell`, `rebuild`, `doctor` und die übrigen Befehle funktionieren mit oder ohne VS Code oder Cursor.
- **Herdr in beide Richtungen.** Das [Herdr](https://herdr.dev) des Hosts bindet jeden Container über einen nur an Loopback gebundenen SSH-Server als Rechner ein, und der Container öffnet sich mit der Standard-Seitenleiste: App, Editor, Development und Agents. Jeder Workspace und jedes Pane, auch die später geöffneten, startet im App-Pfad (standardmäßig `/app`). Darin ermöglicht [herdr-peers](/kit/herdr) Agenten, Agenten auf dem Host und in anderen Containern zu befragen.
- **Der Skill `dck-dockerfile`.** Ein Agent erstellt oder regeneriert auf Anfrage den Container eines Repositorys und belegt ihn mit einem echten Build.

## Installation

```bash
git clone --branch v0.2.11 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Voraussetzungen: `bash` 3.2 oder neuer und `python3` 3.11 oder neuer auf einem Linux- oder macOS-Host sowie Docker mit Compose v2 für die Container-Befehle. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets. Fixieren Sie `v0.2.11`: `v0.2.0` wird nicht unterstützt.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, Tag `v0.2.11`, Schnittstelle 2 |
| Registry-Schlüssel | `devcontainer` in `.dwp/config.json` |
| Konfiguration pro Repository | `.devcontainer/dck.toml` |
| Erkennung | `dck doctor --json` |

## Layer

Jeder Container enthält die Entwicklungswerkzeuge — git, gh, ripgrep, einen SSH-Server, Herdr und herdr-peers — und kein Geheimnis, sofern Sie sich nicht für [Host-Konten](#host-konten-im-container) entscheiden. Der Rest ist ein Layer, den Sie in `dck.toml` wählen:

| Layer | Standard | Was er hinzufügt |
|---|---|---|
| `agents` | aus | [coding-agents-kit](/kit/agentkit) aus seinem verifizierten Release und die von Ihnen aufgeführten CLIs, jede mit eigenem persistentem Volume, dazu die Presets `classic` (`claudex`, `codexx`, …) und `providers` (`claude-glm`, `codex-azure`, …). Agenten laufen standardmäßig in Autonomie — der Container ist die Sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in der `.env` des Service. |
| `editor` | an | Neovim mit [DeepWorkPlan Vim](/kit/vim), per Tag fixiert; ausgeschaltet gibt es einen einfachen Editor. |
| `dailybot` | aus | Die Dailybot-CLI, für das Dailybot-Addon. |

Anmeldungen, `gh`, die Herdr-Konfiguration und die Git-Identität überstehen `bash dev.sh rebuild`.

## Agenten über Rechnergrenzen hinweg

Seit `v0.2.3` richtet `dck up` unter Docker Desktop ohne manuellen Schritt ein bidirektionales Mesh ein:

- **Container und Host.** Agenten im Container erreichen Herdr-Agenten auf dem Host, in jedem anderen dck-Container und in den anderen Loopback-Containern, die das Herdr Ihres Hosts bereits verwaltet — und diese erreichen sie umgekehrt ebenso. Jeder Peer trägt einen fixierten Host-Schlüssel; nichts wird bei der ersten Verwendung vertraut.
- **Ein optionaler Host-Listener.** `dck setup` bietet einmalig einen SSH-Server auf Benutzerebene an `127.0.0.1` an, der nur den dck-Schlüssel akzeptiert und von launchd (macOS) am Laufen gehalten wird. Wenn Sie bereits einen Loopback-Listener betreiben, verweisen Sie das Host-Profil stattdessen darauf. `dck host listener disable` entfernt ihn.
- **Übersteht Rebuilds.** Der Herdr-Rechnerkatalog des Containers liegt auf einem Volume, sodass `bash dev.sh rebuild` jeden darin registrierten Rechner beibehält.
- **Antworten auch vom Host.** `dck setup` installiert ein verifiziertes [herdr-peers](/kit/herdr) auf dem Host, sodass `dck agents` und `dck ask` dort funktionieren und Host-Agenten mit `herdr-peers reply` antworten.
- **Container, die das Kit nicht erstellt hat.** Führen Sie die öffentlichen Schlüssel, mit denen sie sich anmelden, unter `[ssh] authorized_extra` in Ihrem Host-Profil auf, dann erreichen auch sie dck-Container.

Kombinieren Sie es mit [coding-agents-kit](/kit/agentkit) auf dem Host und im Container, und dasselbe `ak` startet Agenten auf beiden Seiten.

## Host-Konten im Container

Ein Container kann die Konten nutzen, die Sie auf dem Host bereits haben — so wie git bereits über den SSH-Agenten des Hosts arbeitet —, ohne Anmeldung im Container. Das ist Opt-in und liegt in Ihrem **Host-Profil**, nie in der `dck.toml` eines Repositorys:

```toml
[agents]
host_profiles = true          # Standard: false
host_env_keys = ["ZAI_CODING_API_KEY"]   # Allowlist der zu teilenden env-Namen
```

Mit aktiviertem `host_profiles` teilt `dck up` nur die Profile der CLIs, die das Repository installiert:

- **Claude Code** über ein langlebiges Token pro Profil: `CLAUDE_CODE_OAUTH_TOKEN` für `@default` und `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` für `@name` (das Suffix in Großbuchstaben, jedes Zeichen außerhalb von `A-Z`, `0-9` und `_` wird zu `_`).
- **Codex** über seine Auth-Datei, für `@default` und für jedes Profil.
- **Die env-Datei des Kits**, schreibgeschützt und auf die Namen in `host_env_keys` reduziert.

Das gesamte Agentkit-Home wird nie eingebunden, und Profile mit absoluten Host-Pfaden werden übersprungen. Eine mit Schreibzugriff geteilte Codex-Anmeldung kann von zwei Schreibern gleichzeitig erneuert werden: Halten Sie einen aktiven Agenten pro Codex-Konto. Im Container läuft dasselbe `ak <kind> @<profile>` auf demselben Konto wie auf dem Host; das erlaubt einem Lead, Container-Lanes die Konten zu übergeben, die `ak pick` gewählt hat — siehe [Viele Agenten betreiben](/methodology/06-orchestration).

## Sicherheitsvorgaben

- Jeder veröffentlichte Port bindet an `127.0.0.1`, sofern `dck.toml` nicht `bind` setzt.
- Git über SSH läuft über den SSH-Agenten des Hosts — dessen Socket, nie eine Schlüsseldatei und nie ein eingebundenes `~/.ssh` oder `~/.gitconfig`. Die Git-Identität stammt aus `DCK_GIT_*`-Werten, die `dck setup` ausfüllt.
- SSH-Host-Schlüssel werden zur Laufzeit in ein projektbezogenes Volume erzeugt und nie in ein Image eingebacken; der Server akzeptiert nur öffentliche Schlüssel, ohne Root-Login und ohne Passwörter.
- Das Template fügt kein `cap_add`, keinen `privileged`-Modus und keinen Docker-Socket hinzu.
- Jeder Download ist per Version fixiert und per Prüfsumme verifiziert; das Basis-Image ist per Digest fixiert.
- Das Herdr-Mesh, über das Agenten in einem Container die anderen erreichen, ist standardmäßig aktiv und im Bedrohungsmodell des Kits mit seinen Abschaltmöglichkeiten dokumentiert. Der Host-Listener erlaubt Code in einem laufenden Container, auf dem Host eine Shell unter Ihrem Benutzer zu öffnen: Er ist Opt-in, nur über Loopback erreichbar, akzeptiert nur den dck-Schlüssel und lässt sich mit `dck host listener disable` entfernen.

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform. v0.2 unterstützt Linux- und macOS-Hosts; das Mesh zwischen Containern erfordert Docker Desktop.
