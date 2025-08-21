import type { CarouselImage } from '@/types'

// Import images properly for Vite build
import normal1 from '@/assets/carousel_pic/normal_1.jpg'
import normal2 from '@/assets/carousel_pic/normal_2.jpg'
import normal3 from '@/assets/carousel_pic/normla_3.jpg' // Note: keeping original filename as it exists
import normal4 from '@/assets/carousel_pic/normal_4.jpg'
import normal5 from '@/assets/carousel_pic/normal_5.jpg'

export const headerImages: CarouselImage[] = [
  {
    id: 'carousel-1',
    src: normal1,
    alt: 'Carousel Image 1',
    title: 'Beautiful Image 1',
    description: 'First image from the carousel collection'
  },
  {
    id: 'carousel-2',
    src: normal2,
    alt: 'Carousel Image 2',
    title: 'Beautiful Image 2',
    description: 'Second image from the carousel collection'
  },
  {
    id: 'carousel-3',
    src: normal3,
    alt: 'Carousel Image 3',
    title: 'Beautiful Image 3',
    description: 'Third image from the carousel collection'
  },
  {
    id: 'carousel-4',
    src: normal4,
    alt: 'Carousel Image 4',
    title: 'Beautiful Image 4',
    description: 'Fourth image from the carousel collection'
  },
  {
    id: 'carousel-5',
    src: normal5,
    alt: 'Carousel Image 5',
    title: 'Beautiful Image 5',
    description: 'Fifth image from the carousel collection'
  }
]

export const footerImages: CarouselImage[] = [
  {
    id: 'footer-1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    alt: 'City Skyline',
    title: 'City Skyline',
    description: 'Modern cityscape at night'
  },
  {
    id: 'footer-2',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
    alt: 'Desert Dunes',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon'
  },
  {
    id: 'footer-3',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    alt: 'Tropical Beach',
    title: 'Tropical Beach',
    description: 'Crystal clear waters and white sand beaches'
  },
  {
    id: 'footer-4',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
    alt: 'Northern Lights',
    title: 'Northern Lights',
    description: 'Aurora borealis dancing in the night sky'
  },
  {
    id: 'footer-5',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    alt: 'Waterfall',
    title: 'Waterfall',
    description: 'Majestic waterfall in the wilderness'
  }
]
