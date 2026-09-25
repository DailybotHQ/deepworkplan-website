---
title: AI Diff Reviewer
description: "Revisão local de críticos verificados em cada Final Review desde o padrão 2.3.0; a comporta de CI com grok e o address-review continuam opcionais."
kind: addon
lang: pt
order: 5
---

# Addon de AI Diff Reviewer

Todo Deep Work Plan termina da mesma forma: um **Final Review** obrigatório que lê o conjunto completo de alterações acumuladas do plano antes de o trabalho poder ser dado como concluído. O seu passe de segurança é o último ponto em que algo pode ser apanhado. Sem ajuda, o único leitor nesse momento é o mesmo agente que escreveu o código.

Este addon coloca um segundo leitor sobre esse diff. Liga o **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** — listado no marketplace como "AI Diff Reviewer", versão atual **v3.1.1** — ao passe de segurança, onde devolve algo estruturado em vez de prosa: um veredicto, uma tabela de resultados e uma severidade para cada um. Desde a v3, um resultado `critical` significa que o verificador do addon o confirmou com uma segunda chamada ao modelo ancorada no código; apenas os críticos verificados bloqueiam a conclusão até serem corrigidos ou explicitamente aceites. A revisão é uma comporta, não um comentário.

Desde o padrão 2.3.0 essa revisão local **faz parte da linha de base, não é um extra**. A integração instala-a; cada Final Review executa-a. O que continua opcional é a superfície de CI — o Fluxo B, onde a mesma revisão controla os pull requests através da GitHub Action.

O limite que torna isto seguro de adotar é deliberadamente estrecho. O revisor é uma skill com licença MIT e fixada por tag, executada pelo agente de código que já utiliza, pelo que nenhum fluxo do Deep Work Plan depende de um serviço comercial, de um fornecedor de CI ou de um segredo. O **Fluxo A** (apenas local) é o que qualquer repositório integrado recebe; o **Fluxo B** é oferecido explicitamente e nunca instalado sem pedido. Quem desenvolve pode também recusar o revisor por completo — essa recusa fica registada como exceção declarada, e o `verify` reporta o repositório como não conforme nesse ponto até que seja instalado.

## Quando usar

| Sinal | Ação |
|--------|--------|
| Todo repositório integrado | **O Fluxo A fica instalado** na Fase 7a da integração (skill vendorizada + `.review/extension.md`); uma atualização dirigida do harness adiciona-o aos repositórios integrados anteriormente |
| A equipa quer um portão de fusão de CI com resultados estruturados | **Oferecer o Fluxo B** — adesão explícita, nunca o padrão |
| Repositório pessoal ou experimental; a revisão local é suficiente | **Permanecer no Fluxo A** — a linha de base está completa |

## Dois fluxos de adoção

| Fluxo | O que obtém |
|------|----------------|
| **A — apenas local (linha de base)** | Skill vendorizada + `.review/extension.md` obrigatório (via `generate-extension`). Executa a revisão local dentro do passe de segurança de cada Final Review. Sem fluxo de GitHub Actions. |
| **B — dupla superfície** | Fluxo A mais `setup` escreve o fluxo de revisão (Action `@v3`), mesmo ficheiro de extensão para local e CI. Companheiros opcionais `apply-review` e `address-review` após CI publicar resultados. |

A deteção da revisão local requer **skill + um ficheiro de extensão** em um de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. A skill sozinha não é suficiente.

## O que este addon liga (limitado por design)

O addon DWP **não** reinventa o revisor. Delega instalação, metodologia, o assistente de CI, autoria de extensões, redação de PRs e os ciclos de revisão pós-CI às seis sub-skills da skill upstream (fluxo pai predefinido, `generate-extension`, `setup`, `open-pr`, `apply-review`, `address-review`).

### A revisão local obrigatória

O `create` adiciona o passo de revisão local ao passe de segurança de cada Final Review e o `execute` executa-o. A saída é adicionada sob `## AI Diff Reviewer local review` no `analysis_results/SECURITY_REVIEW.md` local do plano (dentro da pasta própria do plano, nunca na raiz do repositório).

- **Revisor em falta — registado, nunca omitido em silêncio:** uma skill ou extensão em falta torna-se um resultado `local reviewer not installed`; o Final Review executa a passagem local quando a skill está presente e, caso contrário, leva o resultado para o relatório de conclusão — a instalação pertence ao consentimento do onboarding ou a uma invocação explícita do addon, nunca é um arranque surpresa.
- **Falha suave (apenas invocação):** uma revisão que conseguiu iniciar mas termina com erro → avisar uma vez, registar, continuar; nunca reprovar a tarefa por isso.
- **Portão após uma passagem completa:** os **críticos verificados** bloqueiam a conclusão do Final Review até serem corrigidos ou explicitamente aceites (BC-07). Afirmativas críticas não verificadas chegam como avisos anotados — visíveis, não bloqueantes, salvo se `strict-unverified-criticals: true` restaurar a filtragem por afirmativa. Uma revisão que esgotou o seu teto de turnos (`incomplete`) ou o seu relógio (`timeout`) não é uma passagem limpa sob rigor bloqueante (BC-04). `warning` / `info` são documentados mas não bloqueantes.
- **O Fluxo A não precisa de segredo de CI.** Uma chave de fornecedor não configurada não deve suprimir a passagem local.

### Portão de CI do Fluxo B (opcional)

Action `DailybotHQ/ai-diff-reviewer@v3`, tipicamente bloqueada por etiqueta (`ready`), com um trabalho de nome estável **AI review gate** para proteção de ramos e etiqueta de omissão opcional `skip-review-label: skip-ai-review`. Desde a v3 o orçamento de revisão segue o nível de risco determinista da alteração — 8/20/30/40 turnos de `low` a `critical` sob `budget-profile: auto` (`fixed` restaura as constantes anteriores à v3 durante a transição) — e um push que não altera código executa uma ronda apenas do verificador. `prompt.md` partilhado + extensão alinham metodologia e severidade; local e CI permanecem idênticos em metodologia, enquanto rondas de CI 2+ podem ser mais curtas sob Revisão com Consciência de Iteração e a passagem local permanece completa.

### Companheiros de revisão opcionais

Duas sub-skills invocáveis pelo programador fecham o ciclo depois de CI publicar uma revisão; nenhuma é ever um ficheiro de tarefa do plano (quebraria a ordem obrigatória de tarefas finais).

- `apply-review` percorre os resultados um a um (aplicar / adiar / ignorar) com consentimento. Apenas leitura por padrão; nunca faz commit nem push.
- `address-review` (novo na v3.1.1) é o ciclo de invocação única: encontra os PR abertos do ramo, verifica que a revisão cobre o head atual, apresenta os resultados com um plano de aplicar/adiar/ignorar e — com um único sim — aplica, faz commits em lotes pequenos de Conventional Commits, faz push e rearma o revisor da forma como o repo o dispara (bloqueio por etiqueta → alterna a etiqueta; disparo por push → confirma a nova execução). Ao contrário de `apply-review`, faz commit e push; esse é o propósito do ciclo. Em revisões agregadas de um ensemble lê o documento agregado e o marcador `ai-pr-reviewer-aggregate`.
- O caminho para máquinas é a saída estruturada, não o corpo da revisão: o documento `review-output/3.0` (`.aiprr/review-output.json`, localizado através das saídas `structured-output-path` e `structured-output-sha256`) transporta o registo de execução, os resultados com evidência e verificação, os resultados refutados e a comporta. Um corpo de revisão que diz `Recommendation: approve` não é prova de que a verificação tenha passado — leia primeiro o bloco Highest severity / Strictness gate / Check status do marcador de acompanhamento.

## O que mudou na v3

Três versões chegaram a 2026-09-24 (v3.0.0, v3.0.1, v3.1.0) e a v3.1.1 seguiu-se com a sub-skill `address-review`. Nenhuma altera a forma como este addon liga o revisor — o Fluxo A, os três caminhos de deteção e a escada de nunca bloquear mantêm-se —, mas mudam aquilo que quem adota recebe.

| Mudança | O que significa para um repositório DWP |
|---------|------------------------------------------|
| **Um `critical` só é publicado quando verificado** (v3.0.0) | Cada crítico afirmado — mais uma amostra de 30 % dos avisos — recebe uma segunda verificação breve ancorada no código por uma chamada de modelo separada (≈ 3 k tokens, 10 s e $0.009 por resultado verificado). Críticos verificados filtram o passe de segurança; os refutados continuam visíveis como avisos anotados e são listados na saída estruturada, nunca inline. |
| **O orçamento segue o nível de risco** (v3.0.0) | 8/20/30/40 turnos de `low` a `critical`, derivados do inventário de alterações (`budget-profile: auto`). Um push sem alterações de código executa uma ronda apenas do verificador com −93 % de custo. `budget-profile: fixed` restaura as constantes anteriores à v3 de 30 turnos. |
| **Uma revisão inacabada é vermelha** (v3.0.0) | `incomplete` (teto de turnos) e `timeout` (relógio) publicam resultados parciais e falham sob rigor bloqueante — «sem resultados» agora significa sempre que o revisor olhou e não encontrou nada. |
| **A saída estruturada é o caminho para máquinas** (v3.0.0) | O documento `review-output/3.0` transporta o registo de execução, o inventário de alterações, resultados com evidência tipada e verificação, os refutados e a comporta. Leia o documento em vez de raspar corpos de revisão. |
| **Seis sub-skills** (v3.1.1) | `address-review` junta-se ao router: uma invocação aplica, faz commit, faz push e rearma o revisor. |
| **Ensemble opcional** (v3.0.0) | Pernas `mode: emit` de apenas leitura mais um trabalho `aggregate` verificam uma vez os resultados consolidados e publicam uma única revisão. |
| **`@v2` continua a funcionar** | A linha v2 está congelada em `release/v2` com seis meses de manutenção de segurança e catálogo. A v3 é a recomendação, nunca uma migração forçada. |

Dois destes importam mais do que os restantes para a metodologia.

**A comporta de críticos verificados endurece o passe de segurança.** Antes da v3, um modelo podia afirmar um `critical` livremente e a comporta seguia a afirmativa. Agora um resultado crítico num Final Review significa que uma segunda chamada ao modelo o confirmou contra o código, e a campanha da versão mediu a diferença: 771 execuções de avaliação pagas em dez campanhas por cerca de $83 no total, com o nível crítico a alcançar 63/63 de recall com precisão adjudicada de 1.0, e rondas incrementais a cortar os tokens de entrada entre 62 e 76 %. Estes números são medições publicadas pelo upstream, não do Deep Work Plan.

**`economy` deliberadamente não é mais barato.** O benchmark upstream de 2026-09-16 mediu `grok-4.3` em 0 de 5 defeitos conhecidos — aprova sem rever — enquanto `grok-4.5` igualou `grok-4.6` com 3 de 5 e sem falsos positivos, ao mesmo custo e com um quarto do tempo. Como não existe nenhum modelo xAI mais barato que continue a rever, `economy` resolve para o mesmo modelo que `balanced` em vez de ser um nível que não encontra nada; no runner grok, o orçamento de turnos do nível de risco, e não a escolha do modelo, é o que escala o custo. Por isso o caminho xAI passa de cerca de $0.07 para cerca de $0.40–0.75 por revisão através da CLI; `model: grok-4.3` pode ainda ser fixado explicitamente para manter o comportamento anterior. Estes números são medições publicadas pelo upstream, não do Deep Work Plan.

## Comportamento

- **O Fluxo A é a linha de base; o Fluxo B pergunta-se, nunca se assume.** Instalar um fluxo sem pedido é uma pegada maior do que permanecer no Fluxo A.
- **Reconciliar, não sobrescrever.** Skill, extensão ou fluxo de revisão existentes são preservados; preencher apenas lacunas.
- **Auth adiada.** Os segredos do fornecedor para CI são configurados pelo mantenedor; este addon nunca armazena credenciais.
- **Neutro em relação ao fornecedor.** Nunca se exige um serviço comercial, um fornecedor de CI nem um segredo; a superfície de CI é a única peça que toca um fornecedor.

## Notas

Revisão local obrigatória desde o padrão 2.3.0; superfície de CI opcional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Guia de migração upstream: [docs/MIGRATION_v3.md](https://github.com/DailybotHQ/ai-diff-reviewer/blob/main/docs/MIGRATION_v3.md). Página de spec: [Add-ons](/spec/addons).
