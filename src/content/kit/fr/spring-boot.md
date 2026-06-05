---
title: Spring Boot
description: "Un preset d'onboarding pour les applications Spring Boot, avec des indices de raisonnement sur Maven vs Gradle, les contrôleurs, services, repositories et le test runner."
kind: preset
lang: fr
order: 9
stack: Spring Boot
---

# Preset Spring Boot

Un guide de raisonnement que le flux d'onboarding utilise pour les applications Spring Boot. C'est une liste de contrôle, pas un modèle — la réalité détectée l'emporte.

## Signaux

- `pom.xml` (Maven) ou `build.gradle`/`build.gradle.kts` (Gradle) avec des dépendances `spring-boot-starter-*`.
- La structure `src/main/java`, un point d'entrée `@SpringBootApplication`, et le découpage en couches `@RestController`/`@Service`/`@Repository`.
- L'outil de build est déduit depuis le manifeste présent, avec un wrapper `./mvnw` ou `./gradlew`.

## Sur quoi raisonner

- La vraie commande de test (`./mvnw test` ou `./gradlew test`, JUnit avec Spring Boot Test) et la porte de lint/formatage (Checkstyle, Spotless) — capturées verbatim.
- Le flux contrôleur → service → repository, la configuration dans `application.yml`/`application.properties`, et la gestion des profils et secrets.
- Les skills adaptés à la stack pour les contrôleurs, services, repositories et entités.

## Notes

Utiliser le wrapper (`./mvnw`/`./gradlew`) plutôt qu'un Maven/Gradle global, et capturer les profils Spring actifs et la couche de persistance (JPA/JDBC).
