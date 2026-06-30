/**
 * ============================================================
 *  Cloudflare Pages Function — Agent LLM Inference
 *
 *  Endpoint: POST /api/think
 *
 *  Acts as the "brain" for frontend agents. Receives agent
 *  context + conversation history, calls Anthropic/OpenAI,
 *  returns structured reasoning + response.
 *
 *  Environment variables (set in Cloudflare Pages Dashboard):
 *    ANTHROPIC_API_KEY  — Required for Anthropic
 *    OPENAI_API_KEY     — Required for OpenAI fallback
 *    LLM_PROVIDER       — "anthropic" (default) or "openai"
 * ============================================================
 */

// ===== CORS Headers =====
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
};

// ===== Request Handler =====
export async function onRequest(context) {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { ...CORS, 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();

        // Validate input
        if (!body.agent || !body.userInput) {
            return new Response(JSON.stringify({ error: 'Missing required fields: agent, userInput' }), {
                status: 400,
                headers: { ...CORS, 'Content-Type': 'application/json' }
            });
        }

        // Determine which provider to use
        const provider = env.LLM_PROVIDER || 'anthropic';

        let result;
        if (provider === 'openai' && env.OPENAI_API_KEY) {
            result = await callOpenAI(body, env.OPENAI_API_KEY);
        } else if (env.ANTHROPIC_API_KEY) {
            result = await callAnthropic(body, env.ANTHROPIC_API_KEY);
        } else {
            // No API key configured — return fallback response
            return new Response(JSON.stringify({
                action: 'respond',
                message: 'Agent 后端 LLM 尚未配置 API Key。请在 Cloudflare Pages Dashboard 中设置 ANTHROPIC_API_KEY。',
                reasoning: ['[系统] 未检测到 LLM API 密钥', '[回退] 返回配置提示'],
                fallback: true
            }), {
                status: 200,
                headers: { ...CORS, 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { ...CORS, 'Content-Type': 'application/json' }
        });

    } catch (err) {
        console.error('Worker error:', err);
        return new Response(JSON.stringify({
            error: 'Internal error',
            message: err.message,
            action: 'respond',
            reasoning: [`[错误] ${err.message}`]
        }), {
            status: 500,
            headers: { ...CORS, 'Content-Type': 'application/json' }
        });
    }
}

// ===== Build System Prompt =====
function buildSystemPrompt(agent) {
    return `你是「AI产品军团」网站中的一个 AI Agent。

你的身份：
- 名称: ${agent.name}
- 角色: ${agent.role}
- 行为准则: ${agent.instructions || '帮助用户了解AI产品开发'}

你的能力:
${(agent.capabilities || []).map(c => `- ${c}`).join('\n')}

你可以使用的工具:
- scrollToSection(section): 滚动到页面的某个区域
- highlightSection(selector): 高亮页面某个元素
- showNotification(text): 在页面角落显示通知
- generateRoadmap(background, experience): 生成个性化学习路径
- startAssessment(): 开始技能评估测验
- comparePlans(query): 对比课程方案

关键规则:
1. 用中文回答，热情友好但不啰嗦
2. 先理解用户背景，再推荐具体方案
3. 需要工具时，在回复末尾用 JSON 标注: {"tool": "toolName", "params": {...}}
4. 如果用户需要专业信息（定价、路径规划），建议转交给对应 Agent
5. 不要编造不存在的功能或课程信息
6. 保持对话简洁，一段话说完`;
}

// ===== Build Conversation Messages =====
function buildMessages(body) {
    const { agent, conversation = [], userInput, memory = {} } = body;

    const messages = [];

    // System prompt
    messages.push({
        role: 'system',
        content: buildSystemPrompt(agent)
    });

    // Conversation history (last 10 turns max)
    const recentHistory = conversation.slice(-10);
    for (const msg of recentHistory) {
        if (msg.role === 'agent') {
            messages.push({ role: 'assistant', content: msg.content.slice(0, 1000) });
        } else if (msg.role === 'user') {
            messages.push({ role: 'user', content: msg.content.slice(0, 1000) });
        }
    }

    // Memory context (as a user message for context)
    const profile = memory.profile || {};
    const contextParts = [];
    if (profile.background) contextParts.push(`用户背景: ${profile.background}`);
    if (profile.experience) contextParts.push(`用户经验: ${profile.experience}`);
    if (profile.goal) contextParts.push(`用户目标: ${profile.goal}`);

    if (contextParts.length > 0) {
        messages.push({
            role: 'user',
            content: `[系统上下文] ${contextParts.join(' | ')}`
        });
        messages.push({
            role: 'assistant',
            content: `[已记录以上用户信息]`
        });
    }

    // Current user input
    messages.push({
        role: 'user',
        content: userInput
    });

    return messages;
}

// ===== Parse LLM Response =====
function parseResponse(text) {
    // Extract reasoning (text before first actual response)
    const lines = text.split('\n');
    const reasoning = [];
    let responseText = text;

    // Try to extract JSON tool call at the end
    const toolMatch = text.match(/\{"tool":\s*"([^"]+)"[^}]*\}/);
    let toolCall = null;
    if (toolMatch) {
        try {
            toolCall = JSON.parse(toolMatch[0]);
        } catch (e) {
            // ignore parse errors
        }
    }

    // Remove tool JSON from response text for display
    responseText = text.replace(/\{"tool":\s*"[^"]+"[^}]*\}/g, '').trim();

    return {
        action: toolCall ? 'use_tool' : 'respond',
        message: responseText,
        toolCall,
        reasoning: [
            `[Agent] 收到输入，已处理`,
            `[LLM] 响应长度: ${text.length} 字符`,
            toolCall ? `[工具] 调用: ${toolCall.tool}` : '[决策] 直接回复'
        ]
    };
}

// ===== Call Anthropic API =====
async function callAnthropic(body, apiKey) {
    const messages = buildMessages(body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 800,
            temperature: 0.7,
            system: messages.find(m => m.role === 'system')?.content || '',
            messages: messages.filter(m => m.role !== 'system').map(m => ({
                role: m.role,
                content: m.content
            }))
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Anthropic API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    return {
        ...parseResponse(text),
        provider: 'anthropic',
        model: data.model
    };
}

// ===== Call OpenAI API (fallback) =====
async function callOpenAI(body, apiKey) {
    const messages = buildMessages(body);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            max_tokens: 800,
            temperature: 0.7,
            messages: messages.map(m => ({
                role: m.role === 'system' ? 'system' : m.role,
                content: m.content
            }))
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenAI API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '';

    return {
        ...parseResponse(text),
        provider: 'openai',
        model: data.model
    };
}
