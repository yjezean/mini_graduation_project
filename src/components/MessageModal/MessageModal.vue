<template>
  <Transition name="modal">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click="onClose"
    >
      <div class="relative max-w-2xl max-h-[90vh] p-6 bg-white rounded-lg shadow-2xl overflow-hidden">
        <!-- Close Button -->
        <button
          class="absolute bg-transparent border-none top-4 right-4 z-10 text-black p-2 transition-colors duration-200 hover:text-gray-600"
          @click="onClose"
          aria-label="Close modal"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>

        <!-- Header -->
        <div class="pr-8 mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            Bro们 的肺腑之言 😭😭😭
          </h2>
        </div>
        
        <!-- Messages Container -->
        <div class="overflow-y-auto max-h-[60vh] pr-2 space-y-4">
          <div 
            v-for="entry in entries" 
            :key="entry.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-blue-50 to-indigo-50"
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
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
