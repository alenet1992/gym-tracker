<template>
  <div class="active-workout-view" v-if="activeWorkout">
    <div class="workout-header">
      <div class="workout-info">
        <h1 class="workout-title">{{ activeWorkout.plan.name }}</h1>
        <div class="workout-timer">
          <i class="fas fa-clock"></i>
          <span class="timer-display">{{ formatDuration(workoutDuration) }}</span>
        </div>
      </div>
      
      <div class="workout-actions">
        <button class="btn btn-secondary" @click="showFinishConfirm = true">
          <i class="fas fa-stop"></i>
          Finalizar
        </button>
        <button class="btn btn-danger" @click="showCancelConfirm = true">
          <i class="fas fa-times"></i>
          Cancelar
        </button>
      </div>
    </div>

    <div class="workout-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
      <div class="progress-text">
        {{ completedCount }} of {{ totalExercises }} exercises completed
      </div>
    </div>

    <div class="sections-container">
      <div 
        v-for="(section, sectionIndex) in activeWorkout.plan.sections" 
        :key="sectionIndex"
        class="section-card"
      >
        <div class="section-header">
          <h3 class="section-title">{{ section.name }}</h3>
          <div class="section-progress">
            {{ getSectionCompletedCount(section) }}/{{ section.exercises.length }}
          </div>
        </div>
        
        <div class="exercises-list">
          <div 
            v-for="(exercise, exerciseIndex) in section.exercises" 
            :key="exerciseIndex"
            class="exercise-item"
            :class="{ 
              'completed': isExerciseCompleted(exercise.name),
              'has-media': exercise.media 
            }"
          >
            <div class="exercise-checkbox">
              <input 
                type="checkbox" 
                :id="`exercise-${sectionIndex}-${exerciseIndex}`"
                :checked="isExerciseCompleted(exercise.name)"
                @change="toggleExercise(exercise.name)"
              >
              <label :for="`exercise-${sectionIndex}-${exerciseIndex}`" class="checkbox-label">
                <i class="fas fa-check"></i>
              </label>
            </div>
            
            <div class="exercise-content" @click="showExerciseDetail(exercise)">
              <div class="exercise-name">
                <span v-if="exercise.media" class="media-icon">
                  <i :class="getMediaIcon(exercise.media.type)"></i>
                </span>
                {{ exercise.name }}
              </div>
              <p class="exercise-description">{{ exercise.description }}</p>
            </div>
            
            <button 
              class="exercise-detail-btn"
              @click="showExerciseDetail(exercise)"
            >
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Finish Confirmation Modal -->
    <div v-if="showFinishConfirm" class="modal-overlay" @click="showFinishConfirm = false">
      <div class="modal-content" @click.stop>
        <h3>Finish Workout</h3>
        <p>Are you sure you want to finish the workout? Progress will be saved to history.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showFinishConfirm = false">
            Cancelar
          </button>
          <button class="btn btn-success" @click="finishWorkout">
            <i class="fas fa-check"></i>
            Finalizar
          </button>
        </div>
      </div>
    </div>

    <!-- Cancel Confirmation Modal -->
    <div v-if="showCancelConfirm" class="modal-overlay" @click="showCancelConfirm = false">
      <div class="modal-content" @click.stop>
        <h3>Cancel Workout</h3>
        <p>Are you sure you want to cancel the workout? All progress will be lost.</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showCancelConfirm = false">
            Não, continuar
          </button>
          <button class="btn btn-danger" @click="cancelWorkout">
            <i class="fas fa-times"></i>
            Sim, cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="no-workout">
    <i class="fas fa-dumbbell"></i>
    <h2>No active workout</h2>
      <p>Select a plan to start training.</p>
      <router-link to="/plans" class="btn btn-primary">
        <i class="fas fa-list-ul"></i>
        View Plans
      </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { Exercise, WorkoutSection } from '@/types';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const router = useRouter();
const workoutStore = useWorkoutStore();

const showFinishConfirm = ref(false);
const showCancelConfirm = ref(false);
const timerInterval = ref<number | null>(null);

const activeWorkout = computed(() => workoutStore.activeWorkout);
const workoutDuration = computed(() => workoutStore.workoutDuration);

const totalExercises = computed(() => {
  if (!activeWorkout.value) return 0;
  return activeWorkout.value.plan.sections.reduce(
    (total, section) => total + section.exercises.length, 
    0
  );
});

const completedCount = computed(() => {
  if (!activeWorkout.value) return 0;
  return activeWorkout.value.completedExercises.size;
});

const progressPercentage = computed(() => {
  if (totalExercises.value === 0) return 0;
  return (completedCount.value / totalExercises.value) * 100;
});

const getSectionCompletedCount = (section: WorkoutSection): number => {
  if (!activeWorkout.value) return 0;
  return section.exercises.filter(exercise => 
    activeWorkout.value!.completedExercises.has(exercise.name)
  ).length;
};

const isExerciseCompleted = (exerciseName: string): boolean => {
  return workoutStore.isExerciseCompleted(exerciseName);
};

const getMediaIcon = (type: 'video' | 'image'): string => {
  return type === 'video' ? 'fas fa-play-circle' : 'fas fa-image';
};

const toggleExercise = (exerciseName: string) => {
  workoutStore.completeExercise(exerciseName);
};

const showExerciseDetail = (exercise: Exercise) => {
  workoutStore.showExerciseDetail(exercise);
};

const formatDuration = (seconds: number): string => {
  return workoutStore.formatDuration(seconds);
};

const finishWorkout = () => {
  workoutStore.finishWorkout();
  showFinishConfirm.value = false;
  router.push('/history');
};

const cancelWorkout = () => {
  workoutStore.cancelWorkout();
  showCancelConfirm.value = false;
  router.push('/plans');
};

// Timer setup
onMounted(() => {
  // Check if workout exists and matches the route
  if (!activeWorkout.value || activeWorkout.value.plan.id !== props.id) {
    router.push('/plans');
    return;
  }
  
  // Update timer every second
  timerInterval.value = window.setInterval(() => {
    // Force reactivity update
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});
</script>

<style scoped>
.active-workout-view {
  max-width: 1000px;
  margin: 0 auto;
}

.workout-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  background: #fff;
  color: #111;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
}

.workout-info {
  flex: 1;
}

.workout-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #111;
}

.workout-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: #111;
}
.timer-circle {
  position: relative;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timer-circle svg {
  width: 70px;
  height: 70px;
  transform: rotate(-90deg);
}
.timer-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 10;
}
.timer-progress {
  fill: none;
  stroke: #111;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1);
}
.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111;
}
.animated-bar .progress-fill {
  animation: growBar 1s cubic-bezier(0.4,0,0.2,1);
}
@keyframes growBar {
  from { width: 0; }
  to { width: 100%; }
}


.workout-actions {
  display: flex;
  gap: 1rem;
}

.workout-progress {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 0.75rem;
  background: #eee;
  border-radius: 0.375rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: #111;
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #111;
  font-weight: 500;
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
  border-bottom: 1px solid #111;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.section-progress {
  background: #f8f8f8;
  color: #111;
  padding: 0.25rem 0.75rem;
  border: 1px solid #111;
  border-radius: 0.5rem;
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
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.exercise-item.completed {
  background: #eee;
  border-color: #111;
}

.exercise-item.has-media {
  border-left: 4px solid #111;
}

.exercise-checkbox {
  position: relative;
}

.exercise-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #111;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.checkbox-label i {
  opacity: 0;
  color: #fff;
  font-size: 0.75rem;
  transition: opacity 0.2s;
}

input[type="checkbox"]:checked + .checkbox-label {
  background: #111;
  border-color: #111;
}

input[type="checkbox"]:checked + .checkbox-label i {
  opacity: 1;
}

.exercise-content {
  flex: 1;
  cursor: pointer;
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

.exercise-detail-btn {
  background: #fff;
  border: 2px solid #111;
  color: #111;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exercise-detail-btn:hover {
  background: #111;
  color: #fff;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #111;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
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
  color: #fff;
}

.btn-primary:hover {
  background: #fff;
  color: #111;
}

.btn-secondary {
  background: #fff;
  color: #111;
}

.btn-secondary:hover {
  background: #111;
  color: #fff;
}

.btn-success {
  background: #fff;
  color: #111;
}

.btn-success:hover {
  background: #111;
  color: #fff;
}

.btn-danger {
  background: #fff;
  color: #111;
}

.btn-danger:hover {
  background: #111;
  color: #fff;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: #111;
}

.modal-content p {
  margin: 0 0 2rem 0;
  color: #666;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.no-workout {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.no-workout i {
  font-size: 4rem;
  color: #111;
  margin-bottom: 1rem;
}

.no-workout h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #111;
}

@media (max-width: 768px) {
  .workout-header {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
  
  .workout-actions {
    width: 100%;
    justify-content: center;
  }
  
  .exercise-item {
    padding: 0.75rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>