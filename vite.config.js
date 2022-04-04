import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// const pwaOptions = {
//   includeAssets: [],
//   registerType: 'autoUpdate',
//   manifest: {
//     name: 'Funday',
//     short_name: 'Funday',
//     description:
//       'A platform built for a new way of working',
//     theme_color: '#ffffff',
//     icons: [],
//   },
// }

export default defineConfig({
  plugins: [
    vue(),
    //VitePWA(pwaOptions)
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../backend/public',
    emptyOurDir: true,
  },
  css: {
    extract: false,
  },
})
