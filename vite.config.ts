import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return ({
    plugins: [react()],
    server: {
          host: true,
          proxy: {
              '/api': {
                  target: env.VITE_API_URL,
                  changeOrigin: true,
                  rewrite: (path) => path.replace(/^\/api/, ''),
              },
          },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
})
