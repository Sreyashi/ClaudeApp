import { useState } from 'react';
import { evalCases, summariseByDimension, type EvalCase, type EvalDimension } from '../data/evals';
import { CFO_QA_SYSTEM_PROMPT } from '../prompts/systemPrompt';

const DIMENSION_LABELS: Record<EvalDimension, string> = {
  groundedness: 'Groundedness',
  relevance: 'Relevance',
  conciseness: 'Conciseness',
  refusal: 'Refusal (scope)',
  usefulness: 'Usefulness',
  hallucination: 'Hallucination resistance',
};

const DIM_COLORS: Record<EvalDimension, string> = {
  groundedness: '#2563eb',
  relevance: '#7c3aed',
  conciseness: '#0891b2',
  refusal: '#d97706',
  usefulness: '#16a34a',
  hallucination: '#dc2626',
};

function DimensionBadge({ dim }: { dim: EvalDimension }) {
  return (
    <span
      className="eval-dim-badge"
      style={{ background: DIM_COLORS[dim] }}
    >
      {DIMENSION_LABELS[dim]}
    </span>
  );
}

function StatusPill({ status }: { status?: EvalCase['status'] }) {
  if (!status || status === 'pending') return <span className="eval-status pending">Pending</span>;
  if (status === 'pass') return <span className="eval-status pass">Pass</span>;
  return <span className="eval-status fail">Fail</span>;
}

function EvalCard({ ec, onToggle, open }: { ec: EvalCase; onToggle: () => void; open: boolean }) {
  return (
    <div className={`eval-card ${ec.status ?? 'pending'}`}>
      <div className="eval-card-header" onClick={onToggle} style={{ cursor: 'pointer' }}>
        <div className="eval-card-title">
          <span className="eval-id">{ec.id}</span>
          <span className="eval-title-text">{ec.title}</span>
        </div>
        <div className="eval-card-meta">
          <DimensionBadge dim={ec.dimension} />
          <StatusPill status={ec.status} />
          {ec.score !== undefined && (
            <span className="eval-score">{ec.score}/100</span>
          )}
          <span className="eval-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {open && (
        <div className="eval-card-body">
          <div className="eval-section">
            <div className="eval-section-label">Project context</div>
            <div className="eval-context-grid">
              <span><b>Project:</b> {ec.context.projectName}</span>
              <span><b>Status:</b> {ec.context.status}</span>
              <span><b>Risk score:</b> {ec.context.delayRiskScore}/100</span>
              <span><b>Planned:</b> {ec.context.plannedCompletion}</span>
              <span><b>Predicted:</b> {ec.context.predictedCompletion}</span>
              {ec.context.fundingRequest && (
                <span><b>Funding request:</b> ${ec.context.fundingRequest.amount.toLocaleString()}</span>
              )}
            </div>
            {ec.context.delayReason && (
              <div className="eval-delay-reason">Delay reason: {ec.context.delayReason}</div>
            )}
          </div>

          <div className="eval-section">
            <div className="eval-section-label">CFO question</div>
            <div className="eval-question">"{ec.question}"</div>
          </div>

          <div className="eval-section">
            <div className="eval-section-label">Ideal answer (grading reference)</div>
            <div className="eval-ideal">{ec.idealAnswer}</div>
          </div>

          <div className="eval-section">
            <div className="eval-section-label">Grading criteria</div>
            <div className="eval-criteria">{ec.gradingCriteria}</div>
          </div>

          {ec.modelAnswer && (
            <div className="eval-section">
              <div className="eval-section-label">Model answer</div>
              <div className="eval-model-answer">{ec.modelAnswer}</div>
            </div>
          )}

          {ec.judgeRationale && (
            <div className="eval-section">
              <div className="eval-section-label">Judge rationale</div>
              <div className="eval-rationale">{ec.judgeRationale}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PassBar({ pass, total }: { pass: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((pass / total) * 100);
  const color = pct >= 80 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626';
  return (
    <div className="pass-bar-wrap">
      <div className="pass-bar-track">
        <div className="pass-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="pass-bar-label" style={{ color }}>{pass}/{total} ({pct}%)</span>
    </div>
  );
}

export default function Evals() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [filterDim, setFilterDim] = useState<EvalDimension | 'all'>('all');
  const [showPrompt, setShowPrompt] = useState(false);

  const dims = Object.keys(DIMENSION_LABELS) as EvalDimension[];
  const summary = summariseByDimension(evalCases);
  const totalPass = evalCases.filter(c => c.status === 'pass').length;
  const totalFail = evalCases.filter(c => c.status === 'fail').length;
  const totalPending = evalCases.filter(c => !c.status || c.status === 'pending').length;

  const filtered = filterDim === 'all' ? evalCases : evalCases.filter(c => c.dimension === filterDim);

  return (
    <div>
      <h2 style={{ margin: '0 0 4px' }}>Eval Suite — CFO Q&amp;A Assistant</h2>
      <p className="page-subtitle">
        {evalCases.length} test cases across {dims.length} dimensions · {totalPass} pass · {totalFail} fail · {totalPending} pending
      </p>

      {/* Summary grid */}
      <div className="eval-summary-grid">
        {dims.map(dim => (
          <div
            key={dim}
            className={`eval-summary-card ${filterDim === dim ? 'selected' : ''}`}
            onClick={() => setFilterDim(filterDim === dim ? 'all' : dim)}
            style={{ borderColor: filterDim === dim ? DIM_COLORS[dim] : undefined }}
          >
            <div className="eval-summary-label" style={{ color: DIM_COLORS[dim] }}>
              {DIMENSION_LABELS[dim]}
            </div>
            <PassBar
              pass={summary[dim]?.pass ?? 0}
              total={summary[dim]?.total ?? 0}
            />
          </div>
        ))}
      </div>

      {/* System prompt disclosure */}
      <div className="eval-prompt-toggle">
        <button className="prompt-toggle-btn" onClick={() => setShowPrompt(v => !v)}>
          {showPrompt ? '▲ Hide system prompt' : '▼ Show system prompt'}
        </button>
        {showPrompt && (
          <pre className="system-prompt-pre">{CFO_QA_SYSTEM_PROMPT}</pre>
        )}
      </div>

      {/* Filter bar */}
      <div className="eval-filter-bar">
        <span className="eval-filter-label">Filter:</span>
        <button
          className={`eval-filter-btn ${filterDim === 'all' ? 'active' : ''}`}
          onClick={() => setFilterDim('all')}
        >
          All ({evalCases.length})
        </button>
        {dims.map(dim => (
          <button
            key={dim}
            className={`eval-filter-btn ${filterDim === dim ? 'active' : ''}`}
            onClick={() => setFilterDim(filterDim === dim ? 'all' : dim)}
            style={filterDim === dim ? { background: DIM_COLORS[dim], borderColor: DIM_COLORS[dim] } : {}}
          >
            {DIMENSION_LABELS[dim]} ({evalCases.filter(c => c.dimension === dim).length})
          </button>
        ))}
      </div>

      {/* Eval cases */}
      <div className="eval-list">
        {filtered.map(ec => (
          <EvalCard
            key={ec.id}
            ec={ec}
            open={openId === ec.id}
            onToggle={() => setOpenId(openId === ec.id ? null : ec.id)}
          />
        ))}
      </div>

      <p className="ga-note">
        Evals are run offline via the Claude API (model: claude-opus-4-8 as judge).
        Results are stored and compared across model versions and prompt iterations.
        "Pending" cases have not yet been executed against the live model.
      </p>
    </div>
  );
}
