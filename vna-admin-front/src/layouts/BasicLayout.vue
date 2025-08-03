<template>
  <div class="basic-layout">
    <!-- 顶部导航栏 -->
    <YTopNavigation @menu-click="handleMenuClick" @logout="handleLogout" />

    <!-- 主体内容区域 -->
    <main class="main-content">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-wrapper">
        <YBreadcrumb :routes="breadcrumbRoutes" />
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { message } from 'ant-design-vue';
import { computed, reactive, watch } from 'vue';
import YTopNavigation from './YTopNavigation/index.vue';
import YBreadcrumb from './YBreadcrumb/index.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();



// 面包屑路由
const breadcrumbRoutes = computed(() => {
  const matched = route.matched.filter(item => item.meta?.name);
  return matched.map(item => ({
    path: item.path,
    title: item.name
  }));
});

const handleMenuClick = (key) => {
  router.push(key);
};

const handleLogout = async () => {
  try {
    await userStore.logout();
    message.success('退出登录成功');
  } catch (error) {
    console.error('登出失败:', error);
    message.error('登出失败');
  }
};
</script>

<style scoped lang="scss">
.basic-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    // background: #f5f5f5;
    overflow: hidden;
    margin-top: 60px;

    .breadcrumb-wrapper {
      background: #fff;
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0;
    }

    .content-area {
      flex: 1;
      padding: 24px;
      // overflow: auto;
      // background: #f5f5f5;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .basic-layout {
    .main-content {
      .content-area {
        padding: 16px;
      }
    }
  }
}
</style>