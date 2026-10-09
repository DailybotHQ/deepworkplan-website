---
title: Agentkit
description: "Addon opcional da v7 baseado no coding-agents-kit: um único comando ak para todo agente de código de terminal e delegação headless de tarefas delimitadas."
kind: addon
lang: pt
order: 8
---

# Addon Agentkit

Cada agente de código de terminal tem suas próprias flags para continuar uma sessão, sua própria forma de manter separada uma segunda conta, seu próprio modo headless e sua própria opção para pular os pedidos de permissão. O **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** coloca uma única superfície de comandos sobre todos eles: `ak <kind> [@profile]`.

Este addon integra o kit ao **beta do DWP v7** (`v7.0.0-beta.1`, uma versão de pré-lançamento) como transporte de delegação **headless**. É opcional: sem ele, cada tarefa é executada na sessão atual, exatamente como antes. O kit em si é um produto MIT que funciona sem o Deep Work Plan.

## O que o kit oferece

- **Uma gramática para toda CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline` e `ak grok`, além de variantes de provedor (GLM, Azure, xAI), com as mesmas flags de sessão: `-c` continua, `-r <id>` retoma.
- **Perfis.** `ak claude @work` executa uma segunda conta em seu próprio diretório home, separada da primeira.
- **Execuções headless.** `ak run <kind> -- "<prompt>"` executa um prompt de forma não interativa e retorna um código de saída documentado, opcionalmente como um único objeto JSON.
- **Um diagnóstico.** `ak doctor --json` informa quais CLIs estão instaladas, os perfis e os nomes das chaves definidas — nunca seus valores.
- **Instalações.** `ak install <cli>` instala uma CLI ausente pelo canal oficial do seu fornecedor.

## Instalação

```bash
git clone --branch v0.1.1 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisitos: `bash` no macOS ou Linux e `python3` 3.9 ou mais recente; nada mais. O Windows usa `install.ps1`. Fixe a `v0.1.1`: ela substitui a `v0.1.0` e traz uma correção de segurança.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/coding-agents-kit`, tag `v0.1.1`, interface 1 |
| Chave de registro | `agentkit` em `.dwp/config.json` |
| Transporte | headless: um `ak run` por delegado em uma worktree git dedicada |
| Fornece | `subagents`, `cancel_children`, `model_routing` |
| Requer | a concessão `agent_delegation` do contrato do plano |

## As permissões são repassadas sem alteração

`ak <kind>` **não** adiciona nenhuma flag para contornar permissões. A autonomia é uma adesão explícita: `--auto` em um comando, ou `AGENTKIT_PERMISSIONS=auto` no ambiente, adiciona a flag de autonomia própria da CLI para aquela execução. O preset de aliases `classic`, que recria atalhos como `claudex`, vem desativado.

O addon nunca adiciona uma flag de autonomia por conta própria. Um plano usa `--auto` somente com a adesão explícita e registrada de quem desenvolve, e somente dentro de uma worktree ou de um contêiner isolado.

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
