import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import svgLoader from 'vite-svg-loader'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      // 自动导入 `src/components` 中的组件 + 生成类型提示
      dirs: ['src/components'],

      // 支持的文件后缀
      extensions: ['vue'],

      // 搜索子目录
      deep: true,

      // 生成的类型声明文件路径
      dts: 'src/components.d.ts',

      // 自动引入 Ant Design Vue 组件（可选）
      // resolvers: [AntDesignVueResolver()],
    })
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
