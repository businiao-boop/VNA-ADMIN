import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',          // 自动导入 ref, reactive, computed 等
        'vue-router',   // 可选：自动导入 useRouter, useRoute 等
        'pinia',
      ],
      dts: false,       // 关闭类型文件生成，因为你没用 TS
      eslintrc: {
        enabled: true,  // 如果你用了 ESLint，建议开启
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
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
