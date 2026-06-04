---
title: "Kit Deep Work Plan"
description: "Skill i jego osiem sub-skilli, komendy, adaptery agentów, presety onboardingu, opcjonalne dodatki i przykłady, dzięki którym Deep Work Plan działa wszędzie."
lastUpdated: 2026-05-31
---

## Kit Deep Work Plan

Kit to wszystko, czego potrzebujesz, aby stosować metodykę w praktyce. Instaluje się go z
`DailybotHQ/deepworkplan-skill`:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

### Skill i jego sub-skille

Skill Deep Work Plan to router oraz osiem sub-skilli:

- **create** — rozkłada cel na ustrukturyzowany plan (`/dwp-create`).
- **execute** — wykonuje plan zadanie po zadaniu, walidując każdą bramkę (`/dwp-execute`).
- **refine** — dodaje, usuwa lub porządkuje zadania, zachowując ukończoną pracę (`/dwp-refine`).
- **resume** — odtwarza stan i kontynuuje przerwany plan (`/dwp-resume`).
- **status** — raportuje postęp bez wprowadzania zmian (`/dwp-status`).
- **verify** — obiektywnie sprawdza zgodność repozytorium i planu (`/dwp-verify`).
- **onboard** — czyni repozytorium AI-first (`/deepworkplan-onboard`).
- **author** — tworzy lub rozwija własne skille, agentów i komendy repozytorium (`/skill-create`, `/agent-create`).

### Komendy

Cienkie komendy slash delegują do sub-skilli i dodatków:

- `dwp-create`, `dwp-execute`, `dwp-refine`, `dwp-resume`, `dwp-status`, `dwp-verify` — pętla plan-wykonanie-weryfikacja.
- `skill-create`, `agent-create` — delegują do sub-skilla author.
- `lib-upgrade` — deleguje do dodatku dependency-upgrade (instalowanego tylko wtedy, gdy ten dodatek zostanie zaakceptowany).

### Adaptery

Cienkie integracje dla poszczególnych agentów: Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Google Gemini oraz
Antigravity.

### Presety onboardingu

Przewodniki rozumowania dla poszczególnych stosów, których przepływ onboardingu używa do dostosowania dokumentacji, skilli i komend walidacyjnych —
nigdy szablony. Sześć presetów: Django, Vue + Vite, Astro/Svelte, usługa Node/TS, pakiet/CLI w Pythonie
oraz uniwersalny fallback.

### Dodatki (opcjonalne)

Opcjonalne możliwości, które przepływ onboardingu może nałożyć na repozytorium — nigdy nie są częścią bazy AI-first:

- **Devcontainer** — odtwarzalny, izolowany kontener deweloperski z trwałym uwierzytelnianiem AI-CLI.
- **Dailybot** — raportowanie postępu i kamieni milowych dla zespołów korzystających z Dailybot.
- **Dependency upgrade** — aktualizacje niezależne od menedżera pakietów: partiami, zwalidowane i odwracalne.

### Przykłady

Opracowane przejścia przed-i-po.

- [Przeglądaj kit](/kit)
- [Szybki start](/quickstart)
- [Zobacz przykłady](/examples)
