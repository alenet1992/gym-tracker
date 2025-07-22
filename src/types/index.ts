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
  planId: string;
  planName: string;
  date: string;
  duration: number;
  completedExercises: string[];
}

export interface ActiveWorkout {
  plan: WorkoutPlan;
  startTime: number;
  completedExercises: Set<string>;
}