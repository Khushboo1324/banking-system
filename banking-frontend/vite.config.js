import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── Development proxy ──────────────────────────────────────────────────────
  // Forwards /api and /transactions to the Spring Boot backend running locally.
  // In production these paths are either served from the same origin or
  // VITE_API_BASE_URL is set to point at the deployed backend.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/transactions': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  // ── Production build ───────────────────────────────────────────────────────
  build: {
    outDir: 'dist',
    // Emit a source map only for staging/debug; disable for production if preferred
    sourcemap: false,
    // Chunk splitting: keeps vendor code separate from app code for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'react-hot-toast'],
        },
      },
    },
  },
})
