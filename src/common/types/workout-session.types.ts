import type { ObjectId } from 'mongodb';

export interface WorkoutSessionDocument {
  _id?: ObjectId;
  planId: string;
  planName: string;
  day: string;
  startedAt: Date;
  completedAt: Date;
  durationSeconds: number;
  completedExercises: string[];
}

export interface CreateWorkoutSessionInput {
  planId: string;
  planName: string;
  startedAt: string;
  durationSeconds: number;
  completedExercises: string[];
}

export interface WorkoutSessionResponse {
  id: string;
  planId: string;
  planName: string;
  day: string;
  date: string;
  startedAt: string;
  duration: number;
  completedExercises: string[];
}

export function extractDayLabel(planName: string): string {
  const match = planName.match(/^Dia\s*\d+/i);
  return match ? match[0] : planName;
}

export function toWorkoutSessionResponse(
  doc: WorkoutSessionDocument,
): WorkoutSessionResponse {
  return {
    id: doc._id!.toHexString(),
    planId: doc.planId,
    planName: doc.planName,
    day: doc.day,
    date: doc.completedAt.toISOString(),
    startedAt: doc.startedAt.toISOString(),
    duration: doc.durationSeconds,
    completedExercises: doc.completedExercises,
  };
}
