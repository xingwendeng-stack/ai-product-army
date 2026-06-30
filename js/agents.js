/**
 * ============================================================
 *  Agent Definitions — AI产品军团实战
 *
 *  5 agents: Coach, Roadmap, Assessment, Pricing, Navigator
 * ============================================================
 */
'use strict';

// Agent configurations using the AgentCore framework
const AGENT_DEFINITIONS = (() => {

    const { Tool } = window.AgentCore;

    // ===== Shared Tools =====

    const tool_scrollTo = new Tool({
        name: 'scrollToSection',
        description: '将页面滚动到指定部分',
        validate: (p) => p && p.section,
        execute: (params) => {
            const el = document.getElementById(params.section);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return { success: true, section: params.section };
            }
            return { success: false, error: `Section #${params.section} not found` };
        }
    });

    const tool_highlight = new Tool({
        name: 'highlightSection',
        description: '高亮页面上的某个区域，吸引用户注意',
        validate: (p) => p && p.selector,
        execute: (params) => {
            const el = document.querySelector(params.selector);
            if (el) {
                el.classList.add('agent-highlight');
                el.style.transition = 'box-shadow 0.3s';
                el.style.boxShadow = '0 0 30px rgba(99,102,241,0.4)';
                setTimeout(() => {
                    el.style.boxShadow = '';
                    el.classList.remove('agent-highlight');
                }, params.duration || 3000);
                return { success: true };
            }
            return { success: false };
        }
    });

    const tool_showMessage = new Tool({
        name: 'showNotification',
        description: '在页面角落显示通知消息',
        validate: () => true,
        execute: (params) => {
            const notif = document.createElement('div');
            notif.className = 'agent-notification';
            notif.textContent = params.text;
            notif.style.cssText = `
                position: fixed; bottom: 100px; right: 24px;
                background: rgba(20,20,48,0.95); border: 1px solid rgba(99,102,241,0.3);
                border-radius: 12px; padding: 16px 20px; max-width: 320px;
                color: #f0f0ff; font-size: 0.9rem; z-index: 9999;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5);
                animation: notifIn 0.3s ease-out;
                backdrop-filter: blur(10px);
            `;
            document.head.insertAdjacentHTML('beforeend',
                `@keyframes notifIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`);
            document.body.appendChild(notif);
            setTimeout(() => {
                notif.style.opacity = '0';
                notif.style.transform = 'translateY(8px)';
                notif.style.transition = '0.3s';
                setTimeout(() => notif.remove(), 300);
            }, params.duration || 4000);
            return { success: true };
        }
    });

    // ===== Coach Agent =====
    const coachAgent = {
        name: 'CoachAgent',
        role: '军团的AI教练助手',
        emoji: '🎯',
        instructions: `你是AI产品军团的教练助手。你的职责：
1. 热情欢迎每一位访问者
2. 了解对方的背景、经验和目标
3. 推荐适合的学习路径和课程方案
4. 当需要专业信息（定价、路径等）时，handoff给对应的Agent`,
        capabilities: ['greet', 'recommend', 'collect_info', 'handoff'],
        tools: [tool_scrollTo, tool_highlight, tool_showMessage],
        onStateChange: null,  // Set by Orchestrator
        onMessage: null,
        onToolCall: null,
        onHandoff: null
    };

    // ===== Roadmap Agent =====
    const tool_generateRoadmap = new Tool({
        name: 'generateRoadmap',
        description: '根据用户背景生成个性化学习路径',
        validate: (p) => p && p.background,
        execute: (params) => {
            // Build personalized roadmap content
            const bg = params.background || '通用';
            const exp = params.experience || '零基础';
            let focus = '';

            if (/设计/.test(bg)) focus = 'AI设计工具 + 无代码产品搭建';
            else if (/技术|程序|开发/.test(bg)) focus = 'AI API集成 + 全栈产品开发';
            else if (/运营|营销/.test(bg)) focus = 'AI内容工具 + 自动化工作流';
            else if (/学生/.test(bg)) focus = '从零开始的AI产品实战';
            else if (/创业/.test(bg)) focus = '快速MVP验证 + 商业化';
            else if (/产品/.test(bg)) focus = 'AI产品思维 + 需求分析';
            else focus = 'AI产品入门全流程';

            // Inject personalized content into roadmap section
            const roadmapItems = document.querySelectorAll('.roadmap-item');
            if (roadmapItems.length >= 4) {
                const highlights = [
                    `【针对性建议】用AI工具做市场调研，找到你的${focus}方向`,
                    `【针对性建议】用Cursor+Claude从零搭建${focus}原型`,
                    `【针对性建议】部署上线，重点关注${focus}目标用户群的获取`,
                    `【针对性建议】基于${focus}的变现模式设计`
                ];
                roadmapItems.forEach((item, i) => {
                    if (highlights[i]) {
                        let existing = item.querySelector('.roadmap-agent-note');
                        if (!existing) {
                            existing = document.createElement('div');
                            existing.className = 'roadmap-agent-note';
                            existing.style.cssText = `
                                margin-top: 12px; padding: 10px 14px;
                                background: rgba(99,102,241,0.1);
                                border: 1px solid rgba(99,102,241,0.2);
                                border-radius: 8px; font-size: 0.85rem;
                                color: #a5b4fc;
                            `;
                            item.querySelector('.roadmap-content').appendChild(existing);
                        }
                        existing.textContent = highlights[i];
                        existing.style.display = 'block';
                    }
                });
            }

            // Scroll to roadmap
            const el = document.getElementById('roadmap');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });

            return {
                success: true,
                background: bg,
                experience: exp,
                focus,
                message: `根据你的${bg}背景，我为你定制了上面的实战路径 👆 建议重点关注「${focus}」方向`
            };
        }
    });

    const tool_clearRoadmap = new Tool({
        name: 'clearRoadmapNotes',
        description: '清除之前注入的个性化路径标注',
        validate: () => true,
        execute: () => {
            document.querySelectorAll('.roadmap-agent-note').forEach(el => el.remove());
            return { success: true };
        }
    });

    const roadmapAgent = {
        name: 'RoadmapAgent',
        role: '个性化路径规划师',
        emoji: '🗺️',
        instructions: `你是AI产品军团的路径规划师。根据用户的背景生成个性化学习路径。`,
        capabilities: ['personalize', 'generate_roadmap'],
        tools: [tool_generateRoadmap, tool_clearRoadmap, tool_scrollTo, tool_highlight],
        onStateChange: null,
        onMessage: null,
        onToolCall: null,
        onHandoff: null
    };

    // ===== Assessment Agent =====
    const ASSESSMENT_QUESTIONS = [
        {
            id: 'q1',
            question: '你对AI工具（ChatGPT、Claude等）的熟悉程度？',
            options: [
                { label: '从未用过', score: 0 },
                { label: '偶尔使用', score: 2 },
                { label: '经常使用', score: 3 },
                { label: '非常熟练', score: 5 }
            ]
        },
        {
            id: 'q2',
            question: '你有编程基础吗？',
            options: [
                { label: '完全零基础', score: 0 },
                { label: '了解基础概念', score: 2 },
                { label: '能写简单代码', score: 3 },
                { label: '专业开发者', score: 5 }
            ]
        },
        {
            id: 'q3',
            question: '你是否曾经独立完成过一个产品/项目的从0到1？',
            options: [
                { label: '从来没有', score: 0 },
                { label: '参与过部分环节', score: 2 },
                { label: '独立完成过简单项目', score: 4 },
                { label: '有完整产品经验', score: 5 }
            ]
        },
        {
            id: 'q4',
            question: '你每周可以投入多少时间来学习？',
            options: [
                { label: '少于3小时', score: 1 },
                { label: '3-5小时', score: 2 },
                { label: '5-10小时', score: 4 },
                { label: '10小时以上', score: 5 }
            ]
        }
    ];

    let assessmentState = null;

    const tool_startAssessment = new Tool({
        name: 'startAssessment',
        description: '开始技能评估测验',
        validate: () => true,
        execute: () => {
            assessmentState = {
                current: 0,
                answers: [],
                totalQuestions: ASSESSMENT_QUESTIONS.length
            };
            return {
                success: true,
                question: ASSESSMENT_QUESTIONS[0],
                progress: { current: 0, total: ASSESSMENT_QUESTIONS.length }
            };
        }
    });

    const tool_answerQuestion = new Tool({
        name: 'answerAssessment',
        description: '回答评估测验中的一道题',
        validate: (p) => p && p.questionId && typeof p.score === 'number',
        execute: (params) => {
            if (!assessmentState) return { success: false, error: '测验未开始' };

            assessmentState.answers.push({
                questionId: params.questionId,
                score: params.score,
                label: params.label
            });
            assessmentState.current++;

            if (assessmentState.current >= assessmentState.totalQuestions) {
                // Calculate results
                const totalScore = assessmentState.answers.reduce((s, a) => s + a.score, 0);
                const maxScore = ASSESSMENT_QUESTIONS.length * 5;
                const percentage = Math.round((totalScore / maxScore) * 100);

                let level, recommendation;
                if (percentage < 25) {
                    level = 'AI新手';
                    recommendation = '建议从第1周"AI产品基础与思维"开始学起，打好基础最重要。';
                } else if (percentage < 50) {
                    level = 'AI初学者';
                    recommendation = '建议从第2周"原型设计与零代码实现"切入，快速上手实战。';
                } else if (percentage < 75) {
                    level = 'AI实践者';
                    recommendation = '你可以直接从第3周"产品上线与运营"开始，重点关注如何获取用户。';
                } else {
                    level = 'AI进阶者';
                    recommendation = '你的基础很好！推荐第4周"商业闭环"模块，直接开始商业化探索。私教版1v1指导会帮助你更快落地。';
                }

                const result = {
                    level,
                    score: totalScore,
                    maxScore,
                    percentage,
                    answers: assessmentState.answers,
                    recommendation
                };

                assessmentState = null;
                return { success: true, result };
            }

            return {
                success: true,
                question: ASSESSMENT_QUESTIONS[assessmentState.current],
                progress: { current: assessmentState.current, total: assessmentState.totalQuestions }
            };
        }
    });

    const assessmentAgent = {
        name: 'AssessmentAgent',
        role: '技能评估师',
        emoji: '📊',
        instructions: `你是AI产品军团的技能评估师。通过4道题快速评估用户的AI产品能力水平，给出学习建议。`,
        capabilities: ['assess', 'quiz'],
        tools: [tool_startAssessment, tool_answerQuestion, tool_highlight, tool_scrollTo],
        onStateChange: null,
        onMessage: null,
        onToolCall: null,
        onHandoff: null
    };

    // ===== Pricing Agent =====
    const tool_comparePlans = new Tool({
        name: 'comparePlans',
        description: '对比不同课程方案',
        validate: (p) => true,
        execute: (params) => {
            const query = (params.query || '').toLowerCase();
            let focus = '';

            if (/自学/.test(query)) focus = 'self';
            else if (/实战/.test(query)) focus = 'pro';
            else if (/私教/.test(query)) focus = 'private';
            else focus = 'all';

            const plans = {
                self: { name: '自学版', price: '¥499', tag: '适合预算有限、自律性强的人' },
                pro: { name: '实战版', price: '¥1,999', tag: '🔥 最受欢迎，适合想要指导的学习者' },
                private: { name: '私教版', price: '¥4,999', tag: '适合需要1v1全程指导的精品需求' }
            };

            // Scroll to pricing section and highlight
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                pricingSection.style.transition = 'box-shadow 0.3s';
                pricingSection.style.boxShadow = '0 0 40px rgba(99,102,241,0.15)';
                setTimeout(() => { pricingSection.style.boxShadow = ''; }, 3000);
            }

            if (focus !== 'all') {
                // Highlight specific card
                setTimeout(() => {
                    const cards = document.querySelectorAll('.pricing-card');
                    const idx = focus === 'self' ? 0 : focus === 'pro' ? 1 : 2;
                    if (cards[idx]) {
                        cards[idx].style.transition = 'transform 0.3s, box-shadow 0.3s';
                        cards[idx].style.transform = 'scale(1.05)';
                        cards[idx].style.boxShadow = '0 0 40px rgba(99,102,241,0.4)';
                        setTimeout(() => {
                            cards[idx].style.transform = '';
                            cards[idx].style.boxShadow = '';
                        }, 4000);
                    }
                }, 500);
            }

            return { success: true, plans, focus };
        }
    });

    const tool_calculatePrice = new Tool({
        name: 'calculatePayment',
        description: '计算不同方案的价格和支付方式',
        validate: () => true,
        execute: (params) => {
            const plan = (params.plan || '').toLowerCase();
            const prices = {
                '自学版': { price: 499, original: 699, discount: '限时优惠', monthly: '约¥42/月(按年)' },
                '实战版': { price: 1999, original: 2999, discount: '限时优惠', monthly: '约¥167/月(按年)' },
                '私教版': { price: 4999, original: 6999, discount: '限时优惠', monthly: '约¥417/月(按年)' }
            };
            if (prices[plan]) {
                return { success: true, plan, ...prices[plan] };
            }
            return { success: true, plans: prices };
        }
    });

    const tool_recommendPlan = new Tool({
        name: 'recommendPlan',
        description: '根据用户背景推荐最合适的课程方案',
        validate: (p) => p && p.background,
        execute: (params) => {
            const bg = params.background || '';
            let recommendation;

            if (/学生/.test(bg)) {
                recommendation = { plan: '自学版', reason: '预算友好，可以先从自学版入门，后续可补差价升级' };
            } else if (/创业/.test(bg) || /产品/.test(bg)) {
                recommendation = { plan: '私教版', reason: '创业需要快速落地，私教1v1指导帮你少走弯路' };
            } else if (/运营|设计|营销|教育|医疗|行政/.test(bg)) {
                recommendation = { plan: '实战版', reason: '非技术背景+有学习意愿，实战版最受欢迎，性价比最高' };
            } else if (/技术|程序|开发/.test(bg)) {
                recommendation = { plan: '实战版', reason: '技术基础好，实战版的直播答疑+作业批改足够支持你' };
            } else {
                recommendation = { plan: '实战版', reason: '综合考虑，实战版适合大多数学习者的情况' };
            }

            return { success: true, recommendation };
        }
    });

    const pricingAgent = {
        name: 'PricingAgent',
        role: '课程顾问',
        emoji: '💰',
        instructions: `你是AI产品军团的课程顾问。帮用户对比方案、计算价格、推荐最合适的课程。`,
        capabilities: ['compare', 'pricing', 'recommend'],
        tools: [tool_comparePlans, tool_calculatePrice, tool_recommendPlan, tool_scrollTo, tool_highlight],
        onStateChange: null,
        onMessage: null,
        onToolCall: null,
        onHandoff: null
    };

    // ===== Navigator Agent =====
    const navigatorAgent = {
        name: 'NavigatorAgent',
        role: '行为观察者',
        emoji: '👀',
        instructions: `你在后台静默运行，观察用户的浏览行为。当合适的时机出现时，主动与用户互动或通知其他Agent。`,
        capabilities: ['observer', 'proactive'],
        tools: [tool_showMessage, tool_scrollTo],
        onStateChange: null,
        onMessage: null,
        onToolCall: null,
        onHandoff: null
    };

    return {
        CoachAgent: coachAgent,
        RoadmapAgent: roadmapAgent,
        AssessmentAgent: assessmentAgent,
        PricingAgent: pricingAgent,
        NavigatorAgent: navigatorAgent
    };
})();

if (typeof window !== 'undefined') {
    window.AGENT_DEFINITIONS = AGENT_DEFINITIONS;
    window.ASSESSMENT_QUESTIONS = typeof ASSESSMENT_QUESTIONS !== 'undefined' ? ASSESSMENT_QUESTIONS : null;
}
