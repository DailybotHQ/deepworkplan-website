---
title: Agentkit
description: "Um comando para cada agente de código de terminal: uma conta por perfil, ak pick para a de maior folga, autonomia com opt-out e execuções headless."
kind: addon
lang: pt
order: 8
---

# Addon Agentkit

Cada agente de código de terminal tem suas próprias flags para continuar uma sessão, sua própria forma de manter separada uma segunda conta, seu próprio modo headless e sua própria opção para pular os pedidos de permissão. O **[coding-agents-kit](https://github.com/DailybotHQ/coding-agents-kit)** coloca uma única superfície de comandos sobre todos eles: `ak <kind> [@profile]`.

Este addon integra o kit ao **DWP v7** (pack `v7.8.0`) como transporte de delegação **headless**. É opcional: sem ele, cada tarefa é executada na sessão atual, exatamente como antes. O kit em si é um produto MIT que funciona sem o Deep Work Plan.

## O que o kit oferece

- **Uma gramática para toda CLI.** `ak claude`, `ak codex`, `ak cursor`, `ak opencode`, `ak pi`, `ak cline`, `ak grok` e `ak antigravity`, além de rotas de provedor (Z.AI GLM, Azure OpenAI, xAI e a API do Gemini), com as mesmas flags de sessão: `-c` continua, `-r <id>` retoma.
- **Perfis.** `ak claude @work` executa uma segunda conta em seu próprio diretório home, separada da primeira.
- **Execuções headless.** `ak run <kind> -- "<prompt>"` executa um prompt de forma não interativa e retorna um código de saída documentado, opcionalmente como um único objeto JSON.
- **Um diagnóstico.** `ak doctor --json` informa quais CLIs estão instaladas, os perfis e os nomes das chaves definidas — nunca seus valores.
- **Instalações verificadas.** `ak install <cli>` instala uma CLI ausente pelo canal oficial do seu fornecedor em uma versão fixada, conferida contra um sha256 fixado ou contra a integridade do registro npm.
- **Nomes conhecidos.** Dois presets de aliases, desativados até você ativá-los: `classic` (`claudex`, `codexx`, `cursorx`, `opencodex`, `pix`, `clinex`, `grokx`) e `providers` (`claude-glm`, `codex-azure`, `codex-xai`, `pi-glm`, …), cada um equivalente a `ak <kind>`.

## Contas, cota e escolha de conta

O kit trata cada login ou chave que você tem como uma **conta**: uma CLI × um perfil. `@default` (ou `@1`) é o home da própria CLI; `@2`, `@work` ou `@client-x` são logins independentes, cada um no próprio diretório sob a raiz de perfis, que rodam lado a lado. `ak profiles` os lista com o estado de login e os nomes das chaves; `ak profiles --json` entrega a mesma lista às ferramentas (schema `profiles-v1`). Desde a `v0.5.1`, ele informa onde o token do Claude Code realmente está — `file`, `keychain` (macOS), `none` ou `unknown` — apenas pela presença, sem nunca ler o segredo, e reconhece um login do Cursor no Linux, seja em um contêiner ou em um host Linux. Desde a `v0.5.2`, `AGENTKIT_DEFAULT_PROFILE_<CLI>` define a conta que um `ak <cli>` sem argumentos usa (um `@profile` posicional continua tendo prioridade), e é assim que um contêiner de desenvolvimento escolhe a conta do host que compartilha. Desde a `v0.5.3`, `ak codex` adiciona `--no-daemon` quando um home do Codex compartilhado com outra máquina registra um daemon em segundo plano que não está nesta.

`ak usage` (também `ak status`) lista todas as contas de cada CLI que o kit conhece, uma linha por conta e perfil, sob a sua CLI: cota ao vivo para as assinaturas do Claude Code (janelas de 5 horas, semanal e por modelo), os logins do Codex com ChatGPT, as chaves do plano de programação da Z.AI e, desde a `v0.7.0`, os logins do Antigravity com Google no Linux e em contêineres (as janelas de cinco horas e semanal do próprio painel `/usage` do agy). Uma conta cuja cota não pode ser lida mantém a sua linha: `n/d` com a forma como está conectada e o motivo — Cursor, Grok, xAI, Azure OpenAI, uma chave de API do Gemini ou um login do Antigravity guardado no Keychain do macOS — ou `no login` com o comando que faz o login dela, então a tabela também mostra quais contas de cada CLI estão conectadas. É somente leitura: nunca renova um login, nunca imprime um token e nunca grava dentro de um perfil. `--json` entrega a mesma lista às ferramentas (schema `usage-v1`). Os endpoints de uso são internos do fornecedor e não oficiais.

`ak pick <kind>` lê as mesmas linhas e aponta a conta com mais folga. `--count N` devolve até N contas, a melhor primeiro; `--exclude @<profile>` deixa de fora uma ocupada; `--model` conta a janela semanal de um modelo; `--need 5h:40` se recusa a escolher sem essa folga. `--json` entrega o schema `pick-v1`.

```bash
ak usage                   # cota de cada conta e perfil
ak pick claude --count 3   # as três contas do Claude com mais folga
ak claude @work --trust-cwd  # uma segunda conta, pasta já confiável
ak profiles --json         # profiles-v1, para ferramentas
ak setup verify            # verificações ordenadas, cada uma com seu comando de reparo
```

`--trust-cwd` (ou `AGENTKIT_TRUST_CWD=1`) confia previamente na pasta em que o agente inicia, então o Claude Code e o Codex abrem sem a tela de confiança de pasta. `ak setup probe | verify | docker` é um auxiliar somente leitura, conduzido pelo skill `agentkit-setup`, que inspeciona a máquina, verifica a instalação e gera uma receita de contêiner fixada por tag e verificada.

## Vários agentes, várias contas

O skill `agentkit-orchestrate` (`ak --skill orchestrate`) ensina um agente a distribuir o trabalho entre vários agentes, contas e fornecedores: um `ak usage` antes do lote, `ak pick --count N` para escolher as contas, um delegado por conta, o gate do próprio repositório em cada resultado e failover para a próxima conta quando uma atinge um limite. O kit observa, calcula e executa; nunca agenda. O líder — você, ou um agente a quem você pediu — decide, usando apenas as suas próprias contas e dentro dos termos de cada fornecedor.

Para frentes longas e interativas, cada frente roda em um painel do [Herdr](/kit/herdr) na própria conta. O capítulo da metodologia [Executar muitos agentes](/methodology/06-orchestration) descreve o modelo completo: um líder e suas frentes, contas escolhidas por folga, coordenação pelo herdr-peers e um branch e um release por repositório; [Autonomia do enxame](/pt/methodology/07-swarm-autonomy) acrescenta verificações de capacidade, repasse e sucessão do líder.

## Capacidade e reservas

A partir da `v0.6.0`, um agente pode perguntar quanta folga a própria conta tem, a baixo custo, em cada limite entre tarefas — o sinal que permite a um enxame repassar o trabalho antes que uma conta se esgote ([Autonomia do enxame](/pt/methodology/07-swarm-autonomy)).

- **`ak capacity --self --json`** (schema `capacity-v1`) informa o `headroom_pct` da conta em execução, sua `binding_window`, `resets_at` e um `verdict`: `ok`, `low` (25 % ou menos), `critical` (10 % ou menos, ou com rate limit) ou `unknown` (sem fonte de cota: Cursor, Grok ou Antigravity no macOS). Ele usa a aritmética do `ak pick`, então os dois nunca discordam, e lê um cache de uso mantido por 300 segundos (`--max-age`), então uma verificação em cada limite entre tarefas continua barata. `--self` resolve a conta que o `ak` iniciou; fora de um início pelo `ak`, ele sai com código 3 e nunca adivinha. `ak usage` continua lendo ao vivo e atualiza o cache.
- **Limiares e ensaios.** `AGENTKIT_CAPACITY_LOW` e `AGENTKIT_CAPACITY_CRITICAL` (ou `--low` e `--critical`) movem os limiares. `AGENTKIT_CAPACITY_CAP=@<profile>=<pct>` só pode rebaixar uma leitura — é assim que um ensaio faz uma conta parecer escassa — e nunca pode fazer uma parecer mais folgada.
- **`ak lease <kind> @<profile> --owner <addr>`** reserva uma conta para uma frente; `ak lease release …` a libera depois que um sucessor aceitou o repasse, e `ak lease ls` lista as reservas (schema `leases-v1`). Um perfil do Codex aceita uma única reserva — um escritor por arquivo de autenticação — e só o dono libera uma reserva. As reservas expiram e são registros consultivos de números, nomes de perfil e endereços de painel, nunca uma credencial.
- **`ak pick <kind> --owner <lead>`** conta todas as reservas ativas, inclusive as do próprio dono: classifica as candidatas por `headroom / (1 + leases)` e nunca oferece uma conta do Codex reservada, nem mesmo a quem a detém. `--reuse @<profile>` repassa uma das reservas do próprio dono, por exemplo ao sucessor de uma frente. Sem `--owner`, a classificação não muda.

```bash
ak capacity --self --json                        # folga e veredito deste agente
ak lease claude @work --owner local:w2:p1        # reservar uma conta para uma frente
ak pick codex --owner local:w1:p1 --count 2      # pular contas reservadas por outros
```

O trabalho só circula entre as contas que você declarou para o plano, dentro dos termos de cada fornecedor: nenhum agente cria uma conta, renova um login ou gasta um reset do Codex. O pack do Deep Work Plan lê o veredito pelo próprio helper e o transforma em continuar, preparar ou repassar; sem o kit, ou com um mais antigo, a capacidade é reportada como desconhecida, nunca como ok.

## Instalação

```bash
git clone --branch v1.0.0 https://github.com/DailybotHQ/coding-agents-kit && ./coding-agents-kit/install.sh
ak doctor
```

Requisitos: `bash` no macOS ou Linux e `python3` 3.9 ou mais recente; nada mais. O Windows usa `install.ps1`. Fixe a `v1.0.0`: a `v0.2.0` e a `v0.2.1` não têm suporte. Verifique uma versão com o asset `SHA256SUMS` dela.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/coding-agents-kit`, tag `v1.0.0`, interface 1 |
| Chave de registro | `agentkit` em `.dwp/config.json` |
| Transporte | headless: um `ak run` por delegado em uma worktree git dedicada |
| Fornece | `subagents`, `cancel_children`, `model_routing` |
| Requer | a concessão `agent_delegation` do contrato do plano |

**Estável desde `v1.0.0`.** A interface pública do kit segue o versionamento semântico e só muda de forma incompatível em uma nova versão principal: a superfície de comandos (`ak <kind> [@profile]` para cada tipo definido em `providers.toml`, e cada verbo com suas flags documentadas), a postura de permissões, a interface 1 (`ak doctor --json`, `ak env`, a gramática e o envelope de `ak run`), os esquemas JSON (`doctor-v1`, `usage-v1`, `pick-v1`, `capacity-v1`, `leases-v1`, `profiles-v1`, `setup-probe-v1`, `setup-verify-v1`), e o layout instalado e os nomes das variáveis do arquivo de ambiente. `v1.0.0` não altera nenhum comando, flag, chave ou esquema em relação a `v0.7.1`.

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

Os dois se combinam: o herdr-peers pode iniciar um par em um painel com o ambiente que `ak env <kind> @profile` imprime. Para muitas frentes ao mesmo tempo, veja [Executar muitos agentes](/methodology/06-orchestration).

## Notas

Opcional e nunca obrigatório. Os valores das chaves de API nunca são impressos, registrados em log nem gravados em um arquivo de configuração; a exceção documentada é o Cline, que recebe sua chave na linha de comando. A extração de resultados para OpenCode, Pi, Cline e Grok foi construída a partir da documentação dos fornecedores e ainda não foi exercitada com contas reais; uma saída desconhecida recai em texto bruto.
