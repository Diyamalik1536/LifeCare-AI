import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // bind IPv4 (127.0.0.1) + IPv6 so Chrome can connect
    port: 5176,
    strictPort: true,
    open: true,        // auto-open the default browser
  },
})
