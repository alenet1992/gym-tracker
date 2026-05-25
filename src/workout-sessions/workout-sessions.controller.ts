import { Body, Controller, Get, Post } from '@nestjs/common';
import type { CreateWorkoutSessionInput } from '../common/types/workout-session.types';
import { WorkoutSessionsService } from './workout-sessions.service';

@Controller('api/workout-sessions')
export class WorkoutSessionsController {
  constructor(private readonly workoutSessionsService: WorkoutSessionsService) {}

  @Get()
  findAll() {
    return this.workoutSessionsService.findAll();
  }

  @Post()
  create(@Body() body: CreateWorkoutSessionInput) {
    return this.workoutSessionsService.create(body);
  }
}
