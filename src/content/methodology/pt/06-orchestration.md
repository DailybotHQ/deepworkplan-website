---
title: Executar muitos agentes
description: "Como um agente líder executa várias frentes em painéis, contêineres e outras máquinas, com contas escolhidas por folga e um branch e um release por repositório."
order: 6
lang: pt
summary: O modelo de líder e frentes para orquestrar muitos agentes entre painéis, máquinas, contas e repositórios.
icon: network
---

# Executar muitos agentes

Um agente em um plano é o padrão, e cobre a maior parte do trabalho. Algum trabalho é mais amplo que uma sessão: uma mudança que atravessa vários repositórios, um release que precisa sair em ordem ou um backlog que levaria dias para um único agente. O DWP escala para esse trabalho sem mudar seu contrato. O plano continua sendo a fonte da verdade, cada tarefa continua fechando no seu próprio gate, e os agentes extras são **frentes** (lanes) que um **líder** (lead) coordena.

Este capítulo descreve o modelo. Ele usa três addons opcionais — [Herdr](/pt/kit/herdr) para painéis e pares, [agentkit](/pt/kit/agentkit) para contas e [devcontainer](/pt/kit/devcontainer) para contêineres —, e nenhum deles é necessário para um plano de um único agente.

## Um líder e suas frentes

O **líder** é dono do plano pai. Ele decide as frentes, entrega a cada uma seu escopo, recolhe os marcos e dá o sinal que permite a uma frente fazer merge ou release. Ele não escreve o código de outra frente.

Uma **frente** é um agente com um escopo, normalmente um repositório. Ela lê o `AGENTS.md` desse repositório, roda o gate desse repositório e mantém o próprio plano dentro do repositório. Em um [hub orquestrador](/pt/methodology/05-archetypes), o plano pai vive em `.dwp/plans/` do hub, com uma tabela de acompanhamento dos planos filhos, e o plano de cada frente vive no próprio repositório, usando os IDs de plano e o gate desse repositório.

| Papel | É dono de | Nunca faz |
| --- | --- | --- |
| Líder | O plano pai, a lista de frentes, a ordem de release, o GO | Editar o repositório de uma frente |
| Frente | Um repositório: seu branch, plano, gate e pull request | Fazer merge ou release antes do GO do líder |

## Onde as frentes rodam

Uma frente é um agente em um painel de terminal, e o painel pode ficar em vários lugares. O [Herdr](https://herdr.dev) coloca cada agente em um painel e alcança outras máquinas por SSH, então o líder vê todas as frentes em uma única barra lateral.

- **No host.** Um painel por frente, lado a lado com o do líder. A configuração mais rápida, para repositórios em que o desenvolvedor já trabalha.
- **Em um contêiner.** Um contêiner do [devcontainer-kit](/pt/kit/devcontainer) entra na malha do Herdr no `dck up`: seus agentes alcançam o host e os outros contêineres, e o host os alcança. O contêiner é a sandbox, então seus agentes podem rodar em autonomia.
- **Em outra máquina.** Qualquer máquina que o Herdr alcance por SSH hospeda frentes da mesma forma, com o herdr-peers instalado lá também.

O lugar muda o isolamento, não o protocolo: uma frente em um contêiner e uma frente no host se coordenam com o líder do mesmo jeito.

## Contas e fornecedores por folga

Muitos agentes gastam cota rápido. Cada frente roda na própria conta — uma CLI e um perfil no [coding-agents-kit](/pt/kit/agentkit) —, então as frentes não esgotam a mesma janela, e uma conta que atinge um limite para uma frente, não todas.

- **`ak usage`** mostra a cota restante de cada conta e perfil, uma vez por lote.
- **`ak pick <kind> --count N`** devolve as N contas com mais folga, a melhor primeiro; `--exclude` deixa de fora uma conta ocupada, `--model` conta a janela de um modelo e `--need` se recusa a começar sem folga suficiente.
- **`ak <kind> @<profile>`** inicia o agente da frente nessa conta, no seu painel.

Os fornecedores se misturam da mesma forma. Uma frente de Claude pode escrever enquanto uma frente de Codex revisa, cada uma na conta que o `ak pick` escolheu para o seu tipo. Uma frente em contêiner pode usar as contas do host: com `host_profiles` ativado no perfil de host do devcontainer-kit do desenvolvedor, um contêiner recebe os perfis do host das CLIs que o repositório instala — Claude por meio de um token de longa duração por perfil, Codex por meio do seu arquivo de autenticação — e não precisa de login próprio. Use apenas as suas próprias contas e respeite os termos de cada fornecedor: distribua o trabalho entre elas, nunca alterne contas para contornar um limite.

## Iniciar e desbloquear frentes sem uma pessoa

Um líder pode iniciar frentes e mantê-las andando sem ninguém no teclado. Depois que o desenvolvedor concede operação não assistida — uma instrução permanente ou a pré-autorização do plano —, cada início não precisa de nenhuma outra aprovação. O líder usa os próprios comandos do Herdr; nenhum código do kit envia teclas. O procedimento tem uma ordem fixa: preparar uma vez, evitar o prompt, detectar a parada, enviar teclas em um único caso e escalar o resto.

1. **Preparar uma vez, como desenvolvedor.** O Claude Code pede, uma vez por perfil, a confirmação do seu modo de bypass de permissões (bypass-permissions). Essa confirmação é um passo do próprio desenvolvedor, feito quando o perfil é criado; em um contêiner do devcontainer-kit, o kit a grava apenas nos homes do próprio contêiner. Nenhum agente jamais envia teclas para ela.
2. **Evitar.** `ak pick <kind>` aponta a conta com mais folga, e `herdr pane run <pane> 'ak <kind> @<profile> --trust-cwd'` inicia a frente na própria pasta. `--trust-cwd` (ou `AGENTKIT_TRUST_CWD=1`) confia previamente nessa pasta, então o Claude e o Codex pulam suas telas de confiança de pasta sem nenhuma tecla.
3. **Detectar.** `herdr-peers lanes` (ou `herdr agent list`) mostra cada frente como trabalhando, ociosa, bloqueada ou concluída. Para uma frente bloqueada, ou ociosa sem saída, `herdr-peers status <pane>` classifica a tela em que ela está — confiança de pasta, confirmação de bypass de permissões, login, permissão ou desconhecida — com o próximo passo documentado, e `herdr pane read <pane>` a mostra.
4. **Uma tecla, um caso.** As únicas teclas que um líder pode enviar são a resposta a uma tela de confiança de pasta, em um painel que ele mesmo iniciou, quando `--trust-cwd` não estava disponível. Ele lê a tela antes de enviar teclas, envia o mínimo de teclas que a respondem e lê de novo.
5. **Ler, registrar e escalar todo o resto.** A confirmação do modo de bypass de permissões do Claude, prompts de login e de credenciais, pedidos de permissão por ação, confirmações destrutivas, telas de pagamento ou de plano, telas desconhecidas e painéis que o líder não criou vão para o desenvolvedor como um marco de bloqueio, nunca como teclas.
6. **O opt-out prevalece.** Com `AGENTKIT_PERMISSIONS=ask`, as frentes perguntam antes de agir, e o líder nunca contorna um prompt que o opt-out traz.
7. **Reiniciar.** Se um agente encerra, o líder o inicia de novo na mesma conta ou escolhe outra. Um login perdido é um prompt de credenciais: ele é escalado.

Cada intervenção — o que a tela mostrava, quais teclas foram enviadas, o que aconteceu depois — é registrada no plano pai.

## Coordenação pelo herdr-peers

As frentes e o líder conversam pelo [herdr-peers](/pt/kit/herdr): uma **consulta** (ask) carrega um selo que autoriza exatamente uma **resposta** (reply), e cada troca fica registrada. O líder mantém o protocolo pequeno:

- **Marcos para cima.** Cada frente reporta em pontos fixos — plano pronto, pull request aberto, bloqueada, concluída — e continua trabalhando entre eles sem esperar resposta.
- **Perguntas como consultas.** Uma frente que precisa de uma decisão consulta o líder; o líder responde com uma resposta.
- **Profundidade um.** Uma resposta nunca é respondida, e uma frente não delega adiante. O fan-out por chamador é limitado, a quatro pares por padrão.
- **Dados, não instruções.** Uma resposta não concede nada que o receptor já não tivesse. A afirmação de uma frente de que seu gate passou é verificada rodando o gate.
- **Um registro de quem fez o quê.** Cada registro de delegação nomeia a conta e o fornecedor da frente, então o plano pai mostra qual conta realizou qual trabalho.
- **Lanes do Codex nomeiam seu painel.** O Codex executa os comandos de uma lane a partir de um servidor em segundo plano compartilhado por todas as sessões daquela conta, então o id de painel herdado pode ser de outra lane. Uma lane do Codex passa o próprio painel, tirado do briefing do líder, com `--pane <pane>` em cada verbo do herdr-peers (`ask`, `reply`, `notify`, `check`, `wait`, `lanes`, `cancel`).

O líder pode ver toda a orquestra de uma vez: `herdr-peers lanes` lista cada frente com seu estado, e o [DeepWorkPlan Vim](/pt/kit/vim) mostra as frentes de um plano orquestrador ao lado do próprio plano (`:DwpLanes`).

## Um branch, um release por repositório

A regra que mantém muitas frentes revisáveis é simples: **uma frente por repositório, no seu checkout base, com um branch, um pull request e um release** para toda a mudança. A frente não divide o trabalho entre vários branches ou worktrees. Worktrees servem apenas para o caso em que dois escritores precisam compartilhar um repositório: cada um recebe o seu, para que cada caminho tenha um único escritor.

O pull request fica aberto, verde e com label de revisão até o GO do líder. Então a frente faz o merge e cria a tag, e reporta a tag de volta.

## Ordem de release

Os repositórios dependem uns dos outros, então fazem release em ordem de dependência: primeiro as ferramentas, depois o que as fixa, depois a documentação que descreve o resultado e por fim os consumidores que o adotam. O líder mantém a ordem e envia o GO a um repositório por vez. Uma frente que fixa o release de outro repositório espera essa tag antes de escrever a fixação, então nenhuma fixação aponta para um release que não existe.

## Checkpoints

O plano pai fecha com evidência, não com relatórios:

1. **Por frente.** O gate de cada frente passa no próprio branch, e a revisão do seu pull request está limpa. A revisão pode ser uma frente própria: o [AI Diff Reviewer](/pt/kit/ai-diff-reviewer) revisa o pull request de cada frente e, com o addon [Dailybot](/pt/kit/dailybot), cada frente reporta o próprio progresso à equipe.
2. **Por release.** Cada tag existe e fixa o que o próximo repositório precisa.
3. **Integração.** Depois do último release, um checkpoint roda os consumidores nas versões publicadas e registra o veredito em `analysis_results/` do plano pai.
4. **Revisão final.** Uma passada de segurança cobre tudo o que atravessou uma fronteira — sobretudo contas, tokens e arquivos compartilhados com contêineres — antes de o plano pai ser concluído.

## Segurança

- Nunca coloque uma chave, um token ou um segredo em uma consulta, um prompt ou um log; refira-se às variáveis pelo nome.
- Recursos compartilhados têm um lock: uma frente o obtém antes de um passo pesado, como o build de um contêiner, e o libera depois.
- O opt-out de permissões, quando definido, prevalece para todas as frentes e para todos os agentes que uma frente iniciar.
- Uma frente que não pode continuar diz isso como um marco de bloqueio e para; o líder decide.

## Quando uma conta ou o líder se esgota

Uma execução longa dura mais que qualquer conta. A partir do coding-agents-kit `v0.6.0` e do herdr-peers `v0.3.0`, uma frente verifica a própria capacidade em cada limite entre tarefas e repassa o trabalho por meio de um pacote antes que sua conta se esgote, um líder repassa a liderança ou é substituído pelo seu suplente, e só os itens críticos chegam ao desenvolvedor. [Autonomia do enxame](/pt/methodology/07-swarm-autonomy) descreve o loop, o pacote, a sucessão e as classes de escalação.
