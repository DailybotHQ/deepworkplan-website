---
title: AI Diff Reviewer
description: "Opcjonalny dodatek DWP: rozszerza Przegląd Bezpieczeństwa o lokalny przebieg AI Diff Reviewer, opcjonalną bramkę scalania CI Flow B (v2), współdzielony plik rozszerzenia i towarzysza apply-review."
kind: addon
lang: pl
order: 5
---

# Dodatek AI Diff Reviewer

Łączy wykonanie Deep Work Plan z **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (wpis na marketplace **"AI Diff Reviewer"**, aktualna wersja **v2.0.0**), dzięki czemu obowiązkowe końcowe zadanie **Przeglądu Bezpieczeństwa** uzyskuje strukturalny lokalny przegląd — werdykt, tabelę wyników i poziom ważności — a przy wyborze Flow B każde pull request może być zablokowane przez ten sam przegląd w CI. Dodatek **opcjonalny**; nigdy niewymagany do zgodności AI-first.

Podstawowa metodologia Deep Work Plan ma **zero** zależności od AI Diff Reviewer. Repozytorium bez dodatków jest w pełni zgodne. Oferuj ten dodatek tylko wtedy, gdy deweloper lub zespół chce strukturalnej jakości przeglądu; nigdy nie instaluj automatycznie dla wszystkich. Zawsze pytaj o Flow A lub Flow B — nigdy nie zakładaj wartości domyślnej.

## Kiedy używać

| Sygnał | Działanie |
|--------|--------|
| Zespół chce bramki scalania CI z ustrukturyzowanymi wynikami | **Zalecaj Flow B** podczas onboardingu |
| Repozytorium osobiste lub eksperymentalne; lokalny przegląd przed push wystarczy | **Oferuj Flow A** |
| Brak potrzeby dodatkowej powierzchni przeglądu | **Pomiń** — podstawowy Przegląd Bezpieczeństwa nadal obowiązuje |

## Dwa przepływy adopcji

| Przepływ | Co otrzymujesz |
|------|----------------|
| **A — tylko lokalnie** | Vendorowana skill + wymagany `.review/extension.md` (przez `generate-extension`). Rozszerza Przegląd Bezpieczeństwa o lokalny przebieg. Bez przepływu GitHub Actions. |
| **B — podwójna powierzchnia** | Flow A plus `setup` zapisuje `.github/workflows/pr-review.yml` (Action `@v2`), ten sam plik rozszerzenia dla lokalnego i CI. Opcjonalny towarzysz `apply-review` po opublikowaniu wyników przez CI. |

Wykrywanie do rozszerzenia Przeglądu Bezpieczeństwa wymaga **skill + pliku rozszerzenia** w jednym z: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` lub `.github/ai-pr-reviewer/extension.md`. Sama skill nie wystarczy.

## Co ten dodatek łączy (celowo ograniczone)

Dodatek DWP **nie** wynajduje recenzenta na nowo. Deleguje instalację, metodologię, kreator CI, tworzenie rozszerzeń, szkicowanie PR i przegląd po CI do pięciu sub-skills skill upstream (domyślny przepływ nadrzędny, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Rozszerzenie Przeglądu Bezpieczeństwa

Po wykryciu `create` / `execute` dodają krok lokalnego przeglądu do obowiązkowego zadania Przeglądu Bezpieczeństwa. Wynik jest dołączany pod `## AI Diff Reviewer local review` w `analysis_results/SECURITY_REVIEW.md`.

- **Miękka porażka (tylko wywołanie):** brakująca skill, brakujące rozszerzenie lub błąd wywołania → ostrzeż raz i kontynuuj; nigdy nie powoduj porażki zadania z tego powodu.
- **Bramka po ukończonym przebiegu:** wyniki `critical` nadal blokują ukończenie Przeglądu Bezpieczeństwa do czasu naprawienia lub wyraźnej akceptacji (istniejąca umowa SR). `warning` / `info` są dokumentowane, ale nieblokujące.
- **Flow A nie potrzebuje sekretu CI.** Nieustawiony `CURSOR_API_KEY` nie może tłumić lokalnego przebiegu.

### Bramka CI Flow B (opcjonalna)

Przypięta Action `DailybotHQ/ai-diff-reviewer@v2`, zazwyczaj bramkowana etykietą (`ready`), ze stabilnie nazwanym zadaniem **AI review gate** do ochrony gałęzi i opcjonalną etykietą pomijania `skip-review-label: skip-ai-review`. Wspólny `prompt.md` + rozszerzenie wyrównuje metodologię i ważność; w ramach Przeglądu Świadomego Iteracji rundy CI 2+ mogą być krótsze, podczas gdy lokalny przebieg pozostaje pełny.

### Opcjonalny towarzysz `apply-review`

Po opublikowaniu przeglądu przez CI deweloper może wywołać `apply-review` podczas `execute`, aby przejść przez wyniki jeden po drugim (zastosuj / odrocz / pomiń) za zgodą. Domyślnie tylko do odczytu; nigdy nie jest plikiem zadania planu (naruszyłoby to obowiązkową kolejność zadań końcowych).

## Zachowanie

- **Pytaj o przepływ; nigdy nie zgaduj.** Instalowanie przepływu bez prośby ma większy ślad niż pozostanie przy Flow A.
- **Uzgadniaj, nie nadpisuj.** Istniejąca skill, rozszerzenie lub `pr-review.yml` są zachowywane; wypełniaj tylko luki.
- **Uwierzytelnienie odroczone.** Sekrety dostawcy dla CI są konfigurowane przez opiekuna; ten dodatek nigdy nie przechowuje poświadczeń.
- **Neutralny wobec dostawcy.** Odmowa pozostawia w pełni AI-first repozytorium.

## Uwagi

Opcjonalny i nigdy niewymagany. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Strona specyfikacji: [Add-ons](/spec/addons).
