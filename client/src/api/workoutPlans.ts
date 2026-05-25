import type { WorkoutPlan } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function readApiError(response: Response, fallback: string): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) return body.message;
  } catch {
    /* not JSON */
  }
  return `${fallback} (${response.status})`;
}

export async function fetchWorkoutPlans(): Promise<WorkoutPlan[]> {
  const response = await fetch(`${API_BASE}/api/workout-plans`);

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao carregar planos'),
    );
  }

  return response.json();
}

export async function fetchWorkoutPlanById(id: string): Promise<WorkoutPlan> {
  const response = await fetch(`${API_BASE}/api/workout-plans/${id}`);

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao carregar plano'),
    );
  }

  return response.json();
}
