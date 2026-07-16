---
title: AI Diff Reviewer
description: "Optionales DWP-Addon: lokaler AI Diff Reviewer-Lauf für Security Review, optionales Flow-B-CI-Gate (v2), gemeinsame Extension und apply-review."
kind: addon
lang: de
order: 5
---

# AI Diff Reviewer Addon

Verbindet die Deep Work Plan-Ausführung mit dem **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (Marketplace-Eintrag **"AI Diff Reviewer"**, aktuelle Version **v2.0.0**), sodass die obligatorische abschließende Aufgabe **Sicherheitsprüfung** eine strukturierte lokale Überprüfung erhält — Urteil, Ergebnistabelle und Schweregrad — und, bei Wahl von Flow B, jeder Pull-Request durch dieselbe Überprüfung in CI gesperrt werden kann. Ein **optionales** Addon; nie erforderlich für AI-first-Konformität.

Die Kernmethodologie von Deep Work Plan hat **null** Abhängigkeit vom AI Diff Reviewer. Ein Repository ohne Addons ist vollständig konform. Biete dieses Addon nur an, wenn der Entwickler oder das Team strukturierte Überprüfungsqualität wünscht; niemals automatisch für alle installieren. Immer Flow A vs. Flow B erfragen — niemals einen Standard annehmen.

## Wann es zu verwenden ist

| Signal | Aktion |
|--------|--------|
| Team möchte einen CI-PR-Merge-Gate mit strukturierten Ergebnissen | **Flow B empfehlen** beim Onboarding |
| Persönliches oder experimentelles Repository; lokale Pre-Push-Überprüfung reicht aus | **Flow A anbieten** |
| Kein Interesse an einer zusätzlichen Überprüfungsoberfläche | **Überspringen** — die Basis-Sicherheitsprüfung gilt weiterhin |

## Zwei Adoptionsflows

| Flow | Was du erhältst |
|------|----------------|
| **A — nur lokal** | Vendored Skill + erforderliche `.review/extension.md` (über `generate-extension`). Erweitert die Sicherheitsprüfung um einen lokalen Durchlauf. Kein GitHub Actions-Workflow. |
| **B — doppelte Oberfläche** | Flow A plus `setup` schreibt `.github/workflows/pr-review.yml` (Action `@v2`), dieselbe Erweiterungsdatei für lokal und CI. Optionaler `apply-review`-Begleiter nach CI-Ergebnissen. |

Die Erkennung für die Sicherheitsprüfungserweiterung erfordert **Skill + eine Erweiterungsdatei** an einem dieser Orte: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` oder `.github/ai-pr-reviewer/extension.md`. Der Skill allein reicht nicht aus.

## Was dieses Addon verbindet (bewusst begrenzt)

Das DWP-Addon **erfindet** den Reviewer nicht neu. Es delegiert Installation, Methodik, den CI-Assistenten, Erweiterungsautorenschaft, PR-Entwurf und Post-CI-Durchsicht an die fünf Sub-Skills des Upstream-Skills (übergeordneter Standardflow, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Erweiterung der Sicherheitsprüfung

Bei Erkennung fügen `create` / `execute` einen lokalen Überprüfungsschritt zur obligatorischen Sicherheitsprüfungsaufgabe hinzu. Die Ausgabe wird unter `## AI Diff Reviewer local review` in `analysis_results/SECURITY_REVIEW.md` angehängt.

- **Soft-Fail (nur Aufruf):** fehlender Skill, fehlende Erweiterung oder Aufruffehler → einmal warnen und fortfahren; Aufgabe nie für diesen Fehler scheitern lassen.
- **Gate nach einem abgeschlossenen Durchlauf:** `critical`-Ergebnisse blockieren weiterhin den Abschluss der Sicherheitsprüfung bis zur Korrektur oder expliziten Annahme (bestehender SR-Vertrag). `warning` / `info` werden dokumentiert, sind aber nicht blockierend.
- **Flow A benötigt kein CI-Secret.** Ein nicht gesetzter `CURSOR_API_KEY` darf den lokalen Durchlauf nicht unterdrücken.

### Flow-B-CI-Gate (optional)

Gepinnte Action `DailybotHQ/ai-diff-reviewer@v2`, typischerweise Label-gesperrt (`ready`), mit einem stabil benannten **AI review gate**-Job für Branch-Schutz und optionalem `skip-review-label: skip-ai-review`. Gemeinsames `prompt.md` + Erweiterung richten Methodik und Schweregrad aus; unter iterationsbewusster Überprüfung können CI-Runden 2+ kürzer sein, während der lokale Durchlauf vollständig bleibt.

### Optionaler `apply-review`-Begleiter

Nach CI-Veröffentlichung einer Überprüfung kann der Entwickler `apply-review` während `execute` aufrufen, um Ergebnisse einzeln zu durchlaufen (anwenden / zurückstellen / überspringen) mit Zustimmung. Standardmäßig nur lesend; nie eine Planaufgabendatei (würde die obligatorische Aufgabenreihenfolge brechen).

## Verhalten

- **Flow erfragen; niemals raten.** Ein unaufgefordert installierter Workflow hat einen größeren Fußabdruck als beim Flow A zu bleiben.
- **Abstimmen, nicht überschreiben.** Vorhandener Skill, Erweiterung oder `pr-review.yml` bleiben erhalten; nur Lücken füllen.
- **Auth verschoben.** Provider-Secrets für CI werden vom Maintainer konfiguriert; dieses Addon speichert keine Anmeldeinformationen.
- **Anbieterneutral.** Ablehnen hinterlässt ein vollständig AI-first-Repository.

## Hinweise

Optional und nie erforderlich. Upstream-Skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec-Seite: [Add-ons](/spec/addons).
