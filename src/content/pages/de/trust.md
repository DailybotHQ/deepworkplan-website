---
title: "Vertrauen und Sicherheit"
description: "Warum Deep Work Plan sicher zu übernehmen ist: Open Source und MIT, Markdown-first ohne Netzwerkaufrufe oder Telemetrie, nicht-destruktiv konzipiert, mit verifizierbaren Installationen und einer klaren Richtlinie zur Offenlegung von Schwachstellen."
lastUpdated: 2026-06-05
---

## Warum Sie ihm vertrauen können

Niemand sollte ein Skill installieren, dem er nicht vertrauen kann. Deep Work Plan ist so gebaut, dass er verifiziert werden kann — nicht auf Treu und Glauben: Open Source, Markdown-first, nicht-destruktiv und prüfbar, bevor man ihn ausführt.

- **Open Source und MIT-lizenziert** — die Website und das Skill sind öffentlich und diff-bar; lesen Sie jede Zeile, bevor Sie es ausführen.
- **Markdown-first — kein Netzwerk, keine Telemetrie** — kein CLI, keine HTTP-API, kein Authentifizierungsflow; es führt keine Netzwerkaufrufe durch und sendet keine Telemetrie. Nichts über Ihr Repository verlässt Ihren Rechner.
- **Nicht-destruktiv konzipiert** — die einzige sicherheitsrelevante Aktion besteht darin, Ihr Repository zu verändern, und zwar durch Abgleich statt Überschreiben: Es erkennt, was existiert, schlägt einen Plan vor und fragt nach, bevor es etwas ersetzt. Plan-Ausgaben landen in einem gitignorierten `.dwp/`-Verzeichnis.
- **Berührt keine Geheimnisse** — überträgt niemals Geheimnisse in die Versionskontrolle, ergänzt die `.gitignore` anstatt sie zu überschreiben, und hält Änderungen klein und als lesbare Diffs überprüfbar.
- **Verifizierbare Herkunft** — jedes Release veröffentlicht Prüfsummen über das ausgelieferte Skill.

---

## Vor der Ausführung verifizieren

Behandeln Sie das Skill als nicht vertrauenswürdig, bis Sie es geprüft haben. Jedes Release fügt eine `SHA256SUMS`-Datei bei, die das ausgelieferte Skill abdeckt. Laden Sie sie für die Version herunter, die Sie installieren möchten, und verifizieren Sie dann, dass Ihre Kopie übereinstimmt — ein Exit-Code ungleich null bedeutet, dass eine Datei nicht übereinstimmt, und Sie sollten stoppen.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Download the checksums for the release you intend to install (replace vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # non-zero exit means a file does not match — stop
```

Releases sind mit **Prüfsummen versehen, aber nicht signiert** — Signierung (cosign oder Betreuer-GPG) ist ein dokumentierter nächster Schritt, keine aktuelle Aussage. Da alles offen ist, können Sie auch jede Datei gegen das Repository bei seinem Tag vergleichen.

---

## Eine Schwachstelle melden

Melden Sie Sicherheitsprobleme privat an **security@dailybot.com**, anstatt ein öffentliches Issue zu eröffnen. Wir bestätigen Meldungen innerhalb von 3 Werktagen und streben an, innerhalb von 30 Tagen für valide Befunde je nach Schweregrad einen Fix oder eine Milderungsmaßnahme zu liefern. Die Website und das Skill teilen dieselbe Richtlinie.

---

## Ehrliche Einschränkungen

- Releases sind mit Prüfsummen versehen, aber noch nicht kryptographisch signiert — Signierung ist geplant, aber noch nicht umgesetzt.
- Deep Work Plan führt einen autonomen Coding-Agenten gegen Ihr Repository aus. Überprüfen Sie den vorgeschlagenen Plan und die Diffs; die Methodik ist für diese Überprüfung konzipiert, nicht um sie zu ersetzen.
- Diese Vertrauensaussagen beschreiben nur die offiziellen Quellen. Eine modifizierte oder von Drittanbietern stammende Kopie, die von den Repositories abgewichen ist, trägt keine dieser Garantien — verifizieren Sie sie zuerst.

---

## Vertrauensressourcen

- [Maschinenlesbares Vertrauensmanifest](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Website-Sicherheitsrichtlinie](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Skill-Sicherheitsrichtlinie & Bedrohungsmodell](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Methodik lesen](/methodology)
- [Adoption (Init)](/init)
