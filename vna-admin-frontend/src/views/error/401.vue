<script setup lang="ts">
defineOptions({
  name: "401",
});

import noGrant from "@/assets/icons/401.svg"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const login = () => {
  userStore.logout().then(()=>{
    router.push({ path: "/login" });
  });
};
</script>

<template>
  <div class="no-permission-container">
    <a-empty class="no-permission">
    <template #image>
      <y-icon viewBox="0 0 1024 1024" svg="401"></y-icon>
    </template>
      <template #description>
        <span>
          认证失效，请重新登录
        </span>
      </template>
      <a-button type="primary" @click="login">重新登录</a-button>
    </a-empty>
  </div>
</template>

<style lang="scss">
.no-permission-container{
  height: 100%;
  display: flex;
  align-items: center;
  .no-permission{
    margin: 0 auto;
    text-align: center;
    .ant-empty-image{
      height: 300px;
    }
  }
}
</style>