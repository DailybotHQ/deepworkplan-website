---
title: "DeepWorkPlan Vim"
description: "DeepWorkPlan Vim é o editor de terminal do Deep Work Plan: configuração de Neovim 0.12+ com índice de comandos, navegador de planos e visualizador de Markdown."
lastUpdated: 2026-10-03
---

## O que é

Uma configuração de Neovim para pessoas e agentes de programação que vivem no terminal: seus Deep Work Plans, a documentação e o índice de comandos a uma tecla de distância.

## Instalação

Uma linha instala o DeepWorkPlan Vim como sua configuração de Neovim. O instalador explica o que fará e pergunta antes de tocar em uma configuração existente.

```bash
curl -fsSL https://deepworkplan.com/vim/install.sh | bash
```

Consentimento primeiro: uma configuração de Neovim existente nunca é sobrescrita sem a sua aprovação explícita. O instalador para e mostra o caminho manual.

No Windows o comando de uma linha não se aplica; o README do repositório documenta o caminho manual. [Caminho de instalação no Windows](https://github.com/DailybotHQ/deepworkplan-vim#install-host)

## O que ele faz

Cinco recursos, com escopo deliberado. Cada um corresponde a uma combinação de teclas que você pode inspecionar no índice de comandos gerado.

| Recurso | O que é | Mapeamento |
|---|---|---|
| Índice de comandos gerado | Um índice de comandos gerado a partir da configuração ativa, para que a lista de atalhos esteja sempre atualizada. | `SPC h h` |
| Gestos no estilo VS Code | Gestos de edição moldados pelos editores gráficos: selecionar tudo e copiar para a área de transferência do sistema. | `<C-a>`, `y`, `<leader>y` |
| Navegador de Deep Work Plan | Um painel que percorre os planos do repositório — leia um plano, suas tarefas e seus portões de validação sem sair do editor. | `SPC P` |
| Visualizador de Markdown | Pré-visualize Markdown no navegador ou renderize no buffer, para que a documentação e os planos fiquem onde o trabalho acontece. | `SPC m p`, `SPC m r` |
| Instalador de uma linha | Um instalador autônomo para macOS e Linux, com um caminho manual documentado para Windows. | — |

## Requisitos

- Neovim 0.12 ou mais recente, com Lua (lua, lua5.4 ou luajit) disponível
- macOS e Linux; Windows é suportado por um caminho manual documentado
- Licença GPL-3.0 — livre para usar, estudiar e modificar

## Relacionados

- [Leia o doc do addon no kit](/kit/vim)
- [Veja o repositório de origem](https://github.com/DailybotHQ/deepworkplan-vim)
- Instale o DeepWorkPlan Vim, abra o Neovim e leia seus Deep Work Plans no mesmo terminal que os seus agentes usam.
