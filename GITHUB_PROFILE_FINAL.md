# 👋 Hi, I'm Sreyashi

**Agentic AI Engineer** | **Quick-Commerce Technology** | **Human-in-the-Loop Systems**

I design and build AI systems that solve real-world logistics problems while keeping humans in control. My philosophy is simple: **agents should propose, humans should decide**. The best AI isn't autonomous—it's trustworthy.

---

## 🎯 What I Build

### Expertise
- **Agentic AI Systems** — Multi-step reasoning loops with Claude AI, policy enforcement at scale
- **Human-in-the-Loop Workflows** — Approval gates, escalation triggers, human override always available
- **Policy-Driven Agents** — Explicit business rules end-to-end, no hidden logic
- **Quick-Commerce Logistics** — Inventory optimization, waste reduction, dark store operations
- **Production Prototypes** — From concept to deployable app in a single iteration

### Philosophy
> *"The agent's job is to detect risk, validate data, apply policy, and recommend. The human's job is to decide. That separation—agent proposes, human disposes—is what makes AI safe and trustworthy."*

---

## 🚀 Featured Work: Near-Expiry Inventory Transfer Agent

### The Challenge
Dark stores (quick-commerce hubs) manage thousands of SKUs with shelf lives measured in hours. A batch of Full Cream Milk with 44 hours to expiry and 90 units at risk of waste could be transferred to a store 4km away with unmet demand. Today, this decision is made manually—inefficient, error-prone, and inconsistent.

### The Solution
An agentic AI system that:

```
INPUT → CONTEXT → DECISION → OUTPUT → REVIEW
 ↓        ↓         ↓         ↓        ↓
Detect  Gather   Validate  Recommend Approve
near-   demand   against   transfer  before
expiry  &        10-section &        move
risk    policy   quantity  escalate
```

**5-stage loop. 10-section policy. Zero autonomous execution.**

### Key Features

#### 1️⃣ Policy-Driven
The agent enforces 10 explicit rules:
- **Review window**: 48h or less to expiry (scope boundary)
- **Destination eligibility**: Within 10km OR same-city hero stores (always included)
- **Ranking by unmet demand**: predicted_demand − existing_inventory (not by distance)
- **Shelf-life safety**: 24+ hours remaining after arrival (learned from past failure)
- **Quantity cap**: ≤30% of source stock (risk management)
- **Forecast validation**: Medium/high confidence AND recent error ±20% (no guessing)
- **Quality gate**: Refuse if damaged/temperature_breached/quality_unclear (zero exceptions)
- **Scope boundary**: Transfer only (no promotions, markdowns, or customer activation)
- **Human approval**: Agent proposes only (warehouse manager decides)
- **Escalation trigger**: Fail if any rule fails (never guess on weak data)

👉 **Full policy**: [`policies/transfer_rules.md`](https://github.com/Sreyashi/StockManagement/blob/main/policies/transfer_rules.md)

#### 2️⃣ Human-in-the-Loop Gate
After the agent recommends:
- **Approve** — Transfer order created (marked Pending)
- **Edit** — Manager tweaks destination or quantity
- **Escalate** — Routes to senior manager

Nothing moves without human sign-off.

#### 3️⃣ Comprehensive Evaluation
**6/6 test cases pass:**
- ✅ BAT-001: Happy path (recommend transfer, 27h shelf-life)
- ✅ BAT-002: Rank by demand not distance (farther store wins)
- ✅ BAT-003: Hero store fallback (22km away but highest unmet need)
- ✅ BAT-004: Low confidence (escalate, don't guess)
- ✅ BAT-005: Quality gate (refuse temperature breach)
- ✅ BAT-006: Track record check (escalate forecast error 57%)

#### 4️⃣ Honest About Limits
**What it refuses**: Quality issues, forecast unreliability, impossible shelf-life, no eligible destination, weak data

**Out of scope**: Pricing, markdowns, customer activation, supply planning, reverse logistics, SKU substitution

**V1 constraints**: Synthetic data only, 4-store network, no seasonal adjustments, no real-time routing, transfer-focused

👉 **Full limits**: [`design/HONEST_LIMITS.md`](https://github.com/Sreyashi/StockManagement/blob/main/design/HONEST_LIMITS.md)

#### 5️⃣ Clean, Intentional Design
- **Locked design tokens** — 3 skins (Operations dark, Studio light, Terminal mono)
- **No custom fonts** — System fonts only
- **Fixed spacing** — Pixels don't move
- **Teaching UI** — Every element serves the logic, not aesthetics

---

## 📂 My Repositories

### 🔧 [ClaudeApp](https://github.com/Sreyashi/ClaudeApp)
**Main development branch** — Latest features, active development
- Tech: Single-file HTML + Claude AI API + locked design tokens
- Status: Production-ready prototype
- Deployment: Vercel (auto-deployed on push)
- Preview: https://claude-app-git-claude-new-session-ajh8md-sreyashis-projects.vercel.app

### 🎓 [StockManagement](https://github.com/Sreyashi/StockManagement)
**Public grader-facing repo** — Ready-to-test live deployment
- Tech: Same as ClaudeApp (GitHub Pages deployment)
- Status: Live and tested
- Key files:
  - **`index.html`** — Complete app (86KB, zero dependencies)
  - **`README.md`** — Quick-start guide + full documentation
  - **`policies/transfer_rules.md`** — 10-section policy in plain text
  - **`design/HONEST_LIMITS.md`** — Constraints & scope boundaries
  - **`INTERVIEW_GUIDE.md`** — Interview prep + 7 Q&A
  - **`VIDEO_SCRIPT_4MIN.md`** — Demo script with exact timing

---

## 🎬 How to Experience This

### 30-Second Quick Start
1. Get API key: https://console.anthropic.com/account/keys
2. Open: https://github.com/Sreyashi/StockManagement
3. Paste key → Click "Start Demo"
4. Watch agent flow through all 5 stages automatically

### Deep Dive
- **Understand the system**: Read [`README.md`](https://github.com/Sreyashi/StockManagement/blob/main/README.md) (10 min)
- **Learn the policy**: Read [`policies/transfer_rules.md`](https://github.com/Sreyashi/StockManagement/blob/main/policies/transfer_rules.md) (5 min)
- **Test yourself**: Run manual cases or start demo (5 min)
- **Interview prep**: Read [`INTERVIEW_GUIDE.md`](https://github.com/Sreyashi/StockManagement/blob/main/INTERVIEW_GUIDE.md) (10 min)

### Record Your Own Demo
- Script provided: [`VIDEO_SCRIPT_4MIN.md`](https://github.com/Sreyashi/StockManagement/blob/main/VIDEO_SCRIPT_4MIN.md)
- 0:00–0:30 — Intro
- 0:30–1:30 — Problem & discovery
- 1:30–2:30 — Live demo (auto-runs)
- 2:30–3:30 — Evidence (show cases)
- 3:30–4:00 — Launch (repo link)

---

## 🛠️ Technical Stack

| Category | Details |
|----------|---------|
| **AI** | Claude 3 API (Anthropic) — streaming, multi-turn reasoning |
| **Frontend** | Vanilla JavaScript + HTML + CSS (no frameworks) |
| **Design System** | Locked design tokens (TOKENS.css) — 3 skins, fixed typography |
| **Data** | Synthetic dataset: 6 batches, 60+ forecasts, 4 stores, 5 SKUs |
| **Deployment** | GitHub Pages (StockManagement) + Vercel (ClaudeApp) |
| **Architecture** | Single-file app (self-contained, zero dependencies) |

---

## 📊 By the Numbers

| Metric | Value |
|--------|-------|
| **Evaluation cases** | 6/6 pass |
| **Policy sections** | 10 (explicit, enforceable) |
| **Agent loop stages** | 5 (INPUT → CONTEXT → DECISION → OUTPUT → REVIEW) |
| **App size** | 86 KB (entire app in one file) |
| **Dependencies** | 0 (pure HTML + API calls) |
| **Design tokens** | 40+ variables (colors, fonts, spacing) |
| **Documentation** | 1000+ lines (policies, guides, scripts) |
| **Test coverage** | Happy paths + edge cases + escalations |

---

## 🧠 What I Learned

1. **Agents work best with explicit policy** — Make rules clear, don't hide them in the model
2. **Humans + AI > AI alone** — Approval gates aren't friction; they're trust
3. **Escalation is a feature, not a bug** — When in doubt, ask a human
4. **Simplicity scales** — Single-file app beats microservices for clarity
5. **Test edge cases first** — Happy path hides 80% of the bugs
6. **Policy is documentation** — If you can't explain it in plain text, your model won't understand it either
7. **Data quality > model quality** — A simple model with clean data beats a complex model with messy data

---

## 🎯 What's Next

**Immediate next steps** (beyond capstone):
1. Privacy review for real transaction data
2. Live feedback loop — capture actual transfer outcomes
3. Seasonal demand patterns — adjust forecasts for holidays
4. Vehicle routing — optimize transport based on real routes
5. Multi-SKU transfers — move multiple SKUs in one order
6. Markdown integration — recommend price reductions for near-expiry items
7. Return logistics — handle customer returns and recalls

---

## 💼 Why This Matters

Quick-commerce is a $50B+ market with razor-thin margins. A 10% waste reduction across a 4-store network = significant loss prevention. This capstone proves that **AI can solve real logistics problems** while **keeping humans in control**. The pattern applies far beyond dark stores: any operation where data-driven recommendations can be improved by human judgment.

---

## 🤝 Let's Connect

I'm building AI systems that real people will trust and use. If you're interested in:
- Agentic AI architecture
- Human-in-the-loop workflows
- Policy-driven systems
- Quick-commerce tech
- Production AI prototypes

Let's talk.

📧 **Email**: deychaki.sreyashi@gmail.com  
🔗 **GitHub**: [@Sreyashi](https://github.com/Sreyashi)  
📍 **Based in**: India

---

## 📚 Quick Links

| What | Link |
|------|------|
| **Live Demo** | https://github.com/Sreyashi/StockManagement |
| **Main Dev** | https://github.com/Sreyashi/ClaudeApp |
| **Vercel Preview** | https://claude-app-git-claude-new-session-ajh8md-sreyashis-projects.vercel.app |
| **Policy** | [policies/transfer_rules.md](https://github.com/Sreyashi/StockManagement/blob/main/policies/transfer_rules.md) |
| **Honest Limits** | [design/HONEST_LIMITS.md](https://github.com/Sreyashi/StockManagement/blob/main/design/HONEST_LIMITS.md) |
| **Interview Guide** | [INTERVIEW_GUIDE.md](https://github.com/Sreyashi/StockManagement/blob/main/INTERVIEW_GUIDE.md) |
| **Demo Script** | [VIDEO_SCRIPT_4MIN.md](https://github.com/Sreyashi/StockManagement/blob/main/VIDEO_SCRIPT_4MIN.md) |

---

<div align="center">

**"The best AI isn't the smartest. It's the one that knows when to ask a human."**

</div>
