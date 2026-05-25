import type { WorkoutPlan } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export async function fetchWorkoutPlans(): Promise<WorkoutPlan[]> {
  const response = await fetch(`${API_BASE}/api/workout-plans`);

  if (!response.ok) {
    throw new Error(`Falha ao carregar planos (${response.status})`);
  }

  return response.json();
}

export async function fetchWorkoutPlanById(id: string): Promise<WorkoutPlan> {
  const response = await fetch(`${API_BASE}/api/workout-plans/${id}`);

  if (!response.ok) {
    throw new Error(`Falha ao carregar plano (${response.status})`);
  }

  return response.json();
}
