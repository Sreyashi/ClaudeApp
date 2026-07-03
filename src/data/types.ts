export type ProjectStatus = 'on-time' | 'at-risk' | 'delayed';

export type FundingDecisionStatus = 'pending' | 'approved' | 'rejected';

export interface FundingRequest {
  id: string;
  amount: number;
  description: string;
  status: FundingDecisionStatus;
  decidedBy?: string;
  decidedAt?: string;
  decisionReason?: string;
}

export interface AIProject {
  id: string;
  name: string;
  owner: string;
  budget: number;
  startDate: string;
  predictedCompletion: string;
  plannedCompletion: string;
  status: ProjectStatus;
  delayRiskScore: number; // 0-100
  delayReason?: string;
  milestones: { name: string; done: boolean }[];
  /** Remaining/future funding tranche awaiting CFO decision, once a delay surfaces */
  fundingRequest?: FundingRequest;
}

export interface ClarifyingQuestion {
  id: string;
  projectId: string;
  askedBy: string;
  question: string;
  answer?: string;
  createdAt: string;
}

export interface AgentMetrics {
  projectId: string;
  projectName: string;
  dailyActiveUsers: number;
  sessionsPerWeek: number;
  avgSessionMinutes: number;
  hallucinationRate: number; // %
  usefulnessScore: number; // 0-100, from user feedback/eval
  taskSuccessRate: number; // %
  trend: { date: string; usefulness: number; hallucination: number; usage: number }[];
}
