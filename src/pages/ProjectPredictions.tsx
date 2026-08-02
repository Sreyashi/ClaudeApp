import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useProjectStore } from '../data/useProjectStore';
import StatusBadge from '../components/StatusBadge';
import type { AIProject } from '../data/types';

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24));
}

function FundingDecisionPanel({
  project,
  canAct,
  onDecide,
}: {
  project: AIProject;
  canAct: boolean;
  onDecide: (decision: 'approved' | 'rejected', reason?: string) => void;
}) {
  const [reason, setReason] = useState('');
  const fr = project.fundingRequest;
  if (!fr) return null;

  return (
    <div className="funding-panel">
      <h4>Remaining Funding Request</h4>
      <div className="funding-summary">
        <span className="funding-amount">${(fr.amount / 1000).toFixed(0)}k</span>
        <span className="funding-desc">{fr.description}</span>
      </div>

      {fr.status === 'pending' ? (
        canAct ? (
          <div className="funding-decision">
            <input
              type="text"
              placeholder="Reason for decision (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="funding-buttons">
              <button className="approve-btn" onClick={() => onDecide('approved', reason.trim() || undefined)}>
                Approve remaining funding
              </button>
              <button className="reject-btn" onClick={() => onDecide('rejected', reason.trim() || undefined)}>
                Reject remaining funding
              </button>
            </div>
          </div>
        ) : (
          <span className="funding-status pending">Awaiting CFO decision</span>
        )
      ) : (
        <div className={`funding-resolved ${fr.status}`}>
          <span className="funding-status">
            {fr.status === 'approved' ? 'Approved' : 'Rejected'} by {fr.decidedBy} on {fr.decidedAt}
          </span>
          {fr.decisionReason && <p className="funding-reason">"{fr.decisionReason}"</p>}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  canAct,
  onDecideFunding,
  onAsk,
  questionCount,
}: {
  project: AIProject;
  canAct: boolean;
  onDecideFunding: (decision: 'approved' | 'rejected', reason?: string) => void;
  onAsk: (q: string) => void;
  questionCount: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState('');
  const slip = daysBetween(project.plannedCompletion, project.predictedCompletion);

  return (
    <div className={`project-card status-border-${project.status}`}>
      <div className="project-card-header" onClick={() => setExpanded((e) => !e)}>
        <div>
          <h3>{project.name}</h3>
          <span className="owner">Owner: {project.owner}</span>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="project-stats">
        <div>
          <span className="stat-label">Planned</span>
          <span className="stat-value">{project.plannedCompletion}</span>
        </div>
        <div>
          <span className="stat-label">Predicted</span>
          <span className="stat-value">{project.predictedCompletion}</span>
        </div>
        <div>
          <span className="stat-label">Slip</span>
          <span className={`stat-value ${slip > 0 ? 'negative' : 'positive'}`}>
            {slip > 0 ? `+${slip} days` : 'On schedule'}
          </span>
        </div>
        <div>
          <span className="stat-label">Risk score</span>
          <span className="stat-value">{project.delayRiskScore}/100</span>
        </div>
        <div>
          <span className="stat-label">Committed budget</span>
          <span className="stat-value">${(project.budget / 1000).toFixed(0)}k</span>
        </div>
        {project.fundingRequest && (
          <div>
            <span className="stat-label">Funding decision</span>
            <span className={`stat-value budget-${project.fundingRequest.status}`}>
              {project.fundingRequest.status}
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="project-detail">
          {project.delayReason && (
            <p className="delay-reason"><strong>Delay reason:</strong> {project.delayReason}</p>
          )}

          <div className="milestones">
            {project.milestones.map((m) => (
              <span key={m.name} className={`milestone ${m.done ? 'done' : ''}`}>
                {m.done ? '✓' : '○'} {m.name}
              </span>
            ))}
          </div>

          <div className="qa-section">
            <h4>Clarifying questions ({questionCount})</h4>
            {canAct && (
              <div className="ask-row">
                <input
                  type="text"
                  placeholder="Ask about this delay..."
                  value={draftQuestion}
                  onChange={(e) => setDraftQuestion(e.target.value)}
                />
                <button
                  disabled={!draftQuestion.trim()}
                  onClick={() => {
                    onAsk(draftQuestion.trim());
                    setDraftQuestion('');
                  }}
                >
                  Ask
                </button>
              </div>
            )}
          </div>

          <FundingDecisionPanel project={project} canAct={canAct} onDecide={onDecideFunding} />
        </div>
      )}
    </div>
  );
}

export default function ProjectPredictions() {
  const { user } = useAuth();
  const { projects, questions, decideFunding, askQuestion } = useProjectStore();
  const canAct = user?.role === 'CFO';

  const summary = {
    onTime: projects.filter((p) => p.status === 'on-time').length,
    atRisk: projects.filter((p) => p.status === 'at-risk').length,
    delayed: projects.filter((p) => p.status === 'delayed').length,
  };

  return (
    <div>
      <h1>AI Project Delivery Predictions</h1>
      <p className="page-subtitle">
        {canAct
          ? 'Review delay-prone projects, ask clarifying questions, and approve or reject remaining funding requests.'
          : 'Portfolio-wide view of predicted on-time / delay status across active AI projects.'}
      </p>

      <div className="summary-row">
        <div className="summary-card on-time">{summary.onTime} On Time</div>
        <div className="summary-card at-risk">{summary.atRisk} At Risk</div>
        <div className="summary-card delayed">{summary.delayed} Delayed</div>
      </div>

      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            canAct={canAct}
            onDecideFunding={(decision, reason) =>
              decideFunding(p.id, decision, `${user?.name} (${user?.role})`, reason)
            }
            onAsk={(q) => askQuestion(p.id, `${user?.name} (${user?.role})`, q)}
            questionCount={questions.filter((q) => q.projectId === p.id).length}
          />
        ))}
      </div>
    </div>
  );
}
