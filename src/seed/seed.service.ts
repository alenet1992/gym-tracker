import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { defaultMealPlan } from './default-meal-plan';
import { defaultWorkoutPlans } from './default-workout-plans';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.seedIfEmpty();
      await this.seedMealPlanIfEmpty();
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

    await this.syncMealPlan();
  }

  private async ensureMealPlanIdIndex(): Promise<void> {
    const collection = this.databaseService.getMealPlansCollection();
    await collection.createIndex({ id: 1 }, { unique: true });
  }

  private async ensureMealLogDateIndex(): Promise<void> {
    const collection = this.databaseService.getMealLogsCollection();
    await collection.createIndex({ date: 1 }, { unique: true });
  }

  async seedMealPlanIfEmpty(): Promise<void> {
    const collection = this.databaseService.getMealPlansCollection();
    const count = await collection.countDocuments();

    if (count > 0) {
      console.log(
        `Coleção meal_plans já tem ${count} documento(s). Seed ignorado.`,
      );
      return;
    }

    await collection.insertOne(defaultMealPlan);
    await this.ensureMealPlanIdIndex();
    await this.ensureMealLogDateIndex();
    console.log('Seed: inserido plano alimentar de definição.');
  }

  async syncMealPlan(): Promise<void> {
    const collection = this.databaseService.getMealPlansCollection();
    await collection.deleteMany({});
    await collection.insertOne(defaultMealPlan);
    await this.ensureMealPlanIdIndex();
    await this.ensureMealLogDateIndex();
    console.log('Sync: plano alimentar atualizado.');
  }
}
