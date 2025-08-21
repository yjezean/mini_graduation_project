<template>
  <div 
    class="relative overflow-hidden rounded-lg shadow-lg"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Carousel Container -->
    <div 
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(image, index) in images" 
        :key="image.id"
        class="min-w-full flex-shrink-0 relative"
      >
        <img 
          :src="image.src" 
          :alt="image.alt"
          class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="openModal(image)"
          @load="onImageLoad"
          @error="onImageError"
        />
        <div 
          v-if="image.title || image.description"
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white"
        >
          <h3 v-if="image.title" class="text-lg font-semibold mb-1">
            {{ image.title }}
          </h3>
          <p v-if="image.description" class="text-sm opacity-90">
            {{ image.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons - Hidden on mobile -->
    <button 
      v-if="showNavigation && images.length > 1"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 hidden md:block z-10"
      @click="previous"
      aria-label="Previous image"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      v-if="showNavigation && images.length > 1"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 hidden md:block z-10"
      @click="next"
      aria-label="Next image"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators - Hidden on mobile -->
    <div 
      v-if="showIndicators && images.length > 1"
      class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 hidden md:flex z-10"
    >
      <button
        v-for="(_, index) in images"
        :key="index"
        class="w-3 h-3 rounded-full transition-colors duration-200"
        :class="index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
        @click="goTo(index)"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>

    <!-- Auto-play Toggle -->
    <button
      v-if="images.length > 1"
      class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 z-10"
      @click="toggleAutoPlay"
      :aria-label="isPlaying ? 'Pause slideshow' : 'Play slideshow'"
    >
      <svg v-if="isPlaying" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
      </svg>
      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCarousel } from '@/composables/useCarousel'
import type { CarouselImage } from '@/types'

interface Props {
  images: CarouselImage[]
  autoPlay?: boolean
  interval?: number
  showNavigation?: boolean
  showIndicators?: boolean
}

interface Emits {
  (e: 'image-click', image: CarouselImage): void
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: true,
  interval: 3000,
  showNavigation: true,
  showIndicators: true,
})

const emit = defineEmits<Emits>()

const {
  currentIndex,
  isPlaying,
  next,
  previous,
  goTo,
  toggleAutoPlay,
} = useCarousel(props.images, props.autoPlay, props.interval)

// Touch/swipe functionality
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  
  e.preventDefault() // Prevent default touch behavior
  touchEndX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next image
      next()
    } else {
      // Swipe right - previous image
      previous()
    }
  }
  
  isDragging.value = false
}

const openModal = (image: CarouselImage) => {
  emit('image-click', image)
}

const onImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.classList.add('loaded')
}

const onImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-image.jpg'
}
</script>

<style scoped>
.loaded {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
