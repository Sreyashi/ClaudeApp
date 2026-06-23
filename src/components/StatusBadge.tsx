import type { ProjectStatus } from '../data/types';

const LABELS: Record<ProjectStatus, string> = {
  'on-time': 'On Time',
  'at-risk': 'At Risk',
  delayed: 'Delayed',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`status-badge status-${status}`}>{LABELS[status]}</span>;
}
