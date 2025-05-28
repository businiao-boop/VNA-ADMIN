import { defineStore } from "pinia";
import { login, getUserProfile } from "@/api/auth";
import { UserResponseDto, LoginDto } from "@/types/api/auth";
import { setToken } from "@/utils/auth";
import { transformAsyncRoutes } from "@/utils/buildRouteTree";
import { BackendRoute } from "@/types/router";
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: null as UserResponseDto | null,
    roles: [], // 用户角色
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    generateRoutes(routes: BackendRoute[]) {
      const res = transformAsyncRoutes(routes);
    },
    fetchUserInfo() {
      return new Promise((resolve, reject) => {
        getUserProfile()
          .then((res) => {
            this.setUserInfo(res);
            this.generateRoutes(res.routes);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    login(form: LoginDto) {
      return new Promise((resolve, reject) => {
        login(form)
          .then((res) => {
            if (!res.access_token) {
              reject(res);
            }
            this.setToken(res.access_token);
            resolve(true);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      this.token = "";
      this.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});
