import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssgOptions: {
    // /werken.html — GitHub Pages serves this at /werken with no redirect hop.
    dirStyle: 'flat',
    formatting: 'minify',
  },
})
