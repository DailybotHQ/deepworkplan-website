---
title: "DWP v5: as promessas, agora garantidas"
description: "Deep Work Plan v5 transforma oito promessas de longa data em contratos testados e versionados — um verificador honesto, orquestração segura e um caminho de atualização comprovado."
date: 2026-09-12
version: "v5 · Garantido por testes"
kind: release
lang: pt
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
sourceLinks:
  - label: "Commit de lançamento da skill ab1337d (v5.0.0)"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
  - label: "Lançamento da skill v5.4.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.4.0"
  - label: "Lançamento da skill v5.5.0"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.0"
  - label: "Lançamento da skill v5.5.1"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1"
  - label: "Release da skill v5.5.2"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.2"
  - label: "Release da skill v5.5.3"
    url: "https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3"
  - label: "Release do revisor v3.1.1"
    url: "https://github.com/DailybotHQ/ai-diff-reviewer/ai-diff-reviewer/releases/tag/v3.1.1"
---

Hoje lançamos o Deep Work Plan v5. Isto não é uma reescrita: são meses de uso real — incluindo uma auditoria direta de 108 planos reais — que foram revelando, lacuna por lacuna, onde as promessas da metodologia e o comportamento real de um agente podiam divergir. O resumo honesto deste lançamento: a metodologia já prometia tudo isto — agora ela garante. Antes do v5, um agente que seguisse a documentação à letra ainda podia terminar em cenários reais de falha; cada um deles, identificado por esse uso e esse feedback, agora está fechado e assegurado por um teste executável, e não remendado com mais prosa. A suíte de contratos da skill cresceu de 132 para 258 testes neste ciclo, e cada garantia abaixo foi validada ao vivo contra a tag publicada — instalada em um repositório limpo e levada pelos seus próprios fluxos antes desta entrada ser escrita.

**Um verificador que nunca alega um sucesso não verificado.** As verificações de conformidade antes degradavam em silêncio: sem um interpretador capaz, elas pulavam todas as verificações e ainda assim imprimiam um veredito conforme, e texto em negrito dentro de um campo podia ser confundido com um campo ausente. Agora o verificador termina com um veredito `UNVERIFIED` explícito sempre que não puder verificar de fato. Um verificador nunca relata um sucesso que não conferiu — a confiança nas portas de validação é toda a proposta, e uma porta que pode pular a própria checagem quebra a cadeia.

**Um único contrato de aprovação para planos Lite.** Três superfícies respondiam de três jeitos diferentes à pergunta "iniciar este plano aprova o escopo atual?", e um agente podia travar ou executar sem autorização exatamente na fronteira mais perigosa. O v5 assenta um contrato único em todo lugar: um execute ou resume explícito aprova o escopo ready atual e registra essa aprovação antes de executar qualquer trabalho; uma proposta pendente, sozinha, não autoriza nada; uma promoção interrompida é recuperada antes que qualquer trabalho de produto rode.

**Orquestração multi-repositório que não corrompe.** O override de ambiente de um hub orquestrador antes vazava para os repositórios filhos — um filho podia escrever estado de planos nas pastas do próprio hub. Os templates do orquestrador também imprimiam `FAIL` terminando com sucesso, e uma checagem de completude que fazia grep de uma string de status podia ler uma tarefa concluída como um plano concluído. Agora a raiz do hub é salva antes de navegar para os sub-repositórios, cada filho resolve o seu próprio `.dwp/` de forma isolada, cada ramo de falha termina com erro, a completude é lida do status de nível superior do plano e o entrypoint do devcontainer propaga erros de cópia antes de apagar qualquer coisa.

**Uma única matriz de consentimento de addons.** Qual addon instala por padrão, qual é apenas oferecido e qual revisão é obrigatória — as superfícies anteriores respondiam diferente. O v5 declara uma matriz: o AI Diff Reviewer é obrigatório para a revisão local, fixado a um release verificado, com a revisão em CI como opt-in explícito que nunca se autoinstala; o addon design-system é uma oferta obrigatória quando trabalho de UI é detectado, mas instala apenas com aceitação explícita; o addon dependency-upgrade chega como um delegator inerte quase padrão com reversão por snapshot exato; o dailybot reporta somente onde autorizado. Um diff vazio não conta mais como revisão concluída.

**Maquinaria real para planos longos.** Uma auditoria de 108 planos reais mostrou que trabalho paralelizável era comum, mas a decisão sequencial quase nunca era declarada, e stage gates existiam apenas como prática improvisada. O v5 faz a decisão de execução sempre ser declarada — sequencial com um motivo registrado quando o paralelismo não se justifica —, adiciona Stage Gates opcionais para planos de vinte ou mais tarefas e enriquece as Plan Variables com nível de rigor, barra de evidência e ações proibidas. Tudo isso carrega progressivamente e nunca onera um plano Lite.

**Contexto exigido, um objetivo por tarefa.** Planos podiam derivar em listas de tarefas sem contexto, e uma tarefa podia empacotar três objetivos atrás de uma única porta verde. O v5 exige o par Goal e Context no nível do plano, um Context por tarefa — o que uma sessão nova precisa para começar aquela tarefa sozinha — em cada novo registro (registros concluídos permanecem exatamente como escritos), e torna um objetivo por tarefa a regra normativa com uma guarda contra decaimento.

**Um caminho de atualização seguro.** O `/dwp-upgrade` é novo. Sua fase de checagem é somente leitura e não instala nada; uma atualização começa apenas com aceitação explícita, com adaptações locais comparadas e expostas antes de sobrescrever qualquer coisa; a instalação mira uma tag exata e verifica a si mesma; o onboarding roda de novo como um init fresco. Uma atualização nunca toca `.dwp/` — nenhum plano, arquivo de estado, registro de porta ou evidência é migrado, reescrito ou invalidado.

**Evidência honesta e mensurável.** Os claims de eficiência agora são remediidos em três baselines — v3.0.0, v4.0.3 e a árvore final — com o script de medição commitado no repositório. Os resultados são reportados em bytes de filesystem e nunca convertidos em números de tokens ou custos que não possamos sustentar, e todo claim não verificável fica em quarentena como tal no registro de avaliação.

**Um contrato versionado e publicado.** Cada promessa acima é sustentada por dados que outras ferramentas podem ler, não apenas por prosa: os formatos plan-manifest e plan-state agora são versionados como a linha de esquema v5 — [`plan-manifest/v5.json`](https://deepworkplan.com/schema/plan-manifest/v5.json) e [`plan-state/v5.json`](https://deepworkplan.com/schema/plan-state/v5.json) — de modo que um plano, um verificador ou uma ferramenta de terceiros pode checar a conformidade contra um contrato publicado e legível por máquina, em vez de um parágrafo de documentação. Nada na linha v5 muda de forma em relação à v2: planos existentes que referenciam os esquemas v1 ou v2 continuam válidos e nunca são reescritos.

O Deep Work Plan v5 segue o padrão DWP 5.0.0. Leia a [especificação normativa](https://deepworkplan.com/spec), consulte o [repositório da skill](https://github.com/DailybotHQ/deepworkplan-skill) ou comece a adoção pelo [`/init`](https://deepworkplan.com/init).

## Atualização — 2026-09-17 · skill v5.4.0

A primeira versão pontual da linha v5 fecha a última forma de um plano se dar por concluído sobre trabalho que nunca foi realmente verificado, e fixa onde vive a evidência do próprio plano. O padrão DWP 5.0.0 mantém-se: este é um lançamento de contrato de addon e documentação, não de esquema.

**Uma revisão que nunca correu já não é indistinguível de uma limpa.** O passe de segurança do Final Review já separava um revisor ausente — registado como resultado — de uma invocação que falhou, que avisa uma vez e continua. O revisor upstream acrescentou um terceiro desfecho: uma execução que arranca e termina sem escrever qualquer resultado. Sem nome próprio, confundia-se com "o passe completou-se e nada encontrou", o que permitiria fechar um plano sobre uma revisão que não aconteceu. É agora um estado próprio: fica registado como revisão incompleta, nunca conta como prova de que o conjunto de alterações está limpo, e nunca é motivo para fechar o Final Review. Três desfechos distintos — e nenhum significa que o diff foi lido e saiu limpo.

**A evidência de um plano pertence ao plano.** O padrão já colocava o registo de análise, o livro de skills, a revisão de segurança e os logs das comportas dentro do `analysis_results/` do próprio plano, mas nunca declarou essa exclusividade como regra. Por isso, as ferramentas de auditoria de um repositório, que escrevem por omissão no diretório de trabalho, podiam deixar a evidência de um plano na raiz do repositório sem que nenhum fluxo reparasse. A especificação passa a exigi-lo: tudo o que um fluxo produz sobre um plano vai para a pasta desse plano, e a uma ferramenta cuja saída por omissão é o diretório de trabalho tem de ser dada a sua opção de saída explícita. Evidência que não está onde o plano diz que está foi perdida — é essa a razão prática da regra, não uma preferência de arrumação.

**O pin do AI Diff Reviewer passa para v2.3.0.** A revisão local obrigatória instala agora um revisor que separa o runner do backend, de modo que a mesma revisão pode correr contra qualquer endpoint compatível sem mudar aquilo de que o DWP depende — a garantia de neutralidade sai reforçada, não enfraquecida. Traz também instaladores verificados por checksum, custos por omissão medidos em vez de presumidos, e rondas de seguimento que revêem o diff novo real transportando os resultados por resolver. Esta última tem uma consequência contratual que vale dizer sem rodeios: um modelo afirmar que um resultado está resolvido não o retira — quem o retira é uma pessoa que mantém o repositório.

**Os princípios de trabalho passam a viajar com o harness.** A `v5.5.0`, no mesmo dia, faz a integração ensinar aos agentes de um repositório *como* trabalhar, e não apenas o que o repositório contém: dez comportamentos compactos — assumir o resultado, investigar antes de perguntar, decidir o rotineiro de forma independente, escalar quando falta mesmo critério ou autorização, e verificar antes de declarar concluído, entre outros — escritos inline no `AGENTS.md`, onde os encontrará um agente que só lê o ponto de entrada. São valores por omissão dentro de um pedido, nunca autoridade nova: não podem anular permissões do host, um âmbito mais estreito, as comportas de um plano ou as regras de aprovação do próprio repositório. Uma atualização reconcilia-os por significado e não por palavra-chave, pelo que regras equivalentes já existentes são mantidas em vez de reescritas.

**O pin do AI Diff Reviewer passa para v2.3.1.** A skill `v5.5.1` instala o revisor cujo check, corpo da revisão e comentário de seguimento coincidem. Um corpo que diz `Recommendation: approve` não é prova de que o check tenha passado — leia o bloco Check status do marcador de seguimento. Em modo advisory, uma correção corroborada pode retirar um resultado cujo fio já está colapsado, de modo que um PR preso pode passar a verde após uma correção real.


Leia a [especificação](https://deepworkplan.com/spec) para o texto normativo, a [referência do addon](https://deepworkplan.com/kit/ai-diff-reviewer) para o que o revisor faz agora, ou o [lançamento v5.5.1](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.1) para a fonte.

## Atualização — 2026-09-25 · skill v5.5.3 + revisor v3.1.1

O addon de AI Diff Reviewer agora documenta e instala a linha **v3** do revisor, lançada em 2026-09-24 (v3.0.0 → v3.1.1, pin móvel `@v3`). A skill `v5.5.2` reescreveu os documentos normativos do addon, o hook de onboarding e o template de integração em torno do que o revisor v3 realmente faz, e a `v5.5.3` embarcou o lado de CI. As mudanças de maior peso, verificadas contra o revisor publicado na tag `v3.1.1`:

**Um `critical` só filtra quando verificado.** Desde a v3, cada resultado crítico que um modelo afirma —mais uma amostra de 30 % dos avisos— recebe uma segunda verificação breve ancorada no código por uma chamada de modelo separada (≈ 3 k tokens, 10 s e $0.009 por resultado verificado). Um `critical` é publicado —e bloqueia o Final Review— apenas quando esse verificador o confirma; as afirmativas refutadas continuam visíveis como avisos anotados e são listadas na saída estruturada, nunca inline. Uma revisão que esgota o seu teto de turnos (`incomplete`) ou o seu relógio (`timeout`) é vermelha sob rigor bloqueante: «sem resultados» significa agora sempre que o revisor olhou e não encontrou nada.

**O orçamento segue o nível de risco.** O orçamento de revisão deriva do nível de risco determinista da alteração —8/20/30/40 turnos de `low` a `critical`— e um push que não muda código executa uma ronda apenas do verificador com −93 % de custo. `budget-profile: fixed` restaura as constantes anteriores à v3 durante a transição; as rondas incrementais cortam os tokens de entrada entre 62 e 76 %.

**Seis sub-skills, uma delas um ciclo.** O router ganha `address-review` (nova na v3.1.1): uma única invocação encontra os PR abertos do ramo, verifica que a revisão cobre o head atual, apresenta os resultados e —com um único sim— aplica, faz commits em lotes pequenos de Conventional Commits, faz push e rearma o revisor da forma como o repositório o dispara. `apply-review` continua apenas de leitura; a saída estruturada (`review-output/3.0`) é o caminho para máquinas de qualquer automação. A linha `@v2` permanece congelada em `release/v2` com seis meses de manutenção de segurança e catálogo — a v3 é a recomendação, nunca uma migração forçada.

**O revisor agora revê as suas próprias casas.** O repositório da skill e este site executam ambos uma revisão de CI ativada por etiqueta —uma perna única de grok via `DailybotHQ/ai-diff-reviewer@v3`, disparada uma vez por aplicação da etiqueta `ready` (remova e volte a adicioná-la para repetir), com um salto honesto quando o secret do fornecedor não existe. Este site também vendoriza o revisor v3.1.1, de modo que o Final Review local e a documentação ensinam agora o mesmo contrato.

Leia a [especificação](https://deepworkplan.com/spec), a [referência do addon](https://deepworkplan.com/kit/ai-diff-reviewer) para a lista completa de capacidades v3, a [release v5.5.3](https://github.com/DailybotHQ/deepworkplan-skill/releases/tag/v5.5.3) para a fonte, ou a [release v3.1.1 do revisor](https://github.com/DailybotHQ/ai-diff-reviewer/releases/tag/v3.1.1) para o que mudou upstream.
