<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-header">
        <img src="/vite.svg" alt="logo" class="register-logo" />
        <h1 class="register-title">VNA-Admin 注册</h1>
        <p class="register-subtitle">创建您的账户</p>
      </div>

      <a-form :model="registerForm" :rules="rules" ref="registerFormRef" class="register-form" @finish="handleRegister">
        <a-form-item name="username">
          <a-input v-model:value="registerForm.username" placeholder="请输入用户名" size="large" />
        </a-form-item>

        <a-form-item name="password">
          <a-input-password v-model:value="registerForm.password" placeholder="请输入密码" size="large" />
        </a-form-item>

        <a-form-item name="confirmPassword">
          <a-input-password v-model:value="registerForm.confirmPassword" placeholder="请再次输入密码" size="large" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" :loading="loading" class="register-button" block>
            注册
          </a-button>
        </a-form-item>

        <div class="register-footer">
          <span>已有账户？</span>
          <a-button type="link" @click="goToLogin">立即登录</a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { register } from '@/api/auth';

const router = useRouter();
const loading = ref(false);
const registerFormRef = ref();

const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const validateConfirmPassword = (rule, value) => {
  if (value !== registerForm.password) {
    return Promise.reject('两次输入的密码不一致');
  }
  return Promise.resolve();
};

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度为6-32个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
};

const handleRegister = async (values) => {
  loading.value = true;
  try {
    // 调用注册API
    const response = await register({
      username: values.username,
      password: values.password
    });

    message.success('注册成功！请登录');
    
    // 注册成功后跳转到登录页
    router.push('/login');
  } catch (error) {
    message.error('注册失败：' + (error.message || '未知错误'));
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .register-content {
    width: 400px;
    padding: 40px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .register-header {
      text-align: center;
      margin-bottom: 40px;

      .register-logo {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
      }

      .register-title {
        font-size: 24px;
        color: #262626;
        margin-bottom: 8px;
      }

      .register-subtitle {
        color: #8c8c8c;
        font-size: 14px;
      }
    }

    .register-form {
      .register-button {
        height: 40px;
        font-size: 16px;
      }
    }

    .register-footer {
      text-align: center;
      margin-top: 16px;
      color: #8c8c8c;
    }
  }
}
</style>