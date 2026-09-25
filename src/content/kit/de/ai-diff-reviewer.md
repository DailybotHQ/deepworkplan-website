---
title: AI Diff Reviewer
description: "Verifizierte kritische Findings im lokalen Review jedes DWP-Final-Reviews seit Standard 2.3.0; das CI-Gate und die address-review-Schleife bleiben optional."
kind: addon
lang: de
order: 5
---

# AI Diff Reviewer Addon

Jeder Deep Work Plan endet auf dieselbe Weise: mit einem verpflichtenden **Final Review**, der den gesamten angesammelten Änderungssatz des Plans liest, bevor die Arbeit als erledigt gelten darf. Sein Sicherheitsdurchgang ist der letzte Punkt, an dem überhaupt noch etwas auffallen kann. Ohne Hilfe ist der einzige Leser an dieser Stelle derselbe Agent, der den Code geschrieben hat.

Dieses Addon setzt einen zweiten Leser auf dieses Diff an. Es bindet den **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — im Marketplace gelistet als "AI Diff Reviewer", aktuelle Release **v3.1.1** — in den Sicherheitsdurchgang ein, wo er statt Prosa etwas Strukturiertes zurückgibt: ein Urteil, eine Tabelle der Findings und einen Schweregrad je Finding. Seit v3 bedeutet ein `critical`-Finding, dass der Verifizierer des Addons es mit einem zweiten, codegestützten Modellaufruf bestätigt hat; nur verifizierte kritische Findings blockieren den Abschluss, bis sie behoben oder ausdrücklich akzeptiert sind. Die Überprüfung ist ein Gate, kein Kommentar.

Seit Standard 2.3.0 ist diese lokale Überprüfung **Teil der Baseline, kein Zusatz**. Das Onboarding installiert sie; jedes Final Review führt sie aus. Optional bleibt die CI-Oberfläche — Flow B, wo dieselbe Überprüfung Pull Requests über die GitHub Action absichert.

Die Grenze, die das bedenkenlos adoptierbar macht, ist bewusst eng gezogen. Der Reviewer ist eine MIT-lizenzierte, tag-gepinnte Skill, ausgeführt von dem Coding-Agent, den Sie ohnehin betreiben — kein Deep-Work-Plan-Flow hängt damit von einem kommerziellen Dienst, einem CI-Anbieter oder einem Secret ab. **Flow A** (nur lokal) ist das, was jedes geonboardete Repository erhält; **Flow B** wird ausdrücklich angeboten und nie unaufgefordert installiert. Entwickelnde können den Reviewer auch rundheraus ablehnen — diese Ablehnung wird als deklarierte Ausnahme festgehalten, und `verify` meldet das Repository in diesem Punkt als nicht konform, bis er installiert ist.

## Wann es zu verwenden ist

| Signal | Aktion |
|--------|--------|
| Jedes geonboardete Repository | **Flow A wird installiert** in Onboarding-Phase 7a (vendorte Skill + `.review/extension.md`); ein zielgerichtetes Harness-Upgrade fügt es Repositorys hinzu, die früher onboardet wurden |
| Team möchte einen CI-PR-Merge-Gate mit strukturierten Ergebnissen | **Flow B anbieten** — explizites Opt-in, niemals der Standard |
| Persönliches oder experimentelles Repository; lokale Überprüfung reicht aus | **Bei Flow A bleiben** — die Baseline ist vollständig |

## Zwei Adoptionsflows

| Flow | Was du erhältst |
|------|----------------|
| **A — nur lokal (Baseline)** | Vendorte Skill + erforderliche `.review/extension.md` (über `generate-extension`). Führt die lokale Überprüfung im Sicherheitsdurchgang jedes Final Review aus. Kein GitHub-Actions-Workflow. |
| **B — doppelte Oberfläche** | Flow A plus `setup` schreibt den Review-Workflow (Action `@v3`), dieselbe Erweiterungsdatei für lokal und CI. Optionale `apply-review`- und `address-review`-Begleiter, nachdem CI Findings veröffentlicht hat. |

Die Erkennung für die lokale Überprüfung erfordert **Skill + eine Erweiterungsdatei** an einem dieser Orte: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` oder `.github/ai-pr-reviewer/extension.md`. Die Skill allein reicht nicht aus.

## Was dieses Addon verbindet (bewusst begrenzt)

Das DWP-Addon **erfindet** den Reviewer nicht neu. Es delegiert Installation, Methodik, den CI-Assistenten, Erweiterungsautorenschaft, PR-Entwurf und Post-CI-Review-Schleifen an die sechs Sub-Skills des Upstream-Skills (übergeordneter Standardflow, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### Die erforderliche lokale Überprüfung

`create` fügt den lokalen Überprüfungsschritt zum Sicherheitsdurchgang jedes Final Review hinzu, und `execute` führt ihn aus. Die Ausgabe wird unter `## AI Diff Reviewer local review` in der plan-lokalen `analysis_results/SECURITY_REVIEW.md` (im eigenen Ordner des Plans, nie im Repository-Root) angehängt.

- **Fehlender Reviewer — aufgezeichnet, niemals still übersprungen:** eine fehlende Skill oder Erweiterung wird zu einem `local reviewer not installed`-Finding; das Final Review führt den lokalen Durchlauf aus, wenn die Skill vorhanden ist, und trägt das Finding andernfalls in den Abschlussbericht — die Installation gehört zur Onboarding-Zustimmung oder zu einem expliziten Addon-Aufruf, niemals ein Überraschungs-Bootstrap.
- **Soft-Fail (nur Aufruf):** eine Überprüfung, die starten konnte, aber fehlschlägt → einmal warnen, aufzeichnen, fortfahren; die Aufgabe nie für diesen Fehler scheitern lassen.
- **Gate nach einem abgeschlossenen Durchlauf:** **verifizierte** `critical`-Findings blockieren den Abschluss des Final Review, bis sie behoben oder ausdrücklich akzeptiert sind (BC-07). Unverifizierte kritische Behauptungen kommen als annotierte Warnungen an — sichtbar, nicht blockierend, außer `strict-unverified-criticals: true` stellt die behauptungsbasierte Blockierung wieder her. Eine Überprüfung, die ihr Rundenlimit (`incomplete`) oder ihre Laufzeitgrenze (`timeout`) erreicht hat, ist unter blockierender Strenge kein sauberer Durchlauf (BC-04). `warning` / `info` werden dokumentiert, blockieren aber nicht.
- **Flow A benötigt kein CI-Secret.** Ein nicht gesetzter Provider-Schlüssel darf den lokalen Durchlauf nicht unterdrücken.

### Flow-B-CI-Gate (optional)

Action `DailybotHQ/ai-diff-reviewer@v3`, typischerweise Label-gesteuert (`ready`), mit einem stabil benannten **AI review gate**-Job für den Branch-Schutz und dem Opt-in `skip-review-label: skip-ai-review`. Seit v3 folgt das Review-Budget der deterministischen Risikostufe der Änderung — 8/20/30/40 Runden von `low` bis `critical` unter `budget-profile: auto` (`fixed` stellt während der Übergangszeit die Konstanten vor v3 wieder her) — und ein Push, der keinen Code ändert, führt eine reine Verifiziererrunde aus. Gemeinsames `prompt.md` + Erweiterung richten Methodik und Schweregrad aus; lokal und CI bleiben methodisch identisch, während CI-Runden 2+ unter iterationsbewusster Überprüfung kürzer sein können und der lokale Durchlauf vollständig bleibt.

### Optionale Review-Begleiter

Zwei vom Entwickler aufgerufene Sub-Skills schließen die Schleife, nachdem CI eine Überprüfung veröffentlicht hat; keiner von beiden ist je eine Planaufgabendatei (das würde die obligatorische Aufgabenreihenfolge brechen).

- `apply-review` durchläuft Findings einzeln (anwenden / zurückstellen / überspringen) mit Zustimmung. Standardmäßig nur lesend; committet und pusht nie.
- `address-review` (neu in v3.1.1) ist die Ein-Aufruf-Schleife: offene PRs des Branchs finden, prüfen, dass die Überprüfung zum aktuellen Head aktuell ist, die Findings mit einem Anwenden/Zurückstellen/Überspringen-Plan vorlegen und dann — auf ein einziges Ja — anwenden, in kleinen Conventional-Commits-Batches committen, pushen und den Reviewer erneut scharfschalten, so wie das Repository ihn auslöst (Label-gesteuert → das Label aus- und wieder einschalten; Push-ausgelöst → den neuen Lauf bestätigen). Anders als `apply-review` committet und pusht es; genau das ist der Sinn der Schleife. Bei aggregierten Ensemble-Überprüfungen liest es das Aggregatdokument und den `ai-pr-reviewer-aggregate`-Marker.
- Der Maschinenpfad ist die strukturierte Ausgabe, nicht der Review-Text: Das Dokument `review-output/3.0` (`.aiprr/review-output.json`, über die Ausgaben `structured-output-path` und `structured-output-sha256` aufgefunden) trägt den Laufbericht, Findings mit Belegen und Verifizierung, widerlegte Findings und das Gate. Ein Review-Text, der `Recommendation: approve` sagt, ist kein Beleg dafür, dass der Check bestanden hat — zuerst den Block Highest severity / Strictness gate / Check status des Tracking-Markers lesen.

## Was sich in v3 geändert hat

Drei Releases erschienen am 2026-09-24 (v3.0.0, v3.0.1, v3.1.0), und v3.1.1 folgte mit dem Sub-Skill `address-review`. Keines davon ändert, wie dieses Addon den Reviewer einbindet — Flow A, die drei Erkennungspfade und die Stufenfolge des Nie-Blockierens bleiben unverändert —, aber sie ändern, was Anwendende bekommen.

| Änderung | Was das für ein DWP-Repository bedeutet |
|----------|------------------------------------------|
| **Ein `critical` wird nur verifiziert veröffentlicht** (v3.0.0) | Jede behauptete kritische Meldung — plus eine Stichprobe von 30 % der Warnungen — erhält eine zweite, kurze, codegestützte Prüfung durch einen separaten Modellaufruf (≈ 3 k Token, 10 s und $0.009 je verifiziertem Finding). Verifizierte kritische Findings bilden das Gate des Sicherheitsdurchgangs; widerlegte Behauptungen bleiben als annotierte Warnungen sichtbar und werden in der strukturierten Ausgabe aufgelistet, nie inline veröffentlicht. |
| **Budgets folgen der Risikostufe** (v3.0.0) | 8/20/30/40 Runden von `low` bis `critical`, abgeleitet aus dem Änderungsinventar (`budget-profile: auto`). Ein Push, der keinen Code ändert, führt eine reine Verifiziererrunde zu −93 % Kosten aus. `budget-profile: fixed` stellt die 30-Runden-Konstanten vor v3 wieder her. |
| **Eine unvollendete Überprüfung ist rot** (v3.0.0) | `incomplete` (Rundenlimit) und `timeout` (Laufzeitgrenze) veröffentlichen Teilfindings und scheitern an jeder blockierenden Strenge — „keine Findings“ heißt jetzt immer, dass der Reviewer hingesehen und nichts gefunden hat. |
| **Die strukturierte Ausgabe ist der Maschinenpfad** (v3.0.0) | Das Dokument `review-output/3.0` trägt den Laufbericht, das Änderungsinventar, Findings mit typisierten Belegen und Verifizierung, widerlegte Findings und das Gate. Das Dokument lesen, statt Review-Texte zu scrapen. |
| **Sechs Sub-Skills** (v3.1.1) | `address-review` kommt zum Router hinzu: ein einziger Aufruf wendet an, committet, pusht und schaltet den Reviewer erneut scharf. |
| **Optionales Ensemble** (v3.0.0) | Schreibgeschützte `mode: emit`-Beine plus ein `aggregate`-Job verifizieren die konsolidierten Findings einmal und veröffentlichen eine einzige Überprüfung. |
| **`@v2` funktioniert weiter** | Die v2-Linie ist auf `release/v2` eingefroren, mit sechs Monaten Sicherheits- und Katalogwartung. v3 ist die Empfehlung, nie eine erzwungene Migration. |

Zwei davon wiegen für die Methodik schwerer als der Rest.

**Das Gate für verifizierte kritische Findings härtet den Sicherheitsdurchgang ab.** Vor v3 konnte ein Modell ein `critical` frei behaupten, und das Gate folgte der Behauptung. Jetzt bedeutet ein kritisches Finding in einem Final Review, dass ein zweiter Modellaufruf es am Code bestätigt hat, und die Release-Kampagne hat den Unterschied gemessen: 771 bezahlte Evaluationsläufe über zehn Kampagnen zu insgesamt etwa $83, wobei die kritische Stufe 63/63 Recall bei bewerteter Präzision 1.0 erreichte und inkrementelle Runden die Eingabe-Token um 62–76 % senkten. Diese Zahlen sind veröffentlichte Messungen des Upstream-Projekts, nicht eigene von Deep Work Plan.

**`economy` ist bewusst nicht günstiger.** Der Upstream-Benchmark vom 2026-09-16 maß `grok-4.3` bei 0 von 5 bekannten Defekten — es genehmigt, ohne zu prüfen —, während `grok-4.5` mit 3 von 5 ohne Fehlalarme mit `grok-4.6` gleichzog, bei gleichen Kosten und einem Viertel der Laufzeit. Da kein günstigeres xAI-Modell noch wirklich prüft, löst `economy` sich zum selben Modell auf wie `balanced`, statt eine Stufe zu sein, die nichts findet; auf dem grok-Runner skaliert das Rundebudget der Risikostufe die Kosten, nicht die Modellwahl. Der xAI-Pfad steigt dadurch über die CLI von etwa $0.07 auf etwa $0.40–0.75 pro Review; Seit dem v3.0-Prompt hat eine Nachmessung über 63 Läufe `grok-4.3` von 0 von 5 auf 83 % Recall bei null falschen Positiven und ~31 % niedrigeren Kosten gebracht — aber sie scheitert immer noch etwa dreimal so oft wie `grok-4.5` am Schreiben ihrer Befunddatei; daher bleibt `grok-4.5` der Standard und `model: grok-4.3` eine ausdrückliche, akzeptierte Abwägungswahl. Diese Zahlen sind veröffentlichte Messungen des Upstream-Projekts, nicht eigene von Deep Work Plan.

## Verhalten

- **Flow A ist die Baseline; Flow B wird erfragt, nie geraten.** Ein unaufgefordert installierter Workflow hat einen größeren Fußabdruck als beim Flow A zu bleiben.
- **Abstimmen, nicht überschreiben.** Vorhandene Skill, Erweiterung oder Review-Workflow bleiben erhalten; nur Lücken füllen.
- **Auth verschoben.** Provider-Secrets für CI werden vom Maintainer konfiguriert; dieses Addon speichert keine Anmeldeinformationen.
- **Anbieterneutral.** Es ist nie ein kommerzieller Dienst, CI-Anbieter oder Secret erforderlich; die CI-Oberfläche ist das einzige Stück, das einen Anbieter berührt.

## Hinweise

Lokale Überprüfung seit Standard 2.3.0 erforderlich; CI-Oberfläche optional. Upstream-Skill: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Upstream-Migrationsleitfaden: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Spec-Seite: [Add-ons](/spec/addons).
