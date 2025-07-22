<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <i class="fas fa-dumbbell"></i>
            Welcome to GymTracker
          </h1>
          <p class="hero-subtitle">Track workouts. Build strength. Achieve goals.</p>
          <router-link to="/plans" class="btn btn-primary">
            Start Training
          </router-link>
        </div>
      </div>
    </section>
    
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Features</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">Your Progress</h2>
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.id">
            <div class="stat-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-content">
              <h3>{{ stat.value }}</h3>
              <p>{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '@/stores/workoutStore';

const workoutStore = useWorkoutStore();

const workoutHistory = computed(() => workoutStore.workoutHistory);

const totalWorkoutTime = computed(() => {
  return workoutHistory.value.reduce((total, session) => total + session.duration, 0);
});

const totalExercisesCompleted = computed(() => {
  return workoutHistory.value.reduce((total, session) => total + session.completedExercises.length, 0);
});

const currentStreak = computed(() => {
  if (workoutHistory.value.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < workoutHistory.value.length; i++) {
    const workoutDate = new Date(workoutHistory.value[i].date);
    workoutDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
});

const formatDuration = (seconds: number): string => {
  return workoutStore.formatDuration(seconds);
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: #fff;
  color: #111;
}

.hero-section {
  background: #fff;
  border: 2px solid #111;
  padding: 4rem 2rem;
  margin: 2rem;
  border-radius: 1rem;
}

.hero-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #111;
  margin-bottom: 1.5rem;
}

.hero-title i {
  color: #111;
  font-size: 2.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features-section {
  padding: 4rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #111;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;
  transition: all 0.2s;
}

.feature-card:hover {
  transform: translateY(-3px);
  border-color: #555;
}

.feature-icon {
  width: 80px;
  height: 80px;
  background: #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon i {
  font-size: 2rem;
  color: #fff;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.stats-section {
  padding: 4rem 2rem;
  background: #f8f8f8;
  margin: 2rem;
  border-radius: 1rem;
  border: 2px solid #111;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  background: #fff;
  border: 2px solid #111;
  border-radius: 1rem;
  text-align: center;
  padding: 2rem;
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: #555;
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.stat-icon i {
  font-size: 1.5rem;
  color: #fff;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.stat-content p {
  color: #666;
  font-weight: 500;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
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

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1rem;
    margin: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-title i {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>