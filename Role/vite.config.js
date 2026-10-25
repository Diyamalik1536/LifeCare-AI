import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Role portal is also the "storage hub": /bridge.html keeps the shared queue in localStorage.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
})
