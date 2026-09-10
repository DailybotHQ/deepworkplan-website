---
title: AI Diff Reviewer
description: "Revisão local obrigatória em cada Final Review do DWP desde o padrão 2.3.0, instalada pela integração; a porta CI do Fluxo B (v2), a extensão partilhada e o apply-review continuam opcionais."
kind: addon
lang: pt
order: 5
---

# Addon de AI Diff Reviewer

Conecta a execução do Deep Work Plan ao **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (listagem no marketplace **"AI Diff Reviewer"**, versão atual **v2.0.0**) para que o passe de segurança do **Final Review** obrigatório execute uma revisão local estruturada — veredicto, tabela de resultados e severidade — e, ao escolher o Fluxo B, cada pull request possa ser bloqueado pela mesma revisão em CI. Desde o padrão 2.3.0 a **revisão local faz parte da linha de base**: a integração instala-a e cada Final Review executa-a. Apenas a superfície de CI é opcional.

O que permanece neutro em relação ao fornecedor é o limite que importa: o revisor é uma skill MIT fixada por tag executada pelo **seu próprio** agente de codificação — nenhum fluxo do Deep Work Plan exige um serviço comercial, um fornecedor de CI ou um segredo. O Fluxo A (apenas local) é a linha de base que todo repositório integrado recebe; o Fluxo B (o Action de CI) é oferecido explicitamente e nunca instalado sem ser pedido. Um programador pode recusar o revisor local; a recusa é registada como exceção declarada e o `verify` reporta o repositório como não conforme nesse ponto até que seja instalado.

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
| **B — dupla superfície** | Fluxo A mais `setup` escreve `.github/workflows/pr-review.yml` (Action `@v2`), mesmo ficheiro de extensão para local e CI. Companheiro opcional `apply-review` após CI publicar resultados. |

A deteção da revisão local requer **skill + um ficheiro de extensão** em um de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. A skill sozinha não é suficiente.

## O que este addon liga (limitado por design)

O addon DWP **não** reinventa o revisor. Delega instalação, metodologia, o assistente de CI, autoria de extensões, redação de PRs e percurso pós-CI às cinco sub-skills da skill upstream (fluxo pai predefinido, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### A revisão local obrigatória

O `create` adiciona o passo de revisão local ao passe de segurança de cada Final Review e o `execute` executa-o. A saída é adicionada sob `## AI Diff Reviewer local review` em `analysis_results/SECURITY_REVIEW.md`.

- **Revisor em falta — registado, nunca omitido em silêncio:** uma skill ou extensão em falta torna-se um resultado `local reviewer not installed`; quando a execução pode escrever no harness (modo trust ou aprovação explícita) o agente instala a peça em falta e só depois revê, caso contrário o resultado é levado para o relatório de conclusão.
- **Falha suave (apenas invocação):** uma revisão que conseguiu iniciar mas termina com erro → avisar uma vez, registar, continuar; nunca reprovar a tarefa por isso.
- **Portão após uma passagem completa:** resultados `critical` continuam a bloquear a conclusão do Final Review até serem corrigidos ou explicitamente aceites. `warning` / `info` são documentados mas não bloqueantes.
- **O Fluxo A não precisa de segredo de CI.** Um `CURSOR_API_KEY` não configurado não deve suprimir a passagem local.

### Portão de CI do Fluxo B (opcional)

Action fixada `DailybotHQ/ai-diff-reviewer@v2`, tipicamente bloqueada por etiqueta (`ready`), com um trabalho de nome estável **AI review gate** para proteção de ramos e etiqueta de omissão opcional `skip-review-label: skip-ai-review`. `prompt.md` partilhado + extensão alinham metodologia e severidade; sob Revisão com Consciência de Iteração, rondas de CI 2+ podem ser mais curtas enquanto a passagem local permanece completa.

### Companheiro `apply-review` opcional

Após CI publicar uma revisão, o programador pode invocar `apply-review` durante `execute` para percorrer os resultados um a um (aplicar / adiar / ignorar) com consentimento. Apenas leitura por padrão; nunca um ficheiro de tarefa do plano (quebraria a ordem obrigatória de tarefas finais).

## Comportamento

- **O Fluxo A é a linha de base; o Fluxo B pergunta-se, nunca se assume.** Instalar um fluxo sem pedido é uma pegada maior do que permanecer no Fluxo A.
- **Reconciliar, não sobrescrever.** Skill, extensão ou `pr-review.yml` existentes são preservados; preencher apenas lacunas.
- **Auth adiada.** Os segredos do fornecedor para CI são configurados pelo mantenedor; este addon nunca armazena credenciais.
- **Neutro em relação ao fornecedor.** Nunca se exige um serviço comercial, um fornecedor de CI nem um segredo; a superfície de CI é a única peça que toca um fornecedor.

## Notas

Revisão local obrigatória desde o padrão 2.3.0; superfície de CI opcional. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Página de spec: [Add-ons](/spec/addons).
