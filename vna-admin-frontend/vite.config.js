import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    proxy: {
      "/v3": {
        target: "http://localhost:1212",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v3/, "v3"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
