---
title: Spring Boot
description: "An onboarding preset for Spring Boot applications, with reasoning cues for Maven vs Gradle, controllers, services, repositories, and the test runner."
kind: preset
lang: en
order: 9
stack: Spring Boot
---

# Spring Boot preset

A reasoning guide the onboard flow uses for Spring Boot applications. It is a checklist, not a template — detected reality wins.

## Signals

- `pom.xml` (Maven) or `build.gradle`/`build.gradle.kts` (Gradle) with `spring-boot-starter-*` dependencies.
- `src/main/java` layout, a `@SpringBootApplication` entrypoint, and the `@RestController`/`@Service`/`@Repository` layering.
- Build tool inferred from the manifest present, with a `./mvnw` or `./gradlew` wrapper.

## What to reason about

- The real test command (`./mvnw test` or `./gradlew test`, JUnit with Spring Boot Test) and the lint/format gate (Checkstyle, Spotless) — captured verbatim.
- Controller → service → repository flow, configuration in `application.yml`/`application.properties`, and profile/secret handling.
- Stack-appropriate skills for controllers, services, repositories, and entities.

## Notes

Use the wrapper (`./mvnw`/`./gradlew`), not a global Maven/Gradle, and capture the active Spring profiles and persistence layer (JPA/JDBC).
