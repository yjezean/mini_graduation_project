import { ref, onMounted, onUnmounted } from 'vue'
import type { CarouselImage } from '@/types'

export function useCarousel(
  images: CarouselImage[],
  autoPlay = true,
  interval = 3000
) {
  const currentIndex = ref(1) // Start at index 1 for infinite loop
  const isPlaying = ref(autoPlay)
  let autoPlayTimer: NodeJS.Timeout | null = null

  // These functions will be overridden by the component's infinite loop handlers
  const next = () => {
    // This will be replaced by handleNext in the component
    currentIndex.value = (currentIndex.value + 1) % (images.length + 2)
  }

  const previous = () => {
    // This will be replaced by handlePrevious in the component
    currentIndex.value = currentIndex.value === 0
      ? images.length + 1
      : currentIndex.value - 1
  }

  const goTo = (index: number) => {
    // This will be replaced by handleGoTo in the component
    if (index >= 0 && index < images.length) {
      currentIndex.value = index + 1 // Adjust for infinite loop indexing
    }
  }

  const startAutoPlay = () => {
    if (autoPlay && images.length > 1) {
      stopAutoPlay()
      autoPlayTimer = setInterval(() => {
        // Use the component's handleNext function
        if (typeof window !== 'undefined') {
          // Trigger a custom event that the component can listen to
          window.dispatchEvent(new CustomEvent('carousel-next'))
        }
      }, interval)
      isPlaying.value = true
    }
  }

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
      isPlaying.value = false
    }
  }

  const toggleAutoPlay = () => {
    if (isPlaying.value) {
      stopAutoPlay()
    } else {
      startAutoPlay()
    }
  }

  onMounted(() => {
    if (autoPlay) {
      startAutoPlay()
    }
  })

  onUnmounted(() => {
    stopAutoPlay()
  })

  return {
    currentIndex,
    isPlaying,
    next,
    previous,
    goTo,
    startAutoPlay,
    stopAutoPlay,
    toggleAutoPlay,
  }
}
