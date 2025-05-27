import { defineStore } from "pinia";
import { login, getUserProfile, LoginDto, UserResponseDto } from "@/api/auth";
import { setToken } from "@/utils/auth";
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
              resolve(true);
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
