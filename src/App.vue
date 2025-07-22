<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <i class="fas fa-dumbbell"></i>
            <h1>GymTracker</h1>
          </div>
          <nav class="desktop-nav">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/plans" class="nav-link">Plans</router-link>
            <router-link to="/history" class="nav-link">History</router-link>
          </nav>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <nav class="bottom-nav">
      <router-link to="/" class="nav-item">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/plans" class="nav-item">
        <i class="fas fa-list"></i>
        <span>Plans</span>
      </router-link>
      <router-link to="/active" class="nav-item">
        <i class="fas fa-play"></i>
        <span>Active</span>
      </router-link>
      <router-link to="/history" class="nav-item">
        <i class="fas fa-chart-line"></i>
        <span>History</span>
      </router-link>
    </nav>

    <ExerciseModal />

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWorkoutStore } from '@/stores/workoutStore';
import ExerciseModal from '@/components/ExerciseModal.vue';
import WorkoutWarningModal from '@/components/WorkoutWarningModal.vue';

const route = useRoute();
const workoutStore = useWorkoutStore();

const navItems = computed(() => [
  {
    name: 'Plans',
    path: '/plans',
    label: 'Plans',
    icon: 'fas fa-list-ul'
  },
  {
    name: 'History',
    path: '/history',
    label: 'History',
    icon: 'fas fa-history'
  }
]);

// Prevent page reload during active workout
window.addEventListener('beforeunload', (e) => {
  if (workoutStore.isWorkoutActive) {
    e.preventDefault();
    e.returnValue = 'You have an active workout. Are you sure you want to leave?';
  }
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #111;
}

.app-header {
  background: #fff;
  border-bottom: 2px solid #111;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo i {
  font-size: 1.5rem;
  color: #111;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #111;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.nav-link:hover {
  border-color: #111;
  color: #111;
}

.nav-link.router-link-active {
  background: #111;
  color: #fff;
  border-color: #111;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  padding-bottom: 6rem;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 2px solid #111;
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  color: #666;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  border: 2px solid transparent;
}

.nav-item:hover {
  color: #111;
  border-color: #111;
}

.nav-item.router-link-active {
  color: #fff;
  background: #111;
  border-color: #111;
}

.nav-item i {
  font-size: 1.25rem;
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.3s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .bottom-nav {
    display: flex;
  }
}

@media (min-width: 769px) {
  .bottom-nav {
    display: none;
  }
}
</style>