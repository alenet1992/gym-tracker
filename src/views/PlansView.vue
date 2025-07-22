<template>
  <div class="plans-view">
    <div class="page-header">
      <h1 class="page-title">Workout Plans</h1>
    <p class="page-subtitle">Choose your plan and start training</p>
    </div>

    <div class="plans-grid">
      <div 
        v-for="plan in plans" 
        :key="plan.id"
        class="plan-card animated-card"
        @click="viewPlanDetails(plan.id)"
      >
        <div class="plan-header">
          <h3 class="plan-name">{{ plan.name }}</h3>
          <div class="plan-badge">
            <i class="fas fa-fire"></i>
          </div>
        </div>
        
        <p class="plan-description">{{ plan.description }}</p>
        
        <div class="plan-stats">
          <div class="stat">
            <i class="fas fa-list"></i>
            <span>{{ plan.sections.length }} seções</span>
          </div>
          <div class="stat">
            <i class="fas fa-dumbbell"></i>
            <span>{{ getTotalExercises(plan) }} exercises</span>
          </div>
        </div>
        
        <div class="plan-actions">
          <button 
            class="btn btn-primary"
            @click.stop="startWorkout(plan.id)"
            :disabled="isWorkoutActive"
          >
            <i class="fas fa-play"></i>
            Start Workout
          </button>
          <button 
            class="btn btn-secondary"
            @click.stop="viewPlanDetails(plan.id)"
          >
            <i class="fas fa-eye"></i>
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>

    <!-- Active Workout Banner -->
    <div v-if="isWorkoutActive" class="active-workout-banner">
      <div class="banner-content">
        <div class="banner-info">
          <i class="fas fa-play-circle"></i>
          <div>
            <h4>Active Workout</h4>
            <p>{{ currentPlan?.name }} - {{ formatDuration(workoutDuration) }}</p>
          </div>
        </div>
        <div class="banner-actions">
          <router-link 
            :to="`/workout/${currentPlan?.id}`" 
            class="btn btn-success"
          >
            <i class="fas fa-arrow-right"></i>
            Continuar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { WorkoutPlan } from '@/types';

const router = useRouter();
const workoutStore = useWorkoutStore();

const plans = computed(() => workoutStore.plans);
const isWorkoutActive = computed(() => workoutStore.isWorkoutActive);
const currentPlan = computed(() => workoutStore.currentPlan);
const workoutDuration = computed(() => workoutStore.workoutDuration);

const getTotalExercises = (plan: WorkoutPlan): number => {
  return plan.sections.reduce((total, section) => total + section.exercises.length, 0);
};

const viewPlanDetails = (planId: string) => {
  router.push(`/plan/${planId}`);
};

const startWorkout = (planId: string) => {
  const plan = plans.value.find(p => p.id === planId);
  if (plan) {
    workoutStore.startWorkout(plan);
    router.push(`/workout/${planId}`);
  }
};

const formatDuration = (seconds: number): string => {
  return workoutStore.formatDuration(seconds);
};
</script>

<style scoped>
.plans-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  color: #111;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #666;
  margin: 0;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.plan-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.plan-card:hover {
  transform: translateY(-3px);
  border-color: #555;
}

.plan-card.selected {
  background: #111;
  color: #fff;
}

.animated-card {
  animation: fadeInScale 0.5s ease;
}
@keyframes fadeInScale {
  0% { opacity: 0; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin: 0;
  line-height: 1.4;
}

.plan-card.selected .plan-name {
  color: #fff;
}

.plan-badge {
  background: #111;
  color: white;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.plan-card.selected .plan-badge {
  background: #fff;
  color: #111;
}

.plan-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.plan-card.selected .plan-description {
  color: #ccc;
}

.plan-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.plan-card.selected .stat {
  color: #ccc;
}

.stat i {
  color: #111;
}

.plan-card.selected .stat i {
  color: #fff;
}

.plan-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #111;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  background: #fff;
  color: #111;
}

.btn:hover {
  background: #111;
  color: #fff;
}

.btn-primary {
  background: #111;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #fff;
  color: #111;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #fff;
  color: #111;
  border: 2px solid #111;
}

.btn-secondary:hover {
  background: #111;
  color: #fff;
}

.active-workout-banner {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #111;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 2px solid #111;
  z-index: 1000;
  max-width: 90vw;
  width: 500px;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.banner-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.banner-info i {
  font-size: 1.5rem;
}

.banner-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.banner-info p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.btn-success {
  background: #fff;
  color: #111;
  border: 2px solid #fff;
}

.btn-success:hover {
  background: #111;
  color: #fff;
  border-color: #111;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .plans-view {
    padding: 1rem;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .plan-card {
    padding: 1.5rem;
  }
  
  .plan-actions {
    flex-direction: column;
  }
  
  .active-workout-banner {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    width: auto;
    max-width: none;
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>