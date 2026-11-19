---
title: Devcontainer
description: "Ein reproduzierbarer Dev-Container pro Repository aus einem Template: Agenten über ak auf Ihren Host-Konten, Herdr beidseitig, SSH-Schlüssel nur per Opt-in."
kind: addon
lang: de
order: 1
---

# Devcontainer-Addon

Geben Sie dem Repository einen reproduzierbaren, isolierten Entwicklungscontainer — einen, den Menschen, Editoren und Coding-Agenten gleichermaßen nutzen können. In **DWP v8** (Paket `v8.0.5`) integriert dieses Addon **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, ein MIT-Produkt, das ohne Deep Work Plan funktioniert. Es ist optional: Ein Repository ist auch ohne es vollständig konform.

Deep Work Plan hat vier Säulen: Spec-first, das Repository ist das Harness, Loop engineering und gemessene Effizienz. Addons und Integrationen können Harness und Loop erweitern; die Methodik funktioniert auch ohne sie.

## Was devcontainer-kit bereitstellt

- **Ein Template** auf Basis der [Dev Containers](https://containers.dev)-Spezifikation, das `dck init` in einem festen Layout in das Repository rendert: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` und `dev.sh`. Bei einem erneuten Lauf gleicht es ab und überschreibt nie Ihre Änderungen; jede Änderung an einer bestehenden Datei wird zuerst angezeigt und erfordert eine Einwilligung.
- **Der eigene Container des Repositorys.** Das Dockerfile startet vom offiziellen Image der Laufzeitumgebung, per Digest fixiert — `node-24`, `python-3.13` oder `debian` — und kopiert die Build-Schritte des Kits nach `docker/local/<service>/dck/`. Es ist kein gemeinsames Basis-Image beteiligt.
- **`dev.sh` und `dck`.** `bash dev.sh up` baut, startet und verbindet den Container aus einem einfachen Terminal; `shell`, `rebuild`, `doctor` und die übrigen Befehle funktionieren mit oder ohne VS Code oder Cursor.
- **Herdr in beide Richtungen.** Das [Herdr](https://herdr.dev) des Hosts bindet jeden Container über einen nur an Loopback gebundenen SSH-Server als Rechner ein, und der Container öffnet sich mit der Standard-Seitenleiste: App, Editor, Development und Agents. Jeder Workspace und jedes Pane, auch die später geöffneten, startet im App-Pfad (standardmäßig `/app`). Darin ermöglicht [herdr-peers](/kit/herdr) Agenten, Agenten auf dem Host und in anderen Containern zu befragen.
- **Der Skill `dck-dockerfile`.** Ein Agent erstellt oder regeneriert auf Anfrage den Container eines Repositorys und belegt ihn mit einem echten Build.

## Installation

```bash
git clone --branch v1.4.3 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Voraussetzungen: `bash` 3.2 oder neuer und `python3` 3.11 oder neuer auf einem Linux- oder macOS-Host sowie Docker mit Compose v2 für die Container-Befehle. Prüfen Sie ein Release anhand seines `SHA256SUMS`-Assets. Fixieren Sie `v1.4.3`: `v0.2.0` wird nicht unterstützt.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/devcontainer-kit`, Tag `v1.4.3`, Schnittstelle 2 |
| Registry-Schlüssel | `devcontainer` in `.dwp/config.json` |
| Konfiguration pro Repository | `.devcontainer/dck.toml` |
| Erkennung | `dck doctor --json` |

**Stabil seit `v1.0.0`.** Die öffentliche Schnittstelle folgt semantischer Versionierung und ändert sich inkompatibel nur in einer neuen Major-Version (und bei den Dateien mit einer neuen Schnittstellennummer): die `dck`-Verben mit ihren dokumentierten Flags und Exit-Codes (`0` ok, `1` fehlgeschlagen, `2` Aufruf, `3` Konfiguration, `4` Umgebung, `5` abgelehnt), die Schemas von `dck.toml`, Host-Profil und `dck doctor --json` (Schnittstelle 2) sowie der Render-Vertrag — die Dateien, die `dck init` schreibt und verwaltet, die `dck:managed`-Markierungen und Benutzerblöcke, die es bewahrt, und die Umgebung, die der Entrypoint liest. Ab `v0.3.7` bricht nichts: Führen Sie `dck init` und `dck rebuild` aus, damit das Image die aktuellen fixierten Versionen enthält. Das Image von `v1.4.3` enthält Herdr 0.9.5, herdr-peers 2.2.1, coding-agents-kit 1.5.0 und DeepWorkPlan Vim 1.1.0.

## Layer

Jeder Container enthält die Entwicklungswerkzeuge — git, gh, ripgrep, einen SSH-Server, Herdr und herdr-peers — und kein Geheimnis, sofern Sie sich nicht für [Host-Konten](#host-konten-im-container) entscheiden. Der Rest ist ein Layer, den Sie in `dck.toml` wählen:

| Layer | Standard | Was er hinzufügt |
|---|---|---|
| `agents` | aus | [coding-agents-kit](/kit/agentkit) aus seinem verifizierten Release und die von Ihnen aufgeführten CLIs, jede mit eigenem persistentem Volume, dazu die Presets `classic` (`claudex`, `codexx`, …) und `providers` (`claude-glm`, `codex-azure`, …). Agenten laufen standardmäßig in Autonomie — der Container ist die Sandbox. Opt-out: `AGENTKIT_PERMISSIONS=ask` in der `.env` des Service. |
| `editor` | an | Neovim mit [DeepWorkPlan Vim](/kit/vim), per Tag fixiert; ausgeschaltet gibt es einen einfachen Editor. |
| `dailybot` | aus | Die Dailybot-CLI, für das Dailybot-Addon. |

Anmeldungen, `gh`, die Herdr-Konfiguration und die Git-Identität überstehen `bash dev.sh rebuild`. Mit dem Layer `agents` enthält das Image außerdem die drei Skills von coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), die bei jedem Start in das Skills-Verzeichnis jedes Agenten verlinkt werden, sodass ein neu erstellter Container sie behält.

Das State-Volume (SSH-Host-Schlüssel, `~/.ssh`, `gh`-Anmeldung, Herdr-Client-Zustand, Verlauf) heißt `state`. Wenn sich mehrere Services ein Compose-Projekt teilen, geben Sie jedem mit `[compose] state_volume` in `dck.toml` (oder `dck init --state-volume NAME`) einen eigenen Namen; andernfalls binden alle dasselbe Volume ein, und `dck doctor` weist darauf hin.

## Agenten über Rechnergrenzen hinweg

Seit `v0.2.3` richtet `dck up` unter Docker Desktop ohne manuellen Schritt ein bidirektionales Mesh ein:

- **Container und Host.** Agenten im Container erreichen Herdr-Agenten auf dem Host, in jedem anderen dck-Container und in den anderen Loopback-Containern, die das Herdr Ihres Hosts bereits verwaltet — und diese erreichen sie umgekehrt ebenso. Jeder Peer trägt einen fixierten Host-Schlüssel; nichts wird bei der ersten Verwendung vertraut.
- **Ein optionaler Host-Listener.** `dck setup` bietet einmalig einen SSH-Server auf Benutzerebene an `127.0.0.1` an, der nur den dck-Schlüssel akzeptiert und von launchd (macOS) am Laufen gehalten wird. Wenn Sie bereits einen Loopback-Listener betreiben, verweisen Sie das Host-Profil stattdessen darauf. `dck host listener disable` entfernt ihn.
- **Übersteht Rebuilds.** Der Herdr-Rechnerkatalog des Containers liegt auf einem Volume, sodass `bash dev.sh rebuild` jeden darin registrierten Rechner beibehält. Seit `v0.3.2` führen `rebuild`, `start` und `restart` dieselben Schritte aus wie `up`: Der Container wird erneut beim Herdr des Hosts registriert, sein Host-Schlüssel neu fixiert und das Mesh verteilt, sodass ein von Grund auf neu gebauter Container den Host und seine Peers sofort erreicht.
- **Codex-Panes im Container.** Ein Codex-Agent braucht `HERDR_PEERS_SELF`, die Rechner-ID des Containers, wie sie auf dem Host gespeichert ist, um Peers auf anderen Rechnern anzufragen. Seit `v0.3.3` hält das Kit diese ID bei jeder Registrierung fest, und die Login-Shells des Containers exportieren sie, sodass kein Agent sie von Hand setzt; `dck doctor` meldet eine Abweichung. Seit `v0.3.4` überspringen die containereigenen Codex-Konfigurationen die Update-Prüfung von Codex beim Start und seinen Hintergrund-Daemon (das Kit fixiert jede CLI-Version), ohne je das Codex-Home Ihres Hosts oder ein geteiltes Profil anzutasten.
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

Das gesamte Agentkit-Home wird nie eingebunden, und Profile mit absoluten Host-Pfaden werden übersprungen. Eine mit Schreibzugriff geteilte Codex-Anmeldung kann von zwei Schreibern gleichzeitig erneuert werden: Halten Sie einen aktiven Agenten pro Codex-Konto. `[agents] default_profile` im Host-Profil (zum Beispiel `{ claude = "@work3" }`) sorgt dafür, dass ein bloßes `ak claude` im Container dieses geteilte Konto nutzt (coding-agents-kit ≥ `v0.5.2`); eine `@default`-Anmeldung von Claude unter macOS liegt im Schlüsselbund (Keychain) und lässt sich nicht teilen. Seit `v0.3.4` richten die Shells des Containers auch ein bloßes `claude` oder `codex` auf dieses Konto aus, sodass Panes, die Herdr wiederherstellt, darauf statt auf einem Anmeldebildschirm öffnen. Im Container läuft dasselbe `ak <kind> @<profile>` auf demselben Konto wie auf dem Host; das erlaubt einem Lead, Container-Lanes die Konten zu übergeben, die `ak pick` gewählt hat — siehe [Viele Agenten betreiben](/methodology/06-orchestration).

## Mehrere Repositories, ein Compose-Stack

Seit `v0.3.3` kann ein Repository, dessen Service Teil eines größeren Compose-Projekts ist (eine API, eine Web-App, Worker und eine Datenbank, die sich ein Projekt teilen), diesem beitreten, ohne dass Sie von Hand bearbeiten, was dck rendert. Alles ist additiv: Ein Repository, das keinen dieser Schlüssel setzt, wird genau wie bisher gerendert.

- **Ein Projekt, ein State-Volume pro Service.** `[compose] project` benennt in jedem Repository das gemeinsame Projekt; `state_volume`, `[compose] networks` und `[compose] volumes` halten den Zustand jedes Service sowie die Daten-Volumes und Netzwerke des Stacks auseinander.
- **Ein Benutzerblock.** Zeilen zwischen `# >>> user:<service> >>>` und `# <<< user:<service> <<<` innerhalb des dck-Service bleiben unverändert erhalten: einfache Schlüssel für das, was dck nicht rendert (`depends_on`, `healthcheck`), und `x-dck-merge:` für Schlüssel, die dck rendert. Eine Datei, die nur einen Teil der dck-Markierungen enthält, wird mit Hinweis auf die Korrektur abgelehnt statt neu geschrieben.
- **Port-Strings.** `ssh_port` und `ports` akzeptieren Compose-Ausdrücke wie `"${API_PORT:-8000}:8000"`; sie bleiben auf `127.0.0.1`, sofern der String keine Host-IP nennt.
- **Gemeinsame Builds und ein eigener Launcher.** `[build] context` und `[build] dockerfile` decken ein Dockerfile ab, das mehrere Services teilen; `dev_sh = false` behält das eigene `dev.sh` eines Repositorys.
- **Workspace-Satelliten.** Seit `v0.3.5` startet und stoppt eine zweite Instanz des Service in einem eigenen Compose-Projekt über dck (`dck --project P --compose-file F --service S up` oder `down`) und erhält so denselben Host-Schlüssel, dieselben Konten, dieselbe Git-Identität und denselben Herdr-Rechner wie die Hauptinstanz; `up --seed-state-from VOLUME` kopiert nur die Anmeldungen in ihr leeres State-Volume. In einer Overlay-Datei muss `extends` die Datei nennen, die es erweitert.
- **Node für Agenten.** Das eigene Node der Agenten liegt unter `/opt/dck/node` und ersetzt nie das des Images; `[agents] node_first = true` stellt es im PATH an die erste Stelle, wenn die Werkzeuge des Repositorys das brauchen.

## Die SSH-Schlüssel des Hosts im Container

Manche Werkzeuge lesen nur Schlüsseldateien und ignorieren den weitergeleiteten Agenten: `gh auth login` etwa bietet an, einen neuen Schlüssel zu erzeugen. Seit `v0.3.2` können Sie das per Opt-in aktivieren, und zwar nur in Ihrem **Host-Profil** (die `dck.toml` eines Repositorys kann es nicht setzen; `dck setup` fragt einmal, Standard ist Nein):

```toml
[ssh]
copy_keys = true              # default false
```

Solange die Option aktiv ist, bindet `dck up` das `~/.ssh` des Hosts schreibgeschützt unter `~/.ssh_host` ein, und jeder Start kopiert dessen `id_*`-Schlüssel in das `~/.ssh` des Containers (private Schlüssel `0600`), synchron mit dem Host. Die Agent-Weiterleitung bleibt unverändert, und das Abschalten entfernt die Kopien beim nächsten Start. Der Preis: Das gesamte `~/.ssh` des Hosts ist im Container lesbar, und die privaten Schlüssel liegen im State-Volume.

## Ab devcontainer-kit 1.3.0 (Schnittstelle 2)

Release 1.3.0 behält Schnittstelle 2 bei und fügt einen optionalen Schlüssel hinzu; ein Repository, das ihn nicht setzt, wird genau wie bisher gerendert.

- **`[compose] container_only`.** Die hier aufgeführten Unterpfade des Workspace werden als projektbezogene benannte Volumes (`co-<path-slug>`, zum Beispiel `co-app-node_modules` über `/app/node_modules`) mit Lese- und Schreibzugriff im Haupt-Service eingebunden. Was der Container dort baut, gelangt nie in den Checkout des Hosts. Der Fall, für den es existiert: Der Workspace ist ein Bind-Mount, und eine `npm`- oder `pnpm`-Installation im Container auf einem macOS- oder Windows-Host ersetzt `node_modules` durch den Build der eigenen Plattform und beschädigt damit die Installation des Hosts.
- **Besitz bei jedem Start.** Der Entrypoint übergibt jeden Mount-Punkt bei jedem Containerstart an den konfigurierten Benutzer; sobald der Benutzer ihn besitzt, bewirkt dies nichts.
- **Ein Mount pro Pfad.** Ein Pfad, den auch der Benutzerblock einbindet, wird abgelehnt, ebenso ein abgeleiteter Volume-Name, der bereits von `compose.state_volume` oder `[compose] volumes` verwendet wird. Das `dck.toml`-Schema (`dck-config-v2.json`) erhält den Schlüssel.

Das Image von 1.3.0 enthielt dieselben Versionen wie 1.2.0: herdr-peers 1.3.1, coding-agents-kit 1.4.0 und DeepWorkPlan Vim 1.0.1, dazu das vendorisierte Paket 7.12.1.

## Ab devcontainer-kit 1.4.0 (Schnittstelle 2)

Release 1.4.0 behält Schnittstelle 2 bei und aktualisiert die Versionen, die das Image enthält; die eigene Oberfläche von dck bleibt unverändert.

- **herdr-peers 2.1.0 (Protokoll 2).** Die Ernennung eines Leads auf ausdrückliche Anweisung des Menschen, das optionale, im Fehlerfall sperrende Autopilot-Brain und die Plan-Warteschlange kommen mit 2.0.0; Anfragen, Hinweise und Antworten bleiben mit Peers der Version 1.x kompatibel. 2.1.0 fügt die Ansichten von `fleet ui` hinzu, lehnt eine Berechtigung, die der Daemon nicht annehmen kann, ab, statt den Agenten warten zu lassen, und liest die Blocker-Klassen des Pakets 8.0. dck startet den Daemon nie.
- **coding-agents-kit 1.5.0 (Schnittstelle 1).** Unter `AGENTKIT_PERMISSIONS=ask` oder `--ask` wird der eigene Nachfragemodus jeder CLI durchgesetzt, sodass ein Konto, dessen Einstellungen standardmäßig einen autonomen Modus vorsehen, nicht mehr autonom startet; `ak run --json` meldet Token-Zahlen nur, wenn die CLI sie meldet. Die Schicht `agents` setzt weiterhin kein Autonomie-Flag.
- **DeepWorkPlan Vim 1.1.0.** Dasselbe Neovim (0.12.5); der Editor zeigt die Plan-Warteschlange, die strukturierten Blocker und die Autonomie-Haltung des Pakets 8.0 schreibgeschützt an, und ein v7-Plan wird wie bisher dargestellt.
- **Das Repository nutzt DeepWorkPlan 8.0.1 selbst.** Neue Pläne schreiben `plan-contract/v8`; Pläne der Generationen v7, v6 und v5 behalten ihre Generation.

## Ab devcontainer-kit 1.4.1 (Schnittstelle 2)

Release 1.4.1 ist ein Patch: Das Image enthält herdr-peers 2.2.0, das das optionale `autopilot --loop --revive` ergänzt (ein neuer Agent für einen Plan, dessen Lead und Nachfolger alle fehlen, freigegeben von dem Menschen, der den Daemon startet), und das Repository nutzt DeepWorkPlan 8.0.2. Schnittstelle 2, coding-agents-kit 1.5.0, DeepWorkPlan Vim 1.1.0 und die eigene Oberfläche von dck bleiben unverändert; dck startet den Daemon nie.

## Ab devcontainer-kit 1.4.2 (Schnittstelle 2)

Release 1.4.2 ist ein Patch: Das `node-24`-Image wechselt auf das Sicherheitsrelease Node 24.22.3 (1.4.1 pinnte 24.21.0, sodass `dck init` ein Repository auf 24.22.x herabstufen konnte), und der Zustand von herdr-peers — das Delegationsprotokoll, die Lead-Einträge, die Antworten und der Autopilot-Zustand unter `~/.local/state/herdr-peers` — bleibt nun auf dem Zustandsvolume des Containers (Modus 0700) und übersteht einen Neubau. Schnittstelle 2, herdr-peers 2.2.0, coding-agents-kit 1.5.0 und DeepWorkPlan Vim 1.1.0 bleiben unverändert.

## Ab devcontainer-kit 1.4.3 (Schnittstelle 2)

Release 1.4.3 ist ein Patch: Das Image wechselt zu Herdr 0.9.5, das jetzt von `herdrdev/herdr` (wohin das Projekt umgezogen ist) geladen und gegen die Release-Digests des Herstellers geprüft wird – 0.9.4 hält den Herdr-Server am Laufen, wenn die Shell, die ihn gestartet hat, geschlossen wird –, und zu herdr-peers 2.2.1, dessen `autopilot --loop --revive` ohne coding-agents-kit 1.3.0 oder neuer nicht startet. Schnittstelle 2, coding-agents-kit 1.5.0, DeepWorkPlan Vim 1.1.0 und die eigene Oberfläche von dck bleiben unverändert; dck startet den Daemon nie.

## Sicherheitsvorgaben

- Jeder veröffentlichte Port bindet an `127.0.0.1`, sofern `dck.toml` nicht `bind` setzt.
- Git über SSH läuft über den SSH-Agenten des Hosts — dessen Socket, nie eine Schlüsseldatei und nie ein eingebundenes `~/.ssh` oder `~/.gitconfig`, es sei denn, Sie haben [`copy_keys`](#die-ssh-schlüssel-des-hosts-im-container) in Ihrem Host-Profil aktiviert. Die Git-Identität stammt aus `DCK_GIT_*`-Werten, die `dck setup` ausfüllt.
- SSH-Host-Schlüssel werden zur Laufzeit in ein projektbezogenes Volume erzeugt und nie in ein Image eingebacken; der Server akzeptiert nur öffentliche Schlüssel, ohne Root-Login und ohne Passwörter.
- Das Template fügt kein `cap_add`, keinen `privileged`-Modus und keinen Docker-Socket hinzu.
- Jeder Download ist per Version fixiert und per Prüfsumme verifiziert; das Basis-Image ist per Digest fixiert.
- Das Herdr-Mesh, über das Agenten in einem Container die anderen erreichen, ist standardmäßig aktiv und im Bedrohungsmodell des Kits mit seinen Abschaltmöglichkeiten dokumentiert. Der Host-Listener erlaubt Code in einem laufenden Container, auf dem Host eine Shell unter Ihrem Benutzer zu öffnen: Er ist Opt-in, nur über Loopback erreichbar, akzeptiert nur den dck-Schlüssel und lässt sich mit `dck host listener disable` entfernen.

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform. Linux- und macOS-Hosts werden unterstützt; das Mesh zwischen Containern erfordert Docker Desktop.
