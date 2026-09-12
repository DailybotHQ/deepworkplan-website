---
title: "Häufig gestellte Fragen — Deep Work Plan"
description: "Antworten auf häufige Fragen zu Deep Work Plan: Was es tut, wie Gates und Wiederaufnahme funktionieren, der Vergleich mit anderen Werkzeugen und die Adoption."
lastUpdated: 2026-09-12
---

## Häufig gestellte Fragen

Kurze Antworten auf die häufigsten Fragen zu Deep Work Plan, jeweils mit einem Link zur Seite, die tiefer geht.

## Was Deep Work Plan ist

### Was macht Deep Work Plan eigentlich?

Deep Work Plan verwandelt ein Repository in eine strukturierte Umgebung, in der ein Coding-Agent lange Arbeit zuverlässig ausführt. Er installiert sich als Agenten-Skill und onboardet das Repository einmal (einen `AGENTS.md`-Index, einen `docs/`-Baum, ein `.agents/`-Kit aus Skills und Befehlen, einen per gitignore ausgeschlossenen `.dwp/`-Ausgabebereich); von da an wird jedes Ziel zu einem Plan: atomare Aufgaben, jede mit Akzeptanzkriterien und einem Validierungs-Gate, einzeln ausgeführt, committet, sobald sie besteht, und von jedem Agenten von der Festplatte wieder aufnehmbar. Der Plan schließt mit einem Final Review, der die Sicherheit prüft und den Endzustand validiert. Die Methodik steht unter der MIT-Lizenz und funktioniert mit jedem Coding-Agenten, der ein Repository liest.

[Methodik lesen](https://deepworkplan.com/de/methodology)

### Für wen ist es?

Entwickler und Teams, die Coding-Agenten echte, mehrschrittige Arbeit übergeben und wollen, dass sie zu Ende geht. Es passt, wenn eine Aufgabe mehr als eine Sitzung, mehr als eine Dateifamilie oder mehr als einen Agenten umspannt; wenn ein Teammitglied dort anknüpfen können muss, wo ein Agent aufgehört hat; oder wenn „fertig“ „validiert“ heißen muss und nicht „der Agent behauptet es“. Ein Einzeiler braucht keinen Plan, und genau das sagt die Methodik: Ihre Regel des proportionalen Rigors empfiehlt stattdessen Ziel, Kriterien und Gate direkt inline.

[Schnellstart](https://deepworkplan.com/de/quickstart)

### Was ist der Unterschied zwischen einem Lite- und einem Full-Plan?

Eine Entscheidung der Darstellung, kein Kompromiss beim Rigor. Pläne sind standardmäßig Lite: ein kompaktes README mit verankerten Aufgabenprotokollen, das bereits ausführbar ist, kein partieller Entwurf. Wer von Anfang an einen Full-Plan verlangt, bekommt von `create` direkt Full-Aufgabendateien geschrieben; und ein Plan wird zu Full erweitert, wenn der Detailgrad der Anweisungen, die Abhängigkeiten oder die Verträge einer Aufgabe nicht mehr in ein überprüfbares kompaktes Protokoll passen. Eine spätere Beförderung behält jede abgeschlossene Aufgabe. Beide Formate tragen dieselben Akzeptanzkriterien, Validierungs-Gates, Evidenz und den verpflichtenden Final Review.

[Methodik lesen](https://deepworkplan.com/de/methodology)

### Ist es ein Werkzeug, ein Framework oder eine Methodik?

Eine Methodik, verpackt als installierbare Skill. Es gibt keinen Server, kein Konto, kein proprietäres Format und keine Laufzeitumgebung über den Coding-Agenten hinaus, den Sie bereits nutzen. Installiert werden Anweisungen, die der Agent liest, eine kleine Reihe von Shell-Skripten zur Kontexterfassung und zur Konformitätsprüfung sowie die Konventionen, die Ihr Repository übernimmt. Alles, was der Plan erzeugt, ist Markdown und JSON in Ihrem Repository — lesbar ohne jedes Werkzeug.

[Spezifikation lesen](https://deepworkplan.com/de/spec)

### Mit welchen Coding-Agenten funktioniert es?

Jeder Agent, der Repository-Dateien liest. Die Skill folgt dem offenen Agent-Skills-Standard und der `AGENTS.md`-Konvention, sodass Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot und andere sie über ihr gewöhnliches Laden von Skills und Anweisungen aufnehmen. Die eigene Evaluation der Methodik zeigt einen Plan, der vom Agenten eines Anbieters gestartet und vom Agenten eines anderen wieder aufgenommen wurde — in beide Richtungen. Installationsabdeckung und Verhaltensevidenz stehen je Agent in der Kompatibilitätsmatrix, und beides wird nie vermischt.

[Das Kit durchstöbern](https://deepworkplan.com/de/kit)

### Wie nutze ich es?

Drei Schritte. Installieren Sie zuerst die Deep Work Plan-Skill in Ihrem Coding-Agent — der schnellste Weg ist `npx skills add DailybotHQ/deepworkplan-skill` (oder klonen Sie das Skill-Repository und führen Sie `./setup.sh` aus). Zweitens onboarden Sie das Repository einmal, damit der Agent `AGENTS.md`, `docs/`, das `.agents/`-Kit und einen gitignorierten `.dwp/`-Bereich an Ihren Stack anpasst: verweisen Sie auf https://deepworkplan.com/init.md oder führen Sie `/deepworkplan-onboard` aus. Drittens planen und führen Sie die Arbeit mit den schlanken Befehlen aus: `/dwp-create <goal>` erstellt einen Plan; `/dwp-execute` führt ihn Aufgabe für Aufgabe gegen jedes Gate aus; `/dwp-refine` bearbeitet einen laufenden Plan (Umfang, Aufgaben oder die Beförderung eines Lite-Plans zu Full); `/dwp-resume` setzt nach einer Unterbrechung fort; `/dwp-status` meldet Fortschritt ohne Ausführung; `/dwp-verify` erzeugt einen objektiven Konformitätsbericht; `/dwp-upgrade` bringt eine installierte Skill auf einen neueren Release, ohne bestehende Pläne anzutasten. Agenten, die `/` abfangen, verwenden oft `#` stattdessen (zum Beispiel `#dwp-execute`). Der Adoptions-Endpunkt und der Schnellstart gehen denselben Weg ausführlicher.

[Schnellstart](https://deepworkplan.com/de/quickstart)

### Was genau wird installiert, und wo?

Die Agenten-Skill wird dort installiert, wo Ihr Agent Projekt- oder Benutzer-Skills lädt. Das Onboarding passt anschließend das Repository selbst an: Es erstellt oder gleicht `AGENTS.md`, `docs/`, `.agents/` und den per gitignore ausgeschlossenen `.dwp/`-Arbeitsbereich ab. Die Skill lehrt den Agenten die Methode; das Repository bewahrt den Kontext, das Kit und die Plan-Evidenz, die andere Agenten zum Fortsetzen benötigen.

[Den Adoptionsablauf ansehen](https://deepworkplan.com/de/init)

### Erfordert Deep Work Plan Git?

Git wird für Repositories empfohlen, weil seine Historie Teil der Wiederherstellungs- und Review-Oberfläche ist, aber die Methodik kann auch in einem Agenten-Arbeitsbereich ohne Git-Repository laufen. In diesem Fall ist die maschinenlesbare Zustandsebene erforderlich, einschließlich `state.json`-Checkpoints und Gate-Protokollen, damit die Wiederherstellung nicht von einem Chat-Transkript abhängt.

[Über Repository-Archetypen lesen](https://deepworkplan.com/de/spec/archetypes)

### Was ist der Unterschied zwischen einer Skill, einem Plan und einer Produktspezifikation?

Eine Skill beschreibt, wie ein Agent ein wiederholbares Verfahren ausführt. Ein DWP-Plan beschreibt eine konkrete Änderung durch Umfang, Akzeptanzkriterien, Validierungs-Gates und Evidenz. Eine Produktspezifikation beschreibt das aktuelle Verhalten des Produkts und entwickelt sich nach der Implementierung durch Deltas weiter; auch Skills und Pläne sind Spezifikationen, aber sie beschreiben Verfahren und Änderungen, statt diesen kanonischen Produktvertrag zu pflegen.

[Spezifikation lesen](https://deepworkplan.com/de/spec/dwp-specification)

## Wie ein Plan abläuft

### Wie sind die Validierungs-Gates implementiert? Erfordern sie eine menschliche Freigabe?

Es sind ausführbare Zusicherungen, die der Agent selbst ausführt. Die menschliche Freigabe rahmt den Durchlauf: Eine Person genehmigt den Plan vor der Ausführung und prüft den finalen Diff zum Zeitpunkt des Pull Requests; die Ausführung dazwischen ist autonom. Jede Aufgabe nennt konkrete Befehle, typischerweise das eigene Quality-Gate des Repositorys, ausgewählt aus der berührten Oberfläche der Aufgabe: die Tests des geänderten Verhaltens und seiner Konsumenten, ausgeweitet auf die gesamte Suite, wenn die Änderung geteilt ist oder sich nicht abgrenzen lässt. Eine Aufgabe wird erst dann als erledigt markiert, wenn diese Befehle erfolgreich durchlaufen, und Aufgaben, die Verhalten ändern, müssen die Tests erweitern. Schlägt ein Befehl fehl, repariert der Agent zuerst, was in den eigenen Geltungsbereich der Aufgabe fällt, und führt das Gate erneut aus; ein Fehler, der sich in diesem Rahmen nicht beheben lässt, hinterlässt die Aufgabe als blockiert markiert und stoppt den Durchlauf.

[Die Kernschleife](https://deepworkplan.com/de/methodology/02-core-loop)

### Wie bleibt der Plan aktuell, wenn Menschen den Code zwischen den Durchläufen ändern?

Auf drei Wegen. Aufgaben sind als Verhalten geschrieben, nicht als Edits: Ein Akzeptanzkriterium sagt, was das System tun muss, sodass eine umbenannte Datei oder eine ausgetauschte Implementierung es nicht ungültig macht. Jedes Gate läuft erneut gegen das Repository, wie es gerade ist; eine zerbrochene Annahme schlägt beim nächsten Durchlauf laut fehl, statt still zu driften, und genau dieses Scheitern ist der Anstoß zum Verfeinern. Und Dokumentation synchron zu halten ist Teil der Arbeit: Eine Aufgabe, die Verhalten ändert, aktualisiert innerhalb ihres eigenen Gates auch die docs und das auf Agenten ausgerichtete Kit, die es beschreiben. Jeder Durchlauf sollte das Repository agentenbereiter hinterlassen, als er es vorgefunden hat.

[Methodik lesen](https://deepworkplan.com/de/methodology)

### Kann ich den Plan während des Durchlaufs ändern, ohne abgeschlossene Arbeit zu verlieren?

Ja — einen teilweise ausgeführten Plan zu verfeinern ist eine vollwertige Aktion. Aufgabendefinitionen und Ausführungszustand werden getrennt gehalten: Der Plan ist eine Checkliste auf der Festplatte plus eine kleine Zustandsdatei, sodass das Erledigte unabhängig vom Aufgabentext aufgezeichnet bleibt. Stellt sich eine Aufgabe als falsch heraus, markiert der Agent sie als blockiert und stoppt, statt einfach weiterzuarbeiten. Sie bearbeiten anschließend die Aufgaben, die noch nicht gelaufen sind — ändern, ordnen um, teilen auf oder streichen sie —, während abgeschlossene Aufgaben abgeschlossen bleiben. Die Wiederaufnahme baut den Zustand aus der Festplatte und dem tatsächlichen Repository neu auf und führt die Gates, auf die es ankommt, erneut aus; nichts, was sich darunter verschoben hat, schlüpft durch.

[Die Kernschleife](https://deepworkplan.com/de/methodology/02-core-loop)

### Prüft es die Arbeit fortlaufend gegen den Plan, oder ist der Plan nur eine einmalige Sache am Anfang?

Der Plan ist eine fortlaufende Prüfung. Der Agent arbeitet eine kleine Aufgabe nach der anderen ab und muss validieren, bevor er weitergeht — abirren kann er einen Schritt, nicht drei. Jede Aufgabe trägt Akzeptanzkriterien plus die exakten Befehle, die sie belegen, und der Fortschritt wird während der Arbeit mit einem Status je Aufgabe ins Repository geschrieben, sodass Drift für Sie, für die nächste Sitzung und für den nächsten Agenten sichtbar wird. Ein Plan ist nicht fertig, bis alles validiert — einschließlich des Final Review. Der ehrliche Vorbehalt: Die Methodik kann nicht verhindern, dass ein Agent von vornherein ein schwaches Akzeptanzkriterium schreibt; sie macht Drift laut statt still.

[Die Kernschleife](https://deepworkplan.com/de/methodology/02-core-loop)

### Wird der Plan einmal erzeugt und von Hand gepflegt, oder entwickelt er sich mit dem Code weiter?

Weder noch. Er wird einmal aus einem Ziel erzeugt und anschließend als Teil der Arbeit gepflegt. Der Plan wird bewusst nicht aus Code-Diffs neu geschrieben, denn eine Spezifikation, die dem Code hinterherläuft, wird zu einem hinterherhinkenden Spiegel — genau der Drift, zu dessen Beseitigung die Methodik existiert. Absichtlich entwickelt er sich weiter: Gates laufen erneut gegen das aktuelle Repository, ein scheiterndes Gate löst eine Verfeinerung aus, und der Agent führt diese Verfeinerung während des Durchlaufs aus, während Sie vorab genehmigen und am Ende prüfen. Dokumentation und Tests entwickeln sich durch ihre Konstruktion mit dem Code weiter, weil ihre Aktualisierung innerhalb des Gates jeder Aufgabe liegt.

[Methodik lesen](https://deepworkplan.com/de/methodology)

### Was passiert, wenn die Sitzung auf halbem Weg abstirbt?

Der Fortschritt lebt auf der Festplatte, nicht im Chat. Die README-Checkboxen, das Protokoll jeder Aufgabe, ein begrenzter Arbeitsindex und eine maschinenlesbare Zustandsdatei werden an jeder Aufgabengrenze aktualisiert, und die Zustandsdatei zeichnet vor jeder geplanten Pause einen Checkpoint auf. Eine frische Sitzung oder ein anderer Agent liest diesen kompakten Index, gleicht ihn mit dem Repository und der Git-Historie ab und setzt bei der ersten unvollständigen Aufgabe fort, ohne fertige Arbeit zu wiederholen. Selbst eine unterbrochene Planerstellung ist wiederherstellbar: Identität und beabsichtigte Aufgabenliste des Plans werden vor jeder Aufgabendatei geschrieben, sodass ein halb erzeugter Plan vervollständigt oder verworfen werden kann, statt geraten zu werden.

[Die Kernschleife](https://deepworkplan.com/de/methodology/02-core-loop)

### Was ist der Final Review?

Die einzige verpflichtende Abschlussaufgabe jedes Plans. Der Reihe nach: ein Sicherheitstest über die vollständige kumulierte Änderungsmenge des Plans, einschließlich eines erforderlichen lokalen Reviews des Diffs durch die AI Diff Reviewer-Skill, wobei kritische Befunde den Abschluss blockieren, bis sie behoben oder ausdrücklich akzeptiert sind; eine Validierung des Endzustands, das heißt die vollständigen einschlägigen Test-, Lint-, Typ- und Format-Suiten des Repositorys auf dem finalen Code; und ein Abgleich der Skills-Entscheidungen, die jede Aufgabe aufgezeichnet hat. Der Agent berichtet anschließend Ergebnisse, Evidenz und Einschränkungen und bietet einmalig einen Executive Report an, erzeugt ihn aber nur auf Anfrage.

[Die Spezifikation](https://deepworkplan.com/de/spec/dwp-specification)

### Was passiert, wenn ein Validierungs-Gate fehlschlägt?

Ein fehlgeschlagenes Gate ist zuerst ein Reparatursignal: Der Agent behebt, was in den eigenen Geltungsbereich der Aufgabe fällt, und führt das Gate erneut aus. Ein Fehler, der diesen Rahmen übersteigt, hinterlässt die Aufgabe als blockiert aufgezeichnet, und der Agent stoppt, bevor er den Abschluss behauptet. Sie können die Evidenz prüfen, den Code reparieren oder die Aufgabe verfeinern und dann fortsetzen; ein fehlgeschlagener Befehl ist ein Signal, die Abweichung zu beheben, keine Erlaubnis, das Gate abzuschwächen.

[Agenten-Protokoll lesen](https://deepworkplan.com/de/spec/agent-protocol)

### Was passiert, wenn der Konformitätsprüfer seine Prüfungen nicht ausführen kann?

Er sagt es deutlich. Der Prüfer beendet sich mit Exit-Code 2 und einem expliziten `UNVERIFIED`-Ergebnis — er druckt niemals ein Bestehen aus, das er nicht tatsächlich geprüft hat. Fehlt der Umgebung ein fähiger Interpreter oder kann eine Prüfung nicht laufen, ist das ehrliche Ergebnis „unverifiziert“, nicht „konform“; ein grünes Ergebnis bedeutet immer, dass jede Prüfung lief und bestand. Dieselbe Disziplin zieht sich durch die ganze Methodik: Kein Ablauf schwächt oder fälscht ein Gate, um Fertigstellung zu behaupten.

[Der Konformitätsvertrag](https://deepworkplan.com/de/spec/conformance)

### Kann ein Plan unbeaufsichtigt über Nacht oder in CI laufen?

Ja, wenn der Plan im Voraus genehmigt wurde, die erforderliche Zustandsebene trägt und dem Agenten begrenzte Befugnisse einräumt. Ein unbeaufsichtigter Durchlauf muss stoppen und einen Blocker aufzeichnen, wenn die Realität abweicht, ein Gate außerhalb seines geplanten Reparaturumfangs fehlschlägt oder eine neue Genehmigung oder Zugangsdaten benötigt werden.

[Protokoll für unbeaufsichtigte Durchläufe lesen](https://deepworkplan.com/de/spec/agent-protocol)

### Kann ein Plan mehrere Repositories umspannen?

Ja — genau dafür existiert das Orchestrator-Hub-Archetyp. Ein Hub-Repository hält den koordinierenden Plan, und jedes Kind-Repository führt seinen eigenen Plan in seinem eigenen isolierten `.dwp/`-Arbeitsbereich aus, sodass ein Kind niemals in den Plan-Zustand des Hubs schreibt. Die Vollständigkeit eines Kindes wird aus dem Top-Level-Zustand seines eigenen Plans gelesen, nicht durch String-Suche darin, und der Hub verzeichnet, wo er steht, bevor er irgendwohin navigiert. Jedes Kind bleibt ein gewöhnliches DWP-Repository, das auch für sich allein gesteuert werden kann.

[Repository-Archetypen](https://deepworkplan.com/de/spec/archetypes)

## Im Vergleich

### Wie unterscheidet es sich von spec-driven Werkzeugen wie Spec Kit, OpenSpec oder Kiro?

Sie lösen angrenzende Probleme. Spec-driven Werkzeuge sind ausgezeichnet darin festzuhalten, was sich ändern soll: Spezifikationen, Anforderungen und Änderungsvorschläge in wiederholbarer Form. Deep Work Plan handelt davon, wie ein Agent stundenlang arbeitet, ohne abzudriften: das per Onboarding eingerichtete Harness, Validierungs-Gates je Aufgabe, ausgewählt aus der berührten Oberfläche, wiederaufnehmbarer Zustand auf der Festplatte, ein verpflichtender Final Review mit Sicherheitstest und ein Konformitätsprüfer für das Repository selbst. Beides lässt sich kombinieren, etwa indem eine Spezifikation oder ein Änderungsvorschlag einen Plan speist. Die Vergleichsseite legt die Fähigkeiten nebeneinander, jeweils in den eigenen Begriffen jedes Werkzeugs.

[Vergleich ansehen](https://deepworkplan.com/de/compare)

### Wie unterscheidet es sich von Agenten-Workflow-Werkzeugen wie BMAD, Superpowers, Get Shit Done oder Gentle-AI?

Agenten-Workflow-Frameworks wie BMAD, Superpowers und Get Shit Done bringen starke Arbeitsstile mit: Rollen, Prinzipien, Test-first-Schritte, Verifizierungsgewohnheiten. Gentle-AI ist ein benachbarter Ansatz als Konfigurator für das Agenten-Ökosystem: Es stattet die Coding-Agenten, die Sie bereits nutzen, mit persistentem Speicher über Sitzungen hinweg (Engram), kuratierten Skills, Personas, MCP-Servern, optionalem Spec-Driven Development und optionaler evidenzbasierter Review (Receipt-Driven Development) aus und schreibt dabei in die Konfigurationsverzeichnisse jedes Agenten. Deep Work Plan unterscheidet sich von beiden: Es konzentriert sich darauf, was im Repository bleibt und was sich prüfen lässt — ein Harness, das jeder Agent ohne Vorkenntnisse liest, Aufgabendateien mit Akzeptanzkriterien und Gates, Zustand, der eine Sitzung überlebt, ein Konformitätsprüfer mit CI-freundlichem Exit-Code und eine veröffentlichte Messung, wie viele Instruktions-Bytes jeder Flow lädt. Es ist konstruktionsbedingt werkzeug-agnostisch und fügt der Kernschleife keinen Dienst, keinen Provider und kein Geheimnis hinzu. Die Ebenen können zusammenpassen: Frameworks und Gentle-AI prägen, wie der Agent arbeitet; Deep Work Plan macht lange Arbeit im Repository dauerhaft und prüfbar. Die Vergleichsseite zeigt, wo jeder Ansatz integriert, optional oder nicht im Umfang ist.

[Vergleich ansehen](https://deepworkplan.com/de/compare)

### Warum nicht einfach den eingebauten Plan-Modus meines Agenten nutzen?

Eingebaute Plan-Modi sind nützlich, und Deep Work Plan baut auf demselben Substrat auf: der `AGENTS.md`-Konvention und dem offenen Agent-Skills-Standard. Der Unterschied liegt darin, wo der Plan lebt und was ihn durchsetzt. Native Pläne leben meist außerhalb des Repositorys und verfallen mit der Sitzung; Deep Work Plan schreibt den Plan, seinen Zustand und seine Evidenz in das Repository, sodass ein anderer Agent oder ein Teammitglied ihn fortsetzen kann, und jede Aufgabe trägt ein ausführbares Gate und ein aufgezeichnetes Protokoll. Den Plan-Modus Ihres Agenten nutzen Sie weiterhin zum Denken; die Methodik ergänzt die dauerhafte, verifizierbare Ausführungsschleife.

[Vergleich ansehen](https://deepworkplan.com/de/compare)

## Adoption

### Was schreibt das Onboarding in mein Repository, und fasst es bestehende Dateien an?

Das Onboarding ist nicht-destruktiv: Es erkennt eine bestehende `AGENTS.md`, `docs/`, `.agents/` oder `CLAUDE.md`, gleicht ab, statt zu überschreiben, und fragt nach, bevor es etwas ersetzt. Es schreibt den `AGENTS.md`-Index mit echten Befehlen, einen durchdachten `docs/`-Baum, Dokumentation je Modul, das `.agents/`-Kit mit schlanken `dwp-*`-Befehlen, einen per gitignore ausgeschlossenen `.dwp/`-Ausgabebereich, eine verifizierte Testkarte und das erforderliche lokale Code-Review (die AI Diff Reviewer-Skill plus eine auf das Repository zugeschnittene Review-Erweiterung). Anschließend führt es einen Selbstcheck und den Konformitätsprüfer aus, damit Sie sehen, was erzeugt wurde. Ein unter einem früheren Standard geonboardetes Repository erhält ein gezieltes Harness-Upgrade, das nur abgleicht, was fehlt oder veraltet ist.

[Der Adoptions-Endpunkt](https://deepworkplan.com/de/init)

### Wie upgrade ich die Skill in einem bereits geonboardeten Repository?

Es sind zwei verschiedene Upgrades, und der Ablauf hält sie getrennt. Der Harness des Repositories — `AGENTS.md`, `docs/`, das `.agents/`-Kit — wird durch erneutes Onboarding abgeglichen, das nur fehlende oder veraltete Teile ergänzt. Die Skill selbst wandert über `/dwp-upgrade`: eine nur-lesende Prüfung des neuesten veröffentlichten Releases, die Installation des exakten Tags, das Sie akzeptiert haben, verifiziert, und danach das Onboarding erneut als frischer Durchlauf. Der Ablauf ist durchweg zustimmungspflichtig, lokale Anpassungen werden per Diff verglichen und bewahrt statt überschrieben, und `.dwp/` wird niemals migriert — bestehende Pläne behalten ihre aufgezeichnete Form und laufen weiter.

[Der Adoptions-Endpunkt](https://deepworkplan.com/de/init)

### Kann ich die Kernmethodik nutzen, ohne Add-ons zu installieren?

Ja. Add-ons sind optionale Ebenen, und ein Repository ohne sie ist vollständig DWP-konform. Devcontainer, Dailybot-Reporting, Abhängigkeits-Upgrades, Design-System-Unterstützung und optionales CI-Review werden nur angeboten, wenn sie zu Ihrem Repository passen und Sie sie ausdrücklich annehmen.

[Add-ons durchstöbern](https://deepworkplan.com/de/spec/addons)

### Was, wenn mein Repository noch keine Tests oder Linting hat?

DWP behandelt das Fehlen einer Toolchain nicht als Freifahrtschein. Während des Onboardings schlägt der Agent ein zum Stack passendes Validierungs-Setup vor, zeichnet die Befehle in der Repository-Dokumentation auf und verwendet diese Befehle als Ziel für zukünftige Gates; der Vorschlag bleibt sichtbar, damit Sie ihn prüfen können.

[Agenten-Protokoll lesen](https://deepworkplan.com/de/spec/agent-protocol)

### Was kostet es, und wie wird Effizienz gemessen?

Die Methodik und die Skill sind MIT-lizenziert und kostenlos; es gibt keinen Dienst, keinen API-Schlüssel und keine Telemetrie in den Kern-Flows. Effizienz wird als Anzahl der Instruktions-Bytes berichtet, die jeder Flow lädt — gemessen von einem Skript, das mit der Skill committet, über Release-Baselines hinweg neu gemessen und in einem Evaluations-Ledger veröffentlicht wird, wobei Zunahmen so offen berichtet werden wie Abnahmen. Nicht berichtet wird in Token-Prozenten oder eingesparten Kosten, weil eine Byte-Bestandsaufnahme das nicht belegen kann; eine vorregistrierte öffentliche Evaluation ist geplant, um Ergebnisse ordentlich zu messen.

[Vertrauen und Offenlegung](https://deepworkplan.com/de/trust)

## Noch eine Frage?

Eröffnen Sie eine Diskussion oder ein Issue auf GitHub. Fragen, die wiederkehren, werden auf dieser Seite ergänzt.

[Auf GitHub fragen](https://github.com/DailybotHQ/deepworkplan-website/issues)
