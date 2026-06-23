import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useProjectStore } from '../data/useProjectStore';
import StatusBadge from '../components/StatusBadge';
import type { AIProject } from '../data/types';

function daysBetween(a: string, b: string) {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24));
}

function ProjectCard({
  project,
  canAct,
  onReject,
  onApprove,
  onAsk,
  questionCount,
}: {
  project: AIProject;
  canAct: boolean;
  onReject: () => void;
  onApprove: () => void;
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
          <span className="stat-label">Budget</span>
          <span className={`stat-value budget-${project.budgetStatus}`}>
            ${(project.budget / 1000).toFixed(0)}k · {project.budgetStatus}
          </span>
        </div>
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

          {canAct && project.status !== 'on-time' && (
            <div className="budget-actions">
              {project.budgetStatus !== 'rejected' ? (
                <button className="reject-btn" onClick={onReject}>
                  Reject future budget
                </button>
              ) : (
                <button className="approve-btn" onClick={onApprove}>
                  Re-approve budget
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectPredictions() {
  const { user } = useAuth();
  const { projects, questions, rejectBudget, approveBudget, askQuestion } = useProjectStore();
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
          ? 'Review delay-prone projects, ask clarifying questions, and manage future budget approvals.'
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
            onReject={() => rejectBudget(p.id)}
            onApprove={() => approveBudget(p.id)}
            onAsk={(q) => askQuestion(p.id, `${user?.name} (${user?.role})`, q)}
            questionCount={questions.filter((q) => q.projectId === p.id).length}
          />
        ))}
      </div>
    </div>
  );
}
