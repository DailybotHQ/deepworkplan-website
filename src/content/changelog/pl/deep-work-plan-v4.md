---
title: "DWP v4: plany dopasowane do pracy"
description: "Deep Work Plan v4 sprawia, że format planu podąża za pracą, a nie odwrotnie — Lite plan jest teraz kompletną, wykonalną propozycją dla zadań o ograniczonym zakresie, a osobny etap tworzenia szkicu znika."
date: 2026-09-11
version: "v4 · Plany Lite-first"
kind: release
lang: pl
order: 1
featured: true
sourceLabel: "Skill release commit 3daab90"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/3daab90"
---

Dziś wydajemy Deep Work Plan v4. To wydanie dotyczy zwinności i wszechstronności: ta sama metodyka powinna być lekka przy ograniczonej poprawce, a jednocześnie sprawdzać się w pracy trwającej godziny lub dni, bez zmuszania developera do wyboru „poważnego” formatu tylko po to, by uzyskać prawdziwe bramki.

Tworzenie planu dla ograniczonego zakresu pracy nie oznacza już pisania jednorazowego szkicu do przeglądu, a potem osobnego planu końcowego. `create` tworzy teraz bezpośrednio **plan Lite**: zwartą, w pełni wykonalną propozycję z wbudowanymi zapisami zadań, z których każdy ma własne kryteria akceptacji, bramkę walidacyjną i dziennik ukończenia. Nie ma już osobnego etapu przechowywania w `.dwp/drafts/` — szkic i plan to ten sam artefakt, gotowy do przeglądu i uruchomienia od chwili zapisania.

Pełne plany oparte na plikach zadań pozostają dokładnie tam, gdzie powinny: dłuższa, bardziej ryzykowna praca nadal otrzymuje jeden plik na zadanie, dedykowany zapis analizy i tę samą wznawialną warstwę stanu. Plan Lite można w dowolnym momencie awansować do Full, gdy wymaganie lub bramka walidacyjna przestają mieścić się w zwartym zapisie, a wybór reprezentacji początkowej opiera się na jawnych, zarejestrowanych sygnałach — liczbie zadań, dotkniętym obszarze, ryzyku, odwracalności — nigdy na domysłach.

To wydanie jest zgodne ze standardem DWP `2.4.0`. Przeczytaj [normatywną specyfikację](https://deepworkplan.com/spec), zapoznaj się z [zestawem narzędzi](https://deepworkplan.com/kit/) lub rozpocznij wdrożenie od [`/init`](https://deepworkplan.com/init).
