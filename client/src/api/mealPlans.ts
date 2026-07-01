import type { MealLog, MealPlan, MealType } from '@/types';

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

export interface UpdateMealLogPayload {
  date: string;
  mealType: MealType;
  optionId: string;
  completed: boolean;
}

export async function fetchMealPlan(): Promise<MealPlan> {
  const response = await fetch(`${API_BASE}/api/meal-plans`);

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao carregar plano alimentar'),
    );
  }

  return response.json();
}

export async function fetchMealLogs(): Promise<MealLog[]> {
  const response = await fetch(`${API_BASE}/api/meal-plans/logs`);

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao carregar registo alimentar'),
    );
  }

  return response.json();
}

export async function updateMealLog(
  payload: UpdateMealLogPayload,
): Promise<MealLog> {
  const response = await fetch(`${API_BASE}/api/meal-plans/logs`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      await readApiError(response, 'Falha ao guardar refeição'),
    );
  }

  return response.json();
}