<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header Section with Carousel -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div class="container py-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Vue Carousel Website
          </h1>
          <p class="text-xl opacity-90">
            Professional image carousel with information button
          </p>
        </div>
        
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
        <button 
          @click="openMessageModal"
          class="btn-primary text-lg px-8 py-4 text-xl font-semibold"
        >
          📖 Read Information Entries
        </button>
      </div>
    </main>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ImageModal } from '@/components/ImageModal'
import { MessageModal } from '@/components/MessageModal'
import { headerImages } from '@/data/images'
import { entries } from '@/data/entries'
import type { CarouselImage } from '@/types'

const isImageModalOpen = ref(false)
const isMessageModalOpen = ref(false)
const selectedImage = ref<CarouselImage | null>(null)

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
