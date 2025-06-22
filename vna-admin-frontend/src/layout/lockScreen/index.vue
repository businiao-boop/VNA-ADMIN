<template>
  <div class="lock-screen">
    <div class="content">
      <y-icon icon="icon-lock" class="icon" />
      <h2 class="title">系统已锁定</h2>
      <p class="subtitle">请输入解锁密码继续操作</p>

      <a-form :model="formData" :rules="rules" ref="formRef"> 

        <a-form-item style="margin-bottom: 0px !important;" name="password">

          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
            size="large"
            @pressEnter="unlock"
            class="input"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            size="large"
            class="unlock-btn"
            @click="unlock"
            :disabled="!formData.password"
          >
            解锁
          </a-button>

        </a-form-item>
      </a-form>
          

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { Rule } from 'ant-design-vue/es/form'
const userStore = useUserStore()
const formData = reactive({
  password: ''
})
const formRef = ref()

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('密码不能为空');
  } else {
    if (value !== userStore.lockPassword) {
      return Promise.reject('密码不正确');
    }
    return Promise.resolve();
  }
};
const rules = ref({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
})




const unlock = () => {
  formRef.value.validate().then(()=>{ 
    userStore.unlockScreen(formData.password);
  
  })
}
</script>

<style scoped>.lock-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #f0f2f5, #e0e6ed);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: drop-bounce 0.8s ease;
}

.content {
  background: #fff;
  padding: 40px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 360px;
  animation: drop-bounce 0.8s ease;
}

.icon {
  font-size: 48px;
  color: #1890ff;
  margin-bottom: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
}

.a-form {
  text-align: left;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.ant-form-item-explain),
:deep(.ant-form-item-extra) {
  text-align: left;
  font-size: 12px;
  color: #ff4d4f;
  line-height: 1.4;
  margin-top: 4px;
}

.input {
  width: 100%;
}

.unlock-btn {
  width: 100%;
}

@keyframes drop-bounce {
  0% {
    transform: translateY(-200%);
    opacity: 0;
  }
  60% {
    transform: translateY(0);
    opacity: 1;
  }
  75% {
    transform: translateY(-15px);
  }
  90% {
    transform: translateY(0);
  }
  95% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}

</style>
