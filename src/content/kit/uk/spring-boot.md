---
title: Spring Boot
description: "Пресет онбордингу для Spring Boot-застосунків із підказками для Maven vs Gradle, контролерів, сервісів, репозиторіїв та тест-раннера."
kind: preset
lang: uk
order: 9
stack: Spring Boot
---

# Пресет Spring Boot

Орієнтир для міркувань, який процес онбордингу використовує для Spring Boot-застосунків. Це чек-лист, а не шаблон — виявлена реальність важливіша.

## Сигнали

- `pom.xml` (Maven) або `build.gradle`/`build.gradle.kts` (Gradle) із залежностями `spring-boot-starter-*`.
- Структура `src/main/java`, точка входу `@SpringBootApplication` та шарування `@RestController`/`@Service`/`@Repository`.
- Інструмент збірки виводиться з наявного маніфесту — з обгорткою `./mvnw` або `./gradlew`.

## Про що міркувати

- Справжня команда тестування (`./mvnw test` або `./gradlew test`, JUnit зі Spring Boot Test) і ворота лінтингу/форматування (Checkstyle, Spotless) — зафіксувати дослівно.
- Потік контролер → сервіс → репозиторій, конфігурація в `application.yml`/`application.properties`, а також обробка профілів і секретів.
- Відповідні стеку скіли для контролерів, сервісів, репозиторіїв та сутностей.

## Примітки

Використовувати обгортку (`./mvnw`/`./gradlew`), а не глобальний Maven/Gradle, і зафіксувати активні Spring-профілі та шар постійного зберігання (JPA/JDBC).
