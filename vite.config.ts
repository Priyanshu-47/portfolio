import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so assets resolve correctly under any GitHub Pages subpath
  // (e.g. https://<user>.github.io/<repo>/).
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: false,
  },
})
