import type { ObjectId } from 'mongodb';

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';
export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface MealOption {
  id: string;
  name: string;
  description: string;
  items: string[];
  tips?: string;
}

export interface DayMeals {
  breakfast: MealOption;
  lunch: MealOption;
  snack: MealOption;
  dinner: MealOption;
}

export interface MealPlanDay {
  dayOfWeek: DayOfWeek;
  label: string;
  meals: DayMeals;
}

export interface MealPlan {
  id: string;
  name: string;
  description: string;
  targetProteinG: number;
  profile: { heightM: number; weightKg: number };
  guidelines: string[];
  plateRule: string;
  days: MealPlanDay[];
}

export interface MealCompletion {
  mealType: MealType;
  optionId: string;
  completedAt: Date;
}

export interface MealLogDocument {
  _id?: ObjectId;
  date: string;
  dayOfWeek: DayOfWeek;
  completedMeals: MealCompletion[];
  updatedAt: Date;
}

export interface UpdateMealLogInput {
  date: string;
  mealType: MealType;
  optionId: string;
  completed: boolean;
}

export interface MealLogResponse {
  date: string;
  dayOfWeek: DayOfWeek;
  completedMeals: {
    mealType: MealType;
    optionId: string;
    completedAt: string;
  }[];
  updatedAt: string;
}

export function toMealLogResponse(doc: MealLogDocument): MealLogResponse {
  return {
    date: doc.date,
    dayOfWeek: doc.dayOfWeek,
    completedMeals: doc.completedMeals.map((meal) => ({
      mealType: meal.mealType,
      optionId: meal.optionId,
      completedAt: meal.completedAt.toISOString(),
    })),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export const DAY_OF_WEEK_LABELS: Record<DayOfWeek, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
};

export const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Pequeno-almoço',
  lunch: 'Almoço',
  snack: 'Lanche',
  dinner: 'Jantar',
};