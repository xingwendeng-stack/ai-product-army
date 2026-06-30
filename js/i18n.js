/**
 * ============================================================
 *  i18n — 中文 / English 双语支持
 * ============================================================
 */
'use strict';

window.I18n = (() => {

    const STORAGE_KEY = 'ai_legion_lang';
    const LANG_ATTR = 'data-i18n';

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
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
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

        // 5. Update lang switch button text
        document.querySelectorAll('[data-i18n-toggle]').forEach(el => {
            el.textContent = t('nav.lang');
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
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

        // Bind lang toggle buttons
        document.querySelectorAll('[data-i18n-toggle]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLang();
            });
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
