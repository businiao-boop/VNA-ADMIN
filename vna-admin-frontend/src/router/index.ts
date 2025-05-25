import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";

// 常驻路由
export const constantRoutes = [
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
  app.use(router);
}
export default router;
