---
title: Devcontainer
description: "Um addon opcional baseado no devcontainer-kit: um template de Dev Containers gerado por dck init, imagens base sem agentes e máquinas Herdr por contêiner."
kind: addon
lang: pt
order: 1
---

# Addon devcontainer

Dê ao repositório um contêiner de desenvolvimento reproduzível e isolado — que pessoas, editores e agentes de código possam usar igualmente. No **beta do DWP v7** (`v7.0.0-beta.1`, uma versão de pré-lançamento) este addon integra o **[devcontainer-kit](https://github.com/DailybotHQ/devcontainer-kit)**, um produto MIT que funciona sem o Deep Work Plan, e substitui o template que o pacote trazia antes. É opcional: um repositório é totalmente conforme sem ele.

## O que o devcontainer-kit fornece

- **Um template**, baseado na especificação [Dev Containers](https://containers.dev), que `dck init` gera no repositório: `devcontainer.json`, um arquivo compose e `docker/local/`. Executado novamente mais tarde, ele reconcilia e nunca sobrescreve suas edições; qualquer alteração em um arquivo existente é mostrada primeiro e exige consentimento.
- **`dck`**, um launcher que executa o contêiner a partir de um terminal comum — `setup`, `up`, `shell`, `ssh`, `rebuild`, `doctor` — com ou sem VS Code ou Cursor.
- **Imagens base** em três variantes, `python-3.13`, `node-24` e `debian`, distribuídas **sem** agentes de código.
- **Uma biblioteca de entrypoint** para volumes persistentes, SSH e o ambiente das sessões SSH, em vez de um entrypoint copiado à mão em cada repositório.
- **Máquinas Herdr.** Cada contêiner pode se juntar ao [Herdr](https://herdr.dev) por meio de um servidor SSH restrito a loopback, de modo que os agentes nele se tornam pares alcançáveis.

## Instalação

```bash
git clone --branch v0.1.2 https://github.com/DailybotHQ/devcontainer-kit && ./devcontainer-kit/install.sh
cd your-repo && dck init
```

Requisitos: `bash` 3.2 ou mais recente e `python3` 3.11 ou mais recente em um host Linux ou macOS, e Docker com Compose v2 para os comandos do contêiner. Verifique uma versão com o asset `SHA256SUMS` dela.

| Item | Valor |
|---|---|
| Produto | `DailybotHQ/devcontainer-kit`, tag `v0.1.2`, interface 1 |
| Chave de registro | `devcontainer` em `.dwp/config.json` |
| Configuração por repositório | `.devcontainer/dck.toml` |
| Detecção | `dck doctor --json` |

## As camadas são opt-in

As imagens base trazem as ferramentas de desenvolvimento — git, gh, ripgrep, um servidor SSH, o Herdr e o Neovim com o DeepWorkPlan Vim fixado por tag — e nenhum agente de código, nenhuma CLI de relatórios e nenhum segredo. Todo o resto é uma camada que você ativa em `dck.toml`:

| Camada | Padrão | O que adiciona |
|---|---|---|
| `agents` | desativada | Instala o [coding-agents-kit](/kit/agentkit) e as CLIs que você listar, cada uma com seu próprio volume persistente. Nenhuma flag para contornar permissões é definida. |
| `editor` | ativada | Neovim com DeepWorkPlan Vim; desativada, oferece um editor simples. |

## Padrões de segurança

- Toda porta publicada é vinculada a `127.0.0.1`, a menos que `dck.toml` defina `bind`.
- Encaminhamento do agente SSH a partir do host; as chaves privadas do host nunca são copiadas para um contêiner.
- As chaves de host SSH são geradas em tempo de execução em um volume por projeto, nunca embutidas em uma imagem; o servidor aceita apenas chaves públicas, sem login de root e sem senhas.
- O template não adiciona `cap_add`, nem modo `privileged`, nem o socket do Docker.
- As imagens base e as ferramentas são fixadas por versão e verificadas por checksum; o compose referencia a imagem base por digest sempre que o digest puder ser resolvido.

## Notas

Opcional e nunca obrigatório. Um repositório é totalmente conforme com zero addons opcionais. A v0.1 oferece suporte a hosts Linux e macOS.
