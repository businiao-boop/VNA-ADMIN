import { createRouter, createWebHashHistory } from "vue-router";
import type { App } from "vue";
import { routerGuard } from "./router-guard";
import Layout from "@/layout/index.vue"
// 常驻路由
export const constantRoutes = [
  {
    path:"/",
    name:"/",
    component:Layout,
    children:[
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/index.vue"),
  },
  {
    path:"/system",
    name:"System",
    component:Layout,
    children:[
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/core/menu/index.vue"),
      },

    ]
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
