/**
 * Eval suite for the CFO Q&A assistant.
 *
 * Each case specifies:
 *  - The project context passed to the model
 *  - The CFO question
 *  - The expected ideal answer (used as grading reference)
 *  - The eval dimension being tested
 *  - The grading criteria the judge model should apply
 *
 * Dimensions:
 *  groundedness  — does the answer stay within provided context?
 *  relevance     — does it directly address the question asked?
 *  conciseness   — is it appropriately brief (≤6 sentences)?
 *  refusal       — does the model correctly decline out-of-scope questions?
 *  usefulness    — is the answer actionable for a CFO making a funding decision?
 *  hallucination — does the model fabricate facts not in the context?
 */

export type EvalDimension =
  | 'groundedness'
  | 'relevance'
  | 'conciseness'
  | 'refusal'
  | 'usefulness'
  | 'hallucination';

export type EvalStatus = 'pass' | 'fail' | 'pending';

export interface EvalContext {
  projectName: string;
  status: string;
  plannedCompletion: string;
  predictedCompletion: string;
  delayRiskScore: number;
  delayReason?: string;
  milestones: { name: string; done: boolean }[];
  fundingRequest?: { amount: number; description: string };
}

export interface EvalCase {
  id: string;
  title: string;
  dimension: EvalDimension;
  context: EvalContext;
  question: string;
  idealAnswer: string;
  gradingCriteria: string;
  /** Populated after running the eval */
  modelAnswer?: string;
  status?: EvalStatus;
  score?: number; // 0–100
  judgeRationale?: string;
}

const salesForecastingCtx: EvalContext = {
  projectName: 'Sales Forecasting Agent',
  status: 'delayed',
  plannedCompletion: '2026-05-15',
  predictedCompletion: '2026-08-02',
  delayRiskScore: 78,
  delayReason: 'Data quality issues from CRM integration causing repeated model retraining cycles.',
  milestones: [
    { name: 'Data pipeline', done: true },
    { name: 'Model fine-tuning', done: false },
    { name: 'Integration testing', done: false },
    { name: 'Rollout', done: false },
  ],
  fundingRequest: {
    amount: 450000,
    description: 'Remaining funding to complete retraining cycles and integration testing.',
  },
};

const contractReviewCtx: EvalContext = {
  projectName: 'Contract Review Agent',
  status: 'delayed',
  plannedCompletion: '2026-09-01',
  predictedCompletion: '2026-11-10',
  delayRiskScore: 82,
  delayReason: 'Legal compliance review cycle longer than scoped; awaiting outside counsel sign-off.',
  milestones: [
    { name: 'Data pipeline', done: true },
    { name: 'Model fine-tuning', done: false },
    { name: 'Integration testing', done: false },
    { name: 'Rollout', done: false },
  ],
  fundingRequest: {
    amount: 200000,
    description: 'Remaining funding to complete legal compliance review and rollout.',
  },
};

const knowledgeAssistantCtx: EvalContext = {
  projectName: 'Internal Knowledge Assistant',
  status: 'at-risk',
  plannedCompletion: '2026-06-30',
  predictedCompletion: '2026-07-20',
  delayRiskScore: 54,
  delayReason: 'Vendor API rate limits slowing ingestion of document corpus.',
  milestones: [
    { name: 'Data pipeline', done: true },
    { name: 'Model fine-tuning', done: true },
    { name: 'Integration testing', done: false },
    { name: 'Rollout', done: false },
  ],
  fundingRequest: {
    amount: 120000,
    description: 'Remaining funding to cover extended ingestion timeline.',
  },
};

const fraudDetectionCtx: EvalContext = {
  projectName: 'Fraud Detection Agent',
  status: 'on-time',
  plannedCompletion: '2026-03-01',
  predictedCompletion: '2026-03-01',
  delayRiskScore: 8,
  milestones: [
    { name: 'Data pipeline', done: true },
    { name: 'Model fine-tuning', done: true },
    { name: 'Integration testing', done: true },
    { name: 'Rollout', done: true },
  ],
};

export const evalCases: EvalCase[] = [
  // ── Groundedness ──────────────────────────────────────────────────────────
  {
    id: 'eval-001',
    title: 'Root cause of Sales Forecasting delay',
    dimension: 'groundedness',
    context: salesForecastingCtx,
    question: 'What is the root cause of the Sales Forecasting Agent delay?',
    idealAnswer:
      'The delay is caused by data quality issues in the CRM integration, which forced repeated model retraining cycles. The project is now predicted to complete on 2026-08-02, roughly 11 weeks behind the planned date of 2026-05-15. Three of four milestones remain incomplete.',
    gradingCriteria:
      'Answer must cite CRM data quality and repeated retraining cycles. Must not introduce any facts not in the context. Completion dates cited must match context exactly.',
  },
  {
    id: 'eval-002',
    title: 'Milestone progress for Contract Review Agent',
    dimension: 'groundedness',
    context: contractReviewCtx,
    question: 'How many milestones have been completed for the Contract Review Agent?',
    idealAnswer:
      'Only one of four milestones has been completed — the Data pipeline. Model fine-tuning, integration testing, and rollout are all pending.',
    gradingCriteria:
      'Must state exactly 1 of 4 milestones complete. Must name the completed milestone (Data pipeline). Must not invent additional milestones.',
  },

  // ── Hallucination ─────────────────────────────────────────────────────────
  {
    id: 'eval-003',
    title: 'No hallucinated cost figures',
    dimension: 'hallucination',
    context: salesForecastingCtx,
    question: 'How much has been spent so far on the Sales Forecasting Agent?',
    idealAnswer:
      "I don't have enough data to answer that — the context shows a pending funding request of $450,000 for remaining work, but actual spend-to-date figures aren't available here. You may want to follow up with the project owner.",
    gradingCriteria:
      'Model must NOT invent a spend figure. It should acknowledge the $450,000 funding request but clarify that actual spend data is not in the provided context. A hallucinated spend figure is an automatic fail.',
  },
  {
    id: 'eval-004',
    title: 'No hallucinated team members',
    dimension: 'hallucination',
    context: contractReviewCtx,
    question: 'Who is the lead engineer responsible for the legal compliance review?',
    idealAnswer:
      "I don't have enough data to answer that — the context only identifies the project owner (Sofia Marchetti) but doesn't include individual team member assignments. You may want to follow up with the project owner.",
    gradingCriteria:
      'Model must not invent a name for the lead engineer. The only person named in the context is Sofia Marchetti as project owner; citing any other name is a hallucination and automatic fail.',
  },

  // ── Relevance ─────────────────────────────────────────────────────────────
  {
    id: 'eval-005',
    title: 'Direct answer to funding question',
    dimension: 'relevance',
    context: knowledgeAssistantCtx,
    question: 'What is the funding request amount and what will it cover?',
    idealAnswer:
      'The pending funding request is for $120,000. It is intended to cover the extended ingestion timeline caused by vendor API rate limits. Two milestones remain incomplete: integration testing and rollout.',
    gradingCriteria:
      'Must state $120,000. Must mention the vendor API rate limit as the reason for the extended timeline. Must not go off-topic into unrelated project details.',
  },
  {
    id: 'eval-006',
    title: 'Risk score interpretation',
    dimension: 'relevance',
    context: salesForecastingCtx,
    question: 'How serious is the delay risk for the Sales Forecasting Agent?',
    idealAnswer:
      'The delay risk score is 78 out of 100, indicating a high risk of further slippage. The project is already delayed by approximately 11 weeks, with CRM data quality issues as the root cause. Three milestones remain incomplete.',
    gradingCriteria:
      'Must cite the 78/100 risk score. Must characterise it as high risk. Must connect back to the CRM data quality issue. Should not pad with off-topic information.',
  },

  // ── Conciseness ───────────────────────────────────────────────────────────
  {
    id: 'eval-007',
    title: 'Concise summary of at-risk project',
    dimension: 'conciseness',
    context: knowledgeAssistantCtx,
    question: 'Give me a brief summary of where the Internal Knowledge Assistant stands.',
    idealAnswer:
      'The Internal Knowledge Assistant is at-risk with a delay score of 54/100. It is predicted to complete on 2026-07-20, about 3 weeks behind the 2026-06-30 plan. Vendor API rate limits are slowing document ingestion. Data pipeline and model fine-tuning are done; integration testing and rollout remain.',
    gradingCriteria:
      'Answer must be 3–6 sentences. Must cover status, dates, root cause, and milestone state. Longer than 8 sentences is a conciseness fail.',
  },

  // ── Refusal ───────────────────────────────────────────────────────────────
  {
    id: 'eval-008',
    title: 'Decline competitor strategy question',
    dimension: 'refusal',
    context: salesForecastingCtx,
    question: 'How does our Sales Forecasting Agent compare to what our competitors are building?',
    idealAnswer:
      "That's outside the scope of the portfolio data I have access to. I can only speak to this project's own status, milestones, and funding — not competitive landscape.",
    gradingCriteria:
      'Model must decline to speculate on competitor products and redirect to in-scope data. Any fabricated competitor comparison is an automatic fail.',
  },
  {
    id: 'eval-009',
    title: 'Decline funding recommendation',
    dimension: 'refusal',
    context: contractReviewCtx,
    question: 'Should I approve the $200,000 funding request for the Contract Review Agent?',
    idealAnswer:
      'That decision is yours to make as CFO. I can share that the project has a delay risk score of 82/100, is predicted to be about 10 weeks late, and that the $200,000 request covers the legal compliance review and rollout phases. Whether those factors justify the additional funding is a judgement call I am not positioned to make for you.',
    gradingCriteria:
      'Model must NOT give a recommendation (approve or reject). It should present the relevant facts (risk score, delay length, what the money covers) neutrally and explicitly defer the decision to the CFO.',
  },
  {
    id: 'eval-010',
    title: 'Decline HR question',
    dimension: 'refusal',
    context: fraudDetectionCtx,
    question: 'Should we give Marcus Webb a bonus for the Fraud Detection project?',
    idealAnswer:
      "That's outside the scope of the portfolio data I have access to. HR and compensation matters aren't part of the project dashboard. You may want to raise that with the HR team.",
    gradingCriteria:
      'Model must decline and not make any compensation recommendation. Note: Marcus Webb is actually the owner of the Sales Forecasting project, not Fraud Detection — the model should not confuse this or invent a connection.',
  },

  // ── Usefulness ────────────────────────────────────────────────────────────
  {
    id: 'eval-011',
    title: 'Actionable delay impact framing',
    dimension: 'usefulness',
    context: contractReviewCtx,
    question: 'What should I know before deciding on the Contract Review Agent funding request?',
    idealAnswer:
      'Key facts: the project has an 82/100 delay risk and is predicted to finish 10 weeks late (2026-11-10 vs planned 2026-09-01). The root cause is a longer-than-scoped legal compliance review awaiting outside counsel. The $200,000 request covers the remaining compliance review and rollout. Only the data pipeline milestone is done; three milestones are outstanding. Approving would fund completion; rejecting would leave those phases unfunded.',
    gradingCriteria:
      'Answer must surface all CFO-relevant facts: risk score, delay duration, root cause, amount, what it covers, and milestone state. Should not recommend a decision but must give enough data to make one. A purely factual recitation without decision-relevant framing scores lower.',
  },
  {
    id: 'eval-012',
    title: 'On-time project — no false alarm',
    dimension: 'usefulness',
    context: fraudDetectionCtx,
    question: 'Do I need to take any action on the Fraud Detection Agent?',
    idealAnswer:
      'No action appears necessary. The Fraud Detection Agent is on-time with a low delay risk score of 8/100. All four milestones are complete and it has already rolled out. There is no pending funding request.',
    gradingCriteria:
      'Model should reassure the CFO clearly — no action needed. Must cite the 8/100 risk score and all-milestones-done. Should not manufacture concerns or suggest follow-up that is not warranted by the data.',
  },
];

/** Aggregate pass rate per dimension from scored eval results */
export function summariseByDimension(cases: EvalCase[]): Record<EvalDimension, { pass: number; total: number }> {
  const summary: Record<string, { pass: number; total: number }> = {};
  for (const c of cases) {
    if (!summary[c.dimension]) summary[c.dimension] = { pass: 0, total: 0 };
    summary[c.dimension].total++;
    if (c.status === 'pass') summary[c.dimension].pass++;
  }
  return summary as Record<EvalDimension, { pass: number; total: number }>;
}
