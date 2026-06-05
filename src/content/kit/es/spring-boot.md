---
title: Spring Boot
description: "Preset de incorporación para aplicaciones Spring Boot, con pistas de razonamiento para Maven vs Gradle, controladores, servicios, repositorios y el test runner."
kind: preset
lang: es
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Guía de razonamiento que el flujo de onboard usa para aplicaciones Spring Boot. Es una lista de verificación, no una plantilla — la realidad detectada gana.

## Señales

- `pom.xml` (Maven) o `build.gradle`/`build.gradle.kts` (Gradle) con dependencias `spring-boot-starter-*`.
- Estructura `src/main/java`, un punto de entrada `@SpringBootApplication` y la jerarquía en capas `@RestController`/`@Service`/`@Repository`.
- La herramienta de compilación se infiere del manifiesto presente, con un wrapper `./mvnw` o `./gradlew`.

## Qué razonar

- El comando de prueba real (`./mvnw test` o `./gradlew test`, JUnit con Spring Boot Test) y la compuerta de lint/formato (Checkstyle, Spotless) — capturados al pie de la letra.
- Flujo controlador → servicio → repositorio, configuración en `application.yml`/`application.properties` y gestión de perfiles y secretos.
- Skills adecuadas al stack para controladores, servicios, repositorios y entidades.

## Notas

Usa el wrapper (`./mvnw`/`./gradlew`), no un Maven/Gradle global, y captura los perfiles de Spring activos y la capa de persistencia (JPA/JDBC).
