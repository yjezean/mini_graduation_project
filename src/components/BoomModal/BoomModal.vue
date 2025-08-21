<template>
  <Transition name="boom-modal">
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      @click="onClose"
    >
      <div class="relative max-w-4xl max-h-[90vh] p-4">
        <!-- Close Button -->
        <button
          class="absolute top-4 right-4 bg-transparent border-none z-10 text-black p-2 transition-colors duration-200 hover:text-gray-600"
          @click="onClose"
          aria-label="Close surprise modal"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>

        <!-- Surprise Content -->
        <div 
          class="relative bg-white rounded-lg shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Surprise Header -->
          <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center">
            <h2 class="text-2xl font-bold mb-2">BRO!</h2>
            <p class="text-lg opacity-90">哥依然风流倜傥!</p>
          </div>

          <!-- Image Container with Swipe -->
          <div 
            class="relative overflow-hidden"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
          >
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <!-- Clone of last image at the beginning -->
              <div 
                v-if="allImages.length > 1"
                class="min-w-full flex-shrink-0 relative"
              >
                <img 
                  :src="allImages[allImages.length - 1].src" 
                  :alt="allImages[allImages.length - 1].alt"
                  class="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] object-contain"
                  @load="onImageLoad"
                  @error="onImageError"
                />
              </div>
              
              <!-- Original images -->
              <div 
                v-for="(image, index) in allImages" 
                :key="image.id"
                class="min-w-full flex-shrink-0 relative"
              >
                <img 
                  :src="image.src" 
                  :alt="image.alt"
                  class="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] object-contain"
                  @load="onImageLoad"
                  @error="onImageError"
                />
              </div>
              
              <!-- Clone of first image at the end -->
              <div 
                v-if="allImages.length > 1"
                class="min-w-full flex-shrink-0 relative"
              >
                <img 
                  :src="allImages[0].src" 
                  :alt="allImages[0].alt"
                  class="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] object-contain"
                  @load="onImageLoad"
                  @error="onImageError"
                />
              </div>
            </div>

            <!-- Loading Spinner -->
            <div 
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center bg-white"
            >
              <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { BoomImage } from '@/data/boomImages'
import { boomImages } from '@/data/boomImages'

interface Props {
  isOpen: boolean
  image: BoomImage | null
  onClose: () => void
}

const props = defineProps<Props>()
const isLoading = ref(false)
const currentIndex = ref(1) // Start at index 1 for infinite loop
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragOffset = ref(0)

const allImages = computed(() => boomImages)
const totalImages = computed(() => allImages.value.length)

const getActualIndex = () => {
  if (allImages.value.length <= 1) return 0
  if (currentIndex.value === 0) return allImages.value.length - 1
  if (currentIndex.value === allImages.value.length + 1) return 0
  return currentIndex.value - 1
}

const handleNext = () => {
  if (allImages.value.length <= 1) return
  currentIndex.value++
  // If we're at the cloned first image, instantly jump to real first image
  if (currentIndex.value === allImages.value.length + 1) {
    setTimeout(() => {
      currentIndex.value = 1
    }, 500)
  }
}

const handlePrevious = () => {
  if (allImages.value.length <= 1) return
  currentIndex.value--
  // If we're at the cloned last image, instantly jump to real last image
  if (currentIndex.value === 0) {
    setTimeout(() => {
      currentIndex.value = allImages.value.length
    }, 500)
  }
}

const onImageLoad = () => {
  isLoading.value = false
}

const onImageError = () => {
  isLoading.value = false
}

// Touch handlers for mobile swipe
const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      handleNext()
    } else {
      // Swipe right - previous image
      handlePrevious()
    }
  }
}

// Mouse handlers for desktop drag
const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  dragStartX.value = e.clientX
  dragOffset.value = 0
}

const handleMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    dragOffset.value = e.clientX - dragStartX.value
  }
}

const handleMouseUp = () => {
  if (isDragging.value) {
    const swipeThreshold = 50
    
    if (Math.abs(dragOffset.value) > swipeThreshold) {
      if (dragOffset.value > 0) {
        // Drag right - previous image
        handlePrevious()
      } else {
        // Drag left - next image
        handleNext()
      }
    }
    
    isDragging.value = false
    dragOffset.value = 0
  }
}

watch(() => props.image, (newImage) => {
  if (newImage) {
    isLoading.value = true
    // Find the index of the current image
    const index = allImages.value.findIndex(img => img.id === newImage.id)
    currentIndex.value = index >= 0 ? index + 1 : 1
  }
}, { immediate: true })
</script>

<style scoped>
.boom-modal-enter-active,
.boom-modal-leave-active {
  transition: all 0.3s ease;
}

.boom-modal-enter-from,
.boom-modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.boom-modal-enter-active .relative,
.boom-modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.boom-modal-enter-from .relative,
.boom-modal-leave-to .relative {
  transform: scale(0.95);
}
</style>

