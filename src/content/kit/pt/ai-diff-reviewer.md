---
title: AI Diff Reviewer
description: "Addon DWP opcional: passagem local do AI Diff Reviewer na Revisão de Segurança, porta CI Flow B opcional (v2), extensão partilhada e apply-review."
kind: addon
lang: pt
order: 5
---

# Addon de AI Diff Reviewer

Conecta a execução do Deep Work Plan ao **[AI Diff Reviewer](https://github.com/DailybotHQ/ai-diff-reviewer)** (listagem no marketplace **"AI Diff Reviewer"**, versão atual **v2.0.0**) para que a tarefa final obrigatória de **Revisão de Segurança** obtenha uma revisão local estruturada — veredicto, tabela de resultados e severidade — e, ao escolher o Fluxo B, cada pull request pode ser bloqueado pela mesma revisão em CI. Um addon **opcional**; nunca obrigatório para conformidade AI-first.

A metodologia central do Deep Work Plan tem **zero** dependência do AI Diff Reviewer. Um repositório sem addons está totalmente conforme. Ofereça este addon apenas quando o programador ou equipa pretende qualidade de revisão estruturada; nunca instale automaticamente para todos. Pergunte sempre Fluxo A vs Fluxo B — nunca assuma um padrão.

## Quando usar

| Sinal | Ação |
|--------|--------|
| A equipa quer um portão de fusão de CI com resultados estruturados | **Recomendar Fluxo B** durante a integração |
| Repositório pessoal ou experimental; a revisão local pré-push é suficiente | **Oferecer Fluxo A** |
| Sem interesse numa superfície de revisão adicional | **Ignorar** — a Revisão de Segurança de base continua a aplicar-se |

## Dois fluxos de adoção

| Fluxo | O que obtém |
|------|----------------|
| **A — apenas local** | Skill vendorizada + `.review/extension.md` obrigatório (via `generate-extension`). Aumenta a Revisão de Segurança com uma passagem local. Sem fluxo de GitHub Actions. |
| **B — dupla superfície** | Fluxo A mais `setup` escreve `.github/workflows/pr-review.yml` (Action `@v2`), mesmo ficheiro de extensão para local e CI. Companheiro opcional `apply-review` após CI publicar resultados. |

A deteção para a ampliação da Revisão de Segurança requer **skill + um ficheiro de extensão** em um de: `.review/extension.md`, `.github/ai-diff-reviewer/extension.md` ou `.github/ai-pr-reviewer/extension.md`. A skill sozinha não é suficiente.

## O que este addon liga (limitado por design)

O addon DWP **não** reinventa o revisor. Delega instalação, metodologia, o assistente de CI, autoria de extensões, redação de PRs e percurso pós-CI às cinco sub-skills da skill upstream (fluxo pai predefinido, `generate-extension`, `setup`, `open-pr`, `apply-review`).

### Ampliação da Revisão de Segurança

Quando detetado, `create` / `execute` adicionam um passo de revisão local à tarefa obrigatória de Revisão de Segurança. A saída é adicionada sob `## AI Diff Reviewer local review` em `analysis_results/SECURITY_REVIEW.md`.

- **Falha suave (apenas invocação):** skill em falta, extensão em falta ou erro de invocação → avisar uma vez e continuar; nunca reprovar a tarefa por isso.
- **Portão após uma passagem completa:** resultados `critical` continuam a bloquear a conclusão da Revisão de Segurança até serem corrigidos ou explicitamente aceites (contrato SR existente). `warning` / `info` são documentados mas não bloqueantes.
- **O Fluxo A não precisa de segredo de CI.** Um `CURSOR_API_KEY` não configurado não deve suprimir a passagem local.

### Portão de CI do Fluxo B (opcional)

Action fixada `DailybotHQ/ai-diff-reviewer@v2`, tipicamente bloqueada por etiqueta (`ready`), com um trabalho de nome estável **AI review gate** para proteção de ramos e etiqueta de omissão opcional `skip-review-label: skip-ai-review`. `prompt.md` partilhado + extensão alinham metodologia e severidade; sob Revisão com Consciência de Iteração, rondas de CI 2+ podem ser mais curtas enquanto a passagem local permanece completa.

### Companheiro `apply-review` opcional

Após CI publicar uma revisão, o programador pode invocar `apply-review` durante `execute` para percorrer os resultados um a um (aplicar / adiar / ignorar) com consentimento. Apenas leitura por padrão; nunca um ficheiro de tarefa do plano (quebraria a ordem obrigatória de tarefas finais).

## Comportamento

- **Perguntar o fluxo; nunca assumir.** Instalar um fluxo sem pedido é uma pegada maior do que permanecer no Fluxo A.
- **Reconciliar, não sobrescrever.** Skill, extensão ou `pr-review.yml` existentes são preservados; preencher apenas lacunas.
- **Auth adiada.** Os segredos do fornecedor para CI são configurados pelo mantenedor; este addon nunca armazena credenciais.
- **Neutro em relação ao fornecedor.** Recusar deixa um repositório totalmente AI-first.

## Notas

Opcional e nunca obrigatório. Skill upstream: [DailybotHQ/ai-diff-reviewer](https://github.com/DailybotHQ/ai-diff-reviewer). Página de spec: [Add-ons](/spec/addons).
