---
title: "Metodyka Deep Work Plan"
description: "Pięć rozdziałów od manifestu po archetypy: zasady, podstawowa pętla, szablony, skille i adaptacje stojące za metodyką Deep Work Plan."
lastUpdated: 2026-05-30
---

## Metodyka Deep Work Plan

Deep Work Plan (DWP) to otwarta, niezależna od frameworków metodyka prowadzenia ustrukturyzowanej, autonomicznej pracy inżynierskiej z agentami kodującymi AI. Zamienia mglisty cel w plan gotowy do recenzji, który agent może wykonać, wstrzymać, wznowić i o którym może raportować — bez utraty kontekstu.

DWP opiera się na trzech filarach.

**Rozwój oparty na specyfikacji (spec-driven development).** Zamiast traktować zapis rozmowy jako źródło prawdy, najpierw spisujesz, *co* powinno być prawdą — cel, zakres, kryteria akceptacji oraz kontrole dowodzące ukończenia — a agent wykonuje pracę względem tej specyfikacji. W DWP plan *jest* specyfikacją: plan → zadania atomowe → bramki walidacyjne → ukończenie. Spisanie specyfikacji najpierw ogranicza dryf (agent jest mierzony względem zadeklarowanych kryteriów), czyni pracę weryfikowalną (każda bramka przechodzi albo zawodzi) i wznawialną (specyfikacja przeżywa każdą sesję i każdego agenta). Niezależna od narzędzi i natywna dla repozytorium, różni się od systemów spec-driven związanych z konkretnym narzędziem, takich jak GitHub Spec Kit, Amazon Kiro czy Tessl.

**Inżynieria harnessu — repozytorium staje się harnessem.** Sam model językowy to tylko predyktor tekstu; tym, co czyni z niego niezawodnego inżyniera, jest otaczający go *harness* (rusztowanie agenta) — kontekst, narzędzia, pętla sterująca, zabezpieczenia i trwały stan. Inżynieria harnessu polega na celowym projektowaniu tego rusztowania. Stanowisko DWP jest takie, że powinno ono żyć w repozytorium, a nie w narzędziu: kontekst jako `AGENTS.md` + `docs/`, narzędzia jako kit `.agents/`, pętla sterująca jako plan, zabezpieczenia jako bramki walidacyjne, a stan jako `.dwp/` w gitignore. Ponieważ każda część jest plikiem w repozytorium, harness jest przenośny — więc dowolny agent może sterować dowolnym repozytorium.

**Efektywność tokenów — długi horyzont z założenia, wydajność z konstrukcji.** Kontekst to najrzadszy zasób, jakim dysponuje agent kodujący, a metodyka, która go marnuje, zawodzi dokładnie wtedy, gdy praca robi się długa. DWP ładuje instrukcje stopniowo — każdy przewodnik ładuje się, gdy zadziała jego wyzwalacz — dobiera walidację według tego, czego faktycznie dotyka każde zadanie, i decyduje o skillach lokalnie w zadaniu. Liczba bajtów instrukcji wymaganych przez każdy przepływ jest mierzona i publikowana; żadnych wymyślonych procentów tokenów.

Metodyka jest wyjaśniona w pięciu rozdziałach:

1. **Manifest** — czym jest Deep Work Plan i dlaczego ustrukturyzowane wykonanie ma znaczenie.
2. **Podstawowa pętla** — cykl plan-wykonanie-weryfikacja napędzający każde zadanie.
3. **Szablony** — struktury planu i zadań, które łączą agentów i ludzi.
4. **Skille i agenci** — jak komendy i role agentów współgrają ze sobą, żywy kit (jak repozytorium rozwija własne skille za pomocą sub-skilla author) oraz opcjonalne dodatki, takie jak dependency-upgrade i dodatek design-system dla dowolnej powierzchni interfejsu skierowanej do użytkownika (wizualny UI, wyjście CLI lub konwersacyjna).
5. **Archetypy** — dostosowanie metodyki do pojedynczych repozytoriów i centrów orkiestracji.

- [Przeczytaj metodykę](/methodology)
- [Przeczytaj specyfikację](/spec)
- [Przeglądaj kit](/kit)
