---
title: Agentkit
description: "Addon opcional da v7 baseado no coding-agents-kit: um comando ak para todo agente de código de terminal, autonomia por padrão com opt-out e delegação headless."
kind: addon
lang: pt
order: 8
---

# Addon Agentkit

Cada agente de código de terminal tem suas próprias flags para continuar uma sessão, sua própria forma de manter separada uma segunda conta, seu próprio modo headless e sua própria opção para pular os pedidos de permissão. O **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** coloca uma única superfície de comandos sobre todos eles: `ak <kind> [@profile]`.

Este addon integra o kit ao **DWP v7** (pack `v7.1.4`) como transporte de delegação **headless**. É opcional: sem ele, cada tarefa é executada na sessão atual, exatamente como antes. O kit em si é um produto MIT que funciona sem o Deep Work Plan.

## O que o kit oferece

- **Uma gramática para toda CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` e `ak grok`, além de variantes de provedor (GLM, Azure, xAI), com as mesmas flags de sessão: `-c` continua, `-r <id>` retoma.
- **Perfis.** `ak claude @work` executa uma segunda conta em seu próprio diretório home, separada da primeira.
- **Execuções headless.** `ak run <kind> -- "<prompt>"` executa um prompt de forma não interativa e retorna um código de saída documentado, opcionalmente como um único objeto JSON.
- **Um diagnóstico.** `ak doctor --json` informa quais CLIs estão instaladas, os perfis e os nomes das chaves definidas — nunca seus valores.
- **Instalações verificadas.** `ak install <cli>` instala uma CLI ausente pelo canal oficial do seu fornecedor em uma versão fixada, conferida contra um sha256 fixado ou contra a integridade do registro npm.
- **Nomes conhecidos.** Dois presets de aliases, desativados até você ativá-los: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) e `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), cada um equivalente a `ak <kind>`.

## Instalação

```bash
git clone --branch v0.3.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisitos: `bash` no macOS ou Linux e `python3` 3.9 ou mais recente; nada mais. O Windows usa `install.ps1`. Fixe a `v0.3.0`: a `v0.2.0` e a `v0.2.1` não têm suporte. Verifique uma versão com o asset `SHA256SUMS` dela.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/coding-agents-kit`, tag `v0.3.0`, interface 1 |
| Chave de registro | `agentkit` em `.dwp/config.json` |
| Transporte | headless: um `ak run` por delegado em uma worktree git dedicada |
| Fornece | `subagents`, `cancel_children`, `model_routing` |
| Requer | a concessão `agent_delegation` do contrato do plano |

## Autonomia por padrão, com um opt-out que sempre prevalece

Desde a `v0.2.0`, `ak <kind>` inicia todo agente em **autonomia**: adiciona a flag de autonomia própria da CLI, mantida apenas no `providers.toml` do kit. A autonomia se destina a ambientes descartáveis ou isolados, como um contêiner de desenvolvimento.

O **opt-out sempre prevalece**: `--ask` em um comando, ou `AGENTKIT_PERMISSIONS=ask` no ambiente ou no arquivo env do kit, suprime a flag mesmo quando o mesmo comando diz `--auto`. Uma sessão com opt-out repassa o opt-out aos agentes que inicia. Em um host, defina o opt-out.

O addon não escreve nenhuma flag de autonomia e nunca passa `--auto`. Ele passa `--ask` quando um plano registra o opt-out. Um plano que concede `agent_delegation` em um host aceita delegados autônomos confinados à sua própria worktree, que não é um sandbox.

## O que ele adiciona a um plano

Em um plano v7 cujo contrato concede `agent_delegation`, o `execute` pode passar uma tarefa `parallel_safe` a outra CLI: ele cria uma worktree git dedicada, executa `ak run` nela com um tempo limite e coleta o resultado em `analysis_results/delegations/` do plano. O resultado é evidência `asserted` até que o próprio executor de gates do plano o observe. Cancelar um delegado encerra toda a sua árvore de processos.

## Agentkit ou Herdr

| Situação | Usar |
|---|---|
| Uma tarefa `parallel_safe` delimitada com uma saída declarada | Agentkit (headless) |
| A tarefa precisa de interação, é longa ou fica em outra máquina | [Herdr](/kit/herdr) (um par em um painel) |

Os dois se combinam: o herdr-peers pode iniciar um par em um painel com o ambiente que `ak env <kind> @profile` imprime.

## Notas

Opcional e nunca obrigatório. Os valores das chaves de API nunca são impressos, registrados em log nem gravados em um arquivo de configuração; a exceção documentada é o Cline, que recebe sua chave na linha de comando. A extração de resultados para OpenCode, Pi, Cline e Grok foi construída a partir da documentação dos fornecedores e ainda não foi exercitada com contas reais; uma saída desconhecida recai em texto bruto.
