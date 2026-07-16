---
title: "Início rápido — Deep Work Plan"
description: "Instale a skill, faça o onboarding do seu repositório e planeje e execute com qualquer agente — os passos que tornam seu repositório orientado a especificação e pilotável por agentes."
lastUpdated: 2026-05-31
---

## Início rápido

Instale a skill, faça o onboarding do seu repositório e planeje e execute com qualquer agente — os passos que tornam
seu repositório orientado a especificação e pilotável por agentes.

## O caminho de adoção

### 1. Instale a skill Deep Work Plan

Adicione a skill ao seu repositório. Ela traz um roteador mais oito sub-skills — create, execute, refine,
resume, status, verify, onboard e author. Use a CLI de Skills para o caminho mais rápido:

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ou clone o repositório e execute a configuração onde git e um shell estiverem disponíveis:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

### 2. Faça o onboarding do repositório

Execute a sub-skill onboard e deixe o agente raciocinar sobre seu repositório real — sua stack, gerenciador
de pacotes e comandos de validação reais:

```bash
/deepworkplan-onboard
```

Ele gera o `AGENTS.md`, uma base de conhecimento em `docs/`, docs por módulo e um diretório `.agents/` multiagente
(com o symlink `.claude → .agents`), conecta os comandos `dwp-*` enxutos e estrutura um `.dwp/` ignorado pelo git
para planos e rascunhos. Nada é gerado por template; tudo é adaptado ao seu repositório.

### 3. Evolua o kit e aceite addons

Use `/skill-create` e `/agent-create` (a sub-skill author) para desenvolver skills,
agents e commands apropriados à sua stack. O onboarding também oferece cinco addons opcionais — devcontainer, Dailybot,
dependency-upgrade, design-system e AI Diff Reviewer — que você aceita apenas quando fizerem sentido. Um repositório é totalmente conforme com zero addons.

### 4. Planeje e execute

Gere um Deep Work Plan e execute-o tarefa a tarefa:

```bash
/dwp-create <goal>
/dwp-execute
```

Use `/dwp-status`, `/dwp-refine` e `/dwp-resume` conforme o trabalho avança. Cada plano carrega tarefas numeradas,
validation gates e um protocolo de conclusão para que o trabalho permaneça estruturado e retomável entre sessões.

## O resultado

Seu repositório se torna orientado a especificação e pilotável por agentes: o plano é a fonte de verdade duradoura e
o próprio repositório se torna o harness contra o qual qualquer agente executa.

- [Leia a metodologia](/methodology)
- [Explore a especificação](/spec)
- [Explore o kit](/kit)
