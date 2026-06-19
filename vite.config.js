import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CONFIG PROPRE POUR PRODUCTION (Render / Vercel / Netlify)
export default defineConfig({
  plugins: [react()],

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})