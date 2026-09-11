---
title: "Perguntas frequentes — Deep Work Plan"
description: "Respostas às perguntas mais comuns sobre o Deep Work Plan: o que ele faz, como funcionam gates e retomada, comparação com outras ferramentas e como adotá-lo."
lastUpdated: 2026-09-11
---

## Perguntas frequentes

Respostas curtas ao que as pessoas mais perguntam sobre o Deep Work Plan, cada uma com um link para a página que aprofunda o tema.

## O que é o Deep Work Plan

### O que o Deep Work Plan realmente faz?

O Deep Work Plan transforma um repositório em um ambiente estruturado no qual um agente de código pode executar trabalhos longos com confiabilidade. Ele é instalado como uma skill de agente, faz o onboarding do repositório uma única vez (um índice `AGENTS.md`, uma árvore `docs/`, um kit `.agents/` de skills e comandos, uma área de saída `.dwp/` ignorada pelo git) e, a partir daí, qualquer objetivo se torna um plano: tarefas atômicas, cada uma com critérios de aceitação e um gate de validação, executadas uma por vez, comitadas à medida que passam e retomáveis do disco por qualquer agente. O plano se encerra com um Final Review que audita a segurança e valida o estado final. A metodologia é licenciada sob MIT e funciona com qualquer agente de código que leia um repositório.

[Leia a metodologia](https://deepworkplan.com/pt/methodology)

### Para quem é?

Desenvolvedores e equipes que entregam trabalho real e de várias etapas a agentes de código e querem que ele seja concluído. Encaixa-se quando uma tarefa atravessa mais de uma sessão, mais de uma família de arquivos ou mais de um agente; quando um colega precisa poder continuar de onde um agente parou; ou quando "concluído" precisa significar "validado", e não "o agente disse que sim". Uma correção de uma linha não precisa de um plano, e a metodologia diz isso: sua regra de rigor proporcional recomenda, em vez disso, um objetivo com critérios e gate definidos inline.

[Início rápido](https://deepworkplan.com/pt/quickstart)

### Qual é a diferença entre um plano Lite e um Full?

Uma escolha de representação, não uma troca de rigor. Todo plano começa como uma pasta Lite: um README compacto com registros de tarefas ancorados que já é executável, não um rascunho parcial. O `create` só se expande para arquivos de tarefa Full quando o detalhe das instruções, as dependências ou os contratos de uma tarefa não cabem em um registro compacto e revisável; um pedido explícito por qualquer um dos formatos é respeitado, e um plano Lite pode ser promovido a Full mais tarde sem perder o trabalho já concluído. Ambos os formatos carregam os mesmos critérios de aceitação, gates de validação, evidências e o Final Review obrigatório.

[Leia a metodologia](https://deepworkplan.com/pt/methodology)

### É uma ferramenta, um framework ou uma metodologia?

Uma metodologia empacotada como uma skill instalável. Não há servidor, conta, formato proprietário nem runtime além do agente de código que você já usa. O que é instalado são instruções que o agente lê, um pequeno conjunto de scripts de shell para detecção de contexto e verificação de conformidade, e as convenções que o seu repositório adota. Tudo o que o plano produz é Markdown e JSON no seu repositório, legível sem nenhuma ferramenta.

[Leia a especificação](https://deepworkplan.com/pt/spec)

### Com quais agentes de código ele funciona?

Qualquer agente que leia arquivos do repositório. A skill segue o padrão aberto Agent Skills e a convenção `AGENTS.md`, então Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot e outros a assumem pelo carregamento normal de skills e instruções. A própria avaliação da metodologia mostra um plano iniciado pelo agente de um fornecedor e retomado pelo de outro, nas duas direções. A cobertura de instalação e as evidências comportamentais estão listadas por agente na matriz de compatibilidade, e as duas nunca são confundidas.

[Explore o kit](https://deepworkplan.com/pt/kit)

### Como uso?

Três passos. Primeiro, instale a skill Deep Work Plan no seu agente de código — o caminho mais rápido é `npx skills add DailybotHQ/deepworkplan-skill` (ou clone o repositório da skill e execute `./setup.sh`). Segundo, faça o onboarding do repositório uma vez para que o agente adapte `AGENTS.md`, `docs/`, o kit `.agents/` e uma área `.dwp/` ignorada pelo git ao seu stack: aponte para https://deepworkplan.com/init.md, ou execute `/deepworkplan-onboard`. Terceiro, planeje e execute o trabalho com os comandos enxutos: `/dwp-create <goal>` constrói um plano; `/dwp-execute` executa tarefa por tarefa em cada gate; `/dwp-refine` edita um plano em andamento (escopo, tarefas, ou promover um plano Lite para Full); `/dwp-resume` continua após uma interrupção; `/dwp-status` informa o progresso sem executar; `/dwp-verify` produz um relatório objetivo de conformidade. Agentes que interceptam `/` costumam usar `#` em vez disso (por exemplo `#dwp-execute`). O endpoint de adoção e o início rápido seguem o mesmo caminho com mais detalhes.

[Início rápido](https://deepworkplan.com/pt/quickstart)

### O que exatamente é instalado, e onde?

A skill do agente é instalada onde quer que o seu agente carregue skills de projeto ou de usuário. O onboarding então adapta o próprio repositório: cria ou reconcilia `AGENTS.md`, `docs/`, `.agents/` e a área `.dwp/` ignorada pelo git. A skill ensina o método ao agente; o repositório mantém o contexto, o kit e a evidência do plano que os outros agentes precisam para continuar.

[Veja o fluxo de adoção](https://deepworkplan.com/pt/init)

### O Deep Work Plan exige Git?

O Git é recomendado para repositórios porque seu histórico faz parte da superfície de recuperação e revisão, mas a metodologia também pode rodar em um workspace de agente sem um repositório Git. Nesse caso, a camada de estado legível por máquina, incluindo os checkpoints e registros de gate em `state.json`, é obrigatória para que a recuperação não dependa de uma transcrição de chat.

[Leia sobre os arquétipos de repositório](https://deepworkplan.com/pt/spec/archetypes)

### Qual é a diferença entre uma skill, um plano e uma especificação de produto?

Uma skill descreve como um agente executa um procedimento repetível. Um plano DWP descreve uma mudança concreta por meio de escopo, critérios de aceitação, gates de validação e evidências. Uma especificação de produto descreve o comportamento atual do produto e evolui por meio de deltas após a implementação; skills e planos também são especificações, mas descrevem procedimentos e mudanças em vez de manter esse contrato canônico do produto.

[Leia a especificação](https://deepworkplan.com/pt/spec/dwp-specification)

## Como um plano é executado

### Como os gates de validação são implementados? Eles exigem aprovação humana?

São asserções executáveis que o próprio agente roda. A aprovação humana enquadra a execução: uma pessoa aprova o plano antes da execução e revisa o diff final na hora do pull request; o que fica entre as duas pontas é autônomo. Cada tarefa nomeia comandos concretos, normalmente o próprio gate de qualidade do repositório, selecionados a partir da superfície tocada pela tarefa: os testes do comportamento alterado e dos seus consumidores, ampliando para a suíte completa quando a mudança é compartilhada ou não pode ser delimitada. Uma tarefa é marcada como concluída somente quando esses comandos terminam com sucesso, e tarefas que alteram comportamento devem estender os testes. Em caso de falha, a tarefa é marcada como bloqueada e o agente para.

[O ciclo principal](https://deepworkplan.com/pt/methodology/02-core-loop)

### Como o plano evita ficar desatualizado quando as pessoas alteram o código entre execuções?

Em três frentes. As tarefas são escritas como comportamento, não como edições: um critério de aceitação diz o que o sistema deve fazer, então um arquivo renomeado ou uma implementação trocada não o invalida. Cada gate é reexecutado contra o repositório como ele está agora, então uma premissa quebrada falha ruidosamente na execução seguinte em vez de desviar em silêncio, e essa falha é o sinal para refinar. E manter a documentação em sincronia faz parte do trabalho: uma tarefa que altera comportamento também atualiza os docs e o kit voltado a agentes que o descrevem, dentro do seu próprio gate. Cada execução deve deixar o repositório mais pronto para agentes do que o encontrou.

[Leia a metodologia](https://deepworkplan.com/pt/methodology)

### Posso alterar o plano no meio da execução sem perder o trabalho concluído?

Sim; refinar um plano parcialmente executado é um movimento de primeira classe. As definições das tarefas e o estado de execução são mantidos separados: o plano é uma checklist em disco mais um pequeno arquivo de estado, então o que foi feito permanece registrado de forma independente do texto das tarefas. Quando uma tarefa se revela errada, o agente a marca como bloqueada e para, em vez de seguir empurrando. Você então edita, reordena, divide ou descarta as tarefas que ainda não rodaram, enquanto as tarefas concluídas permanecem concluídas. Retomar reconstrói o estado a partir do disco e do repositório real e reexecuta os gates que importam, então nada que tenha mudado por baixo passa despercebido.

[O ciclo principal](https://deepworkplan.com/pt/methodology/02-core-loop)

### Ele continua verificando o trabalho contra o plano, ou o plano é algo feito só no início?

O plano é uma verificação contínua. O agente trabalha uma pequena tarefa por vez e precisa validar antes de seguir, então ele pode desviar um passo, não três. Cada tarefa carrega critérios de aceitação mais os comandos exatos que os comprovam, e o progresso é escrito no repositório à medida que avança, com um status por tarefa, então o desvio fica visível para você, para a próxima sessão e para o próximo agente. Um plano não termina até que tudo valide, incluindo o Final Review. A ressalva honesta: a metodologia não consegue impedir que um agente escreva um critério de aceitação fraco desde o início; ela torna o desvio ruidoso em vez de silencioso.

[O ciclo principal](https://deepworkplan.com/pt/methodology/02-core-loop)

### O plano é gerado uma vez e mantido à mão, ou evolui com o código?

Nem um nem outro. Ele é gerado uma vez a partir de um objetivo e depois mantido como parte do trabalho. O plano deliberadamente não é reescrito a partir de diffs de código, porque uma especificação que persegue o código se torna um espelho atrasado, que é o desvio que a metodologia existe para eliminar. Ele evolui de propósito: os gates são reexecutados contra o repositório atual, um gate que falha dispara um refinamento, e o agente executa esse refinamento durante a execução enquanto você aprova no início e revisa no fim. Documentação e testes evoluem junto com o código por construção, porque atualizá-los está dentro do gate de cada tarefa.

[Leia a metodologia](https://deepworkplan.com/pt/methodology)

### O que acontece se a sessão morrer no meio do caminho?

O progresso vive no disco, não no chat. As caixas de seleção do README, o log de cada tarefa, um índice de trabalho delimitado e um arquivo de estado legível por máquina são atualizados em cada fronteira de tarefa, e o arquivo de estado registra um checkpoint antes de qualquer pausa planejada. Uma sessão nova, ou um agente diferente, lê esse índice compacto, o reconcilia com o repositório e o histórico do git e continua na primeira tarefa incompleta sem refazer o trabalho terminado. Até mesmo uma criação de plano interrompida é recuperável: a identidade do plano e a lista de tarefas pretendida são escritas antes de qualquer arquivo de tarefa, então um plano criado pela metade pode ser concluído ou descartado em vez de adivinhado.

[O ciclo principal](https://deepworkplan.com/pt/methodology/02-core-loop)

### O que é o Final Review?

A única tarefa de encerramento obrigatória de todo plano. Em ordem: um passe de segurança sobre o conjunto completo de mudanças acumuladas do plano, incluindo uma revisão local obrigatória do diff pela skill AI Diff Reviewer, com achados críticos bloqueando a conclusão até serem corrigidos ou explicitamente aceitos; a validação do estado final, ou seja, as suítes completas aplicáveis de testes, lint, verificação de tipos e formatação do repositório sobre o código final; e uma reconciliação das decisões de skills que cada tarefa registrou. O agente então relata entregáveis, evidências e limitações, e oferece um Relatório Executivo uma única vez, gerando-o somente se você pedir.

[A especificação](https://deepworkplan.com/pt/spec/dwp-specification)

### O que acontece quando um gate de validação falha?

A tarefa é registrada como bloqueada e o agente para antes de declarar conclusão. Você pode inspecionar a evidência, corrigir o código ou refinar a tarefa e então retomar; um comando que falha é um sinal para resolver a divergência, não uma permissão para enfraquecer o gate.

[Leia o protocolo do agente](https://deepworkplan.com/pt/spec/agent-protocol)

### Um plano pode rodar sem supervisão durante a noite ou em CI?

Sim, quando o plano foi aprovado com antecedência, carrega a camada de estado exigida e dá ao agente uma autoridade limitada. Uma execução sem supervisão deve parar e registrar um bloqueio quando a realidade diverge, um gate falha fora do escopo de reparo planejado, ou uma nova aprovação ou credencial é necessária.

[Leia o protocolo de execução sem supervisão](https://deepworkplan.com/pt/spec/agent-protocol)

## Como ele se compara

### Como ele difere de ferramentas orientadas a especificação como Spec Kit, OpenSpec ou Kiro?

Elas resolvem problemas adjacentes. As ferramentas orientadas a especificação são excelentes em capturar o que deve mudar: especificações, requisitos e propostas de mudança em um formato repetível. O Deep Work Plan trata de como um agente executa por horas sem desviar: o harness integrado pelo onboarding, gates de validação por tarefa selecionados a partir da superfície tocada, estado retomável em disco, um Final Review obrigatório com passe de segurança e um verificador de conformidade para o próprio repositório. Os dois podem ser combinados, com uma especificação ou proposta de mudança alimentando um plano. A página de comparação dispõe as capacidades lado a lado, nos termos de cada ferramenta.

[Veja a comparação](https://deepworkplan.com/pt/compare)

### Como ele difere de ferramentas de fluxo de trabalho para agentes como BMAD, Superpowers, Get Shit Done ou Gentle-AI?

Frameworks de fluxo de trabalho para agentes como BMAD, Superpowers e Get Shit Done trazem estilos de trabalho fortes: papéis, princípios, passos de teste primeiro, hábitos de verificação. O Gentle-AI fica em uma categoria vizinha como configurador de ecossistema de agentes: equipa os agentes de codificação que você já usa com memória persistente entre sessões (Engram), skills selecionadas, personas, servidores MCP, Spec-Driven Development opcional e revisão opcional baseada em evidências (Receipt-Driven Development), escrevendo nos diretórios de configuração de cada agente. O Deep Work Plan difere de ambos: ele se concentra no que permanece no repositório e no que pode ser verificado — um harness que qualquer agente lê sem contexto prévio, arquivos de tarefa com critérios de aceitação e gates, estado que sobrevive a uma sessão, um verificador de conformidade com um código de saída amigável a CI e uma medição publicada de quantos bytes de instrução cada fluxo carrega. Ele é independente de ferramenta por construção e não acrescenta serviço, provedor nem segredo ao ciclo principal. As camadas podem coexistir: os frameworks e o Gentle-AI moldam como o agente trabalha; o Deep Work Plan torna o trabalho longo durável e verificável dentro do repositório. A página de comparação mostra onde cada abordagem é integrada, opcional ou está fora do escopo.

[Veja a comparação](https://deepworkplan.com/pt/compare)

### Por que não simplesmente usar o modo de planejamento nativo do meu agente?

Os modos de planejamento nativos são úteis, e o Deep Work Plan se apoia no mesmo substrato, a convenção `AGENTS.md` e o padrão aberto Agent Skills. A diferença é onde o plano vive e o que o reforça. Planos nativos geralmente vivem fora do repositório e expiram com a sessão; o Deep Work Plan escreve o plano, o seu estado e as suas evidências no repositório, então outro agente ou um colega pode continuá-lo, e cada tarefa carrega um gate executável e um log registrado. Você continua usando o modo de planejamento do seu agente para pensar; a metodologia acrescenta o loop de execução duradouro e verificável.

[Veja a comparação](https://deepworkplan.com/pt/compare)

## Adotando

### O que o onboarding escreve no meu repositório e ele toca em arquivos existentes?

O onboarding é não destrutivo: ele detecta um `AGENTS.md`, `docs/`, `.agents/` ou `CLAUDE.md` existente, reconcilia em vez de sobrescrever e pergunta antes de substituir qualquer coisa. Ele escreve o índice `AGENTS.md` com comandos reais, uma árvore `docs/` fundamentada, docs por módulo, o kit `.agents/` com comandos enxutos `dwp-*`, uma área de saída `.dwp/` ignorada pelo git, um mapa de testes verificado e a revisão local de código obrigatória (a skill AI Diff Reviewer mais uma extensão de revisão adaptada ao repositório). Ele então executa uma autoverificação e o verificador de conformidade, para que você veja o que foi produzido. Um repositório integrado sob uma versão anterior recebe uma atualização direcionada que altera apenas o que falta.

[O endpoint de adoção](https://deepworkplan.com/pt/init)

### Posso usar a metodologia principal sem instalar add-ons?

Sim. Os add-ons são camadas opcionais e um repositório sem nenhum deles é totalmente conforme com o DWP. Devcontainers, relatórios do Dailybot, atualizações de dependências, suporte a sistema de design e revisão opcional em CI só são oferecidos quando fazem sentido para o seu repositório e você os aceita explicitamente.

[Explore os add-ons](https://deepworkplan.com/pt/spec/addons)

### E se meu repositório ainda não tiver testes nem linting?

O DWP não trata a ausência de um toolchain como um passe livre. Durante o onboarding, o agente propõe uma configuração de validação adequada ao stack, registra os comandos na documentação do repositório e os usa como alvo para os futuros gates; a proposta permanece visível para você revisar.

[Leia o protocolo do agente](https://deepworkplan.com/pt/spec/agent-protocol)

### Quanto custa e como a eficiência é medida?

A metodologia e a skill são licenciadas sob MIT e gratuitas; não há serviço, chave de API nem telemetria nos fluxos centrais. A eficiência é relatada como o número de bytes de instrução que cada fluxo carrega, medido por um script comitado junto com a skill e publicado em um registro de avaliação, com aumentos relatados com a mesma franqueza das reduções. Ela não é relatada como porcentagens de tokens ou economias de custo, porque um inventário de bytes não estabelece essas coisas; uma avaliação pública pré-registrada está planejada para medir resultados adequadamente.

[Confiança e divulgação](https://deepworkplan.com/pt/trust)

## Ainda tem uma pergunta?

Abra uma discussão ou uma issue no GitHub. Perguntas que surgem com frequência são acrescentadas a esta página.

[Pergunte no GitHub](https://github.com/DailybotHQ/deepworkplan-website/issues)
