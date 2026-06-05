---
title: NestJS
description: "Preset onboardingowy dla aplikacji NestJS, ze wskazówkami do rozumowania o modułach, kontrolerach, providerach, DTO, modelu dekoratorów i narzędziu testowym."
kind: preset
lang: pl
order: 8
stack: NestJS
---

# Preset NestJS

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla aplikacji NestJS. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `nest-cli.json`, pakiety `@nestjs/*` w `package.json` oraz `main.ts` wywołujące `NestFactory.create`.
- Model dekoratorów: `@Module`, `@Controller`, `@Injectable` oraz foldery funkcji z modułami, kontrolerami, serwisami i DTO.
- Menedżer pakietów wnioskowany z pliku blokady (`pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`).

## O czym należy rozumować

- Rzeczywiste polecenie testowe (Jest dla jednostkowych `*.spec.ts` i e2e `*.e2e-spec.ts`), bramka lint (`eslint`) oraz skrypt budowania — zapisane dosłownie.
- Granice modułów, wstrzykiwanie zależności, providery, guardy/pipes/interceptory oraz miejsce przechowywania konfiguracji (`@nestjs/config`).
- Skille właściwe dla stosu dotyczące modułów, kontrolerów, providerów i DTO.

## Uwagi

Zapisz sposób podłączania modułów funkcji do modułu głównego oraz to, czy aplikacja korzysta z TypeORM/Prisma, mikroserwisów lub GraphQL.
