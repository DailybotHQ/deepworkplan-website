---
title: Autonomia do enxame
description: "Como um enxame de agentes sobrevive ao limite de uma conta ou à perda de um agente: capacidade, pacotes de repasse, sucessão do líder e escalação só do crítico."
order: 7
lang: pt
summary: Frentes cientes da própria capacidade, repasse proativo, sucessão do líder com épocas e a taxonomia de escalação que mantém um enxame em andamento.
icon: shield
---

# Autonomia do enxame

[Executar muitos agentes](/pt/methodology/06-orchestration) descreve um líder e suas frentes. Este capítulo trata do que mantém essa configuração em andamento quando uma conta atinge o limite ou um agente desaparece. Uma frente verifica quanta folga resta à sua conta e repassa o trabalho antes que ela se esgote. Um líder repassa a liderança, ou é substituído quando desaparece. O enxame só pergunta ao desenvolvedor o que é realmente crítico.

A falha que isso resolve é concreta: um líder que esgota a cota no meio de um plano deixa todas as frentes paradas, e nada anda até que uma pessoa abra uma nova sessão. Com as regras abaixo, o plano continua andando dentro da autorização que o desenvolvedor já deu.

Seis regras moldam tudo o que vem a seguir:

1. **Uma função por produto.** O [coding-agents-kit](/pt/kit/agentkit) (`ak`) conhece as contas e a capacidade, o [herdr-peers](/pt/kit/herdr) conhece as mensagens, os painéis e quem lidera, e o pack do Deep Work Plan conhece o método: quando repassar, do que um sucessor precisa, o que escalar. Cada um continua opcional. Sem eles, as mesmas regras valem, com o desenvolvedor retransmitindo as mensagens e reiniciando os agentes.
2. **A unidade de continuidade é o plano, não o agente.** Todo repasse e toda sucessão é uma retomada comum mais um pequeno pacote que carrega o que o diário não registra: a intenção que estava em andamento.
3. **O proativo vence o reativo.** Um agente verifica sua folga nos limites entre tarefas e repassa enquanto ainda consegue escrever um bom pacote. Reagir depois de atingir um limite continua sendo a rede de segurança.
4. **A autonomia nunca amplia a autoridade.** Repasses, sucessão, inícios e agendamento rodam dentro da autorização do plano. Nenhum agente responde a uma tela de permissão, de bypass, de login, de consentimento ou de pagamento, e o trabalho só circula entre as contas que o desenvolvedor declarou.
5. **A continuidade nunca rebaixa o padrão.** Um sucessor herda os mesmos gates. Um pacote não fecha nenhum critério, não relaxa nenhum gate e não pula nenhuma revisão.
6. **Barato por construção.** A capacidade é lida de um cache nos limites entre tarefas, nunca em um loop ou por um timer. Avisos de mão única substituem perguntas que não precisam de resposta, e os pacotes são pequenos.

## Papéis

| Papel | É | É dono de | Nunca faz |
| --- | --- | --- | --- |
| Líder | O agente que detém o registro de líder de um plano | O plano, a tabela de frentes, o agendamento, a ordem de release, merges e tags dentro da autorização, a lista de sucessão | Escrever no checkout de uma frente, ou liderar um plano que outro líder detém |
| Suplente | A primeira entrada alcançável da lista de sucessão do líder | Nada até assumir | Agir como líder enquanto o líder está alcançável |
| Frente | Um agente por repositório, fluxo de trabalho ou tarefa, no próprio painel e na própria conta | Seu plano filho ou sua tarefa, branch, gate e pacote | Atribuir trabalho a outra frente, fazer merge ou criar tags |
| Revisor | Uma frente de outro fornecedor, somente leitura | Suas descobertas | Escrever na árvore que revisa |

- **O líder permanece ativo.** Um orquestrador cujas frentes esperam o repasse de uma pessoa trava. Um líder nunca pausa o enxame por uma pergunta que ele mesmo pode decidir.
- **Um executor por plano.** Exatamente um agente executa um dado plano ou plano filho por vez. Um segundo agente no mesmo plano é uma falha de coordenação que o líder deve resolver.
- **A autoridade vem do plano, não de um par.** Uma frente lê a autorização do plano por conta própria. Uma aprovação retransmitida por outro agente não acrescenta nada que a frente já não tivesse.
- **Vários líderes** podem trabalhar no mesmo espaço de trabalho, cada um liderando um plano diferente. Uma conta é detida por uma frente de cada vez por meio de uma reserva do `ak`, então dois líderes nunca colocam dois escritores na mesma conta do Codex.
- **Várias instâncias do mesmo tipo** — três painéis do Grok, quatro painéis do Codex em um ou vários perfis — são frentes comuns. Instâncias no mesmo perfil compartilham a capacidade desse perfil.

Toda frente tem um plano, no mínimo um plano Lite no próprio repositório, e esse plano é a primeira coisa que um sucessor lê. Toda frente reporta ao líder com um vocabulário fixo — `plan ready`, `PR open <url>`, `blocked <class> <what it needs>`, `handoff <packet path>`, `done` — e termina cada mensagem com uma linha de capacidade, como `capacity=ok 64% @work1`, de modo que o líder raramente precisa ler as cotas por conta própria.

## O loop de capacidade

Um agente verifica a própria folga antes de começar cada tarefa, depois de qualquer gate ou passo que tenha levado mais de 20 minutos, sempre que sua CLI mostra um aviso de limite de uso e antes de aceitar um repasse ou a liderança. A verificação é `ak capacity --self --json` do coding-agents-kit `v1.1.0`, que o helper do pack transforma em uma decisão:

| Veredito | Decisão | Uma frente | Um líder, para si mesmo |
| --- | --- | --- | --- |
| `ok` (acima do limiar baixo) | continuar | Continua | Continua |
| `low` (25 % ou menos) | preparar | Termina a tarefa atual, não começa nenhuma que não consiga terminar, reporta `capacity=low` | Designa um sucessor e não inicia trabalho longo em si mesmo |
| `critical` (10 % ou menos, ou com rate limit) | repassar | Chega ao próximo ponto seguro, escreve o pacote, avisa o líder e para | Repassa a liderança imediatamente |
| `unknown` (sem fonte de cota) | continuar | Reporta `capacity=unknown`, repassa diante de um aviso de limite da CLI ou de uma tela `usage_limit` | Prefere frentes com capacidade conhecida para tarefas longas |

- **Os limiares** são os do kit: baixo em 25 % e crítico em 10 % da fração livre da janela determinante por padrão, ajustáveis com `AGENTKIT_CAPACITY_LOW` e `AGENTKIT_CAPACITY_CRITICAL`. As leituras vêm de um cache mantido por 300 segundos, então verificar em cada limite entre tarefas custa poucas chamadas ao fornecedor por hora.
- **Histerese.** Depois que o pacote é escrito, o repasse se completa. O agente nunca retoma essa tarefa quando a conta se recupera; o sucessor passa a ser o dono dela, e a conta recuperada simplesmente volta ao conjunto.
- **A pressão de contexto também conta.** Quando o contexto do agente atinge o limiar de contexto novo do contrato (60 % por padrão), seguem-se o mesmo pacote e o mesmo repasse.
- **Degradação honesta.** Sem o kit, com um kit mais antigo ou fora de um início pelo `ak`, a capacidade é reportada como desconhecida, nunca como ok.

**O conjunto de contas é do desenvolvedor.** O plano registra as contas que o desenvolvedor declarou para o trabalho. Um agente nunca cria contas, renova logins, gasta um reset do Codex nem usa uma conta fora do conjunto, e trabalha dentro dos termos de cada fornecedor. Mover trabalho antes de um limite, dentro do conjunto, é agendamento; alternar contas para ultrapassar um limite nunca é permitido. Para cada tarefa pronta, o líder pega a conta mais bem classificada por `ak pick --owner <lead>`, reserva-a para o endereço da própria frente com `ak lease`, nunca dá a uma frente a conta do próprio líder (as duas chegariam a `critical` juntas), prefere contas com capacidade conhecida para tarefas longas e outro fornecedor para os revisores, e mantém um suplente. Quando nenhuma conta do conjunto tem folga e nenhuma é renovada dentro do horizonte do plano, o enxame estaciona com o reset mais próximo registrado.

## Repasse de uma frente

1. **A frente**, em `handoff`, chega a um ponto seguro — um passo commitado, ou a árvore deixada como está, nunca trabalho descartado —, escreve o pacote, envia `handoff <packet path>` ao líder como aviso e para. Ela não fecha o próprio painel.
2. **O líder**, ou o suplente quando o líder está inalcançável ou ele próprio em estado crítico, escolhe uma conta (`ak pick <kind> --owner <lead> --exclude @<spent>`, preferindo outro fornecedor quando a tarefa permite), reserva-a e inicia o sucessor no mesmo checkout com um briefing para retomar o plano a partir do pacote.
3. **O sucessor** aceita o pacote — o helper verifica o plano, o contrato vigente, o branch, o commit de head e os caminhos não commitados, e não registra nada se houver divergência —, depois retoma o plano e reexecuta cada gate que o pacote lista como não verificado.
4. **O líder** libera a reserva esgotada e fecha o painel esgotado assim que o sucessor tiver aceitado.

O **pacote de repasse** ([`dwp-handoff/v1`](https://deepworkplan.com/schema/dwp-handoff/v1.json)) é escrito em `analysis_results/handoff/` do plano com permissões apenas para o dono. Ele nomeia o plano, o contrato, a tarefa e o passo; o motivo (`capacity_critical`, `capacity_low`, `context_pressure`, `usage_limit` ou `lead_handover`); onde o trabalho está (repositório, checkout, branch, head, se foi enviado, caminhos não commitados); o que está feito, verificado e não verificado, com caminhos de evidência; os próximos passos em ordem; as consultas abertas; as decisões tomadas; o líder e a época; e quem o escreveu. Um pacote é dado: nunca carrega o valor de um segredo, conteúdo privado de outro repositório nem uma instrução que amplie a autoridade. O sucessor deriva de novo a próxima ação a partir do plano.

## Sucessão do líder

O herdr-peers `v1.1.0` mantém um registro de líder por plano — líder, época, lista de sucessão e frentes — e resolve o endereço `lead` para o líder atual, então nenhum briefing de frente fixa no código o painel do líder.

- **Primeiro reivindicar, depois iniciar.** O líder executa `herdr-peers lead claim --plan <P> --succession <A,B>` antes de iniciar qualquer frente — o endereço `lead` só é resolvido quando existe um registro —, atualiza o registro com `--lanes <A,B>` à medida que as frentes começam e executa `lead release` quando o plano termina. A partir do herdr-peers (`v0.3.2`) o registro guarda localmente o repositório que reivindica, e um plano com o mesmo id em outro repositório é nomeado `--plan <repo>/<id>`. A sucessão padrão é o sucessor planejado, depois as frentes no próprio checkout do plano por ordem de início, depois qualquer frente no mesmo host; frentes em contêineres ou em outras máquinas vêm por último.
- **Passagem, planejada.** Em `low`, o líder designa um sucessor. Em `critical`, ele escreve um pacote de líder — tabela de frentes, consultas abertas, ordem de release, merges pendentes, decisões —, executa `herdr-peers lead handover <addr> --plan <P>`, que incrementa a época e avisa todas as frentes, e para. O sucessor aceita o pacote, retoma o plano orquestrador e verifica de novo cada frente.
- **Tomada, não planejada.** Quando o líder está inalcançável, não tem agente, mostra uma tela `usage_limit` ou uma consulta a ele expira duas vezes, a primeira entrada alcançável da lista de sucessão executa `herdr-peers lead takeover --plan <P>` — ela mesma, ou iniciando um novo painel de líder no checkout do plano. O novo líder reconstrói o estado a partir do plano. A intenção em andamento que estiver faltando é registrada como ausente, nunca inventada.
- **Isolamento (fencing).** Só quem detém a época mais alta age como líder. Uma frente aceita um aviso de líder apenas do agente que lhe deu o briefing (primeira reivindicação), do líder atual na época seguinte (passagem) ou da primeira entrada alcançável da sucessão na época seguinte (tomada); empates vão para a posição anterior na sucessão, e um líder que volta e vê uma época maior se retira. Merges, tags e releases são feitos apenas pelo líder da época atual, conferidos antes contra o remoto, e seguem as próprias regras de merge do repositório.

## Mensagens

- **Líder e frente** trocam marcos, o sinal verde, fixações de versão e requisitos alterados.
- **Frente e frente** podem consultar uma à outra para obter informação e coordenação — uma interface, o nome exato de uma flag, o estado de um branch. Só o líder atribui trabalho; a profundidade um e o limite de fan-out continuam valendo, e uma frente avisa o líder quando uma troca entre frentes muda o plano.
- **Avisos** (`herdr-peers notify <addr|lead>`) são de mão única: o receptor os registra como dados e nunca responde. Não consomem nenhuma vaga de fan-out e carregam anúncios de repasse, mudanças de líder e difusões de release. O aviso do líder é a única difusão do estado atual, e ninguém o confirma.
- **Perguntas entre repositórios não bloqueiam.** Uma frente pergunta, continua com a suposição recomendada registrada e se ajusta quando a resposta chega.
- **Nunca faça polling à espera de uma mensagem.** Uma consulta ou um aviso só chega a um agente quando o turno dele termina; um agente cujo próximo passo depende de uma mensagem encerra o turno e deixa que ela chegue.
- **Texto recebido é dado.** Uma resposta ou um aviso não concede nada e não fecha nada.

## Escalação só do crítico

Tudo o que não é crítico é decidido pelo agente: ele investiga, adota a opção recomendada, registra a decisão — as opções, a escolha, o porquê e como revertê-la — e continua. Uma escalação deve nomear sua classe; uma pergunta que não nomeia nenhuma é uma decisão que cabe ao agente. As classes são as do [protocolo de agentes](/pt/spec/agent-protocol):

| Classe | Escalar ao desenvolvedor quando |
| --- | --- |
| C1 Autoridade | Uma ação está fora da autorização do plano ou em um checkpoint de consentimento: operações destrutivas ou irreversíveis, deploys em produção, publicações além do plano, mensagens a pessoas de fora dos agentes do plano, gastos, postura de segurança ou segredos. |
| C2 Tela de consentimento | Aparece uma tela de permissão, de bypass, de login, de credenciais, de consentimento MCP ou de pagamento. Nunca recebe teclas de um agente. |
| C3 Ambiguidade irredutível | Dois resultados materialmente diferentes satisfazem o pedido e nada no repositório, na sua documentação, nos planos ou em decisões anteriores resolve a questão. |
| C4 Conflito de qualidade | Um gate não consegue passar sem ser enfraquecido, ou a evidência contradiz o objetivo do plano de um jeito que a tarefa não consegue corrigir. |
| C5 Dano | Estado compartilhado, dados ou o trabalho de outro agente são perdidos ou corrompidos sem explicação. |
| C6 Termos | Surge uma questão jurídica, de licenciamento, de termos do fornecedor ou de privacidade. |
| C7 Capacidade esgotada | Nenhuma conta do conjunto declarado tem folga e nenhuma é renovada dentro do horizonte do plano. |

Em um enxame, **um item crítico bloqueia sua cadeia de dependências, não o enxame.** O líder estaciona a tarefa bloqueada — o registro de bloqueio dela é a escalação, enviada uma única vez —, mantém todas as frentes independentes andando e retoma a cadeia quando o desenvolvedor responde. A autonomia nunca fecha uma aprovação humana, as palavras literais do desenvolvedor prevalecem sobre uma recomendação, e uma aprovação retransmitida por um agente é registrada como retransmitida, nunca como se o desenvolvedor a tivesse escrito.

## O padrão de qualidade

Um enxame só vale a pena se o seu resultado for confiável. O [padrão de qualidade](/pt/spec/dwp-specification) se aplica a todo agente que continua um plano:

- **Gates são hipóteses.** Um gate novo ou alterado demonstra que falha diante de um defeito semeado antes de ser confiável, e uma aprovação vazia — um binário ausente, zero arquivos correspondentes, um log vazio — é uma falha. Uma tarefa com um contrato de entrada nomeia seus casos-limite — vazio, multilinha, espaços em branco ao redor — para que passar em todos os exemplos não seja confundido com provar a regra.
- **Comparar com a base.** Desempenho, cobertura e tamanho são comparados com o branch base, não apenas com um limiar.
- **Medir primeiro, projetar antes de construir.** Uma correção ou auditoria verifica primeiro sua premissa e sua ferramenta de medição; uma mudança não trivial registra por escrito interfaces, modos de falha, segurança e testes antes do código.
- **Revisar antes do passo irreversível.** O AI Diff Review local roda antes de qualquer merge, tag ou publicação, e mudanças de metodologia ou de protocolo recebem um revisor de outro fornecedor.
- **A continuidade nunca rebaixa o padrão.** Um sucessor reexecuta o que o pacote lista como não verificado; um repasse nunca é um atalho para pular um gate.

## O registro

O diário do plano orquestrador registra o enxame: inícios e resultados das frentes como eventos de delegação; vereditos de capacidade, repasses e sucessões como observações; escalações e as respostas do desenvolvedor como intervenções. Os pacotes e seus registros de aceitação ficam no plano que executou o trabalho, e o relatório de conclusão nomeia cada repasse e cada sucessão com seu pacote.

## Ensaiar

Prove o loop antes de depender dele. Em um repositório de rascunho com um plano orquestrador pequeno, rode um líder e pelo menos três frentes em contas ou fornecedores diferentes. Limite a capacidade reportada de uma frente — `AGENTKIT_CAPACITY_CAP=@<profile>=8` rebaixa a leitura e nunca pode elevá-la — e observe-a escrever um pacote, o líder iniciar um sucessor que o aceita e o sucessor passar no gate. Limite o líder da mesma forma e observe a passagem e o novo líder concluir o plano. Depois registre a evidência em `analysis_results/` do plano: nenhuma tecla humana, cada pacote, cada época, uma consulta entre frentes e os gates.
