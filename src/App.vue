<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header Section with Carousel -->
    <header class="bg-transparent text-white">
      <div class="w-full">
        <!-- Single Carousel -->
        <ImageCarousel 
          :images="headerImages"
          :auto-play="true"
          :interval="4000"
          :show-navigation="true"
          :show-indicators="true"
          @image-click="openImageModal"
        />
      </div>
    </header>

    <!-- Main Content with Button -->
    <main class="py-16">
      <div class="container text-center">
        <!-- Message from 站主ez -->
        <div class="mb-12 p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">🗣️ 站主ez的祝福 🗣️</h3>
          <p class="text-lg text-gray-600 leading-relaxed">
            🌟 祝你未来一切顺利，👨‍🦲 头发少掉一点，💪 肝永远健康！
          </p>
        </div>
        
        <button 
          @click="openMessageModal"
          class="btn-primary text-lg px-8 py-4 text-xl font-semibold mb-8"
        >
        🗣️ Bro 有话要说！
        </button>
      </div>
    </main>

    <!-- Surprise Section -->
    <section class="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
      <div class="container text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          🎁 有个礼物给你
        </h2>
        <p class="text-lg text-gray-600 mb-8">
          点下面按钮，发现惊喜!
        </p>
        <button 
          @click="openBoomModal"
          class="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg px-8 py-4 text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          🎉 点我! 🎉
        </button>
      </div>
    </section>

    <!-- Image Modal -->
    <ImageModal 
      :is-open="isImageModalOpen"
      :image="selectedImage"
      :on-close="closeImageModal"
    />

    <!-- Message Modal -->
    <MessageModal 
      :is-open="isMessageModalOpen"
      :entries="entries"
      :on-close="closeMessageModal"
    />

    <!-- Boom Modal -->
    <BoomModal 
      :is-open="isBoomModalOpen"
      :image="randomBoomImage"
      :on-close="closeBoomModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ImageModal } from '@/components/ImageModal'
import { MessageModal } from '@/components/MessageModal'
import { BoomModal } from '@/components/BoomModal'
import { headerImages } from '@/data/images'
import { entries } from '@/data/entries'
import { boomImages, getRandomBoomImageIndex } from '@/data/boomImages'
import type { CarouselImage } from '@/types'
import type { BoomImage } from '@/data/boomImages'

const isImageModalOpen = ref(false)
const isMessageModalOpen = ref(false)
const isBoomModalOpen = ref(false)
const selectedImage = ref<CarouselImage | null>(null)
const randomBoomImage = ref<BoomImage | null>(null)

const openImageModal = (image: CarouselImage) => {
  selectedImage.value = image
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
  selectedImage.value = null
}

const openMessageModal = () => {
  isMessageModalOpen.value = true
}

const closeMessageModal = () => {
  isMessageModalOpen.value = false
}

const openBoomModal = () => {
  const randomIndex = getRandomBoomImageIndex()
  randomBoomImage.value = boomImages[randomIndex]
  isBoomModalOpen.value = true
}

const closeBoomModal = () => {
  isBoomModalOpen.value = false
  randomBoomImage.value = null
}
</script>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature h3 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.5em;
}

.feature p {
  color: #666;
  line-height: 1.6;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

p {
  margin-bottom: 20px;
  color: #666;
  font-size: 1.1em;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature {
    padding: 20px;
  }
  
  h2 {
    font-size: 1.8em;
  }
  
  p {
    font-size: 1em;
  }
}
</style>
