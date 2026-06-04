---
title: Atualização de dependências
description: "Um addon opcional e independente do gerenciador de pacotes que atualiza as dependências de um repositório em lotes validados e reversíveis, detectando o gerenciador real, sem presumir npm."
kind: addon
lang: pt
order: 3
---

# Addon dependency-upgrade

Atualiza as dependências de um repositório com um fluxo de trabalho em lotes, validado e reversível. O terceiro addon opcional do Deep Work Plan.

## O que ele adiciona

- Detecção do gerenciador de pacotes **real** do repositório (npm/pnpm/yarn + ncu, pip/poetry/uv, cargo, go mod, bundler, composer e mais) a partir do manifesto e do lockfile existentes.
- Um comando `/lib-upgrade` instalado em `.agents/commands/`, **apenas quando aceito**.

## Comportamento

1. Exigir uma árvore de trabalho limpa (ou com backup).
2. Classificar as atualizações por semver — patch, minor, major; majors exigem aprovação explícita.
3. Atualizar em lotes pequenos e coerentes; nunca tudo de uma vez.
4. Executar o validation gate real do repositório após cada lote; reverter qualquer lote que falhe.
5. Resumir o que foi atualizado, ignorado e revertido; deixar o desenvolvedor comitar.

## Notas

Independente do gerenciador de pacotes — nunca executa npm/ncu em um repositório que não é JS. Opcional, nunca obrigatório e nunca comita automaticamente.
