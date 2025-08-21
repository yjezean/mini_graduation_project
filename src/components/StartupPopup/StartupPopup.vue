<template>
  <Transition name="startup-popup">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      @click="onClose"
    >
      <div 
        class="relative max-w-md mx-4 rounded-2xl shadow-2xl overflow-hidden transform"
        @click.stop
      >
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 z-10 bg-transparent border-none text-black p-2 transition-colors duration-200 hover:text-gray-600"
          @click="onClose"
          aria-label="Close popup"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>

          <img 
            src="/src/assets/animation/animation.jpg" 
            alt="Graduation Celebration"
            class="w-full h-auto object-cover"
          />
      </div>

      <!-- Floating celebration elements -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="celebration-item celebration-1">🎊</div>
        <div class="celebration-item celebration-2">🎉</div>
        <div class="celebration-item celebration-3">⭐</div>
        <div class="celebration-item celebration-4">🌟</div>
        <div class="celebration-item celebration-5">✨</div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  isOpen: boolean
  onClose: () => void
}

defineProps<Props>()
</script>

<style scoped>
/* Main popup animation */
.startup-popup-enter-active {
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.startup-popup-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.startup-popup-enter-from {
  opacity: 0;
  transform: scale(0.3) rotate(-10deg);
}

.startup-popup-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(5deg);
}

.startup-popup-enter-active .relative {
  animation: popup-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s both;
}

@keyframes popup-bounce {
  0% {
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}

/* Celebration items animation */
.celebration-item {
  position: absolute;
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
  opacity: 0;
}

.celebration-1 {
  top: 20%;
  left: 15%;
  animation-delay: 0.5s;
}

.celebration-2 {
  top: 30%;
  right: 20%;
  animation-delay: 1s;
}

.celebration-3 {
  bottom: 30%;
  left: 25%;
  animation-delay: 1.5s;
}

.celebration-4 {
  bottom: 25%;
  right: 15%;
  animation-delay: 2s;
}

.celebration-5 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 2.5s;
}

@keyframes float {
  0%, 100% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  20%, 80% {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
}

/* Background animation */
.startup-popup-enter-active {
  animation: background-fade 0.6s ease-out;
}

@keyframes background-fade {
  0% {
    backdrop-filter: blur(0px);
  }
  100% {
    backdrop-filter: blur(8px);
  }
}
</style>
