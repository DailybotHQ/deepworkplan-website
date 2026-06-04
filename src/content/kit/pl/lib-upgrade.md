---
title: lib-upgrade
description: "Bezpiecznie aktualizuj zależności repozytorium w zwalidowanych, odwracalnych partiach przez addon dependency-upgrade. Instalowane tylko po zaakceptowaniu tego addonu."
kind: command
lang: pl
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Aktualizuj zależności repozytorium w bezpieczny sposób. Cienki delegator do addonu **dependency-upgrade**.

## Co robi

`lib-upgrade` kieruje do addonu dependency-upgrade. Addon rozpoznaje rzeczywisty menedżer pakietów repozytorium — nigdy nie zakładając, że jest to npm — klasyfikuje aktualizacje według semver, aktualizuje w bezpiecznych partiach, po każdej partii uruchamia rzeczywistą bramkę walidacji repozytorium, wycofuje partię, która zawiodła, i przygotowuje podsumowanie.

## Użycie

```
/lib-upgrade
```

## Zachowanie

1. Wymaganie czystego (lub zabezpieczonego kopią) drzewa roboczego.
2. Wykrycie rzeczywistego menedżera pakietów na podstawie istniejącego manifestu i pliku lock.
3. Klasyfikacja aktualizacji (patch / minor / major); aktualizacje major wymagają zatwierdzenia.
4. Aktualizacja w małych partiach; walidacja rzeczywistej bramki repozytorium po każdej z nich.
5. Wycofanie każdej partii, która nie przejdzie bramki; podsumowanie i pozostawienie commita programiście.

## Uwagi

Ta komenda jest instalowana tylko po zaakceptowaniu addonu dependency-upgrade. Niezależna od menedżera pakietów; nigdy nie commituje automatycznie.
