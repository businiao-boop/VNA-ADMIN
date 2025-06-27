import type { Router } from "vue-router";
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/stores/user";
import { WhiteList } from "./constant";
export function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getToken();
    const userStore = useUserStore();
    // ✅ 白名单放行
    if (WhiteList.includes(to.path)) return next();
    if (to.meta.public) return next();

    // ❌ 无 token，跳转登录页
    if (!token) return next("/login");

    // ✅ 拉取用户信息（首次进入）
    if (!userStore.userInfo) {
      await userStore.fetchUserInfo();
    }

    // ✅ 生成动态路由（如未添加）
    if (userStore.routes.length === 0) {
      const accessedRoutes = await userStore.generateRoutes(
        userStore.userInfo!.menuList
      );

      accessedRoutes.map((route) => {
        router.addRoute(route);
      });
      // ⚠️ 必须重新跳转一次，避免动态添加路由后路由匹配失败
      return next({ ...to, replace: true });
    }
    next();
  });
  router.afterEach((to, from) => {});
}
