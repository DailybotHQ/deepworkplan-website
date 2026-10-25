---
title: Herdr
description: "Übergib Arbeit an einen anderen Coding-Agenten im Herdr-Pane, auf jedem Rechner, und erhalte eine autorisierte Antwort. Pläne, die delegieren, protokolliert."
kind: addon
lang: de
order: 7
---

# Herdr-Addon

[Herdr](https://herdr.dev) bringt Coding-Agenten in Panes unter, auf Ihrem Rechner und auf Rechnern, die es über SSH erreicht. Dieses Addon lässt einen Deep Work Plan diese Agenten als **Peers** nutzen: Ein Plan kann eine abgegrenzte Aufgabe an einen Agenten in einem anderen Pane übergeben, genau eine autorisierte Antwort erhalten und einen Nachweis des Austauschs aufbewahren.

Es ist ein optionales Addon von **DWP v7** (pack `v7.9.0`). Die Methodik funktioniert ohne es genauso: Fehlt das Addon oder ist es deaktiviert, läuft jede Aufgabe wie bisher in der aktuellen Sitzung.

## Was es integriert

Das Addon ist ein schlanker Integrator. Die Arbeit erledigt **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, ein eigenständiger MIT-Skill, fixiert auf **`v1.1.0`**, der auch ohne Deep Work Plan nützlich ist. Er legt fest, was Herdr selbst offenlässt: wer antworten darf, wie die Antwort über Rechnergrenzen hinweg zurückfindet, wie zwei Agenten vermeiden, einander endlos zu antworten, und wo der Nachweis „Ich habe gefragt, es hat geantwortet“ liegt.

| Element | Wert |
|---|---|
| Produkt | `DailybotHQ/herdr-peers`, Tag `v1.1.0`, Protokoll 1 |
| Registry-Schlüssel | `herdr` in `.dwp/config.json` |
| Transport | interaktiv: ein Peer in einem Herdr-Pane |
| Stellt bereit | `subagents`, `cancel_children` |
| Erfordert | die `agent_delegation`-Freigabe des Plan-Vertrags |

**Stabil seit `v1.0.0`.** Die öffentliche Schnittstelle folgt semantischer Versionierung: die CLI-Verben und ihre dokumentierten Flags, die Exit-Codes `0`–`7`, die dokumentierten Variablen `HERDR_PEERS_*`, `DWP_PLAN` und `DWP_TASK`, Protokoll 1 sowie die JSON-Verträge `herdr-peers/lanes-v1`, `herdr-peers/lead-v1` und der Delegationsdatensatz. Eine inkompatible Änderung an einem davon erhöht die Major-Version, und eine Änderung des Wire-Formats erhöht zusätzlich die Protokollnummer. `v1.0.0` ändert kein Verhalten gegenüber `v0.3.3`, und 0.x-Releases werden nicht mehr unterstützt.

## Installation

Installieren Sie herdr-peers und den offiziellen Skill von Herdr, von dem es abhängt. Jeder Rechner, dessen Agenten antworten sollen, braucht den Skill ebenfalls.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v1.1.0 --skill herdr-peers -g -y
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

Mit dem Addon [devcontainer](/kit/devcontainer) auf devcontainer-kit `v1.0.1` bringt jeder dck-Container herdr-peers mit und tritt bei `dck up` dem Mesh bei: Seine Agenten können Agenten auf dem Host, in den anderen Containern und in den anderen Loopback-Containern des Hosts fragen und erhalten die Antwort zurück. `dck setup` installiert ein verifiziertes herdr-peers auf dem Host, sodass auch Host-Agenten antworten. Der Host-Listener und die zusätzlichen Schlüssel, die andere Container hereinlassen, sind Ihre Entscheidungen im Host-Profil des Kits; dieses Addon setzt sie nie. Seit herdr-peers (`v0.2.3`) führt jeder Rechner seinen eigenen Zustand (`$XDG_STATE_HOME/herdr-peers/<server>/`), sodass ein Checkout, den sich Host und Container teilen, ihre Aufzeichnungen nicht mehr vermischt, und seit devcontainer-kit (`v0.3.3`) exportiert der Container `HERDR_PEERS_SELF` selbst, sodass Codex-Agenten darin ohne Handgriff andere Rechner erreichen.

## Herdr oder Agentkit

Beide Addons implementieren dieselbe Delegationsschnittstelle — `launch`, `observe`, `collect`, `cancel` — mit unterschiedlichen Transporten.

| Situation | Verwenden |
|---|---|
| Eine abgegrenzte `parallel_safe`-Aufgabe mit deklarierter Ausgabe | [agentkit](/kit/agentkit) (headless `ak run` in einem Worktree) |
| Die Aufgabe erfordert Interaktion, läuft lange oder befindet sich auf einem anderen Rechner | Herdr (ein Peer in einem Pane) |

Für einen Lead, der viele Lanes gleichzeitig betreibt — Panes auf dem Host, in Containern und auf anderen Rechnern, jede auf einem eigenen Konto — listet `herdr-peers lanes` jede Lane mit ihrem Zustand auf, `herdr-peers status <pane>` klassifiziert den Bildschirm, auf dem eine blockierte Lane steht, und jeder Delegationsnachweis nennt das Konto und den Anbieter, die sie getragen haben. Siehe [Viele Agenten betreiben](/methodology/06-orchestration).

**Codex-Lanes nennen ihr Pane.** Codex führt die Befehle einer Lane über einen Hintergrundserver aus, den sich alle Sitzungen dieses Kontos teilen; die geerbte Pane-ID kann also zu einer anderen Lane gehören. Eine Codex-Lane übergibt ihr eigenes Pane aus dem Auftrag des Leads mit `--pane <pane>` bei jedem herdr-peers-Befehl (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

## Notices und Leitung

herdr-peers (`v0.3.2`) ergänzt, was einen Schwarm seinen Lead überdauern lässt ([Schwarmautonomie](/de/methodology/07-swarm-autonomy)):

- **Notices.** `herdr-peers notify <addr|lead> "<text>" --pane <pane>` sendet eine Einweg-Nachricht mit dem Stempel `reply=no`. Das `check` des Empfängers klassifiziert sie als Notice, hält sie als Daten fest und antwortet nie. Notices belegen keinen Fan-out-Platz und dürfen gesendet werden, während ein ask offen ist; verwenden Sie sie für Übergabeankündigungen, Lead-Wechsel und Release-Rundsendungen.
- **Ein Lead-Eintrag pro Plan.** `herdr-peers lead claim --plan <P> --succession <A,B> --lanes <A,B>` macht einen Agenten zum Lead eines Plans; `lead show` gibt den Eintrag aus (Schema `herdr-peers/lead-v1`: Plan, Lead, Epoche, Nachfolge, Lanes, Aktualisierungszeit). `lead handover <addr> --plan <P>` gibt die Leitung weiter, `lead takeover --plan <P>` lässt den ersten erreichbaren Stellvertreter sie übernehmen, wenn der Lead verschwunden ist, und `lead release --plan <P>` beendet sie. Jede Änderung erhöht die Epoche und benachrichtigt jede Lane. Beanspruchen Sie den Plan, bevor Sie seine Lanes starten: `lead` wird erst aufgelöst, sobald ein Eintrag existiert. Ab `v0.3.2` hält der Eintrag das beanspruchende Repository lokal fest und lehnt einen Anspruch auf dieselbe Plan-ID aus einem anderen Repository ab; benennen Sie diesen Plan `--plan <repo>/<id>`.
- **Fencing.** Eine Lane akzeptiert eine Lead-Notice nur von dem Agenten, der ihr den Auftrag gab (erste Übernahme), vom aktuellen Lead in der nächsten Epoche (Übergabe) oder vom ersten erreichbaren Nachfolgeeintrag in der nächsten Epoche (Übernahme im Ausfall). Alles andere wird festgehalten und ignoriert, und ein zurückkehrender Lead, der eine höhere Epoche sieht, tritt zurück.
- **Die Adresse `lead`.** `ask lead …` und `notify lead …` werden zum aktuellen Lead von `--plan` aufgelöst (sonst `$DWP_PLAN`), sodass kein Lane-Auftrag das Pane des Leads fest einträgt.
- **`usage_limit`-Bildschirme.** `status` und `lanes` erkennen die Nutzungslimit-Meldung einer CLI als Bildschirmklasse `usage_limit`, deren nächster Schritt eine Übergabe ist. Sie wird nie per Tastendruck beantwortet. `lanes --json` ergänzt den Plan, seinen Lead, die Epoche und die zuletzt gemeldete Kapazität jeder Lane.

Lanes dürfen einander auch um Informationen und Koordination bitten — eine Schnittstelle, einen Flag-Namen, einen Branch-Zustand —, aber nur der Lead weist Arbeit zu. Tiefe eins und die Fan-out-Grenze gelten weiterhin. Mit `v0.2.x` gibt es weder Notices noch Lead-Einträge: Lanes fragen die Adresse des Leads aus ihrem Auftrag, und einen Lead-Wechsel gibt der Entwickler weiter.

## Debatten

herdr-peers 1.1.0 ergänzt einen nativen **debate**-Sub-Skill (`debate.md`): Ein Lead-Agent führt ein Panel von Peers in Herdr-Panes durch Runden und schließt mit einem einzigen Ergebnis ab, dem der Mensch vertrauen kann, samt Belegen und abweichenden Meinungen. Nutzen Sie ihn nur, wenn der Mensch eine Debatte, ein Panel, ein Red Team, eine Recherche aus mehreren Agenten oder Blickwinkeln oder ein zweites Panel zu einem Ergebnis verlangt; die Meinung eines einzelnen Agenten ist ein einzelnes Ask.

- **Zuerst der Zweck.** Der Lead wählt den Zweck – **entscheiden**, den Stand der Technik **recherchieren**, einem **Stresstest** unterziehen, **verifizieren** oder **generieren** –, und jeder hat seine Formate, seine Zählweise und sein Ergebnisdokument. Zwecke lassen sich verketten (recherchieren → entscheiden, entscheiden → verifizieren), und eine Debatte wird als schnell, standard oder tief bemessen.
- **Der Vertrag des Leads.** Der Lead stimmt nie ab; die Worte des Menschen werden wörtlich übernommen; Briefings erreichen das Panel über einen einzigen Kanal; jedes Pane schreibt seine Eingabe auf die Platte und antwortet mit einer Zeile; kein Pane führt externe Aktionen aus.
- **Formate.** Recherche nach Blickwinkeln, klassische Runden, Entwurfspaket, Kreuzverhör Behauptung für Behauptung, erst Red Team, dann Verteidiger, erst Steelman, dann Urteil, blinde Challenge mit frischem Kontext, Replikationspanel und divergente Vorschläge. Eine Entscheidung endet immer in einem erzwungenen Urteilsraum.
- **Das Verb `herdr-peers debate`.** `tally` zählt Rangstimmzettel und Urteile je Punkt aus (Borda, Copeland, paarweise Duelle, Condorcet-Sieger und -Verlierer); `claims` führt die Behauptungsregister der Lanes zu Status wie etabliert, umstritten oder widerlegt zusammen – ein Quorum, keine Verifikation; `anon` kopiert Eingaben unter anonymen Namen, die Zuordnung liegt in einem privaten Schlüssel; `filings` listet vorhandene, fehlende und zu kurze Eingaben, sodass nur fehlende Panes erneut gefragt werden.
- **Das Panel besetzen.** `panel` schlägt ein Panel vor und führt nichts aus. Die Plätze werden reihum über die Modellanbieter verteilt, und innerhalb eines Anbieters kommt der Platz mit dem meisten Kontingent zuerst – aus freien Panes und, wenn agentkit (`ak`) installiert ist, aus den Konten, die `ak pick` vorschlägt. Ohne `ak` empfiehlt es coding-agents-kit (optional, `v1.0.1` oder neuer).
- **Vorlagen.** Sechzehn Vorlagen unter `templates/debate/`, von der Notiz des Menschen und den Recherche-, Stresstest- und Rundenbriefings über die Stimmzettel- und Behauptungsdateien und das Übergabepaket des Leads bis zu den Protokollen für Entscheidung, Stand der Technik, Stresstest und Replikation.
- **Zustellung an einen blockierten Peer.** `reply` und `notify` wiederholen die Zustellung an einen Peer, der an einer Rückfrage hängt, bis zu `--wait-blocked` Sekunden lang; es bleibt genau eine Antwort.

Die Version ist rein additiv: Protokoll 1 und alle Verben, Flags, Exit-Codes und JSON-Verträge bleiben unverändert.

## Hinweise

Optional und nie erforderlich. Ein Repository ist mit null optionalen Addons vollständig konform, und kein Ablauf hängt von diesem ab. Der Round-Trip über zwei Panes und Rechnergrenzen hinweg ist durch Tests gegen ein simuliertes Herdr abgedeckt; planen Sie einen beaufsichtigten ersten Lauf ein.
