# Near-Expiry Inventory Transfer Policy

Applies to: packaged fresh milk batches across Store A, Store B, Store C, and Store D (dark stores). V1 covers inter-store transfer only.

## Section 1 — Review Window
A batch enters review when all three are true:
1. 48 hours or less remain before expiry.
2. Predicted demand at the source store before expiry is lower than the batch's on-hand quantity.
3. The resulting projected unsold quantity is greater than zero.

## Section 2 — Destination Eligibility
A destination store is eligible if it is within 10 km of the source store, or if it is a designated same-city hero store. Same-city hero stores are always included in the comparison alongside within-10km stores — they are not held back until every within-10km store has zero or negative unmet need. Section 3 decides the winner by ranking all eligible destinations, nearby and hero alike, by unmet_need_units; a hero store with substantially higher unmet_need_units than any within-10km option must be preferred over a nearby store whose unmet need is only marginal.

## Section 3 — Destination Ranking
For every eligible destination, compute unmet need: unmet_need = predicted demand − existing on-hand inventory of the same SKU. Eligible destinations are ranked by unmet_need, highest first — never by distance alone, and never by which destination simply has the lowest existing inventory in isolation. A destination that already holds some inventory of the SKU can still have more genuine unmet need than a destination starting at zero, if its demand is high enough; the comparison that matters is the net figure (demand minus existing inventory), not the existing-inventory number by itself. The nearest store is not automatically the recommended one, and neither is the store with the highest raw demand if it is already well-stocked on that SKU relative to demand.

## Section 4 — Shelf-Life-After-Arrival Rule
A transfer must leave at least 24 hours of shelf life remaining after the batch arrives at the destination, accounting for transport time. If this cannot be met, the agent must not recommend the transfer.

## Section 5 — Transfer Quantity Cap
A single recommended transfer must not exceed 30% of the source store's available on-hand quantity for that SKU, even if a larger quantity is at risk of expiring.

## Section 6 — Forecast Confidence Requirement
A demand forecast is acceptable only if it is labeled medium or high confidence AND the same SKU/destination store's most recent forecast error on record in the recommendation outcome log is within ±20% of actual demand. When confidence is labeled low, or when it is labeled medium/high but the most recent recorded forecast error for that SKU/store exceeds ±20%, the agent must treat the forecast as unacceptable, flag it as unreliable, and escalate rather than recommend a transfer — even if the label alone looks fine. A confidence label must never be trusted at face value without checking it against the recommendation outcome log.

## Section 7 — Quality Gate
If a batch's quality status is damaged, temperature_breached, or quality_unclear, the agent must refuse to recommend any transfer and escalate for human inspection, regardless of demand or shelf life. A returned_from_customer flag alone does not automatically block a transfer — it must be surfaced for manager review.

## Section 8 — Scope Boundary
The agent may only recommend inter-store transfers. It must never recommend, design, or price a discount, promotion, or bundle, and must never select a customer segment for activation. If no transfer is feasible, the agent records expected wastage instead of proposing a promotional alternative.

## Section 9 — Human Approval Gate
The agent may only produce a recommendation. A warehouse manager must approve the destination store and transfer quantity before the agent creates a pending transfer order. Humans alone confirm physical dispatch and receipt — the agent cannot move stock.

## Section 10 — Escalation Triggers
Escalate instead of recommending a normal transfer when any of the following apply:
- No eligible destination exists within 10 km and no feasible same-city hero-store transfer exists.
- Demand forecast confidence is unacceptable per Section 6 (either labeled low, or labeled medium/high but contradicted by a recent forecast error exceeding ±20% in the recommendation outcome log).
- Required order or inventory data is missing or inconsistent.
- Quality status is damaged, temperature_breached, or unclear (see Section 7).
- Recommended quantity would exceed the 30% source-stock cap (see Section 5).
- Shelf life after arrival would fall below 24 hours (see Section 4).
- Every eligible destination already holds sufficient inventory of the SKU relative to its own demand, leaving no destination with genuine unmet need (see Section 3).

If a batch cannot be transferred and becomes waste, the agent must record the wastage reason, including whether the item was sold, returned, or quality-flagged, so downstream systems can learn whether the waste traces to a dependent process issue.
