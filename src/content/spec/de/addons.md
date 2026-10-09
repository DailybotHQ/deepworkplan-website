---
title: Add-ons
description: "DWP-Addons: sieben optionale Erweiterungen, die erforderliche lokale AI-Diff-Reviewer-Überprüfung mit optionaler CI-Oberfläche, Addon-Vertrag und Kit-Konzepte."
order: 6
lang: de
section: Addons
---

# Add-ons

> **Versionsumfang:** Dies ist ein beibehaltenes v5.0.0-Basisdokument. Der aktuelle Standard, DWP 7.0.0, verlangt zusätzlich die zutreffenden `V6_*.md`- und `V7_*.md`-Erweiterungen aus dem [Spezifikationsindex](/spec). Bestehende v5- und v6-Pläne behalten ihre aufgezeichneten Regeln.

**Version 2.1.0.** Add-ons sind Erweiterungen der zentralen Deep Work Plan-Methodik. Sieben der acht sind optional und **niemals für Konformität erforderlich** — ein Repository ohne optionale Addons ist vollständig AI-first und DWP-konform. Jedes optionale Addon wird beim Onboarding angeboten, explizit angenommen oder abgelehnt und — bei Annahme — mit bestehendem Setup **abgeglichen**, statt es zu überschreiben. Eine Komponente ist die deklarierte Ausnahme: Seit Standard 2.3.0 ist die **lokale Überprüfung des AI Diff Reviewer** Teil der erforderlichen Baseline — das Onboarding installiert sie und jedes Final Review führt sie aus —, während ihre CI-Oberfläche Opt-in bleibt.

## Der Addon-Vertrag

Jedes aktive Addon liefert vier obligatorische Komponenten:

| Komponente | Zweck |
|-----------|---------|
| **Spec** | Normative RFC-2119-Beschreibung dessen, was das Addon liefert und was „konform mit diesem Addon“ bedeutet |
| **Reasoning-Templates** | Leitfäden, die der Agent durch Schlussfolgerung über den Ziel-Repo-Stack ausfüllt — kein Copy-Paste |
| **Onboarding-Hook** | `SKILL.md`-Einstiegspunkt, den der `onboard`-Ablauf bei Annahme durch den Entwickler aufruft |
| **Validierungsschritt** | Checkliste, die bestätigt, dass das Addon korrekt angewendet wurde |

Discovery: Der `onboard`-Ablauf enumeriert `skills/deepworkplan/addons/` und präsentiert jedes Addon als Opt-in-Schritt in **Phase 7b**, nach dem zentralen Scaffolding.

## Aktive Addons (acht)

Acht Addons sind heute aktiv — sieben optionale plus die erforderliche lokale Überprüfung. Jedes hat eine **Kit-Katalogseite** mit nutzerorientierten Details und eine **normative Spec** innerhalb der Deep Work Plan-Skill. Vier davon — devcontainer, Herdr, DeepWorkPlan Vim und Agentkit — sind schlanke Integratoren, per Tag an ein Produkt mit eigenem Repository und eigenem Release-Zyklus fixiert; jedes Produkt funktioniert ohne Deep Work Plan. Ein angenommenes Addon wird in der Addon-Registry `.dwp/config.json` (DWP 7.0.0) erfasst, die nur anbieten oder verstärken kann — sie blockiert nie die Konformität oder einen Plan.

### Devcontainer (erstes Addon)

Ein schlanker Integrator von [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, fixiert auf `v0.1.4`): ein Dev-Containers-Template, das `dck init` in das Repository rendert.

- **Kit-Seite:** [Devcontainer](/kit/devcontainer)
- **Was es hinzufügt:** den `dck`-Launcher (`setup`, `up`, `shell`, `ssh`, `doctor`), Basis-Images in den Varianten `python-3.13`, `node-24` und `debian`, die ohne Coding-Agenten ausgeliefert werden (Agenten sind eine Opt-in-Schicht), Ports ausschließlich auf Loopback, SSH-Agent-Weiterleitung und optionale Herdr-Maschinen pro Container
- **Verhalten:** erkannt über `dck doctor --json` (Interface 1); `dck init` gleicht einen bestehenden Devcontainer erst ab, nachdem sein Diff akzeptiert wurde, und sichert die Datei vorher — niemals überschrieben
- **Wann angeboten:** die meisten Repos mit Docker oder Diensten, die von einem isolierten Dev-Container profitieren

### Dailybot (zweites Addon)

Eine optionale Verbindung zum **Dailybot-Team** des Entwicklers für Agenten-Fortschrittssichtbarkeit.

- **Kit-Seite:** [Dailybot](/kit/dailybot) — vollständige Fähigkeitsreferenz
- **Was das DWP-Addon verdrahtet:** vier Plan-Lifecycle-Reports (Kickoff, signifikante Aufgabe, blockiert, Abschluss) via dailybot-`report`-Sub-Skill; optionale deterministische Hook-Durchsetzung (`dailybot hook`, CLI `>= 3.9.0`)
- **Gepaarte Skill:** Installation von [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (aktuell **3.23.3**) exponiert **17 Fähigkeiten** — Chat in Slack/Teams/Discord/Google Chat, Check-ins, Formularerstellung, Ask AI, Kudos, Plan-Boards und -Aufgaben, Organisations-Labels, Per-Repo-API-Keys (`.dailybot/env.json`), E-Mail und mehr. Das DWP-Addon verdrahtet nur **report**; andere Fähigkeiten werden direkt über die Dailybot-Skill aufgerufen
- **Auth:** vollständig an die Dailybot-Skill delegiert (`dailybot login` oder `DAILYBOT_API_KEY`); dieses Addon speichert niemals Credentials
- **Vendor-neutrale Leitplanke:** zentrales DWP hat **null** Dailybot-Abhängigkeit; niemals für alle automatisch installieren
- **Wann angeboten:** Entwickler oder Team nutzt bereits Dailybot oder fragt explizit nach Team-Reporting

### Dependency upgrade (drittes Addon)

Paketmanager-agnostische, gebündelte, validierte, revertierbare Dependency-Upgrades.

- **Kit-Seite:** [Dependency upgrade](/kit/dependency-upgrade)
- **Was es hinzufügt:** erkennt den **echten** Manager des Repos (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), upgraded in semver-klassifizierten Batches, führt nach jedem Batch die Validierungs-Gate des Repos aus, revertiert Fehler, fasst zusammen ohne Auto-Commit
- **Befehl:** installiert `/lib-upgrade` in `.agents/commands/` nur bei Annahme
- **Wann angeboten:** für jedes Repository mit deklarierten Abhängigkeiten angeboten; der inerte `/lib-upgrade`-Delegator installiert sich unter der Onboarding-Zustimmung, sofern nicht ausdrücklich abgelehnt — eine Installation führt kein Upgrade aus

### Design system (viertes Addon)

Ein interface-oberflächenbezogenes `DESIGN.md`, das jeder Coding-Agent für konsistente UI-, CLI- oder Konversationsausgabe liest.

- **Kit-Seite:** [Design system](/kit/design-system)
- **Was es hinzufügt:** `docs/DESIGN.md` (referenziert aus `AGENTS.md`) mit bis zu drei **Profilen** in einer Datei: **visual-ui** (gerenderte UI-Tokens und Komponenten), **cli-output** (semantische Terminal-Stile, TTY/`NO_COLOR`-Degradation), **conversational** (Stimme, Nachrichtenanatomie, plattformspezifisches Rendering mit Plain-Text-Fallbacks)
- **Profilstärke:** die Erkennung macht das Angebot verpflichtend; die Installation ist zustimmungsgesteuert — im Guide- wie im Trust-Mode — visual-ui ist **bei Erkennung dringend empfohlen**; cli-output und conversational werden **bei Erkennung empfohlen, immer gefragt, niemals automatisch angewendet**
- **Wann angeboten:** nur wenn eine nutzerorientierte Interface-Oberfläche erkannt wird — nicht für reine Libraries, headless Services oder reine Infra-Repos

### AI Diff Reviewer (fünftes Addon — erforderliche lokale Überprüfung, optionale CI-Oberfläche)

Der **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (Marketplace **"AI Diff Reviewer"**) versieht den Sicherheitstest des obligatorischen Final Review mit einer strukturierten lokalen Überprüfung und sperrt optional Pull Requests in CI. Dieses Addon wird release-auto-aktualisiert, daher ist das unten gezeigte Tag das zum Zeitpunkt des Schreibens aktuelle und kann hinter der vendorten Kopie zurückliegen — maßgeblich für das tatsächlich installierte Tag sind die eigene `SKILL.md` des Addons und seine GitHub-Releases. Die Installation ist stets auf ein veröffentlichtes Tag festgelegt, nie auf einen beweglichen Branch. Seit Standard 2.3.0 ist die **lokale Überprüfung Teil der Baseline**; nur die CI-Oberfläche ist Opt-in.

- **Kit-Seite:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — vollständige Fähigkeitsreferenz
- **Beim Onboarding erforderlich (Phase 7a):** tag-gepinnte Installation der vendorten Skill (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) plus eine auf das Repo zugeschnittene `.review/extension.md` (via `generate-extension`), unter der Onboarding-Zustimmung; ein zielgerichtetes Harness-Upgrade gleicht beide ab, wenn sie fehlen; eine Ablehnung wird als deklarierte Ausnahme aufgezeichnet und von `verify` gemeldet, bis sie installiert ist
- **In jedem Final Review erforderlich:** der Sicherheitstest führt den übergeordneten Standardflow des Upstream-Skills über den akkumulierten Änderungssatz aus und hängt seine Ausgabe an die plan-lokale `analysis_results/SECURITY_REVIEW.md` (im eigenen Ordner des Plans, nie im Repository-Root) an; eine fehlende Skill oder Erweiterung ist ein aufgezeichneter `local reviewer not installed`-Befund — niemals ein stilles Überspringen, und niemals ein Überraschungs-Bootstrap: die Installation gehört zur Onboarding-Zustimmung oder zu einem expliziten Addon-Aufruf; **Verifizierte `critical`-Ergebnisse** eines abgeschlossenen Durchlaufs blockieren den Abschluss, bis sie behoben oder explizit akzeptiert sind (v3, BC-07 — unbestätigte kritische Behauptungen erscheinen als annotierte Warnungen, und ein `incomplete`-/`timeout`-Review ist kein sauberer Durchlauf, BC-04)
- **Optionale CI-Oberfläche (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`) via Upstream-`setup`-Sub-Skill, plus die Begleiter `apply-review` (nur lesend) und `address-review` (committet, pusht und rüstet den Reviewer wieder scharf; neu in v3.1.1) als entwickleraufrufbare Hilfsmittel — explizit angeboten, niemals ungefragt installiert, niemals der Standard, niemals ein Plan-Task
- **Niemals blockierend (nur der Aufruf):** eine lokale Überprüfung, die starten konnte, aber fehlschlägt, wird einmal gewarnt, aufgezeichnet und dann fortgefahren; sie lässt die Aufgabe niemals scheitern
- **Parität (Flow B):** gemeinsames `prompt.md` + Erweiterung richten Methodik/Schweregrad aus; das iterationsbewusste CI-Review kann Runde 2+ verkürzen, während der lokale Durchlauf vollständig bleibt
- **Anbieterneutrale Schutzmaßnahme:** kein Deep Work Plan-Ablauf erfordert einen kommerziellen Dienst, CI-Anbieter oder Secret — der Reviewer ist eine MIT-lizenzierte, tag-gepinnte Skill, ausgeführt vom eigenen Coding-Agenten des Entwicklers
- **Konformität:** `verify` meldet einen fehlenden lokalen Reviewer als Fehler für Repositories, die Standard 2.3.0 oder neuer deklarieren, und als Harness-Versions-Befund für Legacy-Repositories

### Herdr (sechstes Addon)

Ein schlanker Integrator von [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (fixiert auf `v0.1.0`, Protokoll `1`), der **interaktive** Delegationstransport von v7-Plänen.

- **Kit-Seite:** [Herdr](/kit/herdr)
- **Was es hinzufügt:** Ein Plan kann eine begrenzte Aufgabe an einen Coding-Agenten in einem anderen [Herdr](https://herdr.dev)-Pane übergeben, auf derselben Maschine oder auf einer, die Herdr per SSH erreicht, und dessen einzige autorisierte Antwort im Journal aufzeichnen
- **Verhalten:** Das Peer-Protokoll (Stempel, Freigabe, Antwort, Schleifenschutz, Tiefen- und Fan-out-Grenzen) liegt in herdr-peers, nie im Paket; jede Nutzung erfordert die Vertragsfreigabe `agent_delegation`, und das Ergebnis eines Delegierten bleibt eine Behauptung, bis der eigene Runner des Plans es beobachtet
- **Wann angeboten:** explizites Opt-in in Phase 7b; nur lesende Erkennung von `herdr` und `herdr-peers`; der Transport ist nur innerhalb einer Herdr-Sitzung nutzbar

### DeepWorkPlan Vim (siebtes Addon)

Ein schlanker Integrator von [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (fixiert auf `v0.4.2`, Interface `1`), dem Terminal-Editor für Deep Work Plan (Neovim 0.12+).

- **Kit-Seite:** [DeepWorkPlan Vim](/kit/vim)
- **Was es hinzufügt:** eine optionale, maschinenweite Editor-Oberfläche für Agenten und Menschen — ein generierter Befehlsindex, ein schreibgeschützter Plan-Browser und ein Markdown-Viewer; jede Aussage wird aus der fixierten maschinenlesbaren Oberfläche des Produkts gelesen
- **Verhalten:** Eine bestehende Neovim-Konfiguration wird nie ohne ausdrückliche Zustimmung überschrieben; die Erkennung ist nur lesend
- **Wann angeboten:** explizites Opt-in in Phase 7b; nur informativ, wenn Neovim 0.12+ fehlt

### Agentkit (achtes Addon)

Ein schlanker Integrator von [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`), der **Headless**-Delegationstransport von v7-Plänen.

- **Kit-Seite:** [Agentkit](/kit/agentkit)
- **Was es hinzufügt:** eine einheitliche `ak`-Befehlsoberfläche über Terminal-Coding-Agenten, mit der eine begrenzte Planaufgabe headless ausgeführt wird; es steuert die Fähigkeiten `subagents`, `cancel_children` und `model_routing` nur zur Laufzeit bei, wenn es aktiviert, erkannt und auf einem kompatiblen Interface ist
- **Verhalten:** Jede Nutzung erfordert die Vertragsfreigabe `agent_delegation`; das Addon installiert nie eigenständig Coding-Agent-CLIs und liest nie die Werte von Anbieterschlüsseln
- **Wann angeboten:** explizites Opt-in in Phase 7b; nur lesende Erkennung über `ak doctor --json`

## Skills

Skills sind wiederverwendbare Prozeduren, die namentlich aufgerufen werden. Eine Skill bündelt einen wiederholbaren Workflow (Tests ausführen, Lint beheben, Komponente erstellen).

Die Methodik liefert eine kleine Menge zentraler Sub-Skills. Darunter lässt die **author**-Sub-Skill ein Repository **sein eigenes Kit wachsen**: aufgerufen via `/skill-create` und `/agent-create`, schlussfolgert über das bestehende `.agents/`-Layout und Konventionen und autorisiert dann eine neue Skill, einen Agenten oder einen dünnen Befehls-Delegator, der dazu passt, und hält den Katalog synchron. Dieselbe Sub-Skill stützt den Skills-Abstimmungspass des Final Review.

Kit-Eintrag: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agents

Agents sind spezialisierte Worker mit definierter Rolle (Reviewer, Executor, Architect). Sie leben unter `.agents/agents/` und sind in `.agents/docs/` katalogisiert.

## Wartungs-Add-ons

Das **dependency-upgrade**-Add-on (oben) ist das primäre Wartungs-Addon. Es schlussfolgert über den tatsächlichen Paketmanager des Repos statt npm anzunehmen, klassifiziert Upgrades nach Semver, upgraded in sicheren Batches, führt nach jedem Batch Validierung aus und revertiert fehlgeschlagene Batches.

## Design-system-Add-on

Siehe [Design system](/kit/design-system) unter aktiven Addons. Das Repo-Level-`DESIGN.md` unterscheidet sich von einem Feature-spezifischen technischen Designdokument: DWPs Plan-README, Aufgaben-Akzeptanzkriterien und Validierungs-Gates decken Feature-Design bereits ab. Das design-system-Addon füllt dauerhaften, repo-nativen **Interface**-Designkontext.

## Presets

Presets passen DWP an einen bestimmten Tech-Stack an (Django, React, Go, Astro + Svelte und mehr). Durchsuchen Sie den [Kit-Katalog](/kit).

## Adapter

Adapter mappen DWP-Befehle auf das Befehlssystem eines bestimmten Agenten (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw und andere). Adapter-Einträge leben im Kit unter dem Namen jedes Agenten.

## Beispiele

Beispiele demonstrieren DWP in der Praxis: Vorher/Nachher-Vergleiche, Beispielpläne, Fallstudien. Siehe [Examples](/examples) und [Dogfood this site](/kit/dogfood-this-site).

## Konformitätserinnerung

Ein Repository **MUSS** mit **null** Addons vollständig konform sein. Addons sind geschichtete Opt-in-Fähigkeiten — niemals Voraussetzungen. Siehe [Conformance](/spec/conformance).
