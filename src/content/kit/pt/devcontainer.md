---
title: Devcontainer
description: "Addon opcional baseado no devcontainer-kit: o contêiner próprio de cada repositório com um template, agentes via ak, Herdr nos dois sentidos, sem chave SSH."
kind: addon
lang: pt
order: 1
---

# Addon devcontainer

Dê ao repositório um contêiner de desenvolvimento reproduzível e isolado, que pessoas, editores e agentes de código possam usar igualmente. No **DWP v7** (pack `v7.1.0`), este addon integra o **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, um produto MIT que funciona sem o Deep Work Plan. É opcional: um repositório é totalmente conforme sem ele.

## O que o devcontainer-kit fornece

- **Um template**, baseado na especificação [Dev Containers](https://containers.dev), que `dck init` renderiza no repositório em uma estrutura fixa: `.devcontainer/devcontainer.json`, `docker/local/<service>/Dockerfile`, `docker/local/docker-compose.yaml` e `dev.sh`. Executado novamente depois, ele reconcilia e nunca sobrescreve suas edições; qualquer mudança em um arquivo existente é mostrada antes e exige consentimento.
- **O contêiner próprio do repositório.** O Dockerfile parte da imagem oficial do runtime fixada por digest (`node-24`, `python-3.13` ou `debian`) e copia as etapas de build do kit para `docker/local/<service>/dck/`. Nenhuma imagem base compartilhada está envolvida.
- **`dev.sh` e `dck`.** `bash dev.sh up` constrói, inicia e se conecta ao contêiner a partir de um terminal comum; `shell`, `rebuild`, `doctor` e os demais funcionam com ou sem VS Code ou Cursor.
- **Herdr nos dois sentidos.** O [Herdr](https://herdr.dev) do host conecta cada contêiner como uma máquina por meio de um servidor SSH restrito ao loopback, e o contêiner abre com a barra lateral padrão: Home, Editor, Development e Agents. Dentro dele, o [herdr-peers](/kit/herdr) permite que agentes consultem agentes no host e em outros contêineres.
- **A skill `dck-dockerfile`.** Um agente cria ou regenera o contêiner de um repositório quando solicitado e o comprova com um build real.

## Instalação

```bash
git clone --branch v0.2.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init && bash dev.sh up
```

Requisitos: `bash` 3.2 ou mais recente e `python3` 3.11 ou mais recente em um host Linux ou macOS, e Docker com Compose v2 para os comandos do contêiner. Verifique uma versão com o asset `SHA256SUMS` dela. Fixe a `v0.2.2`: a `v0.2.0` não tem suporte.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/devcontainer-kit`, tag `v0.2.2`, interface 2 |
| Chave de registro | `devcontainer` em `.dwp/config.json` |
| Configuração por repositório | `.devcontainer/dck.toml` |
| Detecção | `dck doctor --json` |

## Camadas

Todo contêiner traz as ferramentas de desenvolvimento (git, gh, ripgrep, um servidor SSH, Herdr e herdr-peers) e nenhum segredo. O restante é uma camada que você escolhe em `dck.toml`:

| Camada | Padrão | O que adiciona |
|---|---|---|
| `agents` | desativada | O [coding-agents-kit](/kit/agentkit) a partir da sua versão verificada e as CLIs que você listar, cada uma com seu próprio volume persistente, além dos presets `classic` (`claudex`, `codexx`, …) e `providers` (`claude-glm`, `codex-azure`, …). Os agentes rodam em autonomia por padrão: o contêiner é o sandbox. Para desativar: `AGENTKIT_PERMISSIONS=ask` no `.env` do serviço. |
| `editor` | ativada | Neovim com o [DeepWorkPlan Vim](/kit/vim) fixado por tag; desativada, oferece um editor simples. |
| `dailybot` | desativada | A CLI do Dailybot, para o addon dailybot. |

Logins, `gh`, a configuração do Herdr e a identidade git sobrevivem a `bash dev.sh rebuild`.

## Padrões de segurança

- Toda porta publicada se vincula a `127.0.0.1`, a menos que `dck.toml` defina `bind`.
- Git sobre SSH passa pelo agente SSH do host: o socket dele, nunca um arquivo de chave e nunca um `~/.ssh` ou `~/.gitconfig` montado. A identidade git vem dos valores `DCK_GIT_*` que `dck setup` preenche.
- As chaves de host SSH são geradas em tempo de execução em um volume por projeto, nunca embutidas em uma imagem; o servidor aceita somente chaves públicas, sem login de root e sem senhas.
- O template não adiciona `cap_add`, nem modo `privileged`, nem o socket do Docker.
- Todo download é fixado por versão e verificado por checksum; a imagem base é fixada por digest.
- A malha do Herdr que permite aos agentes de um contêiner alcançar os demais vem ativada por padrão e está documentada, com suas formas de desativação, no modelo de ameaças do kit.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais. A v0.2 suporta hosts Linux e macOS; a malha entre contêineres precisa do Docker Desktop.
