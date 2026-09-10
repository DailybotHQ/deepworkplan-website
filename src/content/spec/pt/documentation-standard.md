---
title: Padrão de documentação
description: "Padrão normativo de como os Deep Work Plans documentam sua estrutura, tarefas e progresso: regras de README, marcadores de status, a anatomia de tarefa de dez seções e o Final Review."
order: 1
lang: pt
section: Standard
---

# Padrão de documentação

**Versão 1.1.** Este padrão define como os Deep Work Plans documentam sua estrutura, tarefas e progresso. Ele se aplica a todo plano criado sob a metodologia DWP. As palavras-chave MUST, SHOULD e MAY são usadas conforme definidas na RFC 2119.

## README do plano

Todo plano DEVE (MUST) ter um `README.md` contendo:

- **Title** — `# Deep Work Plan: <name>`.
- **Goal** — uma declaração em prosa do objetivo do plano.
- **Source material** — links ou caminhos para as entradas canônicas (opcional).
- **Tasks** — uma tabela markdown com o número, o nome e uma caixa de status da tarefa.
- **Status** — uma linha no formato `<n>/<total> tasks complete`.

## Arquivos de tarefa

Cada arquivo de tarefa DEVE (MUST) ser chamado `<n>.task_<slug>.md` e conter a anatomia de dez seções — as nove seções clássicas mais a **Superfície tocada**: o contrato entre o que a tarefa muda e o que deve ser validado (superfície planejada vs. real, consumidores afetados, uma classe de risco de *isolada*, *costura*, *compartilhada/núcleo* ou *desconhecida*, o mapeamento de testes usado e o gate selecionado com seu motivo).

## PROGRESS.md

O `PROGRESS.md` é um registro de execução somente de adição. Cada entrada DEVE (MUST) registrar:

- Um carimbo de data/hora ISO 8601.
- O número e o nome da tarefa.
- O que foi feito.
- Quaisquer desvios ou motivos de pular.

## Marcadores de status

- `[ ]` — não iniciada.
- `[~]` — em andamento.
- `[x]` — concluída.
- `[!]` — bloqueada.

## Títulos

Todos os títulos DEVEM (MUST) usar sentence case. Os documentos DEVERIAM (SHOULD) evitar linguagem de marketing e pontos de exclamação.

## O Final Review, as decisões de skills por tarefa e o relatório opcional

Todo plano redigido sob esta versão DEVE (MUST) terminar com exatamente uma tarefa obrigatória: o **Final Review** — o passe de segurança sobre o conjunto completo de mudanças do plano, a validação de estado final sobre o último estado relevante e a reconciliação das decisões de skills. Um achado de segurança crítico bloqueia a conclusão.

- **Decisões de skills por tarefa.** O Completion & Log de cada tarefa carrega uma **disposição de skills** — `nenhuma`, uma atualização a uma skill ou agent existente, uma criação nomeada, ou um adiamento com motivo e responsável. A autoria justificada acontece dentro da tarefa que a origina, antes de seu validation gate, após uma verificação de duplicados contra o catálogo `.agents/`; as entradas justificadas são registradas como candidatas estáveis (`T{task}-{seq}`) no registro de candidatas a skills do plano.
- **O Executive Report é opcional, mediante solicitação.** É oferecido uma vez na conclusão; é gerado apenas mediante solicitação explícita e a partir de evidência duradoura. Sem resposta, ou em uma execução desassistida, o plano fica concluído sem ele.
- **Planos legados.** Os planos redigidos sob versões anteriores terminam com as três tarefas finais obrigatórias e continuam conformes — um verificador de conformidade DEVE (MUST) aceitar esse formato.
