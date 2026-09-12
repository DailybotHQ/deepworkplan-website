---
title: "DWP v5: as promessas, agora garantidas"
description: "Deep Work Plan v5 transforma oito promessas de longa data em contratos testados — um verificador honesto, uma única regra de aprovação, orquestração que não corrompe e um caminho de atualização seguro."
date: 2026-09-12
version: "v5 · Garantido por testes"
kind: release
lang: pt
order: 1
featured: true
sourceLabel: "Skill release commit ab1337d"
sourceUrl: "https://github.com/DailybotHQ/deepworkplan-skill/commit/ab1337d"
---

Hoje lançamos o Deep Work Plan v5. O resumo honesto deste lançamento: a metodologia já prometia tudo isto — agora ela garante. Antes do v5, um agente que seguisse a documentação à letra ainda podia terminar em cenários reais de falha; cada um deles agora está fechado e assegurado por um teste executável. A suíte de contratos da skill cresceu de 132 para 258 testes neste ciclo, e cada garantia abaixo foi validada ao vivo contra a tag publicada — instalada em um repositório limpo e levada pelos seus próprios fluxos antes desta entrada ser escrita.

**Um verificador que nunca alega um sucesso não verificado.** As verificações de conformidade antes degradavam em silêncio: sem um interpretador capaz, elas pulavam todas as verificações e ainda assim imprimiam um veredito conforme, e texto em negrito dentro de um campo podia ser confundido com um campo ausente. Agora o verificador termina com um veredito `UNVERIFIED` explícito sempre que não puder verificar de fato. Um verificador nunca relata um sucesso que não conferiu — a confiança nas portas de validação é toda a proposta, e uma porta que pode pular a própria checagem quebra a cadeia.

**Um único contrato de aprovação para planos Lite.** Três superfícies respondiam de três jeitos diferentes à pergunta "iniciar este plano aprova o escopo atual?", e um agente podia travar ou executar sem autorização exatamente na fronteira mais perigosa. O v5 assenta um contrato único em todo lugar: um execute ou resume explícito aprova o escopo ready atual e registra essa aprovação antes de executar qualquer trabalho; uma proposta pendente, sozinha, não autoriza nada; uma promoção interrompida é recuperada antes que qualquer trabalho de produto rode.

**Orquestração multi-repositório que não corrompe.** O override de ambiente de um hub orquestrador antes vazava para os repositórios filhos — um filho podia escrever estado de planos nas pastas do próprio hub. Os templates do orquestrador também imprimiam `FAIL` terminando com sucesso, e uma checagem de completude que fazia grep de uma string de status podia ler uma tarefa concluída como um plano concluído. Agora a raiz do hub é salva antes de navegar para os sub-repositórios, cada filho resolve o seu próprio `.dwp/` de forma isolada, cada ramo de falha termina com erro, a completude é lida do status de nível superior do plano e o entrypoint do devcontainer propaga erros de cópia antes de apagar qualquer coisa.

**Uma única matriz de consentimento de addons.** Qual addon instala por padrão, qual é apenas oferecido e qual revisão é obrigatória — as superfícies anteriores respondiam diferente. O v5 declara uma matriz: o AI Diff Reviewer é obrigatório para a revisão local, fixado a um release verificado, com a revisão em CI como opt-in explícito que nunca se autoinstala; o addon design-system é uma oferta obrigatória quando trabalho de UI é detectado, mas instala apenas com aceitação explícita; o addon dependency-upgrade chega como um delegator inerte quase padrão com reversão por snapshot exato; o dailybot reporta somente onde autorizado. Um diff vazio não conta mais como revisão concluída.

**Maquinaria real para planos longos.** Uma auditoria de 108 planos reais mostrou que trabalho paralelizável era comum, mas a decisão sequencial quase nunca era declarada, e stage gates existiam apenas como prática improvisada. O v5 faz a decisão de execução sempre ser declarada — sequencial com um motivo registrado quando o paralelismo não se justifica —, adiciona Stage Gates opcionais para planos de vinte ou mais tarefas e enriquece as Plan Variables com nível de rigor, barra de evidência e ações proibidas. Tudo isso carrega progressivamente e nunca onera um plano Lite.

**Contexto exigido, um objetivo por tarefa.** Planos podiam derivar em listas de tarefas sem contexto, e uma tarefa podia empacotar três objetivos atrás de uma única porta verde. O v5 exige o par Goal e Context no nível do plano, um Context por tarefa — o que uma sessão nova precisa para começar aquela tarefa sozinha — em cada novo registro (registros concluídos permanecem exatamente como escritos), e torna um objetivo por tarefa a regra normativa com uma guarda contra decaimento.

**Um caminho de atualização seguro.** O `/dwp-upgrade` é novo. Sua fase de checagem é somente leitura e não instala nada; uma atualização começa apenas com aceitação explícita, com adaptações locais comparadas e expostas antes de sobrescrever qualquer coisa; a instalação mira uma tag exata e verifica a si mesma; o onboarding roda de novo como um init fresco. Uma atualização nunca toca `.dwp/` — nenhum plano, arquivo de estado, registro de porta ou evidência é migrado, reescrito ou invalidado.

**Evidência honesta e mensurável.** Os claims de eficiência agora são remediidos em três baselines — v3.0.0, v4.0.3 e a árvore final — com o script de medição commitado no repositório. Os resultados são reportados em bytes de filesystem e nunca convertidos em números de tokens ou custos que não possamos sustentar, e todo claim não verificável fica em quarentena como tal no registro de avaliação.

O Deep Work Plan v5 segue o padrão DWP 4.0.0. Leia a [especificação normativa](https://deepworkplan.com/spec), consulte o [repositório da skill](https://github.com/DailybotHQ/deepworkplan-skill) ou comece a adoção pelo [`/init`](https://deepworkplan.com/init).
