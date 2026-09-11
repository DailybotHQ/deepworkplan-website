/**
 * th translations
 *
 * Scaffolded from en.ts — translate every string value in place.
 * Follow analysis_results/TRANSLATION_STYLE_GUIDE.md. Do NOT translate:
 * code, paths, command names, or the https://deepworkplan.com/init.md URL.
 */

import type { SiteTranslations } from './types';

export const th: SiteTranslations = {
  // Site metadata
  siteTitle: 'Deep Work Plan',
  siteTitleFull: 'Deep Work Plan — การทำงานอย่างมีโครงสร้างสำหรับ AI coding agent',
  siteDescription:
    'Deep Work Plan: ระเบียบวิธีแบบเปิดและชุดเครื่องมืออ้างอิงสำหรับการรัน AI agent หลายชั่วโมงอย่างมีโครงสร้าง ตรวจสอบได้ และดำเนินต่อได้',

  // Navigation
  nav: {
    home: 'หน้าแรก',
    about: 'เกี่ยวกับ',
    contact: 'ติดต่อ',
    // Deep Work Plan IA
    methodology: 'ระเบียบวิธี',
    spec: 'ข้อกำหนด',
    kit: 'ชุดเครื่องมือ',
    examples: 'ตัวอย่าง',
    init: 'เริ่มต้น',
    quickstart: 'เริ่มใช้งานเร็ว',
    trust: 'ความน่าเชื่อถือ',
    developers: 'นักพัฒนา',
    privacy: 'ความเป็นส่วนตัว',
    github: 'GitHub',
    faq: 'คำถามที่พบบ่อย',
    compare: 'เปรียบเทียบ',
    changelog: 'Changelog',
    resources: 'ทรัพยากร',
    resourcesDesc: 'ตัวอย่าง ความน่าเชื่อถือ คำถามที่พบบ่อย และการเปรียบเทียบ',
    repo: {
      label: 'ซอร์สโค้ด',
      website: 'ที่เก็บโค้ดเว็บไซต์',
      websiteDesc: 'เว็บไซต์นี้',
      skill: 'ที่เก็บโค้ดสกิล',
      skillDesc: 'สกิลที่ติดตั้งได้',
    },
    menu: 'เปิดเมนู',
    closeMenu: 'ปิดเมนู',
  },

  // Footer
  changelogPage: {
    meta: {
      title: 'บันทึกการเปลี่ยนแปลง Deep Work Plan',
      description:
        'การอัปเดตสำคัญของสกิล ระเบียบวิธี และ harness สำหรับเอเจนต์แบบพกพาของ Deep Work Plan',
    },
    eyebrow: 'บันทึกการเปลี่ยนแปลง',
    title: 'งานเบื้องหลังระเบียบวิธี',
    intro:
      'ไทม์ไลน์ที่มีแหล่งอ้างอิงของรุ่นและการตัดสินใจด้านการออกแบบ ซึ่งทำให้ Deep Work Plan เชื่อถือได้สำหรับงานเอเจนต์ระยะยาว',
    viewDetail: 'อ่านการอัปเดต',
    backToIndex: 'การอัปเดตทั้งหมด',
    sourceLabel: 'แหล่งที่มา',
    featuredLabel: 'รุ่นเด่น',
    relatedTitle: 'การอัปเดตที่เกี่ยวข้อง',
  },

  // Footer
  footer: {
    copyright: 'Deep Work Plan',
    allRightsReserved: 'สงวนลิขสิทธิ์',
    poweredBy: 'ขับเคลื่อนโดย',
  },

  // Temporary Product Hunt launch announcement bar
  announcementBar: {
    badge: 'ใหม่ · ประหยัดโทเคน',
    text: 'Deep Work Plan เปิดตัวบน Product Hunt วันนี้',
    tagline: 'มอบแผนให้เอเจนต์ของคุณ',
    linkText: 'โหวตเลย',
  },

  // Agent-friendly Markdown navigation
  agentNav: {
    heading: 'การนำทางในเว็บไซต์',
    sections: {
      methodology: 'ระเบียบวิธี',
      getStarted: 'เริ่มต้นใช้งาน',
      project: 'โครงการ',
      connect: 'ติดต่อ',
      learn: 'เรียนรู้เพิ่มเติม',
    },
  },

  // Deep Work Plan homepage
  home: {
    meta: {
      title: 'Deep Work Plan — การทำงานอย่างมีโครงสร้างสำหรับ AI coding agent',
      description:
        'บริบทสำคัญกว่าโมเดล Deep Work Plan เปลี่ยน repository ใดก็ได้ให้เป็นสภาพแวดล้อมที่มีโครงสร้าง ที่ coding agent ใดก็สามารถทำงานระยะยาวจนเสร็จได้',
    },
    hero: {
      badge: 'ระเบียบวิธีแบบเปิด · MIT · ไม่ผูกกับ agent ใด',
      title: 'โมเดลสำคัญ',
      titleEmphasis: 'บริบทสำคัญกว่า',
      subtitle:
        'Deep Work Plan เปลี่ยนทุก repository ให้เป็นสภาพแวดล้อมที่มีโครงสร้าง — บริบท ราวกันตก และแผนงานที่ยั่งยืน — ซึ่งเอเจนต์เขียนโค้ดใดก็ทำงานได้อย่างแม่นยำและมีประสิทธิภาพ และลงมือกับงานระยะยาวจนสำเร็จ',
      instructionLabel: 'คัดลอกไปยัง agent ของคุณ',
      instruction:
        'คัดลอก prompt ของ init.md และวางลงใน coding agent ของคุณ — Claude Code, Cursor, Codex หรืออื่น ๆ — เพื่อทำให้ repository ใดก็ได้เป็น AI-first',
      copyLabel: 'คัดลอก init.md',
      copiedLabel: 'คัดลอกแล้ว',
      viewInitCta: 'ดูพรอมต์ /init ฉบับเต็ม',
      pullQuote:
        'Deep Work Plan คือ spec-driven development ที่ตัว repository เองกลายเป็น harness',
      primaryCta: 'อ่านระเบียบวิธี',
      secondaryCta: 'อ่านข้อกำหนด',
      illustrationAlt:
        'ภาพแกะสลักประภาคารบนชายฝั่งหินที่ฉายลำแสงเดียวนำทางเรือลำเล็ก สื่อถึง repository ที่เป็น harness อันมั่นคงซึ่งนำทาง agent ทุกตัว',
      scrollCta: 'ดูว่ามันทำงานอย่างไร',
    },
    pitch: {
      kicker: 'ปัญหาและคำตอบ',
      problem:
        'ในงานสั้น ๆ เอเจนต์เขียนโค้ดทำได้ดีมาก แต่เมื่อรับงานระยะยาว — การย้ายระบบ ซับซิสเต็มใหม่ การรีแฟกเตอร์หลายสิบไฟล์ — มันจะเบี่ยงเบน: คอนเท็กซ์เต็ม การตัดสินใจก่อนหน้าจางหาย และงานหลายชั่วโมงติดค้างกลางทาง',
      answer:
        'Deep Work Plan ตอบด้วยการพัฒนาแบบขับเคลื่อนด้วยสเปก: แผนงานที่คงอยู่ งานอะตอมมิก และประตูตรวจสอบที่เอเจนต์ต้องผ่าน “เสร็จ” ไม่ใช่ความรู้สึกอีกต่อไป — แต่กลายเป็นหลักฐานที่ตรวจสอบและรีวิวได้',
      efficiency:
        'และเพราะคอนเท็กซ์คือทรัพยากรที่หายากที่สุดของเอเจนต์ harness จึงถูกออกแบบมาเพื่อประสิทธิภาพของโทเคน: คำสั่งโหลดแบบขั้นเป็นขั้น การตรวจสอบแตะต้องเฉพาะสิ่งที่เปลี่ยน และแต่ละงานเรียนรู้ในที่ของมัน — งานยาว ๆ ยังคงจับต้องได้ แผนเองก็ปรับขนาดตามหลักการเดียวกัน: แผน Lite สำหรับการแก้ไขที่มีขอบเขตจำกัด แผน Full สำหรับงานที่ยาวนานหลายชั่วโมง — รูปแบบจะเป็นไปตามขอบเขตของงานเสมอ ไม่ใช่ในทางกลับกัน',
      illustrationAlt:
        'ภาพพิมพ์แกะสลักแบบสองส่วน: ด้านหนึ่งเรือลำหนึ่งลอยเคว้งในหมอกใกล้โขดหิน อีกด้านเป็นเรือลำเดียวกันที่มั่นคงบนเส้นทางที่วาดไว้มุ่งสู่ประภาคารของอ่าว',
    },
    story: {
      act1: {
        kicker: 'วิธีการ · องก์ที่ 1',
        lead: 'คุณคือผู้กำหนดว่า “เสร็จ” หมายความว่าอย่างไรและเส้นแบ่งอยู่ตรงไหน แผนงานจะส่งต่อเจตนาของคุณ ส่วนเอเจนต์ทำหน้าที่ลงมือชั่วโมงต่อชั่วโมง — ไม่ต้องคอยกำกับ ไม่ต้องคอยแก้ทุกยี่สิบนาที',
        deepLinkLabel: 'อ่านวิธีการ',
        deepLinkHref: '/methodology',
      },
      act2: {
        kicker: 'วิธีการ · องก์ที่ 2',
        lead: 'งานยาว ๆ เติมคอนเท็กซ์ของโมเดลใดก็ได้จนเต็ม รายละเอียดหายไปและเอเจนต์เริ่มหลงทาง แผนงานที่เขียนไว้ — งานอะตอมมิก ประตูตรวจสอบ สถานะที่กลับมาทำต่อได้ — คือจุดที่มันวนกลับมาในทุกรอบ',
        deepLinkLabel: 'ดูวงรอบหลัก',
        deepLinkHref: '/methodology',
      },
      act3: {
        kicker: 'วิธีการ · องก์ที่ 3',
        lead: 'ทุกงานระบุเกณฑ์การยอมรับและการตรวจสอบที่ต้องผ่าน เอเจนต์ “รู้สึกว่าเสร็จ” ไม่ได้ — ต้องผ่านเท่านั้น ไม่เช่นนั้นงานยังคงเปิดอยู่',
        deepLinkLabel: 'อ่านข้อกำหนด',
        deepLinkHref: '/spec',
      },
      act4: {
        kicker: 'วิธีการ · องก์ที่ 4',
        lead: 'บริบท เครื่องมือ ราวกันตก และสถานะ อยู่ในรีโพซิทอรีของคุณในรูปแบบไฟล์ธรรมดาที่เอเจนต์ใดก็อ่านได้ ไม่ผูกขาด ไม่มีสมองภายนอก — รอดจากการรีเซ็ตคอนเท็กซ์',
        deepLinkLabel: 'ดูว่า onboarding สร้างอะไร',
        deepLinkHref: '/quickstart',
      },
      act5: {
        kicker: 'วิธีการ · องก์ที่ 5',
        lead: 'คอนเท็กซ์คือทรัพยากรที่หายากที่สุดของเอเจนต์ harness โหลดแบบขั้นเป็นขั้น ตรวจสอบเฉพาะสิ่งที่เปลี่ยน และเรียนรู้รายงาน — แผนงานจ่ายค่าตัวเอง',
        deepLinkLabel: 'อ่านวิธีการ',
        deepLinkHref: '/methodology',
      },
    },
    onboarding: {
      badge: 'การเริ่มต้นบนพื้นฐานการให้เหตุผล',
      title: 'ชี้ไปที่ repository ใดก็ได้ มันให้เหตุผล ไม่ใช่คัดลอกวาง',
      subtitle:
        'กระบวนการเริ่มต้นจะตรวจสอบภาษา เฟรมเวิร์ก ตัวจัดการแพ็กเกจ และคำสั่งตรวจสอบจริงของ repository ของคุณ แล้วสร้างผลลัพธ์ที่ปรับให้เข้ากับ repository นั้น สตับทั่วไปแบบสำเร็จรูปถือเป็นความล้มเหลว',
      steps: [
        {
          title: 'ให้เหตุผลเกี่ยวกับสแตกและรูปแบบ (archetype) ของคุณ',
          description:
            'อ่าน manifest โครงสร้างโฟลเดอร์ และ CI เพื่ออนุมานคำสั่ง test, lint และ build จริง แล้วจำแนก repository ว่าเป็น repo เดี่ยวหรือ orchestrator hub',
        },
        {
          title: 'สร้าง AGENTS.md, docs/ และเอกสารแยกตามโมดูล',
          description:
            'AGENTS.md ที่ผ่านการให้เหตุผล โครงสร้าง docs/ ที่จัดหมวดหมู่ และ README พร้อม docs/ ในแต่ละโมดูลหลัก เต็มไปด้วยคำสั่งจริงของ repository คุณ ไม่ใช่ตัวยึดตำแหน่ง',
        },
        {
          title: 'วางโครง .agents/ พร้อมซิมลิงก์ .claude และ .cursor ไปยัง .agents',
          description:
            'ไดเรกทอรี .agents/ ที่ใช้ร่วมกันข้าม agent (สกิล agent คำสั่ง) และซิมลิงก์ .claude และ .cursor ไปยัง .agents โดยสะท้อน CLAUDE.md ไปยัง AGENTS.md เพื่อให้ทุกเครื่องมืออ่านแหล่งความจริงเดียวกัน',
        },
        {
          title: 'ติดตั้งสกิล DWP และวางโครง .dwp/',
          description:
            'เชื่อมต่อสกิล Deep Work Plan และสร้างโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้สำหรับเก็บแผน ติดตั้งการรีวิวในเครื่องที่จำเป็นของ AI Diff Reviewer จากนั้นเลือกเสริม addon แบบสมัครใจ เช่น การรองรับ devcontainer',
        },
      ],
    },
    quickstart: {
      badge: 'สิ่งที่เกิดขึ้นเมื่อคุณรัน',
      title: 'คำสั่งเดียว ที่เหลือ repository จัดการเอง',
      subtitle:
        'คุณไม่ต้องเลือกวิธีติดตั้งหรือคัดลอกเทมเพลต เพียงมอบหนึ่งบรรทัดให้ agent มันจะติดตั้งสกิล ซึ่งเป็นกลไกที่นำกลับมาใช้ซ้ำได้ แล้วปรับ repository ของคุณให้เข้ากับมัน',
      steps: [
        {
          title: 'agent ของคุณเปิด /init.md',
          description:
            'มันอ่านพรอมต์เริ่มต้นที่ deepworkplan.com/init.md พร้อมระเบียบวิธี ข้อกำหนด และชุดเครื่องมือที่ลิงก์ไว้ ซึ่งคือมาตรฐานที่มันกำลังจะนำมาใช้',
        },
        {
          title: 'มันติดตั้งสกิล Deep Work Plan',
          description:
            'สกิลคือกลไก เหมือนกันในทุก repository คำสั่งเดียวจะดึงเราเตอร์และสกิลย่อย (create, execute, refine, resume, status, verify, onboard, author) เข้ามาสำหรับ Claude Code, Cursor, Codex, Gemini และ Copilot',
        },
        {
          title: 'มันปรับ repository ของคุณ',
          description:
            'ด้วยการให้เหตุผลเกี่ยวกับสแตกจริงของคุณ ไม่ใช่การคัดลอกวาง มันเขียน AGENTS.md โครงสร้าง docs/ ที่จัดหมวดหมู่ README แยกตามโมดูล ชุด .agents/ ที่ผ่านการให้เหตุผล และ .dwp/ ที่ถูก gitignore ไว้ repository ของคุณกลายเป็น harness',
        },
        {
          title: 'คุณวางแผนและลงมือทำ',
          description:
            'สร้าง Deep Work Plan ระยะยาวสำหรับงานใดก็ได้ แล้วรันทีละขั้น พร้อมเกณฑ์การยอมรับ validation gate และสถานะที่ทำต่อได้ อย่างอิสระต่อเนื่องนานหลายชั่วโมง',
        },
      ],
      note: 'สกิลถูกติดตั้งเหมือนกันทุกที่ สิ่งที่ถูกปรับคือ repository ของคุณ ทั้ง AGENTS.md เอกสาร และชุด .agents/ ที่ผ่านการให้เหตุผลซึ่งสร้างขึ้นสำหรับสแตกของคุณ การแยกส่วนนี้เองที่ทำให้ระเบียบวิธีเป็นมาตรฐานที่นำกลับมาใช้ซ้ำได้ ไม่ใช่โครงสร้างแบบครั้งเดียวจบ',
    },
    outcomes: {
      badge: 'สิ่งที่คุณได้รับ',
      title: 'ทุกอย่างที่ agent ของคุณต้องใช้ในการทำงานอย่างอิสระ',
      subtitle:
        'รันครั้งเดียว คอมมิตแบบ atomic ผลลัพธ์ทุกอย่างเป็น Markdown และทุกการเปลี่ยนแปลงตรวจสอบย้อนหลังได้',
      items: [
        {
          label: 'AGENTS.md ที่รากของ repository',
          detail:
            'ให้เหตุผลจากสแตก คำสั่ง และโครงสร้างจริงของ repository คุณ ไม่ใช่เทมเพลตที่มีตัวยึดตำแหน่ง CLAUDE.md ถูกซิมลิงก์ไปยัง AGENTS.md',
        },
        {
          label: 'docs/ ที่จัดหมวดหมู่และเอกสารแยกตามโมดูล',
          detail:
            'สถาปัตยกรรม การติดตั้ง มาตรฐาน และการแก้ปัญหา พร้อม README และ docs/ ในแต่ละโมดูลหลัก สร้างจากโค้ดเบสของคุณ',
        },
        {
          label: '.agents/ พร้อมซิมลิงก์ .claude และ .cursor ไปยัง .agents',
          detail:
            'ไดเรกทอรี .agents/ ที่ใช้ร่วมกันข้าม agent (สกิล agent คำสั่ง) พร้อมซิมลิงก์ .claude และ .cursor ไปยัง .agents เพื่อให้ทุกเครื่องมืออ่านแหล่งความจริงเดียวกัน',
        },
        {
          label: 'สกิล Deep Work Plan ที่ติดตั้งแล้ว',
          detail:
            'create, execute, refine, resume, status, verify, onboard และ author มอบให้ agent ของคุณในรูปแบบชุดสกิลเดียว โดยไม่ต้องคัดลอกแยกตาม repository',
        },
        {
          label: 'ความสอดคล้องที่คุณตรวจสอบได้',
          detail:
            '/dwp-verify สร้างรายงานผ่าน/ไม่ผ่านอย่างเป็นกลางเทียบกับข้อกำหนด ดังนั้น "AI-first" จึงถูกตรวจสอบ ไม่ใช่แค่กล่าวอ้าง และตรวจสอบซ้ำได้หลังทุกแผนงาน',
        },
        {
          label: 'รองรับสองรูปแบบ (archetype)',
          detail:
            'การเริ่มต้นจะจำแนก repository ของคุณว่าเป็น repo เดี่ยว (กรณีทั่วไป) หรือ orchestrator hub ที่ประสานแผนงานลูกข้าม repository หลายแห่ง',
        },
        {
          label: 'ชุดเครื่องมือที่มีชีวิตและเติบโตไปกับ repository',
          detail:
            'สกิลย่อย author (skill-create, agent-create) ช่วยให้ repository พัฒนาสกิล agent และคำสั่งของตัวเอง ส่วน addon บำรุงรักษาแบบสมัครใจ เช่น dependency-upgrade ช่วยให้มันอัปเดตตัวเองอยู่เสมอ',
        },
        {
          label: 'อิงกับ git ทำต่อได้ ผ่าน .dwp/',
          detail:
            'ไม่มี daemon และไม่มีสถานะภายนอก แผนถูกเก็บในโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้ และทุกงานกลับมาทำต่อได้จาก git เพียงอย่างเดียว แม้หลังจากบริบทล้น',
        },
      ],
    },
    agents: {
      badge: 'Agent',
      title: 'ทำงานร่วมกับ agent ที่คุณใช้อยู่แล้ว',
      subtitle:
        'ระเบียบวิธีเดียว อะแดปเตอร์หลากหลาย Markdown ไม่ผูกเฟรมเวิร์กไว้กับสิ่งใด agent ทุกตัวที่อ่าน Markdown ได้สามารถรัน Deep Work Plan ได้',
      fullLabel: 'เต็มรูปแบบ',
      partialLabel: 'บางส่วน',
      viewAllCta: 'ดูเอเจนต์ทั้งหมด',
      items: [
        {
          name: 'Claude Code',
          support: 'full',
          note: 'การนำไปใช้แบบอ้างอิง พร้อม WebFetch และ slash command ในตัว',
        },
        {
          name: 'Cursor',
          support: 'full',
          note: 'อะแดปเตอร์เต็มรูปแบบ ใช้บันเดิลออฟไลน์หาก WebFetch ถูกจำกัด',
        },
        {
          name: 'OpenAI Codex',
          support: 'full',
          note: 'แนะนำบันเดิลออฟไลน์ ติดตั้งกฎไว้ใต้ .codex/',
        },
        {
          name: 'GitHub Copilot',
          support: 'full',
          note: 'อะแดปเตอร์เต็มรูปแบบ คำสั่ง dwp-* รันผ่าน AGENTS.md และขั้นตอน #',
        },
        {
          name: 'Gemini',
          support: 'full',
          note: 'ต้องใช้ Gemini 2.5 Pro ขึ้นไป พร้อม WebFetch ในตัว',
        },
        {
          name: 'OpenCode',
          support: 'full',
          note: 'โอเพนซอร์ส อ่าน AGENTS.md โดยตรงและรัน dwp-* ผ่านคำสั่ง #',
        },
        {
          name: 'Windsurf',
          support: 'full',
          note: 'กฎและขั้นตอนคำสั่ง # ขับเคลื่อนลูป Deep Work Plan ทั้งหมด',
        },
        {
          name: 'Cline',
          support: 'full',
          note: 'โอเพนซอร์ส กฎ Markdown และคำสั่ง # รันทุกขั้นตอน dwp-*',
        },
        {
          name: 'Antigravity',
          support: 'full',
          note: 'อะแดปเตอร์เต็มรูปแบบพร้อมพื้นผิวคำสั่งในตัว',
        },
      ],
    },
    stacks: {
      badge: 'สแตก',
      title: 'พรีเซ็ตการให้เหตุผลสำหรับสแตกที่สำคัญ',
      viewAllCta: 'ดูพรีเซ็ตทั้งหมด',
      subtitle:
        'สิ่งเหล่านี้เป็นตัวช่วยให้เหตุผล ไม่ใช่เทมเพลต การเริ่มต้นจะอ่าน manifest จริงของ repository คุณและปรับตามแต่ละสแตก ไม่เคยคัดลอกพรีเซ็ตแบบตาบอด โมโนรีโปจะได้เอกสารแยกตามโมดูล',
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
        { name: 'Generic', sub: 'สแตกใดก็ได้' },
      ],
    },
    archetypes: {
      badge: 'สองรูปแบบ',
      title: 'repository เดี่ยว หรือ orchestrator hub',
      subtitle:
        'การเริ่มต้นจะแยกทางตามรูปแบบ repository ส่วนใหญ่เป็น repo เดี่ยว ส่วน hub จะประสาน Deep Work Plan ลูกข้าม repository หลายแห่ง ระเบียบวิธีรองรับทั้งสองแบบอย่างเต็มที่',
      individual: {
        tag: 'กรณีทั่วไป',
        title: 'repository เดี่ยว',
        description:
          'โค้ดเบสเดียวที่มีสแตกหลักหนึ่งสแตก คำสั่งตรวจสอบของตัวเอง และเอกสารแยกตามโมดูล เป็นค่าเริ่มต้น การเริ่มต้นจะถือว่าเป็นแบบนี้ เว้นแต่ repository นั้นเป็น hub อย่างชัดเจน',
        example: 'ตัวอย่างเช่น Django API แอป Vue หรือบริการ TypeScript Lambda',
      },
      orchestrator: {
        tag: 'การประสานงาน',
        title: 'orchestrator hub',
        description:
          'repository สำหรับประสานงานที่จัดการงานข้าม sub-repository ผ่าน orchestrator manifest โดยแตกแผนงานลูกที่ต่างคอมมิตใน repository ของตัวเอง พร้อมกฎขอบเขตและดัชนีการนำทาง',
        example: 'ตัวอย่างเช่น hub ที่ประสานงาน repository ผลิตภัณฑ์ห้าแห่ง',
      },
    },
    comparison: {
      badge: 'ระเบียบวิธี เทียบกับ เครื่องมือ',
      title: 'คนละชั้น เสริมกัน ไม่ใช่แข่งกัน',
      subtitle:
        'Deep Work Plan ไม่ใช่ตัวสร้างโครงอีกตัวหนึ่ง แต่เป็นชั้นระเบียบวิธีที่อยู่ใต้เครื่องมือ spec-driven หรือเครื่องมือสร้างโครงใดก็ได้ โดยมุ่งเน้นการรันอย่างอิสระหลายชั่วโมง',
      colDwp: 'Deep Work Plan',
      colOthers: 'เครื่องมือสร้างโครง / เครื่องมือ spec',
      rows: [
        {
          label: 'จุดมุ่งเน้นหลัก',
          dwp: 'การทำงานอย่างอิสระหลายชั่วโมง',
          others: 'การสร้าง spec หรือสร้างโครง',
        },
        {
          label: 'หน่วยของงาน',
          dwp: 'หนึ่ง Deep Work Plan (เซสชันที่ทำต่อได้)',
          others: 'เอกสาร spec หรือโครงสร้าง',
        },
        {
          label: 'แบบจำลองสถานะ',
          dwp: 'โฟลเดอร์ .dwp/ ที่อิงกับ git ทำต่อได้',
          others: 'มักอยู่ภายนอกหรือใน IDE',
        },
        {
          label: 'การผูกกับ agent',
          dwp: 'ไม่ผูกกับ agent ใด (Markdown และ Bash)',
          others: 'มักเจาะจงเครื่องมือหรือ IDE',
        },
        {
          label: 'การกู้คืนบริบท',
          dwp: 'ทำต่อได้หลังบริบทล้น',
          others: 'โดยทั่วไปเริ่มงานใหม่',
        },
        {
          label: 'สัญญาอนุญาต',
          dwp: 'MIT ระเบียบวิธีและชุดเครื่องมือแบบเปิด',
          others: 'แตกต่างกันไป',
        },
      ],
    },
    origin: {
      badge: 'ที่มา',
      quote:
        'สร้างโดย Dailybot บริษัทเบื้องหลังระบบ standup แบบอะซิงโครนัสสำหรับทีมกระจายตัว ภายในองค์กรเราใช้ Deep Work Plan เพื่อทำให้ repository production ที่ครอบคลุม Django, Vue, TypeScript Lambda และ Astro ขับเคลื่อนด้วย agent ได้ หลังจากใช้งานจริงนานหลายเดือน เราจึงเปิดซอร์สระเบียบวิธีนี้ภายใต้สัญญาอนุญาต MIT',
      attribution: 'ทีมวิศวกรรมของ Dailybot',
      dailybotCta: 'เรียนรู้เกี่ยวกับ Dailybot',
    },
    finalCta: {
      badge: 'ทำให้ repository ของคุณเป็น AI-first',
      title: 'มอบงานเชิงลึกให้ agent ของคุณ',
      subtitle:
        'มอบหนึ่งบรรทัดให้ agent ของคุณ ชี้ไปที่ /init.md แล้วมันจะทำให้ repository ของคุณเป็น AI-first ทั้งติดตั้งสกิล ให้เหตุผลเกี่ยวกับสแตกของคุณ และคอมมิตลำดับชั้น AGENTS.md ที่สมบูรณ์ จากนั้นคุณสร้างและรัน Deep Work Plan ที่ทำงานอย่างอิสระนานหลายชั่วโมง',
      primaryCta: 'เปิดพรอมต์ /init',
      secondaryCta: 'อ่านระเบียบวิธี',
      tertiaryCta: 'สำหรับ agent และนักพัฒนา',
      meta: 'อยู่ภายใต้สัญญาอนุญาต MIT · ไม่มีการเก็บข้อมูลการใช้งาน · ผลลัพธ์ออกไปยังโฟลเดอร์ .dwp/ ที่ถูก gitignore ไว้',
    },
  },
  // Contact section (homepage)
  contact: {
    title: 'ติดต่อ',
    nameLabel: 'ชื่อ',
    namePlaceholder: 'ชื่อของคุณ',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'ข้อความ',
    messagePlaceholder: 'เขียนข้อความของคุณ...',
    sendButton: 'ส่งข้อความ',
  },

  // About page
  aboutPage: {
    title: 'เกี่ยวกับระเบียบวิธี',
    subtitle: 'ระเบียบวิธีแบบเปิด · ภายใต้สัญญาอนุญาต MIT',
    description:
      'Deep Work Plan คือระเบียบวิธีแบบเปิดที่ไม่ผูกกับเฟรมเวิร์กใด สำหรับงานวิศวกรรมจริงจังร่วมกับ AI coding agent ที่มาที่ไปและผู้ดูแลรักษามันคือใคร',
    heroDescription:
      'โครงสร้างที่ทำซ้ำได้สำหรับการวางแผน ลงมือทำ และตรวจสอบงานเชิงลึกร่วมกับ AI coding agent สร้างขึ้นอย่างเปิดเผยและใช้งานได้ฟรี',
    bioTitle: 'มันคืออะไร',
    bioText:
      'Deep Work Plan (DWP) เป็นระเบียบวิธี ไม่ใช่ผลิตภัณฑ์ มันนิยามวิธีเปลี่ยนเป้าหมายให้เป็นแผนที่ตกลงร่วมกัน แบ่งแผนนั้นออกเป็นงานย่อยแบบ atomic ที่ตรวจสอบได้อย่างอิสระ และรันแต่ละงานในลูปที่มุ่งเน้น ซึ่งจบลงด้วยการตรวจสอบ<br /><br />มันถูกออกแบบให้ไม่ผูกกับ AI agent หรือสแตกใดที่คุณใช้โดยเจตนา อะแดปเตอร์จะแปลลูปหลักเดียวกันไปสู่ Claude, Cursor, Copilot, Codex, Gemini และอื่น ๆ แผน งาน และบันทึกการทำงานล้วนเป็น Markdown ธรรมดา งานจึงยังคงอ่านได้ ตรวจทานได้ และควบคุมเวอร์ชันได้',
    passionsTitle: 'หลักการสำคัญ',
    passions: [
      {
        title: 'วางแผนก่อนลงมือ',
        description: 'ยังไม่เขียนโค้ดจนกว่าจะตกลงแผนกันได้ แผนคือสัญญาระหว่างคุณกับ agent',
        icon: '\u{1F5FA}\uFE0F',
        link: '/methodology',
      },
      {
        title: 'งานเป็นแบบ atomic',
        description:
          'แต่ละงานถูกกำหนดขอบเขตให้ลงมือทำและตรวจสอบได้ด้วยตัวเอง แล้วคอมมิตแบบ atomic',
        icon: '\u{1F9E9}',
        link: '/spec',
      },
      {
        title:
          '\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e17\u0e38\u0e01\u0e2d\u0e22\u0e48\u0e32\u0e07',
        description:
          '\u0e17\u0e38\u0e01\u0e07\u0e32\u0e19\u0e08\u0e1a\u0e25\u0e07\u0e14\u0e49\u0e27\u0e22\u0e01\u0e32\u0e23\u0e15\u0e23\u0e27\u0e08\u0e2a\u0e2d\u0e1a\u0e17\u0e35\u0e48\u0e0a\u0e31\u0e14\u0e40\u0e08\u0e19\u0e01\u0e48\u0e2d\u0e19\u0e40\u0e23\u0e34\u0e48\u0e21\u0e07\u0e32\u0e19\u0e16\u0e31\u0e14\u0e44\u0e1b \u0e42\u0e14\u0e22\u0e1a\u0e31\u0e19\u0e17\u0e36\u0e01\u0e04\u0e27\u0e32\u0e21\u0e04\u0e37\u0e1a\u0e2b\u0e19\u0e49\u0e32\u0e44\u0e27\u0e49\u0e43\u0e19 git',
        icon: '\u2705',
        link: '/kit',
      },
    ],
    quickFactsTitle: 'โดยสรุป',
    quickFacts: [
      'ระเบียบวิธีแบบเปิด ภายใต้สัญญาอนุญาต MIT',
      'ไม่ผูกกับเฟรมเวิร์กและ agent ใด',
      'ดูแลรักษาโดย Dailybot และชุมชน',
      'ประกอบด้วยข้อกำหนด คำสั่ง อะแดปเตอร์ พรีเซ็ต และตัวอย่าง',
      'ใช้ Markdown เท่านั้น ไม่มี runtime ไม่ผูกขาด',
      'เปลี่ยน repository ใดก็ได้ให้เป็นโค้ดเบสแบบ AI-first ที่ขับเคลื่อนด้วย agent ได้',
    ],
    ctaTitle: 'ใครเป็นผู้ดูแลรักษา',
    ctaDescription:
      'Deep Work Plan เติบโตมาจากงานวิศวกรรมจริงที่ Dailybot และปัจจุบันดูแลรักษาโดย Dailybot ร่วมกับชุมชนโอเพนซอร์ส ระเบียบวิธี ข้อกำหนด และชุดเครื่องมือเผยแพร่ภายใต้สัญญาอนุญาต MIT ใช้งาน ดัดแปลง และต่อยอดได้ฟรี',
    ctaCv: 'อ่านระเบียบวิธี',
    ctaContact: 'เริ่มใช้งานเร็ว',
  },

  // Contact page
  contactPage: {
    title: 'ชุมชนและการติดต่อ',
    subtitle: 'โอเพนซอร์ส · ขับเคลื่อนโดยชุมชน',
    description:
      'Deep Work Plan สร้างขึ้นอย่างเปิดเผย ค้นหาซอร์สโค้ด เปิด issue หรือร่วมพูดคุยผ่านช่องทางด้านล่าง ยินดีต้อนรับการมีส่วนร่วม',
    heroDescription:
      'มีคำถาม ไอเดีย หรือข้อเสนอแนะ Deep Work Plan พัฒนาอย่างเปิดเผยต่อสาธารณะ นี่คือช่องทางติดต่อโครงการและผู้ดูแลรักษา',
    formTitle: 'ส่งข้อความ',
    nameLabel: 'ชื่อ',
    namePlaceholder: 'ชื่อของคุณ',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'your@email.com',
    reasonLabel: 'ฉันต้องการติดต่อเรื่อง',
    reasonOptions: [
      { value: '', label: '— เลือกหัวข้อ —' },
      { value: 'general', label: 'ทั่วไป / แค่ทักทาย' },
      { value: 'tech-talk', label: 'Tech talk / คำเชิญบรรยาย' },
      { value: 'collaboration', label: 'ความร่วมมือ / เป็นพันธมิตร' },
      { value: 'project', label: 'โครงการ / สอบถามงาน' },
      { value: 'dailybot', label: 'คำถามเกี่ยวกับ Dailybot' },
      { value: 'trading', label: 'คำถามเกี่ยวกับการเทรดของฉัน' },
      {
        value: 'the-library-of-tomorrow',
        label: 'เข้าร่วม The Library of Tomorrow',
      },
      { value: 'other', label: 'อื่น ๆ' },
    ],
    subjectLabel: 'หัวเรื่อง',
    subjectPlaceholder: 'เรื่องเกี่ยวกับอะไร',
    messageLabel: 'ข้อความ',
    messagePlaceholder: 'เขียนข้อความของคุณ...',
    sendButton: 'ส่งข้อความ',
    sendingButton: 'กำลังส่ง...',
    successTitle: 'ส่งข้อความแล้ว',
    successMessage: 'ขอบคุณที่ติดต่อมา เราจะตอบกลับโดยเร็วที่สุด',
    sendAnotherButton: 'ส่งข้อความอีกครั้ง',
    requiredField: 'จำเป็นต้องกรอกช่องนี้',
    invalidEmail: 'กรุณากรอกที่อยู่อีเมลที่ถูกต้อง',
    fallbackMessage: 'ขณะนี้แบบฟอร์มติดต่อใช้งานไม่ได้ คุณสามารถติดต่อเราโดยตรงทางอีเมล',
    fallbackEmailText: 'ส่งอีเมลถึงเราได้ที่',
    formNote: 'เราจะตอบกลับโดยเร็วที่สุด',
    socialTitle: 'ติดต่อกับเรา',
    locationTitle: 'ที่ตั้ง',
    locationText: 'ตั้งอยู่ในโคลอมเบีย เปิดรับความร่วมมือทางไกลทั่วโลก',
    prefillSubjects: {
      generalInquiry: 'สอบถามทั่วไป',
      collaboration: 'โอกาสความร่วมมือ',
      projectInquiry: 'สอบถามโครงการหรืองาน',
      projectCollaboration: 'สอบถามความร่วมมือในโครงการ',
      startupCollaboration: 'โอกาสความร่วมมือกับสตาร์ทอัพ',
      techTalkInvitation: 'คำเชิญบรรยาย Tech Talk',
      tradingQuestion: 'คำถามเรื่องการเทรด',
      dailybotQuestion: 'คำถามเกี่ยวกับ Dailybot',
    },
  },

  contactSection: {
    title: 'มาเชื่อมต่อกัน',
    description:
      'เราเปิดรับบทสนทนาที่น่าสนใจ โอกาสความร่วมมือ และไอเดียใหม่ ๆ เสมอ ไม่ว่าคุณจะอยากคุยเรื่องเทคโนโลยี การเป็นผู้ประกอบการ หรือแค่ทักทาย',
    ctaText: 'ติดต่อเรา',
    ctaLink: '/contact?topic=general&subject=General%20Inquiry',
  },

  // Date formatting
  dateLocale: 'en-US',

  // 404 page
  notFoundPage: {
    title: 'ไม่พบหน้านี้',
    description:
      'หน้าที่คุณกำลังค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว สำรวจระเบียบวิธีหรือกลับไปยังหน้าแรกเพื่อเรียกดูต่อ',
    heading: 'ไม่พบหน้านี้',
    message:
      'ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่หรืออาจถูกย้ายไปแล้ว ลองกลับไปยังหน้าแรกหรือสำรวจระเบียบวิธี',
    backHome: 'กลับสู่หน้าแรก',
    exploreMethodology: 'อ่านระเบียบวิธี',
    agentTitle: 'สำหรับ AI agent',
    agentIntro:
      'เส้นทางนี้ไม่มีอยู่ ลิงก์กู้คืนด้านล่าง (พร้อมคู่เทียบที่อ่านได้ด้วยเครื่อง) ระบุทุกหน้าของเว็บไซต์นี้',
  },

  // Deep Work Plan — Methodology index + chapter reader
  methodologyPage: {
    meta: {
      title: 'ระเบียบวิธี Deep Work Plan',
      description:
        'ห้าบทตั้งแต่แถลงการณ์ไปจนถึงรูปแบบงาน ครอบคลุมหลักการ ลูปหลัก เทมเพลต สกิลและ agent รวมถึงการปรับแต่งที่อยู่เบื้องหลัง Deep Work Plan',
    },
    eyebrow: 'ระเบียบวิธี',
    title: 'ระเบียบวิธี Deep Work Plan',
    intro:
      'ห้าบทที่พาคุณจากปรัชญาเบื้องหลัง Deep Work Plan ไปสู่ลูปการทำงานจริง เทมเพลต และการปรับแต่งที่คุณใช้ทุกวัน',
    chapterLabel: 'บท',
    readChapter: 'อ่านบทนี้',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'ทุกบท',
  },

  // Deep Work Plan — Spec index + reader
  specPage: {
    meta: {
      title: 'ข้อกำหนด Deep Work Plan',
      description:
        'ข้อกำหนดที่อ่านได้ของระเบียบวิธี Deep Work Plan ครอบคลุมรูปแบบ DWP โปรโตคอลของ agent รูปแบบงาน มาตรฐานเอกสาร และส่วนเสริม',
    },
    eyebrow: 'ข้อกำหนด',
    title: 'ข้อกำหนด',
    intro:
      'ข้อกำหนดของระเบียบวิธีที่แม่นยำและอ่านได้ ทั้งโครงสร้างและโปรโตคอลที่มนุษย์และ agent ใช้ร่วมกัน',
    tocTitle: 'ในหน้านี้',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'เอกสารข้อกำหนดทั้งหมด',
  },

  // Deep Work Plan — Kit index + detail
  kitPage: {
    meta: {
      title: 'ชุดเครื่องมือ Deep Work Plan',
      description:
        'สกิลและสกิลย่อยทั้งแปด คำสั่ง อะแดปเตอร์ พรีเซ็ต ส่วนเสริมแบบสมัครใจ และตัวอย่างที่ทำให้ Deep Work Plan รันได้ข้าม agent และสแตก',
    },
    eyebrow: 'ชุดเครื่องมือ',
    title: 'ชุดเครื่องมือ',
    intro:
      'ทุกสิ่งที่คุณต้องใช้ในการรันระเบียบวิธี ทั้งสกิลและสกิลย่อย slash command อะแดปเตอร์สำหรับ agent พรีเซ็ตการเริ่มต้น การรีวิวในเครื่องที่จำเป็นและ addon แบบสมัครใจ และตัวอย่างที่ลงมือทำจริง',
    groups: {
      command: {
        title: 'สกิลย่อยและคำสั่ง',
        description:
          'เราเตอร์ของสกิลและสกิลย่อย (create, execute, refine, resume, status, verify, onboard, author) พร้อม slash command บาง ๆ ที่มอบหมายงานต่อให้พวกมัน',
      },
      adapter: {
        title: 'อะแดปเตอร์',
        description:
          'การเชื่อมต่อบาง ๆ แยกตาม agent สำหรับ Claude, Cursor, Codex และอื่น ๆ',
      },
      preset: {
        title: 'พรีเซ็ตการเริ่มต้น',
        description:
          'แนวทางการให้เหตุผลแยกตามสแตกที่กระบวนการ onboard ใช้เพื่อปรับเอกสาร สกิล และคำสั่งตรวจสอบให้เข้ากับ repository ของคุณ',
      },
      example: {
        title: 'ตัวอย่าง',
        description: 'การลงมือทำจริงแบบเปรียบเทียบก่อนและหลัง',
      },
      addon: {
        title: 'Addon (สมัครใจ)',
        description:
          'ความสามารถที่กระบวนการ onboard วางทับลงบน repo ได้แก่ การรีวิวในเครื่องที่จำเป็นของ AI Diff Reviewer และ addon เสริมอีกสี่ตัวซึ่งไม่ใช่ส่วนหนึ่งของพื้นฐาน AI-first',
      },
    },
    viewDetail: 'ดูรายละเอียด',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToIndex: 'กลับไปยังชุดเครื่องมือ',
  },

  // Deep Work Plan — Examples gallery + detail
  examplesPage: {
    meta: {
      title: 'ตัวอย่าง Deep Work Plan',
      description:
        'การลงมือทำจริงแบบเปรียบเทียบก่อนและหลัง แสดงงานวิศวกรรมเดียวกันทั้งที่มีและไม่มี Deep Work Plan พร้อมความต่างด้านความน่าเชื่อถือและการตรวจทาน',
    },
    eyebrow: 'ตัวอย่าง',
    title: 'ตัวอย่าง',
    intro:
      'ดูระเบียบวิธีในการใช้งานจริง ผ่านการลงมือทำแบบเปรียบเทียบก่อนและหลังของงานวิศวกรรมจริงอย่างเป็นรูปธรรม',
    viewExample: 'อ่านการลงมือทำ',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    backToGallery: 'ตัวอย่างทั้งหมด',
  },

  // Deep Work Plan — Quickstart page
  quickstartPage: {
    meta: {
      title: 'เริ่มใช้งานเร็ว — Deep Work Plan',
      description:
        'ติดตั้งสกิล เริ่มต้น repository ของคุณ แล้ววางแผนและลงมือทำกับ agent ใดก็ได้ ขั้นตอนที่ทำให้ repository ของคุณเป็น spec-driven และขับเคลื่อนด้วย agent ได้',
    },
    eyebrow: 'เริ่มใช้งานเร็ว',
    title: 'เริ่มได้ในไม่กี่นาที',
    intro:
      'ติดตั้งสกิล เริ่มต้น repository ของคุณ แล้ววางแผนและลงมือทำกับ agent ใดก็ได้ ขั้นตอนที่ทำให้ repository ของคุณเป็น spec-driven และขับเคลื่อนด้วย agent ได้',
    sequenceTitle: 'เส้นทางการนำไปใช้',
    codeLabel: 'เทอร์มินัล',
    orLabel: 'หรือ',
    steps: [
      {
        title: 'ติดตั้งสกิล Deep Work Plan',
        description:
          'เพิ่มสกิลลงใน repository ของคุณ ทั้งเราเตอร์และสกิลย่อยแปดตัว (create, execute, refine, resume, status, verify, onboard, author) ใช้ Skills CLI เพื่อความรวดเร็วที่สุด หรือโคลน repo แล้วรันสคริปต์ติดตั้งในที่ที่มี git และเชลล์',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'เริ่มต้น repository',
        description:
          'รันสกิลย่อย onboard แล้วให้ agent ให้เหตุผลเกี่ยวกับ repo จริงของคุณ มันจะสร้าง AGENTS.md ฐานความรู้ docs/ เอกสารแยกตามโมดูล และที่อยู่ .agents/ ที่ใช้ร่วมกันข้าม agent (พร้อมซิมลิงก์ .claude → .agents และ .cursor → .agents) เชื่อมต่อคำสั่ง dwp-* บาง ๆ และวางโครง .dwp/ ที่ถูก gitignore ไว้',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'พัฒนาชุดเครื่องมือและรับ addon',
        description:
          'ใช้ /skill-create และ /agent-create (สกิลย่อย author) เพื่อสร้างสกิล agent และคำสั่งที่เหมาะกับสแตก การเริ่มต้นจะติดตั้งการรีวิวในเครื่องที่จำเป็นของ AI Diff Reviewer (เกต CI ยังคงเป็นทางเลือก) และเสนอ addon แบบสมัครใจสี่ตัว ได้แก่ devcontainer, Dailybot, dependency-upgrade และ design-system ซึ่งคุณรับมาเฉพาะเมื่อเหมาะสม',
      },
      {
        title: 'วางแผนและลงมือทำ',
        description:
          'สร้าง Deep Work Plan แล้วรันทีละงาน ตรวจสอบทุก gate และกลับมาทำต่อข้ามเซสชัน ขับเคลื่อน repository ตามข้อกำหนดของตัวมันเอง',
        commands: ['/dwp-create <goal>', '/dwp-execute'],
      },
    ],
    outcomeTitle: 'ผลลัพธ์',
    outcome:
      'repository ของคุณกลายเป็น spec-driven และขับเคลื่อนด้วย agent ได้ แผนงานเป็นแหล่งความจริงที่คงทน และตัว repository เองกลายเป็น harness ที่ agent ใดก็รันได้',
    nextStepsTitle: 'ขั้นตอนถัดไป',
    nextSteps: [
      { label: 'อ่านระเบียบวิธี', href: '/methodology' },
      { label: 'เรียกดูชุดเครื่องมือ', href: '/kit' },
      { label: 'ดูตัวอย่าง', href: '/examples' },
    ],
  },

  // Deep Work Plan — Trust & security page
  faqPage: {
    meta: {
      title: 'คำถามที่พบบ่อย — Deep Work Plan',
      description:
        'คำตอบของคำถามที่ผู้คนถามเกี่ยวกับ Deep Work Plan: มันทำอะไร gate และการกลับมาทำต่ออย่างไร เทียบกับเครื่องมืออื่นอย่างไร และนำไปใช้อย่างไร',
    },
    eyebrow: 'คำถามที่พบบ่อย',
    title: 'คำถามที่พบบ่อย',
    intro:
      'คำตอบสั้น ๆ สำหรับสิ่งที่ผู้คนถามมากที่สุดเกี่ยวกับ Deep Work Plan โดยแต่ละข้อมีลิงก์ไปยังหน้าที่ลงลึกกว่านั้น',
    tocTitle: 'ในหน้านี้',
    groups: [
      {
        id: 'what',
        title: 'Deep Work Plan คืออะไร',
        items: [
          {
            id: 'what-is-it',
            question: 'Deep Work Plan ทำอะไรได้จริง?',
            answer:
              'Deep Work Plan เปลี่ยน repository ให้เป็นสภาพแวดล้อมที่มีโครงสร้างซึ่ง coding agent ลงมือกับงานยาวได้อย่างน่าเชื่อถือ มันติดตั้งมาในรูปแบบสกิลของ agent และเริ่มต้น repository หนึ่งครั้ง (ดัชนี `AGENTS.md` โครงสร้าง `docs/` ชุดเครื่องมือ `.agents/` ของสกิลและคำสั่ง และพื้นที่ผลลัพธ์ `.dwp/` ที่ถูก gitignore ไว้) จากนั้นเป้าหมายใดก็กลายเป็นแผน: งานอะตอมมิกที่แต่ละงานมีเกณฑ์การยอมรับและ validation gate รันทีละงาน คอมมิตเมื่อผ่าน และ agent ใดก็ทำต่อจากดิสก์ได้ แผนปิดลงด้วย Final Review ที่ตรวจประเด็นความปลอดภัยและตรวจสอบสถานะสุดท้าย ระเบียบวิธีอยู่ภายใต้สัญญาอนุญาต MIT และใช้ได้กับ coding agent ใดก็ตามที่อ่าน repository',
            linkLabel: 'อ่านระเบียบวิธี',
            linkPath: '/methodology',
          },
          {
            id: 'who-is-it-for',
            question: 'ใครควรใช้?',
            answer:
              'นักพัฒนาและทีมที่มอบงานจริงหลายขั้นตอนให้ coding agent และต้องการให้งานเสร็จสมบูรณ์ เหมาะเมื่องานครอบคลุมมากกว่าหนึ่งเซสชัน มากกว่าหนึ่งกลุ่มไฟล์ หรือมากกว่าหนึ่ง agent เมื่อเพื่อนร่วมทีมต้องรับช่วงต่อจากจุดที่ agent หยุดไว้ได้ หรือเมื่อ “เสร็จ” ต้องหมายถึง “ผ่านการตรวจสอบ” ไม่ใช่ “agent บอกว่าเสร็จ” การแก้ไขหนึ่งบรรทัดไม่ต้องใช้แผน และระเบียบวิธีก็กล่าวเช่นนั้นเอง: กฎความเข้มงวดตามสัดส่วนของมันแนะนำให้ใช้เป้าหมาย เกณฑ์ และ gate แบบอินไลน์แทน',
            linkLabel: 'เริ่มใช้งานเร็ว',
            linkPath: '/quickstart',
          },
          {
            id: 'lite-vs-full',
            question: 'ความแตกต่างระหว่างแผนแบบ Lite กับแบบ Full คืออะไร?',
            answer:
              'เป็นทางเลือกด้านรูปแบบการนำเสนอ ไม่ใช่การแลกความเข้มงวด ทุกแผนเริ่มต้นเป็นโฟลเดอร์ Lite: README แบบกระชับที่มีบันทึกงานแบบยึดโยง (anchored) ซึ่งรันได้ทันที ไม่ใช่แบบร่างที่ยังไม่สมบูรณ์ `create` จะขยายเป็นไฟล์งานแบบ Full ก็ต่อเมื่อรายละเอียดคำสั่ง การพึ่งพา หรือสัญญาของงานหนึ่งไม่พอดีกับบันทึกแบบกระชับที่ตรวจทานได้ คำขอที่ระบุรูปแบบใดรูปแบบหนึ่งอย่างชัดเจนจะได้รับการเคารพ และแผนแบบ Lite สามารถถูกยกระดับเป็น Full ในภายหลังได้โดยไม่สูญเสียงานที่ทำเสร็จแล้ว ทั้งสองรูปแบบมีเกณฑ์การยอมรับ validation gate หลักฐาน และ Final Review ภาคบังคับเหมือนกัน',
            linkLabel: 'อ่านระเบียบวิธี',
            linkPath: '/methodology',
          },
          {
            id: 'is-it-a-tool',
            question: 'มันคือเครื่องมือ เฟรมเวิร์ก หรือระเบียบวิธี?',
            answer:
              'เป็นระเบียบวิธีที่บรรจุมาในรูปแบบสกิลที่ติดตั้งได้ ไม่มีเซิร์ฟเวอร์ ไม่มีบัญชี ไม่มีรูปแบบกรรมสิทธิ์ และไม่มี runtime เกินกว่า coding agent ที่คุณใช้อยู่แล้ว สิ่งที่ถูกติดตั้งคือคำแนะนำที่ agent อ่าน สคริปต์เชลล์ชุดเล็ก ๆ สำหรับการตรวจจับบริบทและการตรวจสอบความสอดคล้อง และแบบแผนที่ repository ของคุณรับไปใช้ ทุกสิ่งที่แผนผลิตเป็น Markdown และ JSON ใน repository ของคุณ อ่านได้โดยไม่ต้องพึ่งเครื่องมือใด',
            linkLabel: 'อ่านข้อกำหนด',
            linkPath: '/spec',
          },
          {
            id: 'which-agents',
            question: 'ใช้ได้กับ coding agent ตัวไหนบ้าง?',
            answer:
              'agent ใดก็ตามที่อ่านไฟล์ใน repository สกิลทำตามมาตรฐาน Agent Skills แบบเปิดและแบบแผน `AGENTS.md` ดังนั้น Claude Code, Codex, Cursor, Gemini CLI, GitHub Copilot และอื่น ๆ จึงรับมันไปใช้ผ่านการโหลดสกิลและคำแนะนำตามปกติของตัวเอง การประเมินของระเบียบวิธีเองแสดงให้เห็นแผนที่เริ่มโดย agent ของผู้จัดจำหน่ายหนึ่งรายแล้วทำต่อโดย agent ของอีกรายหนึ่ง ในทั้งสองทิศทาง ความครอบคลุมของการติดตั้งและหลักฐานเชิงพฤติกรรมถูกแจกแจงแยกตาม agent ในเมทริกซ์ความเข้ากันได้ และสองสิ่งนี้ไม่เคยถูกนำมาปนกัน',
            linkLabel: 'เรียกดูชุดเครื่องมือ',
            linkPath: '/kit',
          },
          {
            id: 'how-to-use',
            question: 'ใช้งานอย่างไร?',
            answer:
              'สามขั้นตอน ขั้นแรก ติดตั้ง Deep Work Plan skill ลงใน coding agent ของคุณ——เส้นทางที่เร็วที่สุดคือ `npx skills add DailybotHQ/deepworkplan-skill` (หรือ clone skill repo แล้วรัน `./setup.sh`) ขั้นที่สอง onboard repository ครั้งเดียว เพื่อให้ agent ปรับ `AGENTS.md`, `docs/`, ชุด `.agents/` และพื้นที่ `.dwp/` ที่ถูก gitignore ให้เข้ากับสแต็กของคุณ: ชี้ไปที่ https://deepworkplan.com/init.md หรือรัน `/deepworkplan-onboard` ขั้นที่สาม วางแผนและรันงานด้วยคำสั่งบาง ๆ: `/dwp-create <goal>` สร้างแผน; `/dwp-execute` รันทีละงานผ่านแต่ละ gate; `/dwp-refine` แก้ไขแผนที่กำลังดำเนินอยู่ (ขอบเขต งาน หรือการยกระดับแผน Lite เป็น Full); `/dwp-resume` ทำต่อหลังการหยุดชะงัก; `/dwp-status` รายงานความคืบหน้าโดยไม่รัน; `/dwp-verify` สร้างรายงานการสอดคล้องที่เป็นกลาง agent ที่ intercept `/` มักใช้ `#` แทน (เช่น `#dwp-execute`) adoption endpoint และเริ่มใช้งานเร็วอธิบายเส้นทางเดียวกันอย่างละเอียดยิ่งขึ้น',
            linkLabel: 'เริ่มใช้งานเร็ว',
            linkPath: '/quickstart',
          },
          {
            id: 'what-is-installed',
            question: 'มีอะไรถูกติดตั้งบ้าง และติดตั้งที่ไหน?',
            answer:
              'สกิลของ agent ถูกติดตั้งในตำแหน่งใดก็ตามที่ agent ของคุณโหลดสกิลระดับโปรเจกต์หรือระดับผู้ใช้ จากนั้นการเริ่มต้นจะปรับตัว repository เอง: มันสร้างหรือประสาน `AGENTS.md`, `docs/`, `.agents/` และพื้นที่ทำงาน `.dwp/` ที่ถูก gitignore ไว้ สกิลสอนวิธีการให้ agent ส่วน repository เก็บบริบท ชุดเครื่องมือ และหลักฐานของแผนที่ agent ตัวอื่นต้องใช้เพื่อทำต่อ',
            linkLabel: 'ดูขั้นตอนการนำไปใช้',
            linkPath: '/init',
          },
          {
            id: 'requires-git',
            question: 'Deep Work Plan จำเป็นต้องใช้ Git หรือไม่?',
            answer:
              'แนะนำให้ใช้ Git สำหรับ repository เพราะประวัติของมันเป็นส่วนหนึ่งของพื้นผิวการกู้คืนและการตรวจทาน แต่ระเบียบวิธีก็รันได้เช่นกันใน agent workspace ที่ไม่มี Git repository ในกรณีนั้น ชั้นสถานะที่เครื่องอ่านได้ ซึ่งรวมถึงเช็กพอยต์ `state.json` และบันทึก gate เป็นสิ่งจำเป็น เพื่อให้การกู้คืนไม่ต้องพึ่งพาบทสนทนาแชท',
            linkLabel: 'อ่านเรื่อง repository archetype',
            linkPath: '/spec/archetypes',
          },
          {
            id: 'skill-plan-spec',
            question: 'สกิล แผน และข้อกำหนดผลิตภัณฑ์ต่างกันอย่างไร?',
            answer:
              'สกิลอธิบายว่า agent ทำขั้นตอนที่ทำซ้ำได้อย่างไร แผนของ DWP อธิบายการเปลี่ยนแปลงที่เป็นรูปธรรมผ่านขอบเขต เกณฑ์การยอมรับ validation gate และหลักฐาน ข้อกำหนดผลิตภัณฑ์อธิบายพฤติกรรมปัจจุบันของผลิตภัณฑ์และพัฒนาไปทีละส่วนหลังการทำงานจริง (delta) แม้สกิลและแผนก็เป็นข้อกำหนดเช่นกัน แต่มันอธิบายขั้นตอนและการเปลี่ยนแปลง ไม่ใช่การรักษาสัญญาผลิตภัณฑ์ที่เป็นบรรทัดฐานนั้น',
            linkLabel: 'อ่านข้อกำหนด',
            linkPath: '/spec/dwp-specification',
          },
        ],
      },
      {
        id: 'how',
        title: 'แผนทำงานอย่างไร',
        items: [
          {
            id: 'gates',
            question: 'validation gate ทำงานอย่างไร และต้องมีมนุษย์อนุมัติหรือไม่?',
            answer:
              'พวกมันคือคำยืนยันแบบรันได้ซึ่ง agent รันเอง การอนุมัติของมนุษย์อยู่แค่ประตูหน้าและประตูหลังของการรัน: คนอนุมัติแผนก่อนเริ่มดำเนินการ และตรวจทาน diff สุดท้ายเมื่อถึงช่วง pull request การดำเนินการระหว่างกลางเป็นไปโดยอัตโนมัติ ทุกงานระบุคำสั่งที่เป็นรูปธรรม โดยทั่วไปคือ gate คุณภาพของ repository นั้นเอง ซึ่งเลือกจากพื้นผิวที่แตะต้องของงาน: การทดสอบของพฤติกรรมที่ถูกเปลี่ยนและตัวที่ใช้มัน ขยายไปถึงชุดทดสอบทั้งหมดเมื่อการเปลี่ยนแปลงถูกใช้ร่วมกันหรือกำหนดขอบเขตไม่ได้ งานถูกทำเครื่องหมายว่าเสร็จก็ต่อเมื่อคำสั่งเหล่านั้นจบด้วยผลสำเร็จ และงานที่เปลี่ยนพฤติกรรมต้องขยายการทดสอบ เมื่อล้มเหลว งานจะถูกทำเครื่องหมายว่าถูกบล็อก และ agent หยุดทำงาน',
            linkLabel: 'วงรอบหลัก',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'stale-plan',
            question: 'แผนหลีกเลี่ยงความล้าสมัยอย่างไร เมื่อมีคนเปลี่ยนโค้ดระหว่างการรัน?',
            answer:
              'ด้วยสามด้าน งานถูกเขียนเป็นพฤติกรรม ไม่ใช่เป็นการแก้ไขไฟล์: เกณฑ์การยอมรับบอกว่าระบบต้องทำอะไร การเปลี่ยนชื่อไฟล์หรือสลับส่วนปฏิบัติการจึงไม่ทำให้เกณฑ์ใช้ไม่ได้ ทุก gate รันใหม่เทียบกับ repository ในสภาพปัจจุบัน สมมติฐานที่พังทลายจึงล้มเหลวอย่างเห็นได้ชัดในการรันถัดไป แทนที่จะเบี่ยงเบนไปอย่างเงียบ ๆ และความล้มเหลวนั้นคือสัญญาณให้ปรับแผน ส่วนการรักษาเอกสารให้เป็นปัจจุบันเป็นส่วนหนึ่งของงาน: งานที่เปลี่ยนพฤติกรรมยังปรับปรุงเอกสารและชุดเครื่องมือสำหรับ agent ที่อธิบายถึงมัน ภายใน gate ของงานนั้นเอง การรันแต่ละครั้งควรทิ้ง repository ให้พร้อมสำหรับ agent มากกว่าสภาพที่มันพบตอนเริ่ม',
            linkLabel: 'อ่านระเบียบวิธี',
            linkPath: '/methodology',
          },
          {
            id: 'edit-mid-run',
            question: 'แก้แผนระหว่างรันได้หรือไม่โดยไม่เสียงานที่เสร็จแล้ว?',
            answer:
              'ทำได้ การปรับแผนที่ดำเนินการไปแล้วบางส่วนคือการเคลื่อนไหวชั้นเลิศ เนื้อหางานและสถานะการดำเนินการถูกเก็บแยกจากกัน: แผนคือเช็กบ็อกซ์บนดิสก์บวกไฟล์สถานะขนาดเล็ก สิ่งที่ทำเสร็จแล้วจึงถูกบันทึกไว้แยกจากข้อความของงาน เมื่องานหนึ่งปรากฏว่าผิด agent จะทำเครื่องหมายว่าถูกบล็อกแล้วหยุด แทนที่จะฝืนทำต่อ จากนั้นคุณแก้ไข เรียงใหม่ แยก หรือทิ้งงานที่ยังไม่ได้รัน ขณะที่งานที่เสร็จแล้วยังคงเสร็จอยู่เช่นเดิม การกลับมาทำต่อจะสร้างสถานะขึ้นใหม่จากดิสก์และ repository จริง แล้วรัน gate ที่สำคัญซ้ำ สิ่งใดที่เปลี่ยนไปใต้พื้นจึงไม่รอดสายตา',
            linkLabel: 'วงรอบหลัก',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'drift',
            question: 'มันตรวจงานเทียบกับแผนตลอดไป หรือแผนเป็นเรื่องตั้งต้นครั้งเดียว?',
            answer:
              'แผนคือการตรวจสอบต่อเนื่อง agent ทำงานทีละงานเล็ก ๆ และต้องตรวจให้ผ่านก่อนจะไปต่อ มันจึงหลงทางได้หนึ่งก้าว ไม่ใช่สามก้าว ทุกงานมีเกณฑ์การยอมรับพร้อมคำสั่งที่พิสูจน์ได้จริง และความคืบหน้าถูกเขียนลง repository ไปพร้อมกับงาน พร้อมสถานะของแต่ละงาน การเบี่ยงเบนจึงปรากฏให้คุณ เซสชันถัดไป และ agent ตัวถัดไปมองเห็นได้ แผนไม่ถือว่าเสร็จจนกว่าทุกอย่างจะผ่านการตรวจสอบ รวมถึง Final Review ข้อจำกัดที่พูดตรง ๆ: ระเบียบวิธีไม่อาจห้าม agent ไม่ให้เขียนเกณฑ์การยอมรับที่อ่อนแอตั้งแต่แรกได้ แต่มันทำให้การเบี่ยงเบนดังใหญ่แทนที่จะเงียบ',
            linkLabel: 'วงรอบหลัก',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'plan-evolution',
            question: 'แผนถูกสร้างครั้งเดียวแล้วดูแลด้วยมือ หรือพัฒนาไปพร้อมโค้ด?',
            answer:
              'ไม่ใช่ทั้งสองอย่าง มันถูกสร้างครั้งเดียวจากเป้าหมาย แล้วได้รับการดูแลต่อเป็นส่วนหนึ่งของงาน แผนไม่ถูกเขียนใหม่จาก code diff โดยเจตนา เพราะสเปกที่ไล่ตามโค้ดจะกลายเป็นกระจกสะท้อนที่ตามหลัง ซึ่งเป็นการเบี่ยงเบนที่ระเบียบวิธีมีอยู่เพื่อกำจัด มันพัฒนาต่อโดยเจตนา: gate รันใหม่เทียบกับ repository ปัจจุบัน gate ที่ล้มเหลวจะกระตุ้นให้ปรับแผน และ agent ทำการปรับนั้นระหว่างการรัน ขณะที่คุณอนุมัติตั้งแต่ต้นและตรวจทานตอนจบ เอกสารและการทดสอบพัฒนาไปพร้อมโค้ดโดยการออกแบบ เพราะการปรับปรุงมันอยู่ภายใน gate ของแต่ละงาน',
            linkLabel: 'อ่านระเบียบวิธี',
            linkPath: '/methodology',
          },
          {
            id: 'resume',
            question: 'จะเกิดอะไรขึ้นหากเซสชันหยุดกลางทาง?',
            answer:
              'ความคืบหน้าอยู่บนดิสก์ ไม่ใช่ในบทสนทนา เช็กบ็อกซ์ของ README บันทึกของแต่ละงาน ดัชนีการทำงานที่จำกัดขอบเขต และไฟล์สถานะที่เครื่องอ่านได้ ถูกอัปเดตที่ขอบเขตของทุกงาน และไฟล์สถานะบันทึกเช็กพอยต์ก่อนการหยุดที่วางแผนไว้ทุกครั้ง เซสชันใหม่ หรือ agent ตัวอื่น จะอ่านดัชนีกระชับนั้น กระทบยอดกับ repository และประวัติ git แล้วทำต่อจากงานแรกที่ยังไม่เสร็จโดยไม่ต้องทำซ้ำงานที่จบแล้ว แม้การสร้างแผนที่ถูกขัดจังหวะก็กู้คืนได้: ตัวตนของแผนและรายการงานที่ตั้งใจไว้ถูกเขียนก่อนไฟล์งานใด ๆ แผนที่สร้างค้างไว้ครึ่งทางจึงเลือกทำให้เสร็จหรือทิ้งได้ แทนที่จะต้องเดา',
            linkLabel: 'วงรอบหลัก',
            linkPath: '/methodology/02-core-loop',
          },
          {
            id: 'final-review',
            question: 'Final Review คืออะไร?',
            answer:
              'งานปิดเดียวที่บังคับสำหรับทุกแผน ตามลำดับ: การตรวจความปลอดภัยบนชุดการเปลี่ยนแปลงสะสมทั้งหมดของแผน รวมถึงการตรวจ diff ในเครื่องที่จำเป็นโดยสกิล AI Diff Reviewer ซึ่งข้อค้นพบระดับ critical จะบล็อกการเสร็จสิ้นจนกว่าจะถูกแก้ไขหรือได้รับการยอมรับอย่างชัดเจน การตรวจสอบสถานะสุดท้าย หมายถึงชุดทดสอบ lint type-check และ format ที่ใช้ได้ทั้งหมดของ repository บนโค้ดฉบับสุดท้าย และการกระทบยอดการตัดสินใจเรื่องสกิลที่แต่ละงานบันทึกไว้ จากนั้น agent รายงานสิ่งที่ส่งมอบ หลักฐาน และข้อจำกัด และเสนอรายงานสรุปสำหรับผู้บริหารหนึ่งครั้ง โดยจะสร้างก็ต่อเมื่อคุณขอ',
            linkLabel: 'ข้อกำหนด',
            linkPath: '/spec/dwp-specification',
          },
          {
            id: 'gate-fails',
            question: 'เกิดอะไรขึ้นเมื่อ validation gate ล้มเหลว?',
            answer:
              'งานนั้นจะถูกบันทึกว่าถูกบล็อก และ agent จะหยุดก่อนที่จะอ้างว่าเสร็จสมบูรณ์ คุณสามารถตรวจสอบหลักฐาน แก้ไขโค้ด หรือปรับแผนงานนั้น แล้วจึงกลับมาทำต่อ คำสั่งที่ล้มเหลวคือสัญญาณให้แก้ไขความไม่สอดคล้องกัน ไม่ใช่ใบอนุญาตให้ลดความเข้มงวดของ gate',
            linkLabel: 'อ่านโพรโทคอลของ agent',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'unattended-runs',
            question: 'แผนรันโดยไม่มีคนเฝ้าข้ามคืนหรือใน CI ได้หรือไม่?',
            answer:
              'ได้ เมื่อแผนได้รับการอนุมัติล่วงหน้า มีชั้นสถานะที่จำเป็นครบถ้วน และให้อำนาจที่มีขอบเขตแก่ agent การรันแบบไม่มีคนเฝ้าต้องหยุดและบันทึกตัวบล็อกเมื่อสภาพจริงเบี่ยงเบนไปจากแผน เมื่อ gate ล้มเหลวนอกขอบเขตการซ่อมที่วางแผนไว้ หรือเมื่อจำเป็นต้องมีการอนุมัติหรือข้อมูลรับรอง (credential) ใหม่',
            linkLabel: 'อ่านโพรโทคอลการรันแบบไม่มีคนเฝ้า',
            linkPath: '/spec/agent-protocol',
          },
        ],
      },
      {
        id: 'compare',
        title: 'การเปรียบเทียบกับทางเลือกอื่น',
        items: [
          {
            id: 'vs-sdd-tools',
            question:
              'มันต่างจากเครื่องมือ spec-driven อย่าง Spec Kit, OpenSpec หรือ Kiro อย่างไร?',
            answer:
              'พวกมันแก้ปัญหาข้างเคียงกัน เครื่องมือ spec-driven เก่งมากในการจับสิ่งที่ควรเปลี่ยน: สเปก ความต้องการ และข้อเสนอการเปลี่ยนแปลงในรูปแบบที่ทำซ้ำได้ Deep Work Plan ว่าด้วยวิธีให้ agent ลงมือหลายชั่วโมงโดยไม่เบี่ยงเบน: harness ที่การเริ่มต้นวางไว้ validation gate ต่องานที่เลือกจากพื้นผิวที่แตะต้อง สถานะทำต่อได้บนดิสก์ Final Review ที่บังคับพร้อมการตรวจความปลอดภัย และตัวตรวจสอบความสอดคล้องสำหรับตัว repository เอง ทั้งสองใช้ร่วมกันได้ โดยให้สเปกหรือข้อเสนอการเปลี่ยนแปลงป้อนเข้าสู่แผน หน้าเปรียบเทียบวางความสามารถทั้งหลายเคียงกันไว้ ตามเงื่อนไขของเครื่องมือแต่ละตัว',
            linkLabel: 'ดูการเปรียบเทียบ',
            linkPath: '/compare',
          },
          {
            id: 'vs-agent-frameworks',
            question:
              'มันต่างจากเครื่องมือขั้นตอนการทำงานของ agent อย่าง BMAD, Superpowers, Get Shit Done หรือ Gentle-AI อย่างไร?',
            answer:
              'เฟรมเวิร์กเวิร์กโฟลว์สำหรับเอเจนต์อย่าง BMAD, Superpowers และ Get Shit Done นำสไตล์การทำงานที่แข็งแกร่งมาให้: บทบาท หลักการ ขั้นตอนแบบทดสอบก่อน และนิสัยการตรวจสอบ Gentle-AI อยู่ในหมวดหมู่ใกล้เคียงในฐานะตัวกำหนดค่าระบบนิเวศเอเจนต์ โดยติดตั้งความจำถาวรข้ามเซสชัน (Engram) ทักษะที่คัดสรร เพอร์โซนา เซิร์ฟเวอร์ MCP, Spec-Driven Development แบบเลือกได้ และการรีวิวตามหลักฐานแบบเลือกได้ (Receipt-Driven Development) ให้กับโค้ดดิ้งเอเจนต์ที่คุณใช้อยู่แล้ว โดยเขียนลงในไดเรกทอรีการตั้งค่าของแต่ละเอเจนต์ Deep Work Plan แตกต่างจากทั้งสอง: มันมุ่งเน้นไปที่สิ่งที่ยังคงอยู่ในรีพอสิทอรีและสิ่งที่ตรวจสอบได้ — harness ที่เอเจนต์ใดก็ตามอ่านได้ทันทีโดยไม่ต้องมีบริบทมาก่อน ไฟล์ task ที่มีเกณฑ์การยอมรับและ gate สถานะที่คงอยู่ข้ามเซสชัน ตัวตรวจสอบความสอดคล้องที่มีโค้ดออกที่เป็นมิตรกับ CI และการวัดที่เผยแพร่ว่าแต่ละ flow โหลด instruction byte กี่ไบต์ มันไม่ผูกกับเครื่องมือใดเครื่องมือหนึ่งโดยโครงสร้าง และไม่เพิ่มบริการ ผู้ให้บริการ หรือความลับใดๆ ให้กับ core loop ชั้นเหล่านี้สามารถอยู่ร่วมกันได้: เฟรมเวิร์กและ Gentle-AI กำหนดวิธีที่เอเจนต์ทำงาน ส่วน Deep Work Plan ทำให้งานระยะยาวคงทนและตรวจสอบได้ภายในรีพอสิทอรี หน้าเปรียบเทียบแสดงให้เห็นว่าแต่ละแนวทางมีอยู่ในตัว เลือกได้ หรืออยู่นอกขอบเขต',
            linkLabel: 'ดูการเปรียบเทียบ',
            linkPath: '/compare',
          },
          {
            id: 'vs-native-plan-mode',
            question: 'ทำไมไม่ใช้โหมดวางแผนในตัวของ agent ที่ใช้อยู่เสียเลย?',
            answer:
              'โหมดวางแผนในตัวมีประโยชน์ และ Deep Work Plan สร้างอยู่บนพื้นฐานเดียวกัน คือแบบแผน `AGENTS.md` และมาตรฐาน Agent Skills แบบเปิด ความต่างอยู่ที่ว่าแผนอยู่ที่ไหน และอะไรบังคับใช้มัน แผนแบบเนทีฟมักอยู่นอก repository และหมดอายุไปพร้อมเซสชัน ส่วน Deep Work Plan เขียนแผน สถานะ และหลักฐานของมันลงใน repository agent ตัวอื่นหรือเพื่อนร่วมทีมจึงทำต่อได้ และทุกงานมี gate ที่รันได้พร้อมบันทึกที่ถูกเก็บไว้ คุณยังคงใช้โหมดวางแผนของ agent สำหรับการคิด ส่วนระเบียบวิธีเติมเต็มด้วยวงรอบการลงมือที่คงอยู่และตรวจสอบได้',
            linkLabel: 'ดูการเปรียบเทียบ',
            linkPath: '/compare',
          },
        ],
      },
      {
        id: 'adopt',
        title: 'การนำไปใช้',
        items: [
          {
            id: 'install',
            question:
              'การเริ่มต้นเขียนอะไรลงใน repository ของฉัน และแตะไฟล์ที่มีอยู่เดิมหรือไม่?',
            answer:
              'การเริ่มต้นไม่ทำลายของเดิม: มันตรวจพบ `AGENTS.md`, `docs/`, `.agents/` หรือ `CLAUDE.md` ที่มีอยู่เดิม ประสานแทนที่จะเขียนทับ และถามก่อนแทนที่สิ่งใด มันเขียนดัชนี `AGENTS.md` พร้อมคำสั่งจริง โครงสร้าง `docs/` ที่ผ่านการให้เหตุผล เอกสารแยกตามโมดูล ชุดเครื่องมือ `.agents/` พร้อมคำสั่ง `dwp-*` แบบบาง พื้นที่ผลลัพธ์ `.dwp/` ที่ถูก gitignore ไว้ คู่มือการทดสอบที่ผ่านการตรวจทาน และการตรวจโค้ดในเครื่องที่จำเป็น (สกิล AI Diff Reviewer บวกส่วนขยายการรีวิวที่ปรับให้เข้ากับ repo) จากนั้นมันรัน self-check และตัวตรวจสอบความสอดคล้อง เพื่อให้คุณเห็นว่ามีอะไรถูกสร้างขึ้น repository ที่เริ่มต้นด้วยเวอร์ชันก่อนหน้าจะได้รับการอัปเกรดแบบเจาะจง ที่เปลี่ยนเฉพาะสิ่งที่ยังขาดอยู่',
            linkLabel: 'endpoint การนำไปใช้',
            linkPath: '/init',
          },
          {
            id: 'core-and-addons',
            question: 'ใช้ระเบียบวิธีหลักได้โดยไม่ติดตั้ง add-on หรือไม่?',
            answer:
              'ได้ add-on เป็นชั้นเสริมแบบเลือกได้ (opt-in) และ repository ที่ไม่มี add-on เลยก็สอดคล้องกับ DWP อย่างสมบูรณ์ Devcontainer การรายงานผ่าน Dailybot การอัปเกรด dependency การรองรับ design system และการตรวจ CI แบบเลือกได้ ถูกเสนอให้เฉพาะเมื่อเข้ากับ repository ของคุณ และคุณยอมรับอย่างชัดเจนเท่านั้น',
            linkLabel: 'เรียกดู add-on',
            linkPath: '/spec/addons',
          },
          {
            id: 'no-test-toolchain',
            question: 'ถ้า repository ของฉันยังไม่มีการทดสอบหรือ linting ล่ะ?',
            answer:
              'DWP ไม่ถือว่าการไม่มี toolchain เป็นข้อยกเว้นที่ผ่านได้ฟรี ระหว่างการเริ่มต้น agent จะเสนอชุด validation ที่เหมาะกับสแต็กของคุณ บันทึกคำสั่งไว้ในเอกสารของ repository และใช้คำสั่งเหล่านั้นเป็นเป้าหมายสำหรับ gate ในอนาคต ข้อเสนอนี้ยังคงเปิดให้คุณตรวจทานได้เสมอ',
            linkLabel: 'อ่านโพรโทคอลของ agent',
            linkPath: '/spec/agent-protocol',
          },
          {
            id: 'cost',
            question: 'ค่าใช้จ่ายเท่าไร และวัดประสิทธิภาพอย่างไร?',
            answer:
              'ระเบียบวิธีและสกิลอยู่ภายใต้สัญญาอนุญาต MIT และใช้ได้ฟรี ไม่มีบริการ ไม่มี API key และไม่มีการเก็บข้อมูลการใช้งานในโฟลว์หลัก ประสิทธิภาพถูกรายงานเป็นจำนวนไบต์ของคำสั่งที่แต่ละโฟลว์โหลด วัดด้วยสคริปต์ที่คอมมิตไว้พร้อมสกิล และเผยแพร่ในทะเบียนการประเมิน โดยรายงานตัวเลขที่เพิ่มขึ้นอย่างเปิดเผยเท่ากับตัวเลขที่ลดลง ไม่มีการรายงานเป็นเปอร์เซ็นต์ของโทเคนหรือการประหยัดค่าใช้จ่าย เพราะการนับไบต์ไม่อาจสถาปนาข้อสรุปเหล่านั้นได้ การประเมินสาธารณะแบบลงทะเบียนล่วงหน้าอยู่ในแผนเพื่อวัดผลลัพธ์อย่างเหมาะสม',
            linkLabel: 'ความน่าเชื่อถือและการเปิดเผย',
            linkPath: '/trust',
          },
        ],
      },
    ],
    stillHaveQuestions: {
      title: 'ยังมีคำถามอยู่ใช่ไหม?',
      body: 'เปิด discussion หรือ issue บน GitHub คำถามที่ถูกถามขึ้นซ้ำ ๆ จะถูกเพิ่มเข้าหน้านี้',
      ctaLabel: 'ถามบน GitHub',
    },
  },

  comparePage: {
    meta: {
      title: 'Deep Work Plan เทียบกับทางเลือกอื่น',
      description:
        'Deep Work Plan เทียบกับเครื่องมือ spec-driven เฟรมเวิร์กขั้นตอนการทำงานของ agent และโหมดแผนของผู้จัดจำหน่าย ตามเงื่อนไขของทุกตัว พร้อมแหล่งอ้างอิงและวันตรวจทาน',
    },
    eyebrow: 'เปรียบเทียบ',
    title: 'Deep Work Plan และทางเลือกอื่น',
    intro:
      'เลือกชั้นที่เหมาะกับสถานการณ์ของคุณ ทางเลือกแต่ละตัวถูกอธิบายตามเงื่อนไขของมันเอง ทุกข้อเท็จจริงอ้างย้อนกลับไปยังเอกสารทางการของมัน และหน้านี้ระบุวันที่ตรวจทานล่าสุด นี่คือแผนที่ ไม่ใช่การจัดอันดับ',
    howToRead: {
      title: 'วิธีอ่านหน้านี้',
      body: 'ค่าทั้งสามอธิบายความสามารถแต่ละอย่าง โดยบอกว่าความสามารถนั้นอยู่ตรงไหนในเครื่องมือ ไม่ใช่เครื่องมือนั้นดีหรือไม่',
      values: {
        builtIn: 'มีในตัว',
        optional: 'เป็นตัวเลือกหรือผ่านส่วนขยาย',
        notInScope: 'อยู่นอกขอบเขต',
      },
    },
    reviewedOnLabel: 'ตรวจทานล่าสุด',
    alternativesTitle: 'ทางเลือกอื่น ตามเงื่อนไขของตัวเอง',
    officialSiteLabel: 'เว็บไซต์ทางการ',
    categories: {
      methodology: 'ระเบียบวิธี',
      sdd: 'เครื่องมือพัฒนาแบบขับเคลื่อนด้วยสเปก',
      agentFramework: 'เฟรมเวิร์กขั้นตอนการทำงานของ agent',
      aiNativeSdlc: 'AI-native SDLC',
      vendorNative: 'โหมดวางแผนในตัวของผู้จัดจำหน่าย',
    },
    matrix: {
      title: 'เมทริกซ์ความสามารถ',
      caption:
        'ความสามารถแต่ละอย่างอยู่ตรงไหนของแต่ละเครื่องมือ มีในตัว เป็นตัวเลือกหรือผ่านส่วนขยาย หรืออยู่นอกขอบเขต ตรวจทานเทียบกับเอกสารทางการ',
      capabilityColumn: 'ความสามารถ',
    },
    capabilities: {
      toolAgnostic: {
        label: 'ใช้ได้กับ coding agent ใดก็ได้',
        help: 'ไฟล์ของ repository ชุดเดียวกันขับเคลื่อน Claude Code, Codex, Cursor, Gemini CLI และอื่น ๆ',
      },
      repoNativeHarness: {
        label: 'เขียน harness ของ agent ลงใน repository',
        help: 'คำแนะนำ เอกสาร สกิล และคำสั่งอยู่ใน repository ไม่ใช่ในการตั้งค่าของเครื่องมือใดเครื่องมือหนึ่ง',
      },
      taskAcceptanceCriteria: {
        label: 'เกณฑ์การยอมรับต่อหนึ่งงาน',
        help: 'แต่ละงานระบุเงื่อนไขที่สังเกตได้ว่าอย่างไรจึงนับว่าเสร็จ',
      },
      perTaskGates: {
        label: 'validation gate ต่อหนึ่งงาน',
        help: 'แต่ละงานระบุคำสั่งที่ต้องผ่าน โดยเลือกจากสิ่งที่งานนั้นแตะต้อง',
      },
      resumableState: {
        label: 'สถานะบนดิสก์ที่ทำต่อได้',
        help: 'ความคืบหน้ารอดจากการรีเซ็ตเซสชัน และ agent ตัวอื่นหรือเพื่อนร่วมทีมรับไปทำต่อได้',
      },
      finalReview: {
        label: 'การทบทวนปิดแผนที่บังคับพร้อมการตรวจความปลอดภัย',
        help: 'แผนเสร็จสิ้นไม่ได้หากขาดการตรวจความปลอดภัยของชุดการเปลี่ยนแปลงทั้งหมดและการตรวจสอบสถานะสุดท้าย',
      },
      conformanceChecker: {
        label: 'ตัวตรวจสอบความสอดคล้องที่รันได้',
        help: 'สคริปต์ตรวจสอบ repository และแผนของมันเทียบกับมาตรฐาน พร้อม exit code ที่เป็นมิตรกับ CI',
      },
      instructionBudgetLedger: {
        label: 'การวัดปริมาณคำสั่งที่โหลดซึ่งเผยแพร่สาธารณะ',
        help: 'จำนวนไบต์ที่แต่ละโฟลว์โหลดถูกวัดด้วยสคริปต์ที่คอมมิตไว้ และเผยแพร่พร้อมขีดจำกัดของมัน',
      },
      onboardingScaffold: {
        label: 'การเริ่มต้นที่วางโครงเอกสาร',
        help: 'การรันครั้งแรกเขียนเอกสารสำหรับ agent และชุดเครื่องมือของ repository',
      },
      brownfieldSpecs: {
        label: 'สเปกที่มีชีวิตสำหรับระบบที่มีอยู่แล้ว',
        help: 'การเปลี่ยนแปลงถูกระบุเป็นเดลต้าที่ผสานเข้าสู่สเปกของระบบซึ่งเติบโตขึ้นเรื่อย ๆ',
      },
      crossProjectMemory: {
        label: 'หน่วยความจำ agent ที่คงอยู่ข้ามโปรเจกต์',
        help: 'หน่วยความจำติดตาม agent ข้ามที่เก็บโค้ดและเซสชันที่แตกต่างกัน ไม่ใช่แค่สถานะบนดิสก์ของแผนเดียว',
      },
      roleBasedAgents: {
        label: 'บทบาท agent เฉพาะทางที่แยกจากกัน',
        help: 'บุคลิกที่มีชื่อ (เช่น นักวิเคราะห์ สถาปนิก หรือผู้ทบทวน) แบ่งงานกันทำ แทนที่จะให้ agent เดียวทำทุกขั้นตอน',
      },
      nativeIdeProduct: {
        label: 'เป็น IDE หรือ editor ของตัวเอง',
        help: 'เครื่องมือนี้เป็นสภาพแวดล้อมการพัฒนาแบบครบวงจรในตัวเอง ไม่ใช่ส่วนเสริมของ coding agent ที่มีอยู่แล้ว',
      },
    },
    alternatives: {
      dwp: {
        name: 'Deep Work Plan',
        whatItDoesWell:
          'ติดตั้งในรูปแบบสกิล เริ่มต้น repository ให้เป็น harness ของ agent และรันแผนระยะยาวพร้อม validation gate ต่องาน สถานะบนดิสก์ และ Final Review ที่บังคับ',
        audience:
          'นักพัฒนาและทีมที่มอบงานข้ามหลายเซสชันให้ coding agent ใดก็ได้ และต้องการให้งานเสร็จแบบผ่านการตรวจสอบ',
      },
      'github-spec-kit': {
        name: 'GitHub Spec Kit',
        whatItDoesWell:
          'เปลี่ยนฟีเจอร์ให้เป็นสเปกที่ปฏิบัติการได้ ผ่านรัฐธรรมนูญ สเปก แผน และรายการงาน ขับเคลื่อนด้วย slash command ที่เชื่อมต่อกับ coding agent มากกว่าห้าสิบตัว และตรวจสอบได้ว่าอาร์ติแฟกต์ทั้งหมดสอดคล้องกันก่อนเริ่มลงมือทำจริง',
        audience:
          'ทีมที่ต้องการเวิร์กโฟลว์ specify, plan, tasks และ implement ที่ทำซ้ำได้ ภายใน agent ที่ตนใช้อยู่แล้ว',
      },
      openspec: {
        name: 'OpenSpec',
        whatItDoesWell:
          'จับการเปลี่ยนแปลงแต่ละครั้งเป็นข้อเสนอพร้อมสเปกเดลต้า (เพิ่ม แก้ไข ลบ) และความต้องการตาม RFC 2119 ที่มาพร้อมสถานการณ์ แล้วจัดเก็บเข้าสู่สเปกที่มีชีวิต พร้อมตัวตรวจสอบที่ยืนยันความสมบูรณ์ของข้อเสนอและความครอบคลุมของสถานการณ์ก่อนยอมรับการเปลี่ยนแปลง',
        audience: 'ทีมที่ทำงานบนระบบที่มีอยู่แล้ว และต้องการให้สเปกเติบโตทีละการเปลี่ยนแปลง',
      },
      'amazon-kiro': {
        name: 'Amazon Kiro',
        whatItDoesWell:
          'IDE และ CLI แบบเอเจนต์ ที่สเปกไหลจากความต้องการสไตล์ EARS ไปสู่การออกแบบและงาน พร้อมไฟล์ steering และ hook ที่ทำงานตามเหตุการณ์ของ editor และสร้างสเปกให้กับโค้ดเบสที่มีอยู่แล้วเพื่อจับช่องว่างของความต้องการก่อนเริ่มออกแบบ',
        audience:
          'นักพัฒนาที่ต้องการการพัฒนาแบบขับเคลื่อนด้วยสเปกในตัว editor ของตน พร้อมเครื่องมือที่มี AWS หนุนหลัง',
      },
      'bmad-method': {
        name: 'BMAD Method',
        whatItDoesWell:
          'เฟรมเวิร์ก agile ของบทบาท agent เฉพาะทาง (วิเคราะห์ ผลิตภัณฑ์ สถาปัตยกรรม พัฒนา คุณภาพ) ซึ่งผลิตบรีฟ ความต้องการ เอกสารสถาปัตยกรรม และไฟล์ story พร้อม Definition of Done ที่กำหนดให้ทุก story ต้องผ่านการทบทวนจากเพื่อนร่วมทีมหรือ AI peer reviewer ก่อนจึงจะถือว่าเสร็จ',
        audience:
          'ทีมที่ชอบพิธีกรรมตามบทบาท และต้องการวงจร agile ครบทั้งหมดสำหรับงานของ agent',
      },
      superpowers: {
        name: 'Superpowers',
        whatItDoesWell:
          'ไลบรารีสกิลและเวิร์กโฟลว์สำหรับระดมสมอง วางแผนเป็นขั้นเล็ก ๆ แบบทดสอบก่อน ลงมือด้วยเอเจนต์ย่อย และทบทวนก่อนเสร็จสิ้น เชื่อมต่อกับ coding-agent host มากกว่าทางเลือกอื่นใดในหน้านี้ พร้อมการทบทวนโดยเอเจนต์ย่อยสองขั้นตอน (ตรวจความสอดคล้องกับสเปกก่อน แล้วจึงตรวจคุณภาพโค้ด) ในทุกงาน',
        audience: 'นักพัฒนาที่ต้องการการลงมือแบบทดสอบนำที่มีวินัยภายใน coding agent ของตน',
      },
      'get-shit-done': {
        name: 'GSD Core',
        whatItDoesWell:
          'ระบบวางแผนที่มีไดเรกทอรี .planning รหัสความต้องการ แผนแบ่งเฟส การรันด้วยคอนเท็กซ์ใหม่ และการตรวจสอบเทียบกับผลลัพธ์ที่ผู้ใช้สังเกตเห็นได้ซึ่งดึงมาจากสรุปของแต่ละแผน ออกแบบมาเพื่อต่อสู้กับ "context rot" โดยรันการค้นคว้า วางแผน และดำเนินการในซับเอเจนต์แบบใช้แล้วทิ้ง พร้อมตรวจจับการตรวจสอบที่ล้าสมัยด้วยการตรวจลายนิ้วมือของเนื้อหา',
        audience:
          'นักพัฒนาอิสระและทีมเล็กที่ต้องการ context engineering และการตรวจสอบโดยมีพิธีกรรมน้อย',
      },
      'gentle-ai': {
        name: 'Gentle-AI',
        whatItDoesWell:
          'ปรับแต่ง coding agent ที่คุณใช้อยู่แล้วด้วยหน่วยความจำถาวรที่จัดเส้นทางข้ามเซสชันและโมเดลได้ด้วย สกิลที่คัดสรร MCP server บุคลิก (persona) และ Spec-Driven Development หรือ Receipt-Driven Development แบบเลือกใช้ได้ การตั้งค่าจะถูกเขียนลงในการตั้งค่าส่วนกลางของ agent เป็นค่าเริ่มต้น ส่วนการติดตั้งแบบจำกัดขอบเขต workspace เป็นทางเลือก',
        audience:
          'นักพัฒนาที่ต้องการระบบนิเวศ agent ที่ตั้งค่าไว้แล้ว ซึ่งจดจำงานข้ามเซสชันได้ และสามารถสร้างหลักฐานได้เมื่อต้องการ',
      },
      'claude-ai-native-sdlc': {
        name: "Claude's AI-native SDLC",
        whatItDoesWell:
          'ลูปหกขั้นตอนจาก Plan และ Design ไปจนถึง Build, Test, Deploy และ Maintain โดยมีการอนุมัติจากมนุษย์เป็นเงื่อนไขในทุกขั้นตอน อาร์ติแฟกต์ที่คงทนถูก commit เข้าที่เก็บโค้ดระหว่างขั้นตอน มีการทบทวนเฉพาะด้านความปลอดภัยก่อนการ deploy และมีการประเมินผลต่อเนื่องที่เผยแพร่ตัวชี้วัดการส่งมอบทั้งเชิงคาดการณ์ล่วงหน้าและเชิงผลลัพธ์',
        audience:
          'ทีมที่กำลังประเมิน playbook การส่งมอบซอฟต์แวร์แบบครบวงจรของ Claude Code และลูปข้อเสนอแนะจากการใช้งานจริง',
      },
      'vendor-native': {
        name: 'Vendor-native plan modes',
        whatItDoesWell:
          'ผลิตภัณฑ์ agent อาจมีโหมดวางแผน ไฟล์คำแนะนำ และสกิลที่สร้างขึ้นบนมาตรฐานเปิดข้ามผู้ให้บริการอย่าง AGENTS.md และ Agent Skills แม้พฤติกรรมของโหมดวางแผนที่แท้จริงจะยังขึ้นอยู่กับผู้ให้บริการ ไคลเอนต์ และเวอร์ชัน โดยเฉพาะ Agent Skills ที่โหลดเพียงสรุปสั้น ๆ ตอนเริ่มต้น และโหลดคำแนะนำแบบเต็มเมื่อถูกเรียกใช้งานเท่านั้น ทำให้ความสามารถที่ยังไม่ใช้ไม่กินพื้นที่คอนเท็กซ์',
        audience:
          'ทุกคนที่ต้องการการวางแผนภายใน agent เดียว โดยไม่ต้องรับระเบียบวิธีเพิ่มเติม',
      },
    },
    aiNative: {
      title: 'ตำแหน่งของสิ่งนี้ใน AI-native SDLC',
      body: 'Playbook AI-native SDLC ของ Claude อธิบายลูปที่ครบวงจร: Plan, Design, Build, Test, Deploy และ Maintain แต่ละขั้นตอนจะ commit อาร์ติแฟกต์ให้ขั้นตอนถัดไปอ่านต่อ พร้อมการอนุมัติจากมนุษย์ในทุกขั้นตอนและการทบทวนความปลอดภัยโดยเฉพาะก่อนการ deploy ขณะที่ข้อเสนอแนะจากการใช้งานจริงกลายเป็นความตั้งใจใหม่',
      shared:
        'DWP มีแนวคิดร่วมกันเรื่องอาร์ติแฟกต์ที่คงทนและการอนุมัติแบบมีเงื่อนไข: ความตั้งใจกลายเป็นแผน งานทิ้งหลักฐานไว้ มีการทบทวนความปลอดภัยก่อนเสร็จสิ้น และที่เก็บโค้ดยังคงอ่านได้สำหรับ agent ถัดไป',
      boundary:
        'ความแตกต่างที่แท้จริงอยู่ที่ขอบเขต ไม่ใช่ความเข้มงวด: playbook นี้สร้างขึ้นโดยเฉพาะสำหรับ Claude Code ในขณะที่ harness และรูปแบบแผนของ DWP ถูกอ่านได้โดย agent ใดก็ตามที่ทำตามมาตรฐาน AGENTS.md และ Agent Skills playbook นี้ยังครอบคลุมการประเมินผลต่อเนื่องและการดำเนินงานจริง ซึ่ง DWP ไม่ได้อ้างว่ามี แนวปฏิบัติด้านการดำเนินงานเหล่านั้นสามารถเสริมที่เก็บโค้ดที่ใช้ DWP ได้ แทนที่จะแข่งขันกัน',
      sourceLabel: "Read Claude's AI-native SDLC playbook",
    },
    profileCta: 'ดูการเปรียบเทียบ',
    profile: {
      backLabel: 'Back to all alternatives',
      eyebrow: 'Alternative profile',
      compareWith: 'Compared with Deep Work Plan',
      fitTitle: 'Where it fits',
      capabilityTitle: 'Capability snapshot',
      sourceLabel: 'Official documentation',
    },
    dwpStrengths: {
      title: 'สิ่งที่ Deep Work Plan นำมา',
      items: [
        {
          title: 'ไม่ผูกกับเครื่องมือและอยู่ใน repository',
          body: 'harness และแผนเป็นไฟล์ใน repository ของคุณ ซึ่ง agent ใดก็ตามที่ทำตามมาตรฐาน AGENTS.md และ Agent Skills อ่านได้ การสลับ agent ไม่ทำให้แผนสูญหาย',
        },
        {
          title: 'การตรวจสอบที่เลือกจากสิ่งที่แต่ละงานแตะต้อง',
          body: 'ทุกงานประกาศพื้นผิวที่แตะต้องของตัวเอง แล้วรันการทดสอบของพฤติกรรมที่เปลี่ยนและผู้ใช้มัน ขยายไปถึงชุดทดสอบทั้งหมดเมื่อผลกระทบกำหนดขอบเขตไม่ได้ การทดสอบที่เลือกเป็นศูนย์ไม่เคยนับว่าผ่าน',
        },
        {
          title: 'Final Review เดียวพร้อมการตรวจความปลอดภัย',
          body: 'แผนปิดลงด้วยการตรวจความปลอดภัยของชุดการเปลี่ยนแปลงสะสม รวมถึงการตรวจ diff ในเครื่องที่จำเป็น และการตรวจสอบสถานะสุดท้าย ข้อค้นพบระดับ critical บล็อกการเสร็จสิ้น',
        },
        {
          title: 'สถานะที่รอดข้ามเซสชันและ agent',
          body: 'เช็กบ็อกซ์ใน README บันทึกของแต่ละงาน ดัชนีการทำงานที่จำกัดขอบเขต และไฟล์สถานะที่เครื่องอ่านได้ ถูกเขียนที่ทุกจุดต่อเนื่อง เซสชันอื่นหรือ agent อื่นจึงทำต่อจากดิสก์ได้ แม้แผนที่ถูกขัดจังหวะระหว่างสร้างก็กู้คืนได้',
        },
        {
          title: 'ตัวตรวจสอบความสอดคล้องสำหรับตัว repository เอง',
          body: 'สคริปต์แบบอ่านอย่างเดียวตรวจสอบ harness และทุกแผนเทียบกับข้อกำหนด เข้าใจวงจรชีวิตของแผนทั้งสองแบบ และออกด้วย exit code ที่เป็นมิตรกับ CI',
        },
        {
          title: 'ปริมาณคำสั่งที่โหลดถูกวัดและเผยแพร่',
          body: 'สคริปต์ที่คอมมิตไว้วัดว่าแต่ละโฟลว์โหลดกี่ไบต์ ผลลัพธ์ รวมถึงตัวเลขที่เพิ่มขึ้น ถูกเผยแพร่เป็นไบต์ ไม่เคยเป็นเปอร์เซ็นต์ของโทเคนหรือต้นทุน',
        },
      ],
    },
    honestLimits: {
      title: 'ข้อจำกัดที่ซื่อสัตย์',
      body: 'Deep Work Plan ไม่มีกลไกสเปกแบบมีชีวิตหรือแบบเดลต้า ด้านนั้น OpenSpec และเครื่องมือทำนองเดียวกันทำได้ดีกว่า ยังไม่มี benchmark อิสระของระเบียบวิธี การประเมินสาธารณะแบบลงทะเบียนล่วงหน้าอยู่ในแผน ทะเบียนปริมาณคำสั่งวัดเฉพาะไบต์ที่โหลด ไม่ใช่โทเคน ต้นทุน หรือผลลัพธ์ DWP จำกัดขอบเขตไว้ที่ระดับที่เก็บโค้ดโดยตั้งใจ: มันไม่ใช่ระบบหน่วยความจำข้ามโปรเจกต์ ไม่ใช่เฟรมเวิร์ก agent แบบแบ่งบทบาท และไม่ใช่ IDE จึงไม่แข่งขันในแกนเหล่านั้นเช่นกัน — จับคู่กับเครื่องมือที่ครอบคลุมด้านนั้นเมื่องานต้องการความสามารถนั้นจริง ๆ',
    },
    correction: {
      title: 'ช่วยกันรักษาความถูกต้องของหน้านี้',
      body: 'หน้านี้ถูกตรวจทานในวันที่ที่แสดงไว้ และแก้ไขเมื่อได้รับคำขอ หากคำอธิบายเครื่องมือของคุณล้าสมัยหรือไม่ครบถ้วน เปิด issue แล้วเราจะแก้ไขให้',
      ctaLabel: 'เปิด issue',
    },
    sourcesTitle: 'แหล่งอ้างอิง',
  },

  trustPage: {
    meta: {
      title: 'ความน่าเชื่อถือและความปลอดภัย',
      description:
        'ทำไม Deep Work Plan จึงปลอดภัยต่อการนำไปใช้: โอเพนซอร์สและ MIT ใช้ Markdown เป็นหลักโดยไม่มีการเรียกเครือข่ายหรือเก็บข้อมูลการใช้งาน ไม่ทำลายข้อมูลตามการออกแบบ มีการติดตั้งที่ตรวจสอบได้ และมีนโยบายการเปิดเผยช่องโหว่ที่ชัดเจน',
    },
    eyebrow: 'ความน่าเชื่อถือและความปลอดภัย',
    title: 'ความน่าเชื่อถือและความปลอดภัย',
    intro:
      'ไม่ควรมีใครติดตั้งสกิลที่ตัวเองเชื่อถือไม่ได้ Deep Work Plan ถูกสร้างให้ตรวจสอบได้ ไม่ใช่ให้เชื่อโดยสุจริต: โอเพนซอร์ส ใช้ Markdown เป็นหลัก ไม่ทำลายข้อมูล และตรวจสอบได้ก่อนรัน หน้านี้อธิบายตรง ๆ ว่ามันทำอะไร ไม่ทำอะไร และยืนยันทั้งสองอย่างได้อย่างไร',
    pillarsTitle: 'สิ่งที่คุณกำลังวางใจ',
    pillars: [
      {
        title: 'โอเพนซอร์สและอนุญาตสิทธิ์ MIT',
        body: 'ทั้งเว็บไซต์และสกิลเป็นสาธารณะและสามารถ diff ได้ คุณสามารถอ่านทุกบรรทัดก่อนรัน และเปรียบเทียบสำเนาใดก็ได้กับซอร์สที่ tagged release',
      },
      {
        title: 'Markdown เป็นหลัก — ไม่มีเครือข่าย ไม่มีการเก็บข้อมูลการใช้งาน',
        body: 'สกิลไม่มี CLI ไม่มี HTTP API และไม่มีขั้นตอนการยืนยันตัวตน มันไม่เรียกเครือข่ายและไม่ส่งข้อมูลการใช้งาน ตัวช่วยในเครื่องเพียงตัวเดียวอ่านข้อมูล git และ metadata ของสภาพแวดล้อม ไม่มีข้อมูลใด ๆ เกี่ยวกับ repository ของคุณออกจากเครื่องของคุณ',
      },
      {
        title: 'ไม่ทำลายข้อมูลตามการออกแบบ',
        body: 'สิ่งเดียวที่สกิลทำซึ่งเกี่ยวข้องกับความปลอดภัยคือการเปลี่ยน repository ของคุณ และมันประสานแทนที่จะเขียนทับ มันตรวจสอบว่ามีอะไรอยู่แล้ว เสนอแผน และถามก่อนแทนที่สิ่งใด ผลลัพธ์ของแผนอยู่ในไดเรกทอรี .dwp/ ที่ถูก gitignore ไว้',
      },
      {
        title: 'ไม่แตะความลับ',
        body: 'ระเบียบวิธีไม่เคยคอมมิตความลับและเก็บสถานะการทำงานไว้นอกการควบคุมเวอร์ชัน การเริ่มต้นต่อท้าย .gitignore แทนที่จะเขียนใหม่ และทุกการเปลี่ยนแปลงมีไว้เพื่อตรวจทานใน diff เล็ก ๆ ที่อ่านได้',
      },
      {
        title: 'สามารถตรวจสอบแหล่งที่มาได้',
        body: 'ทุก release เผยแพร่ checksum สำหรับสกิลที่ส่งมา คุณจึงยืนยันได้ว่าสำเนาที่ดาวน์โหลดตรงกับที่เผยแพร่ก่อนที่จะวางใจมัน',
      },
    ],
    verifyTitle: 'ตรวจสอบก่อนรัน',
    verifyIntro:
      'ปฏิบัติต่อสกิลว่าไม่น่าเชื่อถือจนกว่าคุณจะตรวจสอบแล้ว ทุก release แนบไฟล์ SHA256SUMS ที่ครอบคลุมสกิลที่ส่งมา ดาวน์โหลดสำหรับเวอร์ชันที่คุณต้องการติดตั้ง แล้วตรวจสอบว่าสำเนาของคุณตรงกัน ค่า exit ที่ไม่ใช่ศูนย์หมายความว่าไฟล์ไม่ตรงกันและคุณควรหยุด',
    codeLabel: 'shell',
    verifyNote:
      'Release ถูกตรวจสอบด้วย checksum ไม่ใช่ลายเซ็น การลงนาม (cosign หรือ maintainer GPG) เป็นขั้นตอนถัดไปที่ได้รับการจัดทำเป็นเอกสาร ไม่ใช่สิ่งที่อ้างในปัจจุบัน เนื่องจากทุกอย่างเปิดเผย คุณยังสามารถ diff ไฟล์ใดก็ได้กับ repository ที่ tag ของมัน',
    disclosureTitle: 'รายงานช่องโหว่',
    disclosureBody:
      'พบปัญหาด้านความปลอดภัย? รายงานเป็นการส่วนตัวผ่านระบบรายงานช่องโหว่แบบส่วนตัวของ GitHub ใน repository ที่เกี่ยวข้อง — สกิลหรือเว็บไซต์ (ดูนโยบายความปลอดภัยที่ลิงก์ด้านล่าง) — แทนที่จะเปิด issue สาธารณะซึ่งจะเปิดเผยปัญหาก่อนที่จะมีการแก้ไข',
    resourcesTitle: 'ทรัพยากรความน่าเชื่อถือ',
    linkManifest: 'Manifest ความน่าเชื่อถือที่อ่านด้วยเครื่องได้',
    linkSecurityTxt: 'security.txt (RFC 9116)',
    linkPolicy: 'นโยบายความปลอดภัยของเว็บไซต์',
    linkSkillPolicy: 'นโยบายความปลอดภัยของสกิลและแบบจำลองภัยคุกคาม',
    limitationsTitle: 'ข้อจำกัดที่ซื่อสัตย์',
    limitations: [
      'Release ถูกตรวจสอบด้วย checksum แต่ยังไม่ได้ลงนามทางเข้ารหัส การลงนามมีแผนแต่ยังไม่ได้ดำเนินการ',
      'Deep Work Plan รัน coding agent อิสระกับ repository ของคุณ ตรวจทานแผนที่เสนอและ diff ของมัน ระเบียบวิธีถูกออกแบบมาสำหรับการตรวจทานนั้น ไม่ใช่เพื่อแทนที่',
      'การอ้างสิทธิ์ความน่าเชื่อถือที่นี่อธิบายเฉพาะแหล่งทางการเท่านั้น สำเนาที่ถูกดัดแปลงหรือสำเนาจากบุคคลที่สามซึ่งแตกต่างจาก repository ไม่มีการรับประกันเหล่านี้ ตรวจสอบก่อน',
    ],
    ctaTitle: 'นำไปใช้ด้วยความมั่นใจ',
    ctaBody:
      'อ่านระเบียบวิธีและข้อกำหนด ชี้ agent ไปที่ init endpoint และตรวจสอบการติดตั้งก่อนรัน',
    ctaPrimary: 'อ่านระเบียบวิธี',
    ctaSecondary: 'การนำไปใช้ (init)',
  },

  // Deep Work Plan — Init / adoption endpoint
  initPage: {
    meta: {
      title: 'Init — Make your repository AI-first',
      description:
        'Adopt the Deep Work Plan methodology in any repository. Install the skill, run agent onboarding, then plan and execute with any AI coding agent.',
    },
    eyebrow: 'Adoption',
    title: 'Make this repository AI-first',
    intro:
      'One endpoint to turn any repository into a spec-driven, agent-ready codebase. Install the skill, let an agent onboard the repo, then plan and execute structured work with any coding agent.',
    handoffTitle: 'คัดลอกไปยัง agent ของคุณ',
    handoffBody:
      'คัดลอก prompt ของ init.md ทั้งหมดและวางลงใน AI coding agent ของคุณ — Claude Code, Cursor, Codex หรืออื่น ๆ โดยมันจะอ่านระเบียบวิธีและข้อกำหนด ติดตั้ง skill และทำ onboarding ให้กับ repository นี้สำหรับ Deep Work Plan',
    handoffInstruction:
      'อ่านและทำตามคำแนะนำที่ https://deepworkplan.com/init.md เพื่อทำให้รีพอซิทอรีนี้เป็น AI-first',
    handoffMdLabel: 'Self-contained agent prompt',
    codeLabel: 'agent',
    whatTitle: 'What this does',
    whatBody: [
      'Adoption changes the repository in two durable ways — the pillars of the methodology.',
      'First, the repository becomes spec-driven: work begins from a written plan and specification, not from ad-hoc prompts. Second, the repository itself becomes the agent harness — an AGENTS.md, a docs/ knowledge base, per-module docs, and a .agents/ skill home (with the .claude → .agents and .cursor → .agents symlinks) give every agent the context and commands it needs.',
    ],
    sequenceTitle: 'The adoption sequence',
    orLabel: 'or',
    steps: [
      {
        title: 'ตรวจสอบก่อนติดตั้ง',
        description:
          'ปฏิบัติต่อพรอมต์และสกิลว่าเป็นสิ่งที่ไม่น่าเชื่อถือจนกว่าจะได้ตรวจสอบ ทั้งสองเป็นโอเพนซอร์สและ MIT สกิลเป็น Markdown-first ไม่มีการเรียกเครือข่ายและไม่มีการเก็บข้อมูลการใช้งาน ทุกรีลีสเผยแพร่ SHA256SUMS สำหรับสกิลที่ส่งมา คุณจึงสามารถยืนยันว่าสำเนาของคุณตรงกันก่อนรัน รีลีสถูกตรวจสอบด้วย checksum ไม่ใช่ลายเซ็น (การลงนามเป็นขั้นตอนถัดไปที่ได้รับการจัดทำเป็นเอกสาร)',
        commands: [
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill\ncurl -fsSL -o SHA256SUMS https://github.com/DailybotHQ/deepworkplan-skill/releases/download/vX.Y.Z/SHA256SUMS\n./setup.sh --verify',
        ],
      },
      {
        title: 'ติดตั้งสกิล',
        description:
          'เพิ่มสกิล Deep Work Plan เพื่อให้ agent ใดก็ได้สามารถวางแผนและดำเนินงานที่มีโครงสร้าง สกิลประกอบด้วย router และสกิลย่อยแปดตัว ได้แก่ create, execute, refine, resume, status, verify, onboard และ author',
        commands: [
          'npx skills add DailybotHQ/deepworkplan-skill',
          'openclaw skills install deepworkplan',
          'git clone https://github.com/DailybotHQ/deepworkplan-skill.git && cd deepworkplan-skill && ./setup.sh',
        ],
      },
      {
        title: 'รันการ onboard repository',
        description:
          'เรียกสกิลย่อย onboard และให้ agent วิเคราะห์ repo จริง ได้แก่ สแตก ตัวจัดการแพ็กเกจ และคำสั่งตรวจสอบจริง จากนั้นจะสร้าง AGENTS.md, ฐานความรู้ docs/, เอกสารแต่ละโมดูล และโฮม .agents/ ข้ามเอเจนต์ (พร้อม symlink .claude → .agents และ .cursor → .agents), ต่อสายคำสั่ง dwp-* แบบบาง และสร้างโครง .dwp/ ที่ถูก gitignore สำหรับแผน สำหรับ repo ขนาดใหญ่ สกิลย่อย onboard ใช้เส้นทางแบบขับเคลื่อนด้วยแผน: ทำการสำรวจก่อน จากนั้นสร้าง Deep Work Plan สำหรับการ onboarding ไม่มีอะไรเป็นเทมเพลต ทุกอย่างถูกปรับให้เหมาะกับ repository ของคุณ',
        commands: ['/deepworkplan-onboard'],
      },
      {
        title: 'การรีวิวในเครื่องและ addon แบบสมัครใจ',
        description:
          'การ onboarding จะติดตั้งการรีวิวในเครื่องที่จำเป็นของ AI Diff Reviewer (เกต CI ยังคงเป็นทางเลือก) และเสนอ addon แบบสมัครใจสี่ตัว ได้แก่ devcontainer, Dailybot, dependency-upgrade และ design-system ซึ่งคุณรับมาเฉพาะเมื่อเหมาะสม repo สอดคล้องอย่างสมบูรณ์โดยมี addon เสริมศูนย์ตัว ใช้ /skill-create และ /agent-create (สกิลย่อย author) เพื่อสร้างสกิล agent และคำสั่งที่เหมาะกับสแตกเกินกว่าชุดพื้นฐาน',
      },
      {
        title: 'วางแผนและดำเนินการ',
        description:
          'สร้าง Deep Work Plans ด้วย /dwp-create และรันด้วย /dwp-execute จากนั้นใช้ /dwp-status, /dwp-refine, /dwp-resume และ /dwp-verify ตามความคืบหน้าของงาน แต่ละแผนมีงานที่มีหมายเลข gate การตรวจสอบ และโปรโตคอลการเสร็จสิ้น และปิดด้วย Final Review บังคับเพียงหนึ่งงาน (การตรวจความปลอดภัย การตรวจสถานะสุดท้าย และการกระทบยอดการตัดสินใจสกิล) Executive Report ยังพร้อมให้ใช้เมื่อคุณร้องขอ',
      },
      {
        title: 'ตรวจสอบความสอดคล้อง',
        description:
          'รัน /dwp-verify เพื่อรับรายงานผ่าน/ไม่ผ่านอย่างเป็นกลางเทียบกับสเปก ยืนยันว่า AGENTS.md, docs/ (มีเนื้อหาจริง ไม่ใช่ stub), .agents/ (มี delegator dwp-* แบบบางและ catalog ที่ตรงกับดิสก์), .dwp/ และ tmp/ อยู่ในที่ — ไม่มีอะไรเป็นเทมเพลต ทุกอย่างถูกคิดมาสำหรับ repo นี้',
        commands: ['/dwp-verify'],
      },
    ],
    outcomeTitle: 'The outcome',
    outcome:
      'The repository becomes spec-driven and the repository itself becomes the agent harness — context and commands travel with the code.',
    nextStepsTitle: 'Read next',
    nextSteps: [
      { label: 'Quickstart', href: '/quickstart' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Spec', href: '/spec' },
      { label: 'Kit', href: '/kit' },
    ],
  },

  // Developers — agent & developer surface
  developersPage: {
    meta: {
      title: 'นักพัฒนา — agent API, MCP server และเอกสารของ Deep Work Plan',
      description:
        'ส่วนติดต่อสำหรับ agent ของ Deep Work Plan: API แบบอ่านอย่างเดียว ไร้การยืนยันตัวตน พร้อมสเปก OpenAPI, MCP server, Markdown 17 ภาษา และ npx skills CLI',
    },
    eyebrow: 'ส่วนติดต่อสำหรับ agent และนักพัฒนา',
    title: 'Deep Work Plan สำหรับนักพัฒนาและ AI agent',
    intro:
      'deepworkplan.com จัดส่วนติดต่อที่อ่านได้ด้วยเครื่องควบคู่กับหน้าเว็บของตัวเอง: agent API ที่อธิบายด้วย OpenAPI, MCP server แบบ stateless, มิเรอร์ Markdown ต้นฉบับของทุกหน้าใน 17 ภาษา และสกิล DWP ที่ติดตั้งได้ ทุกอย่างในหน้านี้ใช้งานได้จริง เปิดกว้าง และฟรี — ไม่มีอะไรต้องสมัคร',
    accessTitle: 'ไร้การยืนยันตัวตนโดยการออกแบบ',
    accessIntro:
      'ไม่มี API key ต้องสร้าง ไม่มีกระบวนการ OAuth และไม่มี sandbox แยกจาก production — พื้นที่ให้บริการจริงของ production ตัวเองคือ sandbox นี่คือคุณสมบัติที่ตั้งใจไว้ของระเบียบวิธี: agent กรอกแบบฟอร์ม "contact sales" ไม่ได้ เว็บไซต์จึงไม่ขอสิ่งนั้นเลย',
    accessPoints: [
      {
        title: 'อ่านอย่างเดียว',
        body: 'ทุกการดำเนินการเป็น GET ที่ปลอดภัยและแคชได้ — ยกเว้น endpoint ของ MCP ซึ่งเป็น POST ไม่มีการเขียน อัปโหลด หรือเปลี่ยนแปลงสถานะใด ๆ ทั้งสิ้น',
      },
      {
        title: 'ไม่มี API key',
        body: 'ไม่ต้องสมัคร ไม่มีโทเคน ไม่มีระดับ rate limit การเข้าถึงแบบไม่ระบุตัวตนคือสัญญาที่บันทึกไว้ในเอกสาร ประกาศไว้ใน /auth.md และ stub การค้นพบ OAuth',
      },
      {
        title: 'ฟรีและโอเพนซอร์ส',
        body: 'เนื้อหาของเว็บไซต์และสกิล DWP อยู่ภายใต้สัญญาอนุญาต MIT ใช้ในงานเชิงพาณิชย์และไม่เชิงพาณิชย์ได้โดยไม่ต้องขออนุญาต',
      },
      {
        title: 'Machine-first',
        body: 'JSON error แบบมีโครงสร้างบนเส้นทาง /api, เนื้อหา 404 แบบกู้คืนด้วย Markdown, แค็ตตาล็อก API ตาม RFC 9727 และแมนิเฟสต์ความสามารถ ARD — สร้างมาเพื่อให้ agent บริโภค',
      },
    ],
    endpointsTitle: 'Endpoint',
    endpointsIntro:
      'endpoint หลักของ agent API ข้อกำหนดฉบับเต็มที่มีชนิดข้อมูลครบทุกการดำเนินการ พารามิเตอร์ และสคีมาการตอบกลับ อยู่ที่เอกสาร OpenAPI',
    endpointsNote:
      'เส้นทาง /api/* ที่ไม่รู้จักจะคืน JSON error แบบมีโครงสร้างพร้อมคำแนะนำแก้ปัญหา ไม่เคยคืนหน้า error แบบ HTML',
    endpoints: [
      {
        method: 'GET',
        path: '/openapi.json',
        description: 'ข้อกำหนด OpenAPI 3.1 ของ agent API ทั้งหมด',
      },
      {
        method: 'GET',
        path: '/llms.txt',
        description: 'ดัชนีคำแนะนำ LLM ที่คัดสรรแล้ว — จุดเริ่มต้นที่แนะนำสำหรับ agent',
      },
      {
        method: 'GET',
        path: '/init.md',
        description:
          'พรอมต์การรับเอา DWP อย่างเป็นทางการ (ทำให้ repository ใดก็ได้เป็น AI-first)',
      },
      {
        method: 'GET',
        path: '/{page}.md',
        description:
          'หน้าใดก็ได้ในรูป Markdown ต้นฉบับ — ครบทั้ง 17 ภาษา (เช่น /es/developers.md)',
      },
      {
        method: 'GET',
        path: '/api/health.json',
        description: 'ตัวบ่งชี้สถานะสุขภาพแบบคงที่ พร้อมลิงก์ไปยังสเปกและพอร์ทัลนี้',
      },
      {
        method: 'POST',
        path: '/api/mcp',
        description:
          'MCP server (Streamable HTTP, stateless): initialize, ping, tools/list, tools/call',
      },
      {
        method: 'GET',
        path: '/.well-known/ai-catalog.json',
        description: 'แมนิเฟสต์ความสามารถ ARD — agentmap ที่ประกาศไว้ใน robots.txt',
      },
    ],
    mcpTitle: 'MCP server',
    mcpIntro:
      'Model Context Protocol server แบบ stateless ผ่าน Streamable HTTP เครื่องมือแบบอ่านอย่างเดียวสามตัว: get_init_prompt, list_site_sections และ read_page รองรับเวอร์ชันโปรโตคอล 2025-03-26 และ 2025-06-18 และไม่ต้องมีเซสชัน',
    mcpCodeLabel: 'เทอร์มินัล — JSON-RPC ผ่าน HTTP',
    mcpNote:
      'แมนิเฟสต์ MCP อยู่ที่ /.well-known/mcp.json และการ์ด server อยู่ที่ /.well-known/mcp/server-card.json — Claude, ChatGPT และไคลเอนต์ MCP ใดก็ได้เรียกใช้เครื่องมือเหล่านี้ได้โดยตรง',
    markdownTitle: 'Markdown สำหรับ agent',
    markdownIntro:
      'ทุกหน้าที่เรนเดอร์ถูกเผยแพร่เป็น Markdown ต้นฉบับ — ไม่ใช่การแปลงจาก HTML ขอ Markdown อย่างชัดเจนด้วยคำต่อท้าย URL หรือผ่านการเจรจาเนื้อหา HTTP บนหน้าใดก็ได้',
    markdownCodeLabel: 'เทอร์มินัล — การเจรจาเนื้อหา',
    markdownNote:
      'การเจรจาเนื้อหาคืน Markdown ต้นฉบับชุดเดียวกับที่เว็บไซต์ใช้เรนเดอร์ ในภาษาของ URL ที่คุณร้องขอ',
    cliTitle: 'ติดตั้งชุดเครื่องมือ',
    cliIntro:
      'เส้นทางติดตั้งอย่างเป็นทางการของสกิล Deep Work Plan — คำสั่งเดียวกับที่ endpoint /init มอบให้ agent ใช้ได้กับ coding agent ใดก็ตามที่รองรับ skills (Claude Code, Cursor, Codex, Gemini และอื่น ๆ)',
    cliCodeLabel: 'เทอร์มินัล — skills CLI',
    cliNote:
      'สกิลถูกฝังไปที่ .agents/skills/deepworkplan/ ภายใน repository ของคุณ จึงทำให้ agent ทุกตัวที่แตะ repo นี้ใช้ระเบียบวิธีเดียวกัน',
    resourcesTitle: 'ทรัพยากรที่อ่านได้ด้วยเครื่อง',
    resources: [
      {
        label: 'สเปก OpenAPI (/openapi.json)',
        href: '/openapi.json',
      },
      {
        label: 'คำประกาศการเข้าถึงและการยืนยันตัวตนของ agent (/auth.md)',
        href: '/auth.md',
      },
      {
        label: 'แค็ตตาล็อก API, RFC 9727 (/.well-known/api-catalog)',
        href: '/.well-known/api-catalog',
      },
      {
        label: 'แมนิเฟสต์ MCP (/.well-known/mcp.json)',
        href: '/.well-known/mcp.json',
      },
      {
        label: 'ช่องทางติดต่อด้านความปลอดภัย (/.well-known/security.txt)',
        href: '/.well-known/security.txt',
      },
      {
        label: 'ตัวบอกรายละเอียด repo ของเว็บไซต์ (/.well-known/dwp.json)',
        href: '/.well-known/dwp.json',
      },
    ],
    ctaTitle: 'ชี้ agent ตัวหนึ่งมาที่นี่',
    ctaBody:
      'เส้นทางที่เร็วที่สุดยังคงเป็นหนึ่งบรรทัด: มอบพรอมต์ /init ให้ coding agent ตัวใดก็ได้ แล้วมันจะติดตั้งสกิล ออนบอร์ด repository ของคุณ และเริ่มทำงานเชิงลึกจนเสร็จ',
    ctaPrimary: 'เปิดพรอมต์ /init',
    ctaSecondary: 'อ่านระเบียบวิธี',
  },

  // Privacy policy
  privacyPage: {
    meta: {
      title: 'ความเป็นส่วนตัว — Deep Work Plan',
      description:
        'นโยบายความเป็นส่วนตัวของ deepworkplan.com: เว็บไซต์แบบสถิตที่ไม่มีบัญชี ไม่มีโฆษณา สถิติแบบไร้คุกกี้ และแบบฟอร์มติดต่อเก็บข้อมูลอะไรบ้าง',
    },
    eyebrow: 'นโยบายความเป็นส่วนตัว',
    title: 'ความเป็นส่วนตัวบน deepworkplan.com',
    intro:
      'Deep Work Plan เป็นเว็บไซต์เอกสารและระเบียบวิธีแบบสถิต หน้านี้อธิบายอย่างตรงไปตรงมาและครบถ้วนว่าเว็บไซต์สัมผัสข้อมูลใดบ้างเมื่อคุณเข้าเยี่ยมชม: ในนั้นไม่มีระบบบัญชีผู้ใช้ ไม่มีโฆษณา และไม่มีการติดตามข้ามไซต์เลย',
    lastUpdated: '8 กันยายน 2026',
    sections: [
      {
        heading: 'เว็บไซต์นี้คืออะไร',
        body: 'deepworkplan.com คือชุดหน้าเว็บแบบสถิตที่ให้บริการผ่าน CDN ไม่มีการล็อกอิน ไม่มีฐานข้อมูลผู้ใช้ และไม่มีทางให้เว็บไซต์จัดเก็บโปรไฟล์ส่วนบุคคล เนื้อหาพัฒนาใน repository สาธารณะบน GitHub ภายใต้องค์กร DailybotHQ และทุกอย่างที่คุณอ่านที่นี่ถูกให้บริการตรงตามที่สร้างไว้',
      },
      {
        heading: 'การวิเคราะห์การใช้งาน',
        body: 'เว็บไซต์ใช้ Umami บริการวิเคราะห์การใช้งานแบบไร้คุกกี้ที่ให้ความสำคัญกับความเป็นส่วนตัวก่อน เพื่อนับการเข้าชมหน้าเว็บแบบรวมกลุ่ม Umami ไม่วางคุกกี้ติดตามและไม่สร้างโปรไฟล์ข้ามไซต์ เนื่องจาก crawler ของ AI ไม่รัน JavaScript ฟังก์ชัน edge ฝั่งเซิร์ฟเวอร์จึงบันทึก user agent และเส้นทางของการเยี่ยมชมจากบอตอัตโนมัติเป็นเหตุการณ์วิเคราะห์แบบไม่ระบุตัวตนด้วย — สิ่งนี้ระบุซอฟต์แวร์ crawler (เช่น "GPTBot เยี่ยมชม /init") ไม่ใช่ผู้เยี่ยมชมที่เป็นมนุษย์',
      },
      {
        heading: 'คุกกี้และพื้นที่จัดเก็บในเครื่อง',
        body: 'เว็บไซต์ไม่วางคุกกี้ติดตามใด ๆ สิ่งเดียวที่จัดเก็บในเบราว์เซอร์ของคุณคือค่าตั้งธีม (โหมดสว่างหรือมืด) ใน localStorage ซึ่งไม่เคยออกจากอุปกรณ์ของคุณและไม่ถูกส่งไปที่ใด หากคุณล้างพื้นที่จัดเก็บของเบราว์เซอร์ เว็บไซต์จะกลับไปใช้ธีมเริ่มต้นของระบบคุณ',
      },
      {
        heading: 'บริการภายนอก',
        body: 'การโฮสต์และส่งมอบเนื้อหาทำงานบน Cloudflare Pages ซึ่งประมวลผลบันทึกคำขอและที่อยู่ IP ที่ขอบเครือข่าย (edge) ในฐานะส่วนหนึ่งของการดูแล CDN และการกั้นการใช้งานในทางที่ผิด ภายใต้นโยบายความเป็นส่วนตัวของ Cloudflare เอง การวิเคราะห์แบบรวมกลุ่มทำงานบน Umami (cloud.umami.is) หากคุณส่งแบบฟอร์มติดต่อโดยสมัครใจ คำตอบของคุณจะถูกส่งผ่าน Google Forms ไปยังทีมของเรา — เป็นที่เดียวเท่านั้นที่ข้อมูลที่คุณพิมพ์ถูกเก็บ และใช้เพื่อตอบกลับคุณเท่านั้น',
      },
      {
        heading: 'สิ่งที่เราไม่ทำ',
        body: 'เราไม่ขายหรือแบ่งปันข้อมูลส่วนบุคคล ไม่รันโฆษณาหรือพิกเซลรีมาร์เก็ตติ้ง ไม่ทำ fingerprinting เบราว์เซอร์ และไม่ส่งอีเมลการตลาด เว็บไซต์ไม่มีการสมัครรับจดหมายข่าว และไม่มี telemetry เกินกว่าจำนวนแบบรวมกลุ่มไร้คุกกี้ที่อธิบายไว้ข้างต้น',
      },
      {
        heading: 'ทางเลือกของคุณ',
        body: 'เนื่องจากการวิเคราะห์ที่นี่เป็นแบบรวมกลุ่มและไร้คุกกี้ จึงไม่มีโปรไฟล์ส่วนบุคคลให้ส่งออกหรือลบ คุณบล็อกสคริปต์วิเคราะห์ด้วยตัวบล็อกเนื้อหาใดก็ได้โดยไม่กระทบการทำงานของเว็บไซต์ หากคุณเคยส่งแบบฟอร์มติดต่อและต้องการลบข้อความของคุณ เขียนมาที่อยู่ติดต่อด้านล่างและเราจะลบให้',
      },
      {
        heading: 'การเปลี่ยนแปลงของนโยบายนี้',
        body: 'หากนโยบายนี้เปลี่ยนแปลงอย่างมีนัยสำคัญ วันที่อัปเดตด้านบนของหน้านี้จะเปลี่ยนตามไปด้วย และการแก้ไขที่มีสาระจะถูกคอมมิตไปยัง repository สาธารณะของเว็บไซต์ที่ใครก็ตรวจสอบประวัติได้',
      },
    ],
    contactTitle: 'ติดต่อและความปลอดภัย',
    contactBody:
      'สำหรับคำถามด้านความเป็นส่วนตัว เขียนไปที่ security@dailybot.com หากต้องการรายงานช่องโหว่ด้านความปลอดภัย แนะนำให้ใช้การรายงานช่องโหว่แบบส่วนตัวของ GitHub สำหรับ repository เว็บไซต์และสกิล — ดูที่อยู่ที่แน่นอนได้ใน /.well-known/security.txt',
  },
};
