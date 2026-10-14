---
title: "DWP v7: Pläne, die delegieren – mit Nachweis über alles"
description: "Deep Work Plan v7 behält Vertrag und Journal von v6, lässt einen Plan begrenzte Aufgaben an andere Agenten übergeben und ergänzt vier optionale Addons."
date: 2026-10-09
version: "v7 · Delegation mit Nachweis"
kind: release
lang: de
order: 0
featured: true
sourceLabel: "Veröffentlichter v7-Schemasatz"
sourceUrl: "https://deepworkplan.com/schema/plan-contract/v7.json"
sourceLinks:
  - label: "Plan contract schema v7"
    url: "https://deepworkplan.com/schema/plan-contract/v7.json"
  - label: "Plan manifest schema v7"
    url: "https://deepworkplan.com/schema/plan-manifest/v7.json"
  - label: "Journal event schema v7"
    url: "https://deepworkplan.com/schema/journal-event/v7.json"
  - label: "Skill release v7.7.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.7.0"
  - label: "Skill release v7.8.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.0"
  - label: "Skill release v7.8.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v7.8.1"
---

Deep Work Plan v7 behält die Methode von v6 bei: Der Vertrag ist die Autorität, das nur anhängbare Journal ist das Gedächtnis, der Scheduler entscheidet, was als Nächstes läuft, und eine Aufgabe wird erst abgeschlossen, wenn aufgezeichnete Nachweise ihre Kriterien erfüllen. v7 ergänzt die Möglichkeit zu delegieren und hält dieselbe Disziplin beim Ergebnis ein.

Ein Plan, der `agent_delegation` gewährt, kann eine Aufgabe als `parallel_safe` markieren und an einen anderen Agenten übergeben. Die Antwort des Delegierten wird als Daten aufgezeichnet, niemals als Anweisung, und bleibt `asserted`, bis der Gate-Runner des Plans das Ergebnis selbst beobachtet. Nur der Runner erzeugt `observed`-Nachweise, sodass die Delegation die Reichweite erhöht, ohne die Anforderung für den Abschluss zu senken.

Vier optionale Addons machen aus Delegation praktische Autonomie. Herdr übergibt eine Aufgabe an einen Agenten in einem Pane, auf jeder Maschine. Agentkit legt einen einzigen `ak`-Befehl über alle Terminal-Coding-Agenten, standardmäßig mit Autonomie und mit Opt-out, und führt begrenzte Aufgaben headless in einem Git-Worktree aus. Devcontainer gibt jedem Repository einen reproduzierbaren Container standardmäßig ohne SSH-Schlüssel im Inneren (Git über SSH durch den Host-Agenten; Schlüsseldateien nur bei einem ausdrücklichen Opt-in über `[ssh] copy_keys`). DeepWorkPlan Vim ist ein Terminal-Editor mit Plan-Browser und Markdown-Viewer. Jedes Addon ist per Tag an ein Produkt mit eigenem Repository gebunden und funktioniert ohne Deep Work Plan. Ein Repository ist auch ohne eines davon vollständig konform, und die Registry in `.dwp/config.json` hält fest, welche aktiviert sind.

Der Modus für Benchmark und Erkenntnisse zeichnet auf, was jeder Plan lehrt, damit die Befunde danach analysiert werden können. Ein Audit des gesamten Ökosystems, durchgeführt als v7-Orchestrator-Plan mit einem Agenten pro Repository, fand keine Verhaltensregression gegenüber v6: Die Suite des Pakets besteht 807 von 807 Tests in einer sauberen Umgebung, und die Instruktionslast stieg je Ablauf um 0.1% bis 3.9% (4.6% für das gesamte Paket), gemessen in Bytes auf beiden Tags statt als Token geschätzt.

v7 ist ein Fortschritt bei Orchestrierung und Auditierbarkeit, aber noch keine vollständig eingriffsfreie Autonomie. Release 7.2.0 schließt die Lücken, die dieses Audit gefunden hat: Benchmark und Erkenntnisse messen jetzt v7-Pläne, der Start einer Aufgabe vor Abschluss ihrer Voraussetzungen wird abgelehnt, und die Testsuite läuft hermetisch (815 von 815 in einer sauberen Umgebung). Die Nichtunterlegenheit der Agentenergebnisse wurde nicht gemessen. Bestehende Pläne behalten ihre aufgezeichnete Generation und werden nie implizit migriert; neue Pläne verwenden standardmäßig den v7-Vertrag.

Release 7.6.0 (2026-10-11) führte Orchestrierung im großen Maßstab ein: eine Lane pro Repository oder Arbeitsstrang, Konten nach verbleibendem Spielraum gewählt (`ak usage`, `ak pick`), unbeaufsichtigter Start und ein Onboarding, das jedes Addon erkennt, die genutzten aktualisiert und die passenden anbietet.

Release 7.7.0 (2026-10-12) lieferte Schwarm-Autonomie (Guide §17): die Kapazitätsschleife (`shared/swarm.py`), Übergabepakete (`dwp-handoff-v1`), Lead-Nachfolge mit Epochen und Fencing, Anfragen von Lane zu Lane, die Eskalationstaxonomie aus AGENT_PROTOCOL §7.5 (C1–C7: alles andere entscheiden und aufzeichnen), die Qualitätslatte (Gates sind Hypothesen, verifiziert statt behauptet) und methodische Erkenntnisse aus 313 ausgeführten Plänen in 23 Repositories. Bekannte Einschränkung: Das v7-Journal besitzt kein eigenes Ereignis für eine Lane-Übergabe oder eine Lead-Nachfolge (sie werden als abgebrochene Delegation plus Beobachtung aufgezeichnet).

Release 7.8.0 (2026-10-13) etablierte Ecosystem 1.0: Jedes vom Paket integrierte Produkt erreichte sein erstes stabiles Release und ist unter semantischer Versionierung auf v1.0.0 festgelegt (coding-agents-kit, herdr-peers, devcontainer-kit und deepworkplan-vim, jeweils mit verifiziertem `SHA256SUMS`-Digest), neben den festgelegten Versionen AI Diff Reviewer v3.3.14 und Dailybot agent-skill v3.23.17; 7.8.1 (2026-10-14) legte anschließend die Patch-Releases v1.0.1 von coding-agents-kit und devcontainer-kit fest.

Installierte Skill-Version: **7.8.1**, stabil seit 7.0.0.
