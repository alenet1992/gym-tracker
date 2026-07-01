export interface ExerciseMedia {
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface Exercise {
  name: string;
  description: string;
  tips?: string;
  media?: ExerciseMedia;
}

export interface WorkoutSection {
  name: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  sections: WorkoutSection[];
}

export interface WorkoutSession {
  id: string;
  planId: string;
  planName: string;
  day: string;
  date: string;
  startedAt: string;
  duration: number;
  completedExercises: string[];
}

export interface ActiveWorkout {
  plan: WorkoutPlan;
  startTime: number;
  completedExercises: Set<string>;
}

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
  completedAt: string;
}

export interface MealLog {
  date: string;
  dayOfWeek: DayOfWeek;
  completedMeals: MealCompletion[];
  updatedAt: string;
}