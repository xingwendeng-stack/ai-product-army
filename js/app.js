/**
 * ============================================================
 *  Application Layer — Agent-Native Runtime Initialization
 *
 *  Initializes agents, orchestrator, binds UI, starts Navigator.
 * ============================================================
 */
'use strict';

var AgentApp = (() => {

    const { Orchestrator } = window.AgentCore;
    const definitions = window.AGENT_DEFINITIONS;

    // ===== State =====
    let orchestrator = null;
    let navigatorInterval = null;
    let isPanelOpen = false;
    let isMinimized = false;
    let userInputHistory = [];

    // DOM refs (cached after DOM ready)
    let els = {};

    // ===== Agent Message Handler =====
    function onAgentMessage(agentName, message, reasoning) {
        appendMessage(agentName, message, 'agent');
        showReasoning(reasoning);
        updateAgentStatus(agentName, 'awaiting_input');
    }

    // ===== Agent State Change =====
    function onAgentStateChange(agentName, oldState, newState) {
        updateAgentStatus(agentName, newState);
        if (newState === 'thinking') {
            els.agentStatus && (els.agentStatus.textContent = '思考中...');
        }
    }

    // ===== Tool Call =====
    function onToolCall(agentName, toolName, params) {
        showToolCall(agentName, toolName, params);
    }

    // ===== Handoff =====
    function onHandoff(from, to, context, reasoning) {
        const agentFrom = orchestrator.getAgent(from);
        const agentTo = orchestrator.getAgent(to);
        const fromName = agentFrom ? `${agentFrom.emoji} ${agentFrom.role}` : from;
        const toName = agentTo ? `${agentTo.emoji} ${agentTo.role}` : to;

        appendSystemMessage(`🔄 ${fromName} → ${toName}`);
        showReasoning(reasoning || [`[Handoff] ${from} → ${to}`]);
    }

    // ===== Agent Change =====
    function onAgentChange(prev, current) {
        const agent = orchestrator.getAgent(current);
        if (agent) {
            els.agentName && (els.agentName.textContent = `${agent.emoji} ${agent.role}`);
            els.agentPanel && (els.agentPanel.style.borderColor = 'rgba(99,102,241,0.3)');
        }
    }

    // ===== UI Functions =====

    function findOrCreateChatBody() {
        let body = document.querySelector('.agent-chat-body');
        if (!body) {
            const panel = document.querySelector('.agent-panel');
            if (panel) {
                body = document.createElement('div');
                body.className = 'agent-chat-body';
                panel.appendChild(body);
            }
        }
        return body;
    }

    function appendMessage(sender, text, type) {
        const body = findOrCreateChatBody();
        if (!body) return;

        const msg = document.createElement('div');
        msg.className = `agent-message agent-message-${type}`;

        const agent = orchestrator ? orchestrator.getAgent(sender) : null;
        const label = agent ? `${agent.emoji} ${agent.role}` : sender;
        const nameEl = document.createElement('div');
        nameEl.className = 'agent-msg-name';
        nameEl.textContent = label;

        const textEl = document.createElement('div');
        textEl.className = 'agent-msg-text';
        textEl.textContent = text;

        msg.appendChild(nameEl);
        msg.appendChild(textEl);
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;

        // Store in memory
        if (orchestrator && orchestrator.memory) {
            orchestrator.memory.save(sender, 'last_message', text.slice(0, 100));
        }
    }

    function appendSystemMessage(text) {
        const body = findOrCreateChatBody();
        if (!body) return;

        const msg = document.createElement('div');
        msg.className = 'agent-message agent-message-system';
        msg.textContent = text;

        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }

    function appendUserMessage(text) {
        const body = findOrCreateChatBody();
        if (!body) return;

        const msg = document.createElement('div');
        msg.className = 'agent-message agent-message-user';
        msg.textContent = `👤 ${text}`;

        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;

        // Save to history
        userInputHistory.push(text);
    }

    function showReasoning(steps) {
        const container = document.querySelector('.agent-reasoning');
        if (!container) return;

        container.innerHTML = '';
        if (!steps || steps.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        steps.forEach((step, i) => {
            const el = document.createElement('div');
            el.className = 'reasoning-step';
            el.textContent = step;
            // Stagger animation
            el.style.animationDelay = `${i * 0.15}s`;
            container.appendChild(el);
        });
    }

    function showToolCall(agentName, toolName, params) {
        const indicator = document.querySelector('.agent-tool-call');
        if (!indicator) return;

        indicator.style.display = 'flex';
        indicator.innerHTML = `
            <span class="tool-call-icon">🔧</span>
            <span class="tool-call-name">${agentName} 调用工具: ${toolName}</span>
            <span class="tool-call-params">${JSON.stringify(params)}</span>
        `;

        setTimeout(() => {
            indicator.style.display = 'none';
        }, 2500);
    }

    function updateAgentStatus(agentName, state) {
        const indicator = document.querySelector('.agent-status-dot');
        if (!indicator) return;

        const states = {
            'idle': { color: '#606080', label: '待命' },
            'thinking': { color: '#f59e0b', label: '思考中' },
            'acting': { color: '#6366f1', label: '执行中' },
            'awaiting_input': { color: '#22c55e', label: '等待输入' },
            'done': { color: '#14b8a6', label: '完成' }
        };

        const s = states[state] || states.idle;
        indicator.style.backgroundColor = s.color;
        indicator.style.boxShadow = `0 0 8px ${s.color}`;

        if (els.agentStatus) els.agentStatus.textContent = s.label;
    }

    // ===== Send User Message =====
    function sendMessage(text) {
        if (!text || !text.trim()) return;

        appendUserMessage(text);
        els.input && (els.input.value = '');

        if (!orchestrator) return;

        // Record behavior
        orchestrator.memory.updateBehavior({
            lastInteraction: new Date().toISOString()
        });

        // Show thinking
        updateAgentStatus('orchestrator', 'thinking');

        // Route to appropriate agent
        setTimeout(async () => {
            await orchestrator.route(text, { source: 'chat_input' });
        }, 300);
    }

    // ===== Send Suggested Question =====
    function sendSuggested(text) {
        sendMessage(text);
    }

    // ===== Toggle Panel =====
    function togglePanel(open) {
        isPanelOpen = open !== undefined ? open : !isPanelOpen;

        if (els.agentPanel) {
            els.agentPanel.classList.toggle('agent-panel-open', isPanelOpen);
        }
        if (els.toggleBtn) {
            els.toggleBtn.classList.toggle('agent-toggle-active', isPanelOpen);
            els.toggleBtn.textContent = isPanelOpen ? '✕' : '🤖';
        }
    }

    // ===== Toggle Minimize =====
    function toggleMinimize() {
        isMinimized = !isMinimized;
        if (els.agentPanel) {
            els.agentPanel.classList.toggle('agent-panel-minimized', isMinimized);
        }
    }

    // ===== Navigator Agent Logic =====
    function startNavigator() {
        // Clear existing interval if re-initializing
        if (navigatorInterval) {
            clearInterval(navigatorInterval);
            navigatorInterval = null;
        }
        if (!orchestrator) return;
        const navigator = orchestrator.getAgent('NavigatorAgent');
        if (!navigator) return;

        // Monitor scroll depth
        let maxScroll = 0;
        let welcomed = false;
        let askedAfterPricing = false;
        let idleTimeout = null;

        // Check if returning visitor
        const memory = orchestrator.memory;
        const isReturning = memory.isReturningVisitor();

        navigatorInterval = setInterval(() => {
            const scrollPct = Math.min(100, Math.round(
                (window.scrollY + window.innerHeight) /
                Math.max(document.body.scrollHeight, window.innerHeight) * 100
            ));
            maxScroll = Math.max(maxScroll, scrollPct);

            // Update behavior in memory
            memory.updateBehavior({ scrollDepth: maxScroll });

            // Record sections viewed
            const sections = ['hero', 'mission', 'problems', 'roadmap', 'modules', 'features', 'pricing', 'faq'];
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        memory.recordSectionView(id);
                    }
                }
            });

            // Trigger conditions
            // 1. Welcome new visitors after 6s
            if (!welcomed && scrollPct > 5 && !isReturning) {
                welcomed = true;
                setTimeout(() => {
                    if (!isPanelOpen) {
                        const coach = orchestrator.getAgent('CoachAgent');
                        if (coach) {
                            appendMessage('CoachAgent', coach._greeting(), 'agent');
                            updateAgentStatus('CoachAgent', 'awaiting_input');
                            togglePanel(true);
                        }
                    }
                }, 6000);
            }

            // 2. For returning visitors, shorter welcome
            if (!welcomed && scrollPct > 5 && isReturning) {
                welcomed = true;
                setTimeout(() => {
                    if (!isPanelOpen) {
                        const profile = memory.getVisitorProfile();
                        if (profile.background) {
                            appendMessage('CoachAgent', `又回来了！上次聊到你做${profile.background}的。要继续我们的AI产品之旅吗？`, 'agent');
                        } else {
                            appendMessage('CoachAgent', `欢迎回来！上次你还没告诉我你的背景呢，方便说说吗？`, 'agent');
                        }
                        updateAgentStatus('CoachAgent', 'awaiting_input');
                        togglePanel(true);
                    }
                }, 4000);
            }

            // 3. After reaching pricing section
            if (scrollPct > 70 && !askedAfterPricing) {
                const viewed = memory.get('behaviorData')?.sectionsViewed || [];
                if (viewed.includes('pricing')) {
                    askedAfterPricing = true;
                    // Subtle: just add a notification
                    const pricing = orchestrator.getAgent('PricingAgent');
                    if (pricing) {
                        setTimeout(() => {
                            appendMessage('PricingAgent',
                                `我看到你在看课程方案 👀 有什么想了解的吗？我可以帮你对比不同版本的区别。`, 'agent');
                            updateAgentStatus('PricingAgent', 'awaiting_input');
                        }, 2000);
                    }
                }
            }

            // 4. Idle re-engagement after 25s inactivity
            if (isPanelOpen) {
                clearTimeout(idleTimeout);
                idleTimeout = setTimeout(() => {
                    const lastMsg = orchestrator.conversationHistory.slice(-1)[0];
                    if (lastMsg && lastMsg.agent !== 'NavigatorAgent') {
                        appendMessage('CoachAgent',
                            `还在看吗？有什么我可以帮你解答的吗？比如如何选择课程、学习路径、或者具体的技术问题都可以问我 😊`, 'agent');
                    }
                }, 25000);
            }

        }, 3000);
    }

    // ===== Init =====
    function init() {
        // Cache DOM elements
        els = {
            agentPanel: document.querySelector('.agent-panel'),
            toggleBtn: document.querySelector('.agent-toggle'),
            minimizeBtn: document.querySelector('.agent-minimize'),
            input: document.querySelector('.agent-input'),
            sendBtn: document.querySelector('.agent-send-btn'),
            agentName: document.querySelector('.agent-header-name'),
            agentStatus: document.querySelector('.agent-status-text'),
            suggestions: document.querySelector('.agent-suggestions'),
            closeBtn: document.querySelector('.agent-close-btn')
        };

        // Create orchestrator with remote LLM endpoint
        const apiEndpoint = window.location.origin + '/api/think';
        orchestrator = new Orchestrator({
            apiEndpoint,  // Cloudflare Pages Function endpoint
            onMessage: onAgentMessage,
            onStateChange: onAgentStateChange,
            onToolCall: onToolCall,
            onHandoff: onHandoff,
            onAgentChange: onAgentChange
        });

        // Register all agents
        Object.values(definitions).forEach(config => {
            orchestrator.registerAgent(config);
        });

        // Set default agent
        orchestrator.setCurrentAgent('CoachAgent');

        // Restore memory
        const memory = orchestrator.memory;
        if (memory.isReturningVisitor()) {
            const profile = memory.getVisitorProfile();
            if (profile.background) {
                appendSystemMessage(`🔁 欢迎回来！检测到之前的访问记录`);
            }
        } else {
            appendSystemMessage(`👋 欢迎来到 AI产品军团！这是你第一次来访`);
        }

        // ===== Bind UI Events =====

        // Toggle panel
        if (els.toggleBtn) {
            els.toggleBtn.addEventListener('click', () => togglePanel());
        }

        // Minimize
        if (els.minimizeBtn) {
            els.minimizeBtn.addEventListener('click', toggleMinimize);
        }

        // Close
        if (els.closeBtn) {
            els.closeBtn.addEventListener('click', () => togglePanel(false));
        }

        // Send on button click
        if (els.sendBtn && els.input) {
            els.sendBtn.addEventListener('click', () => sendMessage(els.input.value));
            els.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(els.input.value);
                }
            });
        }

        // Suggested questions
        if (els.suggestions) {
            els.suggestions.querySelectorAll('.agent-suggestion').forEach(btn => {
                btn.addEventListener('click', () => {
                    sendSuggested(btn.textContent.trim());
                });
            });
        }

        // Start the Navigator Agent
        startNavigator();

        // Check LLM backend connectivity
        checkLlmStatus();

        console.log('[AgentApp] Agent-Native runtime initialized');
        console.log(`[AgentApp] Agents: ${orchestrator.agentOrder.join(', ')}`);
        console.log(`[AgentApp] Visitor: ${memory.getVisitorId()} (${memory.isNewVisitor() ? 'new' : 'returning'})`);
    }

    // ===== Check LLM Backend Status =====
    async function checkLlmStatus() {
        const badge = document.getElementById('agentLlmBadge');
        if (!badge) return;

        try {
            const resp = await fetch('/api/think', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    agent: { name: 'ping', role: 'health', instructions: '', capabilities: [] },
                    userInput: 'ping',
                    conversation: []
                })
            });
            if (resp.ok) {
                badge.classList.add('connected');
                badge.title = 'LLM 推理引擎已连接';
            } else {
                badge.classList.add('disconnected');
                badge.title = `LLM 引擎响应异常 (${resp.status})`;
            }
        } catch (e) {
            badge.classList.add('disconnected');
            badge.title = 'LLM 引擎未连接，使用规则回退';
        }
    }

    return { init, sendMessage, togglePanel };
})();
