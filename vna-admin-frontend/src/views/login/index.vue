<template>
  <div class="login-container">
    <el-card title="登录" class="login-card">
      <el-form layout="vertical" :model="form" ref="loginForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            @keyup.enter.native="handleLogin(loginForm)"
          />
        </el-form-item>
        <el-form-item prop="rememberMe">
          <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin(loginForm)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage as message, FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const loginForm = ref<FormInstance>();
const form = reactive({
  username: "arno",
  password: "1234",
  rememberMe: true,
});

const rules = reactive<FormRules<typeof form>>({
  username: [{ required: true, trigger: "blur" }],
  password: [{ required: true, trigger: "blur" }],
});

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if(!valid)return;
    if (valid) {
      userStore.login(form).then(
        () => {
          userStore.fetchUserInfo().then(() => {
            message.success("登录成功");
            router.push("/");
          });
        },
        (err) => {
          console.log("login", err);
        }
      );
    } else {
      console.log("error submit!");
    }
  });
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
