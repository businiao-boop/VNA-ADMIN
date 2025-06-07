import { defineStore } from "pinia";
import { login, getUserProfile } from "@/api/auth";
import { UserResponseDto, LoginDto } from "@/types/modules/auth.type";
import { setToken } from "@/utils/auth";
import { transformAsyncRoutes } from "@/utils/transformRoutes";
import { BackendRoute } from "@/types/router";
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: null as UserResponseDto | null,
    roles: [], // 用户角色
    routes: [] as BackendRoute[],
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    setRoutes(routes: BackendRoute[]) {
      this.routes = routes;
    },
    generateRoutes(routes: BackendRoute[]): Promise<BackendRoute[]> {
      return new Promise((resolve, reject) => {
        try {
          const res = transformAsyncRoutes(routes);
          this.setRoutes(res);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      });
    },
    fetchUserInfo() {
      return new Promise((resolve, reject) => {
        getUserProfile()
          .then((res) => {
            this.setUserInfo(res);
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
