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
          class="absolute top-4 right-4 bg-transparent border-none z-10 text-white p-2 transition-colors duration-200 hover:text-gray-600"
          @click="onClose"
          aria-label="Close image modal"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
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
import { Icon } from '@iconify/vue'
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
