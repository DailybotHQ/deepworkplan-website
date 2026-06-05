---
title: Genérico
description: "O preset de onboarding de fallback para qualquer projeto, com pistas de raciocínio independentes de stack que detectam os comandos de build e teste a partir do repositório."
kind: preset
lang: pt
order: 100
stack: Generic
---

# Preset genérico

O guia de raciocínio de fallback que o fluxo de onboarding usa quando nenhum preset específico de stack se aplica. É uma lista de verificação, não um template — a realidade detectada prevalece.

## Sobre o que raciocinar

- Detectar os comandos reais de build e teste a partir do manifesto, do Makefile ou do CI — capturados literalmente.
- Aplicar convenções gerais; não fazer suposições específicas de stack.
- Gerar apenas as skills, agents e docs que correspondam aos fluxos de trabalho reais do repositório.

## Notas

O fallback quando nenhum dos presets Django, Vue + Vite, Astro/Svelte, serviço Node/TS ou pacote/CLI Python corresponde.
