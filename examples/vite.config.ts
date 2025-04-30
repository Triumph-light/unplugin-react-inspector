import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnpluginReactInspector from 'unplugin-react-next-inspector/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [UnpluginReactInspector(), react()],
})
