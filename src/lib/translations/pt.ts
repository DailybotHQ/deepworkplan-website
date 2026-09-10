/**
 * pt translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const pt: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull:
    'Deep Work Plan — execução estruturada para agentes de código de IA',
  siteDescription:
    'Deep Work Plan: uma metodologia aberta e um kit de referência para execução de IA estruturada, validada e retomável ao longo de várias horas.',

  // Navigation
  nav: {
    home: 'Início',
    about: 'Sobre',
    contact: 'Contato',
    // Deep Work Plan IA
    methodology: 'Metodologia',
    spec: 'Especificação',
    kit: 'Kit',
    examples: 'Exemplos',
    init: 'Init',
    quickstart: 'Início rápido',
    trust: 'Confiança',
    developers: 'Desenvolvedores',
    privacy: 'Privacidade',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: 'Código-fonte',
      website: 'Repositório do site',
      websiteDesc: 'Este site',
      skill: 'Repositório da skill',
      skillDesc: 'A skill instalável',
    },
    menu: 'Abrir menu',
    closeMenu: 'Fechar menu',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'Todos os direitos reservados.',
    poweredBy: 'Desenvolvido com',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'Novo · Eficiente em tokens',
    text: 'Deep Work Plan está no Product Hunt hoje',
    tagline: 'dê um plano ao seu agente',
    linkText: 'Vote nele',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'Navegação do site',
    sections: {
      methodology: 'Metodologia',
      getStarted: 'Comece agora',
      project: 'Projeto',
      connect: 'Conecte-se',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title:
        'Deep Work Plan — execução estruturada para agentes de código de IA',
      description:
        'O contexto importa mais do que os modelos. O Deep Work Plan transforma qualquer repositório em um ambiente estruturado onde qualquer agente de código conclui trabalhos de longo prazo.',
    },
    hero: {
      badge: 'Metodologia aberta · MIT · Independente de agente',
      title: 'Os modelos importam.',
      titleEmphasis: 'O contexto importa mais.',
      subtitle:
        'O Deep Work Plan transforma qualquer repositório em um ambiente estruturado — contexto, guardrails e um plano duradouro — onde qualquer agente de código executa com precisão e eficiência e conclui o trabalho de longo alcance.',
      instructionLabel: 'Copie para o seu agente',
      instruction:
        'Copie o prompt do init.md e cole-o no seu agente de código — Claude Code, Cursor, Codex, ou qualquer outro — para tornar qualquer repositório AI-first.',
      copyLabel: 'Copiar init.md',
      copiedLabel: 'Copiado',
      viewInitCta: 'Ver o prompt completo do /init',
      pullQuote:
        'O Deep Work Plan é desenvolvimento orientado a especificação no qual o próprio repositório se torna o harness.',
      primaryCta: 'Leia a metodologia',
      secondaryCta: 'Leia a especificação',
      illustrationAlt:
        'Um farol em uma costa rochosa projeta um único feixe que guia uma pequena embarcação — uma gravura que evoca o repositório como um harness firme que guia qualquer agente.',
      scrollCta: 'Veja como funciona',
    },
    pitch: {
      kicker: 'O problema e a resposta',
      problem:
        'Em rajadas curtas, agentes de código são notáveis. Confie a um deles uma missão de longo alcance — uma migração, um subsistema novo, uma refatoração em dezenas de arquivos — e ele desvia: o contexto enche, decisões anteriores se perdem e horas de trabalho ficam pela metade.',
      answer:
        'O Deep Work Plan responde com desenvolvimento guiado por especificação: um plano duradouro, tarefas atômicas e validation gates que o agente precisa passar. Done deixa de ser uma sensação — vira evidência verificável e revisável.',
      efficiency:
        'E como o contexto é o recurso mais escasso do seu agente, o harness é projetado para a eficiência de tokens: instruções carregam progressivamente, a validação toca apenas o que mudou e cada tarefa aprende localmente — assim o trabalho de longo prazo continua acessível.',
      illustrationAlt:
        'Um díptico gravado: de um lado um navio à deriva na névoa junto a rochas escarpadas, do outro o mesmo navio firme em um rumo traçado em direção ao farol de um porto.',
    },
    story: {
      act1: {
        kicker: 'O método · Ato I',
        lead: 'Você decide o que significa concluído e onde estão os limites. O plano carrega a sua intenção; os agentes cumprem as horas — sem supervisão constante, sem correções a cada vinte minutos.',
        deepLinkLabel: 'Leia a metodologia',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'O método · Ato II',
        lead: 'Tarefas longas enchem o contexto de qualquer modelo. Os detalhes se perdem e o agente desvia. Um plano escrito — tarefas atômicas, validation gates, estado retomável — é aquilo a que ele retorna, volta após volta.',
        deepLinkLabel: 'Veja o ciclo principal',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'O método · Ato III',
        lead: 'Cada tarefa nomeia seus critérios de aceitação e as verificações que devem passar. O agente não pode dar-se por terminado — tem que passar, ou a tarefa permanece aberta.',
        deepLinkLabel: 'Leia a especificação',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'O método · Ato IV',
        lead: 'Contexto, ferramentas, salvaguardas e estado vivem no seu repositório como arquivos simples que qualquer agente pode ler. Sem lock-in, sem cérebro externo — sobrevive a reinícios de contexto.',
        deepLinkLabel: 'Veja o que o onboarding gera',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'O método · Ato V',
        lead: 'O contexto é o recurso mais escasso do seu agente. O harness carrega progressivamente, valida o que mudou e aprende tarefa a tarefa — assim o plano se paga sozinho.',
        deepLinkLabel: 'Leia a metodologia',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'Onboarding baseado em raciocínio',
      title:
        'Aponte-o para qualquer repositório. Ele raciocina — não copia e cola.',
      subtitle:
        'O fluxo de onboarding inspeciona as linguagens, frameworks, gerenciador de pacotes e comandos de validação reais do seu repositório, e então gera artefatos adaptados a esse repositório. Um stub genérico é tratado como uma falha.',
      steps: [
        {
          title: 'Raciocina sobre sua stack e seu arquétipo',
          description:
            'Lê manifestos, a estrutura de pastas e o CI para inferir os comandos reais de teste, lint e build, e então classifica o repositório como um repositório individual ou um hub orquestrador.',
        },
        {
          title: 'Gera AGENTS.md, docs/ e docs por módulo',
          description:
            'Um AGENTS.md fundamentado, uma hierarquia categorizada em docs/ e um README mais docs/ dentro de cada módulo principal — preenchidos com os comandos reais do seu repositório, não com placeholders.',
        },
        {
          title: 'Estrutura o .agents/ com os symlinks de .claude e .cursor',
          description:
            'Um diretório .agents/ multiagente (skills, agents, commands) e os symlinks de .claude e .cursor para .agents, para que cada ferramenta leia uma única fonte de verdade.',
        },
        {
          title: 'Instala a skill DWP e estrutura o .dwp/',
          description:
            'Conecta a skill Deep Work Plan e cria a pasta .dwp/ ignorada pelo git para planos e rascunhos, e então, opcionalmente, adiciona addons opcionais como suporte a devcontainer.',
        },
      ],
    },
    quickstart: {
      badge: 'O que acontece quando você o executa',
      title: 'Uma instrução. O repositório faz o resto.',
      subtitle:
        'Você não escolhe um método de instalação nem copia um template. Você entrega uma linha ao seu agente; ele instala a skill — o motor reutilizável — e adapta seu repositório a ela.',
      steps: [
        {
          title: 'Seu agente abre o /init.md',
          description:
            'Ele lê o prompt de onboarding em deepworkplan.com/init.md e a metodologia, a especificação e o kit aos quais ele se vincula — o padrão que está prestes a adotar.',
        },
        {
          title: 'Ele instala a skill Deep Work Plan',
          description:
            'A skill é o motor — o mesmo em todos os repositórios. Um comando importa o roteador e suas sub-skills (create, execute, refine, resume, status, verify, onboard, author) para Claude Code, Cursor, Codex, Gemini e Copilot.',
        },
        {
          title: 'Ele adapta seu repositório',
          description:
            'Raciocinando sobre sua stack real — nunca copiando e colando — ele escreve AGENTS.md, uma árvore categorizada de docs/, READMEs por módulo, um kit .agents/ fundamentado e um .dwp/ ignorado pelo git. Seu repositório se torna o harness.',
        },
        {
          title: 'Você planeja e executa',
          description:
            'Gere Deep Work Plans de longo prazo para qualquer tarefa e execute-os passo a passo, com critérios de aceitação explícitos, validation gates e estado retomável — de forma autônoma, por horas.',
        },
      ],
      note: 'A skill é instalada de forma idêntica em todos os lugares; o que é adaptado é o seu repositório — o AGENTS.md, os docs e o kit .agents/ fundamentado gerados para a sua stack. É essa separação que torna a metodologia um padrão reutilizável, e não um andaime pontual.',
    },
    outcomes: {
      badge: 'O que você obtém',
      title: 'Tudo o que seu agente precisa para trabalhar de forma autônoma.',
      subtitle:
        'Uma execução, comitada de forma atômica. Toda saída é Markdown e toda alteração é auditável.',
      items: [
        {
          label: 'AGENTS.md na raiz do repositório',
          detail:
            'Fundamentado na stack, nos comandos e na estrutura reais do seu repositório — não um template com placeholders. CLAUDE.md tem symlink para AGENTS.md.',
        },
        {
          label: 'docs/ categorizado e docs por módulo',
          detail:
            'Arquitetura, configuração, padrões e solução de problemas — além de um README e docs/ dentro de cada módulo principal, gerados a partir do seu código.',
        },
        {
          label: '.agents/ com os symlinks de .claude e .cursor para .agents',
          detail:
            'Um diretório .agents/ multiagente (skills, agents, commands) com os symlinks de .claude e .cursor para .agents, para que cada ferramenta leia uma única fonte de verdade.',
        },
        {
          label: 'A skill Deep Work Plan, instalada',
          detail:
            'create, execute, refine, resume, status, verify, onboard e author — disponíveis ao seu agente como um único pacote de skills, sem cópia por repositório.',
        },
        {
          label: 'Conformidade que você pode verificar',
          detail:
            'O /dwp-verify produz um relatório objetivo de aprovado/reprovado em relação à especificação, de modo que "AI-first" seja verificado, não afirmado — e reverificável após cada plano.',
        },
        {
          label: 'Dois arquétipos, tratados',
          detail:
            'O onboarding classifica seu repositório como um repositório individual (o caso comum) ou um hub orquestrador que coordena planos filhos entre repositórios.',
        },
        {
          label: 'Um kit vivo que seu repositório faz crescer',
          detail:
            'A sub-skill author (skill-create, agent-create) permite que o repositório desenvolva suas próprias skills, agents e commands; addons de manutenção opcionais, como dependency-upgrade, ajudam-no a se manter atualizado.',
        },
        {
          label: 'Nativo do git, retomável, .dwp/',
          detail:
            'Sem daemon e sem estado externo. Planos e rascunhos ficam em uma pasta .dwp/ ignorada pelo git, e qualquer tarefa é retomada apenas a partir do git — mesmo após o contexto transbordar.',
        },
      ],
    },
    agents: {
      badge: 'Agentes',
      title: 'Funciona com o agente que você já usa.',
      subtitle:
        'Uma metodologia, muitos adaptadores. O Markdown não acopla o framework a nada — todo agente que lê Markdown pode executar um Deep Work Plan.',
      fullLabel: 'Completo',
      partialLabel: 'Parcial',
      viewAllCta: 'Ver todos os agentes',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'Implementação de referência, com WebFetch nativo e slash commands.',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'Adaptador completo. Use o bundle offline se o WebFetch estiver bloqueado.',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'Bundle offline recomendado; regras instaladas em .codex/.',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'Adaptador completo — os comandos dwp-* são executados via AGENTS.md e procedimentos #.',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'Requer Gemini 2.5 Pro ou mais recente, com WebFetch nativo.',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'Código aberto. Lê AGENTS.md nativamente e executa dwp-* via comandos #.',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'Regras e procedimentos de comando # conduzem o loop completo do Deep Work Plan.',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'Código aberto. Regras em Markdown e comandos # executam cada etapa do dwp-*.',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'Adaptador completo com uma superfície de comandos nativa.',
        },
      ],
    },
    stacks: {
      badge: 'Stacks',
      title: 'Presets de raciocínio para as stacks que importam.',
      subtitle:
        'Estes são auxiliares de raciocínio, não templates. O onboarding lê os manifestos reais do seu repositório e adapta-se por stack — nunca copia um preset às cegas. Monorepos recebem docs por módulo.',
      viewAllCta: 'Ver todos os presets',
      items: [
        { name: 'Django', sub: 'DRF · Poetry' },
        { name: 'FastAPI', sub: 'Pydantic · Poetry' },
        { name: 'Vue', sub: 'Vite · TypeScript' },
        { name: 'React', sub: 'Next · Vite · TS' },
        { name: 'Astro', sub: 'Svelte/React · MDX' },
        { name: 'TypeScript · Node', sub: 'Express · Fastify' },
        { name: 'TypeScript · Lambda', sub: 'Serverless · SAM' },
        { name: 'Go', sub: 'Modules · stdlib' },
        { name: 'Rust', sub: 'Cargo · 2021+' },
        { name: 'Genérico', sub: 'Qualquer stack' },
      ],
    },
    archetypes: {
      badge: 'Dois arquétipos',
      title: 'Repositório individual ou hub orquestrador.',
      subtitle:
        'O onboarding se ramifica conforme o arquétipo. A maioria dos repositórios são repositórios individuais. Um hub coordena Deep Work Plans filhos entre muitos repositórios. A metodologia trata ambos como cidadãos de primeira classe.',
      individual: {
        tag: 'Caso comum',
        title: 'Repositório individual',
        description:
          'Uma única base de código com uma stack principal, seus próprios comandos de validação e docs por módulo. O padrão — o onboarding o assume, a menos que o repositório seja claramente um hub.',
        example:
          'Por exemplo, uma API Django, um app Vue ou um serviço Lambda em TypeScript.',
      },
      orchestrator: {
        tag: 'Coordenação',
        title: 'Hub orquestrador',
        description:
          'Um repositório de coordenação que orquestra o trabalho entre sub-repositórios por meio de um manifesto de orquestração, criando planos filhos que cada um comita em seu próprio repositório, além de regras de fronteira e um índice de navegação.',
        example:
          'Por exemplo, um hub que coordena cinco repositórios de produto.',
      },
    },
    comparison: {
      badge: 'Metodologia versus ferramenta',
      title: 'Uma camada diferente. Complementar, não concorrente.',
      subtitle:
        'O Deep Work Plan não é mais um scaffolder. É a camada de metodologia por baixo de qualquer ferramenta de especificação ou scaffolding, focada em execuções autônomas de várias horas.',
      colDwp: 'Deep Work Plan',
      colOthers: 'Ferramentas de scaffolding / especificação',
      rows: [
        {
          label: 'Foco principal',
          dwp: 'Execução autônoma de várias horas',
          others: 'Geração de especificação ou andaime',
        },
        {
          label: 'Unidade de trabalho',
          dwp: 'Um Deep Work Plan (sessão retomável)',
          others: 'Um documento de especificação ou um andaime',
        },
        {
          label: 'Modelo de estado',
          dwp: 'Pasta .dwp/ nativa do git, retomável',
          others: 'Frequentemente externo ou na IDE',
        },
        {
          label: 'Acoplamento ao agente',
          dwp: 'Independente de agente (Markdown e Bash)',
          others: 'Frequentemente específico de ferramenta ou IDE',
        },
        {
          label: 'Recuperação de contexto',
          dwp: 'Retoma após transbordo de contexto',
          others: 'Normalmente reinicia a tarefa',
        },
        {
          label: 'Licença',
          dwp: 'MIT, metodologia e kit abertos',
          others: 'Varia',
        },
      ],
    },
    origin: {
      badge: 'Origem',
      quote:
        'Construído pela Dailybot — a empresa por trás dos standups assíncronos para equipes distribuídas. Internamente, usamos Deep Work Plans para tornar pilotáveis por agentes repositórios de produção que abrangem Django, Vue, TypeScript Lambda e Astro. Após meses de uso em produção, abrimos o código da metodologia sob a licença MIT.',
      attribution: 'A equipe de engenharia da Dailybot',
      dailybotCta: 'Conheça a Dailybot',
    },
    finalCta: {
      badge: 'Torne seu repositório AI-first',
      title: 'Dê deep work aos seus agentes.',
      subtitle:
        'Entregue uma linha ao seu agente — aponte-o para o /init.md — e ele torna seu repositório AI-first: instala a skill, raciocina sobre sua stack e comita uma hierarquia completa de AGENTS.md. A partir daí, você cria e executa Deep Work Plans que rodam de forma autônoma por horas.',
      primaryCta: 'Abrir o prompt do /init',
      secondaryCta: 'Leia a metodologia',
      tertiaryCta: 'Para agentes e desenvolvedores',
      meta: 'Licenciado sob MIT · zero telemetria · saídas para uma pasta .dwp/ ignorada pelo git.',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'Contato',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Escreva sua mensagem...',
    sendButton: 'Enviar mensagem',
  },

  // About page
  aboutPage: {
    title: 'Sobre a metodologia',
    subtitle: 'Metodologia aberta · Licenciada sob MIT',
    description:
      'O Deep Work Plan é uma metodologia aberta e independente de framework para trabalho de engenharia sério com agentes de código de IA. De onde veio e quem a mantém.',
    heroDescription:
      'Uma estrutura repetível para planejar, executar e verificar deep work com agentes de código de IA — construída de forma aberta e livre para usar.',
    bioTitle: 'O que é',
    bioText:
      'O Deep Work Plan (DWP) é uma metodologia, não um produto. Ele define como transformar um objetivo em um plano acordado, dividir esse plano em tarefas atômicas e verificáveis de forma independente, e executar cada tarefa em um loop focado que termina com uma verificação.<br /><br />É deliberadamente independente de qual agente de IA ou stack você usa — adaptadores traduzem o mesmo loop central para Claude, Cursor, Copilot, Codex, Gemini e outros. O plano, as tarefas e o registro de execução são todos Markdown puro, de modo que o trabalho permanece legível, revisável e versionado.',
    passionsTitle: 'Princípios fundamentais',
    passions: [
      {
        title: 'Planejar antes de executar',
        description:
          'Nenhum código é escrito até que o plano seja acordado. O plano é um contrato entre você e o agente.',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: 'As tarefas são atômicas',
        description:
          'Cada tarefa tem escopo definido para que possa ser executada e verificada por si só, e então comitada de forma atômica.',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: 'Verifique tudo',
        description:
          'Cada tarefa termina com uma verificação explícita antes que a próxima comece, com o progresso registrado no git.',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'Em resumo',
    quickFacts: [
      'Metodologia aberta, licenciada sob MIT',
      'Independente de framework e de agente',
      'Mantida pela Dailybot e pela comunidade',
      'Inclui uma especificação, commands, adaptadores, presets e exemplos',
      'Apenas Markdown — sem runtime, sem lock-in',
      'Transforma qualquer repositório em uma base de código AI-first, pilotável por agentes',
    ],
    ctaTitle: 'Quem a mantém',
    ctaDescription:
      'O Deep Work Plan nasceu de trabalho de engenharia real na Dailybot e agora é mantido pela Dailybot em conjunto com a comunidade de código aberto. A metodologia, a especificação e o kit são lançados sob a licença MIT — livres para usar, adaptar e construir em cima.',
    ctaCv: 'Leia a metodologia',
    ctaContact: 'Início rápido',
  },

  // Contact page
  contactPage: {
    title: 'Comunidade e contato',
    subtitle: 'Código aberto · Orientado pela comunidade',
    description:
      'O Deep Work Plan é construído de forma aberta. Encontre o código-fonte, abra uma issue ou participe da conversa pelos canais abaixo — contribuições são bem-vindas.',
    heroDescription:
      'Dúvidas, ideias ou melhorias? O Deep Work Plan é desenvolvido em público — aqui é onde entrar em contato com o projeto e seus mantenedores.',
    formTitle: 'Envie uma mensagem',
    nameLabel: 'Nome',
    namePlaceholder: 'Seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'seu@email.com',
    reasonLabel: 'Quero entrar em contato sobre',
    reasonOptions: [
      { value: '', label: '— Selecione um tópico —' },
      { value: 'general', label: 'Geral / Apenas um olá' },
      {
        value: 'tech-talk',
        label: 'Palestra técnica / Convite para palestrar',
      },
      { value: 'collaboration', label: 'Colaboração / Parceria' },
      { value: 'project', label: 'Projeto / Consulta de trabalho' },
      { value: 'dailybot', label: 'Pergunta sobre a Dailybot' },
      { value: 'trading', label: 'Perguntas sobre meu trading' },
      {
        value: 'the-library-of-tomorrow',
        label: 'Participar da The Library of Tomorrow',
      },
      { value: 'other', label: 'Outro' },
    ],
    subjectLabel: 'Assunto',
    subjectPlaceholder: 'Sobre o que é?',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Escreva sua mensagem...',
    sendButton: 'Enviar mensagem',
    sendingButton: 'Enviando...',
    successTitle: 'Mensagem enviada!',
    successMessage:
      'Obrigado por entrar em contato. Responderei o mais breve possível.',
    sendAnotherButton: 'Enviar outra mensagem',
    requiredField: 'Este campo é obrigatório',
    invalidEmail: 'Insira um endereço de e-mail válido',
    fallbackMessage:
      'O formulário de contato está indisponível no momento. Você pode falar comigo diretamente por e-mail.',
    fallbackEmailText: 'Envie-me um e-mail para',
    formNote: 'Responderei o mais breve possível.',
    socialTitle: 'Conecte-se comigo',
    locationTitle: 'Localização',
    locationText:
      'Baseado na Colômbia. Aberto a colaboração remota em todo o mundo.',
    prefillSubjects: {
      generalInquiry: 'Consulta geral',
      collaboration: 'Oportunidade de colaboração',
      projectInquiry: 'Consulta de projeto ou trabalho',
      projectCollaboration: 'Consulta de colaboração em projeto',
      startupCollaboration: 'Oportunidade de colaboração em startup',
      techTalkInvitation: 'Convite para palestra técnica',
      tradingQuestion: 'Pergunta sobre trading',
      dailybotQuestion: 'Pergunta sobre a Dailybot',
    },
  },

  contactSection: {
    title: 'Vamos nos conectar',
    description:
      'Estou sempre aberto a conversas interessantes, oportunidades de colaboração e novas ideias. Seja para falar sobre tecnologia, empreendedorismo ou apenas dizer olá.',
    ctaText: 'Entre em contato',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'pt-BR',

  // 404 page
  notFoundPage: {
    title: 'Página não encontrada',
    description:
      'A página que você procura não existe ou foi movida. Explore a metodologia ou volte à página inicial para continuar navegando.',
    heading: 'Página não encontrada',
    message:
      'Desculpe, a página que você procura não existe ou pode ter sido movida. Tente voltar à página inicial ou explorar a metodologia.',
    backHome: 'Voltar ao início',
    exploreMethodology: 'Leia a metodologia',
    agentTitle: 'Para agentes de IA',
    agentIntro:
      'Este caminho não existe. Os links de recuperação abaixo (e seus equivalentes legíveis por máquina) listam todas as páginas deste site.',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'A Metodologia Deep Work Plan',
      description:
        'Cinco capítulos do manifesto aos arquétipos: os princípios, o loop central, os templates, as skills e agents, e as adaptações por trás do Deep Work Plan.',
    },
    eyebrow: 'Metodologia',
    title: 'A Metodologia Deep Work Plan',
    intro:
      'Cinco capítulos que levam você da filosofia por trás do Deep Work Plan ao loop prático, aos templates e às adaptações que você usa todos os dias.',
    chapterLabel: 'Capítulo',
    readChapter: 'Ler capítulo',
    prev: 'Anterior',
    next: 'Próximo',
    backToIndex: 'Todos os capítulos',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Especificação do Deep Work Plan',
      description:
        'A especificação legível da metodologia Deep Work Plan: o formato DWP, o protocolo de agente, os arquétipos, o padrão de documentação e os addons.',
    },
    eyebrow: 'Especificação',
    title: 'Especificação',
    intro:
      'A especificação precisa e legível da metodologia — as estruturas e os protocolos que humanos e agentes compartilham.',
    tocTitle: 'Nesta página',
    prev: 'Anterior',
    next: 'Próximo',
    backToIndex: 'Todos os documentos da especificação',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'O Kit do Deep Work Plan',
      description:
        'A skill e suas oito sub-skills, commands, adaptadores, presets, addons opcionais e exemplos que tornam o Deep Work Plan executável em diversos agentes e stacks.',
    },
    eyebrow: 'Kit',
    title: 'O Kit',
    intro:
      'Tudo o que você precisa para executar a metodologia: a skill e suas sub-skills, slash commands, adaptadores de agente, presets de onboarding, addons opcionais e exemplos práticos.',
    groups: {
      command: {
        title: 'Sub-skills e commands',
        description:
          'O roteador da skill e suas sub-skills (create, execute, refine, resume, status, verify, onboard, author), além dos slash commands enxutos que delegam a elas.',
      },
      adapter: {
        title: 'Adaptadores',
        description:
          'Integrações enxutas por agente para Claude, Cursor, Codex e outros.',
      },
      preset: {
        title: 'Presets de onboarding',
        description:
          'Guias de raciocínio por stack que o fluxo de onboarding usa para adaptar docs, skills e comandos de validação ao seu repositório.',
      },
      example: {
        title: 'Exemplos',
        description: 'Passos a passo práticos, de antes e depois.',
      },
      addon: {
        title: 'Addons (opcionais)',
        description:
          'Capacidades opcionais que o fluxo de onboarding pode adicionar a um repositório — nunca parte da base AI-first.',
      },
    },
    viewDetail: 'Ver detalhes',
    prev: 'Anterior',
    next: 'Próximo',
    backToIndex: 'Voltar ao kit',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Exemplos do Deep Work Plan',
      description:
        'Passos a passo de antes e depois mostrando a mesma tarefa de engenharia com e sem um Deep Work Plan — e a diferença em confiabilidade e revisão.',
    },
    eyebrow: 'Exemplos',
    title: 'Exemplos',
    intro:
      'Veja a metodologia em ação — passos a passo concretos, de antes e depois, de tarefas reais de engenharia.',
    viewExample: 'Ler o passo a passo',
    prev: 'Anterior',
    next: 'Próximo',
    backToGallery: 'Todos os exemplos',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'Início rápido — Deep Work Plan',
      description:
        'Instale a skill, faça o onboarding do seu repositório e planeje e execute com qualquer agente — os passos que tornam seu repositório orientado a especificação e pilotável por agentes.',
    },
    eyebrow: 'Início rápido',
    title: 'Comece em minutos',
    intro:
      'Instale a skill, faça o onboarding do seu repositório e planeje e execute com qualquer agente — os passos que tornam seu repositório orientado a especificação e pilotável por agentes.',
    sequenceTitle: 'O caminho de adoção',
    codeLabel: 'Terminal',
    orLabel: 'ou',
    steps: [
      {
        title: 'Instale a skill Deep Work Plan',
        description:
          'Adicione a skill ao seu repositório — um roteador mais oito sub-skills (create, execute, refine, resume, status, verify, onboard, author). Use a CLI de Skills para o caminho mais rápido, ou clone o repositório e execute a configuração onde git e um shell estiverem disponíveis.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Faça o onboarding do repositório',
        description:
          'Execute a sub-skill onboard e deixe o agente raciocinar sobre seu repositório real. Ele gera AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório .agents/ multiagente (com os symlinks de .claude → .agents e .cursor → .agents), conecta os comandos enxutos dwp-* e estrutura um .dwp/ ignorado pelo git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolua o kit e aceite addons',
        description:
          'Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands apropriados à sua stack. O onboarding também oferece cinco addons opcionais — devcontainer, Dailybot, dependency-upgrade, design-system e AI Diff Reviewer — que você aceita apenas quando fizerem sentido.',
      },
      {
        title: 'Planeje e execute',
        description:
          'Gere um Deep Work Plan e execute-o tarefa a tarefa, validando cada gate e retomando entre sessões — pilotando o repositório contra sua própria especificação.',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'O resultado',
    outcome:
      'Seu repositório se torna orientado a especificação e pilotável por agentes: o plano é a fonte de verdade duradoura e o próprio repositório se torna o harness contra o qual qualquer agente executa.',
    nextStepsTitle: 'Próximos passos',
    nextSteps: [
      { label: 'Leia a metodologia', href: '/methodology' },
      { label: 'Explore o kit', href: '/kit' },
      { label: 'Veja exemplos', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Torne seu repositório AI-first',
      description:
        'Adote a metodologia Deep Work Plan em qualquer repositório. Instale a skill, execute o onboarding do agente e planeje e execute com qualquer agente de código de IA.',
    },
    eyebrow: 'Adoção',
    title: 'Torne este repositório AI-first',
    intro:
      'Um único endpoint para transformar qualquer repositório em uma base de código orientada a especificação e pronta para agentes. Instale a skill, deixe um agente fazer o onboarding do repositório e então planeje e execute trabalho estruturado com qualquer agente de código.',
    handoffTitle: 'Copie para o seu agente',
    handoffBody:
      'Copie o prompt completo do init.md e cole-o no seu agente de código IA — Claude Code, Cursor, Codex, ou qualquer outro. Ele lê a metodologia e a especificação, instala a skill e faz o onboarding deste repositório para Deep Work Plans.',
    handoffInstruction:
      'Leia e siga as instruções em https://deepworkplan.com/init.md para tornar este repositório AI-first.',
    handoffMdLabel: 'Prompt de agente autocontido',
    codeLabel: 'agent',
    whatTitle: 'O que isto faz',
    whatBody: [
      'A adoção altera o repositório de duas formas duradouras — os pilares da metodologia.',
      'Primeiro, o repositório se torna orientado a especificação: o trabalho começa a partir de um plano e uma especificação escritos, não de prompts ad hoc. Segundo, o próprio repositório se torna o harness do agente — um AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório de skills .agents/ (com os symlinks de .claude → .agents e .cursor → .agents) dão a cada agente o contexto e os comandos de que ele precisa.',
    ],
    sequenceTitle: 'A sequência de adoção',
    orLabel: 'ou',
    steps: [
      {
        title: 'Verifique antes de instalar',
        description:
          'Trate o prompt e a skill como não confiáveis até tê-los verificado. Ambos são de código aberto e com licença MIT; a skill é Markdown-first sem chamadas de rede e sem telemetria. Cada versão publica um SHA256SUMS sobre os arquivos da skill, para que você possa confirmar que sua cópia corresponde antes de executá-la. As versões têm checksums, não assinaturas (assinaturas são o próximo passo documentado).',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'Instale a skill',
        description:
          'Adicione a skill Deep Work Plan para que qualquer agente possa planejar e executar trabalho estruturado. A skill traz um roteador mais oito sub-skills — create, execute, refine, resume, status, verify, onboard e author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Execute o onboarding do repositório',
        description:
          'Invoque a sub-skill onboard e deixe o agente raciocinar sobre o repositório real — sua stack, gerenciador de pacotes e comandos de validação reais. Ele então gera AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório .agents/ multiagente (com os symlinks de .claude → .agents e .cursor → .agents), conecta os comandos enxutos dwp-* e estrutura um .dwp/ ignorado pelo git para planos e rascunhos. Para repositórios grandes, a sub-skill onboard utiliza um caminho orientado por plano: completa o reconhecimento e então emite um Deep Work Plan de onboarding. Nada é gerado por template; tudo é adaptado ao seu repositório.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Aceite addons opcionais',
        description:
          'O onboarding oferece cinco addons opcionais — devcontainer, Dailybot, dependency-upgrade, design-system e AI Diff Reviewer — que você aceita apenas quando fizerem sentido. Um repositório é totalmente conforme com zero addons. Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands além do conjunto base.',
      },
      {
        title: 'Planeje e execute',
        description:
          'Gere Deep Work Plans com /dwp-create e execute-os com /dwp-execute, depois /dwp-status, /dwp-refine, /dwp-resume e /dwp-verify conforme o trabalho avança. Cada plano carrega tarefas numeradas, validation gates e um protocolo de conclusão — finalizando com três tarefas finais obrigatórias: uma Revisão de Segurança, uma Descoberta de Skills e Agents e um Relatório Executivo.',
      },
      {
        title: 'Verifique a conformidade',
        description:
          'Execute /dwp-verify para obter um relatório objetivo de aprovação/reprovação em relação à especificação. Confirme que AGENTS.md, docs/ (com conteúdo real, não stubs), .agents/ (com delegadores enxutos dwp-* e um catálogo que corresponde ao disco), .dwp/ e tmp/ estão presentes — nada gerado por template, tudo raciocinado para este repositório.',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'O resultado',
    outcome:
      'O repositório se torna orientado a especificação e o próprio repositório se torna o harness do agente — contexto e comandos viajam junto com o código.',
    nextStepsTitle: 'Leia a seguir',
    nextSteps: [
      { label: 'Início rápido', href: '/quickstart' },
      { label: 'Metodologia', href: '/methodology' },
      { label: 'Especificação', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  faqPage: {
    meta: {
      title: 'Frequently asked questions — Deep Work Plan',
      description:
        'Answers to the questions people ask about Deep Work Plan: what it does, how gates and resumption work, how it compares with other tools, and how to adopt it.',
    },
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    intro:
      'Short answers to what people ask most about Deep Work Plan, each with a link to the page that goes deeper.',
    groups: [
      {
        id: 'what',
        title: 'What Deep Work Plan is',
        items: [
          {
            id: 'what-is-it',
            question: 'What does Deep Work Plan actually do?',
            answer:
              'Deep Work Plan turns a repository into a structured environment where a coding agent can execute long work reliably. It installs as an agent skill, onboards the repository once (an `AGENTS.md` index, a `docs/` tree, a `.agents/` kit of skills and commands, a gitignored `.dwp/` output area), and from then on any goal becomes a plan: atomic tasks, each with acceptance criteria and a validation gate, executed one at a time, committed as they pass, and resumable from disk by any agent. The plan closes with a Final Review that audits security and validates the final state. The methodology is MIT-licensed and works with any coding agent that reads a repository.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Who is it for?',
            answer:
              'Developers and teams who hand real, multi-step work to coding agents and want it to finish. It fits when a task spans more than one session, more than one file family, or more than one agent; when a teammate must be able to pick up where an agent stopped; or when "done" must mean "validated", not "the agent said so". A one-line fix does not need a plan, and the methodology says so: its proportional-rigor rule recommends an inline goal, criteria and gate instead.',
            linkLabel: 'Quickstart',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'Is it a tool, a framework or a methodology?',
            answer:
              'A methodology packaged as an installable skill. There is no server, no account, no proprietary format and no runtime beyond the coding agent you already use. What gets installed is instructions the agent reads, a small set of shell scripts for context detection and conformance checking, and the conventions your repository adopts. Everything the plan produces is Markdown and JSON in your repository, readable without any tool.',
            linkLabel: 'Read the specification',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Which coding agents does it work with?',
            answer:
              "Any agent that reads repository files. The skill follows the open Agent Skills standard and the `AGENTS.md` convention, so Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot and others pick it up through their normal skill and instruction loading. The methodology's own evaluation shows a plan started by one vendor's agent and resumed by another's in both directions. Installation coverage and behavioral evidence are listed per agent in the compatibility matrix, and the two are never conflated.",
            linkLabel: 'Browse the kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'How a plan runs',
        items: [
          {
            id: 'gates',
            question:
              'How are the validation gates implemented? Do they need human sign-off?',
            answer:
              "They are executable assertions the agent runs itself. Human sign-off bookends the run: a person approves the plan before execution and reviews the final diff at pull-request time; execution in between is autonomous. Every task names concrete commands, typically the repository's own quality gate, selected from the task's touched surface: the tests of the changed behavior and its consumers, widening to the full suite when the change is shared or cannot be bounded. A task is marked done only when those commands exit successfully, and tasks that change behavior must extend the tests. On failure the task is marked blocked and the agent stops.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'How does the plan avoid going stale when people change the code between runs?',
            answer:
              'On three fronts. Tasks are written as behavior, not edits: an acceptance criterion says what the system must do, so a renamed file or a swapped implementation does not invalidate it. Every gate re-runs against the repository as it is now, so a broken assumption fails loudly at the next run instead of drifting silently, and that failure is the cue to refine. And keeping documentation in sync is part of the work: a task that changes behavior also updates the docs and the agent-facing kit that describe it, inside its own gate. Every run should leave the repository more agent-ready than it found it.',
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Can I change the plan mid-run without losing completed work?',
            answer:
              'Yes; refining a partially executed plan is a first-class move. Task definitions and execution state are kept separate: the plan is a checklist on disk plus a small state file, so what is done stays recorded independently of the task text. When a task turns out to be wrong, the agent marks it blocked and stops rather than pushing through. You then edit, reorder, split or drop the tasks that have not run, while completed tasks stay completed. Resuming rebuilds state from disk and the actual repository and re-runs the gates that matter, so nothing that shifted underneath slips by.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Does it keep checking the work against the plan, or is the plan an upfront thing?',
            answer:
              'The plan is a continuous check. The agent works one small task at a time and must validate before moving on, so it can wander one step, not three. Every task carries acceptance criteria plus the exact commands that prove them, and progress is written into the repository as it goes, with a status per task, so drift becomes visible to you, to the next session and to the next agent. A plan is not finished until everything validates, including the Final Review. The honest caveat: the methodology cannot stop an agent from writing a weak acceptance criterion in the first place; it makes drift loud instead of silent.',
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'Is the plan generated once and maintained by hand, or does it evolve with the code?',
            answer:
              "Neither. It is generated once from a goal and then maintained as part of the work. The plan is deliberately not rewritten from code diffs, because a spec that chases the code becomes a lagging mirror, which is the drift the methodology exists to kill. It evolves on purpose: gates re-run against the current repository, a failing gate triggers a refinement, and the agent performs that refinement during the run while you approve up front and review at the end. Documentation and tests evolve alongside the code by construction, because updating them is inside each task's gate.",
            linkLabel: 'Read the methodology',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'What happens if the session dies halfway?',
            answer:
              "Progress lives on disk, not in the chat. The README checkboxes, each task's log, a bounded working index and a machine-readable state file are updated at every task boundary, and the state file records a checkpoint before any planned pause. A fresh session, or a different agent, reads that compact index, reconciles it with the repository and git history, and continues at the first incomplete task without redoing finished work. Even an interrupted plan creation is recoverable: the plan's identity and intended task list are written before any task file, so a half-created plan can be completed or discarded rather than guessed at.",
            linkLabel: 'The core loop',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'What is the Final Review?',
            answer:
              "The single mandatory closing task of every plan. In order: a security pass over the plan's full accumulated change set, including a required local review of the diff by the AI Diff Reviewer skill, with critical findings blocking completion until fixed or explicitly accepted; final-state validation, meaning the repository's complete applicable test, lint, type-check and format suites on the final code; and a reconciliation of the skills decisions each task recorded. The agent then reports deliverables, evidence and limitations, and offers an Executive Report once, generating it only if you ask.",
            linkLabel: 'The specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'How it compares',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'How is it different from spec-driven tools such as Spec Kit, OpenSpec or Kiro?',
            answer:
              "They solve adjacent problems. Spec-driven tools are excellent at capturing what should change: specifications, requirements and change proposals in a repeatable shape. Deep Work Plan is about how an agent executes for hours without drifting: the onboarded harness, per-task validation gates selected from the touched surface, on-disk resumable state, a mandatory Final Review with a security pass, and a conformance checker for the repository itself. The two can be combined, with a spec or change proposal feeding a plan. The comparison page lays the capabilities side by side, on each tool's own terms.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'How is it different from agent workflow frameworks such as BMAD, Superpowers or Get Shit Done?',
            answer:
              'Those frameworks bring strong working styles: roles, principles, test-first steps, verification habits. Deep Work Plan focuses on what stays in the repository and what can be checked: a harness any agent reads cold, task files with acceptance criteria and gates, state that survives a session, a conformance checker with a CI-friendly exit code, and a published measurement of how many instruction bytes each flow loads. It is tool-agnostic by construction and adds no service, provider or secret to the core loop. The comparison page shows where each approach is built in, optional or out of scope.',
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: "Why not just use my agent's built-in plan mode?",
            answer:
              "Built-in plan modes are useful and Deep Work Plan builds on the same substrate, the `AGENTS.md` convention and the open Agent Skills standard. The difference is where the plan lives and what enforces it. Native plans usually live outside the repository and expire with the session; Deep Work Plan writes the plan, its state and its evidence into the repository, so another agent or a teammate can continue it, and every task carries an executable gate and a recorded log. You keep using your agent's plan mode for thinking; the methodology adds the durable, verifiable execution loop.",
            linkLabel: 'See the comparison',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adopting it',
        items: [
          {
            id: 'install',
            question:
              'What does onboarding write into my repository, and does it touch existing files?',
            answer:
              'Onboarding is non-destructive: it detects an existing `AGENTS.md`, `docs/`, `.agents/` or `CLAUDE.md`, reconciles rather than overwrites, and asks before replacing anything. It writes the `AGENTS.md` index with real commands, a reasoned `docs/` tree, per-module docs, the `.agents/` kit with thin `dwp-*` commands, a gitignored `.dwp/` output area, a verified testing map, and the required local code review (the AI Diff Reviewer skill plus a repo-tailored review extension). It then runs a self-check and the conformance checker so you can see what was produced. A repository onboarded under an earlier version gets a targeted upgrade that changes only what is missing.',
            linkLabel: 'The adoption endpoint',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'What does it cost, and how is efficiency measured?',
            answer:
              'The methodology and the skill are MIT-licensed and free; there is no service, no API key and no telemetry in the core flows. Efficiency is reported as the number of instruction bytes each flow loads, measured by a script committed with the skill and published in an evaluation ledger, with increases reported as plainly as decreases. It is not reported as token percentages or cost savings, because a byte inventory does not establish those; a pre-registered public evaluation is planned to measure outcomes properly.',
            linkLabel: 'Trust and disclosure',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Still have a question?',
      body: 'Open a discussion or an issue on GitHub. Questions that come up repeatedly are added to this page.',
      ctaLabel: 'Ask on GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan compared with the alternatives — Deep Work Plan',
      description:
        'How Deep Work Plan relates to spec-driven tools, agent workflow frameworks and vendor plan modes: each on its own terms, with sources and a review date.',
    },
    eyebrow: 'Compare',
    title: 'Deep Work Plan and the alternatives',
    intro:
      'Pick the right layer for your situation. Each alternative is described on its own terms, every fact traces to its official documentation, and the page says when it was last reviewed. This is a map, not a ranking.',
    howToRead: {
      title: 'How to read this page',
      body: 'Three values describe each capability. They say where a capability lives in a tool, not how good the tool is.',
      values: {
        builtIn: 'Built in',
        optional: 'Optional or via extension',
        notInScope: 'Not in scope',
      },
    },
    reviewedOnLabel: 'Last reviewed',
    alternativesTitle: 'The alternatives, on their own terms',
    officialSiteLabel: 'Official site',
    categories: {
      methodology: 'Methodology',
      sdd: 'Spec-driven development tools',
      agentFramework: 'Agent workflow frameworks',
      vendorNative: 'Vendor-native plan modes',
    },
    matrix: {
      title: 'Capability matrix',
      caption:
        'Where each capability lives, per tool. Built in, optional or via extension, or not in scope. Reviewed against official documentation.',
      capabilityColumn: 'Capability',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Works with any coding agent',
        help: 'The same repository files drive Claude Code, Codex, Cursor, Gemini CLI and others.',
      },
      repoNativeHarness: {
        label: 'Writes the agent harness into the repository',
        help: "Instructions, docs, skills and commands live in the repository, not in one tool's settings.",
      },
      taskAcceptanceCriteria: {
        label: 'Acceptance criteria per task',
        help: 'Each task states observable conditions for being done.',
      },
      perTaskGates: {
        label: 'Validation gate per task',
        help: 'Each task names the commands that must pass, selected from what it touched.',
      },
      resumableState: {
        label: 'Resumable state on disk',
        help: 'Progress survives a session reset and can be picked up by another agent or a teammate.',
      },
      finalReview: {
        label: 'Mandatory closing review with a security pass',
        help: 'The plan cannot complete without a security review of the full change set and validation of the final state.',
      },
      conformanceChecker: {
        label: 'Executable conformance checker',
        help: 'A script verifies the repository and its plans against the standard, with a CI-friendly exit code.',
      },
      instructionBudgetLedger: {
        label: 'Published instruction-load measurement',
        help: 'The bytes each flow loads are measured by a committed script and published with their limits.',
      },
      onboardingScaffold: {
        label: 'Onboarding that scaffolds documentation',
        help: "A first run writes the repository's agent-facing documentation and kit.",
      },
      brownfieldSpecs: {
        label: 'Living specs for existing systems',
        help: 'Changes are specified as deltas that merge into a growing specification of the system.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Installs as a skill, onboards the repository into an agent harness and runs long-horizon plans with per-task validation gates, on-disk state and a mandatory Final Review.',
        audience:
          'Developers and teams who hand multi-session work to any coding agent and need it to finish verified.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Turns a feature into an executable specification through a constitution, a spec, a plan and a task list, driven by slash commands that integrate with more than fifty coding agents.',
        audience:
          'Teams that want a repeatable specify, plan, tasks and implement workflow inside the agent they already use.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captures each change as a proposal with delta specs (added, modified, removed) and RFC 2119 requirements with scenarios, then archives them into living specifications.',
        audience:
          'Teams working on existing systems who want specifications to grow one change at a time.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'An agentic IDE and CLI whose specs move from EARS-style requirements to design to tasks, with steering files and hooks that run on editor events.',
        audience:
          'Developers who want spec-driven development built into their editor with AWS-backed tooling.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'An agile framework of specialized agent roles (analysis, product, architecture, development, quality) that produces briefs, requirements, architecture documents and story files.',
        audience:
          'Teams that like role-based ceremonies and want a full agile lifecycle for agent work.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'A skills library and workflow for brainstorming, planning in small test-first steps, executing with subagents and reviewing before completion.',
        audience:
          'Developers who want disciplined test-driven execution inside their coding agent.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'A planning system with a .planning directory, requirement ids, phase plans, fresh-context execution and a verification pass against stated must-haves.',
        audience:
          'Solo developers and small teams who want context engineering and verification without heavy ceremony.',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'Claude Code, Codex, Cursor and Gemini CLI ship plan modes, instruction files and skills that follow the AGENTS.md and Agent Skills standards.',
        audience:
          'Anyone who wants planning inside a single agent without adopting a methodology.',
      },
    },
    dwpStrengths: {
      title: 'What Deep Work Plan brings',
      items: [
        {
          title: 'Tool-agnostic and repository-native',
          body: 'The harness and the plan are files in your repository, read by any agent that follows the AGENTS.md and Agent Skills standards. Switching agents does not lose the plan.',
        },
        {
          title: 'Validation selected from what each task touched',
          body: 'Every task declares its touched surface and runs the tests of the changed behavior and its consumers, widening to the full suite when the impact cannot be bounded. Zero selected tests is never a pass.',
        },
        {
          title: 'One Final Review with a security pass',
          body: 'A plan closes with a security review of the accumulated change set, including a required local review of the diff, and a validation of the final state. Critical findings block completion.',
        },
        {
          title: 'State that survives sessions and agents',
          body: 'README checkboxes, task logs, a bounded working index and a machine-readable state file are written at every boundary, so another session or another agent continues from disk. Even an interrupted plan creation is recoverable.',
        },
        {
          title: 'A conformance checker for the repository itself',
          body: 'A read-only script verifies the harness and every plan against the specification, understands both plan lifecycles and exits with a CI-friendly code.',
        },
        {
          title: 'Instruction load measured and published',
          body: 'A committed script measures how many bytes each flow loads; the results, including the increases, are published as bytes, never as token or cost percentages.',
        },
      ],
    },
    honestLimits: {
      title: 'Honest limits',
      body: 'Deep Work Plan has no living or delta specification mechanism; OpenSpec and similar tools are stronger there. No independent benchmark of the methodology exists yet; a pre-registered public evaluation is planned. The instruction-load ledger measures bytes loaded, not tokens, cost or outcomes.',
    },
    correction: {
      title: 'Help us keep this accurate',
      body: 'This page is reviewed on the date shown and corrected on request. If a description of your tool is out of date or incomplete, open an issue and we will fix it.',
      ctaLabel: 'Open an issue',
    },
    sourcesTitle: 'Sources',
  },

  trustPage: {
    meta: {
      title: 'Confiança e segurança',
      description:
        'Por que o Deep Work Plan é seguro de adotar: código aberto e MIT, Markdown-first sem chamadas de rede nem telemetria, não destrutivo por design, com instalações verificáveis e uma política clara de divulgação de vulnerabilidades.',
    },
    eyebrow: 'Confiança e segurança',
    title: 'Confiança e segurança',
    intro:
      'Ninguém deveria instalar uma skill em que não pode confiar. O Deep Work Plan foi desenvolvido para ser verificado, não aceito por fé: código aberto, Markdown-first, não destrutivo e verificável antes de ser executado. Esta página explica claramente o que ele faz, o que ele não faz e como confirmar ambos.',
    pillarsTitle: 'No que você está confiando',
    pillars: [
      {
        title: 'Código aberto e licença MIT',
        body: 'O site e a skill são públicos e passíveis de revisão. Você pode ler cada linha antes de executar e comparar qualquer cópia com o código-fonte em uma versão etiquetada.',
      },
      {
        title: 'Markdown-first — sem rede, sem telemetria',
        body: 'A skill não tem CLI, API HTTP nem fluxo de autenticação. Ela não faz chamadas de rede e não envia telemetria; seu único helper local lê metadados do git e do ambiente. Nada do seu repositório sai da sua máquina.',
      },
      {
        title: 'Não destrutivo por design',
        body: 'A única ação relevante para a segurança que a skill executa é alterar o seu repositório — e ela reconcilia em vez de sobrescrever. Detecta o que existe, propõe um plano e pergunta antes de substituir qualquer coisa. O resultado dos planos fica em uma pasta .dwp/ ignorada pelo git.',
      },
      {
        title: 'Não acessa segredos',
        body: 'A metodologia nunca comita segredos e mantém o estado de trabalho fora do controle de versão. O onboarding acrescenta ao .gitignore em vez de reescrevê-lo, e cada alteração é pensada para ser revisada em diffs pequenos e legíveis.',
      },
      {
        title: 'Procedência verificável',
        body: 'Cada versão publica checksums sobre a skill distribuída, para que você possa confirmar que uma cópia baixada corresponde ao que foi publicado antes de confiar nela.',
      },
    ],
    verifyTitle: 'Verifique antes de executar',
    verifyIntro:
      'Trate a skill como não confiável até tê-la verificado. Cada versão anexa um arquivo SHA256SUMS cobrindo a skill distribuída. Baixe-o para a versão que pretende instalar e verifique se a sua cópia corresponde — uma saída diferente de zero significa que um arquivo não corresponde e você deve parar.',
    codeLabel: 'shell',
    verifyNote:
      'As versões têm checksums, não assinaturas criptográficas — a assinatura (cosign ou GPG do mantenedor) é o próximo passo documentado, não uma garantia atual. Como tudo é aberto, você também pode comparar qualquer arquivo com o repositório na sua tag.',
    disclosureTitle: 'Reportar uma vulnerabilidade',
    disclosureBody:
      'Encontrou um problema de segurança? Reporte-o de forma privada pelo sistema de reporte privado de vulnerabilidades do GitHub no repositório relevante — a skill ou o site (veja as políticas de segurança vinculadas abaixo) — em vez de abrir uma issue pública, o que exporia o problema antes de existir uma correção.',
    resourcesTitle: 'Recursos de confiança',
    linkManifest: 'Manifesto de confiança legível por máquina',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'Política de segurança do site',
    linkSkillPolicy: 'Política de segurança e modelo de ameaças da skill',
    limitationsTitle: 'Limitações honestas',
    limitations: [
      'As versões têm checksums, mas ainda não estão criptograficamente assinadas — a assinatura está planejada, não implementada.',
      'O Deep Work Plan executa um agente de coding autônomo no seu repositório. Revise o plano proposto e seus diffs; a metodologia foi projetada para essa revisão, não para substituí-la.',
      'As afirmações de confiança aqui descrevem apenas as fontes oficiais. Uma cópia modificada ou de terceiros que tenha se afastado dos repositórios não tem nenhuma dessas garantias — verifique-a primeiro.',
    ],
    ctaTitle: 'Adote com confiança',
    ctaBody:
      'Leia a metodologia e a especificação, aponte um agente para o endpoint de init e verifique a instalação antes de executá-la.',
    ctaPrimary: 'Leia a metodologia',
    ctaSecondary: 'Adoção (init)',
  },

  developersPage: {
    meta: {
      title:
        'Desenvolvedores — API para agentes, servidor MCP e documentação do Deep Work Plan',
      description:
        'A superfície para agentes do Deep Work Plan: API somente leitura sem autenticação, OpenAPI, servidor MCP em /api/mcp e Markdown por página em 17 idiomas.',
    },
    eyebrow: 'Superfície para agentes e desenvolvedores',
    title: 'Deep Work Plan para desenvolvedores e agentes de IA',
    intro:
      'O deepworkplan.com publica uma superfície legível por máquina junto às suas páginas: uma API para agentes descrita com OpenAPI, um servidor MCP sem estado, espelhos nativos em Markdown de cada página em 17 idiomas e a skill DWP instalável. Tudo nesta página está ativo, é público e gratuito — não há nada para se cadastrar.',
    accessTitle: 'Sem autenticação por design',
    accessIntro:
      'Não há chaves de API para gerar, nenhuma dança de OAuth e nenhum sandbox separado de produção — a própria superfície de produção é o sandbox. Isso é uma propriedade deliberada da metodologia: agentes não conseguem preencher formulários de "falar com vendas", então o site nunca pede um.',
    accessPoints: [
      {
        title: 'Somente leitura',
        body: 'Cada operação é um GET seguro e armazenável em cache — exceto o endpoint MCP, que é POST. Não há operações de escrita, uploads nem mudanças de estado em lugar nenhum.',
      },
      {
        title: 'Sem chaves de API',
        body: 'Sem registro, sem tokens, sem níveis de limite de requisições. O acesso anônimo é o contrato documentado, declarado em /auth.md e nos stubs de descoberta de OAuth.',
      },
      {
        title: 'Grátis e de código aberto',
        body: 'O conteúdo do site e a skill DWP são licenciados sob MIT. Use-os em trabalho comercial e não comercial sem pedir permissão.',
      },
      {
        title: 'Pensado para as máquinas',
        body: 'Erros JSON estruturados nas rotas /api, corpos de recuperação 404 em Markdown, catálogo de API RFC 9727 e um manifesto de capacidades ARD — construído para o consumo por agentes.',
      },
    ],
    endpointsTitle: 'Endpoints',
    endpointsIntro:
      'Os endpoints centrais da API para agentes. A especificação completa e tipada — cada operação, parâmetro e esquema de resposta — vive no documento OpenAPI.',
    endpointsNote:
      'Rotas /api/* desconhecidas retornam um erro JSON estruturado com uma dica de resolução, nunca uma página de erro HTML.',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'Especificação OpenAPI 3.1 de toda a API para agentes.',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description:
          'Índice curado de orientação para LLMs — o ponto de entrada recomendado para agentes.',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'O prompt canônico de adoção do DWP (torna qualquer repositório AI-first).',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'Qualquer página como Markdown fonte nativo — em todos os 17 idiomas (ex.: /es/developers.md).',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description:
          'Marcador de saúde estático com links para a especificação e este portal.',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'Servidor MCP (Streamable HTTP, sem estado): initialize, ping, tools/list, tools/call.',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description:
          'Manifesto de capacidades ARD — o agentmap declarado no robots.txt.',
      },
    ],
    mcpTitle: 'Servidor MCP',
    mcpIntro:
      'Um servidor de Model Context Protocol sem estado sobre Streamable HTTP. Três ferramentas somente leitura: get_init_prompt, list_site_sections e read_page. As versões de protocolo 2025-03-26 e 2025-06-18 são suportadas; nenhuma sessão é necessária.',
    mcpCodeLabel: 'Terminal — JSON-RPC sobre HTTP',
    mcpNote:
      'O manifesto MCP vive em /.well-known/mcp.json e o card do servidor em /.well-known/mcp/server-card.json. Claude, ChatGPT e qualquer cliente MCP podem chamar essas ferramentas de forma nativa.',
    markdownTitle: 'Markdown para agentes',
    markdownIntro:
      'Cada página renderizada é publicada como Markdown fonte nativo — não uma conversão de HTML. Solicite Markdown explicitamente com um sufixo de URL ou por meio de negociação de conteúdo HTTP em qualquer página.',
    markdownCodeLabel: 'Terminal — negociação de conteúdo',
    markdownNote:
      'A negociação de conteúdo devolve o mesmo Markdown fonte do qual o site renderiza, no idioma da URL que você solicitar.',
    cliTitle: 'Instale o kit',
    cliIntro:
      'O caminho oficial de instalação da skill Deep Work Plan — o mesmo comando que o endpoint /init dá aos agentes. Funciona com qualquer agente de código compatível com skills (Claude Code, Cursor, Codex, Gemini e outros).',
    cliCodeLabel: 'Terminal — CLI de skills',
    cliNote:
      'A skill é vendorizada em .agents/skills/deepworkplan/ dentro do seu repositório, de modo que todo agente que toca o repositório compartilha a mesma metodologia.',
    resourcesTitle: 'Recursos legíveis por máquina',
    resources: [
      { label: 'Especificação OpenAPI (/openapi.json)', href: '/openapi.json' },
      {
        label: 'Declaração de acesso e autenticação de agentes (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'Catálogo de API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'Manifesto MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'Contato de segurança (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'Descritor do repositório do site (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'Aponte um agente para ele',
    ctaBody:
      'O caminho mais rápido continua sendo uma linha: entregue o prompt do /init a qualquer agente de código e ele instala a skill, faz o onboarding do seu repositório e começa a concluir deep work.',
    ctaPrimary: 'Abrir o prompt do /init',
    ctaSecondary: 'Leia a metodologia',
  },

  privacyPage: {
    meta: {
      title: 'Privacidade — Deep Work Plan',
      description:
        'A política de privacidade do deepworkplan.com: site estático sem contas nem publicidade, análise sem cookies e o que o formulário de contato coleta.',
    },
    eyebrow: 'Política de privacidade',
    title: 'Privacidade no deepworkplan.com',
    intro:
      'O Deep Work Plan é um site estático de documentação e metodologia. Esta página explica, de forma simples e completa, quais dados o site toca quando você o visita: não há sistema de contas, publicidade ou rastreamento entre sites em lugar nenhum.',
    lastUpdated: '8 de setembro de 2026',
    sections: [
      {
        heading: 'O que é o site',
        body: 'deepworkplan.com é uma coleção de páginas estáticas servidas por uma CDN. Não há login, banco de dados de usuários nem forma de o site armazenar perfis pessoais. O conteúdo é desenvolvido em repositórios públicos do GitHub sob a organização DailybotHQ, e tudo o que você lê aqui é servido exatamente como foi construído.',
      },
      {
        heading: 'Análise de uso',
        body: 'O site usa o Umami, um serviço de análise sem cookies e voltado à privacidade, para contar visualizações de páginas de forma agregada. O Umami não define cookies de rastreamento nem constrói perfis entre sites. Como crawlers de IA não executam JavaScript, uma função de edge no lado do servidor também registra o user agent e o caminho das visitas de bots automatizados como eventos anônimos de análise — isso identifica o software crawler (por exemplo "GPTBot visitou /init"), nunca um visitante humano.',
      },
      {
        heading: 'Cookies e armazenamento local',
        body: 'O site não define cookies de rastreamento. A única coisa guardada no seu navegador é uma preferência de tema (modo claro ou escuro) mantida no localStorage, que nunca sai do seu dispositivo e não é transmitida para lugar nenhum. Se você limpar o armazenamento do navegador, o site simplesmente volta ao tema padrão do seu sistema.',
      },
      {
        heading: 'Serviços de terceiros',
        body: 'A hospedagem e a entrega funcionam no Cloudflare Pages, que processa logs de requisições e endereços IP na edge como parte de operar a CDN e bloquear abusos, sob a própria política de privacidade da Cloudflare. A análise agregada funciona no Umami (cloud.umami.is). Se você enviar voluntariamente o formulário de contato, suas respostas passam pelo Google Forms para a nossa equipe — esse é o único lugar onde a informação que você digita é coletada, e ela é usada unicamente para responder você.',
      },
      {
        heading: 'O que não fazemos',
        body: 'Não vendemos nem compartilhamos dados pessoais, não rodamos publicidade nem pixels de remarketing, não fazemos fingerprinting de navegadores e não enviamos e-mail de marketing. O site não tem inscrição em newsletter nem telemetria além das contagens agregadas e sem cookies descritas acima.',
      },
      {
        heading: 'Suas escolhas',
        body: 'Como a análise aqui é agregada e sem cookies, não há perfil pessoal para exportar ou excluir. Você pode bloquear o script de análise com qualquer bloqueador de conteúdo sem afetar o funcionamento do site. Se você enviou o formulário de contato e quer que sua mensagem seja excluída, escreva para o endereço de contato abaixo e nós a removeremos.',
      },
      {
        heading: 'Mudanças nesta política',
        body: 'Se esta política mudar de forma material, a data de atualização no topo desta página muda com ela, e edições substanciais são commitadas no repositório público do site, onde qualquer pessoa pode revisar o histórico.',
      },
    ],
    contactTitle: 'Contato e segurança',
    contactBody:
      'Para perguntas de privacidade, escreva para security@dailybot.com. Para reportar uma vulnerabilidade de segurança, prefira a divulgação privada de vulnerabilidades do GitHub para os repositórios do site e da skill — consulte /.well-known/security.txt para os endereços exatos.',
  },
};
