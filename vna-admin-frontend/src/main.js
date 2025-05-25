import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd, setupAssets } from "@/plugin"
import { setupRouter } from "@/router"
import { setupStore } from "@/stores"

const app = createApp(App);

function setupPlugins() {
  // 挂载资源
  setupAssets()
  // 挂载antd
  setupAntd(app);
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
