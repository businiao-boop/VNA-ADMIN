<template>
  <div class="user-avatar">
    <a-dropdown>
      <a class="user-dropdown" @click.prevent>
        <a-avatar size="small" :src="userInfo.avatar || defaultAvatar" />
        <span class="username">{{ userInfo.nickname || userInfo.username || '用户' }}</span>
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="profile" @click="handleProfile">
            <UserOutlined />
            个人中心
          </a-menu-item>
          <a-menu-item key="settings" @click="handleSettings">
            <SettingOutlined />
            系统设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout" @click="handleLogout">
            <LogoutOutlined />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>


const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({
      nickname: '管理员',
      avatar: '',
      username: 'admin'
    })
  }
});

const emit = defineEmits(['profile', 'settings', 'logout']);

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiMxODkwZmYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC4xMzQwMSAxNCA1IDE3LjEzNCA1IDIxQzUgMjEuNTUyMyA1LjQ0Nzc3IDIyIDYgMjJIMThDMTguNTUyMyAyMiAxOSAyMS41NTIzIDE5IDIxQzE5IDE3LjEzNCAxNS44NjYgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';

const handleProfile = () => {
  emit('profile');
};

const handleSettings = () => {
  emit('settings');
};

const handleLogout = () => {
  emit('logout');
};
</script>

<style scoped lang="scss">
.user-avatar {
  .user-dropdown {
    display: flex;
    align-items: center;
    color: #666;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background: #f5f5f5;
      color: #1890ff;
    }

    .username {
      margin: 0 8px;
      font-size: 14px;
    }
  }
}
</style>