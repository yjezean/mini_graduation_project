import { ref, onMounted, onUnmounted } from 'vue'
import type { CarouselImage } from '@/types'

export function useCarousel(
  images: CarouselImage[],
  autoPlay = true,
  interval = 3000
) {
  const currentIndex = ref(0)
  const isPlaying = ref(autoPlay)
  let autoPlayTimer: NodeJS.Timeout | null = null

  const next = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }

  const previous = () => {
    currentIndex.value = currentIndex.value === 0 
      ? images.length - 1 
      : currentIndex.value - 1
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < images.length) {
      currentIndex.value = index
    }
  }

  const startAutoPlay = () => {
    if (autoPlay && images.length > 1) {
      stopAutoPlay()
      autoPlayTimer = setInterval(() => {
        next()
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
