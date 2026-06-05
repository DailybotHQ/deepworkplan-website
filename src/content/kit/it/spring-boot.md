---
title: Spring Boot
description: "Preset di onboarding per applicazioni Spring Boot, con spunti di ragionamento per Maven vs Gradle, controller, service, repository e test runner."
kind: preset
lang: it
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Una guida di ragionamento che il flusso di onboard usa per le applicazioni Spring Boot. È una checklist, non un template — vince la realtà rilevata.

## Segnali

- `pom.xml` (Maven) o `build.gradle`/`build.gradle.kts` (Gradle) con dipendenze `spring-boot-starter-*`.
- Layout `src/main/java`, un entrypoint `@SpringBootApplication` e la stratificazione `@RestController`/`@Service`/`@Repository`.
- Build tool dedotto dal manifest presente, con wrapper `./mvnw` o `./gradlew`.

## Su cosa ragionare

- Il comando di test reale (`./mvnw test` o `./gradlew test`, JUnit con Spring Boot Test) e il gate di lint/format (Checkstyle, Spotless) — catturati alla lettera.
- Flusso controller → service → repository, configurazione in `application.yml`/`application.properties` e gestione di profili e segreti.
- Skill adatte allo stack per controller, service, repository ed entity.

## Note

Usare il wrapper (`./mvnw`/`./gradlew`), non un Maven/Gradle globale, e catturare i profili Spring attivi e il livello di persistenza (JPA/JDBC).
