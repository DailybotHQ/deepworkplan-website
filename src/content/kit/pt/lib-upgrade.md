---
title: lib-upgrade
description: "Atualizar com segurança as dependências de um repositório em lotes validados e reversíveis via o addon dependency-upgrade. Instalado apenas quando esse addon é aceito."
kind: command
lang: pt
order: 9
usage: /lib-upgrade
---

# lib-upgrade

Atualiza as dependências do repositório com segurança. Um delegador enxuto para o addon **dependency-upgrade**.

## O que faz

O `lib-upgrade` encaminha para o addon dependency-upgrade. O addon raciocina sobre o gerenciador de pacotes real do repositório — nunca presumindo npm —, classifica as atualizações por semver, atualiza em lotes seguros, executa o validation gate real do repositório após cada lote, reverte um lote que falha e resume.

## Uso

```
/lib-upgrade
```

## Comportamento

1. Exigir uma árvore de trabalho limpa (ou com backup).
2. Detectar o gerenciador de pacotes real a partir do manifesto e do lockfile existentes.
3. Classificar as atualizações (patch / minor / major); majors exigem aprovação.
4. Atualizar em lotes pequenos; validar o gate real do repositório após cada um.
5. Reverter qualquer lote que falhe no gate; resumir e deixar o desenvolvedor comitar.

## Notas

Este comando é instalado apenas quando o addon dependency-upgrade é aceito. Independente do gerenciador de pacotes; ele nunca comita automaticamente.
