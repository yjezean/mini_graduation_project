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
      <!-- Clone of last image at the beginning -->
      <div 
        v-if="images.length > 1"
        class="min-w-full flex-shrink-0 relative"
      >
        <img 
          :src="images[images.length - 1].src" 
          :alt="images[images.length - 1].alt"
          :data-index="images.length - 1"
          class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          @load="onImageLoad"
          @error="onImageError"
        />
      </div>
      
      <!-- Original images -->
      <div 
        v-for="(image, index) in images" 
        :key="image.id"
        class="min-w-full flex-shrink-0 relative"
      >
        <img 
          :src="image.src" 
          :alt="image.alt"
          :data-index="index"
          class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          @load="onImageLoad"
          @error="onImageError"
        />
      </div>
      
      <!-- Clone of first image at the end -->
      <div 
        v-if="images.length > 1"
        class="min-w-full flex-shrink-0 relative"
      >
        <img 
          :src="images[0].src" 
          :alt="images[0].alt"
          :data-index="0"
          class="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
          @load="onImageLoad"
          @error="onImageError"
        />
      </div>
    </div>

    <!-- Navigation Buttons - Hidden on mobile -->
    <button 
      v-if="showNavigation && images.length > 1"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 hidden md:block z-10"
      @click="handlePrevious"
      aria-label="Previous image"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      v-if="showNavigation && images.length > 1"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 hidden md:block z-10"
      @click="handleNext"
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
        :class="getActualIndex() === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
        @click="handleGoTo(index)"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
  autoPlay: false, // Disabled auto-play by default
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
  startAutoPlay,
  stopAutoPlay,
  toggleAutoPlay,
} = useCarousel(props.images, props.autoPlay, props.interval)

// Touch/swipe functionality
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)
const touchStartTime = ref(0)
const touchStartY = ref(0)
const touchEndY = ref(0)
const hasMoved = ref(false)
const tapTimeout = ref<number | null>(null)

// Infinite loop handling
const isTransitioning = ref(false)

const getActualIndex = () => {
  if (props.images.length <= 1) return 0
  if (currentIndex.value === 0) return props.images.length - 1
  if (currentIndex.value === props.images.length + 1) return 0
  return currentIndex.value - 1
}

const handleNext = () => {
  if (props.images.length <= 1) return
  currentIndex.value++
  // If we're at the cloned first image, instantly jump to real first image
  if (currentIndex.value === props.images.length + 1) {
    setTimeout(() => {
      currentIndex.value = 1
    }, 500)
  }
}

const handlePrevious = () => {
  if (props.images.length <= 1) return
  currentIndex.value--
  // If we're at the cloned last image, instantly jump to real last image
  if (currentIndex.value === 0) {
    setTimeout(() => {
      currentIndex.value = props.images.length
    }, 500)
  }
}

const handleGoTo = (index: number) => {
  if (props.images.length <= 1) return
  currentIndex.value = index + 1
}

const handleTouchStart = (e: TouchEvent) => {
  e.preventDefault() // Prevent default touch behavior
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  touchStartTime.value = Date.now()
  hasMoved.value = false
  isDragging.value = true
  
  // Clear any existing tap timeout
  if (tapTimeout.value) {
    clearTimeout(tapTimeout.value)
    tapTimeout.value = null
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  
  e.preventDefault() // Prevent default touch behavior
  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const diffX = Math.abs(currentX - touchStartX.value)
  const diffY = Math.abs(currentY - touchStartY.value)
  
  // If moved more than 5px in any direction, mark as moved
  if (diffX > 5 || diffY > 5) {
    hasMoved.value = true
    // Clear tap timeout if we've moved
    if (tapTimeout.value) {
      clearTimeout(tapTimeout.value)
      tapTimeout.value = null
    }
  }
  
  touchEndX.value = currentX
  touchEndY.value = currentY
}

const handleTouchEnd = (e: TouchEvent) => {
  if (!isDragging.value) return
  
  e.preventDefault() // Prevent default touch behavior
  const touchEndTime = Date.now()
  const touchDuration = touchEndTime - touchStartTime.value
  const swipeThreshold = 50
  
  const diffX = touchStartX.value - touchEndX.value
  const diffY = touchStartY.value - touchEndY.value
  
  // If it's a quick tap with minimal movement, treat as tap
  if (touchDuration < 200 && !hasMoved.value) {
    // Simple approach: just open modal for the currently visible image
    const currentVisibleImage = getCurrentVisibleImage()
    if (currentVisibleImage) {
      console.log('Opening modal for current visible image:', currentVisibleImage)
      openModal(currentVisibleImage)
    }
    
    isDragging.value = false
    return
  }
  
  // Handle swipe only if it's a horizontal swipe with sufficient distance
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
    if (diffX > 0) {
      // Swipe left - next image
      handleNext()
    } else {
      // Swipe right - previous image
      handlePrevious()
    }
  }
  
  isDragging.value = false
  hasMoved.value = false
}

// Helper function to get the currently visible image
const getCurrentVisibleImage = () => {
  if (props.images.length === 0) return null
  
  if (props.images.length === 1) {
    return props.images[0]
  }
  
  // Calculate which image is currently visible
  let actualIndex: number
  
  if (currentIndex.value === 0) {
    // At cloned last image, so showing last real image
    actualIndex = props.images.length - 1
  } else if (currentIndex.value === props.images.length + 1) {
    // At cloned first image, so showing first real image
    actualIndex = 0
  } else {
    // At a real image
    actualIndex = currentIndex.value - 1
  }
  
  return props.images[actualIndex]
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

// Initialize the carousel to start at the first real image (index 1)
if (props.images.length > 1) {
  currentIndex.value = 1
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
