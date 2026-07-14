---
title: Dailybot
description: "Opcjonalny addon DWP: połącz cykl życia planu z zespołem Dailybot, opcjonalne wymuszanie hooków oraz pełny skill agenta Dailybot 3.10.3 (czat, check-iny, formularze, Ask AI i więcej)."
kind: addon
lang: pl
order: 2
---

# Addon Dailybot

Połącz wykonanie Deep Work Plan z **zespołem Dailybot**, aby ludzie widzieli, co budują agenci — kickoff, postęp w trakcie planu, blokery i ukończenie — bez dodatkowych spotkań ani drugiego toolchainu. **Opcjonalny** addon dla zespołów, które już korzystają z [Dailybot](https://www.dailybot.com).

Podstawowa metodyka Deep Work Plan ma **zero** zależności od Dailybot. Repozytorium bez addonów jest w pełni zgodne. Proponuj ten addon tylko wtedy, gdy programista lub zespół już korzysta z Dailybot; nigdy nie instaluj go automatycznie dla wszystkich.

## Kiedy używać

| Sygnał | Działanie |
|--------|--------|
| Zespół już korzysta z Dailybot (Slack, Teams, Discord, Google Chat lub panel) | **Polecaj** podczas onboardingu |
| Programista prosi o widoczność postępu agenta lub aktualizacje w stylu standupu | **Zaproponuj** addon |
| Greenfield repo bez konta Dailybot | **Pomiń** — neutralna podstawa wystarczy |
| Praca kliencka pod NDA, gdzie postęp nie może opuszczać repo | **Pomiń** lub zacommituj `.dailybot/disabled` jako lokalny kill-switch |

## Co ten addon łączy (celowo wąsko)

Addon DWP Dailybot **nie wymyśla** Dailybot na nowo. Łączy wykonanie planu z sub-skillem dailybot **`report`** i opcjonalnie commituje hooki harnessa. Reszta — instalacja, zgoda, uwierzytelnianie, styl pisania — jest **delegowana** do oficjalnego [skilla agenta Dailybot](https://github.com/DailybotHQ/agent-skill) (obecnie **3.10.3**).

### Cztery zdarzenia cyklu życia

Podczas DWP `create` / `execute` addon łączy **cztery aktualizacje agenta typu best-effort**. Każde zdarzenie jest warunkowe (Dailybot obecny i uwierzytelniony), nieblokujące i respektuje `.dailybot/disabled`.

| Zdarzenie | Wyzwalacz | Poziom | Wymaganie |
|-------|---------|-------|-------------|
| **Kickoff** | Plan zmaterializowany i zatwierdzony lub pierwsza tura `execute` | regular | SHOULD |
| **Significant task** | Ukończona funkcja, poprawka błędu lub duży refactor — nie prace setupowe | regular | MAY |
| **Blocked** | Plan wstrzymany; wypełnione `state.json.blocked` (`reason`, `needs`) | regular + blockers | SHOULD |
| **Completion** | Wszystkie zadania ukończone; plan zakończony | **milestone** | SHOULD |

Payloady pochodzą z warstwy stanu planu (`state.json`), gdy jest obecna: `completed` jako wyniki (nie numery zadań), `in_progress` z bieżącego zadania, `blockers` z `state.json.blocked`. Wiadomość opisuje **co zbudowano i dlaczego** — nigdy ścieżek plików, statystyk git, nazw branchy ani ID planów.

### Opcjonalne wymuszanie hooków

Przy `dailybot-cli >= 3.7.0` addon **może** zacommitować hooki harnessa na poziomie repo (`dailybot hook session-start | activity | post-commit | stop | dismiss`) wspierane lokalnym rejestrem per-repo. Harness przypomina agentowi na końcu tury, gdy zdarzenie cyklu życia zostało pominięte — kluczowe dla długich sesji bez nadzoru, gdzie instrukcje promptu słabną.

Udany raport cyklu życia **resetuje** rejestr hooków, więc obie warstwy nigdy nie raportują podwójnie. Polecenia hooków czytają tylko stan lokalny i zawsze kończą się kodem `0`.

### Tożsamość repo i polityka raportów

Opcjonalnie zacommituj `.dailybot/profile.json` (lub `.dailybot_example/profile.json` jako szablon), aby każdy współtwórca i agent podpisywał raporty tak samo. **Nigdy** nie umieszczaj poświadczeń w tym pliku — pole `key` to twardy błąd.

Ten sam plik może zawierać politykę raportów, którą honorują hooki:

```json
{
  "name": "my-repo-agent",
  "report": {
    "min_interval_minutes": 30,
    "nudge": true,
    "mode": "continuous"
  }
}
```

`"mode": "continuous"` jest szczególnie przydatny dla repo opartych na badaniach lub dokumentacji: praca bez commitów (analiza, dokumenty projektowe, plany) jest przypominana szybciej.

## Instalacja (wszystko opcjonalne)

Addon **proponuje** ścieżki instalacji; skill Dailybot odpowiada za zgodę i weryfikację.

| Komponent | Polecenie / ścieżka |
|-----------|----------------|
| **Skill agenta Dailybot** (zalecany) | `npx skills add DailybotHQ/agent-skill` |
| **Aktualizacja istniejącego skilla** | `npx skills update dailybot` |
| **OpenClaw** | `openclaw skills install dailybot` |
| **Git clone** | `git clone https://github.com/DailybotHQ/agent-skill.git` + `./setup.sh` |
| **Dailybot CLI** (minimum `>= 3.7.0`) | Instalowany przez skill przy pierwszym użyciu przez `shared/auth.md`; lub `pip install 'dailybot-cli>=3.7.0'`, Homebrew lub installer ze sprawdzonym checksum na [cli.dailybot.com](https://cli.dailybot.com) |

Sprawdź wersje: `dailybot --version` i `dailybot version --check`. Aktualizacja: `dailybot upgrade`.

## Uwierzytelnianie — delegowane

Ten addon **nigdy** nie pyta o e-mail, OTP ani klucze API i **nigdy** nie przechowuje poświadczeń. Uwierzytelnianie należy do skilla Dailybot [`shared/auth.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/shared/auth.md):

- `dailybot login` (OTP e-mail), lub
- `DAILYBOT_API_KEY` / `dailybot config key=...`, lub
- opcjonalny, gitignorowany plik kluczy per-repo `.dailybot/env.json` (`dailybot env add/use`, CLI `>= 3.7.0`), aby programista mógł być zalogowany do różnych organizacji w różnych repozytoriach.

Rozwiązywanie auth działa w trybie **Bearer-first**: token sesji ma priorytet, z przezroczystym ponowieniem Bearer→klucz API przy `401`/`403`, więc nieaktualny token nigdy nie blokuje ważnego klucza. Jeśli auth zostanie odrzucone lub jest niedostępne, raportowanie jest cicho pomijane — praca trwa dalej.

## Sparowany skill Dailybot — 14 możliwości (3.10.3)

Instalacja skilla agenta Dailybot daje znacznie więcej niż łączy addon DWP. Oficjalny pakiet skilli (skill **3.10.3**, CLI baza **>= 3.7.0**, bieżąca publikacja **3.7.3**) udostępnia **14 skoordynowanych sub-skilli**:

| Sub-skill | Co robi |
|-----------|--------------|
| **Progress reports** | Aktualizacje agenta w stylu standupu na panelu Dailybot |
| **Ask the AI** | Jednorazowe, headless zapytania do asystenta AI Dailybot |
| **Message polling** | Sprawdzanie instrukcji zespołu na starcie sesji lub w bezczynności |
| **Email** | Wysyłanie e-maili z obowiązkowymi kontrolami bezpieczeństwa przed wysłaniem |
| **Chat** | Wysyłanie lub edycja na Slack, Microsoft Teams, Discord lub Google Chat — kanały, DM, zespoły, wątki w stylu raportu, send-as-user (Slack, admin) |
| **Conversations** | Otwieranie lub ponowne użycie grupowego DM Slack z botem i wskazanymi współpracownikami; publikacja raportu w tej samej wywołaniu |
| **Health and status** | Ogłaszanie agenta online/offline dla długich sesji |
| **Check-ins** | Uzupełnianie standupów; **tworzenie** check-inów (harmonogram, uczestnicy, pytania, przypomnienia, ustawienia AI) |
| **Kudos** | Docenianie współpracowników lub całych zespołów; przeglądanie feedu uznania, feedu org, wall of fame |
| **Teams** | Listowanie zespołów, inspekcja członków, rozwiązywanie nazw do UUID; `me`, `org`, profile użytkowników |
| **Forms** | Listowanie (teraz domyślnie **w zakresie org**, z `--mine` i `--owner` do zawężenia), wysyłanie, aktualizacja, przejścia formularzy; **tworzenie** formularzy (stany workflow, uprawnienia, ChatOps); paginacja, wyszukiwanie i filtry dat |
| **Workflows** | Odczyt workflow org (`workflow list` / `workflow get`; tylko do odczytu) |
| **Report channels** | Odkrywanie UUID kanałów dla formularzy lub check-inów |
| **Klucze API per-repo** | Zarządzanie `.dailybot/env.json` — opcjonalnym, gitignorowanym plikiem kluczy API + URL na środowisko (`dailybot env add / use / show / list / remove / off / on`, CLI `>= 3.7.0`) |

**Addon DWP łączy tylko `report` z wykonaniem planu.** Wywołuj skill Dailybot bezpośrednio dla wszystkiego innego — np. opublikuj podsumowanie wdrożenia na `#releases`, uzupełnij standup lub poproś AI Dailybot o podsumowanie trendów check-inów.

Referencja publiczna: [dailybot.com/skill.md](https://www.dailybot.com/skill.md). Źródło: [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill). Model zaufania: [`TRUST.md`](https://github.com/DailybotHQ/agent-skill/blob/main/skills/dailybot/TRUST.md) w pakiecie skilli.

## Zachowanie — deleguj, nigdy nie blokuj

| Reguła | Szczegół |
|------|--------|
| **Deleguj** | Skill Dailybot odpowiada za instalację, zgodę, auth, szablony hooków, styl pisania |
| **Nigdy nie blokuj** | Brak CLI, błąd auth, błąd sieci → ostrzeż raz, kontynuuj główną pracę |
| **Bez ponowień** | Nie wchodź w pętle diagnostyczne; raportowanie jest best-effort |
| **Uzgadniaj** | Istniejący skill, CLI, profil, hooki lub okablowanie raportów jest zachowane — uzupełniaj tylko luki |
| **Neutralny wobec dostawcy** | DWP nie wymaga Dailybot; ten addon to dodatkowa widoczność dla zespołu |

## Przepływ onboardingu

Podczas DWP `onboard` w **Phase 7b**, po podstawowym scaffoldingu AI-first, przepływ proponuje cztery opcjonalne addony. Jeśli programista zaakceptuje Dailybot:

1. Wykryj istniejącą konfigurację (skill, CLI, `.dailybot/profile.json`, hooki, krok raportu).
2. Zaproponuj instalację skilla/CLI przez przepływy zgody Dailybot.
3. Deleguj uwierzytelnianie do `shared/auth.md`.
4. Podłącz cztery zdarzenia cyklu życia do `AGENTS.md` / `docs/AI_AGENT_COLLAB.md`.
5. Opcjonalnie zaproponuj wymuszanie hooków i `.dailybot/profile.json`.
6. Uruchom walidację (SPEC §8 w `addons/dailybot/SPEC.md` skilla).

Kontrakt normatywny w skillu Deep Work Plan: `addons/dailybot/SPEC.md` (wersja **2.3.0**).

## Powiązane wpisy kit

- [Devcontainer](/kit/devcontainer) — powtarzalne środowisko dev z trwałością Dailybot CLI (pierwszy addon)
- [Dependency upgrade](/kit/dependency-upgrade) — partiami, zwalidowane aktualizacje zależności (trzeci addon)
- [Design system](/kit/design-system) — `DESIGN.md` dla agentów na powierzchniach interfejsu (czwarty addon)
- [Deep Work Plan onboard](/kit/deepworkplan-onboard) — sub-skill onboardingu, który proponuje addony
