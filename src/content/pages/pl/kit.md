---
title: "Kit Deep Work Plan"
description: "Skill i jego dziewięć sub-skilli, komendy, adaptery agentów, presety onboardingu, opcjonalne dodatki i przykłady, dzięki którym Deep Work Plan działa wszędzie."
lastUpdated: 2026-10-09
---

## Kit Deep Work Plan

Kit to wszystko, czego potrzebujesz, aby stosować metodykę w praktyce. Instaluje się go z
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill@v6.0.2 --skill deepworkplan
```

Aktualny pakiet 6.x domyślnie tworzy nowe plany w v6. Istniejące plany zachowują zapisaną generację; migracja wymaga wyraźnego polecenia.

### Skill i jego sub-skille

Skill Deep Work Plan to router oraz dziewięć sub-skilli:

- **create** — rozkłada cel na ustrukturyzowany plan (`/dwp-create`).
- **execute** — wykonuje plan zadanie po zadaniu, walidując każdą bramkę (`/dwp-execute`).
- **refine** — dodaje, usuwa lub porządkuje zadania, zachowując ukończoną pracę (`/dwp-refine`).
- **resume** — odtwarza stan i kontynuuje przerwany plan (`/dwp-resume`).
- **status** — raportuje postęp bez wprowadzania zmian (`/dwp-status`).
- **verify** — obiektywnie sprawdza zgodność repozytorium i planu (`/dwp-verify`).
- **onboard** — czyni repozytorium AI-first (`/deepworkplan-onboard`).
- **author** — tworzy lub rozwija własne skille, agentów i komendy repozytorium (`/skill-create`, `/agent-create`).
- **upgrade** — bezpiecznie przenosi zainstalowany skill na nowszy release (`/dwp-upgrade`).

### Komendy

Cienkie komendy slash delegują do sub-skilli i dodatków:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — pętla plan-wykonanie-weryfikacja.
- `skill-create`, `agent-create` — delegują do sub-skilla author.
- `lib-upgrade` — deleguje do dodatku dependency-upgrade (instalowanego tylko wtedy, gdy ten dodatek zostanie zaakceptowany).

### Adaptery

Cienkie integracje dla poszczególnych agentów: Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini, OpenCode, Windsurf, Cline oraz Antigravity. Dla autonomicznych platform agentów: OpenClaw i Hermes (wykonujące plany pod profilem nieobsługiwanym, sterowane biciem serca lub harmonogramem cron) oraz agenci chmurowi i działający w tle (zdalne zadania Claude Code, chmura Codex, agenci klasy Jules).

### Presety onboardingu

Przewodniki rozumowania dla poszczególnych stosów, których przepływ onboardingu używa do dostosowania dokumentacji, skilli i komend walidacyjnych —
nigdy szablony. Sześć presetów: Django, Vue + Vite, Astro/Svelte, usługa Node/TS, pakiet/CLI w Pythonie
oraz uniwersalny fallback.

### Dodatki (opcjonalne)

Możliwości, które przepływ onboardingu nakłada na repozytorium. Cztery są opcjonalne i nigdy nie są częścią bazy AI-first; lokalny przegląd AI Diff Reviewer jest wymagany od standardu 2.3.0:

- **Devcontainer** — odtwarzalny, izolowany kontener deweloperski z trwałym uwierzytelnianiem AI-CLI.
- **Dailybot** — raportowanie postępu i kamieni milowych dla zespołów korzystających z Dailybot.
- **Dependency upgrade** — aktualizacje niezależne od menedżera pakietów: partiami, zwalidowane i odwracalne.
- **System projektowy** — plik `DESIGN.md` o zakresie interfejsowym (w `docs/DESIGN.md`, przywoływany z `AGENTS.md`) wywiedziony z rzeczywistego źródła projektowego repozytorium, z profilami dla wizualnego UI, stylizowanego wyjścia CLI i komunikacji konwersacyjnej, dzięki czemu agenci generują wyjście interfejsu zgodne z marką; gdy wykryto system projektowy, propozycja jest obowiązkowa, ale instalacja jest uzależniona od akceptacji — profil wizualny jest zdecydowanie zalecany po wykryciu, a profile CLI i konwersacyjny są zalecane po wykryciu i zawsze poprzedzone pytaniem.
- **AI Diff Reviewer** — wymagany lokalny przegląd: onboarding instaluje [AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer) v3 + `.review/extension.md`, a przegląd bezpieczeństwa każdego Final Review go uruchamia; opcjonalny Flow B dodaje bramę merge PR w CI współdzielącą to samo rozszerzenie, proponowaną wyraźnie i nigdy nieinstalowaną bez prośby.

### Ekosystem

**Metodyka działa samodzielnie. Dodatki ją wzmacniają.** Każdy dodatek to cienki integrator wewnątrz skilla Deep Work Plan, przypięty tagiem do produktu z własnym repozytorium, wydaniem i wersją interfejsu. Każdy produkt działa bez Deep Work Plan i żaden dodatek nie jest wymagany.

- **Skill Deep Work Plan** — Tworzy, wykonuje, weryfikuje, wznawia i dopracowuje plany. Nie potrzebuje żadnego dodatku.
- **[herdr](/pl/kit/herdr)** — Równorzędni agenci w panelach Herdr, na dowolnej maszynie: interaktywne delegowanie z jedną autoryzowaną odpowiedzią. Przypięty do `herdr-peers@v0.1.0`.
- **[agentkit](/pl/kit/agentkit)** — Jedno polecenie ak dla każdego terminalowego agenta kodującego: delegowanie bez interfejsu w worktree. Przypięty do `coding-agents-kit@v0.1.1`.
- **[devcontainer](/pl/kit/devcontainer)** — Szablon Dev Containers i obrazy bazowe dostarczane bez agentów kodujących. Przypięty do `devcontainer-kit@v0.1.4`.
- **[vim](/pl/kit/vim)** — Edytor terminalowy z przeglądarką planów tylko do odczytu i podglądem Markdown. Przypięty do `deepworkplan-vim@v0.4.2`.

Rejestr dodatków i deskryptory są dostarczane w becie v7, wydaniu przedpremierowym: `v7.0.0-beta.1`

### Przykłady

Opracowane przejścia przed-i-po.

- [Przeglądaj kit](/kit)
- [Szybki start](/quickstart)
- [Zobacz przykłady](/examples)
