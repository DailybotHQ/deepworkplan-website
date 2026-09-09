---
title: "Política de privacidade"
description: "A política de privacidade do deepworkplan.com: um site estático sem contas nem publicidade, análise agregada sem cookies e uma explicação simples do que exatamente o formulário de contato coleta."
---

## O que é este site

deepworkplan.com é uma coleção de páginas estáticas servidas por uma CDN. Não há login, banco de dados de usuários nem forma de o site armazenar perfis pessoais. O conteúdo é desenvolvido em repositórios públicos do GitHub sob a organização DailybotHQ, e tudo o que você lê aqui é servido exatamente como foi construído.

## Análise de uso

O site usa o Umami, um serviço de análise sem cookies e voltado à privacidade, para contar visualizações de páginas de forma agregada. O Umami não define cookies de rastreamento nem constrói perfis entre sites. Como crawlers de IA não executam JavaScript, uma função de edge no lado do servidor também registra o user agent e o caminho das visitas de bots automatizados como eventos anônimos de análise — isso identifica o software crawler (por exemplo "GPTBot visitou /init"), nunca um visitante humano.

## Cookies e armazenamento local

O site não define cookies de rastreamento. A única coisa guardada no seu navegador é uma preferência de tema (modo claro ou escuro) mantida no localStorage, que nunca sai do seu dispositivo e não é transmitida para lugar nenhum. Se você limpar o armazenamento do navegador, o site simplesmente volta ao tema padrão do seu sistema.

## Serviços de terceiros

A hospedagem e a entrega funcionam no Cloudflare Pages, que processa logs de requisições e endereços IP na edge como parte de operar a CDN e bloquear abusos, sob a própria política de privacidade da Cloudflare. A análise agregada funciona no Umami (cloud.umami.is). Se você enviar voluntariamente o formulário de contato, suas respostas passam pelo Google Forms para a nossa equipe — esse é o único lugar onde a informação que você digita é coletada, e ela é usada unicamente para responder você.

## O que não fazemos

Não vendemos nem compartilhamos dados pessoais, não rodamos publicidade nem pixels de remarketing, não fazemos fingerprinting de navegadores e não enviamos e-mail de marketing. O site não tem inscrição em newsletter nem telemetria além das contagens agregadas e sem cookies descritas acima.

## Suas escolhas

Como a análise aqui é agregada e sem cookies, não há perfil pessoal para exportar ou excluir. Você pode bloquear o script de análise com qualquer bloqueador de conteúdo sem afetar o funcionamento do site. Se você enviou o formulário de contato e quer que sua mensagem seja excluída, escreva para o endereço de contato abaixo e nós a removeremos.

## Mudanças nesta política

Se esta política mudar de forma material, a data de atualização na [página da política](https://deepworkplan.com/privacy) muda com ela, e edições substanciais são commitadas no repositório público do site, onde qualquer pessoa pode revisar o histórico.

## Contato e segurança

Para perguntas de privacidade, escreva para [security@dailybot.com](mailto:security@dailybot.com). Para reportar uma vulnerabilidade de segurança, prefira a divulgação privada de vulnerabilidades do GitHub para os repositórios do site e da skill — consulte [security.txt](https://deepworkplan.com/.well-known/security.txt) para os endereços exatos.
