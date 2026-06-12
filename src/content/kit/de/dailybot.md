---
title: Dailybot
description: "Ein Opt-in-Addon, das ein AI-first Repository mit einem Dailybot-Team verbindet: Best-Effort-Berichte über Fortschritte und Meilensteine in der Planausführung, plus optionale autonome Hook-Durchsetzung."
kind: addon
lang: de
order: 2
---

# Dailybot-Addon

Den Fortschritt eines Deep Work Plan für ein Dailybot-Team sichtbar machen. Ein Opt-in-Addon für Teams, die Dailybot bereits nutzen.

## Was es hinzufügt

- Eine optionale Installation der Dailybot-Agenten-Skill (derzeit 1.7.x, die zusätzlich Team-Chat über Slack, Microsoft Teams, Discord und Google Chat hinzufügt) und/oder der Dailybot-CLI über deren eigene Einwilligungsabläufe.
- Einen Best-Effort-Bericht über Fortschritte/Meilensteine, eingebunden in die Planausführung, sodass ein Planabschluss dem Team sichtbar wird.
- Eine optionale deterministische Hook-Durchsetzung (Dailybot-Agenten-Skill 1.6.0+, CLI 1.12.0+): committete Harness-Hooks, die unberichtete Arbeit anhand eines lokalen Registers erkennen und den Agenten am Ende des Zugs erinnern — so bleibt das Berichten selbst in langen unbeaufsichtigten Sitzungen autonom, in denen Prompt-Anweisungen verblassen.

## Verhalten

Dieses Addon **delegiert** — es erfindet nichts neu. Die Dailybot-Agenten-Skill verantwortet Installation, Einwilligung, Authentifizierung, die Hook-Vorlagen und den Schreibstil; dieses Addon bietet lediglich an, sie zu installieren, bindet den optionalen Berichtsschritt ein und bietet die Hook-Konfiguration auf Repository-Ebene an. Der Bericht ist strikt Best-Effort und blockiert die Arbeit niemals, wenn Dailybot fehlt, nicht authentifiziert oder nicht erreichbar ist.

Die beiden Ebenen fügen sich ohne Doppelberichte zusammen: Ein erfolgreicher Lifecycle-Bericht setzt das Hook-Register zurück, sodass die Hooks nach einem Bericht stumm bleiben und nur als deterministische Rückfallebene wirken, wenn ein Lifecycle-Ereignis verpasst wurde. Die Hook-Befehle lesen ausschließlich lokalen Zustand und enden immer mit Exit-Code null — auch sie können die Arbeit also niemals blockieren.

## Hinweise

Die zentrale Deep Work Plan Methodik hat **keine** Dailybot-Abhängigkeit. Bieten Sie es nur an, wenn der Entwickler oder das Team Dailybot bereits nutzt; installieren Sie es niemals automatisch für alle.
