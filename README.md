# Vue Carousel Website

A professional Vue.js website featuring two image carousels with zoom functionality, built with modern web development practices.

## ✨ Features

- 🖼️ **Two Image Carousels**: Header and footer carousels with smooth transitions
- 📱 **Mobile Responsive**: Fully responsive design optimized for all devices
- 🔍 **Image Zoom**: Click any image to view it in full size with a beautiful modal
- ⚡ **Auto-play**: Carousels automatically cycle through images
- 🎨 **Modern UI**: Beautiful gradients and smooth animations
- 🔧 **TypeScript**: Full TypeScript support for better development experience
- 🎯 **UnoCSS**: Utility-first CSS framework for rapid styling
- ♿ **Accessible**: Built with accessibility in mind

## 🏗️ Project Structure

```
vue-carousel-website/
├── src/
│   ├── components/
│   │   ├── ImageCarousel/
│   │   │   ├── ImageCarousel.vue
│   │   │   └── index.ts
│   │   └── ImageModal/
│   │       ├── ImageModal.vue
│   │       └── index.ts
│   ├── composables/
│   │   └── useCarousel.ts
│   ├── data/
│   │   └── images.ts
│   ├── types/
│   │   └── index.ts
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── App.vue
│   └── main.ts
├── public/
│   └── images/
├── index.html
├── package.json
├── vite.config.ts
├── uno.config.ts
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Adding Your Own Images

1. Place your images in the `public/images/` folder
2. Update the image arrays in `src/data/images.ts`:

```typescript
export const headerImages: CarouselImage[] = [
  {
    id: 'your-image-1',
    src: '/images/your-image-1.jpg',
    alt: 'Your Image Description',
    title: 'Your Image Title',
    description: 'Your image description'
  }
]
```

### Carousel Configuration

You can customize carousel behavior by modifying props:

```vue
<ImageCarousel 
  :images="images"
  :auto-play="true"
  :interval="3000"
  :show-navigation="true"
  :show-indicators="true"
  @image-click="handleImageClick"
/>
```

### Styling

The project uses UnoCSS for utility-first styling. You can customize:

- Colors and theme in `uno.config.ts`
- Global styles in `src/assets/styles/main.css`
- Component-specific styles in each `.vue` file

## 🛠️ Technologies Used

- **Vue 3**: Progressive JavaScript framework with Composition API
- **TypeScript**: Static type checking for better development experience
- **Vite**: Fast build tool and development server
- **UnoCSS**: Utility-first CSS framework
- **VueUse**: Collection of Vue composition utilities

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
