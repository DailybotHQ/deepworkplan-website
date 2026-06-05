---
title: Spring Boot
description: "Пресет онбординга для приложений Spring Boot с подсказками для рассуждений о Maven и Gradle, контроллерах, сервисах, репозиториях и тест-раннере."
kind: preset
lang: ru
order: 9
stack: Spring Boot
---

# Пресет Spring Boot

Руководство-рассуждение, которое процесс onboard использует для приложений Spring Boot. Это чек-лист, а не шаблон — обнаруженная реальность побеждает.

## Сигналы

- `pom.xml` (Maven) или `build.gradle`/`build.gradle.kts` (Gradle) с зависимостями `spring-boot-starter-*`.
- Структура `src/main/java`, точка входа `@SpringBootApplication` и слоение `@RestController`/`@Service`/`@Repository`.
- Инструмент сборки определяется из манифеста, присутствующего в репозитории, с обёрткой `./mvnw` или `./gradlew`.

## О чём рассуждать

- Реальная команда тестирования (`./mvnw test` или `./gradlew test`, JUnit со Spring Boot Test) и шлюз линтинга/форматирования (Checkstyle, Spotless) — захваченные дословно.
- Поток контроллер → сервис → репозиторий, конфигурация в `application.yml`/`application.properties` и управление профилями и секретами.
- Стек-специфичные навыки для контроллеров, сервисов, репозиториев и сущностей.

## Примечания

Использовать обёртку (`./mvnw`/`./gradlew`), а не глобальный Maven/Gradle, и зафиксировать активные Spring-профили и уровень персистентности (JPA/JDBC).
