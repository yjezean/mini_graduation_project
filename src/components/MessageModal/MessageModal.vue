<template>
  <Transition name="modal">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click="onClose"
    >
      <div class="relative max-w-2xl max-h-[90vh] p-6 bg-white rounded-lg shadow-2xl overflow-y-auto">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 z-10 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full transition-colors duration-200"
          @click="onClose"
          aria-label="Close modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Content -->
        <div class="pr-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Information Entries
          </h2>
          
          <div class="space-y-6">
            <div 
              v-for="entry in entries" 
              :key="entry.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <h3 class="text-lg font-semibold text-blue-600 mb-2">
                {{ entry.title }}
              </h3>
              <p class="text-gray-700 leading-relaxed">
                {{ entry.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Entry } from '@/data/entries'

interface Props {
  isOpen: boolean
  entries: Entry[]
  onClose: () => void
}

defineProps<Props>()
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
