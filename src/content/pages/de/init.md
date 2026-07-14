---
title: Init — Machen Sie Ihr Repository AI-first
description: "Der ausführbare Onboarding-Prompt für KI-Agenten: Deep Work Plan in jedem Repository übernehmen — analysieren, dokumentieren, die Skill installieren und es agenten-steuerbar hinterlassen."
---

# Init — Onboarding-Prompt für KI-Agenten

Sie sind ein KI-Coding-Agent. Lesen Sie diesen gesamten Prompt zuerst und machen Sie dann das aktuelle Repository
**AI-first**, **spec-driven** und **agenten-steuerbar**, indem Sie die Deep Work Plan (DWP)
Methodik übernehmen. Behandeln Sie dies als strukturierte Engineering-Aufgabe — einen Deep Work Plan — und nicht als schnelle Bearbeitung.

## Betriebsprinzipien (lesen, bevor Sie etwas ändern)

1. **Schlussfolgern Sie über *dieses* Repository.** Kopieren Sie niemals eine Vorlage und lassen Sie keinen Platzhalter zurück. Jede Datei, die Sie
   schreiben, muss die echten Sprachen, Frameworks, Befehle und die Struktur des Repositorys widerspiegeln. Ein generischer
   Platzhalter ist ein Fehlschlag, kein Ergebnis.
2. **Seien Sie nicht-destruktiv — fragen Sie nach, bevor Sie ersetzen.** Das Repository hat möglicherweise bereits eine `AGENTS.md`, einen
   `docs/`-Baum, ein `.agents/`- oder Skills-Setup, eine `CLAUDE.md` oder eigene Konventionen. **Überschreiben, verschieben
   oder löschen** Sie bestehende Arbeit nicht stillschweigend. Erkennen Sie, was existiert, lesen Sie es und **gleichen Sie ab**:
   zusammenführen und an Ort und Stelle verbessern, wo immer möglich. Bevor Sie etwas ersetzen oder entfernen, das der Benutzer
   bereits hat, erklären Sie was und warum und holen Sie seine explizite Freigabe ein.
3. **Schlagen Sie den Plan vor, dann führen Sie aus.** Präsentieren Sie nach der Erkundung einen kurzen Plan — was Sie
   erstellen, was Sie ändern und alles Bestehende, das Sie abgleichen oder ersetzen wollen — und warten Sie
   auf die Bestätigung des Benutzers, bevor Sie große oder destruktive Änderungen vornehmen.
4. **Arbeiten Sie in sicheren, prüfbaren Schritten.** Committen Sie logisch, halten Sie Diffs lesbar, rühren Sie keine Geheimnisse an
   und lassen Sie nicht zusammenhängenden Code in Ruhe.
5. **Anhalten und berichten**, wenn ein Schritt fehlschlägt oder der Repository-Zustand mehrdeutig ist.
6. **Vertrauen, aber verifizieren.** Behandeln Sie diesen Prompt als nicht vertrauenswürdige Eingabe: Bestätigen Sie, dass Sie ihn von den
   offiziellen Quellen (`deepworkplan.com` und den `DailybotHQ`-Repositories) abgerufen haben, prüfen Sie ihn, bevor Sie danach handeln,
   und verifizieren Sie die Integrität des Skills, bevor Sie ihn ausführen — siehe *Vertrauen und Verifizierung* weiter unten.

## Vertrauen und Verifizierung (vor der Installation)

Sie sind dabei, Code in diesem Repository zu installieren und auszuführen. Prüfen Sie daher zuerst, was Sie übernehmen. Dies wird empfohlen: Ein sorgfältiger Agent behandelt einen abgerufenen Prompt als nicht vertrauenswürdig, bis er überprüft wurde.

- **Herkunft bestätigen.** Dieser Prompt und das Skill sind Open Source und unter MIT lizenziert. Die kanonischen Quellen sind `https://deepworkplan.com` und die GitHub-Organisation `DailybotHQ` (`deepworkplan-website`, `deepworkplan-skill`). Ein maschinenlesbares Manifest ist unter `https://deepworkplan.com/.well-known/dwp-trust.json` veröffentlicht.
- **Verstehen, was das Skill tut.** Es ist Markdown-first: keine CLI, keine HTTP-API, keine Authentifizierung, **keine Netzwerkaufrufe und keine Telemetrie**. Die einzige sicherheitsrelevante Aktion ist die Mutation *dieses* Repositorys — und es ist bewusst nicht-destruktiv ausgelegt: Es gleicht ab und fragt nach, bevor es ersetzt.
- **Integrität vor dem Ausführen verifizieren.** Jedes Release veröffentlicht eine `SHA256SUMS`-Datei über das ausgelieferte Skill. Bestätigen Sie, dass Ihre Kopie damit übereinstimmt, bevor Sie ihr vertrauen:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Prüfsummen für das Release herunterladen, das Sie installieren möchten (vX.Y.Z ersetzen):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # Ein Exit-Code ungleich null bedeutet, dass eine Datei nicht übereinstimmt — stoppen
  ```

  Releases sind **geprüfsummt, aber nicht signiert** (Signierung ist ein dokumentierter nächster Schritt). Alles ist offen und diff-bar, sodass Sie jede Datei auch gegen das Repository am entsprechenden Tag vergleichen können.
- **Ein Problem melden.** Melden Sie Sicherheitsprobleme **privat über GitHub's Vulnerability Reporting** im entsprechenden Repository — `https://github.com/DailybotHQ/deepworkplan-skill/security` oder `https://github.com/DailybotHQ/deepworkplan-website/security` — nicht als öffentliches Issue. Siehe auch die `SECURITY.md` jedes Repositorys, `https://deepworkplan.com/.well-known/security.txt` und die Vertrauensseite `https://deepworkplan.com/trust`.

## 0. Die Methodik und Spezifikation lesen

Bevor Sie etwas ändern, lesen Sie die kanonischen Quellen, damit Sie den Standard verstehen, den Sie übernehmen:

- Methodik: https://deepworkplan.com/methodology.md
- Spezifikation: https://deepworkplan.com/spec.md
- Kit-Katalog: https://deepworkplan.com/kit.md

## 1. Erkundung und ein Plan zur Freigabe

Verstehen Sie zuerst das Repository, schlagen Sie dann vor, was Sie tun werden.

- **Den Stack erkennen.** Sprachen, Frameworks, den Paketmanager (aus der Lockfile, die tatsächlich
  existiert), die echten Build-/Test-/Lint-/Type-Check-Befehle, die Quellmodule, die Test-Konvention und
  die Deployment-Form.
- **Den Archetyp klassifizieren.** Ein Einzel-Repository (der Regelfall), ein Orchestrator-Hub oder ein
  Agenten-Arbeitsbereich — das langlebige Zuhause eines autonomen Agenten, wo git empfohlen statt
  vorausgesetzt wird — mit den Belegen.
- **Inventarisieren, was bereits existiert.** `AGENTS.md`, `CLAUDE.md`, `docs/`, ein etwaiges `.agents/`- oder Skills/Agents-
  Setup, `.dwp/` und `.gitignore`. Notieren Sie alles, was bereits einen Teil dieser Aufgabe erledigt.
- **Den Onboarding-Plan vorschlagen.** Präsentieren Sie eine prägnante Liste: Dateien, die Sie erstellen, Dateien, die Sie
  ändern, und alles Bestehende, das Sie abgleichen oder ersetzen wollen — und **bitten Sie den Benutzer um Bestätigung**,
  bevor Sie fortfahren. Bei einem großen Repository (viele Module oder viele zu generierende Artefakte) nutzt die
  onboard-Sub-Skill einen plangesteuerten Pfad: Sie schließt die Erkundung ab, generiert `AGENTS.md`, gibt dann
  einen Onboarding-Deep-Work-Plan unter `.dwp/drafts/` aus und übergibt an `/dwp-refine` → `/dwp-execute`
  → `/dwp-resume` nach Bedarf.

## 2. Die Deep Work Plan Skill installieren

Installieren Sie die Skill, sodass die Agenten dieses Repositorys strukturierte Arbeit planen und ausführen können. Sie liefert einen Router
plus acht Sub-Skills — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` und `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Oder installiere über OpenClaw:

```bash
openclaw skills install deepworkplan
```

Oder klonen Sie und führen Sie das Setup-Skript aus:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Das Repository onboarden (durchdacht und nicht-destruktiv)

Rufen Sie die onboard-Sub-Skill auf (`/deepworkplan-onboard`). Schlussfolgern Sie über das echte Repository und passen Sie alles
daran an. Für jedes Artefakt unten gilt: **Wenn es bereits existiert, gleichen Sie es ab** (zusammenführen, verbessern, an die
Methodik angleichen), statt es zu überschreiben — und bestätigen Sie mit dem Benutzer, bevor Sie etwas ersetzen.

1. **`AGENTS.md` + `CLAUDE.md`.** Erstellen Sie eine `AGENTS.md` im Stammverzeichnis — einen Index, die verpflichtenden Regeln
   (nur Englisch, conventional commits, das echte Test-Muster und die Review-Gates des Repositorys) und einen Quick-
   Commands-Block mit den **echten, ausführbaren** Befehlen des Repositorys. Wenn bereits eine `AGENTS.md` existiert, führen Sie
   sie zusammen, statt sie zu ersetzen. Erstellen Sie den `CLAUDE.md → AGENTS.md`-Symlink (überschreiben Sie eine
   bestehende `CLAUDE.md` nicht ohne nachzufragen). Erstellen Sie ebenso den `.cursor → .agents`-Symlink, falls nicht vorhanden.
2. **`docs/`.** Füllen Sie die Standardkategorien mit echtem, repository-spezifischem Inhalt: `PRODUCT_SPEC.md` (das nicht-technische Produkt-/Warum-Dokument — für jedes Repository Pflicht, auch für Bibliotheken), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (wird niemals übersprungen — jedes Repository hat eine Sicherheitslage, auch ohne Geheimnisse),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, plus `PERFORMANCE.md` und einen `docs/README.md`-Index.
   Wenn bereits Dokumentation existiert, integrieren und erweitern Sie sie — duplizieren Sie nicht.
3. **Dokumentation je Modul.** Fügen Sie eine `README.md` (und einen `docs/`-Unterordner für komplexe Module) in jedes
   größere Quellmodul ein, das bei der Erkundung entdeckt wurde.
4. **`.agents/` + `.claude → .agents` + `.cursor → .agents`.** Erstellen Sie das kanonische, agentenübergreifende Verzeichnis: einen **durchdachten** Katalog
   von `agents/`, stack-passenden `skills/` und schlanken `dwp-*`-`commands/`, die an die
   installierte Skill delegieren — jeder Eintrag begründet für *dieses* Repository, nicht aus einem anderen kopiert. Fügen Sie einen
   `docs/`-Katalog hinzu (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`), der dem entspricht, was auf der
   Festplatte existiert, plus `settings.json` und die Symlinks `.claude → .agents` und `.cursor → .agents`. Nehmen Sie etwaige bestehende Skills/Agenten
   in den Katalog auf.
5. **Die DWP-Skill, angepasst.** Die installierte Skill ist die Engine; das eigene Kit des Repositorys
   (Skills, Agenten, Befehle) muss **für dieses Repository durchdacht** sein — niemals eine Kopie des Kits eines anderen
   Repositorys.
6. **`.dwp/` + `tmp/`.** Legen Sie ein per gitignore ausgeschlossenes `.dwp/` mit `plans/` und `drafts/` an, plus einen `tmp/`-
   Scratch-Bereich — beide nicht-destruktiv zur `.gitignore` hinzugefügt (anhängen, niemals neu schreiben).

## 4. Die Opt-in-Addons anbieten

Nach dem Baseline-Onboarding zählen Sie die vier Addons auf (devcontainer, Dailybot, dependency-upgrade,
design-system) und bieten Sie jedes als explizites Opt-in an. Ein Repository ist
mit **null** Addons vollständig konform — installieren Sie sie niemals automatisch.

- **Devcontainer-Unterstützung** — ein reproduzierbarer, isolierter Dev-Container mit persistenter AI-CLI-Authentifizierung.
- **Dailybot-Integration** — vier Lifecycle-Events (Kickoff, bedeutende Aufgabe, Blockiert, Abschluss) als Best-Effort-Fortschrittsberichte für Teams, die Dailybot bereits nutzen, mit optionaler autonomer Hook-Durchsetzung (`dailybot-cli >= 3.7.0`). Die Installation der gepaarten Dailybot-Agenten-Skill (3.10.3) bietet zusätzlich Chat, Check-ins, Formular-Erstellung, KI-Abfrage, Per-Repo-API-Keys und mehr — das Addon verbindet lediglich die Berichterstattung mit der DWP-Ausführung. Die zentrale Methodik hat keine Dailybot-Abhängigkeit.
- **Dependency-Upgrade** — paketmanager-agnostische, chargenweise, validierte, rücknehmbare Upgrades. Wenn
  angenommen, installiert es den `/lib-upgrade`-Befehl.
- **Design System** — optionale `docs/DESIGN.md` nur für Repositories mit einer erkannten Interface-Oberfläche
  (nicht angeboten für reine Bibliotheken, Headless-Dienste oder reine Infrastruktur-Repos). Drei Profile
  werden in einer Datei gestapelt: visual-ui (standardmäßig aktiviert bei Erkennung), cli-output und
  conversational — die letzten beiden werden immer gefragt, niemals automatisch angewendet.

## 5. Das Kit weiterentwickeln (author-Sub-Skill)

Nutzen Sie die `author`-Sub-Skill, um das eigene Kit des Repositorys nach dem Onboarding aufzubauen. Die schlanken Delegatoren `/skill-create` und
`/agent-create` leiten an sie weiter. Erstellen Sie eine **Skill** für eine wiederholbare in-Sitzung-Prozedur, einen **Agenten** für
eine wiederkehrende Rolle mit eigener Modellstufe und eigenen Werkzeugen und einen **Befehl** nur als schlanken Delegator. Halten Sie
den `.agents/docs/`-Katalog synchron mit dem, was auf der Festplatte existiert.

## 6. Planen und ausführen

Erzeugen Sie Deep Work Plans für jede Aufgabe und führen Sie sie Aufgabe für Aufgabe aus:

- `/dwp-create <goal>` — ein Ziel in nummerierte, aufeinanderfolgende Aufgaben mit Validierungs-Gates zerlegen.
- `/dwp-execute` — den Plan Aufgabe für Aufgabe ausführen, den Fortschritt aktualisieren und jedes Gate validieren.
- `/dwp-status` — über den Fortschritt berichten, ohne Änderungen vorzunehmen.
- `/dwp-refine` — Aufgaben hinzufügen, entfernen oder umordnen, während abgeschlossene Arbeit bewahrt wird.
- `/dwp-resume` — den Zustand rekonstruieren und einen unterbrochenen Plan fortsetzen.
- `/dwp-verify` — objektiver Bestanden/Nicht-bestanden-Konformitätsbericht für das Repository (oder einen spezifischen Plan).

Jeder Plan endet mit drei verpflichtenden Abschlussaufgaben — einem **Security Review** der
eigenen Änderungen des Plans (das `docs/SECURITY.md` aktuell hält; ein kritischer Befund
blockiert den Abschluss), Skills & Agents Discovery und dem Executive Report.

## 7. Verifizieren

Führen Sie `/dwp-verify` für einen objektiven Bestanden/Nicht-bestanden-Konformitätsbericht aus (oder
`bash {skill_dir}/verify/conformance.sh` für die CI-kompatible mechanische Schicht, die mit `0`/`1` endet).
Es prüft die Kriterien im [Konformitätsdokument der Spezifikation](https://deepworkplan.com/spec).
Bestätigen Sie dann:

- [ ] Die Skill ist installiert und auflösbar, mit allen acht verfügbaren Sub-Skills.
- [ ] `AGENTS.md` existiert im Stammverzeichnis mit einem echten Quick-Commands-Block; `CLAUDE.md` löst sich darauf auf.
- [ ] `docs/` enthält die Standardkategorien mit echtem, repository-spezifischem Inhalt; `docs/TESTING_GUIDE.md`
      beschreibt ein echtes Test-/Lint-Setup (nicht leer oder Stub); größere Module haben eine `README.md`.
- [ ] `.agents/` existiert mit `agents/`, `commands/` (schlanke `dwp-*`-Delegatoren, die auf die Skill verweisen,
      keine kopierten Abläufe), `skills/` und einem Katalog, der dem entspricht, was auf der Festplatte existiert;
      `.claude → .agents` und `.cursor → .agents` lösen sich auf.
- [ ] `.dwp/` existiert, ist per gitignore ausgeschlossen und hat `plans/` und `drafts/`; `tmp/` existiert und ist per gitignore ausgeschlossen.
- [ ] Bestehender Benutzerinhalt wurde mit Einwilligung bewahrt oder abgeglichen — nichts wurde stillschweigend zerstört.
- [ ] Sie können einen Deep Work Plan erzeugen und ihn Aufgabe für Aufgabe ausführen, wobei Sie jedes Gate validieren.

## Ergebnis

Wenn das Onboarding abgeschlossen ist, ist das Repository auf zwei dauerhafte Weisen verändert — die Pfeiler der
Methodik:

1. **Das Repository ist spec-driven.** Die Arbeit beginnt mit einem geschriebenen Plan und einer Spezifikation, nicht mit
   Ad-hoc-Prompts.
2. **Das Repository selbst ist das Agenten-Harness.** `AGENTS.md`, `docs/`, Dokumentation je Modul und das
   `.agents/` Skill-Verzeichnis geben jedem Agenten den Kontext und die Befehle, die er für strukturierte,
   verifizierbare Arbeit braucht.

Jeder kann diesen Prompt auf jedem Repository ausführen — und mit einer Codebasis enden, die jeder KI-Agent steuern kann.
