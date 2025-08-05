<template>
  <header class="top-navigation">
    <div class="navigation-content">
      <!-- 左侧区域：Logo + 菜单 -->
      <div class="left-section">
        <!-- Logo -->
        <div class="logo" v-if="showLogo">
          <a-image src="/vite.svg" alt="logo" />
          <span class="logo-text">VNA-Admin</span>
        </div>

        <!-- 顶部菜单 -->
        <nav class="menu-container">
          <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" theme="light" @click="handleMenuClick">
            <template v-for="item in menuItems" :key="item.path">
              <MenuItem :menu-item="item" />
            </template>
          </a-menu>
        </nav>
      </div>

      <!-- 右侧功能区 -->
      <div class="right-section">
        <!-- 搜索框 -->
        <div class="search-container">
          <a-input-search v-model:value="searchValue" placeholder="搜索菜单..." style="width: 200px" @search="handleSearch"
            allow-clear />
        </div>

        <!-- 系统消息 -->
        <div class="notification-container">
          <a-badge :count="unreadCount" :offset="[-2, 2]">
            <a-button type="text" @click="handleNotification">
              <template #icon>
                <BellOutlined />
              </template>
            </a-button>
          </a-badge>
        </div>

        <!-- 全屏按钮 -->
        <div class="fullscreen-container">
          <a-button type="text" @click="toggleFullscreen">
            <template #icon>
              <FullscreenOutlined v-if="!isFullscreen" />
              <FullscreenExitOutlined v-else />
            </template>
          </a-button>
        </div>

        <!-- 用户头像 -->
        <YUserAvatar :user-info="userInfo" @logout="handleLogout" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { BellOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/user';
import MenuItem from './MenuItem.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const selectedKeys = ref([]);
const searchValue = ref('');
const unreadCount = ref(3);
const isFullscreen = ref(false);

const props = defineProps({
  showLogo: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['menuClick', 'logout']);

// 从store获取菜单和用户数据
const menuItems = computed(() => {
  console.log(userStore.getMenuTree, "userStore.getMenuTree");
  const menus = userStore.getMenuTree || [];
  // 过滤掉根路径/的菜单项，只显示实际的菜单
  return menus.map(item => {
    if (item.path !== '/') {
      return item;
    }
    return item.children?.[0] || item;
  });
});

const userInfo = computed(() => userStore.userInfo || {
  nickname: '管理员',
  avatar: '',
  username: 'admin'
});


const handleMenuClick = ({ key }) => {
  emit('menuClick', key);
};

const handleLogout = () => {
  emit('logout');
};

const handleSearch = (value) => {
  // 这里可以实现菜单搜索过滤逻辑
};

const handleNotification = () => {
  // 实现消息通知逻辑
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

// 根据当前路由设置选中状态
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath];
  },
  { immediate: true }
);

// 加载菜单数据
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
</script>

<style scoped lang="scss">
.top-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;

  .navigation-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 24px;
    width: 100%;

    .left-section {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      height: 100%;

      .logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        margin-right: 48px;

        img {
          height: 32px;
          margin-right: 8px;
        }

        .logo-text {
          font-size: 18px;
          font-weight: bold;
          color: #1890ff;
          white-space: nowrap;
        }
      }

      .menu-container {
        flex: 1;
        min-width: 0;
        height: 100%;

        :deep(.ant-menu-horizontal) {
          border-bottom: none;
          line-height: 58px;

          .ant-menu-item {
            margin: 0 8px;

            // &::after {
            //   border-bottom: 2px solid #1890ff;
            // }
          }
        }
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
      margin-left: 24px;

      .search-container {
        flex-shrink: 0;
      }

      .notification-container,
      .fullscreen-container {
        flex-shrink: 0;
      }

      // 响应式设计
      @media (max-width: 768px) {
        .search-container {
          display: none;
        }
      }

      @media (max-width: 576px) {
        .logo-text {
          display: none;
        }
      }
    }
  }
}
</style>