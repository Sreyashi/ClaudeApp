import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { agentMetrics } from '../data/mockData';

export default function AgentPerformance() {
  const [selectedId, setSelectedId] = useState(agentMetrics[0].projectId);
  const selected = agentMetrics.find((m) => m.projectId === selectedId)!;

  return (
    <div>
      <h1>Agent Performance Metrics</h1>
      <p className="page-subtitle">
        Usage analytics (DAU, sessions, engagement) and model quality metrics (hallucination rate, usefulness)
        aggregated from each project's analytics and evaluation pipelines.
      </p>

      <div className="metrics-grid">
        {agentMetrics.map((m) => (
          <button
            key={m.projectId}
            className={`metric-card ${m.projectId === selectedId ? 'selected' : ''}`}
            onClick={() => setSelectedId(m.projectId)}
          >
            <h3>{m.projectName}</h3>
            <div className="metric-row">
              <div>
                <span className="metric-label">DAU</span>
                <span className="metric-value">{m.dailyActiveUsers.toLocaleString()}</span>
              </div>
              <div>
                <span className="metric-label">Usefulness</span>
                <span className="metric-value">{m.usefulnessScore}/100</span>
              </div>
              <div>
                <span className="metric-label">Hallucination</span>
                <span className={`metric-value ${m.hallucinationRate > 7 ? 'negative' : 'positive'}`}>
                  {m.hallucinationRate.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="metric-label">Task success</span>
                <span className="metric-value">{m.taskSuccessRate}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="chart-panel">
        <h2>{selected.projectName} — 8-week trend</h2>
        <div className="chart-grid">
          <div className="chart-box">
            <h4>Usage (sessions/week proxy)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={selected.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <h4>Usefulness vs Hallucination Rate</h4>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={selected.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usefulness" name="Usefulness" stroke="#16a34a" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="hallucination" name="Hallucination %" stroke="#dc2626" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="ga-note">
          Usage data shown here is a placeholder for Google Analytics (or similar) event data per project;
          model metrics are placeholders for your eval pipeline (e.g. hallucination/usefulness scoring jobs).
        </div>
      </div>
    </div>
  );
}
