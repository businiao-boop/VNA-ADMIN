import { createApp } from 'vue'
import App from './App.vue'
import { setupAntdv, setupAssets, setupVxeTable } from "@/plugin"
import { setupRouter } from "@/router"
import { setupStore } from "@/stores"
import install from "@/hooks/modal"

const app = createApp(App);

function setupPlugins() {
  // 挂载资源
  setupAssets();
  // 挂载antd
  setupAntdv(app);
  // 挂载vxeTable
  setupVxeTable(app);

  install(app);
}

async function setupApp() {
  // 挂载路由
  await setupRouter(app);
  // // 挂载pinia
  setupStore(app);
  // // 挂载app
  app.mount("#app");
}
console.log(import.meta);
setupPlugins();
setupApp();
