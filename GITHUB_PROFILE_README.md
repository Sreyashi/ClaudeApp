# Hi, I'm Sreyashi 👋

**Agentic AI Engineer | Quick-Commerce Technology | Human-in-the-Loop Systems**

I build AI systems that solve real logistics problems while keeping humans in control. My focus is on agentic AI that detects risks, validates data, applies policy, and recommends—leaving final decisions to people who understand the business.

---

## 🎯 What I Do

I specialize in:
- **Agentic AI systems** — multi-step reasoning with Claude AI
- **Human-in-the-loop workflows** — AI proposes, humans decide
- **Policy-driven agents** — enforce business rules end-to-end
- **Dark store logistics** — inventory optimization for quick-commerce
- **End-to-end prototypes** — from concept to deployable product

**Core belief:** The best AI isn't autonomous—it's trustworthy. Humans should always have the final say.

---

## 🚀 Featured Project: Near-Expiry Inventory Transfer Agent

**An agentic AI system that detects packaged milk approaching expiry in quick-commerce dark stores and recommends safe inter-store transfers to prevent waste.**

### The Problem
Dark store inventory expires weekly. A batch of Full Cream Milk with 44 hours left on the shelf and 90 units at risk of waste could be transferred to a nearby store with genuine demand—but this requires manual decision-making, which is inefficient and error-prone.

### The Solution
An AI agent that:
1. **Detects** near-expiry risk (48h or less to expiry)
2. **Gathers** demand forecasts, store distances, quality flags
3. **Validates** against a 10-section transfer policy
4. **Recommends** a destination store and quantity
5. **Waits** for warehouse manager approval before anything moves

### Key Innovation: Human-in-the-Loop Gate
The agent does not execute transfers. It **proposes only**. A warehouse manager sees the recommendation and decides: approve, edit, or escalate. Nothing moves without human sign-off.

### Results
✅ **6/6 evaluation cases pass**
- BAT-001: Happy path (recommend transfer)
- BAT-002: Rank by demand, not distance
- BAT-003: Hero store fallback (22km away but highest demand)
- BAT-004: Low confidence → escalate (don't guess)
- BAT-005: Quality gate → refuse (temperature breach)
- BAT-006: Track record check → escalate (forecast error 57%)

✅ **10-section policy enforced end-to-end**
- Review window, destination eligibility, ranking by unmet demand
- Shelf-life validation, quantity caps, forecast confidence
- Quality gates, scope boundary, human approval, escalation triggers

✅ **Complete documentation & demo**
- 4-minute video script with exact timing
- Interview guide with 7 sample Q&A
- Live deployment (see links below)

---

## 📂 Repositories

### [ClaudeApp](https://github.com/Sreyashi/ClaudeApp) — Main Development
Development branch with all latest features. Deployed to Vercel.
- **Tech**: Single-file HTML app, Claude AI API, locked design tokens
- **Status**: ✓ Production-ready prototype
- **Vercel Preview**: https://claude-app-git-claude-new-session-ajh8md-sreyashis-projects.vercel.app

### [StockManagement](https://github.com/Sreyashi/StockManagement) — Grader Access
Public repo for capstone graders. Ready-to-test live deployment.
- **Tech**: Same as ClaudeApp, deployed to GitHub Pages
- **Status**: ✓ Live and tested
- **Key Files**:
  - `index.html` — The complete app (86KB, single file)
  - `README.md` — Quick-start guide & documentation
  - `policies/transfer_rules.md` — 10-section transfer policy
  - `design/HONEST_LIMITS.md` — Scope boundaries & V1 constraints
  - `INTERVIEW_GUIDE.md` — Interview prep & Q&A
  - `VIDEO_SCRIPT_4MIN.md` — Demo script with timing

---

## 🎓 Key Features of This Capstone

### 1. Policy-Driven Agent
The agent enforces a comprehensive 10-section policy:
- No guessing when data is weak
- Quality issues → automatic refusal
- Forecast accuracy validated against track record
- Shelf-life minimums enforced
- Quantity caps to prevent over-transfer

**See**: [`policies/transfer_rules.md`](https://github.com/Sreyashi/StockManagement/blob/main/policies/transfer_rules.md)

### 2. Honest About Constraints
This is a **synthetic capstone prototype**—not production-ready. The system is transparent about what it refuses, what's out of scope, and V1 limitations.

**See**: [`design/HONEST_LIMITS.md`](https://github.com/Sreyashi/StockManagement/blob/main/design/HONEST_LIMITS.md)

### 3. Human-in-the-Loop Approval Gate
After the agent recommends, a warehouse manager sees three buttons:
- **Approve** — Transfer order created (marked Pending)
- **Edit** — Tweak destination or quantity
- **Escalate** — Route to senior manager

Nothing is executed without human approval.

### 4. Complete Evaluation
6 test cases covering happy paths and edge cases. All pass.
- Happy path (recommend)
- Ranking logic (farther store with higher demand)
- Hero store fallback (same-city stores with high demand)
- Escalation on low confidence
- Escalation on quality issues
- Escalation on forecast unreliability

### 5. Locked Design System
Intentionally constrained:
- 3 skins (Operations dark, Studio light, Terminal mono)
- Fixed fonts, spacing, colors
- No custom aesthetics—focus stays on logic
- Teaching UI, not design playground

---

## 💻 How to Use This

### Try It Yourself
1. **Get an API key**: https://console.anthropic.com/account/keys
2. **Open the app**: https://github.com/Sreyashi/StockManagement
3. **Paste your key** in Settings (top right)
4. **Click "Start Demo"** — agent automatically runs BAT-001 through all 5 stages

No server needed. Works locally or on GitHub Pages.

### Interview Preparation
**See**: [`INTERVIEW_GUIDE.md`](https://github.com/Sreyashi/StockManagement/blob/main/INTERVIEW_GUIDE.md)

Includes:
- Opening statement (60 seconds)
- Explanation of 5-stage loop
- 10-section policy summary
- Honest limits & constraints
- 6 evaluation cases (all pass)
- 7 sample interview questions with detailed answers
- Closing statement

### Video Demo Script
**See**: [`VIDEO_SCRIPT_4MIN.md`](https://github.com/Sreyashi/StockManagement/blob/main/VIDEO_SCRIPT_4MIN.md)

4-minute script with exact timing:
- 0:00–0:30 — Intro (who you are, what the project does)
- 0:30–1:30 — Problem & discovery (show batch data)
- 1:30–2:30 — Live demo (agent flows through all 5 stages)
- 2:30–3:30 — Evidence (show evaluation cases)
- 3:30–4:00 — Launch (repo URL)

---

## 🛠️ Tech Stack

- **AI**: Claude AI (Anthropic API)
- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Design System**: Locked design tokens (3 skins)
- **Data**: Synthetic dataset (6 batches, 60+ forecasts, 4 stores, 5 SKUs)
- **Deployment**: GitHub Pages, Vercel
- **Documentation**: Markdown (policies, guides, scripts)

---

## 🧠 What I Learned

1. **Agents work best with policy** — Make rules explicit, not implicit
2. **Humans + AI > AI alone** — Approval gates aren't bottlenecks; they're trust
3. **Escalation is a feature** — When in doubt, ask a human
4. **Simplicity scales** — Single-file app is easier to understand than microservices
5. **Test edge cases** — Happy path hides bugs; test refusals and escalations

---

## 📊 Quick Stats

- **1 capstone project** with 6/6 evaluation cases passing
- **2 repos** (development + grader-facing)
- **10 sections** in transfer policy
- **5 stages** in agent loop
- **248 lines** in README documentation
- **86 KB** single-file production app
- **0 dependencies** (pure HTML + API calls)

---

## 🎯 What's Next

Beyond this capstone:
1. Privacy review for real data integration
2. Live feedback loop to validate forecasts
3. Seasonal adjustments for demand patterns
4. Vehicle routing optimization
5. Multi-SKU transfer flows
6. Return logistics & recall handling
7. Markdown integration for near-expiry items

---

## 🤝 Let's Connect

Looking to build agentic AI systems that real people will trust and use? Let's talk.

- **Email**: deychaki.sreyashi@gmail.com
- **GitHub**: [@Sreyashi](https://github.com/Sreyashi)
- **Repos**: 
  - [ClaudeApp](https://github.com/Sreyashi/ClaudeApp) — Main development
  - [StockManagement](https://github.com/Sreyashi/StockManagement) — Live demo

---

**"The best AI isn't autonomous—it's trustworthy. Humans should always have the final say."**
