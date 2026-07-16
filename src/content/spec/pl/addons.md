---
title: Dodatki
description: "Opcjonalne rozszerzenia DWP: pięć dostępnych addonów (devcontainer, Dailybot, dependency-upgrade, design-system, AI Diff Reviewer), kontrakt addonu oraz koncepcje kit (skille, agenci, presety, adaptery, przykłady)."
order: 5
lang: pl
section: Addons
---

# Dodatki

**Wersja 2.0.** Dodatki to opcjonalne rozszerzenia podstawowej metodyki Deep Work Plan. **Nigdy nie są wymagane do zgodności** — repozytorium bez addonów jest w pełni AI-first i zgodne z DWP. Każdy addon jest proponowany podczas onboardingu, wyraźnie akceptowany lub odrzucany, a po akceptacji **uzgadnia** się z istniejącą konfiguracją zamiast ją nadpisywać.

## Kontrakt addonu

Każdy dostępny addon dostarcza cztery obowiązkowe komponenty:

| Komponent | Cel |
|-----------|---------|
| **Spec** | Normatywny opis RFC-2119 tego, co addon zapewnia i co oznacza „zgodność z tym addonem” |
| **Reasoning templates** | Szablony, które agent wypełnia, analizując stack docelowego repo — nie kopiuj-wklej |
| **Onboarding hook** | Punkt wejścia `SKILL.md`, który przepływ `onboard` wywołuje po akceptacji przez programistę |
| **Validation step** | Lista kontrolna potwierdzająca poprawne zastosowanie addonu |

Odkrywanie: przepływ `onboard` enumeruje `skills/deepworkplan/addons/` i prezentuje każdy addon jako opcjonalny krok w **Phase 7b**, po podstawowym scaffoldingu.

## Dostępne addony (pięć)

Dziś dostępne są cztery addony. Każdy ma **stronę katalogu kit** ze szczegółami dla użytkownika oraz **normatywną specyfikację** w skillu Deep Work Plan.

### Devcontainer (pierwszy addon)

Konfiguracja `.devcontainer/` + `docker/` oparta na compose, wywnioskowana z wykrytego stacku.

- **Strona kit:** [Devcontainer](/kit/devcontainer)
- **Co dodaje:** trwałe wolumeny auth AI-CLI (Claude, Codex, Cursor, gh, Dailybot), `dailybot-project-network`, `DOCKER_DEV_ENV=vscode`, aliasy walidacji (`codecheck`, `check`, `fix`, `test`), higiena sekretów public-OSS
- **Zachowanie:** ~85% stabilnego szkieletu; ~15% wywnioskowane per stack. Istniejące devcontainery są uzgadniane, nigdy nadpisywane
- **Kiedy proponować:** większość repo z Dockerem lub usługami korzystającymi z izolowanego kontenera dev

### Dailybot (drugi addon)

Opcjonalne połączenie z **zespołem Dailybot** programisty dla widoczności postępu agenta.

- **Strona kit:** [Dailybot](/kit/dailybot) — pełna referencja możliwości
- **Co łączy addon DWP:** cztery raporty cyklu życia planu (kickoff, significant task, blocked, completion) przez sub-skill dailybot `report`; opcjonalne deterministyczne wymuszanie hooków (`dailybot hook`, CLI `>= 3.7.0`)
- **Sparowany skill:** instalacja [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (obecnie **3.10.3**) udostępnia **14 możliwości** — czat na Slack/Teams/Discord/Google Chat, check-iny, tworzenie formularzy, ask AI, kudos, klucze API per-repo (`.dailybot/env.json`), e-mail i więcej. Addon DWP łączy tylko **report**; pozostałe możliwości wywołuje się bezpośrednio przez skill Dailybot
- **Auth:** w pełni delegowane do skilla Dailybot (`dailybot login` lub `DAILYBOT_API_KEY`); ten addon nigdy nie przechowuje poświadczeń
- **Zabezpieczenie neutralne wobec dostawcy:** podstawowy DWP ma **zero** zależności od Dailybot; nigdy nie instaluj automatycznie dla wszystkich
- **Kiedy proponować:** programista lub zespół już korzysta z Dailybot lub wyraźnie prosi o raportowanie zespołowe

### Dependency upgrade (trzeci addon)

Aktualizacje zależności niezależne od menedżera pakietów, partiami, zwalidowane i odwracalne.

- **Strona kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Co dodaje:** wykrywa **rzeczywisty** menedżer repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), aktualizuje w partiach sklasyfikowanych semver, uruchamia bramkę walidacji repo po każdej partii, cofa niepowodzenia, podsumowuje bez auto-commitu
- **Polecenie:** instaluje `/lib-upgrade` w `.agents/commands/` tylko po akceptacji
- **Kiedy proponować:** obecny lockfile i stack z dużą liczbą zależności; polecaj tylko gdy istotne

### Design system (czwarty addon)

`DESIGN.md` o zakresie powierzchni interfejsu, który czyta każdy agent kodujący dla spójnego UI, CLI lub wyjścia konwersacyjnego.

- **Strona kit:** [Design system](/kit/design-system)
- **Co dodaje:** `docs/DESIGN.md` (referencja z `AGENTS.md`) z maksymalnie trzema **profilami** w jednym pliku: **visual-ui** (tokeny i komponenty renderowanego UI), **cli-output** (semantyczne style terminala, degradacja TTY/`NO_COLOR`), **conversational** (głos, anatomia wiadomości, renderowanie per platforma z fallbackami plain-text)
- **Siła profilu:** visual-ui **domyślnie włączony przy wykryciu**; cli-output i conversational **zalecane przy wykryciu, zawsze pytane, nigdy auto-stosowane**
- **Kiedy proponować:** tylko gdy wykryto powierzchnię interfejsu dla użytkownika — nie dla czystych bibliotek, usług headless ani repo tylko infra

### AI Diff Reviewer (piąty addon)

Opcjonalne połączenie z **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**, aktualna wersja **v2.0.0**), które rozszerza obowiązkowy Przegląd Bezpieczeństwa o strukturalny lokalny przegląd i opcjonalnie blokuje pull requesty w CI.

- **Strona kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — pełna referencja możliwości
- **Co addon DWP łączy:** lokalne wzmocnienie Przeglądu Bezpieczeństwa poprzez domyślny przepływ nadrzędny upstream skill; wymagane `.review/extension.md` (sama skill jest niepełna); Flow B opcjonalnie instaluje `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v2`) i udostępnia `apply-review` jako towarzysza wywoływanego przez dewelopera — nigdy jako zadanie planu
- **Przepływy:** **A — tylko lokalnie** (skill + rozszerzenie) lub **B — podwójna powierzchnia** (skill + rozszerzenie + CI Action). Addon **MUSI pytać** o przepływ; nigdy nie zakładać wartości domyślnej
- **Miękka porażka vs bramka:** brakujące błędy skill/rozszerzenia/wywołania nigdy nie blokują; wyniki `critical` z **zakończonego** lokalnego przebiegu nadal stosują kontrakt Przeglądu Bezpieczeństwa
- **Parytety (Flow B):** wspólny `prompt.md` + rozszerzenie wyrównuje metodologię/ważność; CI Iteration-Aware Review może skrócić rundy 2+ podczas gdy lokalny przebieg pozostaje pełny
- **Ochrona neutralna wobec dostawcy:** rdzeń DWP ma **zero** zależności od AI Diff Reviewer; nigdy nie instaluj automatycznie dla wszystkich
- **Kiedy proponować:** deweloper lub zespół chce strukturalnego lokalnego przeglądu i/lub bramki scalania PR CI

## Skille

Skille to powtarzalne procedury wywoływane po nazwie. Skill pakuje powtarzalny przepływ pracy (uruchamianie testów, naprawa lintu, tworzenie komponentu).

Metodyka dostarcza mały zestaw podstawowych sub-skilli. Wśród nich sub-skill **author** pozwala repozytorium **rozwijać własny kit**: wywoływany przez `/skill-create` i `/agent-create`, analizuje istniejący układ `.agents/` i konwencje, tworzy nowy skill, agenta lub cienki delegator poleceń pasujący do nich i utrzymuje katalog w synchronizacji. Ten sam sub-skill wykonuje obowiązkowe zadanie odkrywania skilli i agentów.

Wpis kit: [Skill create](/kit/skill-create), [Agent create](/kit/agent-create).

## Agenci

Agenci to wyspecjalizowani wykonawcy o zdefiniowanej roli (reviewer, executor, architect). Mieszkają w `.agents/agents/` i są katalogowani w `.agents/docs/`.

## Dodatki utrzymaniowe

Dodatek **dependency-upgrade** (powyżej) to główny addon utrzymaniowy. Analizuje rzeczywisty menedżer pakietów repo zamiast zakładać npm, klasyfikuje aktualizacje według semver, aktualizuje w bezpiecznych partiach, uruchamia walidację po każdej partii i cofa nieudane partie.

## Dodatek design-system

Zobacz [Design system](/kit/design-system) w sekcji dostępnych addonów. `DESIGN.md` na poziomie repo różni się od technicznego dokumentu projektowego per funkcja: README planu DWP, kryteria akceptacji zadań i bramki walidacji już pokrywają projekt per funkcja. Addon design-system wypełnia trwały, repo-natywny kontekst projektowania **interfejsu**.

## Presety

Presety dostosowują DWP do konkretnego stacku technologicznego (Django, React, Go, Astro + Svelte i więcej). Przeglądaj [katalog kit](/kit).

## Adaptery

Adaptery mapują polecenia DWP na system poleceń konkretnego agenta (Claude Code, Cursor, Codex, Gemini, Copilot, OpenClaw i inne). Wpisy adapterów w kit znajdują się pod nazwą każdego agenta.

## Przykłady

Przykłady pokazują DWP w praktyce: porównania przed/po, przykładowe plany, studia przypadków. Zobacz [Examples](/examples) i [Dogfood this site](/kit/dogfood-this-site).

## Przypomnienie o zgodności

Repozytorium **MUSI** być w pełni zgodne z **zerem** addonów. Addony to warstwowe, opcjonalne możliwości — nigdy warunki wstępne. Zobacz [Conformance](/spec/conformance).
