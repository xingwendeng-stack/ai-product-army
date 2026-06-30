# ⚡ AI产品军团实战 — AI Product Legion

> **让每一个普通人都能拥有自己的AI产品** · **Empower everyone to build their own AI product**

---

## 🇨🇳 中文介绍

### 概述

AI产品军团实战是一个面向零基础普通人、从0到1学习AI产品开发的实战型平台。我们提供一套完整的 **Agent-Native** 多智能体系统，通过5个AI Agent（教练、路径规划师、技能评估师、课程顾问、行为观察者）为学习者提供个性化指导和陪伴。

### 核心特色

- **零基础友好** — 不需要会写代码，不需要懂算法
- **30天实战路径** — 从想法到上线，完整的四步实战法
- **Agent-Native 架构** — 浏览器端多Agent系统，7x24小时陪伴学习
- **AI驱动** — 基于Claude/OpenAI的智能推理引擎
- **双语支持** — 中文/English 一键切换

### 技术栈

| 前端 | 后端 | 部署 | AI |
|------|------|------|-----|
| 原生 HTML/CSS/JS | Cloudflare Pages Functions | Cloudflare Pages (GitHub集成) | Anthropic Claude + OpenAI GPT-4o |
| 多Agent系统 | 规则引擎 | GitHub Auto-Deploy | 规则回退（无API Key时） |
| i18n 国际化 | CORS 中间件 | Cloudflare Workers & Pages | 流式推理 |

### 项目结构

```
├── index.html              # 主页面 + Agent-Native UI
├── css/style.css            # 样式文件（含Agent UI样式）
├── js/
│   ├── i18n.js              # 国际化引擎 (中/英双语)
│   ├── agent-core.js        # Agent 核心框架 (Agent/Tool/Memory/Orchestrator)
│   ├── agents.js            # 5个Agent定义 + 10个工具
│   ├── app.js               # Agent 运行时初始化和UI绑定
│   └── script.js            # 入口文件（UI交互 + Agent启动）
├── functions/
│   └── api/
│       └── think.js         # Cloudflare Function (LLM推理端点)
└── .github/                 # GitHub配置
```

### 5个AI Agent

| Agent | 角色 | 能力 |
|-------|------|------|
| 🎯 CoachAgent | 军团的AI教练助手 | 欢迎、背景调研、课程推荐、引导 |
| 🗺️ RoadmapAgent | 个性化路径规划师 | 学习路径生成、个性化推荐 |
| 📊 AssessmentAgent | 技能评估师 | 技能测验、水平评估 |
| 💰 PricingAgent | 课程顾问 | 方案对比、价格计算 |
| 👀 NavigatorAgent | 行为观察者 | 浏览行为监控、主动介入 |

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/xingwendeng-stack/ai-product-army.git

# 直接打开 index.html（静态页面，无需构建）
open index.html
```

### 部署

项目通过 **Cloudflare Pages** 自动部署。推送到 `main` 分支后，Cloudflare会自动构建和发布。

> 需要在 Cloudflare Dashboard → Workers & Pages 中配置 GitHub 集成。
> 如需 LLM 推理功能，请在 Cloudflare Function 的环境变量中配置 `ANTHROPIC_API_KEY` 或 `OPENAI_API_KEY`。

### License

MIT

---

## 🇬🇧 English

### Overview

AI Product Legion is a hands-on platform that teaches ordinary people how to build their first AI product from zero to one. It features a complete **Agent-Native** multi-agent system with 5 AI Agents (Coach, Roadmap Planner, Skill Assessor, Pricing Consultant, Behavior Observer) to provide personalized guidance and companionship.

### Key Features

- **Zero-code friendly** — No coding or algorithm knowledge required
- **30-day hands-on roadmap** — Complete 4-step methodology from idea to launch
- **Agent-Native architecture** — Browser-based multi-agent system for 24/7 learning companion
- **AI-powered** — Intelligent reasoning engine powered by Claude & OpenAI
- **Bilingual** — Chinese/English one-click switch

### Tech Stack

| Frontend | Backend | Deployment | AI |
|----------|---------|------------|-----|
| Vanilla HTML/CSS/JS | Cloudflare Pages Functions | Cloudflare Pages (GitHub) | Anthropic Claude + OpenAI GPT-4o |
| Multi-Agent System | Rule Engine | GitHub Auto-Deploy | Rule fallback (no API key) |
| i18n Internationalization | CORS Middleware | Cloudflare Workers & Pages | Streaming inference |

### Project Structure

```
├── index.html              # Main page + Agent-Native UI
├── css/style.css            # Styles (including Agent UI)
├── js/
│   ├── i18n.js              # Internationalization engine (CN/EN)
│   ├── agent-core.js        # Agent core framework (Agent/Tool/Memory/Orchestrator)
│   ├── agents.js            # 5 Agent definitions + 10 tools
│   ├── app.js               # Agent runtime initialization & UI binding
│   └── script.js            # Entry point (UI interactions + Agent startup)
├── functions/
│   └── api/
│       └── think.js         # Cloudflare Function (LLM inference endpoint)
└── .github/                 # GitHub config
```

### 5 AI Agents

| Agent | Role | Capabilities |
|-------|------|-------------|
| 🎯 CoachAgent | AI Coach Assistant | Greeting, background collection, course recommendation |
| 🗺️ RoadmapAgent | Personalized Path Planner | Learning path generation, personalization |
| 📊 AssessmentAgent | Skill Assessor | Skill quiz, level evaluation |
| 💰 PricingAgent | Course Consultant | Plan comparison, pricing calculation |
| 👀 NavigatorAgent | Behavior Observer | Scroll monitoring, proactive engagement |

### Quick Start

```bash
# Clone the repo
git clone https://github.com/xingwendeng-stack/ai-product-army.git

# Open index.html directly (static site, no build step)
open index.html
```

### Deployment

The project auto-deploys via **Cloudflare Pages**. Pushing to the `main` branch triggers automatic build and deployment.

> Configure GitHub integration in Cloudflare Dashboard → Workers & Pages.
> For LLM inference, set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in Cloudflare Function environment variables.

### License

MIT
