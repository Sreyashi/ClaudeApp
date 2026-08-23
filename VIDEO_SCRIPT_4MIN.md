# 4-Minute Demo Video Script
**Total Duration: 4 minutes (240 seconds)**

---

## 📍 **SEGMENT 1: INTRO (0:00–0:30 | 30 seconds)**

**Visual Setup:** Show GitHub repo open on screen

**Script (speak clearly, confident tone):**

> "Hi, I'm Sreyashi. This is an agentic AI system that solves a real quick-commerce logistics problem: near-expiry inventory waste.
>
> Here's the scenario: A dark store has Full Cream Milk expiring in 44 hours. Ninety units at risk of waste. Three stores nearby have unmet demand. What should happen?
>
> Manually? Slow, inconsistent, error-prone. Autonomously? Risky—no human oversight.
>
> My solution? An agent that proposes. A human that decides."

**Action:** Click to open the live app

---

## 📍 **SEGMENT 2: PROBLEM & DISCOVERY (0:30–1:30 | 60 seconds)**

**Visual:** Show the index.html demo loading

**Script (speak naturally, explain the pain):**

> "Quick-commerce margins are razor-thin. A 10% waste reduction across a 4-store network is significant loss prevention.
>
> Today's workflow:
> - Warehouse manager eyeballs shelf-life → *How many hours left?*
> - Checks inventory at nearby stores → *Who needs this?*
> - Guesses transfer quantity → *Is 30% too much? Too little?*
> - Nobody validates the decision → *Did we follow policy?*
>
> The result? Inconsistent decisions, missed transfers, avoidable waste.
>
> I built an agent with 10 explicit policy sections that enforce:
> - Shelf-life safety: 24+ hours after arrival
> - Destination eligibility: Within 10km or hero stores always included
> - Demand ranking: Predicted demand minus existing inventory
> - Forecast reliability: Medium/high confidence, recent error ±20%
> - Quantity cap: 30% of source stock
> - Quality gates: Refuse if damaged, temperature breached, or unclear
>
> And critically: **The agent proposes only. The human approves or edits.**"

**Action:** Enter a valid API key on screen (or show it's ready)

---

## 📍 **SEGMENT 3: LIVE DEMO (1:30–2:30 | 60 seconds)**

**Visual:** Show the auto-run demo starting. Let the agent flow through all 5 stages naturally.

**Script (narrate what's happening in real-time, calm and measured):**

> "Watch this:
>
> **Stage 1—Detect:** The system finds milk with 44 hours to expiry and 90 units at risk.
>
> **Stage 2—Gather:** It pulls demand forecasts and inventory levels from all nearby stores. Three candidates emerge: Store 3, Store 4, and a hero store 22km away with high projected demand.
>
> **Stage 3—Decide:** The agent applies all 10 policy rules. Quality? Clean. Shelf-life? Safe. Forecast? Medium confidence, 15% error—acceptable. Distance? Store 4 is 6km away, Store 3 is 4km away, but Store 4's hero store status means it has 40 units of unmet demand. Clear winner.
>
> **Stage 4—Recommend:** The system recommends: Transfer 27 units to Store 4. Why 27? Exactly 30% of the source batch. Shelf-life after arrival? 27 hours. Within policy.
>
> **Stage 5—Approve:** A warehouse manager sees this recommendation. Click to approve, edit quantities, or escalate to senior management.
>
> That's the flow. Every stage explicit. Every decision auditable. Every escalation human-controlled."

**Action:** Let the recommendation show on screen. Don't click approve yet—let the viewer see the complete output.

---

## 📍 **SEGMENT 4: EVIDENCE (2:30–3:30 | 60 seconds)**

**Visual:** Switch to show test case results, or open a document showing the 6 evaluation cases

**Script (confident, emphasize rigor):**

> "This isn't theoretical. I tested it against six real-world scenarios:
>
> **BAT-001:** Happy path. Recommend transfer—*Pass.*
>
> **BAT-002:** Rank by demand, not distance. Farther store with higher unmet need wins—*Pass.*
>
> **BAT-003:** Hero store fallback. A store 22km away but with 40 units of unmet demand beats a closer store with only 20 units of unmet need—*Pass.*
>
> **BAT-004:** Low forecast confidence. Agent escalates instead of guessing—*Pass.*
>
> **BAT-005:** Quality gate. System refuses a batch with temperature breach—*Pass.*
>
> **BAT-006:** Track record check. Forecast error 57%? Escalate immediately—*Pass.*
>
> **6 out of 6 cases pass.** No guessing. No exceptions.
>
> The full policy is in the repository. The design doc lists honest limits: No pricing, no customer activation, no reverse logistics. V1 works on synthetic data. Real data needs privacy review.
>
> But the pattern? Proven."

**Action:** Show the repository files briefly (policies/transfer_rules.md, design/HONEST_LIMITS.md), or a summary table

---

## 📍 **SEGMENT 5: LAUNCH (3:30–4:00 | 30 seconds)**

**Visual:** Close any open windows, show the GitHub repo URL on screen

**Script (call to action, forward-looking):**

> "This capstone proves that AI can solve real logistics problems **while keeping humans in control.**
>
> The pattern applies far beyond dark stores: any operation where data-driven recommendations improve with human judgment.
>
> You can explore the code, review the policy, run the test cases, and deploy it yourself—everything is documented and open-source.
>
> GitHub: Sreyashi/StockManagement
>
> Let me know what you think. I'm building AI systems that real people will trust and use."

**Action:** Show GitHub URL on screen for last 3 seconds, then end

---

## 🎬 **FILMING TIPS**

### Before Recording:
1. **Lighting:** Face a window or use ring light for even lighting
2. **Audio:** Use a microphone close to your mouth (USB mic or earbuds with mic)
3. **Background:** Neutral wall, desk, or well-lit home office
4. **Camera angle:** Eye level, centered on screen
5. **Screen capture:** Use OBS, ScreenFlow (Mac), or built-in recorder
6. **API key:** Have a valid key ready to paste quickly (or use a fresh test key)

### Recording Steps:
1. Open terminal and start screen recorder
2. Load index.html in browser, or navigate to GitHub Pages URL
3. Paste API key when prompted
4. Hit "Start Demo" to trigger auto-run
5. Read script sections in sync with demo stages
6. Keep eye contact with camera during talking; look at screen during demo
7. Speak clearly, pause between thoughts
8. End with GitHub URL visible on screen for 3 seconds

### Post-Recording:
1. Trim silence at start/end
2. Check audio levels (not too loud/soft)
3. Export as MP4 at 1080p 30fps
4. Upload to YouTube (unlisted or public per your preference)
5. Share link in capstone submission

---

## ⏱️ **TIMING CHECKLIST**

| Segment | Duration | Script Lines |
|---------|----------|--------------|
| Intro | 0:00–0:30 | Opening problem statement |
| Problem | 0:30–1:30 | Pain points + 10-section policy overview |
| Demo | 1:30–2:30 | 5-stage flow (auto-run, narrate live) |
| Evidence | 2:30–3:30 | 6/6 test cases, honest limits |
| Launch | 3:30–4:00 | GitHub link, call to action |

**Total: 240 seconds. Practice once to lock timing.**

---

## 💡 **KEY MESSAGES TO HIT**

✅ Agent proposes, human decides (not autonomous)  
✅ 10 explicit policy sections enforced end-to-end  
✅ All 6 test cases pass (real rigor, not cherry-picked)  
✅ Honest about limits (V1 constraints, out-of-scope features)  
✅ Pattern applies beyond dark stores to any human-AI decision workflow  
✅ Code is open, policy is documented, everything is auditable  

---

## 🎯 **OPTIONAL VARIATIONS** (if you want to shoot multiple takes)

### Variation A (More Technical)
- Add 10-15 seconds of code walkthrough (show policy section in index.html)
- Reduce personal intro, increase policy detail

### Variation B (More Story-Driven)
- Start with a real dark store manager's quote (if you have one)
- Increase problem & discovery section to 80 seconds
- Reduce evidence section to show only top 3 cases

### Variation C (Shorter—2 Minutes)
- Trim Intro to 15 seconds
- Trim Problem to 30 seconds
- Keep Demo at 60 seconds
- Trim Evidence to 25 seconds
- Keep Launch at 10 seconds
- Total: 140 seconds
