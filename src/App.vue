<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div class="container py-8">
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Vue Carousel Website
          </h1>
          <p class="text-xl opacity-90">
            Professional image carousels with zoom functionality
          </p>
        </div>
        
        <!-- Header Carousel -->
        <ImageCarousel 
          :images="headerImages"
          :auto-play="true"
          :interval="4000"
          :show-navigation="true"
          :show-indicators="true"
          @image-click="openModal"
        />
      </div>
    </header>

    <!-- Main Content -->
    <main class="py-16">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Website
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            This is a beautiful Vue.js website featuring two stunning image carousels. 
            The header carousel showcases our featured images, while the footer carousel 
            displays additional content. Click on any image to view it in full size!
          </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div class="card text-center">
            <div class="text-4xl mb-4">🖼️</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Image Carousels
            </h3>
            <p class="text-gray-600">
              Two beautiful carousels that automatically cycle through images with smooth transitions
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Mobile Responsive
            </h3>
            <p class="text-gray-600">
              Fully responsive design that works perfectly on all devices and screen sizes
            </p>
          </div>
          
          <div class="card text-center">
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Image Zoom
            </h3>
            <p class="text-gray-600">
              Click any image to view it in full size with a beautiful modal overlay
            </p>
          </div>
        </div>

        <!-- Additional Content -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">
            About This Project
          </h3>
          <p class="text-gray-600 mb-4">
            This Vue.js website demonstrates modern web development practices with:
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Vue 3 Composition API with TypeScript</li>
            <li>UnoCSS for utility-first styling</li>
            <li>Reusable composables and components</li>
            <li>Professional project structure</li>
            <li>Mobile-first responsive design</li>
            <li>Accessibility features</li>
          </ul>
        </div>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-gradient-to-r from-pink-500 to-red-500 text-white">
      <div class="container py-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Gallery
          </h2>
          <p class="text-xl opacity-90">
            Explore our collection of beautiful images
          </p>
        </div>
        
        <!-- Footer Carousel -->
        <ImageCarousel 
          :images="footerImages"
          :auto-play="true"
          :interval="3500"
          :show-navigation="true"
          :show-indicators="true"
          @image-click="openModal"
        />
      </div>
    </footer>

    <!-- Image Modal -->
    <ImageModal 
      :is-open="isModalOpen"
      :image="selectedImage"
      :on-close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageCarousel } from '@/components/ImageCarousel'
import { ImageModal } from '@/components/ImageModal'
import { headerImages, footerImages } from '@/data/images'
import type { CarouselImage } from '@/types'

const isModalOpen = ref(false)
const selectedImage = ref<CarouselImage | null>(null)

const openModal = (image: CarouselImage) => {
  selectedImage.value = image
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedImage.value = null
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
