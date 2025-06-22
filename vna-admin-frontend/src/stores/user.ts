import { defineStore } from "pinia";
import { login } from "@/api/auth";
import { getUserProfile } from "@/api/user"
import { UserResponseDto, LoginDto } from "@/types/modules/auth.type";
import { setToken, removeToken } from "@/utils/auth";
import { transformAsyncRoutes } from "@/utils/transformRoutes";
import { BackendRoute } from "@/types/router";
import { constantRoutes } from "@/router"
import { buildTree } from "@/utils/buildTree";
export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: null as UserResponseDto | null,
    routes: [] as BackendRoute[],
    isLocked: false,
    lockPassword: ""
  }),
  actions: {
    unlockScreen(pass: string) {
      if (pass && pass == this.lockPassword) {
        this.isLocked = false
        this.lockPassword = ""
        localStorage.removeItem("isLocked");
      }
    },
    lockScreen(pass: string) {
      this.isLocked = true;
      this.lockPassword = pass;
      localStorage.setItem('isLocked', JSON.stringify({ isLocked: true, password: pass }));
    },
    checkLockStatus() {
      const lockInfo = localStorage.getItem('isLocked'); // 恢复状态
      if (lockInfo) {
        const { isLocked, password } = JSON.parse(lockInfo);
        this.isLocked = isLocked;
        this.lockPassword = password;
      }

    },
    setToken(token: string) {
      this.token = token;
      setToken(token);
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    setRoutes(routes: BackendRoute[]) {
      // ...constantRoutes,
      this.routes = [...routes];
    },
    generateRoutes(routes: BackendRoute[]): Promise<BackendRoute[]> {
      return new Promise((resolve, reject) => {
        try {
          const res = transformAsyncRoutes(buildTree(routes));
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
      return new Promise((resolve, reject) => {
        this.token = "";
        this.userInfo = null;
        removeToken();
        resolve(true)
      });
    },
  },
});
