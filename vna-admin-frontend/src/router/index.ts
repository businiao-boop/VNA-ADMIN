import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routerGuard } from "./router-guard";
// 常驻路由
export const constantRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export function setupRouter(app: App) {
  routerGuard(router);
  app.use(router);
}
export default router;
