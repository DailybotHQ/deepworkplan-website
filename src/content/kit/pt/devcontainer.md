---
title: Devcontainer
description: "Um contêiner de desenvolvimento reproduzível por repositório: agentes nas suas contas do host via ak, Herdr nos dois sentidos e chaves SSH só se você ativar."
kind: addon
lang: pt
order: 1
---

# Addon devcontainer

Dê ao repositório um contêiner de desenvolvimento reproduzível e isolado, que pessoas, editores e agentes de código possam usar igualmente. No **DWP v7** (pack `v7.6.3`), este addon integra o **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, um produto MIT que funciona sem o Deep Work Plan. É opcional: um repositório é totalmente conforme sem ele.

## O que o devcontainer-kit fornece

- **Um template**, baseado na especificação [Dev Containers](https://containers.dev), que `dck init` renderiza no repositório em uma estrutura fixa: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` e `dev.sh`. Executado novamente depois, ele reconcilia e nunca sobrescreve suas edições; qualquer mudança em um arquivo existente é mostrada antes e exige consentimento.
- **O contêiner próprio do repositório.** O Dockerfile parte da imagem oficial do runtime fixada por digest (`node-24`, `python-3.13` ou `debian`) e copia as etapas de build do kit para `docker/local/<service>/dck/`. Nenhuma imagem base compartilhada está envolvida.
- **`dev.sh` e `dck`.** `bash dev.sh up` constrói, inicia e se conecta ao contêiner a partir de um terminal comum; `shell`, `rebuild`, `doctor` e os demais funcionam com ou sem VS Code ou Cursor.
- **Herdr nos dois sentidos.** O [Herdr](https://herdr.dev) do host conecta cada contêiner como uma máquina por meio de um servidor SSH restrito ao loopback, e o contêiner abre com a barra lateral padrão: App, Editor, Development e Agents. Cada espaço de trabalho e cada painel, inclusive os abertos depois, começam no caminho da aplicação (`/app` por padrão). Dentro dele, o [herdr-peers](/kit/herdr) permite que agentes consultem agentes no host e em outros contêineres.
- **A skill `dck-dockerfile`.** Um agente cria ou regenera o contêiner de um repositório quando solicitado e o comprova com um build real.

## Instalação

```bash
git clone --branch v0.3.5 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 ou mais recente e `python3` 3.11 ou mais recente em um host Linux ou macOS, e Docker com Compose v2 para os comandos do contêiner. Verifique uma versão com o asset `SHA256SUMS` dela. Fixe a `v0.3.5`: a `v0.2.0` não tem suporte.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/devcontainer-kit`, tag `v0.3.5`, interface 2 |
| Chave de registro | `devcontainer` em `.dwp/config.json` |
| Configuração por repositório | `.devcontainer/dck.toml` |
| Detecção | `dck doctor --json` |

## Camadas

Todo contêiner traz as ferramentas de desenvolvimento (git, gh, ripgrep, um servidor SSH, Herdr e herdr-peers) e nenhum segredo, a menos que você ative as [contas do host](#contas-do-host-dentro-do-contêiner). O restante é uma camada que você escolhe em `dck.toml`:

| Camada | Padrão | O que adiciona |
|---|---|---|
| `agents` | desativada | O [coding-agents-kit](/kit/agentkit) a partir da sua versão verificada e as CLIs que você listar, cada uma com seu próprio volume persistente, além dos presets `classic` (`claudex`, `codexx`, …) e `providers` (`claude-glm`, `codex-azure`, …). Os agentes rodam em autonomia por padrão: o contêiner é o sandbox. Para desativar: `AGENTKIT_PERMISSIONS=ask` no `.env` do serviço. |
| `editor` | ativada | Neovim com o [DeepWorkPlan Vim](/kit/vim) fixado por tag; desativada, oferece um editor simples. |
| `dailybot` | desativada | A CLI do Dailybot, para o addon dailybot. |

Logins, `gh`, a configuração do Herdr e a identidade git sobrevivem a `bash dev.sh rebuild`. Com a camada `agents`, a imagem também traz as três skills do coding-agents-kit (`agentkit`, `agentkit-setup`, `agentkit-orchestrate`), vinculadas ao diretório de skills de cada agente a cada início, então um contêiner recriado as mantém.

O volume de estado (chave de host SSH, `~/.ssh`, login do `gh`, estado do cliente Herdr, histórico) se chama `state`. Quando vários serviços compartilham um mesmo projeto compose, dê a cada um o próprio nome com `[compose] state_volume` em `dck.toml` (ou `dck init --state-volume NAME`); caso contrário, todos montam o mesmo volume, e o `dck doctor` avisa.

## Agentes entre máquinas

Desde a `v0.2.3`, `dck up` configura uma malha bidirecional sem nenhum passo manual, no Docker Desktop:

- **Contêineres e o host.** Os agentes de dentro alcançam os agentes do Herdr no host, em cada um dos outros contêineres dck e nos outros contêineres loopback que o Herdr do seu host já gerencia — e esses alcançam de volta. Cada par carrega uma chave de host fixada; nada é considerado confiável no primeiro uso.
- **Um listener opcional no host.** `dck setup` oferece, uma única vez, um servidor SSH em nível de usuário em `127.0.0.1` que aceita somente a chave do dck e é mantido em execução pelo launchd (macOS). Se você já executa um listener loopback, aponte o perfil do host para ele. `dck host listener disable` o remove.
- **Sobrevive a rebuilds.** O catálogo de máquinas do Herdr do contêiner fica em um volume, então `bash dev.sh rebuild` mantém todas as máquinas registradas dentro dele. Desde a `v0.3.2`, `rebuild`, `start` e `restart` executam os mesmos passos que `up`: o contêiner é registrado de novo no Herdr do host, sua chave de host é fixada de novo e a malha é propagada, então um contêiner construído do zero alcança o host e seus pares imediatamente.
- **Painéis do Codex dentro de um contêiner.** Um agente Codex precisa de `HERDR_PEERS_SELF`, o id de máquina do contêiner salvo no host, para consultar pares em outras máquinas. Desde a `v0.3.3`, o kit grava esse id a cada registro e os shells de login do contêiner o exportam, então nenhum agente o define à mão; `dck doctor` aponta qualquer divergência. Desde a `v0.3.4`, as configurações do Codex próprias do contêiner pulam a verificação de atualização do Codex na inicialização e o daemon em segundo plano dele (o kit fixa a versão de cada CLI), sem nunca tocar no home do Codex do seu host nem em um perfil compartilhado.
- **Respostas também a partir do host.** `dck setup` instala um [herdr-peers](/kit/herdr) verificado no host, então `dck agents` e `dck ask` funcionam lá, e os agentes do host respondem com `herdr-peers reply`.
- **Contêineres que o kit não criou.** Liste as chaves públicas com que eles fazem login em `[ssh] authorized_extra` no perfil do host, e eles também poderão alcançar os contêineres dck.

Combine-o com o [coding-agents-kit](/kit/agentkit) no host e no contêiner, e o mesmo `ak` inicia agentes dos dois lados.

## Contas do host dentro do contêiner

Um contêiner pode usar as contas que você já tem no host, do mesmo jeito que o git já funciona pelo agente SSH do host, sem login dentro dele. É opt-in e fica no seu **perfil do host**, nunca no `dck.toml` de um repositório:

```toml
[agents]
host_profiles = true          # default false
host_env_keys = ["ZAI_CODING_API_KEY"]   # allow-list of env names to share
```

Com `host_profiles` ativado, `dck up` compartilha apenas os perfis das CLIs que o repositório instala:

- **Claude Code** por meio de um token de longa duração por perfil: `CLAUDE_CODE_OAUTH_TOKEN` para `@default` e `CLAUDE_CODE_OAUTH_TOKEN_<SUFFIX>` para `@name` (o sufixo em maiúsculas, com qualquer caractere fora de `A-Z`, `0-9` e `_` convertido em `_`).
- **Codex** por meio do seu arquivo de autenticação, para `@default` e para cada perfil.
- **O arquivo de ambiente do kit**, somente leitura e reduzido aos nomes de `host_env_keys`.

O home inteiro do agentkit nunca é montado, e perfis que contêm caminhos absolutos do host são ignorados. Um login do Codex compartilhado em leitura e escrita pode ser renovado por dois escritores ao mesmo tempo: mantenha um único agente ativo por conta do Codex. `[agents] default_profile` no perfil do host (por exemplo `{ claude = "@work3" }`) faz um `ak claude` sem argumentos lá dentro usar essa conta compartilhada (coding-agents-kit ≥ `v0.5.2`); um login `@default` do Claude no macOS fica nas Chaves (Keychain) e não pode ser compartilhado. Desde a `v0.3.4`, os shells do contêiner também apontam um `claude` ou `codex` sem argumentos para essa conta, então os painéis que o Herdr restaura abrem nela em vez de em uma tela de login. Dentro do contêiner, o mesmo `ak <kind> @<profile>` roda na mesma conta que no host, o que permite a um líder entregar às frentes do contêiner as contas que o `ak pick` escolheu — veja [Executar muitos agentes](/methodology/06-orchestration).

## Vários repositórios, um stack de compose

Desde a `v0.3.3`, um repositório cujo serviço é uma parte de um projeto compose maior (uma API, uma aplicação web, workers e um banco de dados compartilhando um projeto) pode entrar nele sem editar à mão o que o dck renderiza. Tudo é aditivo: um repositório que não define nenhuma dessas chaves é renderizado exatamente como antes.

- **Um projeto, um volume de estado por serviço.** `[compose] project` nomeia o projeto compartilhado em cada repositório; `state_volume`, `[compose] networks` e `[compose] volumes` mantêm separados o estado de cada serviço e os volumes de dados e as redes do stack.
- **Um bloco de usuário.** As linhas entre `# >>> user:<service> >>>` e `# <<< user:<service> <<<` dentro do serviço do dck são mantidas literalmente: chaves simples para o que o dck não renderiza (`depends_on`, `healthcheck`) e `x-dck-merge:` para as chaves que ele renderiza. Um arquivo com apenas alguns dos marcadores do dck é recusado com a correção, em vez de ser reescrito.
- **Strings de porta.** `ssh_port` e `ports` aceitam expressões do compose como `"${API_PORT:-8000}:8000"`; elas ficam em `127.0.0.1`, a menos que a string indique um IP do host.
- **Builds compartilhados e o seu próprio launcher.** `[build] context` e `[build] dockerfile` cobrem um Dockerfile compartilhado por vários serviços; `dev_sh = false` mantém o `dev.sh` próprio do repositório.
- **Satélites do espaço de trabalho.** Desde a `v0.3.5`, uma segunda instância do serviço no próprio projeto compose é iniciada e parada pelo dck (`dck --project P --compose-file F --service S up` ou `down`), então recebe a mesma chave de host, as mesmas contas, a mesma identidade git e a mesma máquina Herdr que a principal; `up --seed-state-from VOLUME` copia apenas os logins para o volume de estado vazio dela. Em um arquivo de overlay, `extends` deve nomear o arquivo que estende.
- **Node para os agentes.** O Node próprio dos agentes fica em `/opt/dck/node` e nunca substitui o da imagem; `[agents] node_first = true` o coloca primeiro no PATH quando as ferramentas do repositório precisam disso.

## As chaves SSH do host dentro do contêiner

Algumas ferramentas leem apenas arquivos de chave e ignoram o agente encaminhado: o `gh auth login`, por exemplo, oferece gerar uma chave nova. Desde a `v0.3.2` você pode ativar isso, somente no seu **perfil do host** (o `dck.toml` de um repositório não pode defini-lo; `dck setup` pergunta uma vez, com "não" como padrão):

```toml
[ssh]
copy_keys = true              # default false
```

Enquanto estiver ativado, `dck up` monta o `~/.ssh` do host somente leitura em `~/.ssh_host`, e cada início copia as chaves `id_*` dele para o `~/.ssh` do contêiner (chaves privadas `0600`), mantidas em sincronia com o host. O encaminhamento do agente não muda, e desativá-lo remove as cópias no próximo início. O custo: todo o `~/.ssh` do host fica legível dentro do contêiner, e as chaves privadas ficam armazenadas no volume de estado.

## Padrões de segurança

- Toda porta publicada se vincula a `127.0.0.1`, a menos que `dck.toml` defina `bind`.
- Git sobre SSH passa pelo agente SSH do host: o socket dele, nunca um arquivo de chave e nunca um `~/.ssh` ou `~/.gitconfig` montado, a menos que você tenha ativado [`copy_keys`](#as-chaves-ssh-do-host-dentro-do-contêiner) no seu perfil do host. A identidade git vem dos valores `DCK_GIT_*` que `dck setup` preenche.
- As chaves de host SSH são geradas em tempo de execução em um volume por projeto, nunca embutidas em uma imagem; o servidor aceita somente chaves públicas, sem login de root e sem senhas.
- O template não adiciona `cap_add`, nem modo `privileged`, nem o socket do Docker.
- Todo download é fixado por versão e verificado por checksum; a imagem base é fixada por digest.
- A malha do Herdr que permite aos agentes de um contêiner alcançar os demais vem ativada por padrão e está documentada, com suas formas de desativação, no modelo de ameaças do kit. O listener do host permite que o código de um contêiner em execução abra um shell no host como você: ele é opcional, somente loopback, aceita apenas a chave do dck e é removido com `dck host listener disable`.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais. A v0.2 suporta hosts Linux e macOS; a malha entre contêineres precisa do Docker Desktop.
