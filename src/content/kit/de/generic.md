---
title: Generisch
description: "Das Fallback-Onboarding-Preset für jedes Projekt, mit stack-agnostischen Reasoning-Hinweisen, die Build- und Test-Befehle aus dem Repository erkennen."
kind: preset
lang: de
order: 100
stack: Generic
---

# Generisches Preset

Der Fallback-Reasoning-Leitfaden, den der onboard-Ablauf nutzt, wenn kein stack-spezifisches Preset zutrifft. Es ist eine Checkliste, keine Vorlage — die erkannte Realität gewinnt.

## Worüber nachzudenken ist

- Die echten Build- und Test-Befehle aus dem Manifest, dem Makefile oder der CI erkennen — wortwörtlich erfasst.
- Allgemeine Konventionen anwenden; keine stack-spezifischen Annahmen treffen.
- Nur die Skills, Agenten und Dokumentation erzeugen, die zu den tatsächlichen Workflows des Repositorys passen.

## Hinweise

Der Fallback, wenn weder Django, Vue + Vite, Astro/Svelte, Node/TS-Service noch Python-Package/CLI zutrifft.
