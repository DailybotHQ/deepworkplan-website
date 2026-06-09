---
title: Konformität
description: "Die normative Definition eines DWP-konformen, AI-first Repositorys: die Artefakte, die es haben MUSS und SOLLTE, was einen Plan wohlgeformt macht und wie man es verifiziert."
order: 6
lang: de
section: Conformance
---

# Konformität

**Version 1.0. Status: Stabil.** Dieses Dokument definiert, was es bedeutet, dass ein Repository *Deep Work Plan-konform* ist — also AI-first und agenten-steuerbar. Die Schlüsselwörter MUSS, DARF NICHT, SOLLTE, SOLLTE NICHT und KANN sind so zu interpretieren, wie in RFC 2119 beschrieben.

Konformität existiert, damit „AI-first“ eine objektive, prüfbare Eigenschaft ist und kein Eindruck. Ein Repository erfüllt die untenstehenden Kriterien entweder oder nicht. Die [`verify`-Sub-Skill](/kit) (`/dwp-verify`) prüft sie mechanisch.

## Ein konformes Repository

Ein DWP-konformes Repository MUSS alles Folgende erfüllen. Jedes Artefakt MUSS **für das Repository durchdacht sein** — angepasst an seine echten Sprachen, Frameworks und Befehle. Ein generischer Platzhalter, ein Platzhaltertext oder aus einem anderen Repository kopierter Inhalt erfüllt kein Kriterium.

1. **`AGENTS.md` im Stammverzeichnis.** Das Repository MUSS eine Wurzel-`AGENTS.md` enthalten, die (a) einen Index der Dokumentation, (b) die verpflichtenden Regeln für das Repository und (c) einen Quick-Commands-Block enthält, dessen Befehle in diesem Repository **echt und ausführbar** sind. Platzhalter-Befehle (zum Beispiel `npm test` in einem Repository, das kein npm nutzt) DÜRFEN NICHT erscheinen.
2. **`CLAUDE.md` löst sich zu `AGENTS.md` auf.** Eine `CLAUDE.md` MUSS existieren und sich zu `AGENTS.md` auflösen (ein Symlink oder ein Äquivalent, das eine einzige Quelle der Wahrheit garantiert). Die beiden DÜRFEN NICHT auseinandergehen.
3. **Eine `docs/`-Hierarchie.** Das Repository MUSS ein `docs/`-Verzeichnis enthalten, das die Standardkategorien (Architektur, Standards, Testing, Entwicklungsbefehle, Sicherheit und Agenten-Onboarding) mit echtem, repository-spezifischem Inhalt abdeckt. Komplexe Module SOLLTEN ihre eigene `README.md` tragen. Der Testing-Leitfaden MUSS eine echte Test-, Lint- und Typprüfungs-Toolchain definieren — oder, für ein Repository, das keine hat, ein konkretes Setup, das während des Onboardings aus dem Stack **vorgeschlagen** wird. Ein leerer Testing-Leitfaden oder „keine Tests“ erfüllt dieses Kriterium nicht: Ohne einen definierten Weg, Verhalten zu validieren, hat ein Plan kein objektives Validierungs-Gate.
4. **Ein `.agents/`-Verzeichnis.** Das Repository MUSS ein `.agents/`-Verzeichnis mit `agents/`, `commands/` und `skills/` enthalten, plus einen Katalog unter `.agents/docs/`, der **dem entspricht, was auf der Festplatte liegt**. Die `dwp-*`-Befehle MÜSSEN schlanke Delegatoren an die installierte Skill sein. Ein `.claude`-Pfad MUSS sich zu `.agents` auflösen.
5. **Ein per gitignore ausgeschlossener `.dwp/`-Arbeitsbereich.** Das Repository MUSS ein `.dwp/`-Verzeichnis mit `plans/` und `drafts/` enthalten, und `.dwp/` MUSS per gitignore ausgeschlossen sein. Ein `tmp/`-Scratch-Bereich SOLLTE existieren und SOLLTE per gitignore ausgeschlossen sein.
6. **Die Methodik-Skill ist auflösbar.** Die Deep Work Plan Skill MUSS so installiert oder referenziert sein, dass ein Agent im Repository ihre Sub-Skills aufrufen kann.

Ein Repository ist **mit null Addons vollständig konform**. Addons (devcontainer, Dailybot, dependency-upgrade, design-system) sind Opt-in und DÜRFEN NICHT für die Konformität erforderlich sein.

## Ein wohlgeformter Plan

Ein Deep Work Plan in `.dwp/plans/` ist wohlgeformt, wenn:

1. Jede Aufgabe MUSS einen expliziten **Umfang**, **Akzeptanzkriterien** und mindestens ein **Validierungs-Gate** deklarieren (einen Befehl oder eine Prüfung, die objektiv besteht oder durchfällt).
2. Jede Aufgabe, die neue Kernfunktionalität hinzufügt oder Produktverhalten ändert, MUSS automatisierte Testabdeckung für dieses Verhalten in ihren Akzeptanzkriterien umfassen und MUSS die Tests des Repositorys zusammen mit seinen Lint- und Typprüfungen in ihrem Validierungs-Gate ausführen — nicht den Build allein. Bestehende Tests MÜSSEN grün bleiben; eine Verhaltensänderung MUSS einen Test, den sie bricht, anpassen, statt ihn zu löschen oder zu überspringen. Reine Dokumentations-, Konfigurations- oder Recherche-Aufgaben sind von der Erstellung von Tests befreit, führen aber dennoch das Gate des Repositorys aus.
3. Der Plan MUSS den Fortschritt persistieren, sodass die Arbeit eine Unterbrechung übersteht und von einem anderen Agenten wiederaufgenommen werden kann.
4. Der Plan MUSS die zwei verpflichtenden Abschlussaufgaben enthalten — Skills & Agents Discovery und den Executive Report.
5. Aufgaben SOLLTEN sich vor der Ausführung erneut am Ziel des Plans verankern, um ein Abdriften über einen langen Horizont zu verhindern.

## Konformität verifizieren

Konformität SOLLTE mechanisch verifiziert werden statt durch Inspektion. Das Ausführen von `/dwp-verify` erzeugt einen Bestanden/Nicht-bestanden-Bericht anhand der obigen Kriterien: das Vorhandensein und der echte Inhalt von `AGENTS.md`, die `CLAUDE.md`-Auflösung, die `docs/`-Kategorien, der `.agents/`-Abgleich Katalog gegen Festplatte, der gitignore-Status von `.dwp/` und `tmp/` und — für einen Plan —, dass jede Aufgabe Akzeptanzkriterien und ein Validierungs-Gate trägt, mit Testabdeckung für verhaltensändernde Aufgaben.

Ein Repository SOLLTE nach dem Onboarding und nach jedem abgeschlossenen Plan erneut verifiziert werden, sodass die Konformität aufrechterhalten und nicht nur einmal behauptet wird.
