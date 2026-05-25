import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { defaultWorkoutPlans } from './default-workout-plans';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.seedIfEmpty();
    } catch (err) {
      console.error('Seed on startup failed (API will still run):', err);
    }
  }

  private async ensureIdIndex(): Promise<void> {
    const collection = this.databaseService.getWorkoutPlansCollection();
    await collection.createIndex({ id: 1 }, { unique: true });
  }

  async seedIfEmpty(): Promise<void> {
    const collection = this.databaseService.getWorkoutPlansCollection();
    const count = await collection.countDocuments();

    if (count > 0) {
      console.log(
        `Coleção workout_plans já tem ${count} documento(s). Seed ignorado.`,
      );
      return;
    }

    await collection.insertMany(defaultWorkoutPlans);
    await this.ensureIdIndex();
    console.log(
      `Seed: inseridos ${defaultWorkoutPlans.length} planos de treino.`,
    );
  }

  async sync(): Promise<void> {
    const collection = this.databaseService.getWorkoutPlansCollection();
    const result = await collection.deleteMany({});
    await collection.insertMany(defaultWorkoutPlans);
    await this.ensureIdIndex();

    console.log(
      `Sync: removidos ${result.deletedCount} plano(s), inseridos ${defaultWorkoutPlans.length}.`,
    );
  }
}
