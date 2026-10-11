---
title: Viele Agenten betreiben
description: "Wie ein Lead viele Lanes zugleich in Panes, Containern und auf anderen Rechnern führt, auf Konten nach Spielraum, mit einem Branch und Release je Repository."
order: 6
lang: de
summary: Das Lead-und-Lanes-Modell zur Orchestrierung vieler Agenten über Panes, Rechner, Konten und Repositorys hinweg.
icon: network
---

# Viele Agenten betreiben

Ein Agent an einem Plan ist der Standardfall und deckt den Großteil der Arbeit ab. Manche Arbeit ist breiter als eine Sitzung: eine Änderung, die mehrere Repositorys überspannt, ein Release, das in einer bestimmten Reihenfolge landen muss, oder ein Backlog, für den ein einzelner Agent Tage bräuchte. DWP skaliert auf diese Arbeit, ohne seinen Vertrag zu ändern. Der Plan bleibt die maßgebliche Quelle, jede Aufgabe schließt weiterhin an ihrem eigenen Gate, und die zusätzlichen Agenten sind **Lanes**, die ein **Lead** koordiniert.

Dieses Kapitel beschreibt das Modell. Es nutzt drei optionale Addons — [Herdr](/de/kit/herdr) für Panes und Peers, [agentkit](/de/kit/agentkit) für Konten und [devcontainer](/de/kit/devcontainer) für Container —, und keines davon ist für einen Plan mit einem einzelnen Agenten erforderlich.

## Ein Lead und seine Lanes

Der **Lead** besitzt den übergeordneten Plan. Er legt die Lanes fest, übergibt jeder ihren Umfang, sammelt Meilensteine ein und gibt das Signal, das einer Lane das Mergen oder Veröffentlichen erlaubt. Er schreibt keinen Code einer anderen Lane.

Eine **Lane** ist ein Agent mit einem Umfang — in der Regel ein Repository. Sie liest das `AGENTS.md` dieses Repositorys, führt dessen Gate aus und hält ihren eigenen Plan im Repository. In einem [Orchestrator-Hub](/de/methodology/05-archetypes) liegt der übergeordnete Plan in `.dwp/plans/` des Hubs mit einer Tracking-Tabelle der Kind-Pläne, und der Plan jeder Lane liegt in ihrem eigenen Repository, mit dessen Plan-IDs und Gate.

| Rolle | Besitzt | Tut nie |
| --- | --- | --- |
| Lead | Den übergeordneten Plan, die Liste der Lanes, die Release-Reihenfolge, das GO | Das Repository einer Lane bearbeiten |
| Lane | Ein Repository: seinen Branch, Plan, Gate und Pull Request | Vor dem GO des Leads mergen oder veröffentlichen |

## Wo Lanes laufen

Eine Lane ist ein Agent in einem Terminal-Pane, und das Pane kann an mehreren Orten liegen. [Herdr](https://herdr.dev) bringt jeden Agenten in einem Pane unter und erreicht andere Rechner über SSH, sodass der Lead jede Lane in einer Seitenleiste sieht.

- **Auf dem Host.** Ein Pane pro Lane, neben dem Lead. Die schnellste Einrichtung, für Repositorys, in denen der Entwickler bereits arbeitet.
- **In einem Container.** Ein [devcontainer-kit](/de/kit/devcontainer)-Container tritt bei `dck up` dem Herdr-Mesh bei: Seine Agenten erreichen den Host und die anderen Container, und der Host erreicht sie. Der Container ist die Sandbox, daher können seine Agenten in Autonomie laufen.
- **Auf einem anderen Rechner.** Jeder Rechner, den Herdr über SSH erreicht, beherbergt Lanes auf dieselbe Weise, sofern dort ebenfalls herdr-peers installiert ist.

Der Ort ändert die Isolation, nicht das Protokoll: Eine Lane in einem Container und eine Lane auf dem Host koordinieren sich auf dieselbe Weise mit dem Lead.

## Konten und Anbieter nach Spielraum

Viele Agenten verbrauchen Kontingent schnell. Jede Lane läuft auf einem eigenen Konto — eine CLI und ein Profil in [coding-agents-kit](/de/kit/agentkit) —, sodass Lanes nicht dasselbe Fenster aufbrauchen und ein Konto, das an ein Limit stößt, eine Lane stoppt, nicht alle.

- **`ak usage`** zeigt das verbleibende Kontingent jedes Kontos und Profils, einmal pro Batch.
- **`ak pick <kind> --count N`** liefert die N Konten mit dem meisten Spielraum, das beste zuerst; `--exclude` hält ein ausgelastetes Konto heraus, `--model` zählt das Fenster eines einzelnen Modells und `--need` verweigert den Start ohne ausreichenden Spielraum.
- **`ak <kind> @<profile>`** startet den Agenten der Lane auf diesem Konto, in seinem Pane.

Anbieter lassen sich auf dieselbe Weise mischen. Eine Claude-Lane kann schreiben, während eine Codex-Lane prüft, jede auf dem Konto, das `ak pick` für ihre Art gewählt hat. Eine Container-Lane kann die Konten des Hosts nutzen: Ist `host_profiles` im devcontainer-kit-Host-Profil des Entwicklers aktiviert, erhält ein Container die Host-Profile der CLIs, die das Repository installiert — Claude über ein langlebiges Token pro Profil, Codex über seine Auth-Datei — und braucht keine eigene Anmeldung. Verwenden Sie nur Ihre eigenen Konten und halten Sie die Bedingungen jedes Anbieters ein: Verteilen Sie Arbeit auf sie, rotieren Sie Konten nie, um ein Limit zu umgehen.

## Lanes ohne Menschen starten und entsperren

Ein Lead kann Lanes starten und in Bewegung halten, ohne dass jemand an der Tastatur sitzt. Sobald der Entwickler unbeaufsichtigten Betrieb gewährt hat — eine dauerhafte Anweisung oder die Vorab-Autorisierung des Plans —, braucht kein einzelner Start eine weitere Freigabe. Der Lead nutzt dafür die eigenen Befehle von Herdr; kein Code des Kits sendet Tastendrücke. Das Vorgehen hat eine feste Reihenfolge: einmal vorbereiten, die Abfrage vermeiden, den Halt erkennen, Tasten nur in einem einzigen Fall senden, den Rest eskalieren.

1. **Einmal vorbereiten, als Entwickler.** Claude Code verlangt einmal pro Profil eine Bestätigung seines Bypass-Permissions-Modus. Diese Bestätigung ist ein eigener Schritt des Entwicklers, den er beim Anlegen des Profils ausführt; in einem devcontainer-kit-Container schreibt das Kit sie nur in die eigenen Home-Verzeichnisse des Containers. Kein Agent sendet je Tasten dafür.
2. **Vermeiden.** `ak pick <kind>` nennt das Konto mit dem meisten Spielraum, und `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` startet die Lane in ihrem eigenen Ordner. `--trust-cwd` (oder `AGENTKIT_TRUST_CWD=1`) vertraut diesem Ordner im Voraus, sodass Claude und Codex ihre Bildschirme zum Ordnervertrauen ohne Tastendrücke überspringen.
3. **Erkennen.** `herdr-peers lanes` (oder `herdr agent list`) zeigt jede Lane als arbeitend, untätig, blockiert oder fertig. Für eine Lane, die blockiert ist oder untätig ohne Ausgabe, klassifiziert `herdr-peers status <pane>` den Bildschirm, auf dem sie steht — Ordnervertrauen, Bypass-Bestätigung, Anmeldung, Berechtigung oder unbekannt — mit dem dokumentierten nächsten Schritt, und `herdr pane read <pane>` zeigt ihn an.
4. **Ein Tastendruck, ein Fall.** Die einzigen Tasten, die ein Lead senden darf, sind die Antwort auf einen Bildschirm zum Ordnervertrauen, in einem Pane, das er selbst gestartet hat, wenn `--trust-cwd` nicht verfügbar war. Er liest den Bildschirm, bevor er Tasten sendet, sendet die wenigsten Tasten, die ihn beantworten, und liest erneut.
5. **Alles andere lesen, festhalten und eskalieren.** Claudes Bestätigung des Bypass-Permissions-Modus, Anmelde- und Zugangsdatenabfragen, Berechtigungsanfragen pro Aktion, Bestätigungen destruktiver Schritte, Zahlungs- oder Tarifabfragen, unbekannte Bildschirme und Panes, die der Lead nicht erstellt hat, gehen als blockierter Meilenstein an den Entwickler, nie als Tastendrücke.
6. **Das Opt-out gewinnt.** Mit `AGENTKIT_PERMISSIONS=ask` fragen Lanes, bevor sie handeln, und der Lead umgeht nie eine Abfrage, die das Opt-out mit sich bringt.
7. **Neu starten.** Beendet sich ein Agent, startet der Lead ihn auf demselben Konto neu oder wählt ein anderes. Eine verlorene Anmeldung ist eine Zugangsdatenabfrage: Sie wird eskaliert.

Jeder Eingriff — was der Bildschirm zeigte, welche Tasten gesendet wurden, was folgte — wird im übergeordneten Plan protokolliert.

## Koordination über herdr-peers

Lanes und Lead kommunizieren über [herdr-peers](/de/kit/herdr): Ein **ask** trägt einen Stempel, der genau eine **reply** autorisiert, und jeder Austausch wird protokolliert. Der Lead hält das Protokoll klein:

- **Meilensteine nach oben.** Jede Lane meldet sich an festen Punkten — Plan bereit, Pull Request offen, blockiert, fertig — und arbeitet dazwischen weiter, ohne auf eine Antwort zu warten.
- **Fragen als asks.** Eine Lane, die eine Entscheidung braucht, fragt den Lead; der Lead antwortet mit einer reply.
- **Tiefe eins.** Auf eine reply wird nie geantwortet, und eine Lane delegiert nicht weiter. Der Fan-out pro Aufrufer ist begrenzt, standardmäßig auf vier Peers.
- **Daten, keine Anweisungen.** Eine reply gewährt nichts, was der Empfänger nicht schon hatte. Die Behauptung einer Lane, ihr Gate sei bestanden, wird geprüft, indem das Gate ausgeführt wird.
- **Ein Nachweis, wer was getan hat.** Jeder Delegationsnachweis nennt das Konto und den Anbieter der Lane, sodass der übergeordnete Plan zeigt, welches Konto welche Arbeit getragen hat.

Der Lead kann das gesamte Orchester auf einen Blick sehen: `herdr-peers lanes` listet jede Lane mit ihrem Zustand auf, und [DeepWorkPlan Vim](/de/kit/vim) zeigt die Lanes eines Orchestrator-Plans neben dem Plan selbst (`:DwpLanes`).

## Ein Branch, ein Release pro Repository

Die Regel, die viele Lanes überprüfbar hält, ist einfach: **eine Lane pro Repository, auf dessen Basis-Checkout, mit einem Branch, einem Pull Request und einem Release** für die gesamte Änderung. Die Lane verteilt ihre Arbeit nicht auf mehrere Branches oder Worktrees. Worktrees sind nur für den Fall gedacht, dass sich zwei Schreiber ein Repository teilen müssen: Jeder erhält seinen eigenen, sodass jeder Pfad genau einen Schreiber hat.

Der Pull Request bleibt offen, grün und für das Review gelabelt, bis das GO des Leads kommt. Dann mergt und taggt die Lane und meldet den Tag zurück.

## Release-Reihenfolge

Repositorys hängen voneinander ab, daher werden sie in Abhängigkeitsreihenfolge veröffentlicht: zuerst die Werkzeuge, dann das, was sie fixiert, dann die Dokumentation, die das Ergebnis beschreibt, dann die Verbraucher, die es übernehmen. Der Lead hält die Reihenfolge und gibt das GO jeweils für ein Repository. Eine Lane, die das Release eines anderen Repositorys fixiert, wartet auf dessen Tag, bevor sie die Fixierung schreibt, sodass keine Fixierung je auf ein Release zeigt, das nicht existiert.

## Checkpoints

Der übergeordnete Plan schließt auf Grundlage von Evidenz, nicht von Meldungen:

1. **Pro Lane.** Das Gate jeder Lane besteht auf ihrem eigenen Branch, und das Review ihres Pull Requests ist sauber. Das Review kann eine eigene Lane sein: Der [AI Diff Reviewer](/de/kit/ai-diff-reviewer) prüft den Pull Request jeder Lane, und mit dem [Dailybot](/de/kit/dailybot)-Addon meldet jede Lane ihren eigenen Fortschritt an das Team.
2. **Pro Release.** Jeder Tag existiert und fixiert, was das nächste Repository braucht.
3. **Integration.** Nach dem letzten Release führt ein Checkpoint die Verbraucher auf den veröffentlichten Versionen aus und hält das Urteil in `analysis_results/` des übergeordneten Plans fest.
4. **Abschließendes Review.** Eine Sicherheitsprüfung deckt alles ab, was eine Grenze überschritten hat — vor allem Konten, Tokens und in Container geteilte Dateien —, bevor der übergeordnete Plan abgeschlossen wird.

## Sicherheit

- Legen Sie nie einen Schlüssel, ein Token oder ein Geheimnis in ein ask, einen Prompt oder ein Log; verweisen Sie auf Variablen über ihren Namen.
- Geteilte Ressourcen erhalten eine Sperre: Eine Lane nimmt sie vor einem aufwendigen Schritt wie einem Container-Build und gibt sie danach frei.
- Das Berechtigungs-Opt-out gewinnt, wenn es gesetzt ist, für jede Lane und jeden Agenten, den eine Lane startet.
- Eine Lane, die nicht weitermachen kann, meldet dies als blockierten Meilenstein und hält an; der Lead entscheidet.
