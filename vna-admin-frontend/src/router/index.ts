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
    path:"/system",
    name:"System",
    component:Layout,
    meta: { title: "系统管理" },
    children:[
      {
        path: "menu",
        name: "Menu",
        meta: { title: "菜单管理" },
        component: () => import("@/views/core/menu/index.vue"),
      },
      {
        path: "role",
        name: "Role",
        meta: { title: "角色管理" },
        component: () => import("@/views/core/role/index.vue"),
      },
      {
        path: "user",
        name: "User",
        meta: { title: "用户管理" },
        component: () => import("@/views/core/user/index.vue"),
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
