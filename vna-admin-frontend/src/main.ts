import { createApp } from 'vue'
import App from './App.vue'
import { setupAntdv, setupAssets, setupVxeTable, setupGlobalComponents } from "@/plugin"
import { setupRouter } from "@/router"
import { setupStore } from "@/stores"
import install from "@/hooks/modal"
import { useThemeStore } from "@/stores/theme"
const app = createApp(App);

async function setupPlugins() {
  // 挂载资源
  setupAssets();
  // 挂载antd
  setupAntdv(app);
  // 挂载vxeTable
  setupVxeTable(app);
  // 挂载组件
  await setupGlobalComponents(app);

  install(app);
}

async function setupApp() {
  // 挂载路由
  await setupRouter(app);
  // // 挂载pinia
  setupStore(app);
  // 初始化主题颜色（必须在 pinia 初始化之后调用）
  const themeStore = useThemeStore()
  themeStore.resetTheme()
  // // 挂载app
  app.mount("#app");
}
await setupPlugins();
setupApp();
