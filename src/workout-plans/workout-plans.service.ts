import { Injectable, NotFoundException } from '@nestjs/common';
import type { WorkoutPlan } from '../common/types/workout-plan.types';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WorkoutPlansService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<WorkoutPlan[]> {
    const collection = this.databaseService.getWorkoutPlansCollection();
    return collection.find({}).sort({ id: 1 }).toArray();
  }

  async findOne(id: string): Promise<WorkoutPlan> {
    const collection = this.databaseService.getWorkoutPlansCollection();
    const plan = await collection.findOne({ id });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }

    return plan;
  }
}
