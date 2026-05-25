<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="warning-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h2 class="modal-title">{{ title }}</h2>
      </div>
      
      <div class="modal-body">
        <p class="warning-message">{{ message }}</p>
        <p v-if="subMessage" class="warning-submessage">{{ subMessage }}</p>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">
          {{ cancelText }}
        </button>
        <button class="btn btn-danger" @click="confirmAction">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isVisible: boolean;
  title?: string;
  message?: string;
  subMessage?: string;
  confirmText?: string;
  cancelText?: string;
}

interface Emits {
  close: [];
  confirm: [];
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmar Ação',
  message: 'Tem certeza que deseja continuar?',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar'
});

const emit = defineEmits<Emits>();

const closeModal = () => {
  emit('close');
};

const confirmAction = () => {
  emit('confirm');
};

// Close modal on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal();
  }
};

// Add/remove event listener when modal visibility changes
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  }
});
</script>

<script lang="ts">
import { watch } from 'vue';
export default {
  name: 'WorkoutWarningModal'
};
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
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  text-align: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
}

.warning-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: #fed7d7;
  color: #e53e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem auto;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.modal-body {
  padding: 0 1.5rem 1rem 1.5rem;
  text-align: center;
}

.warning-message {
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.warning-submessage {
  color: #718096;
  line-height: 1.5;
  margin: 0;
  font-size: 0.875rem;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 120px;
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

.btn-danger {
  background: linear-gradient(135deg, #e53e3e, #c53030);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #c53030, #9c2626);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }
  
  .modal-header {
    padding: 1.5rem 1rem 0.75rem 1rem;
  }
  
  .modal-body {
    padding: 0 1rem 0.75rem 1rem;
  }
  
  .modal-footer {
    padding: 0.75rem 1rem 1rem 1rem;
    flex-direction: column;
  }
  
  .btn {
    max-width: none;
  }
  
  .warning-icon {
    width: 3rem;
    height: 3rem;
    font-size: 1.25rem;
  }
  
  .modal-title {
    font-size: 1.125rem;
  }
}
</style>