<template>
  <div class="login-container">
    <a-card title="登录" class="login-card">
      <a-form layout="vertical" :model="form">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            @pressEnter="handleLogin"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleLogin">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { LoginDto } from "@/api/auth";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const form = reactive<LoginDto>({
  username: "arno",
  password: "123",
  rememberMe: true,
});

const handleLogin = async () => {
  if (!form.username || !form.password) {
    return message.warning("请输入用户名和密码");
  }
  userStore.login(form);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
.login-card {
  width: 360px;
}
</style>
