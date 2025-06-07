<template>
  <div class="login-wrapper">
    <div title="登录" class="auth-card">
      <a-form layout="vertical" :model="form" :rules="rules" ref="formRef">
        <a-form-item label="用户名" name="username">
          <a-input v-model:value="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input-password
            v-model:value="form.password"
            placeholder="请输入密码"
            @pressEnter="handleLogin(formRef)"
          />
        </a-form-item>
        <a-form-item name="rememberMe" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="form.rememberMe">记住我</a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleLogin(formRef)">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { LoginDto } from "@/types/modules/auth.type";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import type { Rule, FormInstance } from "ant-design-vue/es/form";
const router = useRouter();
const userStore = useUserStore();
const formRef = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
};
const form = reactive<LoginDto>({
  username: "arno",
  password: "1234",
  rememberMe: false,
});

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate().then(() => {
    userStore.login(form).then(
      () => {
        userStore.fetchUserInfo().then(() => {
          message.success("登录成功");
          router.push("/");
        });
      },
      (err) => {
        message.error(err.message)
      }
    );
  });
};
</script>

<style scoped lang="scss"></style>
