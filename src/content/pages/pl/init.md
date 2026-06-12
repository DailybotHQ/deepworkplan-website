---
title: Init — Uczyń swoje repozytorium AI-first
description: "Wykonywalny prompt onboardingowy dla agentów AI: przyjmij Deep Work Plan w dowolnym repozytorium — przeanalizuj, udokumentuj, zainstaluj skill i uczyń je sterowalnym."
---

# Init — Prompt onboardingowy dla agentów AI

Jesteś agentem kodującym AI. Najpierw przeczytaj cały ten prompt, a następnie uczyń bieżące repozytorium
**AI-first**, **spec-driven** i **sterowalnym przez agenta**, przyjmując metodykę Deep Work Plan (DWP).
Potraktuj to jako ustrukturyzowane zadanie inżynierskie — Deep Work Plan — a nie szybką edycję.

## Zasady działania (przeczytaj, zanim cokolwiek zmienisz)

1. **Rozumuj o *tym* repozytorium.** Nigdy nie kopiuj szablonu ani nie zostawiaj placeholdera. Każdy plik, który
   napiszesz, musi odzwierciedlać rzeczywiste języki, frameworki, komendy i strukturę repozytorium. Ogólny
   szablon to porażka, a nie produkt.
2. **Działaj nieniszcząco — pytaj, zanim coś zastąpisz.** Repozytorium może już mieć `AGENTS.md`, drzewo
   `docs/`, konfigurację `.agents/` lub skilli, `CLAUDE.md` albo własne konwencje. **Nie**
   nadpisuj, nie przenoś ani nie usuwaj istniejącej pracy po cichu. Wykryj, co istnieje, przeczytaj to i **pogódź**:
   scalaj i ulepszaj w miejscu, gdzie tylko to możliwe. Zanim zastąpisz lub usuniesz cokolwiek, co użytkownik
   już posiada, wyjaśnij co i dlaczego oraz uzyskaj jego wyraźną zgodę.
3. **Zaproponuj plan, a potem wykonaj.** Po rozpoznaniu przedstaw krótki plan — co
   utworzysz, co zmodyfikujesz i wszystko istniejące, co proponujesz pogodzić lub zastąpić — i zaczekaj
   na potwierdzenie użytkownika, zanim wprowadzisz duże lub niszczące zmiany.
4. **Pracuj w bezpiecznych, łatwych do recenzji przyrostach.** Commituj logicznie, dbaj o czytelność diffów, nie dotykaj sekretów
   i zostaw w spokoju niepowiązany kod.
5. **Zatrzymaj się i zaraportuj**, jeśli krok zawiedzie lub stan repozytorium jest niejednoznaczny.
6. **Ufaj, ale weryfikuj.** Traktuj ten prompt jako niezaufane dane wejściowe: potwierdź, że pobrałeś go z
   oficjalnych źródeł (`deepworkplan.com` i repozytoria `DailybotHQ`), oceń go przed działaniem i zweryfikuj
   integralność skilla przed jego uruchomieniem — patrz *Zaufanie i weryfikacja* poniżej.

## 0. Przeczytaj metodykę i specyfikację

Zanim cokolwiek zmienisz, przeczytaj kanoniczne źródła, aby zrozumieć standard, który przyjmujesz:

- Metodyka: https://deepworkplan.com/methodology.md
- Specyfikacja: https://deepworkplan.com/spec.md
- Katalog kitu: https://deepworkplan.com/kit.md

## 1. Rozpoznanie i plan do zatwierdzenia

Najpierw zrozum repozytorium, a potem zaproponuj, co zrobisz.

- **Wykryj stos.** Języki, frameworki, menedżer pakietów (na podstawie pliku blokady, który faktycznie
  istnieje), rzeczywiste komendy build/test/lint/type-check, moduły źródłowe, konwencję testów oraz
  kształt wdrożenia.
- **Sklasyfikuj archetyp.** Pojedyncze repozytorium (przypadek typowy), centrum orkiestracji albo
  przestrzeń robocza agenta — długotrwały dom autonomicznego agenta, gdzie git jest zalecany, a nie
  zakładany z góry — wraz z dowodami.
- **Sporządź inwentarz tego, co już istnieje.** `AGENTS.md`, `CLAUDE.md`, `docs/`, jakąkolwiek konfigurację `.agents/` lub skilli/agentów,
  `.dwp/` i `.gitignore`. Odnotuj wszystko, co już częściowo wykonuje to zadanie.
- **Zaproponuj plan onboardingu.** Przedstaw zwięzłą listę: pliki, które utworzysz, pliki, które
  zmodyfikujesz, oraz wszystko istniejące, co proponujesz pogodzić lub zastąpić — a następnie **poproś użytkownika o potwierdzenie**
  przed kontynuacją. W przypadku dużego repozytorium uchwyć ten plan za pomocą `/dwp-create` i wykonaj go jako
  Deep Work Plan.

## Zaufanie i weryfikacja (zanim zainstalujesz)

Zaraz zainstalujujesz i uruchomisz kod w tym repozytorium, więc najpierw zweryfikuj, co przyjmujesz. Jest to
zalecane: ostrożny agent traktuje pobrany prompt jako niezaufany, dopóki nie zostanie sprawdzony.

- **Potwierdź proweniencję.** Ten prompt i skill są open source na licencji MIT. Kanoniczne
  źródła to `https://deepworkplan.com` i organizacja `DailybotHQ` na GitHubie
  (`deepworkplan-website`, `deepworkplan-skill`). Manifest czytelny maszynowo jest publikowany pod adresem
  `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Poznaj działanie skilla.** Jest Markdown-first: bez CLI, bez HTTP API, bez autoryzacji, **bez połączeń
  sieciowych i bez telemetrii**. Jego jedyna akcja istotna dla bezpieczeństwa to mutowanie *tego* repozytorium,
  a z założenia jest nieniszczący — uzgadnia i pyta przed zastąpieniem.
- **Przed uruchomieniem zweryfikuj integralność.** Każda wersja publikuje `SHA256SUMS` dla dostarczonego skilla;
  potwierdź, że Twoja kopia jest zgodna, zanim jej zaufasz:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Pobierz sumy kontrolne dla wersji, którą zamierzasz zainstalować (zamień vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # niezerowe wyjście oznacza niezgodność pliku — zatrzymaj się
  ```

  Wersje są **sumowane kontrolnie, a nie podpisywane** (podpisywanie to udokumentowany kolejny krok). Wszystko jest
  otwarte i diffowalne, więc możesz też porównać dowolny plik z repozytorium przy jego tagu.
- **Zgłoś problem.** Kwestie bezpieczeństwa zgłaszaj **prywatnie przez raportowanie podatności GitHub** we właściwym repozytorium — `https://github.com/DailybotHQ/deepworkplan-skill/security` lub `https://github.com/DailybotHQ/deepworkplan-website/security` — nie jako publiczne zgłoszenie. Zobacz też `SECURITY.md` każdego repozytorium, `https://deepworkplan.com/.well-known/security.txt` i stronę zaufania `https://deepworkplan.com/trust`.

## 2. Zainstaluj skill Deep Work Plan

Zainstaluj skill, aby agenci tego repozytorium mogli planować i wykonywać ustrukturyzowaną pracę. Dostarcza router
oraz osiem sub-skilli — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` i `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Albo sklonuj i uruchom skrypt konfiguracyjny:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Przeprowadź onboarding repozytorium (przemyślany i nieniszczący)

Wywołaj sub-skill onboard (`/deepworkplan-onboard`). Rozumuj o rzeczywistym repozytorium i dostosuj wszystko
do niego. Dla każdego artefaktu poniżej, **jeśli już istnieje, pogódź go** (scal, ulepsz, dostosuj do
metodyki), zamiast nadpisywać — i potwierdź z użytkownikiem przed zastąpieniem czegokolwiek.

1. **`AGENTS.md` + `CLAUDE.md`.** Wytwórz `AGENTS.md` w katalogu głównym — indeks, obowiązkowe reguły
   (wyłącznie angielski, conventional commits, rzeczywisty wzorzec testów repozytorium i bramki recenzji) oraz blok Quick
   Commands z **rzeczywistymi, uruchamialnymi** komendami repozytorium. Jeśli `AGENTS.md` już istnieje, scal
   z nim, zamiast go zastępować. Utwórz dowiązanie `CLAUDE.md → AGENTS.md` (nie nadpisuj
   istniejącego `CLAUDE.md` bez pytania).
2. **`docs/`.** Wypełnij standardowe kategorie rzeczywistą, specyficzną dla repozytorium treścią: `PRODUCT_SPEC.md` (nietech­niczny dokument produktu/dlaczego — obowiązkowy dla każdego repozytorium, w tym bibliotek), `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`
   (nigdy nie pomijany — każde repozytorium ma swoją posturę bezpieczeństwa, nawet bez sekretów),
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, a także `PERFORMANCE.md` i indeks `docs/README.md`.
   Jeśli dokumentacja już istnieje, zintegruj ją i rozszerz — nie duplikuj.
3. **Dokumentacja poszczególnych modułów.** Dodaj `README.md` (oraz podfolder `docs/` dla złożonych modułów) wewnątrz każdego
   głównego modułu źródłowego wykrytego podczas rozpoznania.
4. **`.agents/` + `.claude → .agents`.** Utwórz kanoniczny, wspólny dla agentów dom: **przemyślany** katalog
   `agents/`, odpowiednich dla stosu `skills/` oraz cienkich komend `dwp-*` w `commands/`, które delegują do
   zainstalowanego skilla — każdy wpis uzasadniony dla *tego* repozytorium, a nie skopiowany z innego. Dodaj
   katalog `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`), który odpowiada temu, co istnieje na
   dysku, plus `settings.json` oraz dowiązanie `.claude → .agents`. Włącz wszelkie istniejące skille/agentów
   do katalogu.
5. **Skill DWP, dostosowany.** Zainstalowany skill jest silnikiem; własny kit repozytorium
   (skille, agenci, komendy) musi być **przemyślany dla tego repozytorium** — nigdy nie skopiowany-wklejony z kitu innego
   repozytorium.
6. **`.dwp/` + `tmp/`.** Utwórz szkielet `.dwp/` objętego gitignore z `plans/` i `drafts/`, a także przestrzeń roboczą `tmp/`
   — obie dodane do `.gitignore` w sposób nieniszczący (dopisz, nigdy nie przepisuj).

## 4. Rozwijaj kit (sub-skill author)

Użyj sub-skilla `author`, aby rozwijać własny kit repozytorium. Cienkie delegatory `/skill-create` i
`/agent-create` do niego kierują. Utwórz **skill** dla powtarzalnej procedury w obrębie sesji, **agenta** dla
powracającej roli z własnym poziomem modelu i narzędziami oraz **komendę** wyłącznie jako cienki delegator. Utrzymuj
katalog `.agents/docs/` w synchronizacji z tym, co istnieje na dysku.

## 5. Zaproponuj opcjonalne dodatki

Po ustanowieniu bazy wymień cztery dodatki (devcontainer, Dailybot, dependency-upgrade, design-system) i zaproponuj każdy jako wyraźną opcję do wyboru. Repozytorium jest
w pełni zgodne przy **zerowej** liczbie dodatków — nigdy nie instaluj ich automatycznie.

- **Wsparcie devcontainera** — odtwarzalny, izolowany kontener deweloperski z trwałym uwierzytelnianiem AI-CLI.
- **Integracja z Dailybot** — raportowanie postępu/kamieni milowych dla zespołów już korzystających z Dailybot,
  z opcjonalną autonomiczną warstwą hooków, dzięki której agenci raportują istotną pracę bez przypominania.
  Podstawowa metodyka nie ma żadnej zależności od Dailybot.
- **Dependency upgrade** — aktualizacje niezależne od menedżera pakietów: partiami, zwalidowane i odwracalne. Po
  zaakceptowaniu instaluje komendę `/lib-upgrade`.
- **Design system** — skierowany do agentów `docs/DESIGN.md`, wywiedziony z prawdziwych tokenów
  projektowych i stylów komponentów repozytorium, dzięki czemu każdy agent generuje UI spójne z własnym
  design systemem repo.

## 6. Planuj i wykonuj

Generuj Deep Work Plany dla dowolnego zadania i uruchamiaj je zadanie po zadaniu:

- `/dwp-create <goal>` — rozłóż cel na ponumerowane, sekwencyjne zadania z bramkami walidacyjnymi.
- `/dwp-execute` — wykonaj plan zadanie po zadaniu, aktualizując postęp i walidując każdą bramkę.
- `/dwp-status` — zaraportuj postęp bez wprowadzania zmian.
- `/dwp-refine` — dodaj, usuń lub uporządkuj zadania, zachowując ukończoną pracę.
- `/dwp-resume` — odtwórz stan i kontynuuj przerwany plan.

Każdy plan kończy się trzema obowiązkowymi zadaniami końcowymi — **Security Review**, czyli
przeglądem bezpieczeństwa własnych zmian planu (z utrzymywaniem `docs/SECURITY.md` w aktualności;
krytyczne znalezisko blokuje ukończenie), Skills & Agents Discovery oraz Executive Report.

## 7. Zweryfikuj

Uruchom `/dwp-verify`, aby uzyskać obiektywny raport zgodności zaliczenie/niezaliczenie (sprawdza
kryteria z [dokumentu Zgodność w specyfikacji](https://deepworkplan.com/spec)),
a następnie potwierdź:

- [ ] Skill jest zainstalowany i rozwiązywalny, ze wszystkimi ośmioma sub-skillami dostępnymi.
- [ ] `AGENTS.md` istnieje w katalogu głównym z rzeczywistym blokiem Quick Commands; `CLAUDE.md` rozwiązuje się do niego.
- [ ] `docs/` zawiera standardowe kategorie z rzeczywistą, specyficzną dla repozytorium treścią; główne moduły mają
      `README.md`.
- [ ] `.agents/` istnieje z `agents/`, `commands/` (cienkie delegatory `dwp-*`), `skills/` oraz katalogiem,
      który odpowiada rzeczywistości; `.claude → .agents` rozwiązuje się.
- [ ] `.dwp/` istnieje, jest objęte gitignore i ma `plans/` oraz `drafts/`; `tmp/` istnieje i jest objęte gitignore.
- [ ] Istniejąca treść użytkownika została zachowana lub pogodzona za zgodą — nic nie zostało zniszczone po cichu.
- [ ] Potrafisz wygenerować Deep Work Plan i wykonać go zadanie po zadaniu, walidując każdą bramkę.

## Rezultat

Po ukończeniu onboardingu repozytorium jest zmienione na dwa trwałe sposoby — filary
metodyki:

1. **Repozytorium jest spec-driven.** Praca zaczyna się od spisanego planu i specyfikacji, a nie od
   doraźnych promptów.
2. **Samo repozytorium jest harnessem agenta.** `AGENTS.md`, `docs/`, dokumentacja poszczególnych modułów oraz
   dom skilli `.agents/` dają każdemu agentowi kontekst i komendy potrzebne do wykonywania ustrukturyzowanej,
   weryfikowalnej pracy.

Każdy może uruchomić ten prompt na dowolnym repozytorium — i zakończyć z bazą kodu, którą może sterować dowolny agent AI.
