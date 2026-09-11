---
title: "DWP v3: efektywność tokenowa dzięki konstrukcji"
description: "Deep Work Plan v3 przebudowuje harness wokół kosztu kontekstu — stopniowe ujawnianie informacji, walidacja ograniczona do dotkniętego obszaru i jeden obowiązkowy Final Review — jednocześnie podnosząc poprzeczkę zaufania i zgodności."
date: 2026-09-10
version: "v3 · Efektywność tokenowa"
kind: release
lang: pl
order: 2
featured: false
sourceLabel: "Skill release commit d050474"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/d050474bea3a2b7675ce851efb377833b4960367"
---

Dziś wydajemy Deep Work Plan v3. Kontekst jest najbardziej ograniczonym zasobem agenta, a to wydanie traktuje to jako problem inżynieryjny, a nie nieformalną obietnicę: kompresujemy rusztowanie, nigdy instrukcje.

`GUIDE.md` staje się indeksem trasowania zamiast dokumentu, który każdy agent czyta w całości, dzięki czemu agent ładuje tylko te wskazówki, których faktycznie potrzebuje na danym etapie. Bramki walidacyjne są teraz wybierane na podstawie dotkniętego obszaru każdego zadania zamiast ponownego uruchamiania całego zestawu testów przy każdej zmianie, a tworzenie planu może od razu przejść w tryb zaufania, gdy deweloper już wie, czego chce, pomijając pośredni przegląd. Nic z tego nie osłabia bramek: usuwa jedynie powtarzane odczyty, zbędne ładowanie kontekstu i pracę walidacyjną, która nie odpowiada temu, co faktycznie się zmieniło.

Obok pracy nad efektywnością, to wydanie podnosi też poprzeczkę zaufania. Jeden obowiązkowy Final Review zastępuje trzy zadania kończące, które wcześniej kończyły plan, lokalny przegląd AI Diff Reviewer staje się wymaganym elementem bazowym, a zgodność zaczyna się teraz od zera opcjonalnych dodatków — bezpieczeństwo i pochodzenie są wymaganiami, a nie opcjonalnym dopracowaniem. `AGENTS.md` odnotowuje pochodzenie standardu DWP repozytorium, a starsze plany zachowują swój zarejestrowany kształt wraz z jawną ścieżką migracji zamiast być cicho przepisywane.

To wydanie jest zgodne ze standardem DWP `2.3.0`. Obciążenie instrukcjami i zachowanie powtórek są mierzone względem publicznego rejestru ewaluacyjnego, nigdy raportowane jako wymyślony procent oszczędności.

Przeczytaj [architekturę efektywności tokenowej](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/adr/0001-token-efficiency-architecture.md) i jej [zapis ewaluacji](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/docs/evaluations/token-efficiency.md), albo zapoznaj się z [normatywną specyfikacją](https://deepworkplan.com/spec) i [zestawem narzędzi](https://deepworkplan.com/kit/).
