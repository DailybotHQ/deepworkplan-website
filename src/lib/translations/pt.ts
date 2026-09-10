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
    compare: 'Comparação',
    resources: 'Recursos',
    resourcesDesc: 'Exemplos, comparação, FAQ e confiança',
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
      learn: 'Aprenda',
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
            'Conecta a skill Deep Work Plan e cria a pasta .dwp/ ignorada pelo git para planos e rascunhos, instala a revisão local obrigatória do AI Diff Reviewer e então, opcionalmente, adiciona addons opcionais como suporte a devcontainer.',
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
      'Tudo o que você precisa para executar a metodologia: a skill e suas sub-skills, slash commands, adaptadores de agente, presets de onboarding, a revisão local obrigatória e os addons opcionais, e exemplos práticos.',
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
          'Capacidades que o fluxo de onboarding adiciona a um repositório: a revisão local obrigatória do AI Diff Reviewer mais quatro addons opcionais que nunca fazem parte da base AI-first.',
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
          'Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands apropriados à sua stack. O onboarding instala a revisão local obrigatória do AI Diff Reviewer (seu gate de CI permanece opcional) e oferece quatro addons opcionais — devcontainer, Dailybot, dependency-upgrade e design-system — que você aceita apenas quando fizerem sentido.',
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
        title: 'Revisão local e addons opcionais',
        description:
          'O onboarding instala a revisão local obrigatória do AI Diff Reviewer (seu gate de CI permanece opcional) e oferece quatro addons opcionais — devcontainer, Dailybot, dependency-upgrade e design-system — que você aceita apenas quando fizerem sentido. Um repositório é totalmente conforme com zero addons opcionais. Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands além do conjunto base.',
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
      title: 'Perguntas frequentes — Deep Work Plan',
      description:
        'Respostas às perguntas mais comuns sobre o Deep Work Plan: o que ele faz, como funcionam gates e retomada, comparação com outras ferramentas e como adotá-lo.',
    },
    eyebrow: 'FAQ',
    title: 'Perguntas frequentes',
    intro:
      'Respostas curtas ao que as pessoas mais perguntam sobre o Deep Work Plan, cada uma com um link para a página que aprofunda o tema.',
    groups: [
      {
        id: 'what',
        title: 'O que é o Deep Work Plan',
        items: [
          {
            id: 'what-is-it',
            question: 'O que o Deep Work Plan realmente faz?',
            answer:
              'O Deep Work Plan transforma um repositório em um ambiente estruturado no qual um agente de código pode executar trabalhos longos com confiabilidade. Ele é instalado como uma skill de agente, faz o onboarding do repositório uma única vez (um índice `AGENTS.md`, uma árvore `docs/`, um kit `.agents/` de skills e comandos, uma área de saída `.dwp/` ignorada pelo git) e, a partir daí, qualquer objetivo se torna um plano: tarefas atômicas, cada uma com critérios de aceitação e um gate de validação, executadas uma por vez, comitadas à medida que passam e retomáveis do disco por qualquer agente. O plano se encerra com um Final Review que audita a segurança e valida o estado final. A metodologia é licenciada sob MIT e funciona com qualquer agente de código que leia um repositório.',
            linkLabel: 'Leia a metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'Para quem é?',
            answer:
              'Desenvolvedores e equipes que entregam trabalho real e de várias etapas a agentes de código e querem que ele seja concluído. Encaixa-se quando uma tarefa atravessa mais de uma sessão, mais de uma família de arquivos ou mais de um agente; quando um colega precisa poder continuar de onde um agente parou; ou quando "concluído" precisa significar "validado", e não "o agente disse que sim". Uma correção de uma linha não precisa de um plano, e a metodologia diz isso: sua regra de rigor proporcional recomenda, em vez disso, um objetivo com critérios e gate definidos inline.',
            linkLabel: 'Início rápido',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: 'É uma ferramenta, um framework ou uma metodologia?',
            answer:
              'Uma metodologia empacotada como uma skill instalável. Não há servidor, conta, formato proprietário nem runtime além do agente de código que você já usa. O que é instalado são instruções que o agente lê, um pequeno conjunto de scripts de shell para detecção de contexto e verificação de conformidade, e as convenções que o seu repositório adota. Tudo o que o plano produz é Markdown e JSON no seu repositório, legível sem nenhuma ferramenta.',
            linkLabel: 'Leia a especificação',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'Com quais agentes de código ele funciona?',
            answer:
              'Qualquer agente que leia arquivos do repositório. A skill segue o padrão aberto Agent Skills e a convenção `AGENTS.md`, então Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot e outros a assumem pelo carregamento normal de skills e instruções. A própria avaliação da metodologia mostra um plano iniciado pelo agente de um fornecedor e retomado pelo de outro, nas duas direções. A cobertura de instalação e as evidências comportamentais estão listadas por agente na matriz de compatibilidade, e as duas nunca são confundidas.',
            linkLabel: 'Explore o kit',
            linkPath: '/kit',
          },
        ],
      },
      {
        id: 'how',
        title: 'Como um plano é executado',
        items: [
          {
            id: 'gates',
            question:
              'Como os gates de validação são implementados? Eles exigem aprovação humana?',
            answer:
              'São asserções executáveis que o próprio agente roda. A aprovação humana enquadra a execução: uma pessoa aprova o plano antes da execução e revisa o diff final na hora do pull request; o que fica entre as duas pontas é autônomo. Cada tarefa nomeia comandos concretos, normalmente o próprio gate de qualidade do repositório, selecionados a partir da superfície tocada pela tarefa: os testes do comportamento alterado e dos seus consumidores, ampliando para a suíte completa quando a mudança é compartilhada ou não pode ser delimitada. Uma tarefa é marcada como concluída somente quando esses comandos terminam com sucesso, e tarefas que alteram comportamento devem estender os testes. Em caso de falha, a tarefa é marcada como bloqueada e o agente para.',
            linkLabel: 'O ciclo principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question:
              'Como o plano evita ficar desatualizado quando as pessoas alteram o código entre execuções?',
            answer:
              'Em três frentes. As tarefas são escritas como comportamento, não como edições: um critério de aceitação diz o que o sistema deve fazer, então um arquivo renomeado ou uma implementação trocada não o invalida. Cada gate é reexecutado contra o repositório como ele está agora, então uma premissa quebrada falha ruidosamente na execução seguinte em vez de desviar em silêncio, e essa falha é o sinal para refinar. E manter a documentação em sincronia faz parte do trabalho: uma tarefa que altera comportamento também atualiza os docs e o kit voltado a agentes que o descrevem, dentro do seu próprio gate. Cada execução deve deixar o repositório mais pronto para agentes do que o encontrou.',
            linkLabel: 'Leia a metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question:
              'Posso alterar o plano no meio da execução sem perder o trabalho concluído?',
            answer:
              'Sim; refinar um plano parcialmente executado é um movimento de primeira classe. As definições das tarefas e o estado de execução são mantidos separados: o plano é uma checklist em disco mais um pequeno arquivo de estado, então o que foi feito permanece registrado de forma independente do texto das tarefas. Quando uma tarefa se revela errada, o agente a marca como bloqueada e para, em vez de seguir empurrando. Você então edita, reordena, divide ou descarta as tarefas que ainda não rodaram, enquanto as tarefas concluídas permanecem concluídas. Retomar reconstrói o estado a partir do disco e do repositório real e reexecuta os gates que importam, então nada que tenha mudado por baixo passa despercebido.',
            linkLabel: 'O ciclo principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              'Ele continua verificando o trabalho contra o plano, ou o plano é algo feito só no início?',
            answer:
              'O plano é uma verificação contínua. O agente trabalha uma pequena tarefa por vez e precisa validar antes de seguir, então ele pode desviar um passo, não três. Cada tarefa carrega critérios de aceitação mais os comandos exatos que os comprovam, e o progresso é escrito no repositório à medida que avança, com um status por tarefa, então o desvio fica visível para você, para a próxima sessão e para o próximo agente. Um plano não termina até que tudo valide, incluindo o Final Review. A ressalva honesta: a metodologia não consegue impedir que um agente escreva um critério de aceitação fraco desde o início; ela torna o desvio ruidoso em vez de silencioso.',
            linkLabel: 'O ciclo principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question:
              'O plano é gerado uma vez e mantido à mão, ou evolui com o código?',
            answer:
              'Nem um nem outro. Ele é gerado uma vez a partir de um objetivo e depois mantido como parte do trabalho. O plano deliberadamente não é reescrito a partir de diffs de código, porque uma especificação que persegue o código se torna um espelho atrasado, que é o desvio que a metodologia existe para eliminar. Ele evolui de propósito: os gates são reexecutados contra o repositório atual, um gate que falha dispara um refinamento, e o agente executa esse refinamento durante a execução enquanto você aprova no início e revisa no fim. Documentação e testes evoluem junto com o código por construção, porque atualizá-los está dentro do gate de cada tarefa.',
            linkLabel: 'Leia a metodologia',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'O que acontece se a sessão morrer no meio do caminho?',
            answer:
              'O progresso vive no disco, não no chat. As caixas de seleção do README, o log de cada tarefa, um índice de trabalho delimitado e um arquivo de estado legível por máquina são atualizados em cada fronteira de tarefa, e o arquivo de estado registra um checkpoint antes de qualquer pausa planejada. Uma sessão nova, ou um agente diferente, lê esse índice compacto, o reconcilia com o repositório e o histórico do git e continua na primeira tarefa incompleta sem refazer o trabalho terminado. Até mesmo uma criação de plano interrompida é recuperável: a identidade do plano e a lista de tarefas pretendida são escritas antes de qualquer arquivo de tarefa, então um plano criado pela metade pode ser concluído ou descartado em vez de adivinhado.',
            linkLabel: 'O ciclo principal',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'O que é o Final Review?',
            answer:
              'A única tarefa de encerramento obrigatória de todo plano. Em ordem: um passe de segurança sobre o conjunto completo de mudanças acumuladas do plano, incluindo uma revisão local obrigatória do diff pela skill AI Diff Reviewer, com achados críticos bloqueando a conclusão até serem corrigidos ou explicitamente aceitos; a validação do estado final, ou seja, as suítes completas aplicáveis de testes, lint, verificação de tipos e formatação do repositório sobre o código final; e uma reconciliação das decisões de skills que cada tarefa registrou. O agente então relata entregáveis, evidências e limitações, e oferece um Relatório Executivo uma única vez, gerando-o somente se você pedir.',
            linkLabel: 'A especificação',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'compare',
        title: 'Como ele se compara',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'Como ele difere de ferramentas orientadas a especificação como Spec Kit, OpenSpec ou Kiro?',
            answer:
              'Elas resolvem problemas adjacentes. As ferramentas orientadas a especificação são excelentes em capturar o que deve mudar: especificações, requisitos e propostas de mudança em um formato repetível. O Deep Work Plan trata de como um agente executa por horas sem desviar: o harness integrado pelo onboarding, gates de validação por tarefa selecionados a partir da superfície tocada, estado retomável em disco, um Final Review obrigatório com passe de segurança e um verificador de conformidade para o próprio repositório. Os dois podem ser combinados, com uma especificação ou proposta de mudança alimentando um plano. A página de comparação dispõe as capacidades lado a lado, nos termos de cada ferramenta.',
            linkLabel: 'Veja a comparação',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'Como ele difere de frameworks de fluxo de trabalho para agentes como BMAD, Superpowers ou Get Shit Done?',
            answer:
              'Esses frameworks trazem estilos de trabalho fortes: papéis, princípios, passos de teste primeiro, hábitos de verificação. O Deep Work Plan se concentra no que fica no repositório e no que pode ser verificado: um harness que qualquer agente lê sem contexto prévio, arquivos de tarefa com critérios de aceitação e gates, estado que sobrevive a uma sessão, um verificador de conformidade com código de saída amigável a CI e uma medição publicada de quantos bytes de instrução cada fluxo carrega. Ele é independente de ferramenta por construção e não acrescenta serviço, provedor nem segredo ao ciclo principal. A página de comparação mostra onde cada abordagem é integrada, opcional ou está fora do escopo.',
            linkLabel: 'Veja a comparação',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question:
              'Por que não simplesmente usar o modo de planejamento nativo do meu agente?',
            answer:
              'Os modos de planejamento nativos são úteis, e o Deep Work Plan se apoia no mesmo substrato, a convenção `AGENTS.md` e o padrão aberto Agent Skills. A diferença é onde o plano vive e o que o reforça. Planos nativos geralmente vivem fora do repositório e expiram com a sessão; o Deep Work Plan escreve o plano, o seu estado e as suas evidências no repositório, então outro agente ou um colega pode continuá-lo, e cada tarefa carrega um gate executável e um log registrado. Você continua usando o modo de planejamento do seu agente para pensar; a metodologia acrescenta o loop de execução duradouro e verificável.',
            linkLabel: 'Veja a comparação',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'Adotando',
        items: [
          {
            id: 'install',
            question:
              'O que o onboarding escreve no meu repositório e ele toca em arquivos existentes?',
            answer:
              'O onboarding é não destrutivo: ele detecta um `AGENTS.md`, `docs/`, `.agents/` ou `CLAUDE.md` existente, reconcilia em vez de sobrescrever e pergunta antes de substituir qualquer coisa. Ele escreve o índice `AGENTS.md` com comandos reais, uma árvore `docs/` fundamentada, docs por módulo, o kit `.agents/` com comandos enxutos `dwp-*`, uma área de saída `.dwp/` ignorada pelo git, um mapa de testes verificado e a revisão local de código obrigatória (a skill AI Diff Reviewer mais uma extensão de revisão adaptada ao repositório). Ele então executa uma autoverificação e o verificador de conformidade, para que você veja o que foi produzido. Um repositório integrado sob uma versão anterior recebe uma atualização direcionada que altera apenas o que falta.',
            linkLabel: 'O endpoint de adoção',
            linkPath: '/init',
          },
          {
            id: 'cost',
            question: 'Quanto custa e como a eficiência é medida?',
            answer:
              'A metodologia e a skill são licenciadas sob MIT e gratuitas; não há serviço, chave de API nem telemetria nos fluxos centrais. A eficiência é relatada como o número de bytes de instrução que cada fluxo carrega, medido por um script comitado junto com a skill e publicado em um registro de avaliação, com aumentos relatados com a mesma franqueza das reduções. Ela não é relatada como porcentagens de tokens ou economias de custo, porque um inventário de bytes não estabelece essas coisas; uma avaliação pública pré-registrada está planejada para medir resultados adequadamente.',
            linkLabel: 'Confiança e divulgação',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'Ainda tem uma pergunta?',
      body: 'Abra uma discussão ou uma issue no GitHub. Perguntas que surgem com frequência são acrescentadas a esta página.',
      ctaLabel: 'Pergunte no GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan comparado com as alternativas — Deep Work Plan',
      description:
        'O Deep Work Plan frente a ferramentas de especificação, frameworks de agentes e modos de plano nativos: cada qual em seus termos, com fontes e data de revisão.',
    },
    eyebrow: 'Comparação',
    title: 'O Deep Work Plan e as alternativas',
    intro:
      'Escolha a camada certa para a sua situação. Cada alternativa é descrita em seus próprios termos, todo fato remonta à sua documentação oficial e a página diz quando foi revisada pela última vez. Isto é um mapa, não um ranking.',
    howToRead: {
      title: 'Como ler esta página',
      body: 'Três valores descrevem cada capacidade. Eles dizem onde uma capacidade vive em uma ferramenta, não quão boa a ferramenta é.',
      values: {
        builtIn: 'Integrado',
        optional: 'Opcional ou por extensão',
        notInScope: 'Fora do escopo',
      },
    },
    reviewedOnLabel: 'Última revisão',
    alternativesTitle: 'As alternativas, em seus próprios termos',
    officialSiteLabel: 'Site oficial',
    categories: {
      methodology: 'Metodologia',
      sdd: 'Ferramentas de desenvolvimento orientado a especificação',
      agentFramework: 'Frameworks de fluxo de trabalho para agentes',
      vendorNative: 'Modos de planejamento nativos do fornecedor',
    },
    matrix: {
      title: 'Matriz de capacidades',
      caption:
        'Onde cada capacidade vive, por ferramenta. Integrado, opcional ou por extensão, ou fora do escopo. Verificado contra a documentação oficial.',
      capabilityColumn: 'Capacidade',
    },
    capabilities: {
      toolAgnostic: {
        label: 'Funciona com qualquer agente de código',
        help: 'Os mesmos arquivos do repositório dirigem Claude Code, Codex, Cursor, Gemini CLI e outros.',
      },
      repoNativeHarness: {
        label: 'Escreve o harness do agente no repositório',
        help: 'Instruções, docs, skills e comandos vivem no repositório, não nas configurações de uma única ferramenta.',
      },
      taskAcceptanceCriteria: {
        label: 'Critérios de aceitação por tarefa',
        help: 'Cada tarefa declara condições observáveis para ser considerada concluída.',
      },
      perTaskGates: {
        label: 'Gate de validação por tarefa',
        help: 'Cada tarefa nomeia os comandos que devem passar, selecionados a partir do que ela tocou.',
      },
      resumableState: {
        label: 'Estado retomável em disco',
        help: 'O progresso sobrevive a um reinício de sessão e pode ser retomado por outro agente ou por um colega.',
      },
      finalReview: {
        label: 'Revisão de encerramento obrigatória com passe de segurança',
        help: 'O plano não pode ser concluído sem uma revisão de segurança do conjunto completo de mudanças e a validação do estado final.',
      },
      conformanceChecker: {
        label: 'Verificador de conformidade executável',
        help: 'Um script verifica o repositório e os seus planos contra o padrão, com um código de saída amigável a CI.',
      },
      instructionBudgetLedger: {
        label: 'Medição publicada da carga de instrução',
        help: 'Os bytes que cada fluxo carrega são medidos por um script comitado e publicados com os seus limites.',
      },
      onboardingScaffold: {
        label: 'Onboarding que estrutura a documentação',
        help: 'Uma primeira execução escreve a documentação voltada a agentes do repositório e o seu kit.',
      },
      brownfieldSpecs: {
        label: 'Especificações vivas para sistemas existentes',
        help: 'As mudanças são especificadas como deltas que se mesclam a uma especificação crescente do sistema.',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'Instala-se como uma skill, faz o onboarding do repositório em um harness de agente e executa planos de longo prazo com gates de validação por tarefa, estado em disco e um Final Review obrigatório.',
        audience:
          'Desenvolvedores e equipes que entregam trabalho de várias sessões a qualquer agente de código e precisam que ele termine verificado.',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'Transforma uma funcionalidade em uma especificação executável por meio de uma constituição, uma especificação, um plano e uma lista de tarefas, dirigida por slash commands que se integram a mais de cinquenta agentes de código.',
        audience:
          'Equipes que querem um fluxo repetível de especificar, planejar, listar tarefas e implementar dentro do agente que já usam.',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'Captura cada mudança como uma proposta com specs delta (adicionadas, modificadas, removidas) e requisitos RFC 2119 com cenários, e então as arquiva em especificações vivas.',
        audience:
          'Equipes que trabalham em sistemas existentes e querem que as especificações cresçam uma mudança por vez.',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'Uma IDE e CLI agênticas cujas especificações avançam de requisitos no estilo EARS para o design e depois para as tarefas, com arquivos steering e hooks executados em eventos do editor.',
        audience:
          'Desenvolvedores que querem desenvolvimento orientado a especificação integrado ao seu editor com ferramentas apoiadas pela AWS.',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'Um framework ágil de papéis de agente especializados (análise, produto, arquitetura, desenvolvimento, qualidade) que produz briefs, requisitos, documentos de arquitetura e arquivos de story.',
        audience:
          'Equipes que gostam de cerimônias baseadas em papéis e querem um ciclo de vida ágil completo para o trabalho de agentes.',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'Uma biblioteca de skills e um fluxo de trabalho para brainstorming, planejamento em pequenos passos de teste primeiro, execução com subagentes e revisão antes da conclusão.',
        audience:
          'Desenvolvedores que querem execução disciplinada orientada a testes dentro do seu agente de código.',
      },
      'get-shit-done': {
        name: 'Get Shit Done',
        whatItDoesWell:
          'Um sistema de planejamento com um diretório .planning, ids de requisitos, planos por fase, execução em contexto limpo e uma passagem de verificação contra os requisitos essenciais declarados.',
        audience:
          'Desenvolvedores individuais e pequenas equipes que querem engenharia de contexto e verificação com pouca cerimônia.',
      },
      'vendor-native': {
        name: 'Modos de planejamento nativos do fornecedor',
        whatItDoesWell:
          'Claude Code, Codex, Cursor e Gemini CLI trazem modos de planejamento, arquivos de instrução e skills que seguem os padrões AGENTS.md e Agent Skills.',
        audience:
          'Qualquer pessoa que queira planejamento dentro de um único agente sem adotar uma metodologia.',
      },
    },
    dwpStrengths: {
      title: 'O que o Deep Work Plan traz',
      items: [
        {
          title: 'Independente de ferramenta e nativo do repositório',
          body: 'O harness e o plano são arquivos no seu repositório, lidos por qualquer agente que siga os padrões AGENTS.md e Agent Skills. Trocar de agente não perde o plano.',
        },
        {
          title: 'Validação selecionada a partir do que cada tarefa tocou',
          body: 'Cada tarefa declara a sua superfície tocada e executa os testes do comportamento alterado e dos seus consumidores, ampliando para a suíte completa quando o impacto não pode ser delimitado. Zero testes selecionados nunca é uma aprovação.',
        },
        {
          title: 'Um Final Review com passe de segurança',
          body: 'Um plano se encerra com uma revisão de segurança do conjunto acumulado de mudanças, incluindo uma revisão local obrigatória do diff, e uma validação do estado final. Achados críticos bloqueiam a conclusão.',
        },
        {
          title: 'Estado que sobrevive a sessões e agentes',
          body: 'Caixas de seleção do README, logs de tarefa, um índice de trabalho delimitado e um arquivo de estado legível por máquina são escritos em cada fronteira, então outra sessão ou outro agente continua a partir do disco. Até mesmo uma criação de plano interrompida é recuperável.',
        },
        {
          title: 'Um verificador de conformidade para o próprio repositório',
          body: 'Um script somente leitura verifica o harness e cada plano contra a especificação, entende os dois ciclos de vida do plano e sai com um código amigável a CI.',
        },
        {
          title: 'Carga de instrução medida e publicada',
          body: 'Um script comitado mede quantos bytes cada fluxo carrega; os resultados, incluindo os aumentos, são publicados como bytes, nunca como porcentagens de tokens ou de custo.',
        },
      ],
    },
    honestLimits: {
      title: 'Limitações honestas',
      body: 'O Deep Work Plan não tem um mecanismo de especificação viva ou delta; OpenSpec e ferramentas semelhantes são mais fortes aí. Nenhum benchmark independente da metodologia existe ainda; uma avaliação pública pré-registrada está planejada. O registro de carga de instrução mede bytes carregados, não tokens, custo ou resultados.',
    },
    correction: {
      title: 'Ajude-nos a manter esta página exata',
      body: 'Esta página é revisada na data indicada e corrigida a pedido. Se a descrição da sua ferramenta está desatualizada ou incompleta, abra uma issue e nós a corrigiremos.',
      ctaLabel: 'Abra uma issue',
    },
    sourcesTitle: 'Fontes',
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
