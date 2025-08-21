import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
  shortcuts: {
    'btn': 'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
    'btn-primary': 'btn bg-primary-600 text-white hover:bg-primary-700',
    'btn-secondary': 'btn bg-gray-200 text-gray-800 hover:bg-gray-300',
    'card': 'bg-white rounded-lg shadow-md p-6',
    'container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },
})
