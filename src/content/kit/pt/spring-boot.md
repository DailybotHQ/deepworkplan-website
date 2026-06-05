---
title: Spring Boot
description: "Um preset de onboarding para aplicações Spring Boot, com pistas de raciocínio para Maven vs Gradle, controllers, services, repositories e o test runner."
kind: preset
lang: pt
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Um guia de raciocínio que o fluxo de onboarding usa para aplicações Spring Boot. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sinais

- `pom.xml` (Maven) ou `build.gradle`/`build.gradle.kts` (Gradle) com dependências `spring-boot-starter-*`.
- Layout `src/main/java`, um entrypoint `@SpringBootApplication` e a estratificação `@RestController`/`@Service`/`@Repository`.
- Ferramenta de build inferida a partir do manifesto presente, com um wrapper `./mvnw` ou `./gradlew`.

## Sobre o que raciocinar

- O comando de teste real (`./mvnw test` ou `./gradlew test`, JUnit com Spring Boot Test) e o gate de lint/formatação (Checkstyle, Spotless) — capturados literalmente.
- Fluxo controller → service → repository, configuração em `application.yml`/`application.properties` e gestão de perfis e segredos.
- Skills adequadas à stack para controllers, services, repositories e entidades.

## Notas

Usar o wrapper (`./mvnw`/`./gradlew`), e não um Maven/Gradle global, e capturar os perfis Spring ativos e a camada de persistência (JPA/JDBC).
