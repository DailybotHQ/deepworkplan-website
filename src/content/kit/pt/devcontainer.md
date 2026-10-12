---
title: Devcontainer
description: "Um contêiner de desenvolvimento reproduzível por repositório, de um modelo: agentes nas suas contas do host via ak, Herdr nos dois sentidos e nenhuma chave SSH."
kind: addon
lang: pt
order: 1
---

# Addon devcontainer

Dê ao repositório um contêiner de desenvolvimento reproduzível e isolado, que pessoas, editores e agentes de código possam usar igualmente. No **DWP v7** (pack `v7.6.1`), este addon integra o **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, um produto MIT que funciona sem o Deep Work Plan. É opcional: um repositório é totalmente conforme sem ele.

## O que o devcontainer-kit fornece

- **Um template**, baseado na especificação [Dev Containers](https://containers.dev), que `dck init` renderiza no repositório em uma estrutura fixa: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` e `dev.sh`. Executado novamente depois, ele reconcilia e nunca sobrescreve suas edições; qualquer mudança em um arquivo existente é mostrada antes e exige consentimento.
- **O contêiner próprio do repositório.** O Dockerfile parte da imagem oficial do runtime fixada por digest (`node-24`, `python-3.13` ou `debian`) e copia as etapas de build do kit para `docker/local/<service>/dck/`. Nenhuma imagem base compartilhada está envolvida.
- **`dev.sh` e `dck`.** `bash dev.sh up` constrói, inicia e se conecta ao contêiner a partir de um terminal comum; `shell`, `rebuild`, `doctor` e os demais funcionam com ou sem VS Code ou Cursor.
- **Herdr nos dois sentidos.** O [Herdr](https://herdr.dev) do host conecta cada contêiner como uma máquina por meio de um servidor SSH restrito ao loopback, e o contêiner abre com a barra lateral padrão: App, Editor, Development e Agents. Cada espaço de trabalho e cada painel, inclusive os abertos depois, começam no caminho da aplicação (`/app` por padrão). Dentro dele, o [herdr-peers](/kit/herdr) permite que agentes consultem agentes no host e em outros contêineres.
- **A skill `dck-dockerfile`.** Um agente cria ou regenera o contêiner de um repositório quando solicitado e o comprova com um build real.

## Instalação

```bash
git clone --branch v0.3.1 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 ou mais recente e `python3` 3.11 ou mais recente em um host Linux ou macOS, e Docker com Compose v2 para os comandos do contêiner. Verifique uma versão com o asset `SHA256SUMS` dela. Fixe a `v0.3.1`: a `v0.2.0` não tem suporte.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/devcontainer-kit`, tag `v0.3.1`, interface 2 |
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

Logins, `gh`, a configuração do Herdr e a identidade git sobrevivem a `bash dev.sh rebuild`.

## Agentes entre máquinas

Desde a `v0.2.3`, `dck up` configura uma malha bidirecional sem nenhum passo manual, no Docker Desktop:

- **Contêineres e o host.** Os agentes de dentro alcançam os agentes do Herdr no host, em cada um dos outros contêineres dck e nos outros contêineres loopback que o Herdr do seu host já gerencia — e esses alcançam de volta. Cada par carrega uma chave de host fixada; nada é considerado confiável no primeiro uso.
- **Um listener opcional no host.** `dck setup` oferece, uma única vez, um servidor SSH em nível de usuário em `127.0.0.1` que aceita somente a chave do dck e é mantido em execução pelo launchd (macOS). Se você já executa um listener loopback, aponte o perfil do host para ele. `dck host listener disable` o remove.
- **Sobrevive a rebuilds.** O catálogo de máquinas do Herdr do contêiner fica em um volume, então `bash dev.sh rebuild` mantém todas as máquinas registradas dentro dele.
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

O home inteiro do agentkit nunca é montado, e perfis que contêm caminhos absolutos do host são ignorados. Um login do Codex compartilhado em leitura e escrita pode ser renovado por dois escritores ao mesmo tempo: mantenha um único agente ativo por conta do Codex. Dentro do contêiner, o mesmo `ak <kind> @<profile>` roda na mesma conta que no host, o que permite a um líder entregar às frentes do contêiner as contas que o `ak pick` escolheu — veja [Executar muitos agentes](/methodology/06-orchestration).

## Padrões de segurança

- Toda porta publicada se vincula a `127.0.0.1`, a menos que `dck.toml` defina `bind`.
- Git sobre SSH passa pelo agente SSH do host: o socket dele, nunca um arquivo de chave e nunca um `~/.ssh` ou `~/.gitconfig` montado. A identidade git vem dos valores `DCK_GIT_*` que `dck setup` preenche.
- As chaves de host SSH são geradas em tempo de execução em um volume por projeto, nunca embutidas em uma imagem; o servidor aceita somente chaves públicas, sem login de root e sem senhas.
- O template não adiciona `cap_add`, nem modo `privileged`, nem o socket do Docker.
- Todo download é fixado por versão e verificado por checksum; a imagem base é fixada por digest.
- A malha do Herdr que permite aos agentes de um contêiner alcançar os demais vem ativada por padrão e está documentada, com suas formas de desativação, no modelo de ameaças do kit. O listener do host permite que o código de um contêiner em execução abra um shell no host como você: ele é opcional, somente loopback, aceita apenas a chave do dck e é removido com `dck host listener disable`.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais. A v0.2 suporta hosts Linux e macOS; a malha entre contêineres precisa do Docker Desktop.
