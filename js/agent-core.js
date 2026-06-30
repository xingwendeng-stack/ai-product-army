/**
 * ============================================================
 *  Agent Core Framework — Agent-Native Runtime
 *
 *  Tool, Agent, Memory, Orchestrator
 *
 *  Principle: Agents are autonomous participants. They observe,
 *  reason, use tools, collaborate, and remember.
 * ============================================================
 */
'use strict';

// ===== Tool =====
class Tool {
    constructor(config) {
        this.name = config.name;
        this.description = config.description;
        this.validateFn = config.validate || (() => true);
        this.executeFn = config.execute;
    }

    validate(params) {
        return this.validateFn(params);
    }

    execute(params, context = {}) {
        if (!this.validate(params)) {
            console.warn(`[Tool:${this.name}] Validation failed`, params);
            return { success: false, error: '参数验证失败' };
        }
        return this.executeFn(params, context);
    }
}

// ===== Memory =====
class Memory {
    constructor() {
        this.shortTerm = new Map();        // session-only
        this.visitorId = this._getVisitorId();
        this.longTerm = this._loadLongTerm();
    }

    _generateId() {
        return 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    }

    _getVisitorId() {
        try {
            let id = localStorage.getItem('agent_visitor_id');
            if (!id) {
                id = this._generateId();
                localStorage.setItem('agent_visitor_id', id);
            }
            return id;
        } catch (e) {
            // localStorage unavailable (private browsing, quota, etc.)
            return this._generateId();
        }
    }

    _loadLongTerm() {
        try {
            const raw = localStorage.getItem(`agent_memory_${this.visitorId}`);
            if (raw) {
                const data = JSON.parse(raw);
                data.sessionCount = (data.sessionCount || 0) + 1;
                return data;
            }
        } catch (e) { /* ignore corrupt data */ }
        return {
            visitorId: this.visitorId,
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            sessionCount: 1,
            profile: {},
            interactionHistory: [],
            behaviorData: {
                sectionsViewed: [],
                scrollDepth: 0,
                timeOnPage: 0
            }
        };
    }

    _persist() {
        try {
            localStorage.setItem(`agent_memory_${this.visitorId}`, JSON.stringify(this.longTerm));
        } catch (e) { /* quota exceeded etc */ }
    }

    // === Short-term (session) ===
    save(agentName, key, value) {
        const agentKey = `${agentName}:${key}`;
        this.shortTerm.set(agentKey, value);
        // Also sync to long-term interaction history
        this.longTerm.interactionHistory.push({
            agent: agentName,
            key,
            value: typeof value === 'object' ? JSON.stringify(value).slice(0, 200) : String(value),
            timestamp: new Date().toISOString()
        });
        this._persist();
    }

    recall(agentName, key) {
        const agentKey = `${agentName}:${key}`;
        if (this.shortTerm.has(agentKey)) return this.shortTerm.get(agentKey);
        return null;
    }

    // === Shared memory (cross-agent) ===
    remember(key, value) {
        if (key === 'profile') {
            Object.assign(this.longTerm.profile, value);
        } else {
            this.longTerm[key] = value;
        }
        this._persist();
    }

    get(key) {
        if (key === 'profile') return { ...this.longTerm.profile };
        return this.longTerm[key];
    }

    getVisitorId() { return this.visitorId; }

    getVisitorProfile() { return { ...this.longTerm.profile }; }

    isNewVisitor() { return this.longTerm.sessionCount <= 1; }

    isReturningVisitor() { return this.longTerm.sessionCount > 1; }

    updateBehavior(data) {
        Object.assign(this.longTerm.behaviorData, data);
        this._persist();
    }

    recordSectionView(sectionId) {
        const viewed = this.longTerm.behaviorData.sectionsViewed;
        if (!viewed.includes(sectionId)) {
            viewed.push(sectionId);
            this._persist();
        }
    }

    getCurrentContext() {
        return {
            visitorId: this.visitorId,
            isNew: this.isNewVisitor(),
            isReturning: this.isReturningVisitor(),
            sessionCount: this.longTerm.sessionCount,
            profile: { ...this.longTerm.profile },
            behavior: { ...this.longTerm.behaviorData },
            lastInteraction: this.longTerm.interactionHistory.slice(-5)
        };
    }

    // Reset session memory but keep long-term
    resetSession() {
        this.shortTerm.clear();
    }
}

// ===== Agent =====
class Agent {
    constructor(config) {
        this.name = config.name;
        this.role = config.role;
        this.emoji = config.emoji || '🤖';
        this.instructions = config.instructions || '';
        this.tools = config.tools || [];
        this.capabilities = config.capabilities || [];
        this.memory = config.memory || null;   // shared memory reference
        this.orchestrator = config.orchestrator || null; // reference to orchestrator
        this.state = 'idle';                     // idle | thinking | acting | awaiting_input | done
        this.context = {};
        this._onStateChange = config.onStateChange || null;
        this._onMessage = config.onMessage || null;
        this._onToolCall = config.onToolCall || null;
        this._onHandoff = config.onHandoff || null;

        // Build tool map for fast lookup
        this._toolMap = {};
        this.tools.forEach(t => { this._toolMap[t.name] = t; });
    }

    setState(newState) {
        const old = this.state;
        this.state = newState;
        if (this._onStateChange) {
            this._onStateChange(this.name, old, newState);
        }
    }

    getTool(name) {
        return this._toolMap[name] || null;
    }

    hasCapability(cap) {
        return this.capabilities.includes(cap);
    }

    /**
     * Think: Process input, consult memory, decide on action.
     * Returns a plan: { action: 'respond'|'use_tool'|'handoff', tool?, params?, message?, targetAgent?, reasoning: [] }
     */
    think(input, context = {}) {
        this.setState('thinking');
        this.context = { ...this.context, ...context };

        // Default reasoning process (can be overridden by subclasses / instances)
        const reasoning = [];
        reasoning.push(`[${this.name}] 收到输入: "${typeof input === 'string' ? input : JSON.stringify(input)}"`);

        // 1. Check memory
        const profile = this.memory ? this.memory.getVisitorProfile() : {};
        if (profile.background) {
            reasoning.push(`[记忆] 已知用户背景: ${profile.background}`);
        }
        if (profile.experience) {
            reasoning.push(`[记忆] 已知用户经验: ${profile.experience}`);
        }

        // 2. Basic intent classification based on keywords
        const inputStr = typeof input === 'string' ? input : (input.text || '');
        const intent = this._classifyIntent(inputStr);

        reasoning.push(`[意图识别] 分类: ${intent}`);

        // 3. Decide action
        const plan = this._decide(intent, inputStr, reasoning);

        return plan;
    }

    _classifyIntent(input) {
        const lower = input.toLowerCase();
        if (/价格|多少钱|费用|价|定价|方案|版本|区别|对比|自学|实战|私教|plan|price|pricing/.test(lower)) return 'pricing';
        if (/路径|学习|怎么学|从哪|如何开始|step|roadmap|路线|流程|步骤/.test(lower)) return 'roadmap';
        if (/评估|测验|测试|水平|自测|assess|quiz|skill|技能|能力/.test(lower)) return 'assessment';
        if (/背景|我是|我是做|我是学|我目前|基础|不会编程|零基础|designer|developer|学生|运营|产品/.test(lower)) return 'background';
        if (/项目|方向|想法|idea|做什么|产品|做什么好/.test(lower)) return 'coach';
        if (/你好|hi|hello|嗨|在吗|help|帮助|能做什么/.test(lower)) return 'greeting';
        if (/报名|加入|购买|下单|subscribe|join|enroll|注册|联系|咨询/.test(lower)) return 'enrollment';
        return 'general';
    }

    _decide(intent, input, reasoning) {
        switch (intent) {
            case 'greeting':
                reasoning.push('[决策] 问候意图 → 欢迎并自我介绍');
                return {
                    action: 'respond',
                    message: this._greeting(),
                    reasoning
                };

            case 'background':
                reasoning.push('[决策] 背景采集 → 询问详细信息');
                return {
                    action: 'respond',
                    message: this._askBackground(input),
                    reasoning
                };

            case 'pricing':
                reasoning.push('[决策] 定价咨询 → 需要PricingAgent处理');
                return {
                    action: 'handoff',
                    targetAgent: 'PricingAgent',
                    context: { query: input },
                    reasoning
                };

            case 'roadmap':
                reasoning.push('[决策] 学习路径 → 需要RoadmapAgent处理');
                return {
                    action: 'handoff',
                    targetAgent: 'RoadmapAgent',
                    context: { query: input },
                    reasoning
                };

            case 'assessment':
                reasoning.push('[决策] 技能评估 → 需要AssessmentAgent处理');
                return {
                    action: 'handoff',
                    targetAgent: 'AssessmentAgent',
                    context: { query: input },
                    reasoning
                };

            case 'enrollment':
                reasoning.push('[决策] 报名咨询 → 转移给PricingAgent');
                return {
                    action: 'handoff',
                    targetAgent: 'PricingAgent',
                    context: { query: input, intent: 'enroll' },
                    reasoning
                };

            case 'coach':
            case 'general':
            default:
                reasoning.push('[决策] 通用咨询 → AI产品推荐');
                return {
                    action: 'respond',
                    message: this._generalResponse(input),
                    reasoning
                };
        }
    }

    _greeting() {
        const profile = this.memory ? this.memory.getVisitorProfile() : {};
        if (profile.name) {
            return `又见面了 ${profile.name}！我是军团教练 🤝 上次聊到你背景是${profile.background || '...'}，要继续推进你的AI产品计划吗？`;
        }
        return `你好！我是 AI产品军团 的教练 Agent 🎯\n\n我可以帮你：\n1️⃣ 评估你的背景 → 推荐最适合的学习路径\n2️⃣ 生成个性化的AI产品实战路线图\n3️⃣ 对比不同课程方案，找到最适合你的\n4️⃣ 技能自测，了解你目前的水平\n\n你是做什么的？之前有接触过AI产品吗？`;
    }

    _askBackground(input) {
        // Try to extract info
        const extracted = this._extractProfile(input);
        if (extracted && this.memory) {
            this.memory.remember('profile', extracted);
        }
        const profile = this.memory ? this.memory.getVisitorProfile() : {};

        if (profile.background && profile.experience) {
            return `了解了！你是${profile.background}背景，${profile.experience}。根据我的判断，第2周的"AI原型设计与零代码实现"模块最适合你这样的同学入门。\n\n要不要我让 **路径规划师 Agent** 给你生成一个专属学习路线图？`;
        }

        let msg = '谢谢分享！为了给你最精准的推荐，我想再多了解一点：\n\n';
        if (!profile.background) {
            msg += '📍 你目前的职业/背景是什么？（比如：设计师、程序员、运营、学生、创业者...）\n';
        }
        if (!profile.experience) {
            msg += '📍 你接触AI的程度是？（零基础 / 用过AI工具 / 有编程基础 / 做过AI项目）\n';
        }
        if (!profile.goal) {
            msg += '📍 你学AI产品的目标是？（做副业 / 转行 / 创业 / 公司内部落地）\n';
        }
        return msg;
    }

    _extractProfile(input) {
        const profile = {};
        const lower = input.toLowerCase();

        // Background
        if (/设计|ui|ux|designer|美工|平面/.test(lower)) profile.background = '设计师';
        else if (/程序|开发|码农|程序员|developer|工程师|技术/.test(lower)) profile.background = '技术开发';
        else if (/运营|市场|营销|market|operation|销售/.test(lower)) profile.background = '运营/营销';
        else if (/学生|大学|study|学习/.test(lower)) profile.background = '在校学生';
        else if (/创业|老板|business|entrepreneur|自由/.test(lower)) profile.background = '创业者';
        else if (/产品|pm|产品经理/.test(lower)) profile.background = '产品经理';
        else if (/行政|hr|人事|财务|finance|admin/.test(lower)) profile.background = '职能支持';
        else if (/教师|老师|教育|培训|teacher/.test(lower)) profile.background = '教育行业';
        else if (/医疗|医生|护士|doctor|health/.test(lower)) profile.background = '医疗行业';
        else profile.background = '其他';

        // Experience
        if (/零基础|不会|没接触|完全不懂|beginner|newbie/.test(lower)) profile.experience = '零基础';
        else if (/用过|了解|cursor|chatgpt|claude|midjourney/.test(lower)) profile.experience = '用过AI工具';
        else if (/编程|代码|会写|python|javascript|有基础/.test(lower)) profile.experience = '有编程基础';
        else if (/做过|项目|经验|有产品/.test(lower)) profile.experience = '做过AI项目';
        else profile.experience = '';

        // Goal
        if (/副业|赚钱|收入|money|passive/.test(lower)) profile.goal = '做副业增收';
        else if (/转行|换工作|跳槽|career/.test(lower)) profile.goal = '转行AI领域';
        else if (/创业|startup|自己做产品|独立/.test(lower)) profile.goal = '创业做产品';
        else if (/公司|内部|落地|团队|team/.test(lower)) profile.goal = '公司内部落地';
        else if (/兴趣|好玩|了解|学习/.test(lower)) profile.goal = '兴趣学习';
        else profile.goal = '';

        return Object.keys(profile).length > 0 ? profile : null;
    }

    _generalResponse(input) {
        const profile = this.memory ? this.memory.getVisitorProfile() : {};
        if (profile.background) {
            return `根据你的${profile.background}背景，我建议可以从实战路径的第二步"做出来"开始，用AI工具快速搭一个MVP。\n\n需要我让 **路径规划师** 给你出个详细计划吗？或者你可以先看看下方的课程体系，看看哪一周的内容最吸引你 👇`;
        }
        return `这是一个很好的方向！AI产品军团就是专门帮助普通人从0到1做出自己的AI产品的。\n\n我建议你先看看下方的 **"常见痛点"** 部分，看看是否有你正在经历的困惑。然后我可以根据你的具体情况，推荐最适合的入门路径。\n\n简单告诉我：你目前是什么背景？之前接触过AI产品吗？`;
    }

    /**
     * Act: Execute a tool or handoff
     */
    act(plan) {
        this.setState('acting');

        switch (plan.action) {
            case 'respond':
                this.setState('awaiting_input');
                if (this._onMessage) {
                    this._onMessage(this.name, plan.message, plan.reasoning);
                }
                return { success: true };

            case 'use_tool':
                const tool = this.getTool(plan.tool);
                if (!tool) {
                    console.warn(`[Agent:${this.name}] Tool not found: ${plan.tool}`);
                    return { success: false, error: `Tool ${plan.tool} not found` };
                }
                if (this._onToolCall) {
                    this._onToolCall(this.name, plan.tool, plan.params);
                }
                let result;
                try {
                    result = tool.execute(plan.params, this.context);
                } catch (e) {
                    console.error(`[Agent:${this.name}] Tool ${plan.tool} threw:`, e);
                    result = { success: false, error: `工具执行异常: ${e.message}` };
                }
                // After tool, re-think with result
                this.setState('thinking');
                const nextPlan = this.think(result, this.context);
                return this.act(nextPlan);

            case 'handoff':
                if (this._onHandoff) {
                    this._onHandoff(this.name, plan.targetAgent, plan.context, plan.reasoning);
                }
                this.setState('done');
                return { success: true, handoff: true, targetAgent: plan.targetAgent };

            default:
                this.setState('idle');
                return { success: false, error: `Unknown action: ${plan.action}` };
        }
    }

    /**
     * Call remote LLM Worker for agent reasoning
     */
    async remoteThink(input, context = {}) {
        const apiEndpoint = this.orchestrator?.apiEndpoint;
        if (!apiEndpoint) return null;

        const conversation = this.orchestrator?.conversationHistory?.slice(-10).map(entry => ({
            role: entry.agent === 'NavigatorAgent' ? 'system' : (entry.agent === 'user' ? 'user' : 'agent'),
            content: entry.message || ''
        })) || [];

        const payload = {
            agent: {
                name: this.name,
                role: this.role,
                instructions: this.instructions,
                capabilities: this.capabilities
            },
            conversation,
            userInput: typeof input === 'string' ? input : (input.text || ''),
            memory: this.memory ? this.memory.getCurrentContext() : {}
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) return null;

            const data = await response.json();
            if (data.fallback) return null;

            return {
                action: data.action || 'respond',
                message: data.message || '',
                toolCall: data.toolCall || null,
                reasoning: data.reasoning || [`[LLM] ${this.name} 已响应`]
            };
        } catch (e) {
            console.warn(`[Agent:${this.name}] Remote think failed, using fallback:`, e.message);
            return null;
        }
    }

    /**
     * Receive a message from user (or other agent)
     * Tries remote LLM first, falls back to rule-based thinking.
     */
    async receive(input, context = {}) {
        // Try remote LLM inference
        const remotePlan = await this.remoteThink(input, context);
        if (remotePlan) {
            this.setState('thinking');
            if (remotePlan.action === 'respond') {
                this.setState('awaiting_input');
                if (this._onMessage) {
                    this._onMessage(this.name, remotePlan.message, remotePlan.reasoning);
                }
                return { success: true, source: 'llm' };
            }
            if (remotePlan.action === 'use_tool' && remotePlan.toolCall) {
                // Convert toolCall to a plan and act
                const toolPlan = {
                    action: 'use_tool',
                    tool: remotePlan.toolCall.tool,
                    params: remotePlan.toolCall.params || {},
                    reasoning: remotePlan.reasoning
                };
                return this.act(toolPlan);
            }
            if (remotePlan.action === 'handoff') {
                // Handoff through orchestrator
                if (this._onHandoff) {
                    this._onHandoff(this.name, remotePlan.targetAgent, remotePlan.context, remotePlan.reasoning);
                }
                return { success: true, source: 'llm', handoff: true };
            }
        }

        // Fallback to rule-based thinking
        const plan = this.think(input, context);
        return this.act(plan);
    }

    reset() {
        this.state = 'idle';
        this.context = {};
    }
}

// ===== Orchestrator =====
class Orchestrator {
    constructor(config = {}) {
        this.agents = new Map();
        this.currentAgentName = null;
        this.conversationHistory = [];
        this.memory = new Memory();
        this.agentOrder = [];  // preserve registration order
        this.apiEndpoint = config.apiEndpoint || null; // remote LLM Worker URL

        this._onMessage = config.onMessage || null;
        this._onStateChange = config.onStateChange || null;
        this._onToolCall = config.onToolCall || null;
        this._onHandoff = config.onHandoff || null;
        this._onAgentChange = config.onAgentChange || null;
    }

    registerAgent(agentConfig) {
        // Create shared memory reference
        const agent = new Agent({
            ...agentConfig,
            memory: this.memory,
            orchestrator: this, // give agent access to orchestrator (for remoteThink)
            onStateChange: (name, oldState, newState) => {
                if (this._onStateChange) this._onStateChange(name, oldState, newState);
            },
            onMessage: (name, message, reasoning) => {
                this.conversationHistory.push({ agent: name, message, timestamp: Date.now() });
                if (this._onMessage) this._onMessage(name, message, reasoning);
            },
            onToolCall: (name, tool, params) => {
                if (this._onToolCall) this._onToolCall(name, tool, params);
            },
            onHandoff: (from, to, context, reasoning) => {
                this.conversationHistory.push({
                    agent: from,
                    handoff: true,
                    to,
                    context,
                    timestamp: Date.now()
                });
                this.currentAgentName = to;
                if (this._onHandoff) this._onHandoff(from, to, context, reasoning);
                if (this._onAgentChange) this._onAgentChange(from, to);
            }
        });

        this.agents.set(agent.name, agent);
        this.agentOrder.push(agent.name);
        return agent;
    }

    getAgent(name) {
        return this.agents.get(name) || null;
    }

    getCurrentAgent() {
        return this.currentAgentName ? this.agents.get(this.currentAgentName) : null;
    }

    setCurrentAgent(name) {
        if (this.agents.has(name)) {
            const prev = this.currentAgentName;
            this.currentAgentName = name;
            if (this._onAgentChange) this._onAgentChange(prev, name);
            return true;
        }
        return false;
    }

    /**
     * Route input to the appropriate agent based on intent
     */
    route(input, context = {}) {
        // Quick intent check to find the best agent
        const inputStr = typeof input === 'string' ? input : (input.text || '');
        const lower = inputStr.toLowerCase();

        let targetAgent = null;

        // Keyword-based routing
        if (/价格|多少钱|费用|价|定价|方案|版本|对比|join|enroll|报名|购买|subscribe/.test(lower)) {
            targetAgent = this.agents.get('PricingAgent');
        } else if (/路径|怎么学|如何开始|从哪|step|roadmap|路线/.test(lower)) {
            targetAgent = this.agents.get('RoadmapAgent');
        } else if (/评估|测验|测试|水平|自测|assess|quiz/.test(lower)) {
            targetAgent = this.agents.get('AssessmentAgent');
        } else if (/我是|背景|零基础|不会编程|designer|学生|运营|设计/.test(lower)) {
            targetAgent = this.agents.get('CoachAgent');
        } else if (/你好|hi|hello|在吗|help/.test(lower)) {
            targetAgent = this.agents.get('CoachAgent');
        } else {
            // Default to current agent or coach
            targetAgent = this.getCurrentAgent() || this.agents.get('CoachAgent');
        }

        if (!targetAgent) {
            targetAgent = this.agents.get('CoachAgent');
        }

        // Track the current agent
        const prevAgent = this.currentAgentName;
        this.currentAgentName = targetAgent.name;
        if (prevAgent !== targetAgent.name && this._onAgentChange) {
            this._onAgentChange(prevAgent, targetAgent.name);
        }

        // Record in memory
        this.memory.recordSectionView('agent_chat');

        // Process (async — may call remote LLM)
        return targetAgent.receive(input, context);
    }

    /**
     * Handoff from one agent to another
     */
    handoff(fromName, toName, context = {}) {
        const fromAgent = this.agents.get(fromName);
        const toAgent = this.agents.get(toName);

        if (!fromAgent || !toAgent) {
            console.warn(`[Orchestrator] Handoff failed: ${fromName} -> ${toName}`);
            return { success: false };
        }

        // Transfer context
        toAgent.context = { ...toAgent.context, ...context, handoffFrom: fromName };

        // Notify
        this.conversationHistory.push({
            agent: fromName, handoff: true, to: toName, context, timestamp: Date.now()
        });

        this.currentAgentName = toName;

        if (this._onHandoff) {
            this._onHandoff(fromName, toName, context, [`[Handoff] ${fromName} → ${toName}`]);
        }
        if (this._onAgentChange) {
            this._onAgentChange(fromName, toName);
        }

        // If there's a pending query, have the new agent respond
        if (context.query) {
            return toAgent.receive(context.query, context);
        }

        return { success: true };
    }

    /**
     * Broadcast an event to all agents
     */
    broadcast(event, data) {
        this.agents.forEach(agent => {
            if (agent.hasCapability('observer')) {
                // Observing agents can react to events
                agent.receive({ event, data }, { broadcast: true });
            }
        });
    }

    getHistory() {
        return [...this.conversationHistory];
    }

    getContext() {
        return {
            currentAgent: this.currentAgentName,
            memory: this.memory.getCurrentContext(),
            historyLength: this.conversationHistory.length
        };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AgentCore = { Tool, Agent, Memory, Orchestrator };
}
