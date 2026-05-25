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
