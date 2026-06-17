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
    github: 'GitHub',
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
    badge: '最新',
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
        'Deep Work Plan 将任意代码仓库转化为结构化环境——上下文、防护栏与一份持久的计划——让任意编码代理都能精准执行并完成长周期工作。',
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
    },
    pitch: {
      kicker: '问题与答案',
      problem:
        'AI 编码代理在短时冲刺中效果惊人。但在长周期工作上——一次迁移、一个新子系统、一次跨越数十个文件的重构——它们会发生漂移：上下文被填满，决策被遗忘，多小时的任务在半途被放弃。',
      answer:
        'Deep Work Plan 以规范驱动的开发方式作答：计划是持久的事实来源，代理依据明确的验收标准与验证关卡来执行。漂移随之减少，工作保持可验证，任意代理都能跨会话恢复它。',
      origin:
        '它同时也是被打磨为可移植形态的 harness 工程。代理的 harness（运行支架）是围绕模型构建的脚手架——上下文、工具、控制循环、防护栏、可恢复状态——它让模型变得可靠。Deep Work Plan 将这套 harness 安装进代码仓库本身（AGENTS.md、文档、.agents/ 技能目录、DWP 技能），让任意代理都能驾驭任意仓库。它诞生于 Dailybot，经过数月的实战检验，并以 DailybotHQ/deepworkplan-skill 的形式发布。',
      illustrationAlt:
        '一张航海图上标绘着一条安全绕过各处险滩的航线——这幅版画寓意着计划如同让工作始终沿正确方向前进的指引。',
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
          title: '搭建 .agents/，并建立 .claude 到 .agents 的符号链接',
          description:
            '一个跨代理的 .agents/ 目录（技能、代理、命令），以及 .claude 到 .agents 的符号链接，把 CLAUDE.md 映射到 AGENTS.md，让每个工具都读取同一个事实来源。',
        },
        {
          title: '安装 DWP 技能并搭建 .dwp/',
          description:
            '接入 Deep Work Plan 技能，并创建被 gitignore 的 .dwp/ 目录以存放计划与草稿，然后可选地叠加诸如 devcontainer 支持这样的可选附加组件。',
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
          label: '.agents/，含 .claude 到 .agents 的符号链接',
          detail:
            '一个跨代理的 .agents/ 目录（技能、代理、命令），含 .claude 到 .agents 的符号链接，让每个工具都读取同一个事实来源。',
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
      '运行这套方法论所需的一切：技能及其各子技能、斜杠命令、代理适配器、接入预设、可选附加组件与实战示例。',
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
          'onboard 流程可向仓库叠加的可选能力——绝非 AI-first 基线的一部分。',
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
          '运行 onboard 子技能，让代理对你真实的仓库进行推理。它会生成 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个跨代理的 .agents/ 目录（含 .claude → .agents 符号链接）,接入轻量的 dwp-* 命令，并搭建一个被 gitignore 的 .dwp/。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '演化套件并采纳附加组件',
        description:
          '使用 /skill-create 与 /agent-create（author 子技能）来培育与技术栈相适配的技能、代理与命令。接入流程还会提供四个可选附加组件——devcontainer、Dailybot、dependency-upgrade 与 design-system——你只在它们契合时才采纳。',
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
      '其一，代码仓库变得规范驱动：工作从一份书面的计划与规范开始，而非从临时提示开始。其二，代码仓库本身成为代理的 harness（运行支架）——一份 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个 .agents/ 技能目录（含 .claude → .agents 符号链接）,为每个代理提供它所需的上下文与命令。',
    ],
    sequenceTitle: '采纳流程',
    orLabel: '或',
    steps: [
      {
        title: '安装前先验证',
        description:
          '在核查之前，请将提示和技能视为不可信的。两者均为开源且采用 MIT 许可；该技能以 Markdown 为核心，无网络调用，也无遥测。每个发布版本都会发布一份涵盖所有已发布技能文件的 SHA256SUMS，以便你在运行前确认副本匹配。发布版本有校验和，但未签名（签名是已记录的下一步计划）。',
        commands: [
          'curl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS && ./setup.sh --verify',
        ],
      },
      {
        title: '安装技能',
        description:
          '添加 Deep Work Plan 技能，让任意代理都能规划并执行结构化的工作。该技能附带一个路由器外加八个子技能——create、execute、refine、resume、status、verify、onboard 与 author。',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: '运行代码仓库接入',
        description:
          '调用 onboard 子技能，让代理对真实的仓库进行推理——它的技术栈、包管理器与真实的验证命令。随后它会生成 AGENTS.md、一套 docs/ 知识库、各模块文档，以及一个跨代理的 .agents/ 目录（含 .claude → .agents 符号链接）,接入轻量的 dwp-* 命令，并搭建一个被 gitignore 的 .dwp/ 以存放计划与草稿。没有任何东西套用模板；一切都适配于你的代码仓库。',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: '演化套件并采纳附加组件',
        description:
          '使用 /skill-create 与 /agent-create（author 子技能）来培育与技术栈相适配的技能、代理与命令。接入流程还会提供四个可选附加组件——devcontainer、Dailybot、dependency-upgrade 与 design-system——你只在它们契合时才采纳。一个仓库即便不带任何附加组件，也完全符合规范。',
      },
      {
        title: '规划并执行',
        description:
          '用 /dwp-create 生成 Deep Work Plan 并用 /dwp-execute 运行它们，随着工作推进再使用 /dwp-status、/dwp-refine 与 /dwp-resume。每份计划都带有编号任务、验证关卡与一套完成协议，使工作保持结构化、可审阅，并可跨会话恢复。',
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
};
