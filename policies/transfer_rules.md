# Near-Expiry Inventory Transfer Policy

Applies to: packaged fresh milk batches across Store A, Store B, Store C, and Store D (dark stores). V1 covers inter-store transfer only.

## Section 1 — Review Window
A batch enters review when all three are true:
1. 48 hours or less remain before expiry.
2. Predicted demand at the source store before expiry is lower than the batch's on-hand quantity.
3. The resulting projected unsold quantity is greater than zero.

## Section 2 — Destination Eligibility
A destination store is eligible if it is within 10 km of the source store, OR it is a designated same-city hero store considered when no store within 10 km can absorb the excess.

## Section 3 — Destination Ranking
Eligible destinations are ranked by projected SKU demand and ability to absorb the stock — never by distance alone. The nearest store is not automatically the recommended one.

## Section 4 — Shelf-Life-After-Arrival Rule
A transfer must leave at least 24 hours of shelf life remaining after the batch arrives at the destination, accounting for transport time. If this cannot be met, the agent must not recommend the transfer.

## Section 5 — Transfer Quantity Cap
A single recommended transfer must not exceed 30% of the source store's available on-hand quantity for that SKU, even if a larger quantity is at risk of expiring.

## Section 6 — Forecast Confidence Requirement
The agent only acts on a demand forecast labeled medium or high confidence. When confidence is low, or the forecast diverges sharply from the pre-labeled expected demand or the 60-day average, the agent must flag the forecast as unreliable and escalate rather than recommend a transfer.

## Section 7 — Quality Gate
If a batch's quality status is damaged, temperature_breached, or quality_unclear, the agent must refuse to recommend any transfer and escalate for human inspection, regardless of demand or shelf life. A returned_from_customer flag alone does not automatically block a transfer — it must be surfaced for manager review.

## Section 8 — Scope Boundary
The agent may only recommend inter-store transfers. It must never recommend, design, or price a discount, promotion, or bundle, and must never select a customer segment for activation. If no transfer is feasible, the agent records expected wastage instead of proposing a promotional alternative.

## Section 9 — Human Approval Gate
The agent may only produce a recommendation. A warehouse manager must approve the destination store and transfer quantity before the agent creates a pending transfer order. Humans alone confirm physical dispatch and receipt — the agent cannot move stock.

## Section 10 — Escalation Triggers
Escalate instead of recommending a normal transfer when any of the following apply:
- No eligible destination exists within 10 km and no feasible same-city hero-store transfer exists.
- Demand forecast confidence is low (see Section 6).
- Required order or inventory data is missing or inconsistent.
- Quality status is damaged, temperature_breached, or unclear (see Section 7).
- Recommended quantity would exceed the 30% source-stock cap (see Section 5).
- Shelf life after arrival would fall below 24 hours (see Section 4).

If a batch cannot be transferred and becomes waste, the agent must record the wastage reason, including whether the item was sold, returned, or quality-flagged, so downstream systems can learn whether the waste traces to a dependent process issue.
