---
title: Angular
description: "Preset onboardingowy dla projektów Angular, ze wskazówkami do rozumowania o komponentach, modułach lub standalone API, serwisach, RxJS i narzędziu testowym."
kind: preset
lang: pl
order: 15
stack: Angular
---

# Preset Angular

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla projektów Angular. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `angular.json` i `@angular/core` w zależnościach; `src/app/` z `@Component`/`@NgModule` lub komponentami standalone.
- Serwisy z `@Injectable`, obserwowalne RxJS i wstrzykiwanie zależności.
- Menedżer pakietów wnioskowany z istniejącego pliku blokady.

## O czym należy rozumować

- Rzeczywiste polecenia testowe (`ng test` / Karma+Jasmine `*.spec.ts` lub Jest), lint (`ng lint` / `@angular-eslint`) i build (`ng build`) — zapisane dosłownie.
- Czy aplikacja używa NgModules czy standalone-components API oraz konwencje routingu i DI.
- Skille właściwe dla stosu: `component`, `service`, `module`/`standalone`, `guard`/`resolver`.

## Uwagi

Przydatny dla aplikacji Angular zgodnych z układem projektu CLI. Potwierdź Karma/Jasmine vs Jest na podstawie istniejącej konfiguracji.
