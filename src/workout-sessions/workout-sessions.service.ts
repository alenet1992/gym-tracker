import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreateWorkoutSessionInput,
  WorkoutSessionDocument,
  WorkoutSessionResponse,
} from '../common/types/workout-session.types';
import {
  extractDayLabel,
  toWorkoutSessionResponse,
} from '../common/types/workout-session.types';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WorkoutSessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<WorkoutSessionResponse[]> {
    const collection = this.databaseService.getWorkoutSessionsCollection();
    const sessions = await collection
      .find({})
      .sort({ completedAt: -1 })
      .toArray();

    return sessions.map(toWorkoutSessionResponse);
  }

  async create(input: CreateWorkoutSessionInput): Promise<WorkoutSessionResponse> {
    this.validateCreateInput(input);

    const startedAt = new Date(input.startedAt);
    if (Number.isNaN(startedAt.getTime())) {
      throw new BadRequestException('startedAt inválido');
    }

    const completedAt = new Date();
    const doc: WorkoutSessionDocument = {
      planId: input.planId.trim(),
      planName: input.planName.trim(),
      day: extractDayLabel(input.planName),
      startedAt,
      completedAt,
      durationSeconds: input.durationSeconds,
      completedExercises: input.completedExercises,
    };

    const collection = this.databaseService.getWorkoutSessionsCollection();
    const result = await collection.insertOne(doc);

    return toWorkoutSessionResponse({
      ...doc,
      _id: result.insertedId,
    });
  }

  private validateCreateInput(input: CreateWorkoutSessionInput): void {
    if (!input.planId?.trim() || !input.planName?.trim()) {
      throw new BadRequestException('planId e planName são obrigatórios');
    }

    if (
      typeof input.durationSeconds !== 'number' ||
      input.durationSeconds < 0
    ) {
      throw new BadRequestException('durationSeconds inválido');
    }

    if (!Array.isArray(input.completedExercises)) {
      throw new BadRequestException('completedExercises deve ser um array');
    }
  }
}
