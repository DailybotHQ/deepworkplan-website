---
title: Spring Boot
description: "Preset onboardingowy dla aplikacji Spring Boot, ze wskazówkami do rozumowania o Maven vs Gradle, kontrolerach, serwisach, repozytoriach i narzędziu testowym."
kind: preset
lang: pl
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Przewodnik po rozumowaniu, którego przepływ onboardingu używa dla aplikacji Spring Boot. To lista kontrolna, a nie szablon — wykryta rzeczywistość ma pierwszeństwo.

## Sygnały

- `pom.xml` (Maven) lub `build.gradle`/`build.gradle.kts` (Gradle) z zależnościami `spring-boot-starter-*`.
- Układ `src/main/java`, punkt wejścia z adnotacją `@SpringBootApplication` oraz warstwowanie `@RestController`/`@Service`/`@Repository`.
- Narzędzie budowania wnioskowane z obecnego manifestu, z wrapperem `./mvnw` lub `./gradlew`.

## O czym należy rozumować

- Rzeczywiste polecenie testowe (`./mvnw test` lub `./gradlew test`, JUnit ze Spring Boot Test) oraz bramka lint/format (Checkstyle, Spotless) — zapisane dosłownie.
- Przepływ kontroler → serwis → repozytorium, konfiguracja w `application.yml`/`application.properties` oraz obsługa profili i sekretów.
- Skille właściwe dla stosu dotyczące kontrolerów, serwisów, repozytoriów i encji.

## Uwagi

Używaj wrappera (`./mvnw`/`./gradlew`), a nie globalnego Maven/Gradle, i zapisz aktywne profile Spring oraz warstwę persystencji (JPA/JDBC).
