<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">{{ exercise?.name }}</h2>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <div v-if="exercise?.description" class="exercise-description">
          <h3>Descrição</h3>
          <p>{{ exercise.description }}</p>
        </div>
        
        <div v-if="exercise?.tips" class="exercise-tips">
          <h3>Dicas</h3>
          <p>{{ exercise.tips }}</p>
        </div>
        
        <div v-if="exercise?.media" class="exercise-media">
          <h3>Demonstração</h3>
          <div v-if="exercise.media.type === 'video'" class="video-container">
            <iframe
              :src="exercise.media.url"
              frameborder="0"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
          <div v-else-if="exercise.media.type === 'image'" class="image-container">
            <img
              :src="exercise.media.url"
              :alt="exercise.name"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWorkoutStore } from '@/stores/workoutStore';
import type { Exercise } from '@/types';

const workoutStore = useWorkoutStore();

const exercise = computed(() => workoutStore.selectedExercise);
const isVisible = computed(() => workoutStore.isExerciseModalVisible);

const closeModal = () => {
  workoutStore.hideExerciseDetail();
};

// Close modal on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isVisible.value) {
    closeModal();
  }
};

// Add/remove event listener when modal visibility changes
computed(() => {
  if (isVisible.value) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
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
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.close-btn:hover {
  background: #f7fafc;
  color: #1a202c;
}

.modal-body {
  padding: 1.5rem;
}

.exercise-description,
.exercise-tips {
  margin-bottom: 1.5rem;
}

.exercise-description h3,
.exercise-tips h3,
.exercise-media h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.75rem 0;
}

.exercise-description p,
.exercise-tips p {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  border-radius: 0.5rem;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-container {
  border-radius: 0.5rem;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-container img:hover {
  transform: scale(1.02);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-content {
    max-height: 95vh;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.25rem;
  }
}
</style>