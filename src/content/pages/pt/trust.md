---
title: "Confiança e segurança"
description: "Por que o Deep Work Plan é seguro de adotar: código aberto e MIT, Markdown-first sem chamadas de rede nem telemetria, não destrutivo por design, com instalações verificáveis e uma política clara de divulgação de vulnerabilidades."
lastUpdated: 2026-06-05
---

## Por que você pode confiar nele

Ninguém deveria instalar uma skill em que não pode confiar. O Deep Work Plan foi desenvolvido para ser verificado, não aceito por fé: código aberto, Markdown-first, não destrutivo e verificável antes de ser executado.

- **Código aberto e licença MIT** — o site e a skill são públicos e passíveis de revisão; leia cada linha antes de executar.
- **Markdown-first — sem rede, sem telemetria** — sem CLI, sem API HTTP, sem fluxo de autenticação; não faz chamadas de rede e não envia telemetria. Nada do seu repositório sai da sua máquina.
- **Não destrutivo por design** — a única ação relevante para a segurança é alterar o seu repositório, e ela reconcilia em vez de sobrescrever: detecta o que existe, propõe um plano e pergunta antes de substituir qualquer coisa. O resultado dos planos fica em uma pasta `.dwp/` ignorada pelo git.
- **Não acessa segredos** — nunca comita segredos, acrescenta ao `.gitignore` em vez de reescrevê-lo, e mantém as alterações em diffs pequenos e revisáveis.
- **Procedência verificável** — cada versão publica checksums sobre a skill distribuída.

---

## Verifique antes de executar

Trate a skill como não confiável até tê-la verificado. Cada versão anexa um arquivo `SHA256SUMS` cobrindo a skill distribuída. Baixe-o para a versão que pretende instalar e verifique se a sua cópia corresponde — uma saída diferente de zero significa que um arquivo não corresponde e você deve parar.

```bash
git clone https://github.com/DailybotHQ/deepworkplan-skill.git
cd deepworkplan-skill
# Baixe os checksums para a versão que pretende instalar (substitua vX.Y.Z):
curl -fsSL -o SHA256SUMS \
  https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS
./setup.sh --verify        # saída diferente de zero significa que um arquivo não corresponde — pare
```

As versões têm **checksums, não assinaturas criptográficas** — a assinatura (cosign ou GPG do mantenedor) é o próximo passo documentado, não uma garantia atual. Como tudo é aberto, você também pode comparar qualquer arquivo com o repositório na sua tag.

---

## Reportar uma vulnerabilidade

Reporte problemas de segurança **de forma privada pelo sistema de reporte privado de vulnerabilidades do GitHub** no repositório relevante — não como uma issue pública, o que divulgaria o problema antes de existir uma correção:

- Skill: <https://github.com/DailybotHQ/deepworkplan-skill/security>
- Site: <https://github.com/DailybotHQ/deepworkplan-website/security>

---

## Limitações honestas

- As versões têm checksums, mas ainda não estão criptograficamente assinadas — a assinatura está planejada, não implementada.
- O Deep Work Plan executa um agente de coding autônomo no seu repositório. Revise o plano proposto e seus diffs; a metodologia foi projetada para essa revisão, não para substituí-la.
- Estas afirmações de confiança descrevem apenas as fontes oficiais. Uma cópia modificada ou de terceiros que tenha se afastado dos repositórios não tem nenhuma dessas garantias — verifique-a primeiro.

---

## Recursos de confiança

- [Manifesto de confiança legível por máquina](https://deepworkplan.com/.well-known/dwp-trust.json)
- [security.txt (RFC 9116)](https://deepworkplan.com/.well-known/security.txt)
- [Política de segurança do site](https://github.com/DailybotHQ/deepworkplan-website/blob/main/SECURITY.md)
- [Política de segurança e modelo de ameaças da skill](https://github.com/DailybotHQ/deepworkplan-skill/blob/main/SECURITY.md)
- [Leia a metodologia](/methodology)
- [Adoção (init)](/init)
