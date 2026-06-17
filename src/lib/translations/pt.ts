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
    github: 'GitHub',
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
    badge: 'Novo',
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
        'O Deep Work Plan transforma qualquer repositório em um ambiente estruturado — contexto, salvaguardas e um plano duradouro — onde qualquer agente de código executa com precisão e conclui trabalhos de longo prazo.',
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
    },
    pitch: {
      kicker: 'O problema e a resposta',
      problem:
        'Os agentes de código de IA são notavelmente eficazes em surtos curtos. Em trabalhos de longo prazo — uma migração, um novo subsistema, uma refatoração que abrange dezenas de arquivos — eles derivam: o contexto se enche, as decisões são esquecidas e tarefas de várias horas são abandonadas no meio do caminho.',
      answer:
        'O Deep Work Plan responde com desenvolvimento orientado a especificação: o plano é a fonte de verdade duradoura e os agentes executam contra critérios de aceitação e validation gates explícitos. A deriva diminui, o trabalho permanece verificável e qualquer agente pode retomá-lo entre sessões.',
      origin:
        'É também engenharia de harness tornada portátil. Um harness de agente é o andaime ao redor de um modelo — contexto, ferramentas, loop de controle, salvaguardas, estado retomável — que o torna confiável. O Deep Work Plan instala esse harness no próprio repositório (AGENTS.md, docs, o diretório de skills .agents/, a skill DWP), para que qualquer agente possa pilotar qualquer repositório. Nascido na Dailybot, testado em produção por meses e lançado como o DailybotHQ/deepworkplan-skill.',
      illustrationAlt:
        'Uma carta náutica com uma única rota traçada que passa com segurança pelos perigos — uma gravura que evoca o plano como a direção que mantém o trabalho no rumo.',
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
          title: 'Estrutura o .agents/ com o symlink de .claude para .agents',
          description:
            'Um diretório .agents/ multiagente (skills, agents, commands) e o symlink de .claude para .agents, espelhando CLAUDE.md em AGENTS.md, para que cada ferramenta leia uma única fonte de verdade.',
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
          label: '.agents/ com o symlink de .claude para .agents',
          detail:
            'Um diretório .agents/ multiagente (skills, agents, commands) com o symlink de .claude para .agents, para que cada ferramenta leia uma única fonte de verdade.',
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
          'Execute a sub-skill onboard e deixe o agente raciocinar sobre seu repositório real. Ele gera AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório .agents/ multiagente (com o symlink de .claude → .agents), conecta os comandos enxutos dwp-* e estrutura um .dwp/ ignorado pelo git.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolua o kit e aceite addons',
        description:
          'Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands apropriados à sua stack. O onboarding também oferece quatro addons opcionais — devcontainer, Dailybot, dependency-upgrade e design-system — que você aceita apenas quando fizerem sentido.',
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
      'Primeiro, o repositório se torna orientado a especificação: o trabalho começa a partir de um plano e uma especificação escritos, não de prompts ad hoc. Segundo, o próprio repositório se torna o harness do agente — um AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório de skills .agents/ (com o symlink de .claude → .agents) dão a cada agente o contexto e os comandos de que ele precisa.',
    ],
    sequenceTitle: 'A sequência de adoção',
    orLabel: 'ou',
    steps: [
      {
        title: 'Verifique antes de instalar',
        description:
          'Trate o prompt e a skill como não confiáveis até tê-los verificado. Ambos são de código aberto e com licença MIT; a skill é Markdown-first sem chamadas de rede e sem telemetria. Cada versão publica um SHA256SUMS sobre os arquivos da skill, para que você possa confirmar que sua cópia corresponde antes de executá-la. As versões têm checksums, não assinaturas (assinaturas são o próximo passo documentado).',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: 'Instale a skill',
        description:
          'Adicione a skill Deep Work Plan para que qualquer agente possa planejar e executar trabalho estruturado. A skill traz um roteador mais oito sub-skills — create, execute, refine, resume, status, verify, onboard e author.',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'Execute o onboarding do repositório',
        description:
          'Invoque a sub-skill onboard e deixe o agente raciocinar sobre o repositório real — sua stack, gerenciador de pacotes e comandos de validação reais. Ele então gera AGENTS.md, uma base de conhecimento em docs/, docs por módulo e um diretório .agents/ multiagente (com o symlink de .claude → .agents), conecta os comandos enxutos dwp-* e estrutura um .dwp/ ignorado pelo git para planos e rascunhos. Nada é gerado por template; tudo é adaptado ao seu repositório.',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'Evolua o kit e aceite addons',
        description:
          'Use /skill-create e /agent-create (a sub-skill author) para desenvolver skills, agents e commands apropriados à sua stack. O onboarding também oferece quatro addons opcionais — devcontainer, Dailybot, dependency-upgrade e design-system — que você aceita apenas quando fizerem sentido. Um repositório é totalmente conforme com zero addons.',
      },
      {
        title: 'Planeje e execute',
        description:
          'Gere Deep Work Plans com /dwp-create e execute-os com /dwp-execute, depois /dwp-status, /dwp-refine e /dwp-resume conforme o trabalho avança. Cada plano carrega tarefas numeradas, validation gates e um protocolo de conclusão para que o trabalho permaneça estruturado, revisável e retomável entre sessões.',
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
};
