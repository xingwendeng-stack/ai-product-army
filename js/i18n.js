/**
 * ============================================================
 *  i18n — 中文 / English 双语支持
 * ============================================================
 */
'use strict';

window.I18n = (() => {

    const STORAGE_KEY = 'ai_legion_lang';
    const LANG_ATTR = 'data-i18n';

    // Available languages — add new ones here
    const LANG_NAMES = {
        zh: '中文',
        en: 'English',
        ja: '日本語',
        ko: '한국어',
    };

    // ===== Translation Dictionary =====
    const LANG = {
        zh: {
            /* Meta */
            'meta.title': 'AI产品军团实战 — 普通人如何做出自己的第一个AI产品',
            'meta.desc': '零基础入门AI产品开发，30天从想法到上线，打造属于你自己的AI产品，加入AI产品军团实战',

            /* Nav */
            'nav.mission': '使命',
            'nav.problems': '痛点',
            'nav.roadmap': '实战路径',
            'nav.modules': '课程体系',
            'nav.features': '特色',
            'nav.pricing': '定价',
            'nav.faq': 'FAQ',
            'nav.join': '立即加入',
            'nav.lang': 'English',
            'nav.logo': 'AI产品<span class="highlight">军团</span>',

            /* Hero */
            'hero.badge': '🚀 2026 全新升级',
            'hero.title': '普通人如何做出<br/>自己的第一个 <span class="gradient-text">AI 产品</span>',
            'hero.subtitle': '零基础 · 实战派 · 30天从0到1 —— 不需要会写代码，不需要懂算法，<br class="hide-mobile"/>只需要一个想法和行动的决心，我们陪你从0做出属于你自己的AI产品。',
            'hero.cta': '🔥 立即加入军团',
            'hero.cta2': '了解实战路径 →',
            'hero.scroll': '向下滚动',
            'hero.stat1_label': '军团成员',
            'hero.stat2_label': '已上线产品',
            'hero.stat3_label': '零基础成功率',

            /* Mission */
            'mission.tag': '我们的使命',
            'mission.title': '让每一个普通人都能拥有自己的AI产品',
            'mission.desc': '我们相信，AI时代的最大红利不属于大厂，而属于每一个敢于行动的普通人。',
            'mission.card1.title': '打破技术门槛',
            'mission.card1.desc': '用最通俗的方式讲清楚AI产品从0到1的全过程，让没有技术背景的人也能做出真正的产品。',
            'mission.card2.title': '提供实战路径',
            'mission.card2.desc': '不是枯燥的理论课，而是手把手带你走完从需求分析、产品设计、开发上线到运营推广的全流程。',
            'mission.card3.title': '构建军团生态',
            'mission.card3.desc': '一个人走得快，一群人走得远。在军团中，你可以找到合伙人、获得反馈、一起成长。',

            /* Problems */
            'problems.tag': '常见痛点',
            'problems.title': '你是否也遇到过这些问题？',
            'problems.desc': '我们调研了3000+学员，这是最普遍的困惑',
            'problems.card1.title': '"AI工具太多了，根本学不完"',
            'problems.card1.desc': 'ChatGPT、Claude、Midjourney、Cursor…每天都有新工具，不知道哪个才是真正该学的。',
            'problems.card2.title': '"我不是程序员，能做AI产品吗？"',
            'problems.card2.desc': '总觉得AI产品是技术大牛才能做的事，自己连Python都不会，怎么可能做出来？',
            'problems.card3.title': '"想法很多，但不知道从哪开始"',
            'problems.card3.desc': '脑子里有十几个点子，但一到执行就卡住，缺乏一套从想法到落地的实战方法论。',
            'problems.card4.title': '"学了很多课，还是做不出产品"',
            'problems.card4.desc': '买了99%的课程都停留在理论层面，真正动手时依然无从下手，缺乏实战指导。',

            /* Roadmap */
            'roadmap.tag': '实战路径',
            'roadmap.title': '从0到1的完整实战路径',
            'roadmap.desc': '经过3000+学员验证的四步实战法',
            'roadmap.step1.title': '想出来 — 需求挖掘与产品定义',
            'roadmap.step1.desc': '用AI帮助你找到真实需求、验证市场、定义产品方向。不需要复杂调研，一套模板搞定。',
            'roadmap.step1.item1': '用AI做用户需求调研',
            'roadmap.step1.item2': '快速验证产品idea',
            'roadmap.step1.item3': '定义最小可行产品(MVP)',
            'roadmap.step2.title': '做出来 — 零代码搭建你的AI产品',
            'roadmap.step2.desc': '利用AI编程工具和低代码平台，不需要写代码也能搭建出功能完整的AI产品。',
            'roadmap.step2.item1': '零代码搭建产品原型',
            'roadmap.step2.item2': '用AI辅助写代码(不需要基础)',
            'roadmap.step2.item3': '接入AI能力(API调用)',
            'roadmap.step3.title': '推出去 — 产品上线与冷启动',
            'roadmap.step3.desc': '把产品部署上线，用最低成本获取第一批用户，建立产品反馈闭环。',
            'roadmap.step3.item1': '一键部署上线',
            'roadmap.step3.item2': '低成本获取种子用户',
            'roadmap.step3.item3': '数据驱动迭代优化',
            'roadmap.step4.title': '赚回来 — 商业化与持续增长',
            'roadmap.step4.desc': '从免费到付费，找到产品的商业模式，实现从0到1的收入突破。',
            'roadmap.step4.item1': '定价策略设计',
            'roadmap.step4.item2': '付费转化优化',
            'roadmap.step4.item3': '产品持续增长',

            /* Modules */
            'modules.tag': '课程体系',
            'modules.title': '四大实战模块',
            'modules.desc': '系统化学习路径 + 项目实战',
            'modules.week1.title': 'AI产品基础与思维',
            'modules.week1.item1': 'AI产品全景图：现在能做些什么',
            'modules.week1.item2': '产品思维入门：问题驱动 vs 技术驱动',
            'modules.week1.item3': '用AI来选方向：市场调研实战',
            'modules.week1.item4': '军团项目启动：选定你的第一个项目',
            'modules.week1.output': '确定你的AI产品方向，完成市场验证',
            'modules.week2.title': 'AI原型设计与零代码实现',
            'modules.week2.item1': '用AI设计你的产品界面',
            'modules.week2.item2': '零代码工具实战：搭建产品原型',
            'modules.week2.item3': 'AI编程入门：用自然语言生成代码',
            'modules.week2.item4': '接入AI能力：从API到功能实现',
            'modules.week2.output': '完成产品MVP原型，具备核心功能',
            'modules.week3.title': '产品上线与运营实战',
            'modules.week3.item1': '产品部署与上线全流程',
            'modules.week3.item2': '域名、服务器、配置一站式搞定',
            'modules.week3.item3': '冷启动策略：如何获取第一批用户',
            'modules.week3.item4': '产品数据埋点与迭代优化',
            'modules.week3.output': '产品正式上线，积累第一批用户反馈',
            'modules.week4.title': '商业闭环与路演展示',
            'modules.week4.item1': 'AI产品的商业模式设计',
            'modules.week4.item2': '定价策略：免费、付费还是订阅',
            'modules.week4.item3': '产品路演：讲好你的产品故事',
            'modules.week4.item4': '军团Demo Day：展示你的产品',
            'modules.week4.output': '完整的AI产品 + 商业化方案',

            /* Features */
            'features.tag': '军团特色',
            'features.title': '为什么选择AI产品军团？',
            'features.desc': '我们提供的不仅仅是一门课程，而是一套完整的实战生态系统',
            'features.card1.title': '实战驱动，不是理论课',
            'features.card1.desc': '每节课都是带着你做一个真实的产品功能。学完就能用，用完就能上线。',
            'features.card2.title': 'AI赋能学习全程',
            'features.card2.desc': '用AI学AI产品——我们教你如何让AI成为你的私人导师、编程助手和产品顾问。',
            'features.card3.title': '军团作战模式',
            'features.card3.desc': '不再是孤军奋战。和一群志同道合的人一起学习、互相 review、组队做项目。',
            'features.card4.title': 'Demo Day路演机会',
            'features.card4.desc': '优秀产品将在军团Demo Day上展示，获得导师点评、投资人关注和媒体报道机会。',
            'features.card5.title': '100+即用型模板',
            'features.card5.desc': 'AI产品需求文档模板、PRD模板、UI模板、营销文案模板……拿过来就能用。',
            'features.card6.title': '终身免费更新',
            'features.card6.desc': 'AI技术日新月异，一次加入，终身免费学习所有后续更新的课程内容。',

            /* Showcase */
            'showcase.tag': '学员作品',
            'showcase.title': '看看军团成员都做出了什么',
            'showcase.desc': '他们和你一样，从零开始，30天后拥有了自己的AI产品',
            'showcase.card1.badge': 'AI 客服助手',
            'showcase.card1.title': '智能客服机器人',
            'showcase.card1.desc': '基于Claude API构建的智能客服系统，帮助小商家实现7x24小时自动回复。',
            'showcase.card1.author': '以前是行政，零基础',
            'showcase.card2.badge': 'AI 内容工具',
            'showcase.card2.title': '小红书AI写手',
            'showcase.card2.desc': '一键生成小红书爆款笔记，支持风格定制和多平台分发。',
            'showcase.card2.author': '以前是销售，零代码',
            'showcase.card3.badge': 'AI 教育产品',
            'showcase.card3.title': 'AI英语陪练',
            'showcase.card3.desc': 'AI驱动的英语口语陪练，支持实时对话纠错和场景模拟。',
            'showcase.card3.author': '以前是教师，零基础',

            /* Pricing */
            'pricing.tag': '加入军团',
            'pricing.title': '选择适合你的方案',
            'pricing.desc': '投资自己，掌握AI时代的核心能力',
            'pricing.plan1.name': '自学版',
            'pricing.plan1.desc': '适合自律性强、预算有限的入门者',
            'pricing.plan1.feature1': '全部录播课程（持续更新）',
            'pricing.plan1.feature2': '100+实战模板',
            'pricing.plan1.feature3': '社群交流权限',
            'pricing.plan1.feature4': 'AI产品工具包',
            'pricing.plan1.cta': '加入自学',
            'pricing.plan2.badge': '🔥 最受欢迎',
            'pricing.plan2.name': '实战版',
            'pricing.plan2.desc': '适合想真正做出成品、需要有指导的学习者',
            'pricing.plan2.feature1': '全部录播课程（持续更新）',
            'pricing.plan2.feature2': '100+实战模板',
            'pricing.plan2.feature3': '社群交流权限',
            'pricing.plan2.feature4': 'AI产品工具包',
            'pricing.plan2.feature5': '每周导师直播答疑',
            'pricing.plan2.feature6': '作业批改与反馈',
            'pricing.plan2.feature7': 'Demo Day路演资格',
            'pricing.plan2.feature8': '毕业证书 + 作品集指导',
            'pricing.plan2.cta': '🔥 立即加入实战版',
            'pricing.plan3.name': '私教版',
            'pricing.plan3.desc': '适合想打造精品产品、需要全程1v1指导的人',
            'pricing.plan3.feature1': '实战版全部权益',
            'pricing.plan3.feature2': '导师1v1全程指导',
            'pricing.plan3.feature3': '自定义产品方向',
            'pricing.plan3.feature4': '产品架构设计与评审',
            'pricing.plan3.feature5': '代码Review & 优化',
            'pricing.plan3.feature6': '上线部署全程协助',
            'pricing.plan3.feature7': '商业化咨询与资源对接',
            'pricing.plan3.feature8': '终身导师答疑',
            'pricing.plan3.cta': '咨询私教版',
            'pricing.price_lifetime': '/ 终身',

            /* Testimonials */
            'testimonials.tag': '学员心声',
            'testimonials.title': '他们在军团中完成了蜕变',
            'testimonials.card1.text': '"上了10年班，一直想做点什么但不知道从哪开始。军团最棒的地方是给了我一套完整的实战路径，30天后我真的做出了自己的第一个产品！"',
            'testimonials.card1.author': '王女士',
            'testimonials.card1.role': '前HR，现独立开发者 | 实战版学员',
            'testimonials.card2.text': '"完全零代码基础，跟着第2周的课程用Cursor + Claude就搭出来一个AI英语陪练。现在产品已经上线，每个月有3000+的被动收入！"',
            'testimonials.card2.author': '张同学',
            'testimonials.card2.role': '大二学生 | 私教版学员',
            'testimonials.card3.text': '"最有价值的是军团里的一群人。每次想放弃的时候，看到群里大家都在晒进度、晒产品，就又来劲了。一个人的孤单变一群人的狂欢。"',
            'testimonials.card3.author': '陈姐',
            'testimonials.card3.role': '创业者 | 实战版学员',
            'testimonials.card4.text': '"私教版的导师太给力了，一点一点帮我打磨产品思路，从最开始的模糊想法到最后上线获得1000+用户，每一步都有清晰的指引。"',
            'testimonials.card4.author': '刘工',
            'testimonials.card4.role': '传统行业转行 | 私教版学员',

            /* FAQ */
            'faq.tag': '常见问题',
            'faq.title': '你可能会问',
            'faq.q1': '我完全不会编程，真的能做AI产品吗？',
            'faq.a1': '是的！我们80%的学员都是零编程基础。现在的AI编程工具（如Cursor、Claude）让你可以用自然语言生成代码。我们的课程专门为非技术背景设计，第2周会手把手教你如何用AI写代码、搭建产品。很多前辈学员不仅做出来了，甚至上线开始盈利了。',
            'faq.q2': '需要多少时间投入？',
            'faq.a2': '我们建议每天投入1-2小时，周末可以适当增加。30天周期内，每周有固定的学习任务和实战项目。如果你时间紧张，所有课程都是录播可回看的，可以按照自己的节奏学习。不过我们建议至少跟上每周的直播和作业节奏，效果最好。',
            'faq.q3': '课程是录播还是直播？',
            'faq.a3': '自学版为全部录播课程；实战版和私教版包含每周一次导师直播答疑 + 录播课程。所有直播都会录制，错过可以看回放。我们的课程会持续更新，一次加入终身免费学习后续所有更新内容。',
            'faq.q4': '30天后我能做出什么样的产品？',
            'faq.a4': '30天后，你将拥有一个功能完整的、可上线运行的AI产品。往期学员做出的产品包括：AI智能客服、AI内容生成工具、AI学习助手、AI图片处理工具等。产品形态可以是Web应用、小程序或API服务。具体做什么取决于你的兴趣和方向选择。',
            'faq.q5': '课程支持退款吗？',
            'faq.a5': '我们提供7天无理由退款。加入军团后7天内，如果你觉得课程不适合自己，可以无条件全额退款。我们对自己的课程质量有信心，但更希望你没有任何后顾之忧地开始学习。',
            'faq.q6': '不同版本之间可以升级吗？',
            'faq.a6': '当然可以！你可以先选择自学版入手，后续随时补差价升级到实战版或私教版。升级后即可享受相应版本的全部权益。升级差价按实时价格计算。',

            /* CTA */
            'cta.title': '加入AI产品军团',
            'cta.desc': '今天就开始你的第一个AI产品。不等待，不犹豫，行动起来。',
            'cta.btn1': '🔥 立即加入',
            'cta.btn2': '预约免费咨询 →',
            'cta.guarantee': '🛡️ 7天无理由退款 · 零风险承诺',

            /* Footer */
            'footer.tagline': '让每一个普通人都能拥有自己的AI产品。',
            'footer.slogan': '一个人走得快，一群人走得远。',
            'footer.nav_title': '快速导航',
            'footer.resources_title': '资源',
            'footer.contact_title': '联系我们',
            'footer.resource1': 'AI工具推荐',
            'footer.resource2': '学员作品集',
            'footer.resource3': '博客',
            'footer.resource4': '帮助中心',
            'footer.copyright': '© 2026 AI产品军团实战. All rights reserved.',

            /* Agent */
            'agent.greeting': '你好！我是 AI产品军团 的教练 Agent。我可以帮你规划学习路径、推荐课程方案，或者评估你的AI技能水平。有什么想了解的？ 😊',
            'agent.input_placeholder': '输入你的问题...',
            'agent.send': '发送',
            'agent.suggest1': '我是零基础，能做吗？',
            'agent.suggest2': '帮我规划学习路径',
            'agent.suggest3': '课程有什么区别？',
            'agent.suggest4': '测测我的水平',
            'agent.status_idle': '待命',
            'agent.status_thinking': '思考中...',
            'agent.status_acting': '执行中',
            'agent.status_waiting': '等待输入',
            'agent.status_done': '完成',
        },

        en: {
            /* Meta */
            'meta.title': 'AI Product Legion — How to Build Your First AI Product',
            'meta.desc': 'Zero-to-hero AI product development. From idea to launch in 30 days. Build your own AI product — join the AI Product Legion.',

            /* Nav */
            'nav.mission': 'Mission',
            'nav.problems': 'Pain Points',
            'nav.roadmap': 'Roadmap',
            'nav.modules': 'Curriculum',
            'nav.features': 'Features',
            'nav.pricing': 'Pricing',
            'nav.faq': 'FAQ',
            'nav.join': 'Join Now',
            'nav.lang': '中文',
            'nav.logo': 'AI Product<span class="highlight"> Legion</span>',

            /* Hero */
            'hero.badge': '🚀 2026 New Upgrade',
            'hero.title': 'How to Build<br/>Your First <span class="gradient-text">AI Product</span>',
            'hero.subtitle': 'Zero experience · Hands-on · 30 days from 0 to 1 — No coding required, no algorithms needed,<br class="hide-mobile"/>just an idea and the determination to act. We\'ll guide you to build your own AI product from scratch.',
            'hero.cta': '🔥 Join the Legion',
            'hero.cta2': 'Explore the Roadmap →',
            'hero.scroll': 'Scroll Down',
            'hero.stat1_label': 'Legion Members',
            'hero.stat2_label': 'Products Launched',
            'hero.stat3_label': 'Success Rate',
            /* stat numbers remain numeric — no translation needed */

            /* Mission */
            'mission.tag': 'Our Mission',
            'mission.title': 'Empower Everyone to Build Their Own AI Product',
            'mission.desc': 'We believe the biggest opportunity in the AI era belongs not to big companies, but to every ordinary person brave enough to take action.',
            'mission.card1.title': 'Break Down Barriers',
            'mission.card1.desc': 'Explain the complete journey of building an AI product from 0 to 1 in the simplest way, enabling non-technical people to create real products.',
            'mission.card2.title': 'Provide a Battle-Tested Path',
            'mission.card2.desc': 'Not boring theory — we guide you step by step through requirement analysis, product design, development, launch, and growth marketing.',
            'mission.card3.title': 'Build a Legion Ecosystem',
            'mission.card3.desc': 'Alone you go fast, together you go far. In the Legion, you\'ll find partners, get feedback, and grow together.',

            /* Problems */
            'problems.tag': 'Pain Points',
            'problems.title': 'Do These Sound Familiar?',
            'problems.desc': 'We surveyed 3,000+ learners — here are the most common struggles',
            'problems.card1.title': '"Too many AI tools, can\'t keep up"',
            'problems.card1.desc': 'ChatGPT, Claude, Midjourney, Cursor… new tools every day, no idea which ones are worth learning.',
            'problems.card2.title': '"I\'m not a programmer, can I really build AI products?"',
            'problems.card2.desc': 'Feeling like AI products are only for experts. I don\'t even know Python — how could I possibly build one?',
            'problems.card3.title': '"I have lots of ideas but don\'t know where to start"',
            'problems.card3.desc': 'A dozen ideas in your head, but stuck at execution. No practical methodology to go from idea to launch.',
            'problems.card4.title': '"I\'ve taken many courses but still can\'t ship"',
            'problems.card4.desc': '99% of courses stay at the theoretical level. When it\'s time to actually build, there\'s no hands-on guidance.',

            /* Roadmap */
            'roadmap.tag': 'Roadmap',
            'roadmap.title': 'Complete Path from 0 to 1',
            'roadmap.desc': 'A proven 4-step methodology validated by 3,000+ learners',
            'roadmap.step1.title': 'Ideate — Discovery & Product Definition',
            'roadmap.step1.desc': 'Use AI to find real needs, validate the market, and define your product direction. No complex research needed — templates included.',
            'roadmap.step1.item1': 'AI-powered user research',
            'roadmap.step1.item2': 'Quick product idea validation',
            'roadmap.step1.item3': 'Define your MVP',
            'roadmap.step2.title': 'Build — No-Code AI Product Development',
            'roadmap.step2.desc': 'Leverage AI coding tools and low-code platforms to build a fully functional AI product without writing code.',
            'roadmap.step2.item1': 'No-code prototyping',
            'roadmap.step2.item2': 'AI-assisted coding (no experience needed)',
            'roadmap.step2.item3': 'Integrate AI capabilities (APIs)',
            'roadmap.step3.title': 'Launch — Ship & Cold Start',
            'roadmap.step3.desc': 'Deploy your product, acquire your first users at minimal cost, and establish a feedback loop.',
            'roadmap.step3.item1': 'One-click deployment',
            'roadmap.step3.item2': 'Low-cost seed user acquisition',
            'roadmap.step3.item3': 'Data-driven iteration',
            'roadmap.step4.title': 'Monetize — Commercialization & Growth',
            'roadmap.step4.desc': 'Go from free to paid, find your business model, and achieve your first revenue breakthrough.',
            'roadmap.step4.item1': 'Pricing strategy design',
            'roadmap.step4.item2': 'Conversion optimization',
            'roadmap.step4.item3': 'Sustainable product growth',

            /* Modules */
            'modules.tag': 'Curriculum',
            'modules.title': 'Four Hands-On Modules',
            'modules.desc': 'Systematic learning path + project-based practice',
            'modules.week1.title': 'AI Product Fundamentals',
            'modules.week1.item1': 'AI product landscape: what\'s possible today',
            'modules.week1.item2': 'Product thinking: problem-driven vs tech-driven',
            'modules.week1.item3': 'Using AI to pick your direction: market research',
            'modules.week1.item4': 'Legion project kickoff: choose your first project',
            'modules.week1.output': 'Define your AI product direction with market validation',
            'modules.week2.title': 'Prototyping & No-Code Implementation',
            'modules.week2.item1': 'Design your product UI with AI',
            'modules.week2.item2': 'No-code tools: build your prototype',
            'modules.week2.item3': 'AI programming: generate code with natural language',
            'modules.week2.item4': 'Integrate AI: from API to working feature',
            'modules.week2.output': 'Complete MVP prototype with core functionality',
            'modules.week3.title': 'Launch & Operations',
            'modules.week3.item1': 'Full deployment pipeline',
            'modules.week3.item2': 'Domain, server, config — all in one',
            'modules.week3.item3': 'Cold start: how to get your first users',
            'modules.week3.item4': 'Analytics & iteration optimization',
            'modules.week3.output': 'Product goes live with first user feedback',
            'modules.week4.title': 'Business Model & Demo Day',
            'modules.week4.item1': 'AI product business model design',
            'modules.week4.item2': 'Pricing strategy: free, paid, or subscription',
            'modules.week4.item3': 'Product pitch: tell your product story',
            'modules.week4.item4': 'Legion Demo Day: showcase your product',
            'modules.week4.output': 'Complete AI product + commercialization plan',

            /* Features */
            'features.tag': 'Features',
            'features.title': 'Why Choose AI Product Legion?',
            'features.desc': 'We offer more than a course — it\'s a complete hands-on ecosystem',
            'features.card1.title': 'Hands-On, Not Just Theory',
            'features.card1.desc': 'Every lesson builds a real product feature. Learn it, use it, ship it.',
            'features.card2.title': 'AI-Powered Learning',
            'features.card2.desc': 'Learn AI by using AI — we teach you how to make AI your personal tutor, coding assistant, and product advisor.',
            'features.card3.title': 'Legion Squad Mode',
            'features.card3.desc': 'No more going it alone. Learn with like-minded people, review each other\'s work, and team up on projects.',
            'features.card4.title': 'Demo Day Opportunity',
            'features.card4.desc': 'Top products get showcased at Legion Demo Day with mentor feedback, investor attention, and media coverage.',
            'features.card5.title': '100+ Ready-to-Use Templates',
            'features.card5.desc': 'PRD templates, UI templates, marketing copy templates — grab and use them immediately.',
            'features.card6.title': 'Lifetime Free Updates',
            'features.card6.desc': 'AI evolves daily. Join once, get free access to all future curriculum updates for life.',

            /* Showcase */
            'showcase.tag': 'Student Works',
            'showcase.title': 'See What Legion Members Have Built',
            'showcase.desc': 'They started from zero too — 30 days later, they had their own AI products',
            'showcase.card1.badge': 'AI Customer Service',
            'showcase.card1.title': 'Smart Support Bot',
            'showcase.card1.desc': 'AI customer service system built with Claude API, enabling 24/7 automated replies for small businesses.',
            'showcase.card1.author': 'Ex-admin, zero coding background',
            'showcase.card2.badge': 'AI Content Tool',
            'showcase.card2.title': 'Social Media AI Writer',
            'showcase.card2.desc': 'One-click viral content generation with style customization and multi-platform distribution.',
            'showcase.card2.author': 'Ex-salesperson, no-code approach',
            'showcase.card3.badge': 'AI Education',
            'showcase.card3.title': 'AI English Tutor',
            'showcase.card3.desc': 'AI-driven English speaking practice with real-time conversation correction and scenario simulation.',
            'showcase.card3.author': 'Ex-teacher, zero coding background',

            /* Pricing */
            'pricing.tag': 'Join the Legion',
            'pricing.title': 'Choose Your Plan',
            'pricing.desc': 'Invest in yourself and master the core skills of the AI era',
            'pricing.plan1.name': 'Self-Study',
            'pricing.plan1.desc': 'For self-motivated learners on a budget',
            'pricing.plan1.feature1': 'All recorded courses (continuously updated)',
            'pricing.plan1.feature2': '100+ hands-on templates',
            'pricing.plan1.feature3': 'Community access',
            'pricing.plan1.feature4': 'AI product toolkit',
            'pricing.plan1.cta': 'Start Self-Study',
            'pricing.plan2.badge': '🔥 Most Popular',
            'pricing.plan2.name': 'Hands-On',
            'pricing.plan2.desc': 'For those who want guided mentorship to ship a real product',
            'pricing.plan2.feature1': 'All recorded courses (continuously updated)',
            'pricing.plan2.feature2': '100+ hands-on templates',
            'pricing.plan2.feature3': 'Community access',
            'pricing.plan2.feature4': 'AI product toolkit',
            'pricing.plan2.feature5': 'Weekly mentor live Q&A',
            'pricing.plan2.feature6': 'Assignment review & feedback',
            'pricing.plan2.feature7': 'Demo Day eligibility',
            'pricing.plan2.feature8': 'Certificate + portfolio guidance',
            'pricing.plan2.cta': '🔥 Join Hands-On Now',
            'pricing.plan3.name': 'Private Coaching',
            'pricing.plan3.desc': 'For those who want 1-on-1 guidance to build a standout product',
            'pricing.plan3.feature1': 'All Hands-On plan benefits',
            'pricing.plan3.feature2': 'Full 1-on-1 mentor guidance',
            'pricing.plan3.feature3': 'Custom product direction',
            'pricing.plan3.feature4': 'Architecture design & review',
            'pricing.plan3.feature5': 'Code review & optimization',
            'pricing.plan3.feature6': 'Full deployment assistance',
            'pricing.plan3.feature7': 'Business consultation & networking',
            'pricing.plan3.feature8': 'Lifetime mentor access',
            'pricing.plan3.cta': 'Inquire About Private',
            'pricing.price_lifetime': '/ Lifetime',

            /* Testimonials */
            'testimonials.tag': 'Testimonials',
            'testimonials.title': 'Their Transformations in the Legion',
            'testimonials.card1.text': '"Worked for 10 years, always wanted to build something but didn\'t know where to start. The Legion gave me a complete roadmap — 30 days later I shipped my first product!"',
            'testimonials.card1.author': 'Ms. Wang',
            'testimonials.card1.role': 'Ex-HR, now indie developer | Hands-On',
            'testimonials.card2.text': '"Zero coding experience. Followed Week 2\'s lessons with Cursor + Claude and built an AI English tutor. It\'s now live earning $3,000+ monthly passive income!"',
            'testimonials.card2.author': 'Alex Zhang',
            'testimonials.card2.role': 'Sophomore | Private Coaching',
            'testimonials.card3.text': '"The most valuable part is the Legion community. Every time I wanted to quit, seeing everyone\'s progress in the group kept me going. Loneliness turns into a shared journey."',
            'testimonials.card3.author': 'Chen Jie',
            'testimonials.card3.role': 'Entrepreneur | Hands-On',
            'testimonials.card4.text': '"The private coaching mentor was incredible — refining my product idea step by step, from a vague concept to launch with 1,000+ users. Clear guidance every step of the way."',
            'testimonials.card4.author': 'Engineer Liu',
            'testimonials.card4.role': 'Career changer | Private Coaching',

            /* FAQ */
            'faq.tag': 'FAQ',
            'faq.title': 'You May Be Wondering',
            'faq.q1': 'I can\'t code at all. Can I really build an AI product?',
            'faq.a1': 'Yes! 80% of our students start with zero coding experience. Modern AI tools (Cursor, Claude) let you generate code with natural language. Our curriculum is designed for non-technical backgrounds — Week 2 walks you through using AI to code and build your product. Many alumni have not only built products but launched profitable businesses.',
            'faq.q2': 'How much time do I need to invest?',
            'faq.a2': 'We recommend 1-2 hours daily, with more on weekends. Over the 30-day cycle, each week has fixed learning tasks and projects. If you\'re short on time, all courses are recorded for self-paced learning. However, keeping up with weekly live sessions and assignments yields the best results.',
            'faq.q3': 'Are courses pre-recorded or live?',
            'faq.a3': 'The Self-Study plan is entirely pre-recorded. Hands-On and Private Coaching include weekly live mentor Q&A plus recorded courses. All live sessions are recorded for later viewing. Content is continuously updated — join once, learn all future updates for free.',
            'faq.q4': 'What kind of product can I build after 30 days?',
            'faq.a4': 'After 30 days, you\'ll have a fully functional, deployable AI product. Alumni have built: AI customer service bots, AI content generators, AI study assistants, AI image processing tools, and more. Products can be web apps, mini-programs, or API services — depending on your interests.',
            'faq.q5': 'Is there a refund policy?',
            'faq.a5': 'Yes, we offer a 7-day no-questions-asked refund. If within 7 days of joining you feel the course isn\'t right for you, you can get a full refund. We\'re confident in our quality but want you to start completely worry-free.',
            'faq.q6': 'Can I upgrade between plans?',
            'faq.a6': 'Absolutely! Start with Self-Study and upgrade to Hands-On or Private Coaching anytime by paying the price difference. You\'ll immediately get all benefits of the upgraded plan. Upgrade pricing is based on current rates.',

            /* CTA */
            'cta.title': 'Join the AI Product Legion',
            'cta.desc': 'Start building your first AI product today. Don\'t wait, don\'t hesitate — take action.',
            'cta.btn1': '🔥 Join Now',
            'cta.btn2': 'Book Free Consultation →',
            'cta.guarantee': '🛡️ 7-Day Money-Back · Zero Risk',

            /* Footer */
            'footer.tagline': 'Empower everyone to build their own AI product.',
            'footer.slogan': 'Alone you go fast, together you go far.',
            'footer.nav_title': 'Quick Links',
            'footer.resources_title': 'Resources',
            'footer.contact_title': 'Contact Us',
            'footer.resource1': 'AI Tools',
            'footer.resource2': 'Student Portfolio',
            'footer.resource3': 'Blog',
            'footer.resource4': 'Help Center',
            'footer.copyright': '© 2026 AI Product Legion. All rights reserved.',

            /* Agent */
            'agent.greeting': 'Hi! I\'m the AI Product Legion coaching Agent. I can help plan your learning path, recommend course plans, or assess your AI skills. What would you like to know? 😊',
            'agent.input_placeholder': 'Type your question...',
            'agent.send': 'Send',
            'agent.suggest1': 'I\'m a beginner, can I do this?',
            'agent.suggest2': 'Plan my learning path',
            'agent.suggest3': 'What\'s the difference between plans?',
            'agent.suggest4': 'Assess my skill level',
            'agent.status_idle': 'Standing by',
            'agent.status_thinking': 'Thinking...',
            'agent.status_acting': 'Working...',
            'agent.status_waiting': 'Awaiting input',
            'agent.status_done': 'Done',
        },

        ja: {
            /* Meta */
            'meta.title': 'AI Product Legion — 初めてのAI製品の作り方',
            'meta.desc': 'ゼロから始めるAI製品開発。アイデアからローンチまで30日間。自分だけのAI製品を作ろう — AI Product Legionに参加。',

            /* Nav */
            'nav.mission': 'ミッション',
            'nav.problems': '悩み',
            'nav.roadmap': 'ロードマップ',
            'nav.modules': 'カリキュラム',
            'nav.features': '特徴',
            'nav.pricing': '料金',
            'nav.faq': 'FAQ',
            'nav.join': '今すぐ参加',
            'nav.lang': 'English',
            'nav.logo': 'AI Product<span class="highlight"> Legion</span>',

            /* Hero */
            'hero.badge': '🚀 2026 新バージョン',
            'hero.title': '普通の人が<br/>初めての <span class="gradient-text">AI製品</span> を作る方法',
            'hero.subtitle': 'ゼロ経験 · 実践派 · 30日で0から1へ — コーディング不要、アルゴリズム不要。<br class="hide-mobile"/>必要なのはアイデアと行動する決意だけ。私たちがあなただけのAI製品をゼロから作るお手伝いをします。',
            'hero.cta': '🔥 レギオンに参加',
            'hero.cta2': 'ロードマップを見る →',
            'hero.scroll': 'スクロール',
            'hero.stat1_label': 'レギオンメンバー',
            'hero.stat2_label': 'ローンチ済み製品',
            'hero.stat3_label': 'ゼロ基礎成功率',

            /* Mission */
            'mission.tag': '私たちの使命',
            'mission.title': 'すべての普通の人が自分だけのAI製品を持てるように',
            'mission.desc': 'AI時代の最大のチャンスは大企業ではなく、行動を起こす勇気のあるすべての普通の人にあると信じています。',
            'mission.card1.title': '技術の壁を壊す',
            'mission.card1.desc': 'AI製品の0から1への完全な道のりを最もわかりやすく説明し、技術的背景がなくても本物の製品を作れるようにします。',
            'mission.card2.title': '実戦的な道筋を提供',
            'mission.card2.desc': '退屈な理論ではなく、要件分析、製品設計、開発、ローンチ、グロースマーケティングまでをステップバイステップで導きます。',
            'mission.card3.title': 'レギオンエコシステムを構築',
            'mission.card3.desc': '一人で早く進み、皆で遠くへ行く。レギオンではパートナーを見つけ、フィードバックを得て、一緒に成長できます。',

            /* Problems */
            'problems.tag': 'よくある悩み',
            'problems.title': 'こんな悩みに当てはまりませんか？',
            'problems.desc': '3,000人以上の学習者を調査 — 最も一般的な悩み',
            'problems.card1.title': '"AIツールが多すぎて追いつけない"',
            'problems.card1.desc': 'ChatGPT、Claude、Midjourney、Cursor…毎日新しいツールが出てきて、どれを学ぶべきかわからない。',
            'problems.card2.title': '"プログラマーじゃないけど、AI製品を作れるの？"',
            'problems.card2.desc': 'AI製品は専門家だけのものだと思っていませんか？Pythonもできない自分に作れるはずがない？',
            'problems.card3.title': '"アイデアはたくさんあるけど、どこから始めればいいかわからない"',
            'problems.card3.desc': '頭の中に十数のアイデアはあるけど、実行になると止まってしまう。アイデアからローンチまでの実戦的な方法論が足りない。',
            'problems.card4.title': '"たくさんコースを受講したけど、製品を作れない"',
            'problems.card4.desc': '99%のコースは理論レベルで止まっている。実際に作り始めるときに何から手をつければいいかわからない。実戦的な指導が不足している。',

            /* Roadmap */
            'roadmap.tag': 'ロードマップ',
            'roadmap.title': '0から1への完全な実戦ロードマップ',
            'roadmap.desc': '3,000人以上の学習者に検証された4ステップ実戦法',
            'roadmap.step1.title': '考える — ニーズ発掘と製品定義',
            'roadmap.step1.desc': 'AIを使って本当のニーズを見つけ、市場を検証し、製品の方向性を定義します。複雑な調査は不要、テンプレートで完了。',
            'roadmap.step1.item1': 'AIを使ったユーザーリサーチ',
            'roadmap.step1.item2': '製品アイデアの迅速な検証',
            'roadmap.step1.item3': 'MVPの定義',
            'roadmap.step2.title': '作る — ノーコードでAI製品を構築',
            'roadmap.step2.desc': 'AIコーディングツールとローコードプラットフォームを活用して、コードを書かずにフル機能のAI製品を構築。',
            'roadmap.step2.item1': 'ノーコードでプロトタイプ作成',
            'roadmap.step2.item2': 'AIアシストコーディング（経験不要）',
            'roadmap.step2.item3': 'AI機能の統合（API）',
            'roadmap.step3.title': '出す — 製品ローンチとコールドスタート',
            'roadmap.step3.desc': '製品をデプロイし、最小限のコストで最初のユーザーを獲得し、フィードバックループを構築。',
            'roadmap.step3.item1': 'ワンクリックデプロイ',
            'roadmap.step3.item2': '低コストで初期ユーザー獲得',
            'roadmap.step3.item3': 'データ駆動の反復改善',
            'roadmap.step4.title': '稼ぐ — 商业化と持続的成長',
            'roadmap.step4.desc': '無料から有料へ、製品のビジネスモデルを見つけ、0から1への収益突破を実現。',
            'roadmap.step4.item1': '料金戦略の設計',
            'roadmap.step4.item2': 'コンバージョン最適化',
            'roadmap.step4.item3': '持続可能な製品成長',

            /* Modules */
            'modules.tag': 'カリキュラム',
            'modules.title': '4つの実戦モジュール',
            'modules.desc': '体系的な学習パス + プロジェクト実践',
            'modules.week1.title': 'AI製品の基礎と思考法',
            'modules.week1.item1': 'AI製品の全体像：今何ができるのか',
            'modules.week1.item2': 'プロダクト思考入門：問題駆動 vs 技術駆動',
            'modules.week1.item3': 'AIで方向性を選ぶ：市場調査の実践',
            'modules.week1.item4': 'レギオンプロジェクト始動：最初のプロジェクトを選定',
            'modules.week1.output': 'AI製品の方向性を決定し、市場検証を完了',
            'modules.week2.title': 'AIプロトタイプ設計とノーコード実装',
            'modules.week2.item1': 'AIで製品UIをデザイン',
            'modules.week2.item2': 'ノーコードツール実践：プロトタイプ構築',
            'modules.week2.item3': 'AIプログラミング入門：自然言語でコード生成',
            'modules.week2.item4': 'AI機能の統合：APIから機能実装へ',
            'modules.week2.output': 'コア機能を備えたMVPプロトタイプを完成',
            'modules.week3.title': '製品ローンチと運用実践',
            'modules.week3.item1': '製品デプロイとローンチの全プロセス',
            'modules.week3.item2': 'ドメイン、サーバー、設定をワンストップで',
            'modules.week3.item3': 'コールドスタート戦略：最初のユーザーを獲得する方法',
            'modules.week3.item4': 'データ分析と反復最適化',
            'modules.week3.output': '製品正式ローンチ、初回ユーザーフィードバックを蓄積',
            'modules.week4.title': 'ビジネスモデルとデモデイ',
            'modules.week4.item1': 'AI製品のビジネスモデル設計',
            'modules.week4.item2': '料金戦略：無料、有料、サブスクリプション',
            'modules.week4.item3': '製品ピッチ：製品ストーリーを伝える',
            'modules.week4.item4': 'レギオンデモデイ：製品を披露',
            'modules.week4.output': '完全なAI製品 + 商业化計画',

            /* Features */
            'features.tag': '特徴',
            'features.title': 'なぜAI Product Legionを選ぶのか？',
            'features.desc': '私たちが提供するのは単なるコースではなく、完全な実戦エコシステムです',
            'features.card1.title': '実戦駆動、理論だけじゃない',
            'features.card1.desc': '毎回のレッスンで実際の製品機能を一つ作ります。学んですぐ使え、使えばすぐローンチできます。',
            'features.card2.title': 'AIで学習全程を強化',
            'features.card2.desc': 'AIを使ってAI製品を学ぶ — AIをあなたの個人チューター、コーディングアシスタント、製品アドバイザーにする方法を教えます。',
            'features.card3.title': 'レギオン戦隊モード',
            'features.card3.desc': 'もう孤独な戦いではありません。志を同じくする仲間と一緒に学び、レビューし合い、チームでプロジェクトに取り組みます。',
            'features.card4.title': 'デモデイの機会',
            'features.card4.desc': '優秀な製品はレギオンデモデイで披露され、メンターのフィードバック、投資家の注目、メディア掲載の機会を得られます。',
            'features.card5.title': '100以上の即戦力テンプレート',
            'features.card5.desc': 'PRDテンプレート、UIテンプレート、マーケティングコピーテンプレート — すぐに使えます。',
            'features.card6.title': '生涯無料アップデート',
            'features.card6.desc': 'AIは日々進化します。一度参加すれば、将来のすべてのカリキュラム更新を生涯無料で学べます。',

            /* Showcase */
            'showcase.tag': '受講生作品',
            'showcase.title': 'レギオンメンバーが作ったものを見る',
            'showcase.desc': '彼らもあなたと同じゼロから始めて、30日後には自分だけのAI製品を持ちました',
            'showcase.card1.badge': 'AIカスタマーサービス',
            'showcase.card1.title': 'スマートサポートボット',
            'showcase.card1.desc': 'Claude APIで構築されたAIカスタマーサービスシステム。小規模ビジネスに24時間自動応答を提供。',
            'showcase.card1.author': '元事務員、ゼロコーディング',
            'showcase.card2.badge': 'AIコンテンツツール',
            'showcase.card2.title': 'SNS AIライター',
            'showcase.card2.desc': 'ワンクリックでバイラルコンテンツを生成。スタイルカスタマイズとマルチプラットフォーム配信に対応。',
            'showcase.card2.author': '元営業、ノーコード',
            'showcase.card3.badge': 'AI教育製品',
            'showcase.card3.title': 'AI英語チューター',
            'showcase.card3.desc': 'AI駆動の英会話練習。リアルタイムの会話訂正とシナリオシミュレーション。',
            'showcase.card3.author': '元教師、ゼロコーディング',

            /* Pricing */
            'pricing.tag': 'レギオンに参加',
            'pricing.title': 'あなたに合ったプランを選ぶ',
            'pricing.desc': '自分に投資し、AI時代の中核スキルを習得する',
            'pricing.plan1.name': '自学版',
            'pricing.plan1.desc': '自己管理ができ、予算が限られている初心者向け',
            'pricing.plan1.feature1': '全録画コース（継続更新）',
            'pricing.plan1.feature2': '100以上の実戦テンプレート',
            'pricing.plan1.feature3': 'コミュニティアクセス',
            'pricing.plan1.feature4': 'AIプロダクトツールキット',
            'pricing.plan1.cta': '自学を始める',
            'pricing.plan2.badge': '🔥 最も人気',
            'pricing.plan2.name': '実戦版',
            'pricing.plan2.desc': '実際に製品を作り上げ、指導が必要な学習者向け',
            'pricing.plan2.feature1': '全録画コース（継続更新）',
            'pricing.plan2.feature2': '100以上の実戦テンプレート',
            'pricing.plan2.feature3': 'コミュニティアクセス',
            'pricing.plan2.feature4': 'AIプロダクトツールキット',
            'pricing.plan2.feature5': '毎週メンターライブQ&A',
            'pricing.plan2.feature6': '課題レビューとフィードバック',
            'pricing.plan2.feature7': 'デモデイ参加資格',
            'pricing.plan2.feature8': '修了証 + ポートフォリオ指導',
            'pricing.plan2.cta': '🔥 実戦版に参加',
            'pricing.plan3.name': '個人指導版',
            'pricing.plan3.desc': 'ハイクオリティな製品を目指し、1対1の指導が必要な方へ',
            'pricing.plan3.feature1': '実戦版の全特典',
            'pricing.plan3.feature2': '完全1対1メンター指導',
            'pricing.plan3.feature3': 'カスタム製品方向性',
            'pricing.plan3.feature4': 'アーキテクチャ設計とレビュー',
            'pricing.plan3.feature5': 'コードレビューと最適化',
            'pricing.plan3.feature6': 'デプロイ全面サポート',
            'pricing.plan3.feature7': 'ビジネスコンサルティングとネットワーキング',
            'pricing.plan3.feature8': '生涯メンターアクセス',
            'pricing.plan3.cta': '個人指導版を問い合わせ',
            'pricing.price_lifetime': '/ 生涯',

            /* Testimonials */
            'testimonials.tag': '受講生の声',
            'testimonials.title': 'レギオンでの変革',
            'testimonials.card1.text': '"10年間会社員をしていて、何か作りたいけどどこから始めればいいかわからなかった。レギオンは完全なロードマップを与えてくれ、30日後に最初の製品をローンチできた！"',
            'testimonials.card1.author': '王さん',
            'testimonials.card1.role': '元HR、現在は個人開発者 | 実戦版',
            'testimonials.card2.text': '"ゼロコーディング経験で、第2週のレッスンに従ってCursorとClaudeでAI英語チューターを構築。今では毎月30万円以上の不労所得があります！"',
            'testimonials.card2.author': '張さん',
            'testimonials.card2.role': '大学2年生 | 個人指導版',
            'testimonials.card3.text': '"最も価値があるのはレギオンコミュニティ。諦めそうになるたびに、皆の進捗を見てやる気が戻ってきた。孤独が共有の旅になる。"',
            'testimonials.card3.author': '陳さん',
            'testimonials.card3.role': '起業家 | 実戦版',
            'testimonials.card4.text': '"個人指導版のメンターは素晴らしかった。漠然としたアイデアから1000人以上のユーザーを獲得する製品まで、一歩一歩明確に導いてくれた。"',
            'testimonials.card4.author': '劉さん',
            'testimonials.card4.role': 'キャリアチェンジ | 個人指導版',

            /* FAQ */
            'faq.tag': 'FAQ',
            'faq.title': 'よくある質問',
            'faq.q1': '全くプログラミングができませんが、本当にAI製品を作れますか？',
            'faq.a1': 'はい！受講生の80%はゼロコーディング経験から始めています。CursorやClaudeのような最新AIツールを使えば、自然言語でコードを生成できます。カリキュラムは非技術背景向けに設計されており、第2週ではAIを使ってコードを書き、製品を構築する方法を丁寧に解説します。多くの卒業生が製品をローンチし、収益化に成功しています。',
            'faq.q2': 'どのくらいの時間投資が必要ですか？',
            'faq.a2': '毎日1〜2時間、週末はさらに時間を取ることをお勧めします。30日間のサイクルで、毎週決まった学習タスクとプロジェクトがあります。時間がない場合、全コースは録画で自分のペースで学べます。ただし、毎週のライブセッションと課題に追いつくのが最も効果的です。',
            'faq.q3': 'コースは録画ですか、それともライブですか？',
            'faq.a3': '自学版は全録画コースです。実戦版と個人指導版には毎週のメンターライブQ&Aと録画コースが含まれます。全ライブセッションは録画され、後で視聴可能です。コンテンツは継続的に更新され、一度参加すれば将来の全アップデートを無料で学べます。',
            'faq.q4': '30日後、どんな製品が作れますか？',
            'faq.a4': '30日後、完全に機能するデプロイ可能なAI製品を手に入れられます。卒業生はAIカスタマーサービスボット、AIコンテンツ生成ツール、AI学習アシスタント、AI画像処理ツールなどを作っています。製品形態はWebアプリ、ミニプログラム、APIサービスなど、あなたの興味に応じて選べます。',
            'faq.q5': '返金ポリシーはありますか？',
            'faq.a5': 'はい、7日間の無条件返金保証があります。参加後7日以内にコースが自分に合わないと感じた場合、全額返金されます。私たちは品質に自信を持っていますが、あなたが安心して学習を始められるようにしたいと思っています。',
            'faq.q6': 'プラン間のアップグレードは可能ですか？',
            'faq.a6': 'もちろん！自学版から始めて、いつでも差額を支払って実戦版や個人指導版にアップグレードできます。アップグレード後はすぐに該当プランの全特典を利用できます。アップグレード料金はリアルタイムの価格に基づきます。',

            /* CTA */
            'cta.title': 'AI Product Legionに参加',
            'cta.desc': '今日からあなたの最初のAI製品を作り始めましょう。待たずに、迷わずに、行動を起こそう。',
            'cta.btn1': '🔥 今すぐ参加',
            'cta.btn2': '無料相談を予約 →',
            'cta.guarantee': '🛡️ 7日間返金保証 · リスクゼロ',

            /* Footer */
            'footer.tagline': 'すべての普通の人が自分だけのAI製品を持てるように。',
            'footer.slogan': '一人で早く進み、皆で遠くへ行く。',
            'footer.nav_title': 'クイックリンク',
            'footer.resources_title': 'リソース',
            'footer.contact_title': 'お問い合わせ',
            'footer.resource1': 'AIツール',
            'footer.resource2': '受講生ポートフォリオ',
            'footer.resource3': 'ブログ',
            'footer.resource4': 'ヘルプセンター',
            'footer.copyright': '© 2026 AI Product Legion. All rights reserved.',

            /* Agent */
            'agent.greeting': 'こんにちは！AI Product Legionのコーチングエージェントです。学習パスの計画、コースプランの推薦、AIスキルレベルの評価など、お手伝いできます。何か知りたいことはありますか？ 😊',
            'agent.input_placeholder': '質問を入力...',
            'agent.send': '送信',
            'agent.suggest1': '初心者でもできますか？',
            'agent.suggest2': '学習パスを計画して',
            'agent.suggest3': 'コースの違いは？',
            'agent.suggest4': 'スキルを診断して',
            'agent.status_idle': '待機中',
            'agent.status_thinking': '思考中...',
            'agent.status_acting': '実行中',
            'agent.status_waiting': '入力待ち',
            'agent.status_done': '完了',
        },

        ko: {
            /* Meta */
            'meta.title': 'AI Product Legion — 첫 AI 제품 만드는 방법',
            'meta.desc': '처음부터 시작하는 AI 제품 개발. 아이디어에서 런칭까지 30일. 나만의 AI 제품을 만들어보세요 — AI Product Legion에 참여하세요.',

            /* Nav */
            'nav.mission': '미션',
            'nav.problems': '문제점',
            'nav.roadmap': '로드맵',
            'nav.modules': '커리큘럼',
            'nav.features': '특징',
            'nav.pricing': '가격',
            'nav.faq': 'FAQ',
            'nav.join': '지금 가입',
            'nav.lang': 'English',
            'nav.logo': 'AI Product<span class="highlight"> Legion</span>',

            /* Hero */
            'hero.badge': '🚀 2026 새로운 업그레이드',
            'hero.title': '일반인이<br/>첫 <span class="gradient-text">AI 제품</span>을 만드는 방법',
            'hero.subtitle': '초보자 · 실전파 · 30일만에 0에서 1로 — 코딩 몰라도 돼요, 알고리즘 몰라도 돼요.<br class="hide-mobile"/>아이디어와 행동할 결심만 있으면 됩니다. 우리가 당신만의 AI 제품을 처음부터 만들어드려요.',
            'hero.cta': '🔥 레기온 가입하기',
            'hero.cta2': '로드맵 알아보기 →',
            'hero.scroll': '아래로 스크롤',
            'hero.stat1_label': '레기온 멤버',
            'hero.stat2_label': '런칭 제품',
            'hero.stat3_label': '초보자 성공률',

            /* Mission */
            'mission.tag': '우리의 미션',
            'mission.title': '모든 일반인이 자신만의 AI 제품을 가질 수 있도록',
            'mission.desc': 'AI 시대의 가장 큰 기회는 대기업이 아니라, 행동할 용기를 가진 모든 일반인에게 있다고 믿습니다.',
            'mission.card1.title': '기술 장벽 허물기',
            'mission.card1.desc': 'AI 제품의 0에서 1까지의 전체 과정을 가장 쉽게 설명하여, 기술적 배경이 없어도 진짜 제품을 만들 수 있게 합니다.',
            'mission.card2.title': '실전 경로 제공',
            'mission.card2.desc': '지루한 이론이 아닌, 요구사항 분석, 제품 설계, 개발, 런칭, 그로스 마케팅까지 전 과정을 단계별로 안내합니다.',
            'mission.card3.title': '레기온 생태계 구축',
            'mission.card3.desc': '혼자 가면 빨리가고, 함께 가면 멀리갑니다. 레기온에서 파트너를 찾고, 피드백을 받고, 함께 성장할 수 있습니다.',

            /* Problems */
            'problems.tag': '문제점',
            'problems.title': '이런 고민이 있으신가요?',
            'problems.desc': '3,000명 이상의 학습자를 조사한 가장普遍的인 고민',
            'problems.card1.title': '"AI 도구가 너무 많아 따라잡을 수 없어요"',
            'problems.card1.desc': 'ChatGPT, Claude, Midjourney, Cursor… 매일 새로운 도구가 나오는데, 무엇을 배워야 할지 모르겠어요.',
            'problems.card2.title': '"개발자가 아닌데 AI 제품을 만들 수 있을까요?"',
            'problems.card2.desc': 'AI 제품은 전문가만 만들 수 있다고 생각하시나요? Python도 모르는 제가 어떻게 만들 수 있을까요?',
            'problems.card3.title': '"아이디어는 많은데 어디서부터 시작해야 할지 모르겠어요"',
            'problems.card3.desc': '머릿속에 수십 개의 아이디어는 있지만, 실행하려고 하면 막힙니다. 아이디어에서 런칭까지의 실전 방법론이 부족해요.',
            'problems.card4.title': '"많은 강의를 들었지만 제품을 만들지 못했어요"',
            'problems.card4.desc': '99%의 강의가 이론 수준에 머물러 있습니다. 실제로 만들려고 하면 손도 댈 수 없어요. 실전 지도가 부족합니다.',

            /* Roadmap */
            'roadmap.tag': '로드맵',
            'roadmap.title': '0에서 1까지의 완벽한 실전 로드맵',
            'roadmap.desc': '3,000명 이상의 학습자가 검증한 4단계 실전법',
            'roadmap.step1.title': '생각하기 — 니즈 발굴과 제품 정의',
            'roadmap.step1.desc': 'AI를 사용하여 진정한 니즈를 찾고, 시장을 검증하고, 제품 방향을 정의합니다. 복잡한 조사 불필요, 템플릿 하나면 끝. ',
            'roadmap.step1.item1': 'AI를 활용한 사용자 리서치',
            'roadmap.step1.item2': '제품 아이디어 빠른 검증',
            'roadmap.step1.item3': 'MVP 정의하기',
            'roadmap.step2.title': '만들기 — 노코드로 AI 제품 구축',
            'roadmap.step2.desc': 'AI 코딩 도구와 로우코드 플랫폼을 활용하여 코드를 작성하지 않고도 완전한 기능의 AI 제품을 구축합니다.',
            'roadmap.step2.item1': '노코드 프로토타이핑',
            'roadmap.step2.item2': 'AI 보조 코딩 (경험 불필요)',
            'roadmap.step2.item3': 'AI 기능 통합 (API)',
            'roadmap.step3.title': '출시하기 — 제품 런칭과 콜드 스타트',
            'roadmap.step3.desc': '제품을 배포하고, 최소 비용으로 첫 사용자를 확보하며, 피드백 루프를 구축합니다.',
            'roadmap.step3.item1': '원클릭 배포',
            'roadmap.step3.item2': '저비용 초기 사용자 확보',
            'roadmap.step3.item3': '데이터 기반 반복 최적화',
            'roadmap.step4.title': '수익화 — 비즈니스 모델과 지속 성장',
            'roadmap.step4.desc': '무료에서 유료로, 제품의 비즈니스 모델을 찾고 0에서 1로의 수익 돌파구를 마련합니다.',
            'roadmap.step4.item1': '가격 전략 설계',
            'roadmap.step4.item2': '전환율 최적화',
            'roadmap.step4.item3': '지속 가능한 제품 성장',

            /* Modules */
            'modules.tag': '커리큘럼',
            'modules.title': '4가지 실전 모듈',
            'modules.desc': '체계적인 학습 경로 + 프로젝트 실습',
            'modules.week1.title': 'AI 제품 기초와 사고법',
            'modules.week1.item1': 'AI 제품全景図: 지금 무엇을 할 수 있을까',
            'modules.week1.item2': '프로덕트 씽킹 입문: 문제 중심 vs 기술 중심',
            'modules.week1.item3': 'AI로 방향 정하기: 시장 조사 실습',
            'modules.week1.item4': '레기온 프로젝트 시작: 첫 프로젝트 선정',
            'modules.week1.output': 'AI 제품 방향성 결정 및 시장 검증 완료',
            'modules.week2.title': 'AI 프로토타입 설계와 노코드 구현',
            'modules.week2.item1': 'AI로 제품 UI 디자인하기',
            'modules.week2.item2': '노코드 도구 실습: 프로토타입 구축',
            'modules.week2.item3': 'AI 프로그래밍 입문: 자연어로 코드 생성',
            'modules.week2.item4': 'AI 기능 통합: API에서 기능 구현까지',
            'modules.week2.output': '핵심 기능을 갖춘 MVP 프로토타입 완성',
            'modules.week3.title': '제품 런칭과 운영 실습',
            'modules.week3.item1': '제품 배포와 런칭 전체 프로세스',
            'modules.week3.item2': '도메인, 서버, 설정 한 번에 해결',
            'modules.week3.item3': '콜드 스타트 전략: 첫 사용자 확보 방법',
            'modules.week3.item4': '데이터 분석과 반복 최적화',
            'modules.week3.output': '제품 정식 런칭, 첫 사용자 피드백 수집',
            'modules.week4.title': '비즈니스 모델과 데모 데이',
            'modules.week4.item1': 'AI 제품 비즈니스 모델 설계',
            'modules.week4.item2': '가격 전략: 무료, 유료, 구독',
            'modules.week4.item3': '제품 피치: 제품 스토리 전달하기',
            'modules.week4.item4': '레기온 데모 데이: 제품 발표',
            'modules.week4.output': '완벽한 AI 제품 + 비즈니스화 계획',

            /* Features */
            'features.tag': '특징',
            'features.title': '왜 AI Product Legion을 선택해야 할까요?',
            'features.desc': '우리가 제공하는 것은 단순한 강의가 아니라 완벽한 실전 생태계입니다',
            'features.card1.title': '실전 중심, 이론만 있는 게 아니다',
            'features.card1.desc': '매 수업마다 실제 제품 기능을 하나씩 만듭니다. 배우면 바로 사용하고, 사용하면 바로 런칭할 수 있습니다.',
            'features.card2.title': 'AI로 학습 전 과정 강화',
            'features.card2.desc': 'AI를 사용하여 AI 제품을 배웁니다 — AI를 개인 튜터, 코딩 어시스턴트, 제품 어드바이저로 활용하는 방법을 가르칩니다.',
            'features.card3.title': '레기온 팀 모드',
            'features.card3.desc': '더 이상 혼자 싸우지 마세요. 뜻이 같은 사람들과 함께 배우고, 서로 리뷰하고, 팀을 이루어 프로젝트를 진행합니다.',
            'features.card4.title': '데모 데이 기회',
            'features.card4.desc': '우수 제품은 레기온 데모 데이에서 발표되어 멘토 피드백, 투자자 관심, 미디어 보도 기회를 얻을 수 있습니다.',
            'features.card5.title': '100+ 바로 사용 가능한 템플릿',
            'features.card5.desc': 'PRD 템플릿, UI 템플릿, 마케팅 카피 템플릿 — 가져다가 바로 사용하세요.',
            'features.card6.title': '평생 무료 업데이트',
            'features.card6.desc': 'AI는 매일 진화합니다. 한 번 가입하면 향후 모든 커리큘럼 업데이트를 평생 무료로 학습할 수 있습니다.',

            /* Showcase */
            'showcase.tag': '수강생 작품',
            'showcase.title': '레기온 멤버들이 만든 작품 구경하기',
            'showcase.desc': '그들도 당신처럼 제로에서 시작해 30일 후 자신만의 AI 제품을 갖게 되었습니다',
            'showcase.card1.badge': 'AI 고객 서비스',
            'showcase.card1.title': '스마트 지원 봇',
            'showcase.card1.desc': 'Claude API로 구축된 AI 고객 서비스 시스템. 소상공인에게 24시간 자동 응답 제공.',
            'showcase.card1.author': '전직 행정직, 코딩 초보',
            'showcase.card2.badge': 'AI 콘텐츠 도구',
            'showcase.card2.title': 'SNS AI 라이터',
            'showcase.card2.desc': '원클릭 바이럴 콘텐츠 생성. 스타일 커스터마이징 및 멀티플랫폼 배포 지원.',
            'showcase.card2.author': '전직 영업사원, 노코드',
            'showcase.card3.badge': 'AI 교육 제품',
            'showcase.card3.title': 'AI 영어 튜터',
            'showcase.card3.desc': 'AI 기반 영어 회화 연습. 실시간 대화 교정 및 시나리오 시뮬레이션.',
            'showcase.card3.author': '전직 교사, 코딩 초보',

            /* Pricing */
            'pricing.tag': '레기온 가입',
            'pricing.title': '당신에게 맞는 플랜 선택',
            'pricing.desc': '자신에게 투자하고 AI 시대의 핵심 스킬을 마스터하세요',
            'pricing.plan1.name': '자습형',
            'pricing.plan1.desc': '자기주도 학습이 가능하고 예산이 제한된 초보자용',
            'pricing.plan1.feature1': '전체 녹화 강의 (지속 업데이트)',
            'pricing.plan1.feature2': '100+ 실전 템플릿',
            'pricing.plan1.feature3': '커뮤니티 액세스',
            'pricing.plan1.feature4': 'AI 제품 도구 키트',
            'pricing.plan1.cta': '자습 시작하기',
            'pricing.plan2.badge': '🔥 가장 인기',
            'pricing.plan2.name': '실전형',
            'pricing.plan2.desc': '실제 제품을 만들고 지도가 필요한 학습자용',
            'pricing.plan2.feature1': '전체 녹화 강의 (지속 업데이트)',
            'pricing.plan2.feature2': '100+ 실전 템플릿',
            'pricing.plan2.feature3': '커뮤니티 액세스',
            'pricing.plan2.feature4': 'AI 제품 도구 키트',
            'pricing.plan2.feature5': '주간 멘터 라이브 Q&A',
            'pricing.plan2.feature6': '과제 리뷰 및 피드백',
            'pricing.plan2.feature7': '데모 데이 참가 자격',
            'pricing.plan2.feature8': '수료증 + 포트폴리오 지도',
            'pricing.plan2.cta': '🔥 실전형 가입하기',
            'pricing.plan3.name': '개인 지도형',
            'pricing.plan3.desc': '고품질 제품을 목표로 1:1 지도가 필요한 분',
            'pricing.plan3.feature1': '실전형의 모든 혜택',
            'pricing.plan3.feature2': '완전 1:1 멘터 지도',
            'pricing.plan3.feature3': '맞춤형 제품 방향',
            'pricing.plan3.feature4': '아키텍처 설계 및 리뷰',
            'pricing.plan3.feature5': '코드 리뷰 및 최적화',
            'pricing.plan3.feature6': '배포 전 과정 지원',
            'pricing.plan3.feature7': '비즈니스 컨설팅 및 네트워킹',
            'pricing.plan3.feature8': '평생 멘터 액세스',
            'pricing.plan3.cta': '개인 지도형 문의',
            'pricing.price_lifetime': '/ 평생',

            /* Testimonials */
            'testimonials.tag': '수강생 후기',
            'testimonials.title': '레기온에서의 변화',
            'testimonials.card1.text': '"10년 동안 직장인으로 지내면서 뭔가 만들고 싶었지만 어디서부터 시작해야 할지 몰랐어요. 레기온은 완벽한 로드맵을 제시해줬고, 30일 후에 첫 제품을 런칭했습니다!"',
            'testimonials.card1.author': '왕씨',
            'testimonials.card1.role': '전직 HR, 현 개인 개발자 | 실전형',
            'testimonials.card2.text': '"코딩 경험 제로였어요. 2주차 강의대로 Cursor와 Claude로 AI 영어 튜터를 만들었습니다. 지금은 매달 300만원 이상의 수동적 소득이 있습니다!"',
            'testimonials.card2.author': '장군',
            'testimonials.card2.role': '대학교 2학년 | 개인 지도형',
            'testimonials.card3.text': '"가장 가치 있었던 것은 레기온 커뮤니티입니다. 포기하고 싶을 때마다 모두의 진행 상황을 보며 동기부여를 받았어요. 외로움이 함께하는 여정으로 바뀌었습니다."',
            'testimonials.card3.author': '천자매',
            'testimonials.card3.role': '창업가 | 실전형',
            'testimonials.card4.text': '"개인 지도형 멘터가 정말 대단했어요. 막연한 아이디어에서 1,000명 이상의 사용자를 가진 제품까지, 매 단계를 명확하게 안내해주었습니다."',
            'testimonials.card4.author': '류공',
            'testimonials.card4.role': '커리어 체인저 | 개인 지도형',

            /* FAQ */
            'faq.tag': 'FAQ',
            'faq.title': '궁금하실 점',
            'faq.q1': '코딩을 전혀 못하는데 정말 AI 제품을 만들 수 있나요?',
            'faq.a1': '네! 수강생의 80%가 제로 코딩 경험으로 시작합니다. 최신 AI 도구(Cursor, Claude)를 사용하면 자연어로 코드를 생성할 수 있습니다. 커리큘럼은 비기술적 배경을 위해 설계되었으며, 2주차에는 AI를 사용하여 코드를 작성하고 제품을 구축하는 방법을 단계별로 안내합니다. 많은 졸업생이 제품을 런칭하고 수익화에 성공했습니다.',
            'faq.q2': '어느 정도의 시간 투자가 필요한가요?',
            'faq.a2': '매일 1-2시간, 주말에는 더 많은 시간을 투자할 것을 권장합니다. 30일 주기로 매주 정해진 학습 과제와 프로젝트가 있습니다. 시간이 부족하다면 모든 강의가 녹화되어 있어 자신의 페이스대로 학습할 수 있습니다. 하지만 주간 라이브 세션과 과제를 따라가는 것이 가장 효과적입니다.',
            'faq.q3': '강의는 녹화인가요, 라이브인가요?',
            'faq.a3': '자습형은 전부 녹화 강의입니다. 실전형과 개인 지도형은 주간 멘터 라이브 Q&A와 녹화 강의가 포함됩니다. 모든 라이브 세션은 녹화되어 나중에 시청 가능합니다. 콘텐츠는 지속적으로 업데이트되며, 한 번 가입하면 향후 모든 업데이트를 무료로 학습할 수 있습니다.',
            'faq.q4': '30일 후 어떤 제품을 만들 수 있나요?',
            'faq.a4': '30일 후 완전히 기능하는 배포 가능한 AI 제품을 갖게 됩니다. 졸업생들은 AI 고객 서비스 봇, AI 콘텐츠 생성 도구, AI 학습 도우미, AI 이미지 처리 도구 등을 만들었습니다. 제품 형태는 웹 앱, 미니 프로그램, API 서비스 등 관심사에 따라 선택할 수 있습니다.',
            'faq.q5': '환불 정책이 있나요?',
            'faq.a5': '네, 7일 무조건 환불 보장제가 있습니다. 가입 후 7일 이내에 강의가 자신에게 맞지 않는다고 판단되면 전액 환불해드립니다. 저희는 품질에 자신 있지만, 여러분이 걱정 없이 학습을 시작할 수 있기를 바랍니다.',
            'faq.q6': '플랜 간 업그레이드가 가능한가요?',
            'faq.a6': '물론입니다! 자습형으로 시작해서 언제든지 차액을 지불하고 실전형이나 개인 지도형으로 업그레이드할 수 있습니다. 업그레이드 후 즉시 해당 플랜의 모든 혜택을 이용할 수 있습니다. 업그레이드 요금은 실시간 가격을 기준으로 합니다.',

            /* CTA */
            'cta.title': 'AI Product Legion에 가입하세요',
            'cta.desc': '지금 당신의 첫 AI 제품을 만들어보세요. 기다리지 말고, 망설이지 말고, 행동하세요.',
            'cta.btn1': '🔥 지금 가입',
            'cta.btn2': '무료 상담 예약 →',
            'cta.guarantee': '🛡️ 7일 환불 보장 · 제로 리스크',

            /* Footer */
            'footer.tagline': '모든 일반인이 자신만의 AI 제품을 가질 수 있도록.',
            'footer.slogan': '혼자 가면 빨리가고, 함께 가면 멀리갑니다.',
            'footer.nav_title': '빠른 링크',
            'footer.resources_title': '리소스',
            'footer.contact_title': '문의하기',
            'footer.resource1': 'AI 도구',
            'footer.resource2': '수강생 포트폴리오',
            'footer.resource3': '블로그',
            'footer.resource4': '도움말 센터',
            'footer.copyright': '© 2026 AI Product Legion. All rights reserved.',

            /* Agent */
            'agent.greeting': '안녕하세요! AI Product Legion의 코칭 에이전트입니다. 학습 경로 계획, 코스 추천, AI 스킬 레벨 평가 등을 도와드릴 수 있습니다. 궁금하신 점이 있으신가요? 😊',
            'agent.input_placeholder': '질문을 입력하세요...',
            'agent.send': '보내기',
            'agent.suggest1': '초보자인데 가능할까요?',
            'agent.suggest2': '학습 경로를 계획해줘',
            'agent.suggest3': '코스 차이점은?',
            'agent.suggest4': '내 실력을 진단해줘',
            'agent.status_idle': '대기 중',
            'agent.status_thinking': '생각 중...',
            'agent.status_acting': '실행 중',
            'agent.status_waiting': '입력 기다리는 중',
            'agent.status_done': '완료',
        }
    };

    // ===== State =====
    let currentLang = 'zh';

    // ===== Core Functions =====

    function t(key) {
        return LANG[currentLang] && LANG[currentLang][key] !== undefined
            ? LANG[currentLang][key]
            : (LANG.zh[key] || key);
    }

    function setLang(lang) {
        if (!LANG[lang]) return;
        currentLang = lang;
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (_) { /* ignore */ }
        const htmlLangs = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko' };
        document.documentElement.lang = htmlLangs[lang] || 'zh-CN';
        document.documentElement.className = 'lang-' + lang;
        render();
    }

    function getLang() {
        return currentLang;
    }

    function toggleLang() {
        setLang(currentLang === 'zh' ? 'en' : 'zh');
    }

    // ===== Render =====
    function render() {
        // 1. Elements with data-i18n attribute
        document.querySelectorAll(`[${LANG_ATTR}]`).forEach(el => {
            const key = el.getAttribute(LANG_ATTR);
            const value = t(key);

            // Handle innerHTML for elements with HTML content
            if (el.dataset.i18nHtml !== undefined) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });

        // 2. Placeholder translations
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = t(key);
        });

        // 3. Title / tooltip translations
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = t(key);
        });

        // 4. Meta tag content translations
        document.querySelectorAll('[data-i18n-meta]').forEach(el => {
            const key = el.getAttribute('data-i18n-meta');
            el.setAttribute('content', t(key));
        });

        // 5. Update lang switch elements
        document.querySelectorAll('[data-i18n-toggle]').forEach(el => {
            if (el.tagName === 'SELECT') {
                el.value = currentLang;
            } else {
                el.textContent = LANG_NAMES[currentLang === 'zh' ? 'en' : 'zh'] || 'EN';
            }
        });

        // Dispatch event for any reactive components
        document.dispatchEvent(new CustomEvent('i18n:changed', {
            detail: { lang: currentLang }
        }));
    }

    // ===== Init =====
    function init() {
        // Restore saved preference
        let saved = 'zh';
        try {
            saved = localStorage.getItem(STORAGE_KEY) || 'zh';
        } catch (_) { /* ignore */ }
        currentLang = 'zh'; // default
        if (LANG[saved]) {
            currentLang = saved;
        }
        const htmlLangs = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko' };
        document.documentElement.lang = htmlLangs[currentLang] || 'zh-CN';
        document.documentElement.className = 'lang-' + currentLang;

        // Bind lang toggle elements
        document.querySelectorAll('[data-i18n-toggle]').forEach(el => {
            if (el.tagName === 'SELECT') {
                el.addEventListener('change', (e) => {
                    setLang(e.target.value);
                });
            } else {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleLang();
                });
            }
        });

        // Initial render
        render();
        console.log(`[i18n] Initialized: ${currentLang}`);
    }

    return {
        init,
        t,
        setLang,
        getLang,
        toggleLang,
        render,
        _dict: LANG // expose for debugging
    };
})();
