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
    faq: '常见问题',
    compare: '对比',
    changelog: 'Changelog',
    resources: '资源',
    resourcesDesc: '示例、信任、常见问题与对比',
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
  changelogPage: {
    meta: {
      title: 'Deep Work Plan 更新日志',
      description:
        'Deep Work Plan 技能、方法论和可移植代理工作框架的重要更新。',
    },
    eyebrow: '更新日志',
    title: '方法背后的工作',
    intro:
      '以来源为依据的时间线，记录让 Deep Work Plan 适用于长期代理工作的版本和设计决策。',
    viewDetail: '阅读更新',
    backToIndex: '所有更新',
    sourceLabel: '来源',
    featuredLabel: '重点发布',
    relatedTitle: '相关更新',
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
      learn: '学习',
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
          '用 /dwp-create 生成 Deep Work Plan 并用 /dwp-execute 运行它们，随着工作推进再使用 /dwp-status、/dwp-refine、/dwp-resume 与 /dwp-verify。每份计划都带有编号任务、验证关卡与一套完成协议——并以唯一的强制 Final Review 收尾（安全审查、最终状态验证与技能决策核对）。Executive Report 仍可按需提供。',
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
      title: '常见问题 — Deep Work Plan',
      description:
        '人们关于 Deep Work Plan 最常提出的疑问，都在这里得到简明解答：它究竟做什么、逐任务的验证关卡如何实现、会话中断后如何从磁盘恢复执行、它与规范驱动工具、代理工作流框架和各代理自带的计划模式相比有何异同，以及如何把它接入你的代码仓库，开始第一份计划。',
    },
    eyebrow: 'FAQ',
    title: '常见问题',
    intro:
      '关于 Deep Work Plan 最常见问题的简短解答，每一条都附有可深入了解的页面链接。',
    tocTitle: '本页内容',
    groups: [
      {
        id: 'what',
        title: 'Deep Work Plan 是什么',
        items: [
          {
            id: 'what-is-it',
            question: 'Deep Work Plan 究竟做什么？',
            answer:
              'Deep Work Plan 将一个代码仓库转变为结构化环境，让编码代理能够在其中可靠地执行长时间的工作。它以代理技能的形式安装，对仓库做一次接入（一份 `AGENTS.md` 索引、一棵 `docs/` 树、一套由技能与命令组成的 `.agents/` 套件、一个被 gitignore 的 `.dwp/` 输出区），此后任何目标都成为一份计划：原子任务，每项都带有验收标准与验证关卡，逐项执行、通过即提交，并可由任意代理从磁盘恢复。计划以一项 Final Review 收尾——审计安全并验证最终状态。该方法论采用 MIT 许可，可与任何能读取仓库的编码代理协同工作。',
            linkLabel: '阅读方法论',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: '它适合谁？',
            answer:
              '适合把真实的多步骤工作交给编码代理、并希望工作得以完成的开发者与团队。当一项任务跨越多个会话、多类文件或多个代理；当队友必须能从代理停下之处接手；或当“完成”必须意味着“已验证”、而非“代理说完成了”时，它尤为合适。一行代码的修复不需要计划，方法论自己也如此规定：其比例严格度规则建议改用内联的目标、标准与关卡。',
            linkLabel: '快速开始',
            linkPath: '/quickstart',
          },
          {
            id: 'is-it-a-tool',
            question: '它是工具、框架还是方法论？',
            answer:
              '一套被打包为可安装技能的方法论。没有服务器、没有账号、没有专有格式，除你已在使用的编码代理之外也没有额外的运行时。被安装的是代理阅读的指令、一小组用于上下文检测与符合性检查的 shell 脚本，以及你的仓库所采纳的约定。计划产出的一切都是你仓库中的 Markdown 与 JSON，无需任何工具即可阅读。',
            linkLabel: '阅读规范',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: '它支持哪些编码代理？',
            answer:
              '任何能读取仓库文件的代理。该技能遵循开放的 Agent Skills 标准与 `AGENTS.md` 约定，因此 Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot 等都能通过其常规的技能与指令加载机制识别它。方法论自身的评估表明，由一家厂商的代理启动、再由另一家厂商的代理恢复的计划在两个方向上都有实证。兼容性矩阵按代理分别列出安装覆盖情况与行为证据，且从不将二者混为一谈。',
            linkLabel: '浏览套件',
            linkPath: '/kit',
          },
          {
            id: 'what-is-installed',
            question: 'What exactly gets installed, and where?',
            answer:
              'The agent skill is installed wherever your agent loads project or user skills. Onboarding then adapts the repository itself: it creates or reconciles AGENTS.md, docs/, .agents/ and the gitignored .dwp/ workspace. The skill teaches the agent the method; the repository keeps the context, kit and plan evidence that other agents need to continue.',
            linkLabel: 'See the adoption flow',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Does Deep Work Plan require Git?',
            answer:
              'Git is recommended for repositories because its history is part of the recovery and review surface, but the methodology can also run in an agent workspace without a Git repository. In that case the machine-readable state layer, including state.json checkpoints and gate records, is required so recovery does not depend on a chat transcript.',
            linkLabel: 'Read about repository archetypes',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question:
              'What is the difference between a skill, a plan and a product specification?',
            answer:
              'A skill describes how an agent performs a repeatable procedure. A DWP plan describes a concrete change through scope, acceptance criteria, validation gates and evidence. A product specification describes the product current behavior and evolves through deltas after implementation; skills and plans are specifications too, but they describe procedures and changes rather than maintaining that canonical product contract.',
            linkLabel: 'Read the specification',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: '计划如何运行',
        items: [
          {
            id: 'how-to-use',
            question: '如何使用？',
            answer:
              '三步。首先，将 Deep Work Plan 技能安装到你的编码代理中——最快的路径是 `npx skills add DailybotHQ/deepworkplan-skill`（或克隆 skill 仓库并运行 `./setup.sh`）。其次，对仓库做一次接入，让代理根据你的技术栈适配 `AGENTS.md`、`docs/`、`.agents/` 套件和被 gitignore 的 `.dwp/` 区域：指向 https://deepworkplan.com/init.md，或运行 `/deepworkplan-onboard`。第三，用精简命令规划并执行工作：`/dwp-create <goal>` 构建计划；`/dwp-execute` 逐任务、逐关卡执行；`/dwp-refine` 编辑草稿或进行中的计划；`/dwp-resume` 在中断后继续；`/dwp-status` 报告进度但不执行；`/dwp-verify` 产出客观的符合性报告。会拦截 `/` 的代理通常改用 `#`（例如 `#dwp-execute`）。接入端点与快速开始以更详尽的方式走同一条路。',
            linkLabel: '快速开始',
            linkPath: '/quickstart',
          },
          {
            id: 'gates',
            question: '验证关卡是如何实现的？需要人工签署吗？',
            answer:
              '它们是代理自己运行的可执行断言。人工签署位于运行的两端：一个人在执行前批准计划，并在拉取请求时审阅最终的 diff；其间的执行是自主的。每项任务都点明具体命令——通常是仓库自身的质量关卡——从任务的触及面中选择：被改行为及其消费方的测试，当改动是共享的或无法界定影响时，扩大到完整的测试套件。只有当这些命令成功退出时，任务才被标记为完成，而改变行为的任务必须扩展测试。一旦失败，任务被标记为受阻，代理随之停止。',
            linkLabel: '核心循环',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question: '当人们在两次运行之间修改代码时，计划如何避免过时？',
            answer:
              '从三个方面入手。任务以行为、而非编辑动作来书写：验收标准陈述系统必须做什么，因此文件改名或实现替换都不会使其失效。每道关卡都针对仓库当前的状态重新运行，因此失实的假设会在下一次运行中响亮地失败，而非悄然偏移，而那次失败正是发起精炼的信号。保持文档同步也是工作的一部分：改变行为的任务会在自己的关卡内更新描述该行为的文档与面向代理的套件。每一次运行结束时，仓库都应比运行开始时更适于代理工作。',
            linkLabel: '阅读方法论',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question: '我能在运行中途修改计划而不丢失已完成的工作吗？',
            answer:
              '可以；精炼一份已部分执行的计划是受完整支持的常规操作。任务定义与执行状态分开保存：计划是磁盘上的一份清单加上一个小型状态文件，因此已完成的内容独立于任务文本被记录。当某项任务被发现有误时，代理会将其标记为受阻并停下来，而不是硬闯过去。随后你可以编辑、重排、拆分或丢弃尚未运行的任务，已完成的任务保持完成。恢复时会从磁盘与仓库的实际状态重建状态，并重新运行要紧的关卡，因此底下发生的任何变动都不会漏网。',
            linkLabel: '核心循环',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question:
              '它会持续依据计划检查工作，还是计划只是一次性的前置产物？',
            answer:
              '计划是一次贯穿始终的检查。代理一次只做一项小任务，并且必须在继续之前先通过验证，因此它最多偏出一步，而不是三步。每项任务都带有验收标准以及证明它们的确切命令，进展随工作写入仓库，每项任务各有状态，因此偏移对你、对下一个会话、对下一个代理都是可见的。直到一切通过验证——包括 Final Review——计划才算完成。诚实的告诫：方法论无法阻止代理一开始就写下一条薄弱的验收标准；它做的是让偏移响亮，而非无声。',
            linkLabel: '核心循环',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question: '计划是生成一次后靠人工维护，还是随代码演进？',
            answer:
              '都不是。它从一个目标一次性生成，随后作为工作的一部分被维护。计划有意不从代码 diff 重写，因为追逐代码的规范会变成一面滞后的镜子——那正是该方法论要消灭的偏移。它的演进是有意为之：关卡针对当前仓库重新运行，失败的关卡触发一次精炼，而精炼由代理在运行期间完成，你在事前批准、在事后审阅。文档与测试天然随代码一同演进，因为对它们的更新就在每项任务的关卡之内。',
            linkLabel: '阅读方法论',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: '如果会话中途终止，会发生什么？',
            answer:
              '进展存放在磁盘上，而非聊天记录里。README 复选框、每项任务的日志、一个有界的进行中索引和一个可机器读取的状态文件会在每个任务边界更新，状态文件还会在任何计划内暂停之前记录一个检查点。一个新会话或另一个代理读取那份紧凑的索引，将其与仓库及 git 历史核对，然后从第一项未完成的任务继续，不重做已完成的工作。即使计划创建被中断，也是可恢复的：计划的标识与预期任务列表先于任何任务文件写入，因此半成的计划可以被完成或丢弃，而不是靠猜。',
            linkLabel: '核心循环',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: '什么是 Final Review？',
            answer:
              '每份计划唯一的一项强制收尾任务。依次为：对计划完整累计变更集的安全审查——其中包括由 AI Diff Reviewer 技能对 diff 进行的必备本地审查，critical 发现会在修复或被明确接受之前阻止完成；最终状态验证——即在最终代码上运行仓库完整适用的测试、lint、类型检查与格式化套件；以及对每项任务所记录技能决策的核对。随后，代理报告交付物、证据与局限，并仅提议一次 Executive Report，只有你提出要求才会生成。',
            linkLabel: '查看规范',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'What happens when a validation gate fails?',
            answer:
              'The task is recorded as blocked and the agent stops before claiming completion. You can inspect the evidence, repair the code or refine the task, then resume; a failed command is a signal to resolve the mismatch, not permission to weaken the gate.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: 'Can a plan run unattended overnight or in CI?',
            answer:
              'Yes, when the plan was approved in advance, carries the required state layer and gives the agent bounded authority. An unattended run must stop and record a blocker when reality diverges, a gate fails outside its planned repair scope, or a new approval or credential is needed.',
            linkLabel: 'Read the unattended protocol',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: '它与其他方案的对比',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              '它与 Spec Kit、OpenSpec 或 Kiro 等规范驱动工具有何不同？',
            answer:
              '它们解决的是相邻的问题。规范驱动工具擅长捕捉应当改变什么：以可复用的形态呈现规范、需求与变更提案。Deep Work Plan 关心的是代理如何连续执行数小时而不偏移：接入后的 harness（运行支架）、从触及面中选择的逐任务验证关卡、磁盘上可恢复的状态、带安全审查环节的强制 Final Review，以及针对仓库本身的符合性检查器。二者可以结合：用一份规范或变更提案喂给一份计划。对比页面按每个工具自身的定位将各项能力并排呈现。',
            linkLabel: '查看对比',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              '它与 BMAD、Superpowers、Get Shit Done 或 Gentle-AI 等代理工作流工具有何不同？',
            answer:
              '这些框架带来了成熟的工作风格：角色、原则、测试先行的步骤、验证的习惯。Deep Work Plan 与两者都不同，聚焦于什么留在仓库里、什么可以被检查：任何代理都能冷启动读取的 harness、带验收标准与关卡的任务文件、能在会话结束后存续的状态、带 CI 友好退出码的符合性检查器，以及对每个流程加载多少指令字节的公开测量。它在构造上即是工具无关的，并且不向核心循环添加任何服务、提供商或密钥。对比页面标明了每种做法在何处内置、可选或不在范围内。Gentle-AI 属于相邻的一类——代理生态系统配置器——下一题会专门说明。 Gentle-AI 配置您已经在用的编码代理：跨会话的持久记忆（Engram）、精选技能、人设、MCP 服务器、可选的 Spec-Driven Development，以及可选的基于证据的审查（Receipt-Driven Development）。它写入各代理的配置目录，并可将规划产物保存在 Engram、OpenSpec 文件中，或两者兼有。Deep Work Plan 则安装进仓库本身——任何代理都能冷启动读取的 harness、带验收标准与关卡的任务文件、可恢复的磁盘状态、带 CI 友好退出码的符合性检查器，以及已发布的指令字节台账——而不向核心循环添加任何服务、提供商或密钥。这两层可以并存：Gentle-AI 装备代理；Deep Work Plan 让长周期工作在仓库内持久且可核查。',
            linkLabel: '查看对比',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: '为什么不直接使用我所在用代理的内置计划模式？',
            answer:
              '内置计划模式是有用的，而 Deep Work Plan 建立在同样的基础之上——`AGENTS.md` 约定与开放的 Agent Skills 标准。区别在于计划存放在哪里、由什么来保证它被执行。原生计划通常位于仓库之外，并随会话一起失效；Deep Work Plan 把计划、其状态与其证据写进仓库，因此另一个代理或一位队友可以接续它，而且每项任务都带有一道可执行的关卡和一份留存的日志。你可以继续用代理自带的计划模式来思考；方法论补上的是持久、可验证的执行循环。',
            linkLabel: '查看对比',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: '采用它',
        items: [
          {
            id: 'install',
            question: '接入会向我的仓库写入什么？会改动现有文件吗？',
            answer:
              '接入是非破坏性的：它会检测已有的 `AGENTS.md`、`docs/`、`.agents/` 或 `CLAUDE.md`，采取调和而非覆盖，并在替换任何内容之前先询问。它会写入带真实命令的 `AGENTS.md` 索引、一棵经过推理的 `docs/` 树、各模块文档、带轻量 `dwp-*` 命令的 `.agents/` 套件、一个被 gitignore 的 `.dwp/` 输出区、一份经过验证的测试映射，以及必备的本地代码审查（AI Diff Reviewer 技能加一份为仓库定制的审查扩展）。随后它会运行自检与符合性检查器，让你看到产出了什么。在更早版本下接入的仓库会得到一次定向升级，只补上缺失的部分。',
            linkLabel: '采用入口',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question:
              'Can I use the core methodology without installing add-ons?',
            answer:
              'Yes. Add-ons are opt-in layers and a repository with none is fully DWP-conformant. Devcontainers, Dailybot reporting, dependency upgrades, design-system support and optional CI review are offered only when they fit your repository and you accept them explicitly.',
            linkLabel: 'Browse the add-ons',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: 'What if my repository has no tests or linting yet?',
            answer:
              'DWP does not treat the absence of a toolchain as a free pass. During onboarding the agent proposes a stack-appropriate validation setup, records the commands in the repository documentation and uses those commands as the target for future gates; the proposal remains visible for you to review.',
            linkLabel: 'Read the agent protocol',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: '它收费吗？效率如何衡量？',
            answer:
              '方法论与技能均采用 MIT 许可，且完全免费；核心流程中没有服务、没有 API 密钥、也没有遥测。效率以每个流程加载的指令字节数来报告，由随技能一同提交的脚本测量，并发布在一本评估台账中，增长与下降同样如实呈现。它不以 token 百分比或成本节省的形式报告，因为一份字节清单无法证明这些；一项预注册的公开评估已在计划之中，用以恰当地衡量实际效果。',
            linkLabel: '信任与披露',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: '还有问题？',
      body: '在 GitHub 上发起讨论或提交 issue。反复出现的问题会被收录到本页。',
      ctaLabel: '到 GitHub 提问',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan 与替代方案的对比',
      description:
        'Deep Work Plan 与规范驱动开发工具、代理工作流框架以及各代理自带的原生计划模式之间是什么关系：本页按每个替代方案自身的定位逐一描述，标明每项能力是内置、可选还是不在其范围内，每项事实都可追溯到其官方文档，并注明最近一次复核的日期。这是一张地图，而非一份排名。',
    },
    eyebrow: '对比',
    title: 'Deep Work Plan 与替代方案',
    intro:
      '根据你的处境选择合适的层。每个替代方案都按其自身定位来描述，每项事实都可追溯到其官方文档，页面也标明最近一次复核的时间。这是一张地图，不是一份排名。',
    howToRead: {
      title: '如何阅读本页',
      body: '三个取值描述每项能力。它们说明的是一项能力位于工具中的何处，而不是工具的好坏。',
      values: {
        builtIn: '内置',
        optional: '可选或通过扩展',
        notInScope: '不在范围内',
      },
    },
    reviewedOnLabel: '最近复核',
    alternativesTitle: '替代方案，按各自定位呈现',
    officialSiteLabel: '官方网站',
    categories: {
      methodology: '方法论',
      sdd: '规范驱动开发工具',
      agentFramework: '代理工作流框架',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: '厂商原生计划模式',
    },
    matrix: {
      title: '能力矩阵',
      caption:
        '每项能力在各工具中的所在。内置、可选或通过扩展，或不在范围内。依据官方文档复核。',
      capabilityColumn: '能力',
    },
    capabilities: {
      toolAgnostic: {
        label: '与任何编码代理协同工作',
        help: '同一份仓库文件驱动 Claude Code、Codex、Cursor、Gemini CLI 及其他代理。',
      },
      repoNativeHarness: {
        label: '把代理 harness 写入仓库',
        help: '指令、文档、技能与命令都存放在仓库中，而非某个工具的设置里。',
      },
      taskAcceptanceCriteria: {
        label: '逐任务的验收标准',
        help: '每项任务都写明可观察的完成条件。',
      },
      perTaskGates: {
        label: '逐任务的验证关卡',
        help: '每项任务都点明必须通过的命令，并从其触及的内容中选择。',
      },
      resumableState: {
        label: '磁盘上可恢复的状态',
        help: '进展在会话重置后依然存续，可由另一个代理或一位队友接手。',
      },
      finalReview: {
        label: '带安全审查环节的强制收尾审查',
        help: '未经对完整变更集的安全审查与对最终状态的验证，计划无法完成。',
      },
      conformanceChecker: {
        label: '可执行的符合性检查器',
        help: '一个脚本依据标准核验仓库及其计划，并提供对 CI 友好的退出码。',
      },
      instructionBudgetLedger: {
        label: '公开的指令加载测量',
        help: '每个流程加载的字节数由随仓库提交的脚本测量，并连同其上限一同发布。',
      },
      onboardingScaffold: {
        label: '搭建文档骨架的接入',
        help: '首次运行即写出仓库面向代理的文档与套件。',
      },
      brownfieldSpecs: {
        label: '面向存量系统的活规范',
        help: '变更以增量形式规范，并合并进一份不断生长的系统规范。',
      },
      crossProjectMemory: {
        label: '跨项目的持久代理记忆',
        help: '记忆跟随代理跨越不同的仓库和会话，而不仅仅是单个计划的磁盘状态。',
      },
      roleBasedAgents: {
        label: '职责分明的专业代理角色',
        help: '分析师、架构师、审查者等具名角色分担工作，而不是由一个代理执行每一步。',
      },
      nativeIdeProduct: {
        label: '本身即为一款 IDE 或编辑器',
        help: '该工具本身就是一个集成开发环境，而不是现有编码代理的附加组件。',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          '以技能形式安装，把仓库接入为代理 harness（运行支架），并以逐任务验证关卡、磁盘上的状态与强制的 Final Review 运行长程计划。',
        audience:
          '把跨会话工作交给任意编码代理、并需要工作带着验证完成的开发者与团队。',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          '通过一部宪章、一份规范、一份计划和一份任务清单，把一个功能转变为可执行的规范，由与五十余个编码代理集成的斜杠命令驱动，并能在开始实现前检查各产出物之间是否保持一致。',
        audience:
          '希望在自己已在使用的代理内部获得可复用的“规范、计划、任务、实现”工作流的团队。',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          '把每次变更捕捉为一份提案，带增量规范（新增、修改、移除）与含场景的 RFC 2119 需求，随后将它们归档为不断生长的活规范，并配有验证器在变更被接受前检查提案完整性与场景覆盖度。',
        audience: '在存量系统上工作、希望规范随每次变更逐步生长的团队。',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          '一款代理式 IDE 与 CLI，其规范从 EARS 风格需求推进到设计再到任务，并带有在编辑器事件上运行的引导文件与钩子，还能为已有代码库生成规范，在设计开始前发现需求缺口。',
        audience:
          '希望规范驱动开发内置于编辑器、并配有 AWS 支撑工具链的开发者。',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          '一套由专业化代理角色（分析、产品、架构、开发、质量）组成的敏捷框架，产出简报、需求、架构文档与故事文件，其完成定义要求每个故事在被视为完成前必须经过队友或 AI 同行评审代理的审查。',
        audience: '偏好角色化仪式、并希望代理工作拥有完整敏捷生命周期的团队。',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          '一套技能库与工作流，用于头脑风暴、以测试先行的小步骤规划、用子代理执行，并在完成前审查，其支持的编码代理宿主数量超过本页任何其他方案，并对每个任务执行两阶段子代理审查（先检查是否符合规范，再检查代码质量）。',
        audience: '希望在编码代理内部获得纪律化测试驱动执行的开发者。',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          '一套计划系统，带有 .planning 目录、需求编号、阶段计划、全新上下文执行，以及针对从每份计划摘要中提取的、用户可观察交付物的验证环节；它专为对抗“上下文腐化”而设计——在一次性子代理中运行调研、规划与执行，并通过内容指纹检查发现已过时的验证结果。',
        audience:
          '想要上下文工程与验证、又不想有太多仪式的独立开发者与小团队。',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          '为你已经在使用的编码代理配置持久记忆（同时可跨会话、跨模型进行路由）、精选技能、MCP 服务器、人设，以及可选的 Spec-Driven Development 或 Receipt-Driven Development。其配置默认写入代理的全局设置；按工作区范围安装则是可选项。',
        audience:
          '面向希望拥有一个能跨会话记住工作、并可按需生成证据的已配置代理生态系统的开发者。',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          '一个从 Plan、Design 到 Build、Test、Deploy、Maintain 的六阶段循环，每个阶段都设有人工批准关卡，各阶段之间把持久产出物提交到仓库，在部署前设有专门的安全审查环节，并通过持续评估发布领先与滞后的交付指标。',
        audience:
          '面向正在评估 Claude Code 端到端软件交付手册及其生产反馈循环的团队。',
      },
      'vendor-native': {
        name: '厂商原生计划模式',
        whatItDoesWell:
          '代理产品可能提供计划模式、指令文件与技能，它们建立在开放、跨厂商的 AGENTS.md 与 Agent Skills 标准之上，但计划模式的具体行为仍取决于厂商、客户端与版本。其中 Agent Skills 在启动时只加载简短摘要，仅在被激活时才加载完整指令，从而把未使用的能力留在上下文之外。',
        audience: '希望在单个代理内部获得规划能力、而无需采纳一套方法论的人。',
      },
    },
    aiNative: {
      title: '这如何契合 AI 原生 SDLC',
      body: 'Claude 的 AI-native SDLC 手册描述了一个完整循环：Plan、Design、Build、Test、Deploy 与 Maintain。每个阶段都会提交下一阶段要读取的产出物，每个阶段都设有人工批准关卡，部署前设有专门的安全审查环节，生产环境的反馈则会转化为新的 intent。',
      shared:
        'DWP 与之共享持久产出物与关卡式批准的理念：intent 变成计划，任务留下证据，完成前会运行一次安全审查，仓库对下一个代理始终保持可读。',
      boundary:
        '真正的区别在于范围而非严格程度：该手册是围绕 Claude Code 专门构建的，而 DWP 的执行框架与计划格式可被任何遵循 AGENTS.md 与 Agent Skills 标准的代理读取。该手册还涵盖了 DWP 并未声称具备的持续评估与生产运维，这些运维实践可以与由 DWP 驱动的仓库互补，而非彼此竞争。',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: '查看比较',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'Deep Work Plan 带来什么',
      items: [
        {
          title: '工具无关、仓库原生',
          body: 'harness（运行支架）与计划都是你仓库中的文件，任何遵循 AGENTS.md 与 Agent Skills 标准的代理都能读取。更换代理不会丢失计划。',
        },
        {
          title: '从每项任务触及的内容中选择的验证',
          body: '每项任务声明其触及面，并运行被改行为及其消费方的测试，当影响无法界定时，扩大到完整的测试套件。选出的测试数量为零永远不算通过。',
        },
        {
          title: '一次带安全审查环节的 Final Review',
          body: '计划以对累计变更集的安全审查收尾，其中包括对 diff 的必备本地审查，以及对最终状态的验证。critical 发现会阻止完成。',
        },
        {
          title: '跨会话、跨代理存续的状态',
          body: 'README 复选框、任务日志、有界的进行中索引与可机器读取的状态文件在每个边界写入，因此另一个会话或另一个代理都能从磁盘接续。即使计划创建被中断，也是可恢复的。',
        },
        {
          title: '针对仓库本身的符合性检查器',
          body: '一个只读脚本依据规范核验 harness 与每份计划，理解两种计划生命周期，并以对 CI 友好的退出码退出。',
        },
        {
          title: '指令加载的测量与发布',
          body: '一个随仓库提交的脚本测量每个流程加载多少字节；结果——包括增长——以字节数发布，从不用 token 或成本百分比表示。',
        },
      ],
    },
    honestLimits: {
      title: '诚实的局限',
      body: 'Deep Work Plan 没有活规范或增量规范机制；OpenSpec 及类似工具在那一面更强。该方法论尚无独立基准测试；一项预注册的公开评估已在计划之中。指令加载台账测量的是加载的字节数，而非 token、成本或结果。DWP 有意将范围限定在仓库之内：它不是跨项目记忆系统，不是基于角色的代理框架，也不是一款 IDE，因此它也不在这些维度上参与竞争——当工作确实需要这些能力时，请将它与覆盖该能力的工具搭配使用。',
    },
    correction: {
      title: '帮助我们保持准确',
      body: '本页在所示日期复核，并按请求更正。如果你所用工具的描述已过时或不完整，请提交一个 issue，我们会修正。',
      ctaLabel: '提交 issue',
    },
    sourcesTitle: '来源',
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
