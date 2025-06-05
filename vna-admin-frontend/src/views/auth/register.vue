<template>
  <div class="register-wrapper"></div>
  <a-form layout="vertical" :rules="rules" :model="form" ref="formRef">
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="form.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input-password
        v-model:value="form.password"
        placeholder="请输入密码"
      />
    </a-form-item>
    <a-form-item label="确认密码" name="confirmPassword">
      <a-input-password
        v-model:value="form.confirmPassword"
        placeholder="请确认密码"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" block @click="handleRegister(formRef)"
        >注册</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Rule, FormInstance } from "ant-design-vue/es/form";
import { message } from "ant-design-vue";
import { register } from "@/api/auth";
const emit = defineEmits(["success"]);
const form = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const formRef = ref<FormInstance>();
const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule: Rule, value: string) => {
        if (value !== form.value.password) {
          return Promise.reject("两次输入的密码不一致");
        } else {
          return Promise.resolve();
        }
      },
      trigger: "blur",
    },
  ],
};

const handleRegister = (formEl: FormInstance | undefined) => {
  // 注册
  if (!formEl) return;
  formEl.validate().then(() => {
    const { username, password } = form.value;
    const registerData = { username, password };
    register(registerData).then(() => {
      message.success("注册成功");
      emit("success");
    });
  });
};
</script>
<style scoped lang="scss">
.register-wrapper {
}
</style>
