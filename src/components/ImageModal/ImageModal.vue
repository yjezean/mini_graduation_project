<template>
  <Transition name="modal">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click="onClose"
    >
      <div class="relative max-w-7xl max-h-full p-4">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
          @click="onClose"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Image Container -->
        <div 
          class="relative"
          @click.stop
        >
          <img 
            v-if="image"
            :src="image.src" 
            :alt="image.alt"
            class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            @load="onImageLoad"
            @error="onImageError"
          />
          
          <!-- Image Info -->
          <div 
            v-if="image && (image.title || image.description)"
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg"
          >
            <h2 v-if="image.title" class="text-2xl font-bold mb-2">
              {{ image.title }}
            </h2>
            <p v-if="image.description" class="text-lg opacity-90">
              {{ image.description }}
            </p>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div 
          v-if="isLoading"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ModalProps } from '@/types'

interface Props {
  isOpen: boolean
  image: ModalProps['image']
  onClose: () => void
}

const props = defineProps<Props>()

const isLoading = ref(false)

const onImageLoad = () => {
  isLoading.value = false
}

const onImageError = () => {
  isLoading.value = false
}

watch(() => props.image, (newImage) => {
  if (newImage) {
    isLoading.value = true
  }
}, { immediate: true })
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
