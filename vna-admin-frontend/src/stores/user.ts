import { defineStore } from "pinia";
import { login, LoginDto } from "@/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    userInfo: null as any,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    login(form: LoginDto) {
      login(form).then((res) => {
        const { access_token } = res;
        this.setToken(access_token);
      });
    },
    logout() {
      this.token = "";
      this.userInfo = null;
      localStorage.removeItem("token");
    },
  },
});
