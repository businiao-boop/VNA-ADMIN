<script setup lang="ts">
defineOptions({
  name: "Auth",
});
import LoginForm from "./login.vue";
import RegisterForm from "./register.vue";

const tab = ref("login");
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <a-tabs v-model:activeKey="tab" centered>
        <a-tab-pane key="login" tab="登录">
          <LoginForm />
        </a-tab-pane>
        <a-tab-pane key="register" tab="注册">
          <RegisterForm @success="tab = 'login'" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #c850c0, #4158d0);
  .auth-card {
    width: 400px;
    padding: 40px 30px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #fff;
    min-height: 500px; // 固定最小高度
    transition: all 0.3s ease; // 平滑过渡
  }
  :deep(.ant-tabs-tab) {
    color: #fff !important;
  }
  :deep(.ant-input),
  :deep(.ant-input-password) {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border-color: transparent;
  }
}
</style>
