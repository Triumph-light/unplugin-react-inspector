import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnpluginReactInspector from 'unplugin-react-inspector/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), UnpluginReactInspector()],
  server: {
    open: true
  }
})
