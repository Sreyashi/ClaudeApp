import { useState } from 'react';
import { projects as initialProjects, clarifyingQuestions as initialQuestions } from './mockData';
import type { AIProject, ClarifyingQuestion } from './types';

export function useProjectStore() {
  const [projects, setProjects] = useState<AIProject[]>(initialProjects);
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>(initialQuestions);

  function decideFunding(
    projectId: string,
    decision: 'approved' | 'rejected',
    decidedBy: string,
    reason?: string
  ) {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId && p.fundingRequest
          ? {
              ...p,
              fundingRequest: {
                ...p.fundingRequest,
                status: decision,
                decidedBy,
                decidedAt: new Date().toISOString().slice(0, 10),
                decisionReason: reason,
              },
            }
          : p
      )
    );
  }

  function askQuestion(projectId: string, askedBy: string, question: string) {
    const newQuestion: ClarifyingQuestion = {
      id: `q${Date.now()}`,
      projectId,
      askedBy,
      question,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  }

  return { projects, questions, decideFunding, askQuestion };
}
