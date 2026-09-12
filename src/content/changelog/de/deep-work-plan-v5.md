---
title: "DWP v5: die Versprechen, jetzt garantiert"
description: "Deep Work Plan v5 macht acht langjährige Versprechen zu geprüften Verträgen — ein ehrlicher Verifizierer, eine einzige Freigaberegel, Orchestrierung ohne Datenkorruption und ein sicherer Upgrade-Pfad."
date: 2026-09-12
version: "v5 · Durch Tests garantiert"
kind: release
lang: de
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Heute veröffentlichen wir Deep Work Plan v5. Die ehrliche Zusammenfassung dieses Releases: Die Methodik hat all dies bereits versprochen — jetzt garantiert sie es. Vor v5 konnte ein Agent, der die Dokumentation buchstabengetreu befolgte, dennoch in realen Fehlerszenarien landen; jedes dieser Szenarien ist jetzt geschlossen und durch einen ausführbaren Test abgesichert. Die Vertragssuite des Skills wuchs in diesem Zyklus von 132 auf 258 Tests, und jede der folgenden Garantien wurde live gegen das veröffentlichte Tag validiert — in ein sauberes Repository installiert und durch die eigenen Abläufe geführt, bevor dieser Eintrag geschrieben wurde.

**Ein Verifizierer, der niemals ungeprüfte Erfolge behauptet.** Konformitätsprüfungen degradierten früher stillschweigend: Ohne fähigen Interpreter übersprangen sie jede Prüfung und druckten dennoch ein konformes Urteil, und fetter Text innerhalb eines Feldes konnte als fehlendes Feld fehlgedeutet werden. Heute beendet der Verifizierer mit einem expliziten `UNVERIFIED`-Urteil, wann immer er nicht tatsächlich prüfen kann. Ein Verifizierer meldet keinen Erfolg, den er nicht geprüft hat — Vertrauen in Gates ist das gesamte Versprechen, und ein Gate, das die eigene Prüfung überspringen kann, bricht die Kette.

**Ein einziger Freigabevertrag für Lite-Pläne.** Drei Oberflächen beantworteten die Frage „beginnt dieser Plan die Freigabe des aktuellen Umfangs?" auf drei verschiedene Arten, und ein Agent konnte genau an der gefährlichsten Grenze in einen Deadlock laufen oder ohne Autorisierung arbeiten. v5 legt überall einen Vertrag fest: Ein explizites execute oder resume genehmigt den aktuellen ready-Umfang und protokolliert diese Freigabe, bevor irgendwelche Arbeit erfolgt; ein ausstehender Vorschlag allein autorisiert nichts; ein unterbrochenes Promotion wird wiederhergestellt, bevor Produktarbeit läuft.

**Multi-Repo-Orchestrierung, die nichts korrumpiert.** Die Umgebungs-Überschreibung eines Orchestrator-Hubs sickerte früher in die Kind-Repositories — ein Kind konnte Planzustand in die Ordner des Hubs selbst schreiben. Die Orchestrator-Vorlagen druckten außerdem `FAIL` und beendeten sich dennoch erfolgreich, und eine Vollständigkeitsprüfung, die nur nach einer Statuszeichenkette greppte, konnte eine erledigte Aufgabe als vollendeten Plan lesen. Jetzt wird der Hub-Root gesichert, bevor in Sub-Repositories navigiert wird, jedes Kind löst sein eigenes `.dwp/` isoliert auf, jeder Fehlzweig endet mit einem Fehler, die Vollständigkeit wird aus dem Status der obersten Ebene des Plans gelesen, und der Devcontainer-Entrypoint gibt Kopierfehler weiter, bevor irgendetwas gelöscht wird.

**Eine einzige Consent-Matrix für Add-ons.** Welches Add-on standardmäßig installiert wird, welches nur angeboten wird und welche Review Pflicht ist — früher antworteten die Oberflächen unterschiedlich. v5 erklärt eine Matrix: Der AI Diff Reviewer ist für lokale Reviews erforderlich, auf ein verifiziertes Release gepinnt, mit CI-Review als explizitem Opt-in, das sich nie selbst installiert; das design-system-Add-on ist ein Pflichtangebot, wenn UI-Arbeit erkannt wird, installiert sich aber nur bei ausdrücklicher Annahme; das dependency-upgrade-Add-on kommt als nahezu standardmäßiger, inerter Delegator mit exaktem Snapshot-Rollback; dailybot meldet nur, wo autorisiert. Ein leerer Diff zählt nicht mehr als abgeschlossene Review.

**Echte Maschinerie für lange Pläne.** Eine Auditierung von 108 realen Plänen zeigte: Parallelisierbares war verbreitet, aber die Sequenzial-Entscheidung wurde fast nie deklariert, und Stage Gates existierten nur als Ad-hoc-Praxis. v5 lässt die Ausführungsentscheidung immer deklarieren — sequenziell mit dokumentiertem Grund, wenn Parallelisierung nicht angebracht ist —, fügt optionale Stage Gates für Pläne mit zwanzig oder mehr Aufgaben hinzu und reichert die Plan Variables um Rigorstufe, Evidenzmaß und verbotene Aktionen an. All das lädt progressiv und belastet nie einen Lite-Plan.

**Kontext erzwungen, ein Ziel pro Aufgabe.** Pläne konnten zu kontextlosen Aufgabenlisten abdriften, und eine Aufgabe konnte drei Ziele hinter einem einzigen grünen Gate bündeln. v5 verlangt ein Goal-und-Context-Paar auf Planebene sowie einen Context pro Aufgabe — was eine neue Session braucht, um diese Aufgabe allein zu starten — in jedem neuen Datensatz (abgeschlossene Datensätze bleiben exakt wie geschrieben), und macht ein Ziel pro Aufgabe zur normativen Regel mit einer Wächterklausel gegen Verfall.

**Ein sicherer Upgrade-Pfad.** `/dwp-upgrade` ist neu. Die Prüfphase ist read-only und installiert nichts; ein Upgrade beginnt nur nach ausdrücklicher Annahme, wobei lokale Anpassungen diffed und offengelegt werden, bevor irgendetwas überschrieben wird; die Installation zielt auf ein exaktes Tag und verifiziert sich selbst; das Onboarding läuft als frisches Init erneut. Ein Upgrade berührt niemals `.dwp/` — kein Plan, keine Zustandsdatei, kein Gate-Eintrag und keine Evidenz wird migriert, umgeschrieben oder ungültig gemacht.

**Ehrliche, messbare Evidenz.** Effizienzbehauptungen werden jetzt über drei Baselines neu vermessen — v3.0.0, v4.0.3 und den finalen Baum — mit dem Messskript committet im Repository. Ergebnisse werden in Dateisystem-Bytes berichtet und niemals in Token- oder Kostenzahlen umgerechnet, für die wir nicht gerade stehen; jede nicht verifizierbare Behauptung wird im Evaluierungsrecord als solche quarantäniert.

Deep Work Plan v5 folgt dem DWP-Standard 4.0.0. Lesen Sie die [normative Spezifikation](https://deepworkplan.com/spec), sehen Sie sich das [Skill-Repository](https://github.com/DailybotHQ/deepworkplan-skill) an oder beginnen Sie die Einführung bei [`/init`](https://deepworkplan.com/init).
