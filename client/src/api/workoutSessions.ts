import type { WorkoutSession } from '@/types';

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

export interface CreateWorkoutSessionPayload {
  planId: string;
  planName: string;
  startedAt: string;
  durationSeconds: number;
  completedExercises: string[];
}

export async function fetchWorkoutSessions(): Promise<WorkoutSession[]> {
  const response = await fetch(`${API_BASE}/api/workout-sessions`);

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao carregar histórico'),
    );
  }

  return response.json();
}

export async function createWorkoutSession(
  payload: CreateWorkoutSessionPayload,
): Promise<WorkoutSession> {
  const response = await fetch(`${API_BASE}/api/workout-sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao guardar treino'),
    );
  }

  return response.json();
}
