---
title: Dodatki
description: "Dodatki DWP: siedem opcjonalnych rozszerzeń, wymagany lokalny przegląd AI Diff Reviewer z opcjonalną powierzchnią CI, kontrakt i pojęcia kitu."
order: 6
lang: pl
section: Addons
---

# Dodatki

> **Zakres wersji:** To zachowany dokument bazowy v5.0.0. Aktualny standard, DWP 7.0.0, wymaga również odpowiednich rozszerzeń `V6_*.md` i `V7_*.md` wymienionych w [indeksie specyfikacji](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/skills/deepworkplan/spec/README.md). Istniejące plany v5 i v6 zachowują zapisane reguły.

**Wersja 2.1.0.** Dodatki to rozszerzenia podstawowej metodyki Deep Work Plan. Siedem z ośmiu jest opcjonalnych i **nigdy nie są wymagane do zgodności** — repozytorium bez opcjonalnych addonów jest w pełni AI-first i zgodne z DWP. Każdy opcjonalny addon jest proponowany podczas onboardingu, wyraźnie akceptowany lub odrzucany, a po akceptacji **uzgadnia** się z istniejącą konfiguracją zamiast ją nadpisywać. Jeden komponent jest zadeklarowanym wyjątkiem: od standardu 2.3.0 **lokalny przegląd AI Diff Reviewer** jest częścią wymaganej linii bazowej — onboarding go instaluje, a każde Final Review go uruchamia — podczas gdy jego powierzchnia CI pozostaje opcjonalna.

## Kontrakt addonu

Każdy dostępny addon dostarcza cztery obowiązkowe komponenty:

| Komponent | Cel |
|-----------|---------|
| **Spec** | Normatywny opis RFC-2119 tego, co addon zapewnia i co oznacza „zgodność z tym addonem” |
| **Reasoning templates** | Szablony, które agent wypełnia, analizując stack docelowego repo — nie kopiuj-wklej |
| **Onboarding hook** | Punkt wejścia `SKILL.md`, który przepływ `onboard` wywołuje po akceptacji przez programistę |
| **Validation step** | Lista kontrolna potwierdzająca poprawne zastosowanie addonu |

Odkrywanie: przepływ `onboard` enumeruje `skills/deepworkplan/addons/` i prezentuje każdy addon jako opcjonalny krok w **Phase 7b**, po podstawowym scaffoldingu.

## Dostępne addony (osiem)

Dziś dostępnych jest osiem addonów — siedem opcjonalnych plus wymagany lokalny przegląd. Każdy ma **stronę katalogu kit** ze szczegółami dla użytkownika oraz **normatywną specyfikację** w skillu Deep Work Plan. Cztery z nich — devcontainer, Herdr, DeepWorkPlan Vim i Agentkit — to cienkie integratory przypięte tagiem do produktu z własnym repozytorium i cyklem wydań; każdy produkt działa bez Deep Work Plan. Zaakceptowany addon jest zapisywany w rejestrze addonów `.dwp/config.json` (DWP 7.0.0), który może jedynie proponować lub wzmacniać — nigdy nie warunkuje zgodności ani planu.

### Devcontainer (pierwszy addon)

Cienki integrator [devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit) (`dck`, przypięty do `v0.2.2`, interfejs `2`): szablon Dev Containers, który `dck init` renderuje do repozytorium jako jego własny kontener, plus skill `dck-dockerfile`.

- **Strona kit:** [Devcontainer](/kit/devcontainer)
- **Co dodaje:** `docker/local/<service>/Dockerfile` z oficjalnego obrazu środowiska uruchomieniowego przypiętego przez digest (`python-3.13`, `node-24` lub `debian`, bez współdzielonego obrazu bazowego), `dev.sh` nad launcherem `dck` (`up`, `shell`, `rebuild`, `doctor`), agentów kodujących jako warstwę opt-in, porty tylko na loopbacku, git przez SSH za pośrednictwem agenta hosta bez żadnego klucza w środku oraz maszyny Herdr dla każdego kontenera ze standardowym układem
- **Zachowanie:** wykrywany przez `dck doctor --json` (interfejs 2); `dck init` uzgadnia istniejący devcontainer dopiero po zaakceptowaniu jego diffu i najpierw tworzy kopię zapasową pliku — nigdy nie nadpisuje
- **Kiedy proponować:** większość repo z Dockerem lub usługami korzystającymi z izolowanego kontenera dev

### Dailybot (drugi addon)

Opcjonalne połączenie z **zespołem Dailybot** programisty dla widoczności postępu agenta.

- **Strona kit:** [Dailybot](/kit/dailybot) — pełna referencja możliwości
- **Co łączy addon DWP:** cztery raporty cyklu życia planu (kickoff, significant task, blocked, completion) przez sub-skill dailybot `report`; opcjonalne deterministyczne wymuszanie hooków (`dailybot hook`, CLI `>= 3.9.0`)
- **Sparowany skill:** instalacja [DailybotHQ/agent-skill](https://github.com/DailybotHQ/agent-skill) (obecnie **3.23.3**) udostępnia **17 możliwości** — czat na Slack/Teams/Discord/Google Chat, check-iny, tworzenie formularzy, ask AI, kudos, tablice i zadania Plan, etykiety organizacji, klucze API per-repo (`.dailybot/env.json`), e-mail i więcej. Addon DWP łączy tylko **report**; pozostałe możliwości wywołuje się bezpośrednio przez skill Dailybot
- **Auth:** w pełni delegowane do skilla Dailybot (`dailybot login` lub `DAILYBOT_API_KEY`); ten addon nigdy nie przechowuje poświadczeń
- **Zabezpieczenie neutralne wobec dostawcy:** podstawowy DWP ma **zero** zależności od Dailybot; nigdy nie instaluj automatycznie dla wszystkich
- **Kiedy proponować:** programista lub zespół już korzysta z Dailybot lub wyraźnie prosi o raportowanie zespołowe

### Dependency upgrade (trzeci addon)

Aktualizacje zależności niezależne od menedżera pakietów, partiami, zwalidowane i odwracalne.

- **Strona kit:** [Dependency upgrade](/kit/dependency-upgrade)
- **Co dodaje:** wykrywa **rzeczywisty** menedżer repo (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer, …), aktualizuje w partiach sklasyfikowanych semver, uruchamia bramkę walidacji repo po każdej partii, cofa niepowodzenia, podsumowuje bez auto-commitu
- **Polecenie:** instaluje `/lib-upgrade` w `.agents/commands/` tylko po akceptacji
- **Kiedy proponować:** proponowany dla każdego repo z zadeklarowanymi zależnościami; nieaktywny delegator `/lib-upgrade` instaluje się za zgodą onboardingu, chyba że zostanie jawnie odrzucony — instalacja nie uruchamia żadnego upgrade'u

### Design system (czwarty addon)

`DESIGN.md` o zakresie powierzchni interfejsu, który czyta każdy agent kodujący dla spójnego UI, CLI lub wyjścia konwersacyjnego.

- **Strona kit:** [Design system](/kit/design-system)
- **Co dodaje:** `docs/DESIGN.md` (referencja z `AGENTS.md`) z maksymalnie trzema **profilami** w jednym pliku: **visual-ui** (tokeny i komponenty renderowanego UI), **cli-output** (semantyczne style terminala, degradacja TTY/`NO_COLOR`), **conversational** (głos, anatomia wiadomości, renderowanie per platforma z fallbackami plain-text)
- **Siła profilu:** wykrycie czyni propozycję obowiązkową; instalacja jest uzależniona od akceptacji — tak w trybie guidowanym, jak i trust — visual-ui **zdecydowanie zalecany po wykryciu**; cli-output i conversational **zalecane przy wykryciu, zawsze pytane, nigdy auto-stosowane**
- **Kiedy proponować:** tylko gdy wykryto powierzchnię interfejsu dla użytkownika — nie dla czystych bibliotek, usług headless ani repo tylko infra

### AI Diff Reviewer (piąty addon — wymagany lokalny przegląd, opcjonalna powierzchnia CI)

**[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (marketplace **"AI Diff Reviewer"**) nadaje obowiązkowemu przeglądowi bezpieczeństwa Final Review strukturalny lokalny przegląd i opcjonalnie blokuje pull requesty w CI. Od standardu 2.3.0 **lokalny przegląd jest częścią linii bazowej**; tylko powierzchnia CI jest opcjonalna. Ten addon jest automatycznie odświeżany przy każdym release'ie, więc pokazany poniżej tag jest tym aktualnym w chwili pisania i może być opóźniony względem zwendorowanej kopii — miarodajne dla faktycznie zainstalowanego tagu są własny `SKILL.md` addonu i jego wydania na GitHubie. Instalacja jest zawsze przypięta do opublikowanego tagu, nigdy do ruchomej gałęzi.

- **Strona kit:** [AI Diff Reviewer](/kit/ai-diff-reviewer) — pełna referencja możliwości
- **Wymagany przy onboardingu (Phase 7a):** instalacja vendored skilla przypięta do tagu (`npx --yes skills add https://github.com/DailybotHQ/ai-diff-reviewer/tree/v3.3.0 --skill ai-diff-reviewer -y`) plus dopasowane do repo `.review/extension.md` (przez `generate-extension`), za zgodą onboardingu; ukierunkowany upgrade harnessu uzgadnia oba elementy, gdy ich brakuje; odmowa jest zapisywana jako zadeklarowany wyjątek i zgłaszana przez `verify` do czasu instalacji
- **Wymagany w każdym Final Review:** przegląd bezpieczeństwa uruchamia domyślny przepływ nadrzędny upstream skilla na skumulowanym zestawie zmian i dołącza jego wynik do lokalnego dla planu `analysis_results/SECURITY_REVIEW.md` (wewnątrz własnego folderu planu, nigdy w katalogu głównym repo); brakująca skill lub rozszerzenie to zapisane znalezisko `local reviewer not installed` — nigdy ciche pominięcie i nigdy zaskakujący bootstrap: instalacja należy do zgody onboardingu albo jawnego wywołania addonu; **zweryfikowane wyniki `critical`** ze zakończonego przebiegu blokują ukończenie do czasu naprawy lub wyraźnej akceptacji (v3, BC-07 — niezweryfikowane twierdzenia krytyczne pojawiają się jako adnotowane ostrzeżenia, a przegląd `incomplete`/`timeout` nie jest czystym przebiegiem, BC-04)
- **Opcjonalna powierzchnia CI (Flow B):** `pr-review.yml` (`DailybotHQ/ai-diff-reviewer@v3`) przez upstream sub-skill `setup`, plus towarzysze `apply-review` (tylko odczyt) i `address-review` (robi commity, push i uzbraja ponownie; nowy w v3.1.1) jako wygodne narzędzia wywoływane przez dewelopera — proponowany wyraźnie, nigdy instalowany nieproszony, nigdy domyślny, nigdy zadanie planu
- **Nigdy nie blokuje (tylko wywołanie):** lokalny przegląd, który mógł wystartować, ale kończy się błędem, to ostrzeżenie raz, zapis i kontynuacja; nigdy nie zawiedzie z tego powodu zadania
- **Parytety (Flow B):** wspólny `prompt.md` + rozszerzenie wyrównuje metodologię/ważność; CI Iteration-Aware Review może skrócić rundy 2+ podczas gdy lokalny przebieg pozostaje pełny
- **Ochrona neutralna wobec dostawcy:** żaden przepływ Deep Work Plan nie wymaga komercyjnej usługi, dostawcy CI ani sekretu — reviewer to skill na licencji MIT przypięty do tagu, uruchamiany przez własnego agenta kodującego dewelopera
- **Zgodność:** `verify` zgłasza brakujący lokalny reviewer jako niepowodzenie dla repozytoriów deklarujących standard 2.3.0 lub nowszy oraz jako znalezisko wersji harnessu dla starszych repozytoriów

### Herdr (szósty addon)

Cienki integrator [herdr-peers](https://github.com/DailybotHQ/herdr-peers) (przypięty `v0.1.0`, protokół `1`), **interaktywny** transport delegowania planów v7.

- **Strona kit:** [Herdr](/kit/herdr)
- **Co dodaje:** plan może przekazać ograniczone zadanie agentowi kodującemu w innym panelu [Herdr](https://herdr.dev), na tej samej maszynie lub na takiej, do której Herdr sięga przez SSH, i zapisać jego jedną autoryzowaną odpowiedź w dzienniku
- **Zachowanie:** protokół peerów (stempel, uprawnienie, odpowiedź, ochrona przed pętlą, limity głębokości i rozgałęzienia) znajduje się w herdr-peers, nigdy w pakiecie; każde użycie wymaga uprawnienia kontraktu `agent_delegation`, a wynik delegata pozostaje jedynie deklarowany, dopóki nie zaobserwuje go własny wykonawca planu
- **Kiedy proponowany:** wyraźna zgoda w Phase 7b; wykrywanie `herdr` i `herdr-peers` tylko do odczytu; transport działa wyłącznie wewnątrz sesji Herdr

### DeepWorkPlan Vim (siódmy addon)

Cienki integrator [DeepWorkPlan Vim](https://github.com/DailybotHQ/deepworkplan-vim) (przypięty `v0.5.1`, interfejs `1`), edytora terminalowego dla Deep Work Plan (Neovim 0.12+).

- **Strona kit:** [DeepWorkPlan Vim](/kit/vim)
- **Co dodaje:** opcjonalną powierzchnię edytora na poziomie maszyny dla agentów i ludzi — generowany indeks poleceń, przeglądarkę planów tylko do odczytu i przeglądarkę Markdown; każde twierdzenie jest odczytywane z przypiętej, czytelnej maszynowo powierzchni produktu
- **Zachowanie:** istniejąca konfiguracja Neovim nigdy nie jest nadpisywana bez wyraźnej zgody; wykrywanie odbywa się tylko do odczytu
- **Kiedy proponowany:** wyraźna zgoda w Phase 7b; wyłącznie informacyjnie, gdy brakuje Neovim 0.12+

### Agentkit (ósmy addon)

Cienki integrator [coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit) (`ak`, przypięty `v0.3.0`, interfejs `1`), **bezgłowego** (headless) transportu delegowania planów v7.

- **Strona kit:** [Agentkit](/kit/agentkit)
- **Co dodaje:** jedną powierzchnię poleceń `ak` nad terminalowymi agentami kodującymi, używaną do bezgłowego wykonania ograniczonego zadania planu; wnosi możliwości `subagents`, `cancel_children` i `model_routing` wyłącznie w czasie działania, gdy jest włączony, wykryty i na zgodnym interfejsie
- **Zachowanie:** każde użycie wymaga uprawnienia kontraktu `agent_delegation`; kit domyślnie uruchamia agentów w trybie autonomicznym, a jego opt-out (`--ask` lub `AGENTKIT_PERMISSIONS=ask`) zawsze wygrywa — addon nie podaje żadnej flagi autonomii, przekazuje `--ask`, gdy plan odnotowuje opt-out, i zawsze dla delegatów tylko do odczytu; nigdy sam nie instaluje CLI agentów kodujących i nigdy nie odczytuje wartości kluczy dostawców
- **Kiedy proponowany:** wyraźna zgoda w Phase 7b; wykrywanie tylko do odczytu przez `ak doctor --json`

## Skille

Skille to powtarzalne procedury wywoływane po nazwie. Skill pakuje powtarzalny przepływ pracy (uruchamianie testów, naprawa lintu, tworzenie komponentu).

Metodyka dostarcza mały zestaw podstawowych sub-skilli. Wśród nich sub-skill **author** pozwala repozytorium **rozwijać własny kit**: wywoływany przez `/skill-create` i `/agent-create`, analizuje istniejący układ `.agents/` i konwencje, tworzy nowy skill, agenta lub cienki delegator poleceń pasujący do nich i utrzymuje katalog w synchronizacji. Ten sam sub-skill wspiera przebieg uzgadniania skilli w Final Review.

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
