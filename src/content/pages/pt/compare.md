---
title: "Deep Work Plan comparado com as alternativas — Deep Work Plan"
description: "O Deep Work Plan frente a ferramentas de especificação, frameworks de agentes e modos de plano nativos: cada qual em seus termos, com fontes e data de revisão."
lastUpdated: 2026-09-10
---

## O Deep Work Plan e as alternativas

Escolha a camada certa para a sua situação. Cada alternativa é descrita em seus próprios termos, todo fato remonta à sua documentação oficial e a página diz quando foi revisada pela última vez. Isto é um mapa, não um ranking.

## Como ler esta página

Três valores descrevem cada capacidade. Eles dizem onde uma capacidade vive em uma ferramenta, não quão boa a ferramenta é.

- **Integrado**
- **Opcional ou por extensão**
- **Fora do escopo**

Última revisão: 2026-09-10

## As alternativas, em seus próprios termos

### Ferramentas de desenvolvimento orientado a especificação

**GitHub Spec Kit** — Transforma uma funcionalidade em uma especificação executável por meio de uma constituição, uma especificação, um plano e uma lista de tarefas, dirigida por slash commands que se integram a mais de cinquenta agentes de código. Equipes que querem um fluxo repetível de especificar, planejar, listar tarefas e implementar dentro do agente que já usam. [Site oficial](https://github.com/github/spec-kit)

**OpenSpec** — Captura cada mudança como uma proposta com specs delta (adicionadas, modificadas, removidas) e requisitos RFC 2119 com cenários, e então as arquiva em especificações vivas. Equipes que trabalham em sistemas existentes e querem que as especificações cresçam uma mudança por vez. [Site oficial](https://openspec.dev)

**Amazon Kiro** — Uma IDE e CLI agênticas cujas especificações avançam de requisitos no estilo EARS para o design e depois para as tarefas, com arquivos steering e hooks executados em eventos do editor. Desenvolvedores que querem desenvolvimento orientado a especificação integrado ao seu editor com ferramentas apoiadas pela AWS. [Site oficial](https://kiro.dev)

### Frameworks de fluxo de trabalho para agentes

**BMAD Method** — Um framework ágil de papéis de agente especializados (análise, produto, arquitetura, desenvolvimento, qualidade) que produz briefs, requisitos, documentos de arquitetura e arquivos de story. Equipes que gostam de cerimônias baseadas em papéis e querem um ciclo de vida ágil completo para o trabalho de agentes. [Site oficial](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Uma biblioteca de skills e um fluxo de trabalho para brainstorming, planejamento em pequenos passos de teste primeiro, execução com subagentes e revisão antes da conclusão. Desenvolvedores que querem execução disciplinada orientada a testes dentro do seu agente de código. [Site oficial](https://github.com/obra/superpowers)

**Get Shit Done** — Um sistema de planejamento com um diretório .planning, ids de requisitos, planos por fase, execução em contexto limpo e uma passagem de verificação contra os requisitos essenciais declarados. Desenvolvedores individuais e pequenas equipes que querem engenharia de contexto e verificação com pouca cerimônia. [Site oficial](https://github.com/open-gsd/gsd-core)

### Modos de planejamento nativos do fornecedor

**Modos de planejamento nativos do fornecedor** — Claude Code, Codex, Cursor e Gemini CLI trazem modos de planejamento, arquivos de instrução e skills que seguem os padrões AGENTS.md e Agent Skills. Qualquer pessoa que queira planejamento dentro de um único agente sem adotar uma metodologia. [Site oficial](https://agents.md)

## Matriz de capacidades

Onde cada capacidade vive, por ferramenta. Integrado, opcional ou por extensão, ou fora do escopo. Verificado contra a documentação oficial.

| Capacidade | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | Get Shit Done | Modos de planejamento nativos do fornecedor |
|---|---|---|---|---|---|---|---|---|
| Funciona com qualquer agente de código | Integrado | Integrado | Integrado | Fora do escopo | Integrado | Integrado | Integrado | Fora do escopo |
| Escreve o harness do agente no repositório | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão |
| Critérios de aceitação por tarefa | Integrado | Opcional ou por extensão | Integrado | Integrado | Integrado | Integrado | Integrado | Opcional ou por extensão |
| Gate de validação por tarefa | Integrado | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão | Integrado | Opcional ou por extensão | Opcional ou por extensão |
| Estado retomável em disco | Integrado | Integrado | Integrado | Integrado | Opcional ou por extensão | Opcional ou por extensão | Integrado | Opcional ou por extensão |
| Revisão de encerramento obrigatória com passe de segurança | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão |
| Verificador de conformidade executável | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Fora do escopo | Fora do escopo | Opcional ou por extensão |
| Medição publicada da carga de instrução | Integrado | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo |
| Onboarding que estrutura a documentação | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Integrado | Opcional ou por extensão |
| Especificações vivas para sistemas existentes | Fora do escopo | Opcional ou por extensão | Integrado | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Fora do escopo |

## O que o Deep Work Plan traz

- **Independente de ferramenta e nativo do repositório.** O harness e o plano são arquivos no seu repositório, lidos por qualquer agente que siga os padrões AGENTS.md e Agent Skills. Trocar de agente não perde o plano.
- **Validação selecionada a partir do que cada tarefa tocou.** Cada tarefa declara a sua superfície tocada e executa os testes do comportamento alterado e dos seus consumidores, ampliando para a suíte completa quando o impacto não pode ser delimitado. Zero testes selecionados nunca é uma aprovação.
- **Um Final Review com passe de segurança.** Um plano se encerra com uma revisão de segurança do conjunto acumulado de mudanças, incluindo uma revisão local obrigatória do diff, e uma validação do estado final. Achados críticos bloqueiam a conclusão.
- **Estado que sobrevive a sessões e agentes.** Caixas de seleção do README, logs de tarefa, um índice de trabalho delimitado e um arquivo de estado legível por máquina são escritos em cada fronteira, então outra sessão ou outro agente continua a partir do disco. Até mesmo uma criação de plano interrompida é recuperável.
- **Um verificador de conformidade para o próprio repositório.** Um script somente leitura verifica o harness e cada plano contra a especificação, entende os dois ciclos de vida do plano e sai com um código amigável a CI.
- **Carga de instrução medida e publicada.** Um script comitado mede quantos bytes cada fluxo carrega; os resultados, incluindo os aumentos, são publicados como bytes, nunca como porcentagens de tokens ou de custo.

## Limitações honestas

O Deep Work Plan não tem um mecanismo de especificação viva ou delta; OpenSpec e ferramentas semelhantes são mais fortes aí. Nenhum benchmark independente da metodologia existe ainda; uma avaliação pública pré-registrada está planejada. O registro de carga de instrução mede bytes carregados, não tokens, custo ou resultados.

## Ajude-nos a manter esta página exata

Esta página é revisada na data indicada e corrigida a pedido. Se a descrição da sua ferramenta está desatualizada ou incompleta, abra uma issue e nós a corrigiremos.

[Abra uma issue](https://github.com/DailybotHQ/deepworkplan-website/issues)

## Fontes

- Deep Work Plan — https://deepworkplan.com/spec
- GitHub Spec Kit — https://github.github.io/spec-kit/
- OpenSpec — https://openspec.dev/docs
- Amazon Kiro — https://kiro.dev/docs/
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD#readme
- Superpowers — https://github.com/obra/superpowers#readme
- Get Shit Done — https://github.com/open-gsd/gsd-core#readme
- Vendor-native plan modes — https://agentskills.io
