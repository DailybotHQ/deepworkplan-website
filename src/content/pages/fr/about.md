---
title: "À propos de la méthodologie"
description: "Deep Work Plan est une méthodologie ouverte et indépendante du framework pour un travail d’ingénierie sérieux avec des agents de code IA. D’où elle vient et qui la maintient."
lastUpdated: 2026-05-30
---

## Ce que c’est

Deep Work Plan (DWP) est une méthodologie, pas un produit. Elle définit comment transformer un objectif en un plan convenu, décomposer ce plan en tâches atomiques et vérifiables indépendamment, et exécuter chaque tâche dans une boucle ciblée qui se termine par une vérification.

C’est une méthodologie pilotée par la spécification : le plan est la source de vérité durable, et les agents s’exécutent face à des critères d’acceptation explicites et des portes de validation. Contrairement aux systèmes pilotés par la spécification liés à un outil tels que GitHub Spec Kit, Amazon Kiro ou Tessl, DWP est indépendant de l’outil et natif du dépôt. C’est aussi de l’ingénierie de harness rendue portable — le contexte, les garde-fous et l’état reprenable qui rendent un agent fiable sont installés dans le dépôt lui-même (AGENTS.md, docs, le foyer des skills .agents/, le skill DWP), pour que tout agent puisse piloter tout dépôt.

Elle est délibérément indépendante de l’agent IA ou de la stack que vous utilisez — des adaptateurs traduisent la même boucle centrale vers Claude, Cursor, Copilot, Codex, Gemini, et davantage. Le plan, les tâches et le journal d’exécution sont tous en simple Markdown, de sorte que le travail reste lisible, relisible et versionné.

---

## Principes fondamentaux

- **Planifier avant d’exécuter** — Aucun code n’est écrit tant que le plan n’est pas convenu. Le plan est un contrat entre vous et l’agent. [Lire la méthodologie](/methodology)
- **Les tâches sont atomiques** — Chaque tâche est cadrée pour pouvoir être exécutée et vérifiée seule, puis validée de façon atomique. [Voir la spécification](/spec)
- **Tout vérifier** — Chaque tâche se termine par une vérification explicite avant que la suivante ne commence, avec une progression enregistrée dans git. [Explorer le kit](/kit)

---

## En un coup d’œil

- Méthodologie ouverte, sous licence MIT
- Indépendante du framework et de l’agent
- Maintenue par Dailybot et la communauté
- Comprend une spécification, des commandes, des adaptateurs, des presets et des exemples
- Markdown uniquement — pas de runtime, pas de verrouillage
- Transforme tout dépôt en une base de code AI-first, pilotable par agent

---

## Qui la maintient

Deep Work Plan est né d’un véritable travail d’ingénierie chez [Dailybot](https://www.dailybot.com) et est désormais maintenu par Dailybot avec la communauté open source. La méthodologie, la spécification et le kit sont publiés sous licence MIT — libres d’usage, d’adaptation et d’extension.

- [Lire la méthodologie](/methodology)
- [Démarrage rapide](/quickstart)
- [Dépôt GitHub](https://github.com/DailybotHQ/deepworkplan-website)
