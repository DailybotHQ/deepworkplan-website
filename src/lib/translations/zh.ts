/**
 * zh translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const zh: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — 面向 AI 编码代理的结构化执行',
  siteDescription:
    'Deep Work Plan：一套开放方法论与参考套件，用于结构化、可验证、可恢复的多小时 AI 代理执行。',

  // Navigation
  nav: {
    home: '首页',
    about: '关于',
    contact: '联系',
    // Deep Work Plan IA
    methodology: '方法论',
    spec: '规范',
    kit: '套件',
    examples: '示例',
    init: 'Init',
    quickstart: '快速开始',
    trust: '信任',
    developers: '开发者',
    privacy: '隐私',
    github: 'GitHub',
    faq: 'FAQ',
    compare: 'Compare',
    resources: 'Resources',
    resourcesDesc: 'Examples, comparison, FAQ and trust',
    repo: {
      label: '源代码',
      website: '网站仓库',
      websiteDesc: '本站点',
      skill: '技能仓库',
      skillDesc: '可安装的技能',
    },
    menu: '打开菜单',
    closeMenu: '关闭菜单',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: '保留所有权利。',
    poweredBy: '技术支持',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: '最新 · Token 高效',
    text: 'Deep Work Plan 今天登陆 Product Hunt',
    tagline: '给你的智能体一个计划',
    linkText: '去支持',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: '站点导航',
    sections: {
      methodology: '方法论',
      getStarted: '开始使用',
      project: '项目',
      connect: '联系',
      learn: 'Learn',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — 面向 AI 编码代理的结构化执行',
      description:
        '上下文比模型更重要。Deep Work Plan 将任意代码仓库转化为结构化环境，让任意编码代理都能完成长周期工作。',
    },
    hero: {
      badge: '开放方法论 · MIT · 代理无关',
      title: '模型很重要。',
      titleEmphasis: '上下文更重要。',
      subtitle:
        'Deep Work Plan 将任何仓库转变为结构化环境——上下文、防护栏和持久计划——任何编码代理都能在其中精准而高效地执行，并完成长程工作。',
      instructionLabel: '复制到你的代理',
      instruction:
        '复制 init.md 提示并将其粘贴到你的编码代理中——Claude Code、Cursor、Codex 或任何其他代理——让任意代码仓库变为 AI-first。',
      copyLabel: '复制 init.md',
      copiedLabel: '已复制',
      viewInitCta: '查看完整的 /init 提示',
      pullQuote:
        'Deep Work Plan 是一种规范驱动的开发方式，在其中代码仓库本身成为执行的 harness（运行支架）。',
      primaryCta: '阅读方法论',
      secondaryCta: '阅读规范',
      illustrationAlt:
        '一座灯塔矗立在礁石海岸，射出一道光束为一艘小船指引方向——这幅版画寓意着代码仓库如同稳固的支架，引导任意代理。',
      scrollCta: '了解它的工作原理',
    },
    pitch: {
      kicker: '问题与答案',
      problem:
        '短促任务中，编程代理表现出色。可一旦交给它长程任务——一次迁移、一个新子系统、大规模重构——它就会偏移：上下文被填满，先前的决策逐渐淡忘，数小时的工作半途搁浅。',
      answer:
        'Deep Work Plan 以规范驱动开发应对：一份持久的计划、原子任务，以及代理必须通过的验证关卡。“完成”不再是感觉——而是可验证、可审查的证据。',
      efficiency:
        '上下文是代理最稀缺的资源，因此 harness 为 token 效率而生：指令渐进加载，验证只触及改动之处，每项任务就地学习——长程工作依然划算。',
      illustrationAlt:
        '一幅雕版双联画：一侧是浓雾中触礁漂流的船只，另一侧是同一艘船沿既定航线稳健驶向港口灯塔。',
    },
    story: {
      act1: {
        kicker: '方法论 · 第一幕',
        lead: '由你来定义“完成”的标准与边界。计划承载你的意图；代理完成耗时的工作——无需时时看管，也无需每二十分钟纠正一次。',
        deepLinkLabel: '阅读方法论',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: '方法论 · 第二幕',
        lead: '长任务会填满任何模型的上下文。细节逐渐流失，代理随之偏移。一份书面计划——原子任务、验证关卡、可恢复状态——正是它一轮又一轮回归的依据。',
        deepLinkLabel: '查看核心循环',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: '方法论 · 第三幕',
        lead: '每项任务都写明其验收标准与必须通过的检查。代理不能“感觉完成了”——必须通过检查，否则任务保持打开。',
        deepLinkLabel: '阅读规范',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: '方法论 · 第四幕',
        lead: '上下文、工具、防护栏与状态以纯文件形式存放在你的仓库中，任何代理都可读取。没有锁定，没有外部大脑——它能在上下文重置后依然完好。',
        deepLinkLabel: '查看接入流程会生成什么',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: '方法论 · 第五幕',
        lead: '上下文是任何模型最稀缺的资源。harness 渐进加载、只验证改动、按任务就地学习——让计划一轮轮自我回本。',
        deepLinkLabel: '阅读方法论',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: '基于推理的接入',
      title: '把它指向任意代码仓库。它会推理——而不是复制粘贴。',
      subtitle:
        '接入流程会检视你仓库实际使用的语言、框架、包管理器与验证命令，然后生成与该仓库相适配的产物。一份泛用的占位骨架会被视为失败。',
      steps: [
        {
          title: '推理你的技术栈与原型',
          description:
            '读取清单文件、目录结构与 CI，推断出真实的测试、检查与构建命令，然后将仓库归类为单一仓库或编排枢纽。',
        },
        {
          title: '生成 AGENTS.md、docs/ 与各模块文档',
          description:
            '一份经过推理的 AGENTS.md、一套分类的 docs/ 层级结构，以及每个主要模块内部的 README 与 docs/——填入的是你仓库的真实命令，而非占位符。',
        },
        {
          title: '搭建 .agents/，并建立 .claude 和 .cursor 符号链接',
          description:
            '一个跨代理的 .agents/ 目录（技能、代理、命令），以及 .claude 和 .cursor 到 .agents 的符号链接，让每个工具都读取同一个事实来源。',
        },
        {
          title: '安装 DWP 技能并搭建 .dwp/',
          description:
            '接入 Deep Work Plan 技能，并创建被 gitignore 的 .dwp/ 目录以存放计划与草稿，安装必需的 AI Diff Reviewer 本地评审，然后可选地叠加诸如 devcontainer 支持这样的可选附加组件。',
        },
      ],
    },
    quickstart: {
      badge: '运行后会发生什么',
      title: '一条指令。其余的由代码仓库自己完成。',
      subtitle:
        '你无需挑选安装方式或复制模板。你把一行交给代理；它会安装这套技能——可复用的引擎——并让你的仓库与之适配。',
      steps: [
        {
          title: '你的代理打开 /init.md',
          description:
            '它会阅读 deepworkplan.com/init.md 上的接入提示，以及其中链接的方法论、规范与套件——也就是它即将采纳的标准。',
        },
        {
          title: '它安装 Deep Work Plan 技能',
          description:
            '这套技能就是引擎——在每个仓库中都完全相同。一条命令即可拉取路由器及其各子技能（create、execute、refine、resume、status、verify、onboard、author），适用于 Claude Code、Cursor、Codex、Gemini 与 Copilot。',
        },
        {
          title: '它让你的代码仓库适配',
          description:
            '它针对你真实的技术栈进行推理——绝不复制粘贴——写出 AGENTS.md、一套分类的 docs/ 树、各模块的 README、一份经过推理的 .agents/ 套件，以及被 gitignore 的 .dwp/。你的代码仓库由此成为 harness（运行支架）。',
        },
        {
          title: '你来规划并执行',
          description:
            '为任意任务生成长周期的 Deep Work Plan 并逐步运行，配合明确的验收标准、验证关卡与可恢复状态——自主运行，长达数小时。',
        },
      ],
      note: '技能在各处的安装完全一致；被适配的是你的代码仓库——为你的技术栈生成的 AGENTS.md、文档与经过推理的 .agents/ 套件。正是这种区分，使这套方法论成为可复用的标准，而非一次性的脚手架。',
    },
    outcomes: {
      badge: '你将获得什么',
      title: '你的代理自主工作所需的一切。',
      subtitle:
        '一次运行，原子化提交。每一项产出都是 Markdown,每一处改动都可审计。',
      items: [
        {
          label: '位于代码仓库根目录的 AGENTS.md',
          detail:
            '从你仓库的真实技术栈、命令与结构推理而来——而非带占位符的模板。CLAUDE.md 以符号链接指向 AGENTS.md。',
        },
        {
          label: '分类的 docs/ 与各模块文档',
          detail:
            '架构、搭建、规范与排错——外加每个主要模块内部的 README 与 docs/,均由你的代码库生成。',
        },
        {
          label: '.agents/，含 .claude 和 .cursor 到 .agents 的符号链接',
          detail:
            '一个跨代理的 .agents/ 目录（技能、代理、命令），含 .claude 和 .cursor 到 .agents 的符号链接，让每个工具都读取同一个事实来源。',
        },
        {
          label: '已安装的 Deep Work Plan 技能',
          detail:
            'create、execute、refine、resume、status、verify、onboard 与 author——以单一技能包的形式提供给你的代理，无需逐仓库复制。',
        },
        {
          label: '可供核查的符合性',
          detail:
            '/dwp-verify 会针对规范生成一份客观的通过/未通过报告，因此“AI-first”是被验证的，而非被声称的——并且在每次计划之后都可重新验证。',
        },
        {
          label: '两种原型，均已涵盖',
          detail:
            '接入流程会将你的仓库归类为单一仓库（常见情形）或在多个仓库间协调子计划的编排枢纽。',
        },
        {
          label: '一套随你的代码仓库成长的活套件',
          detail:
            'author 子技能（skill-create、agent-create）让仓库得以演化出自己的技能、代理与命令；诸如 dependency-upgrade 这样的可选维护附加组件，帮助它保持自身的更新。',
        },
        {
          label: 'Git 原生、可恢复、.dwp/',
          detail:
            '无守护进程，无外部状态。计划与草稿落入被 gitignore 的 .dwp/ 目录，任意任务仅凭 git 即可恢复——即便上下文溢出之后也是如此。',
        },
      ],
    },
    agents: {
      badge: '代理',
      title: '与你已在使用的代理协同工作。',
      subtitle:
        '一套方法论，多个适配器。Markdown 让这套框架不与任何工具耦合——每个能读取 Markdown 的代理都能运行一份 Deep Work Plan。',
      fullLabel: '完整',
      partialLabel: '部分',
      viewAllCta: '查看全部代理',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: '参考实现，具备原生 WebFetch 与斜杠命令。',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: '完整适配器。若 WebFetch 受限，请使用离线包。',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: '推荐使用离线包；规则安装于 .codex/ 之下。',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: '完整适配器——dwp-* 命令通过 AGENTS.md 与 # 过程运行。',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: '需要 Gemini 2.5 Pro 或更新版本，具备原生 WebFetch。',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: '开源代理。原生读取 AGENTS.md，并通过 # 命令运行 dwp-*。',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: '规则与 # 命令过程驱动完整的 Deep Work Plan 循环。',
        },
        {
          name: 'Cline',
          support: 'full',
          note: '开源代理。Markdown 规则与 # 命令运行每一个 dwp-* 步骤。',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: '完整适配器，具备原生命令界面。',
        },
      ],
    },
    stacks: {
      badge: '技术栈',
      title: '面向重要技术栈的推理预设。',
      viewAllCta: '查看全部预设',
      subtitle:
        '这些是推理辅助，而非模板。接入流程会读取你仓库的真实清单文件并按技术栈适配——它绝不会盲目复制某个预设。多仓库（monorepo）会获得各模块文档。',
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
        { name: 'Generic', sub: '任意技术栈' },
      ],
    },
    archetypes: {
      badge: '两种原型',
      title: '单一代码仓库，或编排枢纽。',
      subtitle:
        '接入流程会按原型分流。大多数仓库都是单一仓库。枢纽则在多个仓库间协调各份子 Deep Work Plan。这套方法论把两者都作为一等公民来处理。',
      individual: {
        tag: '常见情形',
        title: '单一代码仓库',
        description:
          '单一代码库，拥有一个主技术栈、自己的验证命令与各模块文档。这是默认情形——除非仓库明显是枢纽，接入流程都会按此假定。',
        example:
          '例如一个 Django API、一个 Vue 应用，或一个 TypeScript Lambda 服务。',
      },
      orchestrator: {
        tag: '协调',
        title: '编排枢纽',
        description:
          '一个协调型仓库，通过编排清单在多个子仓库间统筹工作，派生出各自在自身仓库中提交的子计划，并附带边界规则与一份导航索引。',
        example: '例如一个协调五个产品仓库的枢纽。',
      },
    },
    comparison: {
      badge: '方法论对比工具',
      title: '不同的层级。互补，而非竞争。',
      subtitle:
        'Deep Work Plan 并非又一个脚手架工具。它是位于任意规范驱动或脚手架工具之下的方法论层，专注于多小时的自主运行。',
      colDwp: 'Deep Work Plan',
      colOthers: '脚手架/规范类工具',
      rows: [
        {
          label: '核心侧重',
          dwp: '多小时自主执行',
          others: '生成规范或脚手架',
        },
        {
          label: '工作单元',
          dwp: '一份 Deep Work Plan（可恢复会话）',
          others: '一份规范文档或一个脚手架',
        },
        {
          label: '状态模型',
          dwp: 'Git 原生的 .dwp/ 目录，可恢复',
          others: '通常在外部或 IDE 内',
        },
        {
          label: '代理耦合',
          dwp: '代理无关（Markdown 与 Bash）',
          others: '通常与工具或 IDE 绑定',
        },
        {
          label: '上下文恢复',
          dwp: '在上下文溢出后恢复',
          others: '通常重新开始任务',
        },
        {
          label: '许可',
          dwp: 'MIT,开放的方法论与套件',
          others: '不一而足',
        },
      ],
    },
    origin: {
      badge: '起源',
      quote:
        '由 Dailybot 打造——这家公司因面向分布式团队的异步站会而为人所知。在内部，我们用 Deep Work Plan 让横跨 Django、Vue、TypeScript Lambda 与 Astro 的生产仓库变得可被代理驾驭。经过数月的生产使用，我们以 MIT 许可将这套方法论开源。',
      attribution: 'Dailybot 工程团队',
      dailybotCta: '了解 Dailybot',
    },
    finalCta: {
      badge: '让你的代码仓库 AI-first',
      title: '把深度工作交给你的代理。',
      subtitle:
        '把一行交给你的代理——将它指向 /init.md——它便会让你的仓库 AI-first：安装技能、推理你的技术栈，并提交一套完整的 AGENTS.md 层级结构。从那时起，你便可以创建并执行能自主运行数小时的 Deep Work Plan。',
      primaryCta: '打开 /init 提示',
      secondaryCta: '阅读方法论',
      tertiaryCta: '面向代理与开发者',
      meta: '采用 MIT 许可 · 零遥测 · 产出至被 gitignore 的 .dwp/ 目录。',
    },
  },
  // Contact section (homepage)
  contact: {
    title: '联系',
    nameLabel: '姓名',
    namePlaceholder: '你的姓名',
    emailLabel: '邮箱',
    emailPlaceholder: 'your@email.com',
    messageLabel: '留言',
    messagePlaceholder: '写下你的留言……',
    sendButton: '发送留言',
  },

  // About page
  aboutPage: {
    title: '关于这套方法论',
    subtitle: '开放方法论 · 采用 MIT 许可',
    description:
      'Deep Work Plan 是一套开放、框架无关的方法论，用于与 AI 编码代理一同开展严肃的工程工作。它从何而来，又由谁维护。',
    heroDescription:
      '一套可复用的结构，用于与 AI 编码代理一同规划、执行并验证深度工作——以开放方式构建，可免费使用。',
    bioTitle: '它是什么',
    bioText:
      'Deep Work Plan（DWP）是一套方法论，而非一款产品。它定义了如何把一个目标转化为一份达成共识的计划，把该计划拆解为原子化且可独立验证的任务，并在一个以核查收尾的专注循环中运行每一项任务。<br /><br />它刻意对你使用何种 AI 代理或技术栈保持中立——适配器会把同一套核心循环转译给 Claude、Cursor、Copilot、Codex、Gemini 等。计划、任务与运行日志全都是纯 Markdown,因此工作始终保持可读、可审阅且受版本控制。',
    passionsTitle: '核心原则',
    passions: [
      {
        title: '先规划，后执行',
        description:
          '在计划达成共识之前，不写一行代码。计划是你与代理之间的契约。',
        icon: '\u{1F5FA}️',
        link: '/methodology',
      },
      {
        title: '任务是原子化的',
        description:
          '每项任务的范围都经过界定，使其能够被独立执行与验证，然后原子化提交。',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title: '验证一切',
        description:
          '每项任务都以一次明确的核查收尾，然后才开始下一项，进展记录在 git 中。',
        icon: '✅',
        link: '/kit',
      },
    ],
    quickFactsTitle: '速览',
    quickFacts: [
      '开放方法论，采用 MIT 许可',
      '框架无关、代理无关',
      '由 Dailybot 与社区共同维护',
      '包含一份规范、命令、适配器、预设与示例',
      '仅 Markdown——无运行时，无锁定',
      '将任意代码仓库转化为 AI-first、可被代理驾驭的代码库',
    ],
    ctaTitle: '由谁维护',
    ctaDescription:
      'Deep Work Plan 脱胎于 Dailybot 真实的工程工作，如今由 Dailybot 与开源社区共同维护。方法论、规范与套件均以 MIT 许可发布——可免费使用、改编并在其上构建。',
    ctaCv: '阅读方法论',
    ctaContact: '快速开始',
  },

  // Contact page
  contactPage: {
    title: '社区与联系',
    subtitle: '开源 · 社区驱动',
    description:
      'Deep Work Plan 以开放方式构建。通过下方渠道找到源码、提交 issue 或加入讨论——欢迎贡献。',
    heroDescription:
      '有疑问、想法或改进建议吗？Deep Work Plan 在公开环境中开发——这里是联系本项目及其维护者的途径。',
    formTitle: '发送留言',
    nameLabel: '姓名',
    namePlaceholder: '你的姓名',
    emailLabel: '邮箱',
    emailPlaceholder: 'your@email.com',
    reasonLabel: '我想就以下事项与你联系',
    reasonOptions: [
      { value: '', label: '— 选择一个主题 —' },
      { value: 'general', label: '一般事务/打个招呼' },
      { value: 'tech-talk', label: '技术分享/演讲邀请' },
      { value: 'collaboration', label: '合作/伙伴关系' },
      { value: 'project', label: '项目/工作咨询' },
      { value: 'dailybot', label: '关于 Dailybot 的问题' },
      { value: 'trading', label: '关于我交易方面的问题' },
      {
        value: 'the-library-of-tomorrow',
        label: '加入 The Library of Tomorrow',
      },
      { value: 'other', label: '其他' },
    ],
    subjectLabel: '主题',
    subjectPlaceholder: '这是关于什么的？',
    messageLabel: '留言',
    messagePlaceholder: '写下你的留言……',
    sendButton: '发送留言',
    sendingButton: '正在发送……',
    successTitle: '留言已发送',
    successMessage: '感谢你的来信。我会尽快回复你。',
    sendAnotherButton: '再发一条留言',
    requiredField: '此字段为必填项',
    invalidEmail: '请输入有效的邮箱地址',
    fallbackMessage: '联系表单目前不可用。你可以直接通过邮件联系我。',
    fallbackEmailText: '给我发邮件至',
    formNote: '我会尽快回复你。',
    socialTitle: '与我联系',
    locationTitle: '所在地',
    locationText: '常驻哥伦比亚。欢迎全球范围的远程合作。',
    prefillSubjects: {
      generalInquiry: '一般咨询',
      collaboration: '合作机会',
      projectInquiry: '项目或工作咨询',
      projectCollaboration: '项目合作咨询',
      startupCollaboration: '创业合作机会',
      techTalkInvitation: '技术分享演讲邀请',
      tradingQuestion: '交易相关问题',
      dailybotQuestion: '关于 Dailybot 的问题',
    },
  },

  contactSection: {
    title: '与我联系',
    description:
      '我始终乐于参与有趣的交流、合作机会与新的想法。无论你想聊技术、创业，还是只是打个招呼。',
    ctaText: '取得联系',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'zh-CN',

  // 404 page
  notFoundPage: {
    title: '页面未找到',
    description:
      '你查找的页面不存在或已被移动。浏览方法论，或返回首页继续浏览。',
    heading: '页面未找到',
    message:
      '抱歉，你查找的页面不存在，或可能已被移动。请尝试返回首页或浏览方法论。',
    backHome: '返回首页',
    exploreMethodology: '阅读方法论',
    agentTitle: '面向 AI 代理',
    agentIntro:
      '此路径不存在。下方的恢复链接（及其机器可读的等价物）列出了本站点的所有页面。',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'Deep Work Plan 方法论',
      description:
        '从宣言到原型，共五章：Deep Work Plan 背后的原则、核心循环、模板、技能与代理，以及各项适配。',
    },
    eyebrow: '方法论',
    title: 'Deep Work Plan 方法论',
    intro:
      '五章内容，带你从 Deep Work Plan 背后的理念，走到你每天都在使用的实操循环、模板与适配。',
    chapterLabel: '章',
    readChapter: '阅读本章',
    prev: '上一章',
    next: '下一章',
    backToIndex: '全部章节',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'Deep Work Plan 规范',
      description:
        'Deep Work Plan 方法论的可读规范：DWP 格式、代理协议、原型、文档标准与附加组件。',
    },
    eyebrow: '规范',
    title: '规范',
    intro: '这套方法论精确、可读的规范——人类与代理共享的结构与协议。',
    tocTitle: '本页内容',
    prev: '上一篇',
    next: '下一篇',
    backToIndex: '全部规范文档',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'Deep Work Plan 套件',
      description:
        '让 Deep Work Plan 可在各类代理与技术栈上运行的技能及其八个子技能、命令、适配器、预设、可选附加组件与示例。',
    },
    eyebrow: '套件',
    title: '套件',
    intro:
      '运行这套方法论所需的一切：技能及其各子技能、斜杠命令、代理适配器、接入预设、必需的本地评审与可选附加组件，以及实战示例。',
    groups: {
      command: {
        title: '子技能与命令',
        description:
          '技能路由器及其各子技能（create、execute、refine、resume、status、verify、onboard、author）,以及委派给它们的轻量斜杠命令。',
      },
      adapter: {
        title: '适配器',
        description: '面向 Claude、Cursor、Codex 等的轻量化逐代理集成。',
      },
      preset: {
        title: '接入预设',
        description:
          'onboard 流程所使用的逐技术栈推理指南，用于将文档、技能与验证命令适配到你的代码仓库。',
      },
      example: {
        title: '示例',
        description: '完整的前后对比演示。',
      },
      addon: {
        title: '附加组件（可选）',
        description:
          'onboard 流程为仓库叠加的能力：必需的 AI Diff Reviewer 本地评审，外加四个绝非 AI-first 基线组成部分的可选附加组件。',
      },
    },
    viewDetail: '查看详情',
    prev: '上一项',
    next: '下一项',
    backToIndex: '返回套件',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'Deep Work Plan 示例',
      description:
        '前后对比演示，展示同一项工程任务在有与没有 Deep Work Plan 时的差别——以及在可靠性与审阅上的不同。',
    },
    eyebrow: '示例',
    title: '示例',
    intro: '看方法论的实战——对真实工程任务的具体、前后对比演示。',
    viewExample: '阅读演示',
    prev: '上一篇',
    next: '下一篇',
    backToGallery: '全部示例',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: '快速开始 — Deep Work Plan',
      description:
        '安装技能，接入你的代码仓库，然后用任意代理规划并执行——让你的仓库变得规范驱动、可被代理驾驭的各个步骤。',
    },
    eyebrow: '快速开始',
    title: '几分钟即可上手',
    intro:
      '安装技能，接入你的代码仓库，然后用任意代理规划并执行——让你的仓库变得规范驱动、可被代理驾驭的各个步骤。',
    sequenceTitle: '采纳路径',
    codeLabel: '终端',
    orLabel: '或',
    steps: [
      {
        title: '安装 Deep Work Plan 技能',
        description:
          '把技能添加到你的代码仓库——一个路由器外加八个子技能（create、execute、refine、resume、status、verify、onboard、author）。使用 Skills CLI 是最快的方式，或者在具备 git 与 shell 的环境中克隆仓库并运行 setup。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '接入代码仓库',
        description:
          '运行 onboard 子技能，让代理对你真实的仓库进行推理。它会生成 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个跨代理的 .agents/ 目录（含 .claude → .agents 和 .cursor → .agents 符号链接）,接入轻量的 dwp-* 命令，并搭建一个被 gitignore 的 .dwp/。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '演化套件并采纳附加组件',
        description:
          '使用 /skill-create 与 /agent-create（author 子技能）来培育与技术栈相适配的技能、代理与命令。接入流程会安装必需的 AI Diff Reviewer 本地评审（其 CI 门禁仍为可选），并提供四个可选附加组件——devcontainer、Dailybot、dependency-upgrade 与 design-system——你只在它们契合时才采纳。',
      },
      {
        title: '规划并执行',
        description:
          '生成一份 Deep Work Plan 并逐任务运行，验证每一道关卡并跨会话恢复——让仓库依据自身的规范被驾驭。',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: '成果',
    outcome:
      '你的代码仓库变得规范驱动、可被代理驾驭：计划是持久的事实来源，而代码仓库本身成为任意代理依据其运行的 harness（运行支架）。',
    nextStepsTitle: '后续步骤',
    nextSteps: [
      { label: '阅读方法论', href: '/methodology' },
      { label: '浏览套件', href: '/kit' },
      { label: '查看示例', href: '/examples' },
    ],
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — 让你的代码仓库 AI-first',
      description:
        '在任意代码仓库中采纳 Deep Work Plan 方法论。安装技能、运行代理接入，然后用任意 AI 编码代理规划并执行。',
    },
    eyebrow: '采纳',
    title: '让这个代码仓库 AI-first',
    intro:
      '一个端点，将任意代码仓库转化为规范驱动、面向代理就绪的代码库。安装技能，让代理接入仓库，然后用任意编码代理规划并执行结构化的工作。',
    handoffTitle: '复制到你的代理',
    handoffBody:
      '复制完整的 init.md 提示并将其粘贴到你的 AI 编码代理中——Claude Code、Cursor、Codex 或任何其他代理。它会阅读方法论与规范、安装技能，并为 Deep Work Plan 接入这个代码仓库。',
    handoffInstruction:
      '请阅读并按照 https://deepworkplan.com/init.md 中的说明操作，将此仓库变为 AI-first。',
    handoffMdLabel: '自包含的代理提示',
    codeLabel: 'agent',
    whatTitle: '它做了什么',
    whatBody: [
      '采纳会以两种持久的方式改变代码仓库——这正是方法论的两大支柱。',
      '其一，代码仓库变得规范驱动：工作从一份书面的计划与规范开始，而非从临时提示开始。其二，代码仓库本身成为代理的 harness（运行支架）——一份 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个 .agents/ 技能目录（含 .claude → .agents 和 .cursor → .agents 符号链接）,为每个代理提供它所需的上下文与命令。',
    ],
    sequenceTitle: '采纳流程',
    orLabel: '或',
    steps: [
      {
        title: '安装前先验证',
        description:
          '在核查之前，请将提示和技能视为不可信的。两者均为开源且采用 MIT 许可；该技能以 Markdown 为核心，无网络调用，也无遥测。每个发布版本都会发布一份涵盖所有已发布技能文件的 SHA256SUMS，以便你在运行前确认副本匹配。发布版本有校验和，但未签名（签名是已记录的下一步计划）。',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: '安装技能',
        description:
          '添加 Deep Work Plan 技能，让任意代理都能规划并执行结构化的工作。该技能附带一个路由器外加八个子技能——create、execute、refine、resume、status、verify、onboard 与 author。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '运行代码仓库接入',
        description:
          '调用 onboard 子技能，让代理对真实的仓库进行推理——它的技术栈、包管理器与真实的验证命令。随后它会生成 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个跨代理的 .agents/ 目录（含 .claude → .agents 和 .cursor → .agents 符号链接），接入轻量的 dwp-* 命令，并搭建一个被 gitignore 的 .dwp/ 以存放计划与草稿。对于大型仓库，onboard 子技能采用计划驱动路径：先完成探查，然后生成一份接入用的 Deep Work Plan。没有任何东西套用模板；一切都适配于你的代码仓库。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '本地评审与可选附加组件',
        description:
          '接入流程会安装必需的 AI Diff Reviewer 本地评审（其 CI 门禁仍为可选），并提供四个可选附加组件——devcontainer、Dailybot、dependency-upgrade 与 design-system——你只在它们契合时才采纳。一个仓库即便不带任何可选附加组件，也完全符合规范。使用 /skill-create 与 /agent-create（author 子技能）来培育超越基线的技能、代理与命令。',
      },
      {
        title: '规划并执行',
        description:
          '用 /dwp-create 生成 Deep Work Plan 并用 /dwp-execute 运行它们，随着工作推进再使用 /dwp-status、/dwp-refine、/dwp-resume 与 /dwp-verify。每份计划都带有编号任务、验证关卡与一套完成协议——以三项强制性最终任务收尾：安全审查、技能与代理发现，以及执行报告。',
      },
      {
        title: '验证一致性',
        description:
          '运行 /dwp-verify 以获取一份基于规范的客观通过/不通过报告。确认 AGENTS.md、docs/（包含真实内容而非占位符）、.agents/（包含轻量的 dwp-* 委托器和与磁盘一致的目录）、.dwp/ 与 tmp/ 均已就位——没有任何套用模板的内容，一切都是针对此仓库推理得出的。',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: '成果',
    outcome:
      '代码仓库变得规范驱动，而代码仓库本身成为代理的 harness（运行支架）——上下文与命令随代码一同传递。',
    nextStepsTitle: '接下来阅读',
    nextSteps: [
      { label: '快速开始', href: '/quickstart' },
      { label: '方法论', href: '/methodology' },
      { label: '规范', href: '/spec' },
      { label: '套件', href: '/kit' },
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
          'Solo developers and small teams who want context engineering and verification with little ceremony.',
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
      title: '信任与安全',
      description:
        '为什么 Deep Work Plan 可以放心采用：开源且采用 MIT 许可、以 Markdown 为核心且无网络调用或遥测、非破坏性设计、安装可验证，并具有清晰的漏洞披露政策。',
    },
    eyebrow: '信任与安全',
    title: '信任与安全',
    intro:
      '没有人应该安装一个无法信任的技能。Deep Work Plan 生来就是可被验证的，而非依赖信念：开源、以 Markdown 为核心、非破坏性，且在运行之前就可以逐行核查。本页直白地说明它做了什么、没做什么，以及如何对两者都加以确认。',
    pillarsTitle: '你所信任的内容',
    pillars: [
      {
        title: '开源且采用 MIT 许可',
        body: '网站和技能均公开且可 diff。你可以在运行前阅读每一行，并将任意副本与某个 tag 发布时的源代码进行比对。',
      },
      {
        title: '以 Markdown 为核心——无网络调用，无遥测',
        body: '该技能没有 CLI、没有 HTTP API，也没有认证流程。它不发起任何网络调用，也不发送任何遥测数据；它唯一的本地辅助程序只读取 git 和环境元数据。你的代码仓库中没有任何信息会离开你的机器。',
      },
      {
        title: '非破坏性设计',
        body: '该技能唯一与安全相关的操作就是修改你的代码仓库——而且它是协调式的，而非覆盖式的。它会检测已有内容，提出一份计划，并在替换任何内容之前征求确认。计划输出存放在被 gitignore 的 .dwp/ 目录中。',
      },
      {
        title: '不涉及任何密钥',
        body: '该方法论从不将密钥提交到版本控制，并将工作状态保存在版本控制之外。接入过程追加 .gitignore 而非重写它，每一处改动都设计为以小巧、可读的 diff 呈现供审阅。',
      },
      {
        title: '可验证的来源',
        body: '每个发布版本都会为已发布的技能文件发布校验和，因此你可以在信任之前确认下载的副本与已发布内容相符。',
      },
    ],
    verifyTitle: '运行前先验证',
    verifyIntro:
      '在完成核查之前，请将该技能视为不可信的。每个发布版本都会附带一份涵盖所有已发布技能文件的 SHA256SUMS 文件。下载你打算安装的版本所对应的文件，然后验证你的副本是否匹配——非零退出码意味着某个文件不匹配，此时应立即停止。',
    codeLabel: 'shell',
    verifyNote:
      '发布版本有校验和，但未经签名——签名（cosign 或维护者 GPG）是已记录的下一步计划，而非当前的承诺。由于一切都是公开的，你也可以将任意文件与仓库在其 tag 处的内容进行比对。',
    disclosureTitle: '报告漏洞',
    disclosureBody:
      '发现了安全问题？请通过 GitHub 的私密漏洞报告功能，在相关仓库——技能或网站（详见下方链接的安全政策）——上私密报告，而非公开提交 issue，因为公开提交会在修复完成前暴露问题。',
    resourcesTitle: '信任资源',
    linkManifest: '可机器读取的信任清单',
    linkSecurityTxt: 'security.txt（RFC 9116）',
    linkPolicy: '网站安全政策',
    linkSkillPolicy: '技能安全政策与威胁模型',
    limitationsTitle: '诚实的局限性',
    limitations: [
      '发布版本有校验和，但尚未经过密码学签名——签名已在计划之中，尚未完成。',
      'Deep Work Plan 对你的代码仓库运行一个自主编码代理。请审阅它提出的计划和 diff；该方法论正是为这种审阅而设计的，而非取代它。',
      '这里的信任声明仅描述官方来源。已偏离仓库的经修改或第三方副本不附带这些保证——请先验证。',
    ],
    ctaTitle: '放心采用',
    ctaBody: '阅读方法论和规范，将代理指向 init 端点，并在运行之前验证安装。',
    ctaPrimary: '阅读方法论',
    ctaSecondary: '采纳（Init）',
  },

  developersPage: {
    meta: {
      title: '开发者 — Deep Work Plan 代理 API、MCP 服务器与文档',
      description:
        'Deep Work Plan 的代理接口面：只读、零认证的 API（附 OpenAPI 规范）、位于 /api/mcp 的 MCP 服务器、17 种语言的逐页 Markdown，以及 npx skills 安装 CLI。',
    },
    eyebrow: '代理与开发者接口面',
    title: '面向开发者与 AI 代理的 Deep Work Plan',
    intro:
      'deepworkplan.com 在页面之外还提供了一个机器可读的接口面：由 OpenAPI 描述的代理 API、无状态的 MCP 服务器、覆盖 17 种语言每个页面的原生 Markdown 镜像，以及可安装的 DWP 技能。本页面上的一切都是实时、公开且免费的——无需注册任何内容。',
    accessTitle: '设计上的零认证',
    accessIntro:
      '无需生成 API 密钥，没有 OAuth 流程，也没有独立于生产的沙箱——生产接口面本身就是沙箱。这是这套方法论刻意为之的属性：代理无法填写“联系销售”表单，因此本站点绝不会要求你填写。',
    accessPoints: [
      {
        title: '只读',
        body: '每一项操作都是安全、可缓存的 GET——唯一例外是使用 POST 的 MCP 端点。任何地方都不存在写操作、上传或状态变更。',
      },
      {
        title: '无 API 密钥',
        body: '无需注册、无需令牌、没有速率限制层级。匿名访问就是成文的契约，在 /auth.md 与 OAuth 探索桩中声明。',
      },
      {
        title: '免费且开源',
        body: '站点内容与 DWP 技能均采用 MIT 许可。无需征得许可即可用于商业与非商业工作。',
      },
      {
        title: '机器优先',
        body: '/api 路径返回结构化的 JSON 错误、Markdown 404 恢复响应体、RFC 9727 API 目录，以及 ARD 能力清单——为代理消费而构建。',
      },
    ],
    endpointsTitle: '端点',
    endpointsIntro:
      '代理 API 的核心端点。完整且带类型的规范——每一项操作、参数与响应模式——位于 OpenAPI 文档中。',
    endpointsNote:
      '未知的 /api/* 路径会返回带解决提示的结构化 JSON 错误，绝不返回 HTML 错误页。',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: '整个代理 API 的 OpenAPI 3.1 规范。',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description: '精选的 LLM 指引索引——代理推荐的入口。',
      },
      {
        method: 'GET',
        path: '/init.md',
        description: '权威的 DWP 采纳提示（让任意代码仓库 AI-first）。',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          '任意页面的原生源 Markdown——覆盖全部 17 种语言（例如 /es/developers.md）。',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: '静态健康标记，附带指向规范与本门户的链接。',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP 服务器（Streamable HTTP、无状态）：initialize、ping、tools/list、tools/call。',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description: 'ARD 能力清单——robots.txt 中声明的 agentmap。',
      },
    ],
    mcpTitle: 'MCP 服务器',
    mcpIntro:
      '一个基于 Streamable HTTP 的无状态 Model Context Protocol 服务器。三个只读工具：get_init_prompt、list_site_sections 与 read_page。支持协议版本 2025-03-26 与 2025-06-18；无需会话。',
    mcpCodeLabel: '终端 — 基于 HTTP 的 JSON-RPC',
    mcpNote:
      'MCP 清单位于 /.well-known/mcp.json，服务器卡片位于 /.well-known/mcp/server-card.json。Claude、ChatGPT 以及任何 MCP 客户端都能原生调用这些工具。',
    markdownTitle: '面向代理的 Markdown',
    markdownIntro:
      '每个已渲染的页面都会以原生源 Markdown 发布——而非 HTML 转换。通过 URL 后缀显式请求 Markdown，或在任意页面上通过 HTTP 内容协商获取。',
    markdownCodeLabel: '终端 — 内容协商',
    markdownNote:
      '内容协商返回的正是站点渲染所用的同一份源 Markdown，语言与你请求的 URL 一致。',
    cliTitle: '安装套件',
    cliIntro:
      'Deep Work Plan 技能的官方安装路径——与 /init 端点交给代理的命令完全相同。它适用于任何兼容 skills 的编码代理（Claude Code、Cursor、Codex、Gemini 等）。',
    cliCodeLabel: '终端 — skills CLI',
    cliNote:
      '该技能会内嵌到你仓库内的 .agents/skills/deepworkplan/，因此每个接触该仓库的代理都共享同一套方法论。',
    resourcesTitle: '机器可读资源',
    resources: [
      { label: 'OpenAPI 规范 (/openapi.json)', href: '/openapi.json' },
      { label: '代理访问与认证声明 (/auth.md)', href: '/auth.md' },
      {
        label: 'API 目录，RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'MCP 清单 (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: '安全联系 (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: '站点仓库描述符 (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: '把代理指向它',
    ctaBody:
      '最快的路径仍然只有一行：把 /init 提示交给任意编码代理，它会安装技能、接入你的代码仓库，并开始完成深度工作。',
    ctaPrimary: '打开 /init 提示',
    ctaSecondary: '阅读方法论',
  },

  privacyPage: {
    meta: {
      title: '隐私 — Deep Work Plan',
      description:
        'deepworkplan.com 的隐私政策：一个无账户、无广告、使用无 Cookie 分析的静态站点，并直白说明联系表单到底收集哪些信息。',
    },
    eyebrow: '隐私政策',
    title: 'deepworkplan.com 上的隐私',
    intro:
      'Deep Work Plan 是一个静态文档与方法论站点。本页直白而完整地说明你访问时站点会触及哪些数据：站点中没有账户系统、没有广告，也没有任何跨站跟踪。',
    lastUpdated: '2026年9月8日',
    sections: [
      {
        heading: '站点是什么',
        body: 'deepworkplan.com 是一组通过 CDN 提供的静态页面。没有登录，没有用户数据库，站点也无法存储个人资料。内容在 DailybotHQ 组织下的公开 GitHub 仓库中开发，你在这里读到的一切都完全按构建结果提供。',
      },
      {
        heading: '分析',
        body: '本站点使用 Umami——一项无 Cookie、隐私优先的分析服务——来按聚合方式统计页面浏览量。Umami 不设置跟踪 Cookie，也不构建跨站档案。由于 AI 爬虫不执行 JavaScript，一个服务器端边缘函数还会把自动化机器人访问的用户代理与路径记录为匿名分析事件——它识别的是爬虫软件（例如“GPTBot 访问了 /init”），绝不是人类访客。',
      },
      {
        heading: 'Cookie 与本地存储',
        body: '本站点不设置任何跟踪 Cookie。浏览器中唯一保存的是主题偏好（浅色或深色模式），存放在 localStorage 中，它绝不会离开你的设备，也不会被传送到任何地方。如果你清除浏览器存储，站点只会回到系统默认主题。',
      },
      {
        heading: '第三方服务',
        body: '托管与分发运行在 Cloudflare Pages 上；作为运营 CDN 与阻止滥用的一部分，Cloudflare 会在边缘处理请求日志与 IP 地址，并遵循其自身的隐私政策。聚合分析运行在 Umami（cloud.umami.is）上。如果你自愿提交联系表单，你的回答会经由 Google Forms 发送给我们的团队——这是唯一收集你输入信息的地方，且仅用于回复你。',
      },
      {
        heading: '我们不做的事',
        body: '我们不出售或共享个人数据，不投放广告或再营销像素，不对浏览器做指纹识别，也不发送营销邮件。本站点没有邮件通讯订阅，也没有超出上述聚合、无 Cookie 计数的任何遥测。',
      },
      {
        heading: '你的选择',
        body: '由于这里的分析是聚合且无 Cookie 的，不存在可供导出或删除的个人档案。你可以用任何内容拦截器屏蔽分析脚本，而不影响站点的运行。如果你提交过联系表单并希望删除留言，请写信至下方的联系地址，我们会将其移除。',
      },
      {
        heading: '政策变更',
        body: '如果本政策发生实质性变更，本页顶部的更新日期会随之改变，实质性修改会提交到公开的网站仓库，任何人都可以在那里审阅历史。',
      },
    ],
    contactTitle: '联系与安全',
    contactBody:
      '隐私问题请致信 security@dailybot.com。要报告安全漏洞，请优先使用 GitHub 面向网站与技能仓库的私密漏洞报告——确切地址见 /.well-known/security.txt。',
  },
};
