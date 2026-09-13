import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // bind IPv4 (127.0.0.1) + IPv6 so Chrome can connect
    port: 5176,
    strictPort: false, // use the next free port if 5173 is taken
    open: true,        // auto-open the default browser
  },
})
