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
- **Den Archetyp klassifizieren.** Ein Einzel-Repository (der Regelfall) oder ein Orchestrator-Hub, mit
  den Belegen.
- **Inventarisieren, was bereits existiert.** `AGENTS.md`, `CLAUDE.md`, `docs/`, ein etwaiges `.agents/`- oder Skills/Agents-
  Setup, `.dwp/` und `.gitignore`. Notieren Sie alles, was bereits einen Teil dieser Aufgabe erledigt.
- **Den Onboarding-Plan vorschlagen.** Präsentieren Sie eine prägnante Liste: Dateien, die Sie erstellen, Dateien, die Sie
  ändern, und alles Bestehende, das Sie abgleichen oder ersetzen wollen — und **bitten Sie den Benutzer um Bestätigung**,
  bevor Sie fortfahren. Bei einem großen Repository erfassen Sie diesen Plan mit `/dwp-create` und führen Sie ihn als
  Deep Work Plan aus.

## 2. Die Deep Work Plan Skill installieren

Installieren Sie die Skill, sodass die Agenten dieses Repositorys strukturierte Arbeit planen und ausführen können. Sie liefert einen Router
plus acht Sub-Skills — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` und `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
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
   bestehende `CLAUDE.md` nicht ohne nachzufragen).
2. **`docs/`.** Füllen Sie die Standardkategorien mit echtem, repository-spezifischem Inhalt: `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, plus `PERFORMANCE.md` und einen `docs/README.md`-Index.
   Wenn bereits Dokumentation existiert, integrieren und erweitern Sie sie — duplizieren Sie nicht.
3. **Dokumentation je Modul.** Fügen Sie eine `README.md` (und einen `docs/`-Unterordner für komplexe Module) in jedes
   größere Quellmodul ein, das bei der Erkundung entdeckt wurde.
4. **`.agents/` + `.claude → .agents`.** Erstellen Sie das kanonische, agentenübergreifende Verzeichnis: einen **durchdachten** Katalog
   von `agents/`, stack-passenden `skills/` und schlanken `dwp-*`-`commands/`, die an die
   installierte Skill delegieren — jeder Eintrag begründet für *dieses* Repository, nicht aus einem anderen kopiert. Fügen Sie einen
   `docs/`-Katalog hinzu (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`), der dem entspricht, was auf der
   Festplatte existiert, plus `settings.json` und den `.claude → .agents`-Symlink. Nehmen Sie etwaige bestehende Skills/Agenten
   in den Katalog auf.
5. **Die DWP-Skill, angepasst.** Die installierte Skill ist die Engine; das eigene Kit des Repositorys
   (Skills, Agenten, Befehle) muss **für dieses Repository durchdacht** sein — niemals eine Kopie des Kits eines anderen
   Repositorys.
6. **`.dwp/` + `tmp/`.** Legen Sie ein per gitignore ausgeschlossenes `.dwp/` mit `plans/` und `drafts/` an, plus einen `tmp/`-
   Scratch-Bereich — beide nicht-destruktiv zur `.gitignore` hinzugefügt (anhängen, niemals neu schreiben).

## 4. Das Kit weiterentwickeln (author-Sub-Skill)

Nutzen Sie die `author`-Sub-Skill, um das eigene Kit des Repositorys aufzubauen. Die schlanken Delegatoren `/skill-create` und
`/agent-create` leiten an sie weiter. Erstellen Sie eine **Skill** für eine wiederholbare in-Sitzung-Prozedur, einen **Agenten** für
eine wiederkehrende Rolle mit eigener Modellstufe und eigenen Werkzeugen und einen **Befehl** nur als schlanken Delegator. Halten Sie
den `.agents/docs/`-Katalog synchron mit dem, was auf der Festplatte existiert.

## 5. Die Opt-in-Addons anbieten

Zählen Sie nach der Baseline die drei Addons auf und bieten Sie jedes als explizites Opt-in an. Ein Repository ist
mit **null** Addons vollständig konform — installieren Sie sie niemals automatisch.

- **Devcontainer-Unterstützung** — ein reproduzierbarer, isolierter Dev-Container mit persistenter AI-CLI-Authentifizierung.
- **Dailybot-Integration** — Best-Effort-Berichterstattung über Fortschritte/Meilensteine für Teams, die Dailybot bereits nutzen.
  Die zentrale Methodik hat keine Dailybot-Abhängigkeit.
- **Dependency-Upgrade** — paketmanager-agnostische, chargenweise, validierte, rücknehmbare Upgrades. Wenn
  angenommen, installiert es den `/lib-upgrade`-Befehl.

## 6. Planen und ausführen

Erzeugen Sie Deep Work Plans für jede Aufgabe und führen Sie sie Aufgabe für Aufgabe aus:

- `/dwp-create <goal>` — ein Ziel in nummerierte, aufeinanderfolgende Aufgaben mit Validierungs-Gates zerlegen.
- `/dwp-execute` — den Plan Aufgabe für Aufgabe ausführen, den Fortschritt aktualisieren und jedes Gate validieren.
- `/dwp-status` — über den Fortschritt berichten, ohne Änderungen vorzunehmen.
- `/dwp-refine` — Aufgaben hinzufügen, entfernen oder umordnen, während abgeschlossene Arbeit bewahrt wird.
- `/dwp-resume` — den Zustand rekonstruieren und einen unterbrochenen Plan fortsetzen.

## 7. Verifizieren

Führen Sie `/dwp-verify` für einen objektiven Bestanden/Nicht-bestanden-Konformitätsbericht aus (es prüft die
Kriterien im [Konformitätsdokument der Spezifikation](https://deepworkplan.com/spec)),
und bestätigen Sie dann:

- [ ] Die Skill ist installiert und auflösbar, mit allen acht verfügbaren Sub-Skills.
- [ ] `AGENTS.md` existiert im Stammverzeichnis mit einem echten Quick-Commands-Block; `CLAUDE.md` löst sich darauf auf.
- [ ] `docs/` enthält die Standardkategorien mit echtem, repository-spezifischem Inhalt; größere Module haben eine
      `README.md`.
- [ ] `.agents/` existiert mit `agents/`, `commands/` (schlanke `dwp-*`-Delegatoren), `skills/` und einem Katalog,
      der der Realität entspricht; `.claude → .agents` löst sich auf.
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
