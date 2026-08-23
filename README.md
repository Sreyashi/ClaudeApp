# Near-Expiry Inventory Transfer Agent

An agentic AI system that detects packaged milk approaching expiry in quick-commerce dark stores and recommends safe inter-store transfers to prevent waste. **The agent proposes; a warehouse manager approves. Nothing moves without human sign-off.**

---

## The Problem

Dark store inventory expires weekly. A batch of Full Cream Milk with 44 hours left on the shelf and 90 units at risk of waste could instead be transferred to a nearby store with genuine demand. Current operations decide these transfers manually—inefficient and error-prone. This capstone automates the detection and recommendation, but keeps humans in control.

## The Solution: 5-Stage Loop

The agent works through a structured flow:

1. **INPUT** — Detect a batch within 48 hours of expiry with excess inventory
2. **CONTEXT** — Gather demand forecasts, store distances, quality flags, transfer history
3. **DECISION** — Validate against a 10-section transfer policy
4. **OUTPUT** — Recommend a destination store, quantity, and expected waste savings
5. **REVIEW** — Manager approves, edits, or escalates before anything moves

**Key principle:** The agent is a *recommender*, not an executor. A warehouse manager has the final say.

---

## Quick Start

### 1. Get an Anthropic API Key

1. Visit https://console.anthropic.com/account/keys
2. Create a new API key (looks like `sk-ant-...`)
3. Copy it

### 2. Open the App

**Online:**
- GitHub Pages: https://github.com/Sreyashi/StockManagement
- Vercel Preview: https://claude-app-git-claude-new-session-ajh8md-sreyashis-projects.vercel.app

**Locally:**
- Clone this repo and open `index.html` in your browser (no server needed)
- Hard-refresh (`Ctrl+F5`) to see the latest version

### 3. Paste Your API Key

- Top-right corner: Settings
- Paste your API key into the input field
- Click "Save"

### 4. Run a Case

**Option A: Click "Start Demo"**
- Automatically runs BAT-001 (happy path) through all 5 stages
- Shows narration at each stage
- Perfect for understanding the flow

**Option B: Select a Case Manually**
- Click a case on the left (e.g., BAT-001)
- Click the "Run" button
- Watch the agent work through stages 1–5

### 5. Approve the Transfer

- Review the agent's recommendation
- Click "Approve", "Edit", or "Escalate"
- If approved, a pending transfer order is created

---

## The 10-Section Policy

The agent enforces this policy end-to-end. Every recommendation cites the sections it applies:

| Section | Rule | Why |
|---------|------|-----|
| 1 | **48h or less to expiry** | Scope: only act on urgent waste risk |
| 2 | **Eligible: within 10km OR same-city hero** | Logistics: consider far hero stores with high demand |
| 3 | **Rank by unmet demand** (predicted − existing) | Core algorithm: send stock where demand exceeds supply |
| 4 | **24+ hours shelf-life after arrival** | Safety: learned from a past 10-hour failure that expired everything |
| 5 | **Cap at 30% of source stock** | Risk management: don't strip a source store bare |
| 6 | **Forecast medium/high confidence AND recent error ±20%** | Confidence: cross-check labels against track record |
| 7 | **Refuse if damaged/temperature_breached/quality_unclear** | Quality: no exceptions for quality |
| 8 | **Transfer only** (no promotions, markdowns) | Scope: V1 is transfer-focused |
| 9 | **Human approval required** | Human-in-the-loop: agent proposes only |
| 10 | **Escalate if any rule fails** | Fail-safe: escalate, never guess |

👉 **See `policies/transfer_rules.md` for the full policy text.**

---

## Evaluation Cases (All Pass ✓)

The system was tested on 6 cases covering happy paths and edge cases:

| Case | Scenario | Expected | Result |
|------|----------|----------|--------|
| **BAT-001** | Happy path: 44h to expiry, excess at A, high demand at B | Recommend B, 36 units, 27h shelf-life | ✓ PASS |
| **BAT-002** | Rank by demand, not distance: farther store has higher demand | Recommend farther store (130 units demand) | ✓ PASS |
| **BAT-003** | Hero store fallback: 22km away but highest unmet need | Recommend hero store (180 units demand) | ✓ PASS |
| **BAT-004** | Low confidence: forecast is unreliable | Escalate, don't guess | ✓ PASS |
| **BAT-005** | Quality gate: temperature breach detected | Refuse transfer, escalate | ✓ PASS |
| **BAT-006** | Track record check: high-confidence label contradicted by 57% error | Cross-check against outcome log, escalate | ✓ PASS |

**All cases pass.** The agent recommends when conditions are met and escalates when they're not. It never ignores quality or forecast accuracy.

---

## Honest Limits

This system is a **synthetic capstone prototype**. It's not production-ready. Here's what it refuses and what's out of scope:

### The System Refuses:
- Quality compromise (any flag: damaged, temperature_breached, quality_unclear)
- Forecast unreliability (label says high but error rate is 57%)
- Shelf-life violations (less than 24 hours remaining after arrival)
- Quantity over-cap (more than 30% of source stock)
- No eligible destination with genuine unmet need
- Missing or inconsistent data

### Out of Scope (V1):
- Pricing or markdowns (promotions are V2)
- Customer segment activation (who buys what)
- Supply chain planning (we only move what exists)
- Reverse logistics (returns, recalls)
- Cross-store substitution (alternative SKUs)

### Known Constraints:
- **Forecast limitations**: No seasonal adjustments, no real-time routing, no vehicle capacity modeling
- **Store network**: Fixed 4-store network, hard-coded hero store designation
- **Batch independence**: Each batch analyzed separately, not as a flow
- **Transfer-only**: This is V1; no markdowns, returns, or discounts
- **Synthetic data**: Test data only, not real transactions (requires formal privacy review for real pilots)

👉 **See `design/HONEST_LIMITS.md` for full documentation.**

---

## How to Explain This to an Interviewer

**Opening (60 seconds):**
> "My capstone is an agentic AI system for quick-commerce dark stores that detects near-expiry packaged milk and recommends safe inter-store transfers to prevent waste. The key innovation is a human-in-the-loop gate: the agent recommends only; a warehouse manager approves before anything moves. The system is built on a 10-section transfer policy, enforced end-to-end by Claude AI."

**When they ask "Walk me through how it works":**
Walk through the 5-stage loop. Reference the policy at each stage. Show a case (BAT-001 is the happy path; BAT-004, BAT-005, BAT-006 show escalation).

**When they ask "What are the constraints?":**
Point to `design/HONEST_LIMITS.md`. This system is honest about what it refuses: quality issues, forecast unreliability, shelf-life violations. It's also transparent about V1 scope: transfers only, synthetic data, no seasonal adjustments, no real-time routing.

**When they ask "How do you know it works?":**
Show the 6 evaluation cases. All pass. Cases 1–3 prove the agent recommends correctly under different demand patterns. Cases 4–6 prove it knows when to refuse and escalate.

👉 **See `INTERVIEW_GUIDE.md` for detailed answers to 7 common questions + a 4-minute demo script.**

---

## Files

| File | What It Contains |
|------|-----------------|
| **index.html** | The entire app—all stages, all logic, 86KB single file |
| **policies/transfer_rules.md** | 10-section policy the agent enforces |
| **design/HONEST_LIMITS.md** | Scope boundaries and V1 constraints |
| **design/TOKENS.css** | Locked design tokens (colors, fonts, spacing) |
| **.github/workflows/pages.yml** | GitHub Pages deployment automation |
| **data/** | Synthetic dataset (batches, forecasts, distances, quality flags, etc.) |
| **INTERVIEW_GUIDE.md** | Interview prep: 5-stage loop, 10 sections, sample Q&A, demo script |
| **VIDEO_SCRIPT_4MIN.md** | 4-minute video script with exact timing |

---

## Running the Demo

### Auto-Run (Recommended for Video)

1. Paste your API key
2. Click "**Start Demo**"
3. The agent automatically runs BAT-001 through all 5 stages
4. Narration plays at each stage
5. No manual button clicks—perfect for smooth video recording

### Manual Mode

1. Select a case from the left (e.g., BAT-001)
2. Review the batch data (stages 1–2 auto-populate)
3. Click "**Run**"
4. Agent thinks through the policy (stage 3)
5. Recommendation appears (stage 4)
6. Approve, edit, or escalate (stage 5)

---

## Design System

The UI uses **locked design tokens** to maintain consistency:
- **3 skins**: Operations (dark), Studio (light), Terminal (mono)
- **No custom fonts or emoji**—only system fonts
- **Fixed typography and spacing**—pixels don't move
- **Status colors**: Green (pass), Amber (pending), Red (fail), Blue (info)

The design is intentionally constrained. This is a **teaching prototype**, not a design playground. Every pixel follows the system so the focus stays on the logic.

---

## Grading Checklist

✅ **The agent detects near-expiry risk** and gathers context  
✅ **The agent applies a 10-section policy** end-to-end  
✅ **The agent escalates, never guesses** when data is weak or risk is high  
✅ **The human gate is real** — no transfers without approval  
✅ **All 6 evaluation cases pass**  
✅ **The policy is written down** (`policies/transfer_rules.md`)  
✅ **The limits are honest** (`design/HONEST_LIMITS.md`)  
✅ **The code is clean and readable** (single-file HTML for simplicity)  

---

## Next Steps (Beyond Capstone)

1. **Privacy review**: Real pilot would require formal data governance
2. **Live feedback loop**: Capture actual outcomes to validate forecasts
3. **Seasonal adjustments**: Account for holiday demand patterns
4. **Vehicle routing**: Optimize transport based on real routes and capacity
5. **Promotion integration**: Recommend markdowns for near-expiry items
6. **Multi-SKU flows**: Transfer multiple SKUs in one order
7. **Return logistics**: Handle customer returns and recalls

---

## Questions?

- **How does the agent decide which store to send to?** By unmet demand (predicted_demand − existing_inventory), not distance. If a far hero store has much higher unmet need than a closer store, the agent recommends the hero store.

- **What happens if the agent's recommendation fails?** The system escalates to a manager for manual review. It never executes a transfer without approval.

- **Can the manager edit the recommendation?** Yes. They can approve as-is, tweak the destination or quantity, or escalate.

- **Is this production-ready?** No. This is a synthetic capstone prototype with test data. A real pilot needs privacy review, live data governance, and a feedback loop to validate forecasts over time.

---

## Closing Statement

**"This capstone proves that agentic AI works best with human oversight. The agent's job is to detect risk, validate data, apply policy, and recommend. The manager's job is to decide. That separation—agent proposes, human disposes—is what makes it safe and trustworthy. And that's how you build AI that real people will use."**

---

**Built with:** Claude AI (Anthropic API) · Locked design tokens · 10-section transfer policy · Human-in-the-loop approval gate

**Capstone Project** — Agentic AI for Quick-Commerce Inventory Management
