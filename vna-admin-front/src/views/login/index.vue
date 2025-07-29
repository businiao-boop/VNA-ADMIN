<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <img src="/vite.svg" alt="logo" class="login-logo" />
        <h1 class="login-title">VNA-Admin 管理系统</h1>
        <p class="login-subtitle">欢迎使用权限管理系统</p>
      </div>

      <a-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form" @finish="handleLogin">
        <a-form-item name="username">
          <a-input v-model:value="loginForm.username" placeholder="请输入用户名" size="large" />
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="loginForm.password" placeholder="请输入密码" size="large" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="loading" class="login-button" block>
            登录
          </a-button>
        </a-form-item>

        <div class="login-footer">
          <span>还没有账户？</span>
          <a-button type="link" @click="goToRegister">立即注册</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login, getUserProfile } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const loading = ref(false);
const loginFormRef = ref();
const userStore = useUserStore();

const loginForm = reactive({
  username: '',
  password: ''
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const handleLogin = async (values) => {
  loading.value = true;
  try {
    // 调用登录API
    const loginResponse = await login({
      username: values.username,
      password: values.password
    });

    if (loginResponse.accessToken) {
      // 保存token到localStorage
      localStorage.setItem('token', loginResponse.accessToken);

      // 获取用户信息
      const userInfo = await getUserProfile();

      // 保存用户信息到store
      userStore.setUserInfo(userInfo);

      // 构造动态路由
      userStore.generateRoutes(userInfo.menus);

      message.success('登录成功');
      router.push('/dashboard');
    } else {
      message.error('登录失败：未获取到token');
    }
  } catch (error) {
    message.error('登录失败：' + (error.message || '未知错误'));
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login-content {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .login-header {
      text-align: center;
      margin-bottom: 40px;

      .login-logo {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
      }

      .login-title {
        font-size: 24px;
        color: #262626;
        margin-bottom: 8px;
      }

      .login-subtitle {
        color: #8c8c8c;
        font-size: 14px;
      }
    }

    .login-form {
      .login-button {
        height: 40px;
        font-size: 16px;
      }
    }

    .login-footer {
      text-align: center;
      margin-top: 16px;
      color: #8c8c8c;
    }
  }
}
</style>