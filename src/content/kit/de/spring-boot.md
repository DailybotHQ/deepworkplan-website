---
title: Spring Boot
description: "Ein Onboarding-Preset für Spring-Boot-Anwendungen mit Reasoning-Hinweisen zu Maven vs. Gradle, Controllern, Services, Repositories und dem Test-Runner."
kind: preset
lang: de
order: 9
stack: Spring Boot
---

# Spring-Boot-Preset

Ein Reasoning-Leitfaden, den der onboard-Ablauf für Spring-Boot-Anwendungen nutzt. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Signale

- `pom.xml` (Maven) oder `build.gradle`/`build.gradle.kts` (Gradle) mit `spring-boot-starter-*`-Abhängigkeiten.
- `src/main/java`-Layout, ein `@SpringBootApplication`-Einstiegspunkt und die `@RestController`/`@Service`/`@Repository`-Schichtung.
- Build-Tool wird aus dem vorhandenen Manifest abgeleitet, mit einem `./mvnw`- oder `./gradlew`-Wrapper.

## Worüber nachzudenken ist

- Der echte Test-Befehl (`./mvnw test` oder `./gradlew test`, JUnit mit Spring Boot Test) und das Lint/Format-Gate (Checkstyle, Spotless) — wortwörtlich erfasst.
- Der Fluss Controller → Service → Repository, Konfiguration in `application.yml`/`application.properties` sowie Profil- und Geheimnisverwaltung.
- Stack-passende Skills für Controller, Services, Repositories und Entities.

## Hinweise

Den Wrapper (`./mvnw`/`./gradlew`) verwenden, kein globales Maven/Gradle; die aktiven Spring-Profile und die Persistenzschicht (JPA/JDBC) festhalten.
