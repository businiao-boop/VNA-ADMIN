import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routerGuard } from "./router-guard";
import Layout from "@/layout/index.vue"
import { component } from "vxe-table";
// 常驻路由
export const constantRoutes = [
  {
    path:"/",
    name:"/",
    component: Layout,
    children:[
      {
        path: "/",
        name: "Home",
        meta: { title: "首页" },
        component: () => import("@/views/home/index.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: { hidden: true },
    component: () => import("@/views/auth/index.vue"),
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404.vue"),
    meta: { title: "404", hidden: true },
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/error/401.vue"),
    meta: { title: "404", hidden: true },
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
