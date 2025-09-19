import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // Safely expose only the environment variables we need
    define: {
      'import.meta.env.API_KEY': JSON.stringify(env.API_KEY),
      'import.meta.env.BASE_URL': JSON.stringify(env.BASE_URL || 'https://api.openweathermap.org/data/2.5/'),
      'import.meta.env.UNITS': JSON.stringify(env.UNITS || 'metric'),
      'import.meta.env.LANGUAGE': JSON.stringify(env.LANGUAGE || 'en'),
      'import.meta.env.TIMEOUT': JSON.stringify(env.TIMEOUT || '5000')
    }
  }
})
