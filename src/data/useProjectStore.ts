import { useState } from 'react';
import { projects as initialProjects, clarifyingQuestions as initialQuestions } from './mockData';
import type { AIProject, ClarifyingQuestion } from './types';

export function useProjectStore() {
  const [projects, setProjects] = useState<AIProject[]>(initialProjects);
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>(initialQuestions);

  function rejectBudget(projectId: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, budgetStatus: 'rejected' } : p))
    );
  }

  function approveBudget(projectId: string) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, budgetStatus: 'approved' } : p))
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

  return { projects, questions, rejectBudget, approveBudget, askQuestion };
}
