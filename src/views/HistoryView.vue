<template>
  <div class="history-view">
    <div class="page-header">
      <h1 class="page-title">Workout History</h1>
      <p class="page-subtitle">Acompanhe seu progresso e conquistas</p>
    </div>

    <div v-if="workoutHistory.length === 0" class="empty-state">
      <i class="fas fa-calendar-alt"></i>
      <h3>No workouts completed</h3>
        <p>Start your first workout to see history here.</p>
        <router-link to="/plans" class="btn btn-primary">
          <i class="fas fa-play"></i>
          Start Workout
        </router-link>
    </div>

    <div v-else class="history-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-fire"></i>
          </div>
          <div class="stat-info">
            <h3>{{ workoutHistory.length }}</h3>
            <p>Workouts Completed</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-info">
            <h3>{{ formatDuration(totalWorkoutTime) }}</h3>
            <p>Tempo Total</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-dumbbell"></i>
          </div>
          <div class="stat-info">
            <h3>{{ totalExercisesCompleted }}</h3>
            <p>Exercises Completed</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-calendar-week"></i>
          </div>
          <div class="stat-info">
            <h3>{{ averageWorkoutsPerWeek }}</h3>
            <p>Workouts/Week</p>
          </div>
        </div>
      </div>

      <div class="history-list">
        <div 
          v-for="(session, index) in workoutHistory" 
          :key="index"
          class="history-item"
          @click="toggleSessionDetails(index)"
        >
          <div class="session-header">
            <div class="session-info">
              <h3 class="session-title">{{ session.planName }}</h3>
              <div class="session-meta">
                <span class="session-date">
                  <i class="fas fa-calendar"></i>
                  {{ formatDate(session.date) }}
                </span>
                <span class="session-duration">
                  <i class="fas fa-clock"></i>
                  {{ formatDuration(session.duration) }}
                </span>
                <span class="session-exercises">
                  <i class="fas fa-check-circle"></i>
                  {{ session.completedExercises.length }} exercises
                </span>
              </div>
            </div>
            
            <div class="session-actions">
              <button 
                class="btn btn-secondary btn-sm"
                @click.stop="repeatWorkout(session.planId)"
                :disabled="isWorkoutActive"
              >
                <i class="fas fa-redo"></i>
                Repetir
              </button>
              
              <button class="expand-btn" :class="{ 'expanded': expandedSessions.has(index) }">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
          
          <div v-if="expandedSessions.has(index)" class="session-details">
            <div class="completed-exercises">
              <h4>Exercises Completed:</h4>
              <div class="exercises-grid">
                <div 
                  v-for="exerciseName in session.completedExercises" 
                  :key="exerciseName"
                  class="exercise-tag"
                >
                  <i class="fas fa-check"></i>
                  {{ exerciseName }}
                </div>
              </div>
            </div>
            
            <div class="session-stats">
              <div class="completion-rate">
                <span class="label">Taxa de Conclusão:</span>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: `${getCompletionRate(session)}%` }"
                  ></div>
                </div>
                <span class="percentage">{{ getCompletionRate(session) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { WorkoutSession } from '@/types';

const router = useRouter();
const workoutStore = useWorkoutStore();

const expandedSessions = ref(new Set<number>());

const workoutHistory = computed(() => workoutStore.workoutHistory);
const isWorkoutActive = computed(() => workoutStore.isWorkoutActive);

const totalWorkoutTime = computed(() => {
  return workoutHistory.value.reduce((total, session) => total + session.duration, 0);
});

const totalExercisesCompleted = computed(() => {
  return workoutHistory.value.reduce((total, session) => total + session.completedExercises.length, 0);
});

const averageWorkoutsPerWeek = computed(() => {
  if (workoutHistory.value.length === 0) return 0;
  
  const firstWorkout = new Date(workoutHistory.value[workoutHistory.value.length - 1].date);
  const lastWorkout = new Date(workoutHistory.value[0].date);
  const daysDiff = Math.max(1, Math.ceil((lastWorkout.getTime() - firstWorkout.getTime()) / (1000 * 60 * 60 * 24)));
  const weeks = daysDiff / 7;
  
  return Math.round((workoutHistory.value.length / weeks) * 10) / 10;
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Hoje';
  } else if (diffDays === 1) {
    return 'Ontem';
  } else if (diffDays < 7) {
    return `${diffDays} dias atrás`;
  } else {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
};

const formatDuration = (seconds: number): string => {
  return workoutStore.formatDuration(seconds);
};

const getCompletionRate = (session: WorkoutSession): number => {
  const plan = workoutStore.plans.find(p => p.id === session.planId);
  if (!plan) return 0;
  
  const totalExercises = plan.sections.reduce((total, section) => total + section.exercises.length, 0);
  if (totalExercises === 0) return 100;
  
  return Math.round((session.completedExercises.length / totalExercises) * 100);
};

const toggleSessionDetails = (index: number) => {
  if (expandedSessions.value.has(index)) {
    expandedSessions.value.delete(index);
  } else {
    expandedSessions.value.add(index);
  }
};

const repeatWorkout = (planId: string) => {
  const plan = workoutStore.plans.find(p => p.id === planId);
  if (plan) {
    workoutStore.startWorkout(plan);
    router.push(`/workout/${planId}`);
  }
};
</script>

<style scoped>
.history-view {
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

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state i {
  font-size: 4rem;
  color: #111;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #111;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: #555;
}

.stat-icon {
  font-size: 2.5rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  color: #fff;
}

.stat-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.stat-info p {
  color: #666;
  margin: 0;
  font-size: 0.875rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

.history-item:hover {
  transform: translateY(-2px);
  border-color: #555;
}

.session-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.session-info {
  flex: 1;
}

.session-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.75rem 0;
}

.session-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.session-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

.session-meta i {
  color: #111;
}

.session-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
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

.btn-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.btn-primary {
  background: #111;
  color: #fff;
}

.btn-primary:hover {
  background: #333;
}

.btn-secondary {
  background: #fff;
  color: #111;
}

.btn:hover:not(:disabled) {
  background: #111;
  color: #fff;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.expand-btn {
  background: none;
  border: 2px solid #111;
  color: #111;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem;
  border-radius: 50%;
}

.expand-btn:hover {
  background: #111;
  color: #fff;
}

.expand-btn.expanded {
  transform: rotate(180deg);
}

.session-details {
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 2px solid #111;
  background: #f8f8f8;
}

.completed-exercises {
  margin-bottom: 1.5rem;
}

.completed-exercises h4 {
  color: #111;
  margin: 1rem 0;
  font-size: 1rem;
}

.exercises-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.exercise-tag {
  background: #fff;
  color: #111;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid #111;
}

.exercise-tag i {
  color: #111;
}

.session-stats {
  margin-top: 1rem;
}

.completion-rate {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  color: #111;
  font-weight: 500;
  min-width: 120px;
}

.progress-bar {
  flex: 1;
  height: 0.5rem;
  background: #ddd;
  border-radius: 0.25rem;
  overflow: hidden;
  border: 1px solid #111;
}

.progress-fill {
  height: 100%;
  background: #111;
  transition: width 0.3s ease;
}

.percentage {
  color: #111;
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .session-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .session-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .session-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .completion-rate {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .label {
    min-width: auto;
  }
}
</style>