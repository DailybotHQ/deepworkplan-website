---
title: DeepWorkPlan Vim
description: "Optionales DWP-Addon: DeepWorkPlan Vim, der Terminal-Editor für Deep Work Plan — generierter Befehlsindex, DWP-Plan-Navigation und Markdown-Lesen in Neovim."
kind: addon
lang: de
order: 6
---

# Das DWP-Addon DeepWorkPlan Vim

**DeepWorkPlan Vim** ist der Terminal-Editor für Deep Work Plan: eine Neovim-Konfiguration (der Editor selbst, keine Repository-Datei), die die Arbeitsflächen der Methodik einen Tastendruck nah legt. Wo die übrigen Kit-Einträge Harness in ein Repository installieren, stattet dieses Addon den Menschen aus — und jeden Agenten, der Neovim headless betreibt — mit einem Editor, der DWP von Grund auf spricht.

Es erfordert **Neovim 0.12 oder neuer**, läuft auf **macOS und Linux** (Windows über einen dokumentierten manuellen Weg) und steht unter der **GPL-3.0** — frei zu nutzen, zu studieren und zu ändern.

## Was es hinzufügt

| # | Funktion | Was sie tut | Zuordnung |
|---|---------|--------------|---------|
| F1 | **Generierter Befehlsindex** | Der ganze Editor, aufgelistet: jeder Befehl mit seiner Zuordnung und einer Einzeil-Beschreibung, aus der lebenden Konfiguration generiert, damit der Index nicht vom Editor abdriftet. | `SPC h h` |
| F2 | **Gesten im Stil von VS Code** | Alles auswählen, kopieren und Clipboard-Yank unter den Akkorden, die die Muskelerinnerung schon kennt. | `<C-a>`, `y`, `<leader>y` |
| F3 | **Deep-Work-Plan-Browser** | Öffnet den Plan, der das Repository steuert — Aufgaben, Gates und Fertigstellungsstand — ohne den Editor zu verlassen. | `SPC P` |
| F4 | **Markdown-Viewer** | Liest Markdown wie Agenten es tun: gerenderte Vorschau oder die rohe Quelle für Kopier-und-Einfügen-Treue. | `SPC m p`, `SPC m r` |
| F5 | **Einzeilen-Installer** | Ein consent-first `install.sh` für macOS und Linux; der dokumentierte manuelle Weg deckt Windows ab. | `curl -fsSL https://deepworkplan.com/vim/install.sh \| bash` |

## Installation

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Der Installer ist **consent-first**: eine bestehende, fremde Neovim-Konfiguration wird nie überschrieben. Ohne Terminal gepiped, bricht er mit Anleitungen ab, statt etwas anzufassen; interaktiv fragt er, bevor er eine bestehende Konfiguration beiseitelegt. Plugins installieren headless beim ersten Start — kein Beenden-und-Neustart-Tanz.

Windows ist kein `curl | bash`-Ziel. Der dokumentierte manuelle Weg (winget plus Git Bash, oder WSL) steht im Repository-README.

Die ganze Oberfläche, ohne Screenshots und auf den Vertrag begrenzt: die [/vim-Seite](/vim).

## Wann man es einsetzt

| Signal | Aktion |
|--------|--------|
| Wer im Terminal arbeitet und das Repository nach Plan steuert | Das Addon **anbieten** |
| Langfristige DWP-Ausführung, bei der der Plan-Browser (`SPC P`) den Stand sichtbar hält | **Empfehlen** |
| Der Editor ist bereits konfiguriert und nicht verhandelbar | **Auslassen** — das Addon ist von Entwurf wegen Opt-in |
| Nur-Windows-Team ohne WSL | **Auslassen**, oder auf den dokumentierten manuellen Weg verweisen |

## Verwandte Kit-Einträge

- [Devcontainer](/kit/devcontainer) — reproduzierbare Entwicklungsumgebung (erstes Addon)
- [Dailybot](/kit/dailybot) — team-sichtbare Plan-Lifecycle-Berichte (zweites Addon)
- [AI Diff Reviewer](/kit/ai-diff-reviewer) — lokale Prüfung in den Final Reviews des Plans (fünftes Addon)
