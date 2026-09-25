---
title: "DWP v5: die Versprechen, jetzt garantiert"
description: "Deep Work Plan v5 macht acht langjährige Versprechen zu geprüften, versionierten Verträgen — ein ehrlicher Verifizierer, sichere Orchestrierung und ein bewährter Upgrade-Pfad."
date: 2026-09-12
version: "v5 · Durch Tests garantiert"
kind: release
lang: de
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Skill-Release-Commit ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Skill-Release v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Skill-Release v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Skill-Release v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "Skill-Release v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "Skill-Release v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "Reviewer-Release v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/ai-diff-reviewer/releases/tag/v3.1.1"
---

Heute veröffentlichen wir Deep Work Plan v5. Dies ist keine Neufassung: Es sind Monate realer Nutzung — einschließlich einer direkten Auditierung von 108 realen Plänen —, die Lücke für Lücke genau dort offengelegt haben, wo die Versprechen der Methodik und das tatsächliche Verhalten eines Agenten auseinanderfallen konnten. Die ehrliche Zusammenfassung dieses Releases: Die Methodik hat all dies bereits versprochen — jetzt garantiert sie es. Vor v5 konnte ein Agent, der die Dokumentation buchstabengetreu befolgte, dennoch in realen Fehlerszenarien landen; jedes dieser Szenarien, durch diese Nutzung und dieses Feedback identifiziert, ist jetzt geschlossen und durch einen ausführbaren Test abgesichert, statt mit mehr Prosa überdeckt. Die Vertragssuite des Skills wuchs in diesem Zyklus von 132 auf 258 Tests, und jede der folgenden Garantien wurde live gegen das veröffentlichte Tag validiert — in ein sauberes Repository installiert und durch die eigenen Abläufe geführt, bevor dieser Eintrag geschrieben wurde.

**Ein Verifizierer, der niemals ungeprüfte Erfolge behauptet.** Konformitätsprüfungen degradierten früher stillschweigend: Ohne fähigen Interpreter übersprangen sie jede Prüfung und druckten dennoch ein konformes Urteil, und fetter Text innerhalb eines Feldes konnte als fehlendes Feld fehlgedeutet werden. Heute beendet der Verifizierer mit einem expliziten `UNVERIFIED`-Urteil, wann immer er nicht tatsächlich prüfen kann. Ein Verifizierer meldet keinen Erfolg, den er nicht geprüft hat — Vertrauen in Gates ist das gesamte Versprechen, und ein Gate, das die eigene Prüfung überspringen kann, bricht die Kette.

**Ein einziger Freigabevertrag für Lite-Pläne.** Drei Oberflächen beantworteten die Frage „beginnt dieser Plan die Freigabe des aktuellen Umfangs?" auf drei verschiedene Arten, und ein Agent konnte genau an der gefährlichsten Grenze in einen Deadlock laufen oder ohne Autorisierung arbeiten. v5 legt überall einen Vertrag fest: Ein explizites execute oder resume genehmigt den aktuellen ready-Umfang und protokolliert diese Freigabe, bevor irgendwelche Arbeit erfolgt; ein ausstehender Vorschlag allein autorisiert nichts; ein unterbrochenes Promotion wird wiederhergestellt, bevor Produktarbeit läuft.

**Multi-Repo-Orchestrierung, die nichts korrumpiert.** Die Umgebungs-Überschreibung eines Orchestrator-Hubs sickerte früher in die Kind-Repositories — ein Kind konnte Planzustand in die Ordner des Hubs selbst schreiben. Die Orchestrator-Vorlagen druckten außerdem `FAIL` und beendeten sich dennoch erfolgreich, und eine Vollständigkeitsprüfung, die nur nach einer Statuszeichenkette greppte, konnte eine erledigte Aufgabe als vollendeten Plan lesen. Jetzt wird der Hub-Root gesichert, bevor in Sub-Repositories navigiert wird, jedes Kind löst sein eigenes `.dwp/` isoliert auf, jeder Fehlzweig endet mit einem Fehler, die Vollständigkeit wird aus dem Status der obersten Ebene des Plans gelesen, und der Devcontainer-Entrypoint gibt Kopierfehler weiter, bevor irgendetwas gelöscht wird.

**Eine einzige Consent-Matrix für Add-ons.** Welches Add-on standardmäßig installiert wird, welches nur angeboten wird und welche Review Pflicht ist — früher antworteten die Oberflächen unterschiedlich. v5 erklärt eine Matrix: Der AI Diff Reviewer ist für lokale Reviews erforderlich, auf ein verifiziertes Release gepinnt, mit CI-Review als explizitem Opt-in, das sich nie selbst installiert; das design-system-Add-on ist ein Pflichtangebot, wenn UI-Arbeit erkannt wird, installiert sich aber nur bei ausdrücklicher Annahme; das dependency-upgrade-Add-on kommt als nahezu standardmäßiger, inerter Delegator mit exaktem Snapshot-Rollback; dailybot meldet nur, wo autorisiert. Ein leerer Diff zählt nicht mehr als abgeschlossene Review.

**Echte Maschinerie für lange Pläne.** Eine Auditierung von 108 realen Plänen zeigte: Parallelisierbares war verbreitet, aber die Sequenzial-Entscheidung wurde fast nie deklariert, und Stage Gates existierten nur als Ad-hoc-Praxis. v5 lässt die Ausführungsentscheidung immer deklarieren — sequenziell mit dokumentiertem Grund, wenn Parallelisierung nicht angebracht ist —, fügt optionale Stage Gates für Pläne mit zwanzig oder mehr Aufgaben hinzu und reichert die Plan Variables um Rigorstufe, Evidenzmaß und verbotene Aktionen an. All das lädt progressiv und belastet nie einen Lite-Plan.

**Kontext erzwungen, ein Ziel pro Aufgabe.** Pläne konnten zu kontextlosen Aufgabenlisten abdriften, und eine Aufgabe konnte drei Ziele hinter einem einzigen grünen Gate bündeln. v5 verlangt ein Goal-und-Context-Paar auf Planebene sowie einen Context pro Aufgabe — was eine neue Session braucht, um diese Aufgabe allein zu starten — in jedem neuen Datensatz (abgeschlossene Datensätze bleiben exakt wie geschrieben), und macht ein Ziel pro Aufgabe zur normativen Regel mit einer Wächterklausel gegen Verfall.

**Ein sicherer Upgrade-Pfad.** `/dwp-upgrade` ist neu. Die Prüfphase ist read-only und installiert nichts; ein Upgrade beginnt nur nach ausdrücklicher Annahme, wobei lokale Anpassungen diffed und offengelegt werden, bevor irgendetwas überschrieben wird; die Installation zielt auf ein exaktes Tag und verifiziert sich selbst; das Onboarding läuft als frisches Init erneut. Ein Upgrade berührt niemals `.dwp/` — kein Plan, keine Zustandsdatei, kein Gate-Eintrag und keine Evidenz wird migriert, umgeschrieben oder ungültig gemacht.

**Ehrliche, messbare Evidenz.** Effizienzbehauptungen werden jetzt über drei Baselines neu vermessen — v3.0.0, v4.0.3 und den finalen Baum — mit dem Messskript committet im Repository. Ergebnisse werden in Dateisystem-Bytes berichtet und niemals in Token- oder Kostenzahlen umgerechnet, für die wir nicht gerade stehen; jede nicht verifizierbare Behauptung wird im Evaluierungsrecord als solche quarantäniert.

**Ein versionierter, veröffentlichter Vertrag.** Jedes Versprechen oben wird durch Daten gestützt, die andere Werkzeuge lesen können, nicht nur durch Prosa: Die Formate plan-manifest und plan-state sind jetzt als v5-Schemalinie versioniert — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) und [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) —, sodass ein Plan, ein Verifizierer oder ein Drittanbieter-Tool die Konformität gegen einen veröffentlichten, maschinenlesbaren Vertrag prüfen kann, statt gegen einen Absatz Dokumentation. Nichts in der v5-Linie ändert die Form gegenüber v2: bestehende Pläne, die auf v1- oder v2-Schemas verweisen, bleiben gültig und werden nie umgeschrieben.

Deep Work Plan v5 folgt dem DWP-Standard 5.0.0. Lesen Sie die [normative Spezifikation](https://deepworkplan.com/spec), sehen Sie sich das [Skill-Repository](https://github.com/DailybotHQ/deepworkplan-skill) an oder beginnen Sie die Einführung bei [`/init`](https://deepworkplan.com/init).

## Update — 2026-09-17 · Skill v5.4.0

Das erste Point-Release der v5-Linie schließt den letzten Weg, auf dem ein Plan über nie wirklich geprüfte Arbeit hätte abschließen können, und klärt, wo die Evidenz eines Plans liegt. Der DWP-Standard 5.0.0 bleibt unverändert: dies ist ein Addon-Vertrags- und Dokumentations-Release, keine Schemaänderung.

**Eine Überprüfung, die nie lief, ist nicht länger von einer sauberen zu unterscheiden.** Der Sicherheitsdurchgang des Final Review trennte bereits einen fehlenden Reviewer — als Befund festgehalten — von einem fehlgeschlagenen Aufruf, der einmal warnt und weitermacht. Der Reviewer stromaufwärts brachte einen dritten Ausgang hinzu: einen Lauf, der startet und dann endet, ohne einen einzigen Befund zu schreiben. Ohne eigenen Namen fiel er mit „der Durchgang wurde abgeschlossen und fand nichts" zusammen — womit ein Plan über eine Überprüfung abschließen könnte, die nie stattgefunden hat. Nun ist es ein eigener Zustand: als unvollständige Überprüfung festgehalten, nie als Beleg dafür gezählt, dass der Änderungssatz sauber ist, und nie ein Grund, das Final Review zu schließen. Drei verschiedene Ausgänge — und keiner davon heißt, das Diff sei gelesen und sauber befunden worden.

**Die Evidenz eines Plans gehört dem Plan.** Der Standard legte den Analysebericht, das Skills-Register, die Sicherheitsüberprüfung und die Gate-Logs bereits in das `analysis_results/` des Plans selbst, sprach diese Ausschließlichkeit aber nie als Regel aus. Ein repositoryeigenes Audit-Werkzeug, dessen Berichtspfad standardmäßig im Arbeitsverzeichnis liegt, konnte die Evidenz eines Plans deshalb ins Repository-Root schreiben, ohne dass ein Flow es bemerkte. Die Spezifikation verlangt es jetzt: Alles, was ein Flow über einen Plan erzeugt, gehört in dessen Ordner, und einem Werkzeug mit Arbeitsverzeichnis als Standardausgabe muss seine ausdrückliche Ausgabeoption mitgegeben werden. Evidenz, die nicht dort liegt, wo der Plan sagt, ist verloren — das ist der praktische Grund für die Regel, keine Ablagevorliebe.

**Der AI-Diff-Reviewer-Pin rückt auf v2.3.0.** Die verpflichtende lokale Überprüfung installiert nun einen Reviewer, der Runner und Backend trennt: dieselbe Überprüfung läuft damit gegen jeden kompatiblen Endpunkt, ohne zu ändern, wovon DWP abhängt — die Neutralitätsgarantie wird stärker, nicht lockerer. Hinzu kommen prüfsummen-verifizierte Installer, gemessene statt geschätzte Kostenvorgaben und Folgerunden, die das tatsächlich neue Diff prüfen und offene Befunde mitnehmen. Letzteres hat eine vertragliche Folge, die man klar sagen sollte: Dass ein Modell selbst einen Befund für behoben erklärt, zieht ihn nicht zurück — das tut eine wartende Person.

**Arbeitsprinzipien werden nun mit dem Harness ausgeliefert.** `v5.5.0`, noch am selben Tag, lässt das Onboarding den Agents eines Repositories beibringen, *wie* zu arbeiten ist — nicht nur, was das Repository enthält: zehn kompakte Verhaltensweisen — das Ergebnis verantworten, vor dem Fragen recherchieren, Routineentscheidungen eigenständig treffen, eskalieren wenn Urteilsgrundlage oder Autorisierung wirklich fehlt, und vor der Fertigmeldung verifizieren, unter anderem — inline in `AGENTS.md` geschrieben, wo ein Agent sie findet, der nur den Einstiegspunkt liest. Sie sind Vorgaben innerhalb einer Anfrage, nie neue Autorität: sie können Host-Berechtigungen, einen engeren Umfang, Plan-Gates oder die Freigaberegeln des Repositories nicht übergehen. Ein Upgrade gleicht sie nach Bedeutung statt nach Stichwort ab, sodass bereits vorhandene gleichwertige Regeln erhalten statt umgeschrieben werden.

**Der AI-Diff-Reviewer-Pin rückt auf v2.3.1.** Skill `v5.5.1` installiert den Reviewer, dessen Check, Review-Text und Tracking-Kommentar übereinstimmen. Ein Text, der `Recommendation: approve` sagt, ist kein Beleg dafür, dass der Check bestanden hat — lesen Sie den Check status-Block des Tracking-Markers. Unter advisory kann eine belegte Korrektur einen Befund zurückziehen, dessen Thread bereits eingeklappt ist, sodass ein feststeckender PR nach einer echten Korrektur grün werden kann.


Lesen Sie die [Spezifikation](https://deepworkplan.com/spec) für den normativen Text, die [Addon-Referenz](https://deepworkplan.com/kit/ai-diff-reviewer) für das, was der Reviewer jetzt leistet, oder das [v5.5.1-Release](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) für die Quelle.

## Aktualisierung — 2026-09-25 · Skill v5.5.3 + Reviewer v3.1.1

Das AI-Diff-Reviewer-Addon dokumentiert und installiert nun die **v3**-Linie des Reviewers, veröffentlicht am 2026-09-24 (v3.0.0 → v3.1.1, beweglicher Pin `@v3`). Skill `v5.5.2` hat die normativen Dokumente des Addons, den Onboarding-Hook und die Integration-Vorlage um das geschrieben, was der v3-Reviewer wirklich tut, und `v5.5.3` hat die CI-Seite ausgeliefert. Die tragenden Änderungen, geprüft gegen den veröffentlichten Reviewer am Tag `v3.1.1`:

**Ein `critical` gate't nur, wenn er verifiziert ist.** Seit v3 erhält jeder kritische Befund, den ein Modell behauptet — plus eine 30-%-Stichprobe der Warnungen — eine zweite kurze codebasierte Prüfung durch einen separaten Modellaufruf (≈ 3 k Tokens, 10 s und $0.009 je verifiziertem Befund). Ein `critical` wird veröffentlicht — und blockiert das Final Review — nur, wenn dieser Verifizierer ihn bestätigt; widerlegte Behauptungen bleiben als annotierte Warnungen sichtbar und werden in der strukturierten Ausgabe aufgelistet, nie inline gepostet. Eine Überprüfung, die ihr Turn-Limit (`incomplete`) oder ihre Wanduhr (`timeout`) ausschöpft, ist unter blockierender Strenge rot: „keine Befunde" heißt jetzt immer, der Reviewer hat gesehen und nichts gefunden.

**Das Budget folgt der Risikostufe.** Das Review-Budget leitet sich aus der deterministischen Risikostufe der Änderung ab — 8/20/30/40 Turns von `low` bis `critical` —, und ein Push ohne Codeänderung führt eine nur-Verifizierer-Runde mit −93 % Kosten aus. `budget-profile: fixed` stellt die Konstanten von vor v3 während der Übergangszeit wieder her; inkrementelle Runden senken die Eingabe-Tokens um 62–76 %.

**Sechs Sub-Skills, eine davon eine Schleife.** Der Router gewinnt `address-review` (neu in v3.1.1): ein einziger Aufruf findet die offenen PRs des Branches, prüft, ob das Review den aktuellen Head abdeckt, präsentiert die Befunde und — auf ein einziges Ja hin — wendet an, committet in kleinen Conventional-Commits-Batches, pusht und rüstet den Reviewer so nach, wie das Repository ihn auslöst. `apply-review` bleibt rein lesend; die strukturierte Ausgabe (`review-output/3.0`) ist der Maschinenweg für jede Automatisierung. Die `@v2`-Linie bleibt auf `release/v2` mit sechs Monaten Sicherheits- und Katalogpflege eingefroren — v3 ist die Empfehlung, nie eine erzwungene Migration.

**Der Reviewer reviewt nun seine eigenen Häuser.** Sowohl das Skill-Repository als auch diese Website führen ein etikettengestütztes CI-Review aus — ein einzelnes grok-Bein via `DailybotHQ/ai-diff-reviewer@v3`, ausgelöst einmal je Anwendung des Labels `ready` (Label entfernen und neu setzen, um erneut zu prüfen), mit ehrlichem Überspringen, wenn das Provider-Secret fehlt. Diese Website vendorisiert zudem den Reviewer v3.1.1, sodass das lokale Final Review und die Dokumentation nun denselben Vertrag lehren.

Lies die [Spezifikation](https://deepworkplan.com/spec), die [Addon-Referenz](https://deepworkplan.com/kit/ai-diff-reviewer) für die vollständige Liste der v3-Fähigkeiten, die [v5.5.3-Release](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) für die Quelle oder die [v3.1.1-Release des Reviewers](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) für das, was upstream geändert hat.
