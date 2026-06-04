---
title: Dailybot
description: "Ein Opt-in-Addon, das ein AI-first Repository mit einem Dailybot-Team verbindet und einen Best-Effort-Bericht über Fortschritte und Meilensteine in die Planausführung einbindet."
kind: addon
lang: de
order: 2
---

# Dailybot-Addon

Den Fortschritt eines Deep Work Plan für ein Dailybot-Team sichtbar machen. Ein Opt-in-Addon für Teams, die Dailybot bereits nutzen.

## Was es hinzufügt

- Eine optionale Installation der Dailybot-Agenten-Skill und/oder der Dailybot-CLI über deren eigene Einwilligungsabläufe.
- Einen Best-Effort-Bericht über Fortschritte/Meilensteine, eingebunden in die Planausführung, sodass ein Planabschluss dem Team sichtbar wird.

## Verhalten

Dieses Addon **delegiert** — es erfindet nichts neu. Die Dailybot-Agenten-Skill verantwortet Installation, Einwilligung, Authentifizierung und den Schreibstil; dieses Addon bietet lediglich an, sie zu installieren, und bindet den optionalen Berichtsschritt ein. Der Bericht ist strikt Best-Effort und blockiert die Arbeit niemals, wenn Dailybot fehlt, nicht authentifiziert oder nicht erreichbar ist.

## Hinweise

Die zentrale Deep Work Plan Methodik hat **keine** Dailybot-Abhängigkeit. Bieten Sie es nur an, wenn der Entwickler oder das Team Dailybot bereits nutzt; installieren Sie es niemals automatisch für alle.
