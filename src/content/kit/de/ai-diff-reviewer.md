---
title: AI Diff Reviewer
description: "Erforderliche lokale Überprüfung in jedem DWP-Final-Review seit Standard 2.3.0, vom Onboarding installiert; das Flow-B-CI-Gate (v2), die gemeinsame Extension und der apply-review-Begleiter bleiben optional."
kind: addon
lang: de
order: 5
---

# AI Diff Reviewer Addon

Verbindet die Deep Work Plan-Ausführung mit dem **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (Marketplace-Eintrag **"AI Diff Reviewer"**, aktuelle Version **v2.0.1**), sodass der Sicherheitstest des obligatorischen **Final Review** eine strukturierte lokale Überprüfung ausführt — Urteil, Ergebnistabelle und Schweregrad — und, bei Wahl von Flow B, jeder Pull-Request durch dieselbe Überprüfung in CI gesperrt werden kann. Seit Standard 2.3.0 ist die **lokale Überprüfung Teil der Baseline**: Das Onboarding installiert sie und jedes Final Review führt sie aus. Nur die CI-Oberfläche ist Opt-in.

Was anbieterneutral bleibt, ist die Grenze, auf die es ankommt: Der Reviewer ist eine MIT-lizenzierte, tag-gepinnte Skill, die von deinem **eigenen** Coding-Agenten ausgeführt wird — kein Deep Work Plan-Ablauf erfordert einen kommerziellen Dienst, CI-Anbieter oder Secret. Flow A (nur lokal) ist die Baseline, die jedes geonboardete Repository erhält; Flow B (die CI Action) wird explizit angeboten und niemals ungefragt installiert. Ein Entwickler kann die lokale Überprüfung ablehnen; die Ablehnung wird als deklarierte Ausnahme aufgezeichnet, und `verify` meldet das Repository in diesem Punkt als nicht konform, bis sie installiert ist.

## Wann es zu verwenden ist

| Signal | Aktion |
|--------|--------|
| Jedes geonboardete Repository | **Flow A wird installiert** in Onboarding-Phase 7a (vendorte Skill + `.review/extension.md`); ein zielgerichtetes Harness-Upgrade fügt es Repositorys hinzu, die früher onboardet wurden |
| Team möchte einen CI-PR-Merge-Gate mit strukturierten Ergebnissen | **Flow B anbieten** — explizites Opt-in, niemals der Standard |
| Persönliches oder experimentelles Repository; lokale Überprüfung reicht aus | **Bei Flow A bleiben** — die Baseline ist vollständig |

## Zwei Adoptionsflows

| Flow | Was du erhältst |
|------|----------------|
| **A — nur lokal (Baseline)** | Vendorte Skill + erforderliche `.review/extension.md` (über `generate-extension`). Führt die lokale Überprüfung im Sicherheitstest jedes Final Review aus. Kein GitHub Actions-Workflow. |
| **B — doppelte Oberfläche** | Flow A plus `setup` schreibt `.github/workflows/pr-review.yml` (Action `@v2`), dieselbe Erweiterungsdatei für lokal und CI. Optionaler `apply-review`-Begleiter nach CI-Ergebnissen. |

Die Erkennung für die lokale Überprüfung erfordert **Skill + eine Erweiterungsdatei** an einem dieser Orte: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` oder `.github/ai-pr-reviewer/extension.md`. Der Skill allein reicht nicht aus.

## Was dieses Addon verbindet (bewusst begrenzt)

Das DWP-Addon **erfindet** den Reviewer nicht neu. Es delegiert Installation, Methodik, den CI-Assistenten, Erweiterungsautorenschaft, PR-Entwurf und Post-CI-Durchsicht an die fünf Sub-Skills des Upstream-Skills (übergeordneter Standardflow, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Die erforderliche lokale Überprüfung

`create` fügt den lokalen Überprüfungsschritt zum Sicherheitstest jedes Final Review hinzu, und `execute` führt ihn aus. Die Ausgabe wird unter `## AI Diff Reviewer local review` in der plan-lokalen `analysis_results/SECURITY_REVIEW.md` (im eigenen Ordner des Plans, nie im Repository-Root) angehängt.

- **Fehlender Reviewer — aufgezeichnet, niemals still übersprungen:** eine fehlende Skill oder Erweiterung wird zu einem `local reviewer not installed`-Befund; das Final Review führt den lokalen Durchlauf aus, wenn die Skill vorhanden ist, und trägt den Befund andernfalls in den Abschlussbericht — die Installation gehört zur Onboarding-Zustimmung oder zu einem expliziten Addon-Aufruf, niemals ein Überraschungs-Bootstrap.
- **Soft-Fail (nur Aufruf):** eine Überprüfung, die starten konnte, aber fehlschlägt → einmal warnen, aufzeichnen, fortfahren; die Aufgabe nie für diesen Fehler scheitern lassen.
- **Gate nach einem abgeschlossenen Durchlauf:** `critical`-Ergebnisse blockieren weiterhin den Abschluss des Final Review bis zur Korrektur oder expliziten Annahme. `warning` / `info` werden dokumentiert, sind aber nicht blockierend.
- **Flow A benötigt kein CI-Secret.** Ein nicht gesetzter `CURSOR_API_KEY` darf den lokalen Durchlauf nicht unterdrücken.

### Flow-B-CI-Gate (optional)

Action `DailybotHQ/ai-diff-reviewer@v2`, typischerweise Label-gesperrt (`ready`), mit einem stabil benannten **AI review gate**-Job für Branch-Schutz und optionalem `skip-review-label: skip-ai-review`. Gemeinsames `prompt.md` + Erweiterung richten Methodik und Schweregrad aus; unter iterationsbewusster Überprüfung können CI-Runden 2+ kürzer sein, während der lokale Durchlauf vollständig bleibt.

### Optionaler `apply-review`-Begleiter

Nach CI-Veröffentlichung einer Überprüfung kann der Entwickler `apply-review` während `execute` aufrufen, um Ergebnisse einzeln zu durchlaufen (anwenden / zurückstellen / überspringen) mit Zustimmung. Standardmäßig nur lesend; nie eine Planaufgabendatei (würde die obligatorische Aufgabenreihenfolge brechen).

## Verhalten

- **Flow A ist die Baseline; Flow B wird erfragt, nie geraten.** Ein unaufgefordert installierter Workflow hat einen größeren Fußabdruck als beim Flow A zu bleiben.
- **Abstimmen, nicht überschreiben.** Vorhandener Skill, Erweiterung oder `pr-review.yml` bleiben erhalten; nur Lücken füllen.
- **Auth verschoben.** Provider-Secrets für CI werden vom Maintainer konfiguriert; dieses Addon speichert keine Anmeldeinformationen.
- **Anbieterneutral.** Es ist nie ein kommerzieller Dienst, CI-Anbieter oder Secret erforderlich; die CI-Oberfläche ist das einzige Stück, das einen Anbieter berührt.

## Hinweise

Lokale Überprüfung seit Standard 2.3.0 erforderlich; CI-Oberfläche optional. Upstream-Skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec-Seite: [Add-ons](/spec/addons).
