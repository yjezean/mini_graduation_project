// Import boom images properly for Vite build
import boom1 from '@/assets/boom/boom_1.jpg'
import boom2 from '@/assets/boom/boom_2.jpg'
import boom3 from '@/assets/boom/boom_3.jpg'
import boom4 from '@/assets/boom/boom_4.jpg'
import boom5 from '@/assets/boom/boom_5.jpg'
import boom6 from '@/assets/boom/boom_6.jpg'
import boom7 from '@/assets/boom/boom_7.jpg'
import boom8 from '@/assets/boom/boom_8.jpg'
import boom9 from '@/assets/boom/boom_9.jpg'
import boom10 from '@/assets/boom/boom_10.jpg'
import boom11 from '@/assets/boom/boom_11.jpg'

export interface BoomImage {
    id: string
    src: string
    alt: string
    title: string
}

export const boomImages: BoomImage[] = [
    {
        id: 'boom-1',
        src: boom1,
        alt: 'Boom Image 1',
        title: 'Surprise Image 1'
    },
    {
        id: 'boom-2',
        src: boom2,
        alt: 'Boom Image 2',
        title: 'Surprise Image 2'
    },
    {
        id: 'boom-3',
        src: boom3,
        alt: 'Boom Image 3',
        title: 'Surprise Image 3'
    },
    {
        id: 'boom-4',
        src: boom4,
        alt: 'Boom Image 4',
        title: 'Surprise Image 4'
    },
    {
        id: 'boom-5',
        src: boom5,
        alt: 'Boom Image 5',
        title: 'Surprise Image 5'
    },
    {
        id: 'boom-6',
        src: boom6,
        alt: 'Boom Image 6',
        title: 'Surprise Image 6'
    },
    {
        id: 'boom-7',
        src: boom7,
        alt: 'Boom Image 7',
        title: 'Surprise Image 7'
    },
    {
        id: 'boom-8',
        src: boom8,
        alt: 'Boom Image 8',
        title: 'Surprise Image 8'
    },
    {
        id: 'boom-9',
        src: boom9,
        alt: 'Boom Image 9',
        title: 'Surprise Image 9'
    },
    {
        id: 'boom-10',
        src: boom10,
        alt: 'Boom Image 10',
        title: 'Surprise Image 10'
    },
    {
        id: 'boom-11',
        src: boom11,
        alt: 'Boom Image 11',
        title: 'Surprise Image 11'
    }
]

export function getRandomBoomImage(): BoomImage {
    const randomIndex = Math.floor(Math.random() * boomImages.length)
    return boomImages[randomIndex]
}

export function getRandomBoomImageIndex(): number {
    return Math.floor(Math.random() * boomImages.length)
}
