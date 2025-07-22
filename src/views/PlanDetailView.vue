<template>
  <div class="plan-detail-view" v-if="plan">
    <div class="plan-header">
      <button class="back-btn" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        Voltar
      </button>
      
      <div class="plan-info">
        <h1 class="plan-title">{{ plan.name }}</h1>
        <p class="plan-description">{{ plan.description }}</p>
        
        <div class="plan-meta">
          <div class="meta-item">
            <i class="fas fa-list"></i>
            <span>{{ plan.sections.length }} seções</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-dumbbell"></i>
            <span>{{ getTotalExercises() }} exercises</span>
          </div>
        </div>
      </div>
      
      <button 
        class="start-workout-btn"
        @click="startWorkout"
        :disabled="isWorkoutActive"
      >
        <i class="fas fa-play"></i>
        Start Workout
      </button>
    </div>

    <div class="sections-container">
      <div 
        v-for="(section, sectionIndex) in plan.sections" 
        :key="sectionIndex"
        class="section-card"
      >
        <div class="section-header">
          <h3 class="section-title">{{ section.name }}</h3>
          <div class="section-badge">
            {{ section.exercises.length }}
          </div>
        </div>
        
        <div class="exercises-list">
          <div 
            v-for="(exercise, exerciseIndex) in section.exercises" 
            :key="exerciseIndex"
            class="exercise-item"
            @click="showExerciseDetail(exercise)"
          >
            <div class="exercise-info">
              <div class="exercise-name">
                <span v-if="exercise.media" class="media-icon">
                  <i :class="getMediaIcon(exercise.media.type)"></i>
                </span>
                {{ exercise.name }}
              </div>
              <p class="exercise-description">{{ exercise.description }}</p>
            </div>
            <div class="exercise-action">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="not-found">
    <i class="fas fa-exclamation-triangle"></i>
    <h2>Plan not found</h2>
      <p>The requested plan does not exist or has been removed.</p>
      <router-link to="/plans" class="btn btn-primary">
        <i class="fas fa-arrow-left"></i>
        Back to Plans
      </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { Exercise } from '@/types';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const router = useRouter();
const workoutStore = useWorkoutStore();

const plan = computed(() => {
  return workoutStore.plans.find(p => p.id === props.id);
});

const isWorkoutActive = computed(() => workoutStore.isWorkoutActive);

const getTotalExercises = (): number => {
  if (!plan.value) return 0;
  return plan.value.sections.reduce((total, section) => total + section.exercises.length, 0);
};

const getMediaIcon = (type: 'video' | 'image'): string => {
  return type === 'video' ? 'fas fa-play-circle' : 'fas fa-image';
};

const goBack = () => {
  router.push('/plans');
};

const startWorkout = () => {
  if (plan.value) {
    workoutStore.startWorkout(plan.value);
    router.push(`/workout/${plan.value.id}`);
  }
};

const showExerciseDetail = (exercise: Exercise) => {
  workoutStore.showExerciseDetail(exercise);
};
</script>

<style scoped>
.plan-detail-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  color: #111;
}

.plan-header {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.back-btn {
  background: #fff;
  border: 2px solid #111;
  color: #111;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background: #111;
  color: #fff;
}

.plan-info {
  margin-bottom: 2rem;
}

.plan-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.plan-description {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.plan-meta {
  display: flex;
  gap: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.meta-item i {
  color: #111;
}

.start-workout-btn {
  background: #111;
  color: #fff;
  border: 2px solid #111;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: center;
}

.start-workout-btn:hover:not(:disabled) {
  background: #fff;
  color: #111;
}

.start-workout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sections-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #111;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.section-badge {
  background: #111;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.exercise-item:hover {
  background: #eee;
  border-color: #111;
  transform: translateX(4px);
}

.exercise-info {
  flex: 1;
}

.exercise-name {
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.media-icon {
  color: #111;
}

.exercise-description {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.exercise-action {
  color: #666;
  transition: color 0.2s;
}

.exercise-item:hover .exercise-action {
  color: #111;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.not-found i {
  font-size: 4rem;
  color: #111;
  margin-bottom: 1rem;
}

.not-found h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #111;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #111;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
  color: #111;
}

.btn:hover {
  background: #111;
  color: #fff;
}

.btn-primary {
  background: #111;
  color: #fff;
}

.btn-primary:hover {
  background: #fff;
  color: #111;
}

@media (max-width: 768px) {
  .plan-detail-view {
    padding: 1rem;
  }
  
  .plan-header {
    padding: 1.5rem;
  }
  
  .plan-title {
    font-size: 1.5rem;
  }
  
  .plan-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .section-card {
    padding: 1rem;
  }
  
  .exercise-item {
    padding: 0.75rem;
  }
}
</style>