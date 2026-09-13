import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration file
// This tells Vite to use React
export default defineConfig({
  plugins: [react()]
})
