# Honest Limits: What the Agent Refuses, Refuses to Do Alone, and Cannot Handle

## The Core Boundary: Recommendation, Not Execution

**The human-in-the-loop gate is non-negotiable.** The agent produces a recommendation. A warehouse manager must explicitly approve the destination store and transfer quantity before the agent creates a pending transfer order. The agent cannot move stock, confirm physical dispatch, or record receipt. No transfer happens without human sign-off.

---

## What the Agent Refuses (Hard Stops)

The agent will escalate and refuse to recommend a transfer when:

### Quality Compromise (Section 7)
- Batch quality status is `damaged`, `temperature_breached`, or `quality_unclear`
- A `returned_from_customer` flag alone does not block the transfer but must be surfaced for manager review
- **Why:** Transferring compromised inventory risks customer harm and regulatory exposure. Quality gates apply regardless of shelf life or demand.

### Forecast Unreliability (Section 6)
- Forecast confidence is labeled `low`, regardless of numerical demand figures
- Forecast confidence is labeled `medium` or `high` BUT the most recent recorded forecast error for that SKU/destination in the recommendation outcome log exceeds ±20% of actual demand
- **Why:** A label alone cannot be trusted. Historical performance is the truth signal. An agent that recommends based on a label contradicted by its own error history is self-defeating.

### Impossible Shelf Life (Section 4)
- After accounting for transport time, fewer than 24 hours of shelf life will remain at the destination
- **Why:** The receiving store cannot sell or use inventory that expires on arrival or within hours. This creates waste, not waste prevention.

### Quantity Over-Cap (Section 5)
- Recommended transfer quantity would exceed 30% of the source store's available on-hand quantity for that SKU
- **Why:** Transferring too much stock starves the source store and creates inventory concentration risk at the destination.

### No Eligible Destination Exists
- No store within 10 km has any unmet demand AND no same-city hero store is designated or available
- **Why:** Recommend only when a real absorber exists. If all nearby stores are already well-stocked, escalate. Shipping across the city is a human call.

### Every Eligible Destination Already Well-Stocked (Section 3)
- Every eligible destination (within 10 km + hero stores) already holds inventory equal to or exceeding its forecast demand
- Unmet need ≤ 0 across all candidates
- **Why:** If no destination has genuine unmet demand, a transfer solves nothing—it just moves excess from one overstocked store to another. Record wastage instead.

### Missing or Inconsistent Data
- Required batch, demand forecast, store distance, quality flag, or recommendation history data is absent or contradicts itself
- The agent cannot cite a record ID that does not appear in the provided context
- **Why:** Decisions on bad data are worse than no decision. The agent escalates rather than invents.

---

## What the Agent Refuses to Do (Scope Boundary)

The agent's role is **transfer recommendation only.** It will never:

### Pricing & Promotions
- Design or price a discount, markdown, or dynamic pricing change
- Recommend a bundle, combo deal, or promotional campaign
- Suggest a limited-time offer to move inventory
- **Why:** Pricing strategy belongs to business and commercial teams. The agent is not authorized to reduce margins or launch campaigns.

### Customer Segment Activation
- Select or target a customer segment
- Personalize an offer by demographic, purchase history, or location
- Launch a flash sale or segment-specific promotion
- **Why:** Customer-facing decisions require privacy, fairness, and brand-voice review outside the agent's scope.

### Supply Chain Planning
- Recommend replenishment orders or sourcing decisions
- Change stock allocation across the network
- Suggest which SKUs to carry or discontinue
- **Why:** Network strategy is a business decision, not an operational tactic.

### Reverse Logistics
- Process customer returns or damage claims
- Authorize refunds or replacements
- Recommend disposal or salvage routes
- **Why:** Returns handling involves liability, customer relations, and compliance beyond inventory transfer.

### Physical Operations
- Move stock itself (the agent cannot and will not touch physical systems)
- Confirm dispatch or receipt
- Route vehicles or optimize transport
- Report on asset utilization or vehicle capacity
- **Why:** Physical operations are human-controlled. The agent recommends; humans execute and verify.

---

## What the Agent Is Transparent About (Known Constraints)

### V1 Scope: Transfer-Only
This version handles **inter-store transfer of packaged fresh milk only.** It does not:
- Optimize across multiple SKUs (each batch is analyzed independently)
- Consolidate or split batches (a batch either transfers whole or is escalated)
- Pool inventory across stores for collective decision-making
- Handle cross-SKU bundles or multi-item transfers
- Model customer substitution effects (if SKU A is unavailable, demand for SKU B does not increase in this model)

**Future scope** (V2+) would cover markdowns, bundles, customer segments, reverse logistics, regional consolidation, and cross-SKU optimization. Today's agent does not.

### Demand Forecast Limitations
- Forecasts reflect a 60-day historical average plus labeled confidence
- No seasonal adjustment for holidays, festivals, or local events (must be pre-loaded in forecast labels)
- No real-time adjustment for weather, local competition, or store-specific factors
- No cross-store demand substitution (if one store runs out, demand does not shift to neighbors automatically)
- A low-confidence forecast is treated as unreliable; a medium/high label is verified against error history, but both depend on the quality of input data

**Implication:** If forecast data is stale or collected under different market conditions, the agent's recommendation degrades. Manager review is essential.

### Transportation Assumptions
- Distance and transport time are pre-computed in a static matrix
- No real-time traffic or weather routing
- Assumes dedicated transport exists for each route at the moment of transfer
- No capacity constraints (the agent does not ask "is the vehicle full?" or "is there another batch on the same route?")
- No consolidation of multiple batches into a single trip

**Implication:** The agent recommends a transfer for one batch in isolation. If three batches need transfer at the same time, the manager must coordinate transport, not the agent.

### Store Network Assumptions
- Fixed 4-store network (no expansion or closure logic)
- Distance matrix pre-computed (no dynamic routing if a store is temporarily closed)
- Hero store designation is hard-coded (qualification does not change in real time)
- A store 22.5 km away remains a hero even if inventory just arrived and capacity is zero

**Implication:** Network changes (new store, distance update, hero status revoked) require code changes, not just data updates.

### Batch Independence
- Each batch is analyzed separately; the agent does not optimize across batches
- A batch either transfers whole or escalates; partial transfers or conditional splits are not supported
- No inventory pooling or reserve strategies (e.g., holding 10% buffer at each store)

**Implication:** If three small batches are near expiry at the same store, the agent recommends three separate transfers. Humans must coordinate consolidation.

### Time-Dependent Risks
- The recommendation is a snapshot; it does not re-rank if conditions change while the manager is reviewing
- If shelf life drops below 24 hours after the recommendation is issued, the agent does not recheck
- If a destination's demand forecast is updated, the recommendation does not refresh
- No monitoring loop during the approval wait period

**Implication:** A manager must act quickly. If approval is delayed, the agent cannot warn that shelf life is slipping or demand forecasts have shifted.

### Shelf-Life Countdown
- The agent verifies 24-hour minimum at recommendation time
- It does not track shelf life in real time or escalate if the window closes during transport
- Physical receipt confirmation is a human responsibility
- No automatic fallback if the batch spoils in transit

**Implication:** The receiving store must be ready to accept and use the batch immediately. Delays in transport or receipt convert a valid transfer into waste.

---

## What Remains Unhandled (Edge Cases & Gaps)

### Batch Tracking Post-Transfer
- Once the manager approves, the agent does not create the transfer order itself (that is a manager action via the console button)
- The agent does not log physical dispatch or confirm receipt
- No automatic alert if the receiving store does not report receipt within X hours

**Mitigation:** Manager must manually log dispatch and follow up on receipt.

### Demand Forecast Updates During Approval
- If forecast demand changes while a manager is reviewing a recommendation, the agent does not re-rank candidates
- If the source store's demand drops (e.g., a flash sale ends), the at-risk quantity recalculation is manual

**Mitigation:** Managers should re-run the case if significant time has passed.

### Quality Flag Disputes
- A `returned_from_customer` flag surfaces but does not automatically block transfer
- A manager could approve a transfer of returned stock, but the agent has no role in validating whether the return reason is acceptable
- `quality_unclear` is a hard block (escalates), but managers must then inspect the batch manually

**Mitigation:** Inspection and quality dispute resolution remain human decisions.

### Forecast Error Attribution
- The recommendation outcome log records actual vs. predicted demand after the fact
- The agent uses this to decide if future forecasts at that destination are trustworthy
- But the log does not capture why the forecast was wrong (supply disruption? competitor action? data entry error?)
- A recurring large error could be a data quality issue, not a demand signal

**Mitigation:** Managers must review the outcome log periodically and flag systematic forecast issues to the forecasting team.

### Same-City Hero Store Qualification
- Hero store designation is static (hard-coded by the business)
- The agent does not re-evaluate whether a store is still a viable hero (e.g., if it is closing soon or experiencing staffing shortages)
- Distance to a hero store is fixed; if the network expands or a store relocates, the matrix is out of date

**Mitigation:** Hero store list and distance matrix require periodic review and manual updates.

### Reverse Logistics
- If a batch is damaged, temperature-breached, or quality-flagged, the agent escalates
- It does not recommend a disposal route, salvage value, or vendor return process
- No integration with returns processing or waste tracking

**Mitigation:** Escalated quality issues are routed to operations for manual disposition.

### Cross-Store Demand Substitution
- If Store A is out of a SKU, the agent does not model whether customers will buy that SKU from Store B instead
- Each store's demand is independent

**Implication:** A transfer that empties a source store's inventory could inadvertently create a stock-out at the source if demand increases unexpectedly.

---

## What the System Promises (What to Rely On)

- **Accuracy of the policy framework:** If all inputs are correct and current, the agent's recommendation is defensible under the stated policy.
- **Refusal to act without approval:** No transfer order is created without explicit manager sign-off on destination and quantity.
- **Transparency on reasoning:** The Why field names exact data and policy sections used, so a manager can audit and override if needed.
- **Escalation over guessing:** When confidence is low, data is missing, or stakes are high, the agent escalates rather than guessing.
- **Quality gate protection:** Compromised batches are never recommended for transfer, regardless of shelf life or demand.

---

## Honest Summary

**The agent is a decision-support tool for warehouse managers, not a decision-maker.** It narrows the field of viable options using policy rules, but it requires human judgment on:
- Approval of the specific destination and quantity
- Quality disputes and returned items
- Forecast reliability and demand changes
- Transport coordination and execution
- Exceptions to policy (e.g., an urgent transfer to prevent a stock-out at a critical location)

The agent's strength is consistency and speed. Its honesty is refusing to move without human sign-off, escalating on doubt, and staying in bounds. A manager who overrides the agent's refusal or approves a recommendation without reviewing the Why field is accepting risk the system was designed to flag.
