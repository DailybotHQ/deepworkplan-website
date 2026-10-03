---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim ist der Terminal-Editor für Deep Work Plan: eine Neovim-0.12+-Konfiguration mit generiertem Befehlsindex, Plan-Browser und Markdown-Viewer."
lastUpdated: 2026-10-03
---

## Was es ist

Eine Neovim-Konfiguration für Menschen und Coding-Agents, die im Terminal leben — Ihre Deep Work Plans, die Dokumentation und der Befehlsindex sind einen Tastendruck entfernt.

## Installation

Eine Zeile installiert DeepWorkPlan Vim als Ihre Neovim-Konfiguration. Der Installer erklärt, was er tut, und fragt nach, bevor er eine bestehende Einrichtung anfasst.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Zustimmung zuerst: Eine bestehende Neovim-Konfiguration wird nie ohne Ihre ausdrückliche Zustimmung überschrieben. Der Installer bricht ab und zeigt den manuellen Weg.

Unter Windows gilt der Einzeiler nicht; die README des Repositorys dokumentiert den manuellen Weg. [Windows-Installationsweg](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## Was es tut

Fünf Funktionen, bewusst abgegrenzt. Jede ist einem Tastenkürzel zugeordnet, das Sie im generierten Befehlsindex nachlesen können.

| Funktion | Was es ist | Belegung |
|---|---|---|
| Generierter Befehlsindex | Ein Befehlsindex, der aus der aktiven Konfiguration generiert wird — die Liste der Tastenkürzel ist damit immer aktuell. | `SPC h h` |
| Gesten im Stil von VS Code | Bearbeitungsgesten, wie grafische Editoren sie prägen: alles auswählen und in die System-Zwischenablage kopieren. | `<C-a>`, `y`, `<leader>y` |
| Deep-Work-Plan-Browser | Ein Panel, das die Pläne im Repository durchgeht — lesen Sie einen Plan, seine Aufgaben und seine Gates, ohne den Editor zu verlassen. | `SPC P` |
| Markdown-Viewer | Markdown im Browser voranschauen oder im Buffer rendern — Dokumentation und Pläne bleiben dort, wo die Arbeit passiert. | `SPC m p`, `SPC m r` |
| Einzeilen-Installer | Ein in sich geschlossener Installer für macOS und Linux, mit dokumentiertem manuellem Weg für Windows. | — |

## Voraussetzungen

- Neovim 0.12 oder neuer, mit Lua (lua, lua5.4 oder luajit) verfügbar
- macOS und Linux; Windows wird über einen dokumentierten manuellen Weg unterstützt
- GPL-3.0-lizenziert — frei zum Verwenden, Untersuchen und Ändern

## Weiterführende Links

- [Kit-Addon-Dokument lesen](/kit/vim)
- [Quellrepository ansehen](https://github.com/DailybotHQ/deepworkplan-vim)
- Installieren Sie DeepWorkPlan Vim, öffnen Sie Neovim und lesen Sie Ihre Deep Work Plans im selben Terminal wie Ihre Agenten.
