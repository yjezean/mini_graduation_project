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
          class="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
          @click="onClose"
          aria-label="Close surprise modal"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Surprise Content -->
        <div 
          class="relative bg-white rounded-lg shadow-2xl overflow-hidden"
          @click.stop
        >
          <!-- Surprise Header -->
          <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 text-center">
            <h2 class="text-2xl font-bold mb-2">🎉 SURPRISE! 🎉</h2>
            <p class="text-lg opacity-90">You found a hidden treasure! Swipe to explore more!</p>
            <div class="text-sm opacity-75 mt-2">
              {{ currentIndex + 1 }} of {{ totalImages }}
            </div>
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
              class="flex transition-transform duration-300 ease-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div 
                v-for="(image, index) in allImages" 
                :key="image.id"
                class="min-w-full flex-shrink-0 relative"
              >
                <img 
                  :src="image.src" 
                  :alt="image.alt"
                  class="w-full max-h-[70vh] object-contain"
                  @load="onImageLoad"
                  @error="onImageError"
                />
                
                <!-- Image Title -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 class="text-xl font-bold text-white">
                    {{ image.title }}
                  </h3>
                </div>
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

          <!-- Navigation Buttons -->
          <div class="absolute inset-y-0 left-0 right-0 flex items-center justify-between p-4 pointer-events-none">
            <button
              @click="previousImage"
              class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 shadow-lg pointer-events-auto"
              aria-label="Previous image"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              @click="nextImage"
              class="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 shadow-lg pointer-events-auto"
              aria-label="Next image"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            <button
              v-for="(_, index) in allImages"
              :key="index"
              class="w-3 h-3 rounded-full transition-colors duration-200"
              :class="index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
              @click="goToImage(index)"
              :aria-label="`Go to image ${index + 1}`"
            />
          </div>
        </div>

        <!-- Sparkle Effects -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="sparkle sparkle-1">✨</div>
          <div class="sparkle sparkle-2">⭐</div>
          <div class="sparkle sparkle-3">💫</div>
          <div class="sparkle sparkle-4">🌟</div>
          <div class="sparkle sparkle-5">🎊</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { BoomImage } from '@/data/boomImages'
import { boomImages } from '@/data/boomImages'

interface Props {
  isOpen: boolean
  image: BoomImage | null
  onClose: () => void
}

const props = defineProps<Props>()
const isLoading = ref(false)
const currentIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragOffset = ref(0)

const allImages = computed(() => boomImages)
const totalImages = computed(() => allImages.value.length)

const onImageLoad = () => {
  isLoading.value = false
}

const onImageError = () => {
  isLoading.value = false
}

const nextImage = () => {
  if (currentIndex.value < totalImages.value - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0 // Circular navigation
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = totalImages.value - 1 // Circular navigation
  }
}

const goToImage = (index: number) => {
  currentIndex.value = index
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
      nextImage()
    } else {
      // Swipe right - previous image
      previousImage()
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
        previousImage()
      } else {
        // Drag left - next image
        nextImage()
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
    currentIndex.value = index >= 0 ? index : 0
  }
}, { immediate: true })
</script>

<style scoped>
.boom-modal-enter-active,
.boom-modal-leave-active {
  transition: all 0.5s ease;
}

.boom-modal-enter-from,
.boom-modal-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-5deg);
}

.boom-modal-enter-active .relative,
.boom-modal-leave-active .relative {
  transition: transform 0.5s ease;
}

.boom-modal-enter-from .relative,
.boom-modal-leave-to .relative {
  transform: scale(0.9) rotate(5deg);
}

/* Sparkle Animation */
.sparkle {
  position: absolute;
  font-size: 2rem;
  animation: sparkle 2s ease-in-out infinite;
  opacity: 0;
}

.sparkle-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.sparkle-2 {
  top: 30%;
  right: 15%;
  animation-delay: 0.4s;
}

.sparkle-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 0.8s;
}

.sparkle-4 {
  bottom: 20%;
  right: 10%;
  animation-delay: 1.2s;
}

.sparkle-5 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1.6s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1) rotate(180deg);
  }
}
</style>
