---
title: "Deep Work Plan comparado com as alternativas"
description: "O Deep Work Plan frente a ferramentas de especificação, frameworks de agentes e modos de plano nativos: cada qual em seus termos, com fontes e data de revisão."
lastUpdated: 2026-09-11
---

## O Deep Work Plan e as alternativas

Escolha a camada certa para a sua situação. Cada alternativa é descrita em seus próprios termos, todo fato remonta à sua documentação oficial e a página diz quando foi revisada pela última vez. Isto é um mapa, não um ranking.

## Como ler esta página

Três valores descrevem cada capacidade. Eles dizem onde uma capacidade vive em uma ferramenta, não quão boa a ferramenta é.

- **Integrado**
- **Opcional ou por extensão**
- **Fora do escopo**

Última revisão: 2026-09-11

## As alternativas, em seus próprios termos

### Ferramentas de desenvolvimento orientado a especificação

**GitHub Spec Kit** — Transforma uma funcionalidade em uma especificação executável por meio de uma constituição, uma especificação, um plano e uma lista de tarefas, dirigida por slash commands que se integram a mais de cinquenta agentes de código, e pode verificar se os artefatos permanecem consistentes entre si antes de a implementação começar. Equipes que querem um fluxo repetível de especificar, planejar, listar tarefas e implementar dentro do agente que já usam. [Site oficial](https://github.com/github/spec-kit)

**OpenSpec** — Captura cada mudança como uma proposta com specs delta (adicionadas, modificadas, removidas) e requisitos RFC 2119 com cenários, e então as arquiva em especificações vivas, com um validador que verifica a completude da proposta e a cobertura dos cenários antes de aceitar uma mudança. Equipes que trabalham em sistemas existentes e querem que as especificações cresçam uma mudança por vez. [Site oficial](https://openspec.dev)

**Amazon Kiro** — Uma IDE e CLI agênticas cujas especificações avançam de requisitos no estilo EARS para o design e depois para as tarefas, com arquivos steering e hooks executados em eventos do editor, e que pode gerar especificações para uma base de código existente para detectar lacunas de requisitos antes de o design começar. Desenvolvedores que querem desenvolvimento orientado a especificação integrado ao seu editor com ferramentas apoiadas pela AWS. [Site oficial](https://kiro.dev)

### Frameworks de fluxo de trabalho para agentes

**BMAD Method** — Um framework ágil de papéis de agente especializados (análise, produto, arquitetura, desenvolvimento, qualidade) que produz briefs, requisitos, documentos de arquitetura e arquivos de story, com uma Definition of Done que exige que cada story seja revisada por um colega de equipe ou um agente revisor de IA antes de ser considerada concluída. Equipes que gostam de cerimônias baseadas em papéis e querem um ciclo de vida ágil completo para o trabalho de agentes. [Site oficial](https://github.com/bmad-code-org/BMAD-METHOD)

**Superpowers** — Uma biblioteca de skills e um fluxo de trabalho para brainstorming, planejamento em pequenos passos de teste primeiro, execução com subagentes e revisão antes da conclusão, integrada a mais hosts de agentes de código do que qualquer outra alternativa desta página, além de uma revisão em dois estágios com subagentes (conformidade com a especificação e depois qualidade do código) em cada tarefa. Desenvolvedores que querem execução disciplinada orientada a testes dentro do seu agente de código. [Site oficial](https://github.com/obra/superpowers)

**GSD Core** — Um sistema de planejamento com um diretório .planning, ids de requisitos, planos por fase, execução em contexto limpo e uma passagem de verificação contra os entregáveis observáveis pelo usuário extraídos do resumo de cada plano, feito para combater o context rot executando pesquisa, planejamento e execução em subagentes descartáveis e detectando verificações desatualizadas com verificações de fingerprint de conteúdo. Desenvolvedores individuais e pequenas equipes que querem engenharia de contexto e verificação com pouca cerimônia. [Site oficial](https://github.com/open-gsd/gsd-core)

**Gentle-AI** — Configura os agentes de código que você já usa com memória persistente que também roteia entre sessões e modelos, skills curadas, servidores MCP, personas e Spec-Driven Development ou Receipt-Driven Development opcionais. A sua configuração é escrita, por padrão, nas configurações globais do agente; uma instalação limitada ao workspace é opcional. Desenvolvedores que querem um ecossistema de agentes configurado, capaz de lembrar o trabalho entre sessões e produzir evidências sob demanda. [Site oficial](https://github.com/Gentleman-Programming/gentle-ai)

### AI-native SDLC

**SDLC nativo de IA da Claude** — Um ciclo de seis estágios, de Plan e Design a Build, Test, Deploy e Maintain, com aprovação humana obrigatória em cada estágio, artefatos duradouros comitados no repositório entre estágios, uma passagem de revisão dedicada e rotulada como segurança antes do deploy, e evals contínuas que publicam indicadores de entrega antecedentes e posteriores. Equipes que avaliam o playbook de entrega de software de ponta a ponta do Claude Code e o seu ciclo de feedback em produção. [Site oficial](https://claude.com/blog/the-ai-native-sdlc-playbook)

### Modos de planejamento nativos do fornecedor

**Modos de planejamento nativos do fornecedor** — Claude Code, Codex, Cursor e Gemini CLI trazem modos de planejamento, arquivos de instrução e skills construídos sobre os padrões abertos e multifornecedor AGENTS.md e Agent Skills, ainda que o comportamento exato do modo de planejamento continue dependendo do fornecedor, do cliente e da versão. O Agent Skills, em particular, carrega apenas um resumo curto na inicialização e as instruções completas apenas na ativação, mantendo fora do contexto a capacidade que não está em uso. Qualquer pessoa que queira planejamento dentro de um único agente sem adotar uma metodologia. [Site oficial](https://agents.md)

## Matriz de capacidades

Onde cada capacidade vive, por ferramenta. Integrado, opcional ou por extensão, ou fora do escopo. Verificado contra a documentação oficial.

| Capacidade | Deep Work Plan | GitHub Spec Kit | OpenSpec | Amazon Kiro | BMAD Method | Superpowers | GSD Core | Gentle-AI | SDLC nativo de IA da Claude | Modos de planejamento nativos do fornecedor |
|---|---|---|---|---|---|---|---|---|---|---|
| Funciona com qualquer agente de código | Integrado | Integrado | Integrado | Fora do escopo | Integrado | Integrado | Integrado | Integrado | Fora do escopo | Fora do escopo |
| Escreve o harness do agente no repositório | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão | Integrado | Opcional ou por extensão |
| Critérios de aceitação por tarefa | Integrado | Opcional ou por extensão | Integrado | Integrado | Integrado | Integrado | Integrado | Opcional ou por extensão | Integrado | Opcional ou por extensão |
| Gate de validação por tarefa | Integrado | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão | Integrado | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão |
| Estado retomável em disco | Integrado | Integrado | Integrado | Integrado | Opcional ou por extensão | Opcional ou por extensão | Integrado | Integrado | Integrado | Opcional ou por extensão |
| Revisão de encerramento obrigatória com passe de segurança | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Integrado | Opcional ou por extensão |
| Verificador de conformidade executável | Integrado | Opcional ou por extensão | Integrado | Opcional ou por extensão | Fora do escopo | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão |
| Medição publicada da carga de instrução | Integrado | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo |
| Onboarding que estrutura a documentação | Integrado | Integrado | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo | Integrado | Fora do escopo | Integrado | Opcional ou por extensão |
| Especificações vivas para sistemas existentes | Fora do escopo | Opcional ou por extensão | Integrado | Integrado | Opcional ou por extensão | Fora do escopo | Opcional ou por extensão | Opcional ou por extensão | Opcional ou por extensão | Fora do escopo |
| Memória persistente do agente entre projetos | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Integrado | Fora do escopo | Opcional ou por extensão |
| Papéis de agente especializados e distintos | Opcional ou por extensão | Fora do escopo | Fora do escopo | Fora do escopo | Integrado | Fora do escopo | Fora do escopo | Opcional ou por extensão | Fora do escopo | Fora do escopo |
| É, em si, um IDE ou editor | Fora do escopo | Fora do escopo | Fora do escopo | Integrado | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Fora do escopo | Opcional ou por extensão |

## O que o Deep Work Plan traz

- **Independente de ferramenta e nativo do repositório.** O harness e o plano são arquivos no seu repositório, lidos por qualquer agente que siga os padrões AGENTS.md e Agent Skills. Trocar de agente não perde o plano.
- **Validação selecionada a partir do que cada tarefa tocou.** Cada tarefa declara a sua superfície tocada e executa os testes do comportamento alterado e dos seus consumidores, ampliando para a suíte completa quando o impacto não pode ser delimitado. Zero testes selecionados nunca é uma aprovação.
- **Um Final Review com passe de segurança.** Um plano se encerra com uma revisão de segurança do conjunto acumulado de mudanças, incluindo uma revisão local obrigatória do diff, e uma validação do estado final. Achados críticos bloqueiam a conclusão.
- **Estado que sobrevive a sessões e agentes.** Caixas de seleção do README, logs de tarefa, um índice de trabalho delimitado e um arquivo de estado legível por máquina são escritos em cada fronteira, então outra sessão ou outro agente continua a partir do disco. Até mesmo uma criação de plano interrompida é recuperável.
- **Um verificador de conformidade para o próprio repositório.** Um script somente leitura verifica o harness e cada plano contra a especificação, entende os dois ciclos de vida do plano e sai com um código amigável a CI.
- **Carga de instrução medida e publicada.** Um script comitado mede quantos bytes cada fluxo carrega; os resultados, incluindo os aumentos, são publicados como bytes, nunca como porcentagens de tokens ou de custo.

## Limitações honestas

O Deep Work Plan não tem um mecanismo de especificação viva ou delta; OpenSpec e ferramentas semelhantes são mais fortes aí. Nenhum benchmark independente da metodologia existe ainda; uma avaliação pública pré-registrada está planejada. O registro de carga de instrução mede bytes carregados, não tokens, custo ou resultados. O DWP é deliberadamente limitado ao repositório: não é um sistema de memória entre projetos, nem um framework de agentes baseado em papéis, nem um IDE, então também não compete nessas frentes — combine-o com uma ferramenta que cubra essa frente quando for isso que o trabalho exigir.

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
- GSD Core — https://github.com/open-gsd/gsd-core#readme
- Gentle-AI — https://github.com/Gentleman-Programming/gentle-ai#readme
- SDLC nativo de IA da Claude — https://claude.com/blog/the-ai-native-sdlc-playbook
- Modos de planejamento nativos do fornecedor — https://agentskills.io
