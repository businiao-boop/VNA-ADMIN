import type { Router } from "vue-router";
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/stores/user";
import { WhiteList } from "./constant";
export function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getToken();
    const userStore = useUserStore();
    if (WhiteList.includes(to.path)) {
      return next();
    }
    if (!token) return next("/login");

    if (!userStore.userInfo) {
      try {
        await userStore.fetchUserInfo();
      } catch (error) {
        console.log(error);
        return next("/login");
      }
    }
    next();
  });
  router.afterEach((to, from) => {});
}
