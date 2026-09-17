---
title: AI Diff Reviewer
description: "Erforderliche lokale Überprüfung in jedem DWP-Final-Review seit Standard 2.3.0, vom Onboarding installiert; das Flow-B-CI-Gate (v2), die gemeinsame Extension und der apply-review-Begleiter bleiben optional."
kind: addon
lang: de
order: 5
---

# AI Diff Reviewer Addon

Verbindet die Deep Work Plan-Ausführung mit dem **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (Marketplace-Eintrag **"AI Diff Reviewer"**, aktuelle Version **v2.3.0**), sodass der Sicherheitstest des obligatorischen **Final Review** eine strukturierte lokale Überprüfung ausführt — Urteil, Ergebnistabelle und Schweregrad — und, bei Wahl von Flow B, jeder Pull-Request durch dieselbe Überprüfung in CI gesperrt werden kann. Seit Standard 2.3.0 ist die **lokale Überprüfung Teil der Baseline**: Das Onboarding installiert sie und jedes Final Review führt sie aus. Nur die CI-Oberfläche ist Opt-in.

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

## Was sich seit v2.0.1 geändert hat

Zwischen v2.0.1 und v2.3.0 sind drei Upstream-Releases erschienen. Keines davon ändert, wie dieses Addon den Reviewer einbindet — Flow A, die drei Erkennungspfade und der Blockierungsvertrag bleiben unverändert —, aber sie ändern, was Anwendende bekommen.

| Änderung | Was das für ein DWP-Repository bedeutet |
|----------|------------------------------------------|
| **Runner und Backend sind getrennte Eingaben** (v2.1.0) | `provider` benennt den *Runner* — wer die Review-Schleife ausführt. Das neue `api-base` benennt das *Backend* — wo das Modell liegt. Ein leeres `api-base` ist byte-identisch zu v2.0.x, eine bestehende Installation verhält sich also genau wie zuvor. |
| **Zwei weitere Runner** (v2.1.0) | `openai` (in-process, ohne Installation) und `grok` (CLI) ergänzen den bisherigen Satz. |
| **Kosten sind eine Ein-Wort-Stufe, und die Standardwerte sind gemessen** (v2.1.0, v2.3.0) | Die Kosten werden über ein Stufen-Schlüsselwort und zugeschnittene Diffs gesteuert und je Review berichtet. Bei xAI lösen `balanced` und `economy` beide zu `grok-4.5` auf, `deep` zu `grok-4.6`. |
| **Folgerunden prüfen das tatsächlich neue Diff** (v2.1.0, v2.2.0) | Offene Befunde werden weitergetragen. `prior-findings-resolution` steht standardmäßig auf `advisory`: Das Urteil „behoben" eines Modells wird berichtet, der Befund blockiert aber weiter, bis eine wartende Person den Thread schließt. |
| **Eine unvollständige Überprüfung ist nie eine grüne Überprüfung** (v2.2.0) | Ein Lauf, der ohne geschriebene Befunde endet, wird als ausdrücklich unvollständige Überprüfung veröffentlicht. Jede blockierende Strenge lässt ihn scheitern, das Geprüft-Label wird nicht gesetzt, und keine leere Runde zieht einen offenen Befund zurück. |
| **Prüfsummen-verifizierte Installer** (v2.2.0) | `cursor-installer-sha256` und `grok-installer-sha256` verweigern die Ausführung eines Hersteller-Artefakts, dessen Hash vom konfigurierten Pin abweicht. |

Zwei davon wiegen für die Methodik schwerer als der Rest.

**Das Gate für unvollständige Überprüfungen schließt eine echte Lücke im Sicherheitsdurchgang.** Ein Final Review darf sich nicht auf eine Überprüfung stützen können, die nie stattgefunden hat. Vor v2.2.0 war ein Runner, der ohne Befunde endete, von einem sauberen Durchgang nicht zu unterscheiden. Jetzt ist das ein benannter, nicht grüner Zustand — „keine Befunde" heißt also, dass der Reviewer hingesehen und nichts gefunden hat, und nicht, dass er nie hingesehen hat.

**`economy` ist bewusst nicht günstiger.** Der Upstream-Benchmark vom 16.09.2026 maß `grok-4.3` bei 0 von 5 bekannten Defekten — es genehmigt, ohne zu prüfen —, während `grok-4.5` mit 3 von 5 ohne Fehlalarme mit `grok-4.6` gleichzog, bei gleichen Kosten und einem Viertel der Laufzeit. Da es kein günstigeres xAI-Modell gibt, das noch wirklich prüft, löst `economy` zum selben Modell auf wie `balanced`, statt eine Stufe zu sein, die nichts findet. Der xAI-Pfad steigt dadurch über die CLI von etwa \$0,07 auf etwa \$0,40–0,75 pro Review; `model: grok-4.3` lässt sich weiterhin ausdrücklich festlegen, um das frühere Verhalten zu behalten. Diese Zahlen sind veröffentlichte Messungen des Upstream-Projekts, nicht eigene von Deep Work Plan.

## Verhalten

- **Flow A ist die Baseline; Flow B wird erfragt, nie geraten.** Ein unaufgefordert installierter Workflow hat einen größeren Fußabdruck als beim Flow A zu bleiben.
- **Abstimmen, nicht überschreiben.** Vorhandener Skill, Erweiterung oder `pr-review.yml` bleiben erhalten; nur Lücken füllen.
- **Auth verschoben.** Provider-Secrets für CI werden vom Maintainer konfiguriert; dieses Addon speichert keine Anmeldeinformationen.
- **Anbieterneutral.** Es ist nie ein kommerzieller Dienst, CI-Anbieter oder Secret erforderlich; die CI-Oberfläche ist das einzige Stück, das einen Anbieter berührt.

## Hinweise

Lokale Überprüfung seit Standard 2.3.0 erforderlich; CI-Oberfläche optional. Upstream-Skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Spec-Seite: [Add-ons](/spec/addons).
