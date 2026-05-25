import { Controller, Get, Param } from '@nestjs/common';
import { WorkoutPlansService } from './workout-plans.service';

@Controller('api/workout-plans')
export class WorkoutPlansController {
  constructor(private readonly workoutPlansService: WorkoutPlansService) {}

  @Get()
  findAll() {
    return this.workoutPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutPlansService.findOne(id);
  }
}
