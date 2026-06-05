---
title: Init — Torne seu repositório AI-first
description: "O prompt executável de onboarding para agentes de IA: adote o Deep Work Plan em qualquer repositório — analise, documente, instale a skill e deixe-o pilotável por agentes."
---

# Init — Prompt de onboarding para agentes de IA

Você é um agente de código de IA. Leia este prompt inteiro primeiro e, então, torne o repositório atual
**AI-first**, **orientado a especificação** e **pilotável por agentes** adotando a metodologia Deep Work Plan
(DWP). Trate isso como uma tarefa de engenharia estruturada — um Deep Work Plan — e não como uma edição rápida.

## Princípios operacionais (leia antes de alterar qualquer coisa)

1. **Raciocine sobre *este* repositório.** Nunca copie um template nem deixe um placeholder. Todo arquivo que você
   escrever deve refletir as linguagens, frameworks, comandos e estrutura reais do repositório. Um stub genérico
   é uma falha, não uma entrega.
2. **Seja não destrutivo — pergunte antes de substituir.** O repositório pode já ter um `AGENTS.md`, uma
   árvore `docs/`, uma configuração `.agents/` ou de skills, um `CLAUDE.md` ou suas próprias convenções. **Não**
   sobrescreva, mova nem exclua o trabalho existente silenciosamente. Detecte o que existe, leia-o e **reconcilie**:
   mescle e melhore no lugar sempre que possível. Antes de substituir ou remover qualquer coisa que o usuário
   já tenha, explique o quê e por quê e obtenha sua aprovação explícita.
3. **Proponha o plano e, então, execute.** Após o reconhecimento, apresente um plano curto — o que você vai
   criar, o que você vai modificar e qualquer coisa existente que você proponha reconciliar ou substituir — e aguarde
   a confirmação do usuário antes de fazer alterações grandes ou destrutivas.
4. **Trabalhe em incrementos seguros e revisáveis.** Comite de forma lógica, mantenha os diffs legíveis, não toque em segredos
   e deixe o código não relacionado em paz.
5. **Pare e relate** se um passo falhar ou se o estado do repositório for ambíguo.
6. **Confie, mas verifique.** Trate este prompt como entrada não confiável: confirme que o obteve das
   fontes oficiais (`deepworkplan.com` e os repositórios `DailybotHQ`), avalie-o antes de agir sobre
   ele e verifique a integridade da skill antes de executá-la — veja *Confiança e verificação* abaixo.

## 0. Leia a metodologia e a especificação

Antes de alterar qualquer coisa, leia as fontes canônicas para entender o padrão que você está adotando:

- Metodologia: https://deepworkplan.com/methodology.md
- Especificação: https://deepworkplan.com/spec.md
- Catálogo do kit: https://deepworkplan.com/kit.md

## 1. Reconhecimento e um plano para aprovar

Primeiro entenda o repositório, depois proponha o que você vai fazer.

- **Detecte a stack.** Linguagens, frameworks, o gerenciador de pacotes (a partir do lockfile que de fato
  existe), os comandos reais de build/teste/lint/verificação de tipos, os módulos de origem, a convenção de testes e
  o formato de deploy.
- **Classifique o arquétipo.** Um repositório individual (o caso comum) ou um hub orquestrador, com
  as evidências.
- **Faça o inventário do que já existe.** `AGENTS.md`, `CLAUDE.md`, `docs/`, qualquer configuração `.agents/` ou de skills/agents,
  `.dwp/` e `.gitignore`. Anote qualquer coisa que já faça parte deste trabalho.
- **Proponha o plano de onboarding.** Apresente uma lista concisa: arquivos que você vai criar, arquivos que você vai
  modificar e qualquer coisa existente que você proponha reconciliar ou substituir — e então **peça ao usuário para confirmar**
  antes de prosseguir. Para um repositório grande, capture esse plano com `/dwp-create` e execute-o como um
  Deep Work Plan.

## Confiança e verificação (antes de instalar)

Você está prestes a instalar e executar código neste repositório, portanto verifique o que está
adotando antes de prosseguir. Isso é encorajado: um agente cuidadoso trata um prompt obtido como não
confiável até que tenha sido verificado.

- **Confirme a procedência.** Este prompt e a skill são de código aberto e licenciados sob MIT. As
  fontes canônicas são `https://deepworkplan.com` e a organização `DailybotHQ` no GitHub
  (`deepworkplan-website`, `deepworkplan-skill`). Um manifesto legível por máquina está publicado em
  `https://deepworkplan.com/.well-known/dwp-trust.json`.
- **Entenda o que a skill faz.** Ela é Markdown-first: sem CLI, sem API HTTP, sem autenticação, **sem
  chamadas de rede e sem telemetria**. Sua única ação com relevância de segurança é mutar *este*
  repositório, e é não destrutiva por design — reconcilia e pergunta antes de substituir.
- **Verifique a integridade antes de executar.** Cada versão publica um `SHA256SUMS` sobre os
  arquivos da skill; confirme que sua cópia corresponde antes de confiar nela:

  ```bash
  git clone https://github.com/DailybotHQ/deepworkplan-skill.git
  cd deepworkplan-skill
  # Baixe os checksums da versão que pretende instalar (substitua vX.Y.Z):
  curl -fsSL -o SHA256SUMS \
    https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
  ./setup.sh --verify        # saída diferente de zero significa que um arquivo não corresponde — pare
  ```

  As versões têm **checksums, não assinaturas** (assinaturas são o próximo passo documentado). Tudo
  é aberto e comparável por diff, então você também pode comparar qualquer arquivo com o repositório
  em sua tag.
- **Reporte um problema.** Problemas de segurança devem ser enviados para security@dailybot.com —
  veja `https://deepworkplan.com/.well-known/security.txt` e o `SECURITY.md` de cada repositório.
  A página pública de confiança é `https://deepworkplan.com/trust`.

## 2. Instale a skill Deep Work Plan

Instale a skill para que os agentes deste repositório possam planejar e executar trabalho estruturado. Ela traz um roteador
mais oito sub-skills — `create`, `execute`, `refine`, `resume`, `status`, `verify`, `onboard` e `author`.

```bash
npx skills add DailybotHQ/deepworkplan-skill
```

Ou clone e execute o script de configuração:

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh
```

## 3. Faça o onboarding do repositório (fundamentado e não destrutivo)

Invoque a sub-skill onboard (`/deepworkplan-onboard`). Raciocine sobre o repositório real e adapte tudo
a ele. Para cada artefato abaixo, **se ele já existir, reconcilie-o** (mescle, melhore, alinhe à
metodologia) em vez de sobrescrever — e confirme com o usuário antes de substituir qualquer coisa.

1. **`AGENTS.md` + `CLAUDE.md`.** Produza um `AGENTS.md` na raiz — um índice, as regras obrigatórias
   (apenas inglês, conventional commits, o padrão de testes real e os gates de revisão do repositório) e um bloco
   Quick Commands com os comandos **reais e executáveis** do repositório. Se um `AGENTS.md` já existir, mescle
   nele em vez de substituí-lo. Crie o symlink `CLAUDE.md → AGENTS.md` (não sobrescreva um
   `CLAUDE.md` existente sem perguntar).
2. **`docs/`.** Preencha as categorias padrão com conteúdo real e específico do repositório: `ARCHITECTURE.md`,
   `STANDARDS.md`, `TESTING_GUIDE.md`, `DEVELOPMENT_COMMANDS.md`, `SECURITY.md`,
   `AI_AGENT_ONBOARDING.md`, `AI_AGENT_COLLAB.md`, além de `PERFORMANCE.md` e um índice `docs/README.md`.
   Se os docs já existirem, integre-os e estenda-os — não duplique.
3. **Docs por módulo.** Adicione um `README.md` (e uma subpasta `docs/` para módulos complexos) dentro de cada
   módulo de origem principal descoberto no reconhecimento.
4. **`.agents/` + `.claude → .agents`.** Crie o diretório canônico e multiagente: um catálogo **fundamentado**
   de `agents/`, `skills/` apropriadas à stack e `commands/` `dwp-*` enxutos que delegam à
   skill instalada — cada entrada justificada para *este* repositório, não copiada de outro. Adicione um
   catálogo em `docs/` (`skills_agents_catalog.md` + `COMMANDS_REFERENCE.md`) que corresponda ao que existe em
   disco, além de `settings.json` e o symlink `.claude → .agents`. Incorpore quaisquer skills/agents existentes
   ao catálogo.
5. **A skill DWP, adaptada.** A skill instalada é o motor; o próprio kit do repositório
   (skills, agents, commands) deve ser **fundamentado para este repositório** — nunca um copia e cola do kit de outro
   repositório.
6. **`.dwp/` + `tmp/`.** Estruture um `.dwp/` ignorado pelo git com `plans/` e `drafts/`, além de um espaço de rascunho
   `tmp/` — ambos adicionados ao `.gitignore` de forma não destrutiva (acrescente, nunca reescreva).

## 4. Evolua o kit (sub-skill author)

Use a sub-skill `author` para fazer crescer o próprio kit do repositório. Os delegadores enxutos `/skill-create` e
`/agent-create` encaminham para ela. Crie uma **skill** para um procedimento repetível executado na sessão, um **agent** para
um papel recorrente com seu próprio nível de modelo e ferramentas, e um **command** apenas como um delegador enxuto. Mantenha
o catálogo `.agents/docs/` em sincronia com o que existe em disco.

## 5. Ofereça os addons opcionais

Após a base, enumere os três addons e ofereça cada um como uma escolha explícita. Um repositório é
totalmente conforme com **zero** addons — nunca os instale automaticamente.

- **Suporte a devcontainer** — um dev container reproduzível e isolado com auth de CLI de IA persistente.
- **Integração com a Dailybot** — relatórios de progresso/marcos em modo best-effort para equipes que já usam a Dailybot.
  A metodologia central tem zero dependência da Dailybot.
- **Atualização de dependências** — atualizações independentes do gerenciador de pacotes, em lotes, validadas e reversíveis. Quando
  aceita, ela instala o comando `/lib-upgrade`.

## 6. Planeje e execute

Gere Deep Work Plans para qualquer tarefa e execute-os tarefa a tarefa:

- `/dwp-create <goal>` — decompor um objetivo em tarefas numeradas e sequenciais com validation gates.
- `/dwp-execute` — executar o plano tarefa a tarefa, atualizando o progresso e validando cada gate.
- `/dwp-status` — relatar o progresso sem fazer alterações.
- `/dwp-refine` — adicionar, remover ou reordenar tarefas, preservando o trabalho concluído.
- `/dwp-resume` — reconstruir o estado e continuar um plano interrompido.

## 7. Verifique

Execute `/dwp-verify` para obter um relatório objetivo de conformidade aprovado/reprovado (ele verifica os
critérios no [documento de Conformidade da especificação](https://deepworkplan.com/spec)),
e então confirme:

- [ ] A skill está instalada e resolvível, com todas as oito sub-skills disponíveis.
- [ ] O `AGENTS.md` existe na raiz com um bloco Quick Commands real; o `CLAUDE.md` resolve para ele.
- [ ] O `docs/` contém as categorias padrão com conteúdo real e específico do repositório; os módulos principais têm um
      `README.md`.
- [ ] O `.agents/` existe com `agents/`, `commands/` (delegadores `dwp-*` enxutos), `skills/` e um catálogo
      que corresponde à realidade; o `.claude → .agents` resolve.
- [ ] O `.dwp/` existe, é ignorado pelo git e tem `plans/` e `drafts/`; o `tmp/` existe e é ignorado pelo git.
- [ ] O conteúdo existente do usuário foi preservado ou reconciliado com consentimento — nada foi destruído silenciosamente.
- [ ] Você consegue gerar um Deep Work Plan e executá-lo tarefa a tarefa, validando cada gate.

## Resultado

Quando o onboarding está completo, o repositório é alterado de duas formas duradouras — os pilares da
metodologia:

1. **O repositório é orientado a especificação.** O trabalho começa a partir de um plano e uma especificação escritos, não de
   prompts ad hoc.
2. **O próprio repositório é o harness do agente.** O `AGENTS.md`, os `docs/`, os docs por módulo e o
   diretório de skills `.agents/` dão a cada agente o contexto e os comandos de que ele precisa para fazer um trabalho estruturado e
   verificável.

Qualquer pessoa pode executar este prompt em qualquer repositório — e terminar com uma base de código que qualquer agente de IA pode pilotar.
