export interface CarouselImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

export interface CarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  interval?: number
  showNavigation?: boolean
  showIndicators?: boolean
}

export interface ModalProps {
  isOpen: boolean
  image: CarouselImage | null
  onClose: () => void
}
